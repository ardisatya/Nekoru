# Assessment Specification N5 Nekoru

**Status:** Draft v0.1  
**Pemilik keputusan akhir:** Product Owner  
**Audiens:** Product, akademik, assessment, content operations, data, AI, design, QA, dan engineering  
**Cakupan:** Placement, verification, unit checkpoint, stage checkpoint, cumulative review, dan simulation untuk pemula absolut hingga kesiapan JLPT N5  
**Bahasa produk:** Bahasa Indonesia  
**Tanggal:** 13 September 2026

## 1. Tujuan Dokumen

Dokumen ini menjadi sumber kebenaran untuk merancang, merakit, mengeksekusi, menilai, memvalidasi, dan memberi versi pada asesmen Nekoru dari pemula absolut sampai kesiapan JLPT N5.

Dokumen ini menetapkan:

1. batas tanggung jawab Assessment service;
2. blueprint placement dan verification;
3. blueprint unit checkpoint, stage checkpoint, dan cumulative review;
4. struktur simulation N5 yang sedekat mungkin dengan struktur JLPT N5 resmi;
5. item type, difficulty band, sampling, exposure control, dan form equivalence;
6. raw scoring, diagnostic result, gate result, dan hubungan hasil asesmen dengan mastery/readiness;
7. timer, navigation, replay, feedback, retake, resume, invalidation, dan integrity policy;
8. kontrak data, event, versioning, audit, keamanan, aksesibilitas, observability, acceptance criteria, dan test fixtures.

Dokumen ini melengkapi:

- [Product Overview](./product-overview.md)
- [Arsitektur Kurikulum](./curriculum-architecture.md)
- [Mastery Specification](./mastery-specification.md)
- [Learning Engine](./learning-engine.md)
- [Practice Engine](./practice-engine.md)
- [Beginner Foundations N5](../content/beginner-foundations-n5.md)
- [Content Progression N5](../content/content-progression-n5.md)
- [Vocabulary Inventory N5](../content/vocabulary-inventory-n5.md)
- [Kanji Inventory N5](../content/kanji-inventory-n5.md)
- [Grammar Inventory N5](../content/grammar-inventory-n5.md)
- [Reading Blueprints N5](../content/reading-blueprints-n5.md)
- [Listening Blueprints N5](../content/listening-blueprints-n5.md)

Jika terjadi konflik:

- scope, outcome, prerequisite, dan validitas akademik mengikuti curriculum serta inventory/blueprint domain yang disetujui;
- evidence, mastery, aggregation, retention, gate veto, dan readiness mengikuti Mastery Specification;
- sequencing dan keputusan jalur mengikuti Learning Engine;
- interaksi, normalization, attempt, evaluation, feedback release, dan candidate evidence mengikuti Practice Engine;
- assembly, raw scoring, form equivalence, assessment completion, retake, dan invalidation mengikuti dokumen ini;
- perubahan yang menurunkan standar akademik memerlukan review akademik dan persetujuan Product Owner.

## 2. Keputusan Utama MVP

| Area | Keputusan |
| --- | --- |
| Lapisan asesmen | Placement, verification, unit checkpoint, stage checkpoint, cumulative review, dan N5 simulation |
| Simulation | Tiga test section, 90 menit active test time, dan komposisi item sedekat mungkin dengan blueprint JLPT N5 resmi yang berlaku |
| Item simulation | 67 scored items pada baseline form v1: 21 Vocabulary, 22 Grammar–Reading, dan 24 Listening |
| Scoring group | `Language Knowledge (Vocabulary/Grammar)·Reading` dan `Listening`, mengikuti struktur hasil N4/N5 resmi |
| Scoring internal | Raw correctness dan weighted accuracy; bukan IRT atau scaled score resmi JLPT |
| Readiness | Dua form berbeda, masing-masing weighted accuracy ≥0,70 dan floor ≥0,60 pada kedua scoring group, ditambah seluruh syarat Mastery Specification |
| Feedback | Deferred pada placement/verification/checkpoint; hanya dirilis setelah set/section. Simulation dirilis setelah seluruh form |
| Attempt | Satu scored attempt per item pada seluruh assessment mode |
| AI | Tidak digunakan untuk scoring simulation. Asesmen berdampak pada gate menggunakan evaluator deterministik/rubric yang disetujui |
| Form | Item, stimulus, section order, timing, answer key, dan asset dikunci serta dapat direproduksi |
| Integritas | Online-only untuk seluruh assessment mode berdampak tinggi; kegagalan teknis tidak menjadi jawaban salah |
| Requiredness | Target inti yang disetujui menjadi `required`; bahasa instruksi/evaluasi S5 menjadi `supporting`; tidak ada bulk default tersembunyi |
| Audit | Setiap assembly, run, submission, score, gate, dan invalidation menyimpan version serta reason code |

Nilai numerik internal adalah baseline Nekoru yang dapat dikalibrasi melalui data. Perubahan wajib versioned dan tidak boleh dilakukan hanya untuk menaikkan completion atau readiness rate.

## 3. Keselarasan dan Batas Klaim terhadap JLPT

### 3.1 Acuan resmi

Blueprint simulation v1 menggunakan acuan resmi berikut yang diverifikasi pada 13 September 2026:

- [Composition of Test Sections and Items](https://www.jlpt.jp/e/guideline/testsections.html)
- [N5 Purposes of Test Items](https://www.jlpt.jp/e/guideline/pdf/n5_e_revised.pdf)
- [Changes in Test Time and Approximate Number of Test Items for N4 and N5](https://www.jlpt.jp/e/topics/202009091599642827.html)
- [Scoring Sections, Pass or Fail, Score Report](https://www.jlpt.jp/e/guideline/results.html)
- [Official Practice Workbooks](https://www.jlpt.jp/e/samples/sampleindex.html)

### 3.2 Yang diselaraskan

Nekoru menyelaraskan:

- nama serta urutan tiga test section N5;
- active test time `20 + 40 + 30` menit;
- seluruh tipe item resmi N5;
- jumlah item baseline per tipe berdasarkan angka perkiraan resmi pascaperubahan Desember 2020;
- dua scoring group N5;
- linear, one-way delivery Listening tanpa replay learner;
- format response objektif pada simulation;
- keharusan menyelesaikan seluruh test section agar simulation result valid.

### 3.3 Yang tidak diklaim

Nekoru tidak mengklaim bahwa:

- item Nekoru adalah item resmi atau pernah digunakan oleh JLPT;
- raw score Nekoru setara dengan scaled score JLPT;
- weighted accuracy adalah probabilitas lulus;
- tingkat kesulitan satu form identik dengan ujian aktual sebelum calibration;
- status `N5 Ready` menjamin kelulusan.

JLPT menggunakan scaled score berbasis Item Response Theory dan tidak sekadar menjumlahkan jawaban benar. Nekoru tidak mereplikasi model tersebut karena parameter item resmi tidak tersedia. UI dilarang menampilkan konversi raw score ke `0–180`, `0–120`, atau `0–60` sebagai skor prediksi resmi.

### 3.4 Perubahan blueprint resmi

Jumlah item resmi dinyatakan sebagai perkiraan dan dapat berubah. Karena itu setiap simulation form wajib menyimpan:

```yaml
official_reference:
  level: N5
  verified_at: 2026-09-13
  test_time_reference_version: 2026-09-13
  approximate_item_count_reference: post_2020_12
```

Perubahan struktur atau waktu resmi memicu academic impact review dan versi baru `AssessmentBlueprint`; form aktif tidak dimigrasikan diam-diam.

## 4. Ruang Lingkup dan Batas

### 4.1 Termasuk

- placement awal lintas-domain;
- verification atas estimate, gap, prerequisite, atau confidence rendah;
- unit dan stage checkpoint;
- cumulative review lintas-unit/stage;
- dua atau lebih simulation form N5 ekuivalen;
- objective scoring dan rubric-constrained partial credit di luar simulation;
- diagnostic attribution, misconception signal, dan raw-result contract;
- form assembly, exposure control, retake, timing, integrity, dan audit.

### 4.2 Tidak termasuk

- pembuatan inventory, KC, learning outcome, atau prerequisite;
- keputusan akhir mastery, gate, progression, atau readiness;
- speaking, pronunciation scoring, writing bebas, handwriting, dan stroke-order scoring;
- runtime generation bebas oleh AI;
- konversi ke scaled score JLPT;
- proctoring invasif menggunakan webcam, microphone, atau biometrik;
- N4–N1 sebelum level profile serta assessment blueprint masing-masing disetujui.

## 5. Kepemilikan Keputusan

| Sistem/peran | Kepemilikan |
| --- | --- |
| Tim akademik | Konstruk, blueprint content, difficulty rationale, distractor, form equivalence, dan standard setting proposal |
| Product Owner | Persetujuan akhir threshold, retake behavior, readiness behavior, dan konflik lintas-tim |
| Assessment service | Assembly, item sampling, form locking, timer policy, raw scoring, completion, invalidation, dan retake eligibility |
| Content Bank | Item body, stimulus, asset, answer key, rubric, attribution, rights, status, dan version |
| Practice Engine | Rendering, interaction, submission, deterministic evaluation, feedback release, resume, dan candidate evidence |
| Learning/Mastery Engine | Evidence acceptance, mastery, misconception, gate, progression, retention, dan readiness |
| Data/Analytics | Calibration, form comparability, item analysis, dan anomaly analysis tanpa mutasi otomatis |
| AI | Kandidat diagnosis atau offline authoring assistance dalam taxonomy/rubric approved |

Assessment service tidak boleh membuka unit, menetapkan mastery, atau menerbitkan `N5 Ready`. Ia menerbitkan hasil versioned yang kemudian digunakan Learning/Mastery Engine.

## 6. Istilah Operasional

| Istilah | Definisi |
| --- | --- |
| Assessment blueprint | Kontrak jenis item, jumlah, distribusi, timing, scoring, dan validity |
| Assessment form | Paket final section serta item yang telah dirakit, direview, dan dikunci |
| Form family | Kumpulan form yang dirancang mengukur konstruk serta standard yang sama |
| Section | Kelompok item dengan timer, navigation, dan feedback policy tersendiri |
| Testlet | Stimulus Reading/Listening dengan satu atau beberapa question |
| Scored item | Satu question yang menghasilkan raw score |
| Encounter | Satu stimulus substantif; beberapa question pada stimulus yang sama tetap satu encounter |
| Exposure | Riwayat learner pernah melihat stimulus/item atau equivalence family |
| Raw score | Jumlah point yang diperoleh tanpa klaim scaled score resmi |
| Weighted accuracy | Agregat internal dua scoring group dengan rasio bobot 120:60 |
| Section floor | Ambang minimum internal yang tidak dapat dikompensasi group lain |
| Critical weakness | Pola gagal yang menjadi veto mastery/gate/readiness |
| Equated form | Form yang memenuhi blueprint sama dan berada dalam tolerance difficulty/calibration yang disetujui |
| Technical skip | Item tidak dapat diselesaikan karena failure; bukan jawaban salah |
| Invalidation | Run/form tidak sah untuk keputusan berdampak tinggi |

## 7. Model Konseptual

```text
AssessmentProgram N5
├── AssessmentBlueprint[]
│   ├── SectionBlueprint[]
│   │   └── ItemTypeQuota[]
│   ├── ScoringPolicy
│   ├── ExecutionPolicy
│   └── ValidityPolicy
├── FormFamily[]
│   └── AssessmentForm[]
│       ├── LockedItemRef[]
│       └── FormReview
├── AssessmentRun[]
│   ├── SectionRun[]
│   ├── Submission[]
│   └── IntegrityEvent[]
└── AssessmentResult
    ├── RawScore
    ├── DiagnosticProfile
    ├── Completion/Validity
    └── EvidenceCandidate[]
```

Aliran keputusan:

```text
Approved blueprint + compatible curriculum/content
→ deterministic candidate sampling
→ constraint solving dan exposure check
→ form review/approval
→ locked AssessmentForm
→ Practice Engine execution
→ deterministic evaluation
→ raw section/group result
→ diagnostic attribution
→ candidate evidence + assessment result
→ Learning/Mastery Engine
→ placement, gate, review, atau readiness decision
```

## 8. Lapisan Asesmen

| Layer | Tujuan utama | Dampak | Feedback |
| --- | --- | --- | --- |
| Placement | Menentukan starting unit, estimate KC/cluster, gap, dan confidence | Routing jalur awal; mastery maksimum `provisional` | Ringkasan setelah placement |
| Verification | Mengonfirmasi estimate, gap, prerequisite, atau forgetting | Memperkuat/menolak estimate; dapat menghasilkan evidence | Setelah set |
| Unit checkpoint | Memeriksa outcome dan integrasi satu unit | `completed` atau `remedial_required` melalui Learning Engine | Setelah checkpoint |
| Stage checkpoint | Memeriksa retention, transfer, format coverage, dan blocker | Pass/fail gate melalui Learning Engine | Setelah checkpoint |
| Cumulative review | Menangkap forgetting lintas-unit/stage | Evidence, review, dan remedial; bukan pass/fail ujian | Setelah set |
| N5 simulation | Mengukur format, timing, stamina, dan kesiapan | Readiness input; tidak mengubah mastery hanya dari satu soal | Setelah seluruh form |

Retrieval check harian tetap menjadi praktik/review yang dipilih Learning Engine. Ia memakai item blueprint domain tetapi bukan form yang dikelola Assessment service kecuali diminta sebagai cumulative review atau verification set.

## 9. Aturan Universal Item

Setiap scored item wajib:

1. berasal dari content berstatus `approved` atau `published`;
2. mempunyai tepat satu `primary_kc_id`;
3. mempunyai answer key atau rubric versioned;
4. mempunyai rationale serta distractor rationale;
5. mempunyai difficulty band dan evidence class;
6. mematuhi prerequisite, lexical coverage, grammar ceiling, Kanji ceiling, dan modality policy;
7. mempunyai rights, attribution, accessibility metadata, dan checksum asset;
8. menggunakan stable IDs untuk question, option, token, gap, dan asset;
9. tidak pernah mengekspos answer sebelum feedback release;
10. dapat direproduksi dari item/template/materializer version dan seed yang sama.

Simulation hanya menggunakan objective item yang dapat dinilai secara deterministik. Semi-open response tidak masuk simulation v1.

## 10. Difficulty Bands

### 10.1 Definisi umum

| Band | Definisi operasional |
| --- | --- |
| `easy` | Konstruk tunggal, prerequisite dangkal, context eksplisit, distractor rendah-confusion, dan seluruh language load sangat familiar |
| `target` | Konstruk, context, dan distractor sesuai ceiling unit/stage/level; membutuhkan retrieval atau comprehension yang dimaksud blueprint |
| `stretch` | Integrasi beberapa prerequisite atau transfer ke context/stimulus baru tanpa melewati ceiling level |
| `exam_like` | Presentation, timing, support, prompt, dan information density sesuai reference profile simulation N5; bukan sinonim `stretch` |

`exam_like` disimpan sebagai delivery/profile flag. Item simulation tetap memiliki calibrated difficulty estimate terpisah.

### 10.2 Faktor per domain

- **Sound/Kana:** similarity visual/bunyi, mora, sequence length, advanced mark, speaker, dan romaji availability.
- **Vocabulary:** sense ambiguity, confusability, orthography, context, collocation, dan prerequisite depth.
- **Kanji:** glyph similarity, target reading, word familiarity, okurigana, context, dan density.
- **Grammar:** slot, morphology, contrast, omission, register, discourse dependency, dan lexical load.
- **Reading:** length, coverage, density, referent, layout, information steps, dan inference.
- **Listening:** speech rate, duration, turn count, density, ellipsis, prompt preview, replay, noise, dan speaker variation.

### 10.3 Distribusi baseline

| Assessment | Easy | Target | Stretch | Catatan |
| --- | ---: | ---: | ---: | --- |
| Verification | 20% | 60% | 20% | Disesuaikan dengan hypothesis yang diverifikasi |
| Unit checkpoint | 20% | 60% | 20% | Semua tetap di bawah unit ceiling |
| Stage checkpoint | 10% | 65% | 25% | Stretch menilai transfer, bukan materi baru |
| Cumulative review | 20% | 60% | 20% | Menekankan delayed retrieval |
| Simulation | Calibration target | Calibration target | Calibration target | Quota per difficulty tidak ditampilkan ke learner; form harus lolos equivalence tolerance |

Placement bersifat adaptif sehingga tidak memakai quota statis; branch bergerak untuk menemukan floor dan ceiling.

## 11. Blueprint Placement

### 11.1 Tujuan dan entry policy

- Pemula absolut boleh langsung memulai U01 tanpa placement panjang.
- Self-report hanya menentukan routing dan tidak memberi mastery credit.
- Placement menaksir KC/cluster pada Sound/Kana, Vocabulary, Grammar, Reading, dan Listening.
- Kanji dinilai melalui word reading/orthography di dalam Vocabulary, bukan section terpisah.
- Speaking, writing bebas, handwriting, dan pronunciation production tidak dinilai.

### 11.2 Struktur adaptif

| Fase | Isi | Baseline |
| --- | --- | --- |
| Routing screener | Sample lintas-domain berdaya cakup tinggi | 3 direct items per domain/cluster awal |
| Adaptive branch | Naik ke cluster lebih sulit atau turun ke prerequisite | 3 direct items per branch |
| Verification | Mengonfirmasi mixed result, hard prerequisite, atau guessing | 2 item tambahan; dapat bertambah sampai total 5 |

Time cap placement adalah 25 menit active time. Placement berhenti ketika floor dan ceiling ditemukan, starting unit stabil selama dua branch terakhir, time cap tercapai, learner berhenti, atau fatigue guardrail aktif.

### 11.3 Branching v1

- sedikitnya 2 dari 3 item memiliki evidence signal `≥0,80` dan tidak ada critical prerequisite failure → branch naik;
- paling banyak 1 dari 3 item memiliki signal `≥0,80` → branch turun;
- hasil campuran, response anomaly, atau indikasi guessing → dua verification items;
- satu kegagalan hard prerequisite → verification, bukan gap permanen langsung.

### 11.4 Estimate

| Kondisi | Output |
| --- | --- |
| Weighted signal ≥0,85, minimal 5 direct items, stabil pada 3 terakhir | `estimated_mastered`, high confidence |
| Weighted signal ≥0,85 tetapi evidence belum cukup | `estimated_mastered`, medium/low confidence + verification |
| Weighted signal 0,70–0,849 | `uncertain` + verification/review |
| Weighted signal <0,70 | `estimated_gap` |

Placement tidak pernah menghasilkan status final `mastered`. Estimate maksimum menjadi `provisional` setelah diterima Learning/Mastery Engine; delayed evidence tetap diwajibkan.

### 11.5 Output minimum

```yaml
placement_result_id: PLACEMENT_RESULT.01J...
starting_unit_recommendation: UNIT.N5.S02.U09
domain_estimates:
  vocabulary: { estimate: 0.82, confidence: 0.71 }
  grammar: { estimate: 0.78, confidence: 0.67 }
  reading: { estimate: 0.64, confidence: 0.80 }
  listening: { estimate: 0.86, confidence: 0.76 }
prerequisite_gaps:
  - KC.N5.KANA.HIRAGANA.CORE
verification_sets:
  - cluster_id: CLUSTER.N5.KANA.DECODING
    reason_code: PLACEMENT_HARD_PREREQUISITE_UNCERTAIN
remaining_hours_by_domain: {}
```

## 12. Blueprint Verification

Verification digunakan untuk:

- placement confidence rendah;
- hard-prerequisite failure tunggal;
- confirmation probe atas kemungkinan forgetting;
- adjudication setelah item/content issue;
- verifikasi setelah remedial;
- revalidation setelah migration atau validity window tertentu.

Aturan baseline:

- 2–5 direct items per KC/cluster;
- seluruh item baru secara substantif dan tidak identik dengan anchor;
- satu scored attempt, tanpa hint, tanpa answer reveal;
- difficulty berpusat pada `target` dengan minimal satu context/transfer item bila konstruk mengizinkan;
- feedback dirilis setelah seluruh set;
- kegagalan teknis menghasilkan replacement equivalent atau incomplete set;
- verification high-impact bersifat online-only.

Set dinyatakan kuat jika weighted signal `≥0,85`, tidak ada critical error, dan minimal dua bentuk bukti yang disyaratkan terwakili. Verification tunggal tidak menghapus delayed-evidence requirement.

## 13. Blueprint Unit Checkpoint

### 13.1 Eligibility

Unit checkpoint menjadi `due` ketika:

- seluruh learning outcome unit telah mendapat instructional exposure;
- seluruh required KC unit mempunyai minimal evidence awal;
- tidak ada content/version incompatibility;
- Learning Engine menilai checkpoint layak dilakukan.

### 13.2 Assembly baseline

| Stage unit | Scored items | Active time | Komposisi minimum |
| --- | ---: | ---: | --- |
| S0 | 16–24 | 12–18 menit | Sound/Kana direct + decoding/application |
| S1–S2 | 16–22 | 15–22 menit | Direct Vocabulary/Kanji/Grammar + 1 Reading + 1 Listening encounter |
| S3–S4 | 18–26 | 20–30 menit | Direct target sample + integrated Reading/Listening + transfer |
| S5/U21–U23 | 22–32 | 25–35 menit | Mixed official-format preparation dan timed-soft/fixed sesuai blueprint |

Sampling wajib mencakup:

1. seluruh terminal/blocking prerequisite yang dimiliki unit;
2. setiap learning outcome required;
3. minimal dua evidence types pada domain yang menjadi fokus unit bila pool mencukupi;
4. minimal satu stimulus Reading atau Listening yang belum pernah dilihat;
5. item dari sedikitnya dua lesson package unit;
6. tidak lebih dari 25% item dari satu KC kecuali unit foundation cluster mengharuskannya.

### 13.3 Raw pass rule

Baseline unit checkpoint:

- weighted raw accuracy keseluruhan `≥0,80`;
- setiap domain yang mempunyai sedikitnya 4 scored items `≥0,70`;
- seluruh blocking hard prerequisite yang disample memiliki signal agregat `≥0,80`;
- tidak ada critical misconception baru;
- run valid dan seluruh required encounter selesai.

Hasil checkpoint tidak sendirian menandai unit `completed`. Learning Engine menggabungkannya dengan mastery, breadth, retention, dan outcome coverage.

## 14. Blueprint Stage Checkpoint dan Gate

### 14.1 Assembly baseline

| Gate | Scored items | Active time | Stimulus minimum |
| --- | ---: | ---: | --- |
| S0→S1 | 24–32 | 20–25 menit | Single kana, unseen word decoding, audio-to-kana, mixed script, advanced marks |
| S1→S2 | 24–32 | 25–35 menit | Profile, schedule, family/location notice, dan short dialogue |
| S2→S3 | 28–36 | 30–40 menit | Routine, order/menu, route task, shopping information retrieval |
| S3→S4 | 30–40 | 35–45 menit | Short/mid passage dan key-point/task-based Listening |
| S4→S5 | 36–48 | 40–50 menit | Mixed N5 item types, short/mid text, quick response, expression, key point, task-based |
| S5→Ready | Simulation + readiness audit | 2 × 90 menit terpisah | Mengikuti Bagian 17–21 dan Mastery Specification |

### 14.2 Gate recommendation v1

| Gate | Requirement numerik dan veto |
| --- | --- |
| S0→S1 | Kana decoding ≥0,90; hiragana tanpa romaji; katakana ≥0,80; terminal hard KC mastery ≥0,85; delayed evidence tersedia; no critical Sound/Kana misconception |
| S1→S2 | Checkpoint ≥0,80; domain yang dinilai ≥0,75; seluruh hard prerequisite ≥0,85; no critical weakness |
| S2→S3 | Checkpoint ≥0,80; Vocabulary/Grammar/Reading/Listening floor ≥0,75 jika cukup item; delayed retention sample ≥0,80; daily-sentence/dialog outcome lulus |
| S3→S4 | Checkpoint ≥0,80; Reading dan Listening masing-masing ≥0,75; transfer items ≥0,75; no blocking particle/morphology/location gap |
| S4→S5 | Checkpoint ≥0,80; setiap format family yang disample ≥0,70; ≥0,85 weighted target coverage berstatus `provisional`/`mastered`; seluruh format N5 diperkenalkan; no critical weakness |
| S5→Ready | Seluruh readiness requirement pada Mastery Specification dan Bagian 21 dokumen ini |

Threshold checkpoint adalah bukti tambahan, bukan pengganti mastery. Gate hanya lulus jika seluruh veto dari Mastery Specification kosong.

### 14.3 Outcome kualitatif menjadi rule

Outcome seperti “mampu memahami dialog rutinitas” dinyatakan lulus jika:

1. blueprint memetakan outcome ke KC serta item family eksplisit;
2. minimal dua encounter berbeda tersedia;
3. raw signal agregat encounter `≥0,80`;
4. tidak ada salah sistematis pada critical diagnostic dimension;
5. satu encounter merupakan transfer stimulus baru.

## 15. Blueprint Cumulative Review

Cumulative review adalah asesmen formatif terstruktur, bukan ujian lulus/gagal.

### 15.1 Trigger

- akhir stage;
- setiap 4 unit aktif;
- review backlog lintas-unit tinggi;
- sebelum simulation pertama;
- setelah jeda belajar ≥14 hari;
- permintaan learner yang disetujui Learning Engine.

### 15.2 Assembly

- 18–30 scored items atau 20–30 menit;
- sekurangnya 70% item berasal dari delayed/due KC;
- minimal satu Reading dan satu Listening encounter setelah S1;
- maksimal 20% item dari satu unit;
- priority untuk terminal prerequisite, recurring misconception, low-confidence KC, dan weak diagnostic dimension;
- tidak mengulang stimulus substantif yang sama dalam 30 hari jika pool memungkinkan.

### 15.3 Interpretation

- `≥0,80`: review berhasil; evidence diproses normal;
- `0,70–0,799`: targeted review untuk dimension/KC lemah;
- `<0,70`: remedial plan lintas-KC; bukan penurunan seluruh stage;
- critical error selalu memicu confirmation probe atau remedial terarah.

## 16. Content Requiredness untuk Assessment

### 16.1 Kebijakan klasifikasi

Setiap KC/entry wajib mempunyai `requiredness: required | supporting | enrichment`. Tidak ada klasifikasi otomatis hanya berdasarkan keberadaan dalam daftar 900 Vocabulary, 110 Kanji, atau 90 Grammar.

Sebuah target direkomendasikan `required` jika:

1. diperlukan untuk outcome resmi-format atau Can-do wajib;
2. merupakan terminal/blocking prerequisite;
3. memiliki `exam_relevance: core|standard`;
4. diperkenalkan paling lambat U20;
5. mempunyai content pool yang memenuhi Content Masterability Contract;
6. telah direview akademik secara individual atau cluster dengan rationale.

`supporting` digunakan untuk bahasa instruksi, label evaluasi, konteks, dan target yang membantu tetapi tidak boleh menjadi readiness denominator. `enrichment` digunakan untuk perluasan opsional tanpa gate/readiness impact.

### 16.2 Keputusan S5 v1

- 40 Vocabulary U21–U24 menjadi `supporting` secara default.
- Empat Grammar integratif U21–U24 tidak menjadi required KC baru. Masing-masing harus dipetakan sebagai review/application dari KC U17–U20 atau menjadi `supporting` sampai first-introduction direvisi.
- S5 tidak menaikkan lexical atau grammar ceiling substantif sebelum simulation.
- Istilah instruksi/evaluasi tidak boleh muncul sebagai unknown unsupported pada simulation; instruksi disediakan sebagai familiarized support tanpa memberi readiness credit.

### 16.3 Activation guardrail

Jumlah required Vocabulary N5 tetap tidak boleh ditetapkan melalui bulk assumption. Readiness production berstatus `profile_incomplete` sampai:

- seluruh 900 lemma–sense diklasifikasikan;
- setiap `required` mempunyai approved assessment/content coverage;
- denominator dan weight `LevelMasteryProfile N5` disetujui;
- impact analysis S5 selesai.

## 17. Simulation N5 — Struktur Form v1

Simulation v1 mengikuti tiga test section resmi N5. Active test time total adalah 90 menit; inter-section transition tidak dihitung.

| Urutan | Test section | Active time | Scored items | Scoring group |
| ---: | --- | ---: | ---: | --- |
| 1 | Language Knowledge (Vocabulary) | 20 menit | 21 | Language Knowledge/Reading |
| 2 | Language Knowledge (Grammar)・Reading | 40 menit | 22 | Language Knowledge/Reading |
| 3 | Listening | 30 menit | 24 | Listening |
| **Total** | | **90 menit** | **67** | Dua group |

Angka item dapat berbeda pada ujian JLPT aktual. Nekoru mengunci 67 item untuk form family v1 agar form equivalence, scoring, dan QA dapat direproduksi.

## 18. Simulation — Vocabulary Section

| Order | Official item type | Canonical activity type | Scored items | Fokus |
| ---: | --- | --- | ---: | --- |
| V1 | Kanji reading | `word_reading` / `reading_recall` | 7 | Reading kata yang ditulis dengan Kanji |
| V2 | Orthography | `orthography_selection` | 5 | Kanji/katakana untuk kata yang ditulis dengan hiragana |
| V3 | Contextually-defined expressions | `context_defined_meaning` | 6 | Makna kata menurut context |
| V4 | Paraphrases | `paraphrase_selection` | 3 | Kata/ungkapan bermakna dekat |
| **Total** | | | **21** | |

Aturan:

- seluruh response objektif `select_one`;
- satu attempt, tanpa hint, tanpa answer reveal;
- learner boleh berpindah dan kembali di dalam section sebelum timer habis;
- item yang tidak dijawab saat submit/timeout mendapat raw point `0` dengan status `unanswered`;
- Vocabulary dan Kanji attribution mengikuti item construct, bukan posisi section;
- section item order mengikuti family resmi di atas.

## 19. Simulation — Grammar dan Reading Section

| Order | Official item type | Canonical activity/question type | Scored items | Fokus |
| ---: | --- | --- | ---: | --- |
| GR1 | Sentential grammar 1 | `grammar_form_selection` | 9 | Memilih bentuk grammar yang sesuai kalimat |
| GR2 | Sentential grammar 2 | `sentence_composition` | 4 | Urutan kalimat yang sintaktis dan bermakna |
| GR3 | Text grammar | `text_grammar` | 4 | Kesesuaian grammar terhadap text flow |
| R1 | Short passages | `explicit_detail`, `main_point`, atau `reference_resolution` | 2 | Teks mudah sekitar 80 karakter |
| R2 | Mid-size passages | `main_point`, `sequence`, `intent`, atau `low_inference` | 2 | Teks mudah sekitar 250 karakter |
| R3 | Information retrieval | `information_lookup` atau `action_selection` | 1 | Notice/material sekitar 250 karakter |
| **Total** | | | **22** | |

Aturan Reading:

- stimulus original/berlisensi dan belum pernah dilihat learner;
- lexical coverage sesuai level dengan `unknown_unsupported = 0` terhadap approved simulation lexicon profile;
- target Kanji/Grammar berada dalam N5 ceiling;
- tidak ada gloss, translation penuh, atau furigana pada target yang diukur;
- learner boleh berpindah dan kembali dalam section;
- satu passage multi-question tetap satu encounter walaupun menghasilkan beberapa scored items;
- layout material fungsional dikunci dan tersedia pada zoom/reflow yang telah divalidasi.

## 20. Simulation — Listening Section

| Order | Official item type | Canonical question type | Scored items | Fokus |
| ---: | --- | --- | ---: | --- |
| L1 | Task-based comprehension | `action_selection` / task-based | 7 | Menentukan tindakan/solusi |
| L2 | Comprehension of key points | `key_point` | 6 | Menangkap informasi yang diarahkan |
| L3 | Verbal expressions | `situational_expression` | 5 | Memilih ungkapan sesuai situasi/gambar |
| L4 | Quick response | `quick_response` | 6 | Memilih respons sesuai ujaran singkat |
| **Total** | | | **24** | |

Execution policy:

- audio berjalan linear sesuai locked assembly;
- learner tidak mempunyai kontrol replay, seek, pause, atau playback-rate;
- setiap stimulus diputar satu kali sebagai bagian stream section;
- prompt preview, visual preview, jeda, instruction, dan answer window mengikuti type-specific reference profile yang disetujui;
- transcript tidak pernah tersedia sebelum seluruh form selesai;
- Listening tidak mengizinkan backtracking ke audio sebelumnya;
- disconnect mengikuti grace policy Bagian 26; audio failure bukan jawaban salah;
- noise tidak menjadi sumber difficulty utama;
- delivery asset wajib mempunyai checksum, transcript verbatim, timing, rights, dan QA result.

## 21. Simulation Scoring dan Readiness Input

### 21.1 Raw scoring

Simulation v1 hanya memakai item objektif:

```text
item_raw_point = 1 jika benar
item_raw_point = 0 jika salah atau unanswered
```

Tidak ada partial credit pada simulation v1. Technical skip tidak diberi `0`; section dinyatakan incomplete sampai equivalent replacement dapat diberikan atau run di-invalidasi.

```text
language_reading_raw = correct(Vocabulary + Grammar + Reading) / 43
listening_raw = correct(Listening) / 24

weighted_accuracy =
  (2 × language_reading_raw + 1 × listening_raw) / 3
```

Rasio `2:1` mencerminkan rentang dua scoring group resmi `120:60`, tetapi hasil tetap merupakan weighted accuracy internal, bukan scaled score.

### 21.2 Diagnostic scores

Selain dua scoring group, result menyimpan raw accuracy per:

- domain: Vocabulary, Kanji-attributed, Grammar, Reading, Listening;
- official item type;
- primary KC dan diagnostic dimension;
- difficulty band;
- passage/audio encounter;
- misconception/distractor class.

Diagnostic score tidak boleh ditampilkan sebagai official subsection score.

### 21.3 Readiness rule

Kedua simulation yang digunakan untuk readiness masing-masing wajib:

- `weighted_accuracy ≥ 0,70`;
- `language_reading_raw ≥ 0,60`;
- `listening_raw ≥ 0,60`;
- valid, complete, berbeda, dan equivalent;
- selesai dalam 90 hari terakhir;
- tidak mempunyai unresolved integrity issue.

Simulation hanyalah salah satu requirement. Status `N5 Ready` tetap memerlukan:

1. weighted mastered coverage required KC `≥0,85`;
2. mastered coverage setiap domain `≥0,75`;
3. seluruh terminal hard prerequisites `mastered`;
4. weighted delayed retention dan retention coverage setiap domain `≥0,80`;
5. seluruh format evidence N5 telah dinilai;
6. tidak ada critical weakness;
7. qualifying retention evidence berada dalam 60 hari terakhir;
8. seluruh version compatible.

### 21.4 Konteks threshold resmi

Sebagai referensi saja, N5 resmi menggunakan total scaled score minimal `80/180`, floor `38/120` untuk Language Knowledge/Reading, dan `19/60` untuk Listening. Nilai ini tidak digunakan untuk mengubah raw accuracy Nekoru menjadi status lulus resmi.

## 22. Form Assembly

### 22.1 Input assembly

```yaml
assessment_blueprint_id: BLUEPRINT.N5.SIMULATION.V1
assessment_blueprint_version: 1.0.0
curriculum_version: 1.0.0
level_mastery_profile_version: 1.0.0
content_pack_versions: []
form_family_id: FORM_FAMILY.N5.2026.V1
form_code: FORM.N5.2026.A
seed: 491827
official_reference_version: 2026-09-13
```

### 22.2 Constraint solver

Assembly wajib memenuhi:

- seluruh section, item type quota, time, dan order;
- item status, version, rights, locale, asset, dan accessibility valid;
- primary KC/diagnostic mapping sesuai blueprint;
- target distribution mewakili required set tanpa over-sampling satu unit;
- lexical/grammar/Kanji ceiling sesuai N5;
- stimulus tidak pernah identik di dua form readiness learner yang sama;
- option position seimbang tanpa pola jawaban yang dapat ditebak;
- tidak ada answer leakage lintas-section;
- Reading/Listening testlet tetap utuh;
- Listening duration termasuk instruction serta response windows muat dalam section target;
- form mempunyai form review approval sebelum digunakan.

### 22.3 Tie-breaker deterministik

Jika beberapa item sama-sama eligible, urutkan berdasarkan:

1. blueprint quota deficit terbesar;
2. exposure penalty terendah;
3. content quality/calibration confidence tertinggi;
4. KC coverage deficit terbesar;
5. stable hash `form_seed + item_id + item_version`.

Database order tidak boleh menjadi tie-breaker.

## 23. Form Equivalence dan Exposure Control

### 23.1 Syarat form equivalent

Dua simulation form dinyatakan equivalent jika:

- memakai blueprint major version yang sama;
- mempunyai section time dan item-type quota yang sama;
- seluruh item berada dalam level serta content ceiling sama;
- distribution required KC dan difficulty berada dalam tolerance approved;
- tidak mempunyai stimulus/item overlap substantif;
- form review menilai topic, modality, speaker, layout, dan cognitive load sebanding;
- setelah data tersedia, expected raw difficulty dan reliability berada dalam tolerance calibration.

### 23.2 Tolerance sebelum calibration

Sebelum sample data cukup:

- selisih jumlah item per official type = `0`;
- selisih median academic difficulty rating antar-form ≤ satu rating step pada maksimal 10% item;
- tidak ada domain coverage difference >10 percentage points;
- tidak ada satu unit menyumbang >20% seluruh form;
- speaker presentation serta genre tidak terkonsentrasi pada satu form;
- review menggunakan blind form comparison oleh minimal dua reviewer akademik/assessment.

### 23.3 Tolerance setelah calibration

Threshold statistik final ditetapkan melalui calibration plan. Baseline monitoring:

- mean raw-score difference adjusted cohort ≤0,05;
- item p-value dan discrimination berada dalam approved band;
- reliability serta completion-time distribution tidak menunjukkan form drift;
- fairness analysis tidak menemukan differential performance yang tidak dijelaskan konstruk.

Nilai ini tidak mengaktifkan automatic form approval; reviewer tetap memutuskan.

### 23.4 Exposure policy

- form readiness kedua tidak boleh memakai item atau stimulus yang sama dengan form pertama;
- template instance dengan slot values substantif sama dianggap exposure yang sama;
- simulation form yang telah menerima full debrief tidak boleh digunakan ulang untuk readiness selama 180 hari;
- form tanpa feedback karena invalidation tetap diberi exposure flag untuk item yang sempat terlihat;
- placement/checkpoint exposure memberi penalty sampling simulation, tetapi tidak otomatis melarang jika pool terbatas dan item belum pernah direveal;
- answer-revealed item tidak eligible untuk scored high-impact assessment learner yang sama.

## 24. Feedback dan Reporting

### 24.1 Release policy

| Mode | Correctness | Answer/rationale | Diagnostic summary |
| --- | --- | --- | --- |
| Placement | Ditahan sampai selesai | Tidak menampilkan item-by-item jika berisiko leakage | Setelah placement |
| Verification | Setelah set | Setelah set | Setelah set |
| Unit checkpoint | Setelah checkpoint | Setelah checkpoint | Setelah checkpoint |
| Stage checkpoint | Setelah checkpoint | Setelah checkpoint | Setelah checkpoint |
| Cumulative review | Setelah submit atau set sesuai blueprint | Setelah set | Setelah set |
| Simulation | Setelah seluruh form | Setelah seluruh form/debrief policy | Setelah seluruh form |

### 24.2 User-facing result

Simulation UI menampilkan:

- weighted accuracy internal dengan label jelas;
- raw accuracy dua scoring group;
- strength/gap per domain dan official item type;
- critical weakness jika ada;
- comparison terhadap threshold readiness internal;
- next action: form berikutnya, review, remedial, atau verification;
- disclaimer bahwa hasil bukan skor resmi atau jaminan lulus.

UI tidak menampilkan estimated official scaled score sebelum model konversi telah dikalibrasi, direview, dan disetujui melalui policy major version.

## 25. Retake Policy

| Assessment | Baseline retake |
| --- | --- |
| Placement | Satu onboarding run; re-placement setelah ≥30 hari, curriculum migration, atau keputusan support/admin |
| Verification | Set baru setelah remedial atau minimal 24 jam jika tidak ada remedial; item lama tidak diulang |
| Unit checkpoint | Setelah targeted remedial dan paling cepat 24 jam; gunakan alternate set |
| Stage checkpoint | Setelah blocker/remedial selesai dan paling cepat 24 jam; gunakan alternate set |
| Cumulative review | Sesuai Learning Engine; bukan retake ujian |
| Simulation | Maksimal satu scored form per 24 jam; rekomendasi jeda 7 hari; form yang sama tidak dipakai lagi dalam validity window |

Retake cepat tidak boleh menjadi cara menghafal answer. Learning Engine dapat memperpanjang jeda jika fatigue, repeated exposure, atau content-pool limitation terdeteksi.

## 26. Timer, Navigation, Resume, dan Gangguan Teknis

### 26.1 Timer

- server-authoritative pada seluruh assessment high-impact;
- Vocabulary fixed 20 menit, Grammar–Reading fixed 40 menit, Listening fixed sekitar 30 menit sesuai locked audio assembly;
- placement mempunyai 25 menit soft/fixed cap;
- unit/stage checkpoint memakai fixed atau soft cap sesuai blueprint;
- time extension merupakan signed accommodation field;
- response time tidak menjadi mastery penalty pada MVP.

### 26.2 Inter-section transition

Simulation boleh memberi transition maksimal 5 menit antar-section. Transition bukan active test time dan tidak menampilkan feedback. Transition lebih dari 10 menit tanpa approved accommodation menandai integrity review.

### 26.3 Resume dan grace

- state, answer draft, submission, timer, dan locked instance disimpan setelah setiap interaction penting;
- disconnect dapat mem-pause timer maksimal 5 menit per incident dan 10 menit kumulatif per section;
- learner melanjutkan item/section yang sama dengan manifest serta remaining time yang sama;
- feedback yang belum dirilis tetap tersembunyi;
- melewati cumulative grace menginvalidasi section kecuali operational adjudication menemukan platform-wide incident;
- simulation tidak dapat aktif pada dua device secara bersamaan.

### 26.4 Technical failure

| Failure | Behavior |
| --- | --- |
| Item/asset sebelum terlihat gagal | Pakai equivalent replacement yang telah disetujui |
| Item gagal setelah stimulus terlihat | Tandai exposed; jangan ganti diam-diam; adjudicate section |
| Audio gagal sebelum playback | Retry delivery asset; kemudian equivalent audio bila tersedia |
| Audio putus setelah informasi kunci terdengar sebagian | Tandai integrity issue; jangan score sebagai salah |
| Evaluator gagal | `evaluation_pending`; jangan tebak |
| Server outage luas | Pause/invalidate melalui incident policy; sediakan retake form baru |
| Client clock berbeda | Gunakan server clock dan catat anomaly |

## 27. Completion, Invalidation, dan Adjudication

### 27.1 Complete result

Result high-impact hanya `complete` jika:

- seluruh required section dimulai serta disubmit/timeout secara sah;
- seluruh scored item mempunyai evaluation final atau valid unanswered status;
- tidak ada technical skip yang belum diselesaikan;
- versions serta signature valid;
- integrity issue telah terselesaikan;
- scoring dapat direproduksi.

### 27.2 Invalidation reason

```text
ASSESSMENT_SECTION_MISSING
ASSESSMENT_TIMER_INTEGRITY_FAILED
ASSESSMENT_CONCURRENT_RUN
ASSESSMENT_CONTENT_VERSION_INVALID
ASSESSMENT_AUDIO_INCOMPLETE
ASSESSMENT_TECHNICAL_FAILURE
ASSESSMENT_FEEDBACK_LEAKED
ASSESSMENT_EXPOSURE_LIMIT_EXCEEDED
ASSESSMENT_FORM_NOT_APPROVED
ASSESSMENT_MANUAL_ADJUDICATION_REQUIRED
```

Anomaly seperti fast response, tab background, atau reconnect tidak otomatis dianggap kecurangan. Invalidation memerlukan rule eksplisit dan evidence audit.

### 27.3 Adjudication

Adjudication wajib menyimpan reviewer, evidence refs, old/new state, reason, timestamp, policy version, dan impact ke candidate evidence. Koreksi tidak menulis ulang event lama; ia membuat superseding result/event.

## 28. Accessibility dan Fairness

- seluruh non-audio interaction dapat dioperasikan dengan keyboard;
- zoom 200%, screen reader, reflow, Japanese font, furigana, focus, dan color independence wajib lolos QA;
- drag interaction mempunyai alternatif semantic yang setara;
- time extension disimpan sebagai accommodation, bukan edit client;
- screen-reader reading time tidak digunakan sebagai penalti;
- transcript sebelum respons membuat item tidak valid sebagai Listening evidence;
- jika accommodation mengubah konstruk, gunakan alternate blueprint atau tandai construct unavailable;
- font/glyph/audio failure bukan learner error;
- demografi tidak menjadi input score atau readiness;
- calibration dianalisis lintas device, modality, accommodation, dan kelompok relevan untuk mendeteksi bias.

## 29. Security dan Assessment Integrity

- setiap run, form, section, item manifest, timer, dan submission ditandatangani/versioned;
- authorization diperiksa pada setiap read/mutation;
- answer key dan unreleased feedback tidak dikirim ke client;
- evaluation high-impact berlangsung server-side;
- learner tidak dapat mengirim score, correctness, primary KC, timer result, atau readiness sebagai sumber kebenaran;
- assessment token terikat learner, form, run, expiry, dan device/session policy;
- endpoint submit, resume, report, dan asset delivery memiliki rate limit;
- content payload serta SVG disanitasi;
- raw response disimpan sesuai privacy retention policy;
- assessment tidak merekam webcam, microphone, biometrik, atau layar learner;
- AI evaluator tidak digunakan untuk simulation dan tidak mempunyai tool/network access pada mode lain;
- analytics menggunakan pseudonymous learner ID.

## 30. Kontrak Data

### 30.1 AssessmentBlueprint

| Field | Wajib | Keterangan |
| --- | --- | --- |
| `id`, `version` | Ya | ID stabil dan semver |
| `level`, `layer` | Ya | N5 dan jenis asesmen |
| `curriculum_compatibility` | Ya | Rentang versi kompatibel |
| `section_blueprints` | Ya | Order, time, quotas, execution |
| `scoring_policy_ref` | Ya | Raw/group/weighted rule |
| `feedback_policy_ref` | Ya | Release behavior |
| `integrity_policy_ref` | Ya | Token, exposure, invalidation |
| `retake_policy_ref` | Ya | Cooldown serta alternate-form rule |
| `accessibility_profile` | Ya | Equivalent modality/accommodation |
| `official_reference` | Kondisional | Wajib untuk simulation |
| `approval` | Ya | Akademik, assessment, Product Owner |
| `status` | Ya | draft, review, approved, published, deprecated |

### 30.2 AssessmentForm

```yaml
form_id: FORM.N5.2026.A
form_version: 1.0.0
form_family_id: FORM_FAMILY.N5.2026.V1
blueprint_id: BLUEPRINT.N5.SIMULATION.V1
blueprint_version: 1.0.0
curriculum_version: 1.0.0
content_pack_versions: []
seed: 491827
sections:
  - section_id: SECTION.N5.VOCABULARY
    time_limit_seconds: 1200
    item_count: 21
    item_refs: []
manifest_hash: sha256:...
equivalence_review_id: REVIEW.FORM.N5.A
approved_at: null
status: draft
```

### 30.3 AssessmentRun

| Field | Keterangan |
| --- | --- |
| learner/run/form IDs | Authorization dan identity |
| form/blueprint/policy versions | Reproducibility |
| section states | not_started, in_progress, submitted, timed_out, invalidated |
| started/ended/active timestamps | Timing |
| locked manifest hash | Integrity |
| exposure event IDs | Item leakage control |
| accommodation ref | Signed execution change |
| integrity events | Disconnect, concurrent run, asset failure, anomaly |
| revision | Optimistic concurrency |

### 30.4 AssessmentResult

```yaml
assessment_result_id: RESULT.N5.SIM.01J...
learner_id: USER.123
run_id: ASSESSMENT_RUN.456
form_id: FORM.N5.2026.A
form_version: 1.0.0
blueprint_version: 1.0.0
status: complete
validity: valid
raw:
  vocabulary: { correct: 16, possible: 21 }
  grammar_reading: { correct: 16, possible: 22 }
  language_reading: { correct: 32, possible: 43, accuracy: 0.7442 }
  listening: { correct: 18, possible: 24, accuracy: 0.7500 }
weighted_accuracy: 0.7461
readiness_thresholds:
  total_met: true
  language_reading_floor_met: true
  listening_floor_met: true
diagnostic_profile_ref: DIAGNOSTIC.789
integrity_issue_ids: []
completed_at: 2026-09-13T12:00:00+07:00
calculation_hash: sha256:...
```

## 31. Operasi dan Event

### 31.1 Operasi logis

| Operasi | Hasil |
| --- | --- |
| `assembleAssessment(blueprint, constraints)` | Candidate form + validation report |
| `approveAssessmentForm(form)` | Approved immutable form version |
| `createAssessmentRun(learner, form)` | Authorized locked run |
| `startSection(run, section)` | Server timer + section manifest |
| `submitSection(run, section)` | Locked submissions + raw section result |
| `completeAssessment(run)` | Complete/invalid/pending result |
| `scoreAssessment(run)` | Reproducible raw/group/diagnostic result |
| `getRetakeEligibility(learner, layer)` | Eligible date dan form constraints |
| `adjudicateAssessment(issue)` | Superseding result/event |
| `compareForms(formA, formB)` | Equivalence/calibration report |

### 31.2 Event taxonomy minimum

```text
assessment_form_assembled
assessment_form_validation_failed
assessment_form_approved
assessment_run_created
assessment_run_started
assessment_section_started
assessment_item_exposed
assessment_answer_submitted
assessment_section_submitted
assessment_section_timed_out
assessment_run_paused
assessment_run_resumed
assessment_integrity_issue_detected
assessment_run_completed
assessment_run_invalidated
assessment_scored
assessment_feedback_released
assessment_result_adjudicated
assessment_retake_eligible
```

## 32. Reason Codes

| Code | Makna |
| --- | --- |
| `PLACEMENT_FLOOR_FOUND` | Batas bawah kemampuan ditemukan |
| `PLACEMENT_CEILING_FOUND` | Batas atas kemampuan ditemukan |
| `PLACEMENT_TIME_CAP_REACHED` | Placement berakhir dengan output parsial |
| `PLACEMENT_HARD_PREREQUISITE_UNCERTAIN` | Verification prerequisite diperlukan |
| `VERIFICATION_CONFIRMED` | Estimate/gap terkonfirmasi |
| `VERIFICATION_INCONCLUSIVE` | Evidence belum cukup |
| `CHECKPOINT_PASSED` | Raw checkpoint dan constraint minimum terpenuhi |
| `CHECKPOINT_REMEDIAL_REQUIRED` | Gap terarah ditemukan |
| `STAGE_GATE_EVIDENCE_INCOMPLETE` | Gate belum mempunyai bukti cukup |
| `SIMULATION_TOTAL_THRESHOLD_NOT_MET` | Weighted accuracy internal di bawah threshold |
| `SIMULATION_LANGUAGE_READING_FLOOR_NOT_MET` | Group Language Knowledge/Reading di bawah floor |
| `SIMULATION_LISTENING_FLOOR_NOT_MET` | Group Listening di bawah floor |
| `SIMULATION_FORM_NOT_EQUIVALENT` | Form tidak boleh dipakai sebagai pasangan readiness |
| `ASSESSMENT_TECHNICAL_SKIP` | Item tidak dinilai karena failure teknis |
| `ASSESSMENT_RESULT_INVALID` | Result tidak boleh dipakai untuk gate/readiness |
| `ASSESSMENT_FEEDBACK_DEFERRED` | Feedback belum boleh dirilis |
| `ASSESSMENT_RETAKE_COOLDOWN` | Learner belum eligible retake |

## 33. Versioning dan Migrasi

Version wajib dicatat untuk:

- assessment blueprint dan section blueprint;
- form family dan form;
- curriculum, inventory, KC registry, serta LevelMasteryProfile;
- content item/object, content pack, template, materializer, dan asset;
- scoring, difficulty, equivalence, exposure, retake, integrity, dan feedback policy;
- answer key, rubric, evaluator, normalization, serta renderer bila semantics berubah.

| Jenis | Contoh |
| --- | --- |
| Major | Section/item type, scoring semantics, threshold, completion, atau readiness interpretation berubah |
| Minor | Approved item variant, form, optional diagnostic, atau compatible capability ditambah |
| Patch | Metadata/wording teknis yang tidak mengubah jawaban, konstruk, score, atau exposure |

Run aktif mempertahankan seluruh version yang telah dikunci atau di-invalidasi secara eksplisit. Tidak ada silent migration.

Migration plan wajib memuat:

1. form/run/result/evidence yang terdampak;
2. old/new versions;
3. recalculation atau no-recalculation decision;
4. exposure serta retake impact;
5. gate/readiness impact;
6. komunikasi learner bila hasil berubah;
7. fixtures dan equivalence review;
8. rollback criteria serta approver.

## 34. Validasi Form sebelum Publikasi

Pipeline wajib gagal jika:

- item count, type quota, section order, atau time tidak cocok blueprint;
- item, answer, rubric, asset, rights, atau version hilang;
- item belum approved/published;
- primary KC atau diagnostic mapping tidak valid;
- prerequisite/language ceiling dilanggar;
- Reading/Listening testlet terpecah secara tidak sah;
- Listening duration melebihi budget atau transcript/checksum tidak cocok;
- answer position distribution melanggar tolerance;
- form mempunyai duplicate item/stimulus substantif;
- feedback/answer dapat diakses sebelum release;
- accessibility alternative belum divalidasi;
- form equivalence review belum approved;
- manifest hash tidak dapat direproduksi;
- required KC pool tidak cukup untuk form family serta retake policy.

## 35. Observability dan Calibration

### 35.1 Engine health

- assembly failure serta constraint deficit;
- form load/start/submit/score latency;
- timer drift, resume, duplicate, stale revision, dan concurrency conflict;
- audio/asset/evaluator failure;
- technical skip, pending evaluation, invalidation, dan adjudication age;
- event delivery lag ke Practice/Learning Engine;
- percentage result dengan complete version/audit chain.

### 35.2 Assessment quality

- item p-value, discrimination, distractor efficiency, dan omitted rate;
- raw score distribution per form/group/type/domain;
- reliability dan conditional measurement error;
- form mean/time/failure difference;
- checkpoint false pass/fail terhadap delayed performance;
- placement starting-unit correction rate;
- verification confirmation rate;
- readiness false-positive/false-negative setelah outcome eksternal tersedia;
- exposure/repetition effect;
- fairness/accessibility differential performance.

### 35.3 Calibration protocol

Perubahan threshold, difficulty, score, atau form equivalence wajib:

1. menyatakan hipotesis;
2. menggunakan historical replay atau controlled trial;
3. mengukur delayed retention dan next-assessment performance;
4. membandingkan baseline serta proposed version;
5. menjalani assessment, academic, fairness, dan accessibility review;
6. mempunyai rollback;
7. mendapat persetujuan Product Owner.

## 36. Guardrail

- Jangan menampilkan raw score sebagai scaled score JLPT.
- Jangan menurunkan threshold untuk mengejar target kalender atau engagement.
- Jangan membiarkan total tinggi menutupi scoring-group floor atau critical weakness.
- Jangan memberi mastery dari completion, exposure, atau satu simulation item.
- Jangan menggunakan response time sebagai correctness atau mastery penalty.
- Jangan mengganti Listening dengan transcript.
- Jangan memberi scored retry pada item yang sama setelah answer reveal.
- Jangan memakai item draft, quarantined, deprecated-unsafe, atau unlicensed.
- Jangan membuat item/answer/distractor runtime dengan AI.
- Jangan menganggap anomaly teknis sebagai kecurangan otomatis.
- Jangan mengaktifkan readiness sebelum requiredness dan LevelMasteryProfile lengkap.

## 37. Acceptance Criteria

### 37.1 Placement dan verification

1. Pemula absolut dapat melewati placement panjang dan mulai U01.
2. Placement berpengalaman melakukan branch berdasarkan jawaban sebelumnya.
3. Hard-prerequisite failure tunggal menghasilkan verification.
4. Time cap menghasilkan output parsial dengan confidence dan verification plan.
5. Placement tidak menghasilkan `mastered`.
6. Verification memakai 2–5 item baru, satu attempt, dan deferred feedback.

### 37.2 Checkpoint dan cumulative review

1. Unit checkpoint mewakili outcome, prerequisite, domain, dan integrated stimulus yang diwajibkan.
2. Stage checkpoint mempunyai threshold serta veto eksplisit.
3. Kriteria outcome kualitatif dapat direproduksi dari mapping dan encounter.
4. Checkpoint fail menghasilkan remedial target, bukan pengulangan seluruh stage.
5. Cumulative review memprioritaskan delayed/due KC dan tidak menjadi ujian lulus/gagal.

### 37.3 Simulation

1. Form memiliki 21 Vocabulary, 22 Grammar–Reading, dan 24 Listening items.
2. Section timer adalah 20, 40, dan sekitar 30 menit dengan total active time 90 menit.
3. Seluruh official N5 item types terwakili sesuai quota.
4. Listening linear, satu playback, tanpa transcript/replay learner.
5. Semua simulation item dinilai deterministik dengan 0/1 raw point.
6. Dua scoring group dan weighted accuracy dapat direproduksi.
7. UI tidak menampilkan official scaled score prediction.
8. Dua form readiness berbeda, equivalent, dan tanpa stimulus overlap.

### 37.4 Integrity, accessibility, dan reliability

1. Answer/feedback high-impact tidak tersedia sebelum release.
2. Technical failure tidak menjadi learner error.
3. Duplicate submission tidak menggandakan score/evidence.
4. Locked form/item tidak berubah saat resume.
5. Concurrent simulation run ditolak atau di-invalidasi sesuai rule.
6. Keyboard, zoom 200%, screen reader, reduced motion, glyph, furigana, dan audio control policy lolos QA.
7. Accommodation yang mengubah konstruk mencegah evidence tidak sah.
8. Result, calculation hash, dan version chain dapat direproduksi.

### 37.5 Governance

1. Requiredness seluruh inventory selesai sebelum readiness production.
2. S5 instruction/evaluation language tidak menggelembungkan readiness denominator.
3. Form mempunyai academic/assessment approval serta rights lengkap.
4. Perubahan major mempunyai migration dan rollback plan.
5. AI tidak memutuskan score high-impact, gate, mastery, atau readiness.

## 38. Test Fixtures Minimum

Implementasi wajib mempunyai fixture untuk:

1. placement 2/3 kuat → branch naik;
2. placement 1/3 kuat → branch turun;
3. hard-prerequisite failure → verification, bukan gap permanen;
4. placement time cap → partial result low confidence;
5. verification 2 item inconclusive → tambah sampai maksimal 5;
6. unit checkpoint total 0,82 tetapi domain floor 0,65 → remedial required;
7. stage checkpoint tinggi tetapi terminal hard prerequisite gagal → gate gagal;
8. outcome kualitatif tanpa dua encounter → evidence incomplete;
9. cumulative review lemah pada satu KC → targeted remedial, bukan stage reset;
10. simulation item quota tepat `7/5/6/3`, `9/4/4/2/2/1`, dan `7/6/5/6`;
11. simulation total 67 items dan timer `20/40/30`;
12. raw score `32/43` dan `18/24` menghasilkan weighted accuracy yang sama pada replay;
13. weighted total lulus tetapi Listening 0,59 → readiness input gagal;
14. satu section tidak diikuti → form invalid;
15. technical audio failure → no incorrect point dan adjudication;
16. disconnect dalam grace → resume manifest/timer sama;
17. disconnect melewati grace → invalidation;
18. duplicate submit → satu score;
19. same stimulus pada Form A/B → equivalence validation gagal;
20. answer-revealed item dipilih untuk retake → assembly gagal;
21. transcript tersedia sebelum Listening response → evidence/form invalid;
22. official reference version berubah → impact review wajib;
23. required KC belum terklasifikasi → readiness `profile_incomplete`;
24. S5 supporting vocabulary tidak masuk readiness denominator;
25. recalculation/adjudication menghasilkan superseding event tanpa menghapus history.

## 39. Implementasi Bertahap

### Phase 1 — Assessment core

- blueprint/form/run/result schema;
- deterministic objective scoring;
- section timer, navigation, feedback release, dan audit;
- placement/verification assembly;
- unit/stage checkpoint baseline;
- candidate evidence integration.

### Phase 2 — Simulation dan integrity

- 67-item N5 form assembly;
- locked Listening stream;
- exposure control dan two-form equivalence;
- resume/grace/invalidation/adjudication;
- security, signed manifest, dan online-only execution;
- readiness result integration.

### Phase 3 — Calibration dan governance

- item statistics serta form comparison;
- placement/gate predictive validation;
- fairness/accessibility monitoring;
- historical replay, migration, dan rollback tooling;
- approval workflow serta official-reference change monitor.

## 40. Definition of Done

Assessment system siap digunakan untuk keputusan learner nyata jika tersedia:

1. schema seluruh entitas Bagian 30;
2. versioned blueprint placement, verification, checkpoint, cumulative review, dan simulation;
3. sedikitnya dua approved equivalent simulation forms;
4. approved item/content pool yang memenuhi quota, exposure, retake, dan accessibility;
5. klasifikasi required/supporting/enrichment lengkap serta LevelMasteryProfile N5 aktif;
6. deterministic scorer dan calculation hash;
7. integration dengan Practice Engine serta Learning/Mastery Engine;
8. timer, resume, grace, invalidation, adjudication, dan retake implementation;
9. security/privacy review;
10. accessibility/fairness test matrix;
11. automated fixtures seluruh acceptance criteria;
12. audit dashboard dari blueprint → form → run → item → result → evidence → gate/readiness;
13. calibration plan dan baseline report;
14. runbook incident serta rollback;
15. persetujuan akademik, assessment, engineering, dan Product Owner.

## 41. Pertanyaan yang Divalidasi melalui Data MVP

- Apakah placement 25 menit menghasilkan starting unit yang stabil tanpa abandonment tinggi?
- Apakah checkpoint overall `0,80` dan domain floor `0,70–0,75` memprediksi delayed transfer?
- Apakah jumlah item unit/stage checkpoint cukup reliabel tanpa fatigue berlebihan?
- Apakah simulation form v1 mempunyai difficulty serta timing yang sebanding antar-form?
- Apakah readiness threshold `0,70/0,60/0,60` cukup konservatif terhadap simulation berikutnya dan hasil JLPT yang dilaporkan?
- Apakah 5/10-minute resume grace menjaga fairness tanpa merusak stamina construct?
- Apakah cooldown simulation tujuh hari mengurangi memorization tanpa menunda remedial secara tidak perlu?
- Item type, genre, speaker, atau modality mana yang menunjukkan bias atau technical failure tertinggi?
- Berapa banyak approved item yang diperlukan untuk menjaga exposure policy selama dua form dan retake?
- Apakah S5 supporting targets benar-benar diperlukan untuk memahami instruksi tanpa menambah language ceiling?

Perubahan berdasarkan data harus menghasilkan proposal version, academic/assessment review, fairness review, dan persetujuan Product Owner. Engagement atau pass rate saja tidak cukup.

## 42. Keputusan yang Tetap Fail-Closed

Hal berikut tidak boleh diisi dengan default tersembunyi:

- jumlah final required Vocabulary sampai review seluruh 900 lemma–sense selesai;
- aktivasi LevelMasteryProfile N5 sebelum requiredness serta content coverage lengkap;
- threshold statistik final untuk equating sebelum sample calibration cukup;
- konversi raw score ke scaled score atau probabilitas lulus JLPT;
- assessment blueprint N4–N1;
- perubahan future blueprint JLPT sebelum sumber resmi diverifikasi dan impact review disetujui.

Sistem mengembalikan `profile_incomplete`, `calibration_pending`, atau `official_reference_review_required` alih-alih menerapkan asumsi diam-diam.
