# Platform Support and Accessibility Verification Matrix Nekoru — MVP N5

**Status:** Approved v1.0 — baseline verifikasi Milestone 1; version lock wajib dibuat per release  
**Tanggal:** 13 September 2026  
**Pemilik:** Accessibility dan QA  
**Required reviewers:** Product, Design, Engineering, Academic/Assessment, Security/Privacy, Operations, dan Support  
**Cakupan aktif:** Learner web, authentication, dan journey U01-L1 online-only  
**Target formal:** WCAG 2.2 Level AA pada scope dan platform yang dinyatakan didukung  
**Release blocker:** Release tidak boleh mengklaim suatu kombinasi platform sebagai supported sebelum version lock dan evidence matrix kombinasi itu lulus

## 1. Tujuan

Dokumen ini menetapkan kontrak operasional untuk:

1. platform, browser, viewport, input, bahasa, media, dan assistive technology yang didukung;
2. prioritas kombinasi uji P0, P1, dan compatibility sampling;
3. critical journey dan state yang harus diverifikasi pada setiap kombinasi;
4. pembagian automated, component, integration, dan manual testing;
5. bentuk evidence, defect severity, exception, dan sign-off;
6. cara mengunci nomor versi aktual tanpa membuat support policy cepat kedaluwarsa;
7. batas klaim aksesibilitas untuk first implementation U01 dan production MVP.

Dokumen ini bukan laporan audit dan bukan klaim conformance. Status `passed` hanya dapat diberikan setelah test run terhadap build dan matrix bernomor yang dikunci.

## 2. Dokumen Sumber

- [Implementation Readiness](./implementation-readiness.md)
- [Definition of Done](./definition-of-done.md)
- [Technical Architecture](./technical-architecture.md)
- [Security, Privacy, and Data Governance](./security-privacy-data-governance.md)
- [API and Event Contracts](./api-and-event-contracts.md)
- [Learning Policy and Registry N5](./learning-policy-and-registry-n5.md)
- [Prototype and Usability Test](../ui-ux/09-prototype-usability-test.md)
- [Analytics and Implementation Handoff](../ui-ux/10-analytics-and-handoff.md)
- [Practice Interactions](../ui-ux/06-practice-interactions.md)
- [Design System](../ui-ux/07-design-system.md)
- [Accessibility, Content, and Edge Cases](../ui-ux/08-accessibility-content-and-edge-cases.md)
- [Learner Screen Specifications](../ui-ux/04-screen-specifications-learner.md)

Jika terjadi konflik, aturan akademik dan assessment integrity tidak boleh dilemahkan oleh alternatif aksesibilitas. Alternatif harus mempertahankan konstruk, diberi classification, atau tidak menghasilkan mastery evidence.

## 3. Istilah dan Status

| Istilah | Definisi |
|---|---|
| Support policy | Aturan bergerak tentang rentang versi yang dijamin. |
| Version lock | Daftar nomor versi OS, browser, AT, device, dan build yang benar-benar diuji untuk satu release candidate. |
| Combination | Satu gabungan OS, browser, AT/input, viewport/device, dan journey. |
| P0 | Wajib lulus sebelum affected release; tidak boleh di-waive bila defect blocker/critical. |
| P1 | Wajib diuji pada hardening atau release production; exception major harus time-bound. |
| Sampling | Compatibility signal; bukan dasar klaim dukungan penuh. |
| Automated baseline | Pemeriksaan mesin yang membantu menemukan regresi; bukan pengganti manual AT test. |
| Construct-equivalent | Alternatif mengukur knowledge component dan response semantics yang sama. |
| Supported | Combination tercantum di version lock dan seluruh applicable gate lulus. |
| Compatible | Sampling tidak menemukan blocker, tetapi bukan komitmen support penuh. |
| Unsupported | Tidak diuji, diketahui tidak memenuhi kontrak, atau di luar policy. |

Status hasil per combination hanya:

- `not_run`;
- `running`;
- `passed`;
- `failed`;
- `blocked`;
- `not_applicable`;
- `exception_approved` untuk major/minor sesuai policy.

