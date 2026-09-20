import { createHash } from "node:crypto";
import { readFile, writeFile } from "node:fs/promises";
import { isAbsolute, resolve } from "node:path";

type ReviewStatus = "pass" | "fail" | "owner_attested" | "not_tested";

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

interface RightsRecord {
  status: string;
  allowed_use: string;
  redistribution: string;
  rights_receipt_id: string;
  attribution: string;
}

interface ManifestRecord {
  asset_id: string;
  logical_id: string;
  group: "vowel" | "greeting" | "mora" | "instruction";
  speaker_variant: "a" | "b";
  japanese_text: string;
  transcript_internal: string;
  voice_provider: string;
  voice_id: number;
  voice_name: string;
  speaker_uuid: string;
  style_name: string;
  master_file: AudioFileRecord;
  delivery_file: AudioFileRecord;
  audio_qa: AudioQaRecord;
  rights: RightsRecord;
  review: {
    audio: string;
  };
}

interface AudioManifest {
  schema_version: number;
  manifest_id: string;
  status: string;
  runtime_eligible: boolean;
  source_plan: string;
  source_seed_version: string;
  source_seed_commit: string;
  distribution_scope: string;
  binary_policy: string;
  approval_status?: string;
  approval_basis?: string;
  formal_gate_status?: string;
  rights_receipt_ref?: string;
  qa_waiver_ref?: string;
  records: ManifestRecord[];
}

interface RightsReceipt {
  receipt_id: string;
  status: string;
  asset_scope: {
    manifest_sha256: string;
    expected_asset_count: number;
    master_hashes_verified: number;
    delivery_hashes_verified: number;
  };
  use_scope: {
    allowed_use: string;
    redistribution: boolean;
    repository_distribution: boolean;
    production_runtime: boolean;
  };
  verification: {
    asset_hashes_match_manifest: boolean;
    binary_audio_git_tracked: boolean;
  };
}

interface CheckResult {
  id: string;
  criterion: string;
  status: ReviewStatus;
  evidence: string;
}

interface WavMetadata {
  codec: "pcm_s16le" | "pcm_s24le" | "unknown";
  sample_rate_hz: number;
  bits_per_sample: number;
  channels: number;
}

const root = resolve(import.meta.dirname, "../..");
const manifestPath = "content/manifests/u01-l1.audio-draft.json";
const defaultRightsReceiptPath =
  "docs/implementation/u01-l1-audio-rights-receipt-qa.json";
const outputPath = "docs/implementation/u01-l1-audio-review.json";
const ownerAttestation = process.argv.includes("--record-owner-attestation");

const sha256 = (value: Buffer): string =>
  `sha256:${createHash("sha256").update(value).digest("hex")}`;

const manifestBytes = await readFile(resolve(root, manifestPath));
const manifest = JSON.parse(manifestBytes.toString("utf8")) as AudioManifest;
const manifestSha256 = sha256(manifestBytes);
const rightsReceiptPath =
  manifest.rights_receipt_ref ?? defaultRightsReceiptPath;
const expectedRightsReceiptId =
  manifest.records[0]?.rights.rights_receipt_id ??
  "rev_01M2ZE9SH7617GK0S9DF4FJAER";
const rightsReceiptBytes = await readFile(resolve(root, rightsReceiptPath));
const rightsReceipt = JSON.parse(
  rightsReceiptBytes.toString("utf8"),
) as RightsReceipt;
const checks: CheckResult[] = [];

const addCheck = (
  id: string,
  criterion: string,
  condition: boolean,
  evidence: string,
): void => {
  checks.push({
    id,
    criterion,
    status: condition ? "pass" : "fail",
    evidence,
  });
};

const addStatusCheck = (
  id: string,
  criterion: string,
  status: ReviewStatus,
  evidence: string,
): void => {
  checks.push({ id, criterion, status, evidence });
};

addCheck(
  "AQA-001",
  "Manifest audio adalah snapshot U01-L1 local-only yang tepat.",
  manifest.schema_version === 1 &&
    manifest.manifest_id === "MANIFEST.N5.S00.U01.L1.AUDIO.DRAFT" &&
    (manifest.status === "draft" || manifest.status === "approved") &&
    manifest.runtime_eligible === false &&
    manifest.distribution_scope === "local_only" &&
    manifest.binary_policy === "never_commit_or_redistribute",
  `${manifest.manifest_id}@${manifest.source_seed_version}; runtime_eligible=${String(manifest.runtime_eligible)}; distribution_scope=${manifest.distribution_scope}`,
);

