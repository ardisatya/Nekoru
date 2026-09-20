# Test and Quality Plan Nekoru — MVP N5

**Status:** Approved v1.0 — baseline kualitas Milestone 1  
**Tanggal:** 13 September 2026  
**Pemilik:** QA dan Engineering  
**Required reviewers:** Product, Academic/Assessment, Content, Design, Accessibility, Security/Privacy, Data, dan Operations  
**Cakupan aktif:** Milestone 1 U01-L1 online-only  
**Cakupan berikutnya:** U01–U24, assessment, Content Operations, offline, dan production hardening  
**Release blocker:** Critical journey atau invariant tanpa executable test dan evidence tidak dapat dinyatakan Done

## 1. Tujuan

Dokumen ini mendefinisikan cara Nekoru membuktikan kualitas sebelum dan selama implementasi. Kontrak ini menetapkan:

1. strategi pengujian berbasis risiko dan invariant;
2. test suite, level, owner, trigger, environment, dan evidence;
3. traceability dari requirement ke fixture, test, defect, dan release gate;
4. data uji, deterministic clock/randomness, serta provider double;
5. pengujian akademik, content, API, event, persistence, UI, accessibility, security, privacy, reliability, dan performance;
6. acceptance matrix Milestone 1;
7. aturan flaky test, quarantine, exception, dan regression;
8. exit criteria untuk merge, staging, milestone, dan production release.

Dokumen ini tidak menggantikan Definition of Done. Ia mengubah DoD menjadi aktivitas dan bukti yang dapat dieksekusi.

## 2. Dokumen Sumber

- [Implementation Readiness](./implementation-readiness.md)
- [Definition of Done](./definition-of-done.md)
- [Technical Architecture](./technical-architecture.md)
- [Domain Model and Schemas](./domain-model-and-schemas.md)
- [Learning Policy and Registry N5](./learning-policy-and-registry-n5.md)
- [API and Event Contracts](./api-and-event-contracts.md)
- [Security, Privacy, and Data Governance](./security-privacy-data-governance.md)
- [Platform Support and Accessibility Matrix](./platform-support-and-accessibility-matrix.md)
- [Content Validation Rubric](./content-validation-rubric.md)
- [Assessment Specification N5](./assessment-specification-n5.md)
- [Content Seed U01](../content/content-seed-u01.md)
- [Practice Interactions](../ui-ux/06-practice-interactions.md)
- [Accessibility, Content, and Edge Cases](../ui-ux/08-accessibility-content-and-edge-cases.md)
- [Prototype and Usability Test](../ui-ux/09-prototype-usability-test.md)
- [Analytics and Implementation Handoff](../ui-ux/10-analytics-and-handoff.md)

## 3. Prinsip Kualitas

1. **Risk over count.** Jumlah test atau persentase coverage bukan bukti tunggal bahwa risiko utama terlindungi.
2. **Invariant before example.** Aturan akademik, idempotency, versioning, dan authorization diuji sebagai invariant selain contoh happy path.
3. **Deterministic by default.** Test tidak bergantung pada jam sistem, random global, network publik, atau provider live tanpa control.
4. **Contract at boundaries.** HTTP, event, database, content package, asset, identity, dan job boundary mempunyai schema dan negative tests.
5. **No false learner outcome.** Failure teknis tidak boleh menghasilkan jawaban salah, mastery palsu, XP ganda, atau completion ganda.
6. **Accessibility is executable quality.** Automated scan, keyboard, AT, IME, zoom/reflow, forced colors, dan reduced motion masuk gate.
7. **Security and privacy by assertion.** Absence of answer leakage, secret, PII, dan raw response dalam telemetry diuji.
8. **Production-like evidence.** Release evidence berasal dari immutable build dan environment yang mewakili konfigurasi produksi.
9. **Fail closed.** Unknown enum, stale version, missing policy, invalid manifest, atau unverifiable identity tidak berubah menjadi success.
10. **Repair the system.** Defect yang lolos menambah regression test pada lapisan paling rendah yang dapat menangkap penyebabnya.

## 4. Quality Risk Register

