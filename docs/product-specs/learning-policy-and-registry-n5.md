# Learning Policy and Registry N5 — Nekoru

**Status:** Approved v1.0 untuk baseline policy dan registry  
**Tanggal:** 13 September 2026  
**Pemilik:** Academic/Learning Science dan Engineering  
**Required reviewers:** Product, Assessment, Content, Data, Accessibility, Privacy, dan QA  
**Cakupan:** Policy dan registry generik U01–U24; konfigurasi aktif pertama untuk U01 online-only

## 1. Tujuan

Dokumen ini menerjemahkan Learning Engine, Mastery Specification, Practice Engine, dan Assessment Specification menjadi konfigurasi versioned yang dapat dijalankan. Ia menetapkan:

1. registry Knowledge Component, diagnostic dimension, activity type, evidence type, misconception, dan reason code;
2. `MasteryPolicy`, `ReviewPolicy`, `SchedulerPolicy`, `PracticePolicy`, dan `ReadinessPolicy`;
3. aturan validasi, compatibility, publication, dan rollback policy;
4. policy subset yang aktif pada Milestone 1 U01;
5. batas keputusan yang tetap fail-closed.

Dokumen ini tidak berisi seluruh inventory konten. Registry menentukan bahasa dan aturan yang sah; content manifest menentukan entry konkret yang tersedia.

## 2. Dokumen Sumber

- [Implementation Readiness](./implementation-readiness.md)
- [Domain Model and Schemas](./domain-model-and-schemas.md)
- [Curriculum Architecture](./curriculum-architecture.md)
- [Learning Engine](./learning-engine.md)
- [Mastery Specification](./mastery-specification.md)
- [Practice Engine](./practice-engine.md)
- [Assessment Specification N5](./assessment-specification-n5.md)
- [Beginner Foundations N5](../content/beginner-foundations-n5.md)
- [Content Progression N5](../content/content-progression-n5.md)
- seluruh inventory serta Reading/Listening blueprint N5.

## 3. Prinsip Policy

1. Policy adalah data versioned, bukan konstanta tersembunyi dalam source code.
2. Input, policy version, dan tie-breaker yang sama menghasilkan output dan decision hash yang sama.
3. Perubahan nilai policy tidak menulis ulang evidence historis.
4. Perubahan yang memengaruhi hasil lama memerlukan impact analysis, recalculation plan, migration, dan rollback.
5. Missing/incompatible policy menghasilkan status eksplisit dan memblokir keputusan terkait.
6. Baseline dapat dikalibrasi melalui data, tetapi engagement tidak boleh sendirian menurunkan standar akademik.
7. AI tidak boleh membuat registry key, threshold, mapping, atau policy runtime baru.
8. Accommodation dan support harus menyatakan dampaknya terhadap construct-equivalence dan evidence eligibility.

## 4. Policy Package

Satu release policy menggunakan manifest:

```yaml
policy_package:
  id: pol_n5_baseline
  version: 1.0.0
  status: approved
  applies_to:
    program: N5_ABSOLUTE_BEGINNER
    curriculum_versions: [1.x]
  policies:
    mastery: mastery_n5@1.0.0
    review: review_n5@1.0.0
    scheduler: scheduler_n5@1.0.0
    practice_learning: practice_learning_n5@1.0.0
    practice_review: practice_review_n5@1.0.0
    placement: placement_n5@1.0.0
    readiness: readiness_n5@1.0.0
  registries:
    kc: kc_registry_n5@1.0.0
    diagnostic_dimension: diagnostic_dimension@1.0.0
    activity_type: activity_type@1.0.0
    interaction_type: interaction_type@1.0.0
    evidence_type: evidence_type@1.0.0
    misconception: misconception_n5@1.0.0
    reason_code: decision_reason@1.0.0
  approved_at: null
  approval_refs: []
  hash: sha256:TBD
```

Policy package hanya dapat `approved` jika seluruh reference resolve, schema valid, compatibility test lulus, dan approval mencakup exact hash.

## 5. Registry Knowledge Component

### 5.1 Domain

Registry domain kanonik:

- `sound`;
- `kana`;
- `orthography`;
- `vocabulary`;
- `kanji`;
- `grammar`;
- `reading`;
- `listening`.

