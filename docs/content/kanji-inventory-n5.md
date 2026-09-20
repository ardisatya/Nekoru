# Kanji Inventory N5 — Spesifikasi Konten

**Status:** Draft v0.2  
**Audiens:** Product, akademik, content operations, data, AI, dan engineering  
**Cakupan:** Pemula absolut hingga kesiapan JLPT N5  
**Bahasa penjelasan:** Bahasa Indonesia  
**Tanggal:** 13 September 2026

## 1. Tujuan Dokumen

Dokumen ini mendefinisikan struktur, aturan authoring, evidence, dan validasi inventory 110 Kanji Nekoru. Inventory menyatakan karakter serta reading yang benar-benar ditargetkan dalam vocabulary dan konteks; inventory bukan daftar seluruh kemungkinan onyomi, kunyomi, nama, atau compound.

Dokumen ini melengkapi [Arsitektur Kurikulum](../product-specs/curriculum-architecture.md), [Mastery Specification](../product-specs/mastery-specification.md), [Learning Engine](../product-specs/learning-engine.md), dan [Vocabulary Inventory](./vocabulary-inventory-n5.md).

## 2. Keputusan Utama

| Area | Keputusan |
| --- | --- |
| Baseline MVP | 110 karakter internal tervalidasi |
| Unit penghitungan | Satu karakter Unicode kanonik |
| Target reading | Reading dalam vocabulary yang diajarkan, bukan hafalan daftar reading |
| Sequencing | Kegunaan dalam kata dan teks lebih penting daripada urutan kelas sekolah Jepang |
| Evidence | Pengenalan karakter, reading dalam kata, orthography, dan makna kontekstual dipisahkan |
| Handwriting | Bukan mastery requirement MVP |
| Stroke order | Animasi wajib untuk setiap Kanji; bersifat instruksional dan bukan scored evidence |
| Format animasi | Manifest vector stroke terurut sebagai sumber kebenaran; video/GIF hanya derivative |
| Tracing | Boleh tersedia sebagai latihan terpandu, tidak memengaruhi mastery |
| Furigana | Dikurangi bertahap pada vocabulary yang provisional/mastered |

Karena JLPT tidak menerbitkan daftar Kanji resmi per level, label N5 adalah keputusan kurikulum internal yang harus memiliki source_rationale dan review akademik.

## 3. Ruang Lingkup dan Batas

### Termasuk

- karakter kanonik, Unicode, varian glyph, makna pedagogis, dan kategori;
- reading target yang terikat ke vocabulary;
- unit pertama, prerequisite, radical/component pedagogis, policy furigana, serta animasi stroke;
- evidence, distractor, rendering QA, aksesibilitas, dan versioning.

### Tidak termasuk

- daftar lengkap 110 karakter dalam dokumen ini;
- seluruh reading kamus atau nanori;
- produksi tulisan tangan, kaligrafi, atau penilaian akurasi stroke sebagai syarat mastery;
- etimologi populer yang tidak dapat dipertanggungjawabkan;
- penggunaan font tertentu sebagai bentuk kanonik tunggal.

## 4. Model Konseptual

~~~text
KanjiEntry
├── Character
├── PedagogicalMeaning[]
├── TargetReading[]
│   └── VocabularyLink[]
├── GlyphVariant[]
├── ComponentHint[]
├── StrokeOrderAnimation
│   ├── StrokeManifest
│   ├── PlaybackPolicy
│   ├── TracingPolicy
│   └── StaticFallback
├── PrerequisiteRef[]
└── EvidenceBlueprint
~~~

Mastery karakter tidak otomatis memberi mastery vocabulary, dan mastery vocabulary dalam kana tidak otomatis memberi mastery bentuk Kanji. Item integrasi dapat memberi supporting evidence jika mapping-nya disetujui.

## 5. Taxonomy

| Primary category | Target |
| --- | ---: |
| Angka, jumlah, waktu, dan kalender | 22 |
| Orang, tubuh, keluarga, dan identitas | 16 |
| Tempat, arah, cuaca, dan alam dasar | 22 |
| Kehidupan harian, sekolah, dan pekerjaan | 22 |
| Tindakan berfrekuensi tinggi | 18 |
| Sifat dasar dan tanda umum | 10 |
| **Total** | **110** |

