# Practice Engine Nekoru — Spesifikasi MVP

**Status:** Draft v0.1  
**Audiens:** Product, akademik, content operations, design, data, AI, QA, dan engineering  
**Cakupan:** Eksekusi seluruh aktivitas latihan pemula absolut hingga kesiapan JLPT N5  
**Bahasa produk:** Bahasa Indonesia  
**Tanggal:** 13 September 2026

## 1. Tujuan Dokumen

Dokumen ini mendefinisikan perilaku Practice Engine Nekoru sebagai kontrak implementasi untuk menjalankan aktivitas latihan secara konsisten, aman, dapat diakses, dan dapat diaudit. Practice Engine menerima rencana serta konten yang telah divalidasi, mengelola interaksi learner dari aktivitas dimulai sampai selesai, mengevaluasi respons sesuai answer key atau rubric, menampilkan feedback sesuai mode, dan menghasilkan event terstruktur untuk Learning Engine serta sistem lain.

Dokumen ini menetapkan:

1. batas tanggung jawab Practice Engine terhadap Learning Engine, Assessment service, content bank, dan UI;
2. mode eksekusi introduction, guided practice, independent practice, free practice, review, remedial, placement, verification, checkpoint, dan simulation;
3. kontrak universal aktivitas, attempt, hint, submission, evaluation, feedback, serta event;
4. perilaku pilihan ganda, matching, ordering, cloze, input teks Jepang, drag-and-drop, dan interaksi audio;
5. aturan khusus Sound/Kana, Vocabulary, Kanji, Grammar, Reading, dan Listening;
6. penggunaan item statis dan template parameterized yang telah divalidasi;
7. aturan evidence attribution tanpa mengambil alih keputusan mastery;
8. resume, offline, concurrency, idempotency, versioning, fallback, security, privacy, accessibility, observability, dan acceptance criteria.

Dokumen ini melengkapi:

- [Product Overview](./product-overview.md)
- [Arsitektur Kurikulum](./curriculum-architecture.md)
- [Mastery Specification](./mastery-specification.md)
- [Learning Engine](./learning-engine.md)
- [Beginner Foundations](../content/beginner-foundations-n5.md)
- [Content Progression](../content/content-progression-n5.md)
- [Vocabulary Inventory](../content/vocabulary-inventory-n5.md)
- [Kanji Inventory](../content/kanji-inventory-n5.md)
- [Grammar Inventory](../content/grammar-inventory-n5.md)
- [Reading Blueprints](../content/reading-blueprints-n5.md)
- [Listening Blueprints](../content/listening-blueprints-n5.md)

Jika terjadi konflik:

- scope, prasyarat, dan validitas akademik mengikuti Arsitektur Kurikulum serta inventory/blueprint domain;
- evidence, mastery, agregasi, retensi, dan readiness mengikuti Mastery Specification; pemilihan target, review schedule, sequencing, dan progression execution mengikuti Learning Engine;
- perilaku eksekusi interaksi mengikuti dokumen ini selama tidak mengubah konstruk atau standar akademik.

## 2. Keputusan Utama MVP

| Area | Keputusan |
| --- | --- |
| Peran utama | Mengeksekusi aktivitas dari plan tervalidasi dan menghasilkan hasil/evidence terstruktur |
| Pemilihan materi | Tetap dimiliki Learning Engine; Practice Engine tidak memilih KC atau mengubah prioritas akademik |
| Cakupan domain | Sound/Kana, Vocabulary, Kanji, Grammar, Reading, dan Listening |
| Mode | Introduction, guided, independent, free practice, review, remedial, placement, verification, checkpoint, simulation |
| Interaksi | Pilihan ganda, matching, ordering, cloze, input teks Jepang, drag-and-drop, dan audio |
| Tidak termasuk | Rekaman/penilaian suara, speaking bebas, handwriting, dan writing bebas |
| Sumber item | Item statis approved/published dan instance dari template parameterized tervalidasi |
| AI runtime | Hanya evaluasi semi-terbuka serta feedback terikat rubric; tidak membuat target, item bebas, atau answer key baru |
| Feedback | Langsung untuk mode belajar/review/remedial; ditahan sesuai section pada placement/checkpoint/simulation |
| Determinisme | Evaluasi objektif dan materialisasi template dapat direproduksi dari input, versi, dan seed yang sama |
| Audit | Setiap run, attempt, hint, materialisasi, evaluation, dan fallback memiliki ID serta versi |
| Evidence | Practice Engine menerbitkan kandidat evidence; Learning Engine memvalidasi dan menghitung mastery |

## 3. Prinsip Operasional

### 3.1 Eksekusi tidak menentukan kurikulum

Practice Engine menjalankan apa yang telah dinyatakan eligible. Ia tidak membuka target, melewati hard prerequisite, menaikkan difficulty, atau mengganti domain hanya karena interaksi teknis tertentu lebih mudah disediakan.

### 3.2 Konstruk harus tetap utuh

Fallback, aksesibilitas, hint, atau perubahan UI tidak boleh diam-diam mengubah kemampuan yang dinilai. Transcript tidak dapat menggantikan audio untuk Listening evidence; romaji tidak dapat menggantikan kana setelah policy melarangnya; drag-and-drop alternatif harus tetap mengukur relasi atau urutan yang sama.

### 3.3 Satu respons menghasilkan jejak yang dapat direproduksi

Raw response yang diizinkan, normalized response, answer policy, rubric, evaluation source, versi, serta hasil harus dapat ditelusuri. Evaluasi ulang dengan versi yang sama harus menghasilkan hasil yang sama.

### 3.4 Feedback mendukung belajar tanpa membocorkan asesmen

Mode belajar dapat memberi koreksi langsung. Placement, checkpoint, dan simulation menahan jawaban atau feedback rinci sesuai blueprint agar item berikutnya tidak kehilangan validitas.

### 3.5 Fail closed untuk keputusan akademik

Jika item, template, answer policy, rubric, atau versi tidak dapat diverifikasi, Practice Engine tidak boleh menebak jawaban. Aktivitas dihentikan, diganti dengan fallback yang sah, atau diberi status `evaluation_pending`.

### 3.6 Aksesibilitas adalah bagian dari kontrak

Keyboard, screen reader, zoom, reduced motion, transcript untuk konteks non-scored, dan alternatif interaksi harus dirancang sejak definisi aktivitas, bukan ditambahkan setelah publikasi.

### 3.7 UI tidak menjadi sumber kebenaran

Posisi pilihan, animasi, dan state lokal tidak menentukan jawaban. Server atau runtime terverifikasi mengevaluasi berdasarkan ID stabil, definition version, dan instance manifest.

## 4. Batas Sistem dan Kepemilikan Keputusan

### 4.1 Tanggung jawab Practice Engine

Practice Engine bertanggung jawab untuk:

- memvalidasi dan membuka `SessionPlan` atau mini-plan yang diterbitkan Learning Engine;
- mematerialisasi instance dari template tervalidasi;
- menyajikan aktivitas sesuai mode, support policy, dan accommodation;
- mengelola lifecycle run, activity, attempt, hint, replay, pause, resume, submit, feedback, dan completion;
- menerima serta menormalisasi respons tanpa mengubah makna di luar policy;
- mengevaluasi item objektif secara deterministik;
- memanggil evaluator terikat rubric untuk jawaban semi-terbuka;
- menghitung score aktivitas mentah dan partial credit sesuai policy item;
- menerbitkan interaction, evaluation, dan candidate-evidence event;
- mempertahankan encounter identity serta idempotency;
- menerapkan feedback-release policy;
- menjalankan fallback teknis yang telah dideklarasikan;
- menghasilkan execution summary bagi Learning Engine, Assessment service, gamification, dan analytics.

### 4.2 Tanggung jawab Learning Engine

Learning Engine tetap memiliki:

- pemilihan KC, aktivitas, mode, difficulty, dan urutan session;
- eligibility serta hard-prerequisite validation utama;
- komposisi review, remedial, target baru, dan integrasi;
- mastery score, confidence, misconception state, dan spaced repetition;
- unit/stage progression, calendar plan, serta readiness;
- keputusan apakah candidate evidence valid untuk mastery;
- reason code akademik mengapa aktivitas dipilih;
- penerbitan `meaningful_learning_completed`.

Practice Engine boleh melakukan defense-in-depth terhadap prerequisite/version, tetapi tidak boleh memperbaiki plan dengan keputusan akademik baru. Plan yang tidak valid dikembalikan kepada Learning Engine untuk dihitung ulang.

### 4.3 Tanggung jawab Assessment service

Assessment service memiliki:

- blueprint placement, checkpoint, section, dan simulation;
- assembly rules, jumlah item, sampling, time limit, dan replay policy asesmen;
- agregasi raw score lintas item/section;
- aturan penyelesaian, invalidation, dan retake;
- hasil checkpoint serta simulation form.

Practice Engine menggunakan runtime yang sama untuk mengeksekusi item asesmen, tetapi tidak menetapkan starting unit, gate, readiness, scaled score, atau status lulus.

### 4.4 Tanggung jawab Content Bank

Content Bank memiliki:

- body item, stimulus, options, answer key, rationale, hint, rubric, dan feedback block;
- template, slot pool, constraint, serta generation manifest;
- primary/supporting KC mapping dan diagnostic confidence;
- status lifecycle, rights, attribution, serta accessibility metadata;
- asset dan checksum.

Practice Engine tidak menyunting atau mempublikasikan konten.

### 4.5 Tanggung jawab Practice UI

Practice UI merender state yang diberikan engine, menangkap tindakan learner, mendukung input/accessibility, dan menampilkan feedback. UI tidak menghitung nilai final, mengubah attempt, atau menganggap animation completion sebagai evidence.

### 4.6 Di luar tanggung jawab

Practice Engine tidak:

- membuat curriculum, KC, prerequisite, atau learning outcome;
- membuat item bebas menggunakan AI saat learner sedang berlatih;
- menetapkan mastery, review interval, progression, atau readiness;
- menentukan XP, badge, streak, atau reward;
- merekam atau menilai suara pengguna;
- menilai handwriting atau tracing sebagai mastery;
- menilai writing bebas;
- mengonversi raw score menjadi scaled score resmi JLPT;
- mengirim notifikasi atau menyusun kalender.

