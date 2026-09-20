# Practice Interactions Nekoru — UI/UX Specification MVP

**Status:** Draft v0.1  
**Audiens:** Product, design, akademik, accessibility, content operations, data, QA, dan engineering  
**Cakupan:** Presentation dan perilaku seluruh interaksi Practice Engine untuk learner pemula absolut sampai N5  
**Platform:** Aplikasi web responsive mobile-first  
**Bahasa produk:** Bahasa Indonesia (`id-ID`)  
**Tanggal:** 13 September 2026

## 1. Tujuan Dokumen

Dokumen ini menerjemahkan kontrak Practice Engine menjadi perilaku UI yang konsisten, dapat diakses, tidak membocorkan jawaban, dan tidak mengubah konstruk akademik. Dokumen menetapkan:

1. anatomy dan state universal aktivitas;
2. pilihan ganda, matching, ordering, cloze, input teks Jepang, drag-and-drop, audio, explanation, tracing, dan animation behavior;
3. in-app Kana composer sebagai alternatif input yang policy-driven;
4. attempt, hint, skip, answer reveal, evaluation, feedback, dan partial-credit presentation;
5. perbedaan mode belajar dan assessment;
6. persistence, offline, resume, concurrency, dan failure behavior;
7. metadata authoring serta preview yang dibutuhkan;
8. accessibility dan acceptance criteria per interaction.

Dokumen ini tidak menghitung mastery atau menetapkan eligibility. Practice UI hanya merender locked `ActivityInstance`, menangkap respons, menampilkan state dari Practice Engine, dan meneruskan event yang sah.

## 2. Sumber dan Hierarki Keputusan

- [UI/UX Overview](./01-ui-ux-overview.md)
- [Information Architecture](./02-information-architecture.md)
- [User Flows](./03-user-flows.md)
- [Screen Specifications Learner](./04-screen-specifications-learner.md)
- [Screen Specifications Content Operations](./05-screen-specifications-content-ops.md)
- [Practice Engine](../product-specs/practice-engine.md)
- [Learning Engine](../product-specs/learning-engine.md)
- [Mastery Specification](../product-specs/mastery-specification.md)
- [Assessment Specification N5](../product-specs/assessment-specification-n5.md)
- [Beginner Foundations N5](../content/beginner-foundations-n5.md)
- [Vocabulary Inventory N5](../content/vocabulary-inventory-n5.md)
- [Kanji Inventory N5](../content/kanji-inventory-n5.md)
- [Grammar Inventory N5](../content/grammar-inventory-n5.md)
- [Reading Blueprints N5](../content/reading-blueprints-n5.md)
- [Listening Blueprints N5](../content/listening-blueprints-n5.md)

Jika interaction convenience bertentangan dengan activity definition, answer policy, assessment blueprint, atau construct-equivalence rule, sumber akademik/runtime tetap berwenang. UI menggunakan approved replacement atau unavailable state; tidak menurunkan standar secara diam-diam.

## 3. Keputusan Utama

| Area | Keputusan MVP |
| --- | --- |
| Konstruk | `activity_type` menyatakan kemampuan yang diukur; `interaction_type` hanya cara merespons |
| Instance | Prompt, stimulus, option/token order, support variant, asset, answer policy, dan seed terkunci setelah instance dibuat |
| Submission | Selection, typing, composition, drag, replay, atau preview tidak menjadi attempt; attempt bertambah setelah submission valid |
| Primary action | Submit/Periksa jawaban eksplisit sebagai baseline; auto-submit hanya jika definition secara eksplisit menetapkannya |
| Kana input | OS keyboard/IME dan in-app accessible Kana composer didukung sesuai policy |
| Kana composer | Full approved character set, tidak menyaring kandidat atau menunjukkan correctness; evidence effect wajib dideklarasikan |
| Romaji | Policy-driven per stage/activity; bukan preference global yang dapat melewati removal schedule |
| Drag | Enhancement presentation; semantic response tetap matching, ordering, classification, atau placement |
| Audio | Tidak autoplay; replay, seek, rate, transcript, dan fallback mengikuti locked policy |
| Playback speed | Tidak tersedia pada scored Listening kecuali blueprint menyatakan allowed dan equivalence telah divalidasi |
| Feedback | Release mengikuti mode; visual state tidak hanya warna dan tidak membocorkan answer sebelum waktunya |
| AI | Hanya semi-open response dengan approved rubric; objective interaction selalu deterministic |
| Accessibility | Alternative interaction wajib setara atau diganti approved item; ketidaksetaraan tidak menghasilkan mastery evidence |
| Offline | Hanya mode dan item yang mempunyai signed package, local evaluator, serta non-AI path |

## 4. Pemisahan Konstruk, Interaction, dan Presentation

```text
Activity type
Kemampuan akademik yang ingin diukur
        ↓
Interaction type
Struktur respons: option IDs, pairs, sequence, gaps, atau text
        ↓
Presentation mechanic
Cards, list, drag, tap, keyboard, Kana composer, audio controls
        ↓
Submission + EvaluationResult
        ↓
Candidate evidence
Learning Engine memutuskan validitas/mastery
```

Contoh:

- `sentence_composition` adalah activity type;
- `ordering` adalah interaction type;
- drag token atau tombol `Pindah sebelum/sesudah` adalah presentation mechanic;
- keduanya harus menghasilkan sequence instance ID yang sama.

UI tidak membuat activity type baru berdasarkan visual treatment dan tidak mengirim koordinat pointer sebagai jawaban jika semantic response sebenarnya berupa pasangan atau urutan.

## 5. Anatomy Universal Aktivitas

