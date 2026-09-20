# Learning Engine Nekoru — Spesifikasi MVP

**Status:** Draft v0.1  
**Audiens:** Product, akademik, data, AI, dan engineering  
**Cakupan:** Pemula absolut hingga kesiapan JLPT N5  
**Bahasa produk:** Bahasa Indonesia  
**Tanggal:** 13 September 2026

## 1. Tujuan Dokumen

Dokumen ini mendefinisikan perilaku learning engine Nekoru sebagai kontrak bersama antara product, akademik, data, AI, dan engineering. Learning engine mengubah kurikulum kanonik, bukti belajar pengguna, target ujian, serta waktu yang tersedia menjadi keputusan belajar yang deterministik, dapat dijelaskan, dan dapat diaudit.

Dokumen ini menetapkan:

1. flow belajar dari onboarding sampai status `N5 Ready`;
2. batas tanggung jawab learning engine;
3. model evidence dan formula mastery policy v1;
4. adaptive placement dan verification;
5. pemilihan review, remedial, target baru, dan aktivitas integrasi;
6. perakitan sesi dan penyesuaian jadwal;
7. progression, checkpoint, dan readiness;
8. batas penggunaan AI saat runtime;
9. kontrak event, state, output keputusan, audit, serta fallback;
10. acceptance criteria untuk implementasi MVP.

Dokumen ini melengkapi:

- [Product Overview](./product-overview.md)
- [Arsitektur Kurikulum](./curriculum-architecture.md)
- [Mastery Specification](./mastery-specification.md)
- [Practice Engine](./practice-engine.md)

Jika terjadi konflik, scope dan validitas akademik mengikuti Arsitektur Kurikulum; evidence, mastery, agregasi, retensi, dan readiness mengikuti Mastery Specification; perilaku keputusan runtime lainnya mengikuti dokumen ini selama tidak menurunkan standar akademik tersebut.

## 2. Keputusan Utama MVP

| Area | Keputusan |
| --- | --- |
| Pendekatan | Rules-based, deterministik, configurable, dan versioned |
| Cakupan engine | Placement, evidence, mastery, review, remedial, sequencing, session assembly, adaptive scheduling, readiness, dan explainability |
| Otoritas pengguna | Boleh mengubah waktu, fokus, atau menunda rekomendasi; tidak boleh melewati hard prerequisite atau menurunkan readiness standard |
| Tujuan optimasi | Retensi dan mastery lebih dahulu, kemudian pencapaian target waktu |
| Target tidak realistis | Dijelaskan secara jujur dan diberi opsi penyesuaian; standar mastery tidak diturunkan |
| Evidence lintas-domain | Satu KC utama dan nol atau lebih KC pendukung dengan bobot berdasarkan diagnostic confidence |
| Placement | Adaptive branching sederhana dengan stopping rule dan verification set |
| Peran AI | Membantu klasifikasi kesalahan dan feedback; tidak memutuskan mastery, unlock, atau readiness |
| Auditability | Setiap keputusan menyimpan input snapshot, policy version, reason code, dan output |

Machine learning boleh ditambahkan setelah MVP hanya jika dapat dibandingkan dengan baseline rules-based, memiliki guardrail akademik, dan tidak menghilangkan kemampuan audit atau rollback.

## 3. Prinsip Operasional

### 3.1 Mastery, bukan completion

Membuka pelajaran, menonton penjelasan, atau menyelesaikan layar tidak otomatis menaikkan mastery. Mastery hanya berubah melalui evidence event yang valid.

### 3.2 Prasyarat tidak dapat dinegosiasikan

Preferensi pengguna dapat memengaruhi pilihan tema dan fokus, tetapi tidak dapat membuka target yang hard prerequisite-nya belum memenuhi threshold.

### 3.3 Retensi lebih penting daripada kecepatan semu

Review jatuh tempo dan remedial yang menghambat jalur tidak boleh terus-menerus dikorbankan untuk mengejar target baru.

### 3.4 Adaptasi harus dapat dijelaskan

Setiap perubahan materi, beban, jadwal, atau readiness menghasilkan reason code dan penjelasan singkat yang dapat dipahami pengguna.

### 3.5 Tidak ada silent decay

Mastery tidak turun hanya karena pengguna tidak membuka aplikasi. Waktu meningkatkan urgency review dan ketidakpastian. Penurunan status membutuhkan evidence baru, seperti probe retensi yang gagal.

### 3.6 Fail closed untuk keputusan akademik

Jika policy, kurikulum, atau konten tervalidasi tidak tersedia, engine tidak boleh mengarang target, soal, threshold, atau prerequisite baru.

### 3.7 Satu keputusan dapat direproduksi

Input yang sama dengan policy dan curriculum version yang sama harus menghasilkan keputusan yang sama. Tie-breaker tidak boleh bergantung pada urutan database yang tidak stabil.

## 4. Ruang Lingkup dan Batas Sistem

### 4.1 Tanggung jawab learning engine

Learning engine bertanggung jawab untuk:

- menjalankan placement dan verification;
- menerima serta memvalidasi evidence event;
- memperbarui state mastery per Knowledge Component atau KC;
- mendeteksi kebutuhan probe, review, dan remedial;
- memilih target baru yang eligible;
- merakit rencana sesi sesuai waktu pengguna;
- memperbarui proyeksi jadwal dan beban belajar;
- mengevaluasi unit gate, stage gate, dan N5 readiness;
- menghasilkan alasan keputusan;
- menyimpan decision log yang dapat diaudit.

### 4.2 Sistem yang menyediakan input

| Sistem | Input untuk learning engine |
| --- | --- |
| Curriculum service | Stage, unit, LO, KC, prerequisite graph, blueprint, dan version |
| Content bank | Aktivitas serta item berstatus `approved`/`published`, metadata difficulty, dan attribution |
| Learner profile | Target, tanggal, availability, preferensi fokus, timezone, dan accommodations |
| Activity runtime | Jawaban, hint, attempt, waktu aktif, replay, serta completion |
| Assessment service | Hasil checkpoint dan simulation form |
| AI evaluation | Kandidat diagnosis dan feedback terikat rubrik, bukan keputusan final |

### 4.3 Output untuk sistem lain

| Konsumen | Output |
| --- | --- |
| Learning UI | Session plan, feedback, progress, dan decision explanation |
| Calendar/scheduling UI | Rencana mingguan, proyeksi kesiapan, dan reschedule proposal |
| Gamification | Event aktivitas bermakna; bukan mastery mentah untuk dimanipulasi menjadi XP |
| Analytics | Evidence, decision, policy version, dan outcome snapshot |
| Content operations | Laporan kekurangan konten, difficulty drift, dan ambiguous item |

### 4.4 Di luar tanggung jawab

Learning engine tidak:

- membuat atau mempublikasikan konten utama;
- menentukan validitas linguistik materi;
- mengubah graph kurikulum;
- mengonversi skor internal menjadi scaled score resmi JLPT;
- memberikan nilai speaking atau writing bebas pada MVP;
- menentukan XP, badge, atau desain streak;
- mengirim notifikasi secara langsung.

