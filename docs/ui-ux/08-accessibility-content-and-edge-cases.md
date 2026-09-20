# Accessibility, Content, and Edge Cases Nekoru — UI/UX Specification

**Status:** Baseline v1 — requirement lintas-surface  
**Audiens:** Product, design, akademik, accessibility, content design, localization, content operations, QA, data, security, dan engineering  
**Cakupan:** Learner surface dan Content Operations  
**Bahasa produk:** Bahasa Indonesia (`id-ID`) dengan materi Jepang (`ja`)  
**Target formal:** WCAG 2.2 Level AA  
**Target aspiratif:** Level AAA untuk body text dan konten belajar kritis, tanpa klaim full AAA  
**Tanggal:** 13 September 2026

## 1. Tujuan dokumen

Dokumen ini menetapkan bagaimana Nekoru tetap dapat dipahami dan dioperasikan ketika pengguna, konten, perangkat, jaringan, atau status sistem tidak berada pada kondisi ideal.

Dokumen mencakup:

1. target conformance dan governance aksesibilitas;
2. semantic structure, keyboard, focus, pointer, visual, motion, media, dan authentication;
3. aturan khusus materi Jepang–Indonesia, furigana, IME, Kana composer, dan audio;
4. construct-equivalence untuk practice dan assessment;
5. voice, tone, terminology, microcopy, feedback, dan error writing;
6. localization dan format data;
7. responsive, zoom, reflow, soft keyboard, dan assistive technology;
8. empty, loading, offline, stale, conflict, permission, serta failure state;
9. test matrix dan acceptance criteria.

Dokumen ini bukan audit conformance atas implementasi yang belum dibuat. Klaim conformance hanya boleh dibuat terhadap versi aplikasi yang telah diuji.

## 2. Sumber dan hierarki keputusan

### 2.1 Dokumen internal

- [01. UI/UX Overview](./01-ui-ux-overview.md)
- [02. Information Architecture](./02-information-architecture.md)
- [03. User Flows](./03-user-flows.md)
- [04. Screen Specifications — Learner](./04-screen-specifications-learner.md)
- [05. Screen Specifications — Content Operations](./05-screen-specifications-content-ops.md)
- [06. Practice Interactions](./06-practice-interactions.md)
- [07. Design System](./07-design-system.md)
- [Product Overview](../product-specs/product-overview.md)
- [Curriculum Architecture](../product-specs/curriculum-architecture.md)
- [Learning Engine](../product-specs/learning-engine.md)
- [Mastery Specification](../product-specs/mastery-specification.md)
- [Practice Engine](../product-specs/practice-engine.md)
- [Assessment Specification N5](../product-specs/assessment-specification-n5.md)
- [Content Validation Rubric](../product-specs/content-validation-rubric.md)

### 2.2 Standar eksternal

