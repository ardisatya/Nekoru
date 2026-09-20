# Screen Specifications Content Operations Nekoru — MVP

**Status:** Draft v0.1  
**Audiens:** Product, content operations, akademik, accessibility, technical/data, rights, design, QA, dan engineering  
**Cakupan:** Authoring, review, approval, publication, issue, quarantine, correction, dan audit  
**Platform:** Aplikasi web internal desktop-first  
**Identity provider:** Clerk Hobby; Google OAuth untuk identity, RBAC Nekoru untuk authorization  
**Bahasa produk:** Bahasa Indonesia (`id-ID`) dengan canonical technical terms  
**Tanggal:** 13 September 2026

## 1. Tujuan Dokumen

Dokumen ini menjadi kontrak layar Content Operations Nekoru untuk wireframe, prototype, implementasi, analytics, dan QA. Dokumen menetapkan:

1. inventaris layar internal serta hubungan ke route konseptual;
2. identity, staff allowlist, role, permission, assignment, dan authority boundary;
3. anatomy workbench untuk content, review, release, issue, dan audit;
4. tujuan, data, tindakan, state, serta guardrail setiap layar;
5. version, dependency, validation, separation-of-duties, dan audit presentation;
6. perilaku desktop-first, accessibility, error recovery, serta high-risk confirmation;
7. acceptance criteria yang dapat diuji.

Dokumen ini tidak mengubah authority matrix atau validation rubric. Layout final, visual token, ukuran, warna, dan motion ditentukan dalam Design System.

## 2. Sumber dan Hierarki Keputusan