`not_run`, `blocked`, dan `failed` tidak boleh ditafsirkan sebagai supported.

## 4. Cakupan Bertahap

### 4.1 Milestone 1

Scope wajib:

- learner web responsive;
- sign-in Google dan email link melalui Clerk;
- onboarding singkat dan guest draft yang berlaku;
- plan/dashboard U01;
- U01-L1 practice session;
- pilihan ganda, matching select-to-pair, ordering button-based, text input/IME, Kana composer, dan audio player jika masuk seed build;
- submit idempotent, reconnect, technical failure, retry, feedback, dan completion;
- mastery/progress summary untuk evidence U01;
- seluruh loading, empty, validation, error, stale, offline-blocked, dan permission state yang applicable.

Content Operations, assessment berisiko tinggi, full offline execution, dan AI evaluation tidak diklaim supported pada Milestone 1.

### 4.2 Production MVP N5

Matrix diperluas untuk:

- seluruh learner P0/P1 journey U01–U24;
- Content Operations mutating flow pada desktop;
- placement, checkpoint, verification, simulation, dan feedback release;
- approved offline practice;
- export/deletion/account lifecycle;
- content publication, quarantine, rollback, conflict, dan audit;
- accommodations yang sudah lolos academic/accessibility review.

## 5. Support Policy

### 5.1 Browser evergreen

Pada tanggal version lock:

- `N` berarti major stable terbaru yang tersedia umum;
- `N-1` berarti satu major stable sebelumnya;
- beta, dev, canary, technology preview, dan enterprise-pinned version tidak termasuk kecuali dicatat sebagai sampling;
- browser embedded, webview aplikasi pihak ketiga, dan in-app browser bukan supported target kecuali combination eksplisit ditambahkan;
- security patch terbaru dalam major yang diuji diasumsikan, tetapi regresi vendor dapat memicu temporary exception.

### 5.2 Operating system

- Windows: versi vendor-supported yang masih menerima security update dan masuk version lock;
- macOS: current dan previous major vendor-supported pada saat lock;
- iOS/iPadOS: current dan previous major pada device yang mampu menjalankannya;
- Android: current dan dua previous major untuk compatibility risk, dengan browser Chrome `N`/`N-1` dan representative mid-range device;
- OS yang sudah end-of-support tidak memperoleh klaim supported.

### 5.3 Version lock artifact

Setiap release candidate membuat record:

```yaml
matrixId: platform-matrix-YYYY.MM.RC-n
lockedAt: ISO-8601
releaseCandidate: string
commitSha: string
environment: staging-production-like
combinations:
  - combinationId: string
    priority: P0 | P1 | sampling
    osName: string
    osVersion: string
    browserName: string
    browserVersion: string
    assistiveTechnology: string | none
    assistiveTechnologyVersion: string | none
    deviceModel: string | virtual
    viewport: string
    journeys: [string]
    result: not_run | running | passed | failed | blocked | not_applicable | exception_approved
    evidenceRefs: [string]
    defectRefs: [string]
```

Version number tidak ditulis permanen ke policy ini. Angka aktual hidup pada immutable release artifact agar audit dapat direproduksi.

## 6. Baseline Platform Matrix

### 6.1 Learner web P0

| ID | OS policy | Browser policy | Mode/AT | Minimum journey |
|---|---|---|---|---|
| `L-P0-01` | Windows supported | Chrome `N` | Keyboard-only | Auth, onboarding, dashboard, full U01 session, progress |
| `L-P0-02` | Windows supported | Edge `N` | Keyboard-only + forced colors | Full U01 session, error/retry, progress |
| `L-P0-03` | Windows supported | Chrome `N` | NVDA stable | Auth, dashboard, full U01 session, feedback |
| `L-P0-04` | Windows supported | Edge `N` | NVDA stable | U01 critical interaction and recovery sampling |
| `L-P0-05` | macOS current | Safari current | Keyboard-only + VoiceOver | Auth, onboarding, full U01 session, progress |
| `L-P0-06` | iOS current | Safari current | Touch + VoiceOver | Auth, onboarding, full U01 session, audio/IME |
| `L-P0-07` | Android baseline | Chrome `N` | Touch + TalkBack | Auth, onboarding, full U01 session, audio/IME |
| `L-P0-08` | Windows supported | Chrome `N` | 400% reflow at ~320 CSS px | Dashboard and full U01 session |
| `L-P0-09` | macOS or Windows | Supported browser | Reduced motion | Full U01 session and all animated feedback |

