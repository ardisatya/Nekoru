CREATE SCHEMA "assessment";
--> statement-breakpoint
CREATE SCHEMA "audit";
--> statement-breakpoint
CREATE SCHEMA "content";
--> statement-breakpoint
CREATE SCHEMA "curriculum";
--> statement-breakpoint
CREATE SCHEMA "identity";
--> statement-breakpoint
CREATE SCHEMA "learner";
--> statement-breakpoint
CREATE SCHEMA "learning";
--> statement-breakpoint
CREATE SCHEMA "offline";
--> statement-breakpoint
CREATE SCHEMA "platform";
--> statement-breakpoint
CREATE SCHEMA "practice";
--> statement-breakpoint
CREATE TABLE "practice"."activity_instances" (
	"id" text PRIMARY KEY NOT NULL,
	"practice_run_id" text NOT NULL,
	"content_id" text NOT NULL,
	"content_version" integer NOT NULL,
	"locked_payload_hash" text NOT NULL,
	"presentation" jsonb NOT NULL,
	"order_index" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "content"."assets" (
	"id" text PRIMARY KEY NOT NULL,
	"kind" text NOT NULL,
	"checksum" text,
	"rights_receipt_id" text,
	"status" text NOT NULL,
	"metadata" jsonb DEFAULT '{}'::jsonb NOT NULL
);
--> statement-breakpoint
CREATE TABLE "audit"."events" (
	"id" text PRIMARY KEY NOT NULL,
	"actor_id" text,
	"action" text NOT NULL,
	"subject_id" text NOT NULL,
	"subject_version" text,
	"before_hash" text,
	"after_hash" text,
	"metadata" jsonb DEFAULT '{}'::jsonb NOT NULL,
	"occurred_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "content"."content_pack_entries" (
	"pack_id" text NOT NULL,
	"pack_version" integer NOT NULL,
	"content_id" text NOT NULL,
	"content_version" integer NOT NULL,
	CONSTRAINT "content_pack_entries_pack_id_pack_version_content_id_content_version_pk" PRIMARY KEY("pack_id","pack_version","content_id","content_version")
);
--> statement-breakpoint
CREATE TABLE "content"."content_packs" (
	"id" text NOT NULL,
	"version" integer NOT NULL,
	"hash" text NOT NULL,
	"status" text NOT NULL,
	"version_set" jsonb NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "content_packs_id_version_pk" PRIMARY KEY("id","version")
);
--> statement-breakpoint
CREATE TABLE "content"."content_versions" (
	"id" text NOT NULL,
	"version" integer NOT NULL,
	"hash" text NOT NULL,
	"status" text NOT NULL,
	"source" jsonb NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "content_versions_id_version_pk" PRIMARY KEY("id","version")
);
--> statement-breakpoint
CREATE TABLE "curriculum"."curricula" (
	"id" text NOT NULL,
	"version" integer NOT NULL,
	"hash" text NOT NULL,
	"status" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "curricula_id_version_pk" PRIMARY KEY("id","version")
);
--> statement-breakpoint
CREATE TABLE "learning"."decision_logs" (
	"id" text PRIMARY KEY NOT NULL,
	"learner_id" text NOT NULL,
	"decision_type" text NOT NULL,
	"input_hash" text NOT NULL,
	"version_set" jsonb NOT NULL,
	"reason_codes" text[] NOT NULL,
	"output" jsonb NOT NULL,
	"decided_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "practice"."evaluations" (
	"id" text PRIMARY KEY NOT NULL,
	"submission_id" text NOT NULL,
	"evaluator_ref" jsonb NOT NULL,
	"result" jsonb NOT NULL,
	"status" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "evaluations_submission_id_unique" UNIQUE("submission_id")
);
--> statement-breakpoint
CREATE TABLE "learning"."evidence_events" (
	"id" text PRIMARY KEY NOT NULL,
	"learner_id" text NOT NULL,
	"encounter_id" text NOT NULL,
	"submission_id" text NOT NULL,
	"primary_kc_id" text NOT NULL,
	"validity" text NOT NULL,
	"signal_micros" integer NOT NULL,
	"weight_micros" integer NOT NULL,
	"policy_ref" jsonb NOT NULL,
	"occurred_at" timestamp with time zone NOT NULL,
	"supersedes_id" text
);
--> statement-breakpoint
CREATE TABLE "identity"."external_identities" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"environment" text NOT NULL,
	"provider" text NOT NULL,
	"provider_subject" text NOT NULL,
	"verified_email_hash" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"revision" integer DEFAULT 1 NOT NULL
);
--> statement-breakpoint
CREATE TABLE "learner"."guest_draft_migrations" (
	"id" text PRIMARY KEY NOT NULL,
	"learner_id" text NOT NULL,
	"draft_fingerprint" text NOT NULL,
	"migrated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "platform"."idempotency_receipts" (
	"id" text PRIMARY KEY NOT NULL,
	"scope" text NOT NULL,
	"key_hash" text NOT NULL,
	"request_hash" text NOT NULL,
	"response_status" integer NOT NULL,
	"response_body" jsonb NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"expires_at" timestamp with time zone NOT NULL
);
--> statement-breakpoint
CREATE TABLE "platform"."inbox_receipts" (
	"id" text PRIMARY KEY NOT NULL,
	"producer" text NOT NULL,
	"message_id" text NOT NULL,
	"event_id" text,
	"event_type" text NOT NULL,
	"event_version" integer NOT NULL,
	"payload_hash" text NOT NULL,
	"handler_name" text NOT NULL,
	"handler_version" integer NOT NULL,
	"state" text DEFAULT 'processing' NOT NULL,
	"aggregate_sequence" integer,
	"effect_receipt" jsonb,
	"attempts" integer DEFAULT 1 NOT NULL,
	"first_received_at" timestamp with time zone DEFAULT now() NOT NULL,
	"last_received_at" timestamp with time zone DEFAULT now() NOT NULL,
	"completed_at" timestamp with time zone,
	"last_error_code" text,
	"retention_policy_key" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "curriculum"."knowledge_components" (
	"id" text PRIMARY KEY NOT NULL,
	"code" text NOT NULL,
	"domain" text NOT NULL,
	"required" boolean DEFAULT false NOT NULL,
	"metadata" jsonb DEFAULT '{}'::jsonb NOT NULL,
	CONSTRAINT "knowledge_components_code_unique" UNIQUE("code")
);
--> statement-breakpoint
CREATE TABLE "learner"."availability" (
	"learner_id" text NOT NULL,
	"weekday" integer NOT NULL,
	"minutes" integer NOT NULL,
	"revision" integer DEFAULT 1 NOT NULL,
	CONSTRAINT "availability_learner_id_weekday_pk" PRIMARY KEY("learner_id","weekday")
);
--> statement-breakpoint
CREATE TABLE "learner"."goals" (
	"id" text PRIMARY KEY NOT NULL,
	"learner_id" text NOT NULL,
	"program" text DEFAULT 'N5' NOT NULL,
	"target_date" timestamp with time zone,
	"status" text DEFAULT 'active' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"revision" integer DEFAULT 1 NOT NULL
);
--> statement-breakpoint
CREATE TABLE "learning"."learner_kc_states" (
	"id" text PRIMARY KEY NOT NULL,
	"learner_id" text NOT NULL,
	"kc_id" text NOT NULL,
	"mastery_score_micros" integer NOT NULL,
	"confidence_micros" integer NOT NULL,
	"status" text NOT NULL,
	"evidence_count" integer NOT NULL,
	"last_evidence_at" timestamp with time zone,
	"policy_ref" jsonb NOT NULL,
	"revision" integer DEFAULT 1 NOT NULL
);
--> statement-breakpoint
CREATE TABLE "learner"."profiles" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"locale" text DEFAULT 'id-ID' NOT NULL,
	"timezone" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"revision" integer DEFAULT 1 NOT NULL,
	CONSTRAINT "profiles_user_id_unique" UNIQUE("user_id")
);
--> statement-breakpoint
CREATE TABLE "curriculum"."lessons" (
	"id" text PRIMARY KEY NOT NULL,
	"unit_id" text NOT NULL,
	"code" text NOT NULL,
	"title" text NOT NULL,
	"order_index" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "platform"."outbox_messages" (
	"id" text PRIMARY KEY NOT NULL,
	"event_id" text NOT NULL,
	"event_type" text NOT NULL,
	"event_version" integer NOT NULL,
	"aggregate_type" text NOT NULL,
	"aggregate_id" text NOT NULL,
	"aggregate_sequence" integer NOT NULL,
	"payload" jsonb NOT NULL,
	"payload_hash" text NOT NULL,
	"classification" text NOT NULL,
	"destination_key" text NOT NULL,
	"state" text DEFAULT 'pending' NOT NULL,
	"available_at" timestamp with time zone DEFAULT now() NOT NULL,
	"lease_owner" text,
	"lease_expires_at" timestamp with time zone,
	"publish_attempts" integer DEFAULT 0 NOT NULL,
	"provider_message_id" text,
	"provider_deduplicated" boolean,
	"last_error_code" text,
	"published_at" timestamp with time zone,
	"completed_at" timestamp with time zone,
	"retention_policy_key" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "outbox_messages_event_id_unique" UNIQUE("event_id")
);
--> statement-breakpoint
CREATE TABLE "practice"."runs" (
	"id" text PRIMARY KEY NOT NULL,
	"learner_id" text NOT NULL,
	"session_plan_id" text NOT NULL,
	"status" text NOT NULL,
	"version_set" jsonb NOT NULL,
	"started_at" timestamp with time zone DEFAULT now() NOT NULL,
	"completed_at" timestamp with time zone,
	"revision" integer DEFAULT 1 NOT NULL
);
--> statement-breakpoint
CREATE TABLE "curriculum"."prerequisites" (
	"from_kc_id" text NOT NULL,
	"to_kc_id" text NOT NULL,
	"relation" text NOT NULL,
	"minimum_score_micros" integer NOT NULL,
	CONSTRAINT "prerequisites_from_kc_id_to_kc_id_relation_pk" PRIMARY KEY("from_kc_id","to_kc_id","relation")
);
--> statement-breakpoint
CREATE TABLE "learning"."review_schedules" (
	"id" text PRIMARY KEY NOT NULL,
	"learner_id" text NOT NULL,
	"kc_id" text NOT NULL,
	"due_at" timestamp with time zone NOT NULL,
	"interval_index" integer NOT NULL,
	"last_rating" text,
	"policy_ref" jsonb NOT NULL,
	"revision" integer DEFAULT 1 NOT NULL
);
--> statement-breakpoint
CREATE TABLE "curriculum"."stages" (
	"id" text PRIMARY KEY NOT NULL,
	"curriculum_id" text NOT NULL,
	"curriculum_version" integer NOT NULL,
	"code" text NOT NULL,
	"title" text NOT NULL,
	"order_index" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "practice"."submissions" (
	"id" text PRIMARY KEY NOT NULL,
	"activity_instance_id" text NOT NULL,
	"attempt_number" integer NOT NULL,
	"response_payload" jsonb NOT NULL,
	"response_hash" text NOT NULL,
	"submitted_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "curriculum"."units" (
	"id" text PRIMARY KEY NOT NULL,
	"stage_id" text NOT NULL,
	"code" text NOT NULL,
	"title" text NOT NULL,
	"order_index" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "identity"."users" (
	"id" text PRIMARY KEY NOT NULL,
	"status" text DEFAULT 'active' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"revision" integer DEFAULT 1 NOT NULL
);
--> statement-breakpoint
ALTER TABLE "practice"."activity_instances" ADD CONSTRAINT "activity_instances_practice_run_id_runs_id_fk" FOREIGN KEY ("practice_run_id") REFERENCES "practice"."runs"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "practice"."evaluations" ADD CONSTRAINT "evaluations_submission_id_submissions_id_fk" FOREIGN KEY ("submission_id") REFERENCES "practice"."submissions"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "identity"."external_identities" ADD CONSTRAINT "external_identities_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "identity"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "learner"."guest_draft_migrations" ADD CONSTRAINT "guest_draft_migrations_learner_id_profiles_id_fk" FOREIGN KEY ("learner_id") REFERENCES "learner"."profiles"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "learner"."availability" ADD CONSTRAINT "availability_learner_id_profiles_id_fk" FOREIGN KEY ("learner_id") REFERENCES "learner"."profiles"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "learner"."goals" ADD CONSTRAINT "goals_learner_id_profiles_id_fk" FOREIGN KEY ("learner_id") REFERENCES "learner"."profiles"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "learner"."profiles" ADD CONSTRAINT "profiles_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "identity"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "curriculum"."lessons" ADD CONSTRAINT "lessons_unit_id_units_id_fk" FOREIGN KEY ("unit_id") REFERENCES "curriculum"."units"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "curriculum"."prerequisites" ADD CONSTRAINT "prerequisites_from_kc_id_knowledge_components_id_fk" FOREIGN KEY ("from_kc_id") REFERENCES "curriculum"."knowledge_components"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "curriculum"."prerequisites" ADD CONSTRAINT "prerequisites_to_kc_id_knowledge_components_id_fk" FOREIGN KEY ("to_kc_id") REFERENCES "curriculum"."knowledge_components"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "practice"."submissions" ADD CONSTRAINT "submissions_activity_instance_id_activity_instances_id_fk" FOREIGN KEY ("activity_instance_id") REFERENCES "practice"."activity_instances"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "curriculum"."units" ADD CONSTRAINT "units_stage_id_stages_id_fk" FOREIGN KEY ("stage_id") REFERENCES "curriculum"."stages"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE UNIQUE INDEX "activity_run_order_uq" ON "practice"."activity_instances" USING btree ("practice_run_id","order_index");--> statement-breakpoint
CREATE UNIQUE INDEX "content_hash_uq" ON "content"."content_versions" USING btree ("hash");--> statement-breakpoint
CREATE UNIQUE INDEX "curriculum_hash_uq" ON "curriculum"."curricula" USING btree ("hash");--> statement-breakpoint
CREATE UNIQUE INDEX "evidence_submission_kc_uq" ON "learning"."evidence_events" USING btree ("submission_id","primary_kc_id");--> statement-breakpoint
CREATE INDEX "evidence_learner_kc_idx" ON "learning"."evidence_events" USING btree ("learner_id","primary_kc_id");--> statement-breakpoint
CREATE UNIQUE INDEX "external_identity_subject_uq" ON "identity"."external_identities" USING btree ("environment","provider","provider_subject");--> statement-breakpoint
CREATE UNIQUE INDEX "guest_draft_migration_uq" ON "learner"."guest_draft_migrations" USING btree ("learner_id","draft_fingerprint");--> statement-breakpoint
CREATE UNIQUE INDEX "idempotency_scope_key_uq" ON "platform"."idempotency_receipts" USING btree ("scope","key_hash");--> statement-breakpoint
CREATE UNIQUE INDEX "inbox_delivery_handler_uq" ON "platform"."inbox_receipts" USING btree ("producer","message_id","handler_name","handler_version");--> statement-breakpoint
CREATE UNIQUE INDEX "inbox_event_handler_uq" ON "platform"."inbox_receipts" USING btree ("event_id","handler_name","handler_version");--> statement-breakpoint
CREATE UNIQUE INDEX "learner_kc_state_uq" ON "learning"."learner_kc_states" USING btree ("learner_id","kc_id");--> statement-breakpoint
CREATE UNIQUE INDEX "lesson_unit_code_uq" ON "curriculum"."lessons" USING btree ("unit_id","code");--> statement-breakpoint
CREATE UNIQUE INDEX "outbox_aggregate_sequence_uq" ON "platform"."outbox_messages" USING btree ("aggregate_type","aggregate_id","aggregate_sequence");--> statement-breakpoint
CREATE UNIQUE INDEX "review_learner_kc_uq" ON "learning"."review_schedules" USING btree ("learner_id","kc_id");--> statement-breakpoint
CREATE UNIQUE INDEX "stage_code_version_uq" ON "curriculum"."stages" USING btree ("curriculum_id","curriculum_version","code");--> statement-breakpoint
CREATE UNIQUE INDEX "submission_attempt_uq" ON "practice"."submissions" USING btree ("activity_instance_id","attempt_number");--> statement-breakpoint
CREATE UNIQUE INDEX "unit_stage_code_uq" ON "curriculum"."units" USING btree ("stage_id","code");