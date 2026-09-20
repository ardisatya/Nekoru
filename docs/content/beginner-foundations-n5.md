# Beginner Foundations N5 — Spesifikasi Konten Pemula Absolut

**Status:** Draft v0.1  
**Audiens:** Product, akademik, content operations, data, AI, design, audio, dan engineering  
**Cakupan:** Stage S0, Unit U01–U04, pemula absolut menuju kesiapan memulai materi inti N5  
**Bahasa penjelasan:** Bahasa Indonesia  
**Tanggal:** 13 September 2026

## 1. Tujuan Dokumen

Dokumen ini mendefinisikan sumber kebenaran untuk konten pemula absolut Nekoru. Fokusnya adalah fondasi bunyi, mora, hiragana, katakana, ortografi, vocabulary fungsional awal, decoding, dan listening dasar sebelum learner memasuki Grammar serta Kanji inti.

Dokumen ini mengisi kontrak yang belum tercakup secara lengkap oleh spesifikasi domain:

- inventory Knowledge Component atau KC untuk bunyi dan kana;
- urutan serta aturan pengajaran U01–U04;
- hubungan 100 Vocabulary, 46 Reading objects, dan 44 Listening objects pada S0;
- policy romaji, furigana, instruksi Bahasa Indonesia, dan bantuan audio;
- evidence, mastery, placement, serta gate S0 → S1;
- schema konten, contoh representasi, validasi, dan acceptance criteria.

Dokumen ini melengkapi:

- [Product Overview](../product-specs/product-overview.md)
- [Arsitektur Kurikulum](../product-specs/curriculum-architecture.md)
- [Mastery Specification](../product-specs/mastery-specification.md)
- [Learning Engine](../product-specs/learning-engine.md)
- [Vocabulary Inventory](./vocabulary-inventory-n5.md)
- [Reading Blueprints](./reading-blueprints-n5.md)
- [Listening Blueprints](./listening-blueprints-n5.md)

Jika terjadi konflik, scope akademik mengikuti Arsitektur Kurikulum; evidence, mastery, agregasi, retensi, dan readiness mengikuti Mastery Specification; sequencing serta runtime decision lainnya mengikuti Learning Engine.

## 2. Keputusan Utama

| Area | Keputusan |
| --- | --- |
| Sasaran awal | Pengguna yang belum mengenal sistem tulisan atau bunyi Jepang |
| Stage | S0 — Fondasi Aksara dan Bunyi |
| Unit | U01–U04 |
| Beban baseline | 40 jam efektif |
| Target Vocabulary | 100 unit leksikal |
| Target Kanji | 0 karakter baru |
| Target Grammar | 0 konsep formal baru |
| Reading objects | 46 |
| Listening objects | 44 |
| Unit mastery kana | Pasangan bentuk–bunyi dan kemampuan decoding dalam kata |
| Romaji | Scaffolding sementara, bukan target dan bukan jawaban wajib |
| Handwriting | Tidak menjadi mastery requirement MVP |
| Formulaic language | Boleh diajarkan sebagai chunk tanpa memberi Grammar mastery |
| Gate akhir | Decoding kana ≥90%, hiragana tanpa romaji, katakana dasar ≥80% |

S0 bukan “versi mudah dari N5”. S0 adalah lapisan prerequisite yang membuat learner mampu menerima instruksi, membaca stimulus dasar, dan menghasilkan evidence yang valid pada domain selanjutnya.

## 3. Profil Masuk dan Outcome

### 3.1 Profil masuk

Learner dapat memasuki S0 apabila:

- memilih “mulai dari awal”;
- belum dapat membaca hiragana;
- placement menunjukkan confidence rendah pada kana;
- memiliki critical gap pada decoding walaupun kemampuan Listening lebih tinggi.

Learner tidak diasumsikan:

- memahami istilah linguistik;
- dapat membaca huruf Jepang;
- mengetahui perbedaan Kanji, hiragana, dan katakana;
- memahami pola kalimat Jepang;
- dapat menggunakan keyboard Jepang.

### 3.2 Outcome akhir S0

Learner mampu:

