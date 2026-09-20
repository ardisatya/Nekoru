# ADR-005 — Clerk Identity Mapping dan Nekoru Authorization Model

**Status:** Accepted  
**Tanggal:** 14 September 2026  
**Decision owners:** Security Lead dan Engineering Lead  
**Required reviewers:** Product, Privacy/Legal, Operations, QA, Content Operations, dan Support  
**Berlaku untuk:** Learner authentication, staff authentication, session verification, identity synchronization, RBAC/ABAC, dan separation of duties  
**Supersedes:** Tidak ada  
**Superseded by:** Tidak ada  
**Accepted at:** 14 September 2026

## 1. Konteks

Nekoru memakai Clerk untuk sign-in dan session management. Learner menggunakan Google Sign-In atau email link; Content Operations hanya menggunakan Google identity dan active staff allowlist. Clerk dapat membuktikan siapa pengguna dan status session provider, tetapi tidak memiliki konteks akademik atau operasional yang diperlukan untuk menentukan:

- apakah user aktif, suspended, deletion-pending, atau anonymized di Nekoru;
- resource mana yang dimiliki learner;
- role, permission, assignment, dan active-role staff;
- lifecycle/version artifact yang boleh dilihat atau diubah;
- separation of duties untuk author, reviewer, publisher, rights, atau accessibility approval;
- environment dan action risk;
- legal hold, export, deletion, adjudication, atau emergency authority.

Menggunakan email sebagai primary identity atau role claim di session token sebagai authority akan menimbulkan risiko account takeover, stale authorization, dan privilege transfer saat email berubah. Mengandalkan webhook untuk first login juga menimbulkan race karena delivery bersifat asynchronous.

ADR ini menetapkan trust boundary Clerk, pemetaan ke internal `User`, learner/staff provisioning, token verification, authorization engine, cache, revocation, webhook reconciliation, audit, dan exit strategy.

## 2. Sumber Keputusan

