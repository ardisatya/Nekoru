# Content Validation Rubric Nekoru — Pemula Absolut hingga JLPT N5

**Status:** Draft v0.1  
**Audiens:** Akademik, content operations, product, design, accessibility, legal/rights, data, AI, dan engineering  
**Cakupan MVP:** Fondasi pemula absolut sampai kesiapan internal JLPT N5  
**Bahasa pengantar:** Bahasa Indonesia  
**Tanggal:** 13 September 2026

## 1. Tujuan Dokumen

Dokumen ini mendefinisikan kontrak validasi konten Nekoru dari unit terkecil sampai rilis kurikulum. Rubric digunakan untuk:

1. menilai content item, asset, template, Knowledge Component (KC), inventory, learning object, lesson package, content pack, dan curriculum release;
2. memastikan akurasi akademik, kealamian bahasa Jepang, kualitas asesmen, kesesuaian level, masterability, aksesibilitas, hak penggunaan, dan integritas teknis;
3. menentukan apakah artefak harus disetujui, direvisi, ditolak, dikarantina, atau dihentikan dari publikasi;
4. menetapkan siapa yang berwenang menilai dan menyetujui setiap dimensi;
5. menghasilkan jejak audit yang dapat direproduksi berdasarkan versi konten, rubric, policy, schema, evaluator, dan asset yang sama;
6. mencegah konten buatan atau berbantuan AI masuk runtime tanpa validasi manusia yang sesuai.

Rubric ini memakai model hibrida:

- **mandatory gate pass/fail** untuk syarat yang tidak dapat dikompensasi;
- **skor kualitas 0–100** untuk membedakan kualitas konten yang sama-sama memenuhi gate;
- **severity temuan** untuk menentukan tindakan dan prioritas perbaikan.

Skor tinggi tidak dapat menutupi mandatory gate yang gagal.

## 2. Dokumen Sumber dan Batas Otoritas

Rubric ini diturunkan dari seluruh dokumen aktif di folder `docs`:

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

### 2.1 Hierarki keputusan

Jika dua dokumen membahas area yang sama, validator memakai aturan berikut:

1. Product Overview menetapkan visi, pengguna, ruang lingkup produk, dan batas MVP.
2. Arsitektur Kurikulum menetapkan outcome, domain, struktur stage/unit, distribusi, serta hierarki acuan akademik.
3. Mastery Specification menjadi sumber keputusan untuk evidence, mastery, content masterability, gate, dan readiness.
4. Learning Engine menjadi sumber keputusan untuk sequencing runtime, scheduler, prerequisite enforcement, review, dan remedial.
5. Practice Engine menjadi sumber keputusan untuk interaction, answer evaluation, feedback, audit, fallback, dan content integrity saat eksekusi.
6. Spesifikasi domain menjadi sumber keputusan untuk kontrak dan validasi khusus Sound/Kana, Vocabulary, Kanji, Grammar, Reading, atau Listening.
7. Content Progression menjadi sumber assignment authoring, urutan kanonik, lesson package, session allocation, dan rekonsiliasi target N5.

Versi berstatus `published` yang kompatibel selalu mengalahkan draft lama pada artefak yang sama. Jika konflik tidak dapat diselesaikan dengan hierarki di atas, artefak terdampak gagal gate `GOV-003` sampai pemilik keputusan mencatat resolusi. Validator tidak boleh memilih interpretasi secara diam-diam.

### 2.2 Keputusan aktif yang dipertahankan

- MVP mencakup fondasi Sound/Kana serta Vocabulary, Kanji, Grammar, Reading, dan Listening sampai N5.
- Speaking bebas, writing bebas, handwriting-scored, pronunciation scoring, dan pitch accent bukan target mastery MVP.
- Baseline kurikulum adalah 6 stage, 24 unit, 120 lesson package, 600 slot × 30 menit, 900 Vocabulary, 110 Kanji, 90 Grammar, 190 Reading objects, dan 210 Listening objects.
- S5 tetap memuat 40 Vocabulary reseptif untuk instruksi, teks, dan evaluasi serta 4 Grammar sebagai integrasi form–function, bukan perluasan substantive language ceiling, sampai revisi kurikulum resmi memutuskan lain.
- Mastery required KC memerlukan sedikitnya tiga direct encounters substantif, dua evidence types, independent retrieval, variasi stimulus, dan delayed evidence yang eligible setelah minimal tujuh hari.
- Hanya konten `approved` atau `published` yang kompatibel boleh digunakan untuk learner.
- AI dapat membantu drafting dan evaluasi yang terikat rubric, tetapi tidak menjadi otoritas akademik dan tidak dapat membuat target, jawaban, mapping, threshold, atau keputusan mastery saat runtime.

### 2.3 Ketergantungan yang belum final

- `assessment-specification-n5` belum tersedia sebagai dokumen tersendiri. Konten placement, checkpoint, dan simulation hanya dapat dipublikasikan jika mereferensikan Assessment Blueprint aktif yang telah disetujui. Ketiadaannya memblokir artefak asesmen terkait, bukan seluruh konten belajar.
- Target browser/device final untuk glyph, furigana, audio, dan accessibility QA belum ditetapkan. Release harus menyediakan `platform_matrix_version`; jika tidak tersedia, artefak yang bergantung pada rendering atau playback gagal gate teknis.
- Daftar final required/supporting/enrichment untuk seluruh 900 Vocabulary belum diputuskan. Tidak semua Vocabulary boleh dianggap required secara otomatis.

Nilai yang belum diputuskan harus tetap eksplisit sebagai `TBD`, `profile_incomplete`, atau dependency yang belum terpenuhi. Default tersembunyi dilarang.

## 3. Unit Validasi

Rubric diterapkan pada enam level berikut.

| Level | Unit | Contoh | Hasil minimum |
| --- | --- | --- | --- |
| L1 | Asset | Audio, glyph, SVG, ilustrasi, font reference, transcript | QA result dan approval sesuai modality |
| L2 | Content item/instance template | Multiple choice, cloze, matching, ordering, input Jepang, item audio | Answer/rubric, rationale, mapping KC, fixtures |
| L3 | KC/inventory entry atau learning object | Foundation KC, lexeme-sense, Kanji, Grammar concept, ReadingObject, ListeningObject | Schema valid, academic approval, pool coverage |
| L4 | Lesson package | L1–L5 pada setiap unit | Outcome, target, exposure, retrieval, integration, exit evidence |
| L5 | Content pack | Pack unit/stage yang versioned | Seluruh dependency kompatibel dan masterability tercapai |
| L6 | Curriculum release | Rilis pemula–N5 | Distribusi, graph, blueprint, gate, rights, dan audit lengkap |

Validasi level lebih tinggi tidak menggantikan validasi level di bawahnya. L5 hanya dapat lulus jika seluruh L1–L4 yang direferensikan lulus atau memiliki waiver yang diizinkan.

## 4. Lifecycle dan Keputusan Review

Lifecycle kanonik:

```text
draft → academic_review → revision_required → approved → published
                                      └──────→ rejected
published → deprecated
published/approved → quarantined → revision_required | deprecated | approved
```

Aturan transisi:

1. `draft → academic_review` memerlukan schema minimum dan authoring self-check.
2. `academic_review → approved` memerlukan seluruh mandatory gate lulus, tidak ada temuan `blocker` atau `major` terbuka, skor minimum terpenuhi, dan approval roles lengkap.
3. `approved → published` memerlukan automated release validation, compatibility check, version lock, dan content-pack approval.
4. Konten AI-assisted tidak boleh berpindah langsung dari `draft` ke `published`.
5. `rejected` digunakan untuk konten yang konstruknya salah, tidak dapat dibuktikan hak penggunaannya, menyalin materi terlarang, atau tidak layak diperbaiki secara proporsional.
6. `deprecated` tidak boleh dipilih untuk run baru, tetapi versi historis tetap tersedia untuk reproduksi evidence.
7. `quarantined` menghentikan pemilihan untuk run baru tanpa otomatis menghapus atau menghukum evidence historis.

## 5. Model Keputusan Hibrida

### 5.1 Mandatory gate

| Gate | Nama | Berlaku pada | Keputusan jika gagal |
| --- | --- | --- | --- |
| `GOV-001` | Status dan approval sah | L1–L6 | Blokir approval/publikasi |
| `GOV-002` | Separation of duties | L2–L6 | Blokir approval |
| `GOV-003` | Konflik sumber terselesaikan | L2–L6 | Blokir artefak terdampak |
| `SCH-001` | Schema dan field wajib valid | L1–L6 | Blokir build |
| `REF-001` | ID dan referensi utuh | L2–L6 | Blokir build |
| `ACA-001` | Akurasi akademik | L2–L6 | Blokir approval |
| `ACA-002` | Bahasa Jepang alami dan sesuai register | L2–L5 | Blokir approval |
| `CUR-001` | Scope, stage, unit, dan prerequisite sah | L2–L6 | Blokir build/publikasi |
| `ASM-001` | Konstruk, objective, dan question selaras | L2–L6 | Blokir approval |
| `ASM-002` | Answer/equivalence/rubric dan rationale lengkap | L2–L5 | Blokir approval |
| `ASM-003` | Tidak ada ambiguitas material | L2–L5 | Blokir approval atau karantina |
| `MAS-001` | Primary/supporting attribution valid | L2–L5 | Blokir scored use |
| `MAS-002` | Content Masterability Contract terpenuhi | L3–L6 | Blokir aktivasi required KC |
| `LOC-001` | Lokalisasi Indonesia tidak menyesatkan | L2–L5 | Blokir approval |
| `ACC-001` | Konstruk tetap utuh pada aksesibilitas | L1–L5 | Blokir scored use terkait |
| `RGT-001` | Rights, consent, dan attribution lengkap | L1–L6 | Blokir publikasi |
| `TEC-001` | Asset/rendering/playback/integrity valid | L1–L5 | Blokir modality atau publikasi terkait |
| `SEC-001` | Tidak ada answer leakage atau payload berbahaya | L1–L5 | Blokir publikasi |
| `VER-001` | Versioning dan reproduktibilitas | L1–L6 | Blokir publikasi |
| `AI-001` | Penggunaan AI berada dalam batas | L2–L6 | Blokir approval/publikasi |

### 5.2 Severity temuan

| Severity | Definisi | Contoh | Tindakan |
| --- | --- | --- | --- |
| `blocker` | Mengubah kebenaran, konstruk, hak penggunaan, keamanan, atau validitas evidence | Answer salah, dua jawaban sah, rights hilang, prerequisite putus, transcript membocorkan Listening | Tidak boleh approved/published; published item dikarantina |
| `major` | Risiko tinggi terhadap pemahaman, level, diagnosis, akses, atau konsistensi | Terjemahan menyesatkan, distractor non-diagnostik, difficulty melonjak, keyboard path tidak ekuivalen | Wajib diperbaiki dan direview ulang sebelum approval |
| `minor` | Tidak mengubah jawaban atau konstruk tetapi menurunkan mutu | Wording kurang ringkas, metadata non-kritis tidak konsisten, spacing kecil | Boleh masuk backlog hanya bila gate tetap lulus dan owner serta tenggat tercatat |
| `observation` | Saran peningkatan tanpa pelanggaran | Variasi konteks tambahan, peningkatan contoh | Tidak memblokir |

Satu temuan dapat dinaikkan severity-nya jika berulang, berdampak luas, atau menunjukkan kegagalan sistemik.

### 5.3 Skor kualitas

Setiap dimensi dinilai 0–4:

| Nilai | Interpretasi |
| ---: | --- |
| 0 | Tidak tersedia atau salah secara material |
| 1 | Banyak kekurangan; perlu ditulis ulang |
| 2 | Sebagian memenuhi; revisi signifikan diperlukan |
| 3 | Memenuhi standar rilis |
| 4 | Sangat kuat, jelas, dan siap dijadikan contoh |

Bobot skor:

| Dimensi | Bobot |
| --- | ---: |
| Akurasi akademik dan kealamian Jepang | 20 |
| Validitas konstruk, answer, rationale, dan distractor | 18 |
| Kesesuaian kurikulum, level, prerequisite, dan sequencing | 12 |
| Evidence mapping, diagnosis, dan masterability | 12 |
| Lokalisasi Bahasa Indonesia dan kejelasan instruksi | 8 |
| Asset, rendering, audio, dan integritas teknis | 10 |
| Aksesibilitas dan fairness | 8 |
| Rights, attribution, governance, versioning, dan audit | 12 |
| **Total** | **100** |

Rumus:

```text
quality_score = Σ((dimension_rating / 4) × dimension_weight)
```

Dimensi yang benar-benar tidak berlaku dapat diberi `N/A`; bobotnya dinormalisasi terhadap bobot yang berlaku. `N/A` harus memiliki alasan reviewer dan tidak boleh digunakan untuk menghindari mandatory gate.

### 5.4 Ambang keputusan

| Keputusan | Syarat |
| --- | --- |
| `approved` | Semua gate lulus; tidak ada blocker/major terbuka; skor ≥85; setiap dimensi berlaku ≥3 |
| `revision_required` | Gate dapat diperbaiki, ada blocker/major, skor 60–84, atau satu dimensi <3 |
| `rejected` | Rights/provenance tidak dapat dibuktikan, plagiarisme, konstruk tidak sesuai scope, atau skor <60 setelah review substantif |
| `published` | Sudah approved, release validator lulus, versions terkunci, pack/curriculum compatibility sah |
| `quarantined` | Published content memiliki indikasi kesalahan material, risiko keamanan/rights, atau operational threshold issue tercapai |

Skor digunakan untuk quality improvement dan audit, bukan untuk mengubah threshold mastery atau readiness.

## 6. Matriks Otoritas Reviewer

### 6.1 Peran

| Peran | Tanggung jawab utama |
| --- | --- |
| Content Author | Menulis artefak, melampirkan sumber keputusan, melakukan self-check; tidak menyetujui karyanya sendiri |
| Academic Lead | Scope, outcome, level, learning sequence, dan keputusan akademik akhir |
| Japanese Linguistic Reviewer | Akurasi Jepang, reading, grammar, naturalness, register, pragmatic nuance |
| Assessment Reviewer | Konstruk, objective, item type, answer, equivalence, scoring, distractor, dan ambiguity |
| Indonesian Localization Reviewer | Kejelasan Bahasa Indonesia, literal/communicative distinction, serta risiko transfer keliru |
| Domain Specialist | Sound/Kana, Kanji/glyph, Reading, Listening/audio, atau Grammar sesuai artefak |
| Accessibility Reviewer | Keyboard, screen reader, zoom, reduced motion, transcript/alt text, dan construct equivalence |
| Technical/Data Reviewer | Schema, ID/reference, normalization, checksum, compatibility, deterministic fixtures, dan auditability |
| Rights Reviewer | Originality, license, consent, attribution, dan batas penggunaan aset |
| Content Operations | Workflow, status, pack completeness, publication, quarantine, dan correction tracking |
| Product Owner | Konflik lintas-tim, scope produk, readiness behavior, serta perubahan production berisiko tinggi |

Satu orang boleh memegang beberapa peran jika kompetensinya terdokumentasi, tetapi pembuat atau AI generator tidak boleh menjadi satu-satunya academic/linguistic approver untuk artefak yang sama.

### 6.2 Authority matrix

Legenda: `A` = final approver, `R` = reviewer wajib, `C` = consulted bila relevan, `I` = informed.

| Keputusan | Author | Academic | Linguistic | Assessment | Localization | Domain | Accessibility | Technical | Rights | Content Ops | Product Owner |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Scope, outcome, requiredness, stage/unit | C | A | C | C | I | R | I | C | I | I | C |
| Kebenaran bahasa Jepang | C | A | R | C | C | R | I | I | I | I | I |
| Answer key, equivalence, scoring rubric | C | C | R | A | C | R | I | C | I | I | I |
| Distractor dan diagnostic mapping | C | R | R | A | C | R | I | C | I | I | I |
| Lokalisasi Bahasa Indonesia | C | C | R | C | A | C | C | I | I | I | I |
| Audio, transcript, dan speaker performance | C | C | R | R | I | A | R | R | R | I | I |
| Kanji glyph dan stroke animation | C | C | R | C | I | A | R | R | R | I | I |
| Accessibility equivalence | C | C | C | R | C | R | A | R | I | I | I |
| Schema, reference, asset integrity | I | C | I | C | I | C | C | A | C | R | I |
| Rights dan originality | C | I | I | I | I | C | I | C | A | R | I |
| Content-pack publication | I | R | C | R | C | C | R | R | R | A | I |
| Waiver teknis yang diizinkan | I | C | I | C | I | R | R | A | C | R | I |
| Perubahan konstruk/policy production | I | R | R | R | C | C | C | R | C | I | A |
| Quarantine | I | R | C | R | I | R | C | R | C | A | I |
| Adjudication dan historical recalculation | I | A | R | R | C | C | C | R | I | R | C |

Jika `A` menolak, status tidak boleh dinaikkan. Persetujuan harus menunjuk reviewer ID, role, timestamp, artefak/version, rubric version, hasil, dan komentar material.

## 7. Checklist Universal

Kolom hasil untuk setiap pemeriksaan adalah `pass`, `fail`, `not_applicable`, atau `not_tested`. `not_tested` memblokir approval jika kriteria diwajibkan pada level tersebut.

### 7.1 Governance, metadata, dan schema

| ID | Kriteria | Level | Bukti minimum | Gate |
| --- | --- | --- | --- | --- |
| `UNI-GOV-001` | ID stabil, unik, mengikuti pola domain, dan tidak digunakan ulang setelah deprecated | L1–L6 | Schema output dan uniqueness report | Ya |
| `UNI-GOV-002` | Version artefak, inventory, curriculum, content pack, policy, rubric, dan asset tersedia serta kompatibel | L1–L6 | Version manifest | Ya |
| `UNI-GOV-003` | Status lifecycle valid dan semua approval sesuai tahap tersedia | L1–L6 | Approval record | Ya |
| `UNI-GOV-004` | Author, penggunaan AI, reviewer, dan contributor/performer dicatat | L1–L6 | Attribution record | Ya |
| `UNI-GOV-005` | Source rationale menjelaskan alasan scope dan acuan, bukan mengklaim daftar resmi JLPT | L3–L6 | Source rationale | Ya |
| `UNI-GOV-006` | Seluruh field wajib schema terisi dan enum/reference dapat di-resolve | L1–L6 | Schema validation | Ya |
| `UNI-GOV-007` | Tanggal, locale, normalization, tokenizer/materializer/evaluator version dapat direproduksi | L1–L6 | Build manifest/fixture | Ya bila relevan |

### 7.2 Akurasi akademik dan kealamian

| ID | Kriteria | Level | Bukti minimum | Gate |
| --- | --- | --- | --- | --- |
| `UNI-ACA-001` | Arti, reading, ejaan, grammar, pronunciation, transcript, jawaban, dan rationale benar | L2–L5 | Linguistic review | Ya |
| `UNI-ACA-002` | Bahasa Jepang alami untuk konteks, relasi speaker, politeness, dan register | L2–L5 | Naturalness review | Ya |
| `UNI-ACA-003` | Contoh tidak memaksakan struktur Bahasa Indonesia ke bahasa Jepang | L2–L5 | Contrastive review | Ya |
| `UNI-ACA-004` | Nama, budaya, merek, atau pengetahuan dunia bukan kunci jawaban yang tidak diajarkan | L2–L5 | Bias/context review | Ya |
| `UNI-ACA-005` | Materi sensitif, tabu, atau berpotensi stereotip memiliki sensitivity note dan justifikasi | L2–L5 | Sensitivity review | Kondisional |

### 7.3 Kurikulum, level, dan prerequisite

| ID | Kriteria | Level | Bukti minimum | Gate |
| --- | --- | --- | --- | --- |
| `UNI-CUR-001` | Domain, stage, unit, category, difficulty, dan learning outcome sesuai progression aktif | L2–L6 | Curriculum mapping | Ya |
| `UNI-CUR-002` | Seluruh hard/soft/co-requisite valid, tidak dangling, dan graph hard prerequisite tidak bersiklus | L3–L6 | Graph validator | Ya |
| `UNI-CUR-003` | Stimulus, contoh, dan opsi tidak mengalami lexical, Kanji, Grammar, atau modality leakage tanpa support | L2–L5 | Ceiling/coverage report | Ya |
| `UNI-CUR-004` | Target baru tidak diduplikasi di unit lain tanpa anotasi lemma–sense atau keputusan versi | L3–L6 | Duplicate assignment report | Ya |
| `UNI-CUR-005` | Difficulty ditentukan dari faktor domain dan tidak hanya dari label “N5” | L2–L5 | Difficulty rationale | Ya |
| `UNI-CUR-006` | S5 tidak memperluas language ceiling secara substantif dan seluruh format N5 telah diperkenalkan sebelum simulation | L4–L6 | Coverage matrix | Ya |

### 7.4 Konstruk, pertanyaan, answer, dan feedback

| ID | Kriteria | Level | Bukti minimum | Gate |
| --- | --- | --- | --- | --- |
| `UNI-ASM-001` | Objective, stimulus, prompt, interaction type, answer, dan primary KC mengukur konstruk yang sama | L2–L5 | Assessment review | Ya |
| `UNI-ASM-002` | Format yang menuntut satu jawaban terbaik hanya mempunyai satu jawaban terbaik | L2–L5 | Answer verification | Ya |
| `UNI-ASM-003` | Semua accepted alternatives, sequences, normalization, omitted elements, dan equivalence dinyatakan eksplisit | L2–L5 | Answer policy | Ya |
| `UNI-ASM-004` | Item semi-terbuka memiliki reference answers, required features, allowed variants, forbidden features, partial-credit rule, rubric version, dan fallback | L2–L5 | Rubric fixture | Ya |
| `UNI-ASM-005` | Rationale menunjukkan bukti yang membuat jawaban benar dan distractor salah | L2–L5 | Rationale review | Ya |
| `UNI-ASM-006` | Prompt tidak dapat dijawab dari clue format, option length, typography, alt text, atau answer leakage | L2–L5 | Leakage test | Ya |
| `UNI-ASM-007` | Feedback akurat, sesuai mode, tidak membocorkan assessment sebelum release, dan tidak menambah fakta yang belum disetujui | L2–L5 | Feedback review | Ya |
| `UNI-ASM-008` | Partial credit hanya digunakan jika konstruk dapat dibagi dan mapping correctness telah disetujui | L2–L5 | Scoring rationale | Ya bila digunakan |

### 7.5 Distractor, misconception, dan remedial

| ID | Kriteria | Level | Bukti minimum | Gate |
| --- | --- | --- | --- | --- |
| `UNI-DIA-001` | Setiap distractor berasal dari misconception/error class yang sah | L2–L5 | Distractor rationale | Ya |
| `UNI-DIA-002` | Distractor tidak ambigu, tidak mustahil secara tidak relevan, dan tidak mengandalkan materi jauh di atas level | L2–L5 | Distractor review | Ya |
| `UNI-DIA-003` | Misconception tag, diagnostic confidence, dan remedial KC/content route telah disetujui | L2–L5 | Diagnostic mapping | Ya untuk assessed content |
| `UNI-DIA-004` | Critical misconception ditentukan dari pola lintas encounter, bukan satu respons biasa | L3–L5 | Policy reference | Ya |

### 7.6 Evidence dan masterability

| ID | Kriteria | Level | Bukti minimum | Gate |
| --- | --- | --- | --- | --- |
| `UNI-MAS-001` | Setiap scored item memiliki tepat satu primary KC | L2–L5 | KC mapping report | Ya |
| `UNI-MAS-002` | Supporting KC dideklarasikan sebelum publikasi dan hanya digunakan jika diagnosis sah serta confidence ≥0,50 | L2–L5 | Attribution review | Ya |
| `UNI-MAS-003` | Exposure, completion, tracing, animation view, romaji answer, transcript-aided Listening, dan post-reveal response tidak diberi mastery credit | L2–L5 | Evidence fixture | Ya |
| `UNI-MAS-004` | Satu passage/audio dengan banyak pertanyaan tetap menggunakan satu encounter stimulus | L2–L5 | Encounter fixture | Ya |
| `UNI-MAS-005` | Replay, retry, shuffle, atau duplicate submission tidak menggandakan encounter/evidence | L2–L5 | Idempotency fixture | Ya |
| `UNI-MAS-006` | Required KC memiliki ≥3 direct encounters, ≥2 evidence types, independent retrieval, applied/transfer item, variasi, dan delayed-evidence-eligible item berbeda | L3–L6 | Coverage report | Ya |
| `UNI-MAS-007` | Content pool menyediakan misconception rationale dan remedial content atau prerequisite route | L3–L6 | Masterability report | Ya |
| `UNI-MAS-008` | Modality yang didukung mempunyai coverage atau explicit unavailable behavior | L3–L6 | Modality matrix | Ya |
| `UNI-MAS-009` | Validation fixtures membuktikan item dapat menghasilkan semantics evidence yang dimaksud | L2–L6 | Fixture results | Ya |

### 7.7 Lokalisasi Indonesia

| ID | Kriteria | Level | Bukti minimum | Gate |
| --- | --- | --- | --- | --- |
| `UNI-LOC-001` | Bahasa Indonesia jelas bagi pengguna pemula dan istilah Jepang tidak menjadi prasyarat memahami instruksi | L2–L5 | Localization review | Ya |
| `UNI-LOC-002` | Transliteration, literal translation, dan communicative translation disimpan terpisah | L2–L5 | Data inspection | Ya bila tersedia |
| `UNI-LOC-003` | Penjelasan menandai perbedaan penting dengan Bahasa Indonesia tanpa membuat padanan palsu | L2–L5 | Contrastive review | Ya |
| `UNI-LOC-004` | Satu blok penjelasan pemula tidak membebani lebih dari satu ide baru tanpa alasan | L2–L4 | Cognitive-load review | Ya untuk S0 |

### 7.8 Rights, originality, dan penggunaan AI

| ID | Kriteria | Level | Bukti minimum | Gate |
| --- | --- | --- | --- | --- |
| `UNI-RGT-001` | Stimulus, example, distractor, script, audio, ilustrasi, mnemonic, font, dan vector original atau berlisensi | L1–L6 | Rights manifest | Ya |
| `UNI-RGT-002` | Konten tidak menyalin soal JLPT, Irodori, Marugoto, Genki, Minna no Nihongo, atau materi komersial | L1–L6 | Originality declaration/review | Ya |
| `UNI-RGT-003` | Voice manusia/TTS/generated voice mempunyai consent atau license; generated voice tidak meniru individu nyata tanpa izin | L1–L5 | Voice rights record | Ya bila audio |
| `UNI-AI-001` | AI assistance dan model/tool provenance dicatat sesuai policy | L1–L6 | Attribution record | Ya bila digunakan |
| `UNI-AI-002` | Reviewer manusia yang kompeten memvalidasi output AI-assisted | L1–L6 | Human approval | Ya |
| `UNI-AI-003` | Runtime AI hanya memakai approved facts, taxonomy, reference answer, rubric, dan feedback blocks | L2–L5 | Evaluator contract/fixture | Ya bila digunakan |
| `UNI-AI-004` | Output AI invalid, low-confidence, atau ambigu menghasilkan non-mastery/evaluation pending | L2–L5 | Failure fixture | Ya bila digunakan |

### 7.9 Aksesibilitas, fairness, dan keamanan