```text
Session header
├── Pause/exit
├── Purpose/section
├── Progress yang diizinkan
└── Save/sync/audio status

Activity region
├── Instruction/prompt
├── Stimulus: text/audio/image/layout
├── Support/hint controls sesuai policy
├── Response interaction
├── Structural validation/error
└── Primary submit/continue action

Post-submit region
├── Evaluating/pending state
├── Feedback sesuai release policy
└── Retry/reveal/continue action sesuai policy
```

### 5.1 Reading order

Urutan DOM dan screen-reader adalah context → instruction → stimulus → response → validation → action → feedback. Layout visual boleh menempatkan stimulus dan response berdampingan pada viewport lebar, tetapi reading order tetap konsisten.

### 5.2 Instruction

- Menjelaskan tindakan dan jumlah pilihan bila relevan.
- Tidak menggunakan posisi seperti “pilih yang di kanan” sebagai satu-satunya instruksi.
- Istilah Jepang di dalam instruction diberi language span yang benar.
- Shortcut atau gesture selalu memiliki visible/control alternative.

### 5.3 Structural validation

Pre-submit validation hanya memeriksa response schema: pilihan belum lengkap, pasangan ganda, gap kosong, atau input mengandung control character terlarang. Ia tidak memberi correctness clue.

## 6. Lifecycle dan State UI

### 6.1 Activity state

```text
queued → ready → in_progress → submitted → evaluated → feedback_released → completed
                    │             │            │
                    ├─────────────┴────────────┴──→ skipped
                    └─────────────────────────────→ failed
```

| Engine state | UI state | Mutasi yang tersedia |
| --- | --- | --- |
| `queued` | Tidak dirender atau upcoming context | Tidak ada |
| `ready` | Instance dan asset sedang dipersiapkan | Start jika seluruh validation lulus |
| `in_progress` | Response dapat diubah | Hint/replay/clear/submit/skip sesuai policy |
| `submitted` | Response terkunci, evaluating | Idempotent wait/retry transport |
| `evaluated` | Hasil tersimpan tetapi dapat belum dirilis | Tidak membuka answer sebelum release |
| `feedback_released` | Feedback dan next action | Retry/reveal/continue sesuai policy |
| `completed` | Activity ditutup | Continue/summary |
| `skipped` | Reason-specific skip receipt | Continue/recovery |
| `failed` | Technical/integrity state | Retry/fallback/pause/replan |

### 6.2 Attempt state

```text
started → composing → submitted → evaluated
   │          ├→ cleared_by_user
   │          └→ interrupted
   └→ expired
```

Mengubah selection, memindah token, menggunakan IME composition, membuka/menutup Kana composer, replay audio, atau reconnect tidak menambah attempt.

### 6.3 Save state

| Label learner | Makna |
| --- | --- |
| Tersimpan | Server receipt tersedia |
| Tersimpan di perangkat | Event lokal belum dikirim |
| Menyinkronkan | Event sedang dikirim/validasi |
| Perlu tindakan | Conflict, expiry, atau authorization problem |
| Jawaban sedang dinilai | Submission ada, evaluation belum final |

## 7. Response, Submission, dan Idempotency

### 7.1 Response draft

- Draft disimpan setelah interaction penting dan sebelum navigation/pause bila aman.
- UI menyimpan stable option/token/gap/instance IDs, bukan text label atau posisi visual.
- Raw text disimpan tepat saat submit; normalized text berasal dari evaluator policy.
- Clear oleh user tidak menghapus interaction audit yang diwajibkan, tetapi tidak menjadi attempt.

### 7.2 Submit

Baseline label adalah `Periksa jawaban` pada mode belajar dan `Kirim jawaban` pada assessment. Label final mengikuti Content Design.

Saat submit:

1. selesaikan active IME composition;
2. validasi response schema;
3. buat stable submission ID;
4. kunci response UI;
5. kirim dengan expected revision;
6. tampilkan evaluating state;
7. gunakan result idempotent saat retry.

Double-click atau network retry tidak membuat submission kedua. Dua response berbeda terhadap attempt sama menghasilkan satu accepted winner dan satu conflict record.

### 7.3 Auto-submit

Auto-submit tidak menjadi default karena dapat mengubah pilihan menjadi attempt sebelum learner selesai. Jika definition memerlukannya, UI harus:

- memberi instruksi sebelum interaksi;
- mengirim hanya setelah state semantic lengkap;
- menyediakan undo sebelum submit jika konstruk mengizinkan;
- memenuhi keyboard/screen-reader expectation;
- mempunyai idempotency key sama seperti explicit submit.

## 8. Mode dan Policy Presentation

| Mode | Hint | Retry baseline | Feedback | Timer | Offline |
| --- | --- | --- | --- | --- | --- |
| Introduction | Diizinkan | Boleh | Langsung | None | Ya bila package valid |
| Guided | Bertahap | Maks. 3 | Langsung | None/soft | Ya bila package valid |
| Independent | Light bila diizinkan | Maks. 2 | Setelah submit/final attempt | None/soft | Ya bila package valid |
| Free practice | Sesuai mini-plan | Maks. 2 | Langsung/bertahap | None/soft | Ya bila package valid |
| Review | Light setelah response/policy | 1 evidence attempt | Langsung/bertahap | None/soft | Ya bila package valid |
| Remedial guided | Bertahap | Maks. 3 | Langsung | None/soft | Ya bila package valid |
| Remedial verification | Tidak | 1 | Setelah set/policy | Soft/fixed | Online bila high-impact |
| Placement | Tidak | 1 | Ditahan | Soft/fixed | Tidak |
| Verification | Tidak | 1 | Setelah set | Soft/fixed | Tidak high-impact |
| Checkpoint | Tidak | 1 | Setelah checkpoint | Soft/fixed | Tidak |
| Simulation | Tidak | 1 | Setelah seluruh form | Fixed | Tidak |

