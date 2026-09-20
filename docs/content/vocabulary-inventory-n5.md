# Vocabulary Inventory N5 — Spesifikasi Konten

**Status:** Draft v0.1  
**Audiens:** Product, akademik, content operations, data, AI, dan engineering  
**Cakupan:** Pemula absolut hingga kesiapan JLPT N5  
**Bahasa penjelasan:** Bahasa Indonesia  
**Tanggal:** 13 September 2026

## 1. Tujuan Dokumen

Dokumen ini mendefinisikan kontrak inventory Vocabulary Nekoru. Inventory berisi keputusan akademik tentang unit leksikal yang diajarkan; body pelajaran, soal, audio, gambar, dan feedback berada di content bank serta direferensikan melalui ID.

Dokumen ini melengkapi:

- [Product Overview](../product-specs/product-overview.md)
- [Arsitektur Kurikulum](../product-specs/curriculum-architecture.md)
- [Mastery Specification](../product-specs/mastery-specification.md)
- [Learning Engine](../product-specs/learning-engine.md)

Jika terjadi konflik, scope serta validitas akademik mengikuti Arsitektur Kurikulum; evidence dan perubahan mastery mengikuti Mastery Specification; sequencing serta runtime decision lainnya mengikuti Learning Engine.

## 2. Keputusan Utama

| Area | Keputusan |
| --- | --- |
| Baseline MVP | 900 unit leksikal internal tervalidasi |
| Unit penghitungan | Satu lemma–sense; bukan setiap ejaan atau bentuk infleksi |
| Otoritas level | Mapping internal berbasis fungsi, coverage, sumber resmi, dan review akademik |
| Konteks | Kata diperkenalkan dalam konteks sebelum atau bersamaan dengan retrieval terisolasi |
| Lokalisasi | Gloss, definisi, terjemahan harfiah, dan terjemahan komunikatif dipisahkan |
| Evidence | Bentuk, bunyi, makna, dan penggunaan dinilai sebagai bukti berbeda |
| Kanji | Ejaan berkanji dapat menjadi co-requisite; reading dinilai dalam kata |
| AI | Boleh membuat kandidat, tidak boleh menyetujui atau mempublikasikan |

JLPT tidak menerbitkan daftar Vocabulary/Kanji/Grammar resmi setelah revisi 2010. Karena itu, label N5 pada sebuah entry berarti “dipilih untuk kurikulum internal N5 Nekoru”, bukan klaim bahwa entry tersebut berasal dari daftar resmi JLPT.

## 3. Ruang Lingkup dan Batas

### 3.1 Termasuk

- lemma, sense, reading, orthography, part of speech, register, kategori, dan alasan pemilihan;
- unit/stage pertama, prerequisite, kaitan Kanji/Grammar, dan content coverage;
- tipe evidence, distractor policy, misconception tags, dan contoh penggunaan;
- status validasi, provenance, lisensi aset, versioning, dan deprecation.

### 3.2 Tidak termasuk

- daftar lengkap 900 entry pada versi dokumen ini;
- body lesson dan seluruh variasi soal;
- keputusan mastery atau scheduler;
- pitch accent sebagai syarat kelulusan;
- kemampuan produksi tulisan tangan.

## 4. Model Konseptual

~~~text
Lexeme
├── satu atau lebih Sense
├── satu atau lebih WrittenForm
├── satu CanonicalReading
├── ExampleRef[]
├── PrerequisiteRef[]
├── KanjiLink[]
└── EvidenceBlueprint
~~~

- **Lexeme** adalah lemma yang berfungsi sebagai kepala entry.
- **Sense** adalah makna yang dapat memiliki batas penggunaan berbeda. Dua makna yang membutuhkan pola penggunaan atau distractor berbeda harus menjadi sense terpisah.
- **WrittenForm** adalah representasi yang sah, misalnya kana, kanji, atau katakana.
- **Inflected form** tetap milik lemma yang sama dan tidak menambah total 900.
- Homofon dengan lemma atau makna berbeda wajib memiliki entry terpisah.

## 5. Taxonomy Inventory

Primary category bersifat eksklusif agar total dapat diaudit. Secondary tags boleh lebih dari satu.