## 5. Istilah Inti

| Istilah | Definisi operasional |
| --- | --- |
| `PracticeRun` | Satu eksekusi session plan atau mini-plan oleh learner |
| `ActivityDefinition` | Definisi versioned dari satu aktivitas yang dapat dijalankan |
| `ActivityInstance` | Bentuk final aktivitas setelah opsi/slot/materialisasi ditetapkan |
| `Encounter` | Satu stimulus belajar yang dapat memiliki satu atau beberapa pertanyaan |
| `Interaction` | Tindakan seperti memilih, menyeret, mengetik, replay, meminta hint, atau pause |
| `Attempt` | Satu kesempatan submit terhadap question/activity sebelum feedback atau answer reveal tertentu |
| `Submission` | Snapshot respons yang secara eksplisit dikirim untuk evaluasi |
| `Evaluation` | Hasil membandingkan submission dengan answer policy/rubric tertentu |
| `Candidate evidence` | Hasil evaluasi terstruktur yang dapat diterima atau ditolak Learning Engine |
| `Support` | Bantuan yang tidak langsung menunjukkan jawaban, misalnya instruksi atau furigana non-target |
| `Hint` | Bantuan yang mengurangi independence dan wajib dicatat |
| `Answer reveal` | Penampilan jawaban/reference solution; attempt berikutnya tidak menjadi encounter baru |
| `Feedback release` | Saat hasil benar/salah, rationale, dan jawaban boleh ditampilkan |
| `Template instance` | Item konkret yang dibentuk deterministik dari template approved dan slot values approved |
| `Locked item` | Item yang sudah dimulai dan tidak boleh diganti atau diacak ulang saat resume |

## 6. Arsitektur Logis

```text
Learning Engine ── SessionPlan / MiniPlan ───────────────┐
Assessment Service ── Assessment execution policy ──────┤
Content Bank ── Approved definitions/templates/assets ──┤
Learner/Profile ── Locale, modality, accommodation ─────┤
                                                        ↓
                                                Practice Engine
                                                ├── Plan Validator
                                                ├── Instance Materializer
                                                ├── Interaction State Machine
                                                ├── Answer Normalizer
                                                ├── Deterministic Evaluator
                                                ├── Rubric/AI Adapter
                                                ├── Feedback Controller
                                                ├── Evidence/Event Emitter
                                                └── Resume/Sync Layer
                                                        ↓
                         Learning Engine / Assessment / Analytics / UI
```

Komponen boleh berada dalam satu service pada MVP. Batas di atas adalah batas perilaku dan kepemilikan, bukan kewajiban microservice.

## 7. Mode Eksekusi

### 7.1 Daftar mode

| Mode | Tujuan | Evidence | Feedback |
| --- | --- | --- | --- |
| `introduction` | Exposure, noticing, dan first model | Exposure/non-mastery kecuali ada retrieval eksplisit | Langsung |
| `guided_practice` | Membangun respons dengan bantuan | Weight guided; tidak memenuhi breadth sendiri | Langsung per attempt |
| `independent_practice` | Retrieval mandiri target aktif | Candidate direct/applied evidence | Langsung setelah submit |
| `free_practice` | Latihan atas pilihan pengguna pada target eligible | Sesuai activity/evidence policy | Langsung |
| `review` | Retrieval target jatuh tempo | Candidate review evidence | Langsung |
| `remedial` | Memperbaiki gap/misconception terkonfirmasi | Guided lalu direct item baru | Langsung dan contrastive |
| `placement` | Mengestimasi titik awal | Ke Placement Engine, bukan mastery langsung | Ringkasan setelah placement |
| `verification` | Mengonfirmasi estimate/gap | Sesuai pemilik verification | Setelah set selesai secara default |
| `checkpoint` | Menguji outcome unit/stage | Ke Assessment dan Learning Engine | Setelah section/checkpoint |
| `simulation` | Mengukur format dan stamina N5 | Ke Assessment/Readiness | Setelah seluruh simulation/form |

### 7.2 Free practice

Practice Engine tidak memilih bebas dari content bank. Ketika learner memilih domain, unit, tema, atau target:

1. UI mengirim `PracticeRequest` ke Learning Engine;
2. Learning Engine memeriksa eligibility, due review, hard prerequisite, dan content availability;
3. Learning Engine menerbitkan mini-plan dengan target serta reason code;
4. Practice Engine mengeksekusi mini-plan tersebut.

Pilihan pengguna boleh memengaruhi `user_focus`, tetapi tidak membuka KC locked atau mengubah mastery policy.

### 7.3 Assessment modes

Placement, verification, checkpoint, dan simulation memakai komponen rendering/evaluation yang sama agar perilaku jawaban konsisten. Mode tersebut berbeda melalui execution policy, terutama feedback release, retry, hint, navigation, replay, timer, dan resume.

### 7.4 Baseline execution policy

| Mode | Hint | Backtracking | Replay audio | Timer | Offline baseline |
| --- | --- | --- | --- | --- | --- |
| Introduction | Diizinkan | Diizinkan | Tak terbatas sesuai konten | None | Ya, dengan signed package |
| Guided | Bertahap | Diizinkan | Maks. 3 baseline | None/soft | Ya, dengan signed package |
| Independent | Light bila policy mengizinkan | Sebelum submit | Maks. 2 baseline | None/soft | Ya, dengan signed package |
| Free practice | Sesuai mini-plan | Sebelum submit | Maks. 2 baseline | None/soft | Ya, dengan signed package |
| Review | Light setelah respons atau sesuai policy | Sebelum submit | Sesuai blueprint, biasanya 1–2 | None/soft | Ya, dengan signed package |
| Remedial | Bertahap pada guided; none pada verification | Sesuai fase | Sesuai domain | None/soft | Ya, dengan signed package |
| Placement | Tidak | Sesuai blueprint, default tidak | Fixed per item/section | Soft/fixed blueprint | Tidak |
| Verification | Tidak pada direct verification | Default tidak setelah submit | Blueprint, default 1 | Soft/fixed blueprint | Tidak untuk high-impact |
| Checkpoint | Tidak | Blueprint; default tidak setelah submit | Blueprint, default 1 | Soft/fixed blueprint | Tidak |
| Simulation | Tidak | Mengikuti form resmi/internal | Fixed sesuai assembly | Fixed | Tidak |

Nilai pada tabel adalah default. Definition dan assessment blueprint boleh memperketatnya, tetapi tidak boleh melonggarkan konstruk, evidence independence, atau aturan domain tanpa policy version baru.

## 8. Lifecycle

### 8.1 PracticeRun

```text
created → validating → ready → in_progress → completed
              │          │          ├──────→ paused
              │          │          ├──────→ abandoned
              │          │          └──────→ invalidated
              │          └─────────────────→ expired
              └────────────────────────────→ rejected
```

- `created`: request diterima, belum diverifikasi.
- `validating`: version, item, asset, mode, dan authorization diperiksa.
- `ready`: instance manifest telah dikunci.
- `in_progress`: sedikitnya satu aktivitas dimulai.
- `paused`: state dapat dilanjutkan sesuai policy.
- `completed`: seluruh requirement run terpenuhi atau run ditutup sah.
- `abandoned`: learner meninggalkan run; evidence valid yang sudah terbentuk tetap disimpan.
- `invalidated`: integritas run rusak atau assessment dibatalkan.
- `expired`: resume window atau signed package telah kedaluwarsa.
- `rejected`: plan tidak dapat dijalankan.

### 8.2 ActivityInstance

```text
queued → ready → in_progress → submitted → evaluated → feedback_released → completed
                    │             │            │
                    ├─────────────┴────────────┴──→ skipped
                    └─────────────────────────────→ failed
```

`feedback_released` dapat tertunda sampai akhir set/section/form. Sebuah item objektif boleh menjadi `evaluated` sementara learner belum menerima hasil.

### 8.3 Attempt

```text
started → composing → submitted → evaluated
   │          ├──────────→ cleared_by_user
   │          └──────────→ interrupted
   └─────────────────────→ expired
```

Attempt hanya bertambah setelah submission yang valid. Mengubah pilihan sebelum submit, IME composition, drag preview, replay, atau reconnect tidak menambah attempt.

## 9. Kontrak Input PracticeRun

```yaml
practice_run_id: PRACTICE.01J...
learner_id: USER.123
session_plan_id: SESSION.456
session_plan_revision: 7
mode: independent_practice
requested_locale: id-ID
timezone: Asia/Jakarta
time_budget_seconds: 1800
activities:
  - plan_activity_id: PLAN_ACTIVITY.001
    activity_definition_id: ITEM.N5.GRAMMAR.001
    activity_definition_version: 1.2.0
    purpose: new_target
    primary_kc_id: KC.N5.GRAMMAR.PARTICLE.001
    reason_code: NEW_TARGET_ELIGIBLE
    fallback_definition_ids: [ITEM.N5.GRAMMAR.009]
versions:
  curriculum: 1.0.0
  content_packs: [PACK.N5.S02.U09@1.1.0]
  practice_policy: 1.0.0
  mastery_policy: 1.0.0
  assessment_blueprint: null
accommodations:
  reduced_motion: false
  input_mode: keyboard_and_pointer
```

Validasi sebelum status `ready`:

- learner dan plan authorization valid;
- revision plan masih aktif;
- mode dan assessment blueprint kompatibel;
- seluruh definition, template, rubric, serta asset dapat ditemukan;
- status konten boleh digunakan pada environment aktif;
- curriculum/content/practice versions kompatibel;
- primary KC pada plan sama dengan definition;
- fallback tidak mengubah konstruk;
- time budget dan timer policy konsisten;
- accommodation tidak membuat konstruk tidak dapat dinilai.

## 10. Kontrak ActivityDefinition

| Field | Tipe | Wajib | Aturan |
| --- | --- | --- | --- |
| `id` | string | Ya | ID stabil dan tidak digunakan ulang |
| `definition_version` | semver | Ya | Versi body, answer, dan behavior |
| `content_pack_id/version` | string | Ya | Pack sumber yang kompatibel |
| `activity_type` | enum | Ya | Taxonomy domain yang disetujui |
| `interaction_type` | enum | Ya | Salah satu Bagian 12–18 |
| `mode_compatibility` | enum[] | Ya | Mode yang boleh menjalankan item |
| `stimulus` | object | Ya | Text, audio, image, layout, atau kombinasi |
| `prompt_id` | string | Ya | Prompt terlokalisasi |
| `response_schema` | object | Ya | Struktur respons valid |
| `answer_policy` | object | Kondisional | Wajib untuk scored item |
| `rubric_ref` | object | Kondisional | Wajib untuk semi-open item |
| `feedback_policy` | object | Ya | Blocks dan release behavior |
| `hint_policy` | object | Ya | Hint level dan availability |
| `attempt_policy` | object | Ya | Maksimum dan behavior retry |
| `navigation_policy` | object | Ya | Back/skip/submit rules |
| `timer_policy` | object | Ya | None, soft target, atau fixed |
| `replay_policy` | object | Kondisional | Wajib jika ada audio |
| `primary_kc_id` | string/null | Ya | Tepat satu untuk scored item |
| `supporting_kcs` | array | Ya | Mapping pre-approved; boleh kosong |
| `difficulty_band` | enum | Ya | easy, target, stretch |
| `evidence_policy` | object | Ya | direct/applied/guided/exposure |
| `accessibility` | object | Ya | Label, keyboard, alternatives |
| `rights/attribution` | object | Ya | Termasuk AI assistance |
| `status` | enum | Ya | Hanya status yang diizinkan environment |

Definition tidak boleh bergantung pada urutan array atau posisi visual untuk menentukan jawaban. Semua bagian bermakna menggunakan ID stabil.

## 11. Kontrak ActivityInstance

Activity instance mengunci bentuk aktual yang dilihat learner:

```yaml
activity_instance_id: ACTIVITY_INSTANCE.01J...
practice_run_id: PRACTICE.01J...
encounter_id: ENCOUNTER.01J...
definition_id: ITEM.N5.VOCAB.001
definition_version: 1.1.0
materialization:
  source: static
  template_id: null
  template_version: null
  seed: 174201
  manifest_hash: sha256:...
presentation:
  option_order: [OPT.C, OPT.A, OPT.D, OPT.B]
  stimulus_variant_id: STIMULUS.V02
  support_variant_id: SUPPORT.DEFAULT
locked_at: 2026-09-13T10:01:00+07:00
```

Setelah `locked_at`:

- option order, gap, token, stimulus/audio variant, dan answer policy tidak berubah;
- resume pada perangkat lain menggunakan instance manifest yang sama;
- perubahan content pack tidak memutasi instance aktif;
- fallback membuat instance baru dengan ID dan reason terpisah, bukan mengubah instance lama.

## 12. Pilihan Ganda

### 12.1 Varian

- `select_one`: tepat satu option terbaik atau satu equivalence group yang dinyatakan eksplisit;
- `select_many`: hanya jika prompt menyebut jumlah/aturan pilihan dan answer policy mendukung set comparison.

### 12.2 Kontrak respons

```yaml
interaction_type: multiple_choice
response:
  selected_option_ids: [OPT.B]
```

### 12.3 Aturan

- evaluasi berdasarkan `option_id`, bukan label atau posisi;
- shuffle memakai seed instance dan disimpan pada manifest;
- option dengan urutan semantik, misalnya kronologi atau skala, memakai `shuffle_locked: true`;
- pilihan tidak boleh mengandung clue panjang, format, atau aksesibilitas yang membocorkan jawaban;
- `select_many` menggunakan exact-set scoring kecuali partial-credit rule tervalidasi tersedia;
- deselect sebelum submit tidak menambah attempt;
- keyboard dapat menavigasi, memilih, mengubah, dan submit tanpa pointer.

## 13. Matching

### 13.1 Bentuk

Matching dapat memetakan audio–kana, kana–bunyi, word–meaning, karakter–reading, prompt–response, atau relasi lain yang dideklarasikan blueprint.

### 13.2 Kontrak respons

```yaml
interaction_type: matching
response:
  pairs:
    - left_instance_id: LEFT.01
      right_instance_id: RIGHT.03
    - left_instance_id: LEFT.02
      right_instance_id: RIGHT.01
```

### 13.3 Aturan

- setiap occurrence memiliki instance ID agar nilai duplikat tetap dapat dibedakan;
- answer policy menyimpan pasangan ID, cardinality, dan apakah semua pasangan wajib;
- partial credit dihitung per relation hanya jika policy mengizinkan;
- satu submission matching menghasilkan satu attempt untuk question tersebut;
- feedback boleh menandai relation salah tanpa mengungkap seluruh pasangan sebelum policy mengizinkan;
- UI menyediakan mode pilih-kiri lalu pilih-kanan sebagai alternatif drag;
- screen reader mengumumkan pasangan yang terbentuk dan cara membatalkannya.

## 14. Ordering

### 14.1 Bentuk

Ordering digunakan untuk sentence composition terstruktur, sequence event, mora/kana sequence, atau urutan informasi. Ia bukan writing bebas.

### 14.2 Kontrak respons

```yaml
interaction_type: ordering
response:
  ordered_token_instance_ids: [TOKEN.03, TOKEN.01, TOKEN.04, TOKEN.02]
```

### 14.3 Aturan

- token yang teksnya sama tetap memiliki instance ID berbeda;
- answer policy dapat menyimpan satu atau beberapa accepted sequences;
- equivalence tidak boleh diinferensikan saat runtime;
- punctuation token dan omitted element harus dinyatakan eksplisit;
- partial credit hanya digunakan jika rubric menjelaskan unit yang dinilai dan tidak menghasilkan mastery inflation;
- drag-and-drop memiliki kontrol alternatif move before/after, first/last, dan keyboard reorder;
- feedback menampilkan accepted sequence serta rationale setelah release.

## 15. Cloze

### 15.1 Varian

- `choice_cloze`: memilih option untuk satu atau beberapa gap;
- `text_cloze`: mengetik respons dengan batas yang jelas;
- `bank_cloze`: memilih/menyeret token dari word bank.

### 15.2 Kontrak respons

```yaml
interaction_type: cloze
response:
  gaps:
    - gap_id: GAP.01
      option_id: OPT.PARTICLE.NI
    - gap_id: GAP.02
      raw_text: いきます
```

### 15.3 Aturan

- setiap gap mempunyai target, accepted answers, dan diagnostic mapping;
- scoring per-gap atau whole-item ditentukan sebelum publikasi;
- gap tidak boleh dapat dijawab hanya dari ukuran kolom atau bentuk option;
- input text mengikuti normalization policy Bagian 16;
- multi-gap item tetap memiliki satu primary KC; gap supporting tidak mengubah attribution tanpa mapping;
- jawaban pada gap lain tidak boleh otomatis dikoreksi sebelum feedback release.

## 16. Input Teks Jepang

### 16.1 Cakupan MVP

Input teks digunakan untuk short constrained response seperti reading dalam kana, orthography, satu kata, satu infleksi, atau cloze. Input kalimat semi-terbuka hanya boleh digunakan jika memiliki rubric versioned. Esai dan writing bebas tidak termasuk MVP.

### 16.2 Penyimpanan respons

Practice Engine menyimpan, sesuai policy privasi:

- `raw_text`: teks tepat saat submit;
- `normalized_text`: hasil normalization policy version;
- `input_method_metadata`: bila tersedia dan tidak sensitif;
- `normalization_steps`: transformasi yang benar-benar diterapkan;
- `answer_policy_version`.

### 16.3 Normalisasi default

Urutan default:

1. validasi Unicode dan tolak control character yang tidak diizinkan;
2. normalisasi Unicode NFC;
3. trim whitespace awal/akhir jika policy item mengizinkan;
4. normalisasi line ending;
5. pertahankan script, small kana, dakuten, handakuten, ー, sokuon, punctuation, dan whitespace internal;
6. terapkan hanya transformasi tambahan yang disebut dalam `normalization_policy` item.

Hiragana dan katakana tidak dianggap ekuivalen secara default. Kana dan Kanji tidak dianggap ekuivalen secara default. Vokal panjang, small kana, punctuation, angka ASCII/full-width, serta spasi hanya boleh diabaikan atau dipetakan jika answer policy item menyatakannya aman terhadap konstruk.

### 16.4 IME dan composition

- tombol submit tidak boleh memotong proses IME composition;
- Enter saat composition aktif mengonfirmasi kandidat IME, bukan submit;
- UI menyediakan status fokus dan label bahasa input tanpa mewajibkan keyboard Jepang;
- learner boleh memakai keyboard sistem, virtual kana input, atau copy/paste bila mode mengizinkan;
- paste dapat dinonaktifkan hanya pada assessment blueprint dengan alasan integritas yang terdokumentasi;
- ketiadaan keyboard Jepang harus memiliki alternatif input yang tidak membocorkan jawaban.

### 16.5 Evaluasi

- exact match terhadap accepted normalized forms menjadi jalur utama;
- equivalence set harus eksplisit dan versioned;
- typo tolerance tidak aktif secara global;
- typo tolerance, jika diizinkan, menghasilkan partial/non-mastery evidence sesuai rubric;
- evaluator AI tidak boleh menciptakan accepted canonical form baru;
- respons ambigu menjadi `evaluation_pending`, bukan langsung salah.

## 17. Drag-and-Drop

Drag-and-drop adalah presentation mechanic, bukan konstruk akademik tersendiri. Setiap aktivitas drag harus menyatakan semantic interaction-nya: matching, ordering, classification, atau placement.

Aturan:

- drop target dan draggable mempunyai ID serta label aksesibel;
- touch target memenuhi ukuran minimum design system;
- state drag dapat dibatalkan tanpa attempt;
- posisi visual absolut tidak disimpan sebagai jawaban kecuali spatial relation memang menjadi target dan blueprint mengizinkan;
- tersedia alternatif keyboard/button yang ekuivalen;
- auto-scroll, zoom, dan reflow tidak boleh mengubah jawaban;
- drop yang tidak valid memberi feedback interaksi, bukan penalti akademik;
- submission baru terjadi ketika learner mengonfirmasi hasil akhir.

## 18. Interaksi Audio

### 18.1 Cakupan

Interaksi audio mencakup play, pause, replay, seek, segment replay, perubahan kecepatan bila diizinkan, memilih jawaban setelah mendengar, dan audio–kana mapping. Rekaman suara learner, speech recognition, pronunciation scoring, dan conversation bebas tidak termasuk MVP.

### 18.2 State audio

```yaml
audio_state:
  asset_id: AUDIO.WEB.KEYPOINT.001
  playback_count: 1
  completed_playback_count: 1
  seek_count: 0
  playback_rate: 1.0
  listened_ms: 5100
  transcript_revealed: false
```

### 18.3 Aturan

- asset/checksum harus cocok dengan ActivityInstance;
- playback count bertambah saat audio benar-benar diputar melewati minimum policy, bukan saat tombol disentuh saja;
- replay, seek, pause, rate, completion, dan error dicatat;
- checkpoint/simulation menerapkan replay dan navigation policy blueprint;
- transcript tidak tampil sebelum respons pada scored Listening kecuali accommodation blueprint membuat konstruk lain yang eksplisit;
- perubahan playback rate membuat evidence tidak setara jika blueprint tidak mengizinkan;
- audio failure tidak boleh diganti transcript untuk menghasilkan Listening evidence;
- fallback voice/asset hanya boleh digunakan jika equivalence telah divalidasi dan dicatat;
- audio tidak autoplay tanpa kontrol;
- screen reader memperoleh label kontrol, status, durasi, dan replay tersisa tanpa membocorkan transcript.

## 19. Aturan per Domain

### 19.1 Sound dan Kana

Jenis utama: audio discrimination, audio-to-kana, kana-to-audio, glyph recognition, visual discrimination, mora count, word decoding, phrase reading, dan quick response.

Aturan khusus:

- romaji mengikuti unit/mode policy dan dicatat sebagai hint bila di-reveal;
- romaji tidak dapat menjadi jawaban mastery pada checkpoint S0;
- small kana, dakuten, handakuten, sokuon, dan long vowel dipertahankan saat normalisasi;
- item audio memakai speaker/variant yang dikunci pada instance;
- tracing atau animasi bentuk hanya exposure dan tidak menghasilkan candidate mastery evidence.

### 19.2 Vocabulary

Jenis utama: meaning recognition, audio meaning, reading recall, orthography selection, context-defined meaning, paraphrase, dan cloze usage.

Aturan khusus:

- evidence bentuk, bunyi, meaning, sense, dan penggunaan tidak digabung tanpa blueprint;
- lemma–sense menjadi unit target; synonym Indonesia tidak otomatis menjadi accepted answer;
- written form kana/kanji hanya ekuivalen bila item tidak menargetkan orthography dan answer policy mengizinkan;
- context item harus mempertahankan sentence dan sense yang dikunci;
- distractor serta feedback menggunakan misconception/rationale approved.

### 19.3 Kanji

Jenis utama: character meaning recognition, word reading, orthography selection, word-context reading, sign information match, dan visual discrimination.

Aturan khusus:

- reading dinilai dalam vocabulary target, bukan daftar seluruh reading;
- furigana disembunyikan bila reading Kanji adalah target langsung;
- accepted glyph variant harus tercantum pada definition;
- font fallback tidak boleh menghasilkan substitution atau clue;
- stroke animation, step mode, dan tracing tetap exposure/interaksi, tidak scored;
- reduced-motion memakai step/static fallback tanpa menghalangi meaning dan reading.

### 19.4 Grammar

Jenis utama: grammar form selection, sentence composition, controlled transformation, constrained cloze, function-to-form, form-to-function, contrast selection, dan text grammar.

Aturan khusus:

- sentence composition hanya menerima sequence/equivalence yang telah divalidasi;
- controlled transformation menyimpan required features dan allowed variants;
- register, politeness, polarity, tense, attachment, serta omitted element dapat menjadi scoring feature;
- semi-open input memerlukan rubric dan reference answers;
- evaluator tidak boleh menambah aturan grammar atau menerima bentuk baru sebagai canonical;
- fallback statis harus menjelaskan form, function, dan relevant constraint.

### 19.5 Reading

Jenis utama: script decoding, explicit detail, main point, reference resolution, sequence, low inference, information lookup, action selection, vocabulary in context, dan grammar in text.

Aturan khusus:

- satu stimulus multi-question memakai satu `encounter_id`;
- body, layout, display blocks, furigana, gloss, dan asset tidak berubah selama encounter;
- translation penuh ditahan sampai feedback release;
- alt text tidak boleh membocorkan informasi kunci;
- response time dicatat, tetapi tidak menjadi penalti mastery langsung;
- timed/fixed hanya jika blueprint mengizinkan, terutama S5;
- Reading KC menjadi primary pada comprehension question kecuali question menargetkan domain lain secara eksplisit.

### 19.6 Listening

Jenis utama: sound discrimination, audio-to-kana, quick response, situational expression, explicit detail, key point, action selection, speaker intent, dan sequence.

Aturan khusus:

- satu stimulus audio multi-question memakai satu `encounter_id`;
- replay tidak membuat encounter baru;
- prompt preview, visual, speaker, speech rate, noise, serta replay allowance dikunci;
- transcript-based response tidak pernah menjadi Listening evidence;
- asset pengganti memerlukan equivalence/QA;
- audio delivery error menghasilkan technical failure, bukan jawaban salah.

### 19.7 Registry activity type minimum

`activity_type` menyatakan konstruk akademik, sedangkan `interaction_type` menyatakan cara learner memberi respons. Satu activity type dapat memiliki lebih dari satu interaction yang ekuivalen. Registry MVP minimal mencakup seluruh tipe yang sudah ditetapkan dokumen domain berikut.

| Domain | Activity type | Interaction baseline | Evidence class |
| --- | --- | --- | --- |
| Foundation | `audio_discrimination` | multiple_choice/matching | direct |
| Foundation | `audio_to_kana` | multiple_choice/matching | direct |
| Foundation | `kana_to_audio` | multiple_choice/matching | direct |
| Foundation | `glyph_recognition` | multiple_choice/matching | recognition |
| Foundation | `visual_discrimination` | multiple_choice/drag classification | diagnostic |
| Foundation | `mora_count` | multiple_choice/ordering | applied |
| Foundation | `word_decoding` | multiple_choice/text_input | direct |
| Foundation | `word_to_meaning` | multiple_choice/matching | applied |
| Foundation | `phrase_reading` | multiple_choice/text_input | applied |
| Foundation | `quick_response` | multiple_choice/matching | applied |
| Foundation | `guided_matching` | matching/drag matching | guided |
| Foundation | `trace_or_animate` | drag/animation controls | exposure |
| Foundation | `explanation_view` | content navigation | exposure |
| Vocabulary | `meaning_recognition` | multiple_choice/matching | recognition |
| Vocabulary | `audio_meaning` | multiple_choice/matching | direct/applied |
| Vocabulary | `reading_recall` | text_input/multiple_choice | direct |
| Vocabulary | `orthography_selection` | multiple_choice/cloze | direct |
| Vocabulary | `context_defined_meaning` | multiple_choice/cloze | applied |
| Vocabulary | `paraphrase_selection` | multiple_choice/matching | applied |
| Vocabulary | `cloze_usage` | cloze/text_input | direct |
| Vocabulary | `guided_matching` | matching/drag matching | guided |
| Vocabulary | `exposure_card` | content navigation | exposure |
| Kanji | `character_meaning_recognition` | multiple_choice/matching | recognition |
| Kanji | `word_reading` | text_input/multiple_choice | direct |
| Kanji | `orthography_selection` | multiple_choice/cloze | direct |
| Kanji | `word_context_reading` | text_input/multiple_choice | applied |
| Kanji | `sign_information_match` | matching/multiple_choice | applied |
| Kanji | `visual_discrimination` | multiple_choice/drag classification | diagnostic |
| Kanji | `guided_tracing` | pointer/touch/stylus trace | exposure |
| Kanji | `stroke_animation_view` | animation controls | exposure |
| Kanji | `stroke_step_review` | step controls | exposure |
| Grammar | `grammar_form_selection` | multiple_choice/cloze | direct |
| Grammar | `sentence_composition` | ordering/drag ordering | direct |
| Grammar | `controlled_transformation` | text_input/cloze | direct |
| Grammar | `constrained_cloze` | cloze/text_input | direct |
| Grammar | `function_to_form` | multiple_choice/text_input | applied |
| Grammar | `form_to_function` | multiple_choice/matching | recognition |
| Grammar | `contrast_selection` | multiple_choice | diagnostic/applied |
| Grammar | `text_grammar` | multiple_choice/ordering | applied |
| Grammar | `guided_build` | ordering/cloze | guided |
| Grammar | `explanation_view` | content navigation | exposure |
| Reading | `script_decoding` | multiple_choice/text_input | direct |
| Reading | `explicit_detail` | multiple_choice | applied |
| Reading | `main_point` | multiple_choice | applied |
| Reading | `reference_resolution` | multiple_choice/matching | applied |
| Reading | `sequence_order` | ordering | applied |
| Reading | `low_inference` | multiple_choice | applied |
| Reading | `information_lookup` | multiple_choice/drag classification | direct/applied |
| Reading | `action_selection` | multiple_choice | applied |
| Reading | `vocabulary_in_context` | multiple_choice/cloze | applied |
| Reading | `grammar_in_text` | multiple_choice/cloze | applied |
| Listening | `sound_discrimination` | multiple_choice/matching | direct |
| Listening | `audio_to_kana` | multiple_choice/matching | direct |
| Listening | `quick_response` | multiple_choice/matching | direct |
| Listening | `situational_expression` | multiple_choice | applied |
| Listening | `explicit_detail` | multiple_choice | applied |
| Listening | `key_point` | multiple_choice | applied |
| Listening | `action_selection` | multiple_choice | applied |
| Listening | `speaker_intent` | multiple_choice | applied |
| Listening | `sequence` | ordering/multiple_choice | applied |

Nama activity type harus dipertahankan persis pada registry. Alias UI boleh berbeda, tetapi analytics, evidence, dan content validation menggunakan canonical ID. Kombinasi interaction alternatif memerlukan bukti bahwa prompt, support, dan scoring tetap mengukur konstruk yang sama.

## 20. Item Statis dan Template Parameterized

### 20.1 Item statis

Item statis memiliki stimulus, opsi, answer, dan rationale final dalam definition version. Shuffle presentation boleh dilakukan deterministik tanpa mengubah body akademik.

### 20.2 Template tervalidasi

Template boleh digunakan jika seluruh komponen berikut telah approved:

- tujuan serta primary/supporting KC;
- slot schema dan allowed value pool;
- constraint compatibility antarslot;
- grammar, lexical, Kanji, dan difficulty ceiling;
- algoritma materialisasi;
- answer derivation;
- distractor generation rule;
- feedback/rationale template;
- rights dan attribution seluruh aset;
- validation fixtures serta sample instances;
- `template_version` dan `materializer_version`.

### 20.3 Larangan

Runtime tidak boleh:

- meminta model generatif membuat stimulus, distractor, translation, atau answer baru;
- mengambil nilai dari luar approved slot pool;
- menggabungkan slot yang belum lolos compatibility check;
- menulis ulang rationale berdasarkan pengetahuan bebas;
- mengubah difficulty atau KC mapping setelah materialisasi.

### 20.4 Reproduksibilitas instance

```yaml
materialization:
  source: validated_template
  template_id: TEMPLATE.N5.VOCAB.CLOZE.001
  template_version: 1.2.0
  materializer_version: 1.0.0
  seed: 491827
  slot_values:
    TARGET_WORD: KC.N5.VOCAB.ROUTINE.001
    SUBJECT: SLOT_VALUE.PERSON.A
    TIME: SLOT_VALUE.TIME.MORNING
  answer_policy_version: 1.0.0
  manifest_hash: sha256:...
```

Seed saja tidak cukup sebagai audit. Slot values, versions, dan manifest hash wajib disimpan karena pool dapat berubah pada versi berikutnya.

## 21. Attempts, Hint, Skip, dan Answer Reveal

### 21.1 Attempt policy

| Mode | Baseline attempt | Retry |
| --- | ---: | --- |
| Introduction | Tidak scored atau sesuai retrieval kecil | Boleh |
| Guided | Maks. 3 | Boleh dengan hint bertahap |
| Independent | Maks. 2 | Setelah feedback ringkas bila policy mengizinkan |
| Free practice | Maks. 2 | Boleh |
| Review | 1 baseline | Retry menjadi practice, bukan evidence encounter baru |
| Remedial guided | Maks. 3 | Boleh |
| Remedial verification | 1 | Item baru jika gagal |
| Placement/verification | 1 | Tidak pada item sama |
| Checkpoint | 1 | Tidak |
| Simulation | 1 | Tidak |

Nilai aktual berasal dari policy version/blueprint. Attempt kedua/ketiga mengikuti weight Learning Engine. Respons setelah answer reveal tidak menghasilkan encounter atau direct evidence baru.

### 21.2 Hint level

| Level | Contoh | Independence mapping baseline |
| --- | --- | ---: |
| `none` | Tidak ada bantuan | 1,00 |
| `light` | Recall cue, replay baseline, highlight non-answer | 0,85 |
| `strong` | Eliminasi opsi, struktur sebagian, romaji reveal | 0,60 |
| `answer_reveal` | Jawaban/reference ditampilkan | 0,20 dan tidak memenuhi retrieval baru |

Practice Engine hanya mencatat level serta hint ID. Learning Engine menerapkan weight yang versioned.

### 21.3 Skip

- skip tanpa submit tidak dinilai salah;
- skip dicatat dengan alasan learner, timeout, unsupported modality, atau technical failure;
- assessment blueprint dapat mewajibkan unanswered item mendapat raw score nol, tetapi event tetap membedakan `skipped` dari jawaban salah;
- skip tidak boleh dipakai untuk melewati hard prerequisite atau menghapus item dari readiness.

### 21.4 Answer reveal

Answer reveal:

- hanya tersedia jika mode/policy mengizinkan;
- mencatat waktu, reason, dan content block yang ditampilkan;
- menutup eligibility attempt scored pada instance tersebut;
- tidak menghapus submission sebelumnya;
- dapat diikuti latihan baru dengan encounter/item berbeda.

## 22. Evaluasi Respons

### 22.1 Urutan evaluator

```text
Validate submission schema
→ Normalize according to item policy
→ Deterministic answer/equivalence evaluation
→ Versioned rubric evaluation bila diperlukan
→ Constrained AI evaluator hanya untuk feature yang diizinkan
→ Validate evaluator output
→ Build EvaluationResult
→ Release atau tahan feedback
→ Emit candidate evidence
```

### 22.2 Prioritas evaluasi

1. exact ID/set/sequence match;
2. accepted normalized text form;
3. equivalence set atau deterministic feature rules;
4. rubric evaluator;
5. AI evaluator terikat rubric;
6. `evaluation_pending` jika tidak dapat diputuskan dengan aman.

AI tidak digunakan untuk pilihan ganda, matching, ordering, atau item lain yang memiliki deterministic key.

### 22.3 EvaluationResult

```yaml
evaluation_id: EVAL.01J...
submission_id: SUBMISSION.01J...
status: evaluated
correctness: 1.0
score_obtained: 1
score_possible: 1
matched_answer_id: ANSWER.001
feature_results: []
misconception_candidates: []
evaluation_source: deterministic_key
answer_policy_version: 1.0.0
rubric_version: null
evaluator_version: practice-evaluator-1.0.0
feedback_release: immediate
```

`correctness` hanya bernilai `0`, `0.5`, atau `1` pada baseline Learning Engine kecuali policy baru memperluas kontrak. Score UI yang lebih rinci harus dipetakan secara eksplisit ke correctness sebelum candidate evidence dikirim.

### 22.4 Partial credit

Partial credit diperbolehkan hanya jika:

- konstruk secara akademik dapat dibagi;
- unit scoring dinyatakan dalam rubric;
- kesalahan pada satu bagian tidak membuat keseluruhan respons invalid;
- mapping ke `correctness` dan misconception telah disetujui;
- UI menjelaskan bagian yang benar/salah setelah release.

### 22.5 Ambiguitas dan dispute

- output evaluator yang tidak valid atau confidence di bawah `0,50` menjadi `evaluation_pending`;
- learner tidak menerima mastery penalty saat pending;
- jawaban dilindungi dari overwrite dan dapat dievaluasi ulang;
- laporan “jawaban saya seharusnya benar” membuat content issue yang mereferensikan instance dan submission;
- koreksi content tidak mengubah evidence historis tanpa adjudication/migration eksplisit.

## 23. Evaluator AI yang Dibatasi

AI boleh digunakan hanya untuk jawaban semi-terbuka dengan `rubric_ref` approved. Input evaluator dibatasi pada:

- prompt dan stimulus final;
- raw/normalized response;
- reference answers;
- required, allowed, forbidden, dan incorrect features;
- approved misconception taxonomy;
- approved feedback blocks;
- locale dan detail level yang diizinkan.

Output wajib berupa schema terstruktur:

```yaml
rubric_result:
  verdict: correct | partial | incorrect | ambiguous
  correctness: 0.0 | 0.5 | 1.0
  satisfied_feature_ids: []
  violated_feature_ids: []
  misconception_candidate_ids: []
  feedback_block_ids: []
  confidence: 0.0
```

Aturan:

- model, prompt template, rubric, dan output-schema version dicatat;
- output yang mereferensikan ID tidak dikenal ditolak;
- feedback bebas di luar approved facts tidak boleh ditampilkan sebagai otoritatif;
- AI tidak dapat mengubah answer key, primary KC, correctness range, mastery, atau gate;
- timeout/outage menghasilkan static feedback atau `evaluation_pending`;
- respons learner diperlakukan sebagai data, bukan instruksi bagi evaluator.

## 24. Feedback

### 24.1 Komponen feedback

Feedback dapat terdiri dari:

1. status benar, sebagian benar, salah, atau belum dapat dinilai;
2. jawaban learner dan accepted answer;
3. rationale singkat;
4. lokasi bukti pada stimulus;
5. contrast terhadap misconception;
6. audio replay/segment atau visual noticing;
7. next action: coba lagi, lihat penjelasan, lanjut, atau remedial.

### 24.2 Aturan bahasa

- gunakan Bahasa Indonesia yang ringkas, jelas, dan tidak menghakimi;
- bedakan translation harfiah dan komunikatif;
- jangan menyatakan satu padanan Indonesia sebagai aturan universal;
- jelaskan kesalahan yang dapat ditindaklanjuti, bukan hanya “salah”;
- jangan menampilkan confidence AI atau bobot mastery sebagai penjelasan learner;
- feedback tidak boleh membuat klaim materi di luar approved explanation facts.

### 24.3 Release policy

| Mode | Correctness | Answer | Rationale |
| --- | --- | --- | --- |
| Introduction/guided | Setelah submit | Sesuai attempt policy | Langsung |
| Independent/free/review/remedial | Setelah submit | Setelah final attempt/reveal | Langsung atau bertahap |
| Placement | Ditahan | Setelah placement jika blueprint mengizinkan | Ringkasan, bukan item leakage |
| Verification | Setelah set secara default | Setelah set | Setelah set |
| Checkpoint | Setelah section/checkpoint | Setelah section/checkpoint | Setelah section/checkpoint |
| Simulation | Setelah seluruh form | Setelah seluruh form | Setelah seluruh form/debrief |