1. mengenali struktur mora dasar dan membedakan bunyi target;
2. membaca seluruh hiragana dasar tanpa romaji;
3. membaca dakuten, handakuten, yoon, sokuon, dan vokal panjang dalam kata target;
4. mengenali serta membaca katakana dasar dan loanword umum;
5. memetakan audio, kana, dan makna pada vocabulary fungsional awal;
6. membaca frasa atau micro-text yang seluruh prasyaratnya tersedia;
7. menangkap informasi sangat pendek dari audio yang jelas;
8. memahami instruksi kelas dasar yang digunakan Nekoru;
9. mencapai gate S0 → S1 tanpa critical misconception aktif.

## 4. Ruang Lingkup dan Batas

### 4.1 Termasuk

- lima vokal Jepang dan mora dasar;
- baris hiragana serta katakana standar;
- dakuten, handakuten, yoon, sokuon, vokal panjang, dan pemakaian ー pada katakana;
- partikel は, へ, dan を hanya sebagai pengecualian reading dalam chunk yang telah disetujui;
- greetings, classroom language, angka awal, identitas, dan vocabulary sehari-hari sederhana;
- aktivitas audio–kana, kana–audio, visual discrimination, decoding, dan micro-reading;
- placement/verification kana serta remedial;
- aturan tampilan romaji dan instruksi.

### 4.2 Tidak termasuk

- Kanji baru sebagai target mastery;
- Grammar formal sebagai target mastery;
- kemampuan menulis tangan dan stroke order;
- pitch accent sebagai syarat gate;
- produksi percakapan bebas;
- seluruh kombinasi katakana modern untuk foreign sounds;
- penggunaan romaji sebagai pengganti kana setelah S0.

### 4.3 Formulaic language

Ungkapan seperti おはようございます, ありがとうございます, すみません, dan わかりません boleh diajarkan sebagai satu unit fungsional. Struktur internalnya tidak menghasilkan Grammar evidence sampai konsep terkait diperkenalkan di stage berikutnya.

## 5. Peta Stage S0

| Unit | Fokus | Outcome utama | V | K | G | R | L |
| --- | --- | --- | ---: | ---: | ---: | ---: | ---: |
| U01 | Sistem bunyi, mora, sapaan, bahasa kelas | Mendengar, meniru secara opsional, dan memahami chunk awal | 20 | 0 | 0 | 10 | 12 |
| U02 | Hiragana dasar | Mengenali dan mendekode kana dasar dalam kata | 25 | 0 | 0 | 12 | 10 |
| U03 | Hiragana lanjutan dan ortografi | Membaca dakuten, yoon, sokuon, serta vokal panjang | 25 | 0 | 0 | 12 | 10 |
| U04 | Katakana dan ortografi campuran | Membaca katakana dasar, ー, loanword, dan teks campuran | 30 | 0 | 0 | 12 | 12 |
| **Total** | | | **100** | **0** | **0** | **46** | **44** |

Jumlah merupakan baseline authoring. Entry atau object dapat bertambah melalui versi minor selama target baru, beban, dan gate tidak berubah tanpa proposal akademik.

## 6. Model Konseptual

~~~text
FoundationStage
├── SoundKC[]
├── KanaKC[]
│   ├── GlyphForm[]
│   ├── SoundMapping[]
│   └── VariantRelation[]
├── OrthographyKC[]
├── FunctionalVocabularyKC[]
├── FoundationReadingObject[]
├── FoundationListeningObject[]
├── ScaffoldingPolicy
└── GateBlueprint
~~~

Relasi utama:

~~~text
SoundKC
   ↓
KanaKC
   ↓
Word decoding
   ↓
Phrase / micro-text comprehension
   ↓
S0 gate
   ↓
Kanji dan Grammar inti S1
~~~

Listening boleh berkembang tanpa menunggu seluruh Kana KC mastered. Kelemahan kana dapat menahan Reading dan Kanji tanpa otomatis memundurkan Listening.

## 7. Inventory Bunyi

### 7.1 Taxonomy Sound KC

