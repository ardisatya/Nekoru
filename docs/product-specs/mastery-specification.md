# Mastery Specification Nekoru — Lintas Level JLPT

**Status:** Draft v0.1  
**Pemilik keputusan akhir:** Product Owner  
**Audiens:** Product, akademik, content operations, assessment, data, AI, design, QA, dan engineering  
**Cakupan framework:** Pemula absolut dan JLPT N5–N1  
**Profil level aktif MVP:** Pemula absolut → JLPT N5  
**Bahasa produk:** Bahasa Indonesia  
**Tanggal:** 13 September 2026

## 1. Tujuan Dokumen

Dokumen ini menjadi sumber kebenaran lintas-level untuk menentukan, menghitung, menyimpan, menjelaskan, menurunkan, memulihkan, mengagregasi, dan memvalidasi penguasaan belajar di Nekoru.

Dokumen ini menetapkan:

1. perbedaan antara exposure, completion, mastery, progression, dan readiness;
2. aspek kompetensi yang dilacak pada Sound/Kana, Vocabulary, Kanji, Grammar, Reading, dan Listening;
3. kontrak Knowledge Component atau KC dan dimensi diagnostiknya;
4. kontrak evidence, encounter, attribution, validity, dan sufficiency;
5. Mastery Policy v1 beserta formula dan transisi status;
6. aturan retensi, review, misconception, remedial, dan placement;
7. weighted aggregation pada KC, outcome, unit, stage, domain, dan program;
8. hubungan mastery dengan gate dan readiness untuk setiap level JLPT;
9. konfigurasi konkret N5 serta kontrak profil N4–N1;
10. kepemilikan keputusan, integrasi sistem, explainability, versioning, migrasi, keamanan, aksesibilitas, observability, acceptance criteria, dan test fixtures.

Dokumen ini melengkapi:

- [Product Overview](./product-overview.md)
- [Arsitektur Kurikulum](./curriculum-architecture.md)
- [Learning Engine](./learning-engine.md)
- [Practice Engine](./practice-engine.md)
- [Beginner Foundations](../content/beginner-foundations-n5.md)
- [Content Progression N5](../content/content-progression-n5.md)
- seluruh inventory dan blueprint domain pada folder `docs/content`.

Jika terjadi konflik:

- scope, outcome, inventory, dan validitas akademik mengikuti curriculum version yang disetujui;
- definisi evidence, perhitungan mastery, status, agregasi, retensi, dan syarat readiness mengikuti dokumen ini;
- sequencing, session assembly, calendar planning, dan progression execution mengikuti Learning Engine;
- interaksi, attempt, hint, evaluasi respons, dan penerbitan candidate evidence mengikuti Practice Engine;
- assembly serta raw scoring placement, checkpoint, dan simulation mengikuti Assessment specification;
- keputusan akademik yang mengubah scope atau standard harus melalui review akademik dan persetujuan Product Owner.

## 2. Keputusan Utama

| Area | Keputusan |
| --- | --- |
| Cakupan mastery | Hanya kompetensi belajar; onboarding, engagement, streak, XP, dan kemampuan menggunakan UI bukan mastery |
| Level | Satu framework untuk N5–N1; setiap level wajib memiliki `LevelMasteryProfile` tersendiri |
| Profil aktif | Policy N5 lengkap; aktivasi menunggu klasifikasi required KC dan content coverage; N4–N1 tidak boleh diaktifkan sebelum inventory, blueprint, threshold, dan profile disetujui |
| Unit mastery | KC adalah unit terkecil yang memiliki status mastery |
| Dimensi | Dimensi aspek disimpan untuk diagnosis; status final tetap berada pada KC |
| Pendekatan v1 | Rules-based, deterministic, configurable, versioned, auditable, dan dapat di-rollback |
| Evidence | Mastery hanya berubah melalui evidence event yang valid; exposure dan completion tidak memberi mastery credit |
| Status | `not_started`, `learning`, `provisional`, `mastered`, dan `needs_review` |
| Threshold v1 | Score `≥0,85`, minimal 3 direct encounters, minimal 2 evidence types, delayed evidence `≥7 hari` dengan agregat `≥0,80`, dan tanpa critical misconception |
| Formula v1 | `0,55P + 0,15B + 0,15C + 0,15R*` |
| Agregasi | Weighted aggregation; hard prerequisite dan critical weakness tetap menjadi veto |
| Requiredness | KC dapat `required`, `supporting`, atau `enrichment`; hanya `required` menjadi penyebut readiness |
| Retensi | Tidak ada silent decay; waktu menaikkan urgency dan uncertainty, bukan langsung menurunkan mastery |
| Readiness | Keputusan program/ujian yang lebih luas daripada mastery KC; bukan jaminan lulus atau scaled score resmi |
| AI | Boleh memberi sinyal terstruktur; tidak boleh menetapkan mastery, unlock, gate, atau readiness |

Nilai numerik v1 adalah baseline implementasi yang harus dikalibrasi menggunakan data hasil belajar. Perubahan tidak boleh dilakukan diam-diam atau hanya untuk meningkatkan engagement/completion.

## 3. Ruang Lingkup dan Batas

### 3.1 Termasuk

- Sound, hiragana, katakana, orthography, Vocabulary, Kanji, Grammar, Reading, dan Listening;
- dimensi bentuk, bunyi, makna, fungsi, penggunaan, decoding, dan comprehension;
- KC state, domain aggregate, outcome, unit, stage, program, gate, dan readiness;
- placement estimate, verification, direct/supporting evidence, review, retention, misconception, dan remedial;
- policy configuration, event/state schema, audit, versioning, migration, recalculation, dan rollback;
- user-facing status, confidence, reason code, serta progress explanation;
- content coverage yang diperlukan agar setiap KC secara nyata dapat dikuasai.

### 3.2 Tidak termasuk sebagai mastery

- membuka, membaca, atau menyelesaikan layar;
- durasi berada di aplikasi tanpa retrieval;
- XP, level akun, streak, badge, dan achievement;
- kepatuhan jadwal atau jumlah hari aktif;
- self-reported confidence;
- kualitas penggunaan navigasi atau kontrol UI;
- speaking dan writing bebas pada scope saat ini;
- handwriting, tracing, dan stroke-order production;
- pitch accent;
- probabilitas lulus atau scaled score resmi JLPT.

Aktivitas non-mastery tetap dapat menjadi exposure, dukungan instruksional, accessibility accommodation, atau metrik produk. Ia tidak boleh ditampilkan seolah-olah merupakan bukti penguasaan.

## 4. Model Konseptual

```text
Program N5/N4/N3/N2/N1
├── LevelMasteryProfile
├── Stage
│   └── Unit
│       ├── LearningOutcome
│       └── KnowledgeComponent (KC)
│           ├── DiagnosticDimension[]
│           ├── EvidenceRequirement
│           ├── LearnerKCState
│           ├── ReviewSchedule
│           └── MisconceptionState[]
├── DomainAggregate[]
├── GateEvaluation[]
└── ReadinessSnapshot
```

Aliran keputusan:

```text
Approved activity + learner response
→ EvaluationResult
→ CandidateEvidence
→ Evidence validation dan attribution
→ Immutable EvidenceEvent
→ Diagnostic dimension update
→ KC mastery calculation
→ Status + confidence + review schedule
→ Weighted outcome/unit/stage/domain aggregate
→ Gate dan readiness evaluation
→ Decision log + user explanation
```

## 5. Istilah Operasional

