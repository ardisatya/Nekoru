# Implementation Roadmap Nekoru — MVP N5

**Status:** Draft v0.1  
**Tanggal:** 14 September 2026  
**Pemilik:** Product dan Engineering  
**Required reviewers:** Academic/Content, Design, Assessment, Accessibility, Security/Privacy, QA, Data, dan Operations  
**Cakupan:** Repository documentation-only sampai MVP pemula absolut–JLPT N5 production-ready  
**Status awal:** `Phase 0 — Implementation Foundation` / `not_started`  
**Model delivery:** Capability- dan evidence-gated; tanpa estimasi tanggal  
**Exposure policy:** Phase 0–4 hanya internal/staging; production baru diizinkan setelah Phase 5 `done`

## 1. Tujuan

Dokumen ini adalah roadmap eksekusi tunggal untuk mengubah baseline spesifikasi Nekoru menjadi MVP N5 yang dapat dirilis ke production. Roadmap menghubungkan:

1. dependency dan keputusan yang harus tersedia sebelum implementasi;
2. milestone produk serta workstream yang dapat berjalan paralel;
3. deliverable dan evidence yang harus dihasilkan;
4. blocker fail-closed yang harus ditutup pada fase pemakainya;
5. owner, approver, dan Definition of Done setiap fase;
6. gate subsystem serta gate production release.

Roadmap tidak menggantikan spesifikasi normatif. Ia menentukan urutan eksekusi dan kapan suatu fase boleh dianggap selesai. Perubahan API, event, schema, policy, target akademik, atau aturan assessment tetap dilakukan pada dokumen sumber dan decision record yang berwenang.

## 2. Sumber Kebenaran dan Authority

### 2.1 Sumber utama

- [Implementation Readiness](./implementation-readiness.md) — scope MVP, Milestone 1–5, dependency, entry, dan exit criteria.
- [Definition of Done](./definition-of-done.md) — kontrak `INC-*`, `SUB-*`, `REL-*`, evidence, exception, dan blocker `BLK-*`.
- [Technical Architecture](./technical-architecture.md) — system boundary, platform baseline, workstream teknis, serta jalur evolusi.
- [Test and Quality Plan](./test-and-quality-plan.md) — suite, fixture, CI gate, environment, dan test evidence.
- [Security, Privacy, and Data Governance](./security-privacy-data-governance.md) — trust boundary, data governance, serta production blocker.
- [Platform Support and Accessibility Matrix](./platform-support-and-accessibility-matrix.md) — support policy, version lock, dan accessibility evidence.
- [Domain Model and Schemas](./domain-model-and-schemas.md), [Learning Policy and Registry N5](./learning-policy-and-registry-n5.md), serta [API and Event Contracts](./api-and-event-contracts.md) — contract baseline untuk implementasi pertama.
- [Content Seed U01](../content/content-seed-u01.md), [Prototype and Usability Test](../ui-ux/09-prototype-usability-test.md), serta [Analytics and Implementation Handoff](../ui-ux/10-analytics-and-handoff.md) — seed, prototype, analytics, dan handoff Milestone 1.

Seluruh acceptance criteria pada dokumen domain, content, engine, assessment, dan UI/UX tetap berlaku walaupun tidak disalin ulang ke roadmap ini.

### 2.2 Hierarki keputusan

Jika sumber bertentangan, urutan berikut berlaku:

1. hukum, privacy/legal approval, security mandatory control, rights, dan keselamatan pengguna;
2. ADR berstatus `Accepted` untuk keputusan arsitektur yang dicakupnya;
3. dokumen berstatus `Approved` untuk scope dan versi yang dinyatakan;
4. source-of-truth domain untuk keputusan akademik, assessment, interaction, accessibility, atau operasi;
5. dokumen `Draft` sebagai proposal yang belum menjadi approval;
6. roadmap ini sebagai pengatur urutan, dependency, dan gate—bukan pembuat keputusan domain baru.

`implementation-readiness.md` menjadi authority struktur delivery: Phase 1–5 pada roadmap ini memetakan Milestone 1–5. Ringkasan Fase 1–4 pada `technical-architecture.md` dipakai sebagai workstream teknis pendukung, bukan struktur milestone pengganti.

### 2.3 Aturan fail-closed

- Rekomendasi, safe default, atau contoh pada dokumen sumber bukan approval.
- Placeholder `TBD`, dependency tidak tersedia, atau decision record yang belum disetujui tidak boleh diisi diam-diam oleh runtime.
- Capability dapat tetap disabled atau scope terkait dapat tetap internal selama blocker belum selesai.
- Production tidak boleh dirilis bila satu `SUB-*`, `REL-*`, mandatory gate, atau production blocker masih `not_started`, `failed`, atau `blocked`.

## 3. Baseline Kondisi Saat Ini

Pada saat roadmap ini dibuat:

| Area | Kondisi | Status roadmap |
| --- | --- | --- |
| Arsitektur | ADR-001 sampai ADR-005 telah `Accepted`. ADR lanjutan untuk asset, AI, offline, assessment integrity, dan retention belum tersedia. | Baseline tersedia; keputusan bootstrap tertentu masih terbuka. |
| Contract | Domain model, API/event, dan learning policy tersedia sebagai baseline approved. | Belum ada schema atau contract executable. |
| Akademik dan engine | Curriculum, progression, inventories, assessment, mastery, practice, dan learning engine tersedia sebagai draft spesifikasi. | Memerlukan approval bertahap sesuai scope fase. |
| U01 seed | Scope seed U01-L1 telah approved; asset, exact manifest hash, dan mandatory review belum selesai. | Belum runtime-ready. |
| Prototype | Research plan Milestone 1 approved; usability/accessibility test belum dieksekusi. | Handoff implementasi belum final. |
| UI/UX | Design system dan accessibility baseline tersedia; sebagian besar screen/flow specification masih draft. | Perlu prototype dan traceability ke contract. |
| Security/Privacy | Technical baseline tersedia; legal basis, retention, vendor handling, dan production incident ownership masih terbuka. | Nonproduction dapat berlanjut; production blocked. |
| Quality/Platform | Test plan serta platform baseline tersedia. | Belum ada CI, test suite, version lock, atau test evidence. |
| Repository | Belum ada aplikasi, package, migration, content artifact executable, atau test code. | Phase 0 `not_started`. |

Baseline ini adalah snapshot per 14 September 2026. Status aktual berikutnya harus dibaca dari milestone/gate record, bukan dari paragraf ini.

## 4. Model Tracking dan Gate

### 4.1 Status milestone dan fase

Setiap milestone dan fase menggunakan status berikut:

| Status | Arti |
| --- | --- |
| `not_started` | Belum ada artifact yang dapat direview. |
| `draft` | Artifact tersedia tetapi belum lengkap atau belum stabil. |
| `in_review` | Input dan version telah dikunci untuk review. |
| `revision_required` | Review menemukan perubahan yang wajib dilakukan. |
| `approved` | Artifact version telah disetujui owner berwenang. |
| `ready_to_start` | Seluruh entry criteria fase terpenuhi. |
| `in_implementation` | Implementasi berjalan terhadap contract yang telah disetujui untuk scope terkait. |
| `verification` | Implementasi selesai dan evidence sedang diverifikasi. |
| `done` | Seluruh DoD, evidence, dan sign-off fase lulus. |
| `blocked` | Dependency atau keputusan fail-closed mencegah scope terkait berlanjut. |

Status gate formal tetap mengikuti [Definition of Done](./definition-of-done.md): `not_started`, `in_review`, `passed`, `failed`, atau `blocked`. Status milestone tidak menggantikan status gate.

### 4.2 Record minimum milestone

Setiap milestone wajib mempunyai record machine-readable atau tabel ekuivalen dengan field berikut:

| Field | Ketentuan |
| --- | --- |
| `milestone_id` | ID stabil `P{phase}.{number}`. |
| `phase_id` | Salah satu `P0`–`P5`. |
| `scope` | Capability, journey, unit, subsystem, environment, dan version yang dicakup. |
| `owner` | Peran accountable atas delivery dan perbaikan. |
| `dependencies` | ID dependency, milestone, decision, atau gate yang harus tersedia. |
| `deliverables` | Artifact/version konkret yang dihasilkan. |
| `blockers` | `BLK-*` atau open decision yang memengaruhi aktivasi/kelulusan. |
| `evidence_links` | Test run, report, manifest, prototype, decision record, receipt, atau runbook drill. |
| `approvers` | Peran berwenang yang menyetujui evidence. |
| `status` | Salah satu status milestone pada Bagian 4.1. |
| `artifact_versions` | Commit/build, schema, policy, curriculum, content, evaluator, manifest, dan environment yang relevan. |
| `checked_at` | Wajib untuk `approved`, `verification`, dan `done`. |
| `blocking_reason` | Wajib untuk `blocked`; memuat dependency/decision, owner, dan affected scope. |

Contoh bentuk record:

```yaml
milestone_id: P1.4
phase_id: P1
scope: u01_l1_submission_to_mastery
owner: Engineering + Academic
dependencies: [P1.2, P1.3, DEP-002, DEP-003, DEP-005]
deliverables: [submission-service@version, evaluation-policy@version, evidence-fixtures@version]
blockers: []
evidence_links: []
approvers: [Engineering Lead, Academic Lead, QA Lead]
status: not_started
artifact_versions: {}
checked_at: null
blocking_reason: null
```

### 4.3 Aturan kelulusan fase

Sebuah fase hanya `done` jika:

1. seluruh milestone wajib pada fase tersebut `done`;
2. seluruh applicable `INC-*` lulus untuk increment yang masuk build fase;
3. seluruh DoD fase dibuktikan terhadap build dan artifact version yang sama;
4. tidak ada blocker/critical defect terbuka;
5. exception hanya digunakan sesuai Definition of Done dan tidak melewati mandatory gate;
6. sign-off seluruh approver fase tersedia dan dapat diaudit;
7. deferred scope mempunyai owner, target phase, dan safe behavior.

Evidence lama kembali `not_started` jika contract atau artifact version yang relevan berubah, kecuali compatibility review menyatakan evidence masih berlaku. Temuan blocker/critical atau perubahan material membuka kembali gate yang telah lulus.

## 5. Workstream Paralel

| Workstream | Tanggung jawab utama | Accountable owner |
| --- | --- | --- |
| Product dan governance | Scope, priority, decision registry, risk acceptance, phase/release sign-off. | Product Owner |
| Platform dan architecture | Monorepo, module boundary, database, contracts, deployment, idempotency, version/hash, integration. | Engineering Lead |
| Curriculum dan content | KC, inventory, progression, content pack, rights, validation, publication, correction. | Academic Lead + Content Operations |
| Learning, mastery, practice, assessment | Deterministic policy, runtime, evidence, mastery, scheduling, assessment, readiness. | Academic/Assessment + Engineering |
| Learner UI dan Content Operations UI | Journey, screen/state, recovery, responsive behavior, internal workflow. | Design + Engineering |
| Design system dan accessibility | Token/component contract, Japanese typography/input, assistive technology, construct equivalence. | Design Lead + Accessibility Lead |
| Security, privacy, data, operations | IAM, data governance, telemetry, provider boundary, retention, recovery, incident response. | Security/Privacy + Data + Operations |
| QA, observability, release evidence | Fixtures, CI gates, traceability, platform matrix, dashboards, release evidence. | QA Lead + Operations |

Workstream boleh mengerjakan artifact fase berikutnya lebih awal. Aktivasi runtime dan status fase tetap tunduk pada dependency serta gate fase yang berlaku.

## 6. Ringkasan Roadmap

| Phase | Pemetaan | Outcome | Exposure | Exit utama |
| --- | --- | --- | --- | --- |
| P0 | Readiness tambahan | Fondasi executable dan dependency walking skeleton siap. | Local/internal | `DEP-001`–`DEP-010`, bootstrap, seed, prototype, dan handoff siap. |
| P1 | Milestone 1 | U01-L1 berjalan end-to-end secara online dan deterministik. | Internal/staging | Journey, integrity, accessibility, dan traceability Milestone 1 lulus. |
| P2 | Milestone 2 | Stage S0 U01–U04 lengkap dan gate S0→S1 terbukti. | Internal/staging | Foundation content, interaction, delayed evidence, remedial, dan S0 gate lulus. |
| P3 | Milestone 3 | Domain inti U05–U20 dan Content Operations minimum tersedia. | Internal/staging | Lima domain belajar, adaptive workflow, dan content lifecycle terintegrasi. |
| P4 | Milestone 4 | U21–U24, assessment, simulation, dan `N5 Ready` lengkap. | Internal/staging | Content N5 dan assessment/readiness subsystem lulus. |
| P5 | Milestone 5 | Seluruh production blocker ditutup dan MVP dapat dioperasikan. | Production setelah sign-off | Semua `SUB-*`, `REL-*`, dan production sign-off `passed`. |

## 7. Phase 0 — Implementation Foundation

### 7.1 Tujuan

Mengubah baseline dokumentasi menjadi fondasi executable dan menutup dependency yang diperlukan untuk walking skeleton U01-L1.

### 7.2 Entry criteria

- Scope MVP U01–U24 dan scope walking skeleton U01-L1 tetap disetujui.
- ADR-001 sampai ADR-005 menjadi baseline arsitektur.
- Owner Product, Engineering, Academic, Design, Accessibility, Security/Privacy, QA, Data, dan Operations ditetapkan.
- Open decision dipisahkan antara keputusan yang memblokir bootstrap, Phase 1, fase berikutnya, atau production saja.

