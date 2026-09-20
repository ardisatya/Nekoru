# Definition of Done Nekoru — MVP Pemula Absolut hingga JLPT N5

## 1. Tujuan dan Status Dokumen

Dokumen ini adalah kontrak normatif lintas Product, Academic/Content, Assessment, Engineering, Accessibility, Security/Privacy/Legal, dan Operations untuk menentukan kapan pekerjaan Nekoru benar-benar selesai.

Definition of Done atau DoD dibagi menjadi tiga tingkat:

1. **Increment/Feature Done** — perubahan individual aman untuk digabungkan dan diintegrasikan.
2. **Subsystem Done** — satu kapabilitas lengkap, terintegrasi, dan siap dipakai oleh alur lain.
3. **MVP Production Release Done** — produk end-to-end layak digunakan oleh learner nyata di production.

Kelulusan pada tingkat yang lebih rendah tidak otomatis meluluskan tingkat di atasnya. Feature yang lulus seluruh pengujian lokal belum membuat subsystem selesai; subsystem yang selesai belum membuat MVP layak dirilis jika konten, kebijakan, operasi, atau approval lintas-domain belum lengkap.

Scope normatif dokumen ini adalah aplikasi web Nekoru untuk pengguna Indonesia, dari pemula absolut sampai kesiapan internal JLPT N5. N4–N1, aplikasi native, monetisasi, leaderboard, komunitas, kelas langsung, marketplace tutor, dan latihan percakapan suara bebas berada di luar DoD MVP.

## 2. Istilah dan Prinsip Kelulusan

### 2.1 Istilah

| Istilah | Definisi operasional |
| --- | --- |
| Criterion | Satu syarat yang dapat dibuktikan secara objektif. |
| Gate | Sekumpulan criterion wajib untuk satu scope dan tingkat DoD. |
| Evidence | Artefak berversi yang membuktikan criterion telah diperiksa. |
| Owner | Peran yang bertanggung jawab menyiapkan scope dan evidence. |
| Approver | Peran berwenang yang menyatakan evidence memenuhi criterion. |
| Blocker | Keputusan, artefak, atau hasil pengujian yang belum tersedia dan mencegah gate lulus. |
| Mandatory gate | Gate yang tidak dapat dikompensasi skor dan tidak dapat di-waive. |
| Exception | Pengecualian terbatas untuk criterion non-mandatory dengan scope dan masa berlaku eksplisit. |
| Production-like | Environment dengan konfigurasi, topology, policy, dan failure behavior yang merepresentasikan production tanpa memakai data atau secret production pada pengujian. |

### 2.2 Aturan kelulusan

Suatu tingkat hanya berstatus **Done** jika:

1. seluruh gate wajib yang berlaku berstatus `passed`;
2. seluruh evidence menunjuk versi artefak, policy, schema, dan environment yang tepat;
3. tidak ada defect `blocker` atau `critical` terbuka pada scope tersebut;
4. tidak ada keputusan fail-closed yang belum disetujui untuk scope tersebut;
5. seluruh approver wajib telah memberikan sign-off yang dapat diaudit;
6. tidak ada evidence yang kedaluwarsa, berasal dari versi lama yang tidak kompatibel, atau hanya berupa klaim tanpa hasil pemeriksaan.

Completion, deployment, exposure, XP, streak, atau keberhasilan happy path saja bukan bukti Done.

## 3. Hierarki Sumber Kebenaran

Jika dokumen sumber berbeda atau tumpang tindih, gunakan hierarki keputusan berikut:

1. **Scope akademik, outcome, prerequisite, inventory, dan validitas bahasa:** Arsitektur Kurikulum serta inventory/blueprint domain yang telah disetujui.
2. **Evidence, mastery, aggregation, retention, gate veto, dan readiness:** Mastery Specification.
3. **Sequencing, session assembly, calendar planning, remedial, dan progression runtime:** Learning Engine.
4. **Activity execution, attempt, hint, normalization, evaluation, feedback, dan candidate evidence:** Practice Engine.
5. **Assessment assembly, raw scoring, equivalence, completion, retake, dan invalidation:** Assessment Specification N5.
6. **Review, approval, publication, waiver, quarantine, correction, dan content release:** Content Validation Rubric.
7. **Struktur sistem, data ownership, integration, reliability, security, dan operasi:** Technical Architecture.
8. **Information architecture, flow, screen, interaction presentation, design system, content design, dan accessibility UI:** rangkaian spesifikasi UI/UX; dokumen yang lebih spesifik dan lebih hilir mengalahkan rekomendasi presentation yang lebih awal, tanpa mengubah aturan akademik.
9. **Product intent dan batas MVP:** Product Overview, sepanjang tidak mengurangi kontrak yang lebih spesifik di atas.

Perubahan yang menurunkan standar akademik, evidence validity, assessment integrity, accessibility, rights, security, privacy, atau content masterability memerlukan proposal versi dan approval owner domain; perubahan tersebut tidak dapat dilakukan melalui interpretasi DoD.

`docs/design/nekoru.pen` teramati berukuran 0 byte pada pemeriksaan sumber awal dan tidak tersedia lagi saat verifikasi akhir dokumen ini. Artefak tersebut tetap dicatat sebagai sumber desain non-normatif dan tidak dapat menjadi evidence sampai tersedia kembali dengan isi, versi, serta approval yang dapat ditelusuri.

## 4. Kontrak Gate dan Evidence

### 4.1 Status gate

| Status | Arti | Boleh menyatakan Done |
| --- | --- | --- |
| `not_started` | Criterion belum diperiksa. | Tidak |
| `in_review` | Evidence tersedia dan sedang diperiksa. | Tidak |
| `passed` | Approver menyetujui evidence untuk versi dan scope yang dinyatakan. | Ya |
| `failed` | Evidence menunjukkan criterion tidak terpenuhi. | Tidak |
| `blocked` | Criterion belum dapat dinilai karena dependency atau keputusan belum tersedia. | Tidak |

Status tidak boleh disimpulkan dari tidak adanya defect. `passed` selalu memerlukan evidence dan approval eksplisit.

### 4.2 Record minimum

Setiap gate wajib mempunyai record dengan field berikut:

| Field | Wajib | Ketentuan |
| --- | --- | --- |
| `gate_id` | Ya | ID stabil dan unik. |
| `dod_level` | Ya | `increment`, `subsystem`, atau `release`. |
| `scope` | Ya | Feature, subsystem, journey, release, dan versi yang dinilai. |
| `criterion` | Ya | Pernyataan lulus yang objektif. |
| `applicability` | Ya | `applicable` atau `not_applicable`; pilihan kedua memerlukan rationale dan approval. |
| `mandatory` | Ya | Boolean; `true` tidak dapat di-waive. |
| `owner` | Ya | Peran yang menyiapkan evidence dan memperbaiki kegagalan. |
| `approver` | Ya | Peran berwenang; harus berbeda dari author bila separation of duties berlaku. |
| `evidence_link` | Ya | Tautan ke test run, report, manifest, decision record, review receipt, atau runbook drill. |
| `artifact_versions` | Ya | Commit/build, schema, policy, curriculum, content, evaluator, manifest, dan environment version yang relevan. |
| `status` | Ya | Salah satu status pada Bagian 4.1. |
| `checked_at` | Ya untuk `passed`/`failed` | Timestamp dan identitas pemeriksa. |
| `blocking_reason` | Ya untuk `blocked` | Dependency, decision ID, owner, dan affected scope. |
| `exception` | Kondisional | Hanya untuk criterion non-mandatory dan mengikuti Bagian 4.3. |

Perubahan artifact version yang relevan membuat evidence lama `not_started` kembali kecuali compatibility review membuktikan evidence tetap berlaku.

### 4.3 Exception

Exception hanya boleh dipakai pada criterion non-mandatory dan wajib menyimpan:

- criterion dan scope yang dikecualikan;
- alasan serta analisis risiko;
- owner dan approver;
- fallback atau safe degradation;
- tanggal kedaluwarsa;
- target perbaikan;
- bukti bahwa critical journey tetap dapat diselesaikan.

Exception tidak boleh digunakan untuk melewati:

- validitas akademik atau kealamian bahasa;
- rights, license, consent, atau attribution;
- security atau privacy mandatory gate;
- assessment integrity atau answer leakage;
- construct-equivalence dan validitas evidence;
- Content Masterability Contract;
- defect accessibility `blocker` atau `critical`;
- required content, requiredness profile, backup/restore, atau rollback target rilis.

## 5. Level 1 — Increment/Feature Done

Satu increment atau feature hanya Done jika seluruh gate yang berlaku berikut lulus.

| Gate ID | Criterion | Evidence minimum | Owner | Approver |
| --- | --- | --- | --- | --- |
| `INC-REQ` | Requirement, out-of-scope, source decision, dan acceptance criteria terlacak; tidak ada konflik sumber yang belum diselesaikan. | Traceability record dan acceptance list. | Product/Engineering | Product Owner atau domain owner |
| `INC-CONTRACT` | API, schema, event, policy, content, dan UI contract berversi; compatibility serta migration impact dinilai. | Contract diff, compatibility test, migration note. | Engineering/domain owner | Engineering Lead dan affected owner |
| `INC-IMPLEMENTATION` | Implementasi memenuhi acceptance criteria, tidak menyimpan placeholder pada path rilis, dan tidak melewati authority backend. | Review receipt dan build artifact. | Engineering/Content | Engineering Lead atau Academic Lead |
| `INC-TEST` | Unit, property/determinism, contract, integration, dan E2E relevan lulus; regression test ditambahkan untuk defect yang diperbaiki. | Versioned test report. | Engineering/QA | Engineering Lead |
| `INC-FAILURE` | Loading, empty, error, timeout, retry, stale, conflict, offline/resume, dan fallback yang relevan ditentukan serta diuji. | Failure fixtures dan recovery test. | Engineering/QA | Engineering Lead |
| `INC-INTEGRITY` | Mutation idempotent, concurrency aman, history tidak ditulis ulang, dan output dapat direproduksi dari input/version yang sama. | Duplicate/stale/replay test dan decision hash. | Engineering/Data | Engineering Lead |
| `INC-ACCESSIBILITY` | Keyboard, semantics, focus, zoom/reflow, reduced motion, Japanese text/IME, audio, dan alternative interaction yang relevan lulus. | Automated scan dan manual fixture result. | Engineering/Design | Accessibility Lead |
| `INC-SECURITY` | Authorization, data minimization, secret boundary, sanitization, answer leakage, dan threat impact yang relevan diperiksa. | Security checklist/test atau threat-model delta. | Engineering | Security/Privacy |
| `INC-OBSERVABILITY` | Success, failure, latency, retry, dan domain reason dapat diamati tanpa merekam secret atau protected raw response. | Telemetry schema dan dashboard/alert evidence. | Engineering/Operations | Operations Lead |
| `INC-DOCS` | Kontrak, behavior, runbook, analytics, migration, dan user/content guidance yang berubah diperbarui. | Dokumentasi dan release note. | Feature owner | Domain owner |
| `INC-REVIEW` | Review lintas-domain dan separation of duties yang relevan selesai; tidak ada blocker/critical defect. | Approval receipts dan defect query. | Feature owner | Seluruh approver wajib |

Criterion yang tidak berlaku harus mempunyai `applicability=not_applicable`, rationale, dan approval pada evidence record. Statusnya dicatat `passed` hanya setelah approver mengonfirmasi bahwa criterion memang tidak berlaku; criterion tidak boleh sekadar dihilangkan.

## 6. Level 2 — Subsystem Done

### 6.1 Curriculum dan Content (`SUB-CONTENT`)

Subsystem Curriculum dan Content Done jika:

1. graph 6 stage, 24 unit, dan 120 lesson package mempunyai ID, version, outcome, prerequisite, ceiling, assignment target, checkpoint, serta migration behavior yang valid;
2. baseline 300 jam dapat direproduksi sebagai 600 slot 30 menit tanpa menjadikannya janji kelulusan;
3. inventory berjumlah tepat 900 Vocabulary, 110 Kanji, dan 90 Grammar sesuai unit penghitungan masing-masing;
4. tersedia tepat 190 Reading object dan 210 Listening object dengan distribution, question, answer, rationale, evidence mapping, difficulty, rights, dan accessibility metadata yang disetujui;
5. S0 mempunyai 100 Vocabulary, 0 Kanji baru, 0 Grammar formal baru, 46 Reading object, dan 44 Listening object; 46 hiragana serta 46 katakana dasar tercakup;
6. setiap required KC memenuhi minimum tiga encounter, dua activity type/evidence type, stimulus bervariasi, delayed evidence, dan Content Masterability Contract;
7. setiap Kanji mempunyai approved vector stroke animation dan static fallback; tracing/animation hanya exposure dan tidak menaikkan mastery;
8. seluruh audio mempunyai master/delivery asset, transcript, checksum, rights, loudness/peak, device QA, serta replay/transcript policy;
9. seluruh materi melalui lifecycle, mandatory validation, separation of duties, versioning, dan publication pack yang atomik;
10. schema, graph, coverage, distribution, reference, asset integrity, answer leakage, rights, dan compatibility validators lulus;
11. quarantine, correction, adjudication, migration, rollback, dan post-publication monitoring dapat dijalankan tanpa menulis ulang evidence historis;
12. Academic Lead, Content Operations, Accessibility, Rights, dan Technical/Data memberikan sign-off.

Evidence minimum: approved inventory/blueprint manifests, validator report, rights manifest, platform QA matrix, review receipts, content coverage report, release manifest, dan rollback drill.

### 6.2 Learning dan Mastery (`SUB-LEARNING`)

Subsystem Learning/Mastery Done jika:

1. schema versioned untuk evidence, encounter, KC state, diagnostic dimension, policy, aggregate, review schedule, gate, readiness snapshot, dan decision log tersedia;
2. registry KC, activity/evidence type, misconception, remedial, dan reason code tersedia untuk seluruh domain;
3. klasifikasi `required`, `supporting`, dan `enrichment` lengkap; hanya `required` menjadi denominator readiness;
4. Mastery Policy v1 dan LevelMasteryProfile N5 lengkap, versioned, deterministic, dapat di-recalculate, dan dapat di-rollback;
5. exposure/completion tidak menaikkan mastery, supporting-only evidence tidak memenuhi sufficiency, dan `mastered` memerlukan delayed evidence minimal tujuh hari;
6. hard prerequisite, critical misconception, critical weakness, domain floor, dan missing evidence fail closed;
7. placement, verification, review, remedial, session assembly, calendar replan, progression, gate, dan readiness menghasilkan reason code serta decision hash;
8. input dan version sama menghasilkan output sama; duplicate/stale events tidak mengubah state dua kali;
9. AI outage atau low-confidence evaluation tidak menghasilkan mastery penalty atau keputusan akademik baru;
10. seluruh acceptance fixtures Learning Engine dan Mastery Specification lulus, termasuk historical replay;
11. dashboard dapat menelusuri item → evidence → KC → aggregate → gate/readiness;
12. Academic Lead, Product Owner, Engineering/Data, Accessibility/Fairness, dan Security/Privacy memberikan sign-off.

### 6.3 Practice (`SUB-PRACTICE`)

Subsystem Practice Done jika:

1. schema versioned PracticeRun, ActivityDefinition, ActivityInstance, Attempt, Submission, EvaluationResult, FeedbackRelease, dan PracticeEvent tersedia;
2. interaction/activity registry mencakup seluruh domain dan memisahkan konstruk dari presentation;
3. locked instance, stable IDs, seeded shuffle/materialization, answer policy, evaluator version, dan manifest hash dapat direproduksi;
4. multiple choice, matching, ordering, cloze, Japanese input/IME, Kana composer, drag alternative, audio, Reading multi-question, dan Kanji animation memenuhi contract;
5. objective response dinilai deterministik; AI hanya boleh menilai semi-open response dengan approved rubric serta safe pending fallback;
6. attempt, hint, skip, reveal, retry, replay, navigation, timer, feedback release, offline, resume, concurrency, dan sync mengikuti locked policy;
7. technical failure tidak menjadi jawaban salah, preview internal tidak menghasilkan learner evidence, dan post-reveal activity tidak menghasilkan mastery evidence;
8. offline package ditandatangani, memiliki local evaluator yang kompatibel, expiry/checksum, idempotent queue, sync receipt, serta conflict recovery;
9. accessibility matrix, security/privacy review, end-to-end fixtures, audit dashboard, alerts, dan incident/adjudication/rollback runbook tersedia;
10. Practice, Academic/Assessment, Engineering, Accessibility, Security/Privacy, dan Operations memberikan sign-off.

### 6.4 Assessment (`SUB-ASSESSMENT`)

Subsystem Assessment Done jika:

1. schema dan versioned blueprint tersedia untuk placement, verification, unit/stage checkpoint, cumulative review, dan simulation;
2. sedikitnya dua approved equivalent simulation form tersedia, masing-masing tepat 67 scored items: 21 Vocabulary, 22 Grammar–Reading, dan 24 Listening;
3. timer section adalah 20, 40, dan sekitar 30 menit dengan total active test time 90 menit;
4. kedua form tidak memiliki stimulus overlap, memenuhi quota item type, serta mempunyai approved form-equivalence evidence;
5. simulation memakai deterministic 0/1 scoring, dua scoring group, calculation hash, locked manifest, single scored attempt, dan feedback hold;
6. readiness memerlukan dua form berbeda dengan weighted accuracy minimal 0,70, floor minimal 0,60 pada masing-masing scoring group, serta seluruh syarat Mastery Specification;
7. Listening linear, satu playback, tanpa learner transcript/replay; failure teknis menuju adjudication dan bukan skor salah;
8. resume/grace, concurrency, invalidation, adjudication, retake, exposure control, authorization, dan answer secrecy diuji;
9. accessibility/fairness matrix serta seluruh minimum fixture Assessment Specification lulus;
10. audit dashboard menelusuri blueprint → form → run → item → result → evidence → gate/readiness;
11. calibration plan, baseline report, security/privacy review, incident runbook, dan rollback tersedia;
12. Assessment Lead, Academic Lead, Engineering, Accessibility/Fairness, Security/Privacy, dan Product Owner memberikan sign-off.

### 6.5 Learner UI (`SUB-LEARNER-UI`)

Subsystem Learner UI Done jika:

1. seluruh P0 learner journey dari guest onboarding sampai readiness mempunyai screen, route, state, event, recovery, dan acceptance test;
2. Beranda, Belajar, Jadwal, dan Progres konsisten di supported viewport; focused practice/assessment menyembunyikan global navigation;
3. goal dan availability dapat disimpan sebagai guest draft, sedangkan placement atau initial-plan save mewajibkan account;
4. completion, mastery, readiness, XP, streak, dan achievement tidak dicampur;
5. locked prerequisite, review due, remedial, target risk, pending evaluation, active run, offline/sync, dan content issue dapat ditemukan dan dipahami;
6. assessment UI mempertahankan locked manifest, server-authoritative timer, feedback hold, integrity state, dan larangan scaled-score claim;
7. seluruh mutation mempunyai loading, idempotent retry, success receipt, stale/conflict handling, dan input preservation yang aman;
8. analytics tidak menyimpan credential, raw answer, atau detail accessibility sensitif;
9. screen-level, practice-interaction, content/microcopy, responsive, dan accessibility acceptance tests lulus;
10. Product, Design, Engineering, Academic/Assessment, Accessibility, dan Security/Privacy memberikan sign-off.

### 6.6 Content Operations (`SUB-OPS-UI`)

Subsystem Content Operations Done jika:

1. Dashboard, Konten, Review, Rilis, Masalah, dan Audit tersedia dalam surface terpisah dengan staff allowlist dan backend RBAC;
2. role, permission, assignment, active role, authority, dan separation-of-duties policy tersedia sebagai fixture atau policy machine-readable;
3. draft autosave tidak mengubah lifecycle; published version tidak diedit in place; optimistic revision menolak stale write;
4. mandatory failure atau `not_tested` memblokir approval/publication dan author tidak menjadi sole approver;
5. publish, quarantine, adjudication, migration, rollback, serta access change mengunci target/version, confirmation, receipt, authority, dan recovery;
6. release manifest atomik, idempotent, dan menunjuk exact compatible versions;
7. preview terisolasi, berlabel non-evidence, dan tidak menghasilkan learner event/analytics;
8. audit merekam actor, active role, authority, version, input, output, reason, timestamp, dan missing-data gap tanpa inferensi;
9. security, privacy, accessibility, narrow-viewport, conflict, export, dan recovery fixtures lulus;
10. Content Operations, Academic, Engineering, Accessibility, Security/Privacy, dan Product Owner memberikan sign-off.

### 6.7 Design System dan Accessibility (`SUB-ACCESSIBILITY`)

Subsystem Design System/Accessibility Done jika:

1. semantic dan component tokens, typography Jepang–Indonesia, responsive rules, component states, interaction targets, motion, iconography, serta theme policy tersedia dan berversi;
2. design dan code memakai nama variant/property yang selaras dan mempunyai usage/anti-pattern documentation;
3. setiap component relevan mempunyai loading, empty, error, long-content, keyboard, screen-reader, focus, responsive, reduced-motion, dan visual-regression coverage;
4. seluruh P0/P1 scope yang didukung memenuhi WCAG 2.2 AA; AAA hanya aspiratif dan tidak diklaim sebagai conformance penuh;
5. tidak ada accessibility defect `blocker` atau `critical`; `major` hanya dapat memakai exception time-bound jika critical journey tetap aman;
6. state tidak bergantung pada warna, target utama minimal 44×44 CSS px, text resize 200% dan reflow 400% lulus;
7. Windows Chrome/Edge + NVDA, Windows Firefox sampling, macOS/iOS Safari + VoiceOver, dan Android Chrome + TalkBack diuji sesuai platform matrix version;
8. Japanese IME, Kana composer, furigana, glyph, audio, forced colors, reduced motion, soft keyboard, orientation, long/malformed content, serta slow-network recovery diuji;
9. alternative interaction mempunyai construct-equivalence classification dan tidak membocorkan jawaban melalui DOM, ARIA, alt text, asset, atau event;
10. Design, Engineering, Accessibility, Academic/Assessment, dan Product memberikan sign-off.

### 6.8 Platform dan Operations (`SUB-PLATFORM`)

Subsystem Platform/Operations Done jika:

1. bounded module mempunyai owner, public contract, schema ownership, dependency rule, dan test boundary;
2. PostgreSQL tetap menjadi sumber kebenaran bisnis; outbox/inbox, idempotency, optimistic concurrency, immutable correction, version/hash convention, dan authorization boundaries diuji;
3. objective journey tetap berjalan saat AI gagal dan semi-open response masuk pending tanpa mastery penalty;
4. assessment form, signed asset/offline package, content quarantine, exact-version loading, dan rollback pointer mempertahankan integrity;
5. observability, alert, SLI/SLO yang disetujui, on-call ownership, incident classification, dan dashboard tersedia untuk alur P0;
6. deployment, secret boundary, least privilege, provider isolation, data export/deletion, legal hold, purge, dan audit access diverifikasi;
7. migration diuji forward/compatibility/restore; backup restore dan rollback drill berhasil pada production-like environment;
8. failure injection mencakup AI timeout/invalid schema, duplicate delivery, stale revision, database interruption, audio/object-storage failure, queue retry/DLQ, identity webhook replay, offline conflict, expired package, dan cache loss;
9. load/connection testing, slow-network/reconnect, security review, privacy review, dan production runbook lulus;
10. Engineering, Data, Operations, Security/Privacy/Legal, Accessibility, dan Product Owner memberikan sign-off.

## 7. Level 3 — MVP Production Release Done

### 7.1 Product dan journey gate (`REL-PRODUCT`)

- Learner dapat menentukan tujuan, tanggal target, ketersediaan, dan durasi belajar.
- Pemula absolut dapat mulai U01 tanpa placement panjang; learner berpengalaman mendapat placement dan verification yang aman.
- Learner memperoleh plan dan jadwal adaptif, menyelesaikan sesi materi/practice/feedback, lalu menerima sesi berikutnya berdasarkan evidence.
- Missed session menghasilkan replan tanpa mastery penalty dan tanpa replacement load otomatis di atas 125% durasi normal.
- Learner dapat melihat completion, mastery, readiness, progres domain, dan gamification sebagai konsep terpisah.
- Content issue dapat dilaporkan tanpa kehilangan state atau perubahan score spekulatif.
- Seluruh P0 learner dan Content Operations journeys lulus E2E pada production-like environment.

### 7.2 Academic dan content gate (`REL-CONTENT`)

