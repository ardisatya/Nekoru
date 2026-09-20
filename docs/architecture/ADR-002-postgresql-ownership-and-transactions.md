# ADR-002 — PostgreSQL Schema Ownership dan Cross-module Transaction Rules

**Status:** Accepted  
**Tanggal:** 14 September 2026  
**Decision owners:** Engineering Lead dan Data Lead  
**Required reviewers:** Product, Academic/Assessment, Security/Privacy, QA, dan Operations  
**Berlaku untuk:** Milestone 1 U01-L1 dan seluruh module yang memakai PostgreSQL  
**Supersedes:** Tidak ada  
**Superseded by:** Tidak ada  
**Accepted at:** 14 September 2026

## 1. Konteks

[ADR-001](./ADR-001-monorepo-and-modular-monolith.md) menetapkan modular monolith dengan PostgreSQL sebagai sumber kebenaran bisnis. Beberapa workflow inti Nekoru menyentuh lebih dari satu module:

- submit jawaban membuat Submission, EvaluationResult, EvidenceEvent, mastery state, PracticeRun revision, idempotency receipt, dan outbox;
- pembuatan session plan membaca snapshot learner, curriculum/content, mastery, scheduler policy, lalu menulis keputusan immutable;
- completion memfinalkan run, summary, next-plan invalidation, mastery/review, dan events;
- content publication mengubah approval, manifest, active version pointer, audit, dan outbox;
- role change mengubah grant serta memerlukan invalidation/audit;
- deletion, anonymization, legal hold, dan purge menyentuh banyak data owner.

Tanpa aturan kepemilikan dan transaksi yang eksplisit, modular monolith dapat berubah menjadi shared-database monolith: module membaca atau menulis tabel lain secara langsung, invariant tersebar, retry menggandakan efek, dan migration mematahkan consumer tanpa diketahui.

ADR ini menetapkan logical schema, table owner, unit of work, isolation/concurrency, idempotency, migration, role database, dan pola cross-module read/write.

## 2. Sumber Keputusan

- [ADR-001 — Monorepo dan Modular Monolith](./ADR-001-monorepo-and-modular-monolith.md)
- [Technical Architecture](../product-specs/technical-architecture.md)
- [Domain Model and Schemas](../product-specs/domain-model-and-schemas.md)
- [API and Event Contracts](../product-specs/api-and-event-contracts.md)
- [Learning Policy and Registry N5](../product-specs/learning-policy-and-registry-n5.md)
- [Security, Privacy, and Data Governance](../product-specs/security-privacy-data-governance.md)
- [Test and Quality Plan](../product-specs/test-and-quality-plan.md)
- [Definition of Done](../product-specs/definition-of-done.md)

## 3. Decision Drivers

1. Satu mutation learner tidak boleh menghasilkan partial academic outcome.
2. Retry tidak boleh menggandakan attempt, evidence, mastery, XP, publication, atau role change.
3. Module harus mempunyai authority dan migration owner yang jelas.
4. Cross-module workflow harus tetap dapat diaudit dan diuji.
5. Concurrency tidak boleh diselesaikan dengan last-write-wins untuk state penting.
6. Database role dan grants menjadi defense-in-depth, bukan pengganti authorization aplikasi.
7. Schema harus berevolusi tanpa destructive big-bang migration.
8. Struktur awal harus dapat diekstrak menjadi service jika bukti operasional menuntutnya.
9. Retention/legal-hold yang belum disetujui tidak boleh disamarkan dengan TTL default.

## 4. Keputusan Ringkas

Nekoru menggunakan satu logical PostgreSQL database pada MVP dengan **schema per ownership boundary**. Setiap table mempunyai satu module owner. Cross-module mutation hanya dilakukan oleh application-level use case yang memanggil public write capability dari owner terkait dalam satu Unit of Work, atau melalui event berversi ketika atomicity tidak diperlukan.

Ketentuan utama:

- default isolation level adalah `READ COMMITTED`;
- aggregate mutable memakai integer `revision` dan optimistic concurrency;
- uniqueness/invariant yang dapat dinyatakan di database wajib memakai constraint;
- row lock hanya dipakai untuk critical serialized transition yang terdokumentasi;
- Milestone 1 objective submission memperbarui Practice, Evidence, dan Mastery secara sinkron dalam satu transaksi;
- idempotency receipt dan outbox ditulis dalam transaksi yang sama dengan business mutation;
- direct cross-module table write/read sebagai shortcut dilarang;
- migration bersifat ordered, immutable setelah diterapkan, serta mengikuti expand–migrate–contract;
- destructive migration memerlukan ADR, backup/restore evidence, dan compatibility plan.

## 5. Logical PostgreSQL Schemas

| Schema | Module owner | Contoh data | Milestone 1 |
|---|---|---|---|
| `identity` | Identity & Access | users, external identities, role assignments, grants | Aktif |
| `learner` | Learner Profile | profiles, goals, availability, preferences, guest-migration receipts | Aktif |
| `curriculum` | Curriculum & Content | releases, stages, units, lessons, KCs, prerequisites | Aktif untuk U01 seed |
| `content` | Curriculum & Content / Asset | artifacts, versions, manifests, assets, rights refs | Aktif untuk approved bundle metadata |
| `practice` | Practice | runs, instances, submissions, evaluations, feedback release | Aktif |
| `learning` | Learning & Mastery | plans, session plans, evidence, KC states, review decisions | Aktif |
| `assessment` | Assessment | blueprints, forms, runs, responses, results, reviews | Reserved; belum aktif M1 |
| `content_ops` | Content Operations | review, findings, approval, waiver, issue, quarantine | Reserved/manifest bridge M1 |
| `platform` | Platform | idempotency, outbox, inbox, job receipts | Aktif minimum |
| `audit` | Audit | immutable audit records and authorized indexes | Aktif minimum |
| `analytics` | Analytics projection boundary | allowlisted product/learning projection | Bukan source of truth; sink boleh eksternal |
| `offline_sync` | Offline Sync | package grants, receipts, conflicts | Reserved; belum aktif M1 |

Schema name adalah namespace ownership, bukan public API. Module lain tidak memperoleh hak akses hanya karena berada dalam database yang sama.

## 6. Table Ownership Rules

1. Setiap table/view/function/trigger mempunyai satu owner module dan owner code path.
2. Hanya migration owner yang mengubah struktur object tersebut.
3. Hanya repository/write capability owner yang melakukan `INSERT`, `UPDATE`, atau `DELETE`.
4. Module lain tidak mengimpor repository internal owner.
5. Foreign key lintas schema boleh digunakan untuk referential integrity jika lifecycle dan deployment compatibility telah dianalisis.
6. Foreign key tidak memberi izin cross-module mutation.
7. Cross-module read memakai public query capability, transaction snapshot service, atau approved read model.
8. Shared table tanpa owner dilarang.
9. JSON column tidak dipakai untuk menyembunyikan schema atau melewati migration/versioning.
10. Database trigger hanya untuk local integrity/audit metadata yang tidak menggantikan domain decision.

## 7. Canonical Aggregate Ownership

| Aggregate/record | Owner | Writer | Reader melalui |
|---|---|---|---|
| User/provider mapping | Identity | Identity repository | Identity query/capability |
| LearnerProfile/Goal | Learner Profile | Learner repository | Profile snapshot |
| CurriculumRelease/KC | Curriculum & Content | Content publication path | Exact-version content query |
| ContentVersion/Manifest | Content | Content publication path | Manifest/content resolver |
| PracticeRun/Submission/Evaluation | Practice | Practice command | Practice query/event |
| EvidenceEvent | Learning | Evidence recorder | Evidence query/event |
| LearnerKCState | Mastery within Learning | Mastery recalculation capability | Mastery query |
| SessionPlan/DecisionRecord | Learning/Scheduling | Plan command | Plan query |
| IdempotencyRecord | Platform | Unit-of-work helper | Receipt query |
| OutboxEvent/InboxReceipt | Platform | Originating transaction/consumer | Dispatcher/reconciliation |
| AuditEvent | Audit | Authorized append capability | Authorized audit query |

## 8. Unit of Work Contract

Application layer menyediakan Unit of Work yang:

- membuka satu database transaction dan connection;
- membawa actor, correlation, causation, request, dan trace context;
- menyediakan module capabilities yang bound ke transaction yang sama;
- melarang nested transaction tersembunyi;
- commit sekali setelah seluruh invariant dan writes berhasil;
- rollback seluruh writes bila satu step gagal;
- tidak menjalankan external network call di dalam transaction kecuali ada alasan yang disetujui secara khusus;
- menulis idempotency receipt dan outbox sebelum commit;
- menghasilkan canonical result dari committed data.

Conceptual interface:

```ts
type TransactionContext = {
  transactionId: string;
  actor: ActorContext;
  correlationId: string;
  causationId?: string;
  clock: Clock;
};

interface UnitOfWork {
  execute<T>(
    operation: (ctx: TransactionContext) => Promise<T>,
    options?: TransactionOptions,
  ): Promise<T>;
}
```

Transaction object concrete tidak boleh bocor ke domain entity atau HTTP response.

## 9. Cross-module Write Rule

Cross-module write diperbolehkan hanya jika salah satu pola berikut digunakan.

### 9.1 Atomic application orchestration

Digunakan ketika user-visible outcome atau invariant harus all-or-nothing.

```text
Application use case
  -> owner capability A
  -> owner capability B
  -> platform idempotency/outbox
  -> single commit
```

Orchestrator menentukan urutan, tetapi setiap module owner tetap memvalidasi invariant dan membuat record miliknya.

### 9.2 Versioned asynchronous event

Digunakan untuk:

- analytics projection;
- notifications;
- cache invalidation;
- noncritical derived read model;
- background asset warming;
- workflow yang secara eksplisit menerima eventual consistency.

Originating module commit business state dan outbox secara atomik. Consumer memakai inbox/idempotency dan tidak mengubah state owner lain secara langsung.

### 9.3 Explicit saga/process manager

Belum diperlukan pada Milestone 1. Jika workflow melibatkan provider/network dan tidak dapat berada dalam satu transaction, process manager harus mempunyai state, compensation, retry, timeout, audit, dan terminal outcome eksplisit. Pengenalan saga material memerlukan ADR baru atau amendemen.

## 10. Cross-module Read Rule

Urutan preferensi:

1. public query capability milik owner;
2. immutable snapshot/reference yang sudah dikunci ke VersionSet;
3. approved read model/projection untuk UI/reporting;
4. database view milik satu module dengan contract dan migration owner.

Dilarang:

- SQL join lintas private tables dari route/service lain untuk mengambil keputusan domain;
- membaca analytics projection sebagai mastery/evidence authority;
- membaca “latest” content/policy ketika session telah mengunci exact version;
- mengandalkan cached value untuk authorization atau academic correctness;
- membuat shared query helper yang menghapus ownership.

## 11. Isolation dan Concurrency

### 11.1 Default isolation

`READ COMMITTED` digunakan sebagai default karena:

- transaction dibuat singkat;
- optimistic revision dan constraints melindungi aggregate;
- explicit locks digunakan pada transition tertentu;
- lebih mudah dioperasikan daripada serializable-by-default.

Isolation yang lebih kuat dipilih per use case setelah anomaly dianalisis dan diuji.

### 11.2 Optimistic concurrency

Aggregate mutable:

- mempunyai `revision integer NOT NULL` mulai dari `1`;
- command membawa `expectedRevision`;
- update menggunakan condition `id = ? AND revision = expectedRevision`;
- successful mutation menaikkan revision tepat satu;
- zero updated rows menghasilkan `STALE_REVISION`/HTTP `409` dengan safe recovery metadata;
- retry harus membaca canonical state dan mengulang decision, bukan memaksa write.

Last-write-wins dilarang untuk run, plan, mastery, publication, role/grant, assessment, deletion, legal hold, dan evidence-impacting preference.

### 11.3 Pessimistic row locking

`SELECT ... FOR UPDATE` atau equivalent hanya digunakan untuk:

- finalisasi run yang bersaing;
- single active assessment/device lease pada milestone terkait;
- content active-pointer publication/quarantine transition;
- serialized role/grant transition jika unique/revision saja tidak cukup;
- purge/legal-hold state transition.

Lock order harus konsisten dan didokumentasikan. External call, file processing, dan user wait tidak dilakukan saat lock dipegang.

### 11.4 Serializable transaction