| Istilah | Definisi |
| --- | --- |
| Exposure | Learner melihat atau mendengar target tanpa retrieval; tidak menaikkan mastery |
| Completion | Aktivitas atau sesi selesai secara operasional; bukan bukti penguasaan |
| Knowledge Component | Unit pengetahuan/kemampuan terkecil yang status penguasaannya dilacak |
| Diagnostic dimension | Aspek internal KC untuk menjelaskan kekuatan/kelemahan; tidak memiliki status mastery mandiri secara default |
| Encounter | Satu stimulus substantif yang dapat menghasilkan satu atau beberapa evidence events |
| Direct evidence | Aktivitas sengaja dirancang untuk mendiagnosis primary KC |
| Supporting evidence | Sinyal lintas-domain dengan kontribusi terbatas |
| Delayed evidence | Direct evidence setelah interval minimum dari anchor yang memenuhi aturan retensi |
| Mastery score | Estimasi `0–1` terhadap penguasaan satu KC berdasarkan policy version tertentu |
| Confidence | Tingkat kecukupan dan kualitas bukti; terpisah dari mastery score |
| Misconception | Pola kesalahan yang mempunyai diagnosis dan remedial terdefinisi |
| Gate | Syarat progression yang dapat memuat mastery, checkpoint, retention, dan weakness constraints |
| Readiness | Keputusan bahwa bukti agregat memenuhi persyaratan internal untuk mencoba level ujian target |

## 6. Taksonomi Kompetensi dan Dimensi Diagnostik

### 6.1 Sound dan Kana

KC dapat berupa mapping, recognition, contrast, decoding, atau orthography rule. Dimensi minimum:

| Dimensi | Pertanyaan diagnostik |
| --- | --- |
| Auditory discrimination | Dapatkah learner membedakan bunyi target? |
| Sound-to-script | Dapatkah bunyi dipetakan ke kana? |
| Script-to-sound | Dapatkah kana dipetakan ke bunyi? |
| Visual recognition | Dapatkah glyph dikenali tanpa clue? |
| Visual discrimination | Dapatkah bentuk confusable dibedakan? |
| Mora processing | Dapatkah panjang, sokuon, yoon, dan mora nasal diproses? |
| Word decoding | Dapatkah sequence kana dibaca dalam kata baru? |
| Phrase application | Dapatkah decoding bertahan dalam frasa/micro-text? |

Required S0 KC memerlukan sekurangnya satu direct independent retrieval dan satu application dalam kata/frasa. Romaji, tracing, animasi, dan imitasi suara tidak menjadi bukti mastery.

### 6.2 Vocabulary

Unit target adalah pasangan lemma–sense. Dimensi minimum:

| Dimensi | Cakupan |
| --- | --- |
| Form recognition | Mengenali written form yang diizinkan |
| Sound recognition | Mengenali kata dari audio |
| Meaning/sense | Memilih makna yang tepat, bukan sekadar gloss umum |
| Reading recall | Menghasilkan atau memilih reading target |
| Orthography | Memetakan kana ke katakana/Kanji ketika menjadi target |
| Contextual use | Memilih kata sesuai constraint, collocation, dan konteks |
| Contrast | Membedakan semantic, phonological, atau orthographic neighbor |

Vocabulary KC tidak boleh `mastered` hanya dari kartu bentuk–terjemahan. Required KC minimal memiliki satu bukti penggunaan/comprehension.

### 6.3 Kanji

Unit target adalah satu karakter Unicode kanonik; target reading terikat pada vocabulary. Dimensi minimum:

| Dimensi | Cakupan |
| --- | --- |
| Character recognition | Mengenali karakter pada glyph tervalidasi |
| Pedagogical meaning | Mengenali makna yang relevan bagi target word |
| Reading in word | Membaca karakter dalam vocabulary target |
| Orthography selection | Memetakan kana/word ke bentuk berkanji |
| Context transfer | Memahami karakter pada kalimat, tanda, atau material fungsional |
| Visual contrast | Membedakan karakter mirip pada font/platform target |

Stroke animation, step mode, dan tracing adalah exposure/instruction. Seluruh reading kamus, handwriting, dan akurasi stroke bukan syarat mastery.

### 6.4 Grammar

Unit target adalah satu form–function pedagogis. Dimensi minimum:

| Dimensi | Cakupan |
| --- | --- |
| Form recognition | Mengenali bentuk target |
| Function recognition | Memahami fungsi komunikatif |
| Formation | Membentuk infleksi atau struktur yang dibatasi |
| Constraint | Menerapkan attachment, semantics, register, tense, dan polarity |
| Contrast | Membedakan pola yang mirip |
| Sentence application | Menggunakan target pada composition/transformation terstruktur |
| Text flow | Memahami kontribusi grammar antarkalimat |

Satu KC tidak boleh `mastered` hanya dari `form_to_function` recognition. Required KC minimal mempunyai direct form/application evidence; KC discourse juga memerlukan `text_grammar` atau bukti ekuivalen.

### 6.5 Reading

Reading menggunakan KC kemampuan, bukan satu KC per teks. Satu passage adalah encounter; question di dalamnya menghasilkan evidence berbeda tetapi tidak menggandakan encounter sufficiency.

Taxonomy KC lintas-level minimum:

| Cluster | Subskill KC |
| --- | --- |
| Decoding | script decoding, word boundary, mixed orthography |
| Local comprehension | explicit detail, vocabulary in context, grammar in text |
| Global comprehension | topic/main point, purpose, speaker/writer intent |
| Text relations | reference resolution, sequence, connective/text flow |
| Inference | low inference sampai inference sesuai level |
| Functional reading | information lookup, compare, action selection |
| Fluency | comprehension dalam timing/length profile yang disetujui |

Setiap KC Reading wajib menyimpan `genre_scope`, `length_band`, `lexical_coverage_band`, `grammar_ceiling`, `kanji_density_band`, `inference_depth`, dan `timed_policy`. Mastery pada satu genre tidak otomatis memberi mastery pada seluruh genre.

Profil N5 minimal mencakup:

- script decoding;
- explicit detail;
- main point sederhana;
- reference resolution sederhana;
- sequence;
- low inference;
- information lookup;
- action selection;
- vocabulary in context;
- grammar/text flow;
- short passage, mid-size passage, dan functional material.

### 6.6 Listening

Listening menggunakan KC kemampuan, bukan satu KC per audio. Satu stimulus audio adalah encounter; replay atau beberapa question tidak menggandakan encounter.

Taxonomy KC lintas-level minimum:

| Cluster | Subskill KC |
| --- | --- |
| Sound processing | phonological discrimination, mora/length, sound-to-script |
| Local comprehension | explicit detail, number/time, person/place, negation |
| Interaction | quick response, situational expression, register appropriateness |
| Global comprehension | key point, main intent, relationship/situation |
| Task comprehension | action selection, instruction, sequence, solution |
| Robustness | speaker variation, natural ellipsis, speed/noise sesuai level |
| Fluency | comprehension dalam replay/timing profile yang disetujui |

Setiap KC Listening wajib menyimpan `situation_scope`, `speech_rate_band`, `duration_band`, `speaker_count`, `speaker_variation_requirement`, `noise_profile`, `replay_policy`, dan `prompt_preview_policy`.

Profil N5 minimal mencakup:

- sound discrimination dan audio-to-kana pada foundation;
- quick response;
- situational/verbal expression;
- explicit detail;
- key point;
- action selection;
- speaker intent sederhana;
- sequence;
- task-based comprehension tanpa transcript.

Transcript-based response tidak pernah menjadi Listening mastery evidence.

## 7. Kontrak Knowledge Component