- `SUB-CONTENT` dan `SUB-LEARNING` berstatus `passed`.
- Seluruh angka target, distribution, prerequisite, requiredness, content pool, rights, asset, approval, dan release manifest dapat direproduksi.
- Seluruh format resmi N5 yang dicakup Reading, Listening, Grammar, dan simulation terwakili sebelum simulation pertama.
- Tidak ada item `draft`, `revision_required`, `rejected`, `quarantined`, `deprecated-unsafe`, unlicensed, atau incompatible dalam release manifest.
- Dua simulation form ekuivalen telah disetujui dan seluruh readiness prerequisite aktif.

### 7.3 Engineering dan integration gate (`REL-ENGINEERING`)

- Seluruh delapan subsystem gate berstatus `passed` untuk release candidate yang sama.
- Static, unit, determinism/property, contract, integration, E2E, content-build, accessibility, security, failure, load, migration, dan restore suites lulus.
- Input/version sama menghasilkan session, evaluation, mastery, assessment score, readiness, dan decision hash yang sama.
- Duplicate submit/webhook/job/offline event tidak menggandakan attempt, score, evidence, atau decision.
- Tidak ada stale write, last-write-wins pada state kritis, history rewrite, answer leakage, atau cross-learner authorization failure.
- Release candidate memakai exact compatible schema, curriculum, content, policy, evaluator, asset, dan manifest versions.

### 7.4 Accessibility dan fairness gate (`REL-ACCESSIBILITY`)

- `SUB-ACCESSIBILITY` berstatus `passed` untuk platform matrix release yang dikunci.
- Tidak ada blocker atau critical accessibility defect terbuka.
- Keyboard-only, NVDA, VoiceOver, TalkBack, zoom 200%, reflow 400%, forced colors, reduced motion, Japanese IME, Kana composer, audio, dan alternative interaction lulus pada scope yang berlaku.
- Assessment accommodation diterapkan server-side sesuai approved profile dan tidak mengubah konstruk secara diam-diam.
- Hidden assessment content tidak dikirim, dirender, masuk accessibility tree, atau terekspos melalui analytics/event.
- Fairness review tidak menemukan bias kritis yang tidak dimitigasi pada item, modality, speaker, platform, atau accommodation.

### 7.5 Security, privacy, dan rights gate (`REL-TRUST`)

- Threat model P0, authorization, least privilege, session/provider policy, asset sanitization, signed package, answer secrecy, audit access, dan abuse guardrail lulus.
- Retention, deletion, export, legal hold, purge, backup, AI data handling, dan provider retention policy telah disetujui.
- Raw response dan learner data mengikuti data minimization serta pseudonymous analytics policy.
- Seluruh content/audio/image/vector/font mempunyai rights, consent, provenance, checksum, dan attribution yang diperlukan.
- Tidak ada production secret pada pull-request build, test fixture, client bundle, log, atau analytics payload.

### 7.6 Reliability dan operations gate (`REL-OPERATIONS`)

- RPO, RTO, backup retention, SLI/SLO, alert threshold, on-call owner, escalation, dan incident severity telah disetujui.
- Backup restore, rollback, migration, provider-failure, slow-network/reconnect, queue/DLQ, offline conflict, dan cache-loss drill berhasil pada production-like environment.
- Runbook tersedia untuk incident, content quarantine/correction, assessment adjudication/invalidation, migration, rollback, data request, dan provider outage.
- Dashboard menghubungkan release → manifest → run → event/evidence → learner decision tanpa mengekspos data sensitif.
- Rollback target tervalidasi, compatible, dan dapat dipulihkan tanpa menulis ulang historical evidence.

### 7.7 Production sign-off (`REL-SIGNOFF`)

Rilis hanya Done setelah tersedia sign-off yang dapat diaudit dari:

| Peran | Area approval minimum |
| --- | --- |
| Product Owner | Scope, out-of-scope, risk acceptance, readiness claim, dan keputusan final rilis. |
| Academic Lead | Curriculum, inventory, language accuracy, prerequisite, requiredness, mastery, dan content coverage. |
| Assessment Lead | Blueprint, form equivalence, scoring, integrity, fairness, dan readiness input. |
| Content Operations | Review workflow, publication manifest, rights record, quarantine, correction, dan rollback konten. |
| Engineering Lead | Architecture, contracts, integration, tests, migrations, determinism, dan build artifact. |
| Accessibility Lead | WCAG 2.2 AA, assistive-technology matrix, construct-equivalence, dan exception status. |
| Security/Privacy/Legal | Threat model, data policy, provider handling, retention, rights, dan legal constraints. |
| Operations Lead | Deployment, observability, RPO/RTO, backup/restore, runbook, on-call, dan rollback drill. |

Satu orang boleh memegang beberapa peran hanya jika authority matrix mengizinkan. Separation of duties tetap wajib untuk author/reviewer/approver konten dan tindakan high-risk.

## 8. Registry Fail-Closed Blocker

Seluruh item berikut berstatus `blocked` sampai decision record dan approval yang disebutkan tersedia. Rekomendasi dalam dokumen sumber bukan approval.

