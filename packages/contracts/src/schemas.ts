import { z } from "zod";
import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
import { prefixedUlidPattern } from "@nekoru/domain";

extendZodWithOpenApi(z);

export const sha256Schema = z.string().regex(/^sha256:[0-9a-f]{64}$/);
export const prefixedUlidSchema = z.string().regex(prefixedUlidPattern);
export const timestampSchema = z.string().datetime({ offset: true });
export const versionRefSchema = z
  .object({
    hash: sha256Schema,
    id: prefixedUlidSchema,
    version: z.number().int().positive(),
  })
  .strict();
export const versionSetSchema = z
  .object({
    schema_version: z.literal(1),
    curriculum: versionRefSchema,
    content_pack: versionRefSchema,
    learning_policy: versionRefSchema,
    mastery_policy: versionRefSchema,
    practice_policy: versionRefSchema,
    evaluator: versionRefSchema,
    assessment_blueprint: z.null(),
  })
  .strict();

export const problemSchema = z
  .object({
    type: z.string().url(),
    title: z.string(),
    status: z.number().int().min(400).max(599),
    detail: z.string(),
    instance: z.string().optional(),
    reason_code: z.string(),
    correlation_id: prefixedUlidSchema.optional(),
  })
  .strict();

export const healthSchema = z
  .object({
    status: z.enum(["ok", "degraded"]),
    service: z.string(),
    version: z.string(),
    environment: z.string(),
  })
  .strict();

export const learnerProfileSchema = z
  .object({
    id: prefixedUlidSchema,
    user_id: prefixedUlidSchema,
    display_name: z.string().trim().min(1).max(120).nullable(),
    experience_path: z.enum(["absolute_beginner", "placement"]),
    locale: z.literal("id-ID"),
    timezone: z.string().min(1),
    preference_refs: z.array(z.string().min(1)),
    accommodation_profile_ref: prefixedUlidSchema.nullable(),
    revision: z.number().int().positive(),
  })
  .strict();

export const guestOnboardingDraftSchema = z
  .object({
    schema_version: z.literal(1),
    draft_id: z.uuid(),
    created_at: timestampSchema,
    expires_at: timestampSchema,
    goal: z.record(z.string(), z.unknown()),
    availability: z.array(z.record(z.string(), z.unknown())),
    locale: z.literal("id-ID"),
    timezone: z.string().min(1),
    migration_state: z.enum(["local", "migrating", "migrated", "failed"]),
  })
  .strict();

export const sessionPlanItemSchema = z
  .object({
    order: z.number().int().nonnegative(),
    target_kc_id: prefixedUlidSchema,
    content_ref: versionRefSchema,
    purpose: z.enum(["new", "review", "remedial", "probe", "exit_check"]),
    priority: z.number().int(),
    estimated_duration_seconds: z.number().int().positive(),
    support_policy_ref: versionRefSchema,
  })
  .strict();

export const sessionPlanSchema = z
  .object({
    id: prefixedUlidSchema,
    learner_id: prefixedUlidSchema,
    source_learning_plan_revision: z.number().int().positive(),
    version_set: versionSetSchema,
    mode: z.enum(["guided", "review", "remedial"]),
    target_duration_minutes: z.number().int().positive(),
    items: z.array(sessionPlanItemSchema).min(1),
    target_kc_ids: z.array(prefixedUlidSchema).min(1),
    reason_codes: z.array(z.string().min(1)).min(1),
    review_allocation_micros: z.number().int().min(0).max(1_000_000),
    new_content_allocation_micros: z.number().int().min(0).max(1_000_000),
    generated_at: timestampSchema,
    expires_at: timestampSchema,
    decision_hash: sha256Schema,
  })
  .strict();