| ID | Risiko | Dampak | Minimum control/test | Priority |
|---|---|---|---|---|
| `QR-001` | Evaluation nondeterministic | Learner dengan jawaban sama mendapat hasil berbeda | Golden fixture + property/determinism test | P0 |
| `QR-002` | Duplicate submit/event | Attempt, XP, mastery, atau analytics ganda | Idempotency integration + duplicate delivery test | P0 |
| `QR-003` | Stale content/policy version | Evidence dihitung dengan aturan salah | VersionSet validation + stale revision test | P0 |
| `QR-004` | Answer/rationale leakage | Assessment/practice integrity rusak | Bundle, DOM, API, log, event negative tests | P0 |
| `QR-005` | Authorization hanya di UI | Data/action internal dapat diakses | Server authorization matrix + negative API tests | P0 |
| `QR-006` | Network failure dinilai incorrect | Learner dirugikan | Timeout/retry/reconnect integration and E2E | P0 |
| `QR-007` | Accessibility regression | Critical journey tidak dapat diselesaikan | Automated + manual platform matrix | P0 |
| `QR-008` | IME composition disubmit dini | Jawaban rusak dan false incorrect | Composition-event component/E2E fixture | P0 |
| `QR-009` | Content seed tidak lengkap/valid | Session tidak masterable atau asset gagal | Content build, manifest, rights, audio/glyph tests | P0 |
| `QR-010` | Mastery update non-atomic | Progress hilang/berlipat | Transaction/outbox integration tests | P0 |
| `QR-011` | Auth provider outage/replay | Account/session salah | Provider double + webhook replay/failure tests | P0 |
| `QR-012` | Telemetry memuat data terlarang | Privacy/security incident | Schema allowlist + sink/redaction tests | P0 |
| `QR-013` | Cache dianggap authority | State usang menjadi canonical | Cache loss/corruption test | P1 |
| `QR-014` | Migration/rollback merusak data | Release tidak recoverable | Forward/backward compatibility + restore rehearsal | P1/production |
| `QR-015` | Load membuat submit tidak stabil | Lost/duplicate outcome | Load, saturation, queue, and latency tests | P1/production |

Setiap risiko P0 harus memiliki paling sedikit satu executable test dan satu owner sebelum feature merge.

## 5. Test Level dan Suite Registry

| Suite ID | Level | Tooling baseline | Fokus | Trigger |
|---|---|---|---|---|
| `T-STATIC` | Static | TypeScript strict, lint, dependency rules | Type, import boundary, prohibited API/pattern | Setiap PR |
| `T-UNIT` | Unit | Vitest | Pure domain/application functions | Setiap PR |
| `T-PROPERTY` | Property/invariant | Vitest + deterministic generator | Invariant, boundary, permutation, determinism | Setiap PR/nightly |
| `T-SCHEMA` | Schema | Zod/JSON Schema/OpenAPI validators | Entity, content, API, event, config | Setiap PR |
| `T-CONTRACT` | Consumer/provider contract | OpenAPI/event fixtures | Client-server/provider compatibility | Setiap PR |
| `T-DB` | Persistence | Ephemeral PostgreSQL | Constraint, transaction, migration, outbox/inbox | Setiap PR |
| `T-INTEGRATION` | Module integration | Vitest/test harness | API→domain→DB→event, providers via double | Setiap PR |
| `T-COMPONENT` | UI component | DOM/component harness | Semantics, states, keyboard, IME | Setiap PR |
| `T-E2E` | End-to-end | Playwright | Critical journey across browser/server/DB | PR smoke + nightly/RC |
| `T-A11Y-AUTO` | Accessibility automated | axe-core + Playwright | Detectable WCAG regression | PR + nightly |
| `T-A11Y-MANUAL` | Accessibility manual | Platform matrix | Keyboard, NVDA, VoiceOver, TalkBack, zoom, IME | Feature/RC |
| `T-CONTENT` | Content build | Schema + custom validators | Coverage, mapping, rights, asset, manifest | Content PR/publication |
| `T-SECURITY` | Security/privacy | SAST, dependency, secret, custom negative tests | Authorization, leakage, headers, data minimization | PR/nightly/RC |
| `T-VISUAL` | Visual regression | Playwright screenshots | Layout, Japanese glyph, focus, responsive state | Nightly/RC |
| `T-PERFORMANCE` | Performance/load | Scripted load harness | Latency, throughput, saturation, budgets | RC/production readiness |
| `T-RESILIENCE` | Failure injection | Controlled provider/network faults | Retry, timeout, DLQ, cache/storage/database failure | Nightly/RC |
| `T-MIGRATION` | Migration/compatibility | Ephemeral DB + release artifacts | Expand/contract, rollback compatibility | Schema/content change |
| `T-RESTORE` | Backup/restore | Operations rehearsal | RPO/RTO and data integrity | Production readiness/schedule |

Tool names adalah baseline, bukan alasan melemahkan contract. Penggantian tool harus mempertahankan coverage dan evidence.

## 6. Test Pyramid dan Placement Rule

Test ditempatkan pada lapisan terendah yang dapat membuktikan behavior:

- pure scoring, normalization, scheduler, mastery, dan policy: unit/property;
- schema and compatibility: schema/contract;
- transaction, uniqueness, lock, outbox, dan idempotency: database/integration;
- component state, keyboard, accessible name, dan IME: component;
- browser routing, auth, network recovery, and cross-module journey: E2E;
- real screen reader, touch, audio, and device behavior: manual;
- infrastructure saturation, restore, dan incident behavior: performance/resilience/operations.

Tidak semua permutation dijalankan sebagai E2E. E2E fokus pada wiring dan critical journey; combinatorial domain rules dibuktikan di unit/property layer.

## 7. Test Taxonomy dan Penamaan

Test case ID:

```text
<suite>-<domain>-<behavior>-<sequence>
```

Contoh:

- `UNIT-MASTERY-CAP-001`;
- `PROP-SCHED-DETERMINISM-001`;
- `CONTRACT-API-PRACTICE-SUBMIT-004`;
- `INT-OUTBOX-DUPLICATE-002`;
- `E2E-U01-RECONNECT-003`;
- `A11Y-KANA-NVDA-001`;
- `SEC-ANSWER-LEAK-002`.

Nama test harus menyatakan expected behavior, bukan method internal. Test tidak boleh disebut `works`, `basic`, atau `test1`.

## 8. Fixture dan Test Data Strategy

### 8.1 Fixture layers

| Layer | Isi | Aturan |
|---|---|---|
| Factory | Entity valid minimum | Override eksplisit; default selalu schema-valid |
| Golden | Input/output akademik yang ditinjau | Immutable per policy/version; perubahan memerlukan approval |
| Boundary | Nilai min/max/empty/unknown/malformed | Tidak digunakan sebagai happy path |
| Scenario | Multi-entity journey | Memakai stable IDs dan controlled clock |
| Provider | Clerk/storage/queue/email response | Tidak memanggil live provider dalam PR |
| Content pack | Exact U01 seed manifest/assets | Hash dan VersionSet terkunci |
| Adversarial | Unauthorized/leakage/replay/tamper | Synthetic dan privacy-safe |

### 8.2 Stable test identity

- gunakan synthetic user dan role;
- jangan salin production record ke test;
- email test tidak boleh dapat dikirim ke orang nyata;
- stable ID hanya dalam namespace test;
- cleanup tidak mengandalkan broad delete tanpa scope/run identifier;
- parallel run terisolasi melalui tenant/schema/database/run prefix yang tervalidasi.

### 8.3 Time dan randomness

- clock diinjeksi dan dapat dibekukan;
- timezone fixture minimum UTC dan Asia/Jakarta;
- random selection memakai explicit seed;
- test yang gagal mencetak seed, policy version, dan fixture version;
- ordering yang tidak semantik tidak boleh diassert sebagai exact order;
- scheduler tie-break memakai rule deterministic yang didokumentasikan.

### 8.4 Version fixture

Setiap scenario domain menyebut:

- `contentVersion`;
- `policyVersion`;
- `schemaVersion`;
- `rubricVersion` bila berlaku;
- `manifestId`;
- `activityDefinitionId` dan version;
- expected behavior ketika salah satu version stale/missing/incompatible.

## 9. Academic dan Learning Policy Tests

### 9.1 Evaluation

Minimum invariant:

- input, activity definition, evaluator version, dan policy yang sama menghasilkan result yang sama;
- raw response disimpan sesuai privacy policy tetapi normalization tidak mengubah audit meaning;
- accepted response dan rejected response mengikuti exact approved alternatives;
- unsupported/malformed response menghasilkan validation/technical state, bukan guessed score;
- hint/support flag memengaruhi evidence sesuai policy;
- technical failure menghasilkan no evidence;
- explanation tidak mengubah score setelah submission.

### 9.2 Mastery

Uji formula baseline:

```text
mastery = 0.55P + 0.15B + 0.15C + 0.15R
```

Minimum invariant:

- nilai berada pada domain yang diizinkan;
- cap diterapkan setelah component calculation sesuai policy;
- evidence ineligible tidak masuk aggregation;
- duplicate evidence tidak mengubah mastery dua kali;
- late/out-of-order delivery menghasilkan canonical state yang sama;
- completion tidak otomatis berarti mastery;
- evidence kurang menghasilkan `insufficient_evidence`, bukan nilai nol palsu;
- recalculation dengan exact VersionSet dapat direproduksi.

### 9.3 Scheduler dan review

Review interval baseline `1/3/7/14/30/60` hari diuji untuk:

- boundary sebelum, tepat, dan sesudah due time;
- timezone dan daylight-saving platform yang applicable;
- duplicate queue candidate;
- tie-break deterministic;
- learner dengan no evidence;
- failed/partial/supported result;
- stale policy version;
- plan regeneration tidak menghapus completed history.

### 9.4 Evidence eligibility

Matrix minimum:

| Condition | Expected |
|---|---|
| Correct independent response | Eligible sesuai evidence map |
| Correct dengan approved support | Eligible/capped sesuai policy |
| Transcript membuka listening answer | Tidak eligible untuk listening construct |
| Alternative construct-equivalent | Eligible dengan presentation metadata |
| Alternative belum tervalidasi | Tidak eligible; activity replacement/block |
| Audio/network failure | Technical issue; tidak incorrect, tidak eligible |
| Duplicate submission | Satu canonical evidence |
| Unknown evaluator/policy version | Fail closed |

## 10. Content Build dan Publication Tests

Untuk Milestone 1 U01 seed:

- schema seluruh KC, activity, session, audio, reading/listening object, dan mapping valid;
- stable ID unik dan reference dapat di-resolve;
- exact VersionSet dan manifest hash valid;
- setiap activity mempunyai construct, evidence map, answer, rationale, misconception/reason mapping, dan accessibility metadata;
- required variants/interaction counts terpenuhi;
- prohibited romaji/furigana/transcript leakage tidak terjadi;
- asset reference, MIME, size, checksum, rights, attribution, dan status valid;
- audio master/delivery relationship dan speaker metadata lengkap sebelum publication;
- missing/quarantined/deprecated asset menggagalkan publication;
- session duration dan item count masuk approved bounds;
- unknown registry value menggagalkan build;
- snapshot/manifest diff dapat ditinjau manusia.

Publication gate harus menggunakan artifact yang sama dengan runtime. Re-validating source berbeda dari bundle yang dijalankan bukan bukti cukup.

## 11. Schema, API, dan Event Contract Tests

### 11.1 HTTP

Setiap endpoint applicable diuji untuk:

- valid request/response terhadap OpenAPI 3.1 dan runtime schema;
- missing/invalid field dan unknown enum policy;
- authentication missing/expired;
- authorization denied per role/resource;
- idempotency key missing/reused/conflicting;
- revision current/stale;
- correlation ID propagation;
- RFC-style problem response dan safe message;
- rate limit response;
- version negotiation/deprecation;
- no internal stack/secret/PII leak.

### 11.2 Event

Setiap event diuji untuk:

- envelope schema dan event version;
- unique event ID;
- aggregate ID/version;
- occurred/recorded timestamps;
- trace/correlation/causation chain;
- property allowlist dan prohibited fields;
- outbox write atomic dengan business mutation;
- duplicate inbox delivery;
- out-of-order event;
- poison event dan dead-letter behavior;
- backward-compatible consumer behavior.

### 11.3 Consumer-driven fixtures

Learner client, analytics pipeline, job worker, dan audit consumer menyimpan representative contract fixture. Provider change yang mematahkan consumer harus gagal sebelum merge.

## 12. Persistence dan Transaction Tests

Minimum database tests:

- primary/foreign/unique/check constraint;
- optimistic concurrency/revision conflict;
- transaction rollback pada evaluation/evidence/mastery failure;
- attempt uniqueness dan idempotency;
- outbox inserted atomically;
- inbox deduplication;
- immutable publication/history rule;
- soft-delete/anonymization/legal-hold interaction;
- timezone and precision consistency;
- pagination order stable;
- migration on empty dan representative populated database;
- application version kompatibel selama rolling deployment.

Mock database tidak dapat menjadi satu-satunya bukti behavior constraint atau transaction.

## 13. UI Component Tests

Setiap reusable component applicable memiliki tests untuk:

- default, loading, empty, error, disabled, readonly, success, stale, conflict, and permission state;
- semantic element dan accessible name/description/error;
- keyboard and pointer operation;
- focus-visible, focus entry, and focus return;
- long Indonesian/Japanese/mixed-script content;
- 320 px layout dan text expansion;
- reduced motion dan forced colors contract;
- user input preservation on recoverable failure;
- event emission hanya dari confirmed action;
- no sensitive property in analytics payload.

Practice component menambahkan:

- select/unselect/reorder/pair semantics;
- attempt hanya bertambah saat valid submit;
- IME composition guard;
- Kana composer equivalence/support state;
- audio state and failure;
- feedback hold/visibility policy;
- answer/rationale tidak hadir sebelum waktunya.

## 14. End-to-End Acceptance Matrix Milestone 1

