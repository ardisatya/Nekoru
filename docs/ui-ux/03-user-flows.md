# User Flows Nekoru — MVP

**Status:** Draft v0.1  
**Audiens:** Product, design, akademik, content operations, accessibility, data, QA, dan engineering  
**Cakupan:** Alur end-to-end learner dan Content Operations, termasuk branch, recovery, dan failure path  
**Platform:** Aplikasi web; learner responsive mobile-first, Content Operations desktop-first  
**Bahasa produk:** Bahasa Indonesia (`id-ID`)  
**Tanggal:** 13 September 2026

## 1. Tujuan Dokumen

Dokumen ini menerjemahkan [Information Architecture](./02-information-architecture.md) dan seluruh aturan produk menjadi alur yang dapat digunakan untuk wireframe, prototype, screen specification, analytics, dan acceptance test.

Dokumen ini menetapkan:

1. trigger, precondition, happy path, branch, recovery, dan completion state;
2. titik keputusan learner, UI, engine, serta reviewer;
3. perpindahan antarscreen konseptual;
4. state yang tidak boleh hilang ketika flow terputus;
5. perilaku aman ketika data, jaringan, evaluator, asset, atau version gagal;
6. hubungan flow learner dengan content validation dan audit internal.

Dokumen ini belum menetapkan layout final atau bentuk komponen. Detail field, hierarchy visual, microcopy final, dan responsive layout diturunkan dalam screen specification.

## 2. Sumber dan Hierarki Keputusan

- [UI/UX Overview](./01-ui-ux-overview.md)
- [Information Architecture](./02-information-architecture.md)
- [Product Overview](../product-specs/product-overview.md)
- [Arsitektur Kurikulum](../product-specs/curriculum-architecture.md)
- [Mastery Specification](../product-specs/mastery-specification.md)
- [Learning Engine](../product-specs/learning-engine.md)
- [Practice Engine](../product-specs/practice-engine.md)
- [Assessment Specification N5](../product-specs/assessment-specification-n5.md)
- [Content Validation Rubric](../product-specs/content-validation-rubric.md)
- [Beginner Foundations N5](../content/beginner-foundations-n5.md)
- [Content Progression N5](../content/content-progression-n5.md)

Jika flow bertentangan dengan aturan akademik atau runtime, dokumen sumber yang memiliki keputusan tersebut tetap berwenang. Flow tidak boleh menggunakan kemudahan navigasi untuk melewati prerequisite, menambah attempt, membuka feedback, atau mengubah authority.

## 3. Notasi

```text
[Screen/state]      layar atau state yang dilihat pengguna
User:               tindakan pengguna
UI:                 respons presentation/navigation
System:             keputusan deterministic dari service berwenang
Reviewer:           tindakan aktor internal sesuai role
◇ kondisi?          titik percabangan
→                   perpindahan atau kelanjutan
↩                   kembali dengan state dipertahankan
✓                   completion state yang sah
!                   exception, blocker, atau recovery
```

Nama seperti `L-HOME` dan `C-REVIEW-DETAIL` mengacu pada route konseptual di Information Architecture, bukan URL implementasi.

## 4. Aturan Universal Flow

### 4.1 State disimpan sebelum berpindah

- Input onboarding yang valid disimpan sebagai draft lokal sampai akun tersedia.
- Setelah akun tersedia, state penting disimpan server-side dengan revision.
- Practice dan assessment menyimpan interaction penting, draft jawaban, submission, timer, dan manifest sesuai policy.
- Content Operations menyimpan draft, finding, filter, assignment, dan version context tanpa mengubah lifecycle secara implisit.

### 4.2 Double action tidak membuat hasil ganda

Double-click, retry jaringan, refresh, atau kembali ke halaman tidak boleh membuat akun, plan, submission, evaluation, approval, publication, atau issue duplikat. UI mengunci tindakan ketika request aktif dan memakai idempotent result dari server.

### 4.3 Perubahan version tidak diterapkan diam-diam

Jika curriculum, content, policy, rubric, plan, atau artifact version berubah:

1. aktivitas yang aman dapat diselesaikan sesuai locked manifest;
2. aktivitas berikutnya divalidasi ulang;
3. mutation terhadap revision lama ditolak;
4. pengguna diberi penjelasan serta pilihan refresh, resume, atau replan;
5. draft yang dapat dipertahankan tidak dihapus.

### 4.4 Gangguan teknis bukan kesalahan akademik

Asset gagal, evaluator timeout, disconnect, unsupported modality, stale revision, atau sync conflict tidak dicatat sebagai jawaban salah. UI menggunakan retry, approved fallback, technical skip, pending state, resume, atau adjudication sesuai policy.

### 4.5 Exit selalu eksplisit pada focused runtime

Practice dan assessment tidak keluar akibat global navigation. Exit/pause/abandon menjelaskan dampak sebelum dikonfirmasi. Browser back diperlakukan sesuai aturan yang sama.

### 4.6 Informasi yang ditahan tetap ditahan

Resume, history, notification, analytics, error detail, dan support flow tidak boleh membocorkan correctness, answer, rationale, transcript, atau diagnostic summary sebelum release policy mengizinkan.

## 5. Inventaris Flow

### 5.1 Learner

| ID | Flow | Prioritas MVP | Completion state |
| --- | --- | --- | --- |
| `LF-01` | First visit, onboarding draft, dan autentikasi progresif | P0 | Account dan learner profile siap |
| `LF-02` | Aktivasi pemula absolut | P0 | Initial plan tersimpan dan U01 siap |
| `LF-03` | Placement learner berpengalaman | P0 | Starting unit, gap, confidence, dan plan tersedia |
| `LF-04` | Target at risk atau unrealistic | P0 | Pilihan target/capacity tersimpan atau risiko diakui |
| `LF-05` | Memulai atau melanjutkan sesi harian | P0 | Practice run aktif atau dilanjutkan |
| `LF-06` | Menyelesaikan aktivitas dan menerima feedback | P0 | Activity outcome/evidence candidate tercatat |
| `LF-07` | Pause, resume, offline, dan sync | P0 | Run dipulihkan atau ditutup aman |
| `LF-08` | Sesi selesai dan plan diperbarui | P0 | Summary tersedia dan next action jelas |
| `LF-09` | Sesi terlewat dan replan | P0 | Rencana baru aktif tanpa mastery penalty |
| `LF-10` | Review dan remedial | P0 | Review/remedial outcome tercatat |
| `LF-11` | Unit/stage checkpoint dan gate | P0 | Unit terbuka, selesai, atau remedial required |
| `LF-12` | Simulation dan readiness | P0 | Result dirilis dan next action tersedia |
| `LF-13` | Menjelajahi jalur dan memilih aktivitas eligible | P1 | Detail atau activity intro terbuka |
| `LF-14` | Memahami progres, mastery, dan readiness | P0 | Learner memperoleh interpretasi dan next action |
| `LF-15` | Mengubah target, availability, preference, atau accommodation | P0 | Replan/profile revision tersimpan |
| `LF-16` | Melaporkan masalah konten | P0 | Content issue tercatat tanpa speculative penalty |

