import { createHash } from "node:crypto";
import { readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";

type CheckStatus =
  "pass" | "fail" | "owner_attested" | "waived_local_only" | "not_tested";

interface CheckResult {
  id: string;
  criterion: string;
  status: CheckStatus;
  evidence: string;
}

interface AccessibilityRecord {
  accessible_label: string;
  transcript_release: string;
  failure_behavior: string;
  alternative_classification: string;
  status: string;
}

interface ManifestRecord {
  logical_id: string;
  accessibility: AccessibilityRecord;
  review: Record<string, string>;
  rights: { rights_receipt_id: string };
}

interface AudioManifest {
  schema_version: number;
  manifest_id: string;
  status: string;
  runtime_eligible: boolean;
  source_seed_version: string;
  source_seed_commit: string;
  records: ManifestRecord[];
  blockers: string[];
  rights_receipt_ref?: string;
}

interface ContentSeed {
  id: string;
  version: string;
  status: string;
  runtime_eligible: boolean;
  approval_receipts: string[];
  assets: Array<{ rights_receipt_id: string | null }>;
}

interface AudioPlan {
  recordings: Array<{ rights_receipt_id: string }>;
}

interface RightsReceipt {
  schema_version: string;
  receipt_type: string;
  status: string;
  receipt_id: string;
  supersedes_receipt_id?: string;
  decision_ref: string;
  asset_scope: {
    manifest_ref: string;
    manifest_sha256: string;
    manifest_generated_at: string;
    source_seed_commit: string;
    expected_asset_count: number;
    asset_ids_must_match_manifest: boolean;
    sha256_must_match_manifest: boolean;
    master_hashes_verified: number;
    delivery_hashes_verified: number;
  };
  review: {
    reviewer_id: string;
    reviewed_at: string;
    decision: string;
    confirmation_source: string;
    notes: string;
  };
}

const root = resolve(import.meta.dirname, "../..");
const manifestPath = "content/manifests/u01-l1.audio-draft.json";
const seedPath = "content/source/u01-l1/seed.json";
const audioPlanPath = "content/source/u01-l1/audio-plan.json";
const existingRightsReceiptPath =
  "docs/implementation/u01-l1-audio-rights-receipt-qa.json";
const nextRightsReceiptPath =
  "docs/implementation/u01-l1-audio-rights-receipt-accessibility.json";
const nextRightsReceiptId = "rev_01M2ZV7N6B5C4X3Z2Q1W0E9R8T";
const prototypePath = "apps/learner-web/app/prototype/u01-l1/prototype.tsx";
const prototypeCssPath =
  "apps/learner-web/app/prototype/u01-l1/prototype.module.css";
const globalCssPath = "apps/learner-web/app/globals.css";
const layoutPath = "apps/learner-web/app/layout.tsx";
const emulatorEvidencePath =
  "docs/implementation/u01-l1-accessibility-emulator-evidence.json";
const localOnlyDecisionPath =
  "docs/implementation/u01-l1-accessibility-local-only-decision.json";
const outputPath = "docs/implementation/u01-l1-accessibility-review.json";
const reviewId = "REVIEW.ACCESSIBILITY.U01.L1.000001";
const ownerAttestation = process.argv.includes("--record-owner-attestation");

const sha256 = (value: Buffer): string =>
  `sha256:${createHash("sha256").update(value).digest("hex")}`;

const manifestBytes = await readFile(resolve(root, manifestPath));
const seedBytes = await readFile(resolve(root, seedPath));
const audioPlanBytes = await readFile(resolve(root, audioPlanPath));
const existingRightsReceiptBytes = await readFile(
  resolve(root, existingRightsReceiptPath),
);
const prototypeBytes = await readFile(resolve(root, prototypePath));
const prototypeCssBytes = await readFile(resolve(root, prototypeCssPath));
const globalCssBytes = await readFile(resolve(root, globalCssPath));
const layoutBytes = await readFile(resolve(root, layoutPath));
const emulatorEvidenceBytes = await readFile(
  resolve(root, emulatorEvidencePath),
);
const localOnlyDecisionBytes = await readFile(
  resolve(root, localOnlyDecisionPath),
);

const manifest = JSON.parse(manifestBytes.toString("utf8")) as AudioManifest;
const seed = JSON.parse(seedBytes.toString("utf8")) as ContentSeed;
const audioPlan = JSON.parse(audioPlanBytes.toString("utf8")) as AudioPlan;
const existingRightsReceipt = JSON.parse(
  existingRightsReceiptBytes.toString("utf8"),
) as RightsReceipt;
const prototype = prototypeBytes.toString("utf8");
const prototypeCss = prototypeCssBytes.toString("utf8");
const globalCss = globalCssBytes.toString("utf8");
const layout = layoutBytes.toString("utf8");
const emulatorEvidence = JSON.parse(emulatorEvidenceBytes.toString("utf8")) as {
  status: string;
  formal_gate_status: string;
  run: {
    result: {
      planned: number;
      passed: number;
      skipped: number;
      failed: number;
    };
  };
};
const localOnlyDecision = JSON.parse(
  localOnlyDecisionBytes.toString("utf8"),
) as {
  decision_id: string;
  status: string;
};
const localOnlyAccessibilityException =
  ownerAttestation &&
  localOnlyDecision.status === "approved_owner_attested_local_only";
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
  "ACC-UI-001_scope_and_states",
  "Prototype U01-L1 memuat 20 state P-M1 yang ditetapkan.",
  (prototype.match(/id: "P-M1-\d{2}"/g) ?? []).length === 20 &&
    prototype.includes('id: "P-M1-20"'),
  "P-M1-01 sampai P-M1-20 ditemukan pada prototype source",
);

