# Information Architecture Nekoru — MVP

**Status:** Draft v0.1  
**Audiens:** Product, design, akademik, content operations, accessibility, data, QA, dan engineering  
**Cakupan:** Arsitektur informasi, navigasi, dan akses untuk learner serta Content Operations  
**Platform:** Aplikasi web; learner responsive mobile-first, Content Operations desktop-first  
**Bahasa produk:** Bahasa Indonesia (`id-ID`)  
**Tanggal:** 13 September 2026

## 1. Tujuan Dokumen

Dokumen ini menerjemahkan [UI/UX Overview](./01-ui-ux-overview.md) menjadi struktur informasi dan navigasi Nekoru. Dokumen ini menetapkan:

1. pembagian surface learner dan internal;
2. domain informasi serta hubungan antardomain;
3. sitemap konseptual;
4. model navigasi global, lokal, dan focused runtime;
5. entry point, return path, serta cross-link utama;
6. prinsip role-based access untuk Content Operations;
7. aturan responsive pada tingkat arsitektur informasi;
8. state lintas-surface yang harus tetap dapat ditemukan;
9. acceptance criteria untuk penyusunan user flow dan screen inventory.

Dokumen ini tidak menetapkan URL teknis, breakpoint dalam piksel, layout final, atau permission implementation. Nama route pada dokumen ini merupakan ID konseptual yang stabil untuk design, QA, analytics, dan engineering.

## 2. Sumber dan Hierarki Keputusan

Dokumen ini menggunakan sumber berikut:

- [UI/UX Overview](./01-ui-ux-overview.md)
- [Product Overview](../product-specs/product-overview.md)
- [Arsitektur Kurikulum](../product-specs/curriculum-architecture.md)
- [Mastery Specification](../product-specs/mastery-specification.md)
- [Learning Engine](../product-specs/learning-engine.md)
- [Practice Engine](../product-specs/practice-engine.md)
- [Assessment Specification N5](../product-specs/assessment-specification-n5.md)
- [Content Validation Rubric](../product-specs/content-validation-rubric.md)
- [Content Progression N5](../content/content-progression-n5.md)

Jika struktur navigasi menyederhanakan konsep produk, penyederhanaan hanya berlaku pada label dan pengelompokan. Status, eligibility, evidence, mastery, assessment integrity, authority, dan version tidak boleh berubah makna.

## 3. Keputusan Utama

| Area | Keputusan |
| --- | --- |
| Surface | Learner App dan Content Operations merupakan dua surface terpisah secara navigasi dan permission |
| Fondasi visual | Kedua surface berbagi token, accessibility foundation, dan primitive component; density serta navigation pattern boleh berbeda |
| Identitas | Clerk Hobby menjadi identity provider; authorization aplikasi tetap dimiliki backend Nekoru |
| Learner | Responsive mobile-first; seluruh alur belajar inti tetap lengkap pada mobile |
| Content Operations | Desktop-first karena authoring, perbandingan, validation, dependency, dan audit membutuhkan ruang informasi tinggi |
| Navigasi learner | Empat tujuan global: Beranda, Belajar, Jadwal, dan Progres; Profil/Pengaturan melalui account entry |
| Runtime | Practice dan assessment menggunakan focused runtime di luar shell navigasi global |
| Kurikulum | Stage → Unit → Lesson merupakan model navigasi learner; Knowledge Component dan evidence tetap menjadi detail, bukan navigasi primer |
| Rekomendasi | Satu primary next action pada Beranda; alternatif eligible tetap dapat ditemukan pada Belajar |
| Content Operations | Enam tujuan global: Dashboard, Konten, Review, Rilis, Masalah, dan Audit |
| Akses | Menu dan aksi mengikuti role, assignment, status, serta authority matrix; menyembunyikan menu bukan pengganti authorization |
| Bahasa | Label learner menggunakan istilah yang mudah dipahami; canonical ID dan terminology internal tetap tersedia pada detail/audit internal |

## 4. Prinsip Arsitektur Informasi

### 4.1 Berorientasi tugas pengguna

Pengelompokan utama mengikuti tujuan pengguna—mulai belajar, melihat jalur, mengatur waktu, memahami progres, meninjau konten—bukan nama service seperti Learning Engine atau Practice Engine.

### 4.2 Next action lebih utama daripada katalog

Learner tidak perlu menelusuri seluruh kurikulum untuk memulai. Beranda menampilkan satu tindakan utama berdasarkan session plan aktif atau rekomendasi terbaru.

### 4.3 Kedalaman mengikuti kebutuhan

Ringkasan menampilkan status dan tindakan. Detail learner menjelaskan alasan serta bukti yang dapat dipahami. Audit internal menampilkan ID, version, reason code, dependency, dan riwayat keputusan.

### 4.4 Status memiliki satu sumber kebenaran

Status sesi, mastery, jadwal, readiness, konten, review, dan publication ditampilkan dari sumber berwenang. UI tidak membuat status bayangan berdasarkan layar yang pernah dibuka atau aksi lokal yang belum tersinkronisasi.

### 4.5 Konteks aktivitas tidak hilang