## 25. Evidence dan Attribution

### 25.1 Candidate evidence

Practice Engine menerbitkan candidate evidence setelah evaluation final:

```yaml
event_id: EVT.01J...
event_type: answer_evaluated
occurred_at: 2026-09-13T10:15:00+07:00
learner_id: USER.123
practice_run_id: PRACTICE.01J...
session_id: SESSION.456
activity_instance_id: ACTIVITY_INSTANCE.01J...
encounter_id: ENCOUNTER.789
item_id: ITEM.N5.GRAMMAR.001
item_version: 1.2.0
template_instance_hash: null
curriculum_version: 1.0.0
practice_policy_version: 1.0.0
mastery_policy_version: 1.0.0
primary_kc_id: KC.N5.GRAMMAR.PARTICLE.001
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
validity_claim: candidate
```

### 25.2 Aturan attribution

- satu scored item memiliki tepat satu primary KC;
- supporting KC berasal dari metadata approved dan tidak dibuat saat runtime;
- Practice Engine tidak mengalikan attribution/mastery weight; ia meneruskan mapping serta sinyal;
- exposure, animation view, tracing, transcript-based listening, dan post-reveal response diberi `non_mastery`;
- pertanyaan pada passage/audio yang sama berbagi encounter ID;
- replay, retry, dan shuffle tidak menciptakan encounter baru;
- materialisasi template yang berbeda dapat menjadi encounter berbeda hanya jika stimulus substantif dan cooldown policy mengizinkan.

### 25.3 Event yang ditolak

Practice Engine tetap mencatat event dengan alasan jika:

- item/version tidak valid;
- evaluation pending/failed;
- technical integrity gagal;
- content tidak approved pada saat disajikan;
- answer ditampilkan sebelum respons;
- modality mengubah konstruk;
- event adalah duplikat.

Learning Engine membuat keputusan akhir apakah event diterima untuk mastery.

## 26. Session Summary

Setelah run selesai atau ditinggalkan, Practice Engine menghasilkan:

```yaml
practice_run_id: PRACTICE.01J...
status: completed
started_at: 2026-09-13T10:00:00+07:00
ended_at: 2026-09-13T10:29:10+07:00
active_learning_seconds: 1480
activities_started: 18
activities_completed: 17
direct_retrieval_submissions: 12
evaluated_count: 16
pending_count: 1
skipped_count: 1
technical_failure_count: 0
hint_counts:
  light: 2
  strong: 1
audio_interactions:
  playback_count: 6
  extra_replay_count: 1
content_issue_ids: []
event_range:
  first_sequence: 301
  last_sequence: 412
```

Learning Engine menggunakan summary dan evidence events untuk update state. Gamification tidak menerima mastery mentah dari Practice Engine; event `meaningful_learning_completed` tetap diterbitkan setelah aturan Learning Engine terpenuhi.

## 27. Navigation, Timing, dan Session Budget

### 27.1 Navigation

- mode belajar mengizinkan back ke explanation/feedback bila tidak mengubah attempt;
- kembali ke item submitted tidak membuka submission baru kecuali retry policy mengizinkan;
- checkpoint/simulation mengikuti aturan backtracking blueprint;
- skip dan confirm-submit harus eksplisit pada item yang berdampak;
- double-click atau network retry tidak menghasilkan submission ganda.

### 27.2 Response time

`response_time_ms` menghitung active time sejak item siap dan terlihat sampai valid submission, dikurangi pause aplikasi, background lebih dari threshold, asset loading, dan outage. Formula serta threshold diberi versi.

Response time:

- dipakai untuk fatigue/anomaly/difficulty calibration;
- tidak menjadi correctness atau penalti mastery langsung pada MVP;
- diberi confidence lebih rendah bila clock berasal dari offline client;
- tidak boleh memasukkan waktu screen reader membaca instruksi sebagai penalti.

### 27.3 Timer

- `none`: tidak ada target atau batas;
- `soft_target`: estimasi ditampilkan tanpa auto-submit;
- `fixed`: batas assessment; hanya blueprint yang dapat mengaktifkan;
- timer server-authoritative untuk online assessment;
- disconnect policy menentukan pause, grace period, atau invalidation;
- accommodation time extension menjadi field signed/versioned, bukan perubahan manual di client.

### 27.4 Budget

Practice Engine tidak menambah aktivitas ketika waktu habis. Ia dapat:

1. menyelesaikan aktivitas aktif dalam grace window;
2. menghentikan sebelum aktivitas berikutnya;
3. mengirim sisa plan ke Learning Engine untuk replan;
4. menandai exit check yang belum lengkap tanpa menganggap learner gagal.

## 28. Resume, Offline, dan Sinkronisasi

### 28.1 Resume

- state disimpan setelah setiap interaction penting dan submission;
- resume menggunakan `practice_run_id`, latest revision, serta locked instance manifest;
- item yang sudah evaluated tidak dievaluasi ulang kecuali status pending atau adjudication;
- feedback yang belum boleh dirilis tetap tersembunyi setelah resume;
- asset version yang tidak lagi tersedia memakai cached signed asset atau safe failure.

### 28.2 Offline MVP

Mode introduction, guided, independent, free practice, review, dan remedial boleh berjalan offline jika seluruh kondisi terpenuhi:

- plan dan content package telah diunduh serta ditandatangani;
- expiry belum lewat;
- deterministic evaluator tersedia lokal;
- tidak memerlukan AI evaluator;
- event disimpan dalam append-only local queue;
- server melakukan authorization, version, dan idempotency validation saat sync.

Placement, verification berdampak tinggi, checkpoint, dan simulation bersifat online-only pada baseline MVP. Dukungan offline untuk mode tersebut memerlukan assessment policy baru yang menangani clock, leakage, multi-device, dan integritas form.

### 28.3 Sync

- client membuat stable event ID sebelum retry;
- server receipt tidak mengganti `occurred_at` tetapi disimpan terpisah;
- event dikirim berurutan dengan client sequence;
- konflik tidak diselesaikan dengan last-write-wins pada submission/evaluation;
- evidence dari dua perangkat disimpan, lalu Learning Engine memproses idempotently;
- satu run assessment tidak boleh aktif pada dua perangkat.

## 29. Concurrency dan Idempotency

- setiap PracticeRun memiliki monotonic `revision`;
- mutation memakai expected revision;
- `interaction_id`, `submission_id`, `evaluation_id`, dan `event_id` adalah idempotency keys;
- submission yang sama dikirim ulang mengembalikan hasil yang sama;
- dua submission berbeda untuk attempt yang sama menghasilkan satu winner berdasarkan server acceptance dan satu conflict record;
- ActivityInstance yang telah locked bersifat immutable;
- plan yang superseded boleh menyelesaikan aktivitas yang sudah dimulai jika masih aman, tetapi tidak memulai aktivitas berikutnya;
- content/policy incompatibility memicu pause dan replan, bukan silent migration.

## 30. Accessibility

### 30.1 Standar umum

- seluruh aktivitas dapat dioperasikan dengan keyboard tanpa gesture presisi;
- focus order mengikuti urutan instruksi dan tidak meloncat saat feedback muncul;
- status benar/salah tidak hanya dibedakan melalui warna;
- target minimum zoom 200% tanpa kehilangan konten/fungsi;
- font Jepang, small kana, diacritic, Kanji, dan furigana tetap terbaca;
- screen reader memperoleh prompt, option, state, error, hint, dan feedback;
- live region tidak membacakan jawaban sebelum release policy;
- time extension dan pause mengikuti accommodation policy;
- reduced motion mematikan animasi non-esensial serta menyediakan step/static alternative.

### 30.2 Alternatif interaksi

| Interaksi visual | Alternatif wajib |
| --- | --- |
| Drag matching | Pilih source lalu target |
| Drag ordering | Move before/after, first/last |
| Spatial drop | Daftar target berlabel jika konstruk mengizinkan |
| Audio control | Keyboard play/pause/replay dan status text |
| Kanji animation | Step mode/static numbered diagram |

Jika alternatif mengubah konstruk, item dinyatakan unavailable bagi modality tersebut dan diganti hanya dengan item ekuivalen yang disetujui blueprint. Sistem tidak menganggap target mastered.

### 30.3 Audio dan transcript accessibility

Transcript tersedia untuk feedback atau penggunaan non-scored. Jika accommodation memerlukan transcript sebelum respons, aktivitas tidak menghasilkan scored Listening evidence kecuali blueprint secara eksplisit mendefinisikan konstruk berbeda.

## 31. Lokalisasi dan Bahasa Jepang

- locale utama MVP adalah `id-ID`;
- prompt, hint, feedback, dan error memakai message ID versioned;
- teks Jepang disimpan terpisah dari transliteration, literal translation, dan communicative translation;
- istilah Jepang diperkenalkan bertahap dan tidak menjadi prasyarat memahami kontrol;
- line breaking tidak memisahkan small kana, combining mark, atau furigana secara rusak;
- Unicode NFC menjadi bentuk analytics utama;
- angka, punctuation, dan writing direction mengikuti content definition, bukan locale transformation otomatis;
- pembacaan screen reader diuji dengan language span `ja` dan `id` yang benar;
- fallback font wajib lolos glyph QA target platform.

## 32. Asset dan Content Integrity

- setiap asset memakai ID, version, MIME type, checksum, rights, dan QA result;
- client memverifikasi checksum/signature untuk offline package;
- SVG/vector disanitasi: tanpa script, event handler, `foreignObject`, external URL, embedded font, atau network reference;
- asset gagal tidak boleh dianggap respons learner;
- image alt text tidak membocorkan answer;
- audio master tidak dikirim bila delivery derivative tersedia;
- cache key memasukkan asset version/checksum;
- deprecated content tidak dipilih untuk run baru, tetapi instance aktif dapat diselesaikan bila aman dan policy mengizinkan.

## 33. Content Issue dan Karantina

Learner dapat melaporkan:

- jawaban diduga salah;
- prompt ambigu;
- audio/transcript tidak cocok;
- furigana/glyph/rendering rusak;
- translation/feedback menyesatkan;
- accessibility atau technical failure.

