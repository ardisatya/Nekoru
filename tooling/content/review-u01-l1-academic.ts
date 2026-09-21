import { createHash } from "node:crypto";
import { readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";

type ReviewStatus = "pass" | "fail" | "owner_attested" | "not_tested";

interface KnowledgeComponent {
  id: string;
  code: string;
  required: boolean;
}

interface VocabularyChunk {
  id: string;
  japanese: string;
  communicative_translation_id: string;
}

interface SessionBlueprint {
  id: string;
  order: number;
  purpose_id: string;
}

interface ActivityDefinition {
  id: string;
  activity_type: "single_choice" | "select_to_pair";
  family: string;
  primary_kc_id: string;
  evidence_mode: "direct" | "guided" | "exposure";
  prompt_id: string;
}

interface SeedAsset {
  id: string;
  kind: string;
  status: string;
  checksum: string | null;
  rights_receipt_id: string | null;
  speaker_variant: string;
}

interface ContentSeed {
  schema_version: string;
  id: string;
  version: string;
  status: string;
  unit_id: string;
  lesson_id: string;
  runtime_eligible: boolean;
  fixture_only: boolean;
  knowledge_components: KnowledgeComponent[];
  vocabulary_chunks: VocabularyChunk[];
  session_blueprints: SessionBlueprint[];
  activities: ActivityDefinition[];
  assets: SeedAsset[];
  approval_receipts: unknown[];
}

interface CheckResult {
  id: string;
  criterion: string;
  status: ReviewStatus;
  evidence: string;
}

const root = resolve(import.meta.dirname, "../..");
const seedPath = "content/source/u01-l1/seed.json";
const audioManifestPath = "content/manifests/u01-l1.audio-draft.json";
const localOnlyDecisionPath =
  "docs/implementation/u01-l1-content-review-local-only-decision.json";
const outputPath = "docs/implementation/u01-l1-academic-review.json";
const ownerAttestation = process.argv.includes("--record-owner-attestation");

const expectedKnowledgeComponents = [
  ["SOUND.VOWEL.A", true],
  ["SOUND.VOWEL.I", true],
  ["SOUND.VOWEL.U", true],
  ["SOUND.VOWEL.E", true],
  ["SOUND.VOWEL.O", true],
  ["SOUND.MORA.CV", true],
  ["FUNCTION.GREETING.CONTEXT", true],
  ["SCRIPT.SYSTEM.AWARENESS", false],
] as const;

const expectedVocabulary = [
  ["おはようございます", "selamat_pagi"],
  ["こんにちは", "selamat_siang"],
  ["こんばんは", "selamat_malam"],
  ["さようなら", "sampai_jumpa"],
] as const;

const expectedSessionBlueprints = [
  ["U01-L1-A", 1, "kenali_lima_vokal"],
  ["U01-L1-B", 2, "rasakan_irama_mora"],
  ["U01-L1-C", 3, "pilih_sapaan_sesuai_konteks"],
] as const;

const expectedFamilyCounts: Record<string, number> = {
  vowel_discrimination: 15,
  vowel_pair: 5,
  mora_count: 6,
  greeting_context: 12,
  greeting_pair: 4,
  script_awareness: 1,
};

const expectedFamilyContracts: Record<
  string,
  {
    activity_type: ActivityDefinition["activity_type"];
    evidence_mode: ActivityDefinition["evidence_mode"];
  }
> = {
  vowel_discrimination: {
    activity_type: "single_choice",
    evidence_mode: "direct",
  },
  vowel_pair: { activity_type: "select_to_pair", evidence_mode: "guided" },
  mora_count: { activity_type: "single_choice", evidence_mode: "direct" },
  greeting_context: { activity_type: "single_choice", evidence_mode: "direct" },
  greeting_pair: { activity_type: "select_to_pair", evidence_mode: "guided" },
  script_awareness: {
    activity_type: "single_choice",
    evidence_mode: "exposure",
  },
};

const sha256 = (value: Buffer): string =>
  `sha256:${createHash("sha256").update(value).digest("hex")}`;

const seedBytes = await readFile(resolve(root, seedPath));
const seed = JSON.parse(seedBytes.toString("utf8")) as ContentSeed;
const audioManifestBytes = await readFile(resolve(root, audioManifestPath));
const localOnlyDecisionBytes = await readFile(
  resolve(root, localOnlyDecisionPath),
);
const localOnlyDecision = JSON.parse(
  localOnlyDecisionBytes.toString("utf8"),
) as { decision_id: string; status: string };
const externalApprovalReported =
  ownerAttestation && localOnlyDecision.status === "approved";
const localOnlyContentException =
  ownerAttestation &&
  (localOnlyDecision.status === "approved_owner_attested_local_only" ||
    externalApprovalReported);
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
  "ACA-001",
  "Seed berada tepat pada scope U01-L1 dan belum dapat dipakai runtime.",
  seed.schema_version === "1.0.0" &&
    seed.id === "cnt_01J00000000000000000000000" &&
    seed.unit_id === "U01" &&
    seed.lesson_id === "U01-L1" &&
    seed.version === "0.1.0" &&
    seed.status === "draft" &&
    seed.runtime_eligible === false &&
    seed.fixture_only === false,
  `${seed.unit_id}/${seed.lesson_id}@${seed.version}; status=${seed.status}; runtime_eligible=${String(seed.runtime_eligible)}`,
);

