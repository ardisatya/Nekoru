import { contentSeedSchema, type ContentSeed } from "@nekoru/contracts";

export interface ValidationReport {
  valid: boolean;
  runtime_eligible: boolean;
  content_hash: string | null;
  counts: {
    activities: number;
    audio_assets: number;
    session_blueprints: number;
  };
  blockers: string[];
  errors: string[];
}

const expectedFamilies: Record<string, number> = {
  vowel_discrimination: 15,
  vowel_pair: 5,
  mora_count: 6,
  greeting_context: 12,
  greeting_pair: 4,
  script_awareness: 1,
};

export function validateU01L1(
  input: unknown,
  hash: (value: ContentSeed) => string,
): ValidationReport {
  const parsed = contentSeedSchema.safeParse(input);
  if (!parsed.success)
    return {
      valid: false,
      runtime_eligible: false,
      content_hash: null,
      counts: { activities: 0, audio_assets: 0, session_blueprints: 0 },
      blockers: [],
      errors: parsed.error.issues.map(
        (issue) => `${issue.path.join(".")}: ${issue.message}`,
      ),
    };
  const seed = parsed.data;
  const counts = Object.fromEntries(
    Object.keys(expectedFamilies).map((family) => [
      family,
      seed.activities.filter((activity) => activity.family === family).length,
    ]),
  );
  const errors = Object.entries(expectedFamilies)
    .filter(([family, expected]) => counts[family] !== expected)
    .map(
      ([family, expected]) => `${family} harus berjumlah ${String(expected)}`,
    );
  if (seed.activities.length !== 43)
    errors.push("U01-L1 harus memiliki 43 activity definitions");
  if (seed.assets.length !== 26)
    errors.push("U01-L1 harus memiliki 26 audio asset records");
  if (
    new Set(seed.activities.map((activity) => activity.id)).size !==
    seed.activities.length
  )
    errors.push("Activity ID harus unik");
  const blockers = [
    ...(seed.assets.some((asset) => asset.status !== "ready")
      ? ["Audio assets belum ready"]
      : []),
    ...(seed.assets.some((asset) => asset.rights_receipt_id === null)
      ? ["Rights receipts belum tersedia"]
      : []),
    ...(seed.approval_receipts.length === 0
      ? ["Approval receipts belum tersedia"]
      : []),
  ];
  return {
    valid: errors.length === 0,
    runtime_eligible:
      seed.runtime_eligible &&
      seed.status === "published" &&
      blockers.length === 0,
    content_hash: hash(seed),
    counts: {
      activities: seed.activities.length,
      audio_assets: seed.assets.length,
      session_blueprints: seed.session_blueprints.length,
    },
    blockers,
    errors,
  };
}