Nilai aktual selalu berasal dari versioned definition/blueprint. UI tidak melonggarkan batas karena screen lebih kecil atau alternative input lebih nyaman.

## 9. Pilihan Ganda

### 9.1 Varian

- `select_one`: satu option ID atau satu approved equivalence group.
- `select_many`: set option IDs; instruction wajib menyebut jumlah atau aturan pilihan.

### 9.2 Presentation

Option dirender sebagai radio-like choice cards untuk `select_one` dan checkbox-like choice cards untuk `select_many`. Semantics memakai group label dari prompt dan accessible name dari full option content.

Jika option memuat audio/image/Japanese text:

- setiap media mempunyai label yang tidak membocorkan jawaban;
- audio option mempunyai playback state sendiri;
- image alt mengukur akses yang setara atau item diganti sesuai blueprint;
- Japanese script tidak diganti romaji secara otomatis.

### 9.3 Interaction rules

- Selecting/deselecting sebelum submit tidak menambah attempt.
- `select_one` boleh mengubah selection sampai submit.
- `select_many` menunjukkan selected count tanpa mengungkap correctness.
- Semantic/chronological scale menggunakan `shuffle_locked`; visual order mengikuti manifest.
- Keyboard dapat masuk group, berpindah option, memilih, membatalkan bila sesuai, dan menuju submit.
- Focus tidak berpindah otomatis ke submit setelah memilih.

### 9.4 Evaluation dan feedback

- Evaluation berdasarkan option ID/set, bukan text/label/position.
- `select_many` memakai exact-set kecuali approved partial-credit rule.
- Setelah release, feedback menandai learner choice dan accepted choice dengan text/icon/state selain warna.
- Sebelum release, review state hanya boleh menunjukkan `terjawab`, bukan benar/salah.

### 9.5 Acceptance criteria

1. Shuffle/resume mempertahankan order yang sama.
2. Duplicate option text tetap dibedakan oleh instance ID tanpa label aksesibel ambigu.
3. Selecting tidak auto-submit pada baseline.
4. Screen reader mengumumkan group, option, position, selected state, dan instruction.
5. `select_many` tidak dapat dipublikasikan tanpa selection rule serta set evaluation policy.

## 10. Matching

### 10.1 Semantic model

Response selalu berupa pasangan left-instance ID dan right-instance ID. Duplicate visible values tetap mempunyai unique occurrence ID.

### 10.2 Baseline presentation

Mode select-to-pair menjadi baseline mobile dan accessibility:

1. learner memilih item dari kelompok kiri/source;
2. UI mengumumkan source aktif;
3. learner memilih target yang compatible;
4. pasangan terbentuk dan diumumkan;
5. learner dapat memilih pasangan untuk membatalkan/mengganti;
6. explicit submit setelah cardinality terpenuhi.

Drag matching boleh tersedia sebagai enhancement pada pointer/touch device, tetapi menghasilkan response yang sama.

### 10.3 Layout

- Mobile dapat menampilkan source lalu target/pair list secara bertahap.
- Viewport lebar boleh memakai dua kolom.
- DOM tidak mengulang item interactive secara membingungkan pada dua layout sekaligus.
- Pair summary selalu tersedia sebagai list berurutan.

### 10.4 Feedback

Sebelum final release, UI dapat menandai structural conflict, tetapi tidak menunjukkan relation benar/salah. Setelah release, relation salah dapat ditandai tanpa membocorkan seluruh answer bila policy masih menahan pasangan lain.

### 10.5 Acceptance criteria

1. Semua pasangan dapat dibuat/dibatalkan tanpa drag.
2. Pair state bertahan setelah resize, pause, resume, atau reflow.
3. One submission menghasilkan one attempt untuk matching question.
4. Partial credit hanya tampil jika relation-level scoring approved.
5. Screen reader mengumumkan source aktif, target, pair formed/removed, dan completion count.

## 11. Ordering

### 11.1 Semantic model

Response adalah ordered list token-instance IDs. Identical token text tetap distinct. Accepted sequence dan equivalence berasal dari answer policy, tidak diinferensikan runtime.

### 11.2 Baseline presentation

- Available tokens dan answer sequence/slots dibedakan secara semantic.
- Selecting token dapat menambah ke akhir sequence jika definition mengizinkan.
- Token di sequence mempunyai controls `Pindah sebelum`, `Pindah sesudah`, `Ke awal`, `Ke akhir`, dan `Keluarkan`.
- Keyboard reorder dapat menggunakan documented shortcut, tetapi visible buttons tetap tersedia.
- Drag ordering adalah enhancement, bukan satu-satunya path.

### 11.3 Rules

- Punctuation dan omitted element dirender sebagai token/slot sesuai definition.
- Invalid drop memberi interaction feedback, tidak menjadi salah atau attempt.
- Resize/reflow tidak mengubah sequence.
- Learner dapat clear/rebuild sebelum submit.
- Sentence composition tidak menerima sequence baru yang “terasa benar” tanpa approved equivalence.

### 11.4 Feedback

Setelah release, tampilkan learner sequence, accepted sequence, serta rationale. Partial-credit highlight hanya pada unit rubric yang dapat dibagi dan tidak menyiratkan semua adjacent pair benar jika scoring berbeda.

## 12. Cloze

### 12.1 Varian

| Varian | Response |
| --- | --- |
| `choice_cloze` | Option ID per gap |
| `text_cloze` | Raw/normalized text per gap |
| `bank_cloze` | Token instance ID per gap |

