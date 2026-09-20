# ADR-004 — Transactional Outbox/Inbox dan QStash Delivery/Recovery

**Status:** Accepted  
**Tanggal:** 14 September 2026  
**Decision owners:** Engineering Lead dan Operations Lead  
**Required reviewers:** Data, Security/Privacy, QA, Product, dan affected domain owners  
**Berlaku untuk:** Domain/integration events, background jobs, scheduled work, callbacks, dan provider webhooks  
**Supersedes:** Tidak ada  
**Superseded by:** Tidak ada  
**Accepted at:** 14 September 2026

## 1. Konteks

Nekoru menggunakan PostgreSQL sebagai sumber kebenaran dan QStash sebagai HTTP delivery/scheduling provider. Business mutation dan message publication tidak dapat dibuat atomik dalam satu distributed transaction. Tanpa transactional outbox, kondisi berikut dapat terjadi:

- database commit berhasil tetapi event tidak pernah diterbitkan;
- event diterbitkan sebelum transaction commit lalu consumer melihat state yang belum ada;
- timeout publish membuat producer tidak tahu apakah provider menerima message;
- retry provider atau operator menjalankan side effect dua kali;
- event tiba tidak berurutan dan menurunkan projection;
- QStash DLQ/log retention berakhir sementara Nekoru kehilangan ledger;
- callback/provider metadata dianggap sebagai authority atas domain outcome;
- raw learner answer atau data sensitif bocor melalui payload/transport log.

ADR ini menetapkan transactional outbox/inbox, event envelope, QStash adapter, signature verification, idempotent consumer, ordering, retry, dead-letter, replay, reconciliation, security, privacy, dan operational evidence.

## 2. Sumber Keputusan

