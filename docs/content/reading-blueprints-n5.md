# Reading Blueprints N5 — Spesifikasi Konten

**Status:** Draft v0.1  
**Audiens:** Product, akademik, content operations, data, AI, design, dan engineering  
**Cakupan:** Pemula absolut hingga kesiapan JLPT N5  
**Bahasa penjelasan:** Bahasa Indonesia  
**Tanggal:** 13 September 2026

## 1. Tujuan Dokumen

Dokumen ini mendefinisikan 190 learning objects Reading Nekoru: kategori stimulus, ceiling bahasa, metadata keterbacaan, jenis pertanyaan, evidence attribution, authoring, aksesibilitas, dan validasi. Satu learning object adalah satu stimulus tervalidasi beserta objective, pertanyaan, jawaban, rasional, dan metadata; variasi pertanyaan atas stimulus yang sama bukan objek baru.

Dokumen ini melengkapi [Arsitektur Kurikulum](../product-specs/curriculum-architecture.md), [Mastery Specification](../product-specs/mastery-specification.md), [Learning Engine](../product-specs/learning-engine.md), serta inventory Vocabulary, Kanji, dan Grammar di folder ini.

## 2. Keputusan Utama

| Area | Keputusan |
| --- | --- |
| Baseline MVP | 190 reading objects |
| Unit penghitungan | Satu stimulus, bukan jumlah pertanyaan |
| Coverage instruksional | Idealnya minimal 90% lexical coverage dari target yang sudah dikenal |
| Format resmi N5 | Short passage, mid-size passage, dan information retrieval |
| Format fondasi internal | Decoding, frasa, dan kalimat tunggal |
| Panjang acuan | Sekitar 80 karakter untuk short dan 250 karakter untuk mid-size/material fungsional |
| Timed practice | Wajib baru pada S5 |
| Diagnosis | Pisahkan decoding, Vocabulary, Grammar, dan comprehension bila memungkinkan |
| Copyright | Stimulus harus original, berlisensi, public domain, atau memiliki izin |

## 3. Outcome dan Landasan

Pada N5, pengguna diharapkan memahami ungkapan serta kalimat umum yang ditulis dengan hiragana, katakana, dan Kanji dasar. Blueprint Nekoru juga menggunakan orientasi Can-do: teks dipilih untuk menyelesaikan tugas bermakna, bukan hanya menguji jumlah kata yang dihafal.

Target internal:

- mendekode kana dan ortografi dasar tanpa romaji setelah gate S0;
- memahami kalimat tentang topik harian;
- menemukan informasi eksplisit;
- mengikuti referensi dan alur pendek;
- memilih tindakan berdasarkan notice, jadwal, menu, pesan, atau petunjuk sederhana.

## 4. Taxonomy dan Distribusi

| Primary category | Target | Tujuan |
| --- | ---: | --- |
| Decoding aksara dan ortografi | 46 | Kana, bunyi panjang, sokuon, yoon, campuran |
| Frasa serta kalimat tunggal | 40 | Makna lokal dan struktur dasar |
| Teks pendek hingga sekitar 80 karakter | 45 | Detail, topik, referensi sederhana |
| Teks menengah hingga sekitar 250 karakter | 25 | Urutan, key point, intent sederhana |
| Material fungsional dan information retrieval | 24 | Notice, menu, jadwal, pesan, formulir |
| Bacaan campuran dan timed practice | 10 | Integrasi serta kesiapan format |
| **Total** | **190** | |

Genre tags: message, email, notice, sign, menu, schedule, advertisement, classroom_instruction, diary, profile, short_narrative, description, conversation_text, form, map_label.

Comprehension type: decoding, local_detail, main_point, reference, sequence, inference_low, action_selection, information_retrieval, text_flow.

## 5. Model Learning Object

~~~text
ReadingObject
├── Stimulus
├── LearningObjective[]
├── LanguageProfile
├── SupportPolicy
├── Question[]
│   ├── AnswerKey
│   ├── Rationale
│   └── DiagnosticMapping
└── RightsAndAttribution
~~~

Semua pertanyaan pada stimulus berbagi encounter_id. Masing-masing jawaban menghasilkan evidence event terpisah. Stimulus tidak boleh dihitung berulang hanya karena question set atau urutan pilihan diubah.

## 6. Kontrak Data

### 6.1 ReadingObject

