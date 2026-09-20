# ADR-003 — Canonical JSON, VersionSet, Prefixed ULID, dan Decision Hash

**Status:** Accepted  
**Tanggal:** 14 September 2026  
**Decision owners:** Engineering Lead dan Data Lead  
**Required reviewers:** Academic/Assessment, Content, Security/Privacy, QA, dan Operations  
**Berlaku untuk:** Seluruh ID, version reference, manifest, decision, event, idempotency fingerprint, dan audit reference  
**Supersedes:** Tidak ada  
**Superseded by:** Tidak ada  
**Accepted at:** 14 September 2026

## 1. Konteks

Nekoru harus dapat membuktikan bahwa input dan versi yang sama menghasilkan evaluation, evidence, mastery, scheduling, readiness, assessment, publication, dan receipt yang sama. Dokumen domain dan arsitektur telah mewajibkan:

- identifier bertipe dan sortable;
- exact version reference;
- `VersionSet` pada session dan keputusan;
- hash untuk manifest, keputusan, event, serta request fingerprint;
- immutable correction chain;
- deterministic fixtures lintas-runtime.

Istilah “JSON terurut” tidak cukup sebagai kontrak. Hash dapat berbeda karena urutan key, Unicode, angka floating point, timestamp, `null` versus field hilang, default schema, atau metadata nondeterministik. Prefix ID juga telah tidak konsisten pada dokumen awal, misalnya `prn_` versus `prun_` dan `arn_` versus `arun_`.

ADR ini menetapkan representasi kanonik tunggal dan menyelesaikan inkonsistensi tersebut.

## 2. Sumber Keputusan

