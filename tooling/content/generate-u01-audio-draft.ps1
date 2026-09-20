[CmdletBinding()]
param(
  [switch]$Force
)

Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

$root = (Resolve-Path (Join-Path $PSScriptRoot "../..")).Path
$planPath = Join-Path $root "content/source/u01-l1/audio-plan.json"
$seedPath = Join-Path $root "content/source/u01-l1/seed.json"
$assetRoot = Join-Path $root "content/assets/u01-l1/audio"
$masterRoot = Join-Path $assetRoot "master"
$deliveryRoot = Join-Path $assetRoot "delivery"
$manifestPath = Join-Path $root "content/manifests/u01-l1.audio-draft.json"
$tempRoot = Join-Path ([IO.Path]::GetTempPath()) ("nekoru-u01-audio-" + [guid]::NewGuid().ToString())

if (-not (Get-Command ffmpeg -ErrorAction SilentlyContinue)) {
  throw "ffmpeg tidak tersedia. Pasang ffmpeg sebelum membuat audio draft."
}
if (-not (Get-Command ffprobe -ErrorAction SilentlyContinue)) {
  throw "ffprobe tidak tersedia. Pasang ffmpeg sebelum membuat metadata audio."
}

New-Item -ItemType Directory -Force -Path $masterRoot, $deliveryRoot, $tempRoot | Out-Null