| Field | Tipe | Wajib | Aturan |
| --- | --- | --- | --- |
| `id` | string | Ya | Stabil dan tidak digunakan ulang |
| `domain` | enum | Ya | sound, kana, orthography, vocabulary, kanji, grammar, reading, listening |
| `level_scope` | enum[] | Ya | Level tempat KC digunakan |
| `category` | string | Ya | Taxonomy domain yang disetujui |
| `requiredness` | enum | Ya | required, supporting, enrichment |
| `curriculum_weight` | number | Ya | Positif; baseline `1,00` |
| `prerequisite_role` | enum | Ya | terminal_hard, blocking_hard, standard |
| `exam_relevance` | enum | Ya | core, standard, none |
| `diagnostic_dimensions` | array | Ya | Minimal satu |
| `prerequisites` | array | Ya | hard, soft, co_requisite, supports |
| `evidence_requirements` | object | Ya | Encounter, type, breadth, retention |
| `misconception_refs` | string[] | Ya | Boleh kosong hanya jika dirasionalisasi |
| `assessment_blueprint_refs` | string[] | Ya | Minimal satu untuk required KC |
| `source_rationale` | object | Ya | Dasar scope dan level |
| `status` | enum | Ya | draft, review, approved, published, deprecated |
| `curriculum_version` | semver | Ya | Versi pemilik |

Aturan:

- `required` memengaruhi progression/readiness dan wajib mempunyai content pool lengkap;
- `supporting` memperkaya coverage atau instruksi tetapi tidak masuk penyebut readiness;
- `enrichment` opsional dan tidak boleh memblokir gate/readiness;
- perubahan requiredness dari/ke `required` memerlukan impact analysis dan migration plan;
- satu KC boleh muncul pada beberapa level, tetapi requirement dan weight level-specific berada pada `LevelMasteryProfile`.

## 8. Kontrak Evidence

### 8.1 Evidence event minimum

```yaml
event_id: EVT.01J...
event_type: answer_evaluated
occurred_at: 2026-09-13T10:15:00+07:00
received_at: 2026-09-13T10:15:01+07:00
learner_id: USER.123
program_id: PROGRAM.N5.ABSOLUTE_BEGINNER
session_id: SESSION.456
practice_run_id: PRACTICE.789
activity_instance_id: ACTIVITY_INSTANCE.012
encounter_id: ENCOUNTER.345
item_id: ITEM.N5.GRAMMAR.001
item_version: 1.2.0
curriculum_version: 1.0.0
mastery_policy_version: 1.0.0
assessment_blueprint_version: 1.0.0
primary_kc_id: KC.N5.GRAMMAR.PARTICLE.001
diagnostic_dimension_ids: [form_selection, constraint]
supporting_kcs:
  - kc_id: KC.N5.VOCAB.PLACE.004
    diagnostic_confidence: 0.80
correctness: 1.0
difficulty_band: target
hint_level: none
attempt_number: 1
activity_type: grammar_form_selection
evidence_class: direct
response_time_ms: 8200
evaluation_source: deterministic_key
evaluation_id: EVAL.01J...
validity: candidate
```

Event bersifat immutable. Koreksi membuat adjudication atau superseding event; event lama tidak ditulis ulang.

### 8.2 Validitas evidence

Evidence tidak mengubah mastery jika:

- event duplikat;
- item, instance, answer key, rubric, atau version tidak ditemukan;
- item belum approved/published saat diberikan;
- evaluation gagal, pending, ambigu, atau confidence `<0,50`;
- aktivitas hanya exposure;
- answer telah ditampilkan sebelum respons;
- modality atau accommodation mengubah konstruk tanpa blueprint;
- technical integrity run gagal;
- attribution dibuat saat runtime tanpa mapping approved.

Event tetap dicatat sebagai `rejected` atau `non_mastery` dengan reason code.

### 8.3 Attribution

- Setiap scored item memiliki tepat satu primary KC.
- Primary KC menerima attribution `1,00`.
- Supporting KC menerima attribution baseline `0,35 × diagnostic_confidence`.
- Incidental KC menerima `0`.
- Supporting evidence tidak memenuhi encounter minimum atau breadth, kecuali item ditandai `directly_diagnostic` dalam blueprint akademik.
- AI tidak boleh membuat primary/supporting mapping saat runtime.

### 8.4 Encounter identity

- Satu passage/audio multi-question tetap satu encounter stimulus.
- Replay, retry, shuffle, hint, dan resume tidak membuat encounter baru.
- Attempt setelah answer reveal bukan encounter baru.
- Template instance baru hanya menjadi encounter baru jika stimulus substantif berbeda dan cooldown policy mengizinkan.
- Duplicate encounter tidak boleh digunakan untuk memenuhi sufficiency dua kali.

## 9. Mastery Policy v1

### 9.1 Evidence signal

Untuk evidence `e`:

```text
signal_e = correctness_e × independence_e × attempt_e
weight_e = activity_e × difficulty_e × attribution_e × diagnostic_confidence_e
```

`signal_e` dibatasi `0–1`; `weight_e` nonnegatif dan dapat mencapai `1,15`.

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
| Answer reveal | 0,20; tidak membentuk retrieval baru |

#### Attempt

| Percobaan | Nilai |
| --- | ---: |
| Pertama | 1,00 |
| Kedua | 0,80 |
| Ketiga atau lebih | 0,60 |

#### Activity

| Evidence class | Nilai |
| --- | ---: |
| Direct independent retrieval | 1,00 |
| Applied context/comprehension | 0,90 |
| Recognition terisolasi | 0,75 |
| Guided practice | 0,50 |
| Exposure | 0,00 |

Nilai activity spesifik yang telah disetujui inventory tetap berlaku selama dapat dipetakan ke kelas di atas dan dicatat pada policy version.

#### Difficulty

| Band | Nilai |
| --- | ---: |
| Easy | 0,85 |
| Target | 1,00 |
| Stretch | 1,15 |

Response time tidak menjadi correctness atau penalti mastery pada v1. Ia hanya menjadi sinyal fatigue, anomaly, accessibility-aware timing, dan difficulty calibration.

### 9.2 Agregasi evidence per KC

Gunakan maksimal 12 evidence valid terbaru per KC:

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

Semua komponen dibatasi `0–1`. Evidence type dianggap satisfied jika memiliki direct evidence dengan `signal ≥0,80`.

Jika qualifying delayed evidence belum ada:

```text
R* = P
retention_qualified = false
```

Formula:

```text
mastery_score_raw = 0.55P + 0.15B + 0.15C + 0.15R*
mastery_score = applySufficiencyCaps(mastery_score_raw)
```

### 9.3 Delayed evidence

Evidence memenuhi syarat retensi jika:

- terjadi minimal 7 hari setelah instruction atau successful retrieval anchor;
- direct evidence;
- tanpa hint kuat atau answer reveal;
- item/stimulus tidak identik dengan anchor;
- modality dan difficulty diizinkan blueprint;
- untuk Reading/Listening, encounter stimulus berbeda.

### 9.4 Sufficiency dan cap

| Kondisi | Cap/dampak |
| --- | --- |
| Kurang dari 3 direct encounters | Score operasional maksimum `0,84` |
| Breadth belum terpenuhi | Score operasional maksimum `0,84` |
| Supporting evidence saja | Status maksimum `learning` |
| Belum ada delayed evidence | Status maksimum `provisional` |
| Unresolved critical misconception | Score maksimum `0,69` |
| Evidence validity tidak cukup | Tidak ada perubahan mastery |

Domain blueprint boleh memperketat encounter, breadth, atau retention requirement. Ia tidak boleh melonggarkan baseline untuk required KC tanpa Mastery Policy version baru dan persetujuan Product Owner.

## 10. Dimensi Diagnostik

Dimensi memakai formula evidence yang sama, tetapi:

- hanya menerima evidence yang memetakan dimension ID tersebut;
- boleh mempunyai confidence rendah dan status internal seperti `insufficient`, `weak`, `developing`, atau `strong`;
- tidak menggantikan KC status;
- tidak dapat sendirian membuka gate atau readiness;
- digunakan untuk feedback, remedial selection, content-gap detection, dan explanation.

Baseline label:

| Label | Aturan awal |
| --- | --- |
| `insufficient` | Kurang dari 2 direct diagnostic encounters |
| `weak` | Score diagnostik `<0,70` dengan bukti cukup |
| `developing` | Score `0,70–0,849` |
| `strong` | Score `≥0,85` |