| ID | Kriteria | Level | Bukti minimum | Gate |
| --- | --- | --- | --- | --- |
| `UNI-ACC-001` | Konten dapat dibaca pada zoom 200%, kontras memadai, dan warna bukan satu-satunya penanda | L1–L5 | Visual QA | Ya |
| `UNI-ACC-002` | Semua interaction mempunyai keyboard path; alternatif non-pointer ekuivalen tersedia untuk drag-and-drop | L2–L5 | Interaction QA | Ya |
| `UNI-ACC-003` | Screen reader memakai language span `ja`/`id`, label bermakna, dan urutan baca benar | L1–L5 | Screen-reader QA | Ya |
| `UNI-ACC-004` | Reduced motion menyediakan static fallback atau step mode tanpa menghalangi materi | L1–L5 | Motion QA | Kondisional |
| `UNI-ACC-005` | Alt text membantu akses tetapi tidak membocorkan answer | L1–L5 | Alt-text review | Ya bila visual |
| `UNI-ACC-006` | Accommodation yang mengubah konstruk menghasilkan evidence class berbeda/non-mastery | L2–L5 | Equivalence decision | Ya |
| `UNI-ACC-007` | Failure glyph, font, audio, asset, atau modality tidak dihitung sebagai kesalahan learner | L1–L5 | Failure fixture | Ya |
| `UNI-FAI-001` | Item tidak mengandalkan stereotip atau demographic feature untuk difficulty/readiness | L2–L6 | Fairness review | Ya |
| `UNI-SEC-001` | HTML/text/SVG/vector tersanitasi dan tanpa script, handler, external URL, embedded font, atau network reference terlarang | L1–L5 | Sanitizer result | Ya |
| `UNI-SEC-002` | Answer key dan unreleased feedback assessment tidak tersedia di client sebelum release | L2–L5 | Security test | Ya untuk assessment |

### 7.10 Versioning, koreksi, dan reproduktibilitas

| ID | Kriteria | Level | Bukti minimum | Gate |
| --- | --- | --- | --- | --- |
| `UNI-VER-001` | Perubahan meaning, reading, formation, accepted answer, answer key, konstruk, stimulus, script, prosody kunci, mapping KC, atau rubric membuat version baru | L1–L6 | Changelog/diff classification | Ya |
| `UNI-VER-002` | Evidence historis tetap menunjuk exact version yang diberikan | L2–L6 | Historical replay fixture | Ya |
| `UNI-VER-003` | Deprecation memiliki replacement ID atau alasan tanpa pengganti | L1–L6 | Deprecation record | Ya |
| `UNI-VER-004` | Migration/adjudication menyatakan scope evidence, evaluator/version, dampak mastery, komunikasi learner, dan rollback | L2–L6 | Migration record | Ya bila berlaku |
| `UNI-VER-005` | Input, version, seed, slot values, dan manifest hash yang sama menghasilkan instance/evaluation yang sama | L2–L5 | Determinism fixture | Ya untuk template/evaluator |

## 8. Checklist Khusus Domain

Checklist domain melengkapi checklist universal. Semua kriteria dengan gate `Ya` wajib lulus untuk artefak domain terkait.

### 8.1 Sound, Hiragana, Katakana, dan Orthography

| ID | Kriteria | Gate |
| --- | --- | --- |
| `FND-001` | Mapping glyph–sound, mora, long vowel, sokuon, yoon, dakuten, dan handakuten benar | Ya |
| `FND-002` | Unicode NFC, codepoint, mora count, script, accepted answer, glyph confusables, dan font QA lengkap | Ya |
| `FND-003` | Seluruh 46 hiragana dan 46 katakana dasar tercakup sebagai recognition target | Ya pada full release |
| `FND-004` | U01–U04 tepat 100 Vocabulary, 0 Kanji baru, 0 Grammar formal baru, 46 Reading objects, dan 44 Listening objects | Ya pada full release |
| `FND-005` | Formulaic chunks tidak menghasilkan Grammar mastery | Ya |
| `FND-006` | Romaji mengikuti policy U01–U03, tidak tampil pada scored U04/checkpoint, dan tidak menjadi jawaban mastery | Ya |
| `FND-007` | Required KC mempunyai direct retrieval, application dalam kata/frasa, breadth, variasi, dan delayed evidence | Ya |
| `FND-008` | Verification set memakai stimulus non-identik, single kana, word decoding, audio-to-kana, kedua script, advanced marks, tanpa Kanji/Grammar baru | Ya |
| `FND-009` | Handwriting, tracing, speaking imitation, dan pitch accent tidak menjadi syarat gate | Ya |
| `FND-010` | Small kana, diacritic, dan pasangan confusable dapat dibedakan pada platform matrix | Ya |

### 8.2 Vocabulary

| ID | Kriteria | Gate |
| --- | --- | --- |
| `VOC-001` | Entry merepresentasikan satu lemma–sense; inflection tidak dihitung sebagai target baru | Ya |
| `VOC-002` | Lemma, canonical reading, satu preferred written form, sense, POS, inflection class, register, dan usage constraints benar | Ya |
| `VOC-003` | Minimal dua approved examples memberi variasi subjek, objek, waktu, atau situasi yang bermakna | Ya |
| `VOC-004` | Gloss, definition, literal/communicative translation, usage note, dan collocation menjaga batas sense | Ya |
| `VOC-005` | Vocabulary–Kanji links simetris; prerequisites dan co-requisites sah | Ya |
| `VOC-006` | Audio cocok dengan canonical reading dan register | Ya bila audio |
| `VOC-007` | Pool required KC memuat penggunaan/comprehension dan tidak hanya translation recognition | Ya |
| `VOC-008` | Distractor memakai semantic, orthographic, phonological, register, collocation, inflection, Indonesian-transfer, atau prerequisite class yang sah | Ya |
| `VOC-009` | Total full release tepat 900 primary entries sesuai distribusi kategori aktif | Ya pada full release |

### 8.3 Kanji

| ID | Kriteria | Gate |
| --- | --- | --- |
| `KAN-001` | Satu entry berisi tepat satu ideograph dengan canonical Unicode/codepoint benar | Ya |
| `KAN-002` | Minimal satu target reading muncul dalam approved Vocabulary; seluruh dictionary readings tidak diajarkan sekaligus | Ya |
| `KAN-003` | Meaning diajarkan melalui kata dan bukan diperlakukan sebagai terjemahan sempurna karakter | Ya |
| `KAN-004` | Okurigana, variant, furigana policy, dan visual confusables benar | Ya |
| `KAN-005` | Vocabulary links simetris dan Kanji baru hanya memakai mastered/co-requisite Vocabulary | Ya |
| `KAN-006` | Setiap entry memiliki approved vector stroke animation dan static fallback | Ya |
| `KAN-007` | Stroke count, index, order, direction, geometry, start/end point, timing, checksum, rights, dan QA result valid | Ya |
| `KAN-008` | Vector aman; seluruh path berada dalam viewBox; playback, step, speed, keyboard, dan reduced motion berfungsi | Ya |
| `KAN-009` | Tracing/animation view hanya interaction/exposure dan bukan mastery evidence | Ya |
| `KAN-010` | Font tidak menghasilkan tofu, clipping, substitution, furigana collision, atau visual distractor yang tidak terbaca | Ya |
| `KAN-011` | Total full release tepat 110 primary entries sesuai distribusi kategori aktif | Ya pada full release |

### 8.4 Grammar

