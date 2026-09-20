# API and Event Contracts Nekoru — MVP N5

**Status:** Approved v1.0 untuk baseline API dan event contract  
**Tanggal:** 13 September 2026  
**Pemilik:** Engineering  
**Required reviewers:** Product, Academic, Data, Security/Privacy, Accessibility, QA, dan Operations  
**Cakupan aktif:** Milestone 1 U01 online-only  
**Cakupan evolusi:** Namespace dan convention untuk U01–U24, Content Operations, Assessment, offline, serta AI evaluation

## 1. Tujuan

Dokumen ini mendefinisikan kontrak komunikasi antara learner web, Content Operations web, modular-monolith API, provider, job delivery, dan event consumer. Ia menetapkan:

1. convention HTTP dan OpenAPI;
2. authentication, authorization, idempotency, concurrency, correlation, dan versioning;
3. endpoint Milestone 1 beserta request/response semantics;
4. event envelope, event registry, delivery, ordering, dan deduplication;
5. error/problem catalog;
6. privacy serta answer-leakage boundary;
7. executable artifact map dan contract-test requirements.

Dokumen ini tidak menggantikan domain schema. Field object domain menggunakan schema dari [Domain Model and Schemas](./domain-model-and-schemas.md); policy semantics mengikuti [Learning Policy and Registry N5](./learning-policy-and-registry-n5.md).

## 2. Dokumen Sumber

- [Implementation Readiness](./implementation-readiness.md)
- [Domain Model and Schemas](./domain-model-and-schemas.md)
- [Learning Policy and Registry N5](./learning-policy-and-registry-n5.md)
- [Technical Architecture](./technical-architecture.md)
- [Learning Engine](./learning-engine.md)
- [Mastery Specification](./mastery-specification.md)
- [Practice Engine](./practice-engine.md)
- [Assessment Specification N5](./assessment-specification-n5.md)
- [Content Seed U01](../content/content-seed-u01.md)
- [User Flows](../ui-ux/03-user-flows.md)
- [Learner Screen Specifications](../ui-ux/04-screen-specifications-learner.md)

## 3. Contract Principles

1. OpenAPI 3.1 dan JSON Schema menjadi kontrak machine-readable.
2. Zod schemas menjadi boundary validation bersama web/API; schema database tidak diekspos langsung.
3. Client tidak menyimpulkan state akademik dari status HTTP atau riwayat UI.
4. Mutation yang dapat diulang memakai idempotency key dan request fingerprint.
5. Mutation aggregate memakai `expected_revision`.
6. API tidak menerima floating version seperti `latest` untuk run, evidence, publication, atau decision.
7. Field unreleased answer, rationale, hidden rubric, serta assessment content tidak pernah dikirim sebelum release policy mengizinkan.
8. Event domain berasal dari committed state; event tidak digunakan untuk membuat transaksi kritis menjadi eventually consistent tanpa alasan.
9. Semua consumer idempotent dan menyimpan durable receipt.
10. Additive change tidak boleh mengubah semantic field lama; breaking change memakai contract version baru.

## 4. HTTP Baseline

### 4.1 Base URL dan representation

- Base path: `/api/v1`.
- Media type default: `application/json`.
- Error: `application/problem+json`.
- Timestamp: RFC 3339 UTC.
- Date: ISO `YYYY-MM-DD` dengan timezone context.
- Encoding: UTF-8.
- Property naming: `snake_case` pada HTTP dan event payload.
- Enum value: lowercase `snake_case`.

### 4.2 Required headers

| Header | Berlaku | Aturan |
| --- | --- | --- |
| `Authorization` | Authenticated endpoint | `Bearer <Clerk token>`; token tidak dicatat |
| `Content-Type` | Request dengan body | `application/json` |
| `Accept` | Semua request | `application/json` atau problem JSON |
| `X-Correlation-ID` | Opsional dari client | Server memvalidasi atau membuat baru; selalu dikembalikan |
| `Idempotency-Key` | Mutation yang ditandai idempotent | UUID/ULID opaque; scope per identity + operation |
| `If-Match` | Mutation aggregate | ETag/revision representation bila endpoint menggunakannya |