### 5.2 Content Operations

| ID | Flow | Prioritas MVP | Completion state |
| --- | --- | --- | --- |
| `CF-01` | Membuat dan mengajukan artefak | P0 | Version draft masuk antrean review |
| `CF-02` | Meninjau, membuat finding, dan mengambil keputusan | P0 | Review/approval tercatat terhadap version yang benar |
| `CF-03` | Memperbaiki revision-required content | P0 | Version baru siap direview |
| `CF-04` | Merakit, memvalidasi, dan mempublikasikan pack | P0 | Approved pack published atau blocker tercatat |
| `CF-05` | Triage issue dan quarantine | P0 | Issue diklasifikasi dan tindakan aman aktif |
| `CF-06` | Correction, adjudication, migration, dan rollback | P0 | Dampak historis serta downstream ditangani resmi |
| `CF-07` | Preview interaktif tanpa learner evidence | P1 | Preview selesai dan hasil QA tercatat |
| `CF-08` | Audit keputusan dan version | P0 | Keputusan dapat direproduksi atau gap audit ditemukan |

## 6. LF-01 — First Visit, Onboarding Draft, dan Autentikasi Progresif

### 6.1 Tujuan

Mengurangi hambatan sebelum pengguna memahami nilai Nekoru, sambil memastikan placement dan rencana personal hanya berjalan setelah learner memiliki account identity yang stabil.

### 6.2 Precondition

- Pengunjung belum memiliki authenticated session.
- Tidak ada placement atau assessment yang sedang aktif.
- Aplikasi dapat menyimpan onboarding draft secara lokal pada browser.

### 6.3 Main flow

```text
[L-ENTRY]
User: pilih mulai
→ [L-ONB-GOAL]
User: pilih program N5 dan tanggal target/pribadi
UI: validasi input dan simpan draft lokal
→ [L-ONB-AVAILABILITY]
User: pilih hari, durasi, dan konfirmasi timezone
UI: tampilkan estimasi kapasitas awal; simpan draft lokal
→ [L-ONB-PREFERENCES]
User: atur fokus/accommodation yang tersedia atau lewati preference opsional
→ [L-ONB-ROUTE]
User: pilih mulai dari dasar atau placement
◇ account sudah ada?
  Ya → lanjut ke LF-02 atau LF-03
  Tidak → [L-AUTH]
User: buat/masuk akun
System: buat atau cocokkan learner identity
UI: pindahkan draft lokal ke profil server secara idempotent
✓ Account dan onboarding state siap
```

### 6.4 Branch

- **Returning user memilih masuk sejak awal:** autentikasi → jika onboarding belum selesai, lanjut dari langkah server terbaru; jika selesai, buka `L-HOME`.
- **Target tanggal belum dipilih:** pengguna dapat memilih target pribadi sesuai aturan produk; field minimum final mengikuti profile contract.
- **Timezone browser berbeda dari pilihan tersimpan:** UI meminta konfirmasi, tidak mengubah otomatis setelah rencana tersimpan.
- **Pengguna berpindah browser sebelum membuat akun:** draft lokal tidak tersedia; UI menjelaskan bahwa draft belum tersimpan ke akun.

### 6.5 Failure dan recovery

- Auth dibatalkan/gagal → kembali ke `L-ONB-ROUTE`; seluruh draft tetap ada.
- Account sudah memiliki profil → tampilkan pilihan yang aman untuk melanjutkan profil existing; jangan menimpa plan/evidence dengan draft tamu.
- Draft lokal rusak/kedaluwarsa → minta input ulang hanya untuk field yang tidak valid.
- Jaringan terputus sebelum auth → onboarding draft tetap dapat ditinjau, tetapi placement dan penyimpanan plan diblokir dengan alasan `requires connection`.

### 6.6 Analytics minimum

`onboarding_started`, `goal_completed`, `availability_completed`, `preference_completed`, `route_selected`, `authentication_started`, `authentication_completed`, `draft_migrated`, `onboarding_abandoned`.

Analytics tidak menyimpan credential, full accessibility note, atau data sensitif dalam event properties.

## 7. LF-02 — Aktivasi Pemula Absolut

### 7.1 Precondition

- Learner telah authenticated.
- Goal, target, availability, timezone, dan pilihan `absolute_beginner` tersedia.

### 7.2 Main flow

```text
[L-ONB-ROUTE: mulai dari dasar]
System: buat learner state awal `not_started` untuk seluruh KC
◇ baseline probe singkat diperlukan dan tersedia?
  Ya → [L-ASSESSMENT-BRIEF: baseline probe]
        User: selesaikan probe bunyi/aksara tanpa placement panjang
        System: simpan evidence sesuai blueprint
  Tidak → lanjut
System: hitung learning plan dari baseline 300 jam dan availability
→ [L-ONB-PLAN]
UI: tampilkan starting point S0/U01, beban, proyeksi, risk, dan alasan
User: tinjau; ubah availability/target bila perlu
System: hitung ulang jika input berubah
User: konfirmasi rencana
System: simpan plan revision pertama
→ [L-ONB-COMPLETE]
User: mulai sesi pertama atau menuju Beranda
✓ U01 eligible dan initial plan aktif
```

### 7.3 Guardrail

- Memilih pemula absolut tidak menghasilkan estimated mastery.
- Baseline probe bukan placement panjang dan tidak memblokir dimulainya U01 tanpa aturan blueprint.
- Evidence sesi awal dapat mempercepat progres, tetapi tidak melewati gate tanpa bukti yang disyaratkan.
- Rencana tidak menjanjikan readiness pada tanggal yang tidak realistis.

### 7.4 Failure dan recovery

- Plan tidak dapat dibuat karena policy/curriculum/content unavailable → tampilkan explicit unavailable; pertahankan profil; retry setelah sumber valid tersedia.
- Approved item U01 tidak tersedia → jangan membuat konten runtime bebas; tampilkan safe unavailable atau approved fallback.
- Target unrealistic → masuk `LF-04` sebelum final confirmation.