| Blocker ID | Keputusan yang diperlukan | Owner/approver | Gate terdampak | Evidence untuk membuka blocker | Perilaku sebelum diputuskan |
| --- | --- | --- | --- | --- | --- |
| `BLK-PRIV-001` | Durasi retensi raw response, telemetry, audit, AI trace, dan backup. | Privacy/Legal + Security + Product | `SUB-PLATFORM`, `REL-TRUST`, `REL-OPERATIONS` | Approved retention schedule, deletion/export/legal-hold policy, provider mapping. | Production release diblokir; TTL tidak diberi angka asumtif. |
| `BLK-CONTENT-001` | Klasifikasi `required/supporting/enrichment` seluruh 900 Vocabulary dan target domain terkait. | Academic/Content + Product | `SUB-CONTENT`, `SUB-LEARNING`, `REL-CONTENT` | Approved classification manifest dan LevelMasteryProfile N5. | Readiness dan release terkait fail closed. |
| `BLK-PLATFORM-001` | Platform, browser, OS, device, font/glyph, audio, dan assistive-technology matrix final (`ACC-OPEN-001`). | Product + Engineering + Accessibility | `SUB-ACCESSIBILITY`, `SUB-CONTENT`, `REL-ACCESSIBILITY` | Numbered platform matrix dan QA result. | Affected journey tidak dapat dinyatakan supported atau Done. |
| `BLK-ASSESS-001` | Accommodation assessment MVP dan construct-equivalence setiap alternatif (`ACC-OPEN-002`). | Academic/Assessment + Accessibility + Product | `SUB-ASSESSMENT`, `SUB-ACCESSIBILITY`, `REL-ACCESSIBILITY` | Approved accommodation profiles, server policy, equivalence/fairness test. | Accommodation tidak diimprovisasi; affected assessment release diblokir. |
| `BLK-OPS-001` | RPO, RTO, backup retention, restore target, dan incident ownership final. | Operations + Security + Product | `SUB-PLATFORM`, `REL-OPERATIONS` | Approved objectives dan successful production-like restore drill. | Production release diblokir. |
| `BLK-AI-001` | Data learner yang boleh dikirim, provider retention, regional handling, logging, dan deletion untuk evaluator AI. | Privacy/Legal + Security + Product | `SUB-PRACTICE`, `SUB-PLATFORM`, `REL-TRUST` | Approved data-flow/threat model dan provider configuration evidence. | Semi-open AI evaluation untuk data learner dinonaktifkan; objective path harus tetap berjalan. |
| `BLK-PROG-001` | Posisi 40 Vocabulary dan 4 Grammar S5: tetap, dipindah, atau non-required. | Academic/Content + Product | `SUB-CONTENT`, `REL-CONTENT` | Versioned progression decision dan updated manifests. | Draft progression/content pack tidak dapat `approved`. |
| `BLK-PROG-002` | Apakah lima lesson package per unit terlihat pada learner UI atau hanya struktur authoring. | Product + Design + Academic | `SUB-CONTENT`, `SUB-LEARNER-UI`, `REL-PRODUCT` | Approved IA/screen decision dan acceptance fixture. | Affected navigation/screen tidak dapat dinyatakan Done. |
| `BLK-ASSESS-002` | Simulation assembly final, quota/item pool, replay instruction, dan approved reference form. | Assessment + Academic + Product | `SUB-ASSESSMENT`, `REL-CONTENT` | Approved versioned blueprint, form manifests, equivalence report. | Simulation/readiness production diblokir. |
| `BLK-OFFLINE-001` | Activation UX offline package: transparent preload, manual control, consent, storage, dan failure presentation (`UX-OPEN-007`). | Product + Engineering + Design + Privacy | `SUB-PRACTICE`, `SUB-LEARNER-UI`, `REL-PRODUCT` | Approved flow/screen policy dan E2E fixtures. | Offline journey tetap unavailable atau blocked; tidak ada silent download asumtif. |
| `BLK-DRAFT-001` | Retensi, enkripsi, export, dan deletion draft internal ketika save gagal lintas-refresh (`OPS-OPEN-003`). | Security/Privacy + Content Operations + Product | `SUB-OPS-UI`, `REL-TRUST` | Approved local-draft policy dan recovery/security tests. | Draft tidak dipersist lintas-refresh tanpa policy; UI harus menjelaskan keterbatasan. |
| `BLK-KANA-001` | Layout final Kana composer dan hasil validasi prototype. | Design + Accessibility + Academic + Engineering | `SUB-PRACTICE`, `SUB-LEARNER-UI`, `SUB-ACCESSIBILITY` | Approved prototype, character availability audit, keyboard/screen-reader/IME tests. | Composer tidak production-ready; activity memakai OS IME atau approved replacement. |
| `BLK-KANA-002` | Apakah input method terakhir disimpan serta batas compatibility dan privacy-nya. | Product + Design + Privacy | `SUB-PRACTICE`, `SUB-LEARNER-UI` | Approved preference policy dan fallback tests. | Preference tidak disimpan; activity memakai default allowed method. |
| `BLK-AT-001` | Apakah JAWS menjadi regression matrix rutin berdasarkan target-user/contract data (`ACC-OPEN-003`). | Product + Accessibility | `SUB-ACCESSIBILITY`, `REL-ACCESSIBILITY` | Target-user decision dan updated platform matrix. | JAWS tetap P1 sampling; tidak boleh diklaim supported rutin. |

Pertanyaan kalibrasi yang secara eksplisit harus dijawab melalui data MVP—misalnya bobot mastery, interval review, threshold coverage, jumlah variasi speaker, atau difficulty drift—tidak memblokir rilis v1 apabila baseline versioned pada dokumen sumber telah diterapkan, diuji, dan disetujui. Perubahan hasil kalibrasi wajib melalui proposal versi, academic/fairness review, migration impact, dan Product Owner approval.

## 9. Rekonsiliasi Keputusan Lintas-Dokumen

Tabel berikut mencegah pertanyaan lama diperlakukan sebagai blocker jika sudah ditetapkan oleh dokumen turunan yang lebih spesifik.

