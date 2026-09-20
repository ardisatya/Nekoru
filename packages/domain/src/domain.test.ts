import { describe, expect, it } from "vitest";
import {
  assertPrefixedUlid,
  fromAcademicMicros,
  isPrefixedUlid,
  toAcademicMicros,
  toCanonicalJson,
} from "./public.js";

describe("unit-domain-canonical-contract-001", () => {
  it("mengurutkan object key tanpa mengubah array", () => {
    expect(toCanonicalJson({ z: [2, 1], a: "ねこ" })).toBe(
      '{"a":"ねこ","z":[2,1]}',
    );
  });

  it("menerima prefix run canonical dan menolak prefix legacy", () => {
    expect(isPrefixedUlid("prun_01J00000000000000000000000")).toBe(true);
    expect(isPrefixedUlid("prn_01J00000000000000000000000")).toBe(false);
    expect(() =>
      assertPrefixedUlid("arun_01J00000000000000000000000", "arun"),
    ).not.toThrow();
    expect(() =>
      assertPrefixedUlid("cor_01J00000000000000000000000", "cor"),
    ).not.toThrow();
    expect(isPrefixedUlid("out_01J00000000000000000000000")).toBe(false);
    expect(isPrefixedUlid("prun_81J00000000000000000000000")).toBe(false);
  });

  it("mengubah nilai akademik menjadi integer micros secara stabil", () => {
    expect(toAcademicMicros(0.85)).toBe(850_000);
    expect(fromAcademicMicros(850_000)).toBe(0.85);
  });
});