function Get-RepoPath([string]$path) {
  $fullPath = (Resolve-Path -LiteralPath $path).Path
  return $fullPath.Substring($root.Length + 1).Replace("\", "/")
}

function Invoke-Ffmpeg([string[]]$arguments) {
  & ffmpeg @arguments 2>&1 | Out-Null
  if ($LASTEXITCODE -ne 0) {
    throw "ffmpeg gagal dengan exit code $LASTEXITCODE."
  }
}

function Get-AudioFormat([string]$path) {
  $json = & ffprobe -v error -show_entries "stream=codec_name,sample_rate,bits_per_sample,channels:format=duration" -of json $path 2>&1 | Out-String
  if ($LASTEXITCODE -ne 0) {
    throw "ffprobe gagal membaca $path."
  }
  $parsed = $json | ConvertFrom-Json
  $stream = $parsed.streams[0]
  return [ordered]@{
    codec = [string]$stream.codec_name
    sample_rate_hz = [int]$stream.sample_rate
    bits_per_sample = [int]$stream.bits_per_sample
    channels = [int]$stream.channels
    duration_seconds = [math]::Round([double]$parsed.format.duration, 3)
  }
}

function Get-Loudness([string]$path) {
  $output = (& ffmpeg -hide_banner -nostats -i $path -filter_complex "ebur128=peak=true" -f null NUL 2>&1 | Out-String)
  if ($LASTEXITCODE -ne 0) {
    throw "ffmpeg ebur128 gagal membaca $path."
  }
  $loudnessMatch = [regex]::Match($output, "Integrated loudness:\s+I:\s+(-?\d+(?:\.\d+)?) LUFS")
  $peakMatch = [regex]::Match($output, "True peak:\s+Peak:\s+(-?\d+(?:\.\d+)?) dBFS")
  return [ordered]@{
    loudness_lufs = if ($loudnessMatch.Success) { [double]$loudnessMatch.Groups[1].Value } else { $null }
    true_peak_dbtp = if ($peakMatch.Success) { [double]$peakMatch.Groups[1].Value } else { $null }
    measurement_status = if ($loudnessMatch.Success -and $peakMatch.Success) { "automated_measurement_only" } else { "not_measured" }
  }
}

$plan = Get-Content -LiteralPath $planPath -Raw | ConvertFrom-Json
$seed = Get-Content -LiteralPath $seedPath -Raw | ConvertFrom-Json
$seedAssetIds = @($seed.assets | ForEach-Object { [string]$_.id })
$planRecords = @($plan.recordings)
if ($planRecords.Count -ne 26 -or $seedAssetIds.Count -ne 26) {
  throw "Audio plan dan seed harus memiliki tepat 26 asset record."
}
if (((@($planRecords | ForEach-Object asset_id) | Sort-Object) -join "|") -ne (($seedAssetIds | Sort-Object) -join "|")) {
  throw "Audio plan harus mereferensikan tepat asset ID yang ada di seed."
}

Add-Type -AssemblyName System.Speech
$synth = New-Object System.Speech.Synthesis.SpeechSynthesizer
$format = New-Object System.Speech.AudioFormat.SpeechAudioFormatInfo(
  48000,
  [System.Speech.AudioFormat.AudioBitsPerSample]::Sixteen,
  [System.Speech.AudioFormat.AudioChannel]::Mono
)
$installedVoices = @($synth.GetInstalledVoices() | ForEach-Object { $_.VoiceInfo.Name })
$requiredVoices = @($plan.voice_variants.a.voice_name, $plan.voice_variants.b.voice_name)
foreach ($voiceName in $requiredVoices) {
  if ($installedVoices -notcontains $voiceName) {
    throw "Voice $voiceName tidak terpasang pada workstation ini."
  }
}

$generatedAt = (Get-Date).ToString("o")
$sourceCommit = (& git -C $root rev-parse HEAD).Trim()
$records = [System.Collections.Generic.List[object]]::new()

try {
  foreach ($item in $planRecords) {
    $voice = $plan.voice_variants.($item.speaker_variant)
    $fileStem = (($item.logical_id -replace "[^A-Za-z0-9._-]", "_").ToLowerInvariant())
    $rawPath = Join-Path $tempRoot "$fileStem.raw.wav"
    $masterPath = Join-Path $masterRoot "$fileStem.wav"
    $deliveryPath = Join-Path $deliveryRoot "$fileStem.wav"

    $synth.SelectVoice([string]$voice.voice_name)
    $synth.Rate = 0
    $synth.Volume = 100
    $synth.SetOutputToWaveFile($rawPath, $format)
    $synth.Speak([string]$item.japanese_text)
    $synth.SetOutputToNull()

    Invoke-Ffmpeg @(
      "-y", "-hide_banner", "-loglevel", "error", "-i", $rawPath,
      "-ar", "48000", "-ac", "1", "-c:a", "pcm_s24le", $masterPath
    )
    Invoke-Ffmpeg @(
      "-y", "-hide_banner", "-loglevel", "error", "-i", $rawPath,
      "-ar", "48000", "-ac", "1", "-c:a", "pcm_s16le", $deliveryPath
    )

    $masterHash = (Get-FileHash -Algorithm SHA256 -LiteralPath $masterPath).Hash.ToLowerInvariant()
    $deliveryHash = (Get-FileHash -Algorithm SHA256 -LiteralPath $deliveryPath).Hash.ToLowerInvariant()
    $masterFormat = Get-AudioFormat $masterPath
    $deliveryFormat = Get-AudioFormat $deliveryPath
    $loudness = Get-Loudness $masterPath

    $transcriptRelease = if ($item.evidence_policy -eq "non_scored") {
      "immediate_instructional"
    } else {
      "after_submission_or_feedback"
    }
    $records.Add([ordered]@{
        asset_id = [string]$item.asset_id
        logical_id = [string]$item.logical_id
        group = [string]$item.group
        speaker_variant = [string]$item.speaker_variant
        japanese_text = [string]$item.japanese_text
        transcript_internal = [string]$item.transcript_internal
        evidence_policy = [string]$item.evidence_policy
        source_type = "local_system_tts"
        generation_tool = "System.Speech"
        voice_provider = "Microsoft Windows installed voice"
        voice_id = [string]$voice.voice_id
        voice_name = [string]$voice.voice_name
        culture = "ja-JP"
        generated_at = $generatedAt
        master_file = [ordered]@{
          path = Get-RepoPath $masterPath
          sha256 = "sha256:$masterHash"
          format = $masterFormat
        }
        delivery_file = [ordered]@{
          path = Get-RepoPath $deliveryPath
          sha256 = "sha256:$deliveryHash"
          format = $deliveryFormat
        }
        audio_qa = [ordered]@{
          status = [string]$loudness.measurement_status
          loudness_lufs = $loudness.loudness_lufs
          true_peak_dbtp = $loudness.true_peak_dbtp
          clipping_check = "not_tested"
          noise_check = "not_tested"
          device_playback_check = "not_tested"
        }
        accessibility = [ordered]@{
          accessible_label = "Audio target U01-L1, speaker $($item.speaker_variant), belum diputar"
          transcript_release = $transcriptRelease
          failure_behavior = "retry_or_approved_replacement_or_technical_skip"
          alternative_classification = "support_adjusted"
          status = "not_tested"
        }
        rights = [ordered]@{
          status = "pending_verification"
          allowed_use = "local_only"
          redistribution = "prohibited"
          rights_receipt_id = $null
          consent_release_ref = $null
          license_ref = $null
          attribution = "Microsoft Windows installed voice; local-only scope pending EULA review"
        }
        review = [ordered]@{
          academic = "pending"
          linguistic = "pending"
          audio = "pending"
          rights = "pending"
          accessibility = "pending"
          technical = "pending"
        }
      })
  }
} finally {
  $synth.SetOutputToNull()
  $synth.Dispose()
  Remove-Item -LiteralPath $tempRoot -Recurse -Force -ErrorAction SilentlyContinue
}

$manifest = [ordered]@{
  schema_version = 1
  manifest_id = "MANIFEST.N5.S00.U01.L1.AUDIO.DRAFT"
  status = "draft"
  runtime_eligible = $false
  source_plan = Get-RepoPath $planPath
  source_seed_version = [string]$seed.version
  source_seed_commit = $sourceCommit
  generated_at = $generatedAt
  distribution_scope = "local_only"
  binary_policy = "never_commit_or_redistribute"
  generation_environment = [ordered]@{
    os = [System.Environment]::OSVersion.VersionString
    powershell = $PSVersionTable.PSVersion.ToString()
    ffmpeg = ((ffmpeg -version 2>$null | Select-Object -First 1) -replace "^ffmpeg version ", "")
  }
  records = @($records)
  rights_status = "pending_verification"
  approval_status = "pending"
  blockers = @(
    "Local-only dipilih; bukti EULA/rights untuk penggunaan pada workstation belum dilampirkan.",
    "Binary audio tidak boleh masuk repository publik atau artifact redistribution.",
    "Loudness, clipping, noise, dan physical-device playback QA belum dilakukan.",
    "Japanese Linguistic/Academic review belum dilakukan.",
    "Accessibility review dan approved alternative belum dilakukan.",
    "Rights receipt dan approval receipt belum tersedia."
  )
  publication_note = "Draft local-only. Binary audio sengaja di-ignore oleh Git dan tidak boleh dipublikasikan. Jangan ubah seed menjadi approved atau runtime_eligible sebelum seluruh mandatory gate dan receipt menunjuk exact hash/version."
}
$utf8NoBom = New-Object System.Text.UTF8Encoding($false)
[IO.File]::WriteAllText($manifestPath, (($manifest | ConvertTo-Json -Depth 30) + [Environment]::NewLine), $utf8NoBom)
Write-Output "Generated $($records.Count) local-only draft audio assets and $manifestPath"