Setiap lesson, review, remedial, checkpoint, atau simulation mempertahankan hubungan ke stage/unit, tujuan, status, dan alasan pemilihannya. Content Operations mempertahankan hubungan artefak ke version, dependency, review, pack, dan issue.

### 4.6 Risiko dan blocker mudah ditemukan

Target berisiko, review overdue, remedial blocker, evaluation pending, sync conflict, mandatory validation gate, dan quarantined content tidak boleh hanya muncul pada halaman detail yang sulit ditemukan.

### 4.7 Navigation tidak membocorkan assessment

Struktur, label, history, atau deep link tidak boleh mengungkap answer key, unreleased feedback, locked item, atau konten assessment sebelum release policy mengizinkan.

## 5. Pembagian Surface

### 5.1 Learner App

Surface utama untuk pelajar. Mengoptimalkan kejelasan, fokus, durasi singkat, touch interaction, keterbacaan bahasa Jepang, dan kelanjutan sesi lintas-device.

Learner App mencakup:

- entry dan onboarding;
- home serta next action;
- jalur belajar dan aktivitas eligible;
- jadwal adaptif;
- practice dan assessment runtime;
- progres, mastery, readiness, dan gamifikasi;
- profil, preference, accessibility, reminder, offline, serta account state;
- content issue reporting.

### 5.2 Content Operations

Surface internal untuk authoring, review, approval, publication, issue, quarantine, dan audit. Surface ini menggunakan navigasi serta permission sendiri dan tidak dapat diakses melalui menu learner biasa.

Content Operations mencakup:

- work queue dan operational dashboard;
- content bank serta artifact detail;
- automated validation dan review lintas-peran;
- release/content pack management;
- issue, quarantine, correction, dan adjudication;
- audit history, dependency, gap, serta quality report.

### 5.3 Fondasi bersama

Kedua surface berbagi:

- identity dan session security;
- core color, typography, spacing, focus, icon, feedback, dan status semantics;
- format tanggal, waktu, locale, serta teks Jepang;
- accessibility primitives;
- error, loading, permission-denied, expired-session, dan maintenance pattern;
- component semantics seperti button, field, dialog, table, badge, alert, serta toast.

Kedua surface tidak harus berbagi navigation shell, density, data table pattern, atau page template yang sama.

### 5.4 Identity dan authorization boundary

- Clerk Hobby menangani Google OAuth, learner email link, identity session, dan account linking.
- Learner dapat menggunakan Google atau email link; Content Operations hanya menggunakan Google pada MVP.
- Tidak ada self-registration pada Content Operations. Google identity harus cocok dengan active staff allowlist.
- Staff role, permission, assignment, separation of duties, dan authority disimpan serta dievaluasi backend Nekoru.
- Clerk user ID menjadi external identity reference, bukan role atau sumber authority.
- Menyembunyikan internal navigation tidak menggantikan server authorization pada setiap object read dan mutation.

## 6. Model Domain Informasi

### 6.1 Domain learner

| Domain | Objek utama | Pertanyaan yang dijawab |
| --- | --- | --- |
| Identitas | Account, learner profile, timezone, preference, accommodation | “Siapa saya dan bagaimana Nekoru menyesuaikan pengalaman?” |
| Tujuan | Program, target date, focus preference | “Apa tujuan saya?” |
| Kurikulum | Stage, unit, lesson, outcome, prerequisite | “Apa struktur yang perlu saya kuasai?” |
| Rencana | Learning plan, projection, risk, session plan | “Apa yang sebaiknya saya lakukan berikutnya?” |
| Waktu | Availability, scheduled session, missed session, replan | “Kapan dan berapa lama saya belajar?” |
| Aktivitas | Practice run, activity, attempt, hint, feedback | “Apa yang saya kerjakan sekarang?” |
| Penguasaan | Topic/KC presentation, domain status, retention, weakness | “Apa yang sudah kuat dan apa yang perlu diulang?” |
| Asesmen | Placement, verification, checkpoint, review, simulation, result | “Bagaimana kemampuan saya diverifikasi?” |
| Readiness | Requirement, readiness snapshot, critical weakness | “Seberapa siap saya menuju N5 dan apa yang kurang?” |
| Motivasi | Meaningful activity, XP, level, streak, achievement | “Bagaimana konsistensi saya diapresiasi?” |
| Reliability | Offline package, sync, evaluation pending, technical issue | “Apakah pekerjaan saya aman dan sudah tersimpan?” |

### 6.2 Hierarki kurikulum learner

```text
Program N5
└── Stage S0–S5
    └── Unit U01–U24
        └── Lesson package
            └── Session atau aktivitas yang direncanakan
                └── Introduction / guided / independent / review / remedial
```

Knowledge Component merupakan unit internal untuk mastery dan evidence. Pada UI learner, KC ditampilkan sebagai “topik”, “kemampuan”, atau label domain yang telah dikurasi. Canonical KC ID hanya muncul pada detail teknis, support context, atau internal surface.