Label tidak ditampilkan sebagai vonis kemampuan. UI menggunakan bahasa yang dapat ditindaklanjuti, misalnya “maknanya sudah kuat; penggunaan dalam kalimat masih perlu latihan.”

## 11. Status dan Transisi Mastery

| Status | Aturan |
| --- | --- |
| `not_started` | Belum ada evidence valid |
| `learning` | Ada evidence, tetapi syarat provisional belum terpenuhi |
| `provisional` | Score ≥0,85; ≥3 direct encounters; breadth terpenuhi; tanpa critical misconception |
| `mastered` | Seluruh syarat provisional + qualifying delayed evidence agregat ≥0,80 |
| `needs_review` | Pernah provisional/mastered lalu gagal pada bukti retensi/performa sesuai rule |

State machine:

```text
not_started → learning → provisional → mastered
                  ↑          │            │
                  └──────────┴──→ needs_review
                                  │
                                  ├→ provisional
                                  └→ mastered
```

### 11.1 Penurunan status

Satu jawaban salah biasa memicu confirmation probe, bukan langsung menghapus mastery. Status menjadi `needs_review` jika salah satu terjadi:

- qualifying delayed probe memiliki signal `<0,80`;
- minimal 2 dari 3 direct encounters terbaru memiliki signal `<0,70`;
- mastery score turun `<0,70` karena evidence baru;
- critical misconception aktif;
- checkpoint menunjukkan kegagalan sistematis yang dapat diatribusikan ke KC.

Status tidak berubah hanya karena learner tidak membuka aplikasi atau review due date terlewati.

### 11.2 Restorasi

- `needs_review → provisional` setelah remedial dan seluruh syarat provisional terpenuhi;
- `needs_review → mastered` jika qualifying delayed evidence masih representatif dan tidak ada critical misconception;
- perubahan besar content/policy dapat meminta delayed probe baru melalui migration rule;
- answer reveal atau retry pada item yang sama tidak dapat memulihkan mastery sendiri.

## 12. Confidence

Mastery dan confidence disimpan terpisah:

```text
confidence = min(1,
  0.40 × encounter_sufficiency
  + 0.25 × breadth
  + 0.20 × recency_coverage
  + 0.15 × diagnostic_quality
)
```

Confidence rendah:

- tidak otomatis menurunkan mastery;
- meningkatkan prioritas verification/probe;
- membatasi kekuatan penjelasan pengguna;
- tidak dapat dipakai untuk melewati hard prerequisite berdampak tinggi.

## 13. Review dan Retensi

Interval baseline: `1, 3, 7, 14, 30, 60` hari.

| Rating | Aturan v1 | Dampak |
| --- | --- | --- |
| `again` | signal `<0,50` | Ulang singkat jika aman, lalu 1 hari |
| `hard` | `0,50–0,799` | Pertahankan atau mundurkan satu interval |
| `good` | `0,80–0,949` | Maju satu interval |
| `easy` | `≥0,95`, tanpa hint, target/stretch | Maju hingga dua interval |

```text
overdue_ratio = max(0, days_overdue / planned_interval_days)
review_urgency = clamp(
  0.50 + 0.30 × overdue_ratio + 0.20 × (1-confidence),
  0,
  1
)
```

Aturan:

- review terlambat menaikkan urgency, bukan menurunkan mastery;
- review berikutnya menggunakan item, context, speaker, atau stimulus berbeda jika pool memungkinkan;
- critical prerequisite dapat menaikkan priority class;
- profile level/domain boleh memperketat interval melalui policy version;
- backlog tidak boleh diselesaikan dengan menghapus review atau menurunkan standard.

## 14. Misconception dan Remedial

| Status | Bukti minimum | Dampak |
| --- | --- | --- |
| `suspected` | 1 evidence diagnostik | Feedback + confirmation probe |
| `confirmed` | 2 evidence konsisten pada encounter berbeda | Remedial dijadwalkan |
| `critical` | Confirmed dan memblokir fondasi/comprehension penting | Cap score + gate/readiness veto |
| `resolved` | Remedial + independent verification berhasil | Veto dilepas; mastery dihitung ulang |

Flow:

```text
Kesalahan
→ Validasi bahwa item bukan penyebab
→ Attribution ke target atau prerequisite
→ Confirmation probe
→ Contrastive explanation
→ Guided practice
→ Independent retrieval dengan item baru
→ Update evidence dan misconception state
→ Selesai, ulang, atau turun ke prerequisite
```

Remedial menargetkan gap terkecil. Kegagalan satu KC tidak mengulang seluruh unit kecuali evidence menunjukkan gap menyeluruh.

## 15. Required, Supporting, dan Enrichment

### 15.1 Required

- harus dikuasai sesuai threshold profil;
- masuk denominator weighted mastery coverage;
- dapat menjadi prerequisite, gate, domain floor, atau critical weakness;
- wajib memiliki content pool yang memenuhi encounter, breadth, variation, dan delayed evidence.

### 15.2 Supporting

- membantu pemahaman, instruksi, context, atau kelancaran;
- dapat memiliki mastery state untuk personalisasi;
- tidak masuk denominator readiness;
- tidak dapat memblokir readiness kecuali kemudian dipromosikan menjadi required melalui versi baru.

### 15.3 Enrichment

- opsional dan tidak mengubah progression/readiness;
- dapat memberi progress lokal atau achievement yang tidak menyiratkan kesiapan ujian;
- tidak boleh menggantikan review required KC.

## 16. Weighted Aggregation

### 16.1 Bobot KC

```text
kc_weight = curriculum_weight
            × prerequisite_multiplier
            × exam_relevance_multiplier
```

Baseline multiplier:

| Faktor | Nilai |
| --- | ---: |
| `curriculum_weight` default | 1,00 |
| `terminal_hard` | 1,50 |
| `blocking_hard` | 1,25 |
| `standard` | 1,00 |
| `exam_relevance: core` | 1,25 |
| `exam_relevance: standard` | 1,00 |
| `exam_relevance: none` | 0,00 untuk readiness |

Multiplier disimpan pada `LevelMasteryProfile`, bukan hardcoded. Perubahan bobot memerlukan versioning dan recalculation analysis.

### 16.2 Agregat

Untuk set required KC `K`:

```text
weighted_mastery_score = Σ(mastery_score_k × kc_weight_k)
                         / Σ(kc_weight_k)

weighted_mastered_coverage = Σ(is_mastered_k × kc_weight_k)
                             / Σ(kc_weight_k)

weighted_retention = Σ(retention_score_k × kc_weight_k)
                     / Σ(kc_weight_k with qualifying retention)

retention_coverage = Σ(has_qualifying_retention_k × kc_weight_k)
                     / Σ(kc_weight_k)
```

Agregat wajib menyimpan numerator, denominator, coverage, missing evidence, policy version, dan daftar veto. Angka tanpa coverage tidak boleh ditampilkan sebagai lengkap.

### 16.3 Aturan non-kompensasi

- Skor tinggi pada KC mudah tidak menutupi terminal hard prerequisite yang gagal.
- Domain kuat tidak menutupi domain yang berada di bawah floor.
- Supporting/enrichment tidak menambah denominator atau memperbaiki readiness required coverage.
- Missing delayed evidence tidak dianggap retention `0` atau `1`; ia mengurangi retention coverage.
- Gate/readiness hanya lulus jika seluruh veto kosong.

### 16.4 Tingkat agregasi

| Tingkat | Kegunaan |
| --- | --- |
| Diagnostic dimension | Menjelaskan sub-aspek dan remedial |
| KC | Sumber status mastery |
| Learning outcome | Menggabungkan KC yang membuktikan Can-do/outcome |
| Unit | Progress lokal dan checkpoint eligibility |
| Stage | Gate progression |
| Domain | Kekuatan Vocabulary/Kanji/Grammar/Reading/Listening |
| Program/level | Coverage dan readiness target JLPT |

