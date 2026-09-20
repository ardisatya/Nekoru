export type Sha256 = `sha256:${string}`;

export interface VersionRef {
  readonly hash: Sha256;
  readonly id: string;
  readonly version: string;
}

export interface VersionSetV1 {
  readonly schema_version: "1.0.0";
  readonly curriculum: VersionRef;
  readonly content_pack: VersionRef;
  readonly learning_policy: VersionRef;
  readonly mastery_policy: VersionRef;
  readonly practice_policy: VersionRef;
  readonly evaluator: VersionRef;
  readonly assessment_blueprint: null;
}

export function areVersionsExact(left: VersionRef, right: VersionRef): boolean {
  return (
    left.id === right.id &&
    left.version === right.version &&
    left.hash === right.hash
  );
}