| Kategori | Cakupan | Mastery target |
| --- | --- | --- |
| Vokal dasar | /a i u e o/ | Membedakan dan memetakan ke kana |
| Mora dasar | Satuan ritmis sederhana | Mengidentifikasi jumlah mora pada target |
| Konsonan + vokal | Baris k, s, t, n, h, m, y, r, w | Membedakan pasangan target |
| Voicing | k/g, s/z, t/d, h/b/p | Membedakan dakuten/handakuten |
| Yoon | きゃ, しゅ, ちょ, dan target sejenis | Membaca satu mora gabungan |
| Sokuon | っ / ッ | Membedakan konsonan geminat |
| Vokal panjang | Kana context dan ー | Membedakan durasi bermakna |
| Mora nasal | ん / ン | Mengenali pada posisi target |

Pitch accent, devoicing, dan variasi regional dapat dijelaskan secara opsional, tetapi tidak menjadi required KC S0.

### 7.2 Unit Sound KC

Sound KC disimpan sebagai contrast atau mapping yang dapat dinilai, bukan sebagai penjelasan abstrak saja. Contoh:

- KC.N5.SOUND.VOWEL.A_I;
- KC.N5.SOUND.LENGTH.O;
- KC.N5.SOUND.SOKUON.PRESENCE;
- KC.N5.SOUND.YOON.KI_KYA;
- KC.N5.SOUND.VOICING.K_G.

Setiap Sound KC minimal memiliki dua speaker atau voice variants pada content pool sebelum menjadi required untuk gate.

## 8. Inventory Hiragana

### 8.1 Kana dasar

~~~text
あ い う え お
か き く け こ
さ し す せ そ
た ち つ て と
な に ぬ ね の
は ひ ふ へ ほ
ま み む め も
や    ゆ    よ
ら り る れ ろ
わ          を
ん
~~~

Empat puluh enam bentuk dasar menjadi target pengenalan. を diajarkan dengan fungsi orthographic yang relevan, bukan sebagai vocabulary mandiri.

### 8.2 Bentuk turunan

- dakuten: が–ご, ざ–ぞ, だ–ど, ば–ぼ;
- handakuten: ぱ–ぽ;
- yoon utama: きゃ/きゅ/きょ, しゃ/しゅ/しょ, ちゃ/ちゅ/ちょ, にゃ, ひゃ, みゃ, りゃ, serta voiced variants yang digunakan target words;
- sokuon: っ sebelum konsonan target;
- vokal panjang: pola yang muncul pada vocabulary S0;
- pengecualian reading partikel: は→わ, へ→え, を→お dalam approved chunk.

Bentuk turunan dapat dimodelkan sebagai KC kelompok ketika diagnosis individual tidak memberi manfaat. Namun event tetap menyimpan stimulus form agar error per form dapat dianalisis.

## 9. Inventory Katakana

### 9.1 Kana dasar

~~~text
ア イ ウ エ オ
カ キ ク ケ コ
サ シ ス セ ソ
タ チ ツ テ ト
ナ ニ ヌ ネ ノ
ハ ヒ フ ヘ ホ
マ ミ ム メ モ
ヤ    ユ    ヨ
ラ リ ル レ ロ
ワ          ヲ
ン
~~~

Empat puluh enam bentuk dasar menjadi target recognition. Katakana ヲ cukup dikenali; penggunaannya tidak diprioritaskan sebagai form produktif.

### 9.2 Bentuk turunan dan loanword

- dakuten, handakuten, yoon, sokuon, dan ー;
- kombinasi seperti ティ, ファ, フィ, フェ, フォ hanya jika muncul pada 30 vocabulary U04;
- variasi orthography loanword harus memiliki preferred form;
- bahasa asal disimpan sebagai provenance, bukan petunjuk jawaban;
- similarity pairs seperti シ/ツ, ソ/ン, ク/ケ, dan ル/レ wajib memiliki visual-discrimination coverage.

## 10. Kontrak Knowledge Component

### 10.1 FoundationKC