| Topik/ID awal | Status DoD | Sumber resolusi | Keputusan yang berlaku |
| --- | --- | --- | --- |
| Viewport dan pemisahan surface (`UX-OPEN-001`, `UX-OPEN-002`) | `resolved` | [Information Architecture](../ui-ux/02-information-architecture.md) dan screen specifications | Learner responsive mobile-first; Content Operations desktop-first dan terpisah secara navigation/permission. |
| Waktu serta metode autentikasi (`IA-OPEN-001`, `FLOW-OPEN-001`, `UX-OPEN-004`) | `resolved` | [Learner Screen Specifications](../ui-ux/04-screen-specifications-learner.md) dan [Technical Architecture](./technical-architecture.md) | Guest boleh mengisi goal/availability; account wajib sebelum placement/initial-plan save. Clerk menyediakan identity, backend memiliki authorization. |
| Guest onboarding draft (`FLOW-OPEN-002`, `SCREEN-OPEN-001`) | `resolved` | [Technical Architecture](./technical-architecture.md) dan screen specification | Disimpan maksimal tujuh hari dan dimigrasikan aman setelah autentikasi. |
| Bottom navigation detail lesson (`IA-OPEN-002`, `FLOW-OPEN-003`) | `resolved` | [Learner Screen Specifications](../ui-ux/04-screen-specifications-learner.md) | Tetap terlihat saat eksplorasi; disembunyikan dalam focused runtime. |
| Posisi achievement (`IA-OPEN-003`, `FLOW-OPEN-004`) | `resolved` | [Learner Screen Specifications](../ui-ux/04-screen-specifications-learner.md) | Subsection Progres; hanya milestone penting tampil ringkas di Beranda. |
| Free practice lesson selesai (`IA-OPEN-004`, `FLOW-OPEN-005`) | `resolved` | [Learner Screen Specifications](../ui-ux/04-screen-specifications-learner.md) dan Practice Engine | Hanya tersedia jika Learning Engine menyatakan eligible dan dampak evidence dijelaskan. |
| Satu workspace (`IA-OPEN-005`, `OPS-OPEN-002`) | `resolved` | [Technical Architecture](./technical-architecture.md) | Content Operations memakai satu workspace pada MVP. |
| Preview interaktif (`IA-OPEN-006`, `FLOW-OPEN-006`) | `resolved` | [Content Operations Screen Specifications](../ui-ux/05-screen-specifications-content-ops.md) | Preview penuh di lingkungan internal, berlabel non-evidence dan role-restricted. |
| Internal user multi-role (`OPS-OPEN-001`) | `resolved` | [Technical Architecture](./technical-architecture.md) | Staf dapat memiliki beberapa role; setiap tindakan merekam active role dan authority. |
| Kana composer tersedia (`OPS-OPEN-004`) | `resolved` | [Practice Interactions](../ui-ux/06-practice-interactions.md) | Tersedia secara policy-driven dengan semantics `equivalent`, `support_adjusted`, `practice_only`, atau `unavailable`; layout final tetap `BLK-KANA-001`. |
| Playback speed scored Listening (`OPS-OPEN-005`, `INTERACTION-002`) | `resolved` | [Practice Interactions](../ui-ux/06-practice-interactions.md) | Tidak tersedia kecuali blueprint mengizinkan dan equivalence tervalidasi. |
| Romaji toggle (`OPS-OPEN-006`, `INTERACTION-003`) | `resolved` | [Practice Interactions](../ui-ux/06-practice-interactions.md) | Policy-driven per stage/activity; bukan global override. |
| Reminder selain in-app (`UX-OPEN-005`, `SCREEN-OPEN-003`) | `out_of_scope` | [Technical Architecture](./technical-architecture.md) | Reminder MVP hanya in-app; email/web push memerlukan scope dan policy baru. |
| Marketing/public surface (`UX-OPEN-008`) | `out_of_scope` | [Product Overview](./product-overview.md) | Tidak menjadi bagian product app MVP. |
| Feedback resolusi laporan konten (`FLOW-OPEN-007`, `SCREEN-OPEN-007`) | `resolved` | [Learner Screen Specifications](../ui-ux/04-screen-specifications-learner.md) | Notifikasi in-app hanya untuk correction/adjudication yang relevan kepada learner. |
| Mascot dan WCAG (`UX-OPEN-003`, `UX-OPEN-006`, `SCREEN-OPEN-004`, `SCREEN-OPEN-005`) | `resolved` | [Design System](../ui-ux/07-design-system.md) dan [Accessibility Specification](../ui-ux/08-accessibility-content-and-edge-cases.md) | Calm kawaii cat companion; WCAG 2.2 AA wajib dan AAA hanya aspiratif. |
| Email-link policy (`SCREEN-OPEN-002`) | `resolved` | [Learner Screen Specifications](../ui-ux/04-screen-specifications-learner.md) | UI memakai provider policy, membaca nilai server, dan mewajibkan browser asal. |
| Autentikasi Content Operations (`SCREEN-OPEN-006`) | `resolved` | [Content Operations Screen Specifications](../ui-ux/05-screen-specifications-content-ops.md) | Google OAuth melalui Clerk, tanpa self-registration/email link internal, dengan staff allowlist dan backend RBAC. |

Item `blocked` pada Bagian 8 tidak boleh dipindahkan menjadi `resolved` hanya karena tabel sumber memuat rekomendasi. Diperlukan decision record dan approval sesuai kontrak gate.

## 10. Source Traceability Matrix

Matriks ini mencakup seluruh 23 dokumen Markdown yang ada di `docs` pada saat penyusunan.