Tidak menjadi default. Dapat digunakan untuk use case kecil dengan predicate anomaly yang tidak aman diselesaikan oleh constraint/revision/lock. Implementasi wajib:

- mendokumentasikan alasan;
- menangani serialization failure dengan bounded retry;
- memakai deterministic command;
- mengukur contention;
- menambahkan concurrency test.

## 12. Milestone 1 Objective Submission Transaction

Keputusan untuk Milestone 1:

```text
1. Resolve authenticated learner and authorization
2. Claim/check idempotency key and request fingerprint
3. Lock/read PracticeRun and validate expected revision/state
4. Resolve immutable ActivityInstance and exact VersionSet
5. Validate and persist Submission
6. Run deterministic objective evaluator
7. Persist immutable EvaluationResult
8. Create eligible EvidenceEvent or explicit no-evidence reason
9. Recalculate affected LearnerKCState synchronously
10. Update PracticeRun revision/current state
11. Persist DecisionRecord/calculation hash where applicable
12. Write outbox events
13. Complete idempotency receipt with canonical response reference
14. Commit
```

Jika step 1–13 gagal, seluruh mutation rollback. Technical failure tidak disimpan sebagai incorrect evaluation. Jika technical incident perlu dicatat setelah rollback, ia menggunakan safe operational path dengan correlation reference dan tanpa menciptakan academic outcome.

### 12.1 Alasan mastery sinkron pada Milestone 1

- learner langsung melihat state canonical setelah submit;
- scale awal tidak membutuhkan async projection untuk correctness path;
- U01 objective evaluator dan affected KC set kecil;
- transaction menghindari state “jawaban diterima tetapi mastery belum jelas” pada baseline;
- test dan audit lebih sederhana.

Mastery dapat dipindahkan ke idempotent event consumer hanya melalui ADR/amendemen yang mendefinisikan pending state, read-your-writes UX, replay, ordering, reconciliation, SLO, dan rollback.

## 13. Session Plan Transaction

Dalam satu transaction:

1. baca exact learner/profile/goal revision;
2. baca active curriculum/content/policy versions;
3. baca canonical mastery/review state;
4. freeze controlled clock, budget, and stable tie-breaker;
5. compute deterministic plan;
6. persist immutable SessionPlan dan DecisionRecord;
7. update LearningPlan revision/pointer bila diperlukan;
8. write outbox and idempotency receipt;
9. commit.

Plan menyimpan input references sehingga hasil dapat direproduksi. Perubahan data setelah commit tidak mengubah plan yang telah dikunci.

## 14. Session Completion Transaction

Dalam satu transaction:

- check idempotency dan expected run revision;
- verify all required terminal item states;
- finalize PracticeRun exactly once;
- compute completion/meaningful-learning summary;
- update affected mastery/review state bila belum dilakukan;
- mark next-plan invalidation/replan requirement;
- write immutable completion record, decision hash, audit/outbox;
- complete receipt and commit.

Completion retry mengembalikan summary committed sebelumnya.

## 15. Content Publication dan Quarantine

Saat Content Operations aktif:

### Publication atomic set

- approved version and required gate results;
- immutable manifest record and checksum;
- active release/version pointer;
- publication audit record;
- outbox for cache invalidation/warming.

### Quarantine atomic set

- affected version/manifest state;
- reason, scope, actor, and revision;
- replacement/fallback pointer bila approved;
- audit and outbox.

Asset upload/validation terjadi sebelum publication transaction. Network call ke R2 tidak ditempatkan di transaction; database hanya mengaktifkan asset yang checksum dan metadata-nya sudah tervalidasi.

## 16. Idempotency di Database

Idempotency record minimum:

| Field | Tujuan |
|---|---|
| scope/actor/operation/key | Uniqueness boundary |
| request fingerprint | Mendeteksi key yang dipakai untuk payload berbeda |
| state | `processing`, `completed`, `failed_retryable`, `failed_terminal` |
| canonical result reference | Mengembalikan hasil committed sebelumnya |
| response contract version | Reconstruct safe response |
| created/updated/completed at | Operability and retention anchor |
| retention policy key | Tidak memakai TTL asumtif |