const actualKnowledgeComponents = seed.knowledge_components.map((item) => [
  item.code,
  item.required,
]);
const knowledgeComponentsMatch =
  actualKnowledgeComponents.length === expectedKnowledgeComponents.length &&
  expectedKnowledgeComponents.every(([code, required]) =>
    actualKnowledgeComponents.some(
      ([actualCode, actualRequired]) =>
        actualCode === code && actualRequired === required,
    ),
  );
addCheck(
  "ACA-002",
  "Target Knowledge Components tepat: lima vowel, mora, greeting, dan script awareness exposure.",
  knowledgeComponentsMatch,
  `${String(seed.knowledge_components.length)} knowledge components; tidak ada target Grammar/Kanji formal`,
);

const actualVocabulary = seed.vocabulary_chunks.map((item) => [
  item.japanese,
  item.communicative_translation_id,
]);
const vocabularyMatches =
  actualVocabulary.length === expectedVocabulary.length &&
  expectedVocabulary.every(([japanese, translation]) =>
    actualVocabulary.some(
      ([actualJapanese, actualTranslation]) =>
        actualJapanese === japanese && actualTranslation === translation,
    ),
  );
addCheck(
  "ACA-003",
  "Empat greeting chunk dan communicative translation sesuai inventory U01-L1.",
  vocabularyMatches,
  `vocabulary_chunks=${String(seed.vocabulary_chunks.length)}; formulaic greeting chunks only`,
);

const actualBlueprints = seed.session_blueprints.map((item) => [
  item.id,
  item.order,
  item.purpose_id,
]);
const blueprintsMatch =
  actualBlueprints.length === expectedSessionBlueprints.length &&
  expectedSessionBlueprints.every(([id, order, purpose]) =>
    actualBlueprints.some(
      ([actualId, actualOrder, actualPurpose]) =>
        actualId === id && actualOrder === order && actualPurpose === purpose,
    ),
  );
addCheck(
  "ACA-004",
  "Tiga session blueprint memiliki ID, urutan, dan purpose reference yang stabil.",
  blueprintsMatch,
  "U01-L1-A/B/C; tiga blueprint; urutan 1–3",
);

const familyCounts = new Map<string, number>();
for (const activity of seed.activities) {
  familyCounts.set(
    activity.family,
    (familyCounts.get(activity.family) ?? 0) + 1,
  );
}
const familyCountsMatch =
  seed.activities.length === 43 &&
  Object.entries(expectedFamilyCounts).every(
    ([family, expected]) => familyCounts.get(family) === expected,
  ) &&
  familyCounts.size === Object.keys(expectedFamilyCounts).length;