export const practiceRunSchema = z
  .object({
    id: prefixedUlidSchema,
    learner_id: prefixedUlidSchema,
    session_plan_id: prefixedUlidSchema,
    version_set: versionSetSchema,
    mode: z.enum(["guided", "review", "remedial"]),
    state: z.enum([
      "created",
      "active",
      "paused",
      "completed",
      "abandoned",
      "invalidated",
    ]),
    current_item_index: z.number().int().nonnegative(),
    started_at: timestampSchema.nullable(),
    completed_at: timestampSchema.nullable(),
    resume_token_version: z.number().int().positive(),
    completion_summary_ref: prefixedUlidSchema.nullable(),
    revision: z.number().int().positive(),
  })
  .strict();

export const submissionSchema = z
  .object({
    id: prefixedUlidSchema,
    activity_instance_id: prefixedUlidSchema,
    raw_response: z.record(z.string(), z.unknown()),
    normalized_response: z.record(z.string(), z.unknown()),
    response_schema_version: z.number().int().positive(),
    attempt_number: z.number().int().positive(),
    hint_state: z.record(z.string(), z.unknown()),
    support_state: z.record(z.string(), z.unknown()),
    replay_count: z.number().int().nonnegative(),
    client_event_at: timestampSchema.nullable(),
    received_at: timestampSchema,
    idempotency_key: z.string().min(1),
  })
  .strict();

export const evaluationResultSchema = z
  .object({
    id: prefixedUlidSchema,
    submission_id: prefixedUlidSchema,
    status: z.enum([
      "correct",
      "partial",
      "incorrect",
      "pending",
      "invalid",
      "technical_failure",
    ]),
    score_micros: z.number().int().min(0).max(1_000_000).nullable(),
    parts: z.record(z.string(), z.unknown()),
    reason_codes: z.array(z.string().min(1)),
    evaluator_ref: versionRefSchema,
    rubric_ref: versionRefSchema.nullable(),
    feedback_release_ref: versionRefSchema.nullable(),
    calculation_hash: sha256Schema,
    supersedes_id: prefixedUlidSchema.nullable(),
  })
  .strict()
  .superRefine((value, context) => {
    if (
      ["pending", "invalid", "technical_failure"].includes(value.status) &&
      value.score_micros !== null
    ) {
      context.addIssue({
        code: "custom",
        message: "Status non-akademik tidak boleh menghasilkan score",
        path: ["score_micros"],
      });
    }
  });

export const evidenceEventSchema = z
  .object({
    id: prefixedUlidSchema,
    learner_id: prefixedUlidSchema,
    kc_id: prefixedUlidSchema,
    evidence_type: z.string().min(1),
    source_ref: z
      .object({ type: z.string().min(1), id: prefixedUlidSchema })
      .strict(),
    encounter_id: z.string().min(1),
    signal: z.record(z.string(), z.unknown()),
    eligibility: z.enum(["accepted", "rejected", "pending", "superseded"]),
    reason_codes: z.array(z.string().min(1)),
    version_set: versionSetSchema,
    occurred_at: timestampSchema,
    supersedes_id: prefixedUlidSchema.nullable(),
  })
  .strict();

export const learnerKcStateSchema = z
  .object({
    id: prefixedUlidSchema,
    learner_id: prefixedUlidSchema,
    kc_id: prefixedUlidSchema,
    status: z.enum([
      "not_started",
      "learning",
      "provisional",
      "mastered",
      "review_required",
    ]),
    mastery_score_micros: z.number().int().min(0).max(1_000_000),
    confidence_micros: z.number().int().min(0).max(1_000_000),
    evidence_sufficiency: z.record(z.string(), z.unknown()),
    diagnostic_dimensions: z.record(z.string(), z.unknown()),
    last_evidence_id: prefixedUlidSchema.nullable(),
    review_due_at: timestampSchema.nullable(),
    policy_ref: versionRefSchema,
    calculation_hash: sha256Schema,
    revision: z.number().int().positive(),
  })
  .strict();
const aggregateRefSchema = z
  .object({
    id: prefixedUlidSchema,
    revision: z.number().int().nonnegative(),
    sequence: z.number().int().positive(),
    type: z.string().min(1),
  })
  .strict();

const subjectRefSchema = z
  .object({ id: prefixedUlidSchema, type: z.string().min(1) })
  .strict();

