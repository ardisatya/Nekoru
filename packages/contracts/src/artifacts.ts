import { z } from "zod";
import { milestoneOneEvents } from "./catalog.js";
import { createOpenApiDocument } from "./openapi.js";
import {
  contentSeedSchema,
  evaluationResultSchema,
  eventEnvelopeSchema,
  evidenceEventSchema,
  guestOnboardingDraftSchema,
  learnerKcStateSchema,
  learnerProfileSchema,
  problemSchema,
  practiceRunSchema,
  sessionPlanSchema,
  submissionSchema,
  versionRefSchema,
  versionSetSchema,
} from "./schemas.js";

export function createContractArtifacts() {
  return {
    "openapi.json": createOpenApiDocument(),
    "schemas.json": {
      $schema: "https://json-schema.org/draft/2020-12/schema",
      schema_version: 1,
      implementation_status: "phase_0_executable_contract",
      schemas: {
        content_seed: z.toJSONSchema(contentSeedSchema),
        evaluation_result: z.toJSONSchema(evaluationResultSchema),
        event_envelope: z.toJSONSchema(eventEnvelopeSchema),
        evidence_event: z.toJSONSchema(evidenceEventSchema),
        guest_onboarding_draft: z.toJSONSchema(guestOnboardingDraftSchema),
        learner_kc_state: z.toJSONSchema(learnerKcStateSchema),
        learner_profile: z.toJSONSchema(learnerProfileSchema),
        problem: z.toJSONSchema(problemSchema),
        practice_run: z.toJSONSchema(practiceRunSchema),
        session_plan: z.toJSONSchema(sessionPlanSchema),
        submission: z.toJSONSchema(submissionSchema),
        version_ref: z.toJSONSchema(versionRefSchema),
        version_set: z.toJSONSchema(versionSetSchema),
      },
    },
    "event-catalog.json": {
      schema_version: 1,
      phase: "phase_0",
      events: milestoneOneEvents,
    },
  } as const;
}
