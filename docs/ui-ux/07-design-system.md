# Nekoru UI/UX Specification — 07. Design System

**Status:** Baseline v1 — siap menjadi acuan wireframe, prototipe, dan implementasi  
**Terakhir diperbarui:** 13 September 2026  
**Pemilik:** Product Design  
**Cakupan:** Learner surface dan Content Operations  
**Tema rilis awal:** Light theme  

## 1. Tujuan dokumen

Dokumen ini mendefinisikan bahasa visual dan kontrak komponen Nekoru agar pengalaman belajar, assessment, dan operasi konten terasa sebagai satu produk tanpa memaksakan kepadatan atau pola interaksi yang sama.

Sistem desain ini harus:

1. membuat materi Jepang–Indonesia mudah dibaca;
2. menjaga assessment tetap tenang, adil, dan bebas clue;
3. membedakan completion, mastery, readiness, dan status sistem;
4. membuat tindakan berisiko di Content Operations eksplisit dan dapat diaudit;
5. memberi karakter yang hangat tanpa membuat produk terasa kekanak-kanakan;
6. menghasilkan UI yang dapat diakses, responsif, dan konsisten.

Dokumen ini tidak menentukan copy final, algoritme learning engine, scoring, atau data contract. Detail tersebut mengikuti dokumen produk dan spesifikasi layar yang menjadi sumbernya.

## 2. Sumber dan keterkaitan

Sistem desain ini menurunkan keputusan dari:

- [01. UI/UX Overview](./01-ui-ux-overview.md)
- [02. Information Architecture](./02-information-architecture.md)
- [03. User Flows](./03-user-flows.md)
- [04. Screen Specifications — Learner](./04-screen-specifications-learner.md)
- [05. Screen Specifications — Content Operations](./05-screen-specifications-content-ops.md)
- [06. Practice Interactions](./06-practice-interactions.md)
- [Product Overview](../product-specs/product-overview.md)
- [Curriculum Architecture](../product-specs/curriculum-architecture.md)
- [Learning Engine](../product-specs/learning-engine.md)
- [Mastery Specification](../product-specs/mastery-specification.md)
- [Practice Engine](../product-specs/practice-engine.md)
- [Assessment Specification N5](../product-specs/assessment-specification-n5.md)
- [Content Validation Rubric](../product-specs/content-validation-rubric.md)

Jika terjadi konflik:

1. aturan assessment dan scoring mengalahkan dekorasi visual;
2. aksesibilitas mengalahkan kepadatan atau estetika;
3. status backend mengalahkan optimisme client;
4. spesifikasi layar mengalahkan contoh generik dalam dokumen ini;
5. komponen baru harus memperluas sistem, bukan menciptakan pola paralel tanpa alasan.

## 3. Prinsip visual

### 3.1 Calm kawaii learning companion

Nekoru menggunakan gaya **kawaii modern yang tenang**: hangat, ringan, dan bersahabat, tetapi bukan visual anak-anak atau antarmuka game yang berisik.

Karakter utamanya:

- bentuk membulat dengan struktur yang rapi;
- permukaan warm-neutral, bukan putih klinis;
- indigo sebagai warna tindakan dan orientasi;
- aksen sakura/coral secara hemat untuk kehangatan brand;
- ilustrasi sederhana, tidak mengambil fokus dari materi;
- whitespace yang cukup dan hierarki tipografi yang jelas;
- feedback yang informatif, bukan menghakimi.

### 3.2 Learning first

Konten belajar selalu lebih penting daripada dekorasi. Ukuran tulisan Jepang, ruang untuk furigana, audio control, feedback, dan pilihan jawaban tidak boleh dikompromikan untuk mascot atau ornament.

### 3.3 Status is explicit

Warna tidak pernah menjadi satu-satunya pembeda. Setiap status penting menggunakan kombinasi minimal dua dari:

- teks;
- ikon;
- bentuk atau pola;
- posisi yang konsisten;
- warna.

### 3.4 Calm under pressure

Assessment, error, dan high-risk action tidak menggunakan animasi mengejutkan, copy menyalahkan, atau mascot yang bereaksi berlebihan. UI menjelaskan keadaan dan jalan keluar.

### 3.5 Shared language, different density

Learner dan Content Operations memakai token, ikon, status, dan komponen dasar yang sama. Namun:

- Learner memakai ruang lebih longgar, target sentuh besar, dan satu fokus utama per layar;
- Content Operations memakai kepadatan lebih tinggi, tabel, workbench, dan tindakan eksplisit untuk pengguna ahli.

## 4. Identitas Nekoru

### 4.1 Peran brand

Brand harus menyampaikan tiga kualitas:

| Kualitas | Makna dalam UI | Hindari |
|---|---|---|
| Hangat | copy suportif, permukaan lembut, mascot kontekstual | bahasa bayi, reaksi hiperaktif |
| Terpercaya | status jelas, data provenance, tindakan dapat diprediksi | reward yang menutupi risiko atau ketidakpastian |
| Bertumbuh | progres terlihat, feedback actionable, milestone bermakna | menyamakan aktivitas dengan mastery |

### 4.2 Wordmark dan symbol

Baseline identitas:

- wordmark berbasis bentuk huruf geometric-humanist yang selaras dengan `Plus Jakarta Sans`;
- symbol memakai abstraksi kepala/telinga kucing atau ekor, bukan ilustrasi karakter penuh;
- wordmark dan symbol harus tetap terbaca pada ukuran kecil dan versi monokrom;
- logo tidak menggunakan bendera Jepang, matahari terbit, atau stereotipe budaya;
- symbol tidak menggantikan label pada navigasi yang belum familiar.

Artwork logo final harus tersedia dalam SVG dan memiliki varian:

- horizontal;
- symbol-only;
- satu warna gelap;
- satu warna terang;
- favicon/app icon dengan safe area yang tervalidasi.

### 4.3 Mascot Nekoru

Nekoru ditetapkan sebagai **companion kucing gender-neutral bergaya kawaii modern**.

#### Karakter visual

- siluet sederhana dan mudah dikenali;
- proporsi cute tetapi tidak menyerupai karakter balita;
- ekspresi hangat, tenang, dan ingin tahu;
- warna tubuh netral agar tidak bertabrakan dengan warna semantic;
- aksen indigo atau sakura diperbolehkan sebagai aksesori kecil;
- tidak memakai atribut yang memberi stereotipe gender;
- tidak memakai kostum budaya sebagai dekorasi generik.

#### Lokasi yang diperbolehkan

| Konteks | Peran mascot | Intensitas |
|---|---|---|
| Onboarding | menyambut dan menjelaskan langkah | medium |
| Home | menunjukkan next action atau empty state | rendah–medium |
| Session summary | mengakui usaha dan menjelaskan langkah selanjutnya | medium |
| Milestone | merayakan pencapaian yang benar-benar terpenuhi | medium–tinggi, singkat |
| Bantuan/penjelasan | memberi orientasi tanpa menyembunyikan sumber | rendah |
| Loading panjang | memberi rasa progres jika status riil tersedia | rendah |

#### Lokasi yang dilarang

- di dalam area jawaban assessment;
- selama timed response, kecuali bentuk statis non-distraktif di luar task area;
- pada feedback yang dapat membocorkan jawaban sebelum submit;
- pada dialog destructive atau high-risk release;
- sebagai dekorasi dominan pada tabel dan workbench Content Operations;
- sebagai pengganti error message, status, atau instruksi;
- sebagai ekspresi kecewa, marah, atau mempermalukan learner.

#### Aksesibilitas mascot

- mascot dekoratif memakai `alt=""` dan tidak menerima fokus;
- informasi yang dibawa ilustrasi harus diulang sebagai teks;
- animasi berhenti atau menjadi pose statis saat `prefers-reduced-motion` aktif;
- pose tidak boleh menjadi satu-satunya penanda success, warning, atau error;
- mascot tidak boleh menutupi teks ketika zoom 200% atau viewport sempit.

### 4.4 Ilustrasi

Ilustrasi memakai:

- bentuk vector sederhana;
- outline lembut dengan bobot konsisten;
- palet brand dan neutral, bukan rainbow default;
- detail minimum agar tetap jelas pada 96–160 px;
- latar transparan atau surface token, bukan warna hard-coded.

Ilustrasi digunakan untuk onboarding, empty state, milestone, dan recovery state. Ilustrasi tidak digunakan untuk mempercantik setiap card.

## 5. Arsitektur design token

Token memiliki tiga lapisan:

```text
Primitive token   → nilai dasar, mis. color.indigo.600
Semantic token    → fungsi, mis. color.action.primary.background
Component token   → konteks khusus, mis. button.primary.background
```

Aturan:

- kode produk mengonsumsi semantic atau component token;
- primitive token tidak dipakai langsung kecuali pada dokumentasi atau visual exploration;
- nama token menjelaskan fungsi, bukan warna aktual;
- light dan dark theme berbagi nama semantic yang sama;
- perubahan primitive tidak boleh diam-diam mengubah arti semantic;
- status bisnis tidak mengambil token dekoratif.

Contoh:

```css
--color-action-primary-bg: var(--color-indigo-600);
--color-action-primary-bg-hover: var(--color-indigo-700);
--color-action-primary-fg: var(--color-white);
--color-feedback-success-bg: #edf8f1;
--color-feedback-success-fg: #236244;
```

## 6. Warna

### 6.1 Palet primitive

#### Indigo — primary/brand

| Token | Nilai | Pemakaian utama |
|---|---:|---|
| `indigo.50` | `#F1F4FF` | selected surface ringan |
| `indigo.100` | `#E3E9FF` | subtle highlight |
| `indigo.200` | `#C7D2FE` | decorative accent |
| `indigo.300` | `#A5B4FC` | focus/supporting accent |
| `indigo.400` | `#818CF8` | illustration |
| `indigo.500` | `#5B6EE1` | active graphic |
| `indigo.600` | `#4458C7` | primary action |
| `indigo.700` | `#35449E` | hover/pressed, text link |
| `indigo.800` | `#2E3A7F` | high-emphasis brand text |
| `indigo.900` | `#293464` | darkest brand surface |

#### Sakura — warm accent

| Token | Nilai | Pemakaian utama |
|---|---:|---|
| `sakura.50` | `#FFF1F3` | decorative tint |
| `sakura.100` | `#FFE1E7` | illustration surface |
| `sakura.300` | `#F59AAF` | decorative accent |
| `sakura.500` | `#DD5670` | brand accent |
| `sakura.600` | `#C63C5A` | pressed accent |
| `sakura.700` | `#A5273F` | dark accent / danger foreground by semantic mapping |

Sakura bukan default CTA dan tidak boleh dipakai sebagai error tanpa label serta ikon. Ini mencegah dekorasi brand terlihat seperti alarm.

#### Warm neutral

