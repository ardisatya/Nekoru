# UI/UX Overview Nekoru — MVP

**Status:** Draft v0.1  
**Audiens:** Product, design, akademik, content operations, accessibility, data, QA, dan engineering  
**Cakupan:** Fondasi pengalaman learner dan content operations untuk aplikasi web Nekoru  
**Bahasa produk:** Bahasa Indonesia (`id-ID`)  
**Tanggal:** 13 September 2026

## 1. Tujuan Dokumen

Dokumen ini menerjemahkan spesifikasi produk, kurikulum, learning engine, practice engine, assessment, dan validasi konten menjadi fondasi UI/UX Nekoru. Dokumen ini menetapkan:

1. pengalaman yang harus dirasakan pengguna;
2. aktor dan kebutuhan utamanya;
3. prinsip desain yang mengikat seluruh layar dan alur;
4. ruang lingkup pengalaman MVP;
5. batas keputusan antara UI, pengguna, dan engine;
6. perjalanan pengguna tingkat tinggi;
7. ukuran keberhasilan UX;
8. keputusan yang harus diselesaikan sebelum information architecture dan screen specification dikunci.

Dokumen ini tidak mendefinisikan layout final, visual token, komponen, atau detail per layar. Hal tersebut diturunkan dalam dokumen UI/UX berikutnya.

## 2. Sumber dan Hierarki Keputusan

Dokumen ini diturunkan dari:

- [Product Overview](../product-specs/product-overview.md)
- [Arsitektur Kurikulum](../product-specs/curriculum-architecture.md)
- [Mastery Specification](../product-specs/mastery-specification.md)
- [Learning Engine](../product-specs/learning-engine.md)
- [Practice Engine](../product-specs/practice-engine.md)
- [Assessment Specification N5](../product-specs/assessment-specification-n5.md)
- [Content Validation Rubric](../product-specs/content-validation-rubric.md)
- [Beginner Foundations N5](../content/beginner-foundations-n5.md)
- [Content Progression N5](../content/content-progression-n5.md)
- inventory dan blueprint masing-masing domain pembelajaran.

Jika terjadi konflik:

1. scope, pengguna, nilai produk, dan batas MVP mengikuti Product Overview;
2. urutan, prasyarat, dan validitas akademik mengikuti Arsitektur Kurikulum serta dokumen domain;
3. mastery, evidence, progression, scheduling, dan readiness mengikuti Mastery Specification serta Learning Engine;
4. perilaku aktivitas, attempt, hint, feedback, resume, dan fallback mengikuti Practice Engine;
5. timer, navigation, feedback release, scoring, dan integrity assessment mengikuti Assessment Specification;
6. approval, publication, quarantine, dan separation of duties mengikuti Content Validation Rubric;
7. UI tidak boleh mengubah arti keputusan dari sistem-sistem tersebut untuk menyederhanakan tampilan.

## 3. Pernyataan Pengalaman

Nekoru membantu pelajar bahasa Jepang di Indonesia mengetahui apa yang perlu dipelajari sekarang, mengapa hal tersebut dipilih, dan seberapa dekat mereka terhadap kesiapan JLPT N5. Pengalaman harus terasa seperti dibimbing oleh teman belajar yang hangat dan dapat dipercaya: memberi arah yang jelas, menyesuaikan rencana tanpa menghakimi, serta jujur mengenai progres dan kelemahan.

Janji pengalaman Nekoru adalah:

> Saya selalu tahu langkah belajar berikutnya, memahami alasan rekomendasinya, dan dapat menyesuaikan waktu belajar tanpa kehilangan arah atau menurunkan standar penguasaan.

## 4. Sasaran UX MVP

### 4.1 Orientasi

Pengguna baru dapat memahami fungsi Nekoru, menentukan target, dan memperoleh jalur belajar awal tanpa harus memahami istilah teknis kurikulum atau mastery.

### 4.2 Kejelasan tindakan berikutnya

Pada setiap kunjungan, learner dapat membedakan:

- aktivitas utama yang direkomendasikan sekarang;
- aktivitas yang jatuh tempo atau memblokir progres;
- aktivitas opsional;
- alasan sistem memilih atau mengubah aktivitas tersebut.

### 4.3 Kepercayaan terhadap adaptasi

Perubahan jadwal, materi, status penguasaan, atau readiness harus disertai penjelasan singkat yang benar. Adaptasi tidak boleh terasa acak, menghukum, atau menyembunyikan aturan.

### 4.4 Belajar yang aman secara emosional

Kesalahan diperlakukan sebagai informasi untuk menentukan bantuan berikutnya. UI tidak mempermalukan learner, tidak menggunakan bahasa yang menyalahkan, dan tidak mengubah satu kesalahan menjadi kesimpulan kemampuan yang berlebihan.

### 4.5 Progres yang jujur

UI membedakan penyelesaian aktivitas, estimasi kemampuan, mastery sementara, mastery terverifikasi, dan readiness. Completion, XP, streak, atau level tidak boleh ditampilkan sebagai pengganti mastery.

### 4.6 Fleksibilitas yang tetap terarah

Learner dapat mengubah ketersediaan, durasi, fokus, dan pilihan di antara target yang eligible. UI harus menjelaskan ketika pilihan tidak dapat dilakukan karena hard prerequisite, integrity assessment, atau readiness rule.

### 4.7 Akses yang setara

Pengalaman inti harus dapat digunakan dengan keyboard, screen reader, zoom, reduced motion, dan alternatif interaksi yang mempertahankan konstruk akademik. Aksesibilitas merupakan bagian dari definisi aktivitas, bukan mode tambahan setelah desain selesai.

### 4.8 Operasi konten yang dapat diaudit

Tim internal dapat menemukan, menilai, mengembalikan, menyetujui, mempublikasikan, mengarantina, dan menelusuri versi konten tanpa kehilangan bukti keputusan atau separation of duties.

## 5. Aktor dan Kebutuhan

### 5.1 Learner pemula absolut

**Kondisi awal:** belum memahami sistem tulisan atau fondasi bahasa Jepang dan dapat merasa cemas menghadapi placement panjang.

**Kebutuhan utama:**

- dapat memilih mulai dari dasar tanpa harus membuktikan bahwa dirinya pemula;
- memahami struktur belajar tanpa dibebani istilah akademik;
- memperoleh bantuan romaji, bahasa Indonesia, audio, dan visual sesuai support policy;
- melihat keberhasilan kecil yang bermakna tanpa mendapat klaim mastery palsu;
- mengetahui kapan bantuan dikurangi dan mengapa.

### 5.2 Learner berpengalaman dengan gap

**Kondisi awal:** pernah belajar bahasa Jepang, tetapi tingkat penguasaan antardomain tidak merata.

**Kebutuhan utama:**

- placement yang efisien dan tidak terasa mengulang semua materi;
- hasil yang menjelaskan kekuatan, gap, confidence, dan verification yang masih diperlukan;
- jalur yang dapat dimulai dari posisi berbeda per domain jika diizinkan kurikulum;
- penjelasan bahwa remedial tertentu membuka materi berikutnya, bukan berarti seluruh kemampuan rendah.

### 5.3 Learner dengan waktu terbatas

**Kondisi awal:** memiliki target ujian atau pribadi, tetapi hari dan durasi belajar terbatas atau mudah berubah.

**Kebutuhan utama:**

- mengetahui beban belajar yang realistis;
- dapat mengubah hari dan durasi tanpa mereset progres;
- memperoleh replan yang tidak menumpuk beban berlebihan setelah sesi terlewat;
- memahami status `on_track`, `at_risk`, atau `unrealistic` dan pilihan tindak lanjutnya;
- dapat menyelesaikan sesi sesuai time budget tanpa aktivitas baru ditambahkan ketika waktu habis.

### 5.4 Learner dengan kebutuhan aksesibilitas

Kebutuhan aksesibilitas dapat hadir pada segmen learner mana pun dan tidak diperlakukan sebagai persona terpisah. Profil dapat menyimpan accommodation atau batas modality yang relevan, sedangkan setiap aktivitas menyediakan alternatif yang setara atau approved replacement.

### 5.5 Content Author

**Kebutuhan utama:** membuat atau menyunting artefak, melampirkan sumber dan metadata, menjalankan self-check, menanggapi finding, dan mengajukan review. Author tidak dapat menjadi satu-satunya approver untuk karyanya sendiri.

### 5.6 Reviewer dan approver

Peran review mencakup Academic Lead, Japanese Linguistic Reviewer, Assessment Reviewer, Indonesian Localization Reviewer, Domain Specialist, Accessibility Reviewer, Technical/Data Reviewer, dan Rights Reviewer.

**Kebutuhan utama:**

- melihat hanya pemeriksaan dan bukti yang relevan terhadap perannya tanpa kehilangan konteks keseluruhan;
- membandingkan konten, answer key, rubric, asset, dependency, dan versi;
- mencatat hasil `pass`, `fail`, `not_applicable`, atau `not_tested` beserta finding;
- mengetahui gate yang memblokir approval;
- memberikan keputusan yang tercatat dengan reviewer ID, role, timestamp, versi, dan komentar material.

### 5.7 Content Operations

**Kebutuhan utama:** mengelola antrean kerja, status lifecycle, kelengkapan content pack, publication, quarantine, correction tracking, content gap, dan operational issue tanpa mengambil keputusan akademik di luar kewenangannya.

### 5.8 Product Owner dan support operasional

**Kebutuhan utama:** menyelesaikan konflik lintas-tim, melihat audit trail, menangani perubahan production berisiko tinggi, dan membantu kasus learner tanpa dapat mengubah evidence atau hasil assessment secara informal.

## 6. Prinsip Desain Pengalaman

### 6.1 Tunjukkan satu arah utama

Setiap layar learner memiliki satu tindakan utama yang jelas. Pilihan sekunder tetap tersedia, tetapi tidak bersaing secara visual dengan langkah belajar yang direkomendasikan.

### 6.2 Jelaskan adaptasi pada saat relevan

Penjelasan diberikan ketika keputusan berubah atau ketika pengguna meminta detail. UI menggunakan alasan yang spesifik, misalnya review jatuh tempo atau prerequisite belum kuat, bukan label generik seperti “dipilih AI”.

### 6.3 Bedakan rekomendasi, persyaratan, dan pilihan

- **Rekomendasi:** dapat dipilih atau ditunda jika tidak memblokir jalur.
- **Persyaratan:** harus dipenuhi karena prerequisite, gate, atau assessment integrity.
- **Pilihan pengguna:** mengubah preferensi dan rencana dalam batas akademik.

Perbedaan tersebut harus terlihat dari label, bahasa, dan tindakan yang tersedia; tidak boleh bergantung hanya pada warna.

### 6.4 Mastery bukan completion

Membuka explanation, melihat animasi, atau menyelesaikan layar tidak ditampilkan sebagai bukti mastery. Jika UI menampilkan progres aktivitas dan progres penguasaan pada layar yang sama, keduanya harus memiliki label serta visual semantics berbeda.

### 6.5 Jangan menghukum ketidakhadiran secara semu

Sesi terlewat tidak mengurangi mastery atau menghapus streak secara manipulatif. UI menjelaskan konsekuensi nyata: review menjadi lebih urgen, rencana dihitung ulang, atau target menjadi berisiko.

### 6.6 Kesalahan menghasilkan bantuan yang dapat dilakukan

Feedback menjelaskan apa yang benar atau salah sesuai release policy, lalu mengarahkan learner ke percobaan berikutnya, hint, contrastive explanation, review, atau remedial. Bahasa feedback tidak memberi penilaian terhadap kecerdasan atau usaha learner.

### 6.7 Jangan membuka jawaban sebelum waktunya

Correctness, rationale, transcript, dan diagnostic summary mengikuti mode aktivitas. Placement, verification, checkpoint, dan simulation dapat menahan feedback sampai set, section, atau seluruh form selesai.

### 6.8 Pertahankan konstruk pada semua modality

Alternatif keyboard, audio, drag-and-drop, atau visual harus mengukur kemampuan yang sama. Jika tidak tersedia alternatif yang ekuivalen, UI menawarkan approved replacement atau menyatakan aktivitas tidak tersedia; UI tidak mengubah transcript menjadi scored Listening atau tracing menjadi mastery Kanji.

### 6.9 Gamifikasi mendukung belajar

XP, level, streak, dan achievement merayakan aktivitas belajar bermakna serta konsistensi. Gamifikasi tidak boleh mendorong sesi kosong, retake cepat, mengabaikan review, atau menutupi status readiness yang sebenarnya.

### 6.10 Progres harus dapat dipahami tanpa matematika internal

Learner menerima status, kecenderungan, dan alasan yang dapat ditindaklanjuti. Bobot matematis, confidence detail, policy version, atau decision log ditampilkan hanya pada konteks yang memang membutuhkan detail, seperti audit internal.

### 6.11 Bahasa Jepang harus tetap terbaca

Kana, small kana, tanda diakritik, Kanji, furigana, spasi, dan tanda baca tidak boleh rusak oleh ukuran, font, wrapping, atau transformasi teks. Teks Jepang, transliterasi, terjemahan literal, dan terjemahan komunikatif dirender sebagai field yang berbeda.

### 6.12 Gagal secara aman dan transparan

Gangguan jaringan, asset, evaluator, version, atau sinkronisasi tidak boleh dianggap jawaban salah. UI mempertahankan pekerjaan yang valid, menjelaskan status, dan menawarkan retry, resume, replan, approved fallback, atau bantuan sesuai kondisi.

### 6.13 Konten learner selalu tervalidasi

UI learner hanya menyajikan konten yang berstatus dan berversi sesuai policy environment. Kegagalan memperoleh konten tervalidasi menghasilkan fallback atau explicit unavailable state, bukan konten baru yang dibuat bebas saat runtime.

## 7. Model Kendali dan Keputusan

| Area | Learner dapat | Sistem menentukan | UI wajib menjelaskan |
| --- | --- | --- | --- |
| Target | Memilih target dan tanggal | Proyeksi beban dan risiko | Realisme target dan konsekuensi pilihan |
| Availability | Mengubah hari dan durasi | Replan berdasarkan kapasitas | Perubahan jadwal serta dampaknya |
| Jalur | Memilih di antara target eligible dan fokus | Eligibility serta hard prerequisite | Mengapa materi terkunci atau diprioritaskan |
| Sesi | Memulai, pause, resume, dan melakukan aksi yang diizinkan | Komposisi serta urutan sesi | Tujuan sesi dan alasan aktivitas penting |
| Review | Meminta review tambahan | Due date dan urgency | Mengapa review muncul kembali |
| Remedial | Mengikuti atau menunda jika tidak blocking | Diagnosis terkonfirmasi dan blocker | Gap spesifik serta langkah pemulihan |
| Mastery | Melihat bukti dan status | Perhitungan dari evidence tervalidasi | Arti status dan perubahan yang terjadi |
| Readiness | Melihat detail dan memilih next action | Evaluasi seluruh syarat | Syarat yang sudah/belum terpenuhi dan disclaimer |
| Assessment | Menavigasi sesuai policy dan menyerahkan jawaban | Timer, scoring, release, validity, retake | Aturan sebelum mulai dan hasil setelah release |
| Accessibility | Menentukan preference/accommodation yang tersedia | Eligibility evidence untuk modality | Jika alternatif mengubah atau tidak menghasilkan scored evidence |

UI tidak menghitung ulang mastery, readiness, nilai final, attempt, atau eligibility. UI merender state dan reason code dari sumber yang berwenang, menangkap tindakan pengguna, serta mencegah representasi yang menyesatkan.