### 12.2 Presentation

- Setiap gap mempunyai stable ID, visible label/number, dan accessible instruction.
- Inline sentence tetap terbaca sebagai context, tetapi response fields juga dapat dinavigasi dalam ordered field list.
- Gap width tidak memberi clue answer length.
- Word bank item yang sama memiliki occurrence semantics yang jelas.
- Multi-gap progress menunjukkan lengkap/belum lengkap, bukan correctness.

### 12.3 Rules

- Text gap mengikuti Japanese input dan normalization policy.
- Satu gap tidak dikoreksi otomatis saat learner mengisi gap lain.
- Scoring per-gap atau whole-item ditetapkan sebelum publication.
- Satu multi-gap item tetap mempunyai satu primary KC; UI tidak membuat attribution per gap.

### 12.4 Feedback

Setelah release, setiap gap dapat menunjukkan submitted/accepted value serta explanation jika partial scoring diizinkan. Focus dapat berpindah ke first incorrect gap hanya setelah summary feedback diumumkan dan tidak pada assessment feedback yang ditahan.

## 13. Input Teks Jepang

### 13.1 Cakupan

Text input digunakan untuk reading dalam Kana, orthography, satu kata, satu infleksi, short constrained response, atau cloze. Semi-open sentence memerlukan approved versioned rubric. Essay dan free writing tidak termasuk MVP.

### 13.2 Input methods

| Metode | Deskripsi | Availability |
| --- | --- | --- |
| System keyboard/IME | Input native browser/OS | Selalu bila text input allowed |
| In-app Kana composer | Pemilihan Kana dari full approved set | Hanya jika activity input policy mengizinkan |
| Paste | Clipboard input | Diizinkan pada mode belajar; assessment dapat menolak via blueprint |
| Token bank | Pilihan token task-specific | Bukan text input; gunakan cloze/ordering interaction |

### 13.3 IME behavior

- UI memonitor `compositionstart`, `compositionupdate`, dan `compositionend` semantics.
- Enter selama composition mengonfirmasi kandidat IME, bukan submit.
- Submit tidak berjalan sampai composition final.
- Shortcut tidak mengambil alih OS IME candidate navigation.
- Focus, cursor, selection, undo, redo, copy, dan delete mengikuti text-field expectation.
- UI menampilkan input-language/help status tanpa mewajibkan Japanese keyboard.

### 13.4 Raw dan normalized text

UI mengirim raw text. Engine melakukan Unicode validation, NFC normalization, policy-safe trim/line-ending normalization, dan additional explicit transformations.

UI tidak:

- menyamakan Hiragana dengan Katakana secara global;
- menyamakan Kana dengan Kanji;
- menghapus small Kana, dakuten, handakuten, sokuon, `ー`, punctuation, atau internal whitespace;
- menerapkan typo correction global;
- menambah accepted canonical form melalui AI.

### 13.5 In-app Kana composer

#### Tujuan

Memberi cara memasukkan Kana tanpa OS Japanese IME, terutama pada mobile, keyboard non-Jepang, atau kebutuhan aksesibilitas, tanpa membocorkan jawaban.

#### Struktur

- Tab Hiragana, Katakana, serta tanda/karakter yang diizinkan definition.
- Group gojūon yang lengkap untuk character set activity, bukan subset kandidat jawaban.
- Controls untuk dakuten, handakuten, small Kana, sokuon, long-vowel mark, delete, cursor movement, undo, dan clear sesuai script/policy.
- Current composed text menggunakan text field yang sama dengan OS input; bukan response tersembunyi kedua.
- Keyboard navigation memakai logical group order dan searchable/quick navigation hanya jika tidak menyaring berdasarkan answer.

#### Anti-leakage rules

- Composer tidak menampilkan hanya Kana yang muncul pada accepted answer.
- Composer tidak menonaktifkan “huruf salah” berdasarkan answer.
- Tidak ada autocorrect, candidate ranking, green/red key, predicted completion, atau answer-length clue.
- Character availability hanya dibatasi oleh declared script/orthography policy yang berlaku untuk seluruh item class.
- Romaji-to-Kana converter bukan bagian Kana composer. Jika ditambahkan kelak, ia menjadi support method terpisah dengan evidence effect sendiri.

#### Equivalence/evidence states

Setiap ActivityDefinition yang menawarkan composer harus mendeklarasikan satu state:

| State | Meaning | UI behavior |
| --- | --- | --- |
| `equivalent` | Composer telah divalidasi mengukur konstruk setara | Tersedia tanpa hint label; input method metadata dicatat |
| `support_adjusted` | Composer memberi bantuan terhadap konstruk | Tersedia dengan support/hint disclosure; mapping berasal dari policy |
| `practice_only` | Berguna untuk belajar tetapi tidak untuk mastery evidence | Tersedia dengan label latihan; result `non_mastery` |
| `unavailable` | Composer mengubah konstruk secara material | Tidak ditawarkan; gunakan OS IME atau approved replacement |

Nama enum implementasi dapat berbeda, tetapi empat semantics tersebut harus dapat direpresentasikan. UI tidak menentukan weight numerik; mapping ke hint/support/evidence class berasal dari versioned policy.

#### Switching

Learner dapat berpindah antara system input dan composer sebelum submit jika policy mengizinkan. Teks tetap satu source of response. Switching tidak clear input, menambah attempt, atau mengubah correctness. Metadata mencatat method yang benar-benar digunakan sesuai privacy policy.

### 13.6 Validation dan feedback

