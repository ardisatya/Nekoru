# Implementation Readiness Nekoru — MVP N5

**Status:** Approved v1.0 untuk baseline implementasi  
**Tanggal:** 13 September 2026  
**Pemilik:** Product dan Engineering  
**Required reviewers:** Academic/Content, Design, Assessment, Accessibility, Security/Privacy, QA, dan Operations  
**Cakupan produk:** Pemula absolut, U01–U24, sampai status internal `N5 Ready`  
**Cakupan delivery pertama:** U01 end-to-end, online-only, dengan content seed tervalidasi

## 1. Tujuan

Dokumen ini menjadi gerbang keputusan antara spesifikasi dan implementasi. Ia menetapkan:

1. ruang lingkup MVP dan urutan delivery;
2. walking skeleton pertama yang harus dibuktikan;
3. dependency yang wajib tersedia sebelum sebuah milestone dimulai;
4. keputusan yang sudah dikunci dan keputusan yang tetap fail-closed;
5. owner, approval, evidence, dan exit criteria setiap milestone;
6. batas antara kesiapan memulai implementasi dan kesiapan production release.

Dokumen ini tidak menggantikan spesifikasi produk, akademik, engine, UI/UX, keamanan, atau Definition of Done. Jika terdapat konflik, dokumen sumber yang memiliki kewenangan atas keputusan terkait tetap berlaku.

## 2. Dokumen Sumber

- [Product Overview](./product-overview.md)
- [Curriculum Architecture](./curriculum-architecture.md)
- [Content Progression N5](../content/content-progression-n5.md)
- [Learning Engine](./learning-engine.md)
- [Mastery Specification](./mastery-specification.md)
- [Practice Engine](./practice-engine.md)
- [Assessment Specification N5](./assessment-specification-n5.md)
- [Technical Architecture](./technical-architecture.md)
- [Definition of Done](./definition-of-done.md)
- [UI/UX Overview](../ui-ux/01-ui-ux-overview.md)
- [User Flows](../ui-ux/03-user-flows.md)
- [Learner Screen Specifications](../ui-ux/04-screen-specifications-learner.md)
- [Practice Interactions](../ui-ux/06-practice-interactions.md)
- [Accessibility, Content, and Edge Cases](../ui-ux/08-accessibility-content-and-edge-cases.md)

## 3. Keputusan Implementasi Utama

| Area | Keputusan |
| --- | --- |
| Scope produk | Seluruh U01–U24 tetap menjadi scope MVP N5. |
| Strategi delivery | Implementasi dilakukan bertahap melalui vertical slice; tidak menunggu seluruh corpus N5 selesai untuk membuktikan fondasi teknis. |
| Milestone pertama | U01 end-to-end sebagai walking skeleton. |
| Mode milestone pertama | Online-only. Offline package, local evaluator, dan synchronization ditunda. |
| Konten milestone pertama | Seed konten U01 yang versioned dan telah melewati review minimum; tidak memakai konten draft bebas pada runtime. |
| Autentikasi learner | Clerk dengan Google Sign-In dan email link; tanpa password lokal. |
| Guest onboarding | Goal dan availability boleh disimpan sebagai draft tamu; akun wajib sebelum initial plan disimpan atau sesi pertama dimulai. |
| Evaluasi | Deterministik untuk seluruh aktivitas milestone pertama. AI evaluator tidak digunakan. |
| Content Operations | UI Content Operations tidak menjadi dependency milestone pertama. Seed dan approval dilakukan melalui artefak versioned serta build validation. |
| Assessment | Placement adaptif penuh, checkpoint berdampak tinggi, simulation, dan readiness final tidak termasuk milestone pertama. |
| Arsitektur | Monorepo TypeScript dengan dua web app, modular-monolith API, shared contracts, dan PostgreSQL sebagai sumber kebenaran. |
| Evidence | Submission sah menghasilkan candidate evidence idempotent; completion tidak otomatis berarti mastery. |
| Accessibility | WCAG 2.2 AA diterapkan sejak komponen dan flow pertama, bukan ditambahkan setelah fitur selesai. |
| Data sensitif | Raw answer tidak masuk generic analytics/log. Kebijakan retensi final tetap menjadi blocker production. |

## 4. Scope Produk MVP

MVP tetap mencakup:

1. fondasi Sound, Hiragana, Katakana, dan orthography pada U01–U04;
2. Vocabulary, Kanji, Grammar, Reading, dan Listening sampai U24;
3. onboarding, placement, learning plan, calendar, practice, review, remedial, checkpoint, simulation, progress, dan readiness;
4. evidence, mastery, prerequisite, retention, dan explainable adaptation;
5. Content Operations untuk authoring, validation, review, publication, issue, quarantine, correction, dan audit;
6. konten N5 lengkap yang tervalidasi;
7. learner web responsive mobile-first dan Content Operations desktop-first;
8. online journey serta offline practice terkendali pada fase hardening.

Delivery bertahap tidak mengurangi scope tersebut. Setiap milestone harus memperluas kontrak yang sama; implementasi tidak boleh membuat model khusus U01 yang tidak dapat digunakan oleh U02–U24.

## 5. Milestone 1 — U01 End-to-End Online

### 5.1 Tujuan

Membuktikan bahwa satu learner dapat bergerak dari onboarding sampai hasil belajar yang tersimpan, dapat direproduksi, dan dapat dijelaskan dengan menggunakan kontrak sistem yang akan dipakai oleh seluruh U01–U24.

### 5.2 Journey wajib

```text
Guest membuka aplikasi
→ mengisi goal dan availability
→ membuat akun atau masuk
→ guest draft dimigrasikan secara idempotent
→ sistem membuat initial learning plan untuk U01
→ learner memulai session plan yang version-locked
→ learner menyelesaikan aktivitas Sound/Kana objektif
→ respons dievaluasi secara deterministik
→ candidate evidence diterima atau ditolak dengan reason code
→ mastery state dan review due diperbarui
→ session summary menjelaskan hasil dan next action
→ learner dapat kembali dan melanjutkan state tersimpan
```

### 5.3 Kemampuan yang termasuk

- landing/entry state product app;
- guest onboarding draft untuk goal dan availability;
- autentikasi Google dan email link melalui Clerk;
- learner profile dan initial learning plan;
- Home dengan satu primary next action;
- session planning U01 secara deterministik;
- focused practice runtime;
- minimal dua interaction type objektif: single-choice dan matching/select-to-pair;
- audio playback tanpa autoplay;
- deterministic evaluation dan feedback setelah submission;
- append-only submission, evaluation, dan evidence record;
- mastery calculation serta review schedule untuk KC U01;
- session summary dan progress ringkas;
- idempotency untuk auth migration, session start, dan submission;
- audit/reason code minimum;
- loading, empty, error, retry, stale, dan provider-failure state;
- keyboard, screen reader, zoom/reflow, reduced-motion, serta language metadata;
- telemetry teknis dan product event minimum tanpa raw answer.

### 5.4 Yang tidak termasuk

- offline package, local evaluator, queue, dan sync;
- AI evaluation atau AI-generated runtime feedback;
- full adaptive placement untuk learner berpengalaman;
- Kanji dan Grammar formal;
- Reading dan Listening comprehension N5;
- checkpoint, cumulative review, simulation, dan `N5 Ready`;
- Content Operations UI;
- email/web-push reminder selain email autentikasi Clerk;
- gamification lengkap, achievement, dan level economy;
- corpus U02–U24;
- N4–N1;
- native mobile application.

### 5.5 Content seed minimum

Content seed U01 harus memiliki:

1. identifier dan version untuk setiap KC, content item, activity definition, asset, serta content pack;
2. subset Sound/Kana yang cukup untuk sedikitnya satu session bermakna;
3. instruction dan explanation Bahasa Indonesia;
4. audio asli atau berlisensi dengan transcript internal, checksum, dan rights metadata;
5. prompt, option/pair, answer key, rationale, difficulty, dan estimated duration;
6. tepat satu primary KC per scored item;
7. evidence type dan attribution yang telah ditentukan sebelum runtime;
8. distractor dan misconception tags yang direview;
9. accessibility metadata serta fallback yang tidak mengubah konstruk;
10. status `approved` dalam seed manifest.

Seed boleh lebih kecil dari seluruh U01. Seed tidak boleh disebut sebagai U01 lengkap atau digunakan untuk menyimpulkan efektivitas kurikulum penuh.

## 6. Dependency Sebelum Milestone 1 Dimulai

