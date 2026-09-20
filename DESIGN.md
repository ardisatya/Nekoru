---
name: Nekoru
description: Sistem visual meja belajar terpandu yang hangat, tenang, dan jujur untuk learner bahasa Jepang.
colors:
  canvas: "#f7f4ef"
  surface: "#fffdf9"
  surface-raised: "#ffffff"
  ink: "#25233a"
  ink-muted: "#625f72"
  primary: "#4f438f"
  primary-strong: "#382f70"
  primary-soft: "#ece9ff"
  accent: "#cf567b"
  accent-soft: "#ffe5ed"
  success: "#176a4a"
  success-soft: "#e4f4ed"
  warning: "#8a5512"
  warning-soft: "#fff0d8"
  danger: "#a33b45"
  danger-soft: "#ffe7e8"
  border: "#dcd5ca"
  focus: "#d94d7a"
typography:
  display:
    fontFamily: "Plus Jakarta Sans, sans-serif"
    fontSize: "clamp(2rem, 5vw, 3.6rem)"
    fontWeight: 800
    lineHeight: 1.08
    letterSpacing: "-0.03em"
  headline:
    fontFamily: "Plus Jakarta Sans, sans-serif"
    fontSize: "1.25rem"
    fontWeight: 800
    lineHeight: 1.4
  title:
    fontFamily: "Plus Jakarta Sans, sans-serif"
    fontSize: "1rem"
    fontWeight: 800
    lineHeight: 1.4
  body:
    fontFamily: "Plus Jakarta Sans, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.55
  control:
    fontFamily: "Plus Jakarta Sans, sans-serif"
    fontSize: "1rem"
    fontWeight: 750
    lineHeight: 1.55
  supporting:
    fontFamily: "Plus Jakarta Sans, sans-serif"
    fontSize: "0.88rem"
    fontWeight: 700
    lineHeight: 1.55
  label:
    fontFamily: "Plus Jakarta Sans, sans-serif"
    fontSize: "0.78rem"
    fontWeight: 800
    letterSpacing: "0.06em"
  japanese:
    fontFamily: "Noto Sans JP, sans-serif"
    fontSize: "1.35rem"
    fontWeight: 400
    lineHeight: 1.55
rounded:
  sm: "0.5rem"
  md: "0.75rem"
  lg: "1rem"
spacing:
  "1": "0.25rem"
  "2": "0.5rem"
  "3": "0.75rem"
  "4": "1rem"
  "5": "1.25rem"
  "6": "1.5rem"
  "8": "2rem"
  "10": "2.5rem"
  "12": "3rem"
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "#ffffff"
    typography: "{typography.control}"
    rounded: "{rounded.md}"
    padding: "0.75rem 1rem"
  button-primary-hover:
    backgroundColor: "{colors.primary-strong}"
    textColor: "#ffffff"
    rounded: "{rounded.md}"
  button-secondary:
    backgroundColor: "{colors.primary-soft}"
    textColor: "{colors.primary-strong}"
    typography: "{typography.control}"
    rounded: "{rounded.md}"
    padding: "0.75rem 1rem"
  button-quiet:
    backgroundColor: "transparent"
    textColor: "{colors.primary-strong}"
    typography: "{typography.control}"
    rounded: "{rounded.md}"
    padding: "0.75rem 1rem"
  field:
    backgroundColor: "{colors.surface-raised}"
    textColor: "{colors.ink}"
    typography: "{typography.body}"
    rounded: "{rounded.md}"
    padding: "0.75rem"
    width: "100%"
  state-chip:
    backgroundColor: "{colors.surface-raised}"
    textColor: "{colors.primary-strong}"
    typography: "{typography.supporting}"
    rounded: "{rounded.sm}"
    padding: "0.55rem 0.85rem"
  state-chip-selected:
    backgroundColor: "{colors.primary-soft}"
    textColor: "{colors.primary-strong}"
    rounded: "{rounded.sm}"
  answer-option:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    rounded: "{rounded.md}"
    padding: "0.75rem 1rem"
  answer-option-selected:
    backgroundColor: "{colors.primary-soft}"
    textColor: "{colors.ink}"
    rounded: "{rounded.md}"
  status-info:
    backgroundColor: "{colors.primary-soft}"
    textColor: "{colors.ink}"
    rounded: "{rounded.md}"
    padding: "1rem"
  status-success:
    backgroundColor: "{colors.success-soft}"
    textColor: "#0f553c"
    rounded: "{rounded.md}"
    padding: "1rem"
  status-warning:
    backgroundColor: "{colors.warning-soft}"
    textColor: "#70420b"
    rounded: "{rounded.md}"
    padding: "1rem"
  status-danger:
    backgroundColor: "{colors.danger-soft}"
    textColor: "#7e2a34"
    rounded: "{rounded.md}"
    padding: "1rem"
  activity-canvas:
    backgroundColor: "{colors.surface-raised}"
    textColor: "{colors.ink}"
    rounded: "{rounded.lg}"
    padding: "clamp(1.5rem, 5vw, 3rem)"