Engine hanya boleh menghasilkan sinyal seperti `meaningful_learning_completed`, `review_due`, atau `plan_at_risk` untuk dipakai sistem terkait.

## 5. Istilah Inti

| Istilah | Definisi operasional |
| --- | --- |
| Knowledge Component (KC) | Unit pengetahuan terkecil yang mastery-nya dilacak |
| Encounter | Satu stimulus belajar yang dapat menghasilkan satu atau beberapa evidence event |
| Evidence event | Rekaman immutable tentang performa pengguna pada KC tertentu |
| Direct evidence | Evidence yang sengaja dirancang untuk mendiagnosis KC tersebut |
| Supporting evidence | Evidence lintas-domain dengan kontribusi terbatas |
| Exposure | Pengguna melihat atau mendengar target tanpa retrieval; tidak menaikkan mastery |
| Misconception | Pola kesalahan yang memiliki diagnosis dan remedial target |
| Probe | Aktivitas singkat untuk memverifikasi mastery atau forgetting |
| Review | Retrieval terjadwal untuk mempertahankan retensi |
| Remedial | Aktivitas terarah untuk memperbaiki gap atau misconception |
| Eligible target | KC yang boleh dipilih setelah seluruh constraint diperiksa |
| Session plan | Daftar aktivitas terurut untuk satu sesi beserta tujuan dan fallback |
| Learning plan | Proyeksi multi-sesi menuju target pengguna |
| Readiness | Indikator internal bahwa seluruh syarat kesiapan N5 terpenuhi |

Untuk Reading dan Listening, satu passage atau audio tetap dihitung sebagai satu encounter stimulus walaupun memiliki beberapa pertanyaan. Setiap pertanyaan tetap dapat menghasilkan evidence event berbeda.

## 6. Gambaran Arsitektur Logis

```text
Curriculum graph ───────┐
Approved content ───────┤
Learner profile ────────┤
Evidence history ───────┼─→ Learning Engine ─→ Session plan
Schedule availability ──┤                     ├→ Mastery updates
Policy configuration ───┤                     ├→ Learning plan
Assessment results ─────┘                     ├→ Readiness snapshot
                                               └→ Decision log + explanations
```

Learning engine secara logis terdiri dari:

1. **Placement Engine** — menentukan titik awal dan gap;
2. **Evidence Processor** — memvalidasi, mendeduplikasi, dan mengatribusikan evidence;
3. **Mastery Engine** — menghitung mastery dan state transition;
4. **Review Planner** — menentukan due date dan retention probe;
5. **Remedial Resolver** — memetakan kesalahan ke KC atau prerequisite;
6. **Activity Selector** — memilih kandidat konten yang eligible;
7. **Session Assembler** — menyusun urutan aktivitas dalam time budget;
8. **Calendar Planner** — memproyeksikan serta menata ulang jadwal;
9. **Progression Evaluator** — mengevaluasi unit dan stage gate;
10. **Readiness Evaluator** — menghitung status kesiapan N5;
11. **Explanation Builder** — mengubah reason code menjadi penjelasan pengguna;
12. **Policy and Audit Layer** — menjamin versioning, determinisme, dan reproduktibilitas.

Komponen tersebut boleh diimplementasikan dalam satu service pada MVP. Pembagian ini adalah batas perilaku, bukan kewajiban deployment sebagai microservices.

## 7. Flow Belajar End-to-End

```text
Onboarding
→ Tujuan, tanggal target, availability, dan preferensi
→ Pilih pemula absolut atau placement
→ Placement adaptif / baseline pemula
→ Learner model awal
→ Starting unit + prerequisite gaps
→ Learning plan dan proyeksi kesiapan
→ Siklus sesi adaptif
→ Unit checkpoint
→ Stage checkpoint
→ Cumulative review
→ Dua simulation forms berbeda
→ Evaluasi critical weakness dan retention
→ N5 Ready atau targeted remediation
```

### 7.1 Onboarding

Input minimum:

- target program, untuk MVP `PROGRAM.N5.ABSOLUTE_BEGINNER`;
- tanggal target ujian atau tanggal target pribadi;
- hari dan menit belajar yang tersedia;
- timezone pengguna;
- pilihan `absolute_beginner` atau `take_placement`;
- preferensi fokus yang tidak mengubah prerequisite;
- kebutuhan aksesibilitas atau batas modality jika tersedia.

Output onboarding belum merupakan keputusan mastery. Self-report hanya digunakan untuk routing placement dan tidak boleh menghapus target dari readiness calculation.

### 7.2 Jalur pemula absolut

Pengguna yang memilih pemula absolut:

1. memulai dari S0/U01;
2. dapat menerima baseline probe singkat untuk bunyi dan aksara, tetapi bukan tes panjang;
3. memperoleh state awal `not_started` untuk seluruh KC tanpa evidence;
4. memperoleh learning plan berdasarkan baseline 300 jam dan availability;
5. dapat melaju lebih cepat jika evidence sesi awal menunjukkan mastery, tetapi tidak melewati gate tanpa bukti.

### 7.3 Jalur pengguna berpengalaman

Pengguna yang memilih placement:

1. menjalani routing screener;
2. menerima item dari cluster berdaya cakup tinggi;
3. bercabang naik atau turun berdasarkan performa;
4. berhenti setelah floor, ceiling, dan confidence mencukupi atau time cap tercapai;
5. menerima starting unit, KC estimates, prerequisite gaps, confidence, dan verification set;
6. memulai belajar sambil memverifikasi estimate yang confidence-nya belum tinggi.

### 7.4 Siklus sesi

Sebelum setiap sesi, engine membaca state terbaru, membentuk candidate pool, menerapkan prioritas, dan menyusun session plan. Setelah setiap jawaban, engine mencatat evidence dan dapat melakukan adaptasi terbatas terhadap sisa sesi. Setelah sesi, engine memperbarui mastery, review schedule, learning plan, dan explanation.

## 8. Adaptive Placement

### 8.1 Tujuan

Placement memperkirakan mastery per KC atau cluster, bukan hanya satu level global. Placement harus meminimalkan durasi tanpa menganggap jawaban benar tunggal sebagai bukti mastery.

### 8.2 Struktur

Placement MVP menggunakan tiga lapisan:

1. **Routing screener** — item representatif dari kana, vocabulary, grammar, reading, dan listening;
2. **Adaptive branch** — naik ke cluster lebih sulit atau turun ke prerequisite;
3. **Verification set** — item tambahan untuk keputusan yang confidence-nya rendah atau berdampak pada hard prerequisite.

Speaking dan writing bebas tidak masuk placement MVP.

### 8.3 Aturan branching v1

Untuk setiap cluster:

- mulai dengan tiga direct items pada target difficulty;
- jika sedikitnya dua item memiliki evidence signal `≥0,80` dan tidak ada critical prerequisite failure, uji cluster berikutnya;
- jika paling banyak satu item mencapai `≥0,80`, turun ke prerequisite cluster;
- hasil campuran atau indikasi guessing memicu dua verification items;
- satu kegagalan pada hard prerequisite selalu memicu verification, bukan langsung dianggap gap permanen.

Estimate cluster:

| Kondisi | Estimate |
| --- | --- |
| Weighted signal `≥0,85`, minimal 5 direct items, stabil pada 3 item terakhir | `estimated_mastered`, high confidence |
| Weighted signal `≥0,85`, tetapi bukti belum cukup | `estimated_mastered`, medium/low confidence; perlu verification |
| Weighted signal `0,70–0,849` | `uncertain`; perlu verification atau mulai dengan review |
| Weighted signal `<0,70` | `estimated_gap` |

### 8.4 Stopping rule

Placement berhenti jika salah satu kondisi terpenuhi:

- floor dan ceiling telah ditemukan untuk seluruh domain yang diuji;
- keputusan starting unit tidak berubah selama dua branch terakhir;
- time cap 25 menit tercapai;
- pengguna memilih berhenti;
- fatigue guardrail aktif karena error rate atau waktu respons memburuk secara tajam.

Jika placement berhenti karena time cap atau fatigue, hasil tetap dapat digunakan dengan label confidence rendah dan verification set pada sesi berikutnya.

### 8.5 Pengaruh placement

- High-confidence mastery estimate dapat melewati aktivitas instruksional.
- Estimate tidak langsung menjadi `mastered`; state awal maksimum adalah `provisional` sampai delayed evidence terpenuhi.
- Hard prerequisite dengan confidence rendah tidak boleh dianggap selesai.
- Gap kana dapat memundurkan Reading/Kanji tanpa otomatis memundurkan Listening.
- Domain yang kuat boleh memulai lebih tinggi selama graph tetap valid.

## 9. Flow Sesi Belajar

```text
Buka sesi
→ Tujuan dan alasan pemilihan
→ Retrieval warm-up
→ Review jatuh tempo
→ Remedial blocker/miskonsepsi bila ada
→ Instruksi target baru
→ Guided practice
→ Independent retrieval
→ Reading/Listening terintegrasi
→ Exit check
→ Ringkasan, perubahan mastery, dan rencana berikutnya
```

Tidak setiap sesi harus memiliki seluruh langkah. Sesi review murni, checkpoint, atau simulation menggunakan blueprint khusus.

### 9.1 Komposisi default

Untuk sesi sekitar 30 menit:

| Komponen | Proporsi | Perkiraan menit |
| --- | ---: | ---: |
| Review jatuh tempo | 35% | 10–11 |
| Target baru | 40% | 12 |
| Reading/Listening terintegrasi | 20% | 6 |
| Refleksi dan feedback | 5% | 1–2 |

Remedial menggunakan budget review terlebih dahulu, lalu dapat menggantikan target baru. Engine tidak menambah durasi secara diam-diam.

### 9.2 Adaptasi di dalam sesi

Engine boleh mengubah aktivitas yang belum dimulai jika:

- dua kegagalan diagnostik menunjukkan prerequisite gap;
- critical misconception terdeteksi;
- waktu tersisa tidak cukup;
- modality gagal, misalnya audio tidak dapat diputar;
- item tidak valid atau dilaporkan bermasalah;
- fatigue guardrail aktif.

Aktivitas yang sedang berlangsung tidak diganti secara mendadak. Perubahan sisa sesi harus dicatat dengan reason code.

### 9.3 Exit check

Exit check mengukur satu sampai tiga target penting secara mandiri. Exit check bukan ujian besar dan tidak wajib menaikkan status. Jika waktunya habis, sesi tetap dapat selesai, tetapi engine menandai evidence yang belum lengkap untuk sesi berikutnya.

### 9.4 Sesi bermakna

Engine menerbitkan `meaningful_learning_completed` jika salah satu kondisi terpenuhi:

1. sedikitnya lima menit active-learning time dan tiga direct retrieval responses yang valid; atau
2. satu checkpoint atau simulation section diselesaikan sesuai blueprint.

Membuka aplikasi, membaca menu, atau exposure tanpa retrieval tidak memenuhi syarat. Product gamification boleh menggunakan event ini, tetapi tidak boleh mengubah mastery sebagai balasan atas streak atau XP.

## 10. Model Evidence

### 10.1 Evidence event minimum

Setiap evidence event bersifat immutable dan minimal menyimpan:

```yaml
event_id: EVT.01J...
event_type: answer_evaluated
occurred_at: 2026-09-13T10:15:00+07:00
learner_id: USER.123
session_id: SESSION.456
encounter_id: ENCOUNTER.789
item_id: ITEM.N5.GRAMMAR.001
item_version: 1.2.0
curriculum_version: 1.0.0
mastery_policy_version: 1.0.0
primary_kc_id: KC.N5.GRAMMAR.PARTICLE.001
supporting_kcs:
  - kc_id: KC.N5.VOCAB.PLACE.004
    diagnostic_confidence: 0.80
correctness: 1.0
difficulty_band: target
hint_level: none
attempt_number: 1
activity_type: direct_retrieval
response_time_ms: 8200
evaluation_source: deterministic_key
```

Jawaban mentah hanya disimpan sesuai kebijakan privasi dan kebutuhan audit. Mastery calculation menggunakan field terstruktur.

### 10.2 Validitas evidence

Evidence tidak mengubah mastery jika:

- event duplikat;
- item atau version tidak ditemukan;
- item belum approved/published saat diberikan;
- answer key/rubric version tidak diketahui;
- aktivitas hanya exposure;
- evaluation gagal atau diagnostic confidence di bawah `0,50`;
- sesi terdeteksi rusak secara teknis sehingga respons tidak dapat dipercaya.

Event tetap dicatat dengan status `rejected` atau `non_mastery` beserta alasannya.

### 10.3 Primary dan supporting attribution

- Setiap scored item wajib memiliki tepat satu `primary_kc_id`.
- Supporting KC bersifat opsional dan harus dideklarasikan dalam metadata item.
- Primary KC menerima attribution weight `1,00`.
- Supporting KC menerima attribution weight `0,35`; nilai ini kemudian dikalikan dengan `diagnostic_confidence` pada formula evidence weight.
- Incidental KC tidak menerima mastery credit.
- Supporting evidence memengaruhi score secara terbatas, tetapi tidak memenuhi minimum encounter atau evidence breadth kecuali metadata item menandainya `directly_diagnostic` dan telah disetujui akademik.

Attribution tidak boleh dibuat bebas oleh AI saat runtime. AI hanya boleh memilih dari mapping yang telah disetujui atau mengusulkan diagnosis untuk diverifikasi aturan.

### 10.4 Deduplication

`event_id` adalah idempotency key. Pengiriman ulang event yang sama tidak boleh mengubah state dua kali. Beberapa pertanyaan pada satu passage dapat menghasilkan event berbeda tetapi berbagi `encounter_id`.

## 11. Mastery Policy v1

