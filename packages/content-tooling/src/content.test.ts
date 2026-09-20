import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { NodeHashService } from "@nekoru/providers";
import { validateU01L1 } from "./public.js";

const seed = JSON.parse(
  readFileSync(
    resolve(import.meta.dirname, "../../../content/source/u01-l1/seed.json"),
    "utf8",
  ),
) as unknown;
const validate = (value: unknown) =>
  validateU01L1(value, (content) => new NodeHashService().sha256(content));

describe("contract-content-u01-l1-release-001", () => {
  it("memvalidasi jumlah seed tetapi menolak runtime draft", () => {
    const report = validate(seed);
    expect(report.valid).toBe(true);
    expect(report.counts).toEqual({
      activities: 43,
      audio_assets: 26,
      session_blueprints: 3,
    });
    expect(report.runtime_eligible).toBe(false);
    expect(report.blockers).toContain("Approval receipts belum tersedia");
  });

  it("menolak fixture yang mencoba membuat draft runtime eligible", () => {
    const report = validate({
      ...(seed as Record<string, unknown>),
      runtime_eligible: true,
    });
    expect(report.valid).toBe(false);
  });
});