## 8. Perjalanan Utama Learner

### 8.1 Aktivasi pemula absolut

```text
Buat akun
→ Tentukan tujuan dan tanggal target
→ Atur hari serta durasi belajar
→ Pilih “mulai dari dasar”
→ Baseline probe singkat bila diperlukan
→ Tinjau rencana dan proyeksi
→ Mulai S0/U01
```

Keberhasilan pengalaman: learner memahami komitmen waktunya dan dapat memulai sesi pertama tanpa placement panjang.

### 8.2 Aktivasi learner berpengalaman

```text
Buat akun
→ Tentukan tujuan, target, dan availability
→ Pilih placement
→ Routing screener dan adaptive branch
→ Verification bila confidence belum cukup
→ Hasil kekuatan, gap, dan starting unit
→ Tinjau rencana
→ Mulai sesi adaptif
```

Keberhasilan pengalaman: hasil placement terasa spesifik, tidak memberi klaim mastery final, dan menjelaskan verification yang masih diperlukan.

### 8.3 Siklus belajar harian

```text
Buka beranda
→ Pahami sesi yang direkomendasikan dan alasannya
→ Mulai/resume sesi
→ Introduction, guided, independent, review, atau remedial
→ Terima feedback sesuai mode
→ Exit check
→ Ringkasan sesi
→ Mastery, review schedule, dan rencana diperbarui
```

Keberhasilan pengalaman: learner selalu mengetahui posisi di dalam sesi, aturan bantuan, dan tindakan berikutnya.

### 8.4 Pemulihan setelah sesi terlewat

```text
Sesi terlewat
→ Rencana dihitung ulang tanpa menurunkan mastery
→ UI menjelaskan perubahan
→ Learner menerima atau mengubah availability
→ Beban disebar dengan batas aman
→ Status target diperbarui
```

Keberhasilan pengalaman: learner dapat kembali belajar tanpa merasa dihukum atau menghadapi beban yang tidak realistis.

### 8.5 Progression dan checkpoint

```text
Unit aktif
→ Evidence dan delayed review mencukupi
→ Checkpoint due
→ Checkpoint dijalankan
→ Gate dievaluasi
→ Unit berikutnya terbuka atau remedial ditawarkan
```

Keberhasilan pengalaman: perbedaan antara unit selesai, checkpoint, dan mastery dapat dipahami tanpa membaca aturan internal.

### 8.6 Readiness dan simulation

```text
Syarat simulation terpenuhi
→ Persiapan dan pemeriksaan teknis
→ Section timed
→ Submit seluruh form
→ Hasil serta diagnostic summary dirilis
→ Readiness dievaluasi
→ Simulation berikutnya, review, remedial, atau verification
```

Keberhasilan pengalaman: learner memahami bahwa hasil adalah ukuran internal Nekoru, bukan scaled score resmi atau jaminan lulus JLPT.

### 8.7 Pelaporan masalah konten

```text
Learner menemukan masalah
→ Laporkan dari konteks item
→ UI mengonfirmasi laporan tanpa mengubah nilai secara spekulatif
→ Content Operations meninjau
→ Karantina/koreksi/adjudication bila diperlukan
→ Learner menerima perubahan hasil hanya melalui keputusan resmi
```

## 9. Perjalanan Utama Content Operations

### 9.1 Authoring sampai publication

```text
Draft
→ Self-check dan automated validation
→ Academic review
→ Revision required atau approval
→ Release validation
→ Published content pack
```

### 9.2 Review lintas-peran

```text
Artefak masuk antrean
→ Reviewer melihat scope dan version yang tepat
→ Memeriksa criterion serta evidence
→ Membuat finding dan keputusan per criterion
→ Approver sesuai authority matrix memutuskan
→ Semua tindakan masuk audit history
```

### 9.3 Issue dan quarantine

```text
Issue dari learner/reviewer/analytics/validator
→ Triage dan lihat dampak/dependency
→ Quarantine bila threshold tercapai
→ Approved fallback untuk run baru
→ Correction dan review
→ Version baru, adjudication, migration, atau rollback
```