Session plan bukan anak statis dari satu lesson: satu sesi dapat menggabungkan materi baru, review, remedial, dan exit check dari beberapa target. UI harus mempertahankan `purpose` dan `reason` per bagian agar komposisi adaptif dapat dipahami.

### 6.3 Domain Content Operations

| Domain | Objek utama | Pertanyaan yang dijawab |
| --- | --- | --- |
| Inventory | KC, vocabulary, Kanji, grammar, reading/listening blueprint | “Apa target akademik dan batasnya?” |
| Content | Item, template, stimulus, option, answer, rubric, hint, feedback | “Apa yang akan dilihat dan dikerjakan learner?” |
| Asset | Audio, image, glyph, animation, transcript, rights manifest | “Aset apa yang digunakan dan apakah valid?” |
| Assembly | Lesson package, content pack, assessment form | “Bagaimana artefak dirakit untuk delivery?” |
| Validation | Criterion, automated result, review, finding, evidence | “Apa yang lulus, gagal, belum diuji, atau perlu diperbaiki?” |
| Governance | Approval, lifecycle status, version, dependency, waiver | “Siapa memutuskan apa dan terhadap versi mana?” |
| Operations | Assignment, queue, publication, quarantine, correction | “Pekerjaan apa yang harus dilakukan sekarang?” |
| Quality | Content issue, content gap, drift, ambiguity, failure report | “Apa yang berisiko atau kurang?” |
| Audit | Decision log, event, migration, recalculation, rollback | “Bagaimana keputusan dan dampaknya direproduksi?” |

### 6.4 Hierarki artefak internal

```text
Curriculum version
├── Inventory dan blueprint
├── Stage / Unit / Lesson package
├── Content item atau parameterized template
│   ├── Stimulus, option, answer, rationale, hint, feedback
│   ├── Primary/supporting KC mapping
│   ├── Accessibility metadata
│   └── Asset + rights/attribution
├── Content pack
└── Assessment blueprint / form

Setiap artefak
├── Version dan lifecycle status
├── Automated validation
├── Review, finding, dan approval
├── Dependency dan usage
├── Issue/quarantine/correction
└── Audit history
```

## 7. Sitemap Learner App

### 7.1 Entry dan onboarding

```text
L-ENTRY
├── L-AUTH — Masuk / buat akun / pemulihan akun
├── L-ONB-GOAL — Tujuan dan target tanggal
├── L-ONB-AVAILABILITY — Hari, durasi, dan timezone
├── L-ONB-PREFERENCES — Fokus dan kebutuhan aksesibilitas
├── L-ONB-ROUTE — Mulai dari dasar atau placement
├── L-ONB-PLAN — Rencana awal dan proyeksi
└── L-ONB-COMPLETE — Konfirmasi dan mulai belajar
```

`L-AUTH` tetap konseptual sampai metode autentikasi diputuskan. Onboarding menyimpan draft setelah setiap langkah yang valid dan dapat dilanjutkan tanpa mengulang input.

### 7.2 App shell

```text
L-APP
├── L-HOME — Beranda
│   ├── Sesi utama: mulai / resume
│   ├── Review atau remedial yang mendesak
│   ├── Perubahan rencana dan reason
│   ├── Target risk atau blocker
│   └── Ringkasan konsistensi
├── L-LEARN — Belajar
│   ├── L-LEARN-PATH — Jalur Stage → Unit → Lesson
│   ├── L-LEARN-REVIEW — Review yang tersedia
│   ├── L-LEARN-PRACTICE — Latihan bebas yang eligible
│   ├── L-LEARN-ASSESSMENTS — Checkpoint/simulation yang eligible
│   └── L-LEARN-DETAIL — Detail unit/lesson/topik
├── L-SCHEDULE — Jadwal
│   ├── L-SCHEDULE-WEEK — Rencana mingguan
│   ├── L-SCHEDULE-AVAILABILITY — Hari dan durasi
│   ├── L-SCHEDULE-REPLAN — Proposal perubahan
│   └── L-SCHEDULE-TARGET — Target, proyeksi, dan risk
├── L-PROGRESS — Progres
│   ├── L-PROGRESS-OVERVIEW — Ringkasan lintas-domain
│   ├── L-PROGRESS-DOMAIN — Vocabulary/Kanji/Grammar/Reading/Listening
│   ├── L-PROGRESS-READINESS — Readiness dan requirement
│   ├── L-PROGRESS-ASSESSMENTS — Riwayat assessment
│   └── L-PROGRESS-ACHIEVEMENTS — XP, level, streak, achievement
└── L-ACCOUNT — Profil dan Pengaturan
    ├── L-ACCOUNT-PROFILE — Profil learner
    ├── L-ACCOUNT-GOAL — Target dan preferensi fokus
    ├── L-ACCOUNT-ACCESSIBILITY — Accessibility/accommodation
    ├── L-ACCOUNT-REMINDERS — Reminder dan consent
    ├── L-ACCOUNT-OFFLINE — Download serta sync state
    ├── L-ACCOUNT-DEVICE — Session/perangkat aktif
    └── L-ACCOUNT-SECURITY — Account dan keamanan
```

### 7.3 Focused practice runtime