- [Security, Privacy, and Data Governance](../product-specs/security-privacy-data-governance.md)
- [Domain Model and Schemas](../product-specs/domain-model-and-schemas.md)
- [API and Event Contracts](../product-specs/api-and-event-contracts.md)
- [Technical Architecture](../product-specs/technical-architecture.md)
- [Test and Quality Plan](../product-specs/test-and-quality-plan.md)
- [Learner Screen Specifications](../ui-ux/04-screen-specifications-learner.md)
- [Content Operations Screen Specifications](../ui-ux/05-screen-specifications-content-ops.md)
- [ADR-001 — Monorepo dan Modular Monolith](./ADR-001-monorepo-and-modular-monolith.md)
- [ADR-002 — PostgreSQL Ownership dan Transactions](./ADR-002-postgresql-ownership-and-transactions.md)
- [ADR-003 — Canonical JSON, VersionSet, IDs, dan Hashes](./ADR-003-canonical-json-versioning-identifiers-and-hashes.md)
- [ADR-004 — Outbox/Inbox dan QStash](./ADR-004-outbox-inbox-and-qstash-delivery.md)
- [Clerk Session Token Verification](https://clerk.com/docs/guides/sessions/manual-jwt-verification)
- [Clerk Session Token Claims](https://clerk.com/docs/guides/sessions/session-tokens)
- [Clerk Webhooks](https://clerk.com/docs/guides/development/webhooks/overview)
- [Clerk Google Social Connection](https://clerk.com/docs/guides/configure/auth-strategies/social-connections/google)
- [Clerk Email-link Protection](https://clerk.com/docs/guides/secure/best-practices/protect-email-links)

## 3. Decision Drivers

1. Provider identity dan internal authority harus terpisah.
2. Login pertama tidak bergantung pada webhook yang akhirnya konsisten.
3. Staff Google login tidak boleh otomatis memberi internal access.
4. Role/revocation harus berlaku pada request berikutnya tanpa menunggu provider token berakhir.
5. Learner hanya boleh mengakses resource sendiri dan released content.
6. High-risk operation membutuhkan current authority, reason, version, audit, dan bila perlu recent authentication.
7. Identity linking tidak boleh berbasis email yang berubah atau belum verified.
8. Token, OAuth code, email link, dan session secret tidak boleh masuk log/analytics.
9. Auth flow harus accessible dan memiliki safe recovery.
10. Clerk dapat diganti tanpa mengubah internal user IDs atau domain ownership.

## 4. Keputusan Ringkas

Nekoru menetapkan:

- Clerk menjadi authentication/session provider; Nekoru tetap authorization authority;
- stable Clerk user subject dipetakan ke internal `usr_` melalui `ExternalIdentity`;
- internal user ID dipakai oleh seluruh domain Nekoru;
- valid token direkonsiliasi sinkron pada request pertama; webhook menjadi update/reconciliation lanjutan;
- learner dapat diprovision secara idempotent setelah valid Clerk identity sesuai product policy;
- staff tidak mendapat akses hanya dari valid Google login: exact verified email harus cocok dengan active allowlist dan kemudian diikat ke internal user/provider subject;
- email bukan primary key atau transferable authority;
- backend memverifikasi session token dan mengevaluasi authorization pada setiap read/mutation;
- Clerk custom claims tidak menjadi role/permission authority;
- authorization menggunakan role + permission + assignment/ownership + resource/lifecycle + environment + SoD + action-risk context;
- deny/default-deny mengalahkan allow; missing/stale critical context menghasilkan deny;
- UI route guard dan disabled button hanya presentation hint;
- webhook diverifikasi dan diproses melalui inbox idempotent ADR-004.

## 5. Trust Boundary

### 5.1 Clerk dipercaya untuk

- menjalankan configured Google OAuth dan email-link authentication;
- menghasilkan session token untuk Clerk instance/environment;
- menyediakan stable provider user/session references;
- mengelola provider-level session lifecycle;
- menyatakan email/connection verification berdasarkan provider contract;
- mengirim signed webhook events;
- menyediakan account-linking behavior yang telah dikonfigurasi dan diuji.

### 5.2 Clerk tidak dipercaya untuk memutuskan

- internal Nekoru user status;
- learner resource ownership;
- staff allowlist eligibility;
- role, permission, assignment, or active role;
- content/assessment authority;
- separation of duties;
- action risk or recent-auth requirement Nekoru;
- legal hold/export/deletion scope;
- academic decision or answer visibility;
- production environment routing based solely on client-provided data.

### 5.3 Client tidak dipercaya untuk

- menyatakan identity atau active session;
- mengirim internal user ID sebagai authority;
- menentukan role/permission/ownership;
- memutuskan bahwa route/action available berarti authorized;
- menyatakan email verified;
- mengubah target/resource scope tanpa backend check.

## 6. Identity Data Model

### 6.1 Internal User

`identity.users` minimum:

| Field | Aturan |
|---|---|
| `id` | Canonical `usr_` ID; immutable |
| `status` | `active`, `suspended`, `deletion_pending`, `anonymized` |
| `primary_email_normalized` | Nullable PII; only when approved purpose requires |
| `locale`, `timezone` | Internal profile defaults/reference |
| `authorization_revision` | Monoton; berubah pada access-relevant mutation |
| `created_at`, `updated_at`, `revision` | Server-authoritative |
| `retention_policy_key` | No implicit TTL |

### 6.2 ExternalIdentity

`identity.external_identities` minimum:

| Field | Aturan |
|---|---|
| `id` | `xid_` ID |
| `user_id` | Internal `usr_` owner |
| `provider` | `clerk` pada Milestone 1 |
| `provider_instance` | Environment/instance identifier; tidak boleh cross-environment |
| `provider_subject` | Stable Clerk user ID; protected and unique per instance |
| `connection_methods` | Allowlisted observed methods: `google`, `email_link` |
| `verified_email_normalized` | Nullable/minimized; needed for learner contact or staff binding only |
| `provider_status` | Active/deleted/unknown reconciliation state |
| `verified_at`, `last_synced_at` | Provider-derived observation time |
| `revision` | Optimistic concurrency |

Unique constraint:

```text
(provider, provider_instance, provider_subject)
```

Token, OAuth access/refresh token, magic link, email-link token, authorization code, and raw webhook secret are never stored on this entity.

### 6.3 ProviderSessionObservation

Nekoru tidak menjadikan local session mirror sebagai authentication authority. Minimal observation boleh disimpan untuk security/account UX:

- opaque provider session reference;
- user/external identity;
- first/last seen;
- provider/session status last verified;
- safe device/browser description if provider and privacy policy permit;
- sign-in method;
- revoked/ended observation;
- retention policy key.

Session token itself tidak disimpan.

## 7. Environment Isolation

- development, staging, and production use separate Clerk instances/configuration;
- provider subject unique hanya dalam provider instance boundary;
- production token cannot authenticate to staging and vice versa;
- authorized origins/parties, callback URLs, webhook secret, and OAuth credentials are exact per environment;
- test account/provider events cannot grant production staff access;
- internal user/external identity IDs are not copied across environments as authority;
- environment enters authorization context from server configuration, not request body.

## 8. Session Token Verification

Setiap authenticated backend request menggunakan official Clerk backend verification helper/SDK unless approved equivalent is required. Verification minimum:

1. locate token only from approved cookie/header path;
2. validate token structure and expected signing algorithm;
3. validate signature against correct Clerk instance key/JWKS;
4. validate issuer/instance association;
5. validate expiry and not-before;
6. validate authorized party/origin against environment allowlist when claim is present and configured;
7. validate session/status claims required by selected Clerk token version;
8. reject token from wrong environment/audience/context;
9. derive provider subject and opaque session reference;
10. reconcile internal identity and evaluate Nekoru authorization.

Clock skew tolerance is bounded configuration and tested. Verification error does not reveal whether user/email/resource exists.

## 9. Cookie, Header, CSRF, dan CORS

- same-origin browser requests use Clerk-supported secure cookie/session pattern;
- cross-origin bearer token use requires exact CORS origin allowlist and no wildcard credential origin;
- cookie-authenticated state-changing request receives CSRF protection consistent with framework/provider integration;
- `Secure`, `HttpOnly`, `SameSite`, domain, path, and expiry follow reviewed production configuration;
- authentication response is not stored in generic service-worker/shared cache;
- bearer token is never put in URL/query, analytics, error, local-storage log, or screenshot fixture;
- reverse proxy preserves required origin/host semantics for token validation;
- allowed origins are config data with automated tests.

## 10. Learner Authentication Methods

Milestone 1 supports:

- Google Sign-In through Clerk;
- email link through Clerk;
- no local password;
- guest onboarding draft before authentication.

Learner methods do not imply different internal identities. Account linking/connection behavior remains configured in Clerk, while Nekoru binds the resulting stable Clerk user subject to one internal user.

## 11. Google Sign-In Policy

- development may use provider-supported development configuration;
- production uses Nekoru-controlled Google OAuth credentials and production publishing status;
- request only scopes required for authentication; additional Google data scopes require privacy/security review;
- authorized origins and redirect URIs are exact;
- Google OAuth code/access token is not stored unless a separately approved integration needs it;
- in-app/webview authentication is not claimed supported; guide user to supported browser when required;
- cancellation is not account failure;
- provider/account-link conflict enters explicit recovery and does not create duplicate internal user automatically;
- subaddress/blocking and provider account-link policy are reviewed before launch because they affect real users.

## 12. Email-link Policy

- same-device and same-browser protection is enabled for learner email links;
- link is single-use/expiry-controlled by provider configuration;
- UI reads provider state and provides safe resend/cooldown behavior;
- response does not disclose whether an email is registered;
- full email-link URL/token is not logged, persisted by Nekoru, or sent to analytics;
- opening on another browser/device fails safely and preserves guest draft on origin browser;
- recovery offers return to origin browser, resend, change email, or Google Sign-In;
- email link is not available for Content Operations;
- mailbox/link-scanner behavior is included in production testing.

## 13. Synchronous Identity Reconciliation

After a token passes verification:

```text
verified Clerk instance + subject
→ find ExternalIdentity by unique provider key
→ if found, validate internal user/provider status
→ if absent, execute surface-specific provisioning policy
→ update minimized verified provider observations if allowed
→ produce internal ActorContext
→ evaluate authorization
```

This operation is transactional and idempotent.

### 13.1 Existing identity

- provider subject wins over mutable email for binding;
- email change updates only allowed contact/reconciliation field after policy check;
- email change never transfers staff authority automatically;
- suspended/deletion-pending internal user is denied according to state policy even with valid Clerk token;
- provider deleted/unknown state uses fail-closed behavior for affected account actions.

### 13.2 New learner

- valid allowed Clerk identity may create internal User + ExternalIdentity + LearnerProfile atomically;
- duplicate concurrent first requests return the same internal user through unique constraint;
- guest draft migration is a separate idempotent command after identity exists;
- failure rolls back partial identity/profile creation;
- legal age/notice/consent requirements must be satisfied before production provisioning where applicable.

### 13.3 New staff login

Valid Google authentication alone never auto-provisions authority. Staff linking requires:

- verified email from approved Clerk/Google connection;
- exact normalized match with active, unexpired staff allowlist entry;
- allowlist environment match;
- internal user/access status active;
- atomic binding to provider subject if not already bound;
- no conflicting binding/email change;
- immutable audit receipt.

If not allowlisted, return access denied without internal data or role disclosure.

## 14. Webhook Reconciliation

Clerk webhook:

- uses public HTTPS endpoint excluded from learner session middleware but protected by webhook signature verification;
- verifies raw request through approved Clerk helper and environment-specific secret;
- processes allowlisted event types only;
- enters ADR-004 inbox using provider event/message identity and payload hash;
- applies update idempotently;
- does not create staff authority from email alone;
- does not overwrite newer synchronous reconciliation state with stale event;
- produces audit/outbox for access-relevant transition;
- returns retryable versus terminal response intentionally.

Minimum event classes considered:

- user created/updated/deleted;
- session revoked/ended if required by provider event catalog and local UX;
- email/connection change only to the extent required and allowlisted.

Exact event names and payload schemas are locked during implementation against the active Clerk version. Full webhook payload is not copied to generic logs or retained without purpose.

## 15. Reconciliation Precedence

When token request and webhook observations conflict:

1. Nekoru internal suspension/revocation/deletion state remains authoritative for access.
2. A currently verified token establishes provider subject/session only for that request.
3. Provider deletion/revocation signal can restrict access, never grant more access.
4. Staff allowlist/role/grant state remains authoritative.
5. Event with older provider timestamp/version cannot overwrite newer observed state.
6. Ambiguous identity/link conflict fails closed and enters review; no automatic merge.

## 16. Authorization Model

Nekoru uses contextual RBAC with resource attributes—RBAC for baseline permission bundles, plus ownership, assignment, lifecycle, environment, SoD, and risk conditions.

Authorization input:

```ts
type AuthorizationInput = {
  actor: {
    userId: string;
    status: string;
    activeRole: string;
    authorizationRevision: number;
  };
  action: string;
  resource: {
    type: string;
    id?: string;
    ownerId?: string;
    version?: number;
    lifecycle?: string;
    assignmentScope?: string[];
  };
  context: {
    environment: string;
    surface: "learner" | "content_ops" | "system";
    riskClass: string;
    recentAuth?: object;
    requestTime: string;
  };
};
```

Policy output:

```ts
type AuthorizationDecision = {
  allowed: boolean;
  decisionId: string;
  policyVersion: string;
  reasonCodes: string[];
  obligations: string[];
  decisionHash: string;
};
```

UI receives only safe action availability/reason category; full internal decision remains server/audit restricted.

## 17. Authorization Evaluation Order

1. authentication valid;
2. provider/internal identity mapping valid;
3. internal user status allows access;
4. environment and surface match;
5. active role belongs to user and is currently valid;
6. action exists in permission registry;
7. role grants candidate permission;
8. ownership/assignment/resource scope matches;
9. lifecycle/version allows action;
10. separation-of-duties rule passes;
11. risk/recent-auth/confirmation obligations pass;
12. explicit deny and legal/security restrictions evaluated;
13. decision recorded/returned.

Explicit deny and safety restriction win. Missing action, role, policy version, resource attribute, or critical context returns deny.

## 18. Baseline Roles

- `learner`;
- `content_author`;
- `linguistic_reviewer`;
- `academic_reviewer`;
- `assessment_reviewer`;
- `accessibility_reviewer`;
- `rights_reviewer`;
- `publisher`;
- `support_agent`;
- `operations_admin`;
- `security_auditor`;
- `product_owner`.

Role is not permission. Permission keys are versioned machine-readable capabilities such as:

```text
learner.profile.read_self
learner.profile.update_self
practice.run.start_self
practice.submission.create_self
mastery.state.read_self
content.artifact.create
content.version.review_academic
content.version.review_accessibility
content.release.publish
content.version.quarantine
identity.staff_access.manage
audit.record.read_scoped
data.export.request_self
data.export.approve_scoped
```

Wildcard permission is prohibited in production policy except an explicit break-glass design approved by a future ADR/policy. No emergency override exists in the current baseline.

## 19. Active Role

- user may have multiple valid role assignments;
- Content Operations UI chooses an active-role context for presentation and audit clarity;
- active role must be one of actor’s valid roles;
- choosing active role does not add permissions;
- backend still evaluates all required assignment/SoD constraints;
- high-risk decision stores active role and authority path;
- learner surface defaults to `learner` and cannot select staff role to cross surface;
- stale/removed role causes immediate deny and requires context refresh.

## 20. Learner Authorization

Default learner rules:

- read/update own profile and approved preferences;
- access own plan, sessions, submissions visible by policy, mastery, and progress;
- access only published/approved content resolved through session/version policy;
- cannot choose another learner ID to expand scope;
- cannot access raw answer key, hidden rationale, internal evidence trace, staff note, or other learner data;
- self data export/deletion only through defined workflow and identity/recent-auth checks;
- support/accommodation alternative does not grant broader content visibility;
- ownership derived from authenticated internal user, not request body/path alone.

Horizontal authorization is tested for every learner resource endpoint.

## 21. Staff Allowlist

Allowlist entry minimum:

| Field | Aturan |
|---|---|
| `id` | Internal record ID |
| `email_normalized` | Exact verified staff email; encrypted/protected PII |
| `environment` | Exact environment |
| `status` | `invited`, `active`, `suspended`, `revoked`, `expired` |
| `baseline_roles` | References to role assignments, not token claims |
| `assignment_scope` | Optional bounded scope |
| `valid_from`, `expires_at` | Server times |
| `bound_user_id/provider_subject` | Set after verified linking; immutable without controlled rebind |
| `created_by/at`, `reason`, `revision` | Audit and concurrency |

Requirements:

- exact normalized email match before first binding;
- after binding, provider subject/internal user is authority;
- email change does not automatically rebind or move grants;
- one entry cannot bind silently to multiple identities;
- self-approval/self-escalation prohibited;
- suspension/revocation applies on next authorization request;
- changes require idempotency, expected revision, reason, and audit.

## 22. Separation of Duties

Baseline denies:

- content author cannot be sole academic approval for own version;
- reviewer cannot satisfy a different required review type without corresponding active assignment;
- publisher cannot publish without all independent required approvals;
- person requesting own privilege escalation cannot solely approve it;
- support cannot access raw learner response without explicitly approved case scope;
- export/deletion/legal-hold action cannot rely on generic admin label;
- assessment author/reviewer conflicts follow assessment policy when activated.

SoD evaluates actor IDs and relationship to exact artifact/version, not only role labels.

## 23. High-risk Actions dan Recent Authentication

High-risk baseline:

- publish, quarantine, rollback, adjudication, migration;
- staff role/grant addition or escalation;
- suspension/revocation/rebind;
- export, deletion, anonymization, legal hold;
- secret/key rotation;
- assessment result correction or integrity action.

Required:

- exact target/version;
- current authorization revision;
- reason and confirmation;
- idempotency and expected revision;
- immutable audit receipt;
- recovery/rollback where applicable;
- recent-auth/step-up only after exact provider capability and risk policy are approved.

Clerk factor-verification-age/session claims may be an input but are not sufficient alone; backend validates current policy and may require provider reauthentication. Until configured/tested, high-risk production action requiring step-up remains blocked.

## 24. Authorization Policy Versioning

- roles, permissions, SoD, reason codes, and obligations live in versioned policy/schema;
- decision captures policy version/hash and `authorization_revision`;
- policy changes use review and deployment/version compatibility;
- cached authorization key includes user, active role, environment, and authorization revision;
- unknown/missing policy version fails closed;
- historical audit can resolve decision policy or marks it unavailable—never substitutes latest;
- policy copy shown in UI is not the executable policy.

## 25. Authorization Cache

Cache is optional optimization:

- PostgreSQL state remains authority;
- key includes `user_id`, active role, environment, policy version, and authorization revision;
- role/allowlist/status mutation increments revision and emits invalidation outbox;
- high-risk mutation rechecks PostgreSQL regardless of cache;
- cache miss falls back to database;
- cache unavailable defaults to database or deny for sensitive endpoint if safe verification cannot be completed;
- TTL is short operational config, not revocation guarantee;
- no cross-role/user response cache.

## 26. Session Revocation dan Internal Suspension

- logout/revoke provider session uses Clerk-supported flow where applicable;
- internal suspension/revocation denies next backend request even if Clerk token remains cryptographically valid;
- staff allowlist revocation increments authorization revision immediately;
- provider session revocation webhook is reconciled idempotently but not the only protection;
- account security UI shows only provider/session metadata allowed by privacy policy;
- ending another session requires current identity and appropriate confirmation;
- session/revocation failures produce recoverable state and audit without claiming success.

## 27. Guest Draft Migration

After successful learner identity provisioning:

1. client sends valid guest draft plus `draft_id` and idempotency key;
2. backend binds migration to authenticated internal user;
3. validates expiry/schema/content and prohibited fields;
4. merges only approved onboarding fields;
5. writes learner state and migration receipt atomically;
6. returns canonical receipt;
7. client deletes local draft after success;
8. retry returns the same receipt.

Staff authentication never consumes learner guest draft. Cross-account/browser migration without valid identity is denied.

## 28. Error dan Information Disclosure

Stable categories:

- `AUTHENTICATION_REQUIRED`;
- `TOKEN_INVALID`;
- `SESSION_INACTIVE`;
- `IDENTITY_CONFLICT`;
- `ACCOUNT_SUSPENDED`;
- `STAFF_ACCESS_REQUIRED`;
- `AUTHORIZATION_DENIED`;
- `RECENT_AUTH_REQUIRED`;
- `PROVIDER_TEMPORARILY_UNAVAILABLE`.

External response does not reveal:

- whether arbitrary email is registered/allowlisted;
- whether hidden resource exists;
- internal role graph or denied permission details;
- token/signature/JWKS internals;
- other account/provider linkage;
- internal security risk score.

Authorized UI may show a safe reason category and recovery action.

## 29. Logging, Audit, dan Analytics

### Generic operational log

Allowed:

- correlation ID;
- internal user ID only when access and retention allow;
- surface/environment;
- safe authentication/authorization outcome code;
- provider-independent error class;
- latency.

Prohibited:

- token, cookie, OAuth code/secret;
- magic link/full callback URL;
- full webhook body;
- raw email in generic log;
- permission graph, hidden resource, learner raw response.

### Immutable audit

High-risk authorization decision records:

- actor internal ID and active role;
- target typed reference/version;
- action;
- policy version/hash;
- safe input/output hashes;
- reason/obligations;
- allowed/denied outcome as policy requires;
- correlation, occurred/recorded time;
- superseding/correction reference.

Product analytics receives only allowlisted coarse authentication events and pseudonymous identity; no token/email/allowlist detail.

## 30. Web/API Surface Separation

- learner and Content Operations use separate shells/routes/deployment boundaries;
- login success for one surface does not imply authorization to the other;
- Content Operations has no self-registration or email-link option;
- server route maps to explicit action/resource type;
- authorization happens after input authentication and before protected data load where possible;
- filtering unauthorized rows is not sufficient if query already exposed data;
- object-level check repeated on mutation with revision/lifecycle;
- worker/service identity uses explicit command allowlist, no ambient admin authority.

## 31. Accessibility dan Recovery

Authentication/denial flows must:

- work with keyboard, NVDA, VoiceOver, and TalkBack on supported matrix;
- preserve focus and announce errors without exposing sensitive details;
- explain same-browser email-link requirement;
- distinguish Google cancellation from account failure;
- retain safe draft after session expiry/provider failure;
- provide return path after reauthentication;
- avoid CAPTCHA/verification flow that has no accessible alternative;
- test third-party Clerk components/pages used in actual production configuration;
- never instruct user to disable assistive technology.

## 32. Clerk Production Configuration Gate

Before production:

- separate production Clerk instance;
- exact domains, authorized parties/origins, redirect/callback URLs;
- custom production Google OAuth credentials and publishing status;
- required minimum scopes only;
- email-link same-device/browser protection;
- email delivery/from-domain and anti-enumeration behavior;
- session lifetime/revocation/device policy;
- account-linking and email-subaddress behavior;
- webhook endpoint, signing secret, event allowlist, retries;
- plan/quota/rate limits/log retention/export/deletion;
- data region/subprocessor/terms/DPA review;
- key/secret rotation and incident contacts;
- accessibility test of actual auth journey;
- migration/exit strategy.

Configuration values are versioned release evidence, not hardcoded assumptions in this ADR.

## 33. Exit Strategy

Internal domain never uses Clerk user ID as primary identity. Provider migration requires:

- preserve internal `usr_` and learner/staff domain references;
- add new `ExternalIdentity` provider binding;
- verify account ownership and prevent duplicate/merge takeover;
- migrate/revoke sessions separately;
- maintain mapping/audit/reconciliation window;
- update authentication adapter only; authorization policy remains Nekoru-owned;
- export/delete provider data according approved contract;
- communicate reauthentication to users;
- test rollback and account recovery.

## 34. Testing Requirements

### Token/session

- valid token for exact environment;
- expired/not-before/invalid signature/wrong algorithm;
- wrong issuer/instance/authorized party/origin;
- missing optional versus required claims;
- revoked/inactive session behavior;
- key rotation/JWKS refresh/failure;
- clock skew bounds;
- no token leakage.

### Identity mapping

- first learner request atomic provisioning;
- concurrent duplicate first request;
- same subject/different email;
- same email/different subject conflict;
- provider deletion/update out of order;
- webhook before/after synchronous reconciliation;
- environment isolation;
- guest migration once.

### Staff access

- valid Google identity not allowlisted;
- allowlisted verified exact email first binding;
- unverified/mismatched/changed email;
- expired/suspended/revoked allowlist;
- bound subject conflict;
- multi-role active context;
- self-escalation/SoD denial;
- revocation on next request despite valid Clerk session.

### Authorization

- each action/role/resource/lifecycle matrix;
- learner horizontal and vertical isolation;
- missing/stale policy/context/revision default deny;
- cache hit/miss/invalidation/outage;
- high-risk current DB recheck;
- safe 403/404 disclosure behavior;
- worker command allowlist;
- policy decision hash/reproduction.

### Auth UX/provider

- Google success/cancel/provider failure/wrong account;
- email-link success/expired/used/wrong browser/link scanner/resend;
- session expiry and safe return;
- keyboard/screen reader/zoom/reflow;
- in-app browser unsupported guidance;
- actual production callback/origin smoke.

## 35. Failure Matrix

| Failure | Required behavior | Forbidden behavior |
|---|---|---|
| Clerk unavailable during existing valid locally verified token flow | Follow verified SDK/cache policy; fail safely if verification impossible | Trust unverified token |
| JWKS/key refresh fails | Use bounded valid cache if safe or deny/retry | Disable signature verification |
| Webhook delayed/missing | Synchronous reconciliation enables login; sweeper/reconciliation | Block every first login indefinitely |
| Valid staff Google login not allowlisted | Deny internal access | Auto-create role from email/domain |
| Internal staff revoked, token still valid | Deny next request | Wait for token expiry |
| Email changed | Review/rebind workflow | Transfer authority automatically |
| Authz cache unavailable | DB fallback or sensitive fail-closed | Allow by stale UI/token role |
| Provider account conflict | Safe recovery/review | Merge internal users automatically |
| Email link opened elsewhere | Safe failure/retry/origin guidance | Disable protection silently |
| Missing policy/resource attribute | Deny with safe reason | Assume default allow |

## 36. Alternatives Considered

### 36.1 Clerk roles/custom claims as authorization authority

**Ditolak.** Claims can be stale and lack resource, lifecycle, assignment, SoD, and environment context. They may be hints only, not authority.

### 36.2 Email as internal user primary key

**Ditolak.** Email is mutable PII and unsafe for identity continuity or authority transfer.

### 36.3 Webhook-only user creation

**Ditolak.** Asynchronous delivery creates first-login race and provider dependency on the critical path.

### 36.4 Auto-provision staff from Google domain/email

**Ditolak.** Valid authentication is not internal authorization; exact allowlist and binding are required.

### 36.5 Frontend-only route/role guard

**Ditolak.** Client is untrusted and hidden UI does not protect APIs/resources.

### 36.6 Build local passwords

**Ditolak for MVP.** Adds credential storage, recovery, and security scope without product need.

### 36.7 Call Clerk Backend API for every authorization decision

**Ditolak.** Adds latency/rate-limit/provider coupling and still cannot decide Nekoru-specific authority. Verify session locally/through supported backend helper, then use internal state.

## 37. Consequences

### Positive

- provider can change without rewriting domain identity;
- staff access remains default-deny;
- role revocation is immediate at Nekoru boundary;
- login first request is resilient to webhook delay;
- resource/lifecycle/SoD decisions are explicit and auditable;
- token stays small and avoids stale custom authority claims;
- learner/account data is minimized;
- auth UX and recovery are testable.

### Negative

- internal identity/authorization tables and policy engine must be built;
- every protected request has internal authorization cost;
- staff provisioning needs controlled allowlist workflow;
- reconciliation and conflict handling add operational work;
- provider configuration remains production-critical;
- recent-auth policy requires later exact configuration/testing;
- Clerk account-linking behavior still needs monitoring and support procedures.

## 38. Revisit Triggers

ADR is revisited if:

- Clerk session/token/webhook model materially changes;
- enterprise SSO/organization tenancy is introduced;
- native mobile authentication is added;
- multi-tenant organizations require tenant-scoped identity/roles;
- regulatory/age/guardian flow changes provisioning;
- account-linking incidents show provider mapping insufficient;
- authorization latency/SLO cannot be met safely;
- another identity provider or provider migration is approved;
- break-glass/emergency authority is required.

## 39. Acceptance Criteria

ADR can become `Accepted` if:

- [ ] Clerk authentication and Nekoru authorization boundary is approved.
- [ ] Provider subject→internal user mapping and environment isolation are approved.
- [ ] Synchronous identity reconciliation and webhook follow-up model are approved.
- [ ] Learner and staff provisioning differences are approved.
- [ ] Exact verified-email allowlist plus stable binding is approved for staff.
- [ ] Token verification and browser security contract are approved.
- [ ] Contextual RBAC/resource/SoD evaluation and default deny are approved.
- [ ] Session revocation, cache, recent-auth, audit, and privacy rules are approved.
- [ ] Production configuration gate and tests are executable.
- [ ] Legal/production provider approval remains separate and fail-closed.

## 40. Open Implementation Details

| ID | Detail | Default sebelum diputuskan | Owner |
|---|---|---|---|
| `ADR005-OPEN-001` | Exact Clerk SDK/helper and session-token version | Use currently supported official backend verification; lock dependency/config in implementation ADR evidence | Engineering/Security |
| `ADR005-OPEN-002` | Session lifetime and recent-auth threshold | Provider defaults are not production approval; high-risk affected action blocked | Security/Product |
| `ADR005-OPEN-003` | Exact account-linking/subaddress settings | Review/test before production; conflict never auto-merges internal users | Security/Support/Product |
| `ADR005-OPEN-004` | Learner email retention/purpose | Store minimum approved purpose only; provider subject remains identity key | Privacy/Product |
| `ADR005-OPEN-005` | Staff allowlist administration bootstrap | No self-service escalation; establish audited initial owner out-of-band before Content Ops | Security/Operations |
| `ADR005-OPEN-006` | RLS defense-in-depth scope | Backend policy remains authority; evaluate with ADR-002 schema/grants | Security/Data |
| `ADR005-OPEN-007` | Enterprise SSO/organizations | Out of MVP; new decision required | Product/Security |

## 41. Decision Record

| Field | Nilai |
|---|---|
| ID | `ADR-005` |
| Decision | Clerk authenticates and manages provider sessions; stable provider subject maps to internal User; Nekoru performs synchronous identity reconciliation and contextual backend authorization using internal status, roles, permissions, ownership/assignment, lifecycle, environment, SoD, risk, and policy version. Staff access additionally requires exact verified-email allowlist and stable binding. |
| Status | `accepted` |
| Proposed at | 14 September 2026 |
| Accepted at | 14 September 2026 |
| Decision owners | Security Lead + Engineering Lead |
| Required reviewers | Product, Privacy/Legal, Operations, QA, Content Operations, Support |
| Revisit trigger | Provider model change, enterprise/native/multi-tenant auth, account-linking incident, or approved IdP migration. |
| Supersedes | Tidak ada |
| Superseded by | Tidak ada |