### 5.2 Kontrak entry

Setiap KC registry entry wajib memuat:

```yaml
id: kc_n5_kana_hiragana_a
version: 1
domain: kana
category: basic_hiragana
level_scope: [FOUNDATION, N5]
first_unit_id: U01
requiredness: required
curriculum_weight: 1.0
prerequisite_role: terminal_hard
exam_relevance: core
diagnostic_dimension_ids:
  - script_to_sound
  - visual_recognition
prerequisites: []
evidence_requirement_ref: evidence_sound_kana_required@1.0.0
misconception_refs: []
source_rationale_ref: SRC_FOUNDATION_KANA
status: approved
```

### 5.3 Requiredness

| Nilai | Dampak |
| --- | --- |
| `required` | Masuk progression/gate/readiness serta wajib mempunyai content pool lengkap |
| `supporting` | Dapat membantu personalisasi; tidak masuk denominator readiness |
| `enrichment` | Opsional dan tidak boleh memblokir progression/readiness |
| `TBD` | Tidak eligible untuk gate/readiness dan memblokir release scope yang memerlukannya |

Perubahan dari/ke `required` selalu major policy/content change.

## 6. Diagnostic Dimension Registry

### 6.1 Sound, Kana, dan Orthography

- `auditory_discrimination`;
- `sound_to_script`;
- `script_to_sound`;
- `visual_recognition`;
- `visual_discrimination`;
- `mora_processing`;
- `word_decoding`;
- `phrase_application`.

### 6.2 Vocabulary

- `form_recognition`;
- `sound_recognition`;
- `meaning_sense`;
- `reading_recall`;
- `orthography_mapping`;
- `contextual_use`;
- `lexical_contrast`.

### 6.3 Kanji

- `character_recognition`;
- `pedagogical_meaning`;
- `reading_in_word`;
- `orthography_selection`;
- `context_transfer`;
- `visual_contrast`.

### 6.4 Grammar

- `form_recognition`;
- `function_recognition`;
- `formation`;
- `constraint_application`;
- `grammar_contrast`;
- `sentence_application`;
- `text_flow`.

### 6.5 Reading

- `script_decoding`;
- `word_boundary`;
- `mixed_orthography`;
- `explicit_detail`;
- `vocabulary_in_context`;
- `grammar_in_text`;
- `main_point`;
- `purpose_intent`;
- `reference_resolution`;
- `sequence`;
- `connective_text_flow`;
- `low_inference`;
- `information_lookup`;
- `action_selection`;
- `timed_comprehension`.

### 6.6 Listening

- `phonological_discrimination`;
- `mora_length_processing`;
- `audio_to_kana`;
- `explicit_detail`;
- `number_time`;
- `person_place`;
- `negation`;
- `quick_response`;
- `situational_expression`;
- `register_appropriateness`;
- `key_point`;
- `speaker_intent`;
- `action_selection`;
- `instruction_sequence`;
- `speaker_variation`;
- `speed_noise_robustness`;
- `timed_comprehension`.

Diagnostic state menggunakan `insufficient`, `weak`, `developing`, atau `strong`; ia tidak menggantikan KC mastery dan tidak dapat membuka gate sendiri.

## 7. Activity Type Registry

Activity type menyatakan konstruk akademik. Interaction type hanya menyatakan cara learner memberi respons.

### 7.1 Foundation

- `sound_discrimination`;
- `sound_to_kana`;
- `kana_to_sound`;
- `kana_recognition`;
- `visual_kana_discrimination`;
- `mora_classification`;
- `word_decoding`;
- `orthography_selection`.

### 7.2 Vocabulary

- `form_to_meaning`;
- `audio_to_meaning`;
- `meaning_to_form`;
- `reading_recall`;
- `context_defined_meaning`;
- `vocabulary_cloze`;
- `lexical_contrast`.

### 7.3 Kanji

- `kanji_recognition`;
- `kanji_word_reading`;
- `kanji_orthography_selection`;
- `kanji_context_meaning`;
- `kanji_visual_contrast`.

### 7.4 Grammar