| ID | Scenario | Expected invariant | Suites |
|---|---|---|---|
| `M1-E2E-001` | Google sign-in success | Session dibuat; redirect aman; no duplicate profile | Contract, integration, E2E |
| `M1-E2E-002` | Email-link success/expired/wrong browser | Clear recovery; no enumeration; safe return path | Contract, E2E, a11y |
| `M1-E2E-003` | Guest onboarding then sign-in | Draft migrated once; no overwrite/duplicate | Unit, DB, integration, E2E |
| `M1-E2E-004` | New learner opens dashboard | U01 next action correct; completion/mastery distinct | Unit, API, component, E2E |
| `M1-E2E-005` | Start U01-L1 | Exact approved VersionSet/manifest loaded | Contract, DB, E2E |
| `M1-E2E-006` | Complete representative interactions | Response semantics and feedback correct | Unit, component, E2E, a11y |
| `M1-E2E-007` | Japanese IME composition | No premature submit; raw/normalized response correct | Component, E2E, manual |
| `M1-E2E-008` | Kana composer path | Operable, no answer leakage, evidence classification correct | Component, E2E, manual |
| `M1-E2E-009` | Audio success/replay/failure | Policy enforced; failure creates no false incorrect | Component, integration, E2E, device |
| `M1-E2E-010` | Duplicate submit | One attempt/result/evidence/mastery mutation | DB, integration, E2E |
| `M1-E2E-011` | Timeout after server commit | Retry returns canonical result | Integration, E2E |
| `M1-E2E-012` | Disconnect before commit | Draft/recovery safe; no evidence created | Integration, E2E |
| `M1-E2E-013` | Stale revision/version | Mutation rejected with recovery; no silent overwrite | Contract, DB, E2E |
| `M1-E2E-014` | Session completion | Completion once; mastery reflects eligible evidence only | Unit, DB, integration, E2E |
| `M1-E2E-015` | Progress review | Correct denominator/status; screen-reader equivalent | API, component, E2E, a11y |
| `M1-E2E-016` | Session expiry mid-flow | Re-auth and safe return/draft behavior | Integration, E2E, security |
| `M1-E2E-017` | Unsupported offline entry | Block before mutation; clear reason | Component, E2E, a11y |
| `M1-E2E-018` | Malformed/unknown server state | Fail closed and report safely | Contract, component, E2E |

Setiap scenario memuat happy path hanya bila relevan; negative dan recovery behavior adalah bagian acceptance, bukan backlog opsional.

## 15. Accessibility Quality Gate

Gate mengikuti [Platform Support and Accessibility Matrix](./platform-support-and-accessibility-matrix.md):

- axe-core/lint tidak memiliki violation blocker/critical yang applicable;
- keyboard-only critical journey lulus;
- focus tidak hilang atau tertutup;
- NVDA, VoiceOver, dan TalkBack P0 combinations lulus;
- zoom 200%, reflow 400%, 320 CSS px, forced colors, dan reduced motion lulus;
- Japanese language metadata, IME, Kana composer, ruby/furigana, audio, dan transcript policy lulus;
- hidden content tidak masuk DOM/accessibility tree;
- alternative interaction mempunyai equivalence state;
- blocker/critical accessibility defect tidak dapat di-waive.

Automated result tidak boleh diberi label full WCAG audit.

## 16. Security dan Privacy Tests

Minimum gate Milestone 1:

- route/API authorization matrix;
- direct-object reference tampering;
- CSRF/session/cookie/CORS/CSP baseline;
- login/account-enumeration and rate-limit behavior;
- Clerk webhook signature, replay, duplicate, and ordering;
- answer/rubric/rationale absence before release;
- analytics/event/log allowlist;
- raw response, token, email, and accessibility detail redaction;
- guest draft expiry and idempotent migration;
- content manifest/asset checksum and private access;
- dependency and secret scanning;
- error response contains no stack/internal permission graph;
- export/deletion workflow tests sebelum fitur tersebut diaktifkan.

Security scan dengan temuan critical/high yang exploitable memblokir release. Risk acceptance mengikuti security governance dan bukan keputusan QA sendiri.

## 17. Provider dan External Boundary Tests

### 17.1 Pull request

Gunakan deterministic provider double untuk:

- Clerk session, identity, and webhook;
- email link states;
- object storage success/not-found/timeout/checksum mismatch;
- queue delivery/duplicate/retry/DLQ;
- telemetry sink accepted/rejected/timeout.

### 17.2 Staging contract smoke

Live sandbox/test environment boleh dipakai untuk:

- one happy-path integration;
- credential/config validation;
- callback URL, cookie, origin, and webhook verification;
- provider-specific failure mapping.

Test live tidak boleh menjadi blocking PR test karena network/provider instability. Ia tetap menjadi release gate dengan retry policy dan evidence terpisah.