Unit/stage `completed` tidak mengubah KC. Ia merupakan hasil evaluasi atas KC, outcome, dan checkpoint.

## 17. Evidence Requirement per Domain

| Domain | Breadth minimum required KC | Retention/transfer requirement |
| --- | --- | --- |
| Sound/Kana | 1 direct mapping/discrimination + 1 decoding/application | Item/word baru tanpa romaji setelah ≥7 hari |
| Vocabulary | 2 types termasuk context/use; bentuk dan sense tidak boleh hanya recognition | Bentuk/context berbeda setelah ≥7 hari |
| Kanji | word reading + orthography/context; character meaning saja tidak cukup | Target word atau context berbeda setelah ≥7 hari |
| Grammar | direct form/formation + application/contrast; discourse KC memerlukan text flow | Kalimat/text berbeda setelah ≥7 hari |
| Reading | Minimal 2 passage/functional contexts sesuai subskill dan genre scope | Stimulus baru; comprehension tanpa full translation |
| Listening | Minimal 2 audio contexts; speaker/stimulus variation sesuai profile | Audio baru tanpa transcript dan replay sesuai policy |

Baseline tiga direct encounters tetap berlaku. Tabel ini menentukan jenis bukti yang harus terdapat di antaranya.

## 18. Placement dan Estimated Mastery

Placement menghasilkan estimate, bukan final mastery:

| Kondisi | Hasil |
| --- | --- |
| Weighted signal ≥0,85; ≥5 direct items; stabil pada 3 terakhir | `estimated_mastered`, high confidence |
| Signal ≥0,85 tetapi bukti kurang | `estimated_mastered`, medium/low; verification |
| Signal 0,70–0,849 | `uncertain`; verification/review |
| Signal <0,70 | `estimated_gap` |

Aturan:

- hasil placement maksimum menjadi `provisional`;
- delayed evidence tetap diwajibkan untuk `mastered`;
- hard prerequisite dengan confidence rendah memicu verification;
- gap kana dapat menahan Reading/Kanji tanpa otomatis menahan Listening;
- self-report hanya untuk routing dan tidak menghapus KC dari readiness;
- item placement mengikuti LevelMasteryProfile dan Assessment blueprint target.

## 19. Progression dan Gate

Gate dapat memuat:

- required KC mastered coverage;
- terminal hard prerequisite;
- weighted mastery/domain score;
- domain floor;
- retention dan retention coverage;
- checkpoint outcome;
- absence of critical misconception;
- required evidence format coverage.

Jika gate gagal:

- target dengan hard prerequisite gagal tetap locked;
- review, remedial, dan aktivitas integrasi yang eligible tetap tersedia;
- learner memperoleh reason dan next action;
- learner tidak dianggap gagal pada seluruh stage;
- user override tidak dapat mengubah threshold atau menghapus veto.

## 20. Readiness

### 20.1 Definisi

Readiness adalah keputusan internal bahwa mastery, retention, coverage, transfer, dan performa asesmen pengguna cukup kuat untuk mencoba level JLPT target. Readiness:

- bukan mastery satu KC;
- bukan completion seluruh lesson;
- bukan probabilitas atau jaminan lulus;
- bukan scaled score resmi JLPT;
- selalu terikat `LevelMasteryProfile`, curriculum version, dan assessment forms tertentu.

Status readiness:

| Status | Makna |
| --- | --- |
| `not_ready` | Sedikitnya satu requirement atau veto akademik belum terpenuhi |
| `ready` | Seluruh requirement terpenuhi dan bukti masih berada dalam validity window |
| `verification_due` | Mastery tidak diturunkan, tetapi bukti readiness perlu diperbarui karena validity window terlewati |
| `profile_incomplete` | Level belum memiliki konfigurasi lengkap sehingga readiness tidak dapat dihitung |

### 20.2 Kontrak umum

Setiap level N5–N1 wajib menentukan:

1. required KC set dan weight;
2. terminal hard prerequisites;
3. minimum weighted mastered coverage;
4. minimum mastery/retention per domain;
5. minimum retention coverage;
6. format evidence wajib;
7. simulation count, form equivalence, total threshold, dan section floor;
8. critical weakness taxonomy;
9. validity window untuk simulation dan retention evidence;
10. policy untuk content/curriculum migration.

Jika satu field belum disetujui, level berstatus `profile_incomplete` dan readiness tidak dapat diterbitkan.

### 20.3 Profil readiness N5 v1

Status `N5 Ready` diberikan hanya jika:

1. weighted mastered coverage required KC minimal `0,85`;
2. weighted mastered coverage pada masing-masing domain Vocabulary, Kanji, Grammar, Reading, dan Listening minimal `0,75`;
3. seluruh terminal hard prerequisites `mastered`;
4. weighted delayed retention setiap domain minimal `0,80`;
5. retention coverage setiap domain minimal `0,80`;
6. minimal dua simulation forms berbeda dan ekuivalen telah diselesaikan;
7. kedua simulation memiliki weighted accuracy minimal `0,70` total;
8. setiap simulation memiliki minimal `0,60` pada kelompok `Language Knowledge/Reading` dan `Listening`;
9. seluruh format evidence resmi N5 yang dipetakan telah diperkenalkan dan dinilai;
10. tidak ada critical weakness aktif;
11. kedua simulation diselesaikan dalam 90 hari terakhir;
12. qualifying retention evidence yang membentuk coverage berasal dari 60 hari terakhir;
13. seluruh evidence menggunakan version yang compatible atau telah dimigrasikan resmi.

Nilai ini adalah threshold konservatif internal, bukan konversi ke scaled score JLPT.

Validity window hanya memengaruhi readiness. Ketika window terlewati, status menjadi `verification_due`; mastery KC tidak turun tanpa evidence kegagalan baru.

### 20.4 Profil N4–N1

Framework berlaku langsung, tetapi nilai berikut wajib `TBD` sampai kurikulum level terkait disetujui:

- inventory dan required KC;
- domain/subskill breadth;
- text/audio difficulty bands;
- threshold mastery/retention dan domain floor;
- simulation blueprint dan validity window;
- critical weakness taxonomy;
- prerequisite dari level sebelumnya.

N4–N1 tidak boleh menyalin threshold N5 secara otomatis. Reuse KC lintas-level harus menyimpan level-specific requirement dan evidence ceiling.

## 21. Resolusi Konten N5 untuk Mastery

Keputusan berikut menjadi constraint saat Content Progression dan inventory N5 direvisi:

1. seluruh target bahasa inti yang required harus diperkenalkan paling lambat U20;
2. U21–U24 berfungsi untuk integrasi, retensi, asesmen, simulation, dan remedial;
3. istilah instruksi/evaluasi pada S5 dapat tetap diajarkan sebagai `supporting`, bukan required readiness KC;
4. empat Grammar S5 tidak boleh menaikkan language ceiling secara substantif; jika required, pindahkan first introduction ke U17–U20 melalui curriculum revision;
5. total baseline 900 Vocabulary tetap dapat dipertahankan, tetapi inventory wajib mengklasifikasikan setiap lemma–sense sebagai required, supporting, atau enrichment;
6. denominator readiness hanya berisi required KC;
7. pemindahan first unit, perubahan prerequisite, atau perubahan requiredness wajib memiliki migration impact analysis.

Dokumen ini tidak menetapkan jumlah required Vocabulary sebelum inventory 900 entry selesai direview. Pipeline readiness harus fail closed jika klasifikasi belum lengkap.

## 22. Readiness Snapshot