| Field | Tipe | Wajib | Aturan |
| --- | --- | --- | --- |
| id | string | Ya | CONTENT.N5.READING.{CATEGORY}.{NNN} |
| object_version | semver | Ya | Versi stimulus dan question set |
| curriculum_version | semver | Ya | Versi kompatibel |
| content_pack_id | string | Ya | Pack pemilik |
| title_internal | string | Ya | Tidak harus tampil ke learner |
| primary_category | enum | Ya | Tepat satu |
| genre | enum | Ya | Bagian 4 |
| comprehension_types | enum[] | Ya | Minimal satu |
| stage_id, unit_id | string | Ya | Penempatan pertama |
| learning_outcome_ids | string[] | Ya | Minimal satu |
| stimulus | object | Ya | Bagian 6.2 |
| language_profile | object | Ya | Bagian 6.3 |
| support_policy | object | Ya | Bagian 7 |
| questions | array | Ya | Minimal satu |
| difficulty_band | enum | Ya | easy, target, stretch |
| estimated_seconds | integer | Ya | Waktu aktif, bukan batas tes |
| timed_policy | enum | Ya | untimed, soft_target, fixed |
| prerequisites | array | Ya | hard/soft/co-requisite |
| source_rationale | object | Ya | Scope dan authenticity |
| rights | object | Ya | owner, license, source |
| attribution | object | Ya | Author, AI, reviewer |
| status | enum | Ya | Lifecycle Bagian 13 |
| created_at, updated_at | datetime | Ya | ISO 8601 |

### 6.2 Stimulus

| Field | Wajib | Keterangan |
| --- | --- | --- |
| text_ja | Ya | Teks Jepang final |
| normalized_text_ja | Ya | Unicode NFC untuk analytics |
| display_blocks | Ya | Paragraph, line, table, label, atau list |
| character_count | Ya | Hitung karakter Jepang setelah aturan normalisasi |
| token_count | Ya | Berdasarkan tokenizer_version |
| asset_refs | Kondisional | Gambar/layout material fungsional |
| alt_text_id | Kondisional | Untuk aset non-dekoratif, tanpa membocorkan jawaban |
| layout_required | Ya | Apakah struktur visual bagian dari tugas |
| tokenizer_version | Ya | Agar metrik dapat direproduksi |

Character count mengecualikan markup dan metadata, tetapi mencakup tanda baca Jepang. Furigana tidak dihitung sebagai body text terpisah.

### 6.3 LanguageProfile

| Field | Keterangan |
| --- | --- |
| vocabulary_kc_ids | Semua vocabulary bermakna pada stimulus |
| grammar_kc_ids | Semua grammar relevan |
| kanji_kc_ids | Semua Kanji target |
| known_lexeme_count | Token yang diasumsikan sudah dikenal pada unit |
| total_lexeme_count | Penyebut coverage |
| lexical_coverage | known / total |
| unknown_supported | Target belum dikenal yang diberi gloss/visual |
| unknown_unsupported | Harus nol pada scored checkpoint kecuali blueprint mengizinkan |
| kanji_density | Proporsi karakter Kanji terhadap karakter linguistik |
| grammar_ceiling | KC grammar tertinggi yang diperlukan |
| sentence_count | Jumlah kalimat |
| discourse_features | Connective, reference, sequence |

### 6.4 Question

Setiap question menyimpan question_id, type, prompt_id, option_ids, answer_key, rationale_id, primary_kc_id, supporting_kcs, diagnostic_confidence, misconception_tags, difficulty_band, hint_policy, dan scoring_policy.

## 7. Support dan Display Policy

- Romaji hanya tersedia sesuai policy U01–U03 dan tidak menjadi default mulai U04.
- Furigana dapat diberikan pada Kanji non-target atau saat mode belajar mengizinkan.
- Furigana disembunyikan jika reading Kanji menjadi target langsung.
- Gloss hanya diberikan untuk unknown_supported dan tidak boleh menyelesaikan pertanyaan.
- Translation penuh tidak tampil sebelum respons.
- Highlight struktur, paragraph marker, atau ilustrasi boleh dipakai saat belajar, tetapi checkpoint mengikuti blueprint.
- Aksesibilitas tidak boleh mengubah konstruk; alt text untuk gambar soal harus mendeskripsikan informasi non-kunci atau memakai alternatif yang telah divalidasi.

## 8. Blueprint per Kategori

| Kategori | Stage | Panjang baseline | Coverage | Question fokus |
| --- | --- | --- | --- | --- |
| Decoding | S0 | 1–20 karakter | N/A | sound–script, boundary, orthography |
| Frasa/kalimat | S0–S2 | 5–50 karakter | ≥95% | local meaning, predicate, particle |
| Short passage | S2–S5 | sekitar 40–100 karakter | ≥90% belajar; ≥95% checkpoint | detail, topic, reference |
| Mid-size passage | S3–S5 | sekitar 160–300 karakter | ≥90% belajar; ≥95% checkpoint | key point, sequence, intent |
| Information retrieval | S2–S5 | sampai sekitar 300 karakter visual/text | ≥90% | locate, compare, choose action |
| Mixed/timed | S5 | Sesuai assembly | Tanpa gloss target | Kombinasi format N5 |