Status `ready_to_start` hanya dapat diberikan jika artefak berikut tersedia:

| ID | Artefak | Minimum yang diperlukan | Owner | Status awal |
| --- | --- | --- | --- | --- |
| `DEP-001` | Domain model | Entitas, relasi, ownership, lifecycle, dan version reference untuk journey Milestone 1 | Engineering + Product | `not_started` |
| `DEP-002` | Executable schemas | Zod/JSON Schema untuk profile, curriculum seed, session, practice, evaluation, evidence, mastery, dan events | Engineering | `not_started` |
| `DEP-003` | Policy pack U01 | Mastery, review, practice, feedback, evidence, reason code, dan prerequisite configuration | Academic + Engineering | `not_started` |
| `DEP-004` | Approved content seed | U01 seed manifest beserta asset, rights, validation result, dan approval | Academic/Content | `not_started` |
| `DEP-005` | API contract | OpenAPI untuk onboarding, profile, plan, session, submission, mastery, dan summary | Engineering | `not_started` |
| `DEP-006` | Event contract | Event names, payload, producer, consumer, dedupe key, privacy class, dan version | Engineering + Data | `not_started` |
| `DEP-007` | Prototype P0 | Prototype journey Milestone 1 beserta error, responsive, dan accessibility state | Design | `not_started` |
| `DEP-008` | Acceptance fixtures | Happy path, duplicate, stale revision, provider failure, audio failure, dan accessibility fixtures | QA + Engineering | `not_started` |
| `DEP-009` | Auth configuration decision | Environment, redirect/origin, session, email delivery, identity mapping, dan provider-failure behavior | Engineering + Security | `not_started` |
| `DEP-010` | Telemetry contract | Event/property allowlist, correlation, sampling, redaction, dan success metrics | Data + Security + Product | `not_started` |

Artefak boleh dikembangkan bersamaan, tetapi feature code yang bergantung padanya tidak boleh mengarang contract sementara yang tidak tercatat.

## 7. Entry Criteria Milestone 1

Milestone 1 dapat mulai diimplementasikan ketika:

1. Product, Engineering, Academic, dan Design menyetujui scope pada Bagian 5;
2. `DEP-001` sampai `DEP-006` memiliki draft versioned yang konsisten;
3. content seed mempunyai owner, source rationale, dan jalur approval;
4. prototype mencakup happy path serta critical failure state;
5. acceptance scenario dapat dipetakan ke test fixture;
6. secret dan environment boundary telah ditentukan;
7. data sensitif serta telemetry yang dilarang telah ditentukan;
8. tidak ada unresolved decision yang membuat schema atau public contract berubah secara mendasar.

Tidak diperlukan sebelum coding pertama:

- seluruh 900 Vocabulary;
- seluruh 110 Kanji;
- seluruh 90 Grammar;
- seluruh 190 Reading dan 210 Listening objects;
- policy simulation final;
- offline protocol final;
- AI data-processing approval.

Ketergantungan tersebut tetap wajib sebelum milestone atau release yang menggunakannya.

## 8. Exit Criteria Milestone 1

Milestone 1 selesai hanya jika:

1. journey Bagian 5.2 lulus end-to-end pada viewport mobile dan desktop yang dipilih untuk development;
2. input dan VersionSet yang sama menghasilkan session/evaluation/mastery result serta decision hash yang sama;
3. duplicate request tidak membuat plan, attempt, submission, evaluation, atau evidence kedua;
4. stale revision ditolak tanpa kehilangan state yang masih dapat dipertahankan;
5. content selain `approved` tidak dapat dipilih runtime;
6. audio/provider failure tidak dihitung sebagai kesalahan akademik;
7. raw answer tidak muncul di generic analytics, log, atau error tracker;
8. keyboard-only dan screen-reader flow dapat menyelesaikan journey tanpa kehilangan fungsi;
9. completion, mastery, dan review due ditampilkan sebagai konsep berbeda;
10. seluruh automated unit, contract, integration, E2E, dan baseline accessibility tests lulus;
11. migration database dapat dijalankan dari environment kosong;
12. keputusan dapat ditelusuri dari plan → instance → submission → evaluation → evidence → mastery;
13. known limitations dan deferred blockers terdokumentasi;
14. Product, Engineering, Academic, Design, Accessibility, dan QA memberi sign-off sesuai area.