| Primary category | Target | Contoh secondary tags |
| --- | ---: | --- |
| Orang, identitas, dan relasi | 90 | family, occupation, nationality |
| Angka, waktu, kalender, dan counter words | 90 | clock-time, date, quantity |
| Aktivitas harian, sekolah, dan pekerjaan | 135 | routine, classroom, workplace |
| Rumah, tempat, arah, dan transportasi | 135 | location, movement, public-place |
| Makanan, belanja, dan layanan | 135 | food, price, restaurant, service |
| Sifat, keadaan, perasaan, dan preferensi | 135 | adjective, emotion, preference |
| Verba tindakan berfrekuensi tinggi | 135 | motion, perception, transaction |
| Ungkapan fungsional, kelas, dan discourse dasar | 45 | greeting, repair, turn-taking |
| **Total** | **900** | |

Part of speech minimum:

- noun, proper_noun, pronoun, demonstrative;
- verb_u, verb_ru, verb_irregular;
- adjective_i, adjective_na;
- adverb, particle_like_expression, counter, conjunction;
- interjection, fixed_expression, prefix, suffix.

## 6. Kontrak Data

### 6.1 Field entry

| Field | Tipe | Wajib | Aturan |
| --- | --- | --- | --- |
| id | string | Ya | Pola KC.N5.VOCAB.{CATEGORY}.{NNN} |
| inventory_version | semver | Ya | Versi inventory yang memuat entry |
| lemma | string | Ya | Bentuk kamus kanonik |
| canonical_reading | string | Ya | Hiragana; katakana dipertahankan untuk loanword |
| written_forms | array | Ya | Minimal satu form; tepat satu preferred |
| senses | array | Ya | Minimal satu sense aktif |
| part_of_speech | enum | Ya | Mengikuti taxonomy Bagian 5 |
| inflection_class | enum/null | Ya | Wajib untuk verba/adjektiva |
| primary_category | enum | Ya | Tepat satu |
| secondary_tags | string[] | Ya | Boleh kosong |
| register | enum | Ya | neutral, polite, casual, formal, classroom, service |
| usage_constraints | object | Ya | Collocation, animacy, polarity, atau konteks |
| first_stage_id | string | Ya | S0–S5 |
| first_unit_id | string | Ya | U01–U24 |
| required | boolean | Ya | Memengaruhi readiness |
| prerequisites | array | Ya | hard, soft, atau co_requisite |
| kanji_links | array | Ya | Boleh kosong pada entry kana |
| grammar_links | string[] | Ya | Boleh kosong |
| examples | string[] | Ya | Minimal dua approved ExampleRef |
| evidence_blueprint | object | Ya | Jenis evidence dan minimum coverage |
| distractor_policy | object | Ya | Sumber distractor dan larangan |
| misconception_tags | string[] | Ya | Minimal satu untuk entry assessed |
| source_rationale | object | Ya | Alasan scope dan referensi |
| attribution | object | Ya | author, AI assistance, reviewer |
| status | enum | Ya | Lifecycle Bagian 12 |
| created_at, updated_at | datetime | Ya | ISO 8601 |

### 6.2 Field sense

| Field | Wajib | Keterangan |
| --- | --- | --- |
| sense_id | Ya | Stabil dan unik di dalam lexeme |
| gloss_id | Ya | Label singkat untuk UI |
| definition_id | Ya | Penjelasan batas makna dalam Bahasa Indonesia |
| literal_translation_id | Kondisional | Jika membantu memahami struktur |
| communicative_translation_id | Ya | Terjemahan alami sesuai konteks |
| semantic_domain | Ya | Tema makna |
| usage_notes_id | Ya | Perbedaan penting dengan Bahasa Indonesia |
| synonyms, antonyms, confusables | Ya | Array boleh kosong |
| required_collocations | Ya | Array boleh kosong |

### 6.3 Written form

Setiap form menyimpan text, script, preferred, valid_from_stage, display_policy, dan orthography_notes. Romaji hanya boleh muncul sebagai scaffolding U01–U02, dikurangi pada U03, dan bukan form jawaban utama setelah U03.

## 7. ID, Relasi, dan Prasyarat

- ID tidak boleh digunakan ulang setelah entry deprecated.
- Satu scored item wajib menunjuk tepat satu primary_kc_id.
- Sense yang benar-benar berbeda boleh menjadi KC terpisah walaupun lemma sama.
- hard prerequisite digunakan jika tanpa target tersebut soal menjadi tidak valid.
- co_requisite digunakan saat vocabulary dan ejaan Kanji diperkenalkan dalam unit yang sama.
- supporting KC harus dideklarasikan sebelum publikasi; bobot mengikuti Learning Engine.
- Link dua arah harus konsisten: kanji_links pada vocabulary harus ditemukan pada vocabulary_links Kanji.

## 8. Aturan Authoring