- `grammar_form_selection`;
- `grammar_function_selection`;
- `controlled_transformation`;
- `sentence_composition`;
- `grammar_contrast`;
- `text_grammar`.

### 7.5 Reading dan Listening

- `reading_comprehension`;
- `reading_information_lookup`;
- `reading_sequence`;
- `listening_comprehension`;
- `listening_quick_response`;
- `listening_situational_expression`;
- `listening_action_selection`.

Setiap activity type memiliki allowed interaction, eligible evidence class, required metadata, prohibited support, dan applicable modes.

## 8. Interaction Type Registry

Baseline registry:

- `single_choice`;
- `multiple_choice`;
- `select_to_pair`;
- `ordering_controls`;
- `cloze_choice`;
- `cloze_text`;
- `japanese_text_input`;
- `classification`;
- `spatial_placement`;
- `audio_response_choice`.

Drag-and-drop adalah presentation enhancement untuk interaction semantic yang sesuai; bukan interaction type yang wajib. Setiap drag behavior memiliki keyboard/non-drag alternative.

Milestone 1 mengaktifkan `single_choice` dan `select_to_pair`. Interaction lain boleh terdaftar tetapi berstatus `inactive` untuk seed U01 pertama.

## 9. Evidence Type Registry

### 9.1 Evidence class

| Class | Makna | Mastery eligible |
| --- | --- | --- |
| `direct` | Aktivitas secara eksplisit menguji primary KC | Ya |
| `supporting` | Aktivitas menargetkan KC lain tetapi mapping diagnostik disetujui | Terbatas |
| `exposure` | Learner melihat, mendengar, meniru, tracing, atau membaca penjelasan | Tidak |
| `assessment_direct` | Direct evidence dari blueprint assessment approved | Ya |

### 9.2 Baseline types

- `recognition`;
- `discrimination`;
- `mapping`;
- `recall`;
- `decoding`;
- `controlled_application`;
- `context_comprehension`;
- `contrast`;
- `transfer`;
- `delayed_retrieval`;
- `checkpoint`;
- `simulation`;
- `exposure_only`.

Evidence type dinyatakan satisfied hanya oleh direct evidence dengan signal `≥0.80` dan mapping blueprint yang cocok.

## 10. MasteryPolicy N5 v1.0.0

### 10.1 Evidence signal

```text
signal = correctness × independence × attempt
weight = activity × difficulty × attribution × diagnostic_confidence
```

Semua signal dibatasi `0–1`; weight nonnegatif.

#### Correctness

| Hasil | Nilai |
| --- | ---: |
| Benar | `1.00` |
| Sebagian benar jika rubric mengizinkan | `0.50` |
| Salah atau kosong | `0.00` |

#### Independence

| Bantuan | Nilai |
| --- | ---: |
| Tanpa hint | `1.00` |
| Hint ringan | `0.85` |
| Hint kuat | `0.60` |
| Answer reveal | `0.20` |

#### Attempt

| Attempt | Nilai |
| --- | ---: |
| Pertama | `1.00` |
| Kedua | `0.80` |
| Ketiga atau lebih | `0.60` |

Attempt setelah answer reveal tidak menjadi encounter baru.

#### Activity weight

| Evidence | Nilai |
| --- | ---: |
| Direct independent retrieval | `1.00` |
| Applied context/comprehension | `0.90` |
| Isolated recognition | `0.75` |
| Guided practice | `0.50` |
| Exposure | `0.00` |

#### Difficulty

| Band | Nilai |
| --- | ---: |
| `easy` | `0.85` |
| `target` | `1.00` |
| `stretch` | `1.15` |

Primary attribution adalah `1.00`. Supporting attribution adalah `0.35 × diagnostic_confidence`. Diagnostic confidence di bawah `0.50` tidak mengubah mastery.

### 10.2 Agregasi

Gunakan maksimal 12 evidence valid terbaru per KC:

- empat terbaru rank weight `1.00`;
- empat berikutnya `0.75`;
- empat berikutnya `0.50`.