`expected_revision` tetap berada dalam request body untuk command yang secara domain memerlukannya. `If-Match` dapat menjadi transport guard tambahan, bukan pengganti domain revision.

### 4.3 Response envelope

Single-resource success mengembalikan resource langsung. Collection menggunakan:

```json
{
  "data": [],
  "next_cursor": null,
  "has_more": false
}
```

Mutation mengembalikan authoritative resource/receipt, revision baru, dan correlation ID melalui header. Client tidak mengoptimistically menciptakan academic result yang belum dikonfirmasi.

### 4.4 Status codes

| Status | Makna |
| --- | --- |
| `200` | Read/mutation selesai dan response tersedia |
| `201` | Resource baru dibuat |
| `202` | Command diterima; hasil final pending |
| `204` | Sukses tanpa body |
| `400` | Request malformed |
| `401` | Identity tidak valid |
| `403` | Identity valid tetapi tidak berwenang |
| `404` | Resource tidak ada atau sengaja tidak diungkap |
| `409` | State conflict, duplicate fingerprint mismatch, atau stale revision |
| `410` | Resource/version expired dan tidak dapat dipakai |
| `412` | Version/precondition tidak terpenuhi |
| `422` | Struktur valid tetapi melanggar domain rule |
| `423` | Run/resource terkunci oleh lifecycle/integrity rule |
| `429` | Rate limit |
| `503` | Dependency sementara tidak tersedia; retry policy dapat diberikan |

## 5. Authentication dan Authorization

### 5.1 Authentication

Clerk membuktikan identity/session. API memvalidasi signature, issuer, audience/authorized party, expiry, not-before, serta session state. Setelah valid, API memetakan provider subject ke internal `User`.

Milestone 1 mendukung:

- Google Sign-In;
- email link;
- guest onboarding draft sebelum authentication;
- synchronous identity reconciliation setelah token valid;
- webhook sebagai update lanjutan, bukan dependency login pertama.

### 5.2 Authorization

Authorization selalu dilakukan backend berdasarkan:

- internal user status;
- role dan permission;
- assignment/ownership;
- active role untuk staff;
- resource scope;
- lifecycle/status;
- separation of duties;
- environment.

Client-side route guard hanya untuk UX. Response `403` tidak mengungkap hidden answer, staff note, atau existence resource sensitif.

### 5.3 Actor context

Application command membentuk:

```json
{
  "actor_id": "usr_...",
  "actor_type": "learner",
  "active_role": "learner",
  "session_id": "provider_session_reference",
  "correlation_id": "cor_..."
}
```

Provider subject dan session reference tidak dikirim kembali kecuali endpoint account/security yang memerlukannya.

## 6. Idempotency dan Concurrency

### 6.1 Idempotency

Endpoint bertanda `IDEMPOTENT_REQUIRED` menyimpan:

- identity/scope;
- idempotency key;
- normalized request fingerprint;
- processing/final status;
- resource atau response reference;
- expiry policy key.

Perilaku:

1. key baru + valid request → proses command;
2. key sama + fingerprint sama + final → kembalikan hasil terdahulu;
3. key sama + fingerprint sama + processing → `409 IDEMPOTENCY_IN_PROGRESS` atau receipt pending;
4. key sama + fingerprint berbeda → `409 IDEMPOTENCY_KEY_REUSED`;
5. retry tidak membuat effect kedua.

### 6.2 Optimistic concurrency

Mutation aggregate membawa:

```json
{
  "expected_revision": 4
}
```

Jika current revision bukan `4`, API mengembalikan `409 STALE_REVISION` dengan `current_revision`, recovery action, dan safe refetch URL jika boleh diungkap.

Last-write-wins dilarang untuk profile goal/availability, learning plan, practice run, content, review, approval, publication, quarantine, dan access control.

## 7. Problem Details Contract

```json
{
  "type": "https://docs.nekoru.app/problems/stale-revision",
  "title": "Revision sudah berubah",
  "status": 409,
  "detail": "Data telah diperbarui sejak terakhir dibaca.",
  "instance": "/api/v1/profile",
  "code": "STALE_REVISION",
  "correlation_id": "cor_...",
  "retryable": false,
  "fields": [],
  "context": {
    "current_revision": 5,
    "recovery_action": "refetch"
  }
}
```