- Pre-submit error hanya untuk empty/invalid schema/control character.
- Wrong script, small Kana, long vowel, atau orthography dinilai setelah submit sesuai answer policy, bukan “diperbaiki” client.
- Ambiguous response menjadi pending, bukan salah.
- Feedback menampilkan submitted raw form dan accepted form setelah release, dengan difference yang tidak hanya warna.

### 13.7 Acceptance criteria

1. Enter selama IME composition tidak submit.
2. Composer dapat dioperasikan dengan touch, pointer, dan keyboard serta diumumkan screen reader.
3. Composer tidak mempersempit character set berdasarkan answer.
4. System input dan composer menghasilkan raw response field yang sama.
5. Activity tanpa declared composer equivalence tidak menampilkan composer.
6. Script normalization tidak mengubah konstruk.
7. Paste restriction hanya berlaku dari assessment blueprint dan dijelaskan sebelum run.

## 14. Drag-and-Drop dan Spatial Interaction

### 14.1 Prinsip

Drag adalah presentation mechanic. Setiap draggable dan target mempunyai stable ID serta accessible label. Response menyimpan semantic relation/sequence/classification, bukan pixel coordinate kecuali spatial relation memang construct approved.

### 14.2 Behavior

- Pointer down atau touch start tidak mengubah response sebelum drop valid.
- Drag dapat dibatalkan dengan Escape/cancel tanpa attempt.
- Keyboard/button alternative selalu tersedia.
- Auto-scroll tidak memindah item ke target lain.
- Reflow/zoom/orientation tidak mengubah response.
- Invalid target memberi neutral interaction feedback dan menjelaskan permitted action.
- Submission baru terjadi setelah explicit confirmation.

### 14.3 Spatial classification

Jika absolute placement penting, blueprint harus menyediakan accessible equivalent labeled target list. Jika list alternative mengubah construct, activity diganti approved item atau marked unavailable; coordinate tidak diubah menjadi jawaban tebakan.

## 15. Interaksi Audio

### 15.1 Player states

`loading`, `ready`, `playing`, `paused`, `ended`, `replay_limited`, `failed`, dan `fallback_pending`.

Controls yang tersedia sesuai policy:

- play/pause;
- replay dan remaining replay count;
- seek/segment replay;
- playback rate;
- volume/mute;
- transcript setelah release atau non-scored context.

### 15.2 Baseline player

- Tidak autoplay.
- Primary control memiliki label state `Putar/Jeda/Putar ulang`.
- Duration/current state tersedia sebagai text; waveform tidak wajib.
- Playback count bertambah hanya setelah minimum play policy, bukan button click.
- Reload/resume memakai asset/checksum serta instance yang sama.
- Multiple audio options mempunyai independent state tetapi hanya satu playback aktif kecuali definition mengizinkan.

### 15.3 Replay, seek, dan rate

- Replay/seek count dan listened time dicatat sesuai privacy/policy.
- Checkpoint/simulation memakai allowance yang dikunci blueprint.
- Playback rate control tersembunyi pada scored Listening kecuali explicitly allowed and validated.
- Jika rate diizinkan tetapi mengubah evidence class, UI menjelaskan support state sebelum response.
- Visual-only timer/animation tidak menggantikan audio status text.

### 15.4 Transcript

- Transcript tidak tampil sebelum response pada scored Listening.
- Transcript dapat tersedia setelah feedback release atau pada non-scored explanation.
- Jika accommodation membutuhkan transcript sebelum response, activity tidak menghasilkan scored Listening evidence kecuali blueprint mendefinisikan construct lain.
- Transcript failure tidak membuat audio answer invalid; keduanya mempunyai asset status terpisah.

### 15.5 Audio failure

| Failure point | Behavior |
| --- | --- |
| Sebelum audio terlihat/diputar | Retry delivery; approved equivalent asset jika ada |
| Setelah partial exposure | Tandai integrity issue pada assessment; jangan silent replace |
| Belajar, equivalent tersedia | Buat fallback instance dan catat reason |
| Tidak ada equivalent | Technical skip/pause/replan; bukan salah |
| Offline asset checksum mismatch | Tolak asset/run; jangan play version tidak valid |

### 15.6 Acceptance criteria

1. Semua controls dapat digunakan keyboard dan screen reader.
2. Replay count serta remaining allowance konsisten setelah resume.
3. Tidak ada transcript-scored Listening fallback.
4. Playback speed tidak tersedia tanpa policy.
5. Audio failure tidak menghasilkan incorrect response.
6. Asset/voice replacement selalu approved dan tercatat sebagai instance/fallback baru.

## 16. Explanation, Tracing, dan Animation

### 16.1 Explanation/content navigation

Explanation view dapat memuat konsep, example, contrast, audio, visual, gloss, literal/communicative translation, dan comprehension check. Membuka/menyelesaikan explanation adalah exposure, bukan mastery evidence.

Navigation:

- next/back mempertahankan support state;
- section dapat diulang;
- reading progress tidak diberi label mastery;
- retrieval check di dalam explanation mempunyai ActivityInstance terpisah jika scored.

### 16.2 Kanji stroke animation

- Play/pause/step/restart controls tersedia.
- Reduced motion menggunakan static numbered diagram atau manual step.
- Animation completion tidak menjadi evidence.
- Font/glyph dan stroke asset version terkunci.

### 16.3 Tracing

Tracing pointer/touch/stylus pada MVP bersifat guided exposure. UI dapat memberi interaction feedback untuk mengikuti path, tetapi tidak memberi mastery score atau handwriting claim. Keyboard/non-pointer alternative berupa step/static review atau approved item berbeda.

## 17. Aturan Presentasi per Domain

### 17.1 Sound dan Kana