```text
L-PRACTICE
├── L-PRACTICE-INTRO — Tujuan, komposisi, durasi, dan aturan sesi
├── L-PRACTICE-ACTIVITY — Prompt/stimulus dan response interaction
├── L-PRACTICE-HINT — Hint bertahap sesuai policy
├── L-PRACTICE-FEEDBACK — Feedback sesuai release policy
├── L-PRACTICE-PAUSE — Pause/exit confirmation
├── L-PRACTICE-PENDING — Evaluation pending atau sync pending
├── L-PRACTICE-RECOVERY — Asset/network/version recovery
├── L-PRACTICE-REPORT — Laporkan masalah dalam konteks item
└── L-PRACTICE-SUMMARY — Ringkasan aktivitas, progres, dan next action
```

Practice runtime tidak menampilkan global bottom navigation atau desktop sidebar. Header minimum mempertahankan posisi sesi, status simpan/sync, bantuan yang diizinkan, dan exit/pause. Keluar dari runtime harus memiliki return target yang jelas.

### 7.4 Focused assessment runtime

```text
L-ASSESSMENT
├── L-ASSESSMENT-ELIGIBILITY — Status eligible, retake, atau blocker
├── L-ASSESSMENT-BRIEF — Tujuan, aturan, feedback release, dan waktu
├── L-ASSESSMENT-CHECK — Koneksi, audio, accommodation, dan device
├── L-ASSESSMENT-SECTION — Timed/untimed section dan item
├── L-ASSESSMENT-TRANSITION — Perpindahan section tanpa feedback
├── L-ASSESSMENT-RESUME — Grace, remaining time, dan locked manifest
├── L-ASSESSMENT-ISSUE — Gangguan teknis/integrity state
├── L-ASSESSMENT-SUBMIT — Review dan confirm-submit sesuai policy
└── L-ASSESSMENT-RESULT — Hasil, diagnostic summary, disclaimer, next action
```

Assessment runtime tidak menyediakan jalur keluar menuju layar lain tanpa pause/abandon/invalidation rule yang eksplisit. Global navigation disembunyikan. History hanya menampilkan hasil yang sudah dirilis.

### 7.5 System dan recovery state

```text
L-SYSTEM
├── L-SYSTEM-OFFLINE
├── L-SYSTEM-SYNCING
├── L-SYSTEM-CONFLICT
├── L-SYSTEM-UPDATE-REQUIRED
├── L-SYSTEM-MAINTENANCE
├── L-SYSTEM-PERMISSION-DENIED
├── L-SYSTEM-NOT-FOUND
└── L-SYSTEM-SESSION-EXPIRED
```

System state dapat berupa page, banner, inline alert, dialog, atau status component sesuai dampaknya. Bentuk final ditentukan screen specification dan state matrix.

## 8. Navigasi Global Learner

### 8.1 Destinasi primer

| Label | Tujuan | Tindakan utama | Informasi kritis |
| --- | --- | --- | --- |
| **Beranda** | Memulai atau melanjutkan langkah terbaik sekarang | Mulai/resume sesi | Alasan rekomendasi, durasi, due review, risk, sync |
| **Belajar** | Menjelajahi jalur dan aktivitas eligible | Buka unit/lesson atau aktivitas | Locked/available/active/checkpoint/remedial state |
| **Jadwal** | Mengatur waktu dan memahami proyeksi | Ubah availability atau tanggapi replan | Sesi terjadwal, backlog, target risk |
| **Progres** | Memahami kemampuan dan kesiapan | Lihat gap atau next action | Mastery, retention, assessment, readiness, achievement |

Profil dan Pengaturan dibuka melalui avatar/account entry pada header. Pada mobile, empat destinasi primer menggunakan bottom navigation. Pada viewport lebih lebar, destinasi yang sama dapat berubah menjadi sidebar atau top-level navigation tanpa mengubah nama dan hierarchy.

### 8.2 Default destination

Setelah onboarding selesai, default destination adalah Beranda. Pengecualian:

- active practice run → tawarkan resume sebelum tindakan lain;
- active assessment run → arahkan ke assessment resume/integrity state;
- account/session issue → arahkan ke recovery yang diperlukan;
- onboarding belum selesai → lanjutkan langkah valid terakhir;
- mandatory re-consent atau migration yang memblokir → tampilkan interstitial sebelum app shell.

### 8.3 Badge dan indicator

Badge hanya digunakan untuk state yang membutuhkan perhatian:

- review/remedial due;
- proposal replan yang belum ditanggapi;
- assessment/checkpoint eligible atau pending;
- evaluation/sync issue;
- target risk atau critical blocker.

XP, streak, dan achievement baru tidak menggunakan badge pada seluruh navigation jika tidak membutuhkan tindakan. Jumlah badge tidak boleh menggabungkan objek dengan urgensi berbeda tanpa detail yang dapat dibuka.

## 9. Hierarki Informasi per Destinasi Learner

### 9.1 Beranda

Urutan prioritas:

1. active run yang dapat di-resume;
2. blocking technical/account state;
3. primary recommended session;
4. overdue review atau remedial blocker;
5. perubahan plan/target risk yang perlu keputusan;
6. sesi berikutnya dan ringkasan minggu;
7. ringkasan progres serta gamifikasi.