```text
P = Σ(signal × weight × rank_weight) / Σ(weight × rank_weight)
B = evidence_types_satisfied / evidence_types_required
C = mean(signal dari tiga direct encounters terbaru)
R = weighted mean qualifying delayed evidence

Jika delayed evidence belum ada:
R* = P
retention_qualified = false

mastery_score_raw = 0.55P + 0.15B + 0.15C + 0.15R*
mastery_score = applySufficiencyCaps(mastery_score_raw)
```

### 10.3 Sufficiency dan cap

| Kondisi | Dampak |
| --- | --- |
| Kurang dari tiga direct encounters | Score maksimum `0.84` |
| Breadth belum terpenuhi | Score maksimum `0.84` |
| Supporting evidence saja | Status maksimum `learning` |
| Belum ada qualifying delayed evidence | Status maksimum `provisional` |
| Critical misconception aktif | Score maksimum `0.69` |
| Evidence invalid/pending | Tidak mengubah mastery |

### 10.4 Status

| Status | Aturan |
| --- | --- |
| `not_started` | Belum ada evidence valid |
| `learning` | Ada evidence, syarat provisional belum terpenuhi |
| `provisional` | Score `≥0.85`, minimal tiga direct encounters, breadth terpenuhi, tanpa critical misconception |
| `mastered` | Seluruh syarat provisional dan qualifying delayed evidence agregat `≥0.80` |
| `needs_review` | Pernah provisional/mastered lalu memenuhi evidence-based downgrade rule |

Status tidak turun hanya karena waktu berlalu.

### 10.5 Downgrade dan restoration

Satu jawaban salah memicu confirmation probe. Status menjadi `needs_review` jika:

- delayed probe memiliki signal `<0.80`;
- minimal dua dari tiga direct encounters terbaru memiliki signal `<0.70`;
- mastery score turun `<0.70` karena evidence baru;
- critical misconception aktif;
- checkpoint menunjukkan kegagalan sistematis yang teratribusi.

Restoration membutuhkan remedial dan independent retrieval baru; retry item yang sama atau answer reveal tidak cukup.

### 10.6 Confidence

```text
confidence = min(1,
  0.40 × encounter_sufficiency
  + 0.25 × breadth
  + 0.20 × recency_coverage
  + 0.15 × diagnostic_quality
)
```

Confidence rendah meningkatkan prioritas probe tetapi tidak otomatis menurunkan mastery.

## 11. Evidence Requirement per Domain

| Domain | Breadth minimum | Retention/transfer |
| --- | --- | --- |
| Sound/Kana | Mapping/discrimination dan decoding/application | Item atau kata baru tanpa romaji setelah ≥7 hari |
| Vocabulary | Dua types termasuk context/use | Bentuk atau context berbeda setelah ≥7 hari |
| Kanji | Word reading dan orthography/context | Target word/context berbeda setelah ≥7 hari |
| Grammar | Form/formation dan application/contrast | Kalimat/text berbeda setelah ≥7 hari |
| Reading | Dua passage/functional contexts sesuai subskill | Stimulus baru tanpa full translation |
| Listening | Dua audio contexts dengan variation | Audio baru tanpa transcript; replay sesuai policy |

Tiga direct encounters tetap menjadi minimum umum untuk required KC.

## 12. ReviewPolicy N5 v1.0.0

Interval baseline: `1, 3, 7, 14, 30, 60` hari.

| Rating | Signal | Dampak |
| --- | --- | --- |
| `again` | `<0.50` | Ulang singkat jika aman, lalu satu hari |
| `hard` | `0.50–0.799` | Pertahankan atau mundur satu interval |
| `good` | `0.80–0.949` | Maju satu interval |
| `easy` | `≥0.95`, tanpa hint, target/stretch | Maju maksimal dua interval |

```text
overdue_ratio = max(0, days_overdue / planned_interval_days)
review_urgency = clamp(0.50 + 0.30 × overdue_ratio + 0.20 × (1-confidence), 0, 1)
```

Review terlambat menaikkan urgency, bukan menurunkan mastery. Item berikutnya harus berbeda bila content pool memungkinkan.

Backlog guardrail aktif jika estimasi due review melebihi 50% budget selama tiga sesi terencana berturut-turut. Engine mengurangi target baru dan tidak menghapus review.

## 13. Misconception dan Remedial Policy