- Romaji hanya muncul sesuai stage/mode support policy dan dicatat sebagai strong hint bila reveal policy menyatakannya.
- Romaji tidak menjadi answer mastery pada checkpoint S0.
- Small Kana, dakuten, handakuten, sokuon, dan long vowel harus terbaca serta tidak dinormalisasi hilang.
- Audio speaker/variant terkunci.
- Tracing/animation selalu exposure.

### 17.2 Vocabulary

- Lemma–sense context terlihat saat diperlukan; satu synonym Indonesia tidak dianggap universal.
- Form, sound, meaning, sense, dan usage evidence tidak digabung oleh UI.
- Written Kana/Kanji equivalence hanya dari answer policy.
- Context sentence tidak berubah selama attempt/resume.

### 17.3 Kanji

- Reading dinilai melalui target vocabulary/context, bukan daftar seluruh reading.
- Furigana disembunyikan saat reading Kanji menjadi direct target.
- Glyph variant dan font fallback mengikuti approved definition.
- Meaning/reading dan stroke exposure dipresentasikan sebagai outcome berbeda.

### 17.4 Grammar

- Sentence composition menerima approved sequences saja.
- Politeness, polarity, tense, attachment, register, dan omitted element dapat menjadi visible feedback feature setelah release.
- Semi-open input menunggu rubric evaluation; AI tidak menambah canonical answer.

### 17.5 Reading

- Passage layout/body/support tetap sepanjang one encounter.
- Multi-question passage mempertahankan scroll/context tanpa mengubah stimulus.
- Full translation ditahan sampai feedback release.
- Alt text tidak membocorkan informasi jawaban.
- Response time bukan mastery penalty.

### 17.6 Listening

- Multi-question audio memakai one encounter; replay tidak membuat encounter baru.
- Prompt preview, visual, speaker, rate, noise, serta replay allowance terkunci.
- Audio failure adalah technical state.
- Transcript response tidak pernah menjadi Listening evidence.

## 18. Attempts, Hint, Skip, dan Reveal

### 18.1 Attempt presentation

- Remaining attempts hanya ditampilkan jika limit fixed dan informasi membantu pengambilan keputusan.
- Attempt bertambah setelah accepted valid submission.
- Retry review menjadi practice, bukan evidence encounter baru.
- Answer-revealed response tidak menghasilkan direct evidence baru.

### 18.2 Hint levels

| Level | Presentation example | UI disclosure |
| --- | --- | --- |
| `none` | Tidak ada bantuan | Tidak ada hint control |
| `light` | Recall cue, baseline replay, non-answer highlight | “Petunjuk ringan” |
| `strong` | Eliminasi option, partial structure, romaji reveal | Jelaskan bantuan memengaruhi independence |
| `answer_reveal` | Accepted answer/reference | Jelaskan scored attempt pada instance berakhir |

UI tidak menampilkan numerical mastery weight. Practice Engine mencatat hint ID/level; Learning Engine menerapkan versioned weight.

### 18.3 Skip

Skip hanya muncul jika navigation policy mengizinkan. Confirm diperlukan pada item berdampak. Learner skip, timeout, unsupported modality, dan technical skip mempunyai reason berbeda. UI tidak menggunakan label “salah” untuk technical/unsupported skip.

### 18.4 Answer reveal

Sebelum reveal, UI menjelaskan bahwa jawaban akan terlihat dan scored retry pada item ini berakhir. Reveal tidak menghapus submission lama. Practice setelah reveal memakai item/encounter baru.

## 19. Evaluation dan Pending State

### 19.1 Order

```text
Schema validation
→ Versioned normalization
→ Deterministic answer/equivalence
→ Rubric evaluation
→ Constrained AI only if approved
→ Output validation
→ EvaluationResult
→ Release/hold feedback
→ Candidate evidence
```

### 19.2 UI mapping

| Correctness/evaluation | Learner state |
| --- | --- |
| `1.0` | Benar |
| `0.5` | Sebagian benar |
| `0.0` | Perlu diperbaiki/salah sesuai Content Design |
| `ambiguous/pending` | Jawaban sedang dinilai; no mastery penalty |
| invalid evaluator output | Pending/fallback; tidak ditampilkan sebagai hasil |

UI score lebih rinci tidak boleh ditampilkan kecuali mapping ke baseline correctness telah disetujui.

### 19.3 Constrained AI

UI tidak menyebut AI sebagai authority. Pending detail dapat menyatakan “Jawabanmu sedang dinilai.” Confidence AI, model name, prompt version, dan raw trace hanya tersedia pada authorized internal audit.

## 20. Feedback Specification

### 20.1 Hierarchy

1. status: benar/sebagian/perlu diperbaiki/belum dapat dinilai;
2. submitted answer dan accepted answer setelah release;
3. rationale singkat;
4. lokasi bukti pada stimulus;
5. contrast/misconception explanation;
6. audio/visual noticing;
7. next action.

### 20.2 Tone

- Ringkas, jelas, spesifik, dan tidak menghakimi.
- Menjelaskan tindakan perbaikan, bukan sekadar label salah.
- Membedakan literal dan communicative translation.
- Tidak membuat padanan Indonesia menjadi aturan universal.
- Tidak menampilkan confidence AI atau bobot mastery.
- Tidak memperkenalkan fakta di luar approved feedback blocks.

### 20.3 Visual/accessibility

- Status memakai text + icon/shape + color.
- Learner answer dan accepted answer mempunyai label eksplisit.
- Diff Japanese text tidak memecah grapheme/combining mark.
- Live region mengumumkan summary terlebih dahulu; full rationale dibaca ketika learner menavigasi.
- Focus tidak meloncat ke next action sebelum feedback dapat dipahami.