Beranda tidak menjadi katalog seluruh lesson, statistik, atau achievement. Informasi sekunder mengarah ke destinasi detail yang tepat.

### 9.2 Belajar

Urutan prioritas:

1. stage/unit aktif dan next eligible target;
2. blocker, prerequisite, checkpoint, atau remedial;
3. jalur lengkap dengan progressive disclosure;
4. review dan free practice yang eligible;
5. assessment yang eligible;
6. materi selesai dan enrichment.

Locked target dapat dilihat beserta alasan yang dapat dipahami, tetapi tidak memiliki tindakan “lewati” jika hard prerequisite belum terpenuhi.

### 9.3 Jadwal

Urutan prioritas:

1. status target dan perubahan yang perlu keputusan;
2. rencana hari ini/minggu ini;
3. overdue review dan beban tersisa;
4. availability serta durasi;
5. proyeksi jangka panjang dan pilihan target;
6. riwayat perubahan plan bila relevan.

### 9.4 Progres

Urutan prioritas:

1. interpretasi ringkas dan next action;
2. progres kurikulum dan status domain;
3. review/retention serta weakness;
4. readiness requirement;
5. hasil assessment yang sudah dirilis;
6. XP, level, streak, dan achievement;
7. detail evidence learner-facing bila dibutuhkan.

Progres completion dan mastery tidak menggunakan meter tunggal yang menyiratkan keduanya identik.

## 10. Cross-Link dan Return Path Learner

| Dari | Tindakan | Menuju | Return path |
| --- | --- | --- | --- |
| Beranda | Mulai sesi | Practice intro/runtime | Session summary → Beranda |
| Beranda | Tinjau perubahan rencana | Replan detail | Beranda atau Jadwal |
| Belajar | Pilih unit/lesson | Detail unit/lesson | Posisi terakhir pada jalur |
| Detail lesson | Mulai aktivitas eligible | Practice runtime | Summary → detail lesson atau Beranda |
| Jadwal | Buka sesi terjadwal | Session detail/practice intro | Jadwal pada minggu yang sama |
| Progres | Perkuat gap | Review/remedial intro | Summary → detail domain |
| Readiness | Kerjakan next action | Assessment/review/remedial | Readiness dengan snapshot terbaru |
| Assessment history | Lihat hasil | Released result | History dengan filter terakhir |
| Runtime | Laporkan konten | Contextual report | Kembali ke state runtime tanpa kehilangan draft |

Back browser atau system back mengikuti hierarchy di atas. Back tidak boleh membuat submission baru, membuka feedback yang ditahan, mereset timer, atau mengganti locked instance.

## 11. Deep Link, Resume, dan State Persistence

### 11.1 Deep link

Deep link learner boleh membuka:

- Beranda;
- unit/lesson yang dapat dilihat;
- jadwal minggu tertentu;
- domain progress;
- released assessment result;
- achievement;
- profile/settings section.

Deep link tidak boleh langsung membuka locked activity instance, unreleased assessment item, answer key, atau internal reason detail. Jika target tidak lagi eligible, UI menjelaskan perubahan dan menawarkan target valid.

### 11.2 Resume

Practice/assessment resume menggunakan run dan revision aktif. Navigasi mengarahkan ke state server terbaru atau safe offline state, bukan membangun ulang posisi hanya dari URL.

### 11.3 Draft dan scroll/filter state

- onboarding mempertahankan input valid per langkah;
- contextual report mempertahankan draft sampai dikirim/dibatalkan;
- Belajar mempertahankan stage/unit yang terakhir dibuka;
- Jadwal mempertahankan minggu aktif;
- Progres mempertahankan domain/tab dan rentang yang dipilih;
- Content Operations mempertahankan filter/sort melalui shareable view state jika tidak memuat data sensitif.

## 12. Sitemap Content Operations