Constraint unik berada pada `(scope, actor_id, operation, idempotency_key)`. Record `completed` dan business mutation commit bersama. Concurrent claimant tidak boleh menjalankan side effect kedua.

Exact wait/replay behavior dan request hashing mengikuti API contract serta ADR-003.

## 17. Outbox dan Inbox

ADR ini menetapkan ownership/atomicity; delivery detail berada di ADR-004.

- `platform.outbox_events` ditulis oleh originating transaction;
- payload hanya berisi versioned event contract dan allowed data;
- business table tidak ditandai published sebelum dispatcher benar-benar mengirim; status delivery berada pada outbox record;
- dispatcher tidak mengubah origin domain decision;
- `platform.inbox_receipts` memiliki unique producer/message/handler boundary;
- duplicate event mengembalikan effect receipt sebelumnya;
- failed handler tidak menghapus original event/receipt history;
- analytics failure tidak rollback learner outcome setelah commit.

## 18. Constraint Strategy

Database constraint wajib untuk invariant lokal yang stabil:

- primary key dan typed-ID storage shape;
- required foreign key;
- uniqueness identity provider subject;
- one canonical idempotency claim;
- nonnegative attempt/revision/sequence;
- valid local state enum/check jika compatible rollout memungkinkan;
- one active pointer melalui unique partial index bila sesuai;
- immutable version identity;
- range/check untuk score domain yang stabil;
- referential protection bagi evidence/version reference.

Invariant yang memerlukan policy version atau multi-record academic reasoning tetap di domain/application, tetapi database menyimpan inputs, decision record, dan hash untuk audit.

## 19. Foreign Key Policy

Foreign key lintas schema diizinkan jika:

- reference lifecycle jelas;
- parent tidak dihapus fisik tanpa retention/deletion workflow;
- migration dapat dideploy kompatibel;
- coupling diterima oleh both owners;
- future extraction cost dicatat.

Gunakan typed reference tanpa FK hanya jika external/extractable boundary benar-benar memerlukan, kemudian wajib ada validation/reconciliation job. Menghapus FK hanya karena migration lebih mudah tidak diterima.

Default delete action adalah `RESTRICT`/`NO ACTION`. Cascade delete dilarang untuk evidence, audit, result, publication, identity, atau learner history kecuali deletion ADR/policy secara eksplisit menyetujuinya.

## 20. Database Roles dan Grants

Minimum conceptual roles:

| Role | Hak |
|---|---|
| `migration_owner` | DDL melalui controlled migration pipeline; bukan runtime |
| `api_runtime` | Required DML/functions untuk learner/internal API scope |
| `worker_runtime` | Outbox/inbox/job and explicitly required module capabilities |
| `ops_readonly` | Authorized operational read, redacted where required |
| `analytics_reader` | Approved projections only; no raw response/answer key |
| `backup_restore_operator` | Controlled backup/restore path, audited |

Ketentuan:

- browser tidak pernah terhubung langsung ke database;
- application authorization tetap wajib;
- runtime role tidak mempunyai DDL;
- grants menggunakan least privilege;
- row-level security dapat menjadi defense-in-depth, tetapi bukan pengganti module repository/authz;
- credentials dipisah per environment dan runtime unit;
- production manual write memerlukan break-glass process dan audit.

## 21. Migration Strategy

### 21.1 Rules

1. Migration mempunyai global ordered ID dan owning module.
2. File migration immutable setelah diterapkan ke shared environment.
3. Perubahan memakai expand–migrate–contract.
4. Application lama dan baru harus kompatibel selama rollout window.
5. Backfill besar berjalan bounded, resumable, observable, dan idempotent.
6. Index/constraint berisiko lock direncanakan dengan production-safe method.
7. Data correction memakai audited repair command/migration, bukan SQL manual tanpa record.
8. Destructive/drop/irreversible migration memerlukan ADR dan restore evidence.
9. Rollback aplikasi tidak bergantung pada down migration destruktif.
10. Schema drift diverifikasi di CI dan deployment.

### 21.2 Suggested layout

```text
packages/persistence/
├── migrations/
│   ├── 000001_identity_bootstrap.sql
│   ├── 000002_learner_profile.sql
│   ├── 000003_content_u01.sql
│   └── ...
├── repositories/
│   ├── identity/
│   ├── learner/
│   ├── practice/
│   └── learning/
└── schema-contract/
```