`detail` aman untuk pengguna dan tidak mengandung token, raw answer, hidden content, internal stack, SQL, provider payload, atau PII pihak lain.

## 8. Endpoint Registry Milestone 1

| Method | Path | Auth | Idempotency | Tujuan |
| --- | --- | --- | --- | --- |
| `GET` | `/health/live` | Tidak | Tidak | Process liveness tanpa dependency detail |
| `GET` | `/health/ready` | Internal | Tidak | Readiness dependency untuk platform |
| `GET` | `/me` | Ya | Tidak | Identity/profile bootstrap |
| `GET` | `/profile` | Ya | Tidak | Membaca learner profile |
| `PATCH` | `/profile` | Ya | Required | Memperbarui profile/goal/availability |
| `POST` | `/onboarding/migrate-guest-draft` | Ya | Required | Migrasi draft tamu sekali |
| `GET` | `/learning-plans/current` | Ya | Tidak | Active plan dan risk/projection ringkas |
| `POST` | `/learning-plans/initial` | Ya | Required | Membuat initial U01 plan |
| `POST` | `/session-plans` | Ya | Required | Membentuk next session deterministik |
| `POST` | `/sessions/{session_plan_id}/start` | Ya | Required | Membuat atau mengambil PracticeRun |
| `GET` | `/practice-runs/{practice_run_id}` | Ya | Tidak | Resume authoritative run state |
| `POST` | `/practice-runs/{practice_run_id}/activities/{activity_instance_id}/start` | Ya | Required | Mencatat activity start |
| `POST` | `/practice-runs/{practice_run_id}/submissions` | Ya | Required | Submit dan evaluasi objektif |
| `POST` | `/practice-runs/{practice_run_id}/activities/{activity_instance_id}/skip` | Ya | Required | Skip sesuai policy |
| `POST` | `/practice-runs/{practice_run_id}/complete` | Ya | Required | Finalisasi session dan summary |
| `GET` | `/practice-runs/{practice_run_id}/summary` | Ya | Tidak | Summary authoritative |
| `GET` | `/mastery` | Ya | Tidak | KC state yang boleh dilihat learner |
| `GET` | `/review/due` | Ya | Tidak | Review eligibility ringkas |

Semua route learner memverifikasi ownership. ID milik learner lain dikembalikan sebagai `404` atau `403` sesuai threat model tanpa membocorkan data.

## 9. Profile dan Onboarding Contracts

### 9.1 `GET /me`

Response:

```json
{
  "user_id": "usr_...",
  "learner_profile_id": "lrn_...",
  "profile_status": "active",
  "onboarding_state": "goal_required",
  "locale": "id-ID",
  "timezone": "Asia/Jakarta",
  "revision": 1
}
```

### 9.2 `PATCH /profile`

Request:

```json
{
  "expected_revision": 1,
  "timezone": "Asia/Jakarta",
  "experience_path": "absolute_beginner",
  "goal": {
    "target_level": "N5",
    "target_date": "2027-07-04"
  },
  "availability": [
    { "day_of_week": 1, "session_minutes": 30 }
  ]
}
```

Response mengembalikan profile authoritative dengan revision baru serta plan impact indicator. Field accessibility preference hanya diterima jika schema/consent policy mengizinkan.

### 9.3 `POST /onboarding/migrate-guest-draft`

Request:

```json
{
  "draft_id": "b39e90f1-4a46-4be0-bae5-f83fe2d1bb32",
  "schema_version": 1,
  "created_at": "2026-09-13T02:00:00Z",
  "expires_at": "2026-09-20T02:00:00Z",
  "goal": { "target_level": "N5", "target_date": null },
  "availability": [
    { "day_of_week": 1, "session_minutes": 30 }
  ],
  "timezone": "Asia/Jakarta",
  "locale": "id-ID"
}
```

Rules:

- account wajib;
- expired draft menghasilkan `410 GUEST_DRAFT_EXPIRED`;
- existing profile tidak ditimpa tanpa explicit conflict resolution;
- duplicate request mengembalikan migration receipt yang sama;
- response menentukan apakah client boleh menghapus local draft.

## 10. Learning Plan dan Session Contracts

### 10.1 `POST /learning-plans/initial`

Precondition:

- profile lengkap untuk milestone;
- `experience_path=absolute_beginner`;
- approved U01 seed pack tersedia;
- policy package compatible;
- belum ada active initial plan dengan scope sama.

Request:

```json
{
  "expected_profile_revision": 2,
  "requested_program": "N5_ABSOLUTE_BEGINNER"
}
```

Response `201` mengembalikan plan, exact VersionSet, starting unit U01, risk status, confidence, next action, serta reason code `NEW_TARGET_ELIGIBLE`.

### 10.2 `POST /session-plans`

Request:

```json
{
  "learning_plan_id": "lpl_...",
  "expected_learning_plan_revision": 1,
  "requested_minutes": 25,
  "requested_mode": "learning"
}
```

Response:

```json
{
  "id": "spl_...",
  "status": "planned",
  "mode": "learning",
  "time_budget_minutes": 25,
  "version_set": {},
  "items": [
    {
      "ordinal": 1,
      "purpose": "new",
      "primary_kc_id": "KC.N5.SOUND.VOWEL.A",
      "activity_definition_ref": { "id": "cnt_...", "version": 1, "hash": "..." },
      "reason_code": "NEW_TARGET_ELIGIBLE",
      "estimated_seconds": 45
    }
  ],
  "decision_id": "dec_...",
  "decision_hash": "sha256:...",
  "expires_at": "2026-09-13T03:00:00Z"
}
```

Client tidak menerima answer key atau unreleased rationale.

### 10.3 Start session

`POST /sessions/{session_plan_id}/start` memvalidasi plan ownership, status, expiry, VersionSet compatibility, dan content quarantine. Response `201` membuat PracticeRun; retry mengembalikan run yang sama.

Jika content menjadi quarantined sebelum start, API mengembalikan approved replacement/replan atau `423 CONTENT_UNAVAILABLE`. Plan tidak diubah diam-diam.

## 11. Practice Contracts

### 11.1 Practice run representation

Response hanya memuat current/released activity state, progress, save state, policy summaries, dan allowed actions. Future answer serta hidden feedback tidak diprefetch.

```json
{
  "id": "prn_...",
  "session_plan_id": "spl_...",
  "status": "active",
  "revision": 3,
  "progress": { "completed": 2, "total": 8 },
  "current_activity": {},
  "allowed_actions": ["submit", "skip", "replay_audio"],
  "save_state": "saved_server",
  "version_set": {}
}
```

### 11.2 Activity instance representation

Allowed fields:

- ID, ordinal, activity/interaction type;
- localized instruction;
- released stimulus and asset references;
- option/token IDs serta display content;
- allowed input/support actions;
- attempt/hint/replay counters;
- accessibility metadata;
- display policy;
- instance hash.

Prohibited sebelum release:

- answer key;
- correct option flag;
- hidden rationale;
- distractor classification yang mengungkap jawaban;
- unreleased misconception mapping;
- assessment scoring weight/position metadata yang dapat menjadi clue.

### 11.3 Submit response

Request:

```json
{
  "expected_run_revision": 3,
  "activity_instance_id": "ain_...",
  "response": {
    "interaction_type": "single_choice",
    "selected_option_ids": ["opt_..."]
  },
  "client_event_id": "550e8400-e29b-41d4-a716-446655440000",
  "client_occurred_at": "2026-09-13T02:30:00Z"
}
```

Response `200` untuk evaluator deterministik:

```json
{
  "submission_id": "sub_...",
  "attempt_number": 1,
  "evaluation": {
    "id": "evl_...",
    "status": "correct",
    "score": 1.0,
    "feedback": {
      "message_key": "feedback.correct.vowel",
      "released_answer": { "option_ids": ["opt_..."] },
      "rationale_key": "rationale.u01.vowel.a"
    }
  },
  "evidence_receipt": {
    "status": "accepted",
    "evidence_event_ids": ["evd_..."],
    "reason_codes": ["EVIDENCE_ACCEPTED"]
  },
  "run_revision": 4,
  "next_action": "continue"
}
```