```text
C-OPS
├── C-DASHBOARD — Dashboard
│   ├── Antrean dan assignment saya
│   ├── Mandatory gate/failure
│   ├── Release readiness
│   ├── Issue/quarantine kritis
│   └── Content gap dan quality signal
├── C-CONTENT — Konten
│   ├── C-CONTENT-INVENTORY — Inventory dan blueprint
│   ├── C-CONTENT-ITEMS — Item dan template
│   ├── C-CONTENT-OBJECTS — Reading/listening object
│   ├── C-CONTENT-LESSONS — Lesson package
│   ├── C-CONTENT-ASSESSMENTS — Blueprint/form assessment
│   ├── C-CONTENT-ASSETS — Audio/image/glyph/animation
│   └── C-CONTENT-DETAIL — Body, metadata, dependency, version
├── C-REVIEW — Review
│   ├── C-REVIEW-QUEUE — Assigned/unassigned queue
│   ├── C-REVIEW-DETAIL — Criterion, evidence, finding, decision
│   ├── C-REVIEW-COMPARE — Version/variant comparison
│   └── C-REVIEW-APPROVAL — Authority dan approval state
├── C-RELEASE — Rilis
│   ├── C-RELEASE-PACKS — Content pack
│   ├── C-RELEASE-VALIDATION — Release validation
│   ├── C-RELEASE-DEPENDENCIES — Compatibility dan dependency
│   ├── C-RELEASE-PUBLISH — Publish confirmation
│   └── C-RELEASE-HISTORY — Publication/deprecation history
├── C-ISSUES — Masalah
│   ├── C-ISSUES-INBOX — Learner/reviewer/analytics/validator reports
│   ├── C-ISSUES-DETAIL — Triage, impact, evidence, linked artifact
│   ├── C-ISSUES-QUARANTINE — Decision dan fallback state
│   ├── C-ISSUES-CORRECTION — Correction/review workflow
│   └── C-ISSUES-ADJUDICATION — Historical impact dan decision
├── C-AUDIT — Audit
│   ├── C-AUDIT-DECISIONS — Approval/publication/quarantine log
│   ├── C-AUDIT-VERSIONS — Version dan migration history
│   ├── C-AUDIT-DEPENDENCIES — Usage dan downstream impact
│   ├── C-AUDIT-QUALITY — Drift, gap, ambiguity, failure
│   └── C-AUDIT-EXPORT — Authorized report/export
└── C-ACCOUNT — Account dan Preferences
    ├── C-ACCOUNT-PROFILE
    ├── C-ACCOUNT-ROLE
    ├── C-ACCOUNT-ACCESSIBILITY
    └── C-ACCOUNT-SECURITY
```

## 13. Navigasi Global Content Operations

| Label | Tujuan | Primary objects |
| --- | --- | --- |
| **Dashboard** | Melihat pekerjaan dan risiko terpenting | Assignment, gate failure, release, issue, gap |
| **Konten** | Menemukan serta mengelola artefak | Inventory, item, object, lesson, form, asset |
| **Review** | Menilai criterion dan mengambil keputusan sesuai authority | Review, finding, evidence, approval |
| **Rilis** | Memvalidasi compatibility dan mempublikasikan pack | Pack, manifest, dependency, publication |
| **Masalah** | Menangani issue, quarantine, dan correction | Issue, impact, fallback, adjudication |
| **Audit** | Mereproduksi perubahan dan keputusan | Version, event, decision, migration, report |

Account serta role context berada pada account entry, bukan tujuan global. Search lintas-artefak tersedia pada shell desktop dan mengembalikan hasil sesuai permission.

## 14. Detail Artefak Internal

Setiap `C-CONTENT-DETAIL` minimal memiliki local navigation berikut:

1. **Ringkasan** — tipe, status, version, owner, scope, dan next action;
2. **Isi** — body, stimulus, option, answer, rubric, hint, feedback, atau field domain;
3. **Preview** — representasi learner per mode, viewport, dan modality;
4. **Validation** — automated result, criterion, gate, dan fixture;
5. **Review** — assignment, finding, decision, dan approval;
6. **Dependency** — curriculum, KC, lesson, pack, form, asset, dan usage;
7. **Versi** — diff, migration, compatibility, dan supersession;
8. **Masalah** — linked issue, quarantine, correction, dan adjudication;
9. **Audit** — immutable history dan actor/timestamp.

Tab hanya ditampilkan jika berlaku pada tipe artefak, tetapi status gate, version, dan unresolved finding selalu terlihat pada summary header.

## 15. Role-Based Information Access

### 15.1 Prinsip

- Authorization ditegakkan pada server untuk setiap objek dan mutasi.
- Navigation hanya menampilkan area yang dapat digunakan role, tetapi direct access tetap diperiksa ulang.
- Hak aksi bergantung pada role, assignment, artifact type, lifecycle status, version, dan separation of duties.
- Author tidak dapat menjadi satu-satunya academic/linguistic approver untuk artefak yang dibuatnya.
- UI menampilkan alasan ketika aksi tidak tersedia: tidak berwenang, belum ditugaskan, gate gagal, versi berubah, atau status tidak kompatibel.
- Pergantian role context tidak boleh mengubah record yang sedang dilihat tanpa pemberitahuan.

### 15.2 Matriks akses konseptual

| Kelompok | Lihat | Buat/edit | Review | Approve | Publish/quarantine | Audit |
| --- | --- | --- | --- | --- | --- | --- |
| Content Author | Artefak relevan | Ya, pada status yang diizinkan | Self-check dan response | Tidak untuk karya sendiri sebagai sole approver | Tidak | Riwayat artefak relevan |
| Academic/Linguistic/Assessment/Domain Reviewer | Artefak assigned/relevan | Finding/comment; correction jika policy mengizinkan | Ya sesuai kompetensi | Sesuai authority matrix | Consulted/required sesuai keputusan | Review dan decision terkait |
| Localization/Accessibility/Technical/Rights Reviewer | Artefak assigned/relevan | Finding/comment; field tertentu jika diizinkan | Ya sesuai kompetensi | Sesuai authority matrix | Consulted/required sesuai keputusan | Review dan decision terkait |
| Content Operations | Seluruh workflow operasional | Metadata/assignment/status operasional | Monitor completeness | Hanya pada authority operasional | Ya sesuai lifecycle/authority | Workflow dan publication history |
| Product Owner | Scope dan risiko lintas-tim | Keputusan produk terkontrol | Consulted | High-risk product decision | Sesuai authority matrix | Lintas-domain sesuai permission |

