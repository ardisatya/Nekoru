# Content Seed U01 — Milestone 1 Nekoru

**Status:** Approved v1.0 untuk keputusan scope seed; content assets tetap menunggu review  
**Tanggal:** 13 September 2026  
**Pemilik:** Academic/Content  
**Required reviewers:** Japanese Linguistic, Learning Science, Indonesian Localization, Assessment, Accessibility, Rights, Audio, Engineering, dan QA  
**Cakupan:** Subset U01-L1 “Suara Jepang pertama” untuk walking skeleton online-only  
**Bukan:** U01 lengkap, S0 gate pack, atau corpus production

## 1. Tujuan

Dokumen ini menentukan seed konten pertama yang cukup untuk mengimplementasikan dan menguji journey Milestone 1:

```text
approved content pack
→ deterministic session plan
→ exposure/noticing
→ guided practice
→ independent retrieval
→ feedback
→ evidence
→ provisional mastery/review scheduling
→ session summary
```

Seed menggunakan kontrak yang sama dengan U01–U24. Ukurannya sengaja kecil agar arsitektur, runtime, evidence, mastery, accessibility, versioning, dan audit dapat diuji sebelum produksi seluruh corpus.

## 2. Dokumen Sumber

- [Implementation Readiness](../product-specs/implementation-readiness.md)
- [Domain Model and Schemas](../product-specs/domain-model-and-schemas.md)
- [Learning Policy and Registry N5](../product-specs/learning-policy-and-registry-n5.md)
- [Beginner Foundations N5](./beginner-foundations-n5.md)
- [Content Progression N5](./content-progression-n5.md)
- [Content Validation Rubric](../product-specs/content-validation-rubric.md)
- [Practice Engine](../product-specs/practice-engine.md)
- [Practice Interactions](../ui-ux/06-practice-interactions.md)
- [Accessibility, Content, and Edge Cases](../ui-ux/08-accessibility-content-and-edge-cases.md)

## 3. Posisi dalam Kurikulum

| Atribut | Nilai |
| --- | --- |
| Program | `N5_ABSOLUTE_BEGINNER` |
| Stage | `S0` — Fondasi Aksara dan Bunyi |
| Unit | `U01` — Bunyi, mora, sapaan, dan bahasa kelas |
| Lesson | `U01-L1` — Suara Jepang pertama |
| Content sessions | Tiga session blueprint |
| Vocabulary assignment | `V-U01-01`–`V-U01-04` |
| Sound focus | Lima vokal `/a i u e o/` dan awareness mora dasar |
| Reading objects | Dua label/symbol-awareness objects |
| Listening objects | Dua vowel/greeting objects dengan variant audio |
| Hard prerequisite | Tidak ada |
| Grammar/Kanji target | Tidak ada |

Seed ini tidak mengubah assignment U01 penuh: 20 functional Vocabulary, 10 Reading objects, dan 12 Listening objects. Ia hanya mengimplementasikan bagian U01-L1.

## 4. Outcome Seed

Setelah tiga session dan delayed review tersedia, learner diharapkan dapat:

1. membedakan lima vokal Jepang pada stimulus terkontrol;
2. mengenali bahwa ritme Jepang tersusun dalam unit mora sederhana;
3. memilih fungsi empat sapaan dasar sesuai konteks;
4. memahami perbedaan umum hiragana, katakana, dan kanji sebagai exposure tanpa tuntutan hafalan;
5. merespons aktivitas audio/visual melalui single-choice dan select-to-pair;
6. melihat feedback Bahasa Indonesia yang singkat dan dapat ditindaklanjuti.

Outcome ini tidak menyatakan bahwa learner telah menyelesaikan U01, menguasai kana, melewati S0, atau siap mengikuti assessment N5.

## 5. Inventory Target

### 5.1 Sound Knowledge Components

| ID | Target | Type | Requiredness seed | Evidence requirement |
| --- | --- | --- | --- | --- |
| `KC.N5.SOUND.VOWEL.A` | Mengenali vokal `/a/` | recognition | required | Direct discrimination + varied retrieval |
| `KC.N5.SOUND.VOWEL.I` | Mengenali vokal `/i/` | recognition | required | Direct discrimination + varied retrieval |
| `KC.N5.SOUND.VOWEL.U` | Mengenali vokal `/u/` | recognition | required | Direct discrimination + varied retrieval |
| `KC.N5.SOUND.VOWEL.E` | Mengenali vokal `/e/` | recognition | required | Direct discrimination + varied retrieval |
| `KC.N5.SOUND.VOWEL.O` | Mengenali vokal `/o/` | recognition | required | Direct discrimination + varied retrieval |
| `KC.N5.SOUND.MORA.BASIC` | Mengenali satuan ritmis sederhana | discrimination | required | Mora count + application in greeting chunk |

`required` pada tabel berarti required untuk outcome seed, bukan keputusan requiredness final LevelMasteryProfile N5.

### 5.2 Diagnostic contrasts

Content pool wajib mencakup pasangan yang berpotensi sulit bagi pengguna Indonesia:

- `/a/`–`/i/`;
- `/i/`–`/e/`;
- `/u/`–`/o/`;
- `/e/`–`/o/`;
- stimulus satu mora dan dua mora.

Pasangan final, tingkat kemiripan, serta naturalness harus diverifikasi oleh reviewer Japanese Linguistic. Runtime tidak membuat contrast baru.

### 5.3 Functional Vocabulary

| ID | Form | Fungsi pedagogis | Status dalam seed |
| --- | --- | --- | --- |
| `KC.N5.VOCAB.FOUNDATION.OHAYOU_GOZAIMASU` | おはようございます | Sapaan pagi yang sopan | target |
| `KC.N5.VOCAB.FOUNDATION.KONNICHIWA` | こんにちは | Sapaan siang/umum | target |
| `KC.N5.VOCAB.FOUNDATION.KONBANWA` | こんばんは | Sapaan malam | target |
| `KC.N5.VOCAB.FOUNDATION.SAYOUNARA` | さようなら | Salam perpisahan | target |

Empat entry diperlakukan sebagai formulaic chunks. Mereka tidak memberikan Grammar mastery dan tidak dipecah menjadi pola grammar pada U01.

### 5.4 Script awareness

| ID | Target | Evidence class |
| --- | --- | --- |
| `EXPOSURE.N5.SCRIPT.HIRAGANA` | Hiragana sebagai sistem tulisan | exposure only |
| `EXPOSURE.N5.SCRIPT.KATAKANA` | Katakana sebagai sistem tulisan | exposure only |
| `EXPOSURE.N5.SCRIPT.KANJI` | Kanji sebagai sistem tulisan | exposure only |

Script awareness tidak memiliki mastery score pada seed dan tidak boleh dipakai untuk menyimpulkan kemampuan membaca.

## 6. Localized Content Contract

### 6.1 Instruction strings

| Key | Baseline Bahasa Indonesia |
| --- | --- |
| `u01_l1_goal` | “Kenali lima bunyi vokal dan empat sapaan dasar.” |
| `listen_and_choose` | “Dengarkan, lalu pilih jawaban.” |
| `match_sound_and_label` | “Pasangkan bunyi dengan label yang sesuai.” |
| `choose_greeting_for_context` | “Pilih sapaan yang sesuai dengan situasi.” |
| `try_again` | “Coba sekali lagi.” |
| `replay_audio` | “Putar ulang audio.” |
| `continue` | “Lanjutkan” |
| `finish_session` | “Selesaikan sesi” |

Copy adalah baseline content design dan harus melalui readability serta screen-reader review. Instruction tidak boleh bergantung pada istilah linguistik yang belum dijelaskan.

### 6.2 Explanation blocks

Seed membutuhkan explanation block berikut:

1. `EXPL.U01.WRITING_SYSTEMS` — orientasi singkat tiga sistem tulisan;
2. `EXPL.U01.FIVE_VOWELS` — lima vokal dengan audio dan visual sederhana;
3. `EXPL.U01.MORA_INTRO` — mora diperkenalkan melalui contoh konkret;
4. `EXPL.U01.GREETING_CONTEXT` — fungsi sapaan berdasarkan waktu/konteks;
5. `EXPL.U01.ROMAJI_SUPPORT` — romaji sebagai bantuan sementara, bukan target.

Setiap block memuat `id`, `version`, `title`, `body_id`, `ja_examples`, `audio_refs`, `illustration_refs`, `reading_level_note`, `rights`, `accessibility`, dan `status`.

## 7. Romaji dan Support Policy

| State | Romaji | Evidence effect |
| --- | --- | --- |
| First exposure | Tampil bersama audio | Exposure only |
| Guided practice | Boleh tampil atau diminta | Guided evidence; tidak memenuhi breadth |
| Independent vowel discrimination | Tidak diperlukan dan tidak tampil | Direct evidence |
| Greeting recognition | Tersembunyi sebelum respons; feedback-only sesudah respons | Direct/applied evidence |
| Delayed review | Tersembunyi | Eligible untuk retention jika syarat lain terpenuhi |

Romaji reveal dicatat sebagai hint. Romaji tidak pernah menjadi jawaban yang wajib diketik atau dipilih untuk mastery.

## 8. Audio Asset Plan

### 8.1 Minimum asset set

| Kelompok | Jumlah minimum | Variasi |
| --- | ---: | --- |
| Vokal tunggal | 10 | Lima vokal × dua speaker |
| Greeting chunks | 8 | Empat chunks × dua speaker |
| Mora examples | 6 | Tiga pola × dua speaker |
| Instruction cue non-scored | 2 | Optional contextual audio |
| **Total** | **26** | Sebelum derivative encoding |

### 8.2 Metadata wajib

Setiap audio asset memiliki:

- stable ID dan immutable version;
- exact Japanese transcript internal;
- speaker ID pseudonymous, voice profile, dan consent/release reference;
- recording source dan production date;
- sample rate, channels, duration, loudness, silence, dan clipping QA;
- master lossless reference;
- delivery derivative reference;
- SHA-256 checksum;
- rights owner/license;
- accessibility alternative;
- review status dan platform QA result.

### 8.3 Playback

- tidak autoplay;
- replay diizinkan saat learning;
- perubahan playback speed hanya tersedia pada guided exposure dan membuat evidence scored tidak eligible;
- audio failure menghasilkan retry atau approved alternate activity, bukan incorrect;
- transcript tidak ditampilkan sebelum respons pada direct Listening/Sound evidence.

## 9. Reading dan Listening Objects

### 9.1 Reading object slots

| ID | Jenis | Tujuan | Scoring |
| --- | --- | --- | --- |
| `R-U01-L1-01` | Script/label awareness | Membedakan fungsi visual tiga sistem tulisan secara konseptual | Exposure/non-mastery |
| `R-U01-L1-02` | Greeting label micro-match | Memilih greeting dari context cue sederhana | Applied Vocabulary evidence |

`R-U01-L1-02` tidak boleh mengklaim Reading comprehension formal karena learner belum mempelajari kana secara sistematis.

### 9.2 Listening object slots

| ID | Jenis | Tujuan | Scoring |
| --- | --- | --- | --- |
| `L-U01-L1-01` | Vowel discrimination | Membedakan vowel target dari audio | Direct Sound evidence |
| `L-U01-L1-02` | Greeting context | Memilih fungsi greeting dari situasi pendek | Applied Vocabulary evidence |

Setiap object memiliki beberapa activity instances yang menggunakan speaker/stimulus/order berbeda tetapi tetap mengunci answer dan mapping sebelum runtime.

## 10. Activity Definition Set

### 10.1 Required definitions

| Family ID | Activity | Interaction | Primary target | Count minimum |
| --- | --- | --- | --- | ---: |
| `ADF.U01.VOWEL.SINGLE_CHOICE` | `sound_discrimination` | `single_choice` | Sound vowel KC | 15 |
| `ADF.U01.VOWEL.PAIR` | `sound_discrimination` | `select_to_pair` | Sound vowel KC | 5 |
| `ADF.U01.MORA.COUNT` | `mora_classification` | `single_choice` | Mora Basic KC | 6 |
| `ADF.U01.GREETING.CONTEXT` | `listening_quick_response` | `single_choice` | Functional Vocabulary KC | 12 |
| `ADF.U01.GREETING.PAIR` | `form_to_meaning` | `select_to_pair` | Functional Vocabulary KC | 4 |
| `ADF.U01.SCRIPT.AWARENESS` | `explanation_view` | non-scored navigation | Script exposure | 1 |

Count menunjukkan minimum distinct approved definitions/variants dalam seed. Shuffle atau replay tidak dihitung sebagai variant baru.

### 10.2 Variation rules

- setiap Sound KC muncul pada sedikitnya tiga direct encounters;
- sedikitnya dua speaker digunakan untuk setiap vowel target;
- posisi answer seimbang dan tidak menjadi clue;
- pasangan contrast tidak selalu muncul dalam urutan yang sama;
- greeting context menggunakan visual/situational cue original dan tidak stereotip;
- item delayed review berbeda secara substantif dari anchor item;
- satu stimulus multi-question tetap satu encounter;
- item yang hanya mengganti warna, urutan, atau speaker file identik tidak otomatis menjadi stimulus baru.

## 11. Session Blueprints

### 11.1 Session U01-L1-A — Encounter

**Target duration:** 20–25 menit untuk learner baru.  
**Tujuan:** Orientasi, exposure lima vokal, dan discrimination awal.

```text
Goal preview
→ writing-system awareness
→ five-vowel model with user-controlled audio
→ noticing dua contrast awal
→ guided single-choice
→ independent vowel discrimination
→ short exit check
→ summary
```

Tidak ada target mastery yang dijanjikan. Minimal tiga direct retrieval responses diperlukan agar session menjadi meaningful learning.

### 11.2 Session U01-L1-B — Greeting Context

**Target duration:** 20–25 menit.  
**Tujuan:** Menghubungkan empat greeting chunks dengan waktu dan situasi.

```text
Warm-up vowel retrieval
→ greeting model/context
→ guided matching
→ independent context choice
→ audio quick response
→ exit check
→ summary and review schedule
```

### 11.3 Session U01-L1-C — Verify and Mix

**Target duration:** 20–25 menit.  
**Tujuan:** Mixed retrieval untuk vowel, mora awareness, dan greeting function.

```text
Due review
→ mixed vowel discrimination with second speaker
→ mora count examples
→ greeting select-to-pair
→ independent exit probes
→ summary
```

Jika session dilaksanakan kurang dari tujuh hari setelah anchor, hasilnya belum menjadi qualifying delayed evidence. Delayed review dijadwalkan terpisah.

### 11.4 Delayed review

Delayed review tersedia setelah minimal tujuh hari dan menggunakan:

- speaker atau recording berbeda;
- item/order berbeda;
- tanpa romaji;
- tanpa hint kuat atau answer reveal sebelum submission;
- direct retrieval pada vowel serta greeting context.

## 12. Feedback Contract

Setiap scored item memiliki:

1. acknowledgement hasil tanpa menghakimi;
2. jawaban atau relation yang benar setelah release diizinkan;
3. rationale satu ide utama;
4. replay untuk audio bila policy mengizinkan;
5. misconception-specific guidance jika mapping tersedia;
6. next action: lanjut, coba item baru, atau lihat penjelasan.

Contoh tone:

- benar: “Tepat. Bunyi yang kamu dengar adalah /a/.”
- salah: “Belum tepat. Dengarkan perbedaan /i/ dan /e/ sekali lagi.”
- teknis: “Audio belum dapat diputar. Jawaban ini tidak dinilai.”
- hint: “Coba dengarkan bagian awalnya sekali lagi.”

Copy final harus berada dalam string catalog; contoh tidak menjadi hardcoded UI text.

## 13. Evidence Mapping

| Activity | Evidence class | Activity weight | Hint constraint | Delayed eligible |
| --- | --- | ---: | --- | --- |
| Vowel independent discrimination | direct | `1.00` | none/light | Ya dengan stimulus baru |
| Vowel guided choice | direct-guided | `0.50` | allowed | Tidak untuk breadth |
| Vowel select-to-pair | direct | `1.00` | none | Ya |
| Mora count | applied | `0.90` | none/light | Ya |
| Greeting context choice | applied | `0.90` | none | Ya |
| Greeting guided pair | guided | `0.50` | allowed | Tidak untuk breadth |
| Script awareness | exposure | `0.00` | N/A | Tidak |

Scored item memiliki tepat satu primary KC. Supporting KC hanya menerima `0.35 × diagnostic_confidence` bila mapping telah disetujui.

## 14. Misconception Mapping

| Tag | Trigger candidate | Confirmation | Remedial |
| --- | --- | --- | --- |
| `KANA_SOUND_MAPPING_REVERSED` | Memilih label yang sama secara terbalik pada ≥1 diagnostic item | Item baru dengan urutan berbeda | Replay model lalu direct rematch |
| `MORA_LENGTH_IGNORED` | Menganggap stimulus berbeda panjang sebagai sama | Contrast baru dengan speaker berbeda | Visual mora blocks + audio, lalu independent choice |
| `ROMAJI_DEPENDENCE` | Hasil turun konsisten ketika romaji dihilangkan | Probe tanpa romaji pada stimulus dikenal | Kurangi support bertahap; jangan memberi mastery dari romaji |
| `VOCAB_GREETING_CONTEXT_CONFUSION` | Greeting dipilih untuk waktu/context yang salah | Situational cue baru | Contrast table singkat lalu context retrieval |

Satu diagnostic response hanya menghasilkan `suspected`. Status `confirmed` memerlukan dua evidence konsisten pada encounter berbeda.

## 15. Content Pack Manifest

```yaml
content_pack:
  id: PACK.N5.S00.U01.L1.SEED
  version: 1.0.0
  status: draft
  purpose: milestone_1_walking_skeleton
  curriculum_ref: CURRICULUM.N5@1.0.0
  policy_package_ref: pol_n5_baseline@1.0.0
  scope:
    stage: S0
    unit: U01
    lesson: U01-L1
    completeness_claim: partial_seed
  knowledge_components: []
  vocabulary_entries: []
  explanation_blocks: []
  reading_objects: []
  listening_objects: []
  activity_definitions: []
  assets: []
  string_catalog_ref: STRINGS.ID.U01.L1@1.0.0
  validation_result_ref: null
  approval_refs: []
  manifest_hash: sha256:TBD
```

Array diisi exact version references, bukan floating/latest references. Status hanya dapat berubah menjadi `approved` setelah seluruh mandatory gate lulus.

## 16. Rights dan Provenance

1. Stimulus, recording, illustration, prompt, distractor, rationale, dan explanation harus original Nekoru atau mempunyai lisensi terdokumentasi.
2. Sumber JLPT/JF/Irodori/Marugoto hanya menjadi referensi format, level, dan konteks; body content tidak disalin.
3. Setiap asset menyimpan owner, license, source reference, allowed use, derivative permission, territory, expiry bila ada, dan reviewer.
4. AI assistance pada drafting dicatat; AI tidak menjadi author of record atau approver.
5. Rights yang tidak terbukti merupakan blocker dan tidak dapat di-waive.