### 20.4 Release

Feedback component dapat berada dalam state `held`. Held feedback tidak masuk DOM/accessibility tree, notification, history detail, atau error log learner sebelum release event.

## 21. Partial Credit

Partial credit hanya tersedia jika construct dapat dibagi dan scoring unit/rubric disetujui. UI harus:

- menunjukkan unit yang terpenuhi dan belum;
- tidak memberi point animation yang menyiratkan mastery fraction;
- membedakan raw item score dari correctness class jika keduanya tampil;
- tidak menghitung aggregate lokal;
- mempertahankan primary KC attribution dari definition.

## 22. Navigation, Timing, dan Budget

### 22.1 Back

- Mode belajar dapat kembali ke explanation/feedback jika tidak membuat attempt baru.
- Submitted item tetap read-only kecuali retry policy membuat attempt sah.
- Assessment backtracking mengikuti blueprint.
- Browser back memicu same pause/exit rule, bukan meninggalkan run diam-diam.

### 22.2 Timing

Response time mengecualikan background, pause, loading, outage, dan assistive-technology reading time sesuai versioned policy. UI tidak menampilkan response time sebagai penilaian kemampuan pada MVP.

### 22.3 Timer

- `none`: tidak tampil.
- `soft_target`: estimasi non-blocking, tidak auto-submit.
- `fixed`: server-authoritative dengan warning accessible.
- Accommodation time extension berasal dari signed field.

### 22.4 Session budget

Ketika budget habis, UI menyelesaikan current activity dalam grace bila diizinkan, tidak memulai activity baru, dan mengarah ke summary/replan. Exit check yang belum lengkap tidak ditampilkan sebagai gagal.

## 23. Resume, Offline, dan Sync

### 23.1 Resume

Resume memulihkan exact instance manifest, response draft, attempt, hints used, replay count, feedback release, timer, and revision. Already evaluated objective item tidak dievaluasi ulang.

### 23.2 Offline

Local execution hanya jika:

- signed plan/content package valid;
- definition/rubric/asset tersedia;
- deterministic local evaluator tersedia;
- tidak membutuhkan AI;
- mode diizinkan offline;
- event queue append-only dan stable IDs.

### 23.3 Sync

UI menunjukkan local/server distinction. Conflict tidak diselesaikan last-write-wins. Duplicate event mengembalikan receipt sama. Expired package atau incompatible version menyebabkan pause/replan, bukan silent upgrade.

## 24. Failure dan Fallback Matrix

| Kondisi | UI behavior | Evidence behavior |
| --- | --- | --- |
| Invalid plan/version | Tolak start; kembali untuk replan | Tidak ada |
| Item/template hilang | Approved fallback atau technical skip | Fallback identity dicatat |
| Asset gambar gagal | Retry/equivalent asset | Hanya valid jika construct sama |
| Audio gagal | Retry/equivalent/technical skip | Bukan incorrect; no transcript substitution |
| Deterministic evaluator gagal | Pending | Tidak dikirim final |
| AI timeout | Static approved feedback atau pending | Tidak dihukum |
| Network belajar | Local save/pause | Sync setelah valid |
| Network assessment | Grace/pause/invalidation policy | Integrity state |
| Duplicate submission | Same receipt | Tidak ganda |
| Stale revision | Refresh/reconcile | Jangan apply stale mutation |
| Unsupported modality | Approved replacement/unavailable | Tidak dianggap mastered |
| Content dilaporkan | Confirm report; lanjut jika aman | Tidak berubah otomatis |
| Timer mismatch | Server time pada assessment | Anomaly dicatat |
| Kana composer non-equivalent | Jangan tawarkan atau label practice-only | Sesuai declared policy |

## 25. Accessibility Contract

Semua interaction wajib:

1. dapat diselesaikan tanpa pointer, drag presisi, hover, atau OS Japanese keyboard;
2. mempunyai logical focus order dan visible focus;
3. memberi accessible name/role/state/value/instruction/error;
4. mempertahankan fungsi pada zoom 200% dan reflow;
5. membedakan correctness/status tidak hanya warna;
6. menjaga Japanese glyph, grapheme, small Kana, diacritic, Kanji, dan furigana;
7. mendukung reduced motion tanpa menghapus information;
8. tidak membacakan answer sebelum release;
9. memberi alternative matching/ordering/spatial/audio/animation yang sesuai blueprint;
10. mengganti item atau menolak evidence jika alternative mengubah construct;
11. mempertahankan response, focus, dan state setelah resize, error, resume, atau switch input method;
12. tidak menggunakan assistive-technology interaction time sebagai mastery penalty.

## 26. Authoring dan Preview Contract

### 26.1 Required definition fields

Setiap interaction tidak siap dipublikasikan tanpa:

- stable ID dan definition version;
- canonical activity/interaction type;
- mode compatibility;
- prompt/stimulus dan locale message IDs;
- response schema;
- answer policy atau rubric;
- hint, attempt, navigation, timer, feedback release;
- replay/audio policy bila relevan;
- primary/supporting KC mapping;
- evidence class dan difficulty;
- accessibility labels/alternatives/equivalence;
- Kana composer input/evidence state bila relevan;
- rights/attribution, content status, dan asset checksum.

### 26.2 Preview matrix

Reviewer minimal dapat menguji:

- mobile dan wide learner viewport;
- keyboard-only dan pointer/touch;
- screen-reader semantics snapshot;
- zoom/reflow;
- reduced motion;
- default support dan each approved variant;
- each mode compatibility;
- correct, partial, incorrect, pending, skip, retry, reveal, failure;
- offline/resume jika didukung;
- template seed/duplicate visible values;
- Japanese IME composition dan Kana composer;
- audio replay/rate/transcript/failure rules.