### 7.3 Milestone dan deliverable

| ID | Milestone | Deliverable minimum | Owner | Approver |
| --- | --- | --- | --- | --- |
| `P0.1` | Rekonsiliasi authority, decision registry, blocker registry, dan ownership. | Source map, decision registry, blocker-to-phase matrix, owner/approval matrix. | Product + Engineering | Product Owner + affected domain leads |
| `P0.2` | Putuskan detail bootstrap yang masih terbuka. | Decision record package naming, API framework, ORM/query builder, PostgreSQL major, JCS library, environment/deployment mapping, dan Clerk config. | Engineering + Data + Security + Operations | Engineering Lead + affected approvers |
| `P0.3` | Scaffold monorepo dan delivery foundation. | App/package topology, TypeScript strict, workspace/build config, CI baseline, environment/secret contract, initial migration, local workflow. | Engineering | Engineering Lead + Security + QA |
| `P0.4` | Buat contract dan validator executable. | Zod/JSON Schema, OpenAPI, event schema, policy registry U01, ID/version/hash library, golden fixtures, content validator. | Engineering + Academic/Data | Engineering Lead + Academic Lead + QA |
| `P0.5` | Selesaikan prototype, seed, auth, telemetry, dan handoff. | Approved U01 seed manifest/assets, P0 prototype/report, auth setup evidence, telemetry allowlist/redaction tests, screen→contract→test matrix. | Design + Academic + Engineering | Product + Accessibility + Security + QA |

`P0.2` harus mencatat keputusan tanpa mengubah boundary ADR. Jika keputusan memerlukan perubahan boundary, buat ADR baru atau superseding ADR sebelum `P0.3`.

### 7.4 Evidence minimum

- Decision records dan resolved-open-decision matrix.
- Dependency registry `DEP-001`–`DEP-010` dengan version, status, owner, dan approval.
- CI run untuk build, type-check, lint, unit, contract, migration, dan content validation.
- Empty-environment database migration report.
- Golden fixtures untuk ID, canonical JSON, hash, VersionSet, idempotency, API, dan event.
- Approved seed manifest dengan asset checksum, rights, review receipt, dan exact hash.
- Prototype research, accessibility, dan verification report.
- Auth/provider smoke test dan telemetry prohibited-data test.
- Implementation handoff traceability matrix.

### 7.5 Definition of Done

- [ ] `DEP-001`–`DEP-010` tersedia sebagai artifact versioned dan konsisten; dependency yang dipakai runtime telah approved.
- [ ] Repository mengikuti boundary ADR-001–ADR-005 dan dependency rules dapat diperiksa otomatis.
- [ ] Build, type-check, lint, unit-test, contract-test, migration, dan content-validation baseline berjalan di CI.
- [ ] Database dapat dibangun dari environment kosong.
- [ ] U01 seed mempunyai exact identifiers, registered policy/evaluator IDs, manifest hash, rights, asset, dan mandatory approvals.
- [ ] Prototype U01-L1 mencakup happy path, failure/recovery state, mobile/desktop, keyboard, screen reader, dan reflow; blocker/critical usability telah ditutup.
- [ ] Auth, telemetry, redaction, synthetic account, test fixture, dan environment boundary siap.
- [ ] Tidak ada keputusan terbuka yang dapat mengubah schema atau public contract Phase 1 secara mendasar.
- [ ] Product, Engineering, Academic, Design, Accessibility, Security, dan QA menyetujui readiness Phase 1.

### 7.6 Blocker dan deferral

- Keputusan package/framework/ORM/PostgreSQL/JCS/auth yang memengaruhi contract Phase 1 harus selesai pada Phase 0.
- ADR-006 sampai ADR-010 boleh dibuat pada fase pemakainya; tidak memblokir Phase 1 bila capability terkait tetap disabled.
- Full corpus N5, Content Operations UI, assessment, AI learner-data path, offline, dan production policies ditunda ke fase berikutnya.
- Phase 0 tidak memberikan production exposure.

## 8. Phase 1 — U01-L1 End-to-End Online

### 8.1 Tujuan

Membuktikan walking skeleton learner dari guest onboarding sampai evidence, mastery, review due, summary, dan resume yang tersimpan menggunakan contract generik U01–U24.

### 8.2 Entry criteria

- Phase 0 `done` dan seluruh dependency Phase 1 approved.
- Content seed U01-L1, policy, schema, API/event contract, prototype, test fixture, auth configuration, serta telemetry contract exact-version tersedia.
- Environment internal/staging, synthetic identity, secret boundary, dan provider-failure fixture siap.

### 8.3 Milestone dan deliverable

| ID | Milestone | Deliverable minimum | Owner | Approver |
| --- | --- | --- | --- | --- |
| `P1.1` | Guest onboarding, Clerk authentication, dan idempotent draft migration. | Entry/onboarding UI, guest draft store, identity reconciliation, migration receipt, recovery states. | Engineering + Design | Product + Security + QA |
| `P1.2` | Learner profile, initial U01 plan, Home, dan deterministic session planning. | Profile/plan APIs, version-locked planner, Home primary action, plan fixtures. | Engineering + Product/Academic | Product + Academic + QA |
| `P1.3` | Focused practice runtime. | Single-choice, select-to-pair, audio player tanpa autoplay, keyboard/AT semantics, technical-failure states. | Engineering + Design | Academic + Accessibility + QA |
| `P1.4` | Submission sampai mastery. | Idempotent submission, deterministic evaluation, feedback, candidate evidence, mastery calculation, review schedule. | Engineering + Academic | Engineering Lead + Academic Lead + QA |
| `P1.5` | Summary, progress, recovery, audit, dan telemetry. | Session summary, progress read model, retry/stale recovery, trace dashboard, privacy-safe product/technical events. | Engineering + Data/Design | Product + Security + Operations + QA |
| `P1.6` | Integrated verification dan sign-off. | Immutable staging build, complete test evidence, known-limitations record, phase approval receipts. | QA + Engineering | Seluruh phase approvers |

### 8.4 Evidence minimum

- E2E journey `guest → auth → plan → practice → evaluation → evidence → mastery → summary → resume`.
- Determinism/golden replay, duplicate, stale revision, provider/audio failure, redaction, authorization, dan migration tests.
- API/event contract report dan content exact-version selection evidence.
- Keyboard, NVDA, VoiceOver, TalkBack, 320 px, zoom 200%, reflow 400%, forced-colors, dan reduced-motion evidence sesuai applicable platform baseline.
- Trace report `plan → instance → submission → evaluation → evidence → mastery`.
- Phase sign-off dan known-limitations record.

