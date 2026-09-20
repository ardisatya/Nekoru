import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import {
  createOpenApiDocument,
  evaluationResultSchema,
  eventEnvelopeSchema,
  healthSchema,
  milestoneOneEvents,
  problemSchema,
  versionSetSchema,
} from "./public.js";

const fixture = (name: string) =>
  JSON.parse(
    readFileSync(
      resolve(
        import.meta.dirname,
        `../../../content/fixtures/golden/${name}.json`,
      ),
      "utf8",
    ),
  ) as Record<string, unknown>;

describe("contract-api-problem-and-event-001", () => {
  it("memvalidasi golden API health dan RFC problem", () => {
    const api = fixture("api") as {
      cases: Array<{
        id: string;
        response?: Record<string, unknown>;
      }>;
    };
    const health = api.cases.find(
      (item) => item.id === "CONTRACT-API-HEALTH-001",
    );
    const problem = api.cases.find(
      (item) => item.id === "CONTRACT-API-PROBLEM-002",
    );
    expect(healthSchema.safeParse(health?.response).success).toBe(true);
    expect(problemSchema.safeParse(problem?.response).success).toBe(true);
  });

  it("menolak problem response tanpa reason_code", () => {
    expect(
      problemSchema.safeParse({
        type: "https://nekoru.invalid/problems/validation",
        title: "Invalid",
        status: 400,
        detail: "Periksa input",
      }).success,
    ).toBe(false);
  });

  it("menolak raw answer sebagai field event envelope", () => {
    const result = eventEnvelopeSchema.safeParse({ raw_answer: "rahasia" });
    expect(result.success).toBe(false);
  });

  it("menerima canonical event envelope ADR-004 dan menolak correlation prefix yang salah", () => {
    const envelope = fixture("event-envelope");
    expect(eventEnvelopeSchema.safeParse(envelope).success).toBe(true);
    expect(
      eventEnvelopeSchema.safeParse({
        ...envelope,
        correlation_id: "evt_01J00000000000000000000000",
      }).success,
    ).toBe(false);
  });

  it("mengunci VersionSet v1 ke integer version dan assessment blueprint null", () => {
    const result = versionSetSchema.safeParse(fixture("version-set"));
    expect(result.success).toBe(true);
  });

  it("memuat seluruh 19 event Milestone 1 tanpa raw response", () => {
    expect(milestoneOneEvents).toHaveLength(19);
    expect(JSON.stringify(milestoneOneEvents)).not.toContain("raw_answer");
  });

  it("tidak memberi score pada technical failure", () => {
    const result = evaluationResultSchema.safeParse({
      id: "evl_01J00000000000000000000000",
      submission_id: "sub_01J00000000000000000000000",
      status: "technical_failure",
      score_micros: 0,
      parts: {},
      reason_codes: ["PROVIDER_FAILURE"],
      evaluator_ref: {
        hash: `sha256:${"0".repeat(64)}`,
        id: "evr_01J00000000000000000000000",
        version: 1,
      },
      rubric_ref: null,
      feedback_release_ref: null,
      calculation_hash: `sha256:${"1".repeat(64)}`,
      supersedes_id: null,
    });
    expect(result.success).toBe(false);
  });

  it("menandai route Phase 1 sebagai contract_only", () => {
    const document = createOpenApiDocument() as {
      paths: Record<string, Record<string, Record<string, string>>>;
    };
    expect(
      document.paths["/api/v1/practice-runs/{practice_run_id}/submissions"]
        ?.post?.["x-nekoru-implementation-status"],
    ).toBe("contract_only");
  });

  it("menjaga golden API selaras dengan OpenAPI executable", () => {
    const api = fixture("api") as {
      cases: Array<{
        id: string;
        implementation_status?: string;
        method?: string;
        path?: string;
      }>;
    };
    const document = createOpenApiDocument() as {
      paths: Record<
        string,
        Record<string, { "x-nekoru-implementation-status"?: string }>
      >;
    };
    for (const item of api.cases.filter((entry) => entry.path)) {
      const operation = document.paths[item.path!]?.[item.method!];
      expect(operation, item.id).toBeDefined();
      if (item.implementation_status)
        expect(operation?.["x-nekoru-implementation-status"]).toBe(
          item.implementation_status,
        );
    }
  });
});
