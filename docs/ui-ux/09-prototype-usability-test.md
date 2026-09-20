# Prototype and Usability Test Nekoru — Milestone 1

**Status:** Approved v1.0 — research plan; pengujian belum dieksekusi  
**Tanggal:** 13 September 2026  
**Pemilik:** Product Design dan UX Research  
**Required reviewers:** Product, Academic/Content, Accessibility, Engineering, QA, Security/Privacy, dan Data  
**Cakupan prototype:** U01-L1 end-to-end, online-only  
**Bahasa pengujian:** Bahasa Indonesia (`id-ID`)

## 1. Tujuan

Dokumen ini menetapkan prototype coverage, research questions, peserta, skenario, metode, metrik, accessibility testing, severity, evidence, serta decision log untuk Milestone 1 Nekoru.

Prototype harus membuktikan bahwa learner pemula absolut dapat:

1. memahami nilai dan batas produk;
2. mengisi goal serta availability sebelum membuat akun;
3. masuk tanpa kehilangan draft;
4. memahami rencana awal dan memulai sesi U01;
5. menggunakan aktivitas audio, single-choice, dan select-to-pair;
6. memahami hint, feedback, save state, completion, mastery, dan review;
7. pulih dari gangguan tanpa menganggap kegagalan teknis sebagai kesalahan belajar;
8. menyelesaikan journey melalui keyboard, screen reader, zoom/reflow, atau reduced motion yang relevan.

Dokumen ini bukan laporan hasil. Status berubah menjadi `tested` setelah sesi dijalankan, temuan dicatat, perubahan diverifikasi, dan decision record diperbarui.

## 2. Dokumen Sumber

- [Implementation Readiness](../product-specs/implementation-readiness.md)
- [Domain Model and Schemas](../product-specs/domain-model-and-schemas.md)
- [Learning Policy and Registry N5](../product-specs/learning-policy-and-registry-n5.md)
- [API and Event Contracts](../product-specs/api-and-event-contracts.md)
- [Content Seed U01](../content/content-seed-u01.md)
- [UI/UX Overview](./01-ui-ux-overview.md)
- [Information Architecture](./02-information-architecture.md)
- [User Flows](./03-user-flows.md)
- [Learner Screen Specifications](./04-screen-specifications-learner.md)
- [Practice Interactions](./06-practice-interactions.md)
- [Design System](./07-design-system.md)
- [Accessibility, Content, and Edge Cases](./08-accessibility-content-and-edge-cases.md)

## 3. Scope dan Batas

### 3.1 Termasuk

- first visit dan value proposition;
- goal, tanggal target opsional, availability, timezone, serta pilihan pemula absolut;
- progressive authentication dengan Google atau email link;
- guest-draft migration states;
- initial plan U01 dan first-session readiness;
- Home dengan satu primary next action;
- session introduction dan focused practice runtime;
- audio playback, single-choice, select-to-pair, hint, submit, feedback, pause, resume, dan summary;
- progress/mastery ringkas serta review due;
- loading, empty, stale, technical failure, audio failure, provider failure, session expiry, dan permission state yang relevan;
- mobile-first, wide viewport, keyboard, screen reader, zoom/reflow, forced colors, dan reduced motion.

### 3.2 Tidak termasuk

- placement adaptif untuk learner berpengalaman;
- U01 lengkap atau U02–U24;
- Kanji/Grammar formal, Reading/Listening N5 penuh;
- checkpoint, simulation, readiness final;
- Content Operations UI;
- Kana composer;
- offline package dan synchronization;
- AI evaluation;
- gamification lengkap;
- dark theme;
- native mobile app.

Out-of-scope flow boleh tampil sebagai disabled/unavailable state bila diperlukan untuk orientasi, tetapi tidak boleh terlihat sebagai fitur aktif.

## 4. Research Questions

### 4.1 Onboarding dan authentication

1. Apakah pengguna memahami bahwa goal dan availability dapat diisi sebelum membuat akun?
2. Apakah waktu permintaan akun terasa wajar dan tidak mengejutkan?
3. Apakah pengguna yakin draft tetap aman ketika login dibatalkan atau gagal?
4. Apakah Google dan email link mudah dibedakan tanpa menimbulkan ekspektasi password lokal?
5. Apakah same-browser requirement email link dapat dipahami dan dipulihkan?