### 11.1 Tujuan dan batas

Formula berikut adalah baseline implementasi, bukan klaim bahwa bobotnya sudah optimal secara ilmiah. Seluruh nilai harus berada dalam konfigurasi `MasteryPolicy 1.0.0`, dapat diuji ulang, dan tidak boleh diubah tanpa versioning.

### 11.2 Evidence signal

Untuk evidence `e`, hitung:

```text
signal_e = correctness_e × independence_e × attempt_e
weight_e = activity_e × difficulty_e × attribution_e × diagnostic_confidence_e
```

Nilai `signal_e` dibatasi ke rentang `0–1`. `weight_e` bernilai nonnegatif dan dapat mencapai `1,15` karena stretch difficulty. Jawaban salah tetap memiliki `signal = 0` dan weight positif sehingga tetap menjadi bukti.

#### Correctness

| Hasil | Nilai |
| --- | ---: |
| Benar penuh | 1,00 |
| Sebagian benar jika rubric mengizinkan | 0,50 |
| Salah/kosong | 0,00 |

#### Independence

| Bantuan | Nilai |
| --- | ---: |
| Tanpa hint | 1,00 |
| Hint ringan | 0,85 |
| Hint kuat | 0,60 |
| Jawaban ditampilkan | 0,20 |

#### Attempt

| Percobaan | Nilai |
| --- | ---: |
| Pertama | 1,00 |
| Kedua | 0,80 |
| Ketiga atau lebih | 0,60 |

Percobaan setelah jawaban ditampilkan tidak dihitung sebagai encounter baru.

#### Activity weight

| Jenis evidence | Nilai |
| --- | ---: |
| Direct independent retrieval | 1,00 |
| Applied context/comprehension | 0,90 |
| Recognition terisolasi | 0,75 |
| Guided practice | 0,50 |
| Exposure | 0,00 |

#### Difficulty weight

| Band | Nilai |
| --- | ---: |
| Easy | 0,85 |
| Target | 1,00 |
| Stretch | 1,15 |

Difficulty band berasal dari content metadata dan dapat dikalibrasi melalui item analytics. Waktu respons tidak menjadi penalti langsung pada MVP; ia dipakai sebagai fatigue, anomaly, dan difficulty-calibration signal.

### 11.3 Agregasi per KC

Gunakan maksimal 12 evidence valid terbaru per KC. Rank weight mencegah satu riwayat lama mendominasi tanpa membuat mastery turun hanya karena waktu berlalu:

| Urutan evidence | Rank weight |
| --- | ---: |
| 4 terbaru | 1,00 |
| 4 berikutnya | 0,75 |
| 4 berikutnya | 0,50 |

```text
P = Σ(signal_e × weight_e × rank_weight_e)
    / Σ(weight_e × rank_weight_e)

B = evidence_types_satisfied / evidence_types_required

C = rata-rata signal dari 3 direct encounters terbaru

R = weighted mean dari qualifying delayed evidence
```

Semua komponen dibatasi ke `0–1`.

Satu evidence type dinyatakan satisfied jika memiliki direct evidence dengan `signal ≥0,80`. Jenis yang diwajibkan berasal dari `AssessmentBlueprint` per domain.

Delayed evidence bersifat qualifying jika:

- terjadi sedikitnya tujuh hari setelah instruksi atau successful retrieval yang menjadi anchor;
- merupakan direct evidence;
- tidak menggunakan hint kuat atau answer reveal;
- item tidak identik dengan anchor item.

Jika qualifying delayed evidence belum tersedia, gunakan `R* = P` hanya untuk menghitung provisional score dan set `retention_qualified = false`.

```text
mastery_score = 0.55P + 0.15B + 0.15C + 0.15R*
```

### 11.4 Evidence sufficiency dan cap

Walaupun score tinggi, aturan berikut berlaku:

- kurang dari tiga direct encounters: score operasional maksimum `0,84`;
- evidence breadth belum memenuhi minimum: score operasional maksimum `0,84`;
- unresolved critical misconception: score operasional maksimum `0,69`;
- tidak ada delayed evidence: status maksimum `provisional`;
- supporting evidence saja tidak dapat menghasilkan `provisional` atau `mastered`.

### 11.5 Status mastery

| Status | Aturan |
| --- | --- |
| `not_started` | Belum ada evidence valid |
| `learning` | Ada evidence, tetapi syarat provisional belum terpenuhi |
| `provisional` | Score ≥0,85; ≥3 direct encounters; breadth terpenuhi; tidak ada critical misconception |
| `mastered` | Seluruh syarat provisional + qualifying delayed evidence dengan agregat ≥0,80 |
| `needs_review` | Pernah provisional/mastered lalu memenuhi aturan penurunan berbasis evidence |

### 11.6 Aturan penurunan status

Satu jawaban salah biasa tidak langsung menghapus mastery. Engine menjadwalkan confirmation probe. Status berubah menjadi `needs_review` jika salah satu terjadi:

- qualifying delayed probe memiliki signal `<0,80`;
- sedikitnya dua dari tiga direct encounters terbaru memiliki signal `<0,70`;
- mastery score turun di bawah `0,70` karena evidence baru;
- critical misconception aktif;
- checkpoint menunjukkan kegagalan sistematis yang dapat diatribusikan ke KC.

Status tidak berubah hanya karena due date terlewati.

### 11.7 Restorasi mastery

KC `needs_review` kembali menjadi:

- `provisional` setelah remedial selesai dan syarat provisional kembali terpenuhi;
- `mastered` jika masih memiliki qualifying delayed evidence yang valid dan tidak ada critical misconception;
- jika delayed evidence lama tidak lagi representatif setelah perubahan besar konten/policy, engine meminta delayed probe baru sesuai migration rule.

### 11.8 Confidence

Mastery score dan confidence disimpan terpisah.

```text
confidence = min(1,
  0.40 × encounter_sufficiency
  + 0.25 × breadth
  + 0.20 × recency_coverage
  + 0.15 × diagnostic_quality
)
```

Confidence rendah tidak otomatis menurunkan mastery. Ia meningkatkan prioritas probe. `recency_coverage` mengukur apakah ada evidence pada interval yang relevan, bukan melakukan silent decay.

## 12. Review dan Spaced Repetition

### 12.1 Interval baseline

Interval awal: `1, 3, 7, 14, 30, 60` hari.

Hasil retrieval dipetakan menjadi rating:

| Rating | Aturan v1 | Dampak |
| --- | --- | --- |
| `again` | signal <0,50 | Ulang singkat dalam sesi jika aman, lalu 1 hari |
| `hard` | 0,50–0,799 | Pertahankan atau mundurkan satu interval |
| `good` | 0,80–0,949 | Maju satu interval |
| `easy` | ≥0,95, tanpa hint, target/stretch difficulty | Maju hingga dua interval |

Review item berikutnya harus berbeda dari item terakhir jika content pool memungkinkan.

### 12.2 Review urgency

Due date menentukan eligibility. Keterlambatan tidak menurunkan mastery, tetapi meningkatkan urgency:

```text
overdue_ratio = max(0, days_overdue / planned_interval_days)
review_urgency = clamp(0.50 + 0.30 × overdue_ratio + 0.20 × (1-confidence), 0, 1)
```

Critical prerequisite atau weakness dapat meningkatkan priority class tanpa mengubah formula mastery.

### 12.3 Backlog guardrail

Jika estimasi review jatuh tempo melebihi 50% budget sesi selama tiga sesi terencana berturut-turut:

1. kurangi target baru;
2. prioritaskan KC wajib dan blocker;
3. kelompokkan review secara interleaved;
4. tawarkan sesi review tambahan atau perubahan jadwal;
5. jangan menghapus review untuk membuat progres terlihat cepat.

## 13. Misconception dan Remedial

### 13.1 Sumber diagnosis

Diagnosis dapat berasal dari:

- distractor dengan misconception tag tervalidasi;
- pola jawaban pada beberapa item;
- prerequisite trace pada curriculum graph;
- rubric evaluator;
- kandidat klasifikasi AI yang dibatasi taxonomy.

### 13.2 Aturan aktivasi

| Tingkat | Kondisi minimum | Perilaku |
| --- | --- | --- |
| Suspected | Satu evidence diagnostik | Beri feedback dan confirmation item |
| Confirmed | Dua evidence konsisten pada encounter berbeda | Jadwalkan remedial |
| Critical | Menghambat hard prerequisite, decoding, text grammar, atau comprehension inti | Cap mastery dan prioritaskan remedial |

AI tidak boleh menaikkan status menjadi `confirmed` atau `critical` tanpa aturan evidence di atas.

### 13.3 Flow remedial

```text
Kesalahan
→ Tentukan apakah item, target, atau prerequisite penyebabnya
→ Confirmation probe bila diagnosis belum cukup
→ Penjelasan singkat dan contrastive example
→ Guided practice
→ Independent retrieval dengan item berbeda
→ Update evidence
→ Selesai, ulang, atau turun ke prerequisite
```

Remedial harus sekecil mungkin. Kegagalan satu KC tidak mengulang seluruh unit jika graph menunjukkan gap yang lebih spesifik.

## 14. Pemilihan Aktivitas dan Scheduler

### 14.1 Candidate pool

Sebuah aktivitas eligible jika:

- berada pada curriculum dan content pack version yang kompatibel;
- berstatus `approved` atau `published` sesuai environment;
- primary KC relevan dengan tujuan sesi;
- seluruh hard prerequisite memenuhi threshold, kecuali aktivitas memang remedial untuk prerequisite tersebut;
- difficulty sesuai learner state;
- belum terkena cooldown karena baru saja digunakan;
- modality dapat digunakan;
- tidak melanggar blueprint atau exposure limit.

### 14.2 Priority class

Urutan class bersifat lexicographic; class lebih tinggi selalu diproses lebih dahulu:

1. hard-prerequisite gap yang memblokir unit aktif;
2. review yang telah jatuh tempo;
3. confirmed/critical misconception;
4. target baru pada jalur aktif;
5. latihan integrasi dan transfer;
6. enrichment.

Engine boleh menyisipkan remedial critical lebih awal jika keselamatan pengalaman menuntutnya, tetapi harus mencatat override reason.

### 14.3 Ranking di dalam priority class

Semua input dinormalisasi ke `0–1`:

```text
selection_score =
  0.30 × urgency
  + 0.25 × learning_gap
  + 0.15 × exam_relevance
  + 0.15 × uncertainty
  + 0.10 × diversity_need
  + 0.05 × user_focus
  - fatigue_penalty
  - repetition_penalty
```

Tie-breaker berurutan:

1. due date paling lama;
2. hard-prerequisite depth terendah;
3. curriculum order;
4. stable alphanumeric ID.

Dengan input dan version yang sama, hasil ranking harus sama.

### 14.4 Batas target baru

Untuk sesi sekitar 30 menit, baseline maksimum:

- 8–12 vocabulary baru;
- 2–4 kanji baru;
- 1–2 grammar concepts baru;
- 1 reading atau 1–2 listening objects.

Batas diturunkan jika:

- direct error rate pada sesi berjalan >30%;
- median response time memburuk >50% dibanding baseline pengguna pada aktivitas serupa;
- review backlog guardrail aktif;
- dua prerequisite probes gagal;
- pengguna memiliki kurang dari 80% waktu sesi yang direncanakan.

Engine tidak menaikkan batas di atas baseline MVP hanya karena pengguna menyelesaikan layar dengan cepat. Kenaikan memerlukan policy version baru atau eksperimen terkontrol.

### 14.5 Pseudocode session assembly

```text
function buildSession(learner, requestedMinutes, now):
  snapshot = loadVersionedLearnerState(learner)
  budget = clamp(requestedMinutes, policy.minSession, policy.maxSession)
  candidates = loadEligiblePublishedActivities(snapshot)

  blockers = rank(candidates.blockingPrerequisites)
  due = rank(candidates.dueReviews)
  remedial = rank(candidates.remedials)
  fresh = rank(candidates.newTargets)
  integration = rank(candidates.integration)

  plan.add(warmup(snapshot), warmupBudget)
  plan.fill(blockers, blockerBudget)
  plan.fill(due, reviewBudgetRemaining)
  plan.fill(remedial, remedialBudgetRemaining)

  if backlogIsControlled and noCriticalBlocker:
    plan.fill(fresh, newTargetBudget)

  plan.fill(integration, integrationBudget)
  plan.add(exitCheck(highestValueTargets), exitBudget)

  validatePrerequisites(plan)
  validateTimeBudget(plan)
  attachFallbacksAndReasons(plan)
  persistDecision(snapshot, policyVersions, plan)
  return plan
```

## 15. Adaptive Calendar Planning

### 15.1 Perhitungan kapasitas

Engine menyisakan buffer 15% untuk sesi terlewat, variasi retensi, dan remedial.

```text
weekly_capacity = available_minutes_per_week × 0.85

remaining_minutes =
  Σ weighted_minutes untuk target belum dikuasai
  + review_reserve
  + assessment_reserve
  + remedial_risk_buffer

required_weekly_minutes = remaining_minutes / weeks_until_target
```

Plan dinilai:

- `on_track` jika required ≤90% weekly capacity;
- `at_risk` jika required >90% dan ≤100% weekly capacity;
- `unrealistic` jika required >weekly capacity.

Label adalah baseline product policy dan harus diberi versi.

### 15.2 Target tidak realistis

Engine tidak mengurangi mastery threshold, prerequisite, delayed evidence, atau simulation requirement. Output harus menawarkan pilihan berikut:

1. tambah waktu belajar mingguan;
2. mundurkan tanggal target;
3. gunakan jalur akselerasi yang memprioritaskan KC wajib tetapi tetap mempertahankan seluruh readiness rule;
4. pertahankan pilihan saat ini dengan penjelasan bahwa readiness pada tanggal tersebut tidak terjamin.