Server menghitung attempt, normalization, evaluation, evidence, serta revision. Client tidak mengirim correctness, score, primary KC, atau evidence weight sebagai authority.

### 11.4 Skip

Skip menyimpan PracticeEvent dan mengembalikan next state. Skip bukan incorrect dan tidak menghasilkan negative evidence kecuali future approved policy secara eksplisit menetapkannya.

### 11.5 Complete

Completion memvalidasi tidak ada unresolved required activity state. Response memisahkan:

- session completion;
- meaningful learning status;
- evidence accepted/rejected/pending;
- mastery changes;
- review scheduled;
- next recommendation;
- limitations, termasuk partial seed scope.

Completion tidak mengklaim Unit U01, Stage S0, atau readiness selesai.

## 12. Mastery Read Contract

`GET /mastery` mendukung filter `domain`, `unit_id`, `status`, dan cursor. Learner response hanya menampilkan explainable view:

```json
{
  "data": [
    {
      "kc_id": "KC.N5.SOUND.VOWEL.A",
      "label": "Bunyi /a/",
      "status": "learning",
      "confidence_label": "developing",
      "review_due_at": null,
      "reason_codes": ["DELAYED_EVIDENCE_REQUIRED"]
    }
  ],
  "scope_notice": "Seed U01-L1 belum mewakili Unit U01 lengkap.",
  "next_cursor": null,
  "has_more": false
}
```

Formula internal, hidden weakness, atau raw evidence hanya tersedia pada authorized audit surface.

## 13. Event Envelope

```json
{
  "event_id": "evt_...",
  "event_type": "answer_evaluated",
  "event_version": 1,
  "occurred_at": "2026-09-13T02:30:01Z",
  "recorded_at": "2026-09-13T02:30:01Z",
  "producer": "practice",
  "subject": { "type": "practice_run", "id": "prn_..." },
  "actor": { "type": "learner", "id": "usr_...", "active_role": "learner" },
  "correlation_id": "cor_...",
  "causation_id": "sub_...",
  "sequence": 4,
  "partition_key": "prn_...",
  "schema_ref": "event.answer_evaluated.v1",
  "data_classification": "confidential",
  "payload": {},
  "payload_hash": "sha256:..."
}
```

### 13.1 Envelope rules

- `event_id` global unique dan menjadi dedupe key;
- `event_version` adalah schema version integer;
- `sequence` monotonik dalam aggregate/partition, bukan global;
- `occurred_at` adalah waktu domain; `recorded_at` waktu persistence;
- `actor` dapat `system` untuk scheduled/recalculation command;
- payload tidak mengulang secret atau raw answer kecuali event khusus restricted yang tidak keluar dari boundary;
- payload hash memakai canonical JSON yang ditetapkan ADR-003.

## 14. Event Registry Milestone 1

| Event | Producer | Consumer utama | Classification |
| --- | --- | --- | --- |
| `identity_reconciled` | Identity | Audit/Profile | confidential |
| `guest_draft_migrated` | Profile | Audit/Product analytics | confidential tanpa draft body |
| `learner_profile_updated` | Profile | Learning/Audit | confidential |
| `learning_plan_created` | Learning | Learner read model/Audit | confidential |
| `session_planned` | Learning | Practice/Audit | confidential |
| `session_started` | Practice | Learning/Analytics | confidential |
| `activity_started` | Practice | Analytics | confidential |
| `hint_used` | Practice | Evidence/Analytics | confidential |
| `audio_replayed` | Practice | Analytics | confidential |
| `answer_submitted` | Practice | Internal transaction/audit only | restricted; no raw response outside boundary |
| `answer_evaluated` | Practice | Learning/Evidence | confidential structured result |
| `evidence_recorded` | Learning | Mastery/Audit | confidential |
| `mastery_recalculated` | Mastery | Learning/read model/Audit | confidential |
| `review_scheduled` | Mastery | Learning/Notification read model | confidential |
| `activity_skipped` | Practice | Learning/Analytics | confidential |
| `activity_completed` | Practice | Learning/Analytics | confidential |
| `session_completed` | Practice | Learning/Analytics | confidential |
| `session_abandoned` | Practice | Learning/Analytics | confidential |
| `technical_failure_recorded` | Owning module | Operations/QA | internal/confidential, redacted |