### 4.2 Plan dan navigation

1. Apakah pengguna memahami starting point, durasi sesi, dan alasan dimulai dari U01?
2. Apakah satu primary next action pada Home mudah ditemukan?
3. Apakah perbedaan Beranda, Belajar, Jadwal, dan Progres jelas?
4. Apakah pengguna memahami bahwa lesson completion bukan mastery?

### 4.3 Practice

1. Apakah instruction audio dan response action dapat dipahami tanpa demonstrasi moderator?
2. Apakah select-to-pair dapat digunakan tanpa mengandalkan drag?
3. Apakah pengguna mengerti kapan selection masih dapat diubah dan kapan submission terjadi?
4. Apakah hint/replay effect terasa transparan tanpa membebani pengguna dengan matematika mastery?
5. Apakah feedback membantu memperbaiki kesalahan tanpa terasa menghakimi?
6. Apakah focused runtime memberi orientasi yang cukup ketika global navigation disembunyikan?

### 4.4 Recovery dan trust

1. Apakah save state, retry, dan resume dapat dipahami?
2. Apakah audio/provider failure jelas bukan kesalahan akademik?
3. Apakah pengguna tahu apa yang tersimpan dan tindakan berikutnya?
4. Apakah summary membedakan session selesai, bukti yang terkumpul, mastery, dan review berikutnya?

### 4.5 Accessibility

1. Apakah reading/focus order logis?
2. Apakah name, role, value, state, instruction, dan feedback diumumkan dengan cukup?
3. Apakah reflow, magnification, text spacing, dan soft keyboard mempertahankan tindakan utama?
4. Apakah audio dan matching mempunyai jalur ekuivalen yang dapat dioperasikan?
5. Apakah motion, mascot, dan feedback tidak menjadi distraksi atau satu-satunya pembawa informasi?

## 5. Hipotesis

| ID | Hipotesis | Evidence minimum |
| --- | --- | --- |
| `H-01` | Progressive authentication menurunkan hambatan awal tanpa menciptakan rasa tertipu | Peserta memahami alasan login dan draft persistence |
| `H-02` | Satu CTA utama cukup untuk mengarahkan learner ke sesi berikutnya | Mayoritas peserta memulai sesi tanpa membuka menu lain |
| `H-03` | Plan U01 dapat dipercaya bila starting point dan alasannya dijelaskan | Peserta dapat menjelaskan kembali mengapa mulai dari U01 |
| `H-04` | Select-to-pair lebih jelas dan accessible daripada drag sebagai baseline | Task selesai dengan pointer dan keyboard/screen reader |
| `H-05` | Feedback singkat berbasis contrast membantu tanpa mempermalukan | Peserta memahami kesalahan dan next action |
| `H-06` | Save/recovery language mencegah technical failure dibaca sebagai nilai salah | Peserta menyatakan jawaban tidak dihukum saat audio gagal |
| `H-07` | Summary dapat memisahkan completion, mastery, dan review | Peserta dapat menjelaskan ketiga status dengan kata sendiri |

Hipotesis tidak dinyatakan terbukti hanya dari completion rate. Observasi, comprehension check, accessibility result, dan komentar peserta harus ditriangulasi.

## 6. Prototype Fidelity dan Data

### 6.1 Fidelity

Gunakan prototype high-enough fidelity untuk menguji:

- hierarchy dan copy;
- navigation serta focused-runtime transition;
- responsive layout;
- input, selection, matching, submit, hint, replay, dan feedback;
- loading/error/recovery state;
- focus order, accessible labels, live region, dan keyboard behavior.

Visual polish, ilustrasi final, animation timing final, atau production performance tidak diperlukan pada Round 1 kecuali memengaruhi pemahaman atau accessibility.

### 6.2 Prototype data