| Field | Tipe | Wajib | Aturan |
| --- | --- | --- | --- |
| id | string | Ya | KC.N5.{SOUND\|KANA\|ORTHOGRAPHY}.{CATEGORY}.{CODE} |
| inventory_version | semver | Ya | Versi inventory |
| domain | enum | Ya | sound, hiragana, katakana, orthography |
| target_type | enum | Ya | mapping, recognition, contrast, decoding, rule |
| canonical_form | string/null | Ya | Null untuk contrast abstrak |
| canonical_sound | string/null | Ya | Representasi fonologis internal |
| display_label_id | string | Ya | Label UI Bahasa Indonesia |
| first_unit_id | string | Ya | U01–U04 |
| required | boolean | Ya | Memengaruhi gate |
| prerequisites | array | Ya | hard, soft, atau co_requisite |
| related_forms | array | Ya | Variant/contrast |
| example_vocabulary_ids | string[] | Ya | Minimal dua jika assessed |
| evidence_blueprint | object | Ya | Activity dan minimum coverage |
| misconception_tags | string[] | Ya | Minimal satu jika assessed |
| source_rationale | object | Ya | Alasan pedagogis |
| status | enum | Ya | Lifecycle Bagian 19 |

### 10.2 KanaForm

| Field | Wajib | Keterangan |
| --- | --- | --- |
| text | Ya | Satu kana atau kombinasi target |
| script | Ya | hiragana atau katakana |
| unicode_codepoints | Ya | Codepoint aktual |
| normalization | Ya | NFC |
| mora_count | Ya | Jumlah mora pada form |
| accepted_as_answer | Ya | Boolean |
| glyph_confusables | Ya | Array boleh kosong |
| font_qa_id | Ya | Hasil rendering |

### 10.3 FoundationContentItem

| Field | Wajib | Keterangan |
| --- | --- | --- |
| id, item_version | Ya | ID stabil dan semver |
| unit_id | Ya | U01–U04 |
| activity_type | Ya | Taxonomy Bagian 15 |
| primary_kc_id | Kondisional | Wajib untuk scored item |
| supporting_kcs | Ya | Array boleh kosong |
| stimulus | Ya | Text, audio, atau visual |
| prompt_id | Ya | Instruksi terlokalisasi |
| answer_key | Kondisional | Wajib untuk scored item |
| rationale_id | Kondisional | Wajib untuk scored item |
| hint_policy | Ya | Sesuai scaffolding |
| romaji_policy | Ya | Per item |
| difficulty_band | Ya | easy, target, stretch |
| rights, attribution | Ya | Termasuk AI assistance |
| status | Ya | Approved/published untuk learner |

## 11. ID dan Relasi

Pola ID:

~~~text
KC.N5.SOUND.LENGTH.O
KC.N5.KANA.HIRAGANA.KA
KC.N5.KANA.KATAKANA.KA
KC.N5.ORTHOGRAPHY.HIRAGANA.SOKUON
CONTENT.N5.FOUNDATION.U02.001
ITEM.N5.FOUNDATION.KANA_TO_AUDIO.001
~~~

Aturan:

- ID tidak boleh digunakan ulang setelah deprecated;
- scored item memiliki tepat satu primary_kc_id;
- Sound KC boleh menjadi supporting KC bagi Kana item;
- Kana KC boleh menjadi supporting KC bagi Reading item;
- formulaic vocabulary tidak memberi Grammar evidence;
- exposure tidak memberi mastery credit;
- relation dua arah ke Vocabulary/Reading/Listening harus valid.

## 12. Struktur Konten per Unit

### 12.1 U01 — Sistem Bunyi dan Bahasa Kelas

Konten minimum:

- orientasi tiga sistem tulisan tanpa tuntutan hafalan;
- lima vokal serta konsep mora melalui audio;
- sapaan, respons, terima kasih, permintaan maaf, dan classroom repair;
- instruksi seperti dengarkan, pilih, ulangi, dan coba lagi;
- 20 functional vocabulary/chunks;
- 10 Reading objects berupa symbol awareness, label, dan micro-match;
- 12 Listening objects berupa discrimination dan quick response.

Kanji yang terlihat pada ilustrasi atau logo tidak boleh dinilai dan harus diberi alternatif yang tidak membingungkan.

### 12.2 U02 — Hiragana Dasar

Konten minimum:

- 46 hiragana dasar secara bertahap;
- bentuk yang mudah tertukar;
- penggabungan kana menjadi kata;
- word boundary dan mora count sederhana;
- 25 vocabulary baru;
- 12 Reading objects dan 10 Listening objects;
- romaji hanya pada first exposure atau atas permintaan.

### 12.3 U03 — Hiragana Lanjutan

Konten minimum:

- dakuten serta handakuten;
- yoon, sokuon, mora nasal, dan vokal panjang;
- pengecualian reading partikel dalam approved chunks;
- decoding kata serta frasa lebih panjang;
- 25 vocabulary baru;
- 12 Reading objects dan 10 Listening objects;
- romaji tidak tampil secara default.

### 12.4 U04 — Katakana dan Ortografi Campuran

Konten minimum:

- 46 katakana dasar;
- similarity pairs;
- dakuten, handakuten, yoon, sokuon, dan tanda panjang ー;
- loanword yang relevan bagi pengguna Indonesia;
- teks campuran hiragana–katakana tanpa Kanji target baru;
- 30 vocabulary baru;
- 12 Reading objects dan 12 Listening objects;
- seluruh scored activity tanpa romaji.

## 13. Template Pelajaran Pemula

Satu lesson slice mengikuti alur:

~~~text
Konteks dan tujuan
→ Dengar/lihat target
→ Perhatikan perbedaan
→ Guided matching
→ Independent recognition
→ Decode dalam kata
→ Gunakan pada frasa atau audio pendek
→ Exit check
→ Jadwalkan review
~~~

Tidak setiap layar harus mengikuti urutan secara kaku, tetapi satu KC baru tidak boleh langsung dinilai tanpa exposure yang memadai.

Komponen konten:

1. **Tujuan singkat:** satu hasil yang dapat dilakukan.
2. **Model:** glyph/audio/word dalam konteks.
3. **Noticing:** ciri penting dan pasangan yang sering tertukar.
4. **Guided practice:** matching dengan hint.
5. **Retrieval:** tanpa jawaban terlihat.
6. **Integration:** kata, frasa, atau micro-text.
7. **Feedback:** benar/salah, alasan, replay, dan remedial.
8. **Exit check:** item baru yang independen.

## 14. Scaffolding Policy

### 14.1 Romaji

| Tahap | Default | Boleh diminta | Boleh menjadi jawaban |
| --- | --- | --- | --- |
| U01 first exposure | Tampil bersama audio | Ya | Tidak |
| U01 practice | Adaptif | Ya | Hanya non-mastery onboarding |
| U02 first exposure | Tampil sekali | Ya | Tidak |
| U02 independent | Tersembunyi | Setelah respons | Tidak |
| U03 | Tersembunyi | Feedback saja | Tidak |
| U04 | Tersembunyi | Tidak pada scored item | Tidak |
| S0 checkpoint | Tidak | Tidak | Tidak |

Romaji reveal dicatat sebagai hint. Hint tersebut menurunkan independence sesuai Learning Engine.

### 14.2 Bahasa Indonesia

- instruksi UI selalu tersedia dalam Bahasa Indonesia pada S0;
- istilah mora, sokuon, atau yoon diperkenalkan setelah contoh konkret;
- penjelasan maksimal satu ide baru per blok;
- transliterasi, terjemahan harfiah, dan terjemahan komunikatif disimpan terpisah;
- istilah Jepang tidak boleh menjadi prasyarat untuk memahami instruksi.

### 14.3 Audio dan visual

- audio dapat diulang saat belajar;
- learner dapat memperlambat audio hanya pada guided practice;
- playback-rate change membuat evidence scored tidak setara kecuali blueprint mengizinkan;
- glyph minimal lolos zoom 200%, contrast mode, dan font fallback;
- warna tidak boleh menjadi satu-satunya pembeda.

## 15. Activity dan Evidence Blueprint