## 18. Failure Injection dan Resilience

Minimum scenario:

| ID | Failure | Expected |
|---|---|---|
| `FAIL-001` | Database unavailable before transaction | No partial mutation; retryable safe error |
| `FAIL-002` | Database failure after attempted write | Transaction atomic; canonical status recoverable |
| `FAIL-003` | Duplicate HTTP submit | Same canonical result or conflict contract; no duplicate effect |
| `FAIL-004` | Duplicate/out-of-order event | Inbox/idempotency protects state |
| `FAIL-005` | Queue retry exhausted | DLQ/alert; business source remains authoritative |
| `FAIL-006` | Cache missing/corrupt | Rebuild/fetch source; cache never authority |
| `FAIL-007` | Object/audio missing or hash mismatch | Quarantine/fallback; no false learner outcome |
| `FAIL-008` | Identity webhook replay | One identity transition; audit preserved |
| `FAIL-009` | Browser network changes during submit | Status uncertainty explained; safe retry |
| `FAIL-010` | Analytics sink unavailable | Learning transaction succeeds; buffered/dropped per policy |
| `FAIL-011` | Clock skew | Server authority used for critical timestamps |
| `FAIL-012` | Unknown schema/event version | Fail closed or compatible ignore per contract |

AI timeout/invalid-schema test masuk sebelum AI learner-data path diaktifkan; AI tetap disabled pada Milestone 1.

## 19. Performance dan Capacity

### 19.1 Budget categories

Angka final ditetapkan bersama SLO/operations document. Sebelum itu setiap critical route minimal mengukur:

- server latency p50/p95/p99;
- client navigation and interaction responsiveness;
- error/timeout rate;
- database query count and slow query;
- bundle/asset/audio size;
- concurrent session throughput;
- queue lag and retry volume;
- cache hit/miss tanpa correctness dependency.

### 19.2 Milestone 1 performance guard

- tidak ada unbounded list/query;
- route critical memiliki timeout budget eksplisit;
- submit tidak memblokir pada analytics delivery;
- audio memakai appropriate delivery asset, bukan master asset;
- learner route diuji pada throttled mobile network;
- regression terhadap approved baseline memerlukan explanation/approval.

Production target numerik tidak boleh direkayasa tanpa traffic model dan SLO. Ia menjadi open decision dalam operations readiness.

## 20. Coverage Policy

Coverage digunakan sebagai signal, bukan target pengganti behavior:

- changed pure domain logic wajib memiliki branch tests untuk semua rule path;
- safety-critical modules—evaluation, mastery, scheduling, authorization, idempotency, versioning—wajib mempunyai invariant/property tests;
- setiap bug fix wajib memiliki regression test yang gagal sebelum fix;
- setiap endpoint/event mempunyai positive, validation, authn/authz, stale/idempotency bila applicable, and error contract test;
- setiap P0 journey mempunyai E2E happy + critical recovery coverage;
- setiap component state yang dapat dilihat pengguna mempunyai representative test;
- generated coverage percentage boleh dipantau, tetapi merge tidak disetujui hanya karena angka tercapai.

Uncovered line dapat diterima bila dead/unreachable/generated code terbukti; uncovered requirement tidak dapat diterima.

## 21. CI/CD Quality Gates

### 21.1 Pull request gate

- format/lint/type/dependency boundary;
- unit/property/schema/contract;
- database/integration;
- component and accessibility automated;
- security/secret/dependency checks;
- content validation untuk changed content;
- E2E smoke critical path;
- changed-file traceability and required reviewer.

### 21.2 Main/nightly gate

- full integration and browser matrix subset;
- full content build;
- extended property cases;
- slow network/failure injection;
- visual regression;
- full automated accessibility route/state scan;
- flaky detection/repeat sampling.

### 21.3 Release candidate gate

- immutable build and migration dry run;
- full applicable E2E matrix;
- manual accessibility platform matrix;
- provider staging smoke;
- performance/load baseline;
- security/privacy review;
- backup/restore rehearsal when production data exists;
- no blocker/critical defect;
- complete release evidence and sign-off.

No job boleh dilabel optional jika ia melindungi P0 risk untuk affected change.

## 22. Flaky Test dan Quarantine Policy

Flaky test adalah defect. Aturan:

1. failure pertama ditriage sebagai product regression sampai bukti menunjukkan flake;
2. test hanya dapat di-quarantine dengan issue, owner, root-cause hypothesis, affected risk, dan expiry;
3. P0 invariant/critical journey tidak boleh dihapus atau dibuat non-blocking tanpa replacement coverage;
4. quarantined test tetap dijalankan dan dilaporkan terpisah;
5. retry CI maksimum hanya untuk diagnosis, bukan untuk menyembunyikan first-attempt failure;
6. clock, random seed, port, database, account, dan network harus diisolasi;
7. flake rate dipantau per suite dan owner;
8. quarantine lewat expiry menggagalkan release gate.

## 23. Defect dan Triage

| Severity | Contoh | Merge/release policy |
|---|---|---|
| Blocker | Data loss, wrong mastery, answer leak, critical journey impossible | Stop affected merge/release; no waiver |
| Critical | Unauthorized access, duplicate learner outcome, critical accessibility failure | Stop affected merge/release; no waiver |
| Major | Major flow friction/recovery defect dengan safe workaround | Fix atau time-bound approved exception |
| Minor | Localized issue dengan safe workaround | Planned fix dengan owner |

Defect record minimum:

- expected vs actual;
- requirement/test case/risk ID;
- build, environment, and combination;
- reproducible steps/seed;
- user/academic/security/accessibility impact;
- evidence yang sudah direduksi;
- severity and owner;
- fix version;
- regression test reference;
- retest result.

## 24. Test Evidence dan Traceability

Traceability chain:

```text
Requirement/Decision
  -> Risk/Invariant
  -> Fixture/Test Case
  -> Automated or Manual Run
  -> Evidence
  -> Defect/Exception
  -> Gate Result
  -> Release Sign-off
```

Release evidence manifest minimum:

```yaml
qualityEvidenceId: string
releaseCandidate: string
commitSha: string
versionSet: object
environment: string
testRuns: [string]
platformMatrixId: string
contentManifestId: string
securityReportRef: string
openDefects: [string]
approvedExceptions: [string]
gateResults: object
approvals: [object]
createdAt: ISO-8601
```

Evidence bersifat immutable setelah sign-off. Koreksi dibuat sebagai record baru yang merujuk record sebelumnya.

## 25. Environment Strategy

| Environment | Tujuan | Data | External provider | Release evidence |
|---|---|---|---|---|
| Local | Fast development | Generated/synthetic | Double | Tidak |
| PR ephemeral | Isolation and integration | Generated per run | Double | Merge evidence |
| Shared test | Exploratory/integration | Curated synthetic | Double/sandbox | Supporting |
| Staging production-like | RC verification | Versioned synthetic | Sandbox/test config | Ya |
| Production | Monitoring/smoke only | Real minimum | Live | Operational evidence |

Automated destructive test tidak dijalankan pada production. Production smoke tidak membuat mastery/evidence pada akun nyata; gunakan synthetic production account yang ditandai dan dikecualikan dari analytics akademik.

## 26. Roles dan Sign-off

| Area | Accountable | Evidence reviewer |
|---|---|---|
| Test architecture/CI | QA + Engineering | Engineering Lead |
| Academic rules/golden fixtures | Academic/Assessment | QA + Product |
| Content validation | Content Lead | Academic + Accessibility + Rights |
| API/event/data | Engineering/Data | QA + Security |
| Learner UX | Product/Design | QA + Academic |
| Accessibility | Accessibility Lead | QA + Product |
| Security/privacy | Security/Privacy | Engineering + Product |
| Performance/reliability | Engineering/Operations | QA + Product |
| Release quality | QA Lead | All affected domain owners |

Author test tidak menjadi satu-satunya approver untuk high-risk result yang dibuatnya sendiri.

## 27. Entry dan Exit Criteria

### 27.1 Feature ready for implementation

- [ ] Requirement, invariant, and acceptance criteria identified.
- [ ] Domain/API/event/content schema available.
- [ ] Happy, boundary, failure, unauthorized, and accessibility cases defined.
- [ ] Fixture/version strategy defined.
- [ ] Observability and prohibited telemetry properties defined.
- [ ] Required suite and owner assigned.

### 27.2 Feature ready to merge

- [ ] Applicable PR gates pass.
- [ ] New/changed behavior has tests at correct layers.
- [ ] No blocker/critical defect.
- [ ] Required manual feature test complete where automation is insufficient.
- [ ] Traceability updated.
- [ ] Documentation/schema/fixture updated together.
- [ ] No unexplained coverage or performance regression.

### 27.3 Milestone 1 done

- [ ] `M1-E2E-001`–`M1-E2E-018` applicable scenarios pass.
- [ ] U01 content build and exact manifest pass.
- [ ] Academic/property/determinism tests pass.
- [ ] Idempotency, transaction, outbox/inbox, and stale-version tests pass.
- [ ] Platform/accessibility P0 matrix passes.
- [ ] Security/privacy Milestone 1 gate passes.
- [ ] Failure injection for database, identity, storage/audio, queue, cache, and telemetry passes where implemented.
- [ ] No blocker/critical defect or expired quarantine/exception.
- [ ] Quality evidence manifest complete.
- [ ] Required owners sign off.