Laporan menyimpan item/instance/version, submission/evaluation jika relevan, kategori, locale, platform, dan deskripsi learner. Raw response hanya disertakan sesuai privacy policy.

Jika operational threshold tercapai:

1. content service menandai item `quarantined` untuk run baru;
2. Practice Engine memakai fallback equivalent pada plan berikutnya;
3. run aktif menyelesaikan item hanya jika aman;
4. evidence lama tidak otomatis dihapus atau dipenalti;
5. content reviewer memutuskan correction, version, dan adjudication;
6. Learning Engine menjalankan recalculation hanya melalui migration decision resmi.

Practice Engine tidak menetapkan sendiri bahwa konten salah berdasarkan jumlah laporan.

## 34. Failure dan Fallback

| Kondisi | Perilaku aman |
| --- | --- |
| Plan/version tidak valid | Tolak run dan minta replan |
| Item/template hilang | Gunakan fallback ID yang sudah disetujui atau skip teknis |
| Template tidak menghasilkan instance valid | Jangan retry seed tanpa batas; alert content gap |
| Asset gambar gagal | Gunakan fallback hanya jika konstruk tetap sama |
| Audio gagal | Retry; pakai equivalent audio; jika tetap gagal, technical skip—bukan transcript-scored |
| Deterministic evaluator gagal | Tahan evaluation; jangan tebak |
| AI evaluator timeout/outage | Static feedback atau `evaluation_pending` |
| Network terputus saat belajar | Simpan lokal/pause sesuai offline capability |
| Network terputus saat assessment | Ikuti grace/pause/invalidation blueprint |
| Duplicate submission | Kembalikan hasil idempotent |
| Stale revision | Tolak mutation dan refresh state |
| Unsupported modality | Ganti dengan approved equivalent atau tandai unavailable |
| Content dilaporkan | Catat issue; jangan menghukum learner secara retroaktif |
| Timer/client clock mismatch | Gunakan server clock untuk assessment; catat anomaly |

Semua fallback menyimpan `fallback_reason_code`, original activity, replacement, equivalence policy, dan dampak pada evidence.

## 35. Security, Privacy, dan Abuse Guardrail

### 35.1 Security

- authorization diperiksa pada setiap run dan mutation;
- learner hanya dapat mengakses plan, item, dan feedback yang dialokasikan;
- answer key serta unreleased feedback tidak dikirim ke client sebelum diperlukan; assessment memakai server-side evaluation;
- payload text/HTML/SVG disanitasi;
- file upload tidak diperlukan pada MVP;
- endpoint submit, hint, replay, dan report memiliki rate limit;
- signed plan/instance mencegah perubahan option, answer policy, atau timer di client;
- log tidak menyimpan access token, secret, atau full content answer tanpa kebutuhan audit;
- evaluator AI tidak memiliki akses tool/network dan menerima context minimum.

### 35.2 Privacy

- raw text response disimpan hanya sesuai retention policy yang disetujui;
- normalized/feature result diprioritaskan untuk analytics;
- Practice Engine tidak merekam microphone atau audio learner;
- input method, device, dan accessibility metadata dibatasi pada kebutuhan fungsi/QA;
- analytics learner menggunakan pseudonymous ID;
- export/deletion harus menjaga audit agregat sesuai kebijakan tanpa mempertahankan data personal yang tidak perlu.

### 35.3 Abuse dan integritas asesmen

- assessment token terikat learner, form, run, expiry, dan device/session policy;
- answer scraping dibatasi dengan release policy dan authorization;
- anomaly seperti impossible timing atau concurrent form dicatat, bukan otomatis dianggap curang;
- invalidation assessment memerlukan rule serta reason code;
- Practice Engine tidak menggunakan webcam, microphone, atau invasive proctoring pada MVP.

## 36. Integrasi Logis

Nama operasi berikut bersifat kontrak logis; transport REST, RPC, atau message bus diputuskan engineering.

### 36.1 Operasi sinkron

| Operasi | Pemilik request | Hasil |
| --- | --- | --- |
| `createPracticeRun(plan_ref)` | Learning UI/Engine | Run tervalidasi atau rejection |
| `getPracticeRun(run_id)` | UI | State dan activity aktif yang boleh dilihat |
| `startActivity(instance_id)` | UI | Locked presentation state |
| `recordInteraction(payload)` | UI | Revision/idempotency result |
| `requestHint(instance_id, hint_id)` | UI | Hint block atau denial |
| `submitAnswer(submission)` | UI | Evaluation atau pending; feedback sesuai release |
| `pausePracticeRun(run_id)` | UI | Resume token/state |
| `resumePracticeRun(run_id)` | UI | Latest authorized state |
| `completePracticeRun(run_id)` | UI/Engine | Execution summary |
| `reportContentIssue(instance_id)` | UI | Issue ID |

### 36.2 Event keluar

```text
practice_run_created
practice_run_ready
practice_run_started
activity_instance_materialized
activity_started
audio_playback_started
audio_playback_completed
audio_replay_used
playback_rate_changed
hint_requested
hint_used
answer_revealed
answer_submitted
answer_evaluated
evaluation_pending
feedback_released
activity_completed
activity_skipped
activity_failed
content_issue_reported
practice_run_paused
practice_run_resumed
practice_run_completed
practice_run_abandoned
practice_run_invalidated
```

Event payload minimal memiliki `event_id`, occurred/received time, learner/run/instance/encounter ID, sequence, revision, relevant versions, source device/session, dan reason code bila ada.

### 36.3 Event masuk

```text
session_plan_created
session_plan_superseded
content_item_deprecated
content_item_quarantined
evaluation_adjudicated
learner_accommodation_updated
assessment_section_released
practice_policy_updated
```

Event masuk tidak memutasi history. Ia membuat transition baru atau meminta revalidation.

## 37. Reason Code Minimum

| Code | Arti |
| --- | --- |
| `PRACTICE_PLAN_INVALID` | Plan atau version tidak dapat dijalankan |
| `PRACTICE_ITEM_LOCKED` | Instance telah dikunci untuk run |
| `PRACTICE_FEEDBACK_DEFERRED` | Feedback menunggu akhir set/section/form |
| `PRACTICE_ATTEMPT_LIMIT_REACHED` | Tidak ada retry lagi |
| `PRACTICE_HINT_NOT_ALLOWED` | Mode/blueprint melarang hint |
| `PRACTICE_ANSWER_REVEALED` | Answer ditampilkan dan evidence berikutnya dibatasi |
| `PRACTICE_EVALUATION_PENDING` | Respons belum dapat dinilai aman |
| `PRACTICE_CONTENT_FALLBACK` | Aktivitas memakai fallback equivalent |
| `PRACTICE_TECHNICAL_SKIP` | Aktivitas dilewati karena kegagalan teknis |
| `PRACTICE_AUDIO_UNAVAILABLE` | Audio tidak dapat digunakan |
| `PRACTICE_MODALITY_UNAVAILABLE` | Konstruk tidak dapat dinilai dengan modality aktif |
| `PRACTICE_RUN_SUPERSEDED` | Plan berubah sebelum aktivitas berikutnya |
| `PRACTICE_ASSESSMENT_INVALIDATED` | Integritas assessment tidak terpenuhi |
| `PRACTICE_OFFLINE_PACKAGE_EXPIRED` | Package tidak lagi sah |

Reason code teknis Practice Engine melengkapi, bukan menggantikan, reason code akademik Learning Engine.

## 38. Versioning dan Migrasi

Version yang wajib dicatat:

- Practice Engine policy;
- ActivityDefinition/item;
- template dan materializer;
- answer/normalization policy;
- rubric dan evaluator;
- feedback/explanation blocks;
- curriculum dan content pack;
- assessment blueprint;
- asset;
- client renderer bila memengaruhi interaction semantics.

Perubahan version:

- **Major:** interaction/answer semantics, attempt meaning, event contract, atau evidence interpretation berubah tidak kompatibel;
- **Minor:** interaction type, optional field, approved variant, atau capability baru ditambah tanpa merusak history;
- **Patch:** koreksi teknis/wording yang tidak mengubah jawaban, konstruk, atau event meaning.

Perubahan answer key, accepted form, normalization, rubric feature, primary/supporting KC, feedback yang mengungkap jawaban, template constraint, atau materializer output membuat definition/version baru. Run aktif mempertahankan versi lama atau dihentikan secara eksplisit; tidak pernah dimigrasikan diam-diam.

Re-evaluation historis hanya dilakukan jika migration/adjudication menentukan:

1. evidence/submission mana yang terdampak;
2. evaluator serta version baru;
3. apakah hasil lama tetap tersedia untuk audit;
4. dampak pada Learning Engine;
5. komunikasi learner;
6. rollback.

## 39. Observability

### 39.1 Engine health

- create/start/submit/evaluate latency dan failure rate;
- stale revision serta duplicate rate;
- materialization failure;
- asset load/audio playback failure per platform;
- AI evaluation timeout, invalid output, dan pending rate;
- offline queue age serta sync conflict;
- fallback, technical skip, dan assessment invalidation rate;
- event delivery lag ke Learning Engine.

### 39.2 Practice quality

- completion dan abandonment per mode/activity type;
- attempt, hint, answer reveal, replay, dan transcript reveal rate;
- error distribution per interaction/domain;
- distractor efficiency dan ambiguous-report rate;
- time-on-item dengan accessibility-aware interpretation;
- template instance distribution dan repetition rate;
- feedback usefulness report;
- alternative-input usage dan modality unavailable rate.

### 39.3 Guardrail

- Jangan mengoptimalkan completion dengan menampilkan jawaban terlalu cepat.
- Jangan mengurangi hint logging agar evidence terlihat lebih kuat.
- Jangan memakai response time sebagai kemampuan tanpa kalibrasi.
- Jangan menaikkan difficulty atau mengubah item pool dari analytics secara otomatis.
- Jangan mengganti Listening dengan reading transcript untuk mengurangi failure rate.
- Jangan menyembunyikan evaluation pending sebagai salah.
- Jangan menggunakan rekaman suara, handwriting, atau writing bebas sebagai jalan pintas memperluas scope MVP.

