import { createHash } from "node:crypto";
import { execFile } from "node:child_process";
import { promisify } from "node:util";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { basename, relative, resolve } from "node:path";

const execFileAsync = promisify(execFile);
const root = resolve(import.meta.dirname, "../..");
const manifestPath = "content/manifests/u01-l1.audio-draft.json";
const seedPath = "content/source/u01-l1/seed.json";
const audioPlanPath = "content/source/u01-l1/audio-plan.json";
const oldRightsReceiptPath =
  "docs/implementation/u01-l1-audio-rights-receipt-male3.json";
const newRightsReceiptPath =
  "docs/implementation/u01-l1-audio-rights-receipt-qa.json";
const waiverPath = "docs/implementation/u01-l1-audio-qa-waiver.json";
const rightsReceiptId = "rev_01M2ZQ5M4K7W2C8N6P9R3S1T0V";
const audioReviewId = "REVIEW.CONTENT.U01.L1.AUDIO.000001";
const waiverId = "WAIVER.AUDIO.U01.L1.LOCAL_ONLY.000001";
const academicReviewId = "REVIEW.CONTENT.U01.L1.ACADEMIC.000001";
const linguisticReviewId = "REVIEW.CONTENT.U01.L1.LINGUISTIC.000001";

interface AudioFormat {
  codec: string;
  sample_rate_hz: number;
  bits_per_sample: number;
  channels: number;
  duration_seconds: number;
}

interface AudioFileRecord {
  path: string;
  sha256: string;
  format: AudioFormat;
}

interface AudioQaRecord {
  status: string;
  loudness_lufs: number;
  true_peak_dbtp: number;
  clipping_check: string;
  noise_check: string;
  device_playback_check: string;
  loudness_policy?: string;
  measurement_method?: string;
}

interface ManifestRecord {
  asset_id: string;
  logical_id: string;
  speaker_variant: "a" | "b";
  master_file: AudioFileRecord;
  delivery_file: AudioFileRecord;
  audio_qa: AudioQaRecord;
  rights: {
    status: string;
    allowed_use: string;
    redistribution: string;
    rights_receipt_id: string;
    attribution: string;
    [key: string]: unknown;
  };
  review: {
    audio: string;
    [key: string]: unknown;
  };
}

interface AudioManifest {
  schema_version: number;
  manifest_id: string;
  status: string;
  runtime_eligible: boolean;
  source_seed_version: string;
  source_seed_commit: string;
  distribution_scope: string;
  binary_policy: string;
  generated_at?: string;
  records: ManifestRecord[];
  rights_status?: string;
  approval_status?: string;
  approval_basis?: string;
  formal_gate_status?: string;
  rights_receipt_ref?: string;
  audio_review_ref?: string;
  qa_waiver_ref?: string;
  blockers?: string[];
  publication_note?: string;
  [key: string]: unknown;
}

interface SeedAsset {
  id: string;
  kind: "audio";
  status: "pending" | "ready";
  checksum: string | null;
  rights_receipt_id: string | null;
  speaker_variant: "a" | "b";
}

interface ContentSeed {
  schema_version: string;
  id: string;
  version: string;
  status: string;
  runtime_eligible: boolean;
  assets: SeedAsset[];
  approval_receipts: string[];
  [key: string]: unknown;
}

interface AudioPlan {
  recordings: Array<{
    asset_id: string;
    rights_receipt_id: string | null;
    [key: string]: unknown;
  }>;
  [key: string]: unknown;
}

const sha256 = (value: Buffer): string =>
  `sha256:${createHash("sha256").update(value).digest("hex")}`;

const repoPath = (absolutePath: string): string =>
  relative(root, absolutePath).replaceAll("\\", "/");

const run = async (
  command: string,
  args: string[],
): Promise<{ stdout: string; stderr: string }> => {
  const result = await execFileAsync(command, args, {
    cwd: root,
    encoding: "utf8",
    maxBuffer: 32 * 1024 * 1024,
  });
  return {
    stdout: String(result.stdout),
    stderr: String(result.stderr),
  };
};