const uniqueAssetIds = new Set(
  manifest.records.map((record) => record.asset_id),
);
const uniqueLogicalIds = new Set(
  manifest.records.map((record) => record.logical_id),
);
addCheck(
  "AQA-002",
  "Seluruh 26 audio asset memiliki ID unik dan pasangan master/delivery.",
  manifest.records.length === 26 &&
    uniqueAssetIds.size === manifest.records.length &&
    uniqueLogicalIds.size === manifest.records.length &&
    manifest.records.every(
      (record) =>
        record.master_file.path.length > 0 &&
        record.delivery_file.path.length > 0 &&
        record.master_file.sha256.length > 0 &&
        record.delivery_file.sha256.length > 0,
    ),
  `records=${String(manifest.records.length)}; unique asset_id=${String(uniqueAssetIds.size)}; unique logical_id=${String(uniqueLogicalIds.size)}`,
);

const validChecksum = (value: string): boolean =>
  /^sha256:[0-9a-f]{64}$/.test(value);
const metadataComplete = manifest.records.every((record) => {
  const master = record.master_file.format;
  const delivery = record.delivery_file.format;
  return (
    validChecksum(record.master_file.sha256) &&
    validChecksum(record.delivery_file.sha256) &&
    master.codec === "pcm_s24le" &&
    master.sample_rate_hz === 48000 &&
    master.bits_per_sample === 24 &&
    master.channels === 1 &&
    delivery.codec === "pcm_s16le" &&
    delivery.sample_rate_hz === 48000 &&
    delivery.bits_per_sample === 16 &&
    delivery.channels === 1
  );
});
addCheck(
  "AQA-003",
  "Metadata format dan checksum setiap master/delivery lengkap.",
  metadataComplete,
  "master=PCM 24-bit/48 kHz/mono; delivery=PCM 16-bit/48 kHz/mono; checksum format SHA-256",
);

interface BinaryEvidence {
  hashMismatches: string[];
  formatMismatches: string[];
}

const parseWav = (bytes: Buffer): WavMetadata | null => {
  if (
    bytes.length < 12 ||
    bytes.toString("ascii", 0, 4) !== "RIFF" ||
    bytes.toString("ascii", 8, 12) !== "WAVE"
  ) {
    return null;
  }

  let cursor = 12;
  let audioFormat: number | undefined;
  let channels: number | undefined;
  let sampleRate: number | undefined;
  let bitsPerSample: number | undefined;
  let extensiblePcm = false;
  while (cursor + 8 <= bytes.length) {
    const chunkId = bytes.toString("ascii", cursor, cursor + 4);
    const chunkSize = bytes.readUInt32LE(cursor + 4);
    const chunkStart = cursor + 8;
    const chunkEnd = chunkStart + chunkSize;
    if (chunkEnd > bytes.length) return null;
    if (chunkId === "fmt " && chunkSize >= 16) {
      audioFormat = bytes.readUInt16LE(chunkStart);
      channels = bytes.readUInt16LE(chunkStart + 2);
      sampleRate = bytes.readUInt32LE(chunkStart + 4);
      bitsPerSample = bytes.readUInt16LE(chunkStart + 14);
      extensiblePcm =
        audioFormat === 0xfffe &&
        chunkSize >= 40 &&
        // WAVE_FORMAT_EXTENSIBLE stores the PCM sub-format GUID at +24.
        bytes.readUInt32LE(chunkStart + 24) === 1;
    }
    cursor = chunkEnd + (chunkSize % 2);
  }

  if (
    audioFormat === undefined ||
    channels === undefined ||
    sampleRate === undefined ||
    bitsPerSample === undefined
  ) {
    return null;
  }

  const pcmFormat =
    audioFormat === 1 || (audioFormat === 0xfffe && extensiblePcm);

  return {
    codec:
      pcmFormat && bitsPerSample === 16
        ? "pcm_s16le"
        : pcmFormat && bitsPerSample === 24
          ? "pcm_s24le"
          : "unknown",
    sample_rate_hz: sampleRate,
    bits_per_sample: bitsPerSample,
    channels,
  };
};

const formatMatches = (
  actual: WavMetadata | null,
  expected: AudioFormat,
): boolean =>
  actual !== null &&
  actual.codec === expected.codec &&
  actual.sample_rate_hz === expected.sample_rate_hz &&
  actual.bits_per_sample === expected.bits_per_sample &&
  actual.channels === expected.channels;