Preview selalu `non_evidence` dan tidak masuk learner analytics/mastery.

## 27. Analytics dan Evidence Boundary

### 27.1 UI events

UI dapat mencatat interaction opened, selection changed, pair formed, token moved, composer opened, input method switched, audio control used, hint requested, submit clicked, feedback viewed, dan recovery action.

### 27.2 Privacy

- Generic analytics tidak menyimpan raw answer atau keystroke stream.
- Raw text hanya berada pada protected submission/audit path sesuai retention.
- Input method metadata dibatasi pada category yang diperlukan QA/equivalence.
- Audio interaction menyimpan counts/timing yang diperlukan, bukan ambient audio; microphone tidak digunakan.

### 27.3 Evidence

Hanya final valid EvaluationResult menghasilkan candidate evidence. UI event, hover, explanation view, animation, tracing, answer reveal response, transcript-based listening, invalid modality, duplicate submission, pending evaluation, dan technical failure bukan mastery evidence.

## 28. Acceptance Criteria

### 28.1 Universal

1. Activity instance tetap identik setelah resize, pause, resume, reconnect, dan content update.
2. Attempt hanya bertambah setelah valid submission.
3. Response menggunakan stable IDs/raw text, bukan position atau label.
4. Double submit/retry bersifat idempotent.
5. Structural validation tidak membocorkan correctness.
6. Feedback release bertahan setelah refresh/resume/history.
7. UI tidak menghitung mastery, attribution weight, atau eligibility.

### 28.2 Objective interactions

1. Multiple choice mendukung select-one/select-many, keyboard, shuffle lock, dan exact-set policy.
2. Matching dapat diselesaikan melalui select-to-pair tanpa drag.
3. Ordering dapat diselesaikan melalui move controls tanpa drag.
4. Cloze mempunyai gap identity, no length clue, dan declared per-gap/whole scoring.
5. Duplicate text/token values tidak kehilangan instance identity.

### 28.3 Japanese input

1. IME Enter tidak submit selama composition.
2. Raw dan normalized response tidak tercampur.
3. Hiragana/Katakana/Kanji/small Kana/long vowel tidak disamakan global.
4. Kana composer tidak menyaring answer candidates.
5. Composer hanya muncul dengan declared equivalence/evidence effect.
6. Switching input method tidak menambah attempt atau menghapus response.
7. Activity tanpa equivalent input mempunyai approved replacement/unavailable state.

### 28.4 Audio dan media

1. Audio tidak autoplay dan seluruh control accessible.
2. Replay/seek/rate/transcript mengikuti locked policy.
3. Scored Listening tidak menggunakan transcript fallback.
4. Audio failure bukan incorrect response.
5. Animation/tracing tidak menghasilkan mastery evidence.

### 28.5 Feedback, reliability, dan accessibility

1. Correct/partial/incorrect/pending dapat dipahami tanpa warna.
2. Pending tidak memberi mastery penalty.
3. Answer reveal menutup scored eligibility instance dan dijelaskan sebelum action.
4. Offline/resume mempertahankan manifest, attempt, hint, replay, and release state.
5. Keyboard, screen reader, zoom, reflow, reduced motion, serta alternative interaction lulus fixture.
6. Preview internal tidak menghasilkan learner event/evidence.

## 29. Definition of Done

Practice interactions siap diimplementasikan ketika:

1. interaction registry, response schema, dan state machine tersedia sebagai shared contract;
2. ActivityDefinition memuat seluruh policy/accessibility field;
3. stable instance, submission, evaluation, and event IDs implemented;
4. deterministic evaluator fixtures tersedia untuk objective interactions;
5. Kana composer character set, semantics, equivalence state, dan accessibility tests tersedia;
6. assessment variants dapat menahan feedback dan membatasi navigation/replay;
7. offline package, local evaluation, queue, sync, and conflict fixtures tersedia;
8. failure/fallback tidak menghasilkan false incorrect/evidence;
9. preview matrix lulus reviewer akademik, accessibility, localization, dan technical;
10. analytics/privacy schema memisahkan UI telemetry dari protected response/evidence.

## 30. Keputusan untuk Design System dan Prototype

| ID | Keputusan/pertanyaan | Rekomendasi awal | Status |
| --- | --- | --- | --- |
| `INTERACTION-001` | Kana composer tersedia | Ya, policy-driven dengan `equivalent/support_adjusted/practice_only/unavailable` semantics | **Ditetapkan** |
| `INTERACTION-002` | Playback speed pada scored Listening | Tidak, kecuali blueprint explicitly allows dan equivalence tervalidasi | Ditetapkan dari Practice Engine |
| `INTERACTION-003` | Romaji sebagai global toggle | Tidak; support policy per stage/activity | Ditetapkan dari curriculum/practice policy |
| `INTERACTION-004` | Default matching pada mobile | Select-to-pair; drag sebagai enhancement | Ditetapkan |
| `INTERACTION-005` | Default ordering | Explicit sequence + move controls; drag sebagai enhancement | Ditetapkan |
| `INTERACTION-006` | Exact visual layout Kana composer | Gojūon groups dengan tab Hiragana/Katakana dan controls transform; divalidasi melalui prototype | Terbuka |
| `INTERACTION-007` | Mengingat input method terakhir | Simpan preference hanya untuk activity compatible; fallback otomatis ke allowed method | Terbuka |

Keputusan terbuka terakhir bersifat presentation. Ia tidak boleh mengubah character availability, answer leakage, evidence effect, atau accessibility behavior yang sudah ditetapkan.