addCheck(
  "ACA-005",
  "Activity pool memiliki 43 definition dengan distribusi family yang disetujui.",
  familyCountsMatch,
  Object.entries(expectedFamilyCounts)
    .map(
      ([family, count]) =>
        `${family}=${String(familyCounts.get(family) ?? 0)}/${String(count)}`,
    )
    .join("; "),
);

const knowledgeComponentIds = new Set(
  seed.knowledge_components.map((item) => item.id),
);
const activityContractsMatch = seed.activities.every((activity) => {
  const contract = expectedFamilyContracts[activity.family];
  return (
    contract !== undefined &&
    knowledgeComponentIds.has(activity.primary_kc_id) &&
    activity.activity_type === contract.activity_type &&
    activity.evidence_mode === contract.evidence_mode &&
    activity.prompt_id.length > 0
  );
});
addCheck(
  "ACA-006",
  "Setiap activity memiliki primary KC, interaction, evidence mode, dan prompt yang konsisten.",
  activityContractsMatch &&
    new Set(seed.activities.map((activity) => activity.id)).size ===
      seed.activities.length &&
    new Set(seed.activities.map((activity) => activity.prompt_id)).size ===
      seed.activities.length,
  "ID activity/prompt unik; family contract diperiksa terhadap setiap activity",
);

const familyPrimaryCodesMatch = seed.activities.every((activity) => {
  const code = seed.knowledge_components.find(
    (item) => item.id === activity.primary_kc_id,
  )?.code;
  if (activity.family === "mora_count") return code === "SOUND.MORA.CV";
  if (
    activity.family === "greeting_context" ||
    activity.family === "greeting_pair"
  )
    return code === "FUNCTION.GREETING.CONTEXT";
  if (activity.family === "script_awareness")
    return code === "SCRIPT.SYSTEM.AWARENESS";
  return code?.startsWith("SOUND.VOWEL.") === true;
});
addCheck(
  "ACA-007",
  "Primary KC activity tidak tertukar antar domain dan tidak menambahkan Grammar/Kanji.",
  familyPrimaryCodesMatch,
  "vowel→SOUND.VOWEL.*; mora→SOUND.MORA.CV; greeting→FUNCTION.GREETING.CONTEXT; script→exposure",
);

addCheck(
  "ACA-008",
  "Seed memiliki 26 asset record dan seluruh asset memiliki rights receipt reference.",
  seed.assets.length === 26 &&
    seed.assets.every(
      (asset) => asset.kind === "audio" && asset.rights_receipt_id !== null,
    ),
  `assets=${String(seed.assets.length)}; rights_receipt_ref tersedia pada seluruh asset`,
);