| Activity type | Primary target | Weight | Mastery evidence |
| --- | --- | ---: | --- |
| audio_discrimination | Sound contrast | 1,00 | Direct |
| audio_to_kana | Sound → kana | 1,00 | Direct |
| kana_to_audio | Kana → sound | 1,00 | Direct |
| glyph_recognition | Visual form | 0,75 | Recognition |
| visual_discrimination | Confusable glyph | 0,75 | Diagnostic |
| mora_count | Mora awareness | 0,90 | Applied |
| word_decoding | Kana sequence → reading | 1,00 | Direct |
| word_to_meaning | Decoding + Vocabulary | 0,90 | Applied |
| phrase_reading | Micro-reading | 0,90 | Applied |
| quick_response | Functional listening | 0,90 | Applied |
| guided_matching | Guided practice | 0,50 | Tidak memenuhi breadth |
| trace_or_animate | Bentuk visual | 0,00 | Exposure |
| explanation_view | Penjelasan | 0,00 | Exposure |

Required KC harus memiliki pool yang memungkinkan:

- minimal tiga encounter valid;
- minimal dua activity type;
- minimal satu direct independent retrieval;
- minimal satu application dalam kata/frasa;
- delayed evidence setelah minimal tujuh hari;
- stimulus dan posisi jawaban yang bervariasi.

Handwriting, tracing, speaking imitation, dan self-reported confidence tidak menjadi evidence mastery wajib.

## 16. Difficulty dan Sequencing

Difficulty mempertimbangkan:

- similarity visual;
- similarity bunyi;
- panjang sequence;
- jumlah mora;
- diacritic atau small kana;
- lexical familiarity;
- speech rate dan speaker;
- romaji/hint availability;
- prerequisite depth.

Urutan default:

1. vokal dan mora;
2. bentuk dengan visual/auditory contrast rendah;
3. perluasan baris dasar;
4. pasangan confusable;
5. dakuten/handakuten;
6. yoon dan sokuon;
7. long vowel;
8. katakana dasar;
9. katakana confusables dan loanword;
10. mixed-script integration.

Urutan authoring boleh disesuaikan berdasarkan data, tetapi hard prerequisite dan gate tidak berubah otomatis.

## 17. Placement, Review, dan Remedial

### 17.1 Placement

- pengguna yang memilih “mulai dari awal” dapat langsung mulai U01;
- pengguna berpengalaman menerima probe singkat bunyi, hiragana, dan katakana;
- confidence rendah menghasilkan verification set, bukan auto-skip;
- kelemahan localized hanya memundurkan KC terkait;
- tidak ada penalti atau status gagal untuk learner yang belum pernah belajar.

### 17.2 Review

Interval baseline mengikuti 1, 3, 7, 14, 30, dan 60 hari. Review menggunakan form, word, speaker, atau context berbeda jika pool memungkinkan.

### 17.3 Remedial

| Misconception | Remedial |
| --- | --- |
| Hiragana shape confusion | Side-by-side noticing lalu visual discrimination |
| Katakana シ/ツ atau ソ/ン | Stroke-direction cue non-scored lalu new recognition item |
| Long vowel missed | Audio contrast dan mora counting |
| Sokuon missed | Minimal-pair listening lalu word decoding |
| Yoon dibaca dua mora | Mora tiles dan audio-to-kana |
| Bergantung pada romaji | Kurangi hint dan kembali ke audio–kana |

Diagnosis menjadi confirmed hanya setelah pola berulang sesuai Learning Engine.

## 18. Gate S0 → S1

### 18.1 Syarat

Learner dapat melewati gate jika seluruh kondisi terpenuhi:

1. aggregate kana decoding accuracy minimal 90%;
2. hiragana decoding dilakukan tanpa romaji;
3. katakana dasar mencapai accuracy minimal 80%;
4. seluruh terminal hard prerequisite S0 memiliki mastery minimal 0,85;
5. terdapat delayed evidence sesuai Mastery Policy;
6. tidak ada critical misconception aktif pada long vowel, sokuon, yoon, atau core kana;
7. learner dapat memahami instruction set minimum Nekoru.

### 18.2 Verification set

Gate menggunakan stimulus yang:

- belum pernah diberikan dalam bentuk identik;
- mencakup single kana dan word decoding;
- mencakup audio-to-kana;
- mencakup hiragana, katakana, serta advanced marks;
- tidak menampilkan romaji;
- tidak menguji Kanji atau Grammar baru.

### 18.3 Jika gate gagal

