import canonicalize from "canonicalize";

export type CanonicalJsonValue =
  | null
  | boolean
  | number
  | string
  | CanonicalJsonValue[]
  | { [key: string]: CanonicalJsonValue };

export function toCanonicalJson(value: CanonicalJsonValue): string {
  const result = canonicalize(value);
  if (result === undefined)
    throw new TypeError(
      "Value tidak dapat direpresentasikan sebagai canonical JSON",
    );
  return result;
}