Matriks ini membantu IA; sumber otoritatif untuk keputusan akhir tetap authority matrix pada Content Validation Rubric.

## 16. Search, Filter, dan Saved View Internal

Search harus dapat menemukan artefak berdasarkan:

- stable ID dan version;
- judul atau label;
- domain, stage, unit, lesson, serta KC;
- content/interaction/activity type;
- lifecycle dan validation status;
- author, reviewer, assignment, serta owner;
- pack/form/dependency;
- issue, finding, criterion, dan severity.

Filter minimum mengikuti konteks halaman dan dapat digabung. Hasil selalu menampilkan tipe objek, ID, version, status, dan konteks utama agar item bernama serupa tidak tertukar.

Saved view dapat disimpan secara pribadi atau dibagikan kepada kelompok yang berwenang. URL atau export tidak boleh mengandung answer key, raw learner response, atau data sensitif tanpa authorization.

## 17. Cross-Link Content Operations

| Dari | Menuju | Tujuan |
| --- | --- | --- |
| Dashboard assignment | Review detail | Memulai pekerjaan yang ditugaskan |
| Content detail | Curriculum/KC/lesson | Memeriksa alignment dan dependency |
| Content detail | Preview | Memeriksa learner presentation dan modality |
| Validation failure | Criterion/field/fixture | Menemukan sumber kegagalan |
| Finding | Artifact version dan evidence | Memahami konteks keputusan |
| Review | Approval state | Mengetahui authority yang masih diperlukan |
| Pack validation | Artifact/dependency | Memperbaiki blocker rilis |
| Learner issue | Item/run context terbatas | Melakukan triage tanpa membuka data learner berlebihan |
| Quarantine | Fallback dan downstream usage | Menilai dampak operasional |
| Version history | Diff/migration/rollback | Mereproduksi perubahan |
| Audit event | Actor, decision, artifact version | Membuktikan siapa memutuskan apa dan kapan |

Cross-link kembali mempertahankan filter, tab, dan posisi sebelumnya. Breadcrumb mengikuti hierarchy informasi, bukan riwayat klik acak.

## 18. Responsive Information Architecture

### 18.1 Learner mobile-first

- Empat destinasi global tetap sama pada seluruh viewport.
- Mobile menggunakan bottom navigation; viewport lebar dapat memakai sidebar atau top-level navigation.
- Hierarki informasi menggunakan progressive disclosure: summary → detail → audit/support context.
- Tabel learner diubah menjadi list/card atau detail berjenjang tanpa menghapus label, status, dan tindakan penting.
- Practice interaction tidak bergantung pada hover, drag presisi, atau keyboard Jepang.
- Focused runtime mempertahankan prompt, response, primary action, feedback, dan progress pada viewport sempit tanpa horizontal scroll untuk alur utama.
- Orientation change atau resize tidak mereset draft, attempt, timer, replay count, atau scroll context penting.

### 18.2 Content Operations desktop-first

- Desktop menyediakan persistent navigation, search, queue context, multi-column comparison, dense table, dan detail panel.
- Authoring, approval, publication, quarantine, bulk action, serta version comparison merupakan desktop-critical workflow.
- Viewport sempit tetap memberikan access-denied/error/recovery dan ringkasan read-only yang aman; mutasi kompleks tidak wajib tersedia sampai responsive specification menetapkannya.
- UI tidak memadatkan comparison atau validation matrix sampai evidence, version, finding, atau gate kehilangan hubungan visual.
- Keyboard navigation dan zoom tetap wajib walaupun surface desktop-first.

## 19. State yang Harus Dapat Ditemukan

### 19.1 Learner

| State | Lokasi utama | Lokasi sekunder |
| --- | --- | --- |
| Active/resumable run | Beranda | Belajar atau assessment entry |
| Review due/overdue | Beranda | Belajar → Review; Jadwal |
| Remedial blocker | Beranda | Belajar → unit/topik; Progres |
| Target at risk/unrealistic | Beranda | Jadwal → Target |
| Checkpoint/simulation eligible | Belajar | Beranda; Progres → Readiness |
| Evaluation pending | Beranda bila berdampak | Session/result history |
| Offline/sync conflict | Global status | Account → Offline |
| Locked prerequisite | Belajar | Detail unit/topik |
| Critical weakness | Progres → Readiness | Beranda bila memerlukan tindakan |

### 19.2 Content Operations

| State | Lokasi utama | Lokasi sekunder |
| --- | --- | --- |
| Assigned review | Dashboard | Review queue |
| Mandatory gate failure | Dashboard | Artifact validation; release validation |
| Unresolved blocker/major finding | Review queue | Artifact summary |
| Missing approver | Review/approval | Dashboard bila menghambat release |
| Pack not releasable | Rilis | Linked artifact/dependency |
| Critical content issue | Dashboard | Masalah |
| Quarantined published content | Masalah | Artifact summary; release history |
| Content gap | Dashboard | Audit → Quality; linked curriculum |
| Version incompatibility | Rilis | Artifact version/dependency |