addCheck(
  "ACC-UI-002_semantic_controls",
  "Prototype memakai semantic controls, grouping, labels, dan status announcement.",
  prototype.includes("<fieldset") &&
    prototype.includes("<legend") &&
    prototype.includes("<label") &&
    prototype.includes('role="status"') &&
    prototype.includes("aria-pressed"),
  "fieldset/legend, label, role=status, dan aria-pressed ditemukan",
);

addCheck(
  "ACC-UI-003_focus_and_keyboard_contract",
  "Route transition memindahkan konteks ke heading dan focus-visible tersedia.",
  prototype.includes("heading.current?.focus()") &&
    globalCss.includes(":focus-visible") &&
    globalCss.includes("--focus-ring"),
  "heading focus handoff dan global focus-visible contract ditemukan",
);

addCheck(
  "ACC-UI-004_reflow_and_visual_modes",
  "Prototype memiliki responsive layout, forced-colors, dan reduced-motion behavior.",
  prototypeCss.includes("@media (max-width: 360px)") &&
    prototypeCss.includes("@media (forced-colors: active)") &&
    globalCss.includes("@media (prefers-reduced-motion: reduce)") &&
    globalCss.includes("@media (forced-colors: active)"),
  "320 px/reflow, forced-colors, dan reduced-motion rules ditemukan",
);

addCheck(
  "ACC-UI-005_language_and_japanese_content",
  "UI memakai lang Indonesia dan menandai materi Jepang sebagai ja.",
  layout.includes('lang="id"') && prototype.includes('lang="ja"'),
  "html lang=id dan Japanese content lang=ja ditemukan",
);

addCheck(
  "ACC-UI-006_non_drag_and_recovery",
  "Matching memiliki jalur non-drag dan failure/recovery state yang terlihat.",
  prototype.includes("Lepas pasangan") &&
    prototype.includes("Audio belum dapat dimuat") &&
    prototype.includes("Tidak ada attempt atau nilai yang dibuat"),
  "select-to-pair, audio failure, dan technical recovery ditemukan",
);