- [Domain Model and Schemas](../product-specs/domain-model-and-schemas.md)
- [Technical Architecture](../product-specs/technical-architecture.md)
- [API and Event Contracts](../product-specs/api-and-event-contracts.md)
- [Learning Policy and Registry N5](../product-specs/learning-policy-and-registry-n5.md)
- [Security, Privacy, and Data Governance](../product-specs/security-privacy-data-governance.md)
- [Test and Quality Plan](../product-specs/test-and-quality-plan.md)
- [ADR-001 — Monorepo dan Modular Monolith](./ADR-001-monorepo-and-modular-monolith.md)
- [ADR-002 — PostgreSQL Ownership dan Transactions](./ADR-002-postgresql-ownership-and-transactions.md)
- [RFC 8785 — JSON Canonicalization Scheme](https://datatracker.ietf.org/doc/html/rfc8785)
- [Canonical ULID Specification](https://github.com/ulid/spec)

## 3. Decision Drivers

1. Keputusan akademik dapat direproduksi dan diaudit.
2. Hash identik pada TypeScript, database tooling, content build, dan future runtime lain.
3. Runtime menolak version yang hilang, incompatible, atau diganti “latest”.
4. Identifier mudah didiagnosis tanpa membawa makna akademik/PII.
5. Request/event duplicate dapat dibedakan dari payload berbeda.
6. Signature/hash tidak bergantung pada object insertion order.
7. Raw learner response tetap utuh, sementara normalized response eksplisit.
8. Format mendukung migration dan algorithm agility tanpa silent reinterpretation.
9. Manifest dan decision tidak memasukkan field nondeterministik.

## 4. Keputusan Ringkas

Nekoru menetapkan:

- ID internal memakai lowercase type prefix, underscore, dan 26-character uppercase canonical ULID;
- JSON yang di-hash memakai **RFC 8785 JSON Canonicalization Scheme (JCS)** setelah lolos schema-specific normalization;
- hash memakai SHA-256 atas byte UTF-8 canonical JSON dan ditulis `sha256:<64 lowercase hex>`;
- `VersionRef` selalu berisi exact `id`, positive integer `version`, dan artifact hash;
- `VersionSet v1` menggunakan key snake_case dan exact references untuk curriculum, content pack, policy terpisah, evaluator, schema, serta optional assessment blueprint;
- angka akademik yang masuk hash menggunakan scaled integer, bukan binary floating point;
- timestamp yang memengaruhi keputusan masuk sebagai normalized UTC millisecond timestamp; timestamp pencatatan nondeterministik dikeluarkan;
- self-hash, signature, delivery attempt, trace, display metadata, dan generated record ID tidak masuk payload hash kecuali kontrak hash secara eksplisit menyatakannya;
- setiap hash memiliki `hash_contract`/schema version agar perubahan field tidak reinterpretasi hash lama.

## 5. Prefixed ULID Contract

### 5.1 Format

```text
<prefix>_<ULID>
```

Canonical requirements:

- prefix lowercase ASCII;
- prefix berasal dari registry dokumen ini;
- separator satu underscore;
- ULID tepat 26 uppercase Crockford Base32 characters;
- huruf `I`, `L`, `O`, dan `U` tidak valid;
- keseluruhan ID case-sensitive pada Nekoru walaupun ULID specification dapat menerima case-insensitive input;
- boundary hanya menerima canonical uppercase payload; input lowercase tidak dinormalisasi diam-diam;
- timestamp ULID tidak menggantikan `created_at`/`occurred_at`;
- ID tidak dipakai untuk authorization atau chronology authority.

Regex canonical:

```regex
^[a-z][a-z0-9]{1,9}_[0-9A-HJKMNP-TV-Z]{26}$
```

Validator juga harus memverifikasi prefix registry dan overflow timestamp ULID, bukan hanya regex.

### 5.2 Generation

- ID authoritative dibuat server-side;
- generator memakai cryptographically secure randomness;
- monotonic factory digunakan dalam process untuk multiple IDs pada millisecond yang sama;
- collision ditangani oleh database unique constraint dan bounded regeneration sebelum transaction side effect;
- client-generated ID hanya untuk protocol offline yang disetujui ADR-008;
- test memakai deterministic ID factory, tidak memakai generator production/random global;
- imported legacy ID disimpan pada typed external-reference field, bukan dipaksa menjadi ULID internal.

### 5.3 Prefix registry v1

| Entity | Prefix | Catatan |
|---|---|---|
| User | `usr_` | Internal account identity |
| External identity | `xid_` | Provider mapping record; provider subject tetap field terpisah |
| Learner profile | `lrn_` | Learner domain identity |
| Goal | `gol_` | Learning goal |
| Curriculum release | `cur_` | Exact curriculum release |
| Knowledge component | `kc_` | Stable selama meaning tidak berubah |
| Content artifact | `cnt_` | Logical identity |
| Content version | `cnv_` | Immutable version record |
| Content pack | `cpk_` | Immutable manifest/package |
| Asset | `ast_` | Logical/immutable asset record sesuai schema |
| Policy artifact | `pol_` | Learning, mastery, practice, scheduler, readiness, atau policy package lain |
| Evaluator release | `evr_` | Versioned deterministic evaluator contract/implementation identity |
| Schema release | `sch_` | Versioned executable contract/schema package bila direferensikan |
| Learning plan | `lpl_` | Mutable aggregate with revision |
| Session plan | `spl_` | Immutable once locked |
| Practice run | `prun_` | Canonical; menggantikan penulisan awal `prn_` |
| Activity instance | `ain_` | Resolved immutable runtime instance |
| Submission | `sub_` | Learner response submission |
| Evaluation result | `evl_` | Immutable result/correction chain |
| Evidence event | `evd_` | Immutable learning evidence |
| Mastery state | `mty_` | Mutable/rebuildable projection |
| Decision record | `dec_` | Deterministic decision envelope |
| Assessment blueprint | `abp_` | Versioned blueprint |
| Assessment form | `afm_` | Exact locked form |
| Assessment run | `arun_` | Canonical; menggantikan penulisan awal `arn_` |
| Review | `rev_` | Content review |
| Approval | `app_` | Approval decision |
| Issue/finding | `iss_` | Quality/content issue |
| Idempotency record | `idem_` | Scoped mutation receipt |
| Outbox record | `obx_` | Delivery ledger row |
| Inbox receipt | `ibx_` | Consumer dedupe/effect receipt |
| Domain/integration event | `evt_` | Event envelope ID |
| Job receipt | `job_` | Scheduled/async execution receipt |
| Audit event | `aud_` | Immutable audit record |
| Correlation | `cor_` | Request/workflow correlation, not domain entity |

Prefix baru memerlukan registry change, schema fixture, collision check, dan owner. Prefix tidak boleh berarti status, unit, level, date, locale, atau tenant.

## 6. Identifier Storage dan Exposure

- PostgreSQL menyimpan full prefixed ID sebagai ASCII text dengan binary/C-style comparison atau equivalent deterministic collation;
- maximum column length cukup untuk registered prefixes tetapi validator tetap authority;
- API dan event memakai full ID, bukan numeric surrogate yang berubah antar-environment;
- public URL boleh memuat opaque ID jika authorization tetap resource-based;
- log boleh memuat correlation/event/record ID sesuai classification, bukan raw learner data;
- UI learner tidak menampilkan internal ID kecuali support flow yang aman;
- sort bisnis memakai explicit timestamp/order, bukan hanya lexical ULID order;
- cursor pagination menyertakan explicit stable ordering fields and tie-break ID.

## 7. VersionRef v1

Canonical JSON schema shape:

```json
{
  "hash": "sha256:<64-lowercase-hex>",
  "id": "<registered-prefixed-ulid>",
  "version": 1
}
```

Semantics:

- `id` menunjuk logical versioned subject/release/package;
- `version` adalah positive integer, dimulai dari `1`, monoton per `id`, tanpa reuse;
- `hash` menunjuk canonical artifact body untuk exact version;
- ketiganya wajib cocok;
- version yang sama dengan hash berbeda adalah integrity incident, bukan normal update;
- content change substantif membuat version baru;
- hash baru tidak boleh dipasang pada version lama;
- unavailable historical artifact tidak diganti dengan version terdekat.

Jika suatu entity menggunakan immutable version record ID terpisah seperti `cnv_`, VersionRef tetap membawa logical/record ID sesuai schema pemilik yang telah ditetapkan. Satu artifact type tidak boleh berganti semantics ID di tengah history.

## 8. VersionSet v1

### 8.1 Canonical shape

```json
{
  "assessment_blueprint": null,
  "content_pack": {
    "hash": "sha256:<64-lowercase-hex>",
    "id": "cpk_<ULID>",
    "version": 1
  },
  "curriculum": {
    "hash": "sha256:<64-lowercase-hex>",
    "id": "cur_<ULID>",
    "version": 1
  },
  "evaluator": {
    "hash": "sha256:<64-lowercase-hex>",
    "id": "evr_<ULID>",
    "version": 1
  },
  "learning_policy": {
    "hash": "sha256:<64-lowercase-hex>",
    "id": "pol_<ULID>",
    "version": 1
  },
  "mastery_policy": {
    "hash": "sha256:<64-lowercase-hex>",
    "id": "pol_<ULID>",
    "version": 1
  },
  "practice_policy": {
    "hash": "sha256:<64-lowercase-hex>",
    "id": "pol_<ULID>",
    "version": 1
  },
  "schema_version": 1
}
```

Policy memakai namespace `pol_`, evaluator memakai `evr_`, dan executable schema release yang perlu direferensikan memakai `sch_`. Placeholder literal `TBD` tidak valid dalam runtime VersionSet.

### 8.2 Required fields

Milestone 1 membutuhkan:

- `schema_version`;
- `curriculum`;
- `content_pack`;
- `learning_policy`;
- `mastery_policy`;
- `practice_policy`;
- `evaluator`;
- `assessment_blueprint: null`.

`null` berarti dimension dikenal tetapi tidak applicable/aktif. Field hilang berarti schema invalid. Ini mencegah consumer lama menafsirkan absence secara berbeda.

### 8.3 Assessment activation

Saat assessment diaktifkan:

- `assessment_blueprint` menjadi exact non-null VersionRef;
- scoring/form/integrity policy yang tidak tercakup blueprint harus mendapat VersionRef eksplisit melalui VersionSet schema version baru atau blueprint manifest;
- practice VersionSet tidak mengisi blueprint assessment secara palsu;
- schema v1 reader menolak unknown required decision dimension sesuai compatibility rule.

### 8.4 API and code naming

Canonical wire/storage/hash keys menggunakan `snake_case`. TypeScript internal boleh memakai idiomatic `camelCase` hanya jika adapter menghasilkan dan memvalidasi canonical DTO sebelum hashing/persistence. Object internal tidak pernah di-hash langsung.

## 9. JSON Input Domain

Payload yang dicanonicalize harus memenuhi I-JSON/JCS-compatible constraints:

- valid JSON object/array/value;
- duplicate object keys ditolak saat parsing;
- string valid Unicode; lone surrogate ditolak;
- no `NaN`, positive/negative infinity, `undefined`, function, symbol, bigint, date object, map, set, or class instance;
- number hanya jika schema menyatakannya aman dan finite;
- object default/optional semantics diselesaikan sebelum canonicalization;
- unknown field ditolak atau dihapus oleh explicit schema policy, tidak diam-diam berbeda antar-runtime;
- key adalah exact case-sensitive schema key.

Canonicalizer hanya menerima parsed value dari approved boundary schema. Ia bukan general-purpose sanitizer.

## 10. Schema-specific Normalization

Pipeline:

```text
raw bytes/input
→ parse with duplicate-key detection where bytes are available
→ validate boundary schema
→ apply explicitly versioned domain normalization
→ create canonical hash projection
→ RFC 8785 JCS serialization
→ UTF-8 bytes
→ SHA-256
→ prefixed lowercase-hex hash string
```

Normalization rules harus menjadi bagian contract version dan golden fixtures. Canonicalization tidak boleh:

- trim semua string secara global;
- lowercase identifiers atau Japanese text;
- Unicode-normalize raw response;
- mengubah array order;
- mengisi current timestamp;
- resolve “latest” version;
- drop field hanya karena nilainya falsy;
- mengubah `null` menjadi missing atau sebaliknya.

## 11. Unicode Contract

RFC 8785 tidak melakukan Unicode normalization. Nekoru menetapkan:

- raw response dipertahankan exact sebagai data domain yang dilindungi; hash raw-response projection merepresentasikan exact validated string;
- normalized response disimpan pada field terpisah dan dibuat oleh evaluator/versioned normalization policy;
- authored policy/content fields yang mensyaratkan normalization harus dinormalisasi ke NFC pada authoring/build boundary;
- canonicalizer tidak mengubah code point sequence;
- test fixtures mencakup precomposed/decomposed character, kana, kanji, emoji, combining mark, dan mixed script;
- string comparison mengikuti domain policy, bukan hash/canonicalizer;
- UTF-8 tanpa BOM digunakan untuk hash bytes.

Dengan aturan ini, audit dapat membedakan apa yang benar-benar dikirim learner dari hasil normalization evaluator.

## 12. Numeric Contract

### 12.1 Academic numeric values

Angka yang memengaruhi score, mastery, weight, confidence, probability, threshold, duration, dan money-like exact calculation tidak menggunakan binary floating-point dalam hash projection.

Gunakan scaled integer dengan scale field atau scale yang ditetapkan schema:

| Concept | Representation baseline |
|---|---|
| Score/mastery/confidence 0–1 | integer micros `0..1_000_000` |
| Weight | integer parts-per-million; applicable weights sum `1_000_000` |
| Percentage display | derived, tidak menjadi decision input |
| Duration | integer milliseconds atau seconds sesuai named field |
| Count/revision/version | nonnegative/positive integer sesuai schema |

Contoh mastery weight `0.55` disimpan pada hash input sebagai `550000`, bukan JSON number `0.55`.

### 12.2 General JSON number

Jika contract nonacademic memakai JSON number, ia harus berada pada safe integer range atau mempunyai explicitly tested RFC 8785 serialization. `-0` dilarang pada domain schema; fractional number yang tidak memiliki scale contract dilarang dari hashed decision payload.

## 13. Timestamp dan Date Contract

- instant canonical: RFC 3339 UTC, millisecond precision, exact `YYYY-MM-DDTHH:mm:ss.SSSZ`;
- local date: `YYYY-MM-DD` plus separate IANA timezone if decision depends on locality;
- duration: named integer unit, misalnya `duration_ms`;
- scheduler decision memasukkan controlled `effective_at` bila waktu memengaruhi output;
- `recorded_at`, database default time, delivery time, log time, dan build machine time tidak masuk decision hash;
- event payload hash dapat memasukkan source `occurred_at` bila event contract menjadikannya semantic input;
- client time tidak menjadi authority tanpa explicit classification;
- leap second/noncanonical offset input ditolak atau dinormalisasi oleh versioned boundary rule sebelum hashing.

## 14. Array dan Set Semantics

JCS mempertahankan array order. Karena itu setiap array contract harus berstatus:

- `ordered`: order semantik dan dipertahankan;
- `sorted`: producer mengurutkan dengan comparator contract sebelum canonicalization;
- `set`: duplicate ditolak dan elements diurutkan berdasarkan canonical comparator;
- `multiset`: duplicate sah dan sorting rule eksplisit.

Default adalah `ordered`. Canonicalizer tidak mengurutkan array secara global.

Contoh:

- `reason_codes`: ordered berdasarkan decision rule priority/tie-break;
- `version_refs`: sorted berdasarkan artifact type lalu ID jika contract menyatakan set;
- option order pada ActivityInstance: ordered dan harus dipertahankan;
- role grants: set, unique lalu sorted menurut canonical permission key.

## 15. Hash Algorithm dan Encoding

Baseline:

```text
canonical_bytes = UTF8(JCS(hash_projection))
digest = SHA256(canonical_bytes)
encoded = "sha256:" + lowercase_hex(digest)
```

Rules:

- output selalu 71 ASCII characters (`sha256:` + 64 hex);
- base64/base64url tidak digunakan untuk canonical hash field v1;
- constant-time comparison digunakan ketika hash menjadi integrity/security boundary;
- hash bukan signature dan tidak membuktikan siapa yang membuat artifact;
- signed manifest/package memakai separate signature envelope and key ID;
- algorithm change membutuhkan hash-contract version baru; hash lama tidak dihitung ulang diam-diam.

## 16. Hash Contract Registry

| Contract | ID | Includes | Excludes |
|---|---|---|---|
| Versioned artifact | `artifact-body/v1` | Schema/versioned body yang diterbitkan | self hash, signature, transient build path |
| VersionSet | `version-set/v1` | Exact canonical VersionSet | runtime resolution/cache metadata |
| Decision | `decision/v1` | decision type, effective inputs, VersionSet, output, reason codes | decision ID, recorded time, trace, display text |
| Manifest | `manifest/v1` | ordered/sorted exact entries, hashes, compatibility, metadata semantik | manifest hash itself, signature, build machine path |
| Event payload | `event-payload/v1` | semantic event envelope/data per schema | delivery attempt, queue headers/signature |
| Idempotency request | `request-fingerprint/v1` | operation, actor/scope, contract version, normalized request | idempotency key, trace, received time |
| Receipt | `receipt/v1` | operation, canonical outcome refs, versions | delivery metadata and display-only response |
| Asset bytes | `asset-bytes/v1` | Exact binary bytes | JSON metadata; hashed separately |

Setiap stored hash mempunyai contract ID yang dapat ditentukan dari record schema atau field eksplisit.

## 17. Decision Hash v1

Canonical projection:

```json
{
  "decision_type": "practice.objective_evaluation",
  "effective_at": "2026-09-14T00:00:00.000Z",
  "hash_contract": "decision/v1",
  "inputs": {},
  "ordered_reason_codes": [],
  "output": {},
  "version_set": {},
  "schema_version": 1
}
```

Field order pada contoh bukan authority; JCS mengurutkannya. Semantics:

- `decision_type` berasal dari registry;
- `effective_at` hanya disertakan jika waktu adalah input keputusan; untuk evaluator tanpa time dependency field dapat `null` bila schema menetapkan;
- `inputs` memuat semantic inputs atau immutable references plus their hashes;
- `output` memuat canonical result, bukan localized presentation;
- `ordered_reason_codes` adalah stable codes, bukan copy UI;
- `version_set` exact;
- `schema_version` version decision envelope.

Generated `dec_...`, correlation ID, actor display name, DB revision, compute duration, host, log fields, dan `recorded_at` disimpan di record tetapi tidak masuk hash.

## 18. Manifest Hash v1

Manifest projection minimum:

- manifest schema/contract version;
- artifact/release identity and version;
- exact ordered/sorted entries;
- each entry ID, version, artifact hash, size/MIME where semantic;
- dependency VersionRefs;
- compatibility range;
- rights/accessibility metadata references required for release;
- expiration only if semantically part of package;
- deterministic build-policy version.

Excluded:

- `manifest_hash` itself;
- signature bytes, signature creation time, key delivery metadata;
- local absolute file path;
- nondeterministic archive timestamp;
- build host/user;
- unordered filesystem enumeration.

Archive/package builder harus menghasilkan deterministic entry ordering and metadata. Hash manifest tidak otomatis sama dengan hash archive bytes; keduanya disimpan terpisah bila diperlukan.

## 19. Event Payload Hash v1

Event payload hash melindungi semantic event, bukan transport attempt. Include:

- event schema version;
- event type;
- event ID jika contract menjadikannya identity semantic;
- aggregate typed reference/version/sequence;
- source `occurred_at` bila semantic;
- producer;
- canonical data;
- correlation/causation ID hanya jika replay/audit contract membutuhkannya secara semantic.

Exclude:

- QStash/queue signature;
- delivery number;
- received/processed timestamps;
- retry/backoff metadata;
- HTTP headers yang tidak masuk contract;
- consumer-specific status.

Inbox menyimpan payload hash untuk mendeteksi message ID sama dengan payload berbeda.

## 20. Idempotency Request Fingerprint v1

Projection minimum:

```json
{
  "actor_scope": "usr_<ULID>",
  "contract_version": "api/v1",
  "hash_contract": "request-fingerprint/v1",
  "operation": "practice.submit_objective",
  "request": {},
  "resource_scope": "prun_<ULID>",
  "schema_version": 1
}
```

Exclude idempotency key agar key dapat dibandingkan dengan fingerprint. Authorization result tidak hanya direpresentasikan actor string; request tetap menjalani authz pada first execution dan safe replay policy pada repeat.

Key sama + fingerprint sama mengembalikan canonical result. Key sama + fingerprint berbeda menghasilkan `IDEMPOTENCY_KEY_REUSED` conflict dan tidak menjalankan mutation.

## 21. Hashing dan Sensitive Data

Hash bukan anonymization. Hash raw answer, email, token, atau small-domain personal value dapat ditebak/dictionary-attack.

Aturan:

- generic log/analytics tidak menerima raw sensitive value maupun unsalted direct hash-nya;
- database decision record boleh menyimpan content hash/reference sesuai classification dan access control;
- raw-response hash hanya dibuat jika contract/audit purpose disetujui, disimpan restricted, dan retention mengikuti raw response;
- token/secret/password tidak pernah menjadi generic decision hash input;
- external correlation memakai opaque IDs, bukan email hash;
- deletion/export policy mencakup linked hashes jika masih personal data;
- HMAC digunakan hanya untuk explicitly approved pseudonymous correlation use case dengan key rotation policy, bukan menggantikan SHA-256 artifact integrity.

## 22. Signature Boundary

SHA-256 hash memberi integrity comparison, bukan authenticity. Signed content/offline package memakai envelope terpisah:

```json
{
  "algorithm": "<approved-signature-algorithm>",
  "key_id": "<key-reference>",
  "payload_hash": "sha256:<hex>",
  "signature": "<encoded-signature>",
  "signature_schema_version": 1,
  "signed_at": "<UTC timestamp>"
}
```

Signature algorithm/key lifecycle ditetapkan ADR-006/ADR-008. `signed_at` tidak mengubah payload hash. Verifier memeriksa hash, signature, key status, intended artifact type, compatibility, dan expiry.

## 23. Compatibility dan Schema Evolution

- additive optional field tidak boleh otomatis masuk hash projection contract lama;
- field baru yang memengaruhi keputusan memerlukan decision/hash schema version baru;
- hash-contract version menentukan exact projection dan normalization;
- reader lama menolak unknown required schema version;
- reader baru tetap dapat memverifikasi old contract selama support window;
- reserialization dengan library baru harus lulus golden fixtures sebelum rollout;
- stored canonical bytes boleh dipertahankan untuk high-value manifest/decision debugging, tetapi authoritative verification berasal dari schema + canonicalization contract;
- hash tidak dihitung ulang menggunakan current schema untuk record historis.

## 24. Golden Fixtures

### 24.1 Required fixture classes

- empty object/array;
- nested keys with different insertion orders;
- Unicode Japanese and combining sequences;
- escaped control characters;
- safe integers and scaled academic values;
- `null` versus missing rejection/semantic difference;
- ordered arrays and sorted-set preprocessing;
- canonical timestamp;
- VersionRef and VersionSet;
- decision, manifest, event, request fingerprint;
- invalid duplicate key, lone surrogate, unsafe number, `NaN`, and unknown schema.

### 24.2 Baseline vectors

Vector 1:

```text
canonical JSON: {}
SHA-256: 44136fa355b3678a1146ad16f7e8649e94fb4fc21fe77e8310c060f61caaff8a
stored: sha256:44136fa355b3678a1146ad16f7e8649e94fb4fc21fe77e8310c060f61caaff8a
```

Vector 2 input semantik:

```json
{
  "schema_version": 1,
  "decision_type": "fixture",
  "algorithm": "sha256",
  "input": { "b": 2, "a": "あ" },
  "output": { "ok": true }
}
```

Canonical bytes as UTF-8 text:

```text
{"algorithm":"sha256","decision_type":"fixture","input":{"a":"あ","b":2},"output":{"ok":true},"schema_version":1}
```

Expected:

```text
sha256:56ee29d50f4f05ce16cd8cd8fff645aceb1a6395085fa04b151834fb3b88d09d
```

Golden vectors masuk repository executable tests. Contoh dokumen harus disalin menjadi fixture melalui reviewed change, bukan diketik ulang di banyak package.

## 25. Executable Artifact Layout

```text
packages/contracts/
└── src/common/
    ├── identifiers.schema.ts
    ├── version-ref.schema.ts
    ├── version-set.schema.ts
    ├── hash.schema.ts
    └── timestamps.schema.ts

packages/domain/
└── src/foundation/
    ├── canonical-json.ts
    ├── decision-hash.ts
    ├── hash-projections/
    └── identifiers.ts

packages/test-fixtures/
└── canonicalization/
    ├── valid/
    ├── invalid/
    └── expected-hashes.json
```

Canonicalization implementation harus satu shared server/tooling package. Browser tidak menghitung authoritative decision hash kecuali future offline protocol menyediakan approved verifier/evaluator implementation.

## 26. Enforcement

CI wajib memeriksa:

- prefix registry collision dan format;
- no ad-hoc ID generation;
- no direct `JSON.stringify` untuk authoritative hash;
- no direct float in hashed academic projection;
- VersionSet required fields dan `assessment_blueprint: null` pada M1;
- golden JCS vectors lintas packages;
- identical semantic object with different insertion order menghasilkan hash sama;
- changed decision/artifact schema memerlukan contract version review;
- manifests do not contain absolute paths/nondeterministic timestamps;
- no sensitive hashes in generic telemetry;
- historical fixtures tetap dapat diverifikasi.

## 27. Failure Behavior

| Failure | Required behavior |
|---|---|
| Unknown prefix | Reject boundary with stable validation code |
| Noncanonical ULID case | Reject; do not silently rewrite authoritative input |
| Version ID/version/hash mismatch | Integrity failure; block session/publication/decision |
| Missing VersionSet field | Schema failure; fail closed |
| Unsupported VersionSet/hash schema | Compatibility failure; no nearest-version fallback |
| Duplicate JSON key | Reject before hashing |
| Invalid Unicode/number | Reject canonicalization |
| Stored hash mismatch | Quarantine/incident/reconciliation based on artifact type |
| Same event/message ID, different payload hash | Security/integrity conflict; no effect execution |
| Same idempotency key, different request fingerprint | Conflict; no mutation |
| Canonicalizer error | Technical failure; never incorrect learner outcome |

## 28. Alternatives Considered

### 28.1 Plain `JSON.stringify` with sorted top-level keys

**Ditolak.** Tidak menangani nested key, Unicode/number constraints, atau lintas-runtime contract secara memadai.

### 28.2 Custom canonical JSON format

**Ditolak.** Menambah specification dan interoperability burden tanpa alasan dibanding RFC 8785.

### 28.3 Hash database row serialization

**Ditolak.** Bergantung pada column order, driver/type mapping, defaults, dan metadata persistence yang bukan semantic input.

### 28.4 UUIDv4 tanpa prefix

**Ditolak untuk baseline.** Valid tetapi mengurangi diagnosability dan time-sort locality yang sudah disepakati. ULID timestamp tetap tidak menjadi authority.

### 28.5 UUIDv7

**Tidak dipilih.** Ia standar yang layak, tetapi mengganti keputusan prefixed ULID tidak memberi manfaat cukup pada tahap ini dan menambah migration/document drift. Dapat dipertimbangkan hanya melalui ADR superseding sebelum persisted IDs tersebar luas.

### 28.6 Hash seluruh stored record

**Ditolak.** Generated IDs, recorded timestamps, revision, traces, dan operational metadata membuat hasil nondeterministic dan mengaburkan decision semantics.

### 28.7 JSON decimals sebagai binary float

**Ditolak untuk academic hashes.** Scaled integers memberi exact cross-runtime representation dan explicit scale.

## 29. Consequences

### Positive

- decision/manifest/event hash dapat diverifikasi lintas-runtime;
- content dan policy version mismatch terdeteksi;
- duplicate/replay conflict dapat dibedakan;
- ID lebih mudah didiagnosis tanpa menyimpan meaning/PII;
- correction/history tidak bergantung pada current serializer;
- academic numeric calculation mempunyai exact representation;
- document inconsistencies `prn_`/`arn_` terselesaikan.

### Negative

- schema normalization dan hash projection harus dipelihara per version;
- uppercase ULID payload lebih ketat daripada case-insensitive spec input;
- scaled integer membutuhkan conversion di UI/API boundaries;
- duplicate-key detection memerlukan raw-byte parser path pada security-sensitive input;
- canonicalizer/library upgrade memerlukan golden compatibility test;
- hash tidak menggantikan signature, authorization, atau retention policy.

## 30. Revisit Triggers

ADR ditinjau ulang jika:

- RFC/security guidance menuntut algorithm change;
- non-TypeScript runtime diperkenalkan dan fixture tidak interoperable;
- offline client harus menghasilkan authoritative ID/hash;
- signed packages memerlukan canonical format berbeda;
- collision/ordering/performance evidence menunjukkan ULID tidak memadai;
- schema version proliferation membuat migration tidak aman;
- regulatory policy mengubah treatment hash sebagai personal data.

## 31. Acceptance Criteria

ADR dapat berstatus `Accepted` jika:

- [ ] Prefix registry dan canonical casing disetujui.
- [ ] `prun_` dan `arun_` dipilih sebagai resolution inkonsistensi lama.
- [ ] VersionRef dan VersionSet v1 shape disetujui.
- [ ] RFC 8785 + SHA-256 encoding disetujui.
- [ ] Unicode, numeric, timestamp, array, and normalization rules disetujui.
- [ ] Decision/manifest/event/request hash projections disetujui.
- [ ] Sensitive-data limitation disetujui.
- [ ] Golden fixtures dan failure behavior dapat diimplementasikan.
- [ ] Hash/signature boundary dipahami.

## 32. Open Implementation Details

| ID | Detail | Default sebelum diputuskan | Owner |
|---|---|---|---|
| `ADR003-OPEN-001` | Exact audited JCS library | Pilih RFC 8785-compatible library; wrapper + golden fixtures menjadi authority | Engineering/Security |
| `ADR003-OPEN-002` | Concrete policy/evaluator prefixed artifact IDs | Runtime blocked sampai registered IDs tersedia; `TBD` invalid | Content/Engineering |
| `ADR003-OPEN-003` | Whether stored canonical bytes retained per record type | Simpan hash + source projection fields; retain bytes hanya jika audit value justified | Data/Privacy |
| `ADR003-OPEN-004` | Signature algorithm/key format | Ditentukan ADR-006/ADR-008; SHA-256 bukan signature | Security/Operations |
| `ADR003-OPEN-005` | Database custom domain for IDs/hash | Start text + constraints; custom domain only with migration/tool compatibility proof | Data |

## 33. Decision Record

| Field | Nilai |
|---|---|
| ID | `ADR-003` |
| Decision | Gunakan registered prefixed canonical ULID, exact VersionRef/VersionSet v1, RFC 8785 JCS after schema normalization, SHA-256 lowercase-hex encoding, versioned hash projections, dan scaled integers untuk academic values. |
| Status | `accepted` |
| Proposed at | 14 September 2026 |
| Accepted at | 14 September 2026 |
| Decision owners | Engineering Lead + Data Lead |
| Required reviewers | Academic/Assessment, Content, Security/Privacy, QA, Operations |
| Revisit trigger | Algorithm/security change, cross-runtime incompatibility, offline authority, atau identifier/hash evidence failure. |
| Supersedes | Tidak ada |
| Superseded by | Tidak ada |