Rentang internal adalah baseline authoring, bukan klaim batas resmi yang kaku. Kesesuaian difficulty lebih penting daripada memaksa jumlah karakter.

## 9. Question Types dan Evidence

| Question type | Primary construct | Weight |
| --- | --- | ---: |
| script_decoding | Decoding | 1,00 |
| explicit_detail | Reading comprehension | 0,90 |
| main_point | Reading comprehension | 0,90 |
| reference_resolution | Text relation | 0,90 |
| sequence_order | Text flow | 0,90 |
| low_inference | Comprehension | 0,90 |
| information_lookup | Information retrieval | 1,00 |
| action_selection | Task completion | 0,90 |
| vocabulary_in_context | Vocabulary | 0,90 |
| grammar_in_text | Grammar/text flow | 0,90 |

Aturan attribution:

- pertanyaan comprehension memiliki primary Reading KC;
- Vocabulary/Grammar/Kanji menjadi supporting KC bila kegagalan dapat didiagnosis dari pertanyaan;
- pertanyaan vocabulary_in_context atau grammar_in_text boleh menjadikan domain tersebut primary;
- incidental exposure tidak menerima mastery credit;
- diagnostic confidence di bawah 0,50 tidak mengubah mastery.

## 10. Authoring Workflow

1. Pilih outcome, unit, genre, dan real-world task.
2. Tetapkan language profile serta ceiling sebelum menulis.
3. Buat stimulus original atau pastikan rights.
4. Jalankan token, coverage, Kanji density, dan prerequisite checks.
5. Tulis pertanyaan yang mengukur objective, bukan trivia.
6. Buat answer key, rationale, distractor rationale, dan diagnostic mapping.
7. Lakukan linguistic, assessment, accessibility, dan technical review.
8. Uji pada layout sempit/lebar serta font Jepang target.
9. Publikasikan hanya melalui approved content pack.

Aturan stimulus:

- topik dekat dengan kehidupan harian, kelas, keluarga, belanja, tempat, jadwal, dan rutinitas;
- nama dan detail budaya tidak boleh menjadi pengetahuan prasyarat;
- gunakan discourse alami, bukan kumpulan kalimat yang dipaksakan;
- informasi yang diperlukan harus berada pada stimulus;
- materi fungsional mempertahankan layout yang diperlukan untuk retrieval;
- jangan menyalin soal resmi atau buku komersial.

## 11. Distractor dan Diagnosis

Distractor classes:

- copied_wrong_detail;
- nearby_information;
- reversed_relation;
- wrong_reference;
- wrong_sequence;
- lexical_confusion;
- grammar_scope_error;
- plausible_outside_text;
- wrong_action.

Distractor harus dapat ditolak dari teks. “Plausible outside text” berguna untuk mendiagnosis pengguna yang menjawab dari pengetahuan dunia, tetapi tidak boleh ambigu. Setiap distractor memiliki rationale internal.

## 12. Difficulty dan Timed Policy

Difficulty mempertimbangkan panjang, lexical coverage, Kanji density, grammar ceiling, jumlah referent, kepadatan informasi, layout, inference, dan jumlah langkah retrieval.

- easy: informasi eksplisit, satu lokasi, coverage tinggi;
- target: beberapa detail atau relasi sesuai unit;
- stretch: integrasi/transfer dengan ceiling tetap terkendali.

Timed policy:

- S0–S4 default untimed;
- soft_target memberi estimasi tanpa menghentikan respons;
- fixed hanya pada S5 checkpoint/simulation;
- response time adalah calibration/fatigue signal, bukan penalti mastery langsung.

## 13. Validasi dan Lifecycle

~~~text
draft → academic_review → revision_required → approved → published
                                      └──────→ rejected
published → deprecated
~~~

Validasi minimum:

- bahasa Jepang akurat, alami, dan sesuai register;
- lexical coverage serta grammar/Kanji ceiling dapat direproduksi;
- answer key tunggal atau equivalence set eksplisit;
- pertanyaan tidak dapat dijawab hanya dari clue format;
- rationale menjelaskan bukti dalam teks;
- distractor diagnostik dan tidak ambigu;
- layout, furigana, line wrapping, dan font lolos QA;
- rights dan attribution lengkap;
- primary/supporting KC tersedia dan compatible.

Pipeline gagal jika object tanpa question, answer key/rationale hilang, unknown_unsupported melanggar blueprint, ID putus, character count tidak cocok, atau status published tanpa approval.

## 14. Versioning

- **Major:** stimulus/objective berubah sehingga encounter lama tidak ekuivalen.
- **Minor:** question set atau support variant ditambah tanpa mengubah stimulus/objective.
- **Patch:** typo/layout yang tidak mengubah interpretasi atau jawaban.