## 8. LF-03 — Placement Learner Berpengalaman

### 8.1 Precondition

- Learner authenticated dan memilih `take_placement`.
- Placement berjalan online.
- Tidak ada placement run lain yang aktif pada device lain.

### 8.2 Main flow

```text
[L-ONB-ROUTE: placement]
→ [L-ASSESSMENT-BRIEF]
UI: jelaskan tujuan, time cap sekitar 25 menit, tidak ada hint,
    feedback ditahan, dan hasil bukan mastery final
→ [L-ASSESSMENT-CHECK]
User: periksa audio, koneksi, dan accommodation
System: buat locked placement run
→ [L-ASSESSMENT-SECTION]
System: sajikan routing screener lintas kana, vocabulary, grammar, reading, listening
User: submit respons
System: evaluasi; branch naik/turun sesuai rule
◇ confidence rendah atau hard-prerequisite failure?
  Ya → System: tambahkan verification set sesuai cap
◇ floor, ceiling, confidence cukup atau time cap tercapai?
  Tidak → lanjut item adaptif
  Ya → selesaikan run
System: hasilkan starting unit, estimates, prerequisite gaps,
        confidence, dan verification plan
→ [L-ASSESSMENT-RESULT]
UI: tampilkan kekuatan, gap, keterbatasan estimate, dan next action
System: hitung learning plan
→ [L-ONB-PLAN]
User: tinjau dan konfirmasi
✓ Plan aktif; estimate diverifikasi melalui pembelajaran berikutnya
```

### 8.3 Branch

- **Satu hard-prerequisite item gagal:** tidak langsung menjadi gap permanen; verification diperlukan.
- **Time cap tercapai:** hasil parsial dengan confidence serta verification plan; tidak memaksa item tambahan.
- **Learner kuat di satu domain dan lemah di domain lain:** hasil menjelaskan starting position per domain dan blocker lintas-domain.
- **Semua cluster dasar gagal:** rekomendasikan mulai S0/U01 tanpa bahasa menghakimi.

### 8.4 Failure dan recovery

- Disconnect di dalam grace → resume locked run dan remaining time.
- Grace terlewati → ikuti invalidation/adjudication policy; jangan tebak hasil.
- Audio gagal sebelum playback → retry/equivalent audio; jika tetap gagal, technical issue dan jangan score salah.
- Evaluator gagal → `evaluation_pending`; placement result ditahan sampai valid atau menggunakan deterministic fallback yang diizinkan.
- Concurrent run → blokir run kedua dan arahkan ke run aktif.

## 9. LF-04 — Target At Risk atau Unrealistic

### 9.1 Trigger

Learning plan menunjukkan:

- `at_risk`: required load lebih dari 90% sampai 100% kapasitas mingguan; atau
- `unrealistic`: required load melebihi kapasitas mingguan.

### 9.2 Main flow

```text
[L-ONB-PLAN atau L-SCHEDULE-TARGET]
UI: tampilkan status, required load, available capacity, dan alasan
UI: tawarkan pilihan yang diizinkan
User memilih salah satu:
  A. tambah waktu belajar mingguan
  B. mundurkan tanggal target
  C. jalur akselerasi yang memprioritaskan KC wajib
  D. pertahankan pilihan dan akui readiness tidak terjamin
System: validasi pilihan; jangan ubah mastery/readiness threshold
System: hitung plan revision baru
UI: bandingkan dampak sebelum konfirmasi
User: konfirmasi
✓ Plan tersimpan dengan risk status dan decision reason
```

### 9.3 Guardrail

- UI tidak menawarkan “turunkan standar”, “lewati prerequisite”, atau “anggap siap”.
- Jalur akselerasi mengubah prioritas, bukan syarat readiness.
- Status risk menggunakan teks dan ikon, bukan warna saja.
- Jika learner mempertahankan pilihan, peringatan tetap dapat ditemukan tanpa modal berulang yang menghambat sesi.

## 10. LF-05 — Memulai atau Melanjutkan Sesi Harian

### 10.1 Entry point

- primary CTA `L-HOME`;
- sesi terjadwal pada `L-SCHEDULE-WEEK`;
- eligible activity pada `L-LEARN`;
- next action dari `L-PROGRESS` atau assessment result.

### 10.2 Main flow

```text
[Entry point]
◇ active practice run tersedia?
  Ya → UI: tawarkan resume dengan progress dan last saved state
        User: resume
        System: validasi run revision dan locked manifest
        → [L-PRACTICE-ACTIVITY]
  Tidak → System: validasi learner state dan session plan terbaru
           → [L-PRACTICE-INTRO]
UI: tampilkan tujuan, durasi, komposisi, mode, dan alasan utama
User: mulai
System: buat/lock PracticeRun dan ActivityInstance
→ [L-PRACTICE-ACTIVITY]
✓ Run `in_progress`
```

### 10.3 Branch

- Plan superseded sebelum mulai → ambil plan terbaru dan jelaskan perubahan.
- Session budget pengguna berubah → minta Learning Engine melakukan replan, bukan memotong aktivitas sembarang.
- Offline dan signed package valid → mulai local-capable mode; tampilkan saved-locally state.
- Activity online-only atau package expired → minta koneksi; jangan mulai run yang tidak dapat dinilai sah.
- Content item unavailable → gunakan fallback ID yang approved atau kembali untuk replan.

### 10.4 Exit sebelum mulai

Learner dapat kembali ke entry point tanpa membuat evidence atau session abandonment. Run `created/validating` yang belum dimulai ditutup/superseded sesuai runtime policy.

## 11. LF-06 — Menyelesaikan Aktivitas dan Menerima Feedback

### 11.1 Main flow mode belajar

```text
[L-PRACTICE-ACTIVITY]
UI: tampilkan prompt, stimulus, response controls, progress, dan support yang diizinkan
User: berinteraksi atau meminta hint
UI/System: catat hint/replay/attempt sesuai policy
User: submit
UI: cegah duplicate submit dan tampilkan evaluating state
System: normalize dan evaluasi sesuai answer key/rubric version
◇ evaluasi selesai?
  Ya → System: kunci EvaluationResult
        → [L-PRACTICE-FEEDBACK]
        UI: correctness/partial result, rationale, misconception, dan next action
        User: lanjut atau retry jika policy mengizinkan
  Tidak → [L-PRACTICE-PENDING]
           UI: jelaskan jawaban sedang dinilai; jangan tandai salah
System: terbitkan candidate evidence dengan attribution approved
→ aktivitas berikutnya atau exit check
✓ Activity outcome tercatat secara idempotent
```