### 8.5 Definition of Done

- [ ] Journey wajib Phase 1 lulus E2E pada mobile dan desktop internal target.
- [ ] Input dan `VersionSet` identik menghasilkan session, evaluation, mastery, dan decision hash identik.
- [ ] Duplicate auth migration, plan/session start, dan submission tidak menggandakan state atau evidence.
- [ ] Stale revision ditolak tanpa silent overwrite atau kehilangan input yang dapat dipertahankan.
- [ ] Runtime hanya memilih content `approved` dan exact-compatible.
- [ ] Failure audio/provider menjadi technical state, bukan kesalahan akademik.
- [ ] Raw answer tidak muncul pada generic log, analytics, atau error tracker.
- [ ] Completion, mastery, dan review due dipisahkan dalam API serta UI.
- [ ] Unit, property/determinism, contract, integration, E2E, security baseline, dan accessibility baseline lulus.
- [ ] Trace learner decision dapat direproduksi end-to-end.
- [ ] Known limitations menyatakan seed bukan U01 lengkap dan Phase 1 bukan production readiness.
- [ ] Product, Engineering, Academic, Design, Accessibility, dan QA memberikan sign-off.

### 8.6 Blocker dan deferral

- Full placement, formal Kanji/Grammar, Reading/Listening N5, checkpoint, simulation, readiness, Content Operations UI, gamification lengkap, AI, dan offline tetap disabled.
- Production retention, platform, assessment, dan operations blocker tidak memblokir staging Phase 1 selama capability terkait tidak diaktifkan dan data nonproduction dilindungi.
- Phase 1 tidak memberikan production exposure atau klaim efektivitas kurikulum penuh.

## 9. Phase 2 — Fondasi Lengkap U01–U04

### 9.1 Tujuan

Menyelesaikan Stage S0 dan memvalidasi progression pemula absolut menuju materi inti N5.

### 9.2 Entry criteria

- Phase 1 `done` dan contract Phase 1 terbukti dapat diperluas tanpa model khusus U01-L1.
- Inventory, content plan, interaction contract, S0 policy, serta prototype Kana/IME untuk U01–U04 tersedia dalam version review.
- Asset/audio/rights production pipeline untuk scope S0 siap digunakan.

### 9.3 Milestone dan deliverable

| ID | Milestone | Deliverable minimum | Owner | Approver |
| --- | --- | --- | --- | --- |
| `P2.1` | Lengkapi inventory dan approved content pack U01–U04. | Versioned S0 inventory, assets, rights, validation report, dan immutable manifests. | Academic/Content | Academic + Rights + Accessibility + QA |
| `P2.2` | Tambahkan interaction foundation dan delayed review. | Ordering, text/IME, Kana composer atau approved fallback, audio variants, delayed-review runtime. | Engineering + Design | Academic + Accessibility + QA |
| `P2.3` | Implementasikan beginner branch dan S0 gate. | Placement shortcut, prerequisite, remedial, gate S0→S1, reason codes, replay fixtures. | Learning/Engineering | Product + Academic + QA |
| `P2.4` | Validasi scaffolding dan media foundation. | Romaji policy evidence, speaker/glyph/font/audio QA, Kana preference decision, platform fixtures. | Academic + Accessibility + Design | Product + Engineering + QA |
| `P2.5` | Integrated S0 verification. | U01–U04 E2E suite, retention/remedial report, progress UI, expandability review, phase receipts. | QA + Engineering | Seluruh phase approvers |

### 9.4 Evidence minimum

- S0 inventory/distribution dan Content Masterability validation report.
- Approved content/rights/asset manifests U01–U04.
- Direct, breadth, variation, dan delayed-evidence fixtures untuk required KC.
- Romaji removal, Kana composer/IME, speaker variation, audio failure, glyph/font, serta accessibility reports.
- S0 gate deterministic replay, localized remedial, and historical-evidence compatibility tests.
- U01–U04 E2E dan contract-expandability review.

### 9.5 Definition of Done

- [ ] Distribusi S0 tervalidasi: 100 Vocabulary, 0 Kanji formal, 0 Grammar formal, 46 Reading, dan 44 Listening objects.
- [ ] Seluruh 46 hiragana dan 46 katakana dasar, sound/mora, dakuten, handakuten, yoon, sokuon, dan long vowel mempunyai coverage serta evidence yang diwajibkan.
- [ ] Required KC mempunyai direct, breadth, dan delayed evidence sesuai policy.
- [ ] Formulaic chunks tidak menghasilkan Grammar mastery; handwriting dan pitch accent tidak menjadi gate.
- [ ] Beginner path dan S0 gate deterministic, explainable, versioned, dan reproducible.
- [ ] Romaji tidak dapat melewati removal policy atau muncul pada checkpoint.
- [ ] Technical input/audio/glyph failure tidak menghukum learner.
- [ ] `BLK-KANA-001` dan `BLK-KANA-002` diselesaikan untuk scope yang diaktifkan, atau approved fallback dipakai tanpa klaim capability yang diblokir.
- [ ] Seluruh U01–U04 journey lulus pada internal platform matrix tanpa blocker/critical defect.
- [ ] Contract tetap generik untuk U05–U24 dan tidak memerlukan fork khusus S0.
- [ ] Product, Academic, Engineering, Design, Accessibility, dan QA memberikan sign-off.

### 9.6 Blocker dan deferral

- Jika Kana composer belum approved, activity menggunakan OS IME atau approved replacement; capability composer tidak boleh diklaim selesai.
- Full core-domain curriculum, Content Operations UI, high-stakes assessment, AI, dan offline tetap ditunda.
- Phase 2 tidak memberikan production exposure.

## 10. Phase 3 — Domain Inti U05–U20

### 10.1 Tujuan

Menghadirkan pembelajaran inti Vocabulary, Kanji, Grammar, Reading, dan Listening beserta adaptive learning workflow dan Content Operations minimum.

### 10.2 Entry criteria

- Phase 2 `done`; S0 gate dan contract lintas-domain stabil.
- Inventory, prerequisite graph, requiredness, evidence mapping, content plan, dan interaction registry U05–U20 tersedia untuk review.
- Content Operations authority/RBAC/SoD contract, asset pipeline, serta publication manifest contract approved.
- AI tetap disabled kecuali seluruh approval yang diwajibkan tersedia.

### 10.3 Milestone dan deliverable

