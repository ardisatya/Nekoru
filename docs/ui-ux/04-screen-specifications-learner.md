# Screen Specifications Learner Nekoru — MVP

**Status:** Draft v0.1  
**Audiens:** Product, design, akademik, accessibility, content design, data, QA, dan engineering  
**Cakupan:** Seluruh layar learner dari first visit sampai readiness N5  
**Platform:** Aplikasi web responsive mobile-first  
**Bahasa produk:** Bahasa Indonesia (`id-ID`)  
**Tanggal:** 13 September 2026

## 1. Tujuan Dokumen

Dokumen ini menjadi kontrak layar learner Nekoru untuk wireframe, prototype, implementasi, analytics, dan QA. Dokumen menetapkan:

1. inventaris layar serta hubungan ke route konseptual;
2. tujuan, data, hierarchy, tindakan, state, dan guardrail setiap layar;
3. shell standard, focused practice runtime, dan focused assessment runtime;
4. perilaku responsive, accessibility, navigation, persistence, serta recovery;
5. representasi learner-facing untuk plan, mastery, readiness, assessment, dan gamification;
6. acceptance criteria yang dapat diuji.

Detail komponen aktivitas—pilihan ganda, matching, ordering, cloze, input Jepang, drag-and-drop, dan audio—ditentukan lebih lanjut dalam `06-practice-interactions.md`. Visual token, ukuran, font, warna, ilustrasi, dan motion ditentukan dalam `07-design-system.md`.

## 2. Sumber dan Hierarki Keputusan