- gunakan synthetic identity dan account;
- gunakan approved/candidate content seed U01-L1;
- jangan meminta password, token, email pribadi, atau credential peserta;
- simulasi Google/email-link flow tanpa mengirim email nyata;
- gunakan learning history synthetic;
- jangan merekam raw response sebagai production learner evidence;
- prototype selalu diberi label `Prototype — hasil tidak disimpan sebagai progres belajar`.

### 6.3 Branching

Prototype harus mendukung branch, bukan hanya happy-path slideshow. Minimal:

- Google success/cancel/failure;
- email valid/invalid, sent, expired, dan wrong-browser;
- guest draft migration success/conflict/failure;
- initial plan success/unavailable;
- audio success/loading/failure;
- valid submit, empty submit, duplicate click, dan stale state;
- pause/resume;
- session complete dengan mastery unchanged/provisional dan review scheduled.

## 7. Prototype Screen Inventory Milestone 1

| Prototype ID | Source screen/state | Priority | Required variants |
| --- | --- | --- | --- |
| `P-M1-01` | `LS-AU-01` Mulai Nekoru | P0 | New/returning, narrow/wide |
| `P-M1-02` | `LS-ON-01` Tujuan belajar | P0 | Empty, valid, validation error |
| `P-M1-03` | `LS-ON-02` Waktu belajar | P0 | Empty, schedule set, timezone explanation |
| `P-M1-04` | `LS-ON-04` Pilih titik mulai | P0 | Absolute beginner selected |
| `P-M1-05` | `LS-AU-02` Pilih cara masuk | P0 | Draft present, provider unavailable |
| `P-M1-06` | `LS-AU-03/04` Email flow | P0 | Send, cooldown, expired, wrong browser |
| `P-M1-07` | `LS-AU-05` Auth result | P0 | Success/migration/conflict/cancel/failure |
| `P-M1-08` | `LS-ON-05` Rencana awal | P0 | On-track, partial/unavailable |
| `P-M1-09` | `LS-ON-06` Siap mulai | P0 | Ready and safe return |
| `P-M1-10` | `LS-HO-01` Beranda | P0 | First session, active run, review due |
| `P-M1-11` | `LS-RT-01` Pengantar sesi | P0 | Purpose, duration, audio note |
| `P-M1-12` | `LS-RT-02` Single-choice | P0 | Ready, selected, validation, evaluating |
| `P-M1-13` | `LS-RT-02` Select-to-pair | P0 | Source active, pair formed/removed, complete |
| `P-M1-14` | `LS-RT-03` Hint/support | P0 | Light/strong/replay and evidence explanation |
| `P-M1-15` | `LS-RT-04` Feedback | P0 | Correct, incorrect, technical, retry path |
| `P-M1-16` | `LS-RT-05/07` Pause dan recovery | P0 | Saved, restore, version conflict |
| `P-M1-17` | `LS-RT-08` Report issue | P0 | Draft, submitted, success/failure |
| `P-M1-18` | `LS-RT-09` Session summary | P0 | Complete, mastery unchanged, provisional, review due |
| `P-M1-19` | `LS-PR-01` Progres ringkas | P0 subset | Seed scope notice and next action |
| `P-M1-20` | System states | P0 | Session expired, maintenance, denied, not found |

Full route inventory tetap mengikuti Screen Specifications. Prototype milestone tidak menghapus screen lain dari scope MVP.

## 8. Viewport dan Input Matrix

### 8.1 Design/test frames

| Frame | Tujuan |
| --- | --- |
| 320 CSS px width | Minimum supported learner reflow |
| 390 × 844 CSS px | Primary mobile moderated test |
| 768 × 1024 CSS px | Tablet/reflow observation |
| 1280 × 800 CSS px | Wide viewport and keyboard test |
| 200% text zoom | Text resize and action visibility |
| 400% browser zoom/reflow | WCAG reflow verification pada representative screens |

Angka frame prototype tidak menetapkan final browser/device support matrix.

### 8.2 Input

- touch/pointer;
- keyboard-only;
- screen reader keyboard/touch gesture;
- magnification/high zoom;
- reduced-motion preference;
- forced-colors/high-contrast sampling.

## 9. Participant Plan

### 9.1 Round 1 — Core usability

Target 6–8 peserta:

- dewasa Indonesia yang tertarik belajar bahasa Jepang;
- minimal empat pemula absolut;
- maksimal dua peserta yang pernah belajar dasar untuk menguji expectation mismatch;
- variasi pengalaman digital dan perangkat;
- tidak merekrut anggota tim pembuat produk sebagai peserta utama.

### 9.2 Round 2 — Accessibility

Target 4–6 peserta yang benar-benar menggunakan satu atau lebih:

- screen reader;
- keyboard-only atau switch-equivalent navigation;
- magnification/high zoom;
- reduced distraction/reduced motion;
- caption/transcript support.

Jika rekrutmen pengguna assistive technology belum cukup, expert review boleh dilakukan lebih dahulu tetapi tidak menggantikan user testing.

### 9.3 Round 3 — Verification

Target 4–6 peserta baru setelah blocker/critical/major findings diperbaiki. Peserta lama boleh digunakan untuk longitudinal comparison, tetapi sedikitnya separuh peserta verification harus belum melihat prototype sebelumnya.

Sample bersifat formative dan tidak digunakan untuk klaim statistik populasi.

## 10. Recruitment dan Ethics

Screener hanya mengumpulkan data yang diperlukan:

- rentang usia dewasa;
- pengalaman belajar Jepang;
- perangkat/browser umum;
- kebiasaan menggunakan assistive technology yang peserta bersedia bagikan;
- availability dan consent.

Larangan:

- meminta diagnosis medis sebagai syarat;
- menyimpulkan accommodation dari diagnosis;
- merekam credential nyata;
- merekrut bawahan langsung moderator tanpa mitigasi power imbalance;
- menyimpan rekaman tanpa duration, access, dan deletion policy yang disetujui.

Peserta menerima informasi tujuan, aktivitas, recording, confidentiality, compensation, hak berhenti, serta contact untuk deletion request. Retention rekaman tetap `TBD` sampai privacy plan disetujui; sesi tidak direkam sebelum itu.

## 11. Metode Pengujian

### 11.1 Format

- moderated remote sebagai baseline;
- durasi 45–60 menit;
- satu moderator dan satu note-taker bila memungkinkan;
- think-aloud ringan tanpa terus menginterupsi;
- moderator memakai neutral prompts;
- task diberikan sebagai tujuan, bukan instruksi klik;
- pertanyaan pemahaman dilakukan setelah peserta mengambil keputusan.

### 11.2 Urutan sesi

1. consent dan context;
2. warm-up serta pengalaman belajar;
3. onboarding/authentication tasks;
4. plan/Home tasks;
5. practice tasks;
6. recovery scenario;
7. summary/progress interpretation;
8. post-task rating dan debrief;
9. konfirmasi penggunaan data serta compensation.

### 11.3 Moderator guardrail

Moderator tidak:

- menjelaskan UI sebelum peserta mencoba;
- memperbaiki jawaban bahasa Jepang;
- menyamakan kesalahan prototype dengan kemampuan peserta;
- mengarahkan ke control tertentu;
- menganggap diam sebagai kebingungan tanpa probing netral;
- mengubah urutan item untuk membantu peserta tertentu tanpa mencatat deviation.

## 12. Test Tasks

### Task 1 — Memulai tanpa akun

**Prompt:** “Bayangkan kamu ingin mulai belajar bahasa Jepang dari nol. Atur tujuan dan waktu belajar yang sesuai.”

Observe:

- CTA pertama;
- pemahaman target/date;
- availability interaction;
- back/forward persistence;
- awareness bahwa data belum tersimpan ke akun.

### Task 2 — Menyimpan rencana

**Prompt:** “Simpan pilihanmu agar bisa dilanjutkan lain waktu.”

Observe:

- pemilihan Google/email;
- alasan login;
- migration status;
- response terhadap cancelled/expired/wrong-browser branch.

### Task 3 — Memahami rencana awal

**Prompt:** “Lihat rencana yang dibuat. Ceritakan apa yang akan kamu pelajari lebih dahulu dan mengapa.”

Comprehension checks:

- starting point U01;
- perkiraan sesi;
- plan dapat berubah;
- tidak ada janji kelulusan.

### Task 4 — Memulai sesi pertama

**Prompt:** “Mulai kegiatan belajar pertama.”

Observe:

- primary next action;
- transition ke focused runtime;
- orientation setelah global navigation hilang;
- audio-control discoverability.

### Task 5 — Menyelesaikan single-choice audio

**Prompt:** “Selesaikan aktivitas ini seperti saat belajar sendiri.”

Observe:

- play/replay;
- selection sebelum submit;
- explicit submit;
- feedback interpretation;
- keyboard/screen-reader behavior pada applicable session.

### Task 6 — Menyelesaikan matching

**Prompt:** “Pasangkan bunyi atau sapaan dengan pilihan yang sesuai.”

Observe:

- source-active state;
- formed/removed pair;
- completion count;
- submit understanding;
- penggunaan tanpa drag.

### Task 7 — Menggunakan bantuan

**Prompt:** “Kamu belum yakin. Cari bantuan yang tersedia lalu lanjutkan.”

Observe:

- hint/replay discoverability;
- pemahaman dampak bantuan;
- absence of shame/pressure;
- next action.

### Task 8 — Menghadapi audio gagal

**Prompt:** “Audio tidak dapat diputar. Apa yang terjadi pada jawaban dan apa yang akan kamu lakukan?”

Success comprehension:

- tidak dianggap salah;
- tahu state tersimpan;
- menemukan retry/alternate/pause;
- tidak kehilangan attempt.

### Task 9 — Pause dan resume

**Prompt:** “Berhenti sebentar, kemudian lanjutkan sesi.”

Observe:

- exit confirmation;
- saved-state message;
- return path;
- restoration of selection, progress, feedback, dan focus.

### Task 10 — Menafsirkan summary

**Prompt:** “Ceritakan apa yang sudah selesai, apa yang sudah dikuasai, dan apa yang terjadi berikutnya.”

Success comprehension:

- session completion berbeda dari mastery;
- seed tidak berarti U01 selesai;
- review due dapat ditemukan;
- next action jelas.

## 13. Metrics

### 13.1 Per task

- completion: success / assisted / failed;
- critical error count;
- wrong-turn count;
- moderator intervention;
- recovery success;
- time on task sebagai diagnostic, bukan mastery/ability judgment;
- Single Ease Question skala 1–7;
- comprehension answer: correct / partial / incorrect.

### 13.2 Journey targets

Targets untuk lulus verification round:

| Metric | Target |
| --- | ---: |
| Core journey completion tanpa moderator mengambil alih | ≥85% |
| Menemukan primary next action | ≥90% |
| Memahami alasan authentication | ≥80% |
| Memahami completion ≠ mastery | ≥80% |
| Memahami technical failure bukan incorrect | ≥90% |
| Single-choice dan matching completion | ≥90% |
| Recovery dari pause/audio failure | ≥85% |
| Median SEQ critical tasks | ≥5/7 |
| Blocker/Critical accessibility finding terbuka | 0 |

Persentase dari sample kecil hanya menjadi trigger keputusan formatif, bukan estimasi populasi. Satu blocker construct, security, privacy, atau accessibility tetap memblokir walaupun metric agregat tinggi.

## 14. Accessibility Test Script

Representative journey wajib diuji dengan:

1. keyboard-only dari first focus sampai summary;
2. NVDA + browser target desktop;
3. VoiceOver pada target Apple yang tersedia;
4. TalkBack pada target Android yang tersedia;
5. 200% text resize;
6. 400% zoom/reflow pada viewport setara 320 CSS px;
7. reduced motion;
8. forced colors/high contrast;
9. audio unavailable;
10. long Indonesian copy dan mixed `id`/`ja` language runs.

Checks minimum:

- skip link dan heading hierarchy;
- focus order/visibility/restore;
- accessible name, role, value, description, error;
- live-region timing untuk feedback/save state;
- no color-only status;
- target size;
- no covered sticky content;
- pair formation/removal announcement;
- modal focus trap dan return;
- Japanese pronunciation/language switching;
- no response-time penalty caused by assistive technology.