### 15.3 Sesi terlewat

Ketika sesi terlewat:

- mastery tidak berubah;
- review yang lewat menjadi lebih urgen;
- rencana berikutnya dihitung ulang;
- beban satu sesi tidak boleh otomatis melebihi 125% durasi normal;
- sisa beban disebar ke hari tersedia berikutnya;
- jika tetap tidak muat, plan berubah menjadi `at_risk` atau `unrealistic`.

### 15.4 Perubahan availability

Perubahan jadwal pengguna memicu replan, bukan reset. Engine mempertahankan mastery, due dates, dan prerequisite state, lalu menghitung ulang proyeksi.

## 16. Progression dan Gate

### 16.1 Unit progression

Sebuah unit dapat berstatus:

```text
locked → available → active → checkpoint_due → completed
                         └────→ remedial_required
```

`completed` berarti outcome dan checkpoint unit memenuhi aturan; bukan sekadar seluruh layar dibuka.

### 16.2 Gate evaluation

Engine membaca gate dari curriculum version. Gate dapat menggunakan:

- status mastery KC wajib;
- aggregate domain score;
- checkpoint performance;
- delayed retention;
- completion blueprint;
- absence of critical weakness.

Jika gate gagal, pengguna tetap dapat:

- mengerjakan review;
- menjalankan remedial;
- melakukan aktivitas integrasi dari stage aktif;
- melihat materi pengantar yang tidak membutuhkan locked KC jika diizinkan kurikulum.

Engine tidak membuka target yang hard prerequisite-nya gagal.

### 16.3 User override

Pengguna boleh:

- memilih salah satu dari beberapa target eligible;
- memprioritaskan domain;
- menunda aktivitas non-blocking;
- mengubah durasi atau hari belajar;
- meminta review tambahan.

Pengguna tidak boleh:

- menandai KC sebagai mastered tanpa evidence;
- melewati hard prerequisite;
- menghapus critical weakness dari readiness;
- mengubah hasil simulation;
- menurunkan threshold akademik.

## 17. N5 Readiness

### 17.1 Syarat

Status `N5 Ready` diberikan hanya jika seluruh kondisi berikut terpenuhi:

1. weighted mastered coverage required KC minimal 85%;
2. weighted mastered coverage masing-masing domain inti minimal 75%;
3. seluruh terminal hard prerequisites berstatus `mastered`;
4. delayed retention agregat dan retention coverage setiap domain minimal 80%;
5. sedikitnya dua simulation forms berbeda dan ekuivalen telah diselesaikan;
6. kedua simulasi memiliki weighted accuracy minimal 70% total;
7. masing-masing kelompok `Language Knowledge/Reading` dan `Listening` minimal 60%;
8. seluruh format bukti N5 telah diperkenalkan dan dinilai;
9. tidak ada critical weakness aktif;
10. bukti memenuhi validity window dan version compatibility pada [Mastery Specification](./mastery-specification.md).

### 17.2 Output readiness

```yaml
status: not_ready
readiness_policy_version: 1.0.0
curriculum_version: 1.0.0
required_kc_mastered_ratio: 0.82
terminal_prerequisites_met: true
domain_retention:
  vocabulary: 0.84
  kanji: 0.81
  grammar: 0.78
  reading: 0.76
  listening: 0.83
simulation_forms_completed: 1
critical_weaknesses:
  - KC.N5.READING.TEXT_GRAMMAR.003
reason_codes:
  - READINESS_RETENTION_BELOW_THRESHOLD
  - READINESS_SIMULATION_COUNT_INSUFFICIENT
```

UI tidak boleh menyebut skor ini sebagai probabilitas kelulusan atau scaled score resmi JLPT.

## 18. Explainability

### 18.1 Decision reason

Setiap session activity dan perubahan plan minimal menyimpan:

- `decision_id`;
- `reason_code`;
- `primary_kc_id`;
- evidence atau constraint yang memicu;
- policy dan curriculum version;
- user-facing explanation key;
- timestamp.

### 18.2 Reason code minimum

| Code | Contoh penjelasan pengguna |
| --- | --- |
| `HARD_PREREQUISITE_GAP` | “Kita perkuat hiragana ini dulu agar bacaan berikutnya lebih mudah.” |
| `REVIEW_DUE` | “Kosakata ini waktunya diingat kembali.” |
| `RETENTION_PROBE_DUE` | “Mari cek apakah materi minggu lalu masih melekat.” |
| `MISCONCEPTION_CONFIRMED` | “Kamu beberapa kali tertukar pada fungsi partikel ini, jadi kita bandingkan keduanya.” |
| `NEW_TARGET_ELIGIBLE` | “Fondasinya sudah cukup kuat untuk mempelajari pola berikutnya.” |
| `REVIEW_BACKLOG_HIGH` | “Materi baru dikurangi sementara agar review tidak menumpuk.” |
| `TARGET_DATE_AT_RISK` | “Dengan waktu belajar saat ini, targetmu berisiko terlambat.” |
| `MISSED_SESSION_REPLAN` | “Sesi yang terlewat sudah disebarkan ke jadwal berikutnya.” |
| `CONTENT_FALLBACK_USED` | “Aktivitas diganti karena materi utama sedang tidak tersedia.” |

Penjelasan tidak perlu menampilkan bobot matematis kecuali pada layar audit internal. Pengguna harus memperoleh alasan yang benar, singkat, dan tidak menghakimi.

## 19. Peran AI saat Runtime

### 19.1 AI boleh

- mengklasifikasikan kandidat misconception dalam taxonomy yang disetujui;
- menilai jawaban semi-terbuka menggunakan rubric dan reference answer tervalidasi;
- menyusun feedback bahasa Indonesia berdasarkan explanation blocks yang disetujui;
- memilih tingkat detail penjelasan sesuai learner state;
- merangkum pola kesalahan untuk pengguna dan reviewer;
- menandai respons ambigu untuk evaluasi deterministik atau human review.

### 19.2 AI tidak boleh

- membuat KC, prerequisite, atau learning outcome baru saat runtime;
- memberi mastery credit tanpa evidence event;
- mengubah threshold atau formula;
- membuka unit/stage;
- menetapkan `N5 Ready`;
- mempublikasikan item baru;
- menggunakan pengetahuan di luar approved material untuk mengubah answer key;
- mengubah diagnosis candidate menjadi critical tanpa rule confirmation.

### 19.3 Failure behavior

Jika AI tidak tersedia:

- objective item tetap dinilai dengan answer key;
- engine memakai static feedback tervalidasi;
- semi-open response ditandai `evaluation_pending` atau diberi aktivitas pengganti;
- mastery tidak diperbarui dari evidence yang belum dapat dinilai;
- sesi dapat dilanjutkan selama tersedia fallback.

## 20. State dan Event Contract

### 20.1 State minimum