Secondary tags dapat mencakup number, date, person, place, direction, school, work, action, adjective, sign, dan high_frequency_compound.

## 6. Kontrak Data

| Field | Tipe | Wajib | Aturan |
| --- | --- | --- | --- |
| id | string | Ya | KC.N5.KANJI.{CATEGORY}.{NNN} |
| inventory_version | semver | Ya | Versi inventory |
| character | string | Ya | Tepat satu ideograph target |
| unicode_codepoint | string | Ya | Format U+XXXX atau lebih panjang |
| canonical_form | string | Ya | Bentuk Unicode NFC |
| glyph_variants | array | Ya | Boleh kosong; tidak membuat KC baru |
| pedagogical_meanings_id | string[] | Ya | Makna yang relevan bagi target words |
| primary_category | enum | Ya | Tepat satu |
| secondary_tags | string[] | Ya | Boleh kosong |
| target_readings | array | Ya | Minimal satu reading dalam word |
| vocabulary_links | array | Ya | Minimal satu approved/target vocabulary |
| first_stage_id | string | Ya | S1–S4 untuk target baru |
| first_unit_id | string | Ya | U05–U20 |
| required | boolean | Ya | Memengaruhi readiness |
| prerequisites | array | Ya | hard, soft, co_requisite |
| component_hints | array | Ya | Bantuan visual; bukan klaim etimologi |
| visual_assets | array | Ya | Minimal glyph render reference |
| stroke_order | object | Ya | Animasi, manifest goresan, playback, tracing, fallback, dan rights |
| furigana_policy | object | Ya | Kapan selalu, adaptif, atau disembunyikan |
| evidence_blueprint | object | Ya | Jenis bukti dan coverage |
| distractor_policy | object | Ya | Similarity dan misconception |
| rendering_requirements | object | Ya | Font fallback serta QA platform |
| source_rationale | object | Ya | Fungsi, coverage, referensi silang |
| attribution | object | Ya | Author, AI assistance, reviewer |
| status | enum | Ya | Lifecycle Bagian 12 |

### 6.1 TargetReading

| Field | Keterangan |
| --- | --- |
| reading_id | ID stabil |
| kana | Reading yang benar pada vocabulary target |
| reading_type | on, kun, irregular, suffix, counter |
| target_word_ids | Minimal satu Vocabulary KC |
| is_required | Apakah masuk readiness |
| first_unit_id | Unit pertama reading diuji |
| okurigana_pattern | Pola jika relevan |
| excluded_contexts | Penggunaan yang belum ditargetkan |

Reading type adalah metadata linguistik, bukan tujuan hafalan. Learner dinilai melalui kata dan konteks.

### 6.2 GlyphVariant

Setiap variant menyimpan text, relation, environment, dan accepted_as_answer. Variasi font yang tidak mengubah karakter diterima saat recognition; bentuk lama, karakter mirip, atau bentuk lain yang bermakna berbeda tidak boleh digabung.

### 6.3 StrokeOrderAnimation

Manifest vector merupakan sumber kebenaran animasi. GIF, video, atau raster sequence boleh dibuat sebagai derivative untuk fallback, tetapi tidak boleh menjadi satu-satunya representasi karena tidak mendukung step-by-step, tracing, dan perubahan kecepatan yang aksesibel.

| Field | Tipe | Wajib | Aturan |
| --- | --- | --- | --- |
| animation_id | string | Ya | ASSET.KANJI.STROKE.{CODEPOINT}.{NNN} |
| animation_version | semver | Ya | Versi independen dari inventory |
| glyph_style | enum | Ya | textbook_kaisho untuk MVP |
| stroke_count | integer | Ya | Harus sama dengan jumlah entry manifest |
| coordinate_system | object | Ya | viewBox, width, height, origin |
| vector_asset_id | string | Ya | SVG/vector data tervalidasi |
| vector_checksum | string | Ya | SHA-256 dari aset kanonik |
| strokes | array | Ya | Minimal satu, index berurutan |
| playback_policy | object | Ya | Default speed, opsi speed, loop, pause |
| tracing_policy | object | Ya | enabled, tolerance, hint, scoring |
| static_fallback_asset_id | string | Ya | Diagram bernomor untuk reduced motion/failure |
| accessibility | object | Ya | Label, keyboard, reduced-motion behavior |
| source_and_rights | object | Ya | Sumber urutan, pembuat aset, dan lisensi |
| qa_result_id | string | Ya | Approval linguistik, visual, dan teknis |
| status | enum | Ya | draft, review, approved, deprecated |

Setiap entry pada array strokes minimal menyimpan data berikut secara langsung atau melalui path_id yang resolve ke record vector internal:

| Field | Keterangan |
| --- | --- |
| index | Bilangan berurutan mulai 1 |
| path_id | Referensi path vector yang unik dan wajib dapat di-resolve |
| path_data | Geometry SVG tersanitasi pada entry atau record path yang direferensikan |
| start_point | Koordinat awal pada entry atau record path |
| end_point | Koordinat akhir pada entry atau record path |
| direction_cue | start_to_end |
| stroke_type | Label pedagogis opsional, bukan target mastery |
| duration_ms | Durasi baseline stroke |
| delay_after_ms | Jeda sebelum stroke berikutnya |
| label_id | Label aksesibel, misalnya “goresan 1 dari 8” |

Path harus berada di dalam viewBox, tidak boleh memuat script, event handler, foreignObject, external URL, embedded font, atau network reference.

## 7. Relasi dan Prasyarat

- Kanji baru hanya muncul bersama vocabulary yang mastered atau menjadi co-requisite.
- vocabulary_links dan kanji_links harus simetris.
- Character recognition dapat menjadi prerequisite untuk orthography production, tetapi bukan untuk listening.
- Komponen/radical boleh menjadi soft prerequisite jika hanya mnemonic.
- Item dengan beberapa Kanji memiliki satu primary KC dan supporting KC yang dideklarasikan.
- Furigana tidak boleh bocor ke stem apabila reading karakter adalah target soal.

## 8. Aturan Authoring

1. Pilih target berdasarkan kegunaan pada vocabulary, reading, tanda, waktu, dan konteks N5 Nekoru.
2. Ajarkan makna melalui kata; label makna karakter tidak boleh diperlakukan sebagai terjemahan sempurna.
3. Jangan mengajarkan semua onyomi/kunyomi sekaligus.
4. Okurigana harus menjadi bagian dari contoh form dan tidak dipotong secara menyesatkan.
5. Mnemonic harus diberi label bantuan ingatan, tidak boleh mengklaim etimologi tanpa sumber.
6. Font contoh harus mendukung karakter Jepang dan diuji pada target browser/platform.
7. Ukuran glyph harus tetap terbaca pada zoom 200% dan mode kontras tinggi.
8. Furigana bersifat adaptif: selalu pada pengenalan awal, dapat ditampilkan atas permintaan saat belajar, dan disembunyikan pada scored reading item.
9. Distractor visual tidak boleh hanya menguji keterbatasan font atau resolusi.
10. Setiap Kanji wajib memiliki satu approved stroke_order animation dan satu static fallback.
11. Urutan, jumlah, arah, serta bentuk goresan harus berasal dari referensi berlisensi dan diperiksa reviewer yang kompeten.
12. Animasi harus menggunakan bentuk textbook_kaisho yang konsisten dengan glyph pembelajaran.
13. AI boleh membantu menyiapkan path atau timing, tetapi tidak boleh menjadi sumber otoritatif urutan goresan.
14. Reviewer manusia memverifikasi naturalness, reading, glyph, manifest, serta hasil render animasi.

### 8.1 Perilaku Animasi

Playback minimum:

- animasi dimulai melalui tindakan pengguna, bukan autoplay tanpa kontrol;
- tersedia play, pause, replay, previous stroke, next stroke, dan restart;
- pilihan kecepatan baseline: 0,5×, 0,75×, 1×, dan 1,5×;
- default 1× dengan loop nonaktif;
- stroke yang sedang digambar ditonjolkan tanpa menjadikan warna satu-satunya penanda;
- stroke sebelumnya tetap terlihat dengan kontras yang cukup;
- nomor stroke dapat diaktifkan atau disembunyikan;
- step mode menampilkan tepat satu stroke baru per aksi;
- perubahan kecepatan tidak mengubah urutan atau geometry.

Tracing bersifat opsional per pengalaman, tetapi schema wajib mendukung:

- overlay path dan titik mulai;
- toleransi deviasi yang configurable serta versioned;
- hint arah;
- reset per stroke;
- input pointer, touch, dan stylus;
- mode observasi yang tetap tersedia bagi pengguna tanpa pointer presisi.

Tracing menghasilkan interaction event, bukan mastery evidence. Produk tidak boleh menyatakan bentuk tulisan pengguna “salah” hanya dari toleransi geometry MVP.

Accessibility:

- prefers-reduced-motion menggunakan static fallback atau step mode;
- semua kontrol dapat digunakan dengan keyboard;
- screen reader memperoleh character, jumlah stroke, posisi aktif, dan status playback;
- label tidak hanya berupa ikon;
- fallback diagram menampilkan urutan dan arah secara tekstual/bernomor;
- kegagalan animasi tidak menghalangi akses ke meaning, reading, dan vocabulary examples.

## 9. Activity dan Evidence Blueprint

| Activity type | Target | Weight | Catatan |
| --- | --- | ---: | --- |
| character_meaning_recognition | Karakter → makna pedagogis | 0,75 | Recognition |
| word_reading | Kata berkanji → kana | 1,00 | Direct evidence utama |
| orthography_selection | Kana → bentuk berkanji | 1,00 | Format N5 |
| word_context_reading | Reading dalam kalimat | 0,90 | Applied context |
| sign_information_match | Kanji pada material fungsional | 0,90 | Transfer |
| visual_discrimination | Membedakan karakter mirip | 0,75 | Diagnostik |
| guided_tracing | Familiarisasi bentuk | 0,00 | Interaction/exposure, bukan handwriting mastery |
| stroke_animation_view | Mengamati urutan dan arah | 0,00 | Exposure, tidak scored |
| stroke_step_review | Mengamati per goresan | 0,00 | Exposure, tidak scored |

Pool konten per required KC harus menyediakan sedikitnya tiga encounter, dua activity type, satu word-context item, dan delayed evidence setelah tujuh hari. Encounter yang hanya mengulang target_word dan posisi jawaban sama tidak dihitung sebagai variasi memadai.

## 10. Distractor dan Misconception

Kelas distractor:

- visual_shape_neighbor;
- same_reading_wrong_character;
- alternate_reading_wrong_context;
- okurigana_error;
- kana_kanji_mapping_error;
- semantic_neighbor;
- component_overgeneralization.

Setiap pasangan karakter mirip harus diverifikasi tampil berbeda pada font target. Distractor tidak boleh memakai karakter di luar prerequisite kecuali soal explicitly diagnostic dan diberi level support yang sesuai.

## 11. Difficulty dan Sequencing

Faktor difficulty:

- visual complexity dan similarity;
- jumlah target readings aktif;
- transparency pada target word;
- jumlah serta frekuensi vocabulary links;
- prerequisite depth;
- kepadatan Kanji dalam stimulus;
- kebutuhan membedakan okurigana atau compound.

Band:

- **easy:** satu reading dominan pada kata sangat dikenal, bentuk jelas;
- **target:** reading dan konteks sesuai unit aktif;
- **stretch:** compound atau stimulus lebih padat tetapi tetap dalam ceiling.

Urutan tidak boleh diputuskan hanya dari stroke count. Difficulty hasil analytics tidak mengubah unit atau prerequisite secara otomatis.

## 12. Validasi, Rendering, dan Lifecycle

~~~text
draft → academic_review → revision_required → approved → published
                                      └──────→ rejected
published → deprecated
~~~

Validasi minimum:

- Unicode, normalization, glyph, makna, target reading, dan okurigana benar;
- target reading memiliki vocabulary link yang sah;
- bentuk diuji pada seluruh font fallback serta platform MVP;
- no tofu, clipping, glyph substitution, atau furigana collision;
- setiap entry memiliki approved vector animation dan static fallback;
- stroke_count cocok dengan manifest dan index berurutan tanpa gap/duplikasi;
- seluruh path berada di viewBox, memiliki start/end point, serta lolos sanitasi;
- urutan dan arah goresan cocok dengan referensi berlisensi yang dicatat;
- playback, step mode, speed, keyboard, dan reduced-motion fallback berfungsi;
- checksum, rights, animation version, serta QA result tersedia;
- distractor dapat dibedakan secara visual;
- contoh alami dan tidak mengalami prerequisite leakage;
- lisensi font, gambar, dan mnemonic tercatat;
- primary/supporting KC serta answer rationale eksplisit.

Technical validation gagal jika character berisi lebih dari satu ideograph, codepoint tidak cocok, target reading tanpa word, link tidak simetris, stroke manifest hilang/tidak urut, vector asset tidak aman, static fallback tidak tersedia, atau published item belum lolos glyph dan animation QA.

## 13. Versioning

- **Major:** karakter target diganti, KC dipecah/digabung, atau mapping mastery berubah.
- **Minor:** reading target, vocabulary link, activity coverage, atau animation asset yang ekuivalen ditambah/diganti.
- **Patch:** typo, wording makna, atau metadata yang tidak mengubah jawaban.

Koreksi karakter, reading, answer key, accepted glyph, stroke count, order, direction, atau geometry pada item published membuat versi baru. Perubahan stroke yang salah secara akademik tidak boleh diperlakukan sebagai patch metadata. Evidence historis mempertahankan item_version dan inventory_version.

## 14. Contoh Representasi

~~~yaml
id: KC.N5.KANJI.SCHOOL.001
inventory_version: 0.1.0
character: 学
unicode_codepoint: U+5B66
canonical_form: 学
glyph_variants: []
pedagogical_meanings_id: [belajar, pendidikan]
primary_category: kehidupan_harian_sekolah_dan_pekerjaan
secondary_tags: [school, action]
target_readings:
  - reading_id: READING.GAKU.001
    kana: がく
    reading_type: on
    target_word_ids:
      - KC.N5.VOCAB.IDENTITY.STUDENT
      - KC.N5.VOCAB.SCHOOL.SCHOOL
    is_required: true
    first_unit_id: U05
    excluded_contexts: [学ぶ]
vocabulary_links:
  - kc_id: KC.N5.VOCAB.IDENTITY.STUDENT
    written_form: 学生
    reading: がくせい
  - kc_id: KC.N5.VOCAB.SCHOOL.SCHOOL
    written_form: 学校
    reading: がっこう
first_stage_id: S1
first_unit_id: U05
required: true
prerequisites:
  - id: KC.N5.KANA.HIRAGANA.CORE
    type: hard
    threshold: 0.85
component_hints:
  - type: visual_mnemonic
    claim_level: mnemonic_only
stroke_order:
  animation_id: ASSET.KANJI.STROKE.U5B66.001
  animation_version: 1.0.0
  glyph_style: textbook_kaisho
  stroke_count: 8
  coordinate_system:
    view_box: [0, 0, 1024, 1024]
    origin: top_left
  vector_asset_id: VECTOR.KANJI.U5B66.001
  vector_checksum: sha256_of_vector_asset
  strokes:
    - { index: 1, path_id: PATH.U5B66.01, direction_cue: start_to_end, duration_ms: 420, delay_after_ms: 140, label_id: goresan_1_dari_8 }
    - { index: 2, path_id: PATH.U5B66.02, direction_cue: start_to_end, duration_ms: 360, delay_after_ms: 140, label_id: goresan_2_dari_8 }
    - { index: 3, path_id: PATH.U5B66.03, direction_cue: start_to_end, duration_ms: 390, delay_after_ms: 160, label_id: goresan_3_dari_8 }
    - { index: 4, path_id: PATH.U5B66.04, direction_cue: start_to_end, duration_ms: 520, delay_after_ms: 160, label_id: goresan_4_dari_8 }
    - { index: 5, path_id: PATH.U5B66.05, direction_cue: start_to_end, duration_ms: 480, delay_after_ms: 140, label_id: goresan_5_dari_8 }
    - { index: 6, path_id: PATH.U5B66.06, direction_cue: start_to_end, duration_ms: 350, delay_after_ms: 140, label_id: goresan_6_dari_8 }
    - { index: 7, path_id: PATH.U5B66.07, direction_cue: start_to_end, duration_ms: 430, delay_after_ms: 140, label_id: goresan_7_dari_8 }
    - { index: 8, path_id: PATH.U5B66.08, direction_cue: start_to_end, duration_ms: 460, delay_after_ms: 0, label_id: goresan_8_dari_8 }
  playback_policy:
    default_speed: 1.0
    allowed_speeds: [0.5, 0.75, 1.0, 1.5]
    loop_default: false
    step_mode: true
  tracing_policy:
    enabled: true
    scoring: interaction_only
    tolerance_policy_version: 1.0.0
  static_fallback_asset_id: IMAGE.KANJI.STROKE.U5B66.001
  accessibility:
    reduced_motion: static_or_step
    keyboard_controls: true
    numbered_strokes: true
  source_and_rights:
    source_ref: RIGHTS.KANJI.STROKE.001
    license: approved_internal_or_licensed
  qa_result_id: QA.KANJI.STROKE.U5B66.001
