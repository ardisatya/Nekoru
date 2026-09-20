export const ACADEMIC_SCALE = 1_000_000;

export function toAcademicMicros(value: number): number {
  if (!Number.isFinite(value) || value < 0 || value > 1)
    throw new RangeError("Academic value harus berada pada rentang 0..1");
  return Math.round(value * ACADEMIC_SCALE);
}

export function fromAcademicMicros(value: number): number {
  if (!Number.isSafeInteger(value) || value < 0 || value > ACADEMIC_SCALE)
    throw new RangeError("Academic micros harus integer 0..1_000_000");
  return value / ACADEMIC_SCALE;
}