| ID | Milestone | Deliverable minimum | Owner | Approver |
| --- | --- | --- | --- | --- |
| `P3.1` | Approve inventory, graph, taxonomy, dan content pack U05–U20. | Domain inventories, prerequisite graph, KC/evidence mappings, rights, coverage report, release manifests. | Academic/Content | Academic + Product + Rights + Accessibility |
| `P3.2` | Perluas Practice Engine. | Seluruh interaction/evaluation mode untuk lima domain, accessibility alternatives, failure/recovery behavior. | Engineering + Design/Academic | Practice + Accessibility + QA |
| `P3.3` | Aktifkan adaptive learning workflow. | Cross-domain evidence/mastery, review, remedial, calendar, missed-session replan, reason codes, decision hashes. | Learning/Engineering | Product + Academic + QA |
| `P3.4` | Bangun Content Operations minimum. | Authoring, validation, review, approval, publication, issue, quarantine, correction, rollback, audit. | Engineering + Content Operations | Academic + Security + Product + QA |
| `P3.5` | Tambahkan derived gamification. | XP, level, streak, achievement, immutable source-event mapping, anti-gaming rules. | Product + Engineering | Academic + Data + QA |
| `P3.6` | Aktifkan constrained AI bila approved. | AI adapter, structured output, pending/retry/adjudication, redaction, provider audit, deterministic fallback. | Engineering + Security/Privacy | Product + Academic + Security + QA |

### 10.4 Evidence minimum

- Approved content, rights, coverage, prerequisite, and exact release manifests U05–U20.
- Five-domain interaction/evaluation contract and E2E reports.
- Cross-domain evidence attribution, calendar/replan, review/remedial, determinism, stale, duplicate, dan historical-replay tests.
- Content Operations authorization, SoD, lifecycle, concurrent-edit, publication, quarantine, correction, and rollback evidence.
- Gamification derivation and no-academic-authority tests.
- AI disabled/failure evidence; bila diaktifkan, approved data-flow/threat model, schema validation, provider configuration, pending/adjudication, deletion, dan redaction tests.
- Applicable phase-scoped `SUB-*` evidence reports.

### 10.5 Definition of Done

- [ ] Seluruh target U05–U20 mempunyai approved inventory, content pool, prerequisite, primary/supporting KC mapping, rights, dan exact release manifest.
- [ ] Vocabulary, Kanji, Grammar, Reading, dan Listening berjalan end-to-end tanpa runtime menciptakan mapping akademik baru.
- [ ] Review, remedial, missed-session replan, dan calendar adjustment tidak memberi mastery penalty atau beban tersembunyi.
- [ ] Content Operations menegakkan backend RBAC, active role, optimistic concurrency, separation of duties, immutable publication, quarantine, dan rollback.
- [ ] Published content tidak diedit in-place; correction tidak menulis ulang historical evidence.
- [ ] XP, streak, level, dan achievement tidak menjadi authority progression.
- [ ] AI-disabled dan AI-failure paths lulus; semi-open response yang tidak dapat dinilai menjadi `pending`, bukan incorrect.
- [ ] `BLK-AI-001` resolved sebelum learner-data AI path diaktifkan; jika belum, AI tetap disabled tanpa memblokir objective journey.
- [ ] Applicable feature gates untuk `SUB-CONTENT`, `SUB-LEARNING`, `SUB-PRACTICE`, `SUB-LEARNER-UI`, dan `SUB-OPS-UI` lulus untuk scope U05–U20.
- [ ] Security, privacy, accessibility, failure, performance, dan content-build suites lulus pada staging.
- [ ] Seluruh owner workstream terkait memberikan phase sign-off.

### 10.6 Blocker dan deferral

- AI bersifat optional untuk kelulusan Phase 3 bila objective path dan approved deterministic/semi-open-safe scope memenuhi journey yang dijanjikan; AI tidak boleh diaktifkan sebelum `BLK-AI-001` selesai.
- Final N5 requiredness, S5 content decisions, high-stakes assessment, simulation, dan readiness ditunda ke Phase 4.
- Offline dan seluruh production gate ditunda ke Phase 5.
- Phase 3 tidak memberikan production exposure.

## 11. Phase 4 — U21–U24, Assessment, dan N5 Readiness

### 11.1 Tujuan

Melengkapi content N5, assessment berisiko tinggi, simulation, dan keputusan internal `N5 Ready`.

### 11.2 Entry criteria

- Phase 3 `done`; five-domain learning, content lifecycle, dan traceability stabil.
- Requiredness proposal, S5 progression decision, assessment/accommodation policy, simulation blueprint, item-pool plan, dan reference form tersedia untuk approval.
- Assessment security, timer, answer-secrecy, exposure, adjudication, and fairness fixtures siap sebelum implementation.

### 11.3 Milestone dan deliverable

| ID | Milestone | Deliverable minimum | Owner | Approver |
| --- | --- | --- | --- | --- |
| `P4.1` | Finalisasi N5 requiredness dan progression. | Classification manifest, LevelMasteryProfile N5, S5 decision record, updated inventories/manifests. | Academic + Product | Academic Lead + Product Owner |
| `P4.2` | Finalisasi assessment policy dan assembly. | Accommodation profiles, construct-equivalence report, simulation blueprint, quota/pool/replay policy, reference form. | Assessment + Academic + Accessibility | Product + Security + QA |
| `P4.3` | Implementasikan assessment lifecycle. | Placement, verification, checkpoint, cumulative review, run/timer, scoring, feedback hold, invalidation, adjudication. | Engineering + Assessment | Assessment Lead + Security + QA |
| `P4.4` | Produksi simulation forms. | Minimal dua approved equivalent 67-item forms, locked manifests, rights, overlap/equivalence report. | Assessment + Content | Academic + Accessibility/Fairness + QA |
| `P4.5` | Aktifkan readiness dan calibration baseline. | Readiness calculator, decision hash, fairness/calibration report, audit dashboard, monitoring registry. | Academic/Data/Engineering | Product + Assessment + QA |
| `P4.6` | Lengkapi UI dan integrated verification. | Learner/Content Ops assessment journeys, accessibility matrix, integrity/security/E2E evidence, phase receipts. | Design + Engineering + QA | Seluruh phase approvers |

### 11.4 Evidence minimum

- Decision record dan approved manifests untuk seluruh blocker akademik/assessment Phase 4.
- Full curriculum/content reconciliation dan Content Masterability report.
- Assessment deterministic scoring, timer, duplicate, resume/grace, concurrency, invalidation, retake, exposure, answer-leakage, and adjudication tests.
- Two-form equivalence, overlap, coverage, rights, accessibility, and fairness reports.
- Readiness replay dari exact evidence/policy/form/calculation versions.
- Complete `SUB-CONTENT`, `SUB-LEARNING`, dan `SUB-ASSESSMENT` evidence; applicable UI/practice evidence.

### 11.5 Definition of Done