### 11.2 Branch interaksi

- **Hint:** tampilkan tingkat berikutnya saja; catat usage; jangan mengungkap answer di luar policy.
- **Retry:** hanya jika attempt policy mengizinkan; kembali ke item submitted tidak otomatis membuat attempt baru.
- **Skip learner:** catat `skipped`; pada mode belajar tidak dinilai salah kecuali assessment blueprint menyatakan unanswered raw score.
- **Audio replay:** hitung replay sesuai policy; kontrol tetap keyboard-accessible.
- **Alternatif drag:** source-target selection atau move controls menghasilkan interaksi ekuivalen.
- **Input Jepang:** tampilkan input-language status dan normalization yang diizinkan; jangan menganggap kana/kanji ekuivalen tanpa answer policy.
- **Jawaban ambigu:** tahan mastery penalty sampai adjudication/fallback evaluation.

### 11.3 Feedback release

| Mode | Release baseline |
| --- | --- |
| Introduction/guided/independent/free practice/review/remedial | Langsung sesuai attempt policy |
| Placement | Setelah placement; item-by-item dapat ditahan |
| Verification | Setelah set |
| Unit/stage checkpoint | Setelah checkpoint |
| Cumulative review | Setelah submit atau set sesuai blueprint |
| Simulation | Setelah seluruh form |

Flow assessment tidak memakai feedback branch mode belajar sebelum release.

### 11.4 Failure

- Deterministic evaluator gagal → pending; jangan tebak.
- AI evaluator timeout → static feedback yang approved atau pending.
- Asset gagal setelah stimulus terlihat → technical issue; jangan ganti diam-diam jika exposure memengaruhi integritas.
- Stale revision → refresh state dan gunakan idempotent result jika submission sebenarnya sudah diterima.

## 12. LF-07 — Pause, Resume, Offline, dan Sync

### 12.1 Pause/resume practice

```text
[L-PRACTICE-ACTIVITY]
User: pilih pause/keluar atau browser/app terputus
UI: simpan interaction/draft terakhir yang valid
◇ exit manual?
  Ya → tampilkan dampak dan konfirmasi
System: ubah run ke `paused` bila policy mengizinkan
→ [L-HOME: resume card]
User: resume
System: validasi run ID, revision, manifest, content/policy version
◇ masih kompatibel?
  Ya → kembali ke posisi aman terakhir
  Tidak → pause + replan/recovery; jangan silent migrate
```

### 12.2 Offline-capable practice

```text
System/UI: signed package valid dan evaluator lokal tersedia
User: mulai/lanjut sesi offline
UI: tampilkan “tersimpan di perangkat”
System: simpan event append-only dengan stable ID dan sequence
Koneksi kembali
→ UI: `syncing`
System: authorization, version, revision, dan idempotency validation
◇ sinkron berhasil?
  Ya → UI: `synced`; state server diperbarui
  Tidak → UI: `conflict/expired/requires action`
        → pertahankan local event; lakukan recovery resmi
```

### 12.3 Batas offline

Placement, high-impact verification, checkpoint, dan simulation tidak dimulai offline. Transcript tidak digunakan sebagai pengganti scored Listening saat audio gagal.

### 12.4 Multi-device

- Practice evidence dari dua perangkat disimpan sebagai event berbeda dan diproses idempotently.
- Satu assessment run tidak dapat aktif pada dua perangkat.
- UI tidak memakai last-write-wins untuk submission atau evaluation.

## 13. LF-08 — Sesi Selesai dan Plan Diperbarui

### 13.1 Main flow

```text
Aktivitas terakhir selesai atau session budget tercapai
System: jangan menambah aktivitas baru
◇ exit check masih dapat diselesaikan dalam grace?
  Ya → jalankan exit check
  Tidak → tandai belum lengkap tanpa dianggap gagal
System: tutup run secara sah dan kirim summary/evidence event
Learning Engine: recalculates mastery, review schedule, misconception,
                 progression, plan, dan decision explanation
→ [L-PRACTICE-SUMMARY]
UI: tampilkan yang dikerjakan, feedback ringkas, perubahan status,
    review berikutnya, XP bermakna, dan next action
User: selesai
→ [L-HOME] atau return target yang sah
✓ Run `completed`; state baru dapat ditemukan
```

### 13.2 Guardrail

- Summary membedakan activity completion dan mastery change.
- Tidak semua sesi harus menaikkan mastery.
- Jika recalculation pending, tampilkan status pending dan jangan menggunakan estimasi UI.
- XP/streak hanya berasal dari event aktivitas bermakna yang telah divalidasi Learning Engine.

## 14. LF-09 — Sesi Terlewat dan Replan

### 14.1 Main flow

```text
Scheduled session melewati waktu tanpa completion
Learning Engine: mastery tetap; review urgency naik; plan dihitung ulang
System: batasi sesi pengganti otomatis maksimal 125% durasi normal
→ [L-HOME banner/card] dan [L-SCHEDULE-REPLAN]
UI: jelaskan apa yang berubah dan mengapa
◇ plan masih muat dalam capacity?
  Ya → distribusikan sisa beban ke hari tersedia
  Tidak → tandai `at_risk` atau `unrealistic`; masuk LF-04
User: terima plan atau ubah availability/target
System: simpan revision final
✓ Rencana baru aktif; tidak ada mastery penalty
```

### 14.2 Tone

Gunakan bahasa pemulihan seperti “Kita sesuaikan rencananya” dan hindari bahasa hukuman seperti “Kamu gagal menjaga jadwal”. Streak mengikuti policy aktivitas bermakna dan tidak disamakan dengan mastery.

## 15. LF-10 — Review dan Remedial

### 15.1 Review due

```text
Learning Engine: review menjadi due/overdue
→ Beranda, Belajar → Review, dan Jadwal
UI: tampilkan alasan `REVIEW_DUE` atau `RETENTION_PROBE_DUE`
User: mulai review
System: validasi approved item dan mode
→ Practice runtime
User: selesaikan retrieval
Learning Engine: evaluasi retention dari evidence baru
◇ berhasil?
  Ya → jadwalkan interval berikutnya/restore state sesuai policy
  Tidak → status dapat menjadi `needs_review`; rekomendasikan penguatan
✓ Next review/action tersedia
```

### 15.2 Remedial terkonfirmasi

