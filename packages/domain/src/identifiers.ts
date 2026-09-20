const prefixes = [
  "usr",
  "xid",
  "lrn",
  "gol",
  "cur",
  "kc",
  "cnt",
  "cnv",
  "cpk",
  "ast",
  "pol",
  "evr",
  "sch",
  "lpl",
  "spl",
  "prun",
  "ain",
  "sub",
  "evl",
  "evd",
  "mty",
  "dec",
  "abp",
  "afm",
  "arun",
  "rev",
  "app",
  "iss",
  "idem",
  "obx",
  "ibx",
  "evt",
  "job",
  "aud",
  "cor",
] as const;

export type IdentifierPrefix = (typeof prefixes)[number];
export const identifierPrefixes: readonly IdentifierPrefix[] = prefixes;
export const prefixedUlidPattern =
  /^(usr|xid|lrn|gol|cur|kc|cnt|cnv|cpk|ast|pol|evr|sch|lpl|spl|prun|ain|sub|evl|evd|mty|dec|abp|afm|arun|rev|app|iss|idem|obx|ibx|evt|job|aud|cor)_[0-7][0-9A-HJKMNP-TV-Z]{25}$/;

export type PrefixedUlid = `${IdentifierPrefix}_${string}`;

export function isPrefixedUlid(value: string): value is PrefixedUlid {
  return prefixedUlidPattern.test(value);
}

export function assertPrefixedUlid(
  value: string,
  expectedPrefix?: IdentifierPrefix,
): asserts value is PrefixedUlid {
  if (!isPrefixedUlid(value))
    throw new TypeError(`Identifier tidak canonical: ${value}`);
  if (expectedPrefix !== undefined && !value.startsWith(`${expectedPrefix}_`))
    throw new TypeError(`Identifier harus memakai prefix ${expectedPrefix}_`);
}