- [ ] `BLK-CONTENT-001`, `BLK-PROG-001`, `BLK-PROG-002`, `BLK-ASSESS-001`, dan `BLK-ASSESS-002` resolved melalui decision record dan approval.
- [ ] Seluruh U01–U24, 120 lesson packages, inventory target, Reading/Listening objects, prerequisite, rights, dan masterability contract lengkap serta dapat direkonsiliasi otomatis.
- [ ] Assessment memakai locked manifest, server-authoritative timer, deterministic scoring, exposure control, answer secrecy, idempotency, dan immutable adjudication.
- [ ] Minimal dua simulation form approved, equivalent, tidak mempunyai overlap terlarang, dan memenuhi scoring/readiness policy.
- [ ] Technical skip, audio failure, accommodation, resume/grace, retake, concurrency, dan invalidation tidak menghasilkan score atau evidence keliru.
- [ ] Readiness dapat direproduksi dari exact evidence, policy, assessment forms, dan calculation hash.
- [ ] Fairness, accessibility, assessment integrity, calibration baseline, dan audit trace lulus.
- [ ] `SUB-CONTENT`, `SUB-LEARNING`, dan `SUB-ASSESSMENT` berstatus `passed`; applicable UI/practice gates juga lulus.
- [ ] Build tetap internal/staging dan tidak membuat klaim kelulusan JLPT atau production readiness.
- [ ] Product, Academic, Assessment, Engineering, Accessibility/Fairness, Security/Privacy, dan QA memberikan sign-off.

### 11.6 Blocker dan deferral

- Assessment/readiness tetap disabled bila salah satu blocker Phase 4 belum resolved.
- `N5 Ready` adalah status internal berbasis policy; tidak boleh dipresentasikan sebagai jaminan lulus JLPT.
- Offline, final platform support, retention/legal, RPO/RTO, dan production operations ditunda ke Phase 5.
- Phase 4 tidak memberikan production exposure.

## 12. Phase 5 — Production Hardening dan Release

### 12.1 Tujuan

Menutup seluruh blocker production dan membuktikan bahwa MVP N5 aman, dapat diakses, dapat dioperasikan, didukung, dipantau, serta dapat dipulihkan.

### 12.2 Entry criteria

- Phase 4 `done`; full MVP functional scope tersedia pada staging.
- Daftar production blocker, vendor, data class, supported journey, release candidate, dan accountable approver lengkap.
- Production-like environment, synthetic account, load/failure tooling, backup, observability, serta runbook draft siap untuk verifikasi.

### 12.3 Milestone dan deliverable

| ID | Milestone | Deliverable minimum | Owner | Approver |
| --- | --- | --- | --- | --- |
| `P5.1` | Finalisasi offline practice. | Activation UX, signed package, local evaluator, IndexedDB queue, sync receipt, expiry/conflict/recovery, replan. | Engineering + Product/Design | Academic + Accessibility + Security + QA |
| `P5.2` | Finalisasi trust dan data governance. | Legal basis/notice, consent/age policy, vendor registry, analytics policy, retention schedule, export/deletion/legal hold/purge, AI data policy. | Security/Privacy/Legal | Product + Data + Operations |
| `P5.3` | Kunci supported platform matrix. | Immutable OS/browser/device/AT version lock, physical-device results, accommodation scope, support statement. | QA + Accessibility | Product + Engineering + Support |
| `P5.4` | Finalisasi production operations. | Approved SLI/SLO, RPO/RTO, backup retention, on-call, escalation, incident classification, dashboards, alerts, runbooks. | Operations + Engineering | Security + Product |
| `P5.5` | Jalankan hardening dan recovery drills. | Security/load/failure reports, migration/restore/rollback evidence, provider/queue/cache/offline drills, defect closure. | QA + Engineering + Operations | Affected domain leads |
| `P5.6` | Bentuk dan sign-off release candidate. | Immutable RC manifest, complete gate registry, smoke/monitoring/rollback plan, production approval receipts. | Product + Release Manager | Seluruh production approvers |

### 12.4 Evidence minimum

- Signed offline package, local-evaluation equivalence, queue/sync idempotency, expired/tampered package, conflict, dan replan tests.
- Approved legal/privacy/vendor/retention/AI decision records dan subject-operation drill receipts.
- Numbered platform matrix with keyboard, NVDA, VoiceOver, TalkBack, IME/Kana, media, zoom/reflow, forced-colors, reduced-motion, and physical-device evidence.
- Approved SLI/SLO/RPO/RTO, dashboards, alerts, on-call roster, escalation path, and runbooks.
- Security, load, slow-network, provider failure, queue/DLQ, cache-loss, migration, backup restore, rollback, and offline-conflict reports.
- Immutable release manifest dan complete `INC-*`, `SUB-*`, `REL-*`, blocker, exception, and sign-off registry.

### 12.5 Definition of Done

- [ ] Seluruh `BLK-*` yang memengaruhi release resolved; tidak ada default tersembunyi.
- [ ] Delapan subsystem gate `SUB-*` berstatus `passed` terhadap release candidate yang sama.
- [ ] `REL-PRODUCT`, `REL-CONTENT`, `REL-ENGINEERING`, `REL-ACCESSIBILITY`, `REL-TRUST`, `REL-OPERATIONS`, dan `REL-SIGNOFF` seluruhnya `passed`.
- [ ] Tidak ada blocker/critical defect; major hanya mempunyai exception sah, time-bound, dan tidak memengaruhi critical journey.
- [ ] Exact schema, curriculum, content, policy, evaluator, asset, assessment form, platform matrix, dan release manifest dikunci.
- [ ] Backup restore, rollback, migration, provider failure, queue/DLQ, cache loss, slow-network, reconnect, dan offline conflict drill berhasil pada production-like environment.
- [ ] Security, privacy, rights, accessibility, fairness, performance, dan answer-secrecy review lulus.
- [ ] Dashboard dan trace menghubungkan release sampai learner decision tanpa mengekspos data sensitif.
- [ ] Smoke test dan rollback criteria tersedia; instrumentation failure tidak memengaruhi transaksi akademik.
- [ ] Seluruh production sign-off pada Definition of Done tersedia dan dapat diaudit.
- [ ] Production exposure baru diaktifkan setelah seluruh checklist di atas lulus.

### 12.6 Blocker dan release policy

Phase 5 tidak `done` sampai blocker berikut dan seluruh turunannya selesai:

- `BLK-PRIV-001` — retention dan data lifecycle;
- `BLK-PLATFORM-001` dan `BLK-AT-001` — supported platform/AT matrix;
- `BLK-ASSESS-001` — assessment accommodation;
- `BLK-OPS-001` — RPO/RTO, backup, restore, dan incident ownership;
- `BLK-AI-001` — bila AI learner-data path masuk release;
- `BLK-OFFLINE-001` — offline activation dan failure presentation;
- `BLK-DRAFT-001` — bila internal draft persistence lintas-refresh masuk production Content Operations;
- seluruh blocker content, progression, simulation, Kana, rights, security, dan privacy yang masih memengaruhi release candidate.

