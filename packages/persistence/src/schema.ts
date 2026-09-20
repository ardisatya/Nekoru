import {
  boolean,
  index,
  integer,
  jsonb,
  pgSchema,
  primaryKey,
  text,
  timestamp,
  uniqueIndex,
} from "drizzle-orm/pg-core";

const auditColumns = {
  created_at: timestamp({ withTimezone: true, mode: "string" })
    .notNull()
    .defaultNow(),
  revision: integer().notNull().default(1),
};

export const identity = pgSchema("identity");
export const learner = pgSchema("learner");
export const curriculum = pgSchema("curriculum");
export const content = pgSchema("content");
export const practice = pgSchema("practice");
export const learning = pgSchema("learning");
export const platform = pgSchema("platform");
export const audit = pgSchema("audit");
export const assessment = pgSchema("assessment");
export const offline = pgSchema("offline");

export const users = identity.table("users", {
  id: text().primaryKey(),
  status: text().notNull().default("active"),
  ...auditColumns,
});
export const externalIdentities = identity.table(
  "external_identities",
  {
    id: text().primaryKey(),
    user_id: text()
      .notNull()
      .references(() => users.id),
    environment: text().notNull(),
    provider: text().notNull(),
    provider_subject: text().notNull(),
    verified_email_hash: text(),
    ...auditColumns,
  },
  (table) => [
    uniqueIndex("external_identity_subject_uq").on(
      table.environment,
      table.provider,
      table.provider_subject,
    ),
  ],
);

export const learnerProfiles = learner.table("profiles", {
  id: text().primaryKey(),
  user_id: text()
    .notNull()
    .unique()
    .references(() => users.id),
  locale: text().notNull().default("id-ID"),
  timezone: text().notNull(),
  ...auditColumns,
});
export const learnerGoals = learner.table("goals", {
  id: text().primaryKey(),
  learner_id: text()
    .notNull()
    .references(() => learnerProfiles.id),
  program: text().notNull().default("N5"),
  target_date: timestamp({ withTimezone: true, mode: "string" }),
  status: text().notNull().default("active"),
  ...auditColumns,
});
export const learnerAvailability = learner.table(
  "availability",
  {
    learner_id: text()
      .notNull()
      .references(() => learnerProfiles.id),
    weekday: integer().notNull(),
    minutes: integer().notNull(),
    revision: integer().notNull().default(1),
  },
  (table) => [primaryKey({ columns: [table.learner_id, table.weekday] })],
);
export const guestDraftMigrations = learner.table(
  "guest_draft_migrations",
  {
    id: text().primaryKey(),
    learner_id: text()
      .notNull()
      .references(() => learnerProfiles.id),
    draft_fingerprint: text().notNull(),
    migrated_at: timestamp({ withTimezone: true, mode: "string" })
      .notNull()
      .defaultNow(),
  },
  (table) => [
    uniqueIndex("guest_draft_migration_uq").on(
      table.learner_id,
      table.draft_fingerprint,
    ),
  ],
);

export const curricula = curriculum.table(
  "curricula",
  {
    id: text().notNull(),
    version: integer().notNull(),
    hash: text().notNull(),
    status: text().notNull(),
    created_at: timestamp({ withTimezone: true, mode: "string" })
      .notNull()
      .defaultNow(),
  },
  (table) => [
    primaryKey({ columns: [table.id, table.version] }),
    uniqueIndex("curriculum_hash_uq").on(table.hash),
  ],
);
export const stages = curriculum.table(
  "stages",
  {
    id: text().primaryKey(),
    curriculum_id: text().notNull(),
    curriculum_version: integer().notNull(),
    code: text().notNull(),
    title: text().notNull(),
    order_index: integer().notNull(),
  },
  (table) => [
    uniqueIndex("stage_code_version_uq").on(
      table.curriculum_id,
      table.curriculum_version,
      table.code,
    ),
  ],
);
export const units = curriculum.table(
  "units",
  {
    id: text().primaryKey(),
    stage_id: text()
      .notNull()
      .references(() => stages.id),
    code: text().notNull(),
    title: text().notNull(),
    order_index: integer().notNull(),
  },
  (table) => [uniqueIndex("unit_stage_code_uq").on(table.stage_id, table.code)],
);
export const lessons = curriculum.table(
  "lessons",
  {
    id: text().primaryKey(),
    unit_id: text()
      .notNull()
      .references(() => units.id),
    code: text().notNull(),
    title: text().notNull(),
    order_index: integer().notNull(),
  },
  (table) => [uniqueIndex("lesson_unit_code_uq").on(table.unit_id, table.code)],
);
export const knowledgeComponents = curriculum.table("knowledge_components", {
  id: text().primaryKey(),
  code: text().notNull().unique(),
  domain: text().notNull(),
  required: boolean().notNull().default(false),
  metadata: jsonb().notNull().default({}),
});
export const prerequisites = curriculum.table(
  "prerequisites",
  {
    from_kc_id: text()
      .notNull()
      .references(() => knowledgeComponents.id),
    to_kc_id: text()
      .notNull()
      .references(() => knowledgeComponents.id),
    relation: text().notNull(),
    minimum_score_micros: integer().notNull(),
  },
  (table) => [
    primaryKey({ columns: [table.from_kc_id, table.to_kc_id, table.relation] }),
  ],
);