| No. | Dokumen sumber | Kontribusi normatif | Gate utama |
| --- | --- | --- | --- |
| 1 | [Beginner Foundations N5](../content/beginner-foundations-n5.md) | S0, kana/sound, scaffolding, gate S0, content QA. | `SUB-CONTENT`, `REL-CONTENT` |
| 2 | [Content Progression N5](../content/content-progression-n5.md) | 6 stage, 24 unit, 120 lesson, 300 jam, progression, publication dependencies. | `SUB-CONTENT`, `REL-CONTENT` |
| 3 | [Grammar Inventory N5](../content/grammar-inventory-n5.md) | 90 Grammar, explanation, evidence, rubric, lifecycle. | `SUB-CONTENT`, `SUB-LEARNING` |
| 4 | [Kanji Inventory N5](../content/kanji-inventory-n5.md) | 110 Kanji, reading-in-word, stroke assets, tracing semantics. | `SUB-CONTENT`, `SUB-PRACTICE` |
| 5 | [Listening Blueprints N5](../content/listening-blueprints-n5.md) | 210 Listening objects, audio QA, transcript/replay, evidence. | `SUB-CONTENT`, `SUB-ASSESSMENT` |
| 6 | [Reading Blueprints N5](../content/reading-blueprints-n5.md) | 190 Reading objects, coverage, layout, evidence, rights. | `SUB-CONTENT`, `SUB-ASSESSMENT` |
| 7 | [Vocabulary Inventory N5](../content/vocabulary-inventory-n5.md) | 900 Vocabulary, lemma–sense counting, context, relations, lifecycle. | `SUB-CONTENT`, `SUB-LEARNING` |
| 8 | [Assessment Specification N5](./assessment-specification-n5.md) | Assessment layers, 67-item forms, scoring, integrity, fixtures, DoD. | `SUB-ASSESSMENT`, `REL-CONTENT` |
| 9 | [Content Validation Rubric](./content-validation-rubric.md) | Mandatory gates, scoring, authority, waiver, publication, quarantine. | `SUB-CONTENT`, `SUB-OPS-UI` |
| 10 | [Curriculum Architecture](./curriculum-architecture.md) | Academic scope, outcomes, curriculum graph, pipeline, governance. | `SUB-CONTENT`, `SUB-LEARNING` |
| 11 | [Learning Engine](./learning-engine.md) | Placement, sequencing, session, calendar, remedial, readiness execution. | `SUB-LEARNING`, `REL-PRODUCT` |
| 12 | [Mastery Specification](./mastery-specification.md) | Evidence, mastery, aggregation, retention, readiness, fixtures, DoD. | `SUB-LEARNING`, `SUB-ASSESSMENT` |
| 13 | [Practice Engine](./practice-engine.md) | Runtime, interaction/evaluation, feedback, evidence, reliability, DoD. | `SUB-PRACTICE`, `REL-ENGINEERING` |
| 14 | [Product Overview](./product-overview.md) | Visi, pengguna, fitur/batas MVP, metrics, product success. | `REL-PRODUCT`, `REL-SIGNOFF` |
| 15 | [Technical Architecture](./technical-architecture.md) | System/data/API architecture, delivery, tests, blockers, operations DoD. | `SUB-PLATFORM`, seluruh release gate |
| 16 | [UI/UX Overview](../ui-ux/01-ui-ux-overview.md) | Experience principles, actor journeys, UI/UX scope dan success. | `SUB-LEARNER-UI`, `SUB-OPS-UI` |
| 17 | [Information Architecture](../ui-ux/02-information-architecture.md) | Surface, navigation, sitemap, hierarchy, route concepts. | `SUB-LEARNER-UI`, `SUB-OPS-UI` |
| 18 | [User Flows](../ui-ux/03-user-flows.md) | P0 flows, branches, failure/recovery, handoff, flow acceptance. | `REL-PRODUCT`, `REL-ENGINEERING` |
| 19 | [Learner Screen Specifications](../ui-ux/04-screen-specifications-learner.md) | Learner screen/state/data/action/accessibility contracts. | `SUB-LEARNER-UI`, `REL-PRODUCT` |
| 20 | [Content Operations Screen Specifications](../ui-ux/05-screen-specifications-content-ops.md) | Internal access, authoring, review, release, audit, screen DoD. | `SUB-OPS-UI`, `REL-TRUST` |
| 21 | [Practice Interactions](../ui-ux/06-practice-interactions.md) | Interaction semantics, IME, audio, alternatives, UI state, DoD. | `SUB-PRACTICE`, `SUB-ACCESSIBILITY` |
| 22 | [Design System](../ui-ux/07-design-system.md) | Visual tokens, components, responsive behavior, governance, QA. | `SUB-ACCESSIBILITY`, `SUB-LEARNER-UI` |
| 23 | [Accessibility, Content, and Edge Cases](../ui-ux/08-accessibility-content-and-edge-cases.md) | WCAG policy, AT matrix, edge cases, severity, release gate. | `SUB-ACCESSIBILITY`, `REL-ACCESSIBILITY` |

Acceptance criteria dan DoD yang tersebar pada dokumen sumber tetap berlaku. Dokumen ini mengagregasikan serta menentukan level kelulusannya; ia tidak menghapus criterion yang lebih spesifik.

## 11. Acceptance Scenarios untuk DoD

Implementasi proses DoD wajib menghasilkan keputusan berikut:

1. **Feature lulus lokal tetapi integration gagal:** `INC-TEST=failed`; feature bukan Done.
2. **Feature Done tetapi dependency subsystem belum lengkap:** feature dapat Done; subsystem dan release tetap belum Done.
3. **Semua subsystem teknis lulus tetapi target konten belum lengkap:** `SUB-CONTENT` dan `REL-CONTENT` gagal atau blocked; release bukan Done.
4. **Accessibility critical defect terbuka:** `SUB-ACCESSIBILITY` dan `REL-ACCESSIBILITY` gagal; exception dilarang.
5. **Dua simulation form tersedia tetapi tidak ekuivalen atau stimulus overlap:** `SUB-ASSESSMENT` gagal; readiness production diblokir.
6. **Privacy/retention policy belum disetujui:** `BLK-PRIV-001=blocked`; production release diblokir.
7. **AI evaluator gagal:** objective journey tetap berjalan; semi-open response menjadi pending tanpa mastery penalty. Jika fallback tidak bekerja, subsystem Practice gagal.
8. **Duplicate submission menghasilkan dua evidence event:** `INC-INTEGRITY`, `SUB-PRACTICE`, dan `REL-ENGINEERING` gagal.
9. **Backup dibuat tetapi restore drill gagal:** `SUB-PLATFORM` dan `REL-OPERATIONS` gagal; release diblokir.
10. **Rollback content berhasil tetapi evidence historis ditulis ulang:** `SUB-CONTENT`, `SUB-LEARNING`, dan `REL-ENGINEERING` gagal.
11. **Mandatory content criterion gagal tetapi quality score tinggi:** content tetap gagal; skor tidak mengkompensasi mandatory gate.
12. **Accommodation membantu akses tetapi mengubah konstruk tanpa equivalence:** affected activity/assessment tidak menghasilkan scored evidence dan release scope terkait blocked.
13. **Evidence test berasal dari release candidate lama:** gate kembali `not_started` sampai compatibility dibuktikan atau test diulang.
14. **Seluruh gate passed tetapi satu sign-off wajib belum ada:** `REL-SIGNOFF=blocked`; release bukan Done.

## 12. Checklist Keputusan Rilis

Release Manager hanya boleh menandai MVP Production Release Done jika seluruh item berikut dapat dijawab **ya** dengan evidence link:

- [ ] Semua `INC-*` yang masuk release candidate `passed`.
- [ ] Semua `SUB-*` untuk release candidate yang sama `passed`.
- [ ] Semua `REL-*` `passed`.
- [ ] Semua `BLK-*` yang memengaruhi release berstatus resolved melalui decision record dan approval.
- [ ] Tidak ada blocker/critical defect terbuka.
- [ ] Release manifest mengunci seluruh exact compatible versions.
- [ ] Content, assessment form, rights, requiredness, dan platform matrix lengkap.
- [ ] Security/privacy/accessibility/fairness review lulus.
- [ ] Backup restore, rollback, migration, dan failure drill lulus.
- [ ] Dashboard, alerts, on-call, dan runbook aktif.
- [ ] Seluruh production sign-off tersedia dan dapat diaudit.

Jika satu jawaban adalah tidak, tidak diketahui, atau tidak dapat dibuktikan, status release adalah `failed` atau `blocked`, bukan Done.