## 17. Accessibility Requirements

- seluruh control dapat digunakan dengan keyboard dan screen reader;
- audio memiliki accessible label, duration, play/pause/replay state, dan failure message;
- transcript internal tidak bocor sebelum scored response;
- Japanese content memakai `lang="ja"`, UI memakai `lang="id"`;
- symbol/glyph tidak dibedakan hanya dengan warna;
- target pointer minimum 44×44 CSS px;
- layout mendukung lebar 320 CSS px dan reflow/zoom yang ditetapkan;
- motion tidak wajib untuk memahami materi;
- matching mempunyai select-to-pair path tanpa drag;
- response time pengguna assistive technology tidak menjadi mastery penalty;
- approved alternative menyatakan `equivalent`, `support_adjusted`, `practice_only`, atau `unavailable`.

## 18. Automated Validation

Build pack harus gagal jika:

1. ID/version/hash atau reference hilang;
2. item menunjuk KC, string, asset, answer, rationale, atau policy yang tidak tersedia;
3. content bukan `approved` tetapi manifest akan dipakai learner;
4. satu scored item tidak memiliki tepat satu primary KC;
5. supporting mapping tidak memiliki diagnostic confidence;
6. answer option duplicate/ambiguous atau answer key tidak valid;
7. audio tidak memiliki transcript, rights, checksum, dan QA result;
8. transcript/answer yang ditahan terdapat dalam pre-answer client payload;
9. content pool tidak memenuhi variation/encounter requirement yang diklaim;
10. romaji muncul pada activity yang melarangnya;
11. exposure activity diberi mastery weight positif;
12. content melebihi scope U01-L1 atau memberi Grammar/Kanji mastery;
13. manifest memakai floating version;
14. accessibility alternative tidak memiliki equivalence classification;
15. content pack mengklaim U01/S0 complete.

## 19. Manual Review Gates

| Gate | Reviewer | Fokus |
| --- | --- | --- |
| Linguistic | Japanese Linguistic | Bunyi, transcript, naturalness, usage, mora |
| Academic | Academic/Learning Science | Outcome, sequencing, evidence, difficulty, misconception |
| Localization | Indonesian Content Design | Kejelasan, tone, literal/communicative distinction |
| Assessment | Assessment | Construct, answer, distractor, leakage, diagnostic mapping |
| Accessibility | Accessibility | Keyboard, screen reader, audio alternative, equivalence |
| Rights | Rights/Legal | Ownership, license, release, provenance |
| Technical | Engineering/QA | Schema, checksum, rendering, playback, deterministic evaluation |

Author tidak menjadi sole approver. Temuan blocker/major dan criterion `not_tested` mencegah approval.

## 20. Test Fixtures Minimum

1. valid seed pack dengan exact versions;
2. missing audio, transcript, checksum, rights, atau answer;
3. content draft masuk published manifest;
4. duplicate option dan ambiguous answer;
5. supporting KC confidence di bawah threshold;
6. answer leakage dalam client payload;
7. romaji reveal pada prohibited state;
8. exposure menghasilkan candidate evidence secara keliru;
9. duplicate submission/encounter;
10. audio failure menjadi technical state, bukan incorrect;
11. speaker variation dan shuffle tetap menghasilkan evaluation yang sama;
12. delayed review terlalu cepat atau memakai stimulus identik;
13. screen-reader/keyboard path select-to-pair;
14. 320 CSS px, zoom/reflow, dan long localized string;
15. U01 completion/S0 gate tidak diterbitkan dari partial seed.

## 21. Publication dan Rollback

Publication flow:

```text
candidate files
→ schema validation
→ automated academic/technical checks
→ manual review gates
→ immutable manifest build
→ compatibility check
→ approval against exact hash
→ seed environment publication
```