furigana_policy:
  introduction: always
  learning: adaptive
  scored_reading: hidden
evidence_blueprint:
  required_types: [word_reading, orthography_selection]
  delayed_eligible_types: [word_context_reading]
distractor_policy:
  allowed: [visual_shape_neighbor, alternate_reading_wrong_context]
rendering_requirements:
  normalization: NFC
  platforms: [windows_chromium, android_chromium]
  animation_targets: [windows_chromium, android_chromium]
source_rationale:
  basis: core_school_vocabulary
status: draft
~~~

Path geometry, start/end point, timing, dan checksum pada contoh bersifat ilustratif. Pipeline harus mengambil nilai aktual dari vector asset serta menghitung checksum sebelum status dapat menjadi approved.

## 15. Acceptance Criteria

1. Tepat 110 primary entry tersedia pada rilis penuh dan distribusi kategori sesuai kurikulum.
2. Setiap entry memiliki minimal satu target reading dalam approved vocabulary.
3. Inventory tidak memasukkan seluruh dictionary reading sebagai target.
4. Required KC memiliki content pool yang cukup untuk breadth dan delayed evidence.
5. Semua glyph, furigana, dan distractor lolos QA platform MVP.
6. Seluruh 110 entry memiliki approved vector stroke animation dan static fallback.
7. Manifest setiap animasi mempunyai jumlah, index, urutan, arah, geometry, timing, checksum, rights, dan QA result yang valid.
8. Kontrol playback, step mode, keyboard, dan reduced-motion behavior lolos QA platform MVP.
9. Tracing dicatat sebagai interaction/exposure dan tidak menaikkan mastery.
10. Vocabulary–Kanji link simetris dan tanpa dangling reference.
11. Handwriting atau stroke order tidak diperlukan untuk mastered.
12. Runtime tidak membuat reading, stroke path, order, atau mapping Kanji baru.

## 16. Metrik dan Pertanyaan Terbuka

Metrik: error per reading, visual-confusion rate, furigana reveal rate, retention per target word, glyph issue rate, animation load/failure rate, playback completion, step-mode usage, tracing usage, reduced-motion fallback rate, dan coverage Kanji pada reading objects.

Pertanyaan MVP:

- Apakah 110 karakter memberikan coverage yang cukup tanpa membuat reading terlalu padat?
- Kapan furigana dapat dikurangi tanpa menurunkan comprehension?
- Apakah visual mnemonic membantu retensi atau menciptakan association error?
- Karakter dan pasangan bentuk mana yang paling sering gagal pada device pengguna?
- Apakah animasi penuh, step mode, atau static diagram paling membantu pengenalan bentuk?
- Kecepatan animasi default mana yang paling mudah diikuti tanpa memperpanjang sesi secara berlebihan?

## 17. Referensi

- [JLPT — N5 Linguistic Competence](https://www.jlpt.jp/e/about/levelsummary.html)
- [JLPT — Composition of Test Sections and Items](https://www.jlpt.jp/e/guideline/testsections.html)
- [JLPT — N5 Purposes of Test Items](https://www.jlpt.jp/e/guideline/pdf/n5_e_revised.pdf)
- [JLPT — FAQ tentang tidak adanya daftar resmi](https://www.jlpt.jp/e/faq/)
- [JLPT — Official Sample Questions](https://www.jlpt.jp/e/samples/forlearners.html)
- [JF Standard — Overview](https://www.jfstandard.jpf.go.jp/summaryen/ja/render.do)

Referensi diperiksa pada 13 September 2026. Contoh eksternal tidak boleh disalin ke content bank tanpa hak penggunaan.