```yaml
status: not_ready
target_level: N5
level_mastery_profile_version: 1.0.0
curriculum_version: 1.0.0
mastery_policy_version: 1.0.0
weighted_required_mastered_coverage: 0.82
weighted_mastery_score: 0.84
terminal_prerequisites_met: true
domain_mastered_coverage:
  vocabulary: 0.84
  kanji: 0.81
  grammar: 0.78
  reading: 0.74
  listening: 0.83
domain_retention:
  vocabulary: 0.84
  kanji: 0.81
  grammar: 0.78
  reading: 0.76
  listening: 0.83
domain_retention_coverage:
  vocabulary: 0.91
  kanji: 0.88
  grammar: 0.86
  reading: 0.79
  listening: 0.87
simulation_forms_completed: 1
simulation_validity_window_days: 90
retention_validity_window_days: 60
critical_weaknesses:
  - KC.N5.READING.TEXT_GRAMMAR.003
vetoes:
  - READINESS_SIMULATION_COUNT_INSUFFICIENT
  - READINESS_RETENTION_BELOW_THRESHOLD
evaluated_at: 2026-09-13T10:30:00+07:00
```

UI tidak boleh menyebut nilai ini sebagai probabilitas kelulusan atau skor resmi.

## 23. State dan Data Contract

### 23.1 LearnerKCState

```yaml
learner_id: USER.123
kc_id: KC.N5.GRAMMAR.PARTICLE.001
curriculum_version: 1.0.0
mastery_policy_version: 1.0.0
revision: 42
mastery_score: 0.87
status: provisional
confidence: 0.78
retention_qualified: false
direct_encounter_count: 4
evidence_types_satisfied: 2
dimension_states:
  form_selection: strong
  constraint: developing
last_evidence_at: 2026-09-13T10:15:00+07:00
next_review_at: 2026-09-20T10:15:00+07:00
active_misconception_ids: []
calculation_hash: sha256:...
```

### 23.2 Entitas minimum

| Entitas | Field penting |
| --- | --- |
| `MasteryPolicy` | version, weights, thresholds, caps, retention rules |
| `LevelMasteryProfile` | level, required set, aggregation weights, gate/readiness rules |
| `LearnerKCState` | score, status, confidence, retention, dimensions, revision |
| `EvidenceEvent` | source, versions, signal inputs, attribution, validity |
| `EvidenceAnchor` | instruction/retrieval anchor dan delayed eligibility |
| `MisconceptionState` | status, severity, evidence IDs, remedial refs |
| `ReviewSchedule` | interval, due date, rating, policy version |
| `AggregateSnapshot` | level, scope, numerator, denominator, coverage, vetoes |
| `GateEvaluation` | gate, requirement values, result, reasons |
| `ReadinessSnapshot` | target level, all requirements, result, reasons |
| `MasteryDecisionLog` | input hash, output, versions, reason codes |

Raw structured evidence harus dipertahankan sesuai retention/privacy policy agar recalculation dapat dilakukan. Status terakhir saja tidak cukup.

## 24. Operasi dan Event

Nama berikut adalah kontrak logis; transport diputuskan engineering.

### 24.1 Operasi

| Operasi | Hasil |
| --- | --- |
| `ingestCandidateEvidence(event)` | accepted, rejected, duplicate, atau pending |
| `recalculateKC(learner, kc, versions)` | state dan decision log |
| `getMasteryState(learner, scope)` | KC/dimension/aggregate snapshot |
| `scheduleReview(learner, kc)` | due date dan reason |
| `evaluateGate(learner, gate)` | pass/fail dan vetoes |
| `evaluateReadiness(learner, level)` | versioned readiness snapshot |
| `simulatePolicy(policy, evidenceSet)` | non-production comparison report |
| `migrateMastery(migrationPlan)` | auditable state transition |

### 24.2 Event taxonomy minimum

```text
candidate_evidence_received
evidence_accepted
evidence_rejected
evidence_adjudicated
mastery_recalculated
mastery_status_changed
diagnostic_dimension_changed
retention_probe_due
review_scheduled
misconception_suspected
misconception_confirmed
misconception_resolved
aggregate_recalculated
gate_evaluated
readiness_evaluated
mastery_migration_started
mastery_migration_completed
mastery_migration_rolled_back
```

## 25. Explainability dan Reason Code

Setiap perubahan KC, aggregate, gate, atau readiness minimal menyimpan:

- decision ID dan timestamp;
- input snapshot hash;
- evidence/constraint pemicu;
- previous state dan next state;
- seluruh policy/content/curriculum versions;
- machine reason code;
- user-facing explanation key;
- reviewer/adjudication ref jika ada.

Reason code minimum:

| Code | Contoh makna pengguna |
| --- | --- |
| `MASTERY_EVIDENCE_INSUFFICIENT` | “Jawabanmu sudah kuat, tetapi kita masih perlu bukti dari variasi latihan lain.” |
| `MASTERY_BREADTH_INSUFFICIENT` | “Kamu sudah mengenali bentuknya; sekarang kita cek penggunaannya.” |
| `MASTERY_RETENTION_PENDING` | “Materi ini dikuasai sementara dan akan dicek lagi setelah jeda.” |
| `MASTERY_RETENTION_CONFIRMED` | “Kamu masih mengingat materi ini setelah jeda.” |
| `MASTERY_REVIEW_REQUIRED` | “Bukti terbaru menunjukkan materi ini perlu diperkuat.” |
| `MASTERY_CRITICAL_MISCONCEPTION` | “Ada pola yang masih sering tertukar dan perlu dibereskan lebih dulu.” |
| `MASTERY_PREREQUISITE_BLOCKED` | “Fondasi ini perlu diperkuat sebelum materi berikutnya.” |
| `MASTERY_CONFIDENCE_LOW` | “Kita perlu pemeriksaan singkat agar estimasinya lebih pasti.” |
| `READINESS_REQUIRED_COVERAGE_LOW` | “Masih ada materi inti yang belum dikuasai.” |
| `READINESS_DOMAIN_FLOOR_NOT_MET` | “Salah satu area ujian masih di bawah batas kesiapan.” |
| `READINESS_SIMULATION_COUNT_INSUFFICIENT` | “Kamu masih perlu menyelesaikan simulasi lain yang berbeda.” |
| `READINESS_CRITICAL_WEAKNESS_ACTIVE` | “Ada kelemahan penting yang perlu diselesaikan sebelum status siap diberikan.” |
| `READINESS_PROFILE_INCOMPLETE` | “Standar kesiapan level ini belum tersedia.” |

UI menampilkan alasan dan next action, bukan formula mentah, kecuali pada layar audit internal.

## 26. Kepemilikan Keputusan

| Sistem/peran | Kepemilikan |
| --- | --- |
| Tim akademik | KC, dimensi, requiredness proposal, evidence breadth, misconception taxonomy, validity akademik |
| Product Owner | Persetujuan akhir policy, scope produk, readiness behavior, dan konflik lintas-tim |
| Curriculum service | Graph, outcome, unit/stage, level profile reference, version |
| Content Bank | Item, answer/rubric, attribution, difficulty, status, content coverage |
| Practice Engine | Eksekusi, normalization, evaluation, candidate evidence |
| Assessment service | Placement/checkpoint/simulation assembly dan raw score |
| Learning/Mastery Engine | Evidence validation, mastery, retention, aggregation, gate/readiness decision |
| Data/Analytics | Calibration analysis tanpa mutasi policy otomatis |
| AI | Candidate diagnosis/feedback terstruktur dalam batas approved taxonomy/rubric |

## 27. Peran AI

AI boleh:

- mengklasifikasikan kandidat misconception ke taxonomy approved;
- mengevaluasi jawaban semi-terbuka terhadap rubric versioned;
- memilih approved feedback blocks;
- merangkum pola evidence tanpa mengubah hasil;
- membantu analisis calibration secara offline;
- mengusulkan perubahan policy untuk human review.

AI tidak boleh:

- membuat KC, dimensi, prerequisite, requiredness, atau weight baru saat runtime;
- mengubah correctness, accepted answer, atau attribution di luar rubric;
- memberi mastery credit tanpa evidence;
- mengubah threshold, formula, cap, atau interval;
- menetapkan status, membuka gate, atau menerbitkan readiness;
- mengisi profil N4–N1 dengan asumsi otomatis;
- mempublikasikan konten atau policy.

AI outage menghasilkan deterministic/static fallback atau `evaluation_pending`. Evidence yang belum aman dinilai tidak mengubah mastery.

## 28. Versioning, Recalculation, dan Migrasi

Version wajib dicatat untuk:

- curriculum dan inventory;
- item/content pack serta asset;
- assessment blueprint;
- mastery policy;
- LevelMasteryProfile;
- attribution/evidence policy;
- rubric/evaluator;
- misconception/remedial taxonomy;
- explanation template.

Kategori perubahan:

| Jenis | Contoh |
| --- | --- |
| Major | Formula, status meaning, KC split/merge, required set, readiness semantics berubah |
| Minor | Evidence type, dimension, approved variant, atau level profile capability ditambah secara kompatibel |
| Patch | Typo/metadata yang tidak mengubah hasil, jawaban, atau interpretasi evidence |

Migration plan wajib menentukan:

1. learner, KC, evidence, dan snapshot yang terdampak;
2. old/new versions;
3. mapping split, merge, requiredness, dan weight;
4. recalculation algorithm;
5. perubahan review due date, gate, dan readiness;
6. preservation atas history lama;
7. komunikasi jika progress pengguna berubah;
8. validation fixtures;
9. rollback criteria dan procedure;
10. approver.

Recalculation menggunakan raw structured evidence. History lama tetap dapat direproduksi dengan versi sebelumnya.

## 29. Concurrency dan Konsistensi

- Learner state memiliki monotonic revision.
- Update hanya diterapkan jika expected revision cocok.
- Event diproses idempotently berdasarkan `event_id`.
- Event lintas-perangkat diurutkan menggunakan `occurred_at`, lalu server receipt sebagai tie-breaker.
- Recalculation harus deterministic untuk evidence serta versions yang sama.
- Aggregate/gate/readiness snapshot menunjuk revision KC yang digunakan.
- Stale snapshot tidak boleh diterbitkan sebagai status terbaru.
- Policy update tidak memutasi run aktif atau evidence lama secara diam-diam.

## 30. Failure dan Fallback

| Kondisi | Perilaku aman |
| --- | --- |
| Policy/profile tidak tersedia | Jangan hitung status baru; gunakan snapshot valid terakhir dengan label stale atau unavailable |
| N4–N1 profile belum lengkap | `profile_incomplete`; readiness tidak diterbitkan |
| Item/version/rubric hilang | Reject/non-mastery evidence |
| Evidence duplikat | Abaikan update kedua; kembalikan idempotency result |
| AI evaluator gagal | Static evaluator/feedback atau evaluation pending |
| Ambiguitas jawaban | Jangan memberi penalty sebelum adjudication |
| Content dikarantina | Hentikan penggunaan baru; jangan retroaktif menghukum learner |
| Supporting mapping tidak valid | Abaikan supporting attribution; pertahankan audit issue |
| Aggregate denominator kosong | Status unavailable, bukan `0` atau `100%` |
| Migration gagal | Rollback ke snapshot/version terakhir yang tervalidasi |
| Audio/transcript berubah konstruk | Reject Listening evidence |
| Offline timestamp meragukan | Simpan event; beri timing confidence; verifikasi delayed eligibility |

Sistem fail closed untuk mastery, gate, dan readiness; kegagalan teknis tidak menjadi jawaban salah.

## 31. Security dan Privacy

- seluruh learner/mastery endpoint membutuhkan authorization;
- raw response disimpan hanya sesuai retention policy;
- analytics menggunakan pseudonymous learner ID;
- explanation pengguna tidak membocorkan answer key assessment;
- evaluator AI menerima context minimum, tanpa secret atau akses network/tool;
- learner tidak dapat mengirim status, signal weight, primary KC, atau readiness result dari client sebagai kebenaran;
- signed/versioned source digunakan untuk assessment berdampak tinggi;
- deletion/export policy memisahkan data personal dari agregat audit yang sah;
- log tidak menyimpan token, secret, atau data sensitif yang tidak diperlukan.

## 32. Accessibility dan Fairness

- response time tidak menjadi penalti mastery pada v1;
- screen reader reading time tidak dihitung sebagai kemampuan bahasa;
- keyboard alternative tidak boleh menurunkan evidence jika konstruk tetap sama;
- accommodation yang mengubah konstruk memberi evidence class berbeda atau non-mastery;
- transcript sebelum respons tidak menghasilkan Listening evidence;
- romaji setelah policy melarangnya menurunkan independence atau membuat evidence tidak valid;
- font/glyph/audio failure bukan learner error;
- domain aggregate tidak membandingkan learner secara kompetitif;
- calibration dianalisis lintas device, modality, accommodation, dan kelompok relevan untuk mendeteksi bias item;
- keputusan readiness tidak boleh menggunakan demografi sebagai feature.

## 33. Content Masterability Contract

Sebuah required KC hanya boleh dipublikasikan sebagai target aktif jika content pool menyediakan:

1. minimal tiga direct encounters substantif;
2. minimal dua evidence types sesuai domain;
3. delayed-evidence-eligible item berbeda;
4. variation pada context, option position, speaker, passage, atau target word sesuai domain;
5. satu independent retrieval tanpa answer reveal;
6. misconception/distractor rationale;
7. remedial content atau prerequisite route;
8. answer/rubric, attribution, rights, accessibility, dan version lengkap;
9. coverage untuk modality yang didukung atau explicit unavailable behavior;
10. validation fixtures.

Pipeline harus gagal jika required KC secara teoritis ada tetapi tidak mungkin mencapai `mastered` karena content pool tidak cukup.

## 34. Observability dan Calibration

### 34.1 Engine health

- evidence accepted/rejected/duplicate rate;
- mastery calculation latency/failure;
- state revision conflict;
- stale snapshot rate;
- policy/profile load failure;
- recalculation/migration/rollback failure;
- percentage decision dengan reason code;
- evaluation pending dan adjudication age.

### 34.2 Learning quality

- delayed retention per domain, dimension, dan interval;
- encounter median menuju provisional/mastered;
- review success dan lapse rate;
- misconception recurrence/recovery;
- prerequisite failure per edge;
- weighted mastery dan retention coverage;
- domain floor failure;
- readiness false-positive/false-negative setelah outcome eksternal tersedia;
- item difficulty drift dan content-gap rate.

### 34.3 Calibration protocol

Perubahan policy harus:

1. menyatakan hipotesis dan metrik keberhasilan;
2. dibandingkan dengan baseline v1 menggunakan historical replay atau controlled experiment;
3. mengukur retention, bukan hanya completion;
4. menjalani fairness dan academic review;
5. menyimpan proposed version dan rollback;
6. mendapat persetujuan Product Owner sebelum produksi.

## 35. Guardrail

- Jangan menaikkan mastery dari exposure, XP, streak, atau completion.
- Jangan menurunkan threshold agar target kalender terlihat tercapai.
- Jangan membiarkan aggregate menutupi terminal prerequisite atau critical weakness.
- Jangan menggunakan response time sebagai proxy kemampuan tanpa policy/calibration baru.
- Jangan menganggap due date terlewati sebagai forgetting yang telah terbukti.
- Jangan menjadikan seluruh Vocabulary otomatis required hanya karena berada pada inventory.
- Jangan menggunakan supporting/enrichment untuk menggelembungkan readiness.
- Jangan mengaktifkan readiness level yang profilnya belum lengkap.
- Jangan mengubah difficulty, weight, atau requiredness otomatis dari analytics.
- Jangan menyebut readiness sebagai jaminan lulus.