| Status | Bukti minimum | Tindakan |
| --- | --- | --- |
| `suspected` | Satu evidence diagnostik | Feedback dan confirmation probe |
| `confirmed` | Dua evidence konsisten pada encounter berbeda | Jadwalkan remedial |
| `critical` | Confirmed dan memblokir fondasi/comprehension inti | Cap mastery dan veto gate/readiness |
| `resolved` | Remedial dan independent verification berhasil | Lepas veto dan hitung ulang |

Remedial menargetkan gap terkecil: confirmation → contrastive explanation → guided practice → independent retrieval dengan item baru.

### 13.1 Registry minimum U01

- `KANA_VISUAL_CONFUSION`;
- `KANA_SOUND_MAPPING_REVERSED`;
- `MORA_LENGTH_IGNORED`;
- `SOKUON_OMITTED`;
- `YOON_SEGMENTED`;
- `DAKUTEN_CONFUSION`;
- `LONG_VOWEL_CONFUSION`;
- `ROMAJI_DEPENDENCE`.

Entry konkret harus mendefinisikan trigger mapping, confirmation activity, severity rule, remediation reference, resolution evidence, dan applicable KC set.

## 14. SchedulerPolicy N5 v1.0.0

### 14.1 Eligibility

Aktivitas eligible hanya jika:

- curriculum/content/policy versions kompatibel;
- content `approved` atau `published`;
- primary KC relevan dengan tujuan session;
- hard prerequisite terpenuhi atau aktivitas merupakan remedial prerequisite;
- difficulty dan modality sesuai;
- cooldown, exposure, serta assessment rules terpenuhi.

### 14.2 Priority class

Urutan lexicographic:

1. blocking hard-prerequisite gap;
2. due review;
3. confirmed/critical misconception;
4. target baru pada jalur aktif;
5. integration/transfer;
6. enrichment.

### 14.3 Ranking

```text
selection_score =
  0.30 × urgency
  + 0.25 × learning_gap
  + 0.15 × exam_relevance
  + 0.15 × uncertainty
  + 0.10 × diversity_need
  + 0.05 × user_focus
  - fatigue_penalty
  - repetition_penalty
```

Tie-breaker: due date tertua → hard-prerequisite depth terendah → curriculum order → stable ID.

### 14.4 Session budget

Untuk session 30 menit:

| Komponen | Baseline |
| --- | ---: |
| Due review | 35% |
| Target baru | 40% |
| Reading/Listening integration | 20% |
| Reflection/feedback | 5% |

Baseline target baru maksimum:

- 8–12 Vocabulary;
- 2–4 Kanji;
- 1–2 Grammar;
- satu Reading atau satu–dua Listening objects.

Batas diturunkan jika error langsung `>30%`, response time memburuk `>50%`, backlog guardrail aktif, dua prerequisite probes gagal, atau waktu tersedia kurang dari 80% rencana.

Milestone 1 U01 menggunakan target Sound/Kana dari approved session blueprint; batas Vocabulary/Kanji/Grammar belum aktif.

## 15. CalendarPolicy N5 v1.0.0

```text
weekly_capacity = available_minutes_per_week × 0.85
required_weekly_minutes = remaining_minutes / weeks_until_target
```

Risk status:

- `on_track`: kebutuhan `≤90%` weekly capacity;
- `at_risk`: kebutuhan `>90%` dan `≤100%`;
- `unrealistic`: kebutuhan `>100%`.

Sesi terlewat tidak menurunkan mastery. Replan tidak menaikkan satu sesi di atas 125% durasi normal secara otomatis.

Milestone 1 hanya membuat initial plan dan next-session recommendation. Calendar projection lengkap mulai Milestone 3.

## 16. PracticePolicy Milestone 1 v1.0.0