```text
System: misconception/gap dikonfirmasi oleh rule
→ UI: jelaskan topik dan mengapa perlu diperkuat
User: mulai penguatan
→ Contrastive explanation
→ Guided practice
→ Independent retrieval baru tanpa bantuan
◇ verification memenuhi rule?
  Ya → resolve misconception/update state
  Tidak → ulang, jadwalkan review, atau turun ke prerequisite
✓ Blocker diperbarui berdasarkan evidence, bukan completion
```

### 15.3 Guardrail

- Satu jawaban salah tidak otomatis menjadi confirmed misconception.
- Remedial blocker tidak dapat dilewati untuk membuka hard prerequisite.
- Learner dapat menunda aktivitas non-blocking; dampaknya dijelaskan.
- Review tambahan/free practice hanya memberi evidence sesuai approved mode dan policy.

## 16. LF-11 — Unit/Stage Checkpoint dan Gate

### 16.1 Main flow

```text
Learning Engine: unit/stage berstatus `checkpoint_due`
→ [L-LEARN-ASSESSMENTS] atau Beranda
User: buka checkpoint
→ [L-ASSESSMENT-BRIEF]
UI: jelaskan eligibility, aturan, feedback release, timer, dan retake
→ [L-ASSESSMENT-CHECK]
System: buat locked run
User: selesaikan item/set
System: score dan rilis feedback setelah checkpoint
Learning Engine: evaluasi gate dari mastery, retention, outcome,
                 checkpoint, dan critical weakness
◇ gate lulus?
  Ya → unit/stage `completed`; target berikutnya eligible
  Tidak → `remedial_required`; review/remedial tetap tersedia
→ [L-ASSESSMENT-RESULT]
UI: tampilkan hasil, blocker, dan next action
✓ Gate state tersimpan dengan reason
```

### 16.2 Retake

Retake hanya tersedia setelah targeted remedial dan paling cepat sesuai policy. Alternate set digunakan; item answer-revealed tidak dipakai kembali sebagai scored high-impact evidence dalam validity window.

## 17. LF-12 — Simulation dan Readiness

### 17.1 Eligibility

Learner hanya dapat memulai simulation ketika engine menyatakan eligible. Jika belum eligible, UI menampilkan requirement yang belum terpenuhi dan tindakan yang tersedia tanpa CTA aktif palsu.

### 17.2 Main flow

```text
[L-PROGRESS-READINESS atau L-LEARN-ASSESSMENTS]
User: pilih simulation eligible
→ [L-ASSESSMENT-BRIEF]
UI: jelaskan struktur, waktu, feedback setelah seluruh form,
    satu active device, disconnect grace, dan disclaimer
→ [L-ASSESSMENT-CHECK]
User: tes audio/koneksi dan konfirmasi readiness
System: lock form, version, manifest, accommodation, dan timer
→ Vocabulary section (20 menit)
User: submit section
→ Transition maksimal sesuai policy tanpa feedback
→ Grammar–Reading section (40 menit)
User: submit section
→ Transition
→ Listening section (sekitar 30 menit sesuai assembly)
User: submit dan konfirmasi seluruh form
System: validate integrity; score atau tandai pending/adjudication
◇ result valid dan siap?
  Ya → [L-ASSESSMENT-RESULT]
        UI: weighted accuracy internal, raw group accuracy,
            strengths/gaps, critical weakness, threshold, disclaimer
        Learning Engine: evaluasi seluruh readiness requirements
        UI: tampilkan form berikutnya/review/remedial/verification
  Tidak → [L-ASSESSMENT-ISSUE/PENDING]
✓ Result atau adjudication state tersimpan
```

### 17.3 Readiness guardrail

- Membutuhkan seluruh rule readiness; tidak ada kompensasi terhadap terminal prerequisite, domain floor, delayed retention, simulation count, atau critical weakness.
- UI tidak menampilkan estimated official scaled score.
- UI tidak menyatakan probabilitas atau jaminan lulus.
- Dua form readiness harus berbeda serta ekuivalen; form yang mendapat full debrief tidak digunakan ulang sesuai exposure policy.

### 17.4 Failure dan interruption

- Disconnect memakai grace per incident/kumulatif; resume dengan remaining time dan manifest sama.
- Audio gagal setelah informasi kunci terdengar sebagian → integrity issue; jangan score sebagai salah.
- Grace terlewati → section invalidated kecuali adjudication menyatakan platform incident.
- Exit manual → jelaskan konsekuensi abandon/invalidation sebelum konfirmasi.
- Result evaluator pending → tahan readiness update sampai result valid.

## 18. LF-13 — Menjelajahi Jalur dan Memilih Aktivitas Eligible

```text
[L-LEARN-PATH]
UI: tampilkan stage/unit aktif, available, locked, checkpoint, dan completed
User: buka unit/lesson
→ [L-LEARN-DETAIL]
UI: tampilkan outcome, status, prerequisite explanation, dan aktivitas
◇ aktivitas eligible?
  Ya → CTA mulai; masuk LF-05/LF-10/LF-11
  Tidak → jelaskan dasar yang perlu dikuasai dan link ke next action
◇ lesson pernah selesai dan free practice eligible?
  Ya → tawarkan latihan ulang dengan dampak evidence yang jelas
User: kembali
↩ Posisi stage/unit dan scroll dipertahankan
```

Jalur tidak menawarkan override untuk hard prerequisite. Learner dapat memilih di antara beberapa target eligible atau memprioritaskan domain sesuai batas Learning Engine.

## 19. LF-14 — Memahami Progres, Mastery, dan Readiness

### 19.1 Main flow

```text
[L-PROGRESS-OVERVIEW]
UI: tampilkan interpretasi, progress kurikulum, status domain, dan next action
User: pilih domain
→ [L-PROGRESS-DOMAIN]
UI: tampilkan topik kuat, perlu review, weakness, retention, dan evidence summary
User: pilih kesiapan
→ [L-PROGRESS-READINESS]
UI: tampilkan requirements met/unmet, assessment, critical weakness,
    validity, dan disclaimer
User: pilih tindakan yang tersedia
→ review/remedial/assessment/jadwal
```

### 19.2 Aturan interpretasi

- Completion, mastery, dan readiness memakai visual serta label berbeda.
- Status tidak turun hanya karena waktu berlalu; waktu dapat menaikkan review urgency/uncertainty.
- Estimated mastery dari placement dibedakan dari mastery berbasis delayed evidence.
- Learner tidak perlu melihat bobot matematis untuk memahami tindakan berikutnya.
- Detail internal version/reason dapat tersedia untuk support, tetapi tidak mendominasi learner view.

## 20. LF-15 — Mengubah Target, Availability, Preference, atau Accommodation

