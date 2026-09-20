import {
  OpenAPIRegistry,
  OpenApiGeneratorV31,
} from "@asteasolutions/zod-to-openapi";
import { healthSchema, problemSchema } from "./schemas.js";

export function createOpenApiDocument(): Record<string, unknown> {
  const registry = new OpenAPIRegistry();
  registry.register("Health", healthSchema);
  registry.register("Problem", problemSchema);
  for (const route of ["live", "ready"] as const) {
    registry.registerPath({
      method: "get",
      path: `/api/v1/health/${route}`,
      description: `${route} health probe`,
      responses: {
        200: {
          description: "Service health",
          content: { "application/json": { schema: healthSchema } },
        },
      },
    });
  }
  const contractOnly = [
    ["get", "/api/v1/me", "Identity dan profile bootstrap"],
    ["get", "/api/v1/profile", "Baca learner profile"],
    ["patch", "/api/v1/profile", "Perbarui learner profile"],
    [
      "post",
      "/api/v1/onboarding/migrate-guest-draft",
      "Migrasi draft tamu satu kali",
    ],
    ["get", "/api/v1/learning-plans/current", "Baca active learning plan"],
    ["post", "/api/v1/learning-plans/initial", "Buat initial learning plan"],
    ["post", "/api/v1/session-plans", "Bentuk next session plan"],
    [
      "post",
      "/api/v1/sessions/{session_plan_id}/start",
      "Mulai atau ambil practice run",
    ],
    ["get", "/api/v1/practice-runs/{practice_run_id}", "Resume practice run"],
    [
      "post",
      "/api/v1/practice-runs/{practice_run_id}/activities/{activity_instance_id}/start",
      "Catat activity start",
    ],
    [
      "post",
      "/api/v1/practice-runs/{practice_run_id}/submissions",
      "Submit dan evaluasi objektif",
    ],
    [
      "post",
      "/api/v1/practice-runs/{practice_run_id}/activities/{activity_instance_id}/skip",
      "Lewati activity sesuai policy",
    ],
    [
      "post",
      "/api/v1/practice-runs/{practice_run_id}/complete",
      "Finalisasi session",
    ],
    [
      "get",
      "/api/v1/practice-runs/{practice_run_id}/summary",
      "Baca authoritative summary",
    ],
    ["get", "/api/v1/mastery", "Baca learner-visible mastery"],
    ["get", "/api/v1/review/due", "Baca review eligibility"],
  ] as const;
  const generator = new OpenApiGeneratorV31(registry.definitions);
  const document = generator.generateDocument({
    openapi: "3.1.0",
    info: { title: "Nekoru API", version: "0.0.0-phase0" },
  }) as unknown as Record<string, unknown> & {
    paths?: Record<string, unknown>;
  };
  document["x-nekoru-phase"] = "phase_0";
  document["x-nekoru-implementation-status"] = "health_routes_only";
  document.paths ??= {};
  for (const [method, path, summary] of contractOnly) {
    document.paths[path] = {
      [method]: {
        summary,
        responses: {
          "501": { description: "Contract Phase 0; runtime belum diaktifkan" },
        },
        "x-nekoru-implementation-status": "contract_only",
      },
    };
  }
  return document;
}