Milestone ini tidak membuktikan readiness N5, efektivitas kurikulum penuh, kesiapan offline, atau kesiapan production.

## 9. Roadmap Setelah Milestone 1

### Milestone 2 — Fondasi Lengkap U01–U04

- selesaikan inventory dan content pack S0;
- tambahkan interaction type fondasi yang diperlukan;
- implementasikan placement branch untuk pemula absolut;
- implementasikan gate S0 → S1;
- lengkapi remedial dan delayed evidence;
- validasi pelepasan romaji serta Kana composer.

### Milestone 3 — Domain Inti U05–U20

- tambah Vocabulary, Kanji, Grammar, Reading, dan Listening;
- implementasikan cross-domain prerequisite dan attribution;
- tambah calendar planning, missed-session replan, review, dan remedial;
- aktifkan Content Operations minimum untuk authoring, review, dan publication;
- implementasikan constrained AI hanya setelah privacy/security approval.

### Milestone 4 — Integrasi dan Assessment U21–U24

- kunci keputusan 40 Vocabulary dan 4 Grammar S5;
- implementasikan placement, verification, checkpoint, cumulative review, dan simulation;
- sediakan sedikitnya dua simulation form yang approved dan equivalent;
- aktifkan LevelMasteryProfile N5 dan readiness;
- lengkapi calibration serta fairness monitoring.

### Milestone 5 — Hardening Production

- offline package dan synchronization;
- platform/browser/device/assistive-technology matrix final;
- retention, deletion, export, legal hold, serta AI data policy;
- RPO/RTO, backup retention, restore drill, dan incident runbook;
- load, failure, security, privacy, rights, accessibility, dan production-readiness review.

## 10. Fail-Closed Decisions

Keputusan berikut tidak boleh diberi default tersembunyi:

| Keputusan | Berlaku mulai | Perilaku sebelum diputuskan |
| --- | --- | --- |
| Required/supporting/enrichment seluruh target N5 | Milestone 3–4 | Target terkait tidak dipakai untuk readiness. |
| Posisi 40 Vocabulary dan 4 Grammar S5 | Milestone 4 | Content pack S5 tidak dapat approved. |
| Simulation assembly dan item pool final | Milestone 4 | Simulation dan readiness production tidak aktif. |
| Assessment accommodations | Milestone 4 | Alternatif yang belum tervalidasi tidak menghasilkan scored evidence. |
| Offline activation dan sync policy | Milestone 5 | Offline journey tidak tersedia. |
| AI learner-data handling | Milestone 3 | AI evaluator untuk data learner dinonaktifkan. |
| Retention schedule | Milestone 5 | Production release diblokir. |
| Platform support matrix | Milestone 5 | Journey terkait tidak diklaim supported. |
| RPO/RTO dan backup retention | Milestone 5 | Production release diblokir. |

## 11. Ownership dan Approval

| Area | Accountable | Required approval |
| --- | --- | --- |
| Product scope dan milestone | Product Owner | Product |
| Curriculum, content, KC, evidence, mastery | Academic Lead | Academic + Product |
| System boundary, schema, API, event, migration | Engineering Lead | Engineering |
| Interaction, screen, content design | Design Lead | Design + Accessibility |
| Assessment construct dan form | Assessment Lead | Assessment + Academic |
| Security, privacy, retention, AI data | Security/Privacy | Security/Privacy + Product |
| Test evidence dan release quality | QA Lead | QA + owner area |
| Deployment, backup, incident | Operations | Operations + Security |

Approval harus menunjuk document/artifact version, approver, role, timestamp, scope, dan decision record. Persetujuan lisan tidak mengubah status blocker.

## 12. Status Model

Setiap dependency dan milestone menggunakan status berikut:

- `not_started` — belum ada artefak yang dapat direview;
- `draft` — artefak tersedia tetapi belum lengkap;
- `in_review` — input sudah dikunci untuk review;
- `revision_required` — terdapat temuan yang harus diperbaiki;
- `approved` — owner yang berwenang telah menyetujui version tertentu;
- `ready_to_start` — seluruh entry criteria milestone terpenuhi;
- `in_implementation` — pekerjaan sedang berjalan terhadap contract yang disetujui;
- `verification` — implementasi selesai dan evidence sedang diverifikasi;
- `done` — seluruh exit criteria dan sign-off terpenuhi;
- `blocked` — keputusan atau dependency fail-closed mencegah kelanjutan scope terkait.