| ID | Kriteria | Gate |
| --- | --- | --- |
| `GRA-001` | Setiap konsep adalah satu form–function pedagogis dan bukan duplikasi surface variant tanpa alasan | Ya |
| `GRA-002` | Function, meaning, form patterns, formation, constraints, register, politeness, variants, contrasts, dan common errors lengkap serta benar | Ya |
| `GRA-003` | Penjelasan membedakan topic, subject, object, ellipsis, particle, dan politeness tanpa padanan Indonesia palsu | Ya |
| `GRA-004` | Contoh alami dan tidak memuat lebih dari dua target baru lain tanpa dukungan | Ya |
| `GRA-005` | Sentence composition hanya menerima approved sequence/equivalence set | Ya |
| `GRA-006` | Semi-open item mempunyai rubric versioned dan gagal aman ke non-mastery/evaluation pending | Ya |
| `GRA-007` | Grammar evidence mencakup form/application; recognition fungsi saja tidak cukup | Ya |
| `GRA-008` | Selecting form, sentence composition, dan text grammar N5 seluruhnya terwakili | Ya pada full release |
| `GRA-009` | Total full release tepat 90 form–function concepts sesuai distribusi aktif | Ya pada full release |

### 8.5 Reading

| ID | Kriteria | Gate |
| --- | --- | --- |
| `REA-001` | ReadingObject memiliki objective, original/licensed stimulus, language profile, support policy, question, answer, rationale, rights, dan attribution | Ya |
| `REA-002` | Character/token counts, tokenizer version, lexical coverage, Kanji density, grammar ceiling, dan unknown support dapat direproduksi | Ya |
| `REA-003` | Instructional coverage ideal ≥90%; checkpoint ≥95% dan `unknown_unsupported = 0` kecuali blueprint mengizinkan | Ya |
| `REA-004` | Panjang, genre, comprehension type, layout, inference, dan timed policy sesuai stage/category | Ya |
| `REA-005` | Informasi jawaban tersedia dalam stimulus; pertanyaan mengukur reading, bukan trivia atau world knowledge | Ya |
| `REA-006` | Furigana/gloss/translation/highlight mengikuti support policy dan tidak menyelesaikan pertanyaan | Ya |
| `REA-007` | Rationale menunjukkan bukti dalam teks; distractor dapat ditolak dari teks | Ya |
| `REA-008` | Pertanyaan comprehension memakai Reading sebagai primary; mapping lintas-domain disetujui sebelum runtime | Ya |
| `REA-009` | Multi-question passage dihitung satu encounter stimulus | Ya |
| `REA-010` | Timed practice hanya diwajibkan pada S5 | Ya |
| `REA-011` | Seluruh format Reading N5 dan tepat 190 primary objects sesuai distribusi tersedia | Ya pada full release |

### 8.6 Listening

| ID | Kriteria | Gate |
| --- | --- | --- |
| `LIS-001` | ListeningObject memiliki outcome, script, audio, speaker, scene, question, answer, rationale, replay policy, rights, dan attribution | Ya |
| `LIS-002` | Transcript verbatim, normalized transcript, utterance timestamps, dan audio final identik secara substantif | Ya |
| `LIS-003` | Pronunciation, mora, number, name, register, prosody, intent, filler, dan ellipsis benar serta alami | Ya |
| `LIS-004` | Duration, 48 kHz/24-bit master baseline, delivery format, sekitar -16 LUFS ±2, true peak ≤-1 dBTP, mora rate, pause, noise/SNR, dan checksum tercatat | Ya, kecuali waiver teknis sah |
| `LIS-005` | Tidak ada clipping, dropout, hum berlebihan, sambungan janggal, atau level antar-item ekstrem | Ya |
| `LIS-006` | Speech-rate band, duration, speaker count, noise, information density, dan replay sesuai stage/mode | Ya |
| `LIS-007` | Noise bukan cara utama menaikkan difficulty | Ya |
| `LIS-008` | Transcript tidak tampil sebelum jawaban pada independent/checkpoint/simulation; transcript-aided answer bukan Listening evidence | Ya |
| `LIS-009` | Replay/seek/playback rate dapat diaudit dan tidak menggandakan encounter | Ya |
| `LIS-010` | Audio failure memakai retry/equivalent audio/technical skip, bukan transcript-scored fallback | Ya |
| `LIS-011` | Speaker rights/consent, voice source, performer attribution, dan device playback QA lengkap | Ya |
| `LIS-012` | Seluruh format Listening N5 dan tepat 210 primary objects sesuai distribusi tersedia | Ya pada full release |

## 9. Checklist Lesson, Template, Pack, dan Release

### 9.1 Lesson package

Setiap lesson package wajib:

1. memiliki satu Can-do atau outcome reseptif terukur;
2. mendeklarasikan target Vocabulary, Kanji, Grammar, Reading, dan Listening yang relevan;
3. memiliki exposure/noticing sebelum scored retrieval untuk KC baru;
4. memiliki guided practice dan direct independent retrieval;
5. memiliki Reading atau Listening terintegrasi;
6. memiliki exit check dengan item baru yang independen;
7. menyediakan delayed evidence schedule dan remedial route;
8. mematuhi batas baseline 8–12 Vocabulary, 2–4 Kanji, dan 1–2 Grammar baru per sesi 30 menit;
9. tidak mengubah keputusan scheduler, mastery, gate, atau readiness di dalam konten.

### 9.2 Parameterized template

Template hanya dapat approved jika seluruh hal berikut telah tervalidasi:

- purpose serta primary/supporting KC;
- slot schema dan allowed value pool;
- compatibility constraints antarslot;
- Grammar, lexical, Kanji, difficulty, dan modality ceiling;
- algoritma materialisasi yang deterministic;
- answer derivation dan equivalence policy;
- distractor generation rule;
- feedback/rationale template;
- rights dan attribution seluruh source assets;
- sample instances positif, boundary, dan invalid;
- validation fixtures;
- template version, materializer version, seed, slot values, dan manifest hash.

Runtime tidak boleh membuat target, answer key, distractor class, KC mapping, atau aturan grammar baru di luar template approved.

### 9.3 Content pack

Content pack lulus jika:

1. seluruh item, object, template, dan asset yang direferensikan berstatus approved/published;
2. pack version memenuhi minimum curriculum version dan seluruh compatibility range;
3. seluruh required KC memenuhi Content Masterability Contract;
4. tidak ada duplicate ID, dangling reference, hard-prerequisite cycle, atau asymmetric link;
5. content gap, modality coverage, fallback, dan unavailable behavior diketahui;
6. rights manifest, attribution, checksums, platform matrix, dan accessibility results lengkap;
7. assessment content mereferensikan approved blueprint;
8. signed/offline package, bila digunakan, mempunyai signature/checksum dan expiry policy;
9. rollback target dan previous compatible version tersedia.

### 9.4 Curriculum release

Full N5 release lulus jika:

1. tersedia 6 stage, 24 unit, dan 120 lesson package dengan outcome dan assignment target;
2. 600 session slot dapat direkonsiliasi sebagai 420 target/integration, 120 review, dan 60 checkpoint/remedial/simulation;
3. distribusi tepat 900 Vocabulary, 110 Kanji, 90 Grammar, 190 Reading objects, dan 210 Listening objects;
4. S0 mematuhi 100 V, 0 K, 0 G, 46 R, dan 44 L serta gate Kana;
5. seluruh format resmi N5 diperkenalkan sebelum simulation pertama;
6. S5 menjalankan sedikitnya dua simulation forms berbeda dan tidak menaikkan language ceiling secara substantif;
7. seluruh required KC diklasifikasikan eksplisit dan mempunyai content pool yang dapat mencapai mastered;
8. stage gate dan N5 Ready dapat direproduksi dari active Mastery Policy dan LevelMasteryProfile;
9. missing evidence menurunkan coverage dan tidak dianggap sempurna atau nol secara diam-diam;
10. terminal hard prerequisite, critical weakness, dan domain floor tetap menjadi veto;
11. release manifest, approvals, changelog, migration impact, observability, dan rollback lengkap.

## 10. Automated Validation dan Build Failure

Automation harus menolak build atau publication jika menemukan salah satu kondisi berikut:

1. field wajib hilang, enum tidak dikenal, duplicate ID, atau ID digunakan ulang;
2. reference, prerequisite, KC, learning outcome, content item, asset, answer, rationale, rubric, atau version tidak dapat di-resolve;
3. hard-prerequisite cycle, asymmetric Vocabulary–Kanji link, atau incompatible version;
4. required KC tidak mempunyai approved content pool yang memenuhi masterability;
5. scored item tidak mempunyai tepat satu primary KC;
6. answer key/rationale hilang, equivalence tidak eksplisit, distractor tanpa rationale, atau semi-open item tanpa rubric;
7. item/object/template/asset non-approved dapat dipilih runtime;
8. Reading/Listening object tidak mempunyai objective, question, answer, rationale, rights, diagnostic mapping, atau version;
9. checkpoint Reading melanggar unknown/coverage blueprint;
10. audio/transcript hilang, checksum mismatch, duration drift, atau audio QA gagal tanpa waiver yang sah;
11. Kanji codepoint/glyph salah, target reading tanpa word, stroke manifest hilang/tidak urut, vector tidak aman, atau static fallback tidak tersedia;
12. romaji, transcript, furigana, alt text, feedback, atau client payload membocorkan jawaban;
13. content distribution atau session reconciliation tidak cocok dengan release target;
14. lesson tidak mempunyai outcome, direct retrieval, integration object, exit evidence, atau delayed route;
15. rights/consent/attribution atau academic approval belum lengkap;
16. platform matrix wajib tidak tersedia atau QA platform terkait gagal;
17. deterministic instance/evaluation tidak dapat direproduksi;
18. security sanitizer gagal atau payload memiliki executable/external content terlarang.

Automated pass tidak menggantikan linguistic, academic, assessment, rights, atau accessibility review manusia.

## 11. Waiver

Waiver hanya boleh digunakan untuk variasi teknis yang tidak mengubah kebenaran, konstruk, jawaban, evidence semantics, rights, keamanan, atau aksesibilitas inti.

### 11.1 Tidak dapat di-waive

- jawaban/rationale salah atau ambigu;
- kesalahan akademik atau bahasa Jepang tidak alami secara material;
- prerequisite/level leakage tanpa support;
- missing primary KC, rubric, rights, consent, attribution, atau version;
- required KC yang tidak masterable;
- answer leakage;
- payload berbahaya;
- accessibility accommodation yang diam-diam mengubah konstruk;
- konten hasil salinan tanpa hak;
- approval akademik manusia untuk konten AI-assisted.

### 11.2 Dapat dipertimbangkan

- deviasi LUFS/peak, duration, encoding, atau delivery format yang telah diuji tidak mengubah intelligibility dan konstruk;
- variasi platform tertentu dengan fallback ekuivalen yang approved;
- metadata non-kritis sementara yang tidak memengaruhi runtime, audit, rights, atau reproduktibilitas.

Waiver wajib menyimpan:

1. kriteria dan artefak/version;
2. alasan serta bukti dampak;
3. risk rating;
4. compensating control/fallback;
5. reviewer dan approver sesuai authority matrix;
6. tanggal kedaluwarsa;
7. scope platform/release;
8. remediation owner;
9. rollback condition.

Waiver kedaluwarsa membuat artefak gagal validasi berikutnya.

## 12. Content Issue, Karantina, dan Koreksi

Issue dapat berasal dari learner report, reviewer, analytics, automated validator, incident, rights claim, atau drift monitoring. Kategori minimum:

- suspected_wrong_answer;
- ambiguous_prompt_or_options;
- inaccurate_or_unnatural_language;
- misleading_translation_or_feedback;
- audio_transcript_mismatch;
- glyph_furigana_rendering_failure;
- prerequisite_or_level_leakage;
- accessibility_failure;
- rights_or_attribution_issue;
- security_or_integrity_issue;
- difficulty_or_bias_drift.

Setiap issue menyimpan item/instance/version, submission/evaluation bila relevan, locale, platform, category, reporter source, evidence, severity, dan privacy-safe context.

### 12.1 Karantina

Content Operations mengarantina item untuk run baru jika:

- ada blocker yang terkonfirmasi;
- ada indikasi material yang belum dapat dipastikan tetapi risikonya tinggi;
- operational threshold laporan/ambiguity/device failure tercapai;
- rights atau security dipertanyakan;
- answer/evidence semantics mungkin salah.

Practice Engine menggunakan fallback equivalent yang approved atau technical skip. Transcript tidak boleh menggantikan failed Listening sebagai scored evidence.

### 12.2 Koreksi dan adjudication

1. Reviewer menentukan apakah perubahan adalah patch, minor, atau major.
2. Perubahan yang memengaruhi answer, accepted form, meaning, reading, formation, stimulus, script, intent, rubric feature, mapping KC, atau konstruk membuat version baru.
3. Evidence lama tidak ditulis ulang atau dipenalti otomatis.
4. Historical re-evaluation hanya dilakukan melalui adjudication/migration resmi.
5. Keputusan menyatakan evidence terdampak, evaluator/version baru, old-result retention, dampak Learning Engine, komunikasi learner, dan rollback.
6. Item hanya keluar dari karantina setelah seluruh gate relevan lulus dan approver baru tercatat.

## 13. Rekaman Review

Setiap hasil validasi minimal menyimpan:

```yaml
review_id: REVIEW.CONTENT.000001
rubric_version: 0.1.0
artifact:
  id: CONTENT.N5.READING.SHORT.001
  version: 1.0.0
  level: L3
  content_pack_id: PACK.N5.S02.U09
context:
  curriculum_version: 1.0.0
  inventory_versions: {}
  mastery_policy_version: 1.0.0
  assessment_blueprint_version: null
  platform_matrix_version: TBD
gate_results:
  UNI-ACA-001: pass
  UNI-ASM-002: pass
  UNI-MAS-006: not_applicable
quality_dimensions:
  academic_and_naturalness: 3
  assessment_validity: 3
  curriculum_fit: 4
  evidence_and_masterability: 3
  localization: 3
  technical_quality: 3
  accessibility_and_fairness: 3
  governance_and_rights: 3
quality_score: 78.00
findings:
  - id: FINDING.000001
    criterion_id: UNI-LOC-003
    severity: major
    summary: Penjelasan Indonesia menyiratkan padanan particle yang terlalu tetap.
    owner_role: Indonesian Localization Reviewer
decision: revision_required
reviewers:
  - reviewer_id: USER.0001
    role: Japanese Linguistic Reviewer
    decision: approved
  - reviewer_id: USER.0002
    role: Assessment Reviewer
    decision: revision_required
created_at: 2026-09-13T00:00:00+07:00
```