Sistem membuat remedial terarah dan tetap dapat memberikan Listening yang eligible. Sistem tidak mengulang seluruh S0 kecuali evidence menunjukkan gap menyeluruh.

## 19. Validasi dan Lifecycle

~~~text
draft → academic_review → revision_required → approved → published
                                      └──────→ rejected
published → deprecated
~~~

Checklist akademik:

- mapping glyph–sound benar;
- contoh vocabulary alami dan sesuai unit;
- penjelasan mora/orthography tidak menyesatkan;
- formulaic chunk tidak memberi Grammar credit;
- answer key dan distractor tidak ambigu;
- difficulty serta prerequisite masuk akal.

Checklist teknis:

- Unicode NFC serta codepoint benar;
- font Jepang tidak menghasilkan tofu, clipping, atau substitution;
- small kana dan diacritic dapat dibedakan;
- audio cocok dengan transcript dan target sound;
- audio level, checksum, rights, dan attribution lengkap;
- romaji policy dapat ditegakkan per mode;
- item published memiliki approval akademik.

Checklist aksesibilitas:

- zoom 200% tetap terbaca;
- keyboard bukan satu-satunya cara menjawab;
- audio memiliki transcript untuk feedback dan kebutuhan akses yang tidak dinilai;
- visual tidak bergantung pada warna;
- accommodation tidak diam-diam mengubah konstruk scored item.

## 20. Versioning dan Migrasi

- **Major:** target KC, gate, atau unit sequence berubah sehingga mastery perlu migrasi.
- **Minor:** form variant, content item, speaker, atau remedial ditambah.
- **Patch:** typo, metadata, atau layout yang tidak mengubah jawaban.

Perubahan glyph mapping, canonical sound, answer key, accepted form, atau gate threshold memerlukan versi baru dan migration proposal. Evidence historis tetap menunjuk item_version, inventory_version, curriculum_version, dan mastery_policy_version yang digunakan.

## 21. Contoh Representasi

### 21.1 Kana KC

~~~yaml
id: KC.N5.KANA.HIRAGANA.KA
inventory_version: 0.1.0
domain: hiragana
target_type: mapping
canonical_form: か
canonical_sound: ka
display_label_id: hiragana_ka
first_unit_id: U02
required: true
prerequisites:
  - id: KC.N5.SOUND.MORA.CV
    type: hard
    threshold: 0.70
related_forms:
  - id: KC.N5.KANA.HIRAGANA.GA
    relation: voiced_variant
  - id: KC.N5.KANA.KATAKANA.KA
    relation: same_sound_other_script
example_vocabulary_ids:
  - KC.N5.VOCAB.FOUNDATION.KAO
  - KC.N5.VOCAB.FOUNDATION.KASA
evidence_blueprint:
  required_types: [audio_to_kana, word_decoding]
  delayed_eligible_types: [kana_to_audio, phrase_reading]
misconception_tags:
  - KANA.HIRAGANA.KA_CONFUSION
source_rationale:
  basis: core_hiragana_inventory
status: draft
~~~

### 21.2 Orthography KC

~~~yaml
id: KC.N5.ORTHOGRAPHY.HIRAGANA.SOKUON
inventory_version: 0.1.0
domain: orthography
target_type: contrast
canonical_form: っ
canonical_sound: geminate_marker
display_label_id: sokuon_kecil_tsu
first_unit_id: U03
required: true
prerequisites:
  - id: KC.N5.KANA.HIRAGANA.TSU
    type: hard
    threshold: 0.70
related_forms:
  - id: KC.N5.ORTHOGRAPHY.KATAKANA.SOKUON
    relation: same_rule_other_script
example_vocabulary_ids:
  - KC.N5.VOCAB.FOUNDATION.KITTE
  - KC.N5.VOCAB.FOUNDATION.GAKKOU
evidence_blueprint:
  required_types: [audio_discrimination, word_decoding]
  delayed_eligible_types: [audio_to_kana]
misconception_tags:
  - SOUND.SOKUON.OMITTED
status: draft
~~~

### 21.3 Content item