| Token | Nilai | Pemakaian utama |
|---|---:|---|
| `neutral.0` | `#FFFFFF` | elevated surface |
| `neutral.25` | `#FFFDF8` | learner canvas |
| `neutral.50` | `#FAF8F3` | subtle surface |
| `neutral.100` | `#F3F0E9` | grouped surface |
| `neutral.200` | `#E4E0D7` | divider |
| `neutral.300` | `#CCC6BA` | decorative border |
| `neutral.400` | `#9B9488` | disabled decoration |
| `neutral.500` | `#706A61` | secondary text / interactive border |
| `neutral.600` | `#514C46` | body text |
| `neutral.700` | `#393632` | strong text |
| `neutral.800` | `#272522` | heading text |
| `neutral.900` | `#191817` | maximum contrast |

### 6.2 Semantic color

| Peran | Background | Foreground | Ikon/pola |
|---|---:|---:|---|
| Primary action | `#4458C7` | `#FFFFFF` | action icon bila perlu |
| Selected/info brand | `#F1F4FF` | `#35449E` | circle/info |
| Success/mastered | `#EDF8F1` | `#236244` | check |
| Warning/needs review | `#FFF7E6` | `#7A4A00` | clock/triangle |
| Danger/error | `#FFF1F3` | `#A5273F` | error circle |
| Information | `#EEF6FF` | `#235EA7` | info circle |
| Pending | `#F3F0E9` | `#514C46` | clock/dotted ring |
| Disabled | `#F3F0E9` | `#706A61` | label tetap terbaca |

Pasangan utama telah dipilih dengan rasio kontras teks normal minimal 4.5:1 pada light theme. Contoh hasil verifikasi:

| Pasangan | Rasio |
|---|---:|
| Primary `#4458C7` / white | 6.06:1 |
| Heading `#272522` / canvas `#FFFDF8` | 15.03:1 |
| Body `#514C46` / canvas `#FFFDF8` | 8.36:1 |
| Secondary `#706A61` / canvas `#FFFDF8` | 5.27:1 |
| Success foreground/background | 6.65:1 |
| Warning foreground/background | 7.02:1 |
| Danger foreground/background | 6.46:1 |

Kontras komponen aktual tetap harus diuji setelah opacity, overlay, font weight, dan state diterapkan.

### 6.3 Surface

| Token semantic | Nilai light | Kegunaan |
|---|---:|---|
| `surface.canvas.learner` | `neutral.25` | canvas learner |
| `surface.canvas.ops` | `neutral.50` | canvas Content Ops |
| `surface.default` | `neutral.0` | card/panel |
| `surface.subtle` | `neutral.50` | grouping |
| `surface.selected` | `indigo.50` | pilihan aktif |
| `surface.scrim` | `rgba(25,24,23,.56)` | modal/drawer overlay |

### 6.4 Aturan warna

- Primary action per region maksimal satu.
- Link inline memakai indigo gelap dan underline; warna saja tidak cukup.
- Border interactive memakai warna yang tetap terlihat terhadap surface; `neutral.300` hanya untuk divider dekoratif.
- Jangan memakai success untuk completion jika mastery belum terverifikasi.
- Warning tidak berarti salah; warning berarti perhatian atau review dibutuhkan.
- Merah/danger hanya untuk error, destructive action, invalid state, atau risiko tinggi.
- Progress chart wajib memiliki label atau pola alternatif.
- Heatmap dan chart harus memiliki legend, denominator, rentang waktu, serta representasi tabel bila dibutuhkan.

### 6.5 Tema

Light theme adalah P0. Dark theme adalah P1 dan disiapkan melalui semantic token, tetapi tidak boleh dihasilkan dengan membalik warna secara otomatis. Sebelum dark theme dirilis, semua komponen harus diuji ulang untuk:

- kontras;
- elevation dan border;
- warna audio waveform;
- syntax/diff view;
- chart;
- illustration dan mascot;
- screenshot materi atau asset yang mempunyai background tetap.

## 7. Tipografi

### 7.1 Font family

| Konteks | Font | Fallback |
|---|---|---|
| UI dan teks Indonesia | `Plus Jakarta Sans` | `Inter`, `Segoe UI`, sans-serif |
| Konten Jepang | `Noto Sans JP` | `Yu Gothic`, `Hiragino Kaku Gothic ProN`, sans-serif |
| ID, hash, dan diff teknis | system monospace | `Consolas`, monospace |

Aturan:

- gunakan font Jepang untuk kana, kanji, dan contoh kalimat Jepang;
- jangan memaksa seluruh interface memakai font Jepang;
- jangan menggunakan fake bold untuk glyph Jepang;
- font web harus memakai `font-display: swap` dan subset yang aman bila memungkinkan;
- font failure tidak boleh mengubah tinggi control secara ekstrem.

### 7.2 Type scale UI

| Token | Ukuran/line-height | Weight | Kegunaan |
|---|---|---:|---|
| `display.lg` | 48/56 px | 700 | hero terbatas |
| `display.sm` | 36/44 px | 700 | onboarding headline |
| `heading.1` | 30/38 px | 700 | judul layar |
| `heading.2` | 24/32 px | 700 | judul section |
| `heading.3` | 20/28 px | 600 | card/workbench heading |
| `body.lg` | 18/28 px | 400–600 | lead atau learner instruction |
| `body.md` | 16/24 px | 400–600 | default learner body |
| `body.sm` | 14/20 px | 400–600 | metadata dan Ops body |
| `label.md` | 14/20 px | 600 | button/form label |
| `label.sm` | 12/16 px | 600 | badge; bukan body panjang |