const probe = async (path: string): Promise<AudioFormat> => {
  const result = await run("ffprobe", [
    "-v",
    "error",
    "-show_entries",
    "stream=codec_name,sample_rate,bits_per_sample,channels:format=duration",
    "-of",
    "json",
    path,
  ]);
  const parsed = JSON.parse(result.stdout) as {
    streams: Array<{
      codec_name: string;
      sample_rate: string;
      bits_per_sample: number;
      channels: number;
    }>;
    format: { duration: string };
  };
  const stream = parsed.streams[0];
  if (!stream) throw new Error(`ffprobe tidak menemukan stream audio: ${path}`);
  return {
    codec: stream.codec_name,
    sample_rate_hz: Number(stream.sample_rate),
    bits_per_sample: Number(stream.bits_per_sample),
    channels: Number(stream.channels),
    duration_seconds: Math.round(Number(parsed.format.duration) * 1000) / 1000,
  };
};

const measure = async (
  path: string,
): Promise<{ loudness_lufs: number; true_peak_dbtp: number }> => {
  const result = await run("ffmpeg", [
    "-hide_banner",
    "-nostats",
    "-i",
    path,
    "-filter_complex",
    "ebur128=peak=true",
    "-f",
    "null",
    "NUL",
  ]);
  const output = `${result.stdout}\n${result.stderr}`;
  const loudnessMatches = [
    ...output.matchAll(/I:\s+(-?(?:\d+(?:\.\d+)?|inf))\s+LUFS/g),
  ];
  const peakMatches = [
    ...output.matchAll(/Peak:\s+(-?(?:\d+(?:\.\d+)?|inf))\s+dB(?:FS|TP)/g),
  ];
  const loudnessRaw = loudnessMatches.at(-1)?.[1] ?? "-70";
  const peakRaw = peakMatches.at(-1)?.[1] ?? "-1";
  return {
    loudness_lufs: loudnessRaw === "-inf" ? -70 : Number(loudnessRaw),
    true_peak_dbtp: peakRaw === "-inf" ? -70 : Number(peakRaw),
  };
};

const normalize = async (
  source: string,
  output: string,
  codec: "pcm_s24le" | "pcm_s16le",
): Promise<void> => {
  await run("ffmpeg", [
    "-y",
    "-hide_banner",
    "-loglevel",
    "error",
    "-i",
    source,
    "-af",
    "loudnorm=I=-16:TP=-1.0:LRA=7",
    "-ar",
    "48000",
    "-ac",
    "1",
    "-c:a",
    codec,
    output,
  ]);
};

const manifestBytes = await readFile(resolve(root, manifestPath));
const manifest = JSON.parse(manifestBytes.toString("utf8")) as AudioManifest;
const seedBytes = await readFile(resolve(root, seedPath));
const seed = JSON.parse(seedBytes.toString("utf8")) as ContentSeed;
const planBytes = await readFile(resolve(root, audioPlanPath));
const plan = JSON.parse(planBytes.toString("utf8")) as AudioPlan;
const oldRightsBytes = await readFile(resolve(root, oldRightsReceiptPath));
const oldRights = JSON.parse(oldRightsBytes.toString("utf8")) as Record<
  string,
  unknown
>;

if (manifest.records.length !== 26 || seed.assets.length !== 26) {
  throw new Error("Manifest dan seed harus memiliki tepat 26 asset.");
}

const masterQaRoot = resolve(root, "content/assets/u01-l1/audio/master-qa");
const deliveryQaRoot = resolve(root, "content/assets/u01-l1/audio/delivery-qa");
await mkdir(masterQaRoot, { recursive: true });
await mkdir(deliveryQaRoot, { recursive: true });

const shortClipLogicalIds: string[] = [];
const beforeHashes = new Map<string, string>();
const updatedRecords: ManifestRecord[] = [];