## 15. Critical Transaction Boundaries

### 15.1 Objective submission

Dalam satu PostgreSQL transaction:

```text
validate run/instance/revision/idempotency
→ create Submission
→ create deterministic EvaluationResult
→ create candidate/accepted EvidenceEvent
→ update PracticeRun revision
→ write outbox events
→ commit
```

Mastery dapat dihitung dalam transaction yang sama bila boundary tetap sederhana, atau oleh idempotent consumer setelah evidence commit. User response harus membedakan `evidence accepted` dari `mastery recalculation pending`.

### 15.2 Session plan

Input learner state, curriculum/content/policy versions, clock, budget, serta stable tie-breaker di-snapshot. Persist SessionPlan, DecisionRecord, dan outbox dalam satu transaction.

### 15.3 Session completion

Finalisasi run, meaningful-learning decision, summary record, next-plan invalidation marker, dan outbox dilakukan atomik. Completion retry mengembalikan summary sebelumnya.

## 16. Delivery, Ordering, dan Retry

- Outbox consumer mengirim at-least-once.
- Consumer wajib idempotent; exactly-once claim dilarang.
- Ordering hanya dijamin per partition key/aggregate melalui sequence check.
- Event lebih lama yang tiba setelah sequence baru tidak boleh menurunkan read model.
- Gap sequence masuk retry/reconciliation, bukan diabaikan.
- Exponential backoff dan maximum attempts berada dalam operational config.
- Permanent failure masuk dead-letter workflow dan memunculkan alert/runbook.
- Replay menggunakan event version-specific handler atau approved migration adapter.

## 17. Provider Webhook dan Job Contracts

### 17.1 Clerk webhook

`POST /webhooks/clerk`:

1. membaca raw body;
2. memverifikasi signature dan timestamp/replay window;
3. menyimpan provider event ID pada inbox;
4. memetakan event allowlist;
5. menjalankan idempotent identity command;
6. mengembalikan receipt tanpa provider payload.

Unknown event aman diabaikan dengan audit/metric. Signature failure tidak membocorkan detail verifikasi.

### 17.2 QStash job callback

Namespace: `POST /jobs/qstash/{job_type}`. Handler memverifikasi signature, audience, URL, delivery ID, body schema, dan allowed job type sebelum mencatat durable receipt.

Milestone 1 tidak bergantung pada QStash untuk objective submission. Job dapat digunakan untuk noncritical recalculation/telemetry dengan deterministic synchronous fallback atau explicit pending state.

## 18. Error Code Registry

### 18.1 Authentication/authorization

- `AUTHENTICATION_REQUIRED`;
- `TOKEN_INVALID`;
- `SESSION_INACTIVE`;
- `ACCOUNT_SUSPENDED`;
- `FORBIDDEN`;
- `RESOURCE_SCOPE_FORBIDDEN`.

### 18.2 Validation/state

- `VALIDATION_FAILED`;
- `STALE_REVISION`;
- `IDEMPOTENCY_REQUIRED`;
- `IDEMPOTENCY_IN_PROGRESS`;
- `IDEMPOTENCY_KEY_REUSED`;
- `INVALID_STATE_TRANSITION`;
- `PRECONDITION_FAILED`;
- `RESOURCE_LOCKED`.

### 18.3 Version/content/policy

- `VERSION_NOT_FOUND`;
- `VERSION_INCOMPATIBLE`;
- `VERSION_EXPIRED`;
- `POLICY_INCOMPLETE`;
- `CONTENT_NOT_APPROVED`;
- `CONTENT_QUARANTINED`;
- `CONTENT_UNAVAILABLE`;
- `MANIFEST_INTEGRITY_FAILED`.

### 18.4 Learning/practice