| Entitas | Field penting |
| --- | --- |
| `LearnerKCState` | learner_id, kc_id, mastery_score, status, confidence, evidence_count, last_evidence_at, next_review_at, policy_version |
| `EvidenceEvent` | event_id, encounter_id, item/version, KC attribution, signal inputs, evaluation source, validity |
| `MisconceptionState` | misconception_id, KC, status, supporting_event_ids, severity, resolved_at |
| `ReviewSchedule` | KC, interval_index, due_at, last_rating, policy_version |
| `LearningPlan` | target, projected_ready_at, capacity, risk_status, revision |
| `SessionPlan` | session_id, time budget, ordered activities, fallbacks, reasons, status |
| `ProgressionState` | active stage/unit, gate results, unlocked targets |
| `ReadinessSnapshot` | requirement values, status, reasons, version |
| `DecisionLog` | decision_id, input snapshot hash, output, reason codes, all policy versions |

### 20.2 Event taxonomy minimum

```text
learner_profile_updated
placement_started
placement_answer_evaluated
placement_completed
session_planned
session_started
activity_started
hint_used
answer_submitted
answer_evaluated
activity_completed
activity_skipped
content_issue_reported
session_completed
session_abandoned
mastery_recalculated
misconception_suspected
misconception_confirmed
misconception_resolved
review_scheduled
checkpoint_completed
simulation_completed
progression_evaluated
learning_plan_recalculated
readiness_evaluated
```

### 20.3 Session lifecycle

```text
planned → in_progress → completed
   │           ├──────→ abandoned
   └───────────┴──────→ superseded
```

`superseded` digunakan jika plan dihitung ulang sebelum dimulai atau karena version incompatibility. Event dari session plan lama tetap tersimpan.

### 20.4 Decision output

```yaml
decision_id: DEC.01J...
decision_type: session_plan
created_at: 2026-09-13T10:00:00+07:00
learner_state_revision: 42
curriculum_version: 1.0.0
content_pack_versions:
  - PACK.N5.S02.U09@1.1.0
policies:
  mastery: 1.0.0
  scheduler: 1.0.0
  readiness: 1.0.0
time_budget_minutes: 30
activities:
  - activity_id: ACT.001
    purpose: review
    primary_kc_id: KC.N5.VOCAB.TIME.004
    reason_code: REVIEW_DUE
fallback_activity_ids:
  - ACT.009
input_snapshot_hash: sha256:...
```

## 21. Versioning dan Recalculation

Version yang wajib dicatat:

- curriculum;
- content item dan content pack;
- assessment blueprint;
- mastery policy;
- scheduler policy;
- placement policy;
- readiness policy;
- rubric/evaluator;
- explanation template.

Perubahan patch yang tidak memengaruhi hasil lama tidak memerlukan recalculation. Perubahan formula, threshold, attribution, atau graph harus memiliki migration plan yang menentukan:

1. state mana yang dihitung ulang;
2. evidence history yang digunakan;
3. apakah status lama tetap ditampilkan;
4. dampak pada due date dan readiness;
5. rollback version;
6. komunikasi kepada pengguna bila progres terlihat berubah.

Recalculation harus menggunakan raw structured evidence, bukan hanya status mastery terakhir.

## 22. Concurrency dan Konsistensi

- Setiap learner state memiliki monotonic `revision`.
- Keputusan hanya diterapkan jika revision input masih sama.
- Event diproses idempotently berdasarkan `event_id`.
- Jika dua perangkat mengirim evidence, event disimpan lalu state dihitung ulang dalam urutan `occurred_at`, dengan server receipt sebagai tie-breaker.
- Session plan yang memakai state lama dapat dilanjutkan untuk aktivitas yang sudah dimulai, tetapi aktivitas berikutnya harus divalidasi ulang jika ada hard-prerequisite atau content-version change.

## 23. Fallback dan Failure Modes

| Kondisi | Perilaku aman |
| --- | --- |
| Tidak ada approved item untuk KC | Jangan generate bebas; pilih fallback KC eligible dan buat content-gap alert |
| Content version deprecated saat sesi | Selesaikan item aktif bila aman; ganti item berikutnya |
| Curriculum/policy tidak termuat | Jangan membuat keputusan baru; tampilkan plan terakhir yang masih valid atau mode unavailable |
| AI evaluator gagal | Gunakan deterministic key/static feedback atau tandai evaluation pending |
| Audio gagal | Retry teknis, lalu ganti modality hanya jika blueprint mengizinkan; jangan menilai listening dari transcript |
| Event duplikat | Abaikan update kedua, simpan idempotency result |
| Jawaban ambigu | Jangan beri mastery penalty sampai adjudication/fallback evaluation selesai |
| User offline | Simpan event lokal dengan timestamp; sinkronkan idempotently; beri label confidence pada timing |
| Timezone berubah | Hitung ulang kalender lokal; jangan mengubah evidence timestamp asli |
| Sesi terputus | Simpan evidence yang valid; aktivitas belum selesai tidak dianggap salah |
| Item dilaporkan salah | Karantina untuk learner berikutnya jika threshold operasi tercapai; jangan retroaktif menghukum learner |

## 24. Observability dan Evaluasi

### 24.1 Engine health

- session-plan generation latency dan failure rate;
- persentase keputusan yang memiliki reason code;
- duplicate/rejected evidence rate;
- content fallback rate;
- AI evaluation pending rate;
- version mismatch dan recalculation failure;
- stale learner-state conflict rate.

### 24.2 Learning quality

- delayed retention per domain;
- encounter median menuju provisional/mastered;
- review success per interval;
- misconception recurrence;
- prerequisite failure per edge;
- percentage session budget untuk backlog;
- difficulty drift item;
- progression dan readiness false-positive/false-negative setelah tersedia outcome eksternal.

### 24.3 Guardrail

- Tidak mengoptimalkan completion, XP, atau streak dengan mengurangi retrieval.
- Tidak menambah target baru ketika review backlog tidak terkendali.
- Tidak menggunakan response time sebagai proxy kemampuan tanpa kalibrasi.
- Tidak membandingkan pengguna secara kompetitif untuk keputusan mastery.
- Tidak menjalankan eksperimen threshold readiness tanpa persetujuan akademik.

## 25. Acceptance Criteria MVP

### 25.1 Placement

1. Pengguna pemula absolut dapat memulai U01 tanpa placement panjang.
2. Pengguna berpengalaman menerima branch item berdasarkan jawaban sebelumnya.
3. Hard-prerequisite failure menghasilkan verification sebelum gap ditetapkan.
4. Time cap menghasilkan output parsial dengan confidence dan verification plan.
5. Placement tidak memberikan status akhir `mastered` tanpa delayed evidence.

### 25.2 Evidence dan mastery

1. Event duplikat tidak mengubah mastery dua kali.
2. Exposure tidak menaikkan mastery.
3. Hint dan attempt menurunkan positive evidence signal sesuai policy.
4. Supporting KC menerima kontribusi lebih kecil dan tidak memenuhi sufficiency sendiri.
5. Tiga jawaban kuat dari dua tipe evidence dapat menghasilkan `provisional`.
6. `mastered` memerlukan delayed evidence minimal tujuh hari.
7. Waktu tanpa aktivitas tidak menurunkan status.
8. Gagal pada delayed probe dapat menghasilkan `needs_review`.
9. Critical misconception membatasi score operasional dan memicu remedial.