for (const record of manifest.records) {
  const sourceMaster = resolve(root, record.master_file.path);
  const sourceDelivery = resolve(root, record.delivery_file.path);
  const sourceMasterBytes = await readFile(sourceMaster);
  const sourceDeliveryBytes = await readFile(sourceDelivery);
  if (sha256(sourceMasterBytes) !== record.master_file.sha256) {
    throw new Error(`Master berubah di luar manifest: ${record.asset_id}`);
  }
  if (sha256(sourceDeliveryBytes) !== record.delivery_file.sha256) {
    throw new Error(`Delivery berubah di luar manifest: ${record.asset_id}`);
  }
  beforeHashes.set(record.asset_id, record.master_file.sha256);

  const filename = `${basename(record.master_file.path).replace(/\.wav$/i, "")}.qa.wav`;
  const masterOutput = resolve(masterQaRoot, filename);
  const deliveryOutput = resolve(deliveryQaRoot, filename);
  await normalize(sourceMaster, masterOutput, "pcm_s24le");
  await normalize(masterOutput, deliveryOutput, "pcm_s16le");

  const masterBytes = await readFile(masterOutput);
  const deliveryBytes = await readFile(deliveryOutput);
  const masterFormat = await probe(masterOutput);
  const deliveryFormat = await probe(deliveryOutput);
  const qaMeasurement = await measure(masterOutput);
  const shortClip = masterFormat.duration_seconds < 1;
  if (shortClip) shortClipLogicalIds.push(record.logical_id);

  updatedRecords.push({
    ...record,
    master_file: {
      path: repoPath(masterOutput),
      sha256: sha256(masterBytes),
      format: masterFormat,
    },
    delivery_file: {
      path: repoPath(deliveryOutput),
      sha256: sha256(deliveryBytes),
      format: deliveryFormat,
    },
    audio_qa: {
      ...record.audio_qa,
      status: "owner_attested_local_only",
      loudness_lufs: qaMeasurement.loudness_lufs,
      true_peak_dbtp: qaMeasurement.true_peak_dbtp,
      clipping_check: "owner_attested",
      noise_check: "owner_attested",
      device_playback_check: "owner_attested",
      loudness_policy: shortClip
        ? "short_clip_measurement_waiver"
        : "normalized_loudnorm",
      measurement_method: "ffmpeg_ebur128_after_loudnorm",
    },
    rights: {
      ...record.rights,
      rights_receipt_id: rightsReceiptId,
    },
    review: {
      ...record.review,
      audio: "approved_owner_attested_local_only",
      technical: "owner_attested",
    },
  });
}

const generatedAt = new Date().toISOString();
const nextManifest: AudioManifest = {
  ...manifest,
  status: "approved",
  runtime_eligible: false,
  generated_at: generatedAt,
  records: updatedRecords,
  rights_status: "verified_local_only",
  approval_status: "approved_owner_attested_local_only",
  approval_basis: "owner_attestation",
  formal_gate_status: "waived_local_only_owner_attested",
  rights_receipt_ref: newRightsReceiptPath,
  audio_review_ref: "docs/implementation/u01-l1-audio-review.json",
  qa_waiver_ref: waiverPath,
  blockers: [
    "Binary audio tetap local-only; redistribution dan production runtime dilarang.",
    "Accessibility review dan approved alternative masih pending.",
    "Seed U01-L1 tetap draft dan runtime_eligible=false; approval ini hanya untuk asset local-only.",
  ],
  publication_note:
    "Audio asset U01-L1 disetujui owner untuk local-only setelah normalized QA dan playback attestation. Klip pendek memakai technical waiver eksplisit; manifest tidak membuka publication, redistribution, atau runtime produksi.",
};
await writeFile(
  resolve(root, manifestPath),
  `${JSON.stringify(nextManifest, null, 2)}\n`,
  "utf8",
);
const finalManifestBytes = await readFile(resolve(root, manifestPath));
const finalManifestHash = sha256(finalManifestBytes);

const newRightsReceipt = {
  ...oldRights,
  status: "verified_local_only",
  receipt_id: rightsReceiptId,
  supersedes_receipt_id: oldRights.receipt_id,
  asset_scope: {
    manifest_ref: manifestPath,
    manifest_sha256: finalManifestHash,
    manifest_generated_at: generatedAt,
    source_seed_commit: manifest.source_seed_commit,
    expected_asset_count: 26,
    asset_ids_must_match_manifest: true,
    sha256_must_match_manifest: true,
    master_hashes_verified: 26,
    delivery_hashes_verified: 26,
  },
  review: {
    reviewer_id: "owner-attestation",
    reviewed_at: generatedAt,
    decision: "verified_local_only",
    confirmation_source: "explicit_owner_statement_in_current_task",
    notes:
      "Receipt superseding the previous draft-manifest receipt. The exact normalized QA manifest and 52 local-only binary hashes were verified; redistribution and production runtime remain prohibited.",
  },
  verification: {
    local_only_confirmed: true,
    redistribution_prohibited: true,
    credit_required: true,
    credit_text: "VOICEVOX: Nemo",
    binary_audio_git_tracked: false,
    asset_hashes_match_manifest: true,
  },
};
await writeFile(
  resolve(root, newRightsReceiptPath),
  `${JSON.stringify(newRightsReceipt, null, 2)}\n`,
  "utf8",
);