- `GUEST_DRAFT_EXPIRED`;
- `GUEST_DRAFT_CONFLICT`;
- `LEARNING_PLAN_EXISTS`;
- `SESSION_PLAN_EXPIRED`;
- `PRACTICE_RUN_ALREADY_COMPLETED`;
- `ACTIVITY_NOT_CURRENT`;
- `SUBMISSION_INVALID`;
- `ATTEMPT_LIMIT_REACHED`;
- `FEEDBACK_NOT_RELEASED`;
- `EVALUATION_PENDING`;
- `TECHNICAL_EVALUATION_FAILURE`;
- `AUDIO_UNAVAILABLE`.

Setiap error code memiliki HTTP status, retryability, safe detail key, required context allowlist, logging severity, metric name, serta owning module.

## 19. Privacy dan Logging

### 19.1 Dilarang dalam generic logs/events/analytics

- access/refresh token;
- email magic link;
- full provider webhook body;
- raw learner answer;
- hidden answer/rubric;
- presigned asset URL penuh;
- private staff note;
- unredacted AI request/response;
- accessibility preference detail yang sensitif.

### 19.2 Correlation

Log boleh memuat internal actor ID, module, route template, operation, status, latency, retry count, version refs, reason/error code, aggregate ID, dan correlation ID. Query string serta request/response body tidak dicatat secara generik.

### 19.3 Retention

Contract menyimpan `retention_policy_key`; duration tetap `TBD` sampai dokumen privacy disetujui. Ketiadaan duration tidak membolehkan indefinite retention secara diam-diam pada production.

## 20. API Versioning dan Compatibility

1. Additive optional response field diperbolehkan dalam `/v1`.
2. Field existing tidak berubah makna atau tipe dalam version yang sama.
3. Client mengabaikan optional unknown field tetapi menolak unknown enum pada safety-critical decision kecuali schema mendefinisikan fallback aman.
4. Breaking path/request/response change menggunakan `/api/v2` atau media/schema version baru.
5. Event payload breaking change menaikkan `event_version`; producer dapat dual-publish hanya dengan migration plan.
6. Deprecation mencatat first deprecated version, replacement, deadline, telemetry, dan rollback.
7. Contract consumer/provider tests berjalan sebelum deployment.

## 21. Future Endpoint Namespaces

Namespace berikut dicadangkan tetapi tidak aktif pada Milestone 1:

- `/placement/*`;
- `/assessments/*`;
- `/readiness/*`;
- `/offline-packages/*`;
- `/sync/*`;
- `/content-ops/artifacts/*`;
- `/content-ops/reviews/*`;
- `/content-ops/releases/*`;
- `/content-ops/issues/*`;
- `/content-ops/audit/*`;
- `/internal/evaluations/*`.

Reservation tidak dianggap sebagai contract final. Endpoint diaktifkan hanya setelah specification, schema, authorization, privacy, dan tests tersedia.

## 22. Executable Artifact Map

```text
packages/contracts/
  openapi/
    nekoru-api.v1.yaml
  src/
    common/
      headers.schema.ts
      pagination.schema.ts
      problem.schema.ts
      event-envelope.schema.ts
    identity/*.schema.ts
    profile/*.schema.ts
    learning/*.schema.ts
    practice/*.schema.ts
    mastery/*.schema.ts
    events/*.schema.ts
  fixtures/
    valid/*.json
    invalid/*.json
```

OpenAPI dihasilkan/divalidasi dari shared schema tanpa membuat dua sumber kebenaran manual. Generated artifact diperiksa dalam CI untuk drift.

## 23. Contract Test Matrix

1. unauthenticated, invalid token, inactive session, dan suspended account;
2. ownership/resource-scope denial;
3. valid dan invalid request/response untuk setiap operation;
4. missing/reused/in-progress idempotency key;
5. duplicate identical request menghasilkan resource/receipt sama;
6. stale revision dan safe refetch;
7. expired guest draft serta conflict dengan existing profile;
8. missing/incompatible/quarantined content atau policy;
9. session planning determinism dan stable tie-breaker;
10. answer field tidak terdapat pada pre-release ActivityInstance;
11. deterministic submission/evaluation/evidence transaction;
12. technical audio/evaluator failure bukan incorrect;
13. duplicate outbox/inbox delivery;
14. out-of-order dan gap event sequence;
15. schema/event backward compatibility;
16. log/analytics redaction;
17. webhook signature/replay rejection;
18. retryable problem details mempunyai recovery metadata yang aman.