- [Web Content Accessibility Guidelines (WCAG) 2.2](https://www.w3.org/TR/WCAG22/)
- [WAI-ARIA Authoring Practices Guide](https://www.w3.org/WAI/ARIA/apg/)

WCAG adalah target normatif. ARIA Authoring Practices Guide membantu pola implementasi dan keyboard behavior, tetapi bukan pengganti semantic HTML atau pengujian dengan assistive technology.

### 2.3 Prioritas ketika terjadi konflik

1. Keselamatan, privasi, dan security.
2. Konstruk akademik serta assessment integrity.
3. Akses terhadap fungsi dan informasi yang setara.
4. Data/status authoritative dari backend.
5. Pola komponen dan visual.
6. Dekorasi, motion, atau gamification.

Accommodation tidak boleh diam-diam mengubah konstruk. Jika alternatif setara belum tervalidasi, sistem memakai approved replacement, practice-only mode, atau unavailable state yang jujur.

## 3. Kebijakan conformance

### 3.1 Target

Seluruh layar P0 dan P1, state, serta critical journey wajib memenuhi **WCAG 2.2 Level AA** pada platform matrix yang didukung.

Nekoru mengupayakan Level AAA secara selektif untuk:

- body text learner;
- instruction dan explanation;
- critical learning content yang tidak bergantung pada nilai warna tertentu;
- focus yang sepenuhnya tidak tertutup;
- target interaksi utama;
- bantuan yang konsisten.

Pemenuhan selektif tidak boleh dipasarkan sebagai full WCAG AAA.

### 3.2 Unit conformance

Conformance dinilai terhadap:

- flow lengkap, bukan screenshot tunggal;
- semua state yang dapat dicapai;
- responsive variants;
- authentication dan deep-link recovery;
- learner dan Content Operations secara terpisah;
- third-party UI yang menjadi bagian wajib dari journey;
- content versions dan activity templates yang dipublikasikan.

Jika komponen pihak ketiga menjadi blocker, Nekoru tetap bertanggung jawab menyediakan jalur yang dapat diakses atau mencatat exception serta remediation plan.

### 3.3 Tidak boleh dianggap lulus hanya karena

- automated scanner tidak menemukan error;
- komponen memakai ARIA;
- warna lolos contrast tetapi informasi tidak dapat dipahami;
- keyboard dapat mencapai control tetapi urutannya tidak masuk akal;
- ada transcript yang justru mengubah konstruk Listening;
- terdapat alternatif yang secara teknis tersedia tetapi belum divalidasi akademik;
- satu browser atau satu screen reader berhasil.

### 3.4 Exception

Exception hanya boleh diterima jika:

1. criterion dan scope failure diidentifikasi;
2. dampak pengguna dijelaskan;
3. tidak ada workaround setara yang aman saat ini;
4. owner dan target perbaikan ditetapkan;
5. fallback atau support route tersedia;
6. exception tidak menyamarkan perubahan konstruk;
7. risiko disetujui oleh product, accessibility, dan academic owner bila terkait pembelajaran.

Exception tidak boleh bersifat permanen tanpa review berkala.

## 4. Prinsip aksesibilitas Nekoru

### 4.1 Equivalent outcome, not identical presentation

Pengguna boleh menyelesaikan tugas melalui presentation atau interaction yang berbeda, selama hasil fungsional dan konstruknya setara.

Contoh:

- ordering via drag dapat diganti tombol `Naikkan`/`Turunkan`;
- matching via drag dapat diganti select-to-pair;
- audio control dapat dioperasikan keyboard;
- status warna selalu mempunyai label dan ikon.

Namun transcript tidak otomatis setara untuk Listening, dan penyebutan nama kanji dalam accessible label dapat membocorkan jawaban pada visual recognition task.

### 4.2 Progressive disclosure

Detail kompleks disembunyikan sampai dibutuhkan, tetapi:

- primary instruction tetap terlihat;
- disclosure mempunyai accessible name dan expanded state;
- hidden rationale tidak masuk accessibility tree ketika policy melarangnya;
- error atau blocked reason tidak hanya berada di tooltip.

### 4.3 Predictability

- navigation, help, submit, dan feedback berada pada pola yang konsisten;
- perubahan konteks besar tidak terjadi hanya karena focus atau input;
- user diberi tahu sebelum membuka tab, aplikasi, atau identity flow eksternal;
- state tersimpan dijelaskan saat kembali dari offline atau sign-in.

### 4.4 Dignity

- copy tidak menyalahkan disability, perangkat, atau kemampuan pengguna;
- mascot tidak menunjukkan kekecewaan saat jawaban salah;
- accommodation tidak diberi label yang mempermalukan;
- pengguna tidak dipaksa mengungkap diagnosis untuk memakai preference umum;
- telemetry tidak menyimpan detail accommodation sensitif tanpa kebutuhan dan consent yang sah.

## 5. Semantic structure

### 5.1 HTML first

Gunakan elemen native sebelum ARIA:

- `button` untuk action;
- `a` untuk navigation;
- `input`, `select`, dan `textarea` untuk form;
- `fieldset` dan `legend` untuk kelompok jawaban;
- heading berurutan;
- `table` untuk data tabular;
- `dialog` atau pattern dialog tervalidasi untuk modal;
- `ruby` dan `rt` untuk furigana.

ARIA tidak digunakan untuk mengubah `div` menjadi control jika elemen native memenuhi kebutuhan.

### 5.2 Landmarks

Setiap page shell mempunyai landmark yang relevan:

- header/banner;
- primary navigation;
- main;
- complementary region bila ada;
- footer/content info bila ada;
- search pada inventory atau queue.

Jika lebih dari satu landmark sejenis muncul, masing-masing memiliki label yang berbeda.

### 5.3 Heading dan page title

- setiap layar mempunyai satu heading utama yang mendeskripsikan tugas;
- heading tidak dipilih berdasarkan ukuran visual;
- page title berubah sesuai route dan status penting;
- deep-linked workbench menyertakan artifact identity pada title;
- session title tidak mengungkap answer atau hidden assessment data.

### 5.4 Reading order

Urutan DOM mengikuti urutan logis:

1. context;
2. instruction;
3. prompt/stimulus;
4. allowed support;
5. response;
6. feedback;
7. next action.

CSS reordering tidak boleh membuat urutan visual dan assistive technology bertentangan.

### 5.5 Skip dan bypass

- learner page panjang menyediakan skip to main;
- Content Operations menyediakan skip ke main workbench dan, bila relevan, ke result table;
- repeated navigation tidak mengharuskan puluhan tab stop;
- composite widget mengikuti keyboard pattern yang terdokumentasi.

## 6. Keyboard dan focus

### 6.1 Baseline

Semua fungsi dapat dijalankan keyboard tanpa timing keystroke khusus. `Tab` dan `Shift+Tab` berpindah antar komponen; arrow key dipakai di dalam composite widget sesuai pola yang konsisten.

### 6.2 Focus-visible

- focus indicator minimum 3 px menggunakan semantic focus token;
- contrast focus terhadap adjacent colors minimal 3:1;
- focus tidak dihapus;
- focus dan selected state mempunyai visual berbeda;
- focus tetap terlihat pada forced-colors/high-contrast mode;
- sticky header, submit bar, toast, dan soft keyboard tidak boleh menutupi focused control.

### 6.3 Focus management

| Peristiwa | Tujuan focus |
|---|---|
| Route change | heading utama atau main container sesuai konteks |
| Dialog terbuka | elemen pertama yang relevan, bukan selalu destructive action |
| Dialog ditutup | trigger semula jika masih ada |
| Validation gagal | error summary, lalu link ke field pertama |
| Activity submit | feedback heading jika feedback dirilis |
| Next activity | instruction atau prompt baru |
| Item dihapus | item logis berikutnya atau container |
| Permission berubah | heading status/blocked message |
| Toast muncul | focus tidak dipindahkan |

Focus tidak dipindahkan untuk update minor seperti autosave success.

### 6.4 Shortcut

- tidak bergantung pada single printable character tanpa mekanisme disable/remap;
- tidak mengambil shortcut browser, screen reader, atau OS;
- shortcut advanced di Content Operations terdokumentasi dan discoverable;
- action yang mengubah data tetap memerlukan confirmation sesuai risk policy;
- assessment tidak memakai shortcut tersembunyi yang memberi keuntungan tidak adil.

### 6.5 Drag-and-drop

Setiap drag interaction memiliki alternatif keyboard dan pointer sederhana:

- matching: select source lalu select target;
- ordering: move up/down atau position selector;
- workbench reorder: move controls dan announcement posisi;
- file drop: file picker native.

Drag tidak boleh menjadi satu-satunya metode.

## 7. Pointer, touch, dan gesture

### 7.1 Target size

Design baseline Nekoru adalah **44×44 CSS px** untuk control utama, navigation, answer target, icon button, dan audio control.

WCAG 2.2 AA menetapkan minimum 24×24 CSS px atau spacing/exception yang memenuhi criterion. Nekoru memakai batas 44×44 sebagai internal usability target; exception hanya untuk:

- inline link dalam paragraf;
- user-agent control;
- presentation yang secara esensial memerlukan ukuran lain;
- compact secondary control yang tetap memenuhi minimum WCAG dan spacing.

### 7.2 Gesture

- swipe mempunyai button alternative;
- pinch tidak menjadi satu-satunya cara zoom konten;
- path-based gesture tidak diwajibkan kecuali construct esensial dan approved alternative tersedia;
- gesture dapat dibatalkan sebelum completion;
- accidental activation dapat dipulihkan.

### 7.3 Pointer cancellation

Action dijalankan pada `up` event, bukan `down`, kecuali fungsi esensial. Destructive action tidak dieksekusi saat pointer baru menyentuh target.

## 8. Visual accessibility

### 8.1 Contrast

| Elemen | Requirement |
|---|---:|
| Body text normal | minimal 4.5:1 |
| Large text sesuai definisi WCAG | minimal 3:1 |
| UI component boundary/state penting | minimal 3:1 |
| Focus indicator | minimal 3:1 terhadap adjacent color |
| Body/critical learning text aspiratif | 7:1 bila tidak merusak konstruk |

Contrast diuji pada warna hasil render, termasuk opacity, overlay, disabled state yang tetap perlu dibaca, dan forced-colors mode.

### 8.2 Color independence

Status menggunakan text + icon/shape + color. Contoh:

- mastered: `Dikuasai` + check + hijau;
- needs review: `Perlu ditinjau` + clock + amber;
- incorrect: `Belum tepat` + error icon + danger;
- published: `Dipublikasikan` + check + timestamp.

Chart mempunyai label, legend, dan data table atau accessible summary.

### 8.3 Text resize dan reflow

UI harus berfungsi pada:

- text resize 200%;
- browser zoom 400% pada viewport desktop yang menghasilkan lebar sekitar 320 CSS px;
- mobile portrait 320 CSS px;
- landscape dengan tinggi terbatas;
- system text scaling yang didukung platform.

Tidak ada horizontal scroll dua arah kecuali untuk content yang secara esensial membutuhkan, seperti data table, diff, code, diagram, atau media spasial. Pada pengecualian, instruksi dan control tetap dapat dijangkau.

### 8.4 Text spacing

Layout tidak rusak ketika pengguna mengubah:

- line height menjadi 1.5× font size;
- paragraph spacing menjadi 2× font size;
- letter spacing menjadi 0.12× font size;
- word spacing menjadi 0.16× font size.

Text tidak dipotong atau ditumpuk karena fixed height.

### 8.5 Forced colors dan high contrast

- gunakan system colors ketika forced-colors aktif;
- border status tidak hilang;
- icon SVG mengikuti `currentColor` bila sesuai;
- background image bukan satu-satunya pembeda;
- focus indicator tidak bergantung pada shadow saja;
- selected answer tetap berbeda melalui border, icon, atau text.

## 9. Motion, flashing, dan waktu

### 9.1 Reduced motion

`prefers-reduced-motion` dihormati. Transform besar, parallax, bounce, dan mascot animation diganti dengan state statis atau fade singkat.

### 9.2 Flashing

- tidak ada konten yang berkedip lebih dari tiga kali per detik;
- countdown tidak berkedip;
- error tidak memakai repeated flash;
- celebratory effect tidak memenuhi seluruh layar secara agresif.

### 9.3 Time limits

- practice tidak memakai time limit kecuali objective memerlukannya;
- assessment timer berasal dari server-authoritative state;
- warning waktu tidak diumumkan setiap detik;
- accommodation waktu diterapkan sebelum run dimulai dan dicatat pada server;
- perubahan durasi tidak dapat dilakukan diam-diam oleh client;
- session expiry menjelaskan apakah jawaban tersimpan dan langkah berikutnya.

### 9.4 Pause, stop, hide

Animation atau auto-updating content yang berjalan terus memiliki mekanisme pause/stop/hide bila tidak esensial. Autosave indicator boleh berubah tanpa control pause karena ia merepresentasikan status singkat, bukan animasi kontinu.

## 10. Cognitive accessibility

### 10.1 Konsistensi

- primary action memakai lokasi dan kata kerja konsisten;
- istilah tidak berganti antara layar;
- instruction pendek ditempatkan sebelum task;
- help muncul pada lokasi konsisten;
- user tidak diminta mengingat data dari layar sebelumnya jika dapat ditampilkan aman;
- progress menunjukkan posisi, bukan tekanan.

### 10.2 Beban kognitif

- satu objective utama per learner screen;
- pilihan dipotong menjadi kelompok yang dapat dipindai;
- progressive disclosure untuk detail;
- assessment menghilangkan mascot, XP, streak, dan navigation yang tidak perlu;
- Content Operations memakai summary + detail, bukan satu halaman tanpa hierarki;
- error menjelaskan satu recovery utama terlebih dahulu.

### 10.3 Bantuan konsisten

Jika help/support tersedia pada beberapa halaman, urutan dan lokasinya konsisten. Help untuk assessment tidak boleh membuka answer, rationale, atau materi yang memberi keuntungan.

### 10.4 Redundant entry

Informasi yang sudah diberikan tidak diminta kembali dalam flow yang sama kecuali:

- diperlukan untuk security;
- data telah berubah atau kedaluwarsa;
- user memilih mengisi ulang;
- konfirmasi exact value bersifat esensial untuk high-risk action.

## 11. Authentication dan account access

Identity provider adalah Clerk Hobby.

### 11.1 Learner

- Google Sign-In dan email link tersedia;
- tidak ada local password pada MVP;
- guest onboarding draft dipertahankan saat kembali dari sign-in;
- user diberi tahu jika email link harus dibuka pada browser/perangkat yang sama;
- deep-link failure menyediakan cara meminta link baru tanpa mengulang onboarding;
- status loading dari provider dijelaskan;
- tidak ada puzzle atau cognitive test yang dikendalikan Nekoru.

### 11.2 Content Operations

- Google Sign-In saja;
- identity success tidak berarti staff authorization success;
- allowlist/RBAC berasal dari backend Nekoru;
- 403 menampilkan `Akun ini belum memiliki akses Content Operations`, bukan login loop;
- user yang kehilangan role masuk read-only atau blocked state sesuai policy;
- action yang sedang berjalan tidak dianggap berhasil jika authority berubah.

### 11.3 Third-party accessibility

Third-party auth UI diuji sebagai bagian journey. Jika provider menghadirkan blocker:

- tampilkan jalur authentication lain yang sudah disetujui bila tersedia;
- sediakan support route;
- jangan menyarankan pengguna menonaktifkan assistive technology;
- catat issue dan dampak vendor;
- jangan membuat fallback tidak aman.

## 12. Forms, validation, dan error association

### 12.1 Field anatomy

Setiap field mempunyai:

1. visible label;
2. current value;
3. optional hint;
4. required/optional indication;
5. constraint sebelum input bila relevan;
6. inline error yang programmatically associated;
7. preserved input setelah failure.

Placeholder tidak menggantikan label.

### 12.2 Validation timing

- validasi format ringan dapat dilakukan setelah blur;
- error lengkap ditampilkan saat submit;
- input Jepang tidak divalidasi selama IME composition aktif;
- validasi server tetap authoritative;
- error tidak hilang sebelum penyebabnya berubah;
- success validation tidak diumumkan pada setiap keystroke.

### 12.3 Error summary

Form panjang atau high-risk action memiliki error summary yang:

- mendapat focus setelah failed submit;
- menyebut jumlah atau jenis masalah;
- menyediakan link ke field terkait;
- tidak menggandakan seluruh hint;
- tetap sinkron setelah error diperbaiki.

### 12.4 Formula pesan error

Gunakan:

```text
Apa yang terjadi + dampaknya + tindakan berikutnya + status data pengguna
```

Contoh:

- `Jawaban belum terkirim karena koneksi terputus. Jawaban tetap tersimpan di perangkat ini. Coba lagi setelah tersambung.`
- `Versi ini berubah sejak Anda membukanya. Tinjau perbedaan sebelum menyimpan kembali.`
- `Audio belum dapat dimuat. Coba lagi atau laporkan masalah. Percobaan ini belum dinilai.`

Hindari `Terjadi kesalahan`, `Invalid input`, atau `Oops` tanpa konteks.

## 13. Dynamic content dan announcement

### 13.1 Live region

Gunakan `aria-live="polite"` untuk:

- status save selesai atau gagal yang relevan;
- item berhasil dipindahkan dan posisi barunya;
- koneksi berubah ke offline/online;
- feedback setelah submit jika policy merilisnya;
- queue result selesai dimuat.

Gunakan assertive hanya untuk keadaan yang memerlukan tindakan segera, seperti session akan berakhir dan tidak ada recovery lain.

### 13.2 Anti-noise

Jangan umumkan:

- setiap detik timer;
- setiap perubahan progress animation;
- hover;
- dekorasi mascot;
- autosave berulang jika tidak ada perubahan bermakna;
- hidden correctness atau rationale pada assessment.

### 13.3 Held feedback

Feedback assessment yang ditahan:

- tidak dirender tersembunyi di DOM;
- tidak masuk accessibility tree;
- tidak masuk notification atau client log learner;
- tidak dapat ditemukan melalui page source atau predictable endpoint;
- baru ditampilkan setelah release event authoritative.

## 14. Media dan audio

### 14.1 Audio player

Audio control harus menyediakan:

- play/pause;
- status playing/paused/ended;
- replay jika policy mengizinkan;
- jumlah replay/batas tersisa jika dibatasi;
- volume mengikuti system/user control;
- focus-visible;
- error dan retry;
- tidak autoplay dengan suara.

### 14.2 Transcript

Transcript:

- tersedia untuk instructional media jika tidak mengubah objective;
- dapat ditahan pada Listening assessment;
- tidak menggantikan evidence Listening;
- dapat tersedia setelah submission/release jika policy mengizinkan;
- memakai speaker label jika lebih dari satu suara;
- menandai sound yang relevan, bukan seluruh noise dekoratif.

### 14.3 Audio unavailable

Jika audio wajib untuk konstruk dan gagal:

- activity tidak diberi incorrect;
- attempt/evidence tidak dibuat secara keliru;
- learner mendapat retry atau approved replacement;
- issue dapat dilaporkan dengan asset/version reference;
- scored run mengikuti invalidation/reschedule policy.

### 14.4 Image dan illustration

- decorative mascot memakai alt kosong;
- informative image mempunyai alternative yang menjelaskan informasi, bukan tampilannya saja;
- image-of-text dihindari;
- diagram kompleks mempunyai long description atau structured alternative;
- alt text pada assessment tidak boleh membocorkan answer.

## 15. Bahasa Jepang dan input multilingual

### 15.1 Language metadata

- document shell memakai `lang="id"`;
- span/paragraph materi Jepang memakai `lang="ja"`;
- nama produk atau technical token tidak perlu ditandai berulang;
- mixed-language accessible name diuji dengan screen reader target.

### 15.2 Japanese typography

- gunakan `Noto Sans JP` dan fallback yang mendukung glyph;
- jangan substitute glyph dengan image tanpa kebutuhan;
- jangan memotong dakuten, handakuten, punctuation, atau ruby;
- line break mengikuti aturan CJK yang layak;
- vertical writing di luar MVP kecuali content requirement khusus;
- zoom dan fallback font harus mempertahankan pasangan ruby–base text.

### 15.3 Furigana

Furigana menggunakan `<ruby>`/`<rt>` dan mengikuti support policy:

- visible pada instructional context yang membutuhkannya;
- dapat ditoggle jika objective mengizinkan;
- tidak hadir pada assessment jika menjadi clue;
- state preference tidak mengalahkan locked activity policy;
- screen reader output diuji agar tidak menggandakan atau mengacak urutan bacaan.

### 15.4 Romaji

- bukan global accessibility fallback;
- hanya muncul saat curriculum/activity policy mengizinkan;
- tidak disisipkan ke accessible name ketika visual UI melarangnya;
- tidak menghasilkan mastery evidence jika tidak setara dengan konstruk;
- label `Romaji tidak tersedia untuk aktivitas ini` menjelaskan batas tanpa menyalahkan pengguna.

### 15.5 IME composition

Input Jepang harus:

- menghormati `compositionstart`, `compositionupdate`, dan `compositionend`;
- tidak submit pada Enter selama composition aktif;
- tidak memvalidasi intermediate string sebagai jawaban akhir;
- mempertahankan caret dan candidate window;
- tidak mengubah kana/kanji otomatis di luar aturan normalisasi;
- diuji dengan desktop dan mobile Japanese IME.

### 15.6 Normalisasi Unicode

Evaluator backend menentukan normalisasi. UI boleh menampilkan preview, tetapi tidak mengubah evidence diam-diam.

Kasus yang harus diuji:

- composed/decomposed dakuten;
- full-width/half-width character;
- hiragana/katakana;
- prolonged sound mark;
- small kana;
- whitespace Jepang dan Latin;
- punctuation;
- emoji atau character di luar allowlist;
- copy-paste dari sumber eksternal.

Jika normalisasi diterapkan, feedback menjelaskan bentuk yang diterima bila berguna dan tidak membocorkan assessment.

### 15.7 Kana composer

Composer mengikuti empat state dari Practice Interactions:

| State | Pengaruh evidence | Presentation |
|---|---|---|
| `equivalent` | dapat dinilai setara | label `Input setara` bila perlu |
| `support_adjusted` | mengikuti aturan support | label dampak support sebelum menjawab |
| `practice_only` | tidak menjadi evidence assessment | label selalu terlihat |
| `unavailable` | tidak dapat digunakan | reason + next action |

Key composer:

- mempunyai label yang sesuai policy;
- tidak menunjukkan next likely character;
- tidak membedakan character jawaban secara visual;
- mendukung keyboard grouping;
- tidak mengubah answer length atau hint state;
- tetap usable pada zoom dan mobile landscape.

## 16. Construct-equivalence dan accommodation

### 16.1 Decision model

Untuk setiap alternatif:

1. definisikan konstruk yang diukur;
2. identifikasi perubahan presentation/interaction;
3. evaluasi apakah perubahan memberi clue atau menghapus kemampuan esensial;
4. tentukan `equivalent`, `support_adjusted`, `practice_only`, atau `unavailable`;
5. validasi akademik dan accessibility;
6. version dan audit keputusan;
7. komunikasikan dampak sebelum learner merespons.

### 16.2 Contoh

| Aktivitas | Alternatif | Keputusan baseline |
|---|---|---|
| Matching relasi | select-to-pair | equivalent |
| Ordering | move up/down | equivalent |
| Input kana | in-app Kana composer | policy-driven |
| Listening | transcript sebelum menjawab | tidak equivalent untuk Listening evidence |
| Kanji visual recognition | accessible name menyebut arti/bacaan | answer leakage; dilarang |
| Tracing stroke | keyboard description saja | practice-only kecuali equivalence tervalidasi |
| Audio gagal | tebak dari transcript | tidak equivalent; retry/replacement |
| Timed assessment | approved extra time | accommodation profile; server-applied |

### 16.3 Disclosure

Learner diberi tahu jika support:

- tidak memengaruhi evidence;
- menghasilkan adjusted evidence;
- hanya tersedia untuk practice;
- membuat aktivitas diganti.

Copy tidak perlu menjelaskan formula scoring rahasia, tetapi tidak boleh memberi impresi palsu.

## 17. Accessibility per interaction

| Interaction | Keyboard | Screen reader | Non-pointer alternative | Risiko utama |
|---|---|---|---|---|
| Single choice | arrow dalam radio group | label, posisi, selected | native radio | clue dari accessible name |
| Multiple choice | Tab/Space | count dan checked state | checkbox | submit terlalu dini |
| Matching | select source/target | pair state diumumkan | select-to-pair | tab stop berlebihan |
| Ordering | move controls | posisi baru diumumkan | move up/down | drag-only |
| Cloze | Tab antar blank | label konteks tiap blank | native input | context hilang |
| Japanese input | IME-aware | language metadata | Kana composer sesuai policy | Enter saat composition |
| Audio | button/slider native | state dan replay limit | approved replacement | transcript leakage |
| Explanation | disclosure button | expanded state | text | focus lompat |
| Timer | tidak perlu focus terus | announcement jarang | visual + text | noise/panic |
| Tracing | pointer bila tersedia | instruction/status | practice replacement | construct mismatch |

## 18. Assessment-specific rules

- focused shell menghapus distraction tetapi tetap menyediakan exit/help yang diizinkan;
- no correctness, hint, answer, rationale, XP, streak, atau mascot distraction sebelum policy merilis;
- timer tidak bergantung pada client clock;
- accommodation diambil dari server-authoritative profile/run configuration;
- response autosave tidak diumumkan berulang;
- connection loss tidak menghasilkan false submission;
- resume menjelaskan remaining time dan saved response;
- browser back tidak menghapus response tanpa warning;
- fullscreen tidak menjadi syarat akses;
- monitoring tidak meminta kamera atau mikrofon pada MVP;
- device/input metadata dibatasi pada kebutuhan fungsi, fairness, atau QA;
- inaccessible item dapat dilaporkan tanpa mengorbankan attempt secara otomatis.

## 19. UX writing foundation

### 19.1 Voice

Nekoru berbicara dengan suara:

- tenang;
- jelas;
- hangat;
- dewasa;
- jujur terhadap ketidakpastian;
- fokus pada tindakan berikutnya.

Nekoru tidak terdengar seperti guru yang menghakimi, game yang memaksa, atau sistem enterprise yang kaku.

### 19.2 Tone by context

| Konteks | Tone |
|---|---|
| Onboarding | ramah dan ringkas |
| Practice | suportif dan konkret |
| Assessment | netral, fokus, tidak memberi clue |
| Success | hangat tanpa berlebihan |
| Incorrect | informatif, tidak personal |
| Error | langsung dan membantu recovery |
| High-risk Ops | presisi dan eksplisit |
| Permission denied | netral, aman, dan tidak menuduh |

### 19.3 Writing rules

- gunakan active voice;
- satu kalimat untuk satu ide utama;
- kata kerja berada di awal button label;
- hindari jargon pada learner;
- technical term internal konsisten dan diberi context;
- jangan memakai emoji sebagai semantic icon;
- hindari humor pada error, kehilangan data, assessment, atau destructive action;
- jangan menggunakan gendered pronoun untuk mascot;
- jangan menambahkan tanda seru pada setiap success.

## 20. Terminology

### 20.1 Learner-facing

| Konsep | Label utama | Hindari |
|---|---|---|
| Practice | `Latihan` | drill, task |
| Assessment | `Asesmen` | test/ujian berganti-ganti |
| Session | `Sesi` | run |
| Completion | `Progres materi` | penguasaan |
| Mastery | `Penguasaan` | selesai |
| Readiness | `Kesiapan asesmen` | skor kelulusan |
| Evidence insufficient | `Belum cukup bukti` | nilai 0 |
| Needs review | `Perlu ditinjau` | gagal |
| Provisional | `Sementara` | final |
| Correct | `Benar` | sempurna |
| Incorrect | `Belum tepat` | salah total |
| Accepted with support | `Diterima dengan dukungan` | benar biasa |
| Streak | `Rangkaian belajar` | hukuman streak |

### 20.2 Content Operations

Canonical technical term boleh dipertahankan jika membantu audit, misalnya:

- Draft
- In review
- Approved
- Published
- Quarantined
- Deprecated
- Version
- Validation gate
- Finding
- Waiver
- Rollback

Jika istilah tampil pada learner, gunakan padanan Indonesia atau penjelasan.

### 20.3 Status bukan action

- action: `Publikasikan versi`;
- status: `Dipublikasikan`;
- action: `Karantina konten`;
- status: `Dikarantina`.

Label harus mencerminkan perubahan sebenarnya.

## 21. Microcopy patterns

### 21.1 Primary action

| Buruk | Gunakan |
|---|---|
| `OK` | `Mulai sesi` |
| `Submit` | `Kirim jawaban` |
| `Continue` | `Lanjutkan` |
| `Confirm` | `Publikasikan versi` |
| `Yes, delete` | `Hapus draf` |

### 21.2 Feedback

| Keadaan | Contoh |
|---|---|
| Correct | `Benar. 「は」 menandai topik pada kalimat ini.` |
| Incorrect | `Belum tepat. Perhatikan partikel setelah topik.` |
| Support adjusted | `Jawaban diterima dengan dukungan input.` |
| Evidence insufficient | `Belum cukup bukti untuk menilai penguasaan ini.` |
| Review due | `Saatnya meninjau kembali 4 materi.` |

Feedback hanya menyebut alasan spesifik jika policy mengizinkan.

### 21.3 Empty state

Gunakan formula:

```text
Apa yang kosong + mengapa + tindakan berikutnya
```

Contoh:

- `Belum ada materi yang perlu ditinjau. Lanjutkan sesi berikutnya untuk mengumpulkan bukti baru.`
- `Tidak ada hasil untuk filter ini. Ubah filter atau hapus pencarian.`

### 21.4 Loading

Gunakan objek yang sedang dimuat:

- `Menyiapkan sesi…`
- `Memuat audio…`
- `Memeriksa validation gate…`

Hindari `Loading…` jika objek dapat disebut.

### 21.5 Permission

- `Anda dapat melihat versi ini, tetapi belum memiliki izin untuk mengubahnya.`
- `Akun ini belum terdaftar untuk Content Operations.`
- `Izin Anda berubah. Perubahan lokal tetap tersedia untuk ditinjau.`

Jangan mengungkap role atau artifact sensitif yang tidak boleh diketahui user.

## 22. Localization dan internationalization

### 22.1 Locale

Interface MVP memakai `id-ID`. Materi target memakai `ja`. String tidak dirakit melalui concatenation yang mengunci urutan kata.

### 22.2 Formatting

| Data | Format baseline |
|---|---|
| Tanggal learner | `13 Sep 2026` |
| Date-time audit | `13 Sep 2026, 14.30 WIB` + UTC detail bila diperlukan |
| Durasi | `12 menit` atau `01:24` pada player |
| Bilangan | locale-aware melalui `Intl.NumberFormat` |
| Persentase | locale-aware + denominator/context |
| Timezone | nama/zona eksplisit untuk schedule dan audit |

Relative time seperti `2 jam lalu` menyediakan absolute timestamp yang dapat ditemukan.

### 22.3 Text expansion

- control tidak memakai fixed width berdasarkan copy Indonesia;
- sediakan budget ekspansi 30–40% untuk localization masa depan;
- button boleh wrap jika perlu, tanpa memotong kata kerja;
- title, nama, dan rationale panjang diuji;
- pseudo-localization masuk QA P1.

### 22.4 Bidirectional text

Walau bahasa MVP bukan RTL, user-generated text dan source citation dapat mengandung RTL. Gunakan logical CSS properties dan isolasi bidirectional text untuk ID, URL, serta mixed scripts.

### 22.5 Encoding

- UTF-8 end-to-end;
- database dan API mempertahankan Unicode;
- length limit dihitung dengan cara yang tidak memotong grapheme cluster;
- emoji dan combining mark tidak merusak cursor, truncation, atau validation;
- export/import mempertahankan Japanese text dan line ending secara konsisten.

## 23. Responsive, orientation, dan soft keyboard

### 23.1 Learner

- fungsi penuh tersedia mulai 320 CSS px;
- tidak memaksa orientation;
- bottom navigation dan submit bar memperhitungkan safe area;
- focused input discroll ke area terlihat tanpa animation berlebihan;
- virtual keyboard tidak menutupi input, candidate list, feedback, atau submit;
- Kana composer dapat menggantikan sebagian layout, tetapi prompt tetap terlihat;
- modal kompleks berubah menjadi full-screen dialog/drawer pada mobile bila lebih mudah direflow.

### 23.2 Content Operations

- mutating workflow penuh dimulai pada 1024 px;
- viewport lebih kecil menyediakan read-only summary atau task-safe subset;
- tabel boleh horizontal scroll sebagai exception essential;
- kolom identity dan action penting tetap dapat ditemukan;
- multi-pane berubah menjadi tabs atau drawer;
- minimum-width notice dapat dipahami screen reader dan tidak mengunci seluruh akun.

### 23.3 Sticky content

Sticky header/footer:

- tidak menutupi focus;
- menyediakan scroll padding;
- menyusut pada viewport rendah;
- tidak mengurangi area prompt secara berlebihan;
- dapat menjadi non-sticky jika zoom atau virtual keyboard aktif.

## 24. Data extremes

Semua layar diuji dengan:

- nama kosong, satu karakter, dan 100+ karakter;
- judul/rationale sangat panjang;
- kana, kanji, Latin, emoji, combining mark, dan RTL text;
- 0, 1, dan jumlah item besar;
- angka besar dan decimal precision ekstrem;
- tabel 1.000+ row dengan pagination/virtualization;
- 50+ opsi/filter;
- missing image/audio/source;
- deleted/deprecated artifact reference;
- unknown enum dari versi API lebih baru;
- timestamp invalid atau timezone berubah;
- status combination yang seharusnya mustahil.

Unknown state tidak dirender sebagai success. Sistem memakai safe fallback dan telemetry yang tidak sensitif.

## 25. Network, offline, dan synchronization

### 25.1 Network state

| State | Presentation | Action |
|---|---|---|
| Slow | loading object-specific; jangan declare gagal terlalu cepat | tetap tunggu/cancel bila aman |
| Timeout | jelaskan request belum selesai | retry aman |
| Offline | persistent offline banner | gunakan cached capability |
| Reconnecting | status singkat, no focus steal | tunggu atau work locally |
| Online restored | announce sekali | sync queue |
| Server unavailable | scope dampak | retry/support |

### 25.2 Offline practice

- hanya session package tervalidasi yang dapat dijalankan offline;
- status offline terlihat sebelum mulai;
- asset completeness diverifikasi;
- answer disimpan lokal secara aman;
- submission memakai idempotency key;
- sync tidak membuat attempt ganda;
- evidence baru final setelah acknowledgment backend;
- user diberi tahu jika logout/device cleanup menghapus queue lokal.

### 25.3 Assessment offline

Assessment offline hanya tersedia jika specification dan security policy secara eksplisit mengizinkan. Jika tidak:

- entry diblokir sebelum timer berjalan;
- reason dan kebutuhan koneksi dijelaskan;
- active run mengikuti resume/invalidation policy;
- tidak ada fallback ke practice yang terlihat seolah-olah assessment.

### 25.4 Conflict

Untuk Content Operations:

- detect version conflict;
- jangan overwrite otomatis;
- tampilkan perubahan lokal dan server;
- sediakan compare, copy, atau reapply;
- publish/release selalu mengecek version terbaru;
- audit mencatat resolution.

Untuk learner preference/progress:

- backend authoritative untuk mastery, readiness, XP, dan completed state;
- preference sederhana dapat memakai last-write-wins bila aman;
- conflict yang berdampak evidence tidak diselesaikan diam-diam.

## 26. Error taxonomy dan recovery

| Kategori | Contoh | Recovery utama |
|---|---|---|
| Validation | field required, invalid format | koreksi inline |
| Authentication | session expired | sign in lalu kembali |
| Authorization | role tidak cukup | read-only/support |
| Not found | artifact deleted/version gone | kembali ke inventory |
| Conflict | version berubah | compare dan resolve |
| Rate limit | terlalu banyak request | tunggu + retry time |
| Network | offline/timeout | retry atau cached path |
| Asset | audio/glyph/image gagal | retry/report/replacement |
| Evaluation | evaluator unavailable | pending, bukan incorrect |
| Business rule | readiness/gate belum terpenuhi | tampilkan requirement |
| Server | 5xx | retry/support reference |
| Unknown | unrecognized response | safe failure, no false success |

### 26.1 Retry safety

Retry diperbolehkan otomatis hanya untuk idempotent read atau operation yang mempunyai idempotency contract. Publish, approval, answer submission, role change, dan rollback tidak diulang secara buta.

### 26.2 Partial failure

Satu widget gagal tidak boleh memblokir seluruh layar jika bagian lain tetap aman. Contoh:

- chart gagal, summary text tetap muncul;
- achievement gagal dimuat, next action tetap tersedia;
- optional illustration gagal, content tetap terbaca;
- audit export gagal, audit timeline tetap dapat dilihat.

## 27. Cross-surface state matrix

| State | Learner | Practice/Assessment | Content Operations |
|---|---|---|---|
| Loading | skeleton + objek | session preparation | table/workbench skeleton |
| Empty | explanation + next action | tidak ada item yang valid | create/import/filter action |
| Offline | cached plan/status | offline package policy | read-only cached context bila aman |
| Stale | timestamp + refresh | locked instance tetap authoritative | compare latest version |
| Permission denied | account/support | run access blocked | read-only atau 403 |
| Asset missing | fallback/report | no false incorrect | finding + block gate |
| Evaluation pending | pending status | answer tersimpan, no result | queue status |
| Partial data | hide false metric | preserve run | mark incomplete sections |
| Conflict | backend wins for evidence | idempotent resume | explicit merge/compare |
| Maintenance | status + retry later | preserve attempt policy | block mutation, allow safe read |

## 28. Flow-specific edge cases

### 28.1 Onboarding

- guest refresh/reopen;
- timezone tidak tersedia;
- availability = 0 atau sangat tinggi;
- goal tidak kompatibel dengan waktu;
- assistive preference belum dipilih;
- sign-in dibatalkan;
- email link expired/dibuka di perangkat lain;
- account sudah mempunyai profile;
- duplicate onboarding draft;
- backend save gagal setelah identity success.

### 28.2 Home dan planning

- plan belum tersedia;
- plan stale/recalculating;
- tidak ada next action yang aman;
- semua review selesai;
- review overdue sangat banyak;
- readiness unknown;
- schedule melewati perubahan timezone;
- metric sebagian gagal;
- learner kembali setelah lama tidak aktif.

### 28.3 Practice

- session package incomplete;
- no compatible activity untuk accessibility profile;
- audio permission/device route berubah;
- IME composition saat submit;
- duplicate tap submit;
- refresh setelah response lokal tersimpan;
- feedback unavailable;
- report issue gagal dikirim;
- activity ditarik/quarantined selama session;
- evaluator timeout.

### 28.4 Assessment

- eligibility berubah sebelum start;
- timer dimulai tetapi item gagal;
- tab/browser crash;
- session token expired;
- accommodation mismatch;
- reconnect setelah deadline;
- response accepted tetapi result pending;
- item invalidated setelah completion;
- result withheld untuk review;
- retake belum tersedia.

### 28.5 Progress dan readiness

- denominator berubah karena curriculum version;
- evidence provisional;
- mastery decayed;
- score belum cukup stabil;
- completion tinggi tetapi readiness rendah;
- imported history sebagian;
- metric stale;
- no data versus actual zero;
- explanation service unavailable.

### 28.6 Content Operations

- artifact locked oleh reviewer lain;
- version conflict;
- dependency graph cycle;
- validator timeout;
- finding tidak lagi berlaku pada version baru;
- approver kehilangan role;
- approval kedaluwarsa setelah perubahan;
- publish succeeds tetapi index refresh tertunda;
- rollback target tidak kompatibel;
- affected learner count tidak dapat dihitung;
- audit service unavailable;
- bulk selection berubah setelah filter refresh.

## 29. Privacy dan security dalam UX

- accessibility preference dipisahkan dari diagnosis medis;
- analytics hanya menyimpan category yang dibutuhkan, bukan free-text detail sensitif;
- raw answer tidak masuk generic UI analytics;
- hidden rationale/answer tidak dikirim ke client sebelum boleh dirilis;
- copy-paste field disanitasi tanpa merusak Japanese text;
- error tidak menampilkan stack trace, token, email orang lain, atau internal permission graph;
- account enumeration dihindari;
- session expiry tidak menghapus draft lokal yang aman tanpa warning;
- high-risk action memakai re-authentication hanya jika policy memerlukan dan jalurnya accessible;
- screenshot/logging tool internal menutupi data sensitif sesuai policy.

## 30. Supported platform dan assistive-technology matrix

### 30.1 Policy versi

Target browser adalah current dan previous major stable pada saat release, dengan exception terdokumentasi bila platform vendor menyebabkan blocker. Matrix aktual disimpan sebagai versioned release artifact.

### 30.2 P0 manual matrix

| Platform | Browser | Assistive mode |
|---|---|---|
| Windows | Chrome dan Edge | keyboard-only, NVDA, 200%/400% zoom, forced colors |
| Windows | Firefox | keyboard-only dan NVDA sampling |
| macOS | Safari | keyboard-only dan VoiceOver |
| iOS | Safari | VoiceOver, text scaling, portrait/landscape |
| Android | Chrome | TalkBack, font scaling, portrait/landscape |

JAWS compatibility sampling masuk P1 atau release-critical sampling bila pengguna/organisasi target memerlukannya. NVDA dan assistive technology bawaan platform menjadi baseline yang dapat diuji tanpa lisensi tambahan.

### 30.3 Input matrix

- mouse;
- touch;
- keyboard-only;
- screen reader;
- switch/keyboard emulation;
- voice control sampling;
- Japanese IME desktop dan mobile;
- in-app Kana composer;
- reduced motion;
- forced colors/high contrast.

## 31. Testing strategy

### 31.1 Automated

- static semantic/lint checks;
- automated accessibility scan pada route dan state utama;
- contrast token tests;
- component unit tests untuk name/role/value;
- keyboard interaction tests;
- focus regression tests;
- visual regression pada zoom, text spacing, dan forced colors;
- Unicode/IME fixtures;
- offline, retry, idempotency, dan conflict integration tests;
- no-answer-leakage checks pada assessment bundle.

Automated test tidak menggantikan manual testing.

### 31.2 Manual

- keyboard-only critical journeys;
- NVDA, VoiceOver, dan TalkBack;
- 200% text resize dan 400% reflow;
- high contrast/forced colors;
- reduced motion;
- slow network, offline, reconnect;
- long/empty/malformed/mixed-script content;
- audio failure dan transcript policy;
- Japanese IME composition;
- Kana composer equivalence states;
- assessment feedback hold;
- publish, conflict, rollback, dan permission loss.

### 31.3 Usability testing

Rekrut pengguna yang benar-benar memakai:

- screen reader;
- keyboard atau switch access;
- magnification/high zoom;
- captions/transcripts;
- Japanese IME pada mobile dan desktop;
- cognitive support seperti reduced distraction atau extra time.

Accommodation pengguna tidak boleh dijadikan asumsi berdasarkan diagnosis saja.

## 32. Severity dan release gate

| Severity | Definisi | Release policy |
|---|---|---|
| Blocker | critical journey tidak dapat diselesaikan atau konstruk/evidence rusak | blokir release |
| Critical | major function/information tidak accessible tanpa safe workaround | blokir affected surface |
| Major | friction berat atau alternative tidak konsisten | harus diperbaiki atau exception time-bound |
| Minor | issue terbatas dengan workaround layak | dapat dijadwalkan dengan owner |

Accessibility failure pada published activity dapat memicu quarantine sesuai content validation policy.

## 33. Acceptance criteria global

Sebelum release:

### Conformance

- [ ] Seluruh P0 flow memenuhi WCAG 2.2 AA pada supported matrix.
- [ ] Tidak ada blocker atau critical accessibility defect terbuka.
- [ ] Exception memiliki owner, scope, fallback, dan target date.
- [ ] Third-party authentication journey telah diuji.

### Keyboard dan screen reader

- [ ] Semua fungsi dapat dijalankan keyboard.
- [ ] Focus order logis dan focus tidak tertutup.
- [ ] Dialog, tabs, menu, grid, dan composite mengikuti pattern konsisten.
- [ ] Dynamic announcement informatif tetapi tidak noisy.
- [ ] Hidden assessment content tidak masuk accessibility tree.

### Visual dan responsive

- [ ] Contrast memenuhi requirement.
- [ ] State tidak bergantung pada warna.
- [ ] Text resize 200% dan reflow 400% lulus.
- [ ] Target utama minimal 44×44 px.
- [ ] Forced colors dan reduced motion lulus.
- [ ] Sticky UI serta virtual keyboard tidak menutupi focus/content.

### Learning integrity

- [ ] Alternatif mempunyai equivalence classification.
- [ ] Romaji, furigana, transcript, dan composer mengikuti activity policy.
- [ ] Audio/asset failure tidak membuat false incorrect atau evidence.
- [ ] Accommodation assessment diterapkan server-side.
- [ ] Tidak ada answer leakage melalui alt text, ARIA, DOM, atau event.

### Content dan resilience

- [ ] Terminology konsisten.
- [ ] Error menjelaskan recovery dan status data.
- [ ] Empty/loading/offline/stale/conflict/permission state tersedia.
- [ ] Long, empty, malformed, dan multilingual data diuji.
- [ ] Retry untuk mutation aman dan idempotent.
- [ ] User input dipertahankan saat failure bila aman.

## 34. Ownership

| Area | Accountable | Required reviewers |
|---|---|---|
| WCAG conformance | Product + Accessibility | Design, engineering, QA |
| Construct-equivalence | Academic | Accessibility, Practice Engine, assessment |
| UX writing | Content Design | Product, academic untuk learning copy |
| Japanese language | Academic/Linguistic | Localization, accessibility |
| Component semantics | Engineering + Design System | Accessibility, QA |
| Content alternative | Content Operations | Academic, accessibility, rights |
| Auth accessibility | Product/Engineering | Security, accessibility |
| Release exception | Product | Accessibility + owner area |

## 35. Keputusan yang ditetapkan

| ID | Keputusan | Status |
|---|---|---|
| `ACC-001` | WCAG 2.2 AA adalah requirement formal untuk P0/P1 scope yang didukung. | Ditetapkan |
| `ACC-002` | AAA diupayakan untuk body text dan konten belajar kritis tanpa klaim full AAA. | Ditetapkan |
| `ACC-003` | Target interaksi utama internal adalah 44×44 CSS px. | Ditetapkan |
| `ACC-004` | Semantic HTML diprioritaskan; APG menjadi panduan pola, bukan pengganti pengujian. | Ditetapkan |
| `ACC-005` | Alternatif aksesibilitas wajib mempunyai classification construct-equivalence. | Ditetapkan |
| `ACC-006` | Transcript tidak otomatis setara untuk Listening evidence. | Ditetapkan |
| `ACC-007` | Romaji dan furigana mengikuti policy per aktivitas, bukan global override. | Ditetapkan |
| `ACC-008` | Drag-and-drop selalu memiliki alternatif non-drag. | Ditetapkan |
| `ACC-009` | Learner UI berfungsi mulai 320 CSS px dan diuji pada 400% reflow. | Ditetapkan |
| `ACC-010` | Interface memakai `id-ID`; materi Jepang ditandai `ja`. | Ditetapkan |
| `ACC-011` | NVDA, VoiceOver, dan TalkBack menjadi P0 assistive-technology matrix. | Ditetapkan |
| `ACC-012` | Error mempertahankan input dan menjelaskan recovery bila aman. | Ditetapkan |
| `ACC-013` | Hidden assessment feedback tidak dikirim atau dirender sebelum release policy mengizinkan. | Ditetapkan |
| `ACC-014` | Accessibility preference tidak diperlakukan sebagai diagnosis atau generic analytics payload. | Ditetapkan |

## 36. Keputusan terbuka

| ID | Pertanyaan | Rekomendasi | Dampak | Status |
|---|---|---|---|---|
| `ACC-OPEN-001` | Versi minimum OS/browser apa yang dijamin setelah MVP? | Gunakan current dan previous major stable, lalu kunci matrix bernomor per release berdasarkan analytics dan hasil QA. | Support policy, QA lab | Menunggu implementasi |
| `ACC-OPEN-002` | Accommodation assessment apa saja yang tersedia pada MVP? | Mulai dari presentation preference dan approved extra-time profile; hanya tambahkan modality replacement setelah equivalence tervalidasi. | Assessment config, fairness, support | Menunggu academic/accessibility review |
| `ACC-OPEN-003` | Apakah JAWS masuk regression matrix rutin? | P1 sampling; naikkan ke P0 bila populasi target atau kontrak organisasi membutuhkannya. | Lisensi, QA capacity | Menunggu target-user data |

## 37. Artefak lanjutan

Dokumen ini perlu diturunkan menjadi:

1. WCAG success-criterion traceability matrix per route/component;
2. versioned browser/device/assistive-technology matrix;
3. keyboard interaction specification per composite component;
4. construct-equivalence registry;
5. UX terminology dan string catalog;
6. pseudo-localization dan multilingual fixtures;
7. error/status message catalog;
8. extreme-data, offline, conflict, dan permission fixtures;
9. manual accessibility test scripts;
10. release conformance report dan exception register.