- [UI/UX Overview](./01-ui-ux-overview.md)
- [Information Architecture](./02-information-architecture.md)
- [User Flows](./03-user-flows.md)
- [Screen Specifications Learner](./04-screen-specifications-learner.md)
- [Product Overview](../product-specs/product-overview.md)
- [Arsitektur Kurikulum](../product-specs/curriculum-architecture.md)
- [Mastery Specification](../product-specs/mastery-specification.md)
- [Learning Engine](../product-specs/learning-engine.md)
- [Practice Engine](../product-specs/practice-engine.md)
- [Assessment Specification N5](../product-specs/assessment-specification-n5.md)
- [Content Validation Rubric](../product-specs/content-validation-rubric.md)
- inventory, blueprint, dan progression pada `docs/content/`.
- [Clerk Pricing](https://clerk.com/pricing)
- [Clerk — Google social connection](https://clerk.com/docs/guides/configure/auth-strategies/social-connections/google)

Jika UI menyederhanakan workflow, sumber yang memiliki keputusan tetap berwenang. UI tidak boleh menaikkan status, mengabaikan gate, mengubah version, atau memberikan authority hanya karena sebuah control terlihat atau sebuah route dapat dibuka.

## 3. Keputusan Utama

| Area | Keputusan MVP |
| --- | --- |
| Surface | Content Operations terpisah dari Learner App secara shell, route, dan permission |
| Viewport | Desktop-first; mutasi kompleks tidak diwajibkan pada viewport sempit |
| Identity | Google OAuth melalui Clerk Hobby |
| Internal access | Tidak ada self-registration atau email link internal; hanya identity yang ada pada active staff allowlist |
| Authorization | Role, permission, assignment, separation of duties, dan authority dimiliki backend Nekoru |
| Identity mapping | Clerk user ID disimpan sebagai external identity reference; bukan role atau authority |
| Navigasi | Dashboard, Konten, Review, Rilis, Masalah, dan Audit |
| Editing | Draft autosave diperbolehkan; perubahan lifecycle selalu explicit action |
| Concurrency | Optimistic revision; tidak memakai last-write-wins untuk content, review, approval, atau decision |
| Approval | Mandatory gate dan `not_tested` memblokir; author tidak menjadi sole approver karyanya sendiri |
| High-risk action | Publish, quarantine, adjudication, migration, rollback, dan access change memerlukan target/version eksplisit serta confirmation |
| Preview | Interaktif, berlabel internal/non-evidence, tidak membuat learner event atau mastery |
| Bulk action | Assignment/tag/validation boleh; bulk approve/publish/quarantine/adjudicate tidak tersedia pada MVP |
| Audit | Semua decision menunjuk actor, role, authority, timestamp, artifact/version, input, output, dan reason |

## 4. Identity dan Authorization Model

### 4.1 Boundary

```text
Google identity
→ Clerk memverifikasi identity dan membuat session
→ Nekoru memetakan Clerk user ID + verified email
→ Active staff allowlist?
→ Internal user record aktif?
→ Role/permission/assignment/authority check
→ Object read atau mutation diizinkan/ditolak
```

Clerk menjawab “siapa pengguna”. Backend Nekoru menjawab “apa yang boleh dilihat atau dilakukan pengguna terhadap objek dan version ini”.

### 4.2 Staff allowlist

- Entry memakai exact normalized verified email, bukan hanya domain.
- Entry memiliki status `invited`, `active`, `suspended`, atau `revoked`.
- Entry minimal menyimpan role baseline, created by, created at, reason, expiry opsional, serta revision.
- Login Google yang valid tetapi tidak ada di allowlist menghasilkan access denied; tidak membuat role internal.
- Penghapusan/suspension berlaku pada authorization berikutnya walaupun Clerk session masih hidup.
- Perubahan email Google tidak memindahkan authority otomatis; administrator harus memverifikasi mapping baru.

### 4.3 Authorization inputs

Setiap request internal minimal mengevaluasi:

- Clerk session dan external user ID;
- internal user status;
- role serta permission aktif;
- artifact type dan scope;
- assignment bila diwajibkan;
- lifecycle status dan version/revision;
- author/reviewer relationship untuk separation of duties;
- authority matrix untuk keputusan;
- environment dan high-risk action policy.

### 4.4 Failure semantics

- `Unauthenticated`: arahkan ke login.
- `Not allowlisted`: akses internal ditolak tanpa membuka data.
- `Suspended/revoked`: session boleh tetap ada di Clerk, tetapi semua internal access ditolak.
- `Insufficient permission`: tampilkan konteks minimum dan route kembali.
- `Authority missing`: objek boleh dilihat jika permitted, tetapi decision action disabled dengan alasan dan required approver.
- `Stale role/session claim`: backend result menang; UI refresh role context.

## 5. Role Presentation

| Role | Default work focus | Tidak boleh diasumsikan UI |
| --- | --- | --- |
| Content Author | Draft, self-check, response terhadap finding | Approve karya sendiri atau publish |
| Academic Lead | Scope, outcome, level, sequence, academic decision | Menggantikan rights/technical gate tanpa authority |
| Japanese Linguistic Reviewer | Akurasi, reading, grammar, naturalness, register | Mengubah curriculum scope sendiri |
| Assessment Reviewer | Konstruk, item, answer, scoring, distractor, ambiguity | Mengubah mastery/readiness rule |
| Indonesian Localization Reviewer | Kejelasan Indonesia dan transfer risk | Mengubah Japanese answer key tanpa review relevan |
| Domain Specialist | Domain-specific validity | Approval di luar domain assignment |
| Accessibility Reviewer | Keyboard, screen reader, zoom, motion, equivalence | Menyatakan konstruk setara tanpa blueprint evidence |
| Technical/Data Reviewer | Schema, ID, normalization, compatibility, fixtures, audit | Menetapkan validitas linguistik |
| Rights Reviewer | Originality, license, consent, attribution | Mengesampingkan missing rights dengan score |
| Content Operations | Queue, status, pack, publication, quarantine, correction | Mengambil keputusan akademik di luar authority |
| Product Owner | Konflik lintas-tim dan high-risk product decision | Mengedit evidence/result secara informal |

Satu pengguna dapat memiliki beberapa role. UI selalu menunjukkan active role context pada decision, tetapi backend mengevaluasi seluruh assignment dan authority yang berlaku.

## 6. Prefix, Priority, dan Inventaris

### 6.1 Prefix

| Prefix | Keluarga |
| --- | --- |
| `CS-AU` | Authentication dan access |
| `CS-DA` | Dashboard |
| `CS-CO` | Content bank dan authoring |
| `CS-RV` | Review dan approval |
| `CS-RL` | Release dan publication |
| `CS-IS` | Issue, quarantine, dan correction |
| `CS-AD` | Audit dan quality |
| `CS-AM` | Staff access management |
| `CS-AC` | Account dan preferences |
| `CS-SY` | System dan recovery |

### 6.2 Priority

- **P0:** diperlukan untuk safe authoring-to-publication loop dan incident handling.
- **P1:** penting untuk efisiensi operasional dan audit lengkap.
- **P2:** enhancement setelah workflow dasar tervalidasi.

### 6.3 Screen inventory

| ID | Nama | Route | Priority |
| --- | --- | --- | --- |
| `CS-AU-01` | Masuk ke Content Operations | Internal auth | P0 |
| `CS-AU-02` | Akses tidak tersedia | Internal auth | P0 |
| `CS-AU-03` | Session kedaluwarsa | Internal auth | P0 |
| `CS-DA-01` | Dashboard operasional | `C-DASHBOARD` | P0 |
| `CS-DA-02` | Antrean dan assignment saya | `C-DASHBOARD` | P1 |
| `CS-CO-01` | Content bank | `C-CONTENT` | P0 |
| `CS-CO-02` | Pilih tipe artefak | `C-CONTENT` | P0 |
| `CS-CO-03` | Artifact workbench | `C-CONTENT-DETAIL` | P0 |
| `CS-CO-04` | Content editor | `C-CONTENT-DETAIL` | P0 |
| `CS-CO-05` | Metadata dan mapping | `C-CONTENT-DETAIL` | P0 |
| `CS-CO-06` | Asset, rights, dan attribution | `C-CONTENT-ASSETS` | P0 |
| `CS-CO-07` | Interactive preview | `C-CONTENT-DETAIL` | P0 |
| `CS-CO-08` | Automated validation | `C-CONTENT-DETAIL` | P0 |
| `CS-CO-09` | Dependency dan usage | `C-CONTENT-DETAIL` | P0 |
| `CS-CO-10` | Version history dan diff | `C-CONTENT-DETAIL` | P0 |
| `CS-RV-01` | Review queue | `C-REVIEW-QUEUE` | P0 |
| `CS-RV-02` | Review workbench | `C-REVIEW-DETAIL` | P0 |
| `CS-RV-03` | Criterion result | `C-REVIEW-DETAIL` | P0 |
| `CS-RV-04` | Finding editor | `C-REVIEW-DETAIL` | P0 |
| `CS-RV-05` | Version/variant comparison | `C-REVIEW-COMPARE` | P0 |
| `CS-RV-06` | Approval status | `C-REVIEW-APPROVAL` | P0 |
| `CS-RV-07` | Konfirmasi keputusan review | `C-REVIEW-APPROVAL` | P0 |
| `CS-RL-01` | Content packs | `C-RELEASE-PACKS` | P0 |
| `CS-RL-02` | Pack builder/detail | `C-RELEASE-PACKS` | P0 |
| `CS-RL-03` | Release validation | `C-RELEASE-VALIDATION` | P0 |
| `CS-RL-04` | Compatibility dan impact | `C-RELEASE-DEPENDENCIES` | P0 |
| `CS-RL-05` | Konfirmasi publication | `C-RELEASE-PUBLISH` | P0 |
| `CS-RL-06` | Publication history/detail | `C-RELEASE-HISTORY` | P0 |
| `CS-IS-01` | Issue inbox | `C-ISSUES-INBOX` | P0 |
| `CS-IS-02` | Issue detail dan triage | `C-ISSUES-DETAIL` | P0 |
| `CS-IS-03` | Quarantine proposal | `C-ISSUES-QUARANTINE` | P0 |
| `CS-IS-04` | Konfirmasi quarantine | `C-ISSUES-QUARANTINE` | P0 |
| `CS-IS-05` | Correction workbench | `C-ISSUES-CORRECTION` | P0 |
| `CS-IS-06` | Adjudication dan historical impact | `C-ISSUES-ADJUDICATION` | P0 |
| `CS-IS-07` | Learner impact summary | `C-ISSUES-ADJUDICATION` | P1 |
| `CS-AD-01` | Audit search dan timeline | `C-AUDIT-DECISIONS` | P0 |
| `CS-AD-02` | Decision detail | `C-AUDIT-DECISIONS` | P0 |
| `CS-AD-03` | Migration dan rollback history | `C-AUDIT-VERSIONS` | P0 |
| `CS-AD-04` | Quality dan content-gap dashboard | `C-AUDIT-QUALITY` | P1 |
| `CS-AD-05` | Authorized export | `C-AUDIT-EXPORT` | P1 |
| `CS-AM-01` | Staff access list | Internal administration | P0 |
| `CS-AM-02` | Staff access detail | Internal administration | P0 |
| `CS-AC-01` | Account dan active role | `C-ACCOUNT` | P1 |
| `CS-AC-02` | Accessibility preferences | `C-ACCOUNT-ACCESSIBILITY` | P1 |
| `CS-AC-03` | Security dan session | `C-ACCOUNT-SECURITY` | P0 |
| `CS-SY-01` | Permission denied | Internal system state | P0 |
| `CS-SY-02` | Stale version | Internal system state | P0 |
| `CS-SY-03` | Edit conflict | Internal system state | P0 |
| `CS-SY-04` | Service/policy unavailable | Internal system state | P0 |
| `CS-SY-05` | Resource not found/deprecated | Internal system state | P0 |
| `CS-SY-06` | Unsaved/offline edit | Internal system state | P0 |

## 7. Global Workbench Shell

### 7.1 Anatomy

```text
Skip link
Global header
├── Nekoru Content Operations identity
├── Global search
├── Environment indicator
├── System/incident status
└── Account + active role context
Persistent navigation
├── Dashboard
├── Konten
├── Review
├── Rilis
├── Masalah
└── Audit
Page header
├── Breadcrumb
├── Title + canonical ID/version
├── Lifecycle/validation/risk badges
└── Contextual actions
Page content/workbench
Optional detail/activity rail
```

### 7.2 Persistent context

Pada artifact, review, release, issue, dan audit detail, header selalu mempertahankan:

- artifact/object type;
- canonical ID dan version;
- lifecycle status;
- environment jika relevan;
- validation/approval completeness;
- unresolved blocker/major count;
- current revision dan stale indicator;
- owner/assignment;
- primary allowed next action.

Informasi tersebut tidak hanya muncul pada tab Ringkasan karena salah version atau status dapat menyebabkan keputusan berisiko pada tab mana pun.

### 7.3 Navigation rules

- Badge navigation hanya untuk assigned work, blocking release issue, atau critical incident.
- Global search tidak menampilkan result yang tidak dapat diakses role.
- Breadcrumb mengikuti hierarchy objek, bukan riwayat klik.
- Kembali dari preview/compare memulihkan tab, filter, sort, dan scroll.
- Deep link selalu memeriksa permission dan version; tidak fallback diam-diam ke latest version.

## 8. Desktop-First dan Viewport Sempit

### 8.1 Desktop-critical workflows

Workflow berikut memerlukan supported desktop viewport:

- content body dan metadata editing kompleks;
- version/variant comparison;
- criterion matrix dan evidence review;
- pack assembly serta dependency impact;
- publication, quarantine, adjudication, migration, dan rollback;
- bulk assignment atau export.

### 8.2 Viewport sempit

Viewport sempit dapat menampilkan:

- dashboard summary;
- queue dan issue list;
- artifact/review/release read-only summary;
- notification, incident, serta permission state;
- account/security action yang aman.

Jika mutasi kompleks tidak didukung, UI menjelaskan “Gunakan layar yang lebih lebar untuk melakukan tindakan ini” dan menyediakan return path. UI tidak merender form terpotong yang berisiko kehilangan evidence, version, atau context.

### 8.3 Zoom dan reflow

Desktop-first tidak menghapus kewajiban zoom 200%, keyboard navigation, focus visibility, dan logical reading order. Supporting rail dapat berpindah ke bawah; table dapat memakai accessible horizontal region hanya jika row/column relationship tetap diumumkan dan alternatif detail tersedia.

## 9. Authentication dan Access Screens

### 9.1 `CS-AU-01` — Masuk ke Content Operations

**Tujuan:** membuktikan staff identity melalui Google OAuth Clerk.

**Hierarchy:** internal product identity, environment, primary `Masuk dengan Google`, security notice, support contact. Tidak ada self-registration, email link, password, atau “buat akun”.

**Success:** Clerk session valid → backend staff allowlist/role check → Dashboard atau intended permitted route.

**States:** Google cancelled, provider error, network failure, invalid callback, session already active, wrong Google account.

### 9.2 `CS-AU-02` — Akses Tidak Tersedia

| State | Message intent | Action |
| --- | --- | --- |
| Not allowlisted | Account Google berhasil diverifikasi tetapi tidak memiliki internal access | Ganti akun/hubungi administrator |
| Invited but incomplete | Invitation/role belum aktif | Hubungi administrator/refresh |
| Suspended | Akses dinonaktifkan; jangan ungkap internal reason yang sensitif | Keluar/hubungi administrator |
| Revoked | Tidak ada akses aktif | Keluar |
| Email changed/mismatch | Identity tidak cocok dengan allowlist | Gunakan account terdaftar/hubungi administrator |

Authentication success tidak ditampilkan sebagai authorization success.

### 9.3 `CS-AU-03` — Session Kedaluwarsa

Menjelaskan bahwa draft lokal/unsaved state dipertahankan jika aman, tetapi access harus diverifikasi ulang. Setelah login, backend mengulang permission/version check sebelum draft dapat diterapkan.

## 10. Dashboard Screens

### 10.1 `CS-DA-01` — Dashboard Operasional

**Tujuan:** menjawab “Apa pekerjaan atau risiko terpenting sekarang?” sesuai role.

**Hierarchy:**

1. critical issue/quarantine atau release incident;
2. assignment saya dan due/aging;
3. mandatory gate failure serta release blocker;
4. pending required approval/reviewer disagreement;
5. candidate release status;
6. content gap, drift, ambiguity, dan accessibility failure;
7. throughput/quality summary.

**Role adaptation:** modul diurutkan berdasarkan active responsibility, tetapi source data dan definition tidak berubah. Dashboard tidak menyediakan approve/publish/quarantine langsung; action membuka context detail.

### 10.2 `CS-DA-02` — Antrean dan Assignment Saya

List lintas content/review/issue dengan type, ID/version, status, severity, role, due/age, last change, dan next action. User dapat filter/sort/save view. Bulk action hanya assignment ownership, acknowledgement, atau tag yang diizinkan.

## 11. Content Bank dan Authoring

### 11.1 `CS-CO-01` — Content Bank

**Search/filter:** stable ID, version, title, artifact type, domain, stage, unit, lesson, KC, activity/interaction type, lifecycle, validation, author/reviewer, pack/form, issue, dan dependency.

**Result columns:** type, human label, canonical ID, version, lifecycle, validation, owner, updated at, usage/dependency summary.

**Actions:** buka, buat artefak/versi, compare selected versions, run permitted validation, assign. Tidak ada bulk approval atau publish.

**States:** no result dengan clear filters, index refreshing, partial result, permission-filtered, stale search snapshot.

### 11.2 `CS-CO-02` — Pilih Tipe Artefak

Tipe minimum:

- inventory/KC dan blueprint;
- vocabulary, Kanji, grammar, foundation entry;
- content item atau parameterized template;
- reading/listening object;
- lesson package;
- assessment blueprint/form;
- audio/image/glyph/animation asset;
- content pack dibuat dari Release, bukan form generik.

Setiap tipe menjelaskan required fields, reviewer roles, dan downstream usage. Primary action membuat draft dengan stable ID/version; bukan menyalin version published tanpa explicit `buat versi baru`.

### 11.3 `CS-CO-03` — Artifact Workbench

Local navigation:

1. Ringkasan;
2. Isi;
3. Preview;
4. Validation;
5. Review;
6. Dependency;
7. Versi;
8. Masalah;
9. Audit.

Tab yang tidak berlaku dapat disembunyikan, tetapi header status tetap persisten. Primary action mengikuti lifecycle: lanjut edit, jalankan validasi, ajukan review, tanggapi finding, atau buat version baru.

### 11.4 `CS-CO-04` — Content Editor

**Field grouping:** learner-visible content, stimulus/options, answer/rationale, hint/feedback, rubric/equivalence, template slots/constraints, domain-specific metadata.

**Behavior:**

- autosave draft dengan save status dan revision;
- field-level validation tidak menggantikan full validator;
- Japanese text, transliteration, literal translation, dan communicative translation terpisah;
- answer/rubric field hanya terlihat/editable sesuai role/permission;
- HTML/SVG/payload preview disanitasi;
- edit published content membuat version baru, tidak memutasi version aktif.

**Exit:** jika autosave gagal, tampilkan persistent unsaved state dan export/copy recovery yang aman; jangan menutup tab dengan kesan saved.

### 11.5 `CS-CO-05` — Metadata dan Mapping

Field minimum sesuai tipe dapat mencakup:

- domain, stage, unit, lesson, category, difficulty;
- learning outcome dan primary/supporting KC;
- activity type, interaction type, mode, evidence type;
- support, replay, navigation, attempt, timer, dan feedback policy;
- locale, accessibility, rights, provenance, AI assistance;
- curriculum/content/policy/rubric compatibility.

Reference picker menampilkan ID, label, version, status, dan compatibility. Dangling/deprecated reference tidak dapat dipilih untuk version baru tanpa explicit migration rule.

### 11.6 `CS-CO-06` — Asset, Rights, dan Attribution

**Data:** asset preview, type, checksum, version, duration/dimension, transcript/alt, speaker/creator, license/consent, permitted use, expiry, fallback/equivalence.

**Rules:**

- missing rights/attribution memblokir approval;
- replacement asset membuat version atau approved mapping, bukan mengganti file di bawah checksum lama;
- audio waveform bukan satu-satunya cara navigasi; transcript tidak muncul pada scored learner preview sebelum release;
- glyph/stroke animation memiliki static/step fallback.

### 11.7 `CS-CO-07` — Interactive Preview

**Controls:** learner viewport class, mode, support variant, input modality, reduced motion, content version, template seed/instance, locale, accessibility alternative.

**Persistent banner:** `PREVIEW INTERNAL — tidak menghasilkan learner evidence`.

Authorized debug panel dapat menampilkan answer/evaluation trace, canonical activity type, attribution, and policy. Panel tidak tersedia pada learner route atau shareable public URL.

Actions: jalankan ulang seed yang sama, materialize approved candidate seed, capture preview state ke finding, buka source field. Preview event tidak masuk learner analytics, mastery, XP, exposure, atau assessment history.

### 11.8 `CS-CO-08` — Automated Validation

Mengelompokkan result berdasarkan universal, curriculum, domain, accessibility, technical, rights, asset, security, serta release checks.

Setiap result menampilkan criterion ID, `pass/fail/not_applicable/not_tested`, gate, severity, evidence, validator/version, timestamp, dan link ke field/dependency/fixture. Rerun menciptakan validation run baru; hasil lama tetap dapat diaudit.

`not_tested` pada mandatory criterion tampil sebagai blocker, bukan neutral state.

### 11.9 `CS-CO-09` — Dependency dan Usage

**Views:** upstream requirements, downstream usage, version compatibility, pack/form membership, active learner-run exposure summary, dan blast radius candidate.

Graph memiliki accessible list/table alternative. User dapat berpindah ke exact dependency version; latest tidak dipilih diam-diam.

### 11.10 `CS-CO-10` — Version History dan Diff

Timeline menampilkan author, reason, parent/superseded version, lifecycle, validation, approval, publication, issue, migration, dan rollback. Diff membedakan learner-visible content, answer/rubric, metadata, dependency, asset, serta policy changes.

Added/removed/changed tidak hanya dibedakan melalui warna. Large structured diff menyediakan summary dan navigation per field.

## 12. Review dan Approval Screens

### 12.1 `CS-RV-01` — Review Queue

Filter berdasarkan assignment, role, artifact type, domain, status, severity, age, due, required approver, dan release candidate. Row menunjukkan exact version dan current revision. Claim/assign action atomic dan menampilkan conflict jika sudah diambil reviewer lain.

### 12.2 `CS-RV-02` — Review Workbench

Layout desktop dapat menggunakan:

- content/preview pane;
- criterion dan evidence pane;
- finding/decision pane;
- persistent artifact/version header.

Reading order keyboard tetap content summary → criterion → evidence → finding → decision. Pane dapat di-resize tanpa menyembunyikan control; single-column mode tersedia pada zoom tinggi.

### 12.3 `CS-RV-03` — Criterion Result

Setiap applicable criterion memerlukan:

- result `pass`, `fail`, `not_applicable`, atau `not_tested`;
- evidence/reference minimum;
- reviewer role dan identity;
- comment jika policy mewajibkan;
- finding link jika fail;
- validator result dan disagreement state;
- criterion/rubric version.

`not_applicable` memerlukan rationale; `not_tested` tidak boleh digunakan untuk menyelesaikan mandatory review.

### 12.4 `CS-RV-04` — Finding Editor

Field: criterion, severity (`blocker/major/minor/observation`), summary, evidence, affected field/variant/seed, owner role, due/expiry bila relevan, dan suggested remediation opsional.

Finding selalu terikat exact artifact version. Screenshot/preview state hanya supporting evidence; structured context tetap disimpan.

### 12.5 `CS-RV-05` — Version/Variant Comparison

Mendukung side-by-side dan unified diff untuk:

- current vs previous/corrected version;
- static item vs template instances;
- support/accessibility variants;
- audio/glyph/asset versions;
- assessment form equivalence summary.

Comparison header selalu menyebut left/right version dan tidak memindah side saat sorting/filtering. Keyboard command memiliki visible alternative.

### 12.6 `CS-RV-06` — Approval Status

Menampilkan authority matrix subset yang berlaku, reviewer wajib, reviewer selesai/pending, separation-of-duties conflict, open findings, gate status, score, dan decision history.

Score ≥85 tidak mengatasi mandatory failure. UI menjelaskan kondisi approval secara rule-based, bukan progress bar kosmetik.

### 12.7 `CS-RV-07` — Konfirmasi Keputusan Review

Sebelum submit, tampilkan:

- artifact ID/version/revision;
- active reviewer role dan authority;
- result/finding summary;
- open blocker/major;
- intended lifecycle transition;
- komentar material;
- impact terhadap review lain/release.

Backend mengulang authorization, separation-of-duties, completeness, dan revision check. Success mengarah ke immutable decision receipt. Failure mempertahankan draft keputusan.

## 13. Release dan Publication Screens

### 13.1 `CS-RL-01` — Content Packs

List candidate, validating, approved, published, deprecated, atau blocked pack dengan program/curriculum version, content counts, coverage, validation, approval, target environment, dan last change.

### 13.2 `CS-RL-02` — Pack Builder/Detail

**Sections:** scope/manifest, included artifacts, content counts/distribution, curriculum/blueprint/policy versions, assets/rights, approval coverage, fallback, dependency, and previous release.

Artifact selection memakai exact approved version. Dynamic “latest approved” boleh membantu candidate assembly, tetapi manifest harus resolve dan lock exact versions sebelum validation/publish.

### 13.3 `CS-RL-03` — Release Validation

Menampilkan gate summary serta hasil schema, reference, graph, distribution, coverage, content ceiling, answer leakage, asset, accessibility, rights, deterministic fixture, version compatibility, dan approval completeness.

Primary action hanya `Jalankan validasi` atau `Lihat/perbaiki blocker` sampai seluruh mandatory gate lulus. Validation run menunjuk manifest hash.

### 13.4 `CS-RL-04` — Compatibility dan Impact

Menampilkan current production vs candidate:

- added/changed/deprecated artifacts;
- affected curriculum/unit/lesson/form;
- active/cached run handling;
- migration/recalculation need;
- fallback readiness;
- estimated learner/downstream scope;
- rollback candidate.

Impact summary tidak menggantikan technical diff; keduanya ditautkan.

### 13.5 `CS-RL-05` — Konfirmasi Publication

High-risk confirmation wajib menampilkan:

- target environment;
- pack ID/version dan manifest hash;
- curriculum/policy compatibility;
- all required approval receipts;
- unresolved non-blocking observation/waiver dan expiry;
- effective time;
- rollback version/condition;
- actor dan authority.

Tidak ada bulk publish. Backend melakukan final revalidation dan atomic/idempotent publish. Stale manifest membatalkan confirmation dan meminta validation baru.

### 13.6 `CS-RL-06` — Publication History/Detail

Timeline menampilkan published/deprecated/rolled-back versions, actor, environment, manifest, validation receipt, learner run handling, incident, dan downstream migration. Publication receipt dapat diekspor sesuai permission.

## 14. Issue, Quarantine, dan Correction Screens

### 14.1 `CS-IS-01` — Issue Inbox

Sources: learner report, reviewer, analytics, automated validator, incident, rights claim, drift monitoring. Filter: category, severity, status, source, artifact/version, domain, affected pack, duplicate cluster, assignee, age, dan learner-impact candidate.

Row tidak menampilkan raw learner response. Sensitive context dibuka hanya setelah authorization.

### 14.2 `CS-IS-02` — Issue Detail dan Triage

**Sections:** issue summary, source/evidence, exact artifact/version, current lifecycle/usage, related/duplicate issues, learner impact limited view, technical context, assignment, and timeline.

Actions: classify, set severity, assign reviewer, link duplicate, request evidence, start correction, propose quarantine, close dengan rationale. Report count tidak otomatis menentukan correctness.

### 14.3 `CS-IS-03` — Quarantine Proposal

Field minimum:

- artifact/version dan affected environment;
- reason/category serta evidence;
- risk rating;
- active/new run behavior;
- approved fallback atau explicit gap;
- downstream usage/blast radius;
- reviewer/approver yang diperlukan;
- communication/adjudication candidate;
- rollback/correction owner.

Proposal tidak mengubah production state.

### 14.4 `CS-IS-04` — Konfirmasi Quarantine

High-risk confirmation menampilkan target version, scope, fallback, active-run behavior, evidence-history guarantee, actor/authority, dan timestamp. Backend revalidates state dan permission.

Success receipt menyatakan bahwa run baru tidak memakai item; evidence lama belum otomatis berubah; correction/adjudication next action tersedia.

### 14.5 `CS-IS-05` — Correction Workbench

Menggabungkan linked issue/finding dengan new artifact version, validation, review, dependency, and response evidence. Original quarantined/published version tetap read-only dan dapat dibandingkan.

### 14.6 `CS-IS-06` — Adjudication dan Historical Impact

**Required data:** issue/corrected version, affected evidence/result candidate, learner scope, academic/technical analysis, policy/version, proposed supersession/recalculation, notification impact, rollback, required authority.

UI tidak menyediakan generic “ubah semua nilai”. Proposal harus deterministic dan previewable; execution menghasilkan job/decision ID, progress, result, failure set, dan audit receipt.

### 14.7 `CS-IS-07` — Learner Impact Summary

Menampilkan aggregate/pseudonymous counts by outcome: unaffected, pending, superseded, recalculated, failed/manual review. Individual learner detail hanya dapat dibuka oleh role berwenang dan tidak menampilkan lebih banyak personal data daripada diperlukan.

## 15. Audit dan Quality Screens

### 15.1 `CS-AD-01` — Audit Search dan Timeline

Search by decision ID, artifact/version, actor, role, event, issue, pack, form, learner-safe reference, date, policy/rubric/curriculum version. Timeline immutable dan membedakan occurred time, recorded time, effective time, serta supersession.

### 15.2 `CS-AD-02` — Decision Detail

Menampilkan:

- decision type/ID;
- actor identity dan active role;
- authority basis;
- exact target/version/revision;
- input snapshot/hash;
- policy/rubric/curriculum/content versions;
- result/output/reason;
- linked validation, review, finding, approval, issue, migration;
- superseded-by/rollback relationship.

Missing data ditandai sebagai audit gap, tidak diinferensikan UI.

### 15.3 `CS-AD-03` — Migration dan Rollback History

Menampilkan migration plan, eligible scope, batches, progress, deterministic version, success/failure, retry, compensating action, rollback condition, dan final reconciliation. Retry bersifat idempotent dan tidak mengulang completed target.

### 15.4 `CS-AD-04` — Quality dan Content-Gap Dashboard

Metrics: validation failure, report/ambiguity, audio/glyph/accessibility failure, difficulty drift, content fallback, content gaps per required KC, reviewer disagreement, correction time, dan quarantine trend.

Chart selalu memiliki table/summary alternative, definition, time range, denominator, version, dan data freshness. Quality metric tidak otomatis mengubah content status.

### 15.5 `CS-AD-05` — Authorized Export

User memilih report type, field set, date/scope, redaction, format, dan reason. UI menunjukkan sensitive fields serta permission. Export berjalan sebagai auditable job dengan expiry; tidak membuat public permanent link.

## 16. Staff Access dan Account Screens

### 16.1 `CS-AM-01` — Staff Access List

Hanya tersedia bagi administrator/authority yang ditetapkan. Menampilkan verified/allowlisted email, internal user ID, Clerk external reference bila linked, status, roles, assignment scope, created by/at, last authorized activity, dan expiry.

Search tidak dapat diekspor tanpa permission. Default view tidak menampilkan token/session secret.

### 16.2 `CS-AM-02` — Staff Access Detail

Actions:

- add exact email ke allowlist;
- set baseline role/scope;
- activate setelah Google identity cocok;
- suspend/revoke dengan reason dan effective time;
- change roles dengan before/after impact;
- view access decision history.

Role change, suspension, dan revocation memerlukan confirmation dan backend reauthorization. Staff tidak dapat meningkatkan authority sendiri. Menghapus Clerk identity bukan pengganti revoke record Nekoru.

### 16.3 `CS-AC-01` — Account dan Active Role

Menampilkan Google identity, verified email, internal user ID, active roles, assignment, serta current environment. User dapat mengganti active role context untuk presentation jika memiliki beberapa role; hal ini tidak menambah permission.

### 16.4 `CS-AC-02` — Accessibility Preferences

Controls: density yang tetap accessible, reduced motion, contrast/theme bila tersedia, keyboard shortcut preference, text scaling guidance, and preview behavior. Preference tidak mengubah validation result atau construct equivalence tanpa reviewer decision.

### 16.5 `CS-AC-03` — Security dan Session

Menampilkan current/recent sessions sesuai data yang tersedia, last sign-in, sign-out, dan reauthenticate. Clerk session policy ditampilkan secara manusiawi dari provider config; backend permission tetap diperiksa setiap request.

## 17. Search, Table, Filter, dan Saved View

### 17.1 Search

- Query exact ID/version diprioritaskan.
- Search result selalu menunjukkan object type, canonical ID, version, lifecycle, dan permission-safe context.
- Matching answer key/raw learner response tidak tersedia melalui generic global search.
- Search query dan filter dapat dibagikan hanya jika tidak memuat sensitive value.

### 17.2 Table/data grid

- Header memiliki accessible name serta sort state.
- Row selection tidak bergantung pada click seluruh row; link object tetap jelas.
- Pagination/cursor mempertahankan filter dan selection yang valid.
- Column customization tidak dapat menyembunyikan canonical ID/version/status pada high-risk queue.
- Dense table memiliki comfortable mode dan detail drawer/page.
- Sticky header/column tidak menutupi focus.

### 17.3 Bulk action

Allowed baseline:

- assign/reassign;
- add/remove non-authoritative tag;
- run validation;
- export permitted metadata;
- acknowledge operational notification.

Disallowed baseline:

- approve atau reject;
- publish/deprecate;
- quarantine;
- adjudicate/recalculate;
- change rights/answer key;
- change staff authority.

## 18. Draft, Autosave, dan Concurrency

### 18.1 Save semantics

| State | Meaning |
| --- | --- |
| Saved | Revision diterima server |
| Saving | Mutation aktif; edit berikutnya diantrikan aman |
| Unsaved | Perubahan hanya lokal |
| Save failed | Server belum menerima; retry/export recovery tersedia |
| Stale | Server revision berubah; merge/compare diperlukan |
| Read-only | Lifecycle/permission/version tidak mengizinkan edit |

Autosave hanya berlaku pada draft field. Submit review, decision, approval, publish, quarantine, adjudication, migration, rollback, dan role change selalu explicit.

### 18.2 Conflict

Jika dua user mengedit revision sama:

1. server menerima mutation pertama yang valid;
2. mutation stale ditolak;
3. UI menampilkan field-level compare jika dapat digabung;
4. user memilih salin perubahan ke latest draft atau discard;
5. review/decision state tidak pernah di-merge otomatis;
6. conflict resolution dicatat bila mengubah version.

## 19. Lifecycle dan Action Availability

| Lifecycle | Primary allowed actions | Disallowed examples |
| --- | --- | --- |
| `draft` | Edit, validate, preview, submit review | Approve/publish |
| `academic_review` | Review, finding, decision, withdraw sesuai policy | Mutate reviewed version diam-diam |
| `revision_required` | Buat/edit correction version, respond finding | Mark approved tanpa re-review |
| `approved` | Assemble pack, release validate | Edit in place |
| `published` | Monitor, report, deprecate/quarantine proposal, create new version | Mutate published body |
| `rejected` | View rationale, create new proposal/version jika policy mengizinkan | Publish |
| `deprecated` | Audit/read-only, migration context | New delivery |
| `quarantined` | Correction, fallback, adjudication | New run delivery |

Action availability berasal dari server. Disabled action yang penting menunjukkan reason dan required next step; action yang sama sekali tidak relevan terhadap role dapat disembunyikan.

## 20. High-Risk Confirmation Pattern

Digunakan untuk publish, quarantine, adjudication execution, migration, rollback, staff role escalation, suspension, dan revocation.

Confirmation minimal:

1. action dan irreversible/recoverable nature;
2. target human label + canonical ID/version/environment;
3. before/after state;
4. blast radius atau affected scope;
5. unresolved warning/waiver;
6. actor active role dan authority;
7. rollback/recovery jika tersedia;
8. explicit confirm dan cancel.

Confirmation tidak boleh hanya mengandalkan warna merah atau generic “Apakah Anda yakin?”. Untuk risiko tinggi, reauthentication/recent-session check dapat diwajibkan oleh security policy.

## 21. System dan Recovery Screens

### 21.1 `CS-SY-01` — Permission Denied

Menampilkan jenis tindakan/area secara minimum, reason category, current role, dan return/contact-admin action. Jangan mengungkap object existence atau data jika read permission tidak ada.

### 21.2 `CS-SY-02` — Stale Version

Menampilkan opened version/revision vs current, siapa/apa yang mengubah jika permitted, dan actions refresh, compare, duplicate changes ke latest draft, atau cancel.

### 21.3 `CS-SY-03` — Edit Conflict

Field-level conflict view dengan base/local/server values serta safe resolution. Answer/rubric/review decision conflicts tidak auto-merge.

### 21.4 `CS-SY-04` — Service/Policy Unavailable

Jika curriculum, policy, rubric, content service, identity, atau audit store unavailable, UI menjelaskan tindakan mana yang read-only dan mana yang diblokir. UI tidak membuat decision baru dari cached rule.

### 21.5 `CS-SY-05` — Resource Not Found/Deprecated

Deep link exact version yang deprecated tetap membuka read-only jika authorized; not found membedakan invalid reference dari permission-safe response hanya sejauh aman.

### 21.6 `CS-SY-06` — Unsaved/Offline Edit

Content Operations tidak mendukung offline mutation sebagai baseline. Jika koneksi hilang saat mengedit, local draft ditandai jelas dan tidak dianggap saved. User dapat retry atau copy/export draft secara aman; lifecycle action diblokir sampai online.

## 22. Data Ownership Matrix

| UI data | Source of truth | UI behavior |
| --- | --- | --- |
| Google/Clerk identity session | Clerk | Reauthenticate ketika invalid; jangan simpan token di UI logs |
| Staff allowlist/internal user | Nekoru access service | Exact-email mapping dan immediate authorization check |
| Role/permission/authority | Nekoru RBAC + authority matrix | Per request/action; UI hint bukan enforcement |
| Artifact body/metadata/version | Content Bank | Optimistic revision; published immutable |
| Curriculum/KC/blueprint | Curriculum service | Exact version reference |
| Asset/checksum/rights | Asset/rights registry | Replacement creates new version/mapping |
| Automated validation | Validator registry/run | Immutable run result; rerun creates new record |
| Review/finding/approval | Content validation service | Exact artifact/rubric version and actor role |
| Pack/manifest/publication | Release service | Atomic exact-version manifest |
| Issue/quarantine/correction | Content Operations service | No automatic correctness conclusion from report count |
| Evidence/result impact | Learning/Mastery/Assessment services | Adjudication/migration only; read least privilege |
| Audit event/decision | Append-only audit store | Immutable, supersession links |

## 23. Analytics dan Observability Contract

### 23.1 Universal context

Screen ID, route, entry source, internal role context, permission outcome category, artifact type/ID hash or safe ID, version, lifecycle, validation state, viewport class, online state, and correlation ID.

### 23.2 Event groups

| Family | Events |
| --- | --- |
| Access | login outcome, allowlist outcome, authorization denial, role context change |
| Content | draft created/saved/conflicted, validation requested/completed, review submitted |
| Review | assignment claimed, criterion completed, finding created/resolved, decision submitted |
| Preview | variant/viewport/mode previewed, non-evidence interaction, finding linked |
| Release | pack assembled, validation failed/passed, publication confirmed/completed/failed |
| Issue | issue triaged, duplicate linked, quarantine proposed/decided, correction linked |
| Adjudication | proposal created, impact previewed, job started/completed/failed |
| Audit | search, decision opened, reproduction outcome, authorized export |
| Reliability | stale revision, conflict, unavailable dependency, retry outcome |

Analytics tidak menyimpan answer key, full content body, raw learner response, access token, private reviewer note, atau personal data yang tidak diperlukan.

## 24. Accessibility Acceptance Baseline

Seluruh internal surface harus:

1. dapat digunakan dengan keyboard tanpa mouse atau drag presisi;
2. memiliki skip link, landmark, heading hierarchy, dan visible focus;
3. mempertahankan fungsi pada zoom 200% dan reflow yang disepakati;
4. menyediakan accessible table/grid semantics, sort, selection, dan pagination;
5. mengumumkan save, validation, conflict, assignment, dan decision state tanpa toast saja;
6. membedakan pass/fail/status/diff tidak hanya melalui warna;
7. menyediakan unified/text alternative untuk visual graph, chart, waveform, dan spatial comparison;
8. menjaga Kana, small Kana, diacritic, Kanji, furigana, serta mixed Indonesian/Japanese text terbaca;
9. memastikan editor, preview, dialog, drawer, dan resizable pane memiliki logical focus behavior;
10. menyediakan reduced-motion behavior tanpa menghapus state transition information;
11. mencegah keyboard shortcut mengambil alih browser/assistive technology shortcut tanpa konfigurasi;
12. menampilkan learner alternative interaction dalam preview serta construct-equivalence metadata.

Target formal adalah WCAG 2.2 AA. AAA diupayakan untuk body text dan konten belajar kritis tanpa klaim full AAA; detail pengujian dan exception mengikuti `08-accessibility-content-and-edge-cases.md`.

## 25. Security dan Privacy Acceptance Baseline

- Hanya Google OAuth Clerk yang tersedia pada internal login MVP.
- Google authentication tidak otomatis memberikan internal access.
- Exact verified email harus ada pada active allowlist dan terhubung ke active internal user.
- Role/permission/authority diperiksa server pada setiap read/mutation.
- Revocation/suspension berlaku tanpa menunggu Clerk session berakhir.
- No self-registration, public invite acceptance, atau learner-to-staff role upgrade.
- Answer key, unreleased assessment, raw learner response, serta sensitive audit note mengikuti least privilege.
- High-risk action mencatat actor, active role, target, version, reason, timestamp, outcome, dan correlation ID.
- Export memiliki field redaction, permission, expiry, dan audit.
- Token, OAuth secret, magic link, dan session identifier tidak muncul pada UI log, analytics, screenshot fixture, atau export.

## 26. Screen-Level Acceptance Criteria

### 26.1 Access

1. Clerk Google identity yang tidak allowlisted tidak dapat membuka internal data.
2. Staff yang revoked kehilangan authorization pada request berikutnya.
3. UI tidak menyediakan self-registration atau email link internal.
4. Role context tidak menambah permission.
5. Intended deep link diperiksa ulang setelah login.

### 26.2 Authoring dan validation

1. Draft autosave tidak mengubah lifecycle.
2. Published version tidak dapat diedit in place.
3. Semua reference picker menunjukkan exact ID/version/status.
4. AI assistance, rights, accessibility, answer/rubric, dan source rationale dapat divalidasi.
5. `not_tested` mandatory criterion memblokir approval.
6. Preview selalu non-evidence dan terisolasi dari learner analytics.
7. Save failure serta conflict tidak menyebabkan silent data loss.

### 26.3 Review dan approval

1. Review selalu menunjuk artifact serta rubric version.
2. Author tidak dapat menjadi sole approver karyanya sendiri.
3. Result per criterion memiliki evidence dan reviewer role.
4. Score tidak mengkompensasi mandatory failure.
5. Review disagreement mempertahankan status sampai authority menyelesaikan.
6. Decision success menghasilkan immutable receipt.

### 26.4 Release dan incident

1. Pack manifest mengunci exact versions.
2. Publish disabled sampai semua mandatory validation dan approval lulus.
3. Final publish revalidates revision/manifest dan berjalan atomic/idempotent.
4. Quarantine menyebut fallback, run behavior, scope, dan tidak mengubah historical evidence otomatis.
5. Adjudication tidak dapat dieksekusi tanpa deterministic impact proposal serta authority.
6. Migration/rollback menyediakan progress, failure, retry, dan reconciliation.

### 26.5 Audit, accessibility, dan security

1. Actor, role, authority, version, input, output, reason, dan timestamp dapat direproduksi.
2. Missing audit data tampil sebagai gap, bukan inference.
3. Search/export tidak membocorkan sensitive content atau learner data.
4. Keyboard, screen reader, zoom, reduced motion, table, diff, graph, preview, dan editor lulus fixture.
5. Viewport sempit tidak menawarkan form mutasi yang kehilangan context.
6. Analytics tidak menyimpan secret, answer, raw response, atau private note.

## 27. Definition of Done

Screen specification internal siap diimplementasikan ketika:

1. setiap screen ID dipetakan ke wireframe dan route/component ownership;
2. role/permission/authority matrix tersedia sebagai machine-readable policy atau test fixture;
3. lifecycle/action matrix dan exact-version behavior dapat diuji;
4. artifact schema serta required field per type tersedia;
5. validation criterion registry dan evidence requirement tersedia;
6. preview sandbox menjamin non-evidence isolation;
7. publication/quarantine/adjudication/migration mempunyai idempotency dan audit contract;
8. accessibility serta security fixtures tersedia untuk seluruh P0 screen;
9. Clerk identity mapping, staff allowlist, revoke, session, dan provider migration path terdokumentasi;
10. seluruh keputusan high-risk memiliki receipt dan recovery/rollback yang jelas.

## 28. Keputusan dan Pertanyaan untuk Practice Interactions

| ID | Keputusan/pertanyaan | Rekomendasi awal | Status |
| --- | --- | --- | --- |
| `OPS-OPEN-001` | Internal user dapat memiliki lebih dari satu role | Ya; decision selalu mencatat active role dan authority yang dipakai | Terbuka |
| `OPS-OPEN-002` | Organization/workspace switcher | Tidak ada pada MVP; satu Nekoru workspace/environment context | Terbuka |
| `OPS-OPEN-003` | Masa simpan internal draft lokal saat save gagal | Sampai berhasil disimpan, diekspor, atau dihapus user; terenkripsi bila persisted lintas-refresh | Terbuka |
| `OPS-OPEN-004` | Input Jepang tanpa OS Japanese IME pada learner | Sediakan in-app accessible Kana composer hanya pada activity yang policy-nya mengizinkan; keyboard/IME tetap didukung | **Ditetapkan** |
| `OPS-OPEN-005` | Playback speed pada scored Listening | Tidak tersedia kecuali blueprint secara eksplisit mengizinkan dan equivalence sudah divalidasi | Terbuka |
| `OPS-OPEN-006` | Romaji toggle | Policy-driven per stage/activity; bukan preference global yang dapat melewati removal schedule | Terbuka |

Keputusan `OPS-OPEN-004` sampai `OPS-OPEN-006` harus diselesaikan pada `06-practice-interactions.md` karena memengaruhi konstruk, evidence, accessibility alternative, dan authoring preview.