## 24. Observability Contract

Setiap operation menghasilkan:

- request count, latency, status/error code;
- correlation ID;
- idempotency outcome;
- database transaction duration;
- outbox lag dan delivery attempts;
- domain outcome code tanpa sensitive payload;
- dependency name serta sanitized failure category.

Alert P0 untuk authorization bypass, answer leakage, duplicate academic effect, event loss/gap berkepanjangan, data corruption risk, dan sustained session/submission failure.

## 25. Acceptance Criteria

Dokumen dapat `approved` jika:

1. seluruh endpoint Milestone 1 memiliki authentication, authorization, request, response, error, idempotency, dan concurrency semantics;
2. client tidak mengirim score/mastery/evidence sebagai authority;
3. hidden answer/feedback tidak dapat bocor melalui response, error, log, cache, atau analytics;
4. objective submission mempunyai atomicity dan duplicate behavior yang eksplisit;
5. event envelope, ordering, delivery, dedupe, replay, serta schema versioning dapat diuji;
6. problem catalog memiliki owner dan safe recovery;
7. provider webhook diverifikasi serta idempotent;
8. privacy classification dan redaction contract tersedia;
9. OpenAPI/Zod/event schema drift dicegah CI;
10. future namespace tidak dianggap implemented;
11. semua contract fixtures dan consumer/provider tests lulus;
12. Engineering, Product, Security/Privacy, Academic, Data, QA, dan Operations menyetujui version/hash.

## 26. Keputusan Terbuka

| ID | Keputusan | Rekomendasi | Status |
| --- | --- | --- | --- |
| `API-OPEN-001` | Masa simpan IdempotencyRecord | Gunakan policy key tanpa angka sampai retention/operations policy disetujui | Blocked untuk production, tidak untuk schema |
| `API-OPEN-002` | Apakah mastery recalculation sinkron dalam objective submission | Mulai sinkron untuk U01; ekstrak async hanya jika latency/scale terbukti | Menunggu performance test |
| `API-OPEN-003` | Exact rate limits per route/risk bucket | Konfigurasi per environment setelah threat/load test | Menunggu security/load test |
| `API-OPEN-004` | ETag selain domain `expected_revision` | Gunakan untuk cache/read optimization bila memberi manfaat; domain revision tetap wajib | Tidak memblokir Milestone 1 |

## 27. Decision Record

| ID | Keputusan | Status | Owner | Tanggal |
| --- | --- | --- | --- | --- |
| `API-001` | REST JSON `/api/v1`, OpenAPI 3.1, Zod boundary schema, dan Problem Details digunakan sebagai baseline. | `approved` | Engineering | 13 September 2026 |
| `API-002` | Clerk hanya menyediakan identity/session; authorization tetap di backend Nekoru. | `approved` | Engineering + Security | 13 September 2026 |
| `API-003` | Semua mutation penting menggunakan idempotency key dan optimistic revision. | `approved` | Engineering | 13 September 2026 |
| `API-004` | Objective submission menyimpan submission, evaluation, evidence, run revision, dan outbox secara atomik. | `approved` | Engineering + Academic | 13 September 2026 |
| `API-005` | Event delivery at-least-once dengan idempotent consumer dan per-aggregate ordering. | `approved` | Engineering + Operations | 13 September 2026 |
| `API-006` | Hidden answer/rationale/rubric tidak dikirim sebelum feedback release. | `approved` | Engineering + Assessment + Security | 13 September 2026 |
| `API-007` | Raw answer tidak masuk generic log, analytics, atau cross-module event. | `approved` | Security/Privacy + Data | 13 September 2026 |
| `API-008` | Milestone 1 hanya mengaktifkan endpoint U01 online; future namespaces tetap reserved/inactive. | `approved` | Product + Engineering | 13 September 2026 |