1. Gunakan bahasa Jepang alami dan konteks yang dapat dipahami pelajar Indonesia.
2. Hindari terjemahan satu-kata jika padanannya menutupi perbedaan penggunaan.
3. Contoh pertama menggunakan seluruh hard prerequisite yang sudah dikuasai atau diberi dukungan.
4. Minimal dua contoh mencakup variasi subjek, objek, waktu, atau situasi yang bermakna.
5. Nama, merek, budaya, dan pengetahuan dunia tidak boleh menjadi kunci jawaban.
6. Audio harus cocok dengan canonical_reading dan register entry.
7. Loanword harus menyimpan bahasa asal hanya sebagai provenance, bukan petunjuk jawaban.
8. Kata tabu, sensitif, atau berpotensi stereotip memerlukan sensitivity note.
9. Form yang jarang atau terlalu lanjut tidak ditampilkan sebagai target N5, tetapi dapat dicatat sebagai non_target_form.
10. AI-generated candidate wajib menjalani linguistic dan academic review manusia.

## 9. Activity dan Evidence Blueprint

| Activity type | Kemampuan utama | Activity weight | Dapat menjadi direct evidence |
| --- | --- | ---: | --- |
| meaning_recognition | Bentuk → makna | 0,75 | Ya, recognition |
| audio_meaning | Bunyi → makna | 0,90 | Ya |
| reading_recall | Bentuk → reading | 1,00 | Ya |
| orthography_selection | Kana → kanji/katakana | 1,00 | Ya |
| context_defined_meaning | Makna dalam kalimat | 0,90 | Ya |
| paraphrase_selection | Kedekatan makna | 0,90 | Ya |
| cloze_usage | Pemilihan kata sesuai constraint | 1,00 | Ya |
| guided_matching | Pengenalan terpandu | 0,50 | Tidak untuk breadth |
| exposure_card | Paparan | 0,00 | Tidak |

Sebelum sebuah KC dapat berstatus mastered, content pool harus memungkinkan sedikitnya:

- tiga encounter valid;
- dua tipe aktivitas;
- satu bukti penggunaan atau comprehension;
- satu delayed evidence setelah minimal tujuh hari;
- variasi item yang mencegah pengulangan jawaban identik.

## 10. Distractor dan Diagnosis

Distractor harus berasal dari salah satu kelas:

- semantic_neighbor;
- orthographic_neighbor;
- phonological_neighbor;
- register_mismatch;
- collocation_violation;
- wrong_inflection;
- Indonesian_transfer;
- prerequisite_error.

Distractor dilarang jika tidak alami, berada jauh di atas level tanpa alasan, memiliki dua jawaban masuk akal, atau hanya berbeda karena detail tipografi. Setiap distractor menyimpan misconception_tag dan rationale internal.

## 11. Difficulty dan Sequencing

Difficulty band adalah easy, target, atau stretch relatif terhadap unit. Penetapan mempertimbangkan:

- frekuensi dan kegunaan komunikatif;
- transparansi hubungan bentuk–makna;
- jumlah sense aktif dan confusability;
- panjang serta kompleksitas fonologis;
- beban orthography/Kanji;
- kompleksitas grammar pada contoh;
- prerequisite depth.

Satu entry tidak boleh diberi band hanya berdasarkan asumsi “kata N5”. Difficulty aktual dikalibrasi melalui error rate, response time, distractor distribution, dan delayed retention tanpa mengubah label otomatis.

## 12. Validasi dan Lifecycle

~~~text
draft → academic_review → revision_required → approved → published
                                      └──────→ rejected
published → deprecated
~~~

Checklist minimum:

- lemma, reading, ejaan, sense, POS, infleksi, dan register benar;
- bahasa Jepang alami dan lokalisasi Indonesia tidak menyesatkan;
- category, unit, prerequisite, dan difficulty masuk akal;
- contoh tidak mengalami prerequisite leakage;
- answer key tunggal dan distractor diagnostik;
- audio/gambar memiliki hak penggunaan dan metadata aksesibilitas;
- primary/supporting attribution eksplisit;
- reviewer akademik berbeda dari pembuat atau AI generator.

Publikasi gagal jika ID duplikat, reference putus, preferred form bukan satu, entry wajib tanpa approved item, atau item tidak mempunyai answer key/rationale.

## 13. Versioning dan Perubahan

- **Major:** definisi sense, target total, atau mapping KC berubah dan memerlukan migrasi mastery.
- **Minor:** entry, example, atau evidence type ditambah tanpa membatalkan evidence lama.
- **Patch:** typo, metadata, atau koreksi wording yang tidak mengubah jawaban.