### 20.1 Availability atau target

```text
[L-SCHEDULE-AVAILABILITY atau L-ACCOUNT-GOAL]
User: edit input
UI: validasi lokal tanpa mengubah plan aktif
User: minta lihat dampak
System: buat proposal plan revision
UI: bandingkan jadwal, beban, proyeksi, serta risk
User: konfirmasi
System: commit revision jika learner state masih sama
◇ stale revision?
  Ya → refresh proposal; jangan timpa perubahan baru
✓ Plan baru aktif; mastery/evidence tetap
```

### 20.2 Preference fokus

Preference memengaruhi pilihan di antara target eligible, tetapi tidak membuka hard prerequisite atau menghapus critical weakness.

### 20.3 Accessibility/accommodation

- Preference presentasi yang aman dapat berlaku pada aktivitas berikutnya.
- Signed assessment accommodation mengikuti policy dan tidak dapat diubah client saat run aktif.
- Jika perubahan modality membuat aktivitas tidak ekuivalen, engine memilih approved replacement atau menjelaskan bahwa scored evidence tidak tersedia.
- Perubahan tidak mengubah evidence historis secara retroaktif tanpa migration/adjudication resmi.

## 21. LF-16 — Melaporkan Masalah Konten

### 21.1 Main flow

```text
[Practice activity/feedback atau released result]
User: pilih “Laporkan masalah”
→ [L-PRACTICE-REPORT]
UI: sertakan item/version/run context secara aman
User: pilih kategori dan tulis detail opsional
User: kirim
System: buat stable ContentIssue ID secara idempotent
UI: konfirmasi laporan diterima
↩ Kembali ke runtime/result tanpa kehilangan state
Content Operations: issue masuk CF-05
✓ Laporan tercatat; score/evidence tidak berubah secara spekulatif
```

### 21.2 Kategori minimum learner-facing

- pertanyaan/jawaban tampak salah;
- pilihan atau instruksi ambigu;
- bahasa Jepang terasa tidak alami;
- terjemahan/penjelasan Indonesia membingungkan;
- audio/gambar/animasi bermasalah;
- masalah aksesibilitas;
- masalah lain.

Canonical issue category dipetakan di server. UI tidak meminta learner menentukan severity atau keputusan quarantine.

## 22. CF-01 — Membuat dan Mengajukan Artefak

### 22.1 Precondition

- Internal user authenticated dan memiliki authoring permission.
- Curriculum/inventory/version context telah dipilih.

### 22.2 Main flow

```text
[C-CONTENT]
User: pilih tipe artefak dan buat baru/versi baru
System: buat stable ID/version draft
→ [C-CONTENT-DETAIL]
Author: isi body, metadata, KC mapping, answer/rubric, support,
        accessibility, asset, rights, dan source rationale yang berlaku
UI: tampilkan completeness serta dependency secara kontinu
Author: jalankan self-check/automated validation
System: simpan result per criterion/fixture
◇ mandatory validation gagal?
  Ya → UI: link langsung ke field/dependency/fixture; tetap draft
  Tidak → Author: ajukan review
System: validasi revision dan ubah lifecycle ke `academic_review`
System: buat assignment/queue entry
✓ Version terkunci untuk review sesuai workflow
```

### 22.3 Guardrail

- AI-assisted draft selalu ditandai pada attribution.
- Answer key, rubric, rights, accessibility metadata, dan version tidak boleh hilang saat duplicate/versioning.
- Author tidak dapat menyetujui sendiri artefak yang memerlukan independent approver.
- Autosave tidak mengubah lifecycle atau mengajukan review.

## 23. CF-02 — Review, Finding, dan Keputusan

### 23.1 Main flow

```text
[C-DASHBOARD assignment atau C-REVIEW-QUEUE]
Reviewer: buka assignment
→ [C-REVIEW-DETAIL]
UI: tampilkan artifact version, role context, applicable criteria,
    automated result, dependency, preview, dan unresolved findings
Reviewer: periksa evidence dan isi result per criterion
Reviewer: buat finding dengan severity, bukti, dan owner
◇ perlu comparison/preview?
  Ya → [C-REVIEW-COMPARE atau preview CF-07] ↩
Reviewer: submit keputusan
System: validasi reviewer authority, assignment, revision, dan completeness
◇ hasil?
  revision_required → lifecycle berubah; masuk CF-03
  rejected → version ditutup dengan rationale
  approved sebagian → tunggu reviewer/approver wajib lain
  approved lengkap → status `approved`
✓ Decision menyimpan reviewer ID, role, timestamp, version, rubric version, dan komentar
```

### 23.2 Branch dan conflict

- Dua reviewer berbeda pendapat → status tidak naik; authority/escalation path terlihat.
- `not_tested` pada mandatory criterion → memblokir approval.
- Reviewer membuka version lama → view-only atau diminta pindah; mutation tidak diterapkan ke latest version.
- Approver adalah author artefak → UI menegakkan separation of duties dan meminta approver lain.
- Autosave finding conflict → gunakan revision check dan comparison; jangan last-write-wins.

## 24. CF-03 — Memperbaiki Revision-Required Content

```text
[C-CONTENT-DETAIL: revision_required]
Author: lihat findings dikelompokkan berdasarkan blocker/major/minor dan owner
Author: buat version perbaikan atau revision sesuai policy
UI: pertahankan hubungan ke review dan version sebelumnya
Author: ubah field/asset/dependency yang relevan
Author: jawab finding dengan bukti perbaikan
System: jalankan ulang validator terdampak
◇ mandatory failure tersisa?
  Ya → tetap revision_required/draft sesuai lifecycle
  Tidak → ajukan review ulang
System: reviewer melihat diff dan response, bukan hanya hasil final
✓ Version baru kembali ke antrean yang tepat
```

Finding tidak dapat ditutup hanya dengan komentar tanpa evidence perubahan atau accepted rationale dari authority yang tepat.

## 25. CF-04 — Merakit, Memvalidasi, dan Mempublikasikan Pack

### 25.1 Main flow

```text
[C-RELEASE-PACKS]
Content Operations: buat/select candidate pack dan curriculum target
System: resolve artifact, asset, policy, blueprint, serta dependency versions
→ [C-RELEASE-VALIDATION]
System: jalankan schema, reference, graph, distribution, coverage,
        asset, rights, accessibility, answer leakage, dan compatibility checks
◇ failure?
  Ya → UI: kelompokkan blocker dan link ke owner/artifact/dependency
        → perbaikan/review ulang; publish disabled
  Tidak → tampilkan manifest, approval completeness, dan impact summary
Content Operations: minta/konfirmasi required approvals
→ [C-RELEASE-PUBLISH]
UI: tampilkan environment, version, effective time, dan rollback context
Authorized user: confirm publish
System: revalidate revision/manifest lalu publish secara atomic/idempotent
→ [C-RELEASE-HISTORY]
✓ Pack `published`; immutable release record tersedia
```