Seed hanya dipublikasikan ke development/test environment sampai seluruh reviewer menyetujui penggunaan lebih luas. Rollback memindahkan active manifest pointer ke version sebelumnya; evidence historis tetap menunjuk version yang digunakan ketika encounter terjadi.

## 22. Acceptance Criteria

Seed siap digunakan untuk Milestone 1 jika:

1. scope tepat U01-L1 dan tidak mengklaim U01/S0 lengkap;
2. seluruh target, object slot, activity definition, asset, string, dan policy reference tersedia sebagai exact version;
3. setiap Sound KC mempunyai variation yang memenuhi encounter test Milestone 1;
4. empat Vocabulary chunks direview sebagai formulaic language tanpa Grammar mastery;
5. audio mempunyai sedikitnya dua speaker variant per vowel target;
6. scored item mempunyai answer, rationale, primary KC, evidence type, dan deterministic evaluator;
7. romaji, hint, replay, transcript, dan feedback release mengikuti policy;
8. seluruh automated validator dan test fixture lulus;
9. tidak ada mandatory gate `failed` atau `not_tested`;
10. approval linguistic, academic, localization, assessment, accessibility, rights, audio, engineering, dan QA menunjuk exact manifest hash;
11. runtime menolak draft, incompatible, expired, atau tampered pack;
12. duplicate delivery tidak menggandakan evidence;
13. technical failure tidak menghukum learner;
14. historical replay menghasilkan evaluation dan evidence mapping yang sama.

## 23. Keputusan Terbuka

| ID | Pertanyaan | Rekomendasi | Status |
| --- | --- | --- | --- |
| `SEED-OPEN-001` | Profil dua speaker pertama | Gunakan dua penutur dewasa dengan voice profile berbeda; identitas personal tidak diperlukan dalam runtime | Menunggu Audio/Linguistic |
| `SEED-OPEN-002` | Pasangan diagnostic vowel final | Gunakan daftar Bagian 5.2 sebagai candidate; kunci setelah pilot linguistic | Menunggu Linguistic |
| `SEED-OPEN-003` | Apakah U01-L1-A/B/C masing-masing 20 atau 25 menit | Target 20 menit dengan budget maksimal 25 menit untuk onboarding pertama | Menunggu prototype/usability |
| `SEED-OPEN-004` | Visual context greeting | Gunakan ilustrasi original sederhana tanpa culture stereotype atau time-of-day clue yang terlalu trivial | Menunggu Design/Academic |

Keputusan ini tidak boleh diisi oleh runtime. Sampai disetujui, asset/activity terkait tetap `draft` dan tidak masuk approved manifest.

## 24. Decision Record

| ID | Keputusan | Status | Owner | Tanggal |
| --- | --- | --- | --- | --- |
| `SEED-001` | Seed pertama mencakup U01-L1, bukan seluruh U01. | `approved` | Product + Academic | 13 September 2026 |
| `SEED-002` | Seed memakai lima Sound vowel KC, satu Mora KC, dan empat formulaic Vocabulary KC. | `approved` | Academic | 13 September 2026 |
| `SEED-003` | Seed terdiri dari tiga session blueprint dan delayed review. | `approved` | Academic + Product | 13 September 2026 |
| `SEED-004` | Milestone 1 mengaktifkan single-choice dan select-to-pair. | `approved` | Product + Design + Engineering | 13 September 2026 |
| `SEED-005` | Seluruh evaluasi seed deterministic dan AI tidak digunakan. | `approved` | Academic + Engineering | 13 September 2026 |
| `SEED-006` | U01 completion, S0 gate, dan readiness tidak diterbitkan dari partial seed. | `approved` | Product + Academic | 13 September 2026 |
| `SEED-007` | Audio target mempunyai minimal dua speaker variants sebelum approval. | `approved` | Audio + Academic | 13 September 2026 |
| `SEED-008` | Seed hanya dapat digunakan learner setelah seluruh mandatory review lulus pada exact manifest hash. | `approved` | Content Operations + Product | 13 September 2026 |