Perubahan reading, meaning, atau answer key pada item published wajib membuat versi baru. Evidence lama tetap menunjuk versi yang pernah diberikan. Deprecation harus menyimpan replacement_id atau alasan tanpa pengganti.

## 14. Contoh Representasi

~~~yaml
id: KC.N5.VOCAB.ROUTINE.001
inventory_version: 0.1.0
lemma: 食べる
canonical_reading: たべる
written_forms:
  - text: 食べる
    script: mixed
    preferred: true
    valid_from_stage: S2
  - text: たべる
    script: hiragana
    preferred: false
    display_policy: scaffold_before_kanji_mastery
senses:
  - sense_id: SENSE.EAT.001
    gloss_id: makan
    definition_id: mengonsumsi makanan
    communicative_translation_id: makan
    semantic_domain: daily_activity
    usage_notes_id: digunakan untuk makanan, bukan minuman
    synonyms: []
    antonyms: []
    confusables: [飲む]
    required_collocations: []
part_of_speech: verb_ru
inflection_class: ichidan
primary_category: verba_tindakan_berfrekuensi_tinggi
secondary_tags: [food, routine]
register: neutral
first_stage_id: S2
first_unit_id: U09
required: true
prerequisites:
  - id: KC.N5.KANA.HIRAGANA.CORE
    type: hard
    threshold: 0.85
  - id: KC.N5.KANJI.DAILY.001
    type: co_requisite
kanji_links:
  - kc_id: KC.N5.KANJI.DAILY.001
    character: 食
    target_reading: た
grammar_links:
  - KC.N5.GRAMMAR.PREDICATE.POLITE_PRESENT
examples:
  - EX.N5.VOCAB.ROUTINE.001
  - EX.N5.VOCAB.ROUTINE.002
evidence_blueprint:
  required_types: [reading_recall, context_defined_meaning]
  delayed_eligible_types: [audio_meaning, cloze_usage]
distractor_policy:
  allowed: [semantic_neighbor, phonological_neighbor, Indonesian_transfer]
misconception_tags: [VOCAB.FOOD_DRINK.CONFUSION]
source_rationale:
  basis: high_frequency_daily_function
status: draft
~~~

## 15. Acceptance Criteria

1. Setiap entry dapat divalidasi terhadap schema tanpa field wajib yang hilang.
2. Total primary category sama dengan target kurikulum dan tidak menghitung form infleksi dua kali.
3. Setiap required KC memiliki content pool yang dapat memenuhi aturan mastery.
4. Seluruh contoh dan distractor lolos review akademik serta lokalisasi.
5. Relasi Vocabulary–Kanji dan prerequisite tidak putus atau bersiklus.
6. Runtime dapat memilih item tanpa membuat mapping KC baru.
7. Perubahan versi tidak menulis ulang evidence historis.
8. Tidak ada materi berstatus draft yang dapat diberikan kepada learner.

## 16. Metrik dan Pertanyaan Terbuka

Metrik minimum: coverage per KC, item exposure, error rate per sense, distractor efficiency, delayed retention, content report rate, dan difficulty drift.

Pertanyaan yang divalidasi melalui data MVP:

- Apakah 900 unit leksikal memberi coverage memadai pada seluruh reading/listening object?
- Sense atau kategori mana yang paling sering menimbulkan transfer keliru dari Bahasa Indonesia?
- Berapa banyak variasi item yang diperlukan sebelum repetition penalty meningkat?
- Kapan ejaan berkanji sebaiknya menggantikan kana tanpa menurunkan pemahaman?

## 17. Referensi

- [JLPT — Summary of Linguistic Competence Required for Each Level](https://www.jlpt.jp/e/about/levelsummary.html)
- [JLPT — Composition of Test Sections and Items](https://www.jlpt.jp/e/guideline/testsections.html)
- [JLPT — N5 Purposes of Test Items](https://www.jlpt.jp/e/guideline/pdf/n5_e_revised.pdf)
- [JLPT — FAQ tentang tidak adanya daftar Vocabulary/Kanji/Grammar resmi](https://www.jlpt.jp/e/faq/)
- [JLPT — Official Sample Questions](https://www.jlpt.jp/e/samples/forlearners.html)
- [JF Standard — Overview](https://www.jfstandard.jpf.go.jp/summaryen/ja/render.do)
- [Irodori — Starter A1](https://www.irodori.jpf.go.jp/en/starter/pdf.html)

Referensi diperiksa pada 13 September 2026. Materi berhak cipta digunakan sebagai acuan struktur dan level, bukan untuk disalin.