## 20. Naming dan Labeling

### 20.1 Label learner

| Konsep internal | Label utama learner | Catatan |
| --- | --- | --- |
| Learning plan/session plan | Rencana belajar/sesi | Hindari “plan revision” |
| Knowledge Component | Topik atau kemampuan | Gunakan nama materi nyata |
| Hard prerequisite | Dasar yang perlu dikuasai | Jelaskan hubungan ke target |
| Mastery | Penguasaan | Bedakan dari selesai |
| Provisional mastery | Dikuasai sementara | Masih memerlukan bukti setelah jeda |
| Review urgency | Waktunya review / review terlambat | Jangan menyebut decay tanpa evidence |
| Remedial | Penguatan | “Remedial” boleh muncul pada detail bila sudah dijelaskan |
| Readiness | Kesiapan N5 | Selalu dengan definisi internal/disclaimer |
| Simulation | Simulasi N5 | Bukan ujian resmi |
| Evaluation pending | Jawaban sedang dinilai | Tidak dianggap salah |
| Technical skip | Dilewati karena kendala teknis | Berbeda dari tidak menjawab |

### 20.2 Label internal

Content Operations mempertahankan canonical ID, enum, version, criterion ID, reason code, serta lifecycle status. Label manusia ditampilkan berdampingan jika tersedia; label tidak mengganti nilai canonical pada copy, export, audit, atau debugging.

## 21. Analytics Context untuk Navigation

Setiap page/screen view minimal membawa konteks yang relevan dan tidak sensitif:

- surface dan conceptual route ID;
- entry source dan return target;
- learner journey phase atau internal workflow phase;
- active stage/unit/lesson atau artifact type/status bila relevan;
- reason category untuk rekomendasi atau blocker;
- viewport class dan input modality secara terbatas;
- online/offline/sync state;
- role context pada internal surface.

Analytics tidak menyimpan answer key, full raw response, private reviewer note, atau content body dalam navigation event.

## 22. Acceptance Criteria

Information architecture dianggap siap menjadi dasar user flow dan screen inventory apabila:

1. Learner App dan Content Operations terpisah secara navigation serta permission;
2. empat destinasi learner dan enam destinasi internal mencakup seluruh scope MVP tanpa bergantung pada menu generik “lainnya”;
3. setiap journey utama memiliki entry point dan return path;
4. practice serta assessment memakai focused runtime dengan aturan navigasi yang berbeda;
5. hierarchy Stage → Unit → Lesson dapat ditemukan tanpa menjadikan KC sebagai jargon navigasi primer;
6. completion, mastery, readiness, dan gamification tetap terpisah secara informasi;
7. due review, blocker, risk, pending evaluation, sync issue, mandatory gate, dan quarantine mudah ditemukan;
8. navigation mobile learner dan desktop internal mempertahankan tujuan serta status yang sama;
9. role visibility tidak dianggap sebagai pengganti authorization atau authority matrix;
10. deep link, browser back, resume, dan state persistence tidak mengubah attempt, timer, feedback release, atau locked version;
11. semua route konseptual dapat dipetakan ke screen specification atau reusable state/pattern;
12. belum ada URL, layout, breakpoint, atau metode autentikasi yang dikunci tanpa keputusan produk terkait.

## 23. Keputusan dan Pertanyaan untuk Dokumen Turunan

| ID | Pertanyaan | Ketetapan atau rekomendasi | Status |
| --- | --- | --- | --- |
| `IA-OPEN-001` | Apakah akun wajib dibuat sebelum pengguna mengisi tujuan? | Tujuan dan availability dapat diisi sebagai draft tamu; akun wajib sebelum placement dimulai atau rencana pertama disimpan | **Ditetapkan** |
| `IA-OPEN-002` | Apakah bottom navigation tetap terlihat ketika learner membuka detail lesson? | Ya pada detail eksplorasi; sembunyikan setelah focused runtime dimulai | Terbuka |
| `IA-OPEN-003` | Apakah Progres dan Achievement perlu dipisah? | Tidak untuk MVP; achievement berada sebagai subsection Progres | Terbuka |
| `IA-OPEN-004` | Apakah learner dapat memilih lesson selesai untuk latihan ulang? | Ya sebagai free practice hanya jika engine menyatakan eligible dan menjelaskan dampak evidence | Terbuka |
| `IA-OPEN-005` | Apakah Content Operations memerlukan organization/workspace switcher? | Tidak pada MVP kecuali ada multi-tenant requirement | Terbuka |
| `IA-OPEN-006` | Apakah internal reviewer dapat menjalankan preview interaktif penuh? | Ya dengan environment preview yang jelas dan tidak membuat learner evidence | Terbuka |

`IA-OPEN-001` ditetapkan pada 13 September 2026. Metode autentikasi tetap diputuskan pada screen specification; keputusan ini hanya menetapkan waktu autentikasi di dalam journey.