addCheck(
  "ACC-UI-007_audio_scope",
  "Audio prototype tidak autoplay dan actual player runtime tetap ditunda ke P1.3.",
  prototype.includes("Audio tidak diputar otomatis") &&
    !prototype.includes("<audio") &&
    !prototype.includes("autoPlay="),
  "Prototype memakai audio-state simulation tanpa autoplay; playback runtime deferred",
);

const automatedFailures = checks.filter((check) => check.status === "fail");
const manualChecks: CheckResult[] = [
  {
    id: "ACC-MAN-001",
    criterion:
      "Owner telah memeriksa seluruh 20 state prototype, keyboard flow, error, recovery, dan reflow yang tersedia.",
    status: ownerAttestation ? "owner_attested" : "not_tested",
    evidence: ownerAttestation
      ? "Pernyataan eksplisit requester pada task ini; scope dibatasi local-only prototype UI."
      : "Belum ada owner attestation yang direkam.",
  },
  {
    id: "ACC-MAN-002",
    criterion:
      "Audio state UI, approved alternative/support-adjusted behavior, dan technical-failure copy dipahami tanpa mengubah konstruk.",
    status: ownerAttestation ? "owner_attested" : "not_tested",
    evidence: ownerAttestation
      ? "Owner menyatakan accessibility telah tercapai; actual audio playback sengaja deferred ke Phase 1 P1.3."
      : "Belum ada owner attestation yang direkam.",
  },
  {
    id: "ACC-MAN-003",
    criterion:
      "Formal cross-platform AT matrix (NVDA, VoiceOver, TalkBack, physical device) memiliki evidence release-grade.",
    status: localOnlyAccessibilityException
      ? "waived_local_only"
      : "not_tested",
    evidence: localOnlyAccessibilityException
      ? `Physical AT matrix dikecualikan untuk scope local-only melalui ${localOnlyDecisionPath}; formal conformance tidak diklaim.`
      : "Tidak diklaim sebagai formal conformance; Phase 0 local-only receipt memakai owner attestation.",
  },
  {
    id: "ACC-MAN-004",
    criterion:
      "Desktop dan mobile emulator matrix menjalankan semantic, keyboard, reflow, forced-colors, reduced-motion, touch, dan hidden-content checks.",
    status:
      emulatorEvidence.status === "passed_emulator_subset"
        ? "pass"
        : "not_tested",
    evidence: `Evidence ${emulatorEvidencePath}: ${String(emulatorEvidence.run.result.passed)} passed, ${String(emulatorEvidence.run.result.skipped)} skipped, ${String(emulatorEvidence.run.result.failed)} failed. Ini bukan pengganti physical AT/device evidence.`,
  },
];

const serializeJson = (value: unknown): Buffer =>
  Buffer.from(`${JSON.stringify(value, null, 2)}\n`, "utf8");

const now = new Date().toISOString();

if (ownerAttestation && automatedFailures.length === 0) {
  for (const record of manifest.records) {
    record.accessibility.status = "owner_attested_local_only";
    record.review.accessibility = "approved_owner_attested_local_only";
    record.rights.rights_receipt_id = nextRightsReceiptId;
  }
  manifest.rights_receipt_ref = nextRightsReceiptPath;
  manifest.blockers = manifest.blockers.filter(
    (blocker) =>
      !blocker.toLowerCase().includes("accessibility") &&
      !blocker.toLowerCase().includes("actual audio playback"),
  );
  manifest.blockers.push(
    "Actual audio playback dan physical-device playback QA ditunda ke Phase 1 P1.3; prototype UI review local-only telah di-attest owner.",
  );
  for (const asset of seed.assets)
    asset.rights_receipt_id = nextRightsReceiptId;
  for (const recording of audioPlan.recordings)
    recording.rights_receipt_id = nextRightsReceiptId;
  if (!seed.approval_receipts.includes(reviewId))
    seed.approval_receipts.push(reviewId);
}