Keberhasilan pengalaman internal: tidak ada status, versi, approval, atau dependency penting yang berubah tanpa bukti dan audit trail.

## 10. Ruang Lingkup UI/UX MVP

### 10.1 Termasuk — learner

- pembuatan akun dan profil belajar;
- target N5 atau tanggal target pribadi;
- availability, timezone, preference, dan kebutuhan aksesibilitas;
- pilihan pemula absolut atau placement;
- placement, verification, checkpoint, cumulative review, dan simulation;
- learning plan, proyeksi, jadwal, serta rescheduling;
- home dan rekomendasi sesi;
- peta stage, unit, dan progression;
- lesson introduction, practice, review, remedial, feedback, dan session summary;
- progress per domain, mastery, retention, weakness, dan readiness;
- XP, level, streak, dan achievement;
- resume, offline/sync state untuk mode yang diizinkan;
- profile, preference, dan content issue reporting.

### 10.2 Termasuk — internal

- content bank dan pencarian artefak;
- authoring/editing metadata serta content body;
- automated validation result;
- antrean review dan assignment;
- criterion, finding, evidence, serta approval;
- preview aktivitas lintas modality;
- lifecycle dan version history;
- content pack validation serta publication;
- content issue, quarantine, correction, adjudication, dan rollback context;
- audit dashboard serta content-gap reporting.

### 10.3 Tidak termasuk dalam MVP

- materi N4 sampai N1;
- aplikasi native iOS atau Android;
- leaderboard dan fitur sosial kompetitif;
- kelas langsung, marketplace tutor, atau komunitas;
- speaking bebas, penilaian rekaman suara, handwriting mastery, atau writing bebas;
- monetisasi;
- invasive proctoring melalui kamera atau mikrofon;
- klaim scaled score resmi atau probabilitas kelulusan JLPT.

Marketing site, customer support tooling di luar audit kasus learner, dan metode autentikasi spesifik belum didefinisikan oleh sumber produk dan tidak dikunci dalam dokumen ini.

## 11. Prinsip Informasi dan Bahasa

### 11.1 Bahasa utama

- Navigasi, instruksi, hint, feedback, error, dan penjelasan keputusan menggunakan Bahasa Indonesia.
- Istilah Jepang diperkenalkan bertahap dan disertai konteks sesuai kemampuan learner.
- Istilah internal seperti KC, evidence weight, policy version, dan prerequisite graph tidak digunakan pada UI learner kecuali diterjemahkan menjadi konsep yang dapat dipahami.

### 11.2 Status learner

Baseline konsep yang perlu dibedakan:

- belum dipelajari;
- sedang dipelajari;
- perlu diulang;
- dikuasai sementara;
- dikuasai;
- locked karena prasyarat;
- checkpoint due;
- remedial required.

Label final dan microcopy ditentukan dalam Content Design. Warna, ikon, dan pola visual tidak boleh menjadi satu-satunya pembeda status.

### 11.3 Explainability bertingkat

Informasi keputusan disajikan dalam tiga tingkat:

1. **Ringkas:** satu alasan utama dan tindakan berikutnya.
2. **Detail learner:** bukti atau kondisi yang relevan, dampak, serta pilihan yang tersedia.
3. **Audit internal:** reason code, source state, policy/curriculum/content version, timestamp, dan decision ID.

## 12. Constraint Pengalaman

### 12.1 Platform

Produk MVP adalah aplikasi web. Strategi breakpoint dan prioritas viewport belum ditetapkan. Seluruh alur inti minimal harus tetap lengkap pada viewport yang disepakati; responsive behavior didefinisikan dalam dokumen khusus.

### 12.2 Online dan offline