- [Technical Architecture](../product-specs/technical-architecture.md)
- [Domain Model and Schemas](../product-specs/domain-model-and-schemas.md)
- [API and Event Contracts](../product-specs/api-and-event-contracts.md)
- [Security, Privacy, and Data Governance](../product-specs/security-privacy-data-governance.md)
- [Test and Quality Plan](../product-specs/test-and-quality-plan.md)
- [ADR-001 — Monorepo dan Modular Monolith](./ADR-001-monorepo-and-modular-monolith.md)
- [ADR-002 — PostgreSQL Ownership dan Transactions](./ADR-002-postgresql-ownership-and-transactions.md)
- [ADR-003 — Canonical JSON, VersionSet, IDs, dan Hashes](./ADR-003-canonical-json-versioning-identifiers-and-hashes.md)
- [QStash Signature Verification](https://upstash.com/docs/qstash/howto/signature)
- [QStash Deduplication](https://upstash.com/docs/qstash/features/deduplication)
- [QStash Retries and Publish Options](https://upstash.com/docs/qstash/api-reference/messages/publish-a-message)
- [QStash Queues](https://upstash.com/docs/qstash/features/queues)
- [QStash Dead Letter Queue](https://upstash.com/docs/qstash/features/dlq)

## 3. Decision Drivers

1. Business commit dan intent-to-publish harus atomik.
2. Delivery bersifat at-least-once; exactly-once claim dilarang.
3. Duplicate, replay, timeout, dan out-of-order delivery tidak boleh menggandakan domain effect.
4. PostgreSQL tetap authoritative ledger walaupun QStash/log/DLQ hilang.
5. Endpoint consumer publik harus memverifikasi authenticity sebelum memproses body.
6. Recovery harus dapat dilakukan tanpa mengedit business state secara manual.
7. Event harus versioned, hashable, privacy-minimized, dan dapat diaudit.
8. Failure analytics/notification tidak boleh merusak learner transaction.
9. Provider dapat diganti tanpa mengubah domain/application contract.
10. Operasi harus mempunyai alert, runbook, bounded retry, dan replay evidence.

## 4. Keputusan Ringkas

Nekoru menggunakan pola **transactional outbox + idempotent inbox**:

- originating business transaction menulis domain state dan `platform.outbox_events` secara atomik;
- dispatcher setelah commit mengirim canonical event envelope ke QStash;
- QStash adalah transport at-least-once, bukan source of truth atau job ledger;
- consumer memverifikasi signature terhadap raw body dan intended URL, lalu memvalidasi schema/hash;
- consumer mengklaim unique inbox receipt dan menerapkan domain effect dalam satu PostgreSQL transaction;
- duplicate mengembalikan receipt/result sebelumnya tanpa side effect kedua;
- provider ordering tidak dijadikan correctness dependency; aggregate sequence dan reconciliation melindungi ordering;
- QStash deduplication ID memakai stable outbox/event identity sebagai optimasi publish uncertainty, tetapi window provider tidak menggantikan inbox;
- provider DLQ/failure callback adalah signal; internal outbox/inbox/recovery record tetap authority;
- raw answer, hidden key/rubric, token, dan detailed accessibility data dilarang dalam generic event payload.

## 5. Delivery Semantics

Kontrak resmi Nekoru:

```text
producer persistence: atomic business state + outbox intent
provider transport: at least once
consumer effect: effectively once per handler version through inbox/idempotency
ordering: explicit per aggregate, never assumed globally
```

“Effectively once” hanya berarti database effect dilindungi receipt/constraint untuk satu handler contract. Ia bukan klaim exactly-once network delivery.

## 6. Event Categories

| Category | Tujuan | Contoh | Boleh asynchronous? |
|---|---|---|---|
| Domain event | Fakta immutable dari domain | `session_completed`, `evidence_recorded` | Ya setelah source commit |
| Integration event | Kontrak minimum untuk consumer lintas module/provider | `identity_access_changed` | Ya |
| Command/job | Permintaan menjalankan kerja dengan owner/terminal outcome | `purge_subject_data` | Ya, dengan job receipt |
| Scheduled trigger | Memulai command pada waktu tertentu | `review_reminder_due` | Ya; trigger bukan domain result |
| Provider webhook | Fakta dari provider yang harus diverifikasi | Clerk identity event | Ya melalui inbox adapter |
| Product analytics | Allowlisted observation | `activity_started` | Ya; bukan source of truth |
| Audit record | Evidence operasional/security | authorization/publication decision | Ditulis lokal; event hanya projection |

Event tidak boleh dipakai sebagai nama lain untuk arbitrary RPC yang memerlukan synchronous response.

## 7. Canonical Event Envelope v1

```json
{
  "aggregate": {
    "id": "prun_<ULID>",
    "revision": 4,
    "sequence": 7,
    "type": "practice_run"
  },
  "causation_id": null,
  "correlation_id": "cor_<ULID>",
  "data": {},
  "event_id": "evt_<ULID>",
  "event_type": "practice.session_completed",
  "event_version": 1,
  "occurred_at": "2026-09-14T00:00:00.000Z",
  "payload_hash": "sha256:<64-lowercase-hex>",
  "producer": "practice",
  "schema_version": 1,
  "subject": {
    "id": "lrn_<ULID>",
    "type": "learner"
  },
  "trace_context": {
    "trace_id": "<opaque-or-null>"
  }
}
```

Rules:

- envelope dan `data` schema ditentukan oleh event type/version;
- `payload_hash` mengikuti `event-payload/v1` pada ADR-003 dan tidak meng-hash dirinya sendiri;
- `trace_context` boleh tidak masuk hash sesuai contract dan tidak menjadi domain input;
- `subject` dihilangkan atau dipseudonimkan untuk event yang tidak memerlukannya;
- raw response dan hidden answer tidak dikirim;
- `aggregate.sequence` monoton per aggregate event stream jika event type memerlukannya;
- `occurred_at` adalah source time; provider delivery time tidak menggantikannya;
- PII/classification/retention ditentukan per event registry.

## 8. Outbox Record

Minimum fields:

| Field | Tujuan |
|---|---|
| `id` | `obx_` prefixed ULID |
| `event_id` | Stable `evt_` identity; unique |
| `event_type`, `event_version` | Handler routing/version |
| `aggregate_type/id/sequence` | Ordering/reconciliation |
| `payload` | Canonical validated envelope |
| `payload_hash` | Integrity and uncertain-publish detection |
| `classification` | Privacy/security routing |
| `destination_key` | Allowlisted logical destination, bukan arbitrary URL |
| `state` | Internal lifecycle |
| `available_at` | Earliest publish time |
| `lease_owner`, `lease_expires_at` | Concurrent dispatcher claim |
| `publish_attempts` | Internal provider-publish attempts |
| `provider_message_id` | Last accepted provider ID |
| `provider_deduplicated` | Provider response signal |
| `last_error_code` | Safe operational category |
| `published_at`, `completed_at` | Lifecycle timestamps |
| `retention_policy_key` | No hidden TTL |
| `created_at`, `updated_at` | Audit/operation |

Payload stored di outbox adalah exact event envelope yang dikirim. Dispatcher tidak membangun ulang event dari current database state.

## 9. Outbox State Machine

```text
pending
  -> publishing
  -> provider_accepted
  -> delivery_confirmed        (jika internal consumer receipt dapat dikorelasikan)
  -> terminal_failed
  -> cancelled                 (hanya sebelum effect dan sesuai policy)

publishing
  -> pending                   (lease expired / retryable publish failure)
  -> provider_accepted
  -> publish_uncertain         (timeout/connection ambiguity)

publish_uncertain
  -> publishing               (same stable deduplication identity)
  -> provider_accepted
  -> terminal_failed          (policy/authorization/config failure)
```

`provider_accepted` berarti QStash menerima publish request, bukan consumer effect selesai. Untuk event fire-and-forget, outbox dapat selesai berdasarkan provider acceptance plus monitoring policy; untuk high-risk job, terminal status memerlukan inbox/job receipt.

## 10. Atomic Producer Flow

Dalam transaction dari ADR-002:

1. validate command, revision, idempotency, dan VersionSet;
2. persist business mutation/decision;
3. create event ID dan canonical envelope;
4. validate event registry/schema/classification;
5. compute payload hash;
6. insert outbox with unique event ID/aggregate sequence where applicable;
7. complete originating idempotency receipt;
8. commit.

Publisher tidak dipanggil sebelum commit. Rollback menghapus business mutation dan outbox intent bersama-sama.

## 11. Dispatcher Claim dan Publish

Dispatcher:

- membaca rows `pending`/retryable `publish_uncertain` dengan `available_at <= now`;
- claim batch kecil memakai `FOR UPDATE SKIP LOCKED` atau equivalent lease transaction;
- menetapkan `lease_owner` dan bounded `lease_expires_at`;
- commit claim sebelum network call;
- publish di luar database transaction;
- memakai allowlisted destination key resolved dari server config;
- memakai stable deduplication ID derived from event/outbox ID;
- menyimpan provider response atau retry state pada transaction baru;
- tidak menghapus outbox setelah provider acceptance;
- memperpanjang/menyelesaikan lease hanya dengan compare-owner/revision guard.

Batch size, poll interval, lease duration, publish timeout, and parallelism adalah operational config dengan safe bounds.

## 12. QStash Publish Contract

Baseline adapter menggunakan:

- authenticated QStash publish API/official SDK;
- JSON content type;
- stable destination allowlist;
- explicit retry count/delay/timeout per message class;
- `Upstash-Deduplication-Id` equivalent dari stable Nekoru event/outbox identity;
- label yang tidak sensitif untuk environment/event class;
- failure callback untuk advisory reconciliation bila disetujui;
- queue hanya untuk workload yang benar-benar memerlukan provider FIFO/flow control.

Provider content-based deduplication bukan default karena dua event sah dapat memiliki body serupa dan Nekoru sudah mempunyai stable identity. QStash deduplication window adalah optimasi publish uncertainty; duplicate setelah window tetap aman karena inbox.

Token QStash hanya tersedia pada dispatcher/authorized operations runtime. Ia tidak pernah masuk browser, event body, log, atau client configuration.

## 13. Delivery Endpoint Security

Consumer endpoint berada di public HTTPS surface karena QStash harus dapat mengaksesnya, tetapi bukan public-authorized API.

Urutan wajib:

1. enforce method, content type, and bounded body size;
2. preserve exact raw request body;
3. obtain signature header;
4. verify dengan official/approved receiver memakai current dan next signing keys;
5. bind verification to intended URL/audience bila SDK/contract mendukung;
6. validate timestamp/replay constraints dari signed claims;
7. baru parse JSON;
8. validate envelope/event schema and payload hash;
9. route melalui allowlisted event type/version ke handler;
10. claim inbox and apply effect transactionally.

Signature verification setelah JSON reserialization dilarang. Redirect, alternate host, proxy rewriting, dan preview URL harus diuji terhadap intended URL verification.

## 14. Signing-Key Rotation

- current dan next QStash signing key disimpan di secret manager/environment runtime, bukan database umum;
- verifier menerima current/next selama provider rotation window;
- key refresh/rotation adalah audited operation;
- old key dihapus hanya setelah provider state dan deployment propagation terverifikasi;
- missing/invalid key membuat endpoint fail closed;
- keys tidak dicetak pada error/log;
- environment production, staging, dan development terpisah;
- incident compromise memicu rotation, replay review, dan inbox/outbox reconciliation.

## 15. Inbox Record

Minimum fields:

| Field | Tujuan |
|---|---|
| `id` | `ibx_` receipt identity |
| `producer` | Logical producer/provider |
| `message_id` | Provider or event ID |
| `event_id` | Canonical Nekoru event ID bila tersedia |
| `event_type`, `event_version` | Handler routing |
| `payload_hash` | Detect same ID/different body |
| `handler_name`, `handler_version` | Effect contract identity |
| `state` | Processing/terminal lifecycle |
| `aggregate_sequence` | Ordering/gap detection |
| `effect_receipt` | Canonical domain/job result reference |
| `attempts` | Internal execution attempts |
| `first_received_at`, `last_received_at` | Delivery observation |
| `completed_at` | Terminal processing time |
| `last_error_code` | Redacted category |
| `retention_policy_key` | Approved retention mapping |

Unique boundary baseline:

```text
(producer, message_id, handler_name, handler_version)
```

Event ID dan payload hash mendapat additional constraints/reconciliation rules. Message ID sama dengan payload hash berbeda adalah integrity incident.

## 16. Consumer Transaction

Setelah signature/schema verification:

1. begin transaction;
2. insert/claim inbox receipt via unique constraint;
3. jika completed duplicate, return stored effect receipt;
4. jika same identity/different payload, record conflict and apply no effect;
5. validate event type/version, aggregate sequence, and applicable authorization/ownership;
6. invoke public application command/handler;
7. persist domain effect, derived outbox, and job/audit receipt;
8. mark inbox completed with effect reference;
9. commit;
10. return success only after durable commit.

Consumer crash sebelum commit memungkinkan redelivery tanpa partial effect. Crash setelah commit tetapi sebelum HTTP response menghasilkan duplicate yang mengembalikan receipt.

## 17. HTTP Response Policy

| Condition | Response class | QStash behavior intent |
|---|---|---|
| Verified, processed/duplicate completed | `2xx` | Stop retry |
| Verified, durable terminal rejection recorded | `2xx` with no sensitive body | Stop poison-message retry; internal alert/reconciliation |
| Retryable dependency/transaction failure | `5xx` | Retry according to provider policy |
| Rate/saturation temporary | `429`/`5xx` per tested provider semantics | Retry with flow control/backoff |
| Invalid/missing signature | `401/403` | No effect; security telemetry; repeated provider retry tolerated |
| Oversized/invalid method/content type | `4xx` | No parse/effect; security/operational signal |
| Unknown event version without compatible handler | Durable terminal rejection when authenticity known | No guessed processing |

Application response body tidak mengandung stack trace, signing detail, internal permission graph, atau raw payload.

## 18. Retry Policy

Retry mempunyai dua lapisan berbeda:

### 18.1 Publish retry

Dispatcher→QStash failures:

- bounded exponential backoff with jitter;
- same stable deduplication identity;
- distinguish terminal auth/config/schema from retryable timeout/5xx;
- publish uncertainty disimpan eksplisit;
- sweeper reclaims expired lease;
- max attempts/time budget dikonfigurasi per message class;
- terminal publish failure memicu alert dan internal recovery queue.

### 18.2 Delivery retry

QStash→consumer failures:

- provider retry count/delay/timeout explicit;
- consumer tetap idempotent;
- long job dipecah atau memakai job state, bukan HTTP handler tanpa checkpoint;
- repeated failure masuk provider DLQ dan internal alert/reconciliation;
- retry tidak mengubah event body/version.

Provider default boleh berubah; production config harus mengunci nilai yang disetujui dan mencatatnya pada release evidence.

## 19. Ordering dan Aggregate Sequence

Tidak ada global event ordering. Untuk stream yang memerlukan order:

- producer mengalokasikan monoton `aggregate.sequence` dalam originating transaction;
- unique constraint mencegah duplicate sequence per aggregate;
- consumer menyimpan last applied sequence pada projection/handler scope;
- sequence sama + hash sama adalah duplicate;
- sequence sama + hash berbeda adalah conflict;
- lower sequence yang sudah superseded tidak menurunkan state;
- gap sequence membuat item `waiting_for_gap`/reconciliation, bukan silent skip;
- consumer yang commutative boleh mendokumentasikan bahwa order tidak material.

QStash FIFO queue dapat dipakai untuk efficiency/flow control, tetapi correctness tetap dilindungi sequence/inbox karena replay, DLQ retry, callback, dan future provider change dapat mengubah arrival order.

## 20. Dead-letter dan Terminal Failure

QStash DLQ adalah temporary provider facility. Internal authority:

- outbox state and attempts;
- provider message/DLQ references jika tersedia;
- failure callback receipt yang sudah diverifikasi;
- inbox/job state;
- audit/incident record;
- recovery action/approval.

Terminal categories:

- invalid contract/schema/version;
- authorization/configuration error;
- payload integrity conflict;
- retry budget exhausted;
- destination removed/unavailable;
- domain precondition permanently failed;
- handler bug requiring deployment.

Item terminal tidak dihapus otomatis. Retention mengikuti approved policy; provider DLQ retention tidak dipakai sebagai Nekoru retention policy.

## 21. Failure Callback

Jika digunakan, QStash failure callback:

- mempunyai endpoint/signature verification sama ketat;
- diperlakukan at-least-once dan dicatat melalui inbox;
- hanya membawa minimum provider metadata yang diperlukan;
- tidak langsung mengubah learner academic state;
- mengorelasikan provider message ID ke outbox;
- mempercepat alert/reconciliation tetapi bukan satu-satunya detector;
- duplicate callback aman;
- callback failure tidak menghapus original recovery path.

Sweeper internal tetap mendeteksi outbox/provider state yang melewati time budget.

## 22. Replay dan Recovery

Replay hanya melalui controlled command/tool:

1. identify outbox/inbox/job and exact event/version/hash;
2. verify handler compatibility and current incident state;
3. preview affected consumer/effect;
4. require approval based on risk class;
5. preserve original event identity unless contract requires explicit replacement event;
6. publish with stable/new replay identity plus reference to original as defined;
7. observe inbox/effect receipt;
8. record actor, reason, time, before/after state, and evidence.

Operator tidak mengedit payload, sequence, or business table untuk membuat replay “lulus”. Payload correction menggunakan new versioned correction event with `supersedes_event_id` and reason.

## 23. Scheduled Jobs

QStash schedule/delay hanya memicu command. Authoritative job record berada di PostgreSQL:

- job ID/type/version;
- schedule intention/effective time;
- state and attempts;
- parameters hash/reference;
- owner;
- lock/lease;
- effect receipt;
- cancellation/replacement reference;
- retention policy.

Trigger duplicate atau terlambat memeriksa job receipt and current eligibility. Schedule provider tidak menentukan bahwa domain action pasti masih valid.

## 24. Payload Privacy dan Size

Payload menggunakan reference-first design:

- kirim typed ID, version, hash, reason code, and minimum aggregate values;
- consumer mengambil authorized canonical data bila diperlukan;
- jangan kirim raw learner answer, answer key, rubric, token, email, accessibility diagnosis/detail, or full profile;
- avoid sensitive values in destination URL, label, headers, and error;
- payload size memiliki application limit jauh di bawah provider maximum;
- large asset/export menggunakan private object reference plus signed access, bukan inline event body;
- event registry mencatat classification, retention, allowed producer/consumer, and prohibited properties.

Hash sensitive data bukan anonymization sesuai ADR-003.

## 25. Destination dan Handler Registry

Setiap route memiliki registry entry:

| Field | Contoh purpose |
|---|---|
| destination key | Logical key; resolved server-side |
| environment | Prevent cross-environment publish |
| allowed event/job types | Default deny |
| handler name/version | Inbox uniqueness and compatibility |
| authentication mode | QStash signature/provider-specific signature |
| timeout/retry/queue policy | Explicit delivery behavior |
| payload size/classification | Security/privacy enforcement |
| concurrency/flow-control class | Protect dependencies |
| owner/on-call/runbook | Recovery |

Arbitrary destination URL dari event payload/user input dilarang untuk mencegah SSRF/data exfiltration.

## 26. Milestone 1 Scope

Aktif minimum:

- transactional outbox pada objective submission, session plan/completion, identity sync, and critical audit projection;
- dispatcher and sweeper;
- QStash adapter untuk pekerjaan yang benar-benar asynchronous;
- signature-verified job endpoint;
- inbox/effect receipt;
- event schema registry and payload hash;
- duplicate/out-of-order/retry tests;
- operational dashboard/alert minimum.

Mastery tetap synchronous dalam transaction ADR-002. Analytics delivery failure tidak memblokir learner result. Notification/reminder dapat ditunda jika belum diperlukan U01 slice.

## 27. Observability

Metrics/logs minimum:

- outbox pending age/count by class;
- publish attempts/success/uncertain/terminal;
- provider accepted/deduplicated responses;
- delivery latency from occurred/created to consumer completion;
- signature failures;
- inbox duplicate/conflict/processing age;
- sequence gaps;
- handler success/retry/terminal;
- provider DLQ/failure callbacks;
- replay count/outcome;
- payload size rejected;
- queue/concurrency saturation.

Telemetry memakai event/outbox/correlation IDs dan safe codes, bukan raw body. Numeric SLO/alert threshold ditetapkan Operations Readiness Plan berdasarkan load model.

## 28. Testing Requirements

### Producer/outbox

- business commit + outbox atomicity;
- rollback at each write step;
- unique event/sequence;
- canonical payload/hash fixture;
- forbidden-field/privacy fixture;
- concurrent dispatcher claim and expired lease;
- timeout before/after provider acceptance;
- stable deduplication ID on republish.

### QStash adapter/security

- official SDK/REST contract fixture;
- current/next signing-key verification;
- invalid signature, wrong URL/audience, stale/replay, malformed body;
- explicit timeout/retry/dedup/label headers/options;
- provider `200/202`, `4xx`, `5xx`, timeout, and malformed response;
- environment/destination allowlist;
- secret/log redaction.

### Consumer/inbox

- crash before commit and after commit/before response;
- duplicate same hash returns receipt;
- same ID different hash conflicts;
- concurrent duplicate delivery;
- out-of-order/gap/lower sequence;
- unknown event/handler version;
- transient and terminal dependency failure;
- derived outbox atomicity;
- poison event durable rejection.

### Recovery

- provider retry exhaustion/DLQ;
- duplicate failure callback;
- provider log/DLQ unavailable;
- sweeper finds stuck/uncertain records;
- replay approval and exact payload;
- correction event supersedes original without mutation;
- QStash total outage with later recovery.

Integration tests use provider double. Staging smoke uses QStash test configuration and exact callback URLs/signing keys.

## 29. Failure Matrix

| Failure | Required behavior | Forbidden behavior |
|---|---|---|
| DB commit fails | No outbox or domain effect | Publish before commit |
| Publisher crashes after QStash accept | Retry same dedup ID; inbox protects effect | Mark event lost/duplicate effect |
| QStash unavailable | Outbox remains pending; bounded retry/alert | Drop event |
| Consumer returns timeout after commit | Redelivery returns inbox receipt | Apply effect twice |
| Invalid signature | No parse/effect; security signal | Trust forwarded header/body |
| Unknown event version | Durable reject/alert; no guessed handler | Process as nearest version |
| Aggregate gap | Hold/reconcile according handler | Advance silently |
| QStash DLQ expires | Internal ledger/runbook still recovers | Treat provider DLQ as archive |
| Analytics consumer down | Learner transaction remains successful | Roll back mastery/session |
| Payload contains prohibited data | Producer validation fails/quarantine | Send then rely on provider redaction |

## 30. Alternatives Considered

### 30.1 Publish directly after database commit without outbox

**Ditolak.** Crash between commit and publish loses event; request retry alone tidak cukup.

### 30.2 Publish before commit

**Ditolak.** Consumer dapat bertindak atas mutation yang kemudian rollback.

### 30.3 QStash sebagai authoritative job/event ledger

**Ditolak.** Provider log/DLQ retention dan lifecycle bukan business history Nekoru.

### 30.4 Exactly-once delivery claim

**Ditolak.** Network retry dan response uncertainty tetap memungkinkan duplicate; idempotent effects adalah model yang jujur.

### 30.5 Rely only on QStash deduplication

**Ditolak.** Window terbatas dan tidak mencakup consumer side effects/replay di luar window.

### 30.6 One global FIFO queue

**Ditolak sebagai default.** Menimbulkan head-of-line blocking dan menganggap total ordering yang tidak diperlukan. Queue digunakan per bounded workload bila evidence menunjukkan kebutuhan.

### 30.7 Poll database tables directly per consumer

**Ditolak untuk general integration.** Mengikat consumer ke private schema dan menghapus versioned event boundary.

## 31. Consequences

### Positive

- event intent tidak hilang setelah business commit;
- duplicate/replay aman;
- provider dapat diganti melalui adapter;
- QStash outage tidak menghapus business ledger;
- ordering and recovery eksplisit;
- learner correctness tidak bergantung pada analytics/notification;
- privacy/schema validation terjadi sebelum transport.

### Negative

- outbox/inbox tables, dispatcher, sweeper, dashboard, and runbook menambah complexity;
- delivery tetap eventual;
- storage bertambah dan membutuhkan retention policy;
- provider acceptance berbeda dari consumer completion;
- replay memerlukan operational discipline;
- strict ordering workload dapat tertahan saat gap;
- duplicate tetap terjadi di network walaupun effect dilindungi.

## 32. Revisit Triggers

ADR ditinjau jika:

- event volume/latency gagal memenuhi approved SLO;
- outbox database load menjadi bottleneck;
- module diekstrak menjadi service/database terpisah;
- QStash feature/limit/security model tidak memenuhi requirement;
- multi-region delivery diperkenalkan;
- workflow memerlukan durable multi-step orchestration/saga;
- retention/privacy policy melarang payload/storage pattern tertentu;
- repeated sequence gaps/replay incidents menunjukkan event design salah.

Provider replacement tidak otomatis mengubah domain outbox/inbox contract.

## 33. Acceptance Criteria

ADR dapat berstatus `Accepted` jika:

- [ ] PostgreSQL outbox/inbox ditetapkan sebagai ledger authority.
- [ ] At-least-once and effectively-once effect semantics disetujui.
- [ ] Event envelope/hash/version/classification disetujui.
- [ ] Producer, dispatcher, QStash adapter, and consumer transactions disetujui.
- [ ] Signature/raw-body/current-next-key verification disetujui.
- [ ] Retry, deduplication, ordering, DLQ, replay, and recovery rules disetujui.
- [ ] Payload privacy/destination allowlist disetujui.
- [ ] Milestone 1 scope and tests disetujui.
- [ ] Provider defaults tidak dipakai sebagai implicit production policy.

## 34. Open Implementation Details

| ID | Detail | Default sebelum diputuskan | Owner |
|---|---|---|---|
| `ADR004-OPEN-001` | Exact retry/delay/timeout per message class | Conservative explicit values in config; production requires load/failure evidence | Operations/Engineering |
| `ADR004-OPEN-002` | Dispatcher batch/poll/lease values | Small bounded batch and lease; tune from metrics | Engineering/Operations |
| `ADR004-OPEN-003` | Which workloads use QStash FIFO queues | None by default; add only for measured ordering/flow-control need | Engineering |
| `ADR004-OPEN-004` | Failure callback activation | Internal sweeper remains mandatory; callback only after secure staging validation | Operations/Security |
| `ADR004-OPEN-005` | Outbox/inbox retention duration | Policy key only; production blocked pending retention approval | Privacy/Legal/Operations |
| `ADR004-OPEN-006` | Numeric lag/DLQ alert thresholds | Defined in Operations Readiness Plan after traffic model | Operations/Product |
| `ADR004-OPEN-007` | Multi-step workflow engine need | Direct QStash only for single jobs; new ADR if durable workflow introduced | Engineering/Operations |

## 35. Decision Record

| Field | Nilai |
|---|---|
| ID | `ADR-004` |
| Decision | Gunakan transactional PostgreSQL outbox, idempotent inbox/effect receipts, canonical versioned events, dan QStash sebagai signature-verified at-least-once transport dengan bounded retry, dedup optimization, explicit ordering, DLQ signal, replay, dan internal recovery. |
| Status | `accepted` |
| Proposed at | 14 September 2026 |
| Accepted at | 14 September 2026 |
| Decision owners | Engineering Lead + Operations Lead |
| Required reviewers | Data, Security/Privacy, QA, Product, affected domain owners |
| Revisit trigger | SLO/scale failure, service extraction, provider incompatibility, multi-region, atau durable workflow requirement. |
| Supersedes | Tidak ada |
| Superseded by | Tidak ada |