Perubahan body stimulus, answer key, grammar ceiling, atau informasi visual kunci membuat versi baru. Evidence lama tetap menunjuk object_version yang diberikan.

## 15. Contoh Representasi

~~~yaml
id: CONTENT.N5.READING.INFO.001
object_version: 0.1.0
curriculum_version: 1.0.0
content_pack_id: PACK.N5.S02.U12
title_internal: jam_buka_toko
primary_category: material_fungsional_dan_information_retrieval
genre: notice
comprehension_types: [information_retrieval, action_selection]
stage_id: S2
unit_id: U12
learning_outcome_ids: [LO.N5.READING.INFO.001]
stimulus:
  text_ja: |
    みどりスーパー
    月よう日〜土よう日　9:00〜20:00
    日よう日　10:00〜18:00
  normalized_text_ja: "みどりスーパー\n月よう日〜土よう日　9:00〜20:00\n日よう日　10:00〜18:00"
  display_blocks: [heading, schedule_rows]
  character_count: 47
  token_count: 12
  layout_required: true
  tokenizer_version: jp-tokenizer-1.0.0
language_profile:
  lexical_coverage: 1.0
  unknown_supported: []
  unknown_unsupported: []
  kanji_density: 0.10
  grammar_ceiling: KC.N5.GRAMMAR.TIME.RANGE
  sentence_count: 0
  discourse_features: [schedule_range]
support_policy:
  furigana: adaptive_non_target
  full_translation_before_answer: false
questions:
  - question_id: Q.INFO.001
    type: information_lookup
    prompt_id: Minggu_pukul_berapa_toko_mulai_buka
    option_ids: [OPT.8, OPT.9, OPT.10, OPT.20]
    answer_key: OPT.10
    rationale_id: baris_hari_Minggu_menunjukkan_10_00
    primary_kc_id: KC.N5.READING.INFO.SCHEDULE
    supporting_kcs:
      - kc_id: KC.N5.VOCAB.TIME.SUNDAY
        diagnostic_confidence: 0.75
    difficulty_band: target
difficulty_band: target
estimated_seconds: 60
timed_policy: untimed
rights:
  owner: Nekoru
  license: proprietary_original
status: draft
~~~

Nilai character_count contoh harus dihitung ulang oleh validator; angka authoring manual tidak menjadi sumber kebenaran.

## 16. Acceptance Criteria

1. Tepat 190 primary objects tersedia pada rilis penuh dengan distribusi sesuai kurikulum.
2. Setiap object memiliki objective, stimulus, language profile, question, answer, dan rationale.
3. Semua format resmi N5 Reading terwakili.
4. Instructional object memenuhi coverage atau mendokumentasikan dukungan untuk target baru.
5. Checkpoint tidak memiliki unknown_unsupported yang tidak diizinkan.
6. Multi-question stimulus dihitung sebagai satu encounter stimulus.
7. Diagnosis lintas-domain menggunakan mapping approved, bukan inferensi runtime bebas.
8. Timed practice hanya diwajibkan di S5.
9. Rights dan accessibility metadata lengkap.
10. Validator dapat mereproduksi length, coverage, dan reference integrity.

## 17. Metrik dan Pertanyaan Terbuka

Metrik: comprehension per category, error source, time-on-text, reread/hint rate, coverage drift, distractor efficiency, item ambiguity report, dan delayed retention.

Pertanyaan MVP:

- Apakah threshold 90% coverage cukup untuk menjaga flow pelajar Indonesia?
- Panjang dan density mana yang lebih memprediksi difficulty aktual?
- Dukungan furigana seperti apa yang membantu tanpa mengubah konstruk?
- Berapa pertanyaan optimal per stimulus agar diagnosis cukup tetapi fatigue rendah?

## 18. Referensi

- [JLPT — N5 Linguistic Competence](https://www.jlpt.jp/e/about/levelsummary.html)
- [JLPT — Composition of Test Sections and Items](https://www.jlpt.jp/e/guideline/testsections.html)
- [JLPT — N5 Purposes of Test Items](https://www.jlpt.jp/e/guideline/pdf/n5_e_revised.pdf)
- [JLPT — Official Sample Questions](https://www.jlpt.jp/e/samples/forlearners.html)
- [JF Standard — Overview dan Can-do](https://www.jfstandard.jpf.go.jp/summaryen/ja/render.do)
- [Irodori — Starter A1](https://www.irodori.jpf.go.jp/en/starter/pdf.html)

Referensi diperiksa pada 13 September 2026. Panjang sekitar 80 dan 250 karakter mengikuti purpose resmi sebagai acuan, bukan batas authoring absolut.