const automatedFailures = checks.filter((check) => check.status === "fail");
const manualChecks: Array<{
  id: string;
  criterion: string;
  status: ReviewStatus;
  evidence: string;
}> = [
  {
    id: "ACA-MAN-001",
    criterion:
      "Outcome lesson sesuai level pemula dan tidak mengklaim U01/S0 lengkap.",
    status: ownerAttestation ? "owner_attested" : "not_tested",
    evidence: ownerAttestation
      ? "Attestation eksplisit requester pada task ini; formal Academic Lead sign-off tetap terpisah."
      : "Belum ada attestation manual yang direkam.",
  },
  {
    id: "ACA-MAN-002",
    criterion:
      "Urutan Session A/B/C, delayed review, dan beban materi sesuai blueprint akademik.",
    status: ownerAttestation ? "owner_attested" : "not_tested",
    evidence: ownerAttestation
      ? "Requester menyatakan seluruh konten akademik sudah sesuai; seed belum menyimpan activity_refs per sesi."
      : "Belum ada attestation manual yang direkam.",
  },
  {
    id: "ACA-MAN-003",
    criterion:
      "Evidence, difficulty, misconception mapping, dan formulaic-greeting boundary sesuai policy.",
    status: ownerAttestation ? "owner_attested" : "not_tested",
    evidence: ownerAttestation
      ? "Attestation eksplisit requester; academic receipt tidak membuka scoring/mastery runtime."
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
  review_id: "REVIEW.CONTENT.U01.L1.ACADEMIC.000001",
  status: decision,
  decision,
  approval_basis: externalApprovalReported
    ? "external_reviewer_approval_reported_by_owner"
    : ownerAttestation
      ? "owner_attestation"
      : "automated_evidence_only",
  formal_gate_status: externalApprovalReported
    ? "approved_external_reported_by_owner"
    : localOnlyContentException
      ? "waived_local_only_owner_attested"
      : decision === "approved"
        ? "pending_external_academic_lead"
        : "pending",
  artifact: {
    seed_ref: seedPath,
    seed_id: seed.id,
    seed_sha256: sha256(seedBytes),
    audio_manifest_ref: audioManifestPath,
    audio_manifest_sha256: sha256(audioManifestBytes),
    seed_version: seed.version,
    scope: "U01-L1",
    local_only_decision_ref: localOnlyDecisionPath,
  },
  rubric_ref: "docs/product-specs/content-validation-rubric.md@0.1.0",
  external_approval: {
    status: externalApprovalReported ? "reported" : "not_reported",
    reviewer_role: "Academic Lead",
    reviewer_identity: "not_provided",
    confirmation_source: externalApprovalReported
      ? "explicit_owner_statement_in_current_task"
      : "not_provided",
    exact_receipt_ref: "not_provided",
  },
  gate_results: {
    "UNI-ACA-001_scope_and_accuracy": checks.find(
      (check) => check.id === "ACA-001",
    )?.status,
    "UNI-ACA-002_naturalness_and_register": ownerAttestation
      ? "owner_attested"
      : "not_tested",
    "UNI-ACA-003_contrastive_fit": checks.find(
      (check) => check.id === "ACA-007",
    )?.status,
    "UNI-ACA-004_context_and_bias": ownerAttestation
      ? "owner_attested"
      : "not_tested",
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
          notes: externalApprovalReported
            ? "External Academic Lead approval dilaporkan oleh owner; identitas/receipt exact belum dilampirkan. Publication/runtime tetap tidak dibuka."
            : localOnlyContentException
              ? "Scoped local-only owner attestation. Tidak mengklaim Academic Lead external sign-off dan tidak membuka publication/runtime."
              : "Scoped owner attestation. Bukan pengganti Academic Lead formal dan tidak membuka publication/runtime.",
        },
      ]
    : [],
  created_at: now,
  notes: [
    "Receipt terikat ke exact seed hash dan audio manifest hash; perubahan artefak memerlukan review baru.",
    "Seed saat ini menyimpan blueprint sesi tetapi belum menyimpan activity_refs per sesi. Mapping per sesi tetap menjadi pekerjaan content-pack binding sebelum runtime.",
    externalApprovalReported
      ? `Academic approval external dilaporkan owner melalui ${localOnlyDecisionPath}; identitas/receipt exact belum dilampirkan dan publication/runtime tetap tidak dibuka.`
      : localOnlyContentException
        ? `Academic internal gate di-waive untuk local-only melalui ${localOnlyDecisionPath}; external/publication gate tetap tidak diklaim.`
        : "Receipt ini hanya mencatat academic review scope. Linguistic, audio QA, accessibility, technical, rights, dan publication gate tetap terpisah.",
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
    `Academic review gagal: ${String(automatedFailures.length)} check gagal.\n`,
  );
  process.exitCode = 1;
} else if (ownerAttestation) {
  process.stdout.write(
    externalApprovalReported
      ? `Academic review: approved; external Academic Lead approval dilaporkan owner.\nSeed: ${sha256(seedBytes)}\n`
      : localOnlyContentException
        ? `Academic review owner-attested: approved untuk local-only; external Academic Lead gate tidak diklaim.\nSeed: ${sha256(seedBytes)}\n`
        : `Academic review owner-attested: approved pada receipt; formal Academic Lead gate tetap pending.\nSeed: ${sha256(seedBytes)}\n`,
  );
} else {
  process.stdout.write(
    `Academic automated review lulus; gunakan --record-owner-attestation untuk merekam keputusan owner.\nSeed: ${sha256(seedBytes)}\n`,
  );
}