## 15. State and Edge-Case Matrix

| Area | State wajib diuji |
| --- | --- |
| Loading | Initial, refreshing, delayed auth callback, delayed evaluation |
| Empty | Belum ada plan, belum ada review, no available content |
| Authentication | Cancelled, provider unavailable, email invalid/expired/wrong-browser |
| Draft | Local, migrating, migrated, conflict, expired |
| Practice | Ready, composing, submitted, evaluated, feedback released, completed |
| Save | Saving, saved server, failed, stale revision |
| Audio | Loading, ready, playing, paused, ended, failed |
| Failure | Recoverable, blocking, maintenance, session expired |
| Content | Unavailable, version incompatible, quarantined replacement |
| Accessibility | High zoom, long text, no motion, keyboard, screen reader |

Offline/sync state tidak diuji sebagai active capability pada Milestone 1; hanya unavailable messaging bila pengguna kehilangan koneksi.

## 16. Finding Severity

| Severity | Definisi | Tindakan |
| --- | --- | --- |
| `blocker` | Critical journey tidak dapat selesai, answer/evidence bocor, konstruk rusak, atau data berisiko | Blokir implementation/release scope terkait |
| `critical` | Fungsi/informasi utama tidak dapat diakses tanpa safe workaround | Perbaiki sebelum handoff |
| `major` | Friction berat, salah tafsir mastery/plan, atau recovery tidak jelas | Perbaiki dan retest |
| `minor` | Friction terbatas dengan workaround wajar | Owner dan target milestone wajib |
| `observation` | Peluang perbaikan tanpa kegagalan task | Masuk backlog bila relevan |

Confidence temuan dicatat `low/medium/high` berdasarkan jumlah occurrence, severity impact, konsistensi, dan triangulasi—bukan hanya frekuensi.

## 17. Finding Record

```yaml
finding_id: UXF-M1-001
study_round: 1
task_id: TASK-06
prototype_version: 0.1.0
participant_refs: [P03, P05]
severity: major
confidence: medium
surface: practice_matching
observation: string
expected_behavior: string
impact: string
affected_groups: [keyboard, screen_reader]
evidence_refs: []
recommendation: string
owner: ProductDesign
target_version: 0.2.0
status: open
verification_refs: []
decision_id: null
```

Quote peserta hanya disimpan bila consent mengizinkan dan telah dihilangkan identitasnya. Clip/recording mengikuti retention policy.

## 18. Synthesis dan Decision Rules

1. Pisahkan usability problem, preference, content misunderstanding, prototype limitation, dan learning error.
2. Jangan mengubah academic answer atau threshold untuk memperbaiki friction UI.
3. Finding construct/accessibility dapat mengubah interaction presentation atau meminta approved replacement.
4. Perubahan scope, flow, contract, content, atau policy menghasilkan decision record dan impact owner.
5. Preference satu peserta tidak otomatis menjadi requirement.
6. Repeated confusion pada status mastery, auth, save, atau failure diperlakukan sebagai trust issue, bukan cosmetic issue.
7. Blocker/critical diperbaiki sebelum engineering handoff.
8. Major diperbaiki dan diuji ulang atau memperoleh exception time-bound dari owner yang berwenang; exception dilarang untuk answer leakage, security, rights, dan construct validity.

## 19. Prototype Versioning

Prototype version menggunakan semver:

- patch: copy/visual correction tanpa perubahan flow;
- minor: interaction/state/branch baru yang kompatibel;
- major: perubahan journey, navigation, auth timing, construct, atau API expectation.

Setiap test session mengunci:

- prototype version;
- content seed version;
- policy/API reference version;
- task-script version;
- device/input/AT configuration;
- moderator dan session timestamp.

Hasil dari version lama tidak digabung diam-diam dengan version baru.

## 20. Deliverables

Sebelum handoff, tim menghasilkan:

1. clickable prototype versioned;
2. screen/state coverage matrix;
3. component and interaction annotation;
4. participant screener dan consent materials;
5. moderator guide dan task script;
6. raw notes yang terproteksi;
7. anonymized finding registry;
8. research synthesis;
9. decision log;
10. revised prototype;
11. verification report;
12. accessibility test evidence;
13. implementation annotations untuk `10-analytics-and-handoff.md`.