## 36. Acceptance Criteria

### 36.1 Evidence dan KC

1. Exposure/completion tidak mengubah mastery.
2. Duplicate event tidak diterapkan dua kali.
3. Hint, attempt, activity, difficulty, attribution, dan confidence memengaruhi evidence sesuai policy.
4. Supporting evidence tidak memenuhi sufficiency sendiri.
5. Tiga direct encounters dan breadth yang cukup dapat menghasilkan `provisional`.
6. `mastered` memerlukan qualifying delayed evidence minimal tujuh hari.
7. Waktu tanpa evidence tidak menurunkan status.
8. Critical misconception mengaktifkan cap dan remedial.
9. Dimensi diagnostik menjelaskan gap tanpa menggantikan KC status.
10. Input dan versions yang sama menghasilkan state dan hash yang sama.

### 36.2 Domain

1. Sound/Kana tidak dapat mastered dari romaji, tracing, atau exposure.
2. Vocabulary memerlukan bukti sense/context, bukan translation card saja.
3. Kanji memerlukan reading dalam word; handwriting/stroke order tidak wajib.
4. Grammar memerlukan form/application; recognition fungsi saja tidak cukup.
5. Reading menggunakan passage baru dan tidak menggandakan encounter per question.
6. Listening menggunakan audio tanpa transcript dan tidak menggandakan encounter per replay.
7. Seluruh domain memiliki taxonomy KC, evidence breadth, misconception, dan transfer requirement.

### 36.3 Aggregation dan readiness

1. Hanya required KC menjadi denominator readiness.
2. Weighted aggregates dapat direproduksi dari KC states dan LevelMasteryProfile.
3. Missing evidence menurunkan coverage, bukan dianggap score sempurna/nol secara diam-diam.
4. Terminal hard prerequisite dan critical weakness menjadi veto.
5. Domain di bawah floor tidak dapat ditutupi domain lain.
6. N5 Ready gagal jika satu syarat wajib tidak terpenuhi.
7. N4–N1 menghasilkan `profile_incomplete` sampai profile disetujui.
8. UI tidak menampilkan readiness sebagai scaled score atau jaminan lulus.

### 36.4 Reliability, governance, dan safety

1. Raw evidence memungkinkan recalculation lintas policy version.
2. Migration mempertahankan history dan mempunyai rollback.
3. Stale revision tidak menimpa state terbaru.
4. AI outage tidak menghasilkan mastery penalty atau keputusan baru.
5. Kegagalan teknis/modality tidak dianggap jawaban salah.
6. Required KC tanpa content pool cukup gagal dipublikasikan.
7. Seluruh perubahan production memiliki approver dan decision log.
8. Accessibility accommodation tidak diam-diam mengubah konstruk.

## 37. Test Fixtures Minimum

Implementasi wajib mempunyai fixture untuk:

1. tiga jawaban kuat satu tipe saja → tetap belum provisional karena breadth;
2. tiga direct encounters dua tipe, score ≥0,85, tanpa delayed evidence → provisional;
3. delayed evidence hari ke-6 → tidak qualifying;
4. delayed evidence hari ke-7 dengan signal ≥0,80 → mastered;
5. delayed probe gagal → confirmation/needs_review sesuai rule;
6. satu jawaban salah biasa → tidak langsung kehilangan mastery;
7. critical misconception → score cap 0,69;
8. supporting-only evidence → maksimum learning;
9. passage tiga question → tiga events, satu encounter;
10. replay audio dua kali → tetap satu encounter;
11. transcript reveal sebelum jawab → non-mastery Listening;
12. duplicate event dan duplicate submission → satu update;
13. missing/ambiguous evaluation → no mastery change;
14. weighted aggregation dengan required/supporting/enrichment;
15. high aggregate tetapi terminal prerequisite gagal → gate/readiness gagal;
16. N5 dua simulations tetapi satu section floor gagal → not ready;
17. N4 profile belum lengkap → readiness unavailable;
18. policy migration dan rollback menghasilkan history yang dapat direproduksi;
19. content quarantine tidak menghukum evidence learner secara retroaktif;
20. keyboard/accommodation equivalent menghasilkan evidence semantics yang sama.

## 38. Implementasi Bertahap

### Phase 1 — Mastery core

- MasteryPolicy dan LevelMasteryProfile schema;
- immutable evidence ingestion dan validation;
- KC calculation, status, confidence, dan review schedule;
- misconception cap;
- deterministic decision log;
- fixture policy v1.

### Phase 2 — Domain dan aggregation

- dimension mapping seluruh domain;
- Reading/Listening KC taxonomy registry;
- weighted outcome/unit/stage/domain aggregates;
- required/supporting/enrichment classification;
- content masterability validator;
- gate integration.

### Phase 3 — Readiness dan governance

- N5 readiness profile dan simulation integration;
- audit dashboard dari item → evidence → KC → aggregate → readiness;
- migration/recalculation/rollback tooling;
- calibration dashboard dan historical policy replay;
- fairness/accessibility monitoring;
- workflow persetujuan Product Owner.

N4–N1 ditambahkan dengan profile dan artefak akademik masing-masing; bukan dengan menyalin konfigurasi N5.

## 39. Definition of Done

Spesifikasi siap diimplementasikan penuh jika tersedia:

1. schema versioned untuk seluruh entitas Bagian 23;
2. registry KC dan diagnostic dimensions per domain;
3. klasifikasi required/supporting/enrichment untuk inventory target;
4. LevelMasteryProfile N5 lengkap;
5. taxonomy KC Reading dan Listening N5 yang direview akademik;
6. evidence breadth serta transfer blueprint setiap required KC;
7. misconception dan remedial taxonomy;
8. content pool yang memenuhi Content Masterability Contract;
9. assessment specification untuk placement, checkpoint, dan simulation;
10. automated fixtures seluruh acceptance criteria;
11. audit, observability, recalculation, migration, dan rollback tooling;
12. privacy, security, accessibility, dan fairness review;
13. approval Product Owner.

## 40. Pertanyaan yang Divalidasi melalui Data

- Apakah formula `0,55/0,15/0,15/0,15` memprediksi retensi 30/60 hari?
- Apakah minimal tiga encounters dan dua evidence types sesuai untuk seluruh domain?
- Apakah supporting attribution `0,35` membantu diagnosis tanpa mastery inflation?
- Apakah multiplier prerequisite dan exam relevance menghasilkan aggregate yang stabil?
- Berapa minimum retention coverage yang tepat per domain N5?
- Apakah label dimensi `weak/developing/strong` menghasilkan remedial yang lebih tepat?
- Apakah interval review perlu berbeda per domain atau level?
- KC Reading/Listening mana yang terlalu luas dan perlu dipecah?
- Apakah threshold N5 Ready cukup konservatif terhadap hasil ujian yang dilaporkan?
- Apakah validity window simulation 90 hari dan retention evidence 60 hari paling prediktif?

Jawaban berbasis data harus menghasilkan proposal versi, review akademik, evaluasi fairness, dan persetujuan Product Owner. Engagement saja tidak cukup untuk mengubah standar penguasaan.

## 41. Keputusan yang Belum Boleh Diisi dengan Asumsi

- jumlah serta daftar required KC N4–N1;
- threshold/domain floor N4–N1;
- profile teks, audio, inference, dan timing N4–N1;
- simulation assembly dan validity window final N4–N1;
- minimum retention coverage level N4–N1;
- jumlah required dari 900 Vocabulary N5 sampai inventory lengkap direview;
- mapping rinci KC Reading/Listening ke 190/210 learning objects;
- calibration akhir bobot weighted aggregation.

Nilai tersebut harus tetap eksplisit sebagai `TBD` atau `profile_incomplete`; sistem tidak boleh memakai default tersembunyi.