### 6.2 Learner web P1

| ID | OS policy | Browser policy | Mode/AT | Tujuan |
|---|---|---|---|---|
| `L-P1-01` | Windows supported | Chrome `N-1` | Keyboard-only | Backward browser coverage |
| `L-P1-02` | Windows supported | Edge `N-1` | Keyboard-only | Backward browser coverage |
| `L-P1-03` | Windows supported | Firefox `N` | Keyboard-only + NVDA | Engine compatibility |
| `L-P1-04` | macOS previous | Safari current for OS | Keyboard-only + VoiceOver | Previous OS coverage |
| `L-P1-05` | iOS previous | Safari current for OS | Touch + VoiceOver | Previous mobile OS coverage |
| `L-P1-06` | Android previous | Chrome `N-1` | Touch + TalkBack | Previous mobile stack |
| `L-P1-07` | Windows supported | Edge `N` | 200% text + text spacing override | Visual adaptability |
| `L-P1-08` | Mobile baseline | Native browser | Landscape + font scaling | Orientation and scaling |
| `L-P1-09` | Windows supported | Chrome `N` | Voice control/switch emulation sampling | Operability signal |

### 6.3 Compatibility sampling

| ID | Combination | Policy |
|---|---|---|
| `L-S-01` | Windows + JAWS + Chrome/Edge | P1 sampling sampai target-user/contract data menjadikannya P0 |
| `L-S-02` | iPadOS + Safari + VoiceOver | Sampling bila tablet traffic atau institutional use muncul |
| `L-S-03` | Chromium-based browser lain | Tidak diklaim supported hanya karena engine sama |
| `L-S-04` | Browser dengan translation extension | Best effort; hasil terjemahan bukan content authority |
| `L-S-05` | In-app browser | Deteksi dan arahkan ke browser supported bila auth/session gagal |

### 6.4 Content Operations

Content Operations tidak masuk Milestone 1. Saat diaktifkan, baseline minimum:

| ID | OS | Browser | Mode | Scope |
|---|---|---|---|---|
| `O-P0-01` | Windows supported | Chrome `N` | Keyboard-only, 1024 px+ | Create/edit/review/publish/quarantine/rollback |
| `O-P0-02` | Windows supported | Edge `N` | Keyboard-only + forced colors | High-risk workflow and audit |
| `O-P0-03` | macOS current | Safari current | Keyboard-only + VoiceOver | Critical mutating flow |
| `O-P1-01` | Windows supported | Firefox `N` | Keyboard-only + NVDA | Critical flow sampling |

Viewport di bawah 1024 CSS px hanya boleh menawarkan read-only summary atau task-safe subset yang didefinisikan. Ia tidak boleh menampilkan mutating UI yang tidak aman lalu mengklaim full support.

## 7. Viewport, Display, dan Device Classes

| ID | Class | Baseline | Wajib diverifikasi |
|---|---|---|---|
| `VP-01` | Narrow mobile | 320 CSS px portrait | No horizontal scroll untuk learner, focus visible, prompt dan submit reachable |
| `VP-02` | Standard mobile | 360–430 CSS px portrait | Touch targets, safe area, keyboard, audio controls |
| `VP-03` | Mobile landscape | tinggi terbatas | Sticky UI tidak menutup content/focus |
| `VP-04` | Tablet | 768 CSS px class | Reading order, dialog/drawer, no accidental desktop assumptions |
| `VP-05` | Desktop learner | 1280×720 class | Line length, focus, zoom, no excessive spread |
| `VP-06` | Desktop operations | ≥1024 CSS px | Table, multi-pane, dialog, high-risk action |
| `VP-07` | Zoom | 200% | Text/function remains available |
| `VP-08` | Reflow | 400% at desktop producing ~320 CSS px | No two-dimensional scrolling except essential content |
| `VP-09` | OS font/text scaling | largest practical supported setting | No clipping or lost action |

Device lab harus memuat sedikitnya satu physical iOS phone dan satu representative physical Android mid-range phone. Emulator dapat menambah coverage tetapi tidak menggantikan audio, soft-keyboard, screen-reader, dan touch test pada physical device.

## 8. Input dan Japanese Text Matrix

| ID | Input | Platform | Verifikasi |
|---|---|---|---|
| `IN-01` | Mouse/pointer | Desktop | Click target, hover-independent action, pointer cancellation |
| `IN-02` | Touch | iOS/Android | 44×44 target, scroll, drag alternative, accidental activation |
| `IN-03` | Keyboard-only | Desktop | Logical tab order, no trap, all actions, skip link, visible focus |
| `IN-04` | Hardware keyboard | Mobile/tablet sampling | Focus, submit, composer, no shortcut collision |
| `IN-05` | Japanese IME | Windows | Composition events, candidate window, raw/normalized value, no early submit |
| `IN-06` | Japanese IME | macOS | Composition, conversion, undo/redo, cursor stability |
| `IN-07` | Japanese keyboard | iOS | Soft keyboard, candidate list, viewport, submit visibility |
| `IN-08` | Japanese keyboard | Android | Composition, suggestions, resize/pan behavior |
| `IN-09` | Kana composer | P0 platform matrix | Keyboard/touch/SR operation, anti-leakage, evidence classification |
| `IN-10` | Paste/mixed script | Supported browsers | UTF-8, grapheme safety, bidi isolation, safe normalization |

Required fixtures:

- hiragana dan katakana sederhana;
- dakuten/handakuten;
- small kana dan prolonged sound mark bila activity mendukung;
- composition yang dibatalkan;
- Latin, kana, kanji, emoji, combining mark, whitespace, dan mixed RTL text;
- raw response yang berbeda tetapi normalized response setara;
- unsupported character yang menghasilkan validation, bukan crash atau false incorrect.

## 9. Assistive-Technology Procedure

### 9.1 Keyboard-only

Per journey, tester wajib memverifikasi:

1. masuk melalui browser chrome atau skip link secara wajar;
2. semua control reachable dan urutannya mengikuti visual/semantic order;
3. tidak ada keyboard trap;
4. focus indicator minimal internal target 3 px dan terlihat pada background terkait;
5. sticky header, footer, dialog, toast, dan soft keyboard tidak menutupi focus;
6. composite widget mengikuti documented pattern;
7. matching, ordering, dan drag activity mempunyai non-drag route;
8. hasil, error, dan recovery dapat dipahami tanpa pointer.

### 9.2 Screen reader

Per applicable screen, tester mencatat:

- page title, landmark, heading, dan reading order;
- name, role, value/state, position, instruction, dan error association;
- focus move setelah navigation, dialog, submit, validation, dan completion;
- live announcement tidak hilang dan tidak berulang secara mengganggu;
- Japanese content memakai language metadata yang tepat;
- furigana, romaji, transcript, dan alt text tidak membocorkan answer;
- hidden rationale/answer tidak ada di DOM/accessibility tree sebelum release;
- audio state, duration, playback rate, replay limit, dan failure dapat diketahui;
- visual completion tidak disebut mastery bila evidence belum cukup.

### 9.3 Forced colors dan reduced motion

- focus, selected, correct, incorrect, warning, dan disabled state tetap berbeda tanpa mengandalkan warna;
- SVG/icon mengikuti system color atau memiliki fallback;
- motion non-esensial dinonaktifkan;
- animation tidak diperlukan untuk memahami stroke/sequence jika konstruk tidak mengharuskannya;
- perubahan focus tetap dilakukan tanpa smooth scroll yang memicu motion.

