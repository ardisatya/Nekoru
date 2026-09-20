# Grammar Inventory N5 — Spesifikasi Konten

**Status:** Draft v0.1  
**Audiens:** Product, akademik, content operations, data, AI, dan engineering  
**Cakupan:** Pemula absolut hingga kesiapan JLPT N5  
**Bahasa penjelasan:** Bahasa Indonesia  
**Tanggal:** 13 September 2026

## 1. Tujuan Dokumen

Dokumen ini mendefinisikan kontrak 90 konsep Grammar Nekoru: cara memisahkan konsep, menyimpan form dan function, memodelkan constraint serta contrast, membuat contoh dan distractor, dan menghasilkan evidence yang dapat dipakai Learning Engine.

Dokumen ini melengkapi [Arsitektur Kurikulum](../product-specs/curriculum-architecture.md), [Mastery Specification](../product-specs/mastery-specification.md), [Learning Engine](../product-specs/learning-engine.md), dan inventory domain lain di folder ini.

## 2. Keputusan Utama

| Area | Keputusan |
| --- | --- |
| Baseline MVP | 90 konsep internal tervalidasi |
| Unit penghitungan | Satu form–function pedagogis; bukan setiap string permukaan |
| Penjelasan | Bahasa Indonesia membedakan makna, struktur, constraint, dan nuansa |
| Contoh | Vocabulary/Kanji dibatasi oleh prerequisite |
| Contrast | Pola yang mudah tertukar diajarkan dan diuji secara eksplisit |
| Evidence | Form selection, sentence composition, application, dan text flow |
| Produksi bebas | Boleh untuk feedback, bukan evidence wajib N5 MVP |
| AI | Terikat rubric, reference answer, dan misconception taxonomy |

JLPT tidak menerbitkan daftar Grammar resmi. Inventory ini harus diperlakukan sebagai kurikulum internal berbasis fungsi komunikatif, coverage, format bukti resmi, dan review akademik.

## 3. Ruang Lingkup dan Batas

### Termasuk

- form, function, formation, meaning, constraint, register, dan pragmatic note;
- variants, contrast, prerequisite, example, common error, dan misconception;
- tipe aktivitas, answer equivalence, scoring rubric, versioning, serta validation.

### Tidak termasuk

- daftar lengkap 90 konsep pada versi dokumen ini;
- tata bahasa deskriptif Jepang secara menyeluruh;
- penilaian esai atau percakapan bebas;
- klaim bahwa satu padanan Bahasa Indonesia selalu identik dengan pola Jepang;
- keputusan runtime tentang mastery, unlock, atau readiness.

## 4. Model Konseptual

~~~text
GrammarConcept
├── Function
├── FormPattern[]
│   ├── Slot[]
│   └── FormationRule[]
├── Constraint[]
├── Contrast[]
├── ExampleRef[]
├── CommonError[]
└── EvidenceBlueprint
~~~

Satu konsep boleh memiliki beberapa surface form jika fungsi, constraint, dan jalur belajarnya sama. Form yang sama dengan fungsi atau constraint substantif berbeda harus menjadi konsep atau sense grammar terpisah.

## 5. Taxonomy

| Primary category | Target |
| --- | ---: |
| Fondasi kalimat, kopula, dan struktur nominal | 12 |
| Topic, case, location, direction, dan particles | 14 |
| Infleksi predikat, tense, polarity, dan politeness | 18 |
| Konstruksi verba, aspect dasar, dan sequence | 14 |
| Keinginan, ajakan, permintaan, izin, larangan, dan kewajiban | 14 |
| Modifikasi nomina, kuantitas, counter, dan perbandingan | 10 |
| Alasan, penghubung, penjelasan, dan text flow | 8 |
| **Total** | **90** |

Secondary tags: nominal_predicate, verbal_predicate, adjective, particle, tense, polarity, aspect, modality, request, permission, obligation, comparison, modification, connective, discourse.

## 6. Kontrak Data

| Field | Tipe | Wajib | Aturan |
| --- | --- | --- | --- |
| id | string | Ya | KC.N5.GRAMMAR.{CATEGORY}.{NNN} |
| inventory_version | semver | Ya | Versi inventory |
| canonical_label | string | Ya | Label stabil, bukan terjemahan saja |
| function_id | string | Ya | Tujuan komunikatif |
| meaning_id | string | Ya | Ringkasan makna Bahasa Indonesia |
| literal_gloss_id | string/null | Ya | Hanya jika berguna |
| form_patterns | array | Ya | Minimal satu |
| formation_rules | array | Ya | Per kelas kata yang relevan |
| constraints | array | Ya | Syntactic, semantic, pragmatic |
| register | enum | Ya | neutral, polite, casual, formal, service |
| politeness | enum | Ya | plain, polite, mixed_allowed |
| variants | array | Ya | Boleh kosong |
| contrasts | array | Ya | Boleh kosong tetapi harus direview |
| common_errors | array | Ya | Minimal satu untuk assessed concept |
| primary_category | enum | Ya | Tepat satu |
| secondary_tags | string[] | Ya | Boleh kosong |
| first_stage_id | string | Ya | S1–S5 |
| first_unit_id | string | Ya | U05–U24 |
| required | boolean | Ya | Memengaruhi readiness |
| prerequisites | array | Ya | KC grammar/vocab/kana/kanji |
| examples | array | Ya | Positive, negative, dan contrast sesuai kebutuhan |
| evidence_blueprint | object | Ya | Activity dan scoring |
| distractor_policy | object | Ya | Error-driven |
| source_rationale | object | Ya | Dasar pemilihan |
| attribution | object | Ya | Author, AI assistance, reviewer |
| status | enum | Ya | Lifecycle Bagian 13 |

### 6.1 FormPattern

Setiap pattern menyimpan pattern_id, notation, slots, allowed_inflections, omitted_elements, punctuation, dan rendering. Notasi authoring menggunakan placeholder eksplisit, misalnya:

~~~text
[NOUN] は [NOUN] です
[VERB-ます-STEM] たいです
~~~

Placeholder tidak ditampilkan mentah kepada learner.

### 6.2 Constraint

Constraint type minimum:

- syntactic_attachment;
- predicate_class;
- tense_or_polarity;
- animacy_or_semantics;
- speaker_intent;
- register_and_politeness;
- discourse_position;
- incompatibility.

### 6.3 CommonError

Setiap error menyimpan misconception_tag, incorrect_pattern, diagnosis_id, explanation_id, remedial_kc_ids, severity, dan approved_feedback_id.

## 7. Relasi dan Prasyarat

- hard prerequisite dipakai untuk form yang harus dikuasai agar target dapat dibentuk atau dipahami.
- Vocabulary dalam contoh harus mastered, co-requisite, atau diberi gloss non-target.
- Kanji di luar ceiling unit harus diberi furigana atau ditulis dengan form yang diizinkan.
- Contrast relation bersifat directed dan menyimpan contrast_dimension.
- Item scored memiliki tepat satu primary grammar KC; vocabulary atau Kanji hanya supporting jika benar-benar diagnostik.
- Kesalahan prerequisite diarahkan ke remedial prerequisite, bukan otomatis dianggap gagal pada seluruh konsep grammar.

## 8. Aturan Penjelasan dan Authoring

Urutan penjelasan default:

1. fungsi komunikatif;
2. arti ringkas;
3. pola struktur;
4. cara pembentukan;
5. constraint;
6. nuansa/register;
7. contoh;
8. contrast dan kesalahan umum;
9. ringkasan yang dapat di-recall.

Aturan:

- Bedakan subject, topic, object, dan pelesapan unsur tanpa memaksakan struktur Bahasa Indonesia.
- Jangan menyatakan particle sebagai satu terjemahan tetap.
- Jangan menjelaskan bentuk sopan sebagai “lebih benar” daripada bentuk plain.
- Contoh harus alami, singkat, dan tidak dibebani lebih dari dua target baru lain.
- Terjemahan harfiah dan komunikatif disimpan terpisah.
- Semua jawaban alternatif yang sah dicatat sebelum publikasi.
- Penjelasan AI tidak boleh keluar dari approved explanation facts dan examples.
- Romanisasi mengikuti policy kurikulum dan tidak digunakan setelah gate S0.

## 9. Activity dan Evidence Blueprint

| Activity type | Target | Weight | Catatan |
| --- | --- | ---: | --- |
| grammar_form_selection | Memilih bentuk yang sesuai | 1,00 | Format resmi |
| sentence_composition | Mengurutkan unsur | 1,00 | Grammar terstruktur |
| controlled_transformation | Mengubah tense/polarity/form | 1,00 | Direct retrieval |
| constrained_cloze | Mengisi slot dengan batas jelas | 1,00 | Rubric deterministik |
| function_to_form | Fungsi → pola | 0,90 | Applied |
| form_to_function | Pola → fungsi | 0,75 | Recognition |
| contrast_selection | Memilih antara pola mirip | 0,90 | Diagnosis |
| text_grammar | Menilai flow antar-kalimat | 0,90 | Format resmi |
| guided_build | Penyusunan dengan hint | 0,50 | Guided |
| explanation_view | Paparan | 0,00 | Non-mastery |

Sentence composition harus menerima hanya urutan yang telah divalidasi atau equivalence set yang eksplisit. Produksi semi-terbuka memerlukan rubric version; jika evaluasi gagal, event menjadi non_mastery.

## 10. Distractor, Error, dan Remedial

Distractor classes:

- wrong_particle_role;
- wrong_inflection;
- tense_mismatch;
- polarity_mismatch;
- politeness_mismatch;
- attachment_error;
- word_order_transfer;
- omitted_required_element;
- overexplicit_subject;
- contrast_confusion;
- text_flow_mismatch.

Distractor harus mewakili kesalahan yang dapat dijelaskan. Distractor tidak boleh salah hanya karena vocabulary di luar level, pengetahuan budaya, atau dua interpretasi yang sama-sama alami.

Critical misconception mencakup kesalahan yang menghalangi banyak KC berikutnya, misalnya klasifikasi verba salah atau peran particle dasar yang terus berulang. Aktivasi remedial mengikuti Learning Engine dan membutuhkan bukti lintas encounter.

## 11. Difficulty dan Sequencing

Faktor:

- jumlah dan jenis slot;
- banyaknya perubahan morfologis;
- opsi pelesapan;
- jarak dengan pola Bahasa Indonesia;
- jumlah contrast aktif;
- ketergantungan pada discourse;
- prerequisite depth;
- lexical/Kanji load pada stimulus.

Band:

- **easy:** form sangat terbatas, konteks eksplisit, satu contrast rendah;
- **target:** menuntut pemilihan form/fungsi sesuai unit;
- **stretch:** integrasi beberapa prerequisite atau text flow, tetap di bawah ceiling.

Satu konsep diperkenalkan melalui meaningful context, dilanjutkan noticing, controlled retrieval, application, lalu delayed probe. Satu sesi 30 menit memuat maksimal 1–2 konsep baru sesuai Learning Engine.

## 12. Answer Key dan Rubric

Item deterministik menyimpan correct_option_ids atau accepted_sequences. Item semi-terbuka menyimpan:

- reference_answers;
- required_features;
- allowed_variants;
- forbidden_or_incorrect_features;
- partial_credit_rule;
- rubric_version;
- fallback_static_feedback.

AI hanya boleh menilai terhadap rubric tersebut. AI tidak boleh menambah aturan grammar, menerima jawaban baru sebagai canonical, atau memberi mastery ketika confidence di bawah 0,50.

## 13. Validasi dan Lifecycle

~~~text
draft → academic_review → revision_required → approved → published
                                      └──────→ rejected
published → deprecated
~~~

Checklist:

- form, function, formation, constraint, nuance, dan register akurat;
- penjelasan Indonesia tidak menghasilkan transfer keliru;
- contoh dan jawaban alternatif alami;
- vocabulary/Kanji sesuai prerequisite;
- contrast serta common error dapat didiagnosis;
- item memiliki satu jawaban terbaik jika format menuntut;
- primary/supporting KC dan rubric version tersedia;
- reviewer linguistik/akademik menyetujui hasil AI-assisted.

Pipeline gagal jika form tanpa function, required concept tanpa approved item, distractor tanpa rationale, semi-open item tanpa rubric, atau reference ke KC tidak ditemukan.

## 14. Versioning

- **Major:** pemisahan/penggabungan konsep, perubahan function/constraint yang membatalkan mastery.
- **Minor:** variant, example, contrast, atau evidence type ditambah.
- **Patch:** typo atau wording penjelasan tanpa perubahan aturan/jawaban.

Perubahan formation, accepted answer, atau answer key pada published item membuat versi baru. Migration proposal wajib menjelaskan dampak pada mastery lama.

## 15. Contoh Representasi

~~~yaml
id: KC.N5.GRAMMAR.DESIRE.001
inventory_version: 0.1.0
canonical_label: verb-masu-stem-tai-desu
function_id: menyatakan_keinginan_pribadi
meaning_id: ingin_melakukan_sesuatu
literal_gloss_id: ingin_VERB
form_patterns:
  - pattern_id: PATTERN.TAI.POLITE
    notation: "[VERB-ます-STEM] たいです"
    slots: [verb_masu_stem]
formation_rules:
  - predicate_class: verb
    rule_id: remove_masu_add_tai_desu
constraints:
  - type: speaker_intent
    rule_id: direct_statement_normally_first_person
  - type: predicate_class
    rule_id: attaches_to_verb_masu_stem
register: neutral
politeness: polite
variants:
  - form: たくないです
    function: negative_desire
contrasts:
  - kc_id: KC.N5.GRAMMAR.INVITATION.001
    contrast_dimension: desire_vs_invitation
common_errors:
  - misconception_tag: GRAMMAR.TAI.DICTIONARY_FORM
    incorrect_pattern: "[VERB-DICTIONARY] たいです"
    remedial_kc_ids: [KC.N5.GRAMMAR.VERB.MASU_STEM]
    severity: normal
primary_category: keinginan_ajakan_permintaan_izin_larangan_dan_kewajiban
secondary_tags: [modality, desire]
first_stage_id: S4
first_unit_id: U17
required: true
prerequisites:
  - id: KC.N5.GRAMMAR.VERB.MASU_STEM
    type: hard
    threshold: 0.85
examples:
  - id: EX.N5.GRAMMAR.DESIRE.001
    ja: 日本へ行きたいです。
    literal_translation_id: Jepang_ke_pergi_ingin
    communicative_translation_id: Saya_ingin_pergi_ke_Jepang
evidence_blueprint:
  required_types: [grammar_form_selection, controlled_transformation]
  delayed_eligible_types: [constrained_cloze, text_grammar]
distractor_policy:
  allowed: [wrong_inflection, contrast_confusion]
source_rationale:
  basis: core_daily_function_and_curriculum_sequence
status: draft
~~~

## 16. Acceptance Criteria

1. Setiap konsep memiliki form, function, constraints, contrasts, dan common_errors yang direview.
2. Total 90 konsep tidak menggandakan surface variant sebagai konsep tanpa alasan.
3. Required KC memiliki sedikitnya tiga encounter, dua activity type, dan delayed evidence.
4. Sentence composition serta semi-open item memiliki equivalence/rubric eksplisit.
5. Prerequisite graph valid dan contoh berada di bawah lexical/Kanji ceiling.
6. AI runtime hanya memakai approved facts, rubric, dan feedback.
7. Versioning mempertahankan reproduktibilitas evidence.
8. Seluruh format Grammar N5 resmi terwakili: selecting form, sentence composition, dan text grammar.

## 17. Metrik dan Pertanyaan Terbuka

Metrik: error per misconception, contrast confusion rate, rubric disagreement, item ambiguity report, delayed retention, dan prerequisite failure rate.

Pertanyaan MVP:

- Konsep mana yang perlu dipecah berdasarkan form–function agar diagnosis lebih akurat?
- Penjelasan Indonesia mana yang justru memperkuat transfer keliru?
- Kapan supporting evidence dari Reading cukup diagnostik untuk Grammar?
- Berapa variasi sentence composition yang diperlukan untuk mencegah hafalan posisi?

## 18. Referensi

- [JLPT — Composition of Test Sections and Items](https://www.jlpt.jp/e/guideline/testsections.html)
- [JLPT — N5 Purposes of Test Items](https://www.jlpt.jp/e/guideline/pdf/n5_e_revised.pdf)
- [JLPT — Official Sample Questions](https://www.jlpt.jp/e/samples/forlearners.html)
- [JLPT — FAQ tentang tidak adanya daftar resmi](https://www.jlpt.jp/e/faq/)
- [JF Standard — Overview dan Can-do](https://www.jfstandard.jpf.go.jp/summaryen/ja/render.do)
- [Irodori — Starter A1](https://www.irodori.jpf.go.jp/en/starter/pdf.html)

Referensi diperiksa pada 13 September 2026. Materi eksternal menjadi acuan, bukan sumber yang boleh disalin.