Contoh di atas menunjukkan bahwa gate yang lulus tidak otomatis menghasilkan approval jika skor atau temuan belum memenuhi ambang.

## 14. Sampling dan Kedalaman Review

Mandatory gate berikut selalu diperiksa 100% pada setiap artefak: schema/reference, academic accuracy, answer/rubric, primary KC, rights, status/version, serta security-sensitive asset checks.

Sampling hanya boleh digunakan untuk pemeriksaan tambahan pada kumpulan homogen setelah unit pembentuknya lulus individual review, misalnya visual consistency atau batch loudness trend. Aturan sampling:

1. sample plan, populasi, random seed, dan confidence target dicatat;
2. seluruh boundary/exception cases tetap diperiksa;
3. setiap blocker pada sample memperluas review menjadi 100% batch;
4. template parameterized harus menguji valid, boundary, incompatible, empty-pool, duplicate-value, dan deterministic replay fixtures;
5. AI-assisted batch tidak boleh hanya diperiksa dari satu contoh keluaran.

## 15. Monitoring Setelah Publikasi

Monitoring minimum:

- item ambiguity dan content report rate;
- distractor efficiency serta misconception distribution;
- difficulty drift, error rate, response time, dan delayed retention;
- prerequisite failure dan content-gap rate;
- rubric disagreement dan evaluation-pending age;
- glyph/rendering, audio/device, checksum, animation, dan accessibility failure;
- replay, transcript/furigana/romaji reveal, hint, dan fallback rate;
- bias pattern lintas device, modality, accommodation, dan kelompok relevan;
- deprecation, quarantine, adjudication, migration, dan rollback failure.

Analytics tidak boleh mengubah difficulty, requiredness, answer semantics, threshold, atau content status secara otomatis. Perubahan production memerlukan proposal versioned, academic/fairness review, approver, dan rollback.

## 16. Traceability ke Dokumen Sumber

| Area rubric | Sumber utama | Keputusan yang diturunkan |
| --- | --- | --- |
| Visi, pengguna, scope, dan approved-only delivery | Product Overview | N5 MVP, lima domain utama, fondasi pemula, AI-assisted validation, content bank/versioning |
| Hierarki akademik, distribusi, pipeline, dan status | Arsitektur Kurikulum | Tier A–D, 6 stage/24 unit, 900/110/90/190/210, rubrik minimum, lifecycle, automated release failure |
| Evidence, requiredness, masterability, dan historical integrity | Mastery Specification | Direct/breadth/delayed evidence, Content Masterability Contract, non-compensation, quarantine/adjudication |
| Prerequisite, review, remedial, gate, dan runtime AI | Learning Engine | Fail closed, deterministic/versioned decisions, scheduler ownership, AI tidak menetapkan mastery |
| Interaction, answer evaluation, feedback, asset integrity, dan fallback | Practice Engine | Answer/rubric contract, deterministic template, accessibility, issue reporting, quarantine, no retroactive penalty |
| Sound/Kana dan S0 | Beginner Foundations | Unicode/glyph/audio QA, romaji removal, 100/0/0/46/44, Kana gate, formulaic language boundary |
| Lesson, session, pack, dan full-release reconciliation | Content Progression | 120 lesson packages, 600 slot, authoring workflow, object contract, S5 treatment, build failures |
| Lexeme-sense dan Vocabulary evidence | Vocabulary Inventory | Entry contract, examples, distractor taxonomy, symmetric links, 900-entry release requirement |
| Kanji word-first dan stroke assets | Kanji Inventory | Target readings in words, furigana, vector manifest/static fallback, 110-entry release requirement |
| Form–function dan semi-open evaluation | Grammar Inventory | Constraints/contrasts/errors, explicit equivalence, versioned rubric, 90-concept release requirement |
| Reading stimulus dan language profile | Reading Blueprints | Coverage/ceiling, support policy, text-grounded rationale, encounter semantics, 190-object requirement |
| Listening script/audio dan replay policy | Listening Blueprints | Transcript fidelity, audio baselines, speaker rights, no transcript-scored fallback, 210-object requirement |

## 17. Acceptance Criteria Dokumen

Rubric ini dianggap siap digunakan jika:

1. seluruh level L1–L6 mempunyai unit validasi dan keputusan yang jelas;
2. mandatory gate tidak dapat dikompensasi oleh skor kualitas;
3. severity blocker/major/minor/observation menghasilkan tindakan yang konsisten;
4. skor 0–100 dapat direproduksi dari rating, bobot, dan aturan `N/A`;
5. authority matrix memisahkan authoring, review, approval, publication, quarantine, dan adjudication;
6. checklist universal serta domain mencakup Sound/Kana, Vocabulary, Kanji, Grammar, Reading, dan Listening;
7. Content Masterability Contract dapat diuji pada required KC dan content pack;
8. lesson, template, pack, dan curriculum release memiliki gate tersendiri;
9. automated failure rules dapat diturunkan menjadi schema/build fixtures;
10. rights, AI, accessibility, security, versioning, dan historical evidence tidak diperlakukan sebagai catatan opsional;
11. waiver terbatas dan tidak dapat melewati validitas akademik, rights, keamanan, konstruk, atau masterability;
12. quarantine dan correction tidak menghukum learner secara retroaktif;
13. dependency yang belum final tetap eksplisit dan hanya memblokir artefak terkait;
14. input, versions, approvals, dan hasil review yang sama menghasilkan keputusan yang dapat diaudit.

## 18. Definition of Done Implementasi

Implementasi rubric selesai jika tersedia:

1. schema versioned untuk Review, CriterionResult, Finding, Approval, Waiver, ContentIssue, QuarantineDecision, dan Adjudication;
2. registry criterion ID, applicability rules, evidence requirement, severity, dan owner role;
3. automated validators untuk schema, ID/reference, graph, distribution, coverage, asset integrity, answer leakage, dan version compatibility;
4. dashboard review yang menampilkan gate, score, findings, approvals, dependency, dan audit history;
5. reviewer workflow yang menegakkan separation of duties;
6. fixtures valid/invalid untuk setiap mandatory gate dan setiap domain;
7. integration dengan Content Bank, curriculum release, Practice Engine, dan Learning/Mastery Engine;
8. quarantine, fallback, correction, adjudication, migration, dan rollback workflow;
9. rights manifest dan platform QA matrix yang versioned;
10. reporting untuk quality drift, content gap, ambiguity, accessibility, audio/glyph failure, dan reviewer disagreement;
11. approval Academic Lead, Content Operations, Technical/Data, Accessibility, Rights, dan Product Owner untuk production rollout.