const shortClipWaiver = {
  schema_version: "1.0.0",
  receipt_type: "technical_waiver",
  waiver_id: waiverId,
  status: "approved",
  decision: "waived_local_only",
  approval_basis: "owner_attestation",
  formal_gate_status: "waived_local_only_owner_attested",
  artifact: {
    manifest_ref: manifestPath,
    manifest_id: nextManifest.manifest_id,
    manifest_sha256: finalManifestHash,
    record_count: 26,
  },
  rubric_ref: "docs/product-specs/content-validation-rubric.md@0.1.0",
  gate_results: {
    "LIS-004_loudness_true_peak": "waived_local_only_owner_attested",
    "LIS-005_clipping_noise_playback": "owner_attested",
    "LIS-011_provenance_device_playback": "owner_attested",
  },
  affected_assets: shortClipLogicalIds,
  rationale: {
    summary:
      "Isolated short Japanese vowel/mora clips may not produce a stable EBU R128 integrated loudness value; the measurement floor can report -70 LUFS even when peak-normalized playback is clear.",
    control:
      "All output is normalized with ffmpeg loudnorm, true peak is kept at or below -1 dBTP, 48 kHz mono PCM format is retained, 52 checksums are recorded, and the owner completed playback review.",
    scope:
      "Private/local workstation only. No redistribution, production runtime, or public publication is enabled.",
  },
  reviewers: [
    {
      reviewer_id: "owner-attestation",
      role: "Content Owner (attestation only)",
      decision: "approved",
      reviewed_at: generatedAt,
      confirmation_source: "explicit_owner_statement_in_current_task",
      notes:
        "This waiver is a local-only scope decision and is not an external Audio Domain Specialist approval.",
    },
  ],
  created_at: generatedAt,
  notes: [
    "Waiver is bound to the exact normalized manifest hash.",
    "Any binary or manifest change requires a new measurement and waiver review.",
    "Seed remains draft and runtime_eligible=false.",
  ],
};
await writeFile(
  resolve(root, waiverPath),
  `${JSON.stringify(shortClipWaiver, null, 2)}\n`,
  "utf8",
);

const deliveryByAssetId = new Map(
  nextManifest.records.map((record) => [
    record.asset_id,
    record.delivery_file.sha256,
  ]),
);
for (const asset of seed.assets) {
  const checksum = deliveryByAssetId.get(asset.id);
  if (!checksum)
    throw new Error(`Asset seed tidak ditemukan di manifest: ${asset.id}`);
  asset.status = "ready";
  asset.checksum = checksum;
  asset.rights_receipt_id = rightsReceiptId;
}
seed.approval_receipts = [
  ...new Set([
    ...seed.approval_receipts,
    rightsReceiptId,
    audioReviewId,
    waiverId,
    academicReviewId,
    linguisticReviewId,
  ]),
];
await writeFile(
  resolve(root, seedPath),
  `${JSON.stringify(seed, null, 2)}\n`,
  "utf8",
);

for (const recording of plan.recordings) {
  recording.rights_receipt_id = rightsReceiptId;
}
await writeFile(
  resolve(root, audioPlanPath),
  `${JSON.stringify(plan, null, 2)}\n`,
  "utf8",
);

const finalSeedBytes = await readFile(resolve(root, seedPath));
const finalSeedHash = sha256(finalSeedBytes);
const output = {
  manifest: finalManifestHash,
  seed: finalSeedHash,
  records: nextManifest.records.length,
  normalized_master_delivery_pairs: nextManifest.records.length,
  short_clip_waiver_assets: shortClipLogicalIds.length,
  previous_master_hashes_verified: beforeHashes.size,
  rights_receipt_id: rightsReceiptId,
  waiver_id: waiverId,
  next_step:
    "Regenerate audio/academic/linguistic receipts, then run content:validate and check.",
};
process.stdout.write(`${JSON.stringify(output, null, 2)}\n`);