Tool/ORM dapat berbeda, tetapi ordered ownership, SQL reviewability, and compatibility rules tetap berlaku.

## 22. Retention, Deletion, dan Legal Hold

- setiap applicable table/record mempunyai `retention_policy_key` atau klasifikasi yang memetakan ke policy;
- exact duration tidak ditetapkan oleh migration default;
- purge hanya melalui stateful, idempotent, audited workflow;
- legal hold menghentikan purge pada scope terkait tanpa memberi read access baru;
- anonymization menjaga referential/audit integrity sesuai approved policy;
- backup/provider copy masuk deletion/reconciliation policy;
- production release tetap blocked sampai retention schedule dan legal approval selesai.

Detail retention/deletion/backup berada pada ADR-010 dan governance document.

## 23. Observability dan Audit

Transaction/application metrics minimum:

- operation name dan module owner;
- success/rollback/conflict/deadlock/serialization retry;
- latency dan rows affected tanpa raw learner answer;
- idempotency hit/conflict/in-progress;
- outbox count/lag;
- stale revision count;
- connection pool saturation;
- slow query fingerprint yang direduksi;
- migration/backfill progress.

Database log, trace, dan error reporting tidak boleh memuat token, raw response, hidden answer/rubric, email, atau sensitive accessibility detail.

## 24. Failure Behavior

| Failure | Wajib | Dilarang |
|---|---|---|
| Constraint violation expected | Map ke stable domain/problem code | Expose SQL/internal schema |
| Stale revision | Rollback dan return `STALE_REVISION` | Force overwrite |
| Deadlock/serialization failure | Bounded retry only for deterministic idempotent command | Infinite retry |
| Connection/database unavailable | No success receipt; safe retry status | Assume write succeeded |
| Commit uncertainty | Reconcile via idempotency/canonical query | Re-run unguarded mutation |
| Outbox dispatcher down | Business commit remains; alert/retry outbox | Roll back committed learner outcome |
| Partial external provider failure | Persist process state outside transaction where applicable | Hold DB lock during provider retry |
| Migration failure | Stop rollout, inspect, use compatible recovery | Continue with unknown schema |

## 25. Testing Requirements

Minimum automated evidence:

- schema ownership/forbidden repository import tests;
- database grants smoke tests;
- primary/foreign/unique/check constraint tests;
- optimistic revision conflict tests;
- concurrent duplicate submission tests;
- transaction rollback at every objective-submission step;
- synchronous mastery update and canonical response tests;
- idempotency same-key/same-payload and same-key/different-payload tests;
- outbox atomicity and inbox duplicate tests;
- row-lock concurrency and lock-order tests where used;
- migration on empty and representative populated database;
- old/new application compatibility during expand–contract;
- legal-hold prevents purge fixture;
- log/trace redaction assertions;
- database outage/commit uncertainty recovery tests.

Mock database tidak cukup untuk constraint, transaction, isolation, lock, migration, atau SQL behavior. CI memakai ephemeral PostgreSQL dengan supported production major.

## 26. Alternatives Considered

### 26.1 Satu `public` schema tanpa ownership

**Ditolak.** Mudah untuk awal tetapi tidak memberi namespace, grant, migration owner, atau extraction boundary yang jelas.

### 26.2 Database per module sejak Milestone 1

**Ditolak.** Membuat objective submission dan publication menjadi distributed workflow, menambah failure mode tanpa scale/compliance evidence.

### 26.3 Event-only cross-module communication

**Ditolak untuk invariant sinkron.** Event tepat untuk side effect/projection, tetapi learner outcome inti membutuhkan atomicity/read-your-writes baseline.

### 26.4 Serializable untuk semua transaksi

**Ditolak.** Menambah contention/retry dan tidak menggantikan idempotency, constraints, atau clear aggregate ownership.

### 26.5 Direct SQL cross-module reads sebagai convenience

**Ditolak.** Mengunci implementation schema, menyebarkan domain assumptions, dan menyulitkan migration/extraction.

### 26.6 Asynchronous mastery sejak awal