| Area | Keputusan |
| --- | --- |
| Mode | `learning` dan `review` |
| Evaluation | Deterministic key/rule only |
| Attempt | Bertambah setelah submission valid |
| Submit | Eksplisit; auto-submit tidak aktif kecuali definition menyatakannya |
| Hint | `none`, `light`, `strong`; dampak evidence mengikuti MasteryPolicy |
| Skip | Diizinkan sesuai definition; tidak menjadi incorrect |
| Answer reveal | Menutup scored eligibility instance |
| Feedback | Setelah evaluation final pada mode learning/review |
| Audio | Tidak autoplay; replay policy dikunci per definition |
| Romaji | Policy per activity; bukan global override |
| Input | `single_choice` dan `select_to_pair` aktif |
| Offline | Tidak aktif |
| AI | Tidak aktif |
| Failure | Technical failure bukan incorrect dan tidak memberi penalty |

## 17. Foundation/U01 Policy Profile

1. Sound dan Kana dipisah menjadi mapping, recognition, discrimination, decoding, serta orthography KC sesuai inventory approved.
2. Romaji hanya scaffolding sementara dan tidak menjadi jawaban mastery.
3. Tracing, animation, imitation, dan passive listening adalah exposure.
4. Required KC membutuhkan minimal satu direct independent mapping/discrimination dan satu word/phrase application di antara minimal tiga direct encounters.
5. Delayed evidence menggunakan stimulus baru tanpa romaji setelah minimal tujuh hari.
6. Formulaic language U01 tidak memberikan Grammar mastery.
7. Audio-to-kana dan sound discrimination tidak boleh diganti transcript sebagai scored evidence.
8. Support atau alternative interaction yang tidak ekuivalen diberi `practice_only` atau `unavailable`.
9. Milestone 1 tidak menerbitkan gate S0 final karena content seed hanya subset U01.
10. U01 completion pada seed berarti session selesai, bukan Unit U01 lengkap atau mastery S0.

## 18. PlacementPolicy N5 v1.0.0

Placement penuh mulai Milestone 3 dan menggunakan:

- routing screener;
- adaptive branch;
- verification set;
- time cap 25 menit;
- tiga direct items awal per cluster;
- dua dari tiga signal `≥0.80` untuk naik;
- paling banyak satu dari tiga untuk turun;
- mixed result memicu dua verification items;
- `≥0.85`, minimal lima direct items, stabil pada tiga terakhir untuk high-confidence estimate.

Estimate maksimum menghasilkan `provisional`; tidak pernah langsung `mastered`.

Milestone 1 menggunakan pilihan `absolute_beginner` dan tidak menjalankan scored placement.

## 19. ReadinessPolicy N5 v1.0.0

`N5 Ready` mensyaratkan:

1. weighted required mastered coverage `≥0.85`;
2. mastered coverage setiap domain `≥0.75`;
3. seluruh terminal hard prerequisites mastered;
4. delayed retention setiap domain `≥0.80`;
5. retention coverage setiap domain `≥0.80`;
6. dua simulation forms berbeda dan equivalent;
7. weighted accuracy tiap simulation `≥0.70`;
8. floor `≥0.60` untuk Language Knowledge/Reading dan Listening;
9. coverage seluruh format evidence wajib;
10. tidak ada critical weakness aktif;
11. simulation dalam 90 hari terakhir;
12. retention evidence dalam 60 hari terakhir;
13. semua evidence version-compatible.

Readiness tetap `profile_incomplete` dan tidak aktif sampai seluruh requiredness N5, KC registry, content coverage, serta simulation forms disetujui. Milestone 1 tidak menghitung atau menampilkan readiness.

## 20. Reason Code Registry

### 20.1 Learning decision

- `HARD_PREREQUISITE_GAP`;
- `REVIEW_DUE`;
- `RETENTION_PROBE_DUE`;
- `MISCONCEPTION_SUSPECTED`;
- `MISCONCEPTION_CONFIRMED`;
- `CRITICAL_WEAKNESS_ACTIVE`;
- `NEW_TARGET_ELIGIBLE`;
- `REVIEW_BACKLOG_HIGH`;
- `TARGET_DATE_AT_RISK`;
- `TARGET_DATE_UNREALISTIC`;
- `MISSED_SESSION_REPLAN`;
- `USER_FOCUS_APPLIED`;
- `TIME_BUDGET_REDUCED`;
- `FATIGUE_GUARDRAIL`;
- `CONTENT_FALLBACK_USED`.

### 20.2 Evidence validity