~~~yaml
id: ITEM.N5.FOUNDATION.AUDIO_TO_KANA.001
item_version: 0.1.0
content_pack_id: PACK.N5.S00.U02
unit_id: U02
activity_type: audio_to_kana
primary_kc_id: KC.N5.KANA.HIRAGANA.KA
supporting_kcs:
  - kc_id: KC.N5.SOUND.MORA.CV
    diagnostic_confidence: 0.75
stimulus:
  audio_asset_id: AUDIO.N5.FOUNDATION.KA.001
prompt_id: pilih_huruf_yang_kamu_dengar
options:
  - option_id: OPT.KA
    text: か
  - option_id: OPT.KI
    text: き
  - option_id: OPT.GA
    text: が
answer_key: OPT.KA
rationale_id: audio_mengucapkan_satu_mora_ka
hint_policy:
  learning: replay_once
  checkpoint: none
romaji_policy:
  before_answer: hidden
  after_answer: feedback_only
difficulty_band: target
rights:
  audio_license: proprietary_original
status: draft
~~~

Contoh ID Vocabulary dan audio harus tersedia pada inventory/content bank sebelum item dapat approved.

## 22. Acceptance Criteria

1. S0 memiliki definisi KC untuk sound, hiragana, katakana, dan orthography.
2. Distribusi U01–U04 tepat 100 V, 0 K, 0 G, 46 R, dan 44 L.
3. Seluruh 46 hiragana serta 46 katakana dasar tercakup sebagai recognition target.
4. Dakuten, handakuten, yoon, sokuon, dan long vowel memiliki direct serta delayed evidence.
5. Required KC mempunyai tiga encounter, dua activity type, dan stimulus bervariasi.
6. Romaji tidak dapat muncul pada checkpoint atau menjadi jawaban mastery.
7. Formulaic chunks tidak memberikan Grammar mastery.
8. Handwriting dan pitch accent tidak diperlukan untuk gate.
9. Gate S0 dapat direproduksi dari evidence dan policy version yang sama.
10. Kegagalan localized menghasilkan remedial localized.
11. Semua glyph dan audio lolos technical, rights, dan accessibility QA.
12. Runtime tidak membuat Kana KC, answer, threshold, atau mapping baru.
13. Tidak ada item draft yang dapat diberikan kepada learner.
14. Evidence historis tetap dapat direproduksi setelah content version berubah.

## 23. Metrik dan Pertanyaan Terbuka

Metrik minimum:

- accuracy serta response time per kana;
- confusion matrix glyph dan sound;
- romaji reveal rate;
- audio replay rate;
- word-decoding accuracy;
- delayed retention;
- median waktu menuju gate;
- remedial recovery rate;
- drop-off per unit;
- font/audio failure per device.

Pertanyaan yang divalidasi melalui data MVP:

- Apakah seluruh 46 kana perlu menjadi KC individual atau sebagian cukup sebagai cluster?
- Urutan hiragana mana yang menghasilkan transfer terbaik ke word decoding?
- Seberapa cepat romaji dapat dilepas tanpa menaikkan abandonment?
- Berapa variasi speaker yang diperlukan untuk Sound KC?
- Apakah katakana gate 80% cukup untuk memulai S1 tanpa menghambat Reading?
- Misconception mana yang paling kuat memprediksi kesulitan Kanji berikutnya?

## 24. Referensi

- [JLPT — Summary of Linguistic Competence Required for N5](https://www.jlpt.jp/e/about/levelsummary.html)
- [JLPT — Composition of Test Sections and Items](https://www.jlpt.jp/e/guideline/testsections.html)
- [JLPT — N5 Purposes of Test Items](https://www.jlpt.jp/e/guideline/pdf/n5_e_revised.pdf)
- [JLPT — Official Sample Questions](https://www.jlpt.jp/e/samples/forlearners.html)
- [JF Standard — Overview dan Can-do](https://www.jfstandard.jpf.go.jp/summaryen/ja/render.do)
- [Irodori — Starter A1](https://www.irodori.jpf.go.jp/en/starter/pdf.html)

Referensi diperiksa pada 13 September 2026. Konten eksternal menjadi acuan struktur dan level; teks, audio, ilustrasi, serta soal tidak boleh disalin tanpa hak penggunaan.
