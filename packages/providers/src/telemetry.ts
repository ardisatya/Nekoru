import type { TelemetrySink } from "@nekoru/application";

const prohibitedKey =
  /(answer|response|email|token|secret|magic.?link|rubric|answer.?key|accessibility_detail)/i;
const allowedEvents = new Set([
  "prototype_opened",
  "prototype_state_changed",
  "audio_retry_requested",
  "auth_method_selected",
  "technical_recovery_selected",
]);
const allowedProperties = new Set([
  "screen_id",
  "state",
  "surface",
  "route",
  "reason_category",
  "online_state",
  "viewport_class",
  "input_modality",
]);

export function sanitizeTelemetry(
  eventName: string,
  properties: Readonly<Record<string, unknown>>,
): Readonly<Record<string, unknown>> {
  if (!allowedEvents.has(eventName))
    throw new Error(`telemetry_event_not_allowed:${eventName}`);
  const safe: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(properties)) {
    if (prohibitedKey.test(key) || !allowedProperties.has(key))
      throw new Error(`telemetry_property_not_allowed:${key}`);
    if (!["string", "number", "boolean"].includes(typeof value))
      throw new Error(`telemetry_property_type_not_allowed:${key}`);
    safe[key] = value;
  }
  return safe;
}

export class InMemoryTelemetrySink implements TelemetrySink {
  readonly records: {
    eventName: string;
    properties: Readonly<Record<string, unknown>>;
  }[] = [];
  record(
    eventName: string,
    properties: Readonly<Record<string, unknown>>,
  ): void {
    this.records.push({
      eventName,
      properties: sanitizeTelemetry(eventName, properties),
    });
  }
}
