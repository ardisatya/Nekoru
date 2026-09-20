import { createHash } from "node:crypto";
import { readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";

type ReviewStatus = "pass" | "fail" | "owner_attested" | "not_tested";

interface AudioFileRecord {
  path: string;
  sha256: string;
}

interface AudioQaRecord {
  status: string;
  clipping_check: string;
  noise_check: string;
  device_playback_check: string;
}

interface VoiceRecord {
  voice_id: number;
  speaker_uuid: string;
  voice_name: string;
  style_name: string;
}

interface ManifestRecord {
  asset_id: string;
  logical_id: string;
  group: "vowel" | "greeting" | "mora" | "instruction";
  speaker_variant: "a" | "b";
  japanese_text: string;
  transcript_internal: string;
  evidence_policy: "direct" | "applied" | "non_scored";
  culture: string;
  voice_provider: string;
  voice_id: number;
  voice_name: string;
  speaker_uuid: string;
  style_name: string;
  master_file: AudioFileRecord;
  delivery_file: AudioFileRecord;
  audio_qa: AudioQaRecord;
}

interface AudioManifest {
  schema_version: number;
  manifest_id: string;
  status: string;
  runtime_eligible: boolean;
  source_plan: string;
  source_seed_version: string;
  source_seed_commit: string;
  records: ManifestRecord[];
}

interface CheckResult {
  id: string;
  criterion: string;
  status: ReviewStatus;
  evidence: string;
}

const root = resolve(import.meta.dirname, "../..");
const manifestPath = "content/manifests/u01-l1.audio-draft.json";
const localOnlyDecisionPath =
  "docs/implementation/u01-l1-content-review-local-only-decision.json";
const outputPath = "docs/implementation/u01-l1-linguistic-review.json";
const ownerAttestation = process.argv.includes("--record-owner-attestation");

const expectedInventory: ReadonlyArray<{
  group: ManifestRecord["group"];
  text: string;
  count: number;
  policy: ManifestRecord["evidence_policy"];
}> = [
  ...["あ", "い", "う", "え", "お"].map((text) => ({
    group: "vowel" as const,
    text,
    count: 2,
    policy: "direct" as const,
  })),
  ...["おはようございます", "こんにちは", "こんばんは", "さようなら"].map(
    (text) => ({
      group: "greeting" as const,
      text,
      count: 2,
      policy: "applied" as const,
    }),
  ),
  ...["か", "すし", "さくら"].map((text) => ({
    group: "mora" as const,
    text,
    count: 2,
    policy: "applied" as const,
  })),
  {
    group: "instruction",
    text: "聞いてください",
    count: 1,
    policy: "non_scored",
  },
  {
    group: "instruction",
    text: "選んでください",
    count: 1,
    policy: "non_scored",
  },
];

const expectedVoices: Record<"a" | "b", VoiceRecord> = {
  a: {
    voice_id: 10005,
    speaker_uuid: "abccafa5-174f-44d8-b70c-c41eebb3061c",
    voice_name: "女声1",
    style_name: "ノーマル",
  },
  b: {
    voice_id: 10002,
    speaker_uuid: "627b3e92-32c5-4c2f-860a-a5553d3d6662",
    voice_name: "男声3",
    style_name: "ノーマル",
  },
};

const sha256 = (value: Buffer): string =>
  `sha256:${createHash("sha256").update(value).digest("hex")}`;

const manifestBytes = await readFile(resolve(root, manifestPath));
const manifest = JSON.parse(manifestBytes.toString("utf8")) as AudioManifest;
const localOnlyDecisionBytes = await readFile(
  resolve(root, localOnlyDecisionPath),
);
const localOnlyDecision = JSON.parse(
  localOnlyDecisionBytes.toString("utf8"),
) as { decision_id: string; status: string };
const localOnlyContentException =
  ownerAttestation &&
  localOnlyDecision.status === "approved_owner_attested_local_only";
const manifestSha256 = sha256(manifestBytes);
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

addCheck(
  "LNG-001",
  "Manifest audio adalah snapshot U01-L1 local-only yang tepat.",
  manifest.schema_version === 1 &&
    manifest.manifest_id === "MANIFEST.N5.S00.U01.L1.AUDIO.DRAFT" &&
    (manifest.status === "draft" || manifest.status === "approved") &&
    manifest.runtime_eligible === false,
  `${manifest.manifest_id}@${manifest.source_seed_version}; runtime_eligible=${String(manifest.runtime_eligible)}`,
);

addCheck(
  "LNG-002",
  "Seluruh 26 asset memiliki ID unik dan inventory yang sesuai seed.",
  manifest.records.length === 26 &&
    new Set(manifest.records.map((record) => record.asset_id)).size ===
      manifest.records.length &&
    new Set(manifest.records.map((record) => record.logical_id)).size ===
      manifest.records.length,
  `records=${String(manifest.records.length)}; asset_id/logical_id unik`,
);

const inventoryKey = (record: ManifestRecord): string =>
  `${record.group}:${record.japanese_text}`;
const inventoryCounts = new Map<string, number>();
for (const record of manifest.records) {
  inventoryCounts.set(
    inventoryKey(record),
    (inventoryCounts.get(inventoryKey(record)) ?? 0) + 1,
  );
}
const inventoryMatches = expectedInventory.every(
  (expected) =>
    inventoryCounts.get(`${expected.group}:${expected.text}`) ===
    expected.count,
);
const unexpectedInventory = [...inventoryCounts.keys()].filter(
  (key) =>
    !expectedInventory.some(
      (expected) => `${expected.group}:${expected.text}` === key,
    ),
);
addCheck(
  "LNG-003",
  "Teks Jepang target tepat: lima vowel, empat greeting, tiga contoh mora, dan dua instruction cue.",
  inventoryMatches && unexpectedInventory.length === 0,
  `inventory=${String(inventoryCounts.size)} key; unexpected=${unexpectedInventory.length > 0 ? unexpectedInventory.join(", ") : "none"}`,
);

const transcriptMatches = manifest.records.every(
  (record) =>
    record.japanese_text.length > 0 &&
    record.transcript_internal === record.japanese_text,
);
addCheck(
  "LNG-004",
  "Transcript internal identik dengan teks Jepang canonical.",
  transcriptMatches,
  `matched=${String(manifest.records.filter((record) => record.transcript_internal === record.japanese_text).length)}/${String(manifest.records.length)}`,
);

const policyMatches = manifest.records.every((record) => {
  const expected = expectedInventory.find(
    (item) => item.group === record.group && item.text === record.japanese_text,
  );
  return expected?.policy === record.evidence_policy;
});
addCheck(
  "LNG-005",
  "Evidence policy sesuai fungsi linguistik masing-masing asset.",
  policyMatches,
  "vowel=direct; greeting/mora=applied; instruction=non_scored",
);

const speakerMetadataMatches = manifest.records.every((record) => {
  const expected = expectedVoices[record.speaker_variant];
  return (
    record.culture === "ja-JP" &&
    record.voice_provider === "VOICEVOX Nemo" &&
    record.voice_id === expected.voice_id &&
    record.voice_name === expected.voice_name &&
    record.speaker_uuid === expected.speaker_uuid &&
    record.style_name === expected.style_name
  );
});
addCheck(
  "LNG-006",
  "Setiap recording memakai metadata Japanese voice yang diharapkan.",
  speakerMetadataMatches,
  "culture=ja-JP; provider=VOICEVOX Nemo; variants=10005/10002",
);

const pairedTargets = expectedInventory.filter(
  (expected) => expected.count === 2 && expected.group !== "instruction",
);
const pairedTargetsMatch = pairedTargets.every((expected) => {
  const variants = new Set(
    manifest.records
      .filter(
        (record) =>
          record.group === expected.group &&
          record.japanese_text === expected.text,
      )
      .map((record) => record.speaker_variant),
  );
  return variants.size === 2 && variants.has("a") && variants.has("b");
});
addCheck(
  "LNG-007",
  "Setiap target vowel/greeting/mora mempunyai dua speaker variant.",
  pairedTargetsMatch,
  "speaker variant a dan b diperiksa pada 12 target",
);

const filesExist = manifest.records.every((record) => {
  return Boolean(record.master_file.path && record.delivery_file.path);
});
addCheck(
  "LNG-008",
  "Setiap record menunjuk master dan delivery file yang memiliki checksum.",
  filesExist &&
    manifest.records.every(
      (record) =>
        /^sha256:[0-9a-f]{64}$/.test(record.master_file.sha256) &&
        /^sha256:[0-9a-f]{64}$/.test(record.delivery_file.sha256),
    ),
  "26 master checksum dan 26 delivery checksum tersedia di manifest",
);

const binaryHashesMatch = async (): Promise<boolean> => {
  for (const record of manifest.records) {
    const master = await readFile(resolve(root, record.master_file.path));
    const delivery = await readFile(resolve(root, record.delivery_file.path));
    if (
      sha256(master) !== record.master_file.sha256 ||
      sha256(delivery) !== record.delivery_file.sha256
    ) {
      return false;
    }
  }
  return true;
};

let binaryHashStatus: boolean;
try {
  binaryHashStatus = await binaryHashesMatch();
} catch {
  binaryHashStatus = false;
}
addCheck(
  "LNG-009",
  "Binary master/delivery yang tersedia cocok dengan checksum manifest.",
  binaryHashStatus,
  binaryHashStatus
    ? "52 file hash cocok; binary tetap local-only"
    : "File tidak tersedia atau checksum berbeda",
);

const automatedFailures = checks.filter((check) => check.status === "fail");
const manualChecks: Array<{
  id: string;
  criterion: string;
  status: ReviewStatus;
  evidence: string;
}> = [
  {
    id: "LNG-MAN-001",
    criterion:
      "Pelafalan setiap target terdengar benar dan tidak ada bunyi yang hilang/bertambah.",
    status: ownerAttestation ? "owner_attested" : "not_tested",
    evidence: ownerAttestation
      ? "Attestation eksplisit requester pada task ini; perlu Japanese Linguistic Reviewer untuk formal gate."
      : "Belum ada attestation manual yang direkam.",
  },
  {
    id: "LNG-MAN-002",
    criterion:
      "Mora pada か, すし, dan さくら terdengar sesuai target satu/dua/tiga mora.",
    status: ownerAttestation ? "owner_attested" : "not_tested",
    evidence: ownerAttestation
      ? "Attestation eksplisit requester; receipt tidak menggantikan formal linguistic sign-off."
      : "Belum ada attestation manual yang direkam.",
  },
  {
    id: "LNG-MAN-003",
    criterion:
      "Greeting dan instruction cue terdengar natural serta register-nya sesuai.",
    status: ownerAttestation ? "owner_attested" : "not_tested",
    evidence: ownerAttestation
      ? "Attestation eksplisit requester; naturalness/register tetap memerlukan reviewer berwenang."
      : "Belum ada attestation manual yang direkam.",
  },
];

const now = new Date().toISOString();
const decision =
  automatedFailures.length === 0 && ownerAttestation
    ? "approved"
    : automatedFailures.length === 0
      ? "pending"
      : "revision_required";
const report = {
  schema_version: "1.0.0",
  receipt_type: "content_review",
  review_id: "REVIEW.CONTENT.U01.L1.LINGUISTIC.000001",
  status: decision,
  decision,
  approval_basis: ownerAttestation
    ? "owner_attestation"
    : "automated_evidence_only",
  formal_gate_status: localOnlyContentException
    ? "waived_local_only_owner_attested"
    : decision === "approved"
      ? "pending_external_japanese_linguistic_reviewer"
      : "pending",
  artifact: {
    manifest_ref: manifestPath,
    manifest_id: manifest.manifest_id,
    manifest_sha256: manifestSha256,
    source_seed_version: manifest.source_seed_version,
    source_seed_commit: manifest.source_seed_commit,
    record_count: manifest.records.length,
    local_only_decision_ref: localOnlyDecisionPath,
  },
  rubric_ref: "docs/product-specs/content-validation-rubric.md@0.1.0",
  gate_results: {
    "LIS-002_transcript_identity": checks.find(
      (check) => check.id === "LNG-004",
    )?.status,
    "LIS-003_pronunciation_naturalness": ownerAttestation
      ? "owner_attested"
      : "not_tested",
    "LIS-011_provenance_metadata": checks.find(
      (check) => check.id === "LNG-006",
    )?.status,
  },
  automated_checks: checks,
  manual_checks: manualChecks,
  findings: automatedFailures.map((check) => ({
    id: `FINDING.${check.id}`,
    severity: "blocker",
    summary: check.criterion,
    evidence: check.evidence,
  })),
  reviewers: ownerAttestation
    ? [
        {
          reviewer_id: "owner-attestation",
          role: "Content Owner (attestation only)",
          decision: "approved",
          reviewed_at: now,
          confirmation_source: "explicit_owner_statement_in_current_task",
          notes: localOnlyContentException
            ? "Scoped local-only owner attestation. Tidak mengklaim Japanese Linguistic Reviewer external sign-off dan tidak membuka publication/runtime."
            : "Ini adalah scoped owner attestation. Bukan pengganti Japanese Linguistic Reviewer formal dan tidak membuka publication/runtime.",
        },
      ]
    : [],
  created_at: now,
  notes: [
    "Receipt terikat ke exact manifest hash; perubahan manifest memerlukan review baru.",
    localOnlyContentException
      ? `Linguistic internal gate di-waive untuk local-only melalui ${localOnlyDecisionPath}; external/publication gate tetap tidak diklaim.`
      : "Receipt ini hanya mencatat linguistic review scope. Academic, audio QA, accessibility, technical, rights, dan publication gate tetap terpisah.",
    "Binary audio tidak didistribusikan; pemeriksaan hash hanya memverifikasi copy local-only yang tersedia di workstation.",
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
    `Linguistic review gagal: ${String(automatedFailures.length)} check gagal.\n`,
  );
  process.exitCode = 1;
} else if (ownerAttestation) {
  process.stdout.write(
    localOnlyContentException
      ? `Linguistic review owner-attested: approved untuk local-only; external reviewer gate tidak diklaim.\nManifest: ${manifestSha256}\n`
      : `Linguistic review owner-attested: approved pada receipt; formal reviewer gate tetap pending.\nManifest: ${manifestSha256}\n`,
  );
} else {
  process.stdout.write(
    `Linguistic automated review lulus; gunakan --record-owner-attestation untuk merekam keputusan owner.\nManifest: ${manifestSha256}\n`,
  );
}