## 10. Media, Font, dan Glyph Matrix

| Area | Test | Expected result |
|---|---|---|
| Japanese font | Hiragana, katakana, kanji seed, punctuation | Glyph benar, tidak tofu, line-height tidak memotong ruby |
| Furigana/ruby | narrow, zoom, SR | Reflow aman; pronunciation policy tidak membocorkan answer |
| Audio | speaker master/delivery assets | Dapat diputar, pause, replay, seek/rate sesuai policy |
| Audio interruption | call/route/background/focus change | State konsisten; tidak membuat false submission |
| Audio failure | 404/timeout/decode | Retry/fallback/report; tidak menghasilkan false incorrect/evidence |
| Transcript | learning vs listening evidence | Hanya tersedia ketika policy mengizinkan; tidak otomatis equivalent |
| Image/illustration | missing/slow/decorative/informative | Alt policy benar dan layout tidak runtuh |
| Animation | normal/reduced motion/missing asset | Equivalent approved representation tersedia atau activity blocked |

Audio wajib diuji melalui speaker dan headphone pada physical mobile device. Browser playback success saja tidak membuktikan intelligibility atau loudness quality.

## 11. Network dan Runtime Conditions

| ID | Condition | Expected behavior |
|---|---|---|
| `NET-01` | Normal online | Journey selesai tanpa unexpected retry |
| `NET-02` | Slow network/high latency | Loading object-specific, action tidak mengganda |
| `NET-03` | Timeout sebelum response | Retry idempotent, user tahu status belum pasti |
| `NET-04` | Disconnect sebelum submit | Draft dipertahankan bila aman; tidak ada false incorrect |
| `NET-05` | Disconnect setelah server commit | Retry memperoleh canonical result, bukan attempt ganda |
| `NET-06` | Reconnect | Announce sekali, state direkonsiliasi, focus tidak dicuri |
| `NET-07` | Audio/object storage failure | Safe fallback sesuai blueprint; evidence tidak tercemar |
| `NET-08` | Session expired | Accessible sign-in dan return path; safe draft tidak hilang diam-diam |
| `NET-09` | Unsupported offline action | Diblokir sebelum mutation/timer dan alasannya jelas |

Milestone 1 online-only tetap harus mempunyai offline-blocked dan reconnect behavior; label online-only bukan alasan untuk crash atau kehilangan jawaban saat koneksi berubah.

## 12. Critical Journey Registry

| ID | Journey | P0 assertion |
|---|---|---|
| `J-01` | Google sign-in | Dapat selesai atau gagal dengan recovery; tidak ada account enumeration |
| `J-02` | Email-link sign-in | Instruksi browser/perangkat asal jelas; expiry/error accessible |
| `J-03` | Guest onboarding | Field, validation, save, resume, dan migration dapat dipahami |
| `J-04` | Authenticated onboarding | Preference tersimpan; redundant entry tidak diwajibkan |
| `J-05` | Dashboard to U01 | Status completion/mastery/readiness tidak tertukar |
| `J-06` | Start/resume session | Loading, stale version, dan duplicate request aman |
| `J-07` | Answer each enabled interaction | Equivalent input, feedback, attempt semantics, anti-leakage lulus |
| `J-08` | Audio activity | Control, policy, failure, dan no-false-evidence lulus |
| `J-09` | Submit/retry/reconnect | Idempotency dan canonical result lulus |
| `J-10` | Complete session | Focus/announcement benar; progress dan mastery semantics tepat |
| `J-11` | Review progress | Table/chart mempunyai text equivalent dan denominator/context |
| `J-12` | Sign out/session expiry | State sensitif hilang; safe recovery tersedia |

Setiap journey diuji dengan happy path dan applicable loading, empty, validation, business-rule, provider, network, authorization, stale, duplicate, dan malformed-data state.

## 13. WCAG Traceability Minimum

Matriks rinci per success criterion dibuat di test management artifact. Minimum cluster:

| Cluster | Contoh requirement | Evidence utama |
|---|---|---|
| Perceivable | Text alternative, captions/policy, adaptable structure, contrast, reflow | Audit route/state, token test, manual visual/AT |
| Operable | Keyboard, no trap, timing, target size, focus visible/not obscured | Keyboard recording, component/E2E, manual AT |
| Understandable | Language, predictable behavior, labels, errors, redundant entry, auth | Manual journey, copy review, automated assertions |
| Robust | Name/role/value, status messages, semantic HTML | Component test, accessibility scan, manual SR |

Setiap applicable criterion record memuat:

- WCAG criterion;
- route/component/state;
- test method;
- expected behavior;
- build dan combination;
- result;
- evidence reference;
- defect/exception reference;
- tester dan tanggal.

## 14. Pembagian Pengujian

### 14.1 Automated pada setiap pull request

- semantic lint dan prohibited pattern;
- component name/role/value/state;
- accessible error association;
- focus entry/return untuk dialog dan route transition;
- keyboard behavior untuk composite component;
- axe-core pada representative state;
- color-token contrast calculation;
- reduced-motion CSS contract;
- no hidden-answer/rationale in DOM atau event payload;
- Unicode normalization dan IME composition unit fixture;
- idempotency, retry, and failure integration fixture.

### 14.2 Automated nightly atau release candidate

- critical journey E2E pada Chromium dan applicable engine lain;
- 320 px, 200% zoom, 400% reflow, dan text-spacing snapshots/assertions;
- forced-colors screenshots/assertions;
- slow network, offline, reconnect, and asset failure;
- long/malformed/mixed-script content;
- accessibility scan seluruh P0 routes dan state fixture;
- visual regression untuk Japanese glyph, ruby, focus, and feedback.

### 14.3 Manual per feature

- keyboard-only untuk changed journey;
- screen-reader smoke untuk changed semantic component;
- IME/composer test jika input Jepang berubah;
- audio manual test jika player/policy/asset berubah;
- construct-equivalence review jika presentation alternative berubah.

### 14.4 Manual per release candidate

Seluruh P0 matrix dijalankan terhadap exact build. P1 dijalankan sesuai production milestone. Sampling tidak menggantikan failed P0 combination.

## 15. Test Case dan Evidence Contract

Setiap hasil manual minimum memuat:

```yaml
testRunId: string
matrixId: string
caseId: string
combinationId: string
journeyId: string
releaseCandidate: string
commitSha: string
preconditions: [string]
stepsRef: string
expected: string
actual: string
result: passed | failed | blocked | not_applicable
tester: string
testedAt: ISO-8601
evidenceRefs: [string]
defectRefs: [string]
notes: string
```

Evidence dapat berupa:

- CI report dan machine-readable result;
- screenshot untuk visual state;
- short recording untuk focus/announcement/IME behavior;
- accessibility tree excerpt tanpa data sensitif;
- network trace yang sudah direduksi;
- device/browser/AT version capture;
- signed manual checklist.

Raw learner answer, email, token, session identifier, dan detailed accessibility preference tidak boleh masuk evidence umum. Gunakan synthetic account dan redact trace sesuai security/privacy policy.

## 16. Defect Severity dan Release Policy

| Severity | Definisi | Kebijakan |
|---|---|---|
| Blocker | Critical journey mustahil diselesaikan atau evidence/construct rusak | Release blocked; exception dilarang |
| Critical | Major function/information inaccessible tanpa safe workaround; answer leak | Affected surface blocked; exception dilarang |
| Major | Friction berat atau alternative tidak konsisten tetapi safe workaround ada | Fix sebelum release atau exception time-bound oleh owner wajib |
| Minor | Dampak terbatas dengan workaround layak | Dapat dijadwalkan; owner dan target date wajib |

Regresi pada P0 combination membuka kembali gate walaupun combination lain lulus. Defect yang hanya muncul pada sampling tidak otomatis memperluas supported matrix, tetapi tetap ditriage untuk risiko pengguna nyata.

## 17. Exception Contract

Exception hanya boleh untuk major/minor dan harus mencatat:

- affected criterion, route, state, dan combination;
- dampak dan siapa yang terdampak;
- workaround yang benar-benar diuji;
- alasan perbaikan belum dapat dirilis;
- compensating control;
- owner dan approvers;
- expiry/target date;
- komunikasi support;
- retest requirement.

Product dan Accessibility wajib menyetujui exception aksesibilitas. Academic/Assessment ikut menyetujui bila construct/evidence terkait. Security/Privacy ikut menyetujui bila workaround memproses data berbeda.

## 18. Environment dan Test Data

Release matrix dijalankan pada staging production-like dengan:

- build immutable dan commit SHA tercatat;
- feature flag sama dengan proposed release;
- provider test configuration yang mencerminkan redirect/session policy;
- synthetic learner accounts;
- approved U01 seed dan exact VersionSet;
- controlled clock/timezone fixture;
- network throttling dan failure injection;
- logging/analytics redaction aktif;
- production-like CSP, storage, CDN, dan cookie settings.

Developer environment dapat memberi feedback awal tetapi bukan release evidence.

## 19. Entry dan Exit Criteria

### 19.1 Entry Milestone 1 test

- [ ] U01 seed version dan manifest dikunci.
- [ ] Relevant component contracts diimplementasikan.
- [ ] Critical journey fixtures tersedia.
- [ ] Automated accessibility baseline hijau.
- [ ] Test environment, synthetic accounts, browser, device, dan AT siap.
- [ ] Known limitation dan excluded scope terdokumentasi.
- [ ] No-answer-leakage checks tersedia.

### 19.2 Exit Milestone 1 verification

- [ ] `L-P0-01` sampai `L-P0-09` applicable combinations lulus.
- [ ] Seluruh `J-01` sampai `J-12` applicable journeys mempunyai evidence.
- [ ] Keyboard, NVDA, VoiceOver, dan TalkBack critical path lulus.
- [ ] 320 px, zoom 200%, reflow 400%, forced colors, dan reduced motion lulus.
- [ ] IME/Kana composer/audio applicable fixtures lulus.
- [ ] Tidak ada blocker atau critical defect terbuka.
- [ ] Major exception, jika ada, lengkap dan time-bound.
- [ ] Accessibility Lead, QA, Product, Engineering, dan Academic memberi sign-off sesuai area.

### 19.3 Exit production MVP

Selain Milestone 1:

- [ ] P1 learner matrix lulus atau mempunyai approved exception.
- [ ] Content Operations matrix lulus.
- [ ] Assessment accommodations dan equivalence sudah disetujui serta diuji.
- [ ] Version lock aktual dipublikasikan sebagai release evidence.
- [ ] Third-party/auth accessibility path telah diuji.
- [ ] Platform support copy dan support escalation selaras dengan matrix.

## 20. Ownership

| Area | Accountable | Required contributors |
|---|---|---|
| Support policy | Product | Engineering, Accessibility, Support |
| Version lock | QA | Engineering, Operations |
| WCAG applicability/conformance | Accessibility | Design, Engineering, QA |
| Construct-equivalence | Academic/Assessment | Accessibility, Practice |
| Automated coverage | Engineering | QA, Accessibility |
| Manual AT test | Accessibility/QA | Representative users where possible |
| Device/browser lab | QA/Operations | Engineering |
| Auth/provider path | Engineering/Product | Accessibility, Security |
| Exception | Product | Accessibility dan affected domain owner |
| User-facing support statement | Product/Support | Legal, Accessibility, Engineering |

## 21. Change Control

Matrix harus ditinjau saat:

- browser/OS/AT major baru dirilis;
- vendor menghentikan support;
- usage analytics yang privacy-safe menunjukkan platform material baru;
- target market atau kontrak organisasi berubah;
- critical dependency seperti Clerk, Next.js, player, editor, atau component primitive berubah;
- P0 journey baru ditambahkan;
- component semantics atau construct-equivalence berubah;
- severe platform-specific incident terjadi.