const finalManifestBytes =
  ownerAttestation && automatedFailures.length === 0
    ? serializeJson(manifest)
    : manifestBytes;
const finalSeedBytes =
  ownerAttestation && automatedFailures.length === 0
    ? serializeJson(seed)
    : seedBytes;
const finalAudioPlanBytes =
  ownerAttestation && automatedFailures.length === 0
    ? serializeJson(audioPlan)
    : audioPlanBytes;
const nextRightsReceipt: RightsReceipt = {
  ...existingRightsReceipt,
  receipt_id: nextRightsReceiptId,
  supersedes_receipt_id: existingRightsReceipt.receipt_id,
  asset_scope: {
    ...existingRightsReceipt.asset_scope,
    manifest_ref: manifestPath,
    manifest_sha256: sha256(finalManifestBytes),
    manifest_generated_at: now,
    source_seed_commit: manifest.source_seed_commit,
  },
  review: {
    ...existingRightsReceipt.review,
    reviewed_at: now,
    notes:
      "Receipt superseding the previous normalized-QA rights receipt after the accessibility owner-attestation metadata update. Local-only use, redistribution prohibition, and production-runtime prohibition remain unchanged.",
  },
};

const decision =
  automatedFailures.length === 0 && ownerAttestation
    ? "approved"
    : automatedFailures.length === 0
      ? "pending"
      : "revision_required";