Tidak ada scope produksi yang didefer setelah `REL-SIGNOFF` tanpa memperbarui release scope, applicability record, user-facing support statement, dan approval seluruh affected owner.

## 13. Dependency dan Parallelization Rules

### 13.1 Urutan aktivasi

Urutan resmi runtime adalah:

```text
P0 → P1 → P2 → P3 → P4 → P5 → Production
```

- Fase berikutnya tidak menjadi `in_implementation` sebelum fase sebelumnya `done`.
- Pekerjaan nondependent boleh dimulai lebih awal sebagai `draft`, misalnya content production U02–U24, assessment-form design, privacy/legal review, platform-lab setup, dan operations planning.
- Artifact fase berikutnya tidak boleh diaktifkan runtime sebelum entry gate fase pemakainya lulus.

### 13.2 Critical path

Critical path minimum adalah:

```text
bootstrap decisions
→ executable contracts and repository foundation
→ approved U01 seed and prototype handoff
→ U01-L1 walking skeleton
→ complete S0 and reusable cross-domain contracts
→ five-domain learning and content lifecycle
→ complete N5 content and assessment/readiness
→ trust/platform/operations/offline hardening
→ production sign-off
```

Content production, rights review, accessibility validation, privacy/legal, dan operations tidak boleh ditunda sampai fase aktivasi karena masing-masing dapat menjadi critical-path blocker.

### 13.3 Capability activation

- AI tetap disabled sampai `BLK-AI-001` resolved dan provider/data-flow evidence approved.
- Offline tetap unavailable sampai `BLK-OFFLINE-001` dan integrity/sync tests lulus.
- Assessment/readiness tetap unavailable sampai seluruh blocker Phase 4 resolved.
- Optional product analytics tetap off sampai consent/provider/retention policy approved; functional telemetry tetap mengikuti allowlist.
- Unsupported platform tidak menerima klaim compatibility atau support di luar version-lock evidence.

### 13.4 Change control

Perubahan artifact `approved` setelah implementasi dimulai wajib:

1. membuat version baru;
2. mencatat change class dan owner;
3. menjalankan contract/migration/compatibility impact review;
4. menentukan gate/evidence yang kembali `not_started`;
5. melakukan selective re-verification;
6. mempertahankan historical evidence dan exact version reference;
7. menyediakan rollback target sebelum aktivasi.

## 14. Pemetaan Fase Arsitektur

Pemetaan ini mencegah ringkasan delivery pada Technical Architecture menjadi roadmap paralel:

| Technical Architecture | Roadmap ini | Interpretasi |
| --- | --- | --- |
| Fase 1 — Fondasi online | P0 + P1, lalu perluasan P2 | Bootstrap dan online walking skeleton; S0 menjadi perluasan fondasi. |
| Fase 2 — Workflow lengkap | P3 + P4 | Content Operations, five-domain workflow, AI opsional, assessment, dan readiness. |
| Fase 3 — Hardening MVP | P5 | Offline, accessibility/platform, trust, operations, dan production release. |
| Fase 4 — Evolusi N4–N1 | Di luar roadmap | Memerlukan roadmap baru setelah MVP N5 terbukti dan production baseline stabil. |

## 15. Pemetaan Gate ke Fase

| Gate/dependency | Target utama | Catatan |
| --- | --- | --- |
| `DEP-001`–`DEP-010` | P0 | Wajib tersedia sebelum P1. |
| `INC-*` | P0–P5 | Berlaku pada setiap increment sesuai applicability. |
| `SUB-CONTENT` | P4 | Evidence dibangun sejak P0; full subsystem lulus setelah content N5 lengkap. |
| `SUB-LEARNING` | P4 | Core berjalan sejak P1; full N5 lulus pada P4. |
| `SUB-PRACTICE` | P5 | Online core sejak P1; full subsystem termasuk offline lulus pada P5. |
| `SUB-ASSESSMENT` | P4 | Aktif dan lulus setelah assessment/readiness lengkap. |
| `SUB-LEARNER-UI` | P5 | Coverage bertambah per fase; full supported journey lulus pada P5. |
| `SUB-OPS-UI` | P5 | Minimum tersedia P3; full production/recovery scope lulus P5. |
| `SUB-ACCESSIBILITY` | P5 | Incremental sejak P0; full locked platform matrix lulus P5. |
| `SUB-PLATFORM` | P5 | Fondasi sejak P0; production operations dan recovery lulus P5. |
| `REL-*` | P5 | Seluruh release gate harus merujuk RC yang sama. |

Phase-scoped evidence tidak boleh diberi label full `SUB-* passed` jika criterion subsystem di luar scope fase belum selesai. Gunakan increment gate dan explicit coverage report sampai full subsystem benar-benar lulus.

### 15.1 Dependency target Phase 0

| Dependency | Artifact | Owner | Resolution target |
| --- | --- | --- | --- |
| `DEP-001` | Domain model untuk journey Phase 1 | Engineering + Product | `P0.4` |
| `DEP-002` | Executable schemas profile, curriculum, session, practice, evaluation, evidence, mastery, dan event | Engineering | `P0.4` |
| `DEP-003` | Policy pack U01 untuk mastery, review, practice, feedback, evidence, reason code, dan prerequisite | Academic + Engineering | `P0.4` |
| `DEP-004` | Approved U01 seed manifest, asset, rights, validation, dan approval | Academic/Content | `P0.5` |
| `DEP-005` | OpenAPI onboarding, profile, plan, session, submission, mastery, dan summary | Engineering | `P0.4` |
| `DEP-006` | Versioned event registry, payload, producer/consumer, dedupe, dan privacy class | Engineering + Data | `P0.4` |
| `DEP-007` | Prototype P0 dengan responsive, failure, dan accessibility state | Design | `P0.5` |
| `DEP-008` | Acceptance fixtures happy path, duplicate, stale, provider/audio failure, dan accessibility | QA + Engineering | `P0.5` |
| `DEP-009` | Auth environment, redirect/origin, session, identity mapping, email delivery, dan failure behavior | Engineering + Security | `P0.2` dan `P0.5` |
| `DEP-010` | Telemetry allowlist, correlation, sampling, redaction, dan success metrics | Data + Security + Product | `P0.5` |

### 15.2 Blocker resolution target