Perubahan pada artefak `approved` setelah implementasi dimulai harus menghasilkan version baru dan impact review. Perubahan tidak boleh diterapkan diam-diam pada run, evidence, atau release yang telah terkunci.

## 13. Risiko Utama Milestone 1

| Risiko | Guardrail |
| --- | --- |
| Model data terlalu khusus U01 | Schema review harus membuktikan extensibility ke seluruh domain dan U02–U24. |
| Seed dianggap sebagai konten final | Label seed dan scope pack eksplisit; tidak mengklaim U01 lengkap. |
| Frontend membuat status akademik sendiri | Semua state akademik berasal dari API/engine dengan reason code dan version. |
| Authentication memperlambat validasi learning loop | Guest boleh mengisi draft; account baru diwajibkan sebelum penyimpanan plan/sesi. |
| AI memperbesar scope | Milestone 1 sepenuhnya deterministic. |
| Offline menambah state terlalu dini | Milestone 1 online-only, tetapi contract ID/version tidak boleh menutup evolusi offline. |
| Accessibility ditunda | Prototype, component contract, dan acceptance fixture accessibility menjadi entry/exit criteria. |
| Telemetry membocorkan jawaban | Property allowlist dan redaction test diwajibkan sebelum instrumentation aktif. |

## 14. Definition of Ready Dokumen Berikutnya

Setelah dokumen ini disetujui, artefak berikut dibuat berurutan:

1. `domain-model-and-schemas.md` beserta schema executable;
2. `learning-policy-and-registry-n5.md` beserta policy/registry files;
3. `content-seed-u01.md` beserta manifest dan asset fixture;
4. `api-and-event-contracts.md` beserta OpenAPI/event schemas;
5. `09-prototype-usability-test.md`;
6. `10-analytics-and-handoff.md`;
7. security/privacy, platform/accessibility, test, ADR, dan operations artifacts sesuai milestone.

Dokumen kedua belum boleh mengubah scope Milestone 1 tanpa mencatat perubahan di dokumen ini.

## 15. Acceptance Criteria Dokumen

Dokumen ini dapat berstatus `approved` jika:

1. scope produk U01–U24 dan scope Milestone 1 tidak tertukar;
2. seluruh kemampuan included dan excluded Milestone 1 eksplisit;
3. dependency, entry criteria, exit criteria, owner, serta approval tersedia;
4. deferred capability memiliki milestone tujuan dan fail-closed behavior;
5. implementasi U01 diwajibkan memakai contract yang dapat diperluas ke U02–U24;
6. konten draft tidak dapat masuk runtime;
7. evaluasi milestone pertama sepenuhnya deterministic;
8. privacy, accessibility, idempotency, versioning, dan audit menjadi bagian acceptance;
9. tidak ada blocker production yang keliru dianggap sebagai blocker scaffolding;
10. Product Owner, Engineering Lead, Academic Lead, Design Lead, Accessibility, dan QA menyetujui baseline.

## 16. Decision Record

| ID | Keputusan | Status | Owner | Tanggal |
| --- | --- | --- | --- | --- |
| `IR-001` | Scope MVP tetap U01–U24. | `approved` | Product | 13 September 2026 |
| `IR-002` | Milestone pertama adalah U01 end-to-end. | `approved` | Product + Engineering | 13 September 2026 |
| `IR-003` | Milestone pertama online-only. | `approved` | Product + Engineering | 13 September 2026 |
| `IR-004` | Content Ops UI tidak menjadi dependency; gunakan approved versioned seed. | `approved` | Product + Academic | 13 September 2026 |
| `IR-005` | Google Sign-In dan email link melalui Clerk digunakan sejak Milestone 1. | `approved` | Product + Engineering + Security | 13 September 2026 |
| `IR-006` | Evaluasi Milestone 1 sepenuhnya deterministic; AI ditunda. | `approved` | Academic + Engineering | 13 September 2026 |

Status `proposed` berubah menjadi `approved` hanya melalui review pemilik keputusan. Dokumen ini tidak menganggap rekomendasi sebagai approval implisit.