Ukuran dasar learner adalah 16 px. Content Operations boleh memakai body 14 px pada tabel, tetapi action penting dan form input tetap minimal 14–16 px.

### 7.3 Teks Jepang dan furigana

| Token | Ukuran/line-height | Kegunaan |
|---|---|---|
| `jp.glyph.xl` | 64/80 px | satu kanji/kana yang menjadi objek utama |
| `jp.prompt.lg` | 32/48 px | prompt pendek |
| `jp.prompt.md` | 24/38 px | kalimat atau opsi utama |
| `jp.body` | 18/30 px | penjelasan/contoh |
| `jp.ruby` | min. 12/16 px | furigana |

Gunakan markup `<ruby>` dan `<rt>` untuk furigana. Furigana:

- tidak disisipkan sebagai teks biasa dalam tanda kurung ketika layout mendukung ruby;
- dapat ditampilkan atau disembunyikan sesuai policy aktivitas;
- tidak boleh pecah dari kanji induknya;
- tidak boleh menjadi clue bila assessment policy melarang reading support.

### 7.4 Panjang baris dan alignment

- body Latin: target 45–75 karakter per baris;
- penjelasan Jepang: batasi lebar agar scanning dan line break tetap alami;
- angka pada tabel rata kanan; teks rata kiri;
- teks Jepang horizontal mengikuti left alignment kecuali materi eksplisit memerlukan format lain;
- jangan justify paragraf;
- truncation hanya untuk metadata yang dapat dibuka penuh, bukan prompt, jawaban, rationale, atau warning.

## 8. Spacing, size, dan grid

### 8.1 Spacing scale

Semua layout memakai basis 4 px.

| Token | Nilai |
|---|---:|
| `space.0` | 0 |
| `space.1` | 4 px |
| `space.2` | 8 px |
| `space.3` | 12 px |
| `space.4` | 16 px |
| `space.5` | 20 px |
| `space.6` | 24 px |
| `space.8` | 32 px |
| `space.10` | 40 px |
| `space.12` | 48 px |
| `space.16` | 64 px |
| `space.20` | 80 px |

Default:

- jarak label–control: 8 px;
- jarak antar field: 20–24 px;
- padding learner card: 20 px mobile, 24 px desktop;
- padding Ops panel: 16–24 px;
- jarak section: 32–48 px;
- area practice memakai ruang vertikal longgar dan submit bar tidak menutupi konten.

### 8.2 Breakpoint

| Nama | Rentang awal | Tujuan |
|---|---:|---|
| Base | 0 | mobile learner |
| `sm` | 480 px | mobile lebar |
| `md` | 768 px | tablet |
| `lg` | 1024 px | desktop dan minimum mutating Content Ops |
| `xl` | 1280 px | workbench 2–3 pane |
| `2xl` | 1536 px | large workspace |

Breakpoint dipilih berdasarkan ruang yang dibutuhkan konten, bukan model perangkat tertentu.

### 8.3 Container

| Konteks | Lebar maksimum rekomendasi |
|---|---:|
| Auth/onboarding form | 480 px |
| Learner reading | 720 px |
| Practice activity | 760 px |
| Learner dashboard | 1120 px |
| Content Operations | 1440 px, fluid |

### 8.4 Target interaksi

- target pointer/touch minimum 44×44 px;
- jarak antar target kecil minimal 8 px;
- icon button tetap memiliki accessible name;
- drag handle memiliki alternatif keyboard;
- control sticky memperhitungkan safe area mobile;
- hover tidak menjadi syarat menemukan atau menjalankan fungsi.

## 9. Shape, border, dan elevation

### 9.1 Radius

| Token | Nilai | Kegunaan |
|---|---:|---|
| `radius.sm` | 6 px | badge, small control |
| `radius.md` | 8 px | input dan Ops card |
| `radius.lg` | 12 px | dialog dan panel |
| `radius.xl` | 16 px | learner card |
| `radius.full` | 999 px | avatar, tag, progress dot |

Tidak semua elemen menggunakan pill. Pill hanya untuk bentuk intrinsik seperti tag, filter chip, dan compact status.

### 9.2 Border

- default divider: 1 px `neutral.200`;
- interactive boundary: 1 px `neutral.500` atau token semantic setara;
- selected: 2 px `indigo.600` jika border merupakan pembeda utama;
- invalid: 2 px danger plus message;
- focus tidak menggantikan border state.

### 9.3 Elevation

| Token | Kegunaan |
|---|---|
| `elevation.0` | page dan nested surface |
| `elevation.1` | card interaktif ringan |
| `elevation.2` | sticky bar, popover |
| `elevation.3` | dialog/drawer |

Gunakan border dan grouping sebelum shadow. Shadow tidak dipakai untuk menyatakan status.

## 10. Ikonografi

Sistem ikon memakai outline membulat dengan stroke 1.75–2 px.

Ukuran standar:

- 16 px untuk metadata;
- 20 px untuk input dan compact button;
- 24 px untuk navigation dan standard button;
- 32 px atau lebih hanya untuk empty state/status illustration.

Aturan:

- ikon filled diperbolehkan untuk selected state atau emphasis semantic;
- ikon custom harus mengikuti viewbox dan optical alignment yang sama;
- ikon ambigu disertai label;
- tooltip bukan pengganti accessible name;
- icon-only button dipakai hanya untuk fungsi yang sangat familiar atau ruang yang benar-benar terbatas;
- arah panah mengikuti arah alur UI, bukan arah baca bahasa Jepang;
- country flag tidak digunakan untuk merepresentasikan bahasa.