| Blocker | Owner/approver | Target | Perilaku sebelum resolved |
| --- | --- | --- | --- |
| `BLK-PRIV-001` | Privacy/Legal + Security + Product | `P5.2` | Production blocked; tidak ada retention duration asumtif. |
| `BLK-CONTENT-001` | Academic/Content + Product | `P4.1` | Target tanpa klasifikasi tidak masuk readiness denominator. |
| `BLK-PLATFORM-001` | Product + Engineering + Accessibility | `P5.3` | Kombinasi yang belum lulus version lock tidak diklaim supported. |
| `BLK-ASSESS-001` | Academic/Assessment + Accessibility + Product | `P4.2` | Alternative yang belum equivalent tidak menghasilkan scored evidence. |
| `BLK-OPS-001` | Operations + Security + Product | `P5.4`–`P5.5` | Production blocked sampai objective dan restore drill lulus. |
| `BLK-AI-001` | Privacy/Legal + Security + Product | `P3.6` bila AI diaktifkan; paling lambat `P5.2` bila masuk RC | AI learner-data path disabled; objective path tetap tersedia. |
| `BLK-PROG-001` | Academic/Content + Product | `P4.1` | S5 pack terkait tidak dapat approved. |
| `BLK-PROG-002` | Product + Design + Academic | `P4.1` dan `P4.6` | Navigation/screen terkait tidak dapat dinyatakan Done. |
| `BLK-ASSESS-002` | Assessment + Academic + Product | `P4.2`–`P4.4` | Simulation dan readiness tidak aktif. |
| `BLK-OFFLINE-001` | Product + Engineering + Design + Privacy | `P5.1` | Offline unavailable; tidak ada silent download. |
| `BLK-DRAFT-001` | Security/Privacy + Content Operations + Product | `P5.2` sebelum production Content Operations | Draft tidak dipersist lintas-refresh tanpa approved policy. |
| `BLK-KANA-001` | Design + Accessibility + Academic + Engineering | `P2.2`–`P2.4` | Gunakan OS IME atau approved replacement; composer tidak diklaim production-ready. |
| `BLK-KANA-002` | Product + Design + Privacy | `P2.4` | Input preference tidak disimpan. |
| `BLK-AT-001` | Product + Accessibility | `P5.3` | JAWS tetap sampling dan tidak diklaim sebagai support rutin. |

## 16. Validasi dan Acceptance Criteria Dokumen

Dokumen roadmap dapat diberi status `Approved` jika:

1. setiap Milestone 1–5 pada Implementation Readiness memiliki tepat satu mapping Phase 1–5;
2. Phase 0 menampung repository/bootstrap dan seluruh dependency sebelum walking skeleton;
3. setiap fase mempunyai goal, entry criteria, milestone, deliverable, owner, approver, evidence, DoD, blocker, dan explicit deferral;
4. seluruh `DEP-*`, `BLK-*`, `SUB-*`, dan `REL-*` yang berlaku mempunyai target fase dan owner resolution;
5. tidak ada criterion roadmap yang melemahkan Definition of Done atau source-of-truth akademik;
6. Phase 0–4 secara eksplisit tidak mengizinkan production exposure;
7. setiap internal link dan identifier valid;
8. status awal sesuai kondisi repository dan tidak mengklaim artifact executable yang belum ada;
9. pekerjaan paralel tidak dapat mengaktifkan capability sebelum gate pemakainya lulus;
10. Product, Engineering, Academic, Design, Assessment, Accessibility, Security/Privacy, QA, Data, dan Operations menyetujui baseline.

### 16.1 Acceptance scenarios

Roadmap harus menghasilkan keputusan berikut:

1. Dependency Phase 1 belum approved → P1 `blocked`, walaupun scaffold sudah dibangun.
2. Seed/content belum approved → runtime tidak boleh memilihnya dan phase terkait bukan `done`.
3. Duplicate submission menghasilkan dua evidence → applicable `INC-INTEGRITY` gagal dan phase bukan `done`.
4. Critical accessibility defect terbuka → affected phase/gate gagal; exception dilarang.
5. AI privacy approval belum ada → AI tetap disabled; objective path dapat berlanjut.
6. Simulation forms belum equivalent → P4 dan `SUB-ASSESSMENT` tidak dapat lulus.
7. Retention policy belum disetujui → P5 dan production release `blocked`.
8. Backup tersedia tetapi restore drill gagal → `SUB-PLATFORM` dan `REL-OPERATIONS` gagal.
9. Semua technical test lulus tetapi content N5 belum lengkap → P4/P5 dan `REL-CONTENT` belum lulus.
10. Semua gate lulus tetapi satu sign-off wajib belum ada → `REL-SIGNOFF=blocked`; production tidak boleh diaktifkan.
11. Evidence berasal dari artifact version lama → gate kembali `not_started` kecuali compatibility review lulus.
12. Pekerjaan P4 selesai lebih awal saat P3 belum `done` → artifact boleh `approved`, tetapi P4 tidak menjadi `in_implementation` atau `done`.

## 17. Asumsi dan Batas

- Roadmap berakhir pada MVP N5 production. N4–N1 hanya menjadi arah evolusi dan memerlukan roadmap baru.
- Roadmap tidak menggunakan tanggal kalender atau estimasi sprint sampai capacity planning terpisah tersedia.
- Phase 0 + Milestone 1–5 adalah struktur normatif delivery.
- Hanya internal/staging build yang diizinkan sebelum Phase 5 selesai.
- Status `done` selalu memerlukan evidence dan approval eksplisit; tidak adanya defect bukan bukti kelulusan.
- Satu orang boleh memegang beberapa peran hanya jika authority matrix mengizinkan; separation of duties tetap wajib untuk content approval dan high-risk action.
- Kalibrasi berbasis data MVP boleh mengubah baseline melalui versioned proposal, review, migration impact, dan Product approval; runtime tidak boleh melakukan self-modification.
- Roadmap tidak mengubah API, event, schema, policy, target content, atau assessment rule yang sudah ada.

## 18. Approval Record

| Role | Scope approval | Status | Artifact/version | Approver | Timestamp |
| --- | --- | --- | --- | --- | --- |
| Product Owner | Scope, phase model, exposure policy, risk acceptance | `not_started` | — | — | — |
| Engineering Lead | Architecture mapping, dependencies, implementation gates | `not_started` | — | — | — |
| Academic Lead | Content, KC, mastery, progression, phase academic gates | `not_started` | — | — | — |
| Assessment Lead | Assessment, simulation, readiness, fairness gates | `not_started` | — | — | — |
| Design Lead | Prototype, learner/ops journeys, interaction handoff | `not_started` | — | — | — |
| Accessibility Lead | WCAG, platform/AT, construct-equivalence gates | `not_started` | — | — | — |
| Security/Privacy | Identity, data, provider, retention, production trust gates | `not_started` | — | — | — |
| QA Lead | Test strategy, evidence, defect, and phase verification | `not_started` | — | — | — |
| Data Lead | Schema, telemetry, analytics, audit, and reproducibility | `not_started` | — | — | — |
| Operations Lead | Deployment, observability, recovery, and release operations | `not_started` | — | — | — |

Persetujuan harus menunjuk exact document version dan tidak boleh diwakili oleh persetujuan lisan.