### 25.3 Session dan scheduler

1. Target dengan hard prerequisite gagal tidak dipilih sebagai target baru.
2. Review jatuh tempo diprioritaskan sebelum target baru.
3. Review backlog tinggi mengurangi target baru.
4. Session plan tidak melebihi time budget di luar toleransi konfigurasi.
5. Setiap aktivitas memiliki purpose dan reason code.
6. Input serta version yang sama menghasilkan session plan yang sama.
7. Tidak adanya konten menghasilkan fallback atau explicit failure, bukan konten runtime tanpa validasi.

### 25.4 Calendar dan readiness

1. Sesi terlewat tidak mengurangi mastery.
2. Beban pengganti tidak melebihi 125% durasi normal secara otomatis.
3. Target tidak realistis tidak menurunkan standar.
4. Readiness gagal jika satu saja syarat wajib tidak terpenuhi.
5. UI menerima alasan spesifik ketika pengguna belum ready.
6. Hasil internal tidak ditampilkan sebagai scaled score resmi JLPT.

### 25.5 AI dan failure handling

1. AI outage tidak mengubah mastery dari jawaban yang belum dapat dinilai.
2. AI tidak dapat mengubah policy, graph, unlock, atau readiness.
3. Objective item tetap dapat dinilai tanpa AI.
4. Semua AI evaluation menyimpan model/evaluator version dan rubric version.

## 26. Skenario End-to-End

### 26.1 Pemula absolut

1. Ayu memilih target N5, 8 jam per minggu, dan `absolute_beginner`.
2. Engine membuat seluruh KC `not_started` dan memulai U01.
3. Sesi pertama berisi bunyi, sapaan, guided practice, dan retrieval singkat.
4. Exposure tidak menaikkan mastery; jawaban retrieval menghasilkan evidence.
5. Setelah tiga direct encounters yang cukup beragam, satu KC menjadi `provisional`.
6. Review dijadwalkan pada interval 1, 3, dan 7 hari.
7. Delayed evidence hari ketujuh memenuhi threshold dan KC menjadi `mastered`.

### 26.2 Pengguna berpengalaman dengan gap kana

1. Bima memilih placement dan kuat pada listening serta grammar dasar.
2. Ia gagal membedakan beberapa kana pada direct items.
3. Engine menjalankan verification set dan mengonfirmasi gap.
4. Starting unit Reading mundur ke S0, tetapi Listening dapat dimulai lebih tinggi.
5. Session plan menjelaskan bahwa kana diperkuat untuk membuka bacaan, bukan karena seluruh kemampuan Bima rendah.

### 26.3 Kesalahan lintas-domain

1. Citra salah menjawab reading item dengan Grammar sebagai primary KC dan Vocabulary sebagai supporting KC.
2. Grammar menerima evidence weight penuh; Vocabulary menerima bobot terbatas karena diagnostic confidence 0,70.
3. Supporting evidence tidak menghitung encounter minimum Vocabulary.
4. Kesalahan grammar kedua dengan pola sama mengaktifkan confirmed misconception.
5. Engine memilih contrastive explanation, guided practice, dan independent retrieval baru.

### 26.4 Target tidak realistis

1. Damar memiliki sisa 180 jam, target 10 minggu, dan kapasitas efektif 8,5 jam per minggu.
2. Required load 18 jam per minggu melebihi kapasitas.
3. Plan berstatus `unrealistic`.
4. Engine menawarkan tambahan waktu, perubahan tanggal, atau jalur akselerasi KC wajib.
5. Mastery threshold dan dua simulation requirement tetap sama.

### 26.5 Sesi terlewat

1. Eka melewatkan dua sesi.
2. Mastery tidak turun, tetapi review menjadi overdue.
3. Engine membatasi sesi berikutnya hingga maksimum 125% durasi normal.
4. Review mengambil porsi lebih besar dan target baru dikurangi.
5. Sisa beban disebar; proyeksi target diperbarui beserta alasannya.

## 27. Implementasi Bertahap

### Phase 1 — Deterministic core

- versioned curriculum dan policy loading;
- immutable evidence event;
- mastery formula serta state transition;
- prerequisite validation;
- basic review schedule;
- deterministic session assembly;
- decision reason dan audit log.

### Phase 2 — Placement dan planning

- adaptive placement;
- verification set;
- calendar projection dan missed-session replan;
- unit/stage gate;
- readiness snapshot.

### Phase 3 — Diagnosis dan quality loop

- misconception taxonomy;
- constrained AI evaluation/feedback;
- item difficulty calibration;
- content-gap alert;
- richer learning analytics.

Setiap phase harus lulus acceptance criteria yang relevan sebelum dipakai untuk keputusan pengguna nyata.

## 28. Pertanyaan yang Divalidasi melalui Data MVP

- Apakah bobot `0,55/0,15/0,15/0,15` memprediksi delayed retention dengan baik?
- Apakah minimum tiga encounters dan dua evidence types terlalu longgar atau ketat per domain?
- Apakah supporting weight `0,35` membantu diagnosis tanpa menghasilkan mastery inflation?
- Apakah interval `1, 3, 7, 14, 30, 60` sesuai bagi vocabulary, kanji, grammar, reading, dan listening, atau perlu policy per domain?
- Apakah cap target baru dan backlog threshold menghasilkan sesi yang dapat diselesaikan?
- Apakah placement 25 menit memberi titik awal yang cukup akurat tanpa meningkatkan abandonment?
- Apakah klasifikasi `on_track`, `at_risk`, dan `unrealistic` mudah dipahami serta mendorong keputusan sehat?
- Reason code mana yang paling membantu pengguna menerima perubahan rencana?
- Apakah readiness policy memprediksi hasil simulasi berikutnya dan hasil JLPT yang dilaporkan?

Perubahan berdasarkan data harus melalui versioning, evaluasi akademik, dan perbandingan terhadap policy sebelumnya. Engagement saja tidak cukup untuk menurunkan standar penguasaan.

## 29. Definition of Done Dokumen Turunan

Implementasi learning engine belum siap dimulai penuh sampai tersedia:

1. JSON Schema atau database model untuk entitas Bagian 20;
2. taxonomy activity type, evidence type, misconception, dan reason code;
3. policy configuration files dengan versioning;
4. blueprint evidence minimum per domain;
5. approved content metadata yang mendukung primary/supporting attribution;
6. test fixtures untuk seluruh acceptance criteria;
7. migration dan rollback procedure;
8. dashboard audit internal untuk mereproduksi keputusan.

Dokumen turunan boleh memecah kontrak menjadi `learning-engine-schema`, `mastery-policy`, `scheduler-policy`, dan `decision-reason-catalog`, tetapi tidak boleh mengubah keputusan utama tanpa proposal versi.
