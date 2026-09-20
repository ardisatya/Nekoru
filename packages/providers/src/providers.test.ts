import { describe, expect, it } from "vitest";
import { NodeHashService } from "./hash.js";
import { LocalIdentityVerifier } from "./identity.js";
import { LocalEventPublisher } from "./events.js";
import { sanitizeTelemetry } from "./telemetry.js";

describe("unit-provider-security-guardrails-001", () => {
  it("sesuai golden SHA-256 object kosong", () =>
    expect(new NodeHashService().sha256({})).toBe(
      "sha256:44136fa355b3678a1146ad16f7e8649e94fb4fc21fe77e8310c060f61caaff8a",
    ));
  it("menolak raw answer dari generic telemetry", () =>
    expect(() =>
      sanitizeTelemetry("prototype_state_changed", { raw_answer: "あ" }),
    ).toThrow("telemetry_property_not_allowed"));
  it("local auth fail closed untuk token asing", async () =>
    await expect(
      new LocalIdentityVerifier().verify("other-token"),
    ).rejects.toThrow("authentication_failed"));
  it("publisher local mempertahankan exact envelope, bukan hanya event id", async () => {
    const publisher = new LocalEventPublisher();
    const message = {
      event_id: "evt_01J00000000000000000000000" as const,
      envelope: {
        event_id: "evt_01J00000000000000000000000",
        payload_hash: `sha256:${"0".repeat(64)}`,
      },
    };
    await publisher.publish(message);
    expect(publisher.published).toEqual([message]);
  });
});