- Introduction, guided, independent, free practice, review, dan remedial dapat berjalan offline hanya dengan signed package, evaluator lokal, serta policy yang valid.
- Placement, high-impact verification, checkpoint, dan simulation adalah online-only pada baseline MVP.
- UI harus membedakan `saved locally`, `syncing`, `synced`, `conflict`, `expired`, dan `requires connection` tanpa menganggap gangguan sebagai kesalahan learner.

### 12.3 Session budget

UI tidak menambahkan aktivitas baru ketika waktu sesi habis. Aktivitas aktif dapat menggunakan grace window; sisa plan dikembalikan untuk replan. Estimasi durasi tidak boleh berfungsi sebagai tekanan waktu jika policy bernilai `none` atau `soft_target`.

### 12.4 Assessment integrity

Pada assessment high-impact, timer, manifest, feedback release, backtracking, replay, resume, dan concurrency mengikuti blueprint. UI harus menjelaskan aturan sebelum assessment dimulai dan mencegah tindakan yang tidak tersedia, tanpa mengungkap answer key.

### 12.5 Privacy

UI tidak meminta rekaman mikrofon atau kamera pada MVP. Raw response, accessibility preference, device, dan input-method information hanya diminta atau ditampilkan sejauh diperlukan untuk fungsi, QA, atau kebijakan retensi yang disetujui.

## 13. Indikator Keberhasilan UX

### 13.1 Aktivasi

- persentase pengguna yang menyelesaikan tujuan, target, availability, dan pemilihan jalur;
- persentase pengguna yang mencapai sesi pertama;
- waktu dan abandonment per langkah onboarding/placement;
- pemahaman pengguna terhadap komitmen waktu dan hasil placement melalui usability test.

### 13.2 Sesi belajar

- session start, meaningful completion, pause, resume, dan abandonment;
- completion per interaction type dan modality;
- hint, retry, skip, report, technical failure, serta evaluation-pending rate;
- kemampuan pengguna menjelaskan alasan aktivitas dipilih;
- kesalahan interaksi yang tidak mencerminkan kesalahan akademik.

### 13.3 Jadwal dan pemulihan

- penerimaan atau pengubahan replan;
- return-to-learning setelah sesi terlewat;
- jumlah pengguna yang memahami perbedaan `on_track`, `at_risk`, dan `unrealistic`;
- frekuensi beban yang ditolak atau diubah karena tidak sesuai waktu pengguna.

### 13.4 Progres dan kepercayaan

- kemampuan pengguna membedakan completion, mastery, dan readiness;
- pemahaman alasan status naik, perlu review, atau memerlukan remedial;
- penggunaan detail progres dan next action;
- content-report resolution dan perubahan kepercayaan setelah incident.

### 13.5 Accessibility dan reliability

- task completion dengan keyboard, screen reader, zoom 200%, serta reduced motion;
- parity keberhasilan antara interaksi utama dan alternatif yang ekuivalen;
- technical skip dan unsupported-modality rate;
- keberhasilan resume, offline queue, dan sinkronisasi.

### 13.6 Content operations

- review turnaround time;
- finding resolution time;
- approval yang tertolak karena separation-of-duties atau mandatory gate;
- publication, quarantine, dan rollback error rate;
- kemampuan reviewer menemukan versi, dependency, gate, dan bukti keputusan yang benar.

Engagement tidak boleh dianggap berhasil jika dicapai dengan mengurangi retrieval, menunda review, melonggarkan gate, atau membuat readiness tampak lebih tinggi daripada hasil engine.

## 14. Acceptance Criteria Dokumen

Dokumen ini dianggap cukup untuk menjadi sumber information architecture apabila:

1. learner dan aktor internal utama beserta kebutuhannya telah terdefinisi;
2. pengalaman utama pemula absolut, learner berpengalaman, dan learner dengan waktu terbatas tercakup;
3. prinsip UX tidak bertentangan dengan mastery, prerequisite, assessment, atau content validation policy;
4. batas kendali learner, engine, dan UI dinyatakan eksplisit;
5. perjalanan utama learner dan content operations tersedia;
6. scope MVP serta out-of-scope dapat diturunkan menjadi screen inventory;
7. accessibility, failure, offline, dan assessment integrity diperlakukan sebagai bagian pengalaman inti;
8. ukuran keberhasilan UX tidak mengoptimalkan engagement dengan mengorbankan kualitas belajar;
9. keputusan terbuka yang memengaruhi arsitektur informasi telah dicatat.