**Ditolak untuk Milestone 1.** Memerlukan pending UX, ordering, reconciliation, dan SLO tambahan tanpa kebutuhan scale yang terbukti.

## 27. Consequences

### Positive

- learner outcome inti atomik dan langsung terbaca;
- authority/migration ownership jelas;
- retry/concurrency mempunyai behavior konsisten;
- async side effects tidak memperpanjang transaction;
- extraction path tersedia melalui capability/event boundary;
- database grants dapat mengikuti runtime responsibility;
- failure dapat direproduksi lewat idempotency dan decision records.

### Negative

- objective submission menyentuh beberapa schema dalam satu transaction;
- synchronous mastery menambah latency dan coupling awal;
- schema-per-module memerlukan migration/grant discipline;
- developer tidak bebas melakukan arbitrary join/write;
- expand–contract memerlukan temporary columns/code paths;
- test setup PostgreSQL lebih berat daripada mocks.

Trade-off diterima karena correctness dan auditability adalah prioritas tertinggi Milestone 1.

## 28. Revisit Triggers

Keputusan ditinjau ulang jika:

- objective submission p95/lock contention gagal memenuhi approved SLO;
- mastery calculation menjadi terlalu berat untuk transaction setelah profiling;
- module diekstrak menjadi service/database terpisah;
- compliance memerlukan stronger physical isolation;
- multi-region/write topology diperkenalkan;
- provider PostgreSQL membatasi schema/grant/transaction requirement;
- offline sync atau assessment menghasilkan concurrency model baru;
- recurring deadlock/anomaly menunjukkan boundary salah.

Perubahan synchronous→asynchronous mastery wajib mendefinisikan pending state, replay/order, read-your-writes, reconciliation, observability, dan migration.

## 29. Acceptance Criteria

ADR dapat berstatus `Accepted` jika:

- [ ] Logical schema dan owner map disetujui.
- [ ] Cross-module read/write rules disetujui.
- [ ] `READ COMMITTED` + revision/constraint/explicit-lock strategy disetujui.
- [ ] Objective submission synchronous mastery boundary disetujui.
- [ ] Unit of Work dan external-call prohibition disetujui.
- [ ] Idempotency/outbox atomicity disetujui.
- [ ] Migration, grants, retention, dan failure rules disetujui.
- [ ] Test requirements dapat dieksekusi pada ephemeral PostgreSQL.
- [ ] Open implementation details tidak mengubah invariant ADR.

## 30. Open Implementation Details

| ID | Detail | Default sebelum diputuskan | Owner |
|---|---|---|---|
| `ADR002-OPEN-001` | ORM/query builder | Repository dan explicit transaction contract; pilih saat bootstrap | Engineering/Data |
| `ADR002-OPEN-002` | Production PostgreSQL major | Kunci supported major sebelum migration pertama | Operations/Engineering |
| `ADR002-OPEN-003` | Exact connection-pool sizes/timeouts | Conservative config; production blocked sampai load/SLO evidence | Operations |
| `ADR002-OPEN-004` | RLS scope | Backend authz authority; evaluate RLS as defense-in-depth for high-risk data | Security/Data |
| `ADR002-OPEN-005` | Physical partitioning evidence/audit | Tunda sampai volume/retention evidence tersedia | Data/Operations |
| `ADR002-OPEN-006` | Mastery async extraction threshold | Tetap synchronous; revisit hanya melalui measured trigger | Engineering/Product |

## 31. Decision Record

| Field | Nilai |
|---|---|
| ID | `ADR-002` |
| Decision | Satu PostgreSQL database dengan logical schema/table ownership, application Unit of Work, `READ COMMITTED` plus optimistic revision/constraints/explicit locks, atomic idempotency/outbox, dan synchronous Practice→Evidence→Mastery transaction pada Milestone 1. |
| Status | `accepted` |
| Proposed at | 14 September 2026 |
| Accepted at | 14 September 2026 |
| Decision owners | Engineering Lead + Data Lead |
| Required reviewers | Product, Academic/Assessment, Security/Privacy, QA, Operations |
| Revisit trigger | Measured contention/SLO failure, compliance isolation, service extraction, atau new concurrency model. |
| Supersedes | Tidak ada |
| Superseded by | Tidak ada |