- `EVIDENCE_ACCEPTED`;
- `DUPLICATE_EVENT`;
- `UNKNOWN_VERSION`;
- `CONTENT_NOT_APPROVED`;
- `EVALUATION_PENDING`;
- `EVALUATION_INVALID`;
- `DIAGNOSTIC_CONFIDENCE_LOW`;
- `EXPOSURE_ONLY`;
- `ANSWER_REVEALED`;
- `CONSTRUCT_EQUIVALENCE_FAILED`;
- `TECHNICAL_INTEGRITY_FAILED`;
- `ATTRIBUTION_NOT_APPROVED`;
- `ENCOUNTER_DUPLICATE`.

### 20.3 Mastery dan progression

- `EVIDENCE_INSUFFICIENT`;
- `EVIDENCE_BREADTH_INCOMPLETE`;
- `DELAYED_EVIDENCE_REQUIRED`;
- `MASTERY_THRESHOLD_MET`;
- `MASTERY_RETENTION_CONFIRMED`;
- `MASTERY_REVIEW_REQUIRED`;
- `GATE_REQUIREMENT_FAILED`;
- `GATE_PASSED`;
- `READINESS_PROFILE_INCOMPLETE`;
- `READINESS_REQUIREMENT_FAILED`;
- `READINESS_VERIFICATION_DUE`;
- `READINESS_PASSED`.

Setiap code memiliki severity, applicable decision types, internal description, learner-facing string key opsional, required context fields, dan deprecation mapping.

## 21. Policy Compatibility

Compatibility validator wajib memastikan:

1. seluruh registry reference resolve pada exact version;
2. required KC mempunyai evidence requirement dan approved content coverage;
3. activity type compatible dengan interaction, evaluator, dan mode;
4. support/accommodation memiliki construct-equivalence classification;
5. assessment policy tidak mengaktifkan hint/reveal yang dilarang;
6. readiness profile tidak aktif bila requiredness atau content coverage belum lengkap;
7. deprecated registry key memiliki migration mapping;
8. policy dan curriculum major version compatibility eksplisit;
9. hash manifest cocok dengan canonical representation;
10. tidak ada threshold `TBD` yang digunakan dalam keputusan aktif.

## 22. Versioning dan Change Classes

| Perubahan | Version | Kebutuhan |
| --- | --- | --- |
| Copy/description tanpa semantic effect | Patch | Review owner registry |
| Menambah inactive registry key | Minor | Schema dan compatibility tests |
| Mengaktifkan activity/evidence baru | Minor atau major berdasarkan impact | Academic/Accessibility/Engineering review |
| Mengubah weight, threshold, cap, interval, atau priority formula | Major | Calibration evidence, impact, replay, migration, Product approval |
| Mengubah requiredness atau prerequisite | Major | Academic approval, content/gate impact, mastery migration |
| Menghapus/merename key | Major | Deprecation dan migration mapping |

Policy rollback memilih version sebelumnya untuk keputusan baru. Historical decision tetap menunjuk version lama.

## 23. Executable Artifact Map

```text
packages/policies/
  schemas/
    policy-package.schema.ts
    mastery-policy.schema.ts
    review-policy.schema.ts
    scheduler-policy.schema.ts
    practice-policy.schema.ts
    placement-policy.schema.ts
    readiness-policy.schema.ts
    registry-entry.schema.ts
  n5/
    policy-package.v1.json
    mastery-policy.v1.json
    review-policy.v1.json
    scheduler-policy.v1.json
    practice-policy.learning.v1.json
    practice-policy.review.v1.json
    placement-policy.v1.json
    readiness-policy.v1.json
    registries/
      diagnostic-dimensions.v1.json
      activity-types.v1.json
      interaction-types.v1.json
      evidence-types.v1.json
      misconceptions.v1.json
      reason-codes.v1.json
```

KC registry dapat berada di `packages/content-schema` bila dimiliki release kurikulum, tetapi `VersionSet` dan compatibility contract harus tetap sama.

## 24. Test Fixtures Minimum

