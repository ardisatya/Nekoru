export const milestoneOneEventCatalog = [
  ["identity_reconciled", "identity", "audit/profile", "confidential"],
  [
    "guest_draft_migrated",
    "profile",
    "audit/product_analytics",
    "confidential_without_draft_body",
  ],
  ["learner_profile_updated", "profile", "learning/audit", "confidential"],
  [
    "learning_plan_created",
    "learning",
    "learner_read_model/audit",
    "confidential",
  ],
  ["session_planned", "learning", "practice/audit", "confidential"],
  ["session_started", "practice", "learning/analytics", "confidential"],
  ["activity_started", "practice", "analytics", "confidential"],
  ["hint_used", "practice", "evidence/analytics", "confidential"],
  ["audio_replayed", "practice", "analytics", "confidential"],
  [
    "answer_submitted",
    "practice",
    "internal_transaction/audit",
    "restricted_no_raw_response",
  ],
  [
    "answer_evaluated",
    "practice",
    "learning/evidence",
    "confidential_structured_result",
  ],
  ["evidence_recorded", "learning", "mastery/audit", "confidential"],
  [
    "mastery_recalculated",
    "mastery",
    "learning/read_model/audit",
    "confidential",
  ],
  [
    "review_scheduled",
    "mastery",
    "learning/notification_read_model",
    "confidential",
  ],
  ["activity_skipped", "practice", "learning/analytics", "confidential"],
  ["activity_completed", "practice", "learning/analytics", "confidential"],
  ["session_completed", "practice", "learning/analytics", "confidential"],
  ["session_abandoned", "practice", "learning/analytics", "confidential"],
  [
    "technical_failure_recorded",
    "owning_module",
    "operations/qa",
    "internal_or_confidential_redacted",
  ],
] as const;

export const milestoneOneEvents = milestoneOneEventCatalog.map(
  ([eventType, producer, primaryConsumer, classification]) => ({
    event_type: eventType,
    event_version: 1,
    producer,
    primary_consumer: primaryConsumer,
    classification,
    implementation_status: "contract_only" as const,
  }),
);