Status icon baseline:

| Status | Ikon |
|---|---|
| Mastered | check dalam lingkaran |
| Needs review | clock |
| Provisional | lingkaran setengah/dotted |
| Locked | lock |
| Warning | triangle |
| Error | exclamation dalam lingkaran |
| Pending | clock atau spinner dengan label |
| Published | check + label `Published` |

## 11. Motion

### 11.1 Durasi

| Token | Durasi | Contoh |
|---|---:|---|
| `motion.instant` | 100 ms | hover/color |
| `motion.fast` | 160 ms | selection, tooltip |
| `motion.base` | 240 ms | panel transition |
| `motion.slow` | 320 ms | drawer/dialog |

Gunakan easing standard yang halus; spring/bounce hanya boleh muncul pada milestone non-kritis dan tidak lebih dari satu kali.

### 11.2 Aturan

- tidak ada shake pada jawaban salah;
- tidak ada countdown berkedip;
- correctness feedback memakai perubahan state singkat, bukan ledakan animasi;
- confetti tidak dipakai pada setiap jawaban atau session;
- mascot animation hanya pada onboarding, meaningful milestone, atau summary;
- progress animation berhenti pada nilai backend yang sudah diketahui;
- skeleton tidak bergerak agresif;
- audio waveform tidak boleh menjadi satu-satunya indikator playback.

### 11.3 Reduced motion

Saat `prefers-reduced-motion: reduce`:

- transform besar dinonaktifkan;
- mascot memakai pose statis;
- progress langsung ke nilai akhir atau fade maksimal 100 ms;
- auto-scrolling dihindari;
- focus tetap dipindahkan secara programatik bila diperlukan, tanpa scroll animasi.

## 12. Core components

Semua komponen dasar harus tersedia untuk learner dan Content Operations dengan state serta kontrak aksesibilitas yang sama.

### 12.1 Actions

| Komponen | Varian | Aturan utama |
|---|---|---|
| Button | primary, secondary, quiet, danger | satu primary per region; loading mempertahankan lebar |
| Icon button | default, selected, danger | wajib accessible name; target 44×44 px |
| Link | inline, standalone, external | underline untuk inline; external diberi indikasi |
| Split button | Ops only | hanya jika default action aman dan menu berkaitan |

Button hierarchy:

- **Primary:** tindakan utama dan aman untuk dilanjutkan;
- **Secondary:** tindakan pendamping;
- **Quiet:** tindakan frekuensi rendah atau navigasional;
- **Danger:** destructive, revoke, discard, rollback initiation.

Disabled button yang penting harus disertai alasan di dekatnya. Jangan mengandalkan tooltip pada control disabled.

### 12.2 Form controls

- Text field
- Textarea
- Search field
- Select
- Combobox
- Checkbox
- Radio group
- Switch
- Segmented control
- Duration/number input
- File upload

Setiap field memiliki:

- visible label;
- optional hint;
- value/current selection;
- validation message yang terhubung secara programatik;
- required/optional state yang konsisten;
- loading dan read-only state bila relevan.

Placeholder tidak menggantikan label. Error ditampilkan setelah blur atau submit sesuai konteks; validasi tidak menghapus input pengguna.

### 12.3 Navigation

- Learner app shell
- Bottom navigation
- Desktop side/top navigation
- Content Ops side navigation
- Breadcrumb
- Tabs
- Pagination
- Step indicator

Navigasi menunjukkan current location melalui label, shape, dan warna. Session assessment dapat memakai focused shell tanpa global navigation sesuai policy.

### 12.4 Feedback dan overlay

- Inline message
- Alert/banner
- Toast
- Tooltip
- Popover
- Dialog
- Drawer
- Empty state
- Skeleton

Toast hanya untuk konfirmasi singkat yang tidak perlu ditemukan kembali. Error yang memerlukan tindakan tetap berada inline atau pada banner. Dialog tidak boleh dipakai untuk informasi yang dapat tampil langsung di halaman.

### 12.5 Data display

- Card
- List
- Data table
- Badge
- Avatar
- Definition list
- Timeline
- Progress bar
- Chart wrapper
- Code/diff block

Tabel mendukung header semantic, sort state, keyboard navigation yang layak, column visibility, serta responsive fallback yang ditentukan per use case.

## 13. Learner components

| Komponen | Tujuan | State penting |
|---|---|---|
| `NextActionCard` | satu rekomendasi utama di Home | ready, loading, unavailable, blocked |
| `SessionCard` | ringkasan sesi | new, in-progress, complete, expired |
| `LearningPath` | struktur unit dan dependency | locked, available, active, complete |
| `PathNode` | satu node materi | not-started, learning, review, complete |
| `MasteryBadge` | mastery terukur | provisional, mastered, decayed, unavailable |
| `ReviewQueueItem` | due item | due, overdue, snoozed, unavailable |
| `ReadinessPanel` | kesiapan assessment | not-ready, ready, stale, blocked |
| `ReasonDisclosure` | alasan rekomendasi | collapsed, expanded, unavailable |
| `ProgressSummary` | ringkasan terpisah | completion, mastery, readiness |
| `StreakDisplay` | kontinuitas aktivitas | active, grace, broken, hidden |
| `AchievementCard` | achievement earned | locked, earned, acknowledged |