### 27.4 Production release done

Selain Milestone 1:

- full U01–U24 content and journey suites pass;
- assessment integrity/fairness/accommodation suites pass;
- Content Operations and offline suites pass;
- numbered platform matrix passes;
- migration, load, security, restore, and operations rehearsals pass;
- production SLO/alert/runbook evidence exists;
- legal/privacy/rights gates are approved.

## 28. Open Decisions

| ID | Keputusan | Default fail-closed | Owner |
|---|---|---|---|
| `QLTY-OPEN-001` | Exact CI provider dan report store | Gunakan vendor-neutral commands/artifacts; jangan mengunci release evidence di satu UI | Engineering/QA |
| `QLTY-OPEN-002` | Numeric latency/load/SLO target | Tidak klaim production-ready; tetapkan setelah traffic model di operations doc | Product/Operations/Engineering |
| `QLTY-OPEN-003` | Property-testing library | Mulai deterministic table/generator helper; library dipilih lewat ADR | Engineering |
| `QLTY-OPEN-004` | Device/browser cloud service | Local/physical matrix tetap authority sampai vendor approved | QA/Operations |
| `QLTY-OPEN-005` | Test management/evidence repository | Simpan versioned machine-readable artifact + links; tool dipilih saat setup | QA |
| `QLTY-OPEN-006` | Production synthetic account mechanism | Production smoke diblokir sampai isolation/exclusion policy tersedia | Operations/Data/Security |
| `QLTY-OPEN-007` | Exact coverage reporting threshold | Tidak memakai angka sebagai substitute; risk/requirement coverage tetap gate | QA/Engineering |

## 29. Acceptance Criteria Dokumen

Dokumen siap menjadi baseline jika:

1. risk register dan suite registry disetujui;
2. Milestone 1 acceptance matrix mewakili semua critical journey;
3. domain invariant, content, API/event, persistence, UI, accessibility, security, dan resilience mempunyai test owner;
4. time, randomness, data, provider, dan version dikontrol;
5. PR, nightly, RC, and production gates dibedakan;
6. blocker/critical tidak dapat di-waive;
7. flaky test tidak boleh diam-diam dibuat non-blocking;
8. evidence dan traceability contract dapat diaudit;
9. numeric production target yang belum diketahui tetap menjadi explicit blocker;
10. Definition of Done tetap menjadi authority final.

## 30. Decision Record

| ID | Keputusan | Status | Approver | Tanggal |
|---|---|---|---|---|
| `QLTY-001` | Quality strategy berbasis risk, invariant, dan traceability; coverage percentage hanya signal. | `approved` | QA + Engineering + Product | 13 September 2026 |
| `QLTY-002` | Vitest, Playwright, axe-core, runtime schema/OpenAPI, dan ephemeral PostgreSQL menjadi tooling baseline. | `approved` | Engineering + QA | 13 September 2026 |
| `QLTY-003` | Clock, randomness, provider, identity, dan VersionSet selalu dikontrol dalam automated tests. | `approved` | Engineering + QA | 13 September 2026 |
| `QLTY-004` | Evaluation, mastery, scheduler, idempotency, authorization, dan versioning wajib mempunyai invariant/property tests. | `approved` | Academic + Engineering + Security | 13 September 2026 |
| `QLTY-005` | Critical Milestone 1 journey memakai acceptance matrix `M1-E2E-001`–`018`. | `approved` | Product + QA + Engineering | 13 September 2026 |
| `QLTY-006` | Automated accessibility scan tidak menggantikan manual keyboard/AT/device verification. | `approved` | Accessibility + QA | 13 September 2026 |
| `QLTY-007` | Provider live tidak dipakai pada blocking PR tests; sandbox smoke tetap release gate. | `approved` | Engineering + QA + Operations | 13 September 2026 |
| `QLTY-008` | Flaky test adalah defect; P0 protection tidak boleh dihapus atau dibuat non-blocking tanpa replacement. | `approved` | QA + Engineering | 13 September 2026 |
| `QLTY-009` | Blocker/critical quality defect tidak dapat di-waive. | `approved` | Product + QA + affected owner | 13 September 2026 |
| `QLTY-010` | Release evidence harus merujuk immutable build, VersionSet, content manifest, platform matrix, dan gate results. | `approved` | QA + Operations + Product | 13 September 2026 |