Menghapus supported combination adalah perubahan material. Ia memerlukan impact analysis, komunikasi, migration/support path, dan approval Product + Accessibility + Engineering.

## 22. Keputusan Terbuka

| ID | Keputusan yang dibutuhkan | Default fail-closed | Owner |
|---|---|---|---|
| `PLAT-OPEN-001` | Model physical iPhone dan Android untuk QA lab | Gunakan satu device current iOS yang didukung dan satu Android mid-range; lock model sebelum test | QA/Operations |
| `PLAT-OPEN-002` | Exact OS/browser/AT version per release | Isi immutable version lock saat RC test; release tidak supported tanpa lock | QA |
| `PLAT-OPEN-003` | JAWS menjadi P0 atau tetap sampling | Tetap sampling; naikkan jika user/contract evidence mewajibkan | Product/Accessibility |
| `PLAT-OPEN-004` | Layanan device/browser cloud | Manual/local lab tetap authority; vendor belum menjadi dependency | Engineering/QA |
| `PLAT-OPEN-005` | Assessment accommodation MVP | Assessment affected tetap blocked sampai equivalence dan server policy approved | Academic/Accessibility/Product |
| `PLAT-OPEN-006` | Scope support iPad/tablet | Compatibility sampling; jangan klaim full support sebelum matrix ditambah | Product |

## 23. Acceptance Criteria Dokumen

Dokumen ini siap menjadi baseline implementasi jika:

1. support policy dan version-lock mechanism disetujui;
2. P0/P1/sampling tidak diperlakukan sebagai istilah pemasaran yang saling menggantikan;
3. Milestone 1 scope dan excluded scope jelas;
4. setiap critical journey mempunyai combination dan evidence path;
5. keyboard, screen reader, visual adaptability, Japanese input, media, dan network conditions tercakup;
6. automated scan tidak dipakai sebagai satu-satunya bukti conformance;
7. blocker/critical tidak dapat di-waive;
8. privacy-safe evidence contract digunakan;
9. release claim dibatasi pada matrix bernomor yang benar-benar lulus;
10. open decisions tetap fail-closed sampai diputuskan oleh owner.

## 24. Decision Record

| ID | Keputusan | Status | Approver | Tanggal |
|---|---|---|---|---|
| `PLAT-001` | Support browser memakai moving policy `N` dan `N-1`; nomor aktual dikunci per release candidate. | `approved` | Product + Engineering + QA | 13 September 2026 |
| `PLAT-002` | WCAG 2.2 AA hanya diklaim pada scope dan platform matrix yang diuji. | `approved` | Product + Accessibility | 13 September 2026 |
| `PLAT-003` | Windows Chrome/Edge + NVDA, macOS/iOS Safari + VoiceOver, dan Android Chrome + TalkBack menjadi baseline P0. | `approved` | Accessibility + QA | 13 September 2026 |
| `PLAT-004` | JAWS tetap compatibility sampling sampai data pengguna atau kewajiban kontrak menaikkannya. | `approved` | Product + Accessibility | 13 September 2026 |
| `PLAT-005` | Learner web berfungsi mulai 320 CSS px serta lulus zoom 200% dan reflow 400%. | `approved` | Design + Accessibility + Engineering | 13 September 2026 |
| `PLAT-006` | Physical iOS dan Android device wajib untuk audio, touch, soft keyboard, dan mobile screen-reader verification. | `approved` | QA + Operations | 13 September 2026 |
| `PLAT-007` | Automated accessibility test tidak menggantikan manual keyboard dan AT test. | `approved` | QA + Accessibility | 13 September 2026 |
| `PLAT-008` | Blocker dan critical accessibility defect tidak dapat di-waive. | `approved` | Product + Accessibility | 13 September 2026 |
| `PLAT-009` | Content Operations full mutating support dimulai pada 1024 CSS px dan tidak masuk Milestone 1. | `approved` | Product + Design + Engineering | 13 September 2026 |
| `PLAT-010` | Support claim selalu mengacu pada immutable numbered version-lock artifact. | `approved` | Product + QA + Support | 13 September 2026 |