### 13.1 Completion, mastery, readiness

Ketiganya tidak boleh digabung menjadi satu progress ring.

| Konsep | Pertanyaan yang dijawab | Visual default |
|---|---|---|
| Completion | “Berapa materi yang sudah saya selesaikan?” | progress bar + rasio |
| Mastery | “Seberapa kuat kemampuan yang sudah dibuktikan?” | level/band + evidence label |
| Readiness | “Apakah persyaratan assessment terpenuhi?” | checklist requirement + status |

Jika data belum cukup, gunakan `Belum cukup bukti`, bukan nilai nol.

### 13.2 Gamification

Gamification mendukung kebiasaan, bukan memanipulasi keputusan.

- XP diposisikan sebagai activity metric, bukan mastery;
- streak tidak memakai copy ancaman;
- achievement hanya diberikan setelah event valid dari backend;
- reward animation maksimal beberapa detik dan dapat dilewati;
- leaderboard, dark pattern, loot box, dan artificial scarcity tidak termasuk baseline;
- user dapat mengurangi celebratory motion;
- assessment tidak menampilkan XP real-time jika dapat mengganggu fokus.

## 14. Practice components

Komponen berikut mengikuti [06. Practice Interactions](./06-practice-interactions.md):

| Komponen | Fungsi |
|---|---|
| `ActivityShell` | instruction, prompt, support, response, submit |
| `ChoiceCard` | opsi pilihan tunggal/jamak |
| `MatchingBoard` | pasangan source–target dengan keyboard fallback |
| `OrderingList` | susun urutan dengan button fallback |
| `ClozeField` | isian terikat blank |
| `JapaneseInput` | input Jepang via IME atau composer |
| `KanaComposer` | input support sesuai equivalence policy |
| `AudioPlayer` | playback dengan state explicit |
| `HintPanel` | hint yang diizinkan policy |
| `FeedbackPanel` | correctness/explanation setelah submit |
| `Timer` | remaining time tanpa flash agresif |
| `ActivityProgress` | posisi dalam session, bukan mastery |
| `SubmitBar` | primary action yang aman terhadap viewport |

### 14.1 Shared activity anatomy

Urutan visual default:

```text
Session context
Instruction
Prompt / stimulus
Allowed support
Response area
Validation / feedback
Primary action
```

Area response mendapat fokus terbesar. Support tidak boleh secara visual lebih dominan daripada prompt.

### 14.2 Answer states

| State | Tampilan |
|---|---|
| Default | neutral surface dan interactive border |
| Hover | subtle brand tint; tidak berlaku sebagai feedback |
| Focus-visible | ring kontras 3 px + offset |
| Selected | brand border + selected icon/label |
| Submitted-correct | success border/background + text/icon |
| Submitted-incorrect | danger border/background + text/icon |
| Revealed | correct answer dibedakan dari user answer |
| Disabled | label tetap terbaca; alasan bila relevan |

Correctness tidak ditampilkan sebelum submit kecuali aktivitas eksplisit bersifat guided practice.

### 14.3 Kana composer

Composer memakai empat state policy:

- `equivalent` — respons dapat dinilai setara;
- `support_adjusted` — dapat dinilai dengan aturan dukungan eksplisit;
- `practice_only` — tersedia untuk latihan tetapi tidak menghasilkan evidence assessment;
- `unavailable` — tidak tersedia dan alasan dijelaskan.

State ditampilkan sebagai label teks, bukan warna saja. Composer tidak memprediksi jawaban, meng-highlight key yang benar, atau membocorkan panjang jawaban.

### 14.4 Audio player

Minimum control:

- play/pause;
- replay bila policy mengizinkan;
- progress/status yang dapat diakses;
- jumlah play atau batas tersisa bila dibatasi;
- transcript hanya bila policy mengizinkan;
- recovery saat asset gagal.

Audio tidak autoplay dengan suara.

## 15. Content Operations components

| Komponen | Tujuan | Catatan |
|---|---|---|
| `OpsShell` | navigasi internal | desktop-first |
| `FilterBar` | filter, search, saved view | URL/shareable state bila aman |
| `DataTable` | inventory dan queue | bulk action eksplisit |
| `ArtifactHeader` | identity, status, owner | sticky pada workbench panjang |
| `WorkbenchPane` | editor + context | resizable pada `xl` |
| `StatusBadge` | lifecycle state | text + icon + color |
| `CriterionRow` | rubric/evaluation | score, evidence, override |
| `FindingCard` | issue/review finding | severity dan location |
| `ApprovalMatrix` | required approvals | role, status, timestamp |
| `DiffViewer` | perubahan structured/text | before/after jelas |
| `DependencyView` | dependency dan blast radius | graph + list fallback |
| `ReleaseGate` | gate publish | unmet reason selalu terlihat |
| `ImpactSummary` | dampak rollback/release | estimasi dan affected set |
| `AuditTimeline` | riwayat aksi | immutable display |
| `HighRiskConfirm` | konfirmasi publish/rollback | typed confirmation bila perlu |

### 15.1 Density modes

Content Operations menyediakan:

- `comfortable` sebagai default;
- `compact` untuk pengguna ahli pada tabel/work queue;
- learner tidak memiliki global compact mode pada baseline.

Compact mode tidak menurunkan font di bawah 14 px atau target tindakan penting di bawah batas aksesibilitas.

### 15.2 High-risk actions

Publish, rollback, revoke, dan destructive bulk action harus menampilkan:

1. tindakan yang akan dilakukan;
2. objek dan versi target;
3. dampak atau blast radius;
4. gate/approval yang terpenuhi atau belum;
5. apakah tindakan dapat dibatalkan;
6. primary confirmation dengan kata kerja spesifik.

Label generik `OK` tidak dipakai untuk konfirmasi risiko tinggi.

## 16. State model komponen

Setiap komponen interaktif menilai state berikut yang relevan:

- default;
- hover;
- focus-visible;
- active/pressed;
- selected;
- disabled;
- read-only;
- loading;
- empty;
- invalid;
- success;
- warning;
- offline/degraded;
- stale;
- permission denied.

### 16.1 Loading

- loading awal: skeleton yang mencerminkan layout;
- loading action: spinner + label, control mempertahankan ukuran;
- progress determinate: tampilkan nilai atau tahap;
- progress indeterminate: jangan membuat estimasi palsu;
- optimistic UI hanya untuk tindakan yang mudah dipulihkan dan bukan evidence, score, publish, approval, atau role change.

### 16.2 Empty state

Empty state menjelaskan:

1. apa yang belum ada;
2. mengapa itu mungkin terjadi;
3. tindakan berikutnya jika ada.

Mascot boleh muncul pada empty state learner. Content Operations memakai ilustrasi kecil atau ikon kecuali halaman tersebut merupakan onboarding internal.

### 16.3 Error dan recovery

- pertahankan input pengguna jika aman;
- letakkan error di dekat sumber dan ringkas pada top-level bila banyak;
- berikan retry hanya jika retry memang aman;
- bedakan validation error, permission error, conflict, offline, dan server error;
- tampilkan correlation/reference ID hanya sebagai detail secondary;
- jangan mengungkap data sensitif atau internals pada learner.

## 17. Responsive behavior

### 17.1 Learner

- mobile-first;
- bottom navigation pada viewport kecil;
- card menjadi satu kolom;
- submit action dapat sticky tetapi tidak menutupi jawaban;
- practice content tetap berada pada centered readable column;
- side panel berubah menjadi drawer atau disclosure;
- landscape bukan syarat kecuali aktivitas khusus menyatakannya;
- keyboard virtual dan IME tidak boleh menutupi active input.

### 17.2 Content Operations

- authoring, approve, release, dan rollback penuh didukung pada `lg` ke atas;
- viewport di bawah `lg` menampilkan read-only summary atau task-safe subset;
- tabel dapat memakai horizontal scroll dengan kolom identity/action yang tetap terjangkau;
- multi-pane menjadi tabs/drawer pada ruang terbatas;
- destructive action tidak dipindah ke gesture tersembunyi;
- banner minimum-width menjelaskan jika workflow mutating tidak didukung.

## 18. Content style di dalam komponen

### 18.1 Button dan action

- gunakan kata kerja: `Mulai sesi`, `Lanjutkan`, `Kirim jawaban`, `Publikasikan versi`;
- hindari `Ya`, `Tidak`, dan `OK` tanpa objek;
- destructive action menyebut hasil: `Batalkan rilis`, `Rollback ke v12`;
- satu istilah digunakan konsisten untuk satu konsep.

### 18.2 Feedback belajar

- utamakan observasi dan langkah berikutnya;
- hindari label personal seperti “Kamu buruk di…”;
- jelaskan mengapa jika rationale boleh ditampilkan;
- jangan menyatakan mastery dari satu jawaban;
- bedakan `Benar`, `Diterima dengan dukungan`, dan `Belum tepat` bila policy membutuhkan.

### 18.3 Angka dan waktu

- tampilkan timezone pada jadwal atau audit bila berpotensi ambigu;
- relative time mempunyai absolute time yang dapat ditemukan;
- persentase menyebut denominator/context;
- angka desimal memakai presisi yang relevan, bukan presisi palsu;
- tanggal UI Indonesia memakai format yang tidak ambigu, mis. `13 Sep 2026`.

## 19. Accessibility baseline dalam design system

Target formal aksesibilitas adalah WCAG 2.2 AA. AAA diupayakan untuk body text dan konten belajar kritis tanpa mengklaim full AAA. Komponen baseline wajib menyediakan:

- semantic HTML dan landmark;
- keyboard operation lengkap;
- focus-visible yang konsisten;
- urutan fokus sesuai urutan visual/logis;
- label, description, dan error association;
- text contrast minimal 4.5:1 untuk body normal;
- non-text contrast minimal 3:1 untuk boundary/status yang diperlukan;
- target interaksi minimum 44×44 px;
- text resize 200% dan reflow 400% tanpa kehilangan informasi atau fungsi;
- reduced motion;
- status yang tidak bergantung pada warna;
- live region hanya untuk perubahan yang benar-benar perlu diumumkan;
- transcript/caption policy untuk media yang sesuai;
- alternatif non-drag untuk matching dan ordering.

Detail audit, content accessibility, localization, serta edge-case matrix didefinisikan dalam `08-accessibility-content-and-edge-cases.md`.

## 20. Component governance

### 20.1 Definition of ready

Komponen siap masuk library jika memiliki:

- tujuan dan batas penggunaan;
- anatomy;
- semua state relevan;
- keyboard interaction;
- accessible name/description contract;
- responsive behavior;
- content guideline;
- design token binding;
- test cases;
- contoh learner dan/atau Ops;
- keputusan apakah public, internal, atau experimental.

### 20.2 Definition of done

Komponen dianggap selesai jika:

- design dan code memakai nama variant/property yang selaras;
- visual regression untuk state utama tersedia;
- contrast dan keyboard path diuji;
- loading, empty, error, dan long-content state diperiksa;
- Japanese text, furigana, dan font fallback diuji jika relevan;
- mobile viewport dan 200% zoom diuji;
- event analytics tidak mengubah perilaku atau mengekspos data sensitif;
- dokumentasi usage dan anti-pattern tersedia.

### 20.3 Penambahan komponen baru

Urutan evaluasi:

1. bisakah core component yang ada dikonfigurasi?
2. apakah pola benar-benar berulang?
3. apakah variasi berasal dari domain learner/practice/Ops yang sah?
4. apakah state dan aksesibilitas dapat dipelihara?
5. apakah nama komponen menjelaskan fungsi, bukan tampilan sementara?

Komponen satu kali tetap boleh dibuat lokal bila tidak layak menjadi bagian library.

### 20.4 Versioning

- perubahan visual kompatibel: minor;
- penambahan variant/property: minor;
- perubahan contract, nama, atau behavior: major;
- deprecation mempunyai replacement dan periode migrasi;
- token yang sudah digunakan tidak dihapus tanpa usage audit;
- release notes menyebut dampak learner dan Content Operations.

## 21. Prioritas implementasi

### P0 — foundation dan critical path

- semantic color, typography, spacing, radius, focus, motion;
- Button, Link, form controls, Dialog, Banner, Toast, Tabs;
- Learner/Practice shell;
- choice, cloze, Japanese input, kana composer, audio player;
- feedback, timer, activity progress, submit bar;
- learner progress primitives;
- Ops shell, status badge, data table, filter bar;
- release gate, diff, approval, high-risk confirm;
- loading, empty, error, permission, stale states.

### P1 — scale dan polish

- complete mascot pose set;
- expanded illustration library;
- dark theme;
- compact density tuning;
- advanced chart patterns;
- full dependency visualization;
- richer motion untuk non-critical milestone;
- component playground dan automated token checks.

## 22. QA checklist

Sebelum sebuah layar disetujui:

### Visual

- [ ] typography memakai token yang benar;
- [ ] Japanese glyph dan furigana tidak terpotong;
- [ ] satu primary action jelas;
- [ ] spacing mengikuti scale;
- [ ] status tidak memakai warna saja;
- [ ] completion, mastery, dan readiness tidak tercampur;
- [ ] mascot/illustration tidak mengambil fokus materi.

### Interaction

- [ ] keyboard path lengkap;
- [ ] focus-visible terlihat;
- [ ] touch target cukup besar;
- [ ] loading, empty, error, dan retry ditentukan;
- [ ] disabled action memiliki alasan bila penting;
- [ ] sticky UI tidak menutupi konten;
- [ ] reduced-motion behavior ditentukan.

### Domain safety

- [ ] tidak ada answer leakage;
- [ ] support mode sesuai equivalence policy;
- [ ] assessment tidak memakai gamification yang mengganggu;
- [ ] publish/rollback menampilkan scope dan impact;
- [ ] authority berasal dari backend;
- [ ] provisional/stale state tidak tampil sebagai final.

## 23. Keputusan yang ditetapkan

| ID | Keputusan | Status |
|---|---|---|
| `DS-001` | Gaya visual adalah calm kawaii learning companion. | Ditetapkan |
| `DS-002` | Nekoru adalah companion kucing gender-neutral bergaya kawaii modern. | Ditetapkan |
| `DS-003` | Mascot kontekstual; tidak hadir sebagai distraksi pada assessment dan dense Ops UI. | Ditetapkan |
| `DS-004` | Indigo menjadi primary action; sakura menjadi aksen hangat yang hemat. | Ditetapkan |
| `DS-005` | Surface learner warm-neutral; Content Operations sedikit lebih padat tetapi memakai token yang sama. | Ditetapkan |
| `DS-006` | Plus Jakarta Sans untuk UI/Indonesia dan Noto Sans JP untuk konten Jepang. | Ditetapkan |
| `DS-007` | Light theme P0; dark theme P1 dan wajib berbasis semantic token. | Ditetapkan |
| `DS-008` | Spacing berbasis 4 px; target interaksi minimum 44×44 px. | Ditetapkan |
| `DS-009` | Completion, mastery, readiness, dan system status mempunyai visual model terpisah. | Ditetapkan |
| `DS-010` | Learner mobile-first; mutating Content Operations didukung penuh mulai 1024 px. | Ditetapkan |
| `DS-011` | Motion tenang, tidak ada shake untuk jawaban salah, dan reduced motion didukung. | Ditetapkan |
| `DS-012` | Komponen mengonsumsi semantic/component token, bukan primitive token langsung. | Ditetapkan |
| `DS-013` | Compact density hanya tersedia untuk Content Operations pada baseline. | Ditetapkan |
| `DS-014` | WCAG 2.2 AA menjadi requirement formal; AAA aspiratif untuk body text dan konten belajar kritis tanpa klaim full AAA. | Ditetapkan |

## 24. Artefak lanjutan

Setelah baseline ini, artefak implementasi yang perlu dibuat adalah:

1. token source of truth dalam format platform yang dipilih;
2. Figma variables dan component library;
3. coded component library/storybook;
4. mascot model sheet dan pose set;
5. icon set dan illustration usage sheet;
6. visual regression suite;
7. contrast, keyboard, reflow, dan reduced-motion test matrix;
8. dokumentasi aksesibilitas, content style, localization, dan edge cases.
