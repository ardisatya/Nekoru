import type {
  CanonicalJsonValue,
  IdentifierPrefix,
  PrefixedUlid,
  Sha256,
} from "@nekoru/domain";

export interface Clock {
  now(): Date;
}
export interface IdFactory {
  create(prefix: IdentifierPrefix): PrefixedUlid;
}
export interface HashService {
  sha256(value: CanonicalJsonValue): Sha256;
}
export interface UnitOfWork {
  transaction<T>(operation: () => Promise<T>): Promise<T>;
}
export interface IdentityContext {
  user_id: PrefixedUlid;
  provider_subject: string;
  environment: string;
}
export interface IdentityVerifier {
  verify(token: string): Promise<IdentityContext>;
}
export interface AuthorizationDecision {
  allowed: boolean;
  reason_code: string;
}
export interface AuthorizationService {
  authorize(
    context: IdentityContext,
    action: string,
    resource_owner_id?: PrefixedUlid,
  ): Promise<AuthorizationDecision>;
}
export interface EventMessage {
  event_id: PrefixedUlid;
  envelope: CanonicalJsonValue;
}
export interface EventPublisher {
  publish(message: EventMessage): Promise<void>;
}
export interface TelemetrySink {
  record(
    eventName: string,
    properties: Readonly<Record<string, unknown>>,
  ): void;
}
export interface ContentRegistry {
  isRuntimeEligible(contentVersionId: PrefixedUlid): Promise<boolean>;
}