1. signal untuk benar/salah/partial, hint, attempt, difficulty, dan attribution;
2. maksimum 12 evidence serta rank weighting;
3. cap karena encounter, breadth, delayed evidence, dan misconception;
4. seluruh transition mastery dan restoration;
5. no silent decay ketika review overdue;
6. review rating serta interval transition;
7. scheduler eligibility, priority, ranking, dan stable tie-breaker;
8. backlog, fatigue, prerequisite, serta time-budget guardrail;
9. duplicate encounter dan rejected evidence;
10. U01 completion tanpa Unit/S0 mastery palsu;
11. AI/offline/assessment policy ditolak pada Milestone 1;
12. readiness `profile_incomplete` ketika requiredness/content/form belum lengkap;
13. policy compatibility dan missing reference;
14. historical replay dan rollback terhadap golden fixture.

## 25. Keputusan Terbuka

| ID | Keputusan | Baseline sementara | Status |
| --- | --- | --- | --- |
| `POLICY-OPEN-001` | Daftar lengkap KC dan requiredness N5 | `TBD`; readiness fail-closed | Menunggu inventory review |
| `POLICY-OPEN-002` | Mapping lengkap 190 Reading dan 210 Listening objects ke subskill KC | `TBD`; affected mastery/readiness fail-closed | Menunggu academic review |
| `POLICY-OPEN-003` | Misconception taxonomy lengkap lintas-domain | U01 minimum aktif; domain lain tidak diimprovisasi | Menunggu content authoring |
| `POLICY-OPEN-004` | Calibration akhir weight, interval, dan threshold | Gunakan baseline v1 yang versioned | Divalidasi melalui data MVP |
| `POLICY-OPEN-005` | Assessment accommodations | Hanya approved presentation preferences; scored alternatives fail-closed | Menunggu academic/accessibility review |

## 26. Acceptance Criteria

Dokumen ini dapat `approved` jika:

1. seluruh policy value berada dalam konfigurasi versioned;
2. registry membedakan domain, activity, interaction, evidence, dimension, misconception, dan reason;
3. formula, threshold, cap, interval, priority, tie-breaker, dan fallback eksplisit;
4. U01 mempunyai policy profile yang dapat dijalankan tanpa AI/offline/assessment;
5. policy tetap generik untuk U01–U24;
6. readiness tidak aktif sebelum requiredness dan content coverage lengkap;
7. accessibility support menyatakan evidence effect;
8. seluruh reason code memiliki context dan string-key contract;
9. policy compatibility, migration, rollback, dan historical replay dapat diuji;
10. seluruh fixture minimum tersedia sebelum policy digunakan untuk learner nyata;
11. keputusan terbuka tetap fail-closed pada scope yang terdampak;
12. Academic, Engineering, Product, Assessment, Accessibility, Data, dan QA menyetujui exact version/hash.

## 27. Decision Record

| ID | Keputusan | Status | Owner | Tanggal |
| --- | --- | --- | --- | --- |
| `POLICY-001` | Baseline policy bersifat rules-based, deterministic, configurable, dan versioned. | `approved` | Academic + Engineering | 13 September 2026 |
| `POLICY-002` | MasteryPolicy N5 menggunakan formula, cap, dan threshold pada Bagian 10. | `approved` | Academic + Product | 13 September 2026 |
| `POLICY-003` | ReviewPolicy menggunakan interval 1/3/7/14/30/60 hari tanpa silent decay. | `approved` | Academic | 13 September 2026 |
| `POLICY-004` | Scheduler menggunakan eligibility, priority class, ranking, dan stable tie-breaker pada Bagian 14. | `approved` | Academic + Engineering | 13 September 2026 |
| `POLICY-005` | Milestone 1 hanya mengaktifkan mode learning/review deterministik serta single-choice/select-to-pair. | `approved` | Product + Engineering | 13 September 2026 |
| `POLICY-006` | Milestone 1 tidak menerbitkan Unit U01, gate S0, atau readiness dari seed parsial. | `approved` | Product + Academic | 13 September 2026 |
| `POLICY-007` | Requiredness atau threshold yang belum lengkap selalu fail-closed. | `approved` | Academic + Product | 13 September 2026 |
| `POLICY-008` | Baseline numerik dapat dikalibrasi hanya melalui policy version baru dan impact review. | `approved` | Academic + Data + Product | 13 September 2026 |