const report = {
  schema_version: "1.0.0",
  receipt_type: "accessibility_review",
  review_id: reviewId,
  status: decision,
  decision,
  approval_basis: ownerAttestation
    ? "owner_attestation"
    : "automated_evidence_only",
  formal_gate_status: localOnlyAccessibilityException
    ? "waived_local_only_emulator_exception"
    : decision === "approved"
      ? "waived_local_only_owner_attested"
      : "pending_local_owner_attestation",
  scope: {
    surface: "learner_web_prototype",
    route: "/prototype/u01-l1",
    states: "P-M1-01..P-M1-20",
    distribution_scope: "local_only",
    runtime_eligible: false,
    actual_audio_playback: "deferred_phase_1_p1_3",
  },
  artifact: {
    seed_ref: seedPath,
    seed_id: seed.id,
    seed_sha256: sha256(finalSeedBytes),
    seed_version: seed.version,
    manifest_ref: manifestPath,
    manifest_id: manifest.manifest_id,
    manifest_sha256: sha256(finalManifestBytes),
    rights_receipt_ref: nextRightsReceiptPath,
    rights_receipt_id: nextRightsReceiptId,
    prototype_ref: prototypePath,
    prototype_css_ref: prototypeCssPath,
    build_evidence: "source_contract_and_owner_manual_review",
    emulator_evidence_ref: emulatorEvidencePath,
    local_only_decision_ref: localOnlyDecisionPath,
  },
  matrix_ref:
    "docs/product-specs/platform-support-and-accessibility-matrix.md@1.0",
  automated_checks: checks,
  manual_checks: manualChecks,
  gate_results: {
    "ACC-001_semantic_and_keyboard": ownerAttestation
      ? "owner_attested"
      : "not_tested",
    "ACC-002_reflow_and_visual_modes": ownerAttestation
      ? "owner_attested"
      : "not_tested",
    "ACC-003_japanese_and_construct_equivalence": ownerAttestation
      ? "owner_attested"
      : "not_tested",
    "ACC-004_audio_failure_and_alternative": ownerAttestation
      ? "owner_attested"
      : "not_tested",
    "ACC-005_formal_cross_platform_matrix": localOnlyAccessibilityException
      ? "waived_local_only_emulator_exception"
      : emulatorEvidence.formal_gate_status,
    "ACC-006_emulator_subset":
      emulatorEvidence.status === "passed_emulator_subset"
        ? "passed_emulator_subset"
        : "not_tested",
  },
  findings: [
    {
      id: "FINDING.ACC-PLAYBACK-P1",
      severity: "observation",
      summary:
        "Prototype audio control masih berupa state simulation; actual audio player dan physical playback QA ditunda ke Phase 1 P1.3.",
      evidence: "Option 1 dipilih secara eksplisit oleh requester.",
      status: "deferred",
      target_phase: "P1.3",
    },
    {
      id: "FINDING.ACC-PHYSICAL-MATRIX",
      severity: localOnlyAccessibilityException ? "observation" : "blocker",
      summary: localOnlyAccessibilityException
        ? "Physical cross-platform matrix dikecualikan untuk scope local-only Phase 0; formal support claim tetap tidak dibuat."
        : "Formal cross-platform accessibility gate belum dapat ditutup hanya dengan emulator.",
      evidence: localOnlyAccessibilityException
        ? `Owner-approved local-only exception: ${localOnlyDecisionPath}. Approved platform matrix v1.0 tetap tidak berubah.`
        : "Approved platform matrix v1.0 mewajibkan physical iOS dan physical Android untuk touch, soft keyboard, assistive technology, serta speaker/headphone playback.",
      status: localOnlyAccessibilityException ? "waived_local_only" : "blocked",
      target_phase: "P1.3",
    },
    ...automatedFailures.map((check) => ({
      id: `FINDING.${check.id}`,
      severity: "blocker",
      summary: check.criterion,
      evidence: check.evidence,
      status: "open",
    })),
  ],
  reviewers: ownerAttestation
    ? [
        {
          reviewer_id: "owner-attestation",
          role: "Product/Content Owner (attestation only)",
          decision: "approved",
          reviewed_at: now,
          confirmation_source: "explicit_owner_statement_in_current_task",
          notes:
            "Scoped local-only prototype approval. Bukan klaim formal WCAG support atau external accessibility reviewer sign-off.",
        },
      ]
    : [],
  created_at: now,
  notes: [
    "Receipt terikat ke exact seed, manifest, dan prototype source hash; perubahan material memerlukan review ulang.",
    localOnlyAccessibilityException
      ? `Physical AT/device evidence dikecualikan hanya untuk local-only Phase 0 melalui ${localOnlyDecisionPath}; formal WCAG/platform support tetap tidak diklaim.`
      : "Audio player sungguhan, speaker/headphone playback, dan formal AT matrix tetap menjadi scope Phase 1 P1.3 atau gate platform berikutnya.",
    "Seed tetap draft dan runtime_eligible=false; receipt ini hanya mengubah status review prototype local-only.",
  ],
};

if (ownerAttestation || automatedFailures.length > 0) {
  if (ownerAttestation && automatedFailures.length === 0) {
    await writeFile(resolve(root, manifestPath), finalManifestBytes, "utf8");
    await writeFile(resolve(root, seedPath), finalSeedBytes, "utf8");
    await writeFile(resolve(root, audioPlanPath), finalAudioPlanBytes, "utf8");
    await writeFile(
      resolve(root, nextRightsReceiptPath),
      serializeJson(nextRightsReceipt),
      "utf8",
    );
  }
  await writeFile(
    resolve(root, outputPath),
    `${JSON.stringify(report, null, 2)}\n`,
    "utf8",
  );
}

if (automatedFailures.length > 0) {
  process.stderr.write(
    `Accessibility review gagal: ${String(automatedFailures.length)} check gagal.\n`,
  );
  process.exitCode = 1;
} else if (ownerAttestation) {
  process.stdout.write(
    `Accessibility review owner-attested: approved untuk prototype local-only; actual playback deferred ke P1.3.\nManifest: ${sha256(finalManifestBytes)}\n`,
  );
} else {
  process.stdout.write(
    "Accessibility automated source review lulus; gunakan --record-owner-attestation untuk merekam keputusan owner.\n",
  );
}