---

# Design System: Nekoru

## Overview

**Creative North Star: "Meja Belajar Terpandu"**

Nekoru terasa seperti meja belajar pribadi yang sudah menyiapkan satu langkah tepat sebelum learner datang. Suasananya tenang, hangat, suportif, dan terstruktur: paper-like surfaces memberi ruang bernapas, sementara indigo memegang orientasi dan tindakan tanpa membuat pengalaman terasa klinis.

Sistem ini lifted tetapi tertahan. Kedalaman ambient hanya mengangkat canvas aktivitas utama; komponen lain mengandalkan lapisan warna, border, dan hierarchy yang jelas. Komponen terasa tactile and confident, tetapi tidak ramai. Detail cat-ear adalah aksen identitas kecil, bukan bahasa dekoratif yang diulang di setiap permukaan.

Prototype Phase 0 tetap jujur sebagai local/internal artifact. Visual hierarchy membantu learner membedakan tujuan, tindakan, technical state, completion, mastery, dan review tanpa menciptakan false academic certainty.

**Key Characteristics:**

- Satu keputusan belajar dominan pada setiap layar.
- Warm neutral paper layers dengan orientasi indigo dan aksen sakura yang hemat.
- Ambient depth hanya untuk permukaan yang benar-benar perlu terangkat.
- Komponen rounded, tactile, dan percaya diri dengan state yang eksplisit.
- Detail cat-ear dipakai sebagai tanda identitas yang tenang, bukan ornamen berulang.

## Colors

Palet menggabungkan warm neutral seperti kertas, indigo yang mantap, dan sakura yang ramah; warna semantic memakai pasangan foreground dan soft surface agar status tetap terbaca tanpa mengandalkan warna saja.

### Primary

- **Guided Indigo:** Menandai tindakan utama, link, progress, dan orientasi aktif.
- **Deep Guided Indigo:** Memperkuat topbar dan hover tindakan utama.
- **Lavender Study Wash:** Membentuk konteks, secondary action, dan selected state yang lembut.

### Secondary

- **Sakura Accent:** Memberi sorotan kecil pada progress, focus, dan gerak audio.
- **Sakura Wash:** Menjadi detail brand yang hangat, termasuk cat-ear mark.

### Tertiary

- **Evidence Green:** Menyatakan hasil valid yang positif tanpa klaim berlebihan.
- **Recovery Amber:** Menandai technical recovery dan keadaan yang membutuhkan perhatian.
- **Careful Red:** Menandai error atau danger yang benar-benar perlu dibedakan.

### Neutral

- **Warm Canvas:** Latar keseluruhan yang mengurangi silau dan menahan suasana belajar.
- **Study Paper:** Surface dasar untuk lapisan konten.
- **Raised Paper:** Canvas aktivitas dan field putih yang perlu terasa paling langsung.
- **Deep Ink:** Teks utama dengan karakter sedikit indigo.
- **Muted Ink:** Purpose, metadata, petunjuk, dan informasi sekunder.
- **Warm Divider:** Border field, option, dan pemisah konten.

### Named Rules

**The Guided Accent Rule.** Indigo memegang tindakan dan orientasi; sakura hanya memberi emphasis singkat dan tidak mengambil alih seluruh layar.

**The Semantic Pair Rule.** Status memakai soft surface bersama judul dan penjelasan eksplisit; warna tidak pernah menjadi satu-satunya pembawa makna.

## Typography

**Display Font:** Plus Jakarta Sans (with sans-serif fallback)  
**Body Font:** Plus Jakarta Sans (with sans-serif fallback)  
**Japanese Font:** Noto Sans JP (with sans-serif fallback)

**Character:** Plus Jakarta Sans adalah workhorse yang ramah dan tegas untuk interface Indonesia. Noto Sans JP menjaga bentuk kana tetap jelas tanpa memisahkan Japanese text dari rhythm interface.

### Hierarchy

- **Display** (800, fluid 2rem–3.6rem, 1.08): Judul aktivitas utama; rapat, balanced, dan menjadi jangkar tunggal canvas.
- **Headline** (800, 1.25rem, 1.4): Prompt atau legend aktivitas yang membutuhkan emphasis kuat.
- **Title** (800, 1rem, 1.4): Judul context dan status message.
- **Body** (400, 1rem, 1.55): Instruksi dan penjelasan utama; reading width dibatasi hingga 72ch dan purpose ringkas hingga 62ch.
- **Supporting** (700, 0.88rem, 1.55): Progress, context note, dan kontrol review sekunder.
- **Label** (800, 0.78rem, 0.06em): Metadata ringkas dan definition term yang memang tampil uppercase.
- **Japanese** (400, 1.35rem, 1.55): Kana pada option dan matching; selalu dirender dengan semantic `lang="ja"`.

### Named Rules

**The One Workhorse Rule.** Plus Jakarta Sans mengerjakan seluruh hierarchy UI; Noto Sans JP masuk hanya saat konten Japanese membutuhkan bentuk glyph yang tepat.

**The Honest Label Rule.** Uppercase dan tracking lebar hanya untuk metadata pendek, bukan paragraf atau tindakan utama.

## Layout

Layout dimulai dari lebar minimum 320px. Shell memakai topbar, session progress rail, lalu workspace dengan batas maksimum 76rem. Pada layar lebar, workspace membagi context column 14–19rem dan activity canvas fleksibel, dengan gap fluid 1.5–3rem; context tetap sticky sementara tindakan utama tinggal di normal document flow.

Canvas memakai padding fluid 1.5–3rem, content task dibatasi sekitar 44rem, dan reading copy tidak melebihi 72ch. Rhythm mengikuti scale 0.25rem hingga 3rem. Kelompok action dan state control memakai wrapping flex; plan dan summary boleh memakai tiga kolom, matching dua kolom.

Pada 720px ke bawah, workspace, plan, summary, matching, dan navigation menjadi satu kolom; context kembali static dan primary navigation button memenuhi lebar. Pada 360px ke bawah, gutter workspace menyusut menjadi 0.5rem per sisi dan display title turun ke 1.85rem. Reflow tidak memindahkan tindakan utama menjadi overlay atau sticky control.

**The One Task Rule.** Satu activity canvas mendominasi layar; jangan pecah perjalanan belajar menjadi generic dashboard grid dengan kartu-kartu yang setara.

**The Normal Flow Rule.** Primary action tetap setelah response group dalam alur dokumen agar urutan visual, keyboard, dan screen reader sama.

## Elevation & Depth

Sistem memakai hybrid tonal layering dan lifted ambient depth. Canvas aktivitas utama memakai shadow diffuse; context, status, selected option, dan secondary control membedakan lapisan lewat warna. Primary button mendapat shadow yang lebih rapat agar terasa tactile, bukan untuk membuat semua kontrol melayang.

### Shadow Vocabulary

- **Raised Study Surface** (`0 0.6rem 1.8rem rgba(48, 43, 99, 0.12)`): Hanya untuk activity canvas utama.
- **Primary Action Lift** (`0 0.35rem 1rem rgba(56, 47, 112, 0.22)`): Hanya untuk primary button aktif; hilang ketika disabled.

### Named Rules

**The Lift Only What Leads Rule.** Shadow menandai canvas atau tindakan yang memimpin langkah saat ini; status, field, chip, dan option tetap tonal atau bordered.

## Shapes

Bahasa bentuk memakai sudut rounded yang tenang: 0.5rem untuk kontrol kecil, 0.75rem untuk interactive primitives dan status, serta 1rem untuk surface besar. Field dan option mempertahankan border 2px agar affordance tetap jelas. Progress bar dan audio bars boleh lebih pill-like, sementara brand mark memakai lingkar lembut dengan dua cat-ear kecil.