### 25.2 Guardrail

- Hanya approved artefak/version kompatibel yang dapat dipublikasikan.
- Publish tidak boleh meng-upgrade dependency diam-diam.
- Partial publish yang meninggalkan pack tidak konsisten dianggap gagal dan harus rollback/compensate secara resmi.
- Learner run aktif mempertahankan locked instance atau mengikuti safe version transition.

## 26. CF-05 — Triage Issue dan Quarantine

### 26.1 Main flow

```text
Issue dari learner, reviewer, analytics, validator, incident, rights, atau drift
→ [C-ISSUES-INBOX]
Content Operations: buka issue
→ [C-ISSUES-DETAIL]
UI: tampilkan source, artifact/version, usage, learner impact terbatas,
    duplicate/related issue, dan evidence
User: klasifikasikan kategori serta severity; assign reviewer
◇ operational threshold/material risk tercapai?
  Tidak → monitor atau correction workflow
  Ya → buat quarantine proposal
→ [C-ISSUES-QUARANTINE]
Required reviewers/authority: menilai risiko, fallback, dan downstream impact
Authorized decision: quarantine
System: tandai item unavailable untuk run baru; catat decision
Practice/Learning Engine: gunakan approved fallback atau replan
✓ Learner baru terlindungi; evidence lama belum diubah
```

### 26.2 Guardrail

- Jumlah report saja tidak otomatis membuktikan content salah.
- Quarantine memerlukan reason, artifact/version, authority, timestamp, fallback, dan impact.
- Run aktif hanya menyelesaikan item jika aman; item tidak diganti diam-diam setelah exposure.
- Evidence historis tidak dihapus atau dipenalti sampai adjudication/migration resmi.

## 27. CF-06 — Correction, Adjudication, Migration, dan Rollback

```text
[C-ISSUES-CORRECTION]
Owner: buat corrected version dan hubungkan ke issue/quarantine
Reviewers: jalankan review sesuai criterion terdampak
System: hitung dependency dan historical impact candidate
→ [C-ISSUES-ADJUDICATION]
Authority: tentukan apakah learner result/evidence memerlukan supersession
Technical/Data + Academic authority: set migration/recalculation policy
Product/Content Ops: tinjau communication dan operational impact
◇ keputusan?
  Correct + migrate → publish version baru; jalankan migration idempotent
  Correct no-history-change → publish untuk run baru; pertahankan record lama
  Rollback → aktifkan approved prior version/pack sesuai compatibility
System: simpan decision, versions, affected scope, result, dan rollback condition
✓ Downstream state konsisten dan dapat diaudit
```

UI tidak menyediakan tombol generik “perbaiki semua skor”. Setiap perubahan historis harus menunjuk policy, evidence source, version, affected learner scope, dan authority.

## 28. CF-07 — Preview Interaktif tanpa Learner Evidence

```text
[C-CONTENT-DETAIL → Preview]
Reviewer/Author: pilih mode, viewport, modality, locale/support variant
System: materialize preview dari version/seed yang dipilih
UI: tandai jelas `PREVIEW — tidak menghasilkan learner evidence`
User: jalankan interaction, hint, feedback, audio, dan alternative controls
System: tampilkan evaluation trace/debug hanya untuk authorized role
User: buat finding yang menautkan state/variant/seed
↩ kembali ke artifact/review dengan context dipertahankan
✓ Preview/QA record tersedia; learner analytics dan mastery tidak berubah
```

Preview answer key dan debug information tidak boleh tersedia bagi learner role atau melalui public deep link.

## 29. CF-08 — Audit Keputusan dan Version

```text
[C-AUDIT]
Authorized user: cari decision/artifact/run/issue/version
System: tampilkan timeline immutable dan relationship
User: buka decision
UI: tampilkan actor, role, authority, timestamp, input snapshot,
    policy/rubric/curriculum/content versions, output, dan reason
User: bandingkan version atau telusuri downstream impact
◇ data cukup mereproduksi keputusan?
  Ya → export/report sesuai permission
  Tidak → buat audit gap/incident; jangan mengarang missing state
✓ Reproduction result atau gap tercatat
```

Raw learner response, private note, answer key, dan personal data hanya tampil sesuai least-privilege serta retention policy.

## 30. Flow Handoff Learner ke Content Operations

| Learner event | Internal entry | State learner selama proses | Possible outcome |
| --- | --- | --- | --- |
| Content report | `C-ISSUES-INBOX` | Score tidak berubah otomatis | Closed, duplicate, correction, quarantine |
| Asset failure | Issue/technical queue | Technical skip/pending/fallback | Asset replacement atau pack fix |
| Ambiguous answer | Review/adjudication | Evaluation pending; no mastery penalty | Valid evaluation atau superseding result |
| Unsupported modality | Content gap/accessibility review | Approved replacement atau unavailable | Equivalent item/interaction ditambahkan |
| Difficulty drift | Quality report | Plan menggunakan approved current policy | Recalibration/version change |
| Published content quarantined | Issue/quarantine | Active run safe handling; new run fallback | Correction/migration/rollback |

Learner hanya menerima notifikasi hasil issue jika notification policy dan privacy policy menetapkannya. Audit internal selalu mempertahankan relationship ke learner event melalui identifier yang aman.

## 31. Flow State dan Status Transition

### 31.1 Onboarding

```text
not_started → draft_guest → authentication_required
→ authenticated_draft → plan_pending → completed
                     └→ placement_in_progress → plan_pending
```

### 31.2 Practice run

```text
created → validating → ready → in_progress → completed
              │          │         ├→ paused → in_progress
              │          │         ├→ abandoned
              │          │         └→ expired
              └→ rejected└──────────→ superseded
```

### 31.3 Learning plan

```text
draft/proposal → active → recalculating → active revision
                     └→ superseded

risk: on_track | at_risk | unrealistic
```

### 31.4 Unit progression

```text
locked → available → active → checkpoint_due → completed
                         └────────→ remedial_required
```

### 31.5 Content lifecycle

```text
draft → academic_review → revision_required → approved → published
                 └────────────────────────────→ rejected
published → deprecated
published → quarantined → correction/review → published version baru/deprecated
```