## 15. Dokumen Turunan

Urutan penyusunan yang direkomendasikan:

1. `02-information-architecture.md` — domain informasi, sitemap, navigation model, dan role access;
2. `03-user-flows.md` — happy path, branch, recovery, dan failure path;
3. `04-screen-specifications-learner.md` — kontrak setiap layar learner;
4. `05-screen-specifications-content-ops.md` — kontrak layar authoring, review, dan operation;
5. `06-practice-interactions.md` — interaction, attempt, hint, feedback, audio, input Jepang, dan accessibility behavior;
6. `07-design-system.md` — token, typography, layout, component, icon, illustration, motion, dan data visualization;
7. `08-accessibility-content-and-edge-cases.md` — conformance, UX writing, localization, responsive rules, state matrix, dan fallback;
8. `09-prototype-usability-test.md` — prototype coverage, research plan, finding, dan decision log;
9. `10-analytics-and-handoff.md` — UI event, acceptance test, design QA, dan implementation handoff.

## 16. Keputusan Lintas-Dokumen

| ID | Keputusan | Ketetapan atau rekomendasi | Status | Memengaruhi |
| --- | --- | --- | --- | --- |
| `UX-OPEN-001` | Viewport utama aplikasi web | Responsive mobile-first untuk learner; desktop-first untuk content operations | **Ditetapkan** | IA, navigation, responsive layout |
| `UX-OPEN-002` | Posisi Content Operations dalam produk | Aplikasi internal terpisah secara navigasi dan permission, tetapi memakai fondasi design system yang sama | **Ditetapkan** | IA, authentication, design system |
| `UX-OPEN-003` | Bentuk karakter/mascot Nekoru | Companion kucing gender-neutral bergaya kawaii modern; hadir kontekstual pada onboarding, Home, session summary, milestone, dan bantuan, tanpa menutupi materi atau mengganggu assessment | Ditetapkan | Visual system, motion, content design |
| `UX-OPEN-004` | Autentikasi MVP | Clerk Hobby sebagai identity provider; learner memakai Google Sign-In dan email link, Content Operations memakai Google Sign-In dengan staff allowlist serta RBAC Nekoru | **Ditetapkan** | Onboarding, account access, dan internal authorization |
| `UX-OPEN-005` | Kanal reminder | In-app sebagai baseline; email atau web push memerlukan keputusan consent dan notification policy | Terbuka | Jadwal, settings, privacy |
| `UX-OPEN-006` | Target formal accessibility | WCAG 2.2 AA sebagai requirement; AAA diupayakan untuk body text dan konten belajar kritis tanpa klaim full AAA; construct-equivalence tetap mengikuti Practice Engine | **Ditetapkan** | Seluruh desain dan QA |
| `UX-OPEN-007` | Cara learner mengaktifkan offline package | Preload sesi berikutnya secara transparan ditambah status eksplisit; kontrol manual dapat ditambahkan jika dibutuhkan | Terbuka | Home, session start, settings |
| `UX-OPEN-008` | Marketing/public surface | Di luar product app sampai kebutuhan acquisition dan public content ditetapkan | Terbuka | Sitemap publik dan autentikasi |

`UX-OPEN-001`, `UX-OPEN-002`, `UX-OPEN-003`, `UX-OPEN-004`, dan `UX-OPEN-006` ditetapkan pada 13 September 2026. Clerk hanya menjadi sumber identitas; authorization, staff allowlist, role, permission, dan authority matrix tetap dimiliki backend Nekoru. Keputusan lain tetap terbuka sampai artefak terkait membutuhkannya. Tidak ada keputusan pada tabel yang boleh digunakan untuk mengubah aturan akademik dari sumber utama.