const inspectBinaries = async (): Promise<BinaryEvidence> => {
  const evidence: BinaryEvidence = {
    hashMismatches: [],
    formatMismatches: [],
  };
  for (const record of manifest.records) {
    const files: ReadonlyArray<{
      kind: "master" | "delivery";
      file: AudioFileRecord;
    }> = [
      { kind: "master", file: record.master_file },
      { kind: "delivery", file: record.delivery_file },
    ];
    for (const { kind, file } of files) {
      const target = isAbsolute(file.path)
        ? file.path
        : resolve(root, file.path);
      try {
        const bytes = await readFile(target);
        if (sha256(bytes) !== file.sha256) {
          evidence.hashMismatches.push(`${record.asset_id}:${kind}`);
        }
        if (!formatMatches(parseWav(bytes), file.format)) {
          evidence.formatMismatches.push(`${record.asset_id}:${kind}`);
        }
      } catch {
        evidence.hashMismatches.push(`${record.asset_id}:${kind}:missing`);
        evidence.formatMismatches.push(`${record.asset_id}:${kind}:unreadable`);
      }
    }
  }
  return evidence;
};

const binaryEvidence = await inspectBinaries();
const binaryHashesMatch = binaryEvidence.hashMismatches.length === 0;
addCheck(
  "AQA-004",
  "Binary master/delivery yang tersedia cocok dengan checksum manifest.",
  binaryHashesMatch,
  binaryHashesMatch
    ? "52 file hash cocok; binary tetap local-only"
    : `Mismatch: ${binaryEvidence.hashMismatches.join(", ")}`,
);

const binaryFormatsMatch = binaryEvidence.formatMismatches.length === 0;
addCheck(
  "AQA-005",
  "Header WAV aktual cocok dengan format delivery/master pada manifest.",
  binaryFormatsMatch,
  binaryFormatsMatch
    ? "52 header WAV terbaca; PCM, sample rate, bit depth, dan channel sesuai"
    : `Mismatch: ${binaryEvidence.formatMismatches.join(", ")}`,
);

const manifestRightsMatch = manifest.records.every(
  (record) =>
    record.rights.status === "verified_local_only" &&
    record.rights.allowed_use === "local_only" &&
    record.rights.redistribution === "prohibited" &&
    record.rights.rights_receipt_id === expectedRightsReceiptId &&
    record.rights.attribution === "VOICEVOX: Nemo",
);
const rightsReceiptMatches =
  rightsReceipt.receipt_id === expectedRightsReceiptId &&
  rightsReceipt.status === "verified_local_only" &&
  rightsReceipt.asset_scope.manifest_sha256 === manifestSha256 &&
  rightsReceipt.asset_scope.expected_asset_count === 26 &&
  rightsReceipt.asset_scope.master_hashes_verified === 26 &&
  rightsReceipt.asset_scope.delivery_hashes_verified === 26 &&
  rightsReceipt.use_scope.allowed_use === "local_only" &&
  rightsReceipt.use_scope.redistribution === false &&
  rightsReceipt.use_scope.repository_distribution === false &&
  rightsReceipt.use_scope.production_runtime === false &&
  rightsReceipt.verification.asset_hashes_match_manifest === true &&
  rightsReceipt.verification.binary_audio_git_tracked === false;
addCheck(
  "AQA-006",
  "Provenance audio dan rights receipt menunjuk exact manifest yang sama.",
  manifestRightsMatch && rightsReceiptMatches,
  manifestRightsMatch && rightsReceiptMatches
    ? `${expectedRightsReceiptId}; manifest_sha256=${manifestSha256}`
    : "Metadata rights atau receipt tidak cocok dengan manifest saat ini",
);

const numericQaValues = manifest.records.every(
  (record) =>
    Number.isFinite(record.audio_qa.loudness_lufs) &&
    Number.isFinite(record.audio_qa.true_peak_dbtp) &&
    record.audio_qa.true_peak_dbtp <= -1,
);
const loudnessWithinBaseline = manifest.records.every(
  (record) =>
    record.audio_qa.loudness_lufs >= -18 &&
    record.audio_qa.loudness_lufs <= -14,
);
addCheck(
  "AQA-007",
  "Automated audio measurements tersedia dan true peak tidak melewati ceiling.",
  numericQaValues,
  `measurements=${String(manifest.records.length)}/${String(manifest.records.length)}; true_peak_ceiling=${numericQaValues ? "<= -1 dBTP" : "not_met"}`,
);

const expectedQaStatus = manifest.records.every(
  (record) =>
    record.audio_qa.status === "automated_measurement_only" ||
    record.audio_qa.status === "owner_attested_local_only",
);
addCheck(
  "AQA-008",
  "Status audio QA tercatat transparan dan tidak disamarkan sebagai formal QA.",
  expectedQaStatus,
  expectedQaStatus
    ? "26 record memiliki automated_measurement_only atau owner_attested_local_only"
    : "Ada record dengan status audio QA yang tidak diharapkan",
);