**The Quiet Mascot Rule.** Geometri cat-ear hanya menjadi signature brand mark; jangan menempelkan telinga, wajah, atau silhouette maskot pada kartu dan kontrol biasa.

## Components

Komponen terasa tactile and confident: ukuran target cukup besar, label tegas, state terlihat, dan motion cepat tetapi tidak menjadi syarat memahami hasil.

### Buttons

- **Shape:** Sudut rounded sedang, padding kompak, dan target minimum 44px.
- **Primary:** Indigo dengan teks putih, weight 750, dan action lift; hover beralih ke deep indigo.
- **Secondary:** Lavender study wash dengan teks deep indigo tanpa shadow.
- **Quiet:** Transparan dengan teks deep indigo dan underline; tetap memiliki hit target penuh.
- **Focus / Disabled:** Semua varian memakai outline sakura 3px dengan offset 3px. Disabled memakai opacity 0.62, `not-allowed`, dan tanpa shadow.

### Chips

- **Style:** State picker memakai raised paper, warm divider 1px, radius kecil, dan label supporting yang tegas.
- **State:** `aria-pressed` terpilih memakai lavender study wash dan border indigo; state tidak dibedakan oleh warna saja karena label tetap eksplisit.

### Cards / Containers

- **Corner Style:** Surface besar memakai radius 1rem; context dan status mengikuti skala yang sama secara hierarkis.
- **Background:** Activity canvas memakai raised paper, context memakai lavender study wash, dan page memakai warm canvas.
- **Shadow Strategy:** Hanya activity canvas memakai Raised Study Surface.
- **Border:** Surface biasa tanpa decorative border; forced-colors menambahkan border yang jelas.
- **Internal Padding:** Canvas 1.5–3rem fluid, context 1.25rem, dan status 1rem.

### Inputs / Fields

- **Style:** Raised paper, deep ink, border warm divider 2px, radius 0.75rem, dan tinggi minimum 48px.
- **Focus:** Outline sakura 3px dengan offset 3px melalui global `:focus-visible`.
- **Error / Disabled:** Error memakai careful red dan pesan tekstual dengan weight 700; state tidak boleh dijelaskan oleh border merah saja.

### Navigation

Topbar memakai deep indigo dengan wordmark putih dan cat-ear mark sakura. Progress rail berada tepat di bawahnya. Context navigation memakai list semantik; item aktif dan hover mendapat raised paper. Pada mobile, context pindah di atas task dan navigasi bawah menjadi satu kolom dengan button penuh.

### Status Messages

Status adalah surface ringkas dengan radius 0.75rem dan padding 1rem. Info memakai lavender, success memakai green pair, warning memakai amber pair, dan danger memakai red pair. Setiap status wajib memiliki title dan explanatory copy; technical failure harus terdengar sebagai system state, bukan learner error.

### Answer Options

Answer option adalah row minimum 52px dengan border 2px dan radius 0.75rem. Selected state memakai border indigo plus lavender wash. Radio tetap terlihat, berukuran 1.25rem, dan Japanese option memakai Noto Sans JP.

### Named Rules

**The Explicit State Rule.** Selected, error, technical, success, dan disabled state selalu memiliki label atau penjelasan; visual treatment memperkuat makna, bukan menggantikannya.

## Do's and Don'ts

### Do:

- **Do** let one activity canvas and one next action lead each screen.
- **Do** use the warm-neutral, indigo, and sakura roles exactly as defined by the normative tokens.
- **Do** preserve the 3px visible focus ring, 44px primary targets, forced-colors borders, and reduced-motion fallback.
- **Do** render Japanese text with Noto Sans JP and semantic `lang="ja"`; use semantic ruby when furigana is needed.
- **Do** separate completion, mastery, review, progress, and technical state in both hierarchy and copy.

### Don't:

- **Don't** turn the learning flow into a generic dashboard grid or a wall of decorative metrics.
- **Don't** add excessive decoration, repeated mascot geometry, gradients, glass effects, or shadow to every surface.
- **Don't** imply academic certainty through celebratory color, progress, or completion when evidence does not support it.
- **Don't** use color, motion, shake, or emoji as the only semantic cue.
- **Don't** autoplay audio or treat audio, provider, network, or other technical failure as learner error.