- [UI/UX Overview](./01-ui-ux-overview.md)
- [Information Architecture](./02-information-architecture.md)
- [User Flows](./03-user-flows.md)
- [Product Overview](../product-specs/product-overview.md)
- [Arsitektur Kurikulum](../product-specs/curriculum-architecture.md)
- [Mastery Specification](../product-specs/mastery-specification.md)
- [Learning Engine](../product-specs/learning-engine.md)
- [Practice Engine](../product-specs/practice-engine.md)
- [Assessment Specification N5](../product-specs/assessment-specification-n5.md)
- [Beginner Foundations N5](../content/beginner-foundations-n5.md)
- [Content Progression N5](../content/content-progression-n5.md)
- [Clerk Pricing](https://clerk.com/pricing)
- [Clerk — Google social connection](https://clerk.com/docs/guides/configure/auth-strategies/social-connections/google)
- [Clerk — Email link protection](https://clerk.com/docs/guides/secure/best-practices/protect-email-links)

Jika presentasi layar bertentangan dengan decision output atau policy, sumber pemilik keputusan tetap berwenang. UI tidak mengestimasi sendiri eligibility, mastery, readiness, attempt, score, retake date, atau feedback release.

## 3. Keputusan Screen-Level

| Area | Keputusan MVP |
| --- | --- |
| Identity provider | Clerk Hobby; status dan batas plan harus ditinjau ulang sebelum production release |
| Autentikasi learner | Google Sign-In dan email link melalui Clerk; tanpa password lokal |
| Waktu autentikasi | Goal dan availability boleh diisi sebagai draft tamu; akun wajib sebelum placement dimulai atau initial plan disimpan |
| Navigasi utama | Beranda, Belajar, Jadwal, dan Progres; Profil/Pengaturan melalui account entry |
| Detail lesson | Global navigation tetap terlihat selama eksplorasi |
| Focused runtime | Global navigation disembunyikan selama practice dan assessment |
| Achievement | Berada di Progres; hanya milestone penting muncul ringkas di Beranda |
| Free practice | Tersedia hanya untuk target yang dinyatakan eligible oleh Learning Engine |
| Input Jepang | Keyboard/OS IME tetap didukung; in-app Kana composer tersedia hanya jika activity policy menyatakan equivalence dan dampak evidence |
| Primary CTA | Maksimal satu primary action per state/viewport; secondary action tidak bersaing secara visual |
| Learner terminology | Gunakan topik/kemampuan, bukan KC; “penguatan” sebagai label utama untuk remedial learner-facing |
| Offline | State `tersimpan di perangkat`, `menyinkronkan`, `tersinkron`, `konflik`, `kedaluwarsa`, dan `butuh koneksi` eksplisit |
| Assessment | Memakai shell fokus, server-authoritative timer, locked manifest, dan feedback release dari blueprint |

## 4. ID, Status, dan Priority

### 4.1 Prefix

| Prefix | Keluarga |
| --- | --- |
| `LS-AU` | Authentication |
| `LS-ON` | Onboarding |
| `LS-HO` | Beranda |
| `LS-LE` | Belajar dan kurikulum |
| `LS-SC` | Jadwal dan target |
| `LS-PR` | Progres dan gamifikasi |
| `LS-AC` | Profil/Pengaturan |
| `LS-RT` | Practice runtime |
| `LS-AS` | Assessment runtime |
| `LS-SY` | System/recovery |

### 4.2 Priority

- **P0:** wajib untuk alur MVP end-to-end atau safety/integrity.
- **P1:** penting untuk kelengkapan pengalaman, tetapi dapat dibangun setelah P0 shell tersedia.
- **P2:** enhancement pasca-validasi MVP; tidak boleh menjadi dependency P0.

## 5. Inventaris Layar

### 5.1 Authentication dan onboarding

| ID | Nama layar | Route | Priority |
| --- | --- | --- | --- |
| `LS-AU-01` | Mulai Nekoru | `L-ENTRY` | P0 |
| `LS-AU-02` | Pilih cara masuk | `L-AUTH` | P0 |
| `LS-AU-03` | Masuk dengan email | `L-AUTH` | P0 |
| `LS-AU-04` | Periksa email | `L-AUTH` | P0 |
| `LS-AU-05` | Hasil autentikasi | `L-AUTH` | P0 |
| `LS-ON-01` | Tujuan belajar | `L-ONB-GOAL` | P0 |
| `LS-ON-02` | Waktu belajar | `L-ONB-AVAILABILITY` | P0 |
| `LS-ON-03` | Preferensi awal | `L-ONB-PREFERENCES` | P1 |
| `LS-ON-04` | Pilih titik mulai | `L-ONB-ROUTE` | P0 |
| `LS-ON-05` | Rencana belajar awal | `L-ONB-PLAN` | P0 |
| `LS-ON-06` | Siap mulai | `L-ONB-COMPLETE` | P0 |

### 5.2 App shell

| ID | Nama layar | Route | Priority |
| --- | --- | --- | --- |
| `LS-HO-01` | Beranda | `L-HOME` | P0 |
| `LS-LE-01` | Jalur belajar | `L-LEARN-PATH` | P0 |
| `LS-LE-02` | Detail unit/lesson | `L-LEARN-DETAIL` | P0 |
| `LS-LE-03` | Review | `L-LEARN-REVIEW` | P0 |
| `LS-LE-04` | Latihan bebas | `L-LEARN-PRACTICE` | P1 |
| `LS-LE-05` | Assessment | `L-LEARN-ASSESSMENTS` | P0 |
| `LS-SC-01` | Jadwal mingguan | `L-SCHEDULE-WEEK` | P0 |
| `LS-SC-02` | Atur ketersediaan | `L-SCHEDULE-AVAILABILITY` | P0 |
| `LS-SC-03` | Tinjau perubahan rencana | `L-SCHEDULE-REPLAN` | P0 |
| `LS-SC-04` | Target dan proyeksi | `L-SCHEDULE-TARGET` | P0 |
| `LS-PR-01` | Ringkasan progres | `L-PROGRESS-OVERVIEW` | P0 |
| `LS-PR-02` | Progres per domain | `L-PROGRESS-DOMAIN` | P0 |
| `LS-PR-03` | Kesiapan N5 | `L-PROGRESS-READINESS` | P0 |
| `LS-PR-04` | Riwayat assessment | `L-PROGRESS-ASSESSMENTS` | P1 |
| `LS-PR-05` | Pencapaian | `L-PROGRESS-ACHIEVEMENTS` | P1 |

### 5.3 Profil dan Pengaturan

| ID | Nama layar | Route | Priority |
| --- | --- | --- | --- |
| `LS-AC-01` | Profil dan Pengaturan | `L-ACCOUNT` | P0 |
| `LS-AC-02` | Profil learner | `L-ACCOUNT-PROFILE` | P1 |
| `LS-AC-03` | Tujuan dan fokus | `L-ACCOUNT-GOAL` | P0 |
| `LS-AC-04` | Aksesibilitas | `L-ACCOUNT-ACCESSIBILITY` | P0 |
| `LS-AC-05` | Pengingat | `L-ACCOUNT-REMINDERS` | P1 |
| `LS-AC-06` | Offline dan sinkronisasi | `L-ACCOUNT-OFFLINE` | P0 |
| `LS-AC-07` | Perangkat aktif | `L-ACCOUNT-DEVICE` | P1 |
| `LS-AC-08` | Akun dan keamanan | `L-ACCOUNT-SECURITY` | P0 |

### 5.4 Practice runtime

| ID | Nama layar/state | Route | Priority |
| --- | --- | --- | --- |
| `LS-RT-01` | Pengantar sesi | `L-PRACTICE-INTRO` | P0 |
| `LS-RT-02` | Aktivitas | `L-PRACTICE-ACTIVITY` | P0 |
| `LS-RT-03` | Hint | `L-PRACTICE-HINT` | P0 |
| `LS-RT-04` | Feedback | `L-PRACTICE-FEEDBACK` | P0 |
| `LS-RT-05` | Pause/keluar | `L-PRACTICE-PAUSE` | P0 |
| `LS-RT-06` | Evaluasi/sinkronisasi tertunda | `L-PRACTICE-PENDING` | P0 |
| `LS-RT-07` | Pemulihan sesi | `L-PRACTICE-RECOVERY` | P0 |
| `LS-RT-08` | Laporkan masalah | `L-PRACTICE-REPORT` | P0 |
| `LS-RT-09` | Ringkasan sesi | `L-PRACTICE-SUMMARY` | P0 |

### 5.5 Assessment runtime

| ID | Nama layar/state | Route | Priority |
| --- | --- | --- | --- |
| `LS-AS-01` | Eligibility assessment | `L-ASSESSMENT-ELIGIBILITY` | P0 |
| `LS-AS-02` | Penjelasan assessment | `L-ASSESSMENT-BRIEF` | P0 |
| `LS-AS-03` | Pemeriksaan kesiapan teknis | `L-ASSESSMENT-CHECK` | P0 |
| `LS-AS-04` | Section/item assessment | `L-ASSESSMENT-SECTION` | P0 |
| `LS-AS-05` | Transisi section | `L-ASSESSMENT-TRANSITION` | P0 |
| `LS-AS-06` | Resume assessment | `L-ASSESSMENT-RESUME` | P0 |
| `LS-AS-07` | Gangguan assessment | `L-ASSESSMENT-ISSUE` | P0 |
| `LS-AS-08` | Konfirmasi submit | `L-ASSESSMENT-SUBMIT` | P0 |
| `LS-AS-09` | Hasil assessment | `L-ASSESSMENT-RESULT` | P0 |

### 5.6 System dan recovery

| ID | Nama state | Route | Priority |
| --- | --- | --- | --- |
| `LS-SY-01` | Offline | `L-SYSTEM-OFFLINE` | P0 |
| `LS-SY-02` | Menyinkronkan | `L-SYSTEM-SYNCING` | P0 |
| `LS-SY-03` | Konflik sinkronisasi | `L-SYSTEM-CONFLICT` | P0 |
| `LS-SY-04` | Pembaruan diperlukan | `L-SYSTEM-UPDATE-REQUIRED` | P0 |
| `LS-SY-05` | Maintenance/unavailable | `L-SYSTEM-MAINTENANCE` | P0 |
| `LS-SY-06` | Akses ditolak | `L-SYSTEM-PERMISSION-DENIED` | P0 |
| `LS-SY-07` | Tidak ditemukan | `L-SYSTEM-NOT-FOUND` | P1 |
| `LS-SY-08` | Sesi akun kedaluwarsa | `L-SYSTEM-SESSION-EXPIRED` | P0 |

## 6. Kontrak Universal Layar

### 6.1 Anatomy standard app screen

```text
Skip link
App header: brand + contextual account entry + global status
Page header: title + interpretation/status + optional local action
Critical state region: blocker/risk/pending/offline bila relevan
Primary content region
Secondary/supporting content
Primary next action
Global navigation: Beranda / Belajar / Jadwal / Progres
```

Aturan:

- Hanya satu `h1` dan satu primary action per state.
- Heading mengikuti hierarchy tanpa level yang dilewati.
- Global status hanya menampilkan kondisi lintas-halaman seperti offline, sync conflict, atau session expiry.
- Alert halaman tidak digunakan untuk achievement atau promosi.
- Account entry tetap tersedia pada app shell, tetapi tidak pada focused runtime.

### 6.2 Anatomy focused practice runtime

```text
Session header: keluar/pause + posisi sesi + save/sync status
Purpose/context singkat
Prompt/stimulus
Response region
Hint/support region sesuai policy
Validation/error region
Primary submit/continue action
Feedback region setelah release
```

Tidak ada bottom navigation. Progress tidak menjanjikan jumlah item pasti jika plan dapat berhenti berdasarkan budget/policy; gunakan progress yang sesuai locked run atau label bagian.

### 6.3 Anatomy focused assessment runtime

```text
Assessment header: nama section + progress + server timer bila fixed
Integrity/connection status yang tidak mengganggu bila normal
Prompt/stimulus
Response region
Navigation yang diizinkan blueprint
Submit/next action
```

Tidak ada global navigation, gamification, mascot interaktif, correctness, hint, atau unreleased rationale. Timer tidak bergantung pada client clock.

### 6.4 Focus dan scroll

- Navigasi page memindahkan focus ke `h1` atau status utama.
- Inline validation memindahkan focus hanya setelah submit gagal; error summary menautkan field terkait.
- Feedback dinamis diumumkan melalui live region dengan politeness yang sesuai, tanpa memindahkan focus dari kontrol pengguna kecuali tindakan tidak dapat dilanjutkan.
- Kembali dari runtime atau detail memulihkan route, filter, tab, serta scroll yang relevan.

## 7. State Priority dan Presentation

Jika beberapa state muncul bersamaan, urutan penanganan adalah:

1. account/security blocker;
2. active assessment/integrity state;
3. active practice run/recovery;
4. onboarding yang belum selesai;
5. sync conflict atau version incompatibility;
6. primary learning recommendation;
7. review/remedial due;
8. target risk/replan;
9. gamification/milestone.

UI tidak menampilkan dua modal blocking sekaligus. State dengan priority lebih rendah tetap dapat ditemukan setelah blocker lebih tinggi selesai.

### 7.1 State standar

Setiap screen family mendukung state yang berlaku:

- **initial loading:** skeleton yang mempertahankan layout; bukan spinner tanpa konteks;
- **refreshing:** konten lama yang masih valid tetap terlihat dengan status refresh;
- **empty:** jelaskan mengapa kosong dan tindakan yang tersedia;
- **partial:** tampilkan data valid dan tandai bagian pending/unavailable;
- **error recoverable:** jelaskan dampak, retry, serta data yang tersimpan;
- **error blocking:** jelaskan mengapa tidak aman melanjutkan dan return/recovery path;
- **offline:** bedakan read-only cached, local-capable, dan requires connection;
- **stale:** jangan menerima mutation sampai state diperbarui;
- **success:** konfirmasi hasil konkret tanpa mengandalkan toast saja.

## 8. Responsive Baseline

### 8.1 Mobile-first learner

- Mobile menggunakan satu primary content column dan bottom navigation empat tujuan.
- Pada viewport lebih lebar, content dapat menggunakan supporting rail, tetapi reading order DOM tetap logis.
- Page action yang penting tetap dekat dengan content terkait; sticky action tidak menutupi input, feedback, furigana, atau virtual keyboard.
- Tabel learner berubah menjadi list/detail, bukan tabel horizontal yang diperkecil.
- Touch dan pointer bukan satu-satunya input; tidak ada aksi penting berbasis hover.
- Zoom 200% mempertahankan konten dan fungsi tanpa horizontal scroll kecuali objek yang secara intrinsik dua dimensi dan mempunyai alternatif.
- Pergantian orientation/resize tidak mereset draft, attempt, timer, replay, atau state.

### 8.2 Navigation adaptation

| Context | Mobile | Viewport lebar |
| --- | --- | --- |
| App shell | Bottom navigation | Sidebar atau top navigation dengan empat tujuan sama |
| Detail lesson | Bottom navigation tetap ada | Global navigation tetap ada |
| Practice | Global nav hilang | Global nav hilang; content tetap fokus |
| Assessment | Global nav hilang | Global nav hilang; max reading width sesuai item |
| Modal sederhana | Bottom sheet/dialog sesuai semantics | Dialog |
| Kompleks/edit penuh | Full-screen task | Page atau dialog besar |

Breakpoint numerik ditentukan Design System setelah prototype diuji.

## 9. Authentication Screens

### 9.1 `LS-AU-01` — Mulai Nekoru

**Tujuan:** menjelaskan nilai produk secara singkat dan memberi jalan masuk untuk pengguna baru atau kembali.

**Hierarchy:**

1. identitas Nekoru dan satu kalimat value proposition;
2. primary CTA `Mulai belajar`;
3. secondary action `Saya sudah punya akun`;
4. pernyataan singkat bahwa goal dapat diisi sebelum membuat akun;
5. tautan kebijakan yang diwajibkan.

**Rules:** tidak meminta account sebelum pengguna memilih mulai; tidak menjanjikan lulus JLPT; tidak menampilkan daftar fitur panjang yang menggeser CTA.

**Success:** pengguna menuju `LS-ON-01` atau `LS-AU-02`.

### 9.2 `LS-AU-02` — Pilih Cara Masuk

**Data:** return target, onboarding draft presence, auth error yang aman.

**Hierarchy dan action:**

1. judul `Masuk atau buat akun`;
2. primary action `Lanjutkan dengan Google`;
3. separator;
4. action `Lanjutkan dengan email`;
5. penjelasan data yang akan disimpan;
6. kembali ke onboarding jika draft tersedia.

**Rules:** Google dan email dapat membuat atau masuk ke account yang sama sesuai verified identity/account-linking policy Clerk; tidak ada password field atau tautan reset password. Backend Nekoru tetap membuat learner profile sendiri dengan Clerk user ID sebagai external identity reference.

**States:** provider unavailable, popup/callback blocked, account conflict, user cancelled, offline, session expired.

### 9.3 `LS-AU-03` — Masuk dengan Email

**Field:** email address, autocomplete email, validation format, error summary.

**Primary action:** `Kirim tautan masuk`.

**Rules:** respons tidak mengungkap apakah email sudah terdaftar; repeated send mempunyai cooldown/rate-limit feedback; email dinormalisasi oleh service, bukan hanya client.

**Success:** menuju `LS-AU-04`.

### 9.4 `LS-AU-04` — Periksa Email

Menampilkan alamat yang disamarkan/terkonfirmasi, langkah membuka email link, expiry secara manusiawi dari provider, serta `Kirim ulang` setelah cooldown. Tersedia `Ganti email` dan cara kembali aman.

Email link wajib dibuka pada device dan browser yang sama dengan tempat sign-in dimulai. Jika dibuka di tempat berbeda, autentikasi gagal aman dan UI menawarkan membuka link pada browser asal, mengirim link baru, atau menggunakan Google Sign-In. Aturan ini melindungi account dan memastikan guest onboarding draft dapat dimigrasikan dengan benar.

### 9.5 `LS-AU-05` — Hasil Autentikasi

| State | Presentation | Action |
| --- | --- | --- |
| Success + guest draft | Migrasikan draft, konfirmasi singkat, lanjutkan route | Lanjutkan |
| Success + existing profile | Jangan menimpa profile; tampilkan resume target | Buka Beranda/lanjut onboarding |
| Email link expired | Jelaskan expiry tanpa error teknis | Kirim tautan baru |
| Email link invalid/used | Jelaskan link tidak dapat dipakai | Kembali ke cara masuk |
| Dibuka pada device/browser berbeda | Jelaskan perlindungan keamanan dan draft tetap aman pada browser asal | Buka di browser asal/kirim ulang/Google |
| Google cancelled | Tidak dianggap error account | Coba lagi/pilih email |
| Account-link conflict | Jangan membuat account duplikat | Verifikasi melalui metode yang sudah terhubung |
| Callback/network failure | Pertahankan draft | Coba lagi |

## 10. Onboarding Screens

### 10.1 Shared onboarding pattern

- Step indicator memakai nama langkah, bukan angka saja.
- Back mempertahankan input valid.
- Preference opsional dapat dilewati; goal, target/calendar input, availability, timezone, serta route choice harus lengkap sebelum plan.
- Draft tamu diberi status `Belum tersimpan ke akun`.
- Autentikasi dipicu setelah `LS-ON-04` jika belum authenticated.

### 10.2 `LS-ON-01` — Tujuan Belajar

**Tujuan:** menangkap target program dan konteks tanggal.

**Content/data:** program N5 MVP, tujuan personal (studi/kerja/ujian/lainnya sebagai preference bila disediakan), jenis tanggal target, tanggal, timezone preview.

**Primary action:** `Lanjut atur waktu`.

**Validation:** tanggal harus memenuhi rule plan service; jika terlalu dekat, jangan menolak hanya di client—izinkan engine menghitung risk. Jangan klaim daftar N5 resmi.

### 10.3 `LS-ON-02` — Waktu Belajar

**Content/data:** hari tersedia, menit per hari, timezone, total kapasitas mingguan, penjelasan bahwa jadwal dapat diubah.

**Interaction:** setiap hari dapat aktif/nonaktif dengan durasi; tersedia preset yang dapat diedit; tidak bergantung pada drag.

**Primary action:** `Lanjut`.

**States:** tidak ada hari dipilih, durasi di luar policy, timezone ambiguity, kapasitas sangat kecil. Validasi tidak mempermalukan pengguna.

### 10.4 `LS-ON-03` — Preferensi Awal

**Content:** pilihan fokus yang tidak mengubah prerequisite, preference presentasi yang tersedia, audio availability, reduced motion, dan akses menuju detail accessibility.

**Rules:** semua preference opsional; tidak meminta diagnosis medis; jelaskan bahwa preference fokus tidak melewati fondasi wajib.

### 10.5 `LS-ON-04` — Pilih Titik Mulai

Menampilkan dua pilihan setara secara hormat:

- **Mulai dari dasar:** langsung S0/U01, dengan baseline probe singkat hanya jika diperlukan.
- **Cari posisi saya:** placement sekitar 25 menit, adaptif, online, tanpa hint, hasil masih perlu diverifikasi.

**Primary action:** mengikuti kartu yang dipilih. Jika belum authenticated, action membuka `LS-AU-02` dengan return target yang benar.

### 10.6 `LS-ON-05` — Rencana Belajar Awal

**Required data:** starting stage/unit, weekly capacity, required load, projected date, risk state, session cadence, prerequisite gap summary, confidence/verification note jika dari placement, plan revision.

**Hierarchy:**

1. interpretasi rencana dalam satu kalimat;
2. starting point dan sesi pertama;
3. jadwal mingguan ringkas;
4. proyeksi serta risk;
5. alasan dan batas estimate;
6. action mengubah waktu/target;
7. primary action `Simpan rencana`.

**States:** on track, at risk, unrealistic, recalculating, partial estimate, content unavailable, stale proposal.

**Guardrail:** jangan mengonversi hasil ke probabilitas lulus; jangan menampilkan completion sebagai mastery; initial plan tidak disimpan tanpa account.

### 10.7 `LS-ON-06` — Siap Mulai

Menampilkan starting unit, estimasi durasi sesi pertama, dan dua action: primary `Mulai sesi pertama`, secondary `Ke Beranda`. Celebration singkat tidak memakai motion wajib dan tidak memberi XP sebelum aktivitas bermakna.

## 11. `LS-HO-01` — Beranda

### 11.1 Tujuan

Menjawab “Apa yang perlu saya lakukan sekarang?” dengan satu primary action dan alasan yang dapat dipahami.

### 11.2 Hierarchy

1. blocking account/assessment/practice recovery state;
2. primary session card: purpose, isi ringkas, durasi, reason, start/resume CTA;
3. review/remedial mendesak;
4. plan change atau target risk yang perlu keputusan;
5. rencana hari ini dan minggu ini;
6. ringkasan progres yang tidak menyatukan completion/mastery;
7. XP/streak/milestone ringkas.

### 11.3 State matrix

| State | Primary module | CTA |
| --- | --- | --- |
| Active assessment | Resume/integrity state | Lanjutkan assessment |
| Active practice | Resume card | Lanjutkan sesi |
| First session | Starting unit | Mulai sesi pertama |
| Normal scheduled | Recommended session | Mulai sesi |
| Review overdue | Review-first explanation | Mulai review |
| Remedial blocker | Penguatan blocker | Mulai penguatan |
| No session today | Next scheduled + optional eligible activity | Lihat jadwal/latihan |
| Plan recalculating | Last valid state + pending label | Tunggu/refresh non-blocking |
| Target risk | Session CTA tetap tersedia + risk action | Tinjau rencana |
| Offline package ready | Offline-capable session | Mulai offline |
| Offline no package | Cached summary | Sambungkan internet |

### 11.4 Guardrail

Beranda tidak menampilkan seluruh jalur, statistik rinci, atau achievement catalog. Reason utama berasal dari engine; UI tidak memakai label “AI memilih ini”.

## 12. Belajar dan Kurikulum

### 12.1 `LS-LE-01` — Jalur Belajar

**Hierarchy:** stage aktif, unit aktif, next eligible target, blocker/checkpoint, stage lain dengan progressive disclosure, legend status.

**Status:** locked, available, active, checkpoint due, remedial required, completed. `Completed` tidak berarti semua KC mastered; detail menjelaskan perbedaan.

**Actions:** buka unit/lesson; mulai recommended eligible activity; buka prerequisite action. Tidak ada “lewati” untuk hard prerequisite.

**Responsive:** mobile memakai list/vertical path; desktop boleh memakai map, tetapi DOM order tetap stage → unit dan tidak bergantung pada posisi spasial.

### 12.2 `LS-LE-02` — Detail Unit/Lesson

**Data:** outcome, stage/unit/lesson, status, prerequisite explanation, estimated time, domain coverage, session/activity availability, checkpoint state, mastery summary yang relevan.

**Hierarchy:** title/status → next action → outcome → session list → prerequisite/gap → completed material/detail.

**Actions:** mulai/resume activity, review/penguatan, buka checkpoint jika eligible, free practice jika eligible. Bottom/global navigation tetap terlihat sampai focused runtime dimulai.

### 12.3 `LS-LE-03` — Review

Mengelompokkan review menjadi `Perlu sekarang`, `Hari ini`, dan `Berikutnya`; menunjukkan alasan serta estimasi durasi. Jangan menampilkan decay sebagai penurunan mastery tanpa evidence baru.

**Empty:** “Belum ada review yang perlu dikerjakan” disertai next scheduled review atau kembali ke jalur; bukan CTA membuat evidence bebas.

### 12.4 `LS-LE-04` — Latihan Bebas

Menampilkan hanya domain/topik/activity yang eligible. Setiap pilihan menjelaskan tujuan, durasi, serta apakah hasil dapat menjadi evidence, practice-only, atau non-mastery exposure sesuai policy.

Lesson selesai dapat dipilih ulang hanya melalui flow ini bila engine mengizinkan. UI tidak menjamin latihan ulang menaikkan mastery.

### 12.5 `LS-LE-05` — Assessment

Mengelompokkan placement/verification, checkpoint, cumulative review, dan simulation berdasarkan `Perlu dilakukan`, `Tersedia`, `Belum tersedia`, serta `Selesai`. Setiap kartu menampilkan eligibility, estimated/fixed time, feedback release, online requirement, retake date, dan next action.

Locked assessment memperlihatkan requirement yang belum terpenuhi tanpa CTA mulai.

## 13. Jadwal dan Target

### 13.1 `LS-SC-01` — Jadwal Mingguan

**Hierarchy:** week status → hari ini → rencana per hari → overdue/replan → navigasi minggu → availability shortcut.

**Scheduled session card:** tanggal, durasi, purpose mix, status, start/resume/detail action. Sesi terlewat tidak dilabeli gagal.

**Actions:** buka sesi, ubah availability, tinjau replan, lihat target. Drag-to-reschedule bukan satu-satunya metode; perubahan dilakukan lewat controls/form yang accessible.

### 13.2 `LS-SC-02` — Atur Ketersediaan

Menggunakan pola field yang sama dengan onboarding dan menampilkan current plan context. Perubahan tidak langsung mengganti plan; primary action `Lihat dampak perubahan` membuat proposal.

**Unsaved exit:** konfirmasi hanya jika ada perubahan valid yang belum disimpan.

### 13.3 `LS-SC-03` — Tinjau Perubahan Rencana

**Data:** current vs proposed schedule, reason, sessions moved, duration changes, projected date, review backlog, risk change, plan revision.

**Hierarchy:** explanation → material changes → unchanged guarantees (mastery/evidence tetap) → impact → primary `Gunakan rencana baru` → secondary edit/cancel.

**Stale:** jika learner state berubah, proposal dinyatakan lama dan harus dihitung ulang sebelum commit.

### 13.4 `LS-SC-04` — Target dan Proyeksi

Menampilkan target date, available/required weekly load, projected readiness, `on_track/at_risk/unrealistic`, serta pilihan yang diizinkan: tambah waktu, ubah tanggal, accelerated priority, atau pertahankan risiko.

UI selalu menjelaskan bahwa accelerated path tidak menurunkan mastery, prerequisite, delayed evidence, atau simulation requirement.

## 14. Progres dan Gamifikasi

### 14.1 `LS-PR-01` — Ringkasan Progres

**Hierarchy:** interpretasi + next action → kurikulum completion → mastery lintas-domain → review/retention → readiness snapshot → assessment → milestone.

Completion dan mastery menggunakan modul serta label terpisah. Tidak ada composite “persen selesai N5” jika formula mencampurkan keduanya tanpa definisi.

### 14.2 `LS-PR-02` — Progres per Domain

**Data:** Vocabulary, Kanji, Grammar, Reading, Listening; topic groups; status mastery; confidence presentation; due review; weakness; last valid evidence time; next action.

**Hierarchy:** domain interpretation → distribution status → topik perlu tindakan → topik kuat → evidence/retention explanation.

Estimated placement state diberi label berbeda dari provisional/mastered. Canonical KC ID tidak menjadi label primer.

### 14.3 `LS-PR-03` — Kesiapan N5

**Required sections:**

- status ready/not ready;
- required KC coverage;
- domain floors;
- terminal prerequisite;
- delayed retention dan coverage;
- simulation form count/results;
- format coverage;
- critical weakness;
- validity/version explanation dalam bahasa learner;
- next action.

**Disclaimer:** hasil merupakan indikator internal Nekoru, bukan skor resmi atau jaminan lulus JLPT.

Status `not ready` harus menyebut requirement spesifik yang belum terpenuhi, bukan hanya progress ring.

### 14.4 `LS-PR-04` — Riwayat Assessment

List berdasarkan tanggal dengan type, status valid/pending/invalidated, result summary yang sudah dirilis, retake eligibility, dan detail action. Invalidated result tidak ditampilkan sebagai nilai nol.

History tidak pernah membocorkan item/answer yang masih dilindungi exposure policy.

### 14.5 `LS-PR-05` — Pencapaian

Menampilkan XP, level, streak, dan achievement dengan definisi aktivitas bermakna. Empty/early state memberi dorongan belajar, bukan CTA melakukan aktivitas minimal untuk mengejar streak.

Streak tidak ditampilkan sebagai mastery dan tidak memblokir akses ke materi.

## 15. Profil dan Pengaturan

### 15.1 `LS-AC-01` — Profil dan Pengaturan

Landing list untuk Profil, Tujuan dan fokus, Aksesibilitas, Pengingat, Offline, Perangkat, serta Akun dan keamanan. Tampilkan email/account identity secara aman dan status sync bila membutuhkan tindakan.

### 15.2 `LS-AC-02` — Profil Learner

Field hanya mencakup data yang diperlukan produk. Nama tampilan opsional, locale fixed `id-ID` pada MVP kecuali policy diperluas, dan timezone dapat diedit dengan impact preview ke jadwal.

### 15.3 `LS-AC-03` — Tujuan dan Fokus

Edit target, tanggal, serta preference fokus. Perubahan material mengarah ke `LS-SC-03`, bukan langsung mengubah plan. Preference tidak membuka hard prerequisite.

### 15.4 `LS-AC-04` — Aksesibilitas

**Baseline controls:** reduced motion, text/furigana support yang diizinkan, audio preference, keyboard guidance, contrast/theme bila design system mendukung, serta accommodation status untuk assessment.

**Rules:**

- tidak meminta diagnosis medis;
- jelaskan jika support tertentu mengubah eligibility scored evidence;
- signed assessment accommodation tidak dapat diedit saat run aktif;
- perubahan preview dapat dicoba tanpa membuat evidence.

### 15.5 `LS-AC-05` — Pengingat

Baseline menampilkan reminder in-app dan jadwal pengingat jika tersedia. Email/web push tetap tersembunyi sampai consent, delivery, dan notification policy diputuskan. Tidak ada dark pattern untuk mengaktifkan notifikasi.

### 15.6 `LS-AC-06` — Offline dan Sinkronisasi

Menampilkan package yang tersedia, expiry, ukuran bila tersedia, last sync, queued event count, dan konflik. Actions: retry sync, perbarui package, hapus cached package, lihat aktivitas yang butuh koneksi.

Menghapus cached package memerlukan konfirmasi jika ada event lokal belum tersinkron; operasi tidak boleh menghapus queued evidence secara diam-diam.

### 15.7 `LS-AC-07` — Perangkat Aktif

Menampilkan sesi/perangkat aktif dengan deskripsi aman dan last active. Learner dapat mengakhiri session lain sesuai security policy. Active assessment device diberi perlindungan agar termination consequence dipahami.

### 15.8 `LS-AC-08` — Akun dan Keamanan

Menampilkan metode Clerk yang terhubung: Google dan/atau verified email link; actions menambah/mengubah koneksi sesuai reauthentication policy, keluar dari perangkat ini/semua perangkat, dan data/account request sesuai kebijakan produk.

Tidak ada password, reset password, atau security question lokal.

## 16. Practice Runtime Screens

### 16.1 `LS-RT-01` — Pengantar Sesi

**Data:** session purpose, reason, activity mix, estimated duration/time budget, offline status, audio requirement, support policy summary.

**Primary action:** `Mulai sesi` atau `Lanjutkan sesi`.

**Secondary:** kembali tanpa abandonment jika run belum dimulai; accessibility/audio setup.

### 16.2 `LS-RT-02` — Aktivitas

Container memuat prompt, stimulus, response control, hint/replay yang tersedia, validation, progress, dan submit. Canonical `activity_type` tidak harus menjadi judul learner.

**Rules:**

- UI merender locked instance dan tidak mengubah option order setelah mulai;
- input Jepang mendukung OS IME serta Kana composer yang tidak memfilter kandidat atau memberi correctness hint;
- response draft tidak dinilai sebelum explicit submit kecuali interaction definition menyatakan immediate selection sebagai submit;
- submit disabled hanya jika response structurally incomplete atau request aktif; jangan gunakan disabled state tanpa penjelasan;
- skip/confirm-submit eksplisit untuk item berdampak;
- status input Jepang, replay tersisa, dan save/sync dapat diakses screen reader.

### 16.3 `LS-RT-03` — Hint

Hint tampil inline atau panel yang mempertahankan prompt dan response. Setiap tingkat hint memiliki label bantuan, tidak mengungkap tingkat berikutnya, dan penggunaan dicatat sebelum content ditampilkan. Jika hint tidak tersedia, kontrol tidak muncul.

### 16.4 `LS-RT-04` — Feedback

**Hierarchy:** result state → explanation/rationale → bagian benar/salah → misconception/support → next action.

Correct/incorrect tidak dibedakan melalui warna saja. Feedback partial credit menjelaskan bagian yang terpenuhi dan belum. Fokus/live region tidak membacakan answer sebelum release.

### 16.5 `LS-RT-05` — Pause/Keluar

Dialog/panel menampilkan last saved state dan dampak: pause, abandon, atau dapat dilanjutkan. Primary action mengikuti tindakan aman (`Simpan dan keluar`); destructive abandon dibedakan dan membutuhkan konfirmasi.

### 16.6 `LS-RT-06` — Evaluasi/Sinkronisasi Tertunda

Menjelaskan bahwa jawaban tersimpan tetapi hasil belum tersedia. Pilihan melanjutkan hanya muncul jika session policy mengizinkan tanpa evaluation tersebut. Jangan menampilkan placeholder correctness atau mengurangi progress/mastery.

### 16.7 `LS-RT-07` — Pemulihan Sesi

| Failure | Presentation | Action |
| --- | --- | --- |
| Network belajar | Local save/pause status | Coba lagi/lanjut offline jika eligible |
| Asset sebelum terlihat | Loading retry | Retry/approved replacement |
| Asset setelah exposure | Technical issue | Pause/report; jangan silent replace |
| Audio gagal | Playback retry + status | Equivalent audio/technical skip |
| Plan superseded | Jelaskan rencana diperbarui | Selesaikan active item bila aman/replan |
| Version incompatible | Jelaskan sesi dipause | Muat versi valid/ke Beranda |
| Unsupported modality | Jelaskan keterbatasan konstruk | Approved equivalent/unavailable |

### 16.8 `LS-RT-08` — Laporkan Masalah

**Field:** kategori, detail opsional, izin mengirim context teknis minimum. Item/version/run context ditampilkan ringkas tetapi tidak dapat diedit.

**Primary:** `Kirim laporan`. Secondary: batal kembali ke posisi runtime. Success memberi issue reference yang dapat disalin tanpa membocorkan answer.

### 16.9 `LS-RT-09` — Ringkasan Sesi

**Hierarchy:** completion state → aktivitas bermakna → yang diperkuat/dipelajari → mastery change jika ada → review berikutnya → XP/streak → next action.

Jika recalculation pending, gunakan label pending dan tawarkan kembali ke Beranda; jangan menghitung progres lokal.

## 17. Assessment Runtime Screens

### 17.1 `LS-AS-01` — Eligibility Assessment

Menampilkan jenis assessment, status eligible, requirement yang belum terpenuhi, earliest retake, online requirement, dan next action. CTA mulai hanya aktif dari eligibility output yang valid.

### 17.2 `LS-AS-02` — Penjelasan Assessment

**Required content:** tujuan, format/section, estimated/fixed duration, hint/backtracking/replay rules, feedback release, resume/grace, device rule, retake/exposure note, disclaimer untuk simulation.

Learner harus mengonfirmasi bahwa aturan dipahami sebelum preflight; checkbox hanya untuk consent yang benar-benar memerlukan affirmative record.

### 17.3 `LS-AS-03` — Pemeriksaan Kesiapan Teknis

Memeriksa koneksi, audio output/playback, supported browser/runtime, accommodation, active-device conflict, dan manifest availability. Tidak meminta microphone/camera.

Setiap pemeriksaan menampilkan `siap`, `perlu tindakan`, atau `tidak dapat melanjutkan` beserta recovery.

### 17.4 `LS-AS-04` — Section/Item Assessment

**Header:** nama section, item/progress yang diizinkan, server timer, connection/integrity status. Timer memiliki text equivalent dan tidak menjadi satu-satunya tanda waktu hampir habis.

**Rules:**

- tidak ada correctness, hint, answer, rationale, transcript scored fallback, XP, atau mascot distraction;
- back/skip/review mengikuti locked blueprint;
- answer draft dan remaining time dipertahankan;
- network retry tidak membuat submission ganda;
- fixed timer dapat auto-close/submit hanya sesuai blueprint dan memberi accessible warning.

### 17.5 `LS-AS-05` — Transisi Section

Menampilkan section selesai, section berikutnya, aturan transition time, dan readiness teknis berikutnya tanpa feedback. Countdown memakai server state dan dapat dipahami tanpa animasi.

### 17.6 `LS-AS-06` — Resume Assessment

Menampilkan run/form/section, remaining time, grace used/remaining, last saved state, dan device conflict bila ada. Primary action resume hanya setelah server memvalidasi manifest dan token.

### 17.7 `LS-AS-07` — Gangguan Assessment

| State | Behavior |
| --- | --- |
| Disconnect within grace | Status pause/reconnect; timer behavior sesuai policy |
| Grace exceeded | Section pending invalidation/adjudication; jangan beri score |
| Audio failure before playback | Retry/equivalent audio bila approved |
| Audio partial exposure | Integrity issue; jangan score salah |
| Concurrent device | Blokir run kedua; arahkan ke device/run aktif |
| Evaluator pending | Terima submission, tahan result |
| Platform incident | Tampilkan reference dan adjudication pending |

### 17.8 `LS-AS-08` — Konfirmasi Submit

Menampilkan answered/unanswered summary yang diizinkan, konsekuensi final, remaining time, dan pernyataan bahwa jawaban tidak dapat diubah setelah submit. Primary `Kirim section/form`; secondary kembali jika backtracking policy mengizinkan.

### 17.9 `LS-AS-09` — Hasil Assessment

**Placement:** starting unit, strengths, gaps, confidence, verification plan, bukan mastery final.

**Verification/checkpoint:** outcome per area, blocker, feedback setelah set/checkpoint, retake rule, next action.

**Simulation:** weighted accuracy internal, raw Language Knowledge/Reading dan Listening accuracy, strengths/gaps, critical weakness, comparison ke readiness threshold, form count, serta disclaimer.

**States:** complete valid, partial/pending, invalidated, superseded/adjudicated. Invalidated bukan nilai nol; superseding result terhubung ke result lama secara jelas.

## 18. System dan Recovery Screens

| ID | Trigger | Pesan inti | Tindakan |
| --- | --- | --- | --- |
| `LS-SY-01` | Tidak ada jaringan | Jelaskan konten cached dan aktivitas yang dapat/tidak dapat berjalan | Lanjut offline/retry |
| `LS-SY-02` | Event lokal sedang dikirim | Pekerjaan tersimpan di perangkat | Tunggu; boleh lanjut jika aman |
| `LS-SY-03` | Revision/event conflict | Tidak ada hasil yang dihapus otomatis | Lihat detail/retry/support |
| `LS-SY-04` | Client/content/policy terlalu lama | Perlu versi valid untuk keputusan aman | Refresh/update/restart aman |
| `LS-SY-05` | Service/policy/content unavailable | Sistem tidak dapat membuat keputusan baru | Retry/kembali/status |
| `LS-SY-06` | Resource tidak boleh diakses | Jangan ungkap keberadaan/data sensitif | Kembali/masuk akun benar |
| `LS-SY-07` | Route/resource tidak ada | Target mungkin dipindah atau tidak valid | Ke Beranda/Belajar |
| `LS-SY-08` | Auth session expired | Progress/draft aman; perlu masuk lagi | Masuk dengan Google/email |

System state harus menyebut apa yang tersimpan, apa yang belum, dan tindakan aman berikutnya. Error code teknis dapat disalin dari detail, tetapi bukan judul/pesan utama.

## 19. Data dan Ownership Matrix

| UI data | Source of truth | Freshness/behavior |
| --- | --- | --- |
| Account/auth status | Clerk identity session | Blocking jika session invalid; authorization tetap server Nekoru |
| Goal/availability/profile | Learner profile | Optimistic edit hanya untuk draft; commit dengan revision |
| Recommended session/reason | Learning Engine | Refresh saat learner state/plan berubah |
| Stage/unit/lesson | Curriculum version | Label version-compatible; no client unlock |
| Content/activity | Content Bank + Practice Engine | Locked instance saat run aktif |
| Attempt/hint/replay/evaluation | Practice Engine | Idempotent, server/local signed state |
| Mastery/retention/weakness | Mastery/Learning Engine | UI tidak menghitung dari visible answers |
| Schedule/projection/risk | Learning Engine | Proposal lalu commit revision |
| Assessment run/result | Assessment service | Server timer, locked form, release policy |
| XP/level/streak/achievement | Gamification dari meaningful event | Tidak berasal dari raw UI completion |
| Offline/sync | Local queue + server receipts | Tampilkan local/server distinction |
| Content issue | Content Operations service | Tidak mengubah learner result otomatis |

## 20. Validation dan Error Copy Contract

- Field error menyebut masalah dan cara memperbaiki; tidak hanya “tidak valid”.
- Error summary muncul setelah submit dengan link/focus ke field.
- Academic blocker menjelaskan hubungan, bukan error teknis.
- System failure membedakan `coba lagi`, `butuh koneksi`, `sedang dinilai`, `tidak tersedia`, dan `hubungi bantuan`.
- Error tidak menggunakan correctness styling jika masalah bukan jawaban learner.
- Toast tidak menjadi satu-satunya tempat konfirmasi save, submit, plan change, report, atau security action.

## 21. Analytics Screen Contract

### 21.1 Universal context

`surface=learner`, screen ID, entry source, return target, journey phase, viewport class, input modality terbatas, online/sync state, active stage/unit/lesson bila relevan, dan reason category tanpa raw answer.

### 21.2 Event minimum

| Family | Event |
| --- | --- |
| Auth | `auth_method_selected`, `magic_link_requested`, `auth_completed`, `auth_failed`, `account_conflict` |
| Onboarding | event pada LF-01/LF-02/LF-03 plus field-step error/abandon tanpa sensitive value |
| Home | `primary_recommendation_viewed/started`, `reason_detail_opened`, `risk_action_opened` |
| Learn | `path_viewed`, `unit_opened`, `locked_reason_opened`, `eligible_activity_selected` |
| Schedule | `availability_edit_started`, `replan_previewed/accepted/rejected`, `risk_choice_selected` |
| Progress | `domain_progress_opened`, `readiness_requirement_opened`, `next_action_selected` |
| Practice | runtime event contract dari Practice Engine; UI event tidak menggandakan evidence |
| Assessment | assessment event contract; no answer/content in generic analytics |
| Settings | preference changed dengan category saja; tidak menyimpan sensitive accessibility detail |
| Recovery | failure category, recovery action, outcome, dan correlation ID yang aman |

Screen view event tidak dianggap evidence, completion, atau meaningful learning.

## 22. Accessibility Acceptance Baseline

Semua layar learner harus:

1. dapat dioperasikan dengan keyboard tanpa gesture presisi;
2. memiliki focus order yang mengikuti hierarchy visual dan reading order;
3. mempertahankan konten/fungsi pada zoom 200%;
4. membedakan state tidak hanya melalui warna;
5. memberi accessible name, role, value, state, instruction, error, dan relationship;
6. mempertahankan keterbacaan Kana, small Kana, diacritic, Kanji, dan furigana;
7. menyediakan reduced-motion alternative tanpa kehilangan informasi;
8. menggunakan live region tanpa membocorkan unreleased answer/feedback;
9. memberi alternatif untuk drag, ordering, audio control, dan animation sesuai construct-equivalence policy;
10. tidak memakai response time pembacaan assistive technology sebagai mastery penalty;
11. memulihkan focus secara logis setelah dialog, error, route return, dan dynamic feedback;
12. menjelaskan saat suatu accommodation membuat scored evidence tidak ekuivalen dan menawarkan approved replacement bila tersedia.

Target conformance formal adalah WCAG 2.2 AA. AAA diupayakan untuk body text dan konten belajar kritis tanpa mengklaim full AAA; detail pengujian dan exception mengikuti `08-accessibility-content-and-edge-cases.md`.

## 23. Screen-Level Acceptance Criteria

### 23.1 Authentication dan onboarding

1. Goal dan availability dapat diselesaikan tanpa account.
2. Placement/start-save plan selalu mengharuskan account.
3. Google Sign-In dan email magic link tersedia tanpa password lokal.
4. Auth cancellation/failure tidak menghapus draft.
5. Existing profile tidak tertimpa guest draft.
6. Pemula absolut dapat menuju U01 tanpa placement panjang.
7. Placement menjelaskan time cap, feedback release, online requirement, dan sifat estimate.
8. Rencana awal membedakan starting point, workload, projection, risk, serta confidence.

### 23.2 App shell

1. Beranda memiliki satu primary next action sesuai priority state.
2. Empat navigation destination konsisten pada seluruh viewport.
3. Detail lesson mempertahankan global navigation; runtime menyembunyikannya.
4. Locked prerequisite menjelaskan dasar yang perlu diperkuat tanpa override.
5. Review due, remedial blocker, target risk, dan active run dapat ditemukan.
6. Replan menunjukkan before/after dan tidak mengubah mastery.
7. Completion, mastery, readiness, serta gamification tidak digabung.
8. Achievement berada di Progres dan tidak mengambil alih Beranda.

### 23.3 Practice

1. Locked activity instance tidak berubah setelah mulai.
2. Double submit tidak membuat attempt/evaluation ganda.
3. Hint, replay, retry, skip, dan answer reveal mengikuti policy.
4. Technical failure/pending evaluation tidak ditampilkan sebagai salah.
5. Resume mempertahankan state dan feedback release.
6. Offline/sync state membedakan local dan server save.
7. Report issue tidak menghapus response atau mengubah score.
8. Summary tidak menjanjikan mastery change dari completion saja.

### 23.4 Assessment

1. Eligibility berasal dari engine dan locked assessment tidak dapat dimulai.
2. Preflight memeriksa koneksi/audio/device tanpa microphone/camera.
3. Timer server-authoritative dan accessible.
4. Global navigation, hint, correctness, rationale, gamification, serta distraction hilang selama run.
5. Feedback tetap ditahan setelah refresh/resume/error.
6. Disconnect/audio failure/concurrency mengikuti integrity state, bukan score salah.
7. Invalidated result tidak tampil sebagai nol.
8. Simulation result memakai label internal serta disclaimer dan tidak menampilkan scaled score resmi.

### 23.5 Reliability dan accessibility

1. Semua mutation penting memiliki loading, idempotent retry, success confirmation, dan stale-state handling.
2. Semua blocking state menjelaskan data yang tersimpan dan recovery.
3. Keyboard, screen reader, zoom, reduced motion, dan interaction alternative lulus test fixture.
4. Bahasa Jepang tetap terbaca pada supported viewport dan zoom.
5. Analytics tidak menyimpan raw answer, credential, atau accessibility detail sensitif.

## 24. Keputusan dan Pertanyaan untuk Dokumen Berikutnya

| ID | Keputusan/pertanyaan | Rekomendasi awal | Status |
| --- | --- | --- | --- |
| `SCREEN-OPEN-001` | Masa simpan guest onboarding draft | 7 hari pada browser atau sampai migrated/deleted | Terbuka |
| `SCREEN-OPEN-002` | Email-link expiry, resend cooldown, dan same-browser protection | Gunakan Clerk provider policy; UI membaca state/nilai server dan mewajibkan browser asal | **Ditetapkan** |
| `SCREEN-OPEN-003` | Kanal reminder selain in-app | Email opt-in setelah jadwal aktif; web push ditunda sampai kebutuhan tervalidasi | Terbuka |
| `SCREEN-OPEN-004` | Peran mascot Nekoru pada layar | Companion kucing gender-neutral bergaya kawaii modern; hadir kontekstual pada onboarding, Home, session summary, milestone, dan bantuan; tidak memberi clue, menutupi materi, atau mengganggu assessment | Ditetapkan |
| `SCREEN-OPEN-005` | Target accessibility formal | WCAG 2.2 AA sebagai requirement; AAA aspiratif untuk body text dan konten belajar kritis; construct-equivalence mengikuti Practice Engine | Ditetapkan |
| `SCREEN-OPEN-006` | Metode autentikasi Content Operations | Google OAuth melalui Clerk Hobby; tanpa self-registration/email link internal; staff allowlist dan RBAC dikelola backend Nekoru | **Ditetapkan** |
| `SCREEN-OPEN-007` | Feedback resolusi laporan konten | Notifikasi in-app hanya untuk correction/adjudication yang relevan kepada learner | Terbuka |

Keputusan visual detail dan microcopy final tidak boleh dikunci sebelum Design System serta Content Design disusun dan diuji melalui prototype.

Clerk adalah dependency implementasi yang dapat berubah harga, quota, atau fitur. Sebelum production release, tim wajib memverifikasi plan aktif, session policy, email delivery, OAuth production credentials, account-linking behavior, log retention, export path, dan migration/exit strategy.