export const eventEnvelopeSchema = z
  .object({
    aggregate: aggregateRefSchema,
    causation_id: prefixedUlidSchema.nullable(),
    correlation_id: prefixedUlidSchema.refine(
      (value) => value.startsWith("cor_"),
      "correlation_id harus memakai prefix cor_",
    ),
    data: z.record(z.string(), z.unknown()),
    event_id: prefixedUlidSchema.refine(
      (value) => value.startsWith("evt_"),
      "event_id harus memakai prefix evt_",
    ),
    event_type: z.string().regex(/^[a-z][a-z0-9_.]*$/),
    event_version: z.literal(1),
    occurred_at: timestampSchema,
    payload_hash: sha256Schema,
    producer: z.string().min(1),
    schema_version: z.literal(1),
    subject: subjectRefSchema.optional(),
    trace_context: z
      .object({ trace_id: z.string().min(1).nullable() })
      .strict(),
  })
  .strict();

export const activityTypeSchema = z.enum(["single_choice", "select_to_pair"]);
export const contentStatusSchema = z.enum([
  "draft",
  "in_review",
  "revision_required",
  "approved",
  "published",
  "deprecated",
  "quarantined",
]);
export const assetSchema = z
  .object({
    id: prefixedUlidSchema,
    kind: z.literal("audio"),
    status: z.enum(["pending", "ready"]),
    checksum: sha256Schema.nullable(),
    rights_receipt_id: z.string().nullable(),
    speaker_variant: z.enum(["a", "b"]),
  })
  .strict();
export const activityDefinitionSchema = z
  .object({
    id: prefixedUlidSchema,
    activity_type: activityTypeSchema,
    family: z.string(),
    primary_kc_id: prefixedUlidSchema,
    evidence_mode: z.enum(["direct", "guided", "exposure"]),
    prompt_id: z.string(),
  })
  .strict();
export const contentSeedSchema = z
  .object({
    schema_version: z.literal("1.0.0"),
    id: prefixedUlidSchema,
    version: z.string(),
    status: contentStatusSchema,
    unit_id: z.literal("U01"),
    lesson_id: z.literal("U01-L1"),
    runtime_eligible: z.boolean(),
    fixture_only: z.boolean(),
    knowledge_components: z.array(
      z
        .object({
          id: prefixedUlidSchema,
          code: z.string(),
          required: z.boolean(),
        })
        .strict(),
    ),
    vocabulary_chunks: z.array(
      z
        .object({
          id: prefixedUlidSchema,
          japanese: z.string(),
          communicative_translation_id: z.string(),
        })
        .strict(),
    ),
    session_blueprints: z.array(
      z
        .object({
          id: z.string(),
          order: z.number().int(),
          purpose_id: z.string(),
        })
        .strict(),
    ),
    activities: z.array(activityDefinitionSchema),
    assets: z.array(assetSchema),
    approval_receipts: z.array(z.string()),
  })
  .strict()
  .superRefine((value, context) => {
    if (
      (value.status === "approved" || value.status === "published") &&
      value.assets.some(
        (asset) =>
          asset.status !== "ready" ||
          asset.checksum === null ||
          asset.rights_receipt_id === null,
      )
    )
      context.addIssue({
        code: "custom",
        message:
          "Approved content memerlukan asset ready, checksum, dan rights receipt",
        path: ["assets"],
      });
    if (
      (value.status === "approved" || value.status === "published") &&
      value.approval_receipts.length === 0
    )
      context.addIssue({
        code: "custom",
        message: "Approved content memerlukan approval receipt",
        path: ["approval_receipts"],
      });
    if (value.runtime_eligible && value.status !== "published")
      context.addIssue({
        code: "custom",
        message: "Runtime hanya memilih published content",
        path: ["runtime_eligible"],
      });
    if (value.fixture_only && value.runtime_eligible)
      context.addIssue({
        code: "custom",
        message: "Fixture tidak boleh runtime eligible",
        path: ["runtime_eligible"],
      });
  });

export type ContentSeed = z.infer<typeof contentSeedSchema>;
