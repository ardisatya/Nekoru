[CmdletBinding()]
param(
  [switch]$Force,
  [string]$VoicevoxBaseUrl = ""
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
$httpClient = $null

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

function Get-HttpMethod([string]$method) {
  if ($method -eq "GET") { return [System.Net.Http.HttpMethod]::Get }
  if ($method -eq "POST") { return [System.Net.Http.HttpMethod]::Post }
  throw "HTTP method $method belum didukung oleh generator."
}

function Invoke-VoicevoxRequest([string]$method, [string]$uri, [string]$body, [string]$contentType) {
  $request = [System.Net.Http.HttpRequestMessage]::new((Get-HttpMethod $method), $uri)
  if ($null -ne $body) {
    $request.Content = [System.Net.Http.StringContent]::new($body, [Text.Encoding]::UTF8, $contentType)
  }
  try {
    $response = $httpClient.SendAsync($request).GetAwaiter().GetResult()
    try {
      $responseBody = $response.Content.ReadAsStringAsync().GetAwaiter().GetResult()
      if (-not $response.IsSuccessStatusCode) {
        throw "VOICEVOX API $method $uri gagal ($([int]$response.StatusCode)): $responseBody"
      }
      return $responseBody
    } finally {
      $response.Dispose()
    }
  } finally {
    $request.Dispose()
  }
}

function Invoke-VoicevoxJson([string]$method, [string]$uri, [string]$body, [string]$contentType = "application/json") {
  $responseBody = Invoke-VoicevoxRequest $method $uri $body $contentType
  if ([string]::IsNullOrWhiteSpace($responseBody)) {
    throw "VOICEVOX API $method $uri mengembalikan body kosong."
  }
  return $responseBody | ConvertFrom-Json
}

function Invoke-VoicevoxBinary([string]$uri, [string]$body, [string]$outputPath) {
  $request = [System.Net.Http.HttpRequestMessage]::new([System.Net.Http.HttpMethod]::Post, $uri)
  $request.Content = [System.Net.Http.StringContent]::new($body, [Text.Encoding]::UTF8, "application/json")
  try {
    $response = $httpClient.SendAsync($request).GetAwaiter().GetResult()
    try {
      if (-not $response.IsSuccessStatusCode) {
        $errorBody = $response.Content.ReadAsStringAsync().GetAwaiter().GetResult()
        throw "VOICEVOX synthesis $uri gagal ($([int]$response.StatusCode)): $errorBody"
      }
      $bytes = $response.Content.ReadAsByteArrayAsync().GetAwaiter().GetResult()
      if ($bytes.Length -lt 44) {
        throw "VOICEVOX synthesis mengembalikan audio WAV terlalu kecil ($($bytes.Length) bytes)."
      }
      [IO.File]::WriteAllBytes($outputPath, $bytes)
    } finally {
      $response.Dispose()
    }
  } finally {
    $request.Dispose()
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
if ([string]$plan.generation_profile.provider -ne "voicevox_nemo_engine") {
  throw "Audio plan harus memakai generation_profile.provider=voicevox_nemo_engine."
}
$rightsStatus = if ([string]::IsNullOrWhiteSpace([string]$plan.rights_status)) {
  "pending_verification"
} else {
  [string]$plan.rights_status
}

$baseUrl = if (-not [string]::IsNullOrWhiteSpace($VoicevoxBaseUrl)) {
  $VoicevoxBaseUrl
} elseif (-not [string]::IsNullOrWhiteSpace($env:NEKORU_VOICEVOX_URL)) {
  $env:NEKORU_VOICEVOX_URL
} else {
  [string]$plan.generation_profile.api_base_url
}
$baseUrl = $baseUrl.TrimEnd("/")
if ([string]::IsNullOrWhiteSpace($baseUrl)) {
  throw "VOICEVOX base URL belum dikonfigurasi."
}

Add-Type -AssemblyName System.Net.Http
$httpClient = [System.Net.Http.HttpClient]::new()
$httpClient.Timeout = [TimeSpan]::FromMinutes(5)

try {
  $engineVersion = [string](Invoke-VoicevoxRequest "GET" "$baseUrl/version" $null "application/json").Trim('"', "`r", "`n", " ")
  $expectedEngineVersion = [string]$plan.generation_profile.engine_version
  if ($engineVersion -ne $expectedEngineVersion) {
    throw "Versi VOICEVOX Engine tidak cocok. Diharapkan $expectedEngineVersion, ditemukan $engineVersion."
  }

  $speakers = @(Invoke-VoicevoxJson "GET" "$baseUrl/speakers" $null)
  $speakerIndex = @{}
  foreach ($speaker in $speakers) {
    foreach ($style in @($speaker.styles)) {
      $speakerIndex[[string]$style.id] = [ordered]@{
        speaker_uuid = [string]$speaker.speaker_uuid
        speaker_name = [string]$speaker.name
        style_name = [string]$style.name
        style_id = [int]$style.id
      }
    }
  }

  foreach ($variantKey in @("a", "b")) {
    $voice = $plan.voice_variants.$variantKey
    $voiceId = [int]$voice.voice_id
    $key = [string]$voiceId
    if (-not $speakerIndex.ContainsKey($key)) {
      throw "VOICEVOX speaker/style id $voiceId untuk variant $variantKey tidak tersedia pada engine $engineVersion."
    }
    $available = $speakerIndex[$key]
    if ([string]$voice.speaker_uuid -ne [string]$available.speaker_uuid -or [string]$voice.style_name -ne [string]$available.style_name) {
      throw "Metadata speaker variant $variantKey tidak cocok dengan /speakers."
    }
  }

  $generatedAt = (Get-Date).ToString("o")
  $sourceCommit = (& git -C $root rev-parse HEAD).Trim()
  $records = [System.Collections.Generic.List[object]]::new()

  foreach ($item in $planRecords) {
    $voice = $plan.voice_variants.([string]$item.speaker_variant)
    $voiceId = [int]$voice.voice_id
    $receiptId = if ($null -ne $item.rights_receipt_id -and -not [string]::IsNullOrWhiteSpace([string]$item.rights_receipt_id)) {
      [string]$item.rights_receipt_id
    } else {
      $null
    }
    $fileStem = (($item.logical_id -replace "[^A-Za-z0-9._-]", "_").ToLowerInvariant())
    $rawPath = Join-Path $tempRoot "$fileStem.raw.wav"
    $masterPath = Join-Path $masterRoot "$fileStem.wav"
    $deliveryPath = Join-Path $deliveryRoot "$fileStem.wav"
    $encodedText = [System.Net.WebUtility]::UrlEncode([string]$item.japanese_text)
    $queryUri = "$baseUrl/audio_query?speaker=$voiceId&text=$encodedText"
    $query = Invoke-VoicevoxJson "POST" $queryUri $null
    $queryJson = $query | ConvertTo-Json -Depth 30 -Compress
    Invoke-VoicevoxBinary "$baseUrl/synthesis?speaker=$voiceId" $queryJson $rawPath

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
        source_type = "voicevox_generated_audio"
        generation_tool = "VOICEVOX Engine HTTP API"
        voice_provider = "VOICEVOX Nemo"
        engine_version = $engineVersion
        voice_id = $voiceId
        voice_name = [string]$voice.voice_name
        speaker_uuid = [string]$voice.speaker_uuid
        style_name = [string]$voice.style_name
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
          accessible_label = "Audio target U01-L1, $($voice.voice_name) / $($voice.style_name), belum diputar"
          transcript_release = $transcriptRelease
          failure_behavior = "retry_or_approved_replacement_or_technical_skip"
          alternative_classification = "support_adjusted"
          status = "not_tested"
        }
        rights = [ordered]@{
          status = $rightsStatus
          allowed_use = "local_only"
          redistribution = "prohibited"
          rights_receipt_id = $receiptId
          consent_release_ref = $null
          license_ref = [string]$voice.license_ref
          attribution = [string]$voice.attribution
          evidence_note = if ($rightsStatus -eq "verified_local_only") {
            "VOICEVOX Nemo Terms, attribution, engine/speaker metadata, dan exact audio hashes telah diverifikasi melalui owner attestation."
          } else {
            "VOICEVOX Nemo Terms berlaku sebagai source reference; exact hash receipt dan review masih pending."
          }
        }
        review = [ordered]@{
          academic = "pending"
          linguistic = "pending"
          audio = "pending"
          rights = if ($rightsStatus -eq "verified_local_only") { "verified_local_only" } else { "pending" }
          accessibility = "pending"
          technical = "pending"
        }
      })
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
      voicevox_engine = $engineVersion
      voicevox_api_base_url = $baseUrl
    }
    records = @($records)
    rights_status = $rightsStatus
    approval_status = "pending"
    blockers = @(
      if ($rightsStatus -ne "verified_local_only") {
        "VOICEVOX Nemo dipilih; exact rights receipt dan review terms/attribution belum tersedia."
      }
      "Binary audio tidak boleh masuk repository publik atau artifact redistribution.",
      "Loudness, clipping, noise, dan physical-device playback QA belum dilakukan.",
      "Japanese Linguistic/Academic review belum dilakukan.",
      "Accessibility review dan approved alternative belum dilakukan.",
      "Approval receipt dan publication gate belum tersedia."
    )
    publication_note = "Draft local-only menggunakan VOICEVOX Nemo Engine $engineVersion. Binary audio sengaja di-ignore oleh Git dan tidak boleh dipublikasikan. Attribution wajib: VOICEVOX: Nemo. Jangan ubah seed menjadi approved atau runtime_eligible sebelum seluruh mandatory gate dan receipt menunjuk exact hash/version."
  }
  $utf8NoBom = New-Object System.Text.UTF8Encoding($false)
  [IO.File]::WriteAllText($manifestPath, (($manifest | ConvertTo-Json -Depth 40) + [Environment]::NewLine), $utf8NoBom)
  Write-Output "Generated $($records.Count) VOICEVOX Nemo local-only draft audio assets and $manifestPath"
} finally {
  if ($null -ne $httpClient) {
    $httpClient.Dispose()
  }
  Remove-Item -LiteralPath $tempRoot -Recurse -Force -ErrorAction SilentlyContinue
}