## 40. Acceptance Criteria MVP

### 40.1 Boundary dan plan

1. Practice Engine hanya menjalankan plan yang version dan authorization-nya valid.
2. Free practice memperoleh mini-plan dari Learning Engine.
3. Practice Engine tidak dapat mengubah target, prerequisite, mastery, progression, atau readiness.
4. Plan invalid menghasilkan rejection/replan, bukan pilihan konten bebas.
5. Setiap aktivitas memiliki purpose, primary KC untuk scored item, dan reason code asal.

### 40.2 Interaksi

1. Pilihan ganda mengevaluasi option ID dan shuffle dapat direproduksi.
2. Matching mendukung duplicate labels melalui instance ID.
3. Ordering mendukung accepted sequence eksplisit dan token duplikat.
4. Cloze mendukung choice, bank, dan constrained text response.
5. Input Jepang aman terhadap IME dan hanya menggunakan normalization versioned.
6. Drag-and-drop mempunyai alternatif keyboard yang ekuivalen.
7. Audio menerapkan replay, seek, rate, transcript, dan failure policy.
8. Tidak ada rekaman/penilaian suara atau handwriting-scored activity.

### 40.3 Evaluasi dan feedback

1. Item objektif dapat dinilai tanpa AI.
2. AI hanya menilai semi-open response dengan rubric approved.
3. Output AI invalid/low-confidence tidak mengubah evidence.
4. Partial credit hanya muncul jika rubric mendefinisikannya.
5. Answer reveal menutup eligibility scored retry pada instance.
6. Feedback langsung berlaku pada mode belajar dan ditahan pada assessment sesuai blueprint.
7. Evaluation yang sama dengan version yang sama dapat direproduksi.

### 40.4 Evidence dan audit

1. Setiap submission/evaluation/event memiliki idempotency key.
2. Beberapa pertanyaan dalam satu passage/audio berbagi encounter ID.
3. Replay, retry, dan shuffle tidak menggandakan encounter.
4. Exposure, tracing, animation view, dan post-reveal response diberi non-mastery.
5. Supporting KC hanya berasal dari mapping approved.
6. Learning Engine, bukan Practice Engine, memutuskan validitas mastery.
7. Instance template dapat direproduksi dari versions, seed, slot values, dan manifest hash.

### 40.5 Reliability dan accessibility

1. Run belajar dapat pause/resume tanpa mengubah locked item.
2. Duplicate submit tidak menghasilkan dua evaluation/evidence.
3. Offline learning memakai signed package dan sinkronisasi idempotent.
4. Assessment baseline tidak berjalan offline.
5. Audio/asset failure tidak dihitung sebagai jawaban salah.
6. Semua interaction type dapat digunakan dengan keyboard dan zoom 200%.
7. Reduced motion menyediakan fallback yang tidak menghalangi materi.
8. Accommodation yang mengubah konstruk mencegah scored evidence yang tidak sah.

### 40.6 Security dan content integrity

1. Answer key assessment tidak tersedia di client sebelum release.
2. SVG/vector dan content payload disanitasi.
3. Learner tidak dapat membuka run/item milik learner lain.
4. Content quarantined tidak dipilih untuk run baru.
5. Content correction tidak menulis ulang evidence historis tanpa adjudication.
6. Practice Engine tidak melakukan runtime generation bebas.

## 41. Skenario End-to-End

### 41.1 Guided Kana dengan romaji hint

1. Learning Engine memilih guided `audio_to_kana` U02.
2. Practice Engine mengunci audio dan option order.
3. Learner salah pada attempt pertama lalu meminta romaji.
4. Hint dicatat `strong`; feedback langsung ditampilkan.
5. Learner benar pada retry.
6. Practice Engine menerbitkan evaluation dengan attempt 2 dan hint level strong.
7. Learning Engine menerima sinyal terbatas; encounter tidak memenuhi breadth sendiri.

### 41.2 Free practice Vocabulary

1. Learner memilih latihan “Makanan”.
2. Learning Engine mengembalikan mini-plan hanya untuk KC eligible dan due review yang relevan.
3. Practice Engine materialisasi cloze dari template approved.
4. Slot values, seed, answer policy, serta manifest hash dikunci.
5. Hasil dikirim sebagai candidate evidence biasa; pilihan free practice tidak memberi bypass prerequisite.

### 41.3 Grammar input semi-terbuka

1. Item meminta controlled transformation satu kalimat.
2. Deterministic accepted forms tidak menemukan exact match.
3. Rubric evaluator memeriksa required tense, polarity, dan register.
4. AI hanya mengklasifikasikan feature IDs serta feedback block IDs.
5. Output confidence 0,82 dan schema valid menghasilkan partial score sesuai rubric.
6. Learning Engine menerima event dengan rubric/model version.

### 41.4 Reading multi-question

1. Satu short passage memiliki tiga question.
2. Practice Engine mengunci body, layout, furigana, dan support.
3. Tiga submission menghasilkan tiga evaluation dengan satu encounter ID.
4. Primary KC mengikuti question mapping; incidental vocabulary tidak diberi credit.
5. Learning Engine menghitung satu encounter stimulus untuk sufficiency.

### 41.5 Listening audio gagal

1. Audio key-point gagal dimuat setelah retry.
2. Equivalent delivery asset juga gagal.
3. Practice Engine tidak menampilkan transcript sebagai pengganti scored audio.
4. Aktivitas menjadi technical skip dan fallback Listening item digunakan bila tersedia.
5. Tidak ada incorrect evidence dari kegagalan teknis.

### 41.6 Checkpoint

1. Assessment service memberi section plan dengan one-attempt dan deferred feedback.
2. Practice Engine mengevaluasi item secara server-side tetapi menahan hasil.
3. Learner tidak dapat meminta hint atau answer reveal.
4. Setelah section selesai, raw result dikirim ke Assessment service.
5. Feedback dirilis sesuai blueprint; Learning Engine mengevaluasi gate.

### 41.7 Simulation terputus

1. Koneksi terputus saat item sedang ditampilkan.
2. Server mencatat grace window dan mempertahankan locked instance.
3. Learner kembali dalam window dan melanjutkan dengan timer policy yang sama.
4. Jika window terlewati, Assessment service menentukan pause atau invalidation.
5. Practice Engine tidak menetapkan hasil lulus/gagal.

## 42. Implementasi Bertahap

### Phase 1 — Deterministic practice core

- plan validation dan locked ActivityInstance;
- multiple choice, matching, ordering, choice/bank cloze;
- attempt, hint, feedback, submit, skip, dan resume;
- deterministic evaluation;
- candidate evidence serta event log;
- keyboard/reflow/accessibility baseline;
- static approved items.

### Phase 2 — Domain-complete runtime

- input teks Jepang dan IME;
- audio controls serta Listening policy;
- Reading multi-question encounter;
- Kanji animation/static fallback sebagai exposure;
- validated template materialization;
- free-practice mini-plan;
- remedial, placement, verification, dan checkpoint policies.

### Phase 3 — Reliability dan assessment

- simulation/timer/integrity rules;
- offline signed learning packages dan sync;
- constrained AI rubric evaluator;
- adjudication/content quarantine;
- richer observability, template analytics, dan device QA.

Setiap phase harus lulus acceptance criteria yang relevan sebelum digunakan untuk keputusan learner nyata.

## 43. Pertanyaan yang Divalidasi melalui Data MVP

- Apakah maksimum attempt per mode mendukung belajar tanpa mendorong trial-and-error?
- Hint mana yang paling membantu tetapi tetap menghasilkan evidence yang dapat ditafsirkan?
- Apakah alternative keyboard untuk drag-and-drop memiliki completion time dan error profile yang setara?
- Normalization atau input aid apa yang mengurangi masalah IME tanpa menerima jawaban akademik yang salah?
- Berapa banyak instance aman yang dapat dihasilkan setiap template sebelum repetition meningkat?
- Kapan immediate feedback meningkatkan retensi, dan kapan sebaiknya feedback ditunda sampai set selesai?
- Replay policy mana yang mendukung Listening tanpa menghilangkan independence?
- Berapa tingkat `evaluation_pending` yang dapat diterima sebelum semi-open activity mengganggu flow?
- Mode mana yang paling sering memerlukan technical fallback atau resume?
- Apakah learner memahami perbedaan “dilewati”, “belum dinilai”, dan “salah”?

Perubahan berdasarkan data harus melalui versioning dan review akademik. Completion rate atau engagement tidak cukup untuk mengubah answer semantics, evidence validity, atau feedback integrity.

## 44. Definition of Done Implementasi

Practice Engine MVP siap digunakan jika tersedia:

1. schema versioned untuk PracticeRun, ActivityDefinition, ActivityInstance, Attempt, Submission, EvaluationResult, FeedbackRelease, dan PracticeEvent;
2. registry interaction type dan activity type lintas seluruh domain;
3. practice policy per mode, termasuk attempt, hint, navigation, feedback, replay, timer, dan offline;
4. normalization serta answer-policy engine untuk input Jepang;
5. deterministic evaluator dan rubric/AI adapter dengan safe fallback;
6. materializer template yang deterministic beserta fixture valid/invalid;
7. integrasi SessionPlan, Assessment blueprint, Content Bank, dan evidence ingestion Learning Engine;
8. append-only audit log, idempotency, resume, concurrency, dan sync tests;
9. accessibility test matrix untuk keyboard, screen reader, zoom, reduced motion, input Jepang, serta audio;
10. security/privacy review untuk authorization, answer leakage, sanitization, raw response, dan evaluator AI;
11. automated test fixtures untuk seluruh acceptance criteria dan skenario end-to-end;
12. dashboard internal untuk menelusuri plan → instance → interaction → submission → evaluation → evidence;
13. content gap, technical failure, ambiguous evaluation, dan quarantine alert;
14. runbook incident, adjudication, migration, rollback, serta content correction.