## 21. Entry Criteria untuk Testing

Testing dapat dimulai jika:

1. prototype mencakup seluruh P-M1-01–20 dan branch yang ditetapkan;
2. content seed dan copy cukup direview untuk tidak mengajarkan informasi salah;
3. answer/evidence behavior sesuai policy;
4. prototype diberi label non-production/non-evidence;
5. screener, consent, compensation, recording, access, serta deletion plan disetujui;
6. moderator guide diuji melalui pilot internal;
7. accessibility mechanics prototype cukup nyata untuk target test; static mockup tidak digunakan untuk mengklaim keyboard/screen-reader usability;
8. test account dan synthetic data tidak menggunakan credential/data production;
9. observer memahami confidentiality dan non-interference rules.

## 22. Exit Criteria untuk Handoff

Prototype siap menjadi basis implementation handoff jika:

1. Round 1 dan Round 2 selesai;
2. seluruh blocker/critical diperbaiki dan diverifikasi;
3. major finding mempunyai fix tervalidasi atau exception yang sah;
4. journey targets pada Bagian 13 dievaluasi dengan konteks sample;
5. completion/mastery, auth timing, save state, error recovery, dan next action dipahami sesuai threshold;
6. keyboard/screen-reader/reflow critical journey lulus;
7. final screen/state matrix konsisten dengan API, content, dan policy contracts;
8. keputusan desain menunjuk evidence dan prototype version;
9. deferred issue memiliki owner, severity, target milestone, serta safe fallback;
10. Product, Design, Academic, Accessibility, Engineering, Security/Privacy, dan QA menyetujui handoff version.

## 23. Keputusan Terbuka

| ID | Keputusan | Rekomendasi | Status |
| --- | --- | --- | --- |
| `PROTO-OPEN-001` | Tool dan lokasi source prototype | Gunakan Figma dengan version/page naming yang mereferensikan prototype version; export annotation tetap tersimpan bersama handoff | Menunggu setup design workspace |
| `PROTO-OPEN-002` | Compensation peserta | Tetapkan nilai yang adil terhadap durasi dan pasar Indonesia sebelum recruitment | Menunggu Product/Research Ops |
| `PROTO-OPEN-003` | Recording dan retention | Jangan merekam sampai consent, access, duration, dan deletion policy disetujui | Blocked oleh privacy policy |
| `PROTO-OPEN-004` | Browser/device sesi utama | Gunakan perangkat peserta bila aman ditambah controlled reference setup | Menunggu platform matrix sementara |

## 24. Decision Record

| ID | Keputusan | Status | Owner | Tanggal |
| --- | --- | --- | --- | --- |
| `PROTO-001` | Prototype pertama mencakup U01-L1 end-to-end dan critical failure states. | `approved` | Product + Design | 13 September 2026 |
| `PROTO-002` | Research memakai tiga putaran: core usability, accessibility, dan verification. | `approved` | Design/Research + Accessibility | 13 September 2026 |
| `PROTO-003` | Baseline sesi adalah moderated remote selama 45–60 menit. | `approved` | UX Research | 13 September 2026 |
| `PROTO-004` | Prototype menggunakan identity/data synthetic dan tidak menghasilkan learner evidence. | `approved` | Research + Security/Privacy | 13 September 2026 |
| `PROTO-005` | Testing mencakup mobile utama, viewport lebar, keyboard, screen reader, dan reflow. | `approved` | Design + Accessibility | 13 September 2026 |
| `PROTO-006` | Blocker/critical harus diperbaiki sebelum handoff; major memerlukan fix/retest atau exception sah. | `approved` | Product + Design + Accessibility | 13 September 2026 |
| `PROTO-007` | Completion rate tidak mengalahkan kegagalan construct, security, privacy, atau accessibility. | `approved` | Product + Academic + Security + Accessibility | 13 September 2026 |
| `PROTO-008` | Prototype version dan study inputs dikunci untuk setiap sesi. | `approved` | UX Research + QA | 13 September 2026 |