export const contentVersions = content.table(
  "content_versions",
  {
    id: text().notNull(),
    version: integer().notNull(),
    hash: text().notNull(),
    status: text().notNull(),
    source: jsonb().notNull(),
    created_at: timestamp({ withTimezone: true, mode: "string" })
      .notNull()
      .defaultNow(),
  },
  (table) => [
    primaryKey({ columns: [table.id, table.version] }),
    uniqueIndex("content_hash_uq").on(table.hash),
  ],
);
export const assets = content.table("assets", {
  id: text().primaryKey(),
  kind: text().notNull(),
  checksum: text(),
  rights_receipt_id: text(),
  status: text().notNull(),
  metadata: jsonb().notNull().default({}),
});
export const contentPacks = content.table(
  "content_packs",
  {
    id: text().notNull(),
    version: integer().notNull(),
    hash: text().notNull(),
    status: text().notNull(),
    version_set: jsonb().notNull(),
    created_at: timestamp({ withTimezone: true, mode: "string" })
      .notNull()
      .defaultNow(),
  },
  (table) => [primaryKey({ columns: [table.id, table.version] })],
);
export const contentPackEntries = content.table(
  "content_pack_entries",
  {
    pack_id: text().notNull(),
    pack_version: integer().notNull(),
    content_id: text().notNull(),
    content_version: integer().notNull(),
  },
  (table) => [
    primaryKey({
      columns: [
        table.pack_id,
        table.pack_version,
        table.content_id,
        table.content_version,
      ],
    }),
  ],
);

export const practiceRuns = practice.table("runs", {
  id: text().primaryKey(),
  learner_id: text().notNull(),
  session_plan_id: text().notNull(),
  status: text().notNull(),
  version_set: jsonb().notNull(),
  started_at: timestamp({ withTimezone: true, mode: "string" })
    .notNull()
    .defaultNow(),
  completed_at: timestamp({ withTimezone: true, mode: "string" }),
  revision: integer().notNull().default(1),
});
export const activityInstances = practice.table(
  "activity_instances",
  {
    id: text().primaryKey(),
    practice_run_id: text()
      .notNull()
      .references(() => practiceRuns.id),
    content_id: text().notNull(),
    content_version: integer().notNull(),
    locked_payload_hash: text().notNull(),
    presentation: jsonb().notNull(),
    order_index: integer().notNull(),
  },
  (table) => [
    uniqueIndex("activity_run_order_uq").on(
      table.practice_run_id,
      table.order_index,
    ),
  ],
);
export const submissions = practice.table(
  "submissions",
  {
    id: text().primaryKey(),
    activity_instance_id: text()
      .notNull()
      .references(() => activityInstances.id),
    attempt_number: integer().notNull(),
    response_payload: jsonb().notNull(),
    response_hash: text().notNull(),
    submitted_at: timestamp({ withTimezone: true, mode: "string" })
      .notNull()
      .defaultNow(),
  },
  (table) => [
    uniqueIndex("submission_attempt_uq").on(
      table.activity_instance_id,
      table.attempt_number,
    ),
  ],
);
export const evaluations = practice.table("evaluations", {
  id: text().primaryKey(),
  submission_id: text()
    .notNull()
    .unique()
    .references(() => submissions.id),
  evaluator_ref: jsonb().notNull(),
  result: jsonb().notNull(),
  status: text().notNull(),
  created_at: timestamp({ withTimezone: true, mode: "string" })
    .notNull()
    .defaultNow(),
});

export const evidenceEvents = learning.table(
  "evidence_events",
  {
    id: text().primaryKey(),
    learner_id: text().notNull(),
    encounter_id: text().notNull(),
    submission_id: text().notNull(),
    primary_kc_id: text().notNull(),
    validity: text().notNull(),
    signal_micros: integer().notNull(),
    weight_micros: integer().notNull(),
    policy_ref: jsonb().notNull(),
    occurred_at: timestamp({ withTimezone: true, mode: "string" }).notNull(),
    supersedes_id: text(),
  },
  (table) => [
    uniqueIndex("evidence_submission_kc_uq").on(
      table.submission_id,
      table.primary_kc_id,
    ),
    index("evidence_learner_kc_idx").on(table.learner_id, table.primary_kc_id),
  ],
);
export const learnerKcStates = learning.table(
  "learner_kc_states",
  {
    id: text().primaryKey(),
    learner_id: text().notNull(),
    kc_id: text().notNull(),
    mastery_score_micros: integer().notNull(),
    confidence_micros: integer().notNull(),
    status: text().notNull(),
    evidence_count: integer().notNull(),
    last_evidence_at: timestamp({ withTimezone: true, mode: "string" }),
    policy_ref: jsonb().notNull(),
    revision: integer().notNull().default(1),
  },
  (table) => [
    uniqueIndex("learner_kc_state_uq").on(table.learner_id, table.kc_id),
  ],
);
export const reviewSchedules = learning.table(
  "review_schedules",
  {
    id: text().primaryKey(),
    learner_id: text().notNull(),
    kc_id: text().notNull(),
    due_at: timestamp({ withTimezone: true, mode: "string" }).notNull(),
    interval_index: integer().notNull(),
    last_rating: text(),
    policy_ref: jsonb().notNull(),
    revision: integer().notNull().default(1),
  },
  (table) => [
    uniqueIndex("review_learner_kc_uq").on(table.learner_id, table.kc_id),
  ],
);
export const decisionLogs = learning.table("decision_logs", {
  id: text().primaryKey(),
  learner_id: text().notNull(),
  decision_type: text().notNull(),
  input_hash: text().notNull(),
  version_set: jsonb().notNull(),
  reason_codes: text().array().notNull(),
  output: jsonb().notNull(),
  decided_at: timestamp({ withTimezone: true, mode: "string" })
    .notNull()
    .defaultNow(),
});