const formalPlaybackFields = manifest.records.flatMap((record) => [
  record.audio_qa.clipping_check,
  record.audio_qa.noise_check,
  record.audio_qa.device_playback_check,
]);
const playbackFieldsNotTested = formalPlaybackFields.filter(
  (value) => value === "not_tested",
).length;
addStatusCheck(
  "AQA-009",
  "Clipping, noise, dan device playback tidak diklaim lulus tanpa evidence formal.",
  ownerAttestation ? "owner_attested" : "not_tested",
  `${String(playbackFieldsNotTested)}/${String(formalPlaybackFields.length)} field manifest masih not_tested; owner approval hanya untuk local-only listening scope`,
);

addStatusCheck(
  "AQA-010",
  "Loudness berada pada baseline formal -16 LUFS ±2.",
  loudnessWithinBaseline
    ? "pass"
    : manifest.formal_gate_status === "waived_local_only_owner_attested" ||
        ownerAttestation
      ? "owner_attested"
      : "not_tested",
  loudnessWithinBaseline
    ? "26/26 asset berada pada baseline -18 sampai -14 LUFS"
    : `Baseline formal belum terpenuhi/terverifikasi untuk seluruh asset; min=${String(Math.min(...manifest.records.map((record) => record.audio_qa.loudness_lufs)))} LUFS, max=${String(Math.max(...manifest.records.map((record) => record.audio_qa.loudness_lufs)))} LUFS`,
);

const automatedFailures = checks.filter((check) => check.status === "fail");
const manualChecks: Array<{
  id: string;
  criterion: string;
  status: ReviewStatus;
  evidence: string;
}> = [
  {
    id: "AUDIO-MAN-001",
    criterion:
      "Owner mendengarkan dan menyetujui set audio U01-L1 untuk penggunaan local-only.",
    status: ownerAttestation ? "owner_attested" : "not_tested",
    evidence: ownerAttestation
      ? "Approval eksplisit requester pada task ini: audio asset tidak bermasalah dan seluruh set disetujui untuk penggunaan pribadi/local-only."
      : "Belum ada attestation manual yang direkam.",
  },
  {
    id: "AUDIO-MAN-002",
    criterion:
      "Playback subjektif tidak menunjukkan suara hilang, dropout, clipping terdengar, atau noise yang mengganggu.",
    status: ownerAttestation ? "owner_attested" : "not_tested",
    evidence: ownerAttestation
      ? "Owner menyatakan audio sudah tidak memiliki masalah; pemeriksaan teknis formal tetap dipisahkan dari attestation ini."
      : "Belum ada attestation manual yang direkam.",
  },
  {
    id: "AUDIO-MAN-003",
    criterion: "Playback diuji pada device/platform matrix yang diwajibkan.",
    status: ownerAttestation ? "owner_attested" : "not_tested",
    evidence: ownerAttestation
      ? "Requester mengonfirmasi poin 1-4 telah dilakukan dan tidak ada masalah pada playback yang diuji; evidence device matrix formal tetap memerlukan reviewer/fixture terpisah."
      : "Belum ada attestation manual yang direkam.",
  },
  {
    id: "AUDIO-MAN-004",
    criterion:
      "Attribution VOICEVOX: Nemo dan batas local-only dipahami serta diterima.",
    status: ownerAttestation ? "owner_attested" : "not_tested",
    evidence: ownerAttestation
      ? "Owner approval dicatat bersama rights receipt verified_local_only; redistribution dan production runtime tetap dilarang."
      : "Belum ada attestation manual yang direkam.",
  },
];

const now = new Date().toISOString();
const decision =
  automatedFailures.length === 0 && ownerAttestation
    ? "approved"
    : automatedFailures.length > 0
      ? "revision_required"
      : "pending";