UI hanya menampilkan transisi yang sah untuk role, state, version, dan authority saat itu.

## 32. UX Copy pada Titik Sensitif

Dokumen Content Design menentukan wording final. Flow harus mempertahankan maksud berikut:

| Kondisi | Maksud pesan |
| --- | --- |
| Prerequisite blocker | Jelaskan dasar yang diperkuat dan materi yang akan terbuka |
| Review due | Jelaskan bahwa waktunya mengingat kembali, bukan kemampuan “menurun sendiri” |
| Sesi terlewat | Jelaskan penyesuaian rencana tanpa menyalahkan |
| Target unrealistic | Jujur tentang kapasitas dan berikan pilihan yang tidak menurunkan standar |
| Evaluation pending | Tegaskan jawaban tersimpan dan belum dinilai, bukan salah |
| Technical failure | Bedakan kendala sistem dari performa learner |
| Remedial | Fokus pada pola spesifik serta tindakan perbaikan |
| Readiness not ready | Tampilkan requirement yang belum terpenuhi dan next action |
| Simulation result | Tegaskan hasil internal, bukan skor resmi atau jaminan lulus |
| Quarantine internal | Tegaskan version, scope, fallback, dan bahwa history belum otomatis berubah |

## 33. Accessibility dalam Flow

- Setiap flow dapat diselesaikan dengan keyboard tanpa gesture presisi.
- Focus berpindah ke heading/error/feedback yang relevan dan tidak meloncat saat konten dinamis muncul.
- Screen reader memperoleh perubahan state tanpa membocorkan unreleased feedback.
- Timeout memperhitungkan signed accommodation; response time tidak menghukum waktu pembacaan screen reader.
- Drag memiliki alternatif select/move; audio memiliki play/pause/replay keyboard; Kanji animation memiliki step/static alternative.
- Reduced motion tidak menghilangkan informasi urutan, progres, correctness, atau state transition.
- Jika alternative interaction mengubah konstruk, flow menuju approved replacement atau unavailable state; bukan evidence palsu.
- Error recovery mempertahankan input dan memberi focus pada tindakan pemulihan.

## 34. Security dan Privacy dalam Flow

- Account identity wajib sebelum placement atau penyimpanan initial plan.
- Assessment run terikat learner, form, version, expiry, dan device/session policy.
- Answer key dan unreleased feedback tidak dikirim/ditampilkan sebelum diperlukan.
- Internal action memerlukan authorization ulang pada server, termasuk deep link dan retry.
- Learner issue report menggunakan konteks minimum; raw response tidak disalin ke analytics event.
- Preview internal ditandai dan terisolasi dari learner evidence.
- Mutation berisiko tinggi—publish, quarantine, adjudication, rollback—memerlukan confirmation dengan target/version eksplisit.
- Tidak ada microphone, camera, atau invasive proctoring pada MVP.

## 35. Acceptance Criteria

Dokumen user flow dianggap siap menjadi dasar screen specification apabila:

1. guest dapat mengisi goal dan availability, tetapi tidak dapat memulai placement atau menyimpan initial plan tanpa account;
2. auth failure tidak menghapus onboarding draft;
3. pemula absolut dapat memulai U01 tanpa placement panjang;
4. placement membedakan estimate, confidence, gap, dan verification dari mastery final;
5. target at risk/unrealistic menawarkan pilihan tanpa menurunkan standard;
6. active run selalu memiliki resume atau safe recovery path;
7. duplicate submit tidak menghasilkan attempt/evaluation ganda;
8. failure teknis, unsupported modality, atau pending evaluator tidak dihitung sebagai jawaban salah;
9. feedback release tetap sesuai mode setelah pause, resume, history, atau error;
10. session budget tidak menyebabkan aktivitas baru ditambahkan setelah waktu habis;
11. missed session memicu replan tanpa mastery penalty dan replacement load otomatis dibatasi;
12. review/remedial, checkpoint, simulation, serta readiness mempertahankan prerequisite dan evidence rules;
13. completion, mastery, readiness, XP, dan streak tidak disatukan menjadi satu outcome;
14. learner dapat melaporkan konten tanpa kehilangan state atau mengubah score secara spekulatif;
15. Content Author tidak dapat menjadi sole approver untuk artefaknya sendiri;
16. mandatory validation failure serta `not_tested` memblokir approval/publication;
17. publish, quarantine, correction, migration, adjudication, dan rollback menunjuk version serta authority yang tepat;
18. interactive preview tidak menghasilkan learner evidence;
19. seluruh flow sensitif menyediakan keyboard, screen-reader, reduced-motion, dan recovery behavior;
20. setiap completion state dapat dipetakan ke screen, system state, event, serta acceptance test.

## 36. Keputusan dan Pertanyaan untuk Screen Specification

| ID | Pertanyaan | Rekomendasi awal | Status |
| --- | --- | --- | --- |
| `FLOW-OPEN-001` | Identity provider dan metode autentikasi MVP | Clerk Hobby; learner memakai Google Sign-In dan email link, Content Operations memakai Google Sign-In dengan staff allowlist/RBAC Nekoru | **Ditetapkan** |
| `FLOW-OPEN-002` | Umur onboarding draft tamu | Simpan pada browser selama 7 hari atau sampai berhasil dimigrasikan/dihapus pengguna | Terbuka |
| `FLOW-OPEN-003` | Bottom navigation pada detail lesson | Tetap terlihat pada eksplorasi; hilang pada focused runtime | Terbuka |
| `FLOW-OPEN-004` | Posisi achievement | Subsection Progres; hanya pencapaian penting boleh muncul ringkas di Beranda | Terbuka |
| `FLOW-OPEN-005` | Free practice lesson selesai | Boleh jika Learning Engine menyatakan eligible; label dampak terhadap mastery ditampilkan | Terbuka |
| `FLOW-OPEN-006` | Preview interaktif internal | Didukung penuh pada desktop dengan label non-evidence dan role restriction | Terbuka |
| `FLOW-OPEN-007` | Feedback status laporan konten kepada learner | In-app bila issue menyebabkan correction/adjudication yang memengaruhi learner; detail internal tidak dibagikan | Terbuka |

Pertanyaan tersebut tidak mengubah flow akademik. Screen specification harus menandai state yang masih bergantung pada keputusan terbuka.

`FLOW-OPEN-001` ditetapkan pada 13 September 2026. Clerk membuktikan identity; seluruh authorization dan authority keputusan tetap diverifikasi backend Nekoru.