export const idempotencyReceipts = platform.table(
  "idempotency_receipts",
  {
    id: text().primaryKey(),
    scope: text().notNull(),
    key_hash: text().notNull(),
    request_hash: text().notNull(),
    response_status: integer().notNull(),
    response_body: jsonb().notNull(),
    created_at: timestamp({ withTimezone: true, mode: "string" })
      .notNull()
      .defaultNow(),
    expires_at: timestamp({ withTimezone: true, mode: "string" }).notNull(),
  },
  (table) => [
    uniqueIndex("idempotency_scope_key_uq").on(table.scope, table.key_hash),
  ],
);
export const outboxMessages = platform.table(
  "outbox_messages",
  {
    id: text().primaryKey(),
    event_id: text().notNull().unique(),
    event_type: text().notNull(),
    event_version: integer().notNull(),
    aggregate_type: text().notNull(),
    aggregate_id: text().notNull(),
    aggregate_sequence: integer().notNull(),
    payload: jsonb().notNull(),
    payload_hash: text().notNull(),
    classification: text().notNull(),
    destination_key: text().notNull(),
    state: text().notNull().default("pending"),
    available_at: timestamp({ withTimezone: true, mode: "string" })
      .notNull()
      .defaultNow(),
    lease_owner: text(),
    lease_expires_at: timestamp({ withTimezone: true, mode: "string" }),
    publish_attempts: integer().notNull().default(0),
    provider_message_id: text(),
    provider_deduplicated: boolean(),
    last_error_code: text(),
    published_at: timestamp({ withTimezone: true, mode: "string" }),
    completed_at: timestamp({ withTimezone: true, mode: "string" }),
    retention_policy_key: text().notNull(),
    created_at: timestamp({ withTimezone: true, mode: "string" })
      .notNull()
      .defaultNow(),
    updated_at: timestamp({ withTimezone: true, mode: "string" })
      .notNull()
      .defaultNow(),
  },
  (table) => [
    uniqueIndex("outbox_aggregate_sequence_uq").on(
      table.aggregate_type,
      table.aggregate_id,
      table.aggregate_sequence,
    ),
  ],
);
export const inboxReceipts = platform.table(
  "inbox_receipts",
  {
    id: text().primaryKey(),
    producer: text().notNull(),
    message_id: text().notNull(),
    event_id: text(),
    event_type: text().notNull(),
    event_version: integer().notNull(),
    payload_hash: text().notNull(),
    handler_name: text().notNull(),
    handler_version: integer().notNull(),
    state: text().notNull().default("processing"),
    aggregate_sequence: integer(),
    effect_receipt: jsonb(),
    attempts: integer().notNull().default(1),
    first_received_at: timestamp({ withTimezone: true, mode: "string" })
      .notNull()
      .defaultNow(),
    last_received_at: timestamp({ withTimezone: true, mode: "string" })
      .notNull()
      .defaultNow(),
    completed_at: timestamp({ withTimezone: true, mode: "string" }),
    last_error_code: text(),
    retention_policy_key: text().notNull(),
  },
  (table) => [
    uniqueIndex("inbox_delivery_handler_uq").on(
      table.producer,
      table.message_id,
      table.handler_name,
      table.handler_version,
    ),
    uniqueIndex("inbox_event_handler_uq").on(
      table.event_id,
      table.handler_name,
      table.handler_version,
    ),
  ],
);
export const auditEvents = audit.table("events", {
  id: text().primaryKey(),
  actor_id: text(),
  action: text().notNull(),
  subject_id: text().notNull(),
  subject_version: text(),
  before_hash: text(),
  after_hash: text(),
  metadata: jsonb().notNull().default({}),
  occurred_at: timestamp({ withTimezone: true, mode: "string" })
    .notNull()
    .defaultNow(),
});

export const schemaRegistry = {
  identity,
  learner,
  curriculum,
  content,
  practice,
  learning,
  platform,
  audit,
  assessment,
  offline,
} as const;