const report = {
  schema_version: "1.0.0",
  receipt_type: "content_review",
  review_id: "REVIEW.CONTENT.U01.L1.AUDIO.000001",
  status: decision,
  decision,
  approval_basis: ownerAttestation
    ? "owner_attestation"
    : "automated_evidence_only",
  formal_gate_status:
    decision === "approved"
      ? (manifest.formal_gate_status ??
        "pending_external_audio_domain_reviewer_and_device_playback_qa")
      : "pending",
  artifact: {
    manifest_ref: manifestPath,
    manifest_id: manifest.manifest_id,
    manifest_sha256: manifestSha256,
    source_seed_version: manifest.source_seed_version,
    source_seed_commit: manifest.source_seed_commit,
    record_count: manifest.records.length,
    rights_receipt_ref: rightsReceiptPath,
    rights_receipt_id: expectedRightsReceiptId,
  },
  rubric_ref: "docs/product-specs/content-validation-rubric.md@0.1.0",
  gate_results: {
    "LIS-004_loudness_true_peak": loudnessWithinBaseline
      ? "pass"
      : manifest.formal_gate_status === "waived_local_only_owner_attested"
        ? "waived_local_only_owner_attested"
        : "pending_formal_audio_qa",
    "LIS-005_clipping_noise_playback": ownerAttestation
      ? "owner_attested"
      : "not_tested",
    "LIS-011_provenance_metadata": rightsReceiptMatches ? "pass" : "fail",
    "TEC-001_audio_file_integrity":
      binaryHashesMatch && binaryFormatsMatch ? "pass" : "fail",
    "GOV-LOCAL-001_owner_scope":
      manifest.approval_status === "approved_owner_attested_local_only"
        ? "owner_attested"
        : "not_tested",
  },
  automated_checks: checks,
  manual_checks: manualChecks,
  findings: [
    ...automatedFailures.map((check) => ({
      id: `FINDING.${check.id}`,
      severity: "blocker",
      summary: check.criterion,
      evidence: check.evidence,
    })),
    ...(!loudnessWithinBaseline
      ? [
          {
            id: "FINDING.AQA-010",
            severity:
              manifest.formal_gate_status === "waived_local_only_owner_attested"
                ? "observation"
                : "blocker",
            summary:
              "Automated loudness observation belum memenuhi baseline formal -16 LUFS ±2.",
            evidence:
              manifest.formal_gate_status === "waived_local_only_owner_attested"
                ? `Technical waiver local-only terdaftar pada ${manifest.qa_waiver_ref ?? "receipt terpisah"}; tidak berlaku untuk publication/runtime.`
                : "Owner attestation tidak mengubah hasil pengukuran; formal audio QA/normalization tetap diperlukan sebelum publication/runtime.",
          },
        ]
      : []),
    ...(playbackFieldsNotTested > 0
      ? [
          {
            id: "FINDING.AQA-009",
            severity: "observation",
            summary:
              "Clipping, noise, dan device playback belum memiliki evidence formal pada manifest.",
            evidence: `${String(playbackFieldsNotTested)} field masih not_tested; owner approval berlaku untuk local-only listening scope saja.`,
          },
        ]
      : []),
  ],
  reviewers: ownerAttestation
    ? [
        {
          reviewer_id: "owner-attestation",
          role: "Content Owner (attestation only)",
          decision: "approved",
          reviewed_at: now,
          confirmation_source: "explicit_owner_statement_in_current_task",
          notes:
            "Scoped owner attestation untuk penggunaan pribadi/local-only. Bukan pengganti Audio Domain Specialist, Technical/Data Reviewer, Accessibility Reviewer, atau device QA formal; tidak membuka publication/runtime.",
        },
      ]
    : [],
  created_at: now,
  notes: [
    "Receipt terikat ke exact manifest hash; perubahan manifest atau binary memerlukan review baru.",
    "Status approved di receipt ini berarti owner-approved untuk local-only listening scope, bukan formal publication approval.",
    "Requester mengonfirmasi poin 1-4 Audio QA telah dilakukan dan tidak menemukan masalah; automated fields yang masih not_tested atau di luar baseline tetap tidak diubah menjadi pass tanpa evidence file/waiver yang dapat direproduksi.",
    "Rights receipt tetap terpisah dan diverifikasi melalui exact manifest hash.",
    ...(manifest.qa_waiver_ref
      ? [`Loudness short-clip waiver: ${manifest.qa_waiver_ref}.`]
      : []),
    "Audio manifest approved hanya untuk local-only owner scope; seed tetap draft dan runtime_eligible=false.",
  ],
};

if (ownerAttestation || automatedFailures.length > 0) {
  await writeFile(
    resolve(root, outputPath),
    `${JSON.stringify(report, null, 2)}\n`,
    "utf8",
  );
}

if (automatedFailures.length > 0) {
  process.stderr.write(
    `Audio review gagal: ${String(automatedFailures.length)} check gagal.\n`,
  );
  process.exitCode = 1;
} else if (ownerAttestation) {
  process.stdout.write(
    `Audio review owner-attested: approved untuk local-only; gate=${manifest.formal_gate_status ?? "pending"}.\nManifest: ${manifestSha256}\n`,
  );
} else {
  process.stdout.write(
    `Audio automated evidence lulus; gunakan --record-owner-attestation untuk merekam approval owner.\nManifest: ${manifestSha256}\n`,
  );
}
