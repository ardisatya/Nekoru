# Analytics and Implementation Handoff Nekoru — Milestone 1

**Status:** Approved v1.0 untuk baseline analytics dan implementation handoff  
**Tanggal:** 13 September 2026  
**Pemilik:** Product, Design, Data, dan Engineering  
**Required reviewers:** Academic/Content, Accessibility, Security/Privacy, QA, dan Operations  
**Cakupan aktif:** Learner journey U01-L1 online-only  
**Cakupan evolusi:** Konvensi analytics dan handoff untuk U01–U24

## 1. Tujuan

Dokumen ini mengubah spesifikasi, prototype, domain model, API, dan acceptance criteria menjadi kontrak implementasi yang dapat ditelusuri. Ia menetapkan:

1. event analytics, property, metric, funnel, dan dashboard Milestone 1;
2. pemisahan product analytics, operational telemetry, academic evidence, audit, dan research data;
3. larangan pengumpulan data sensitif serta quality controls;
4. mapping screen → component → state → API → domain event → test;
5. design, content, accessibility, engineering, QA, dan operational handoff;
6. aturan versioning, sign-off, change control, dan post-release verification.

Analytics bersifat observasional. Analytics tidak menjadi sumber kebenaran untuk submission, score, evidence, mastery, gate, progression, atau readiness.

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
- [Prototype and Usability Test](./09-prototype-usability-test.md)
- [Definition of Done](../product-specs/definition-of-done.md)

## 3. Handoff Gate

Engineering handoff dapat dimulai jika:

1. implementation-readiness, domain, policy, content-seed scope, dan API decisions telah approved;
2. prototype version yang diserahkan memenuhi exit criteria atau limitation/exception tercatat;
3. screen/state coverage, responsive behavior, focus behavior, dan copy status tersedia;
4. setiap mutation memiliki API, idempotency, concurrency, loading, success, stale, dan error mapping;
5. setiap metric mempunyai event source, formula, denominator, exclusion, dan owner;
6. analytics allowlist telah direview Security/Privacy;
7. acceptance criteria dapat ditelusuri ke automated/manual test;
8. tidak ada blocker/critical finding tanpa resolution.

Dokumen dapat disusun sebelum usability testing selesai, tetapi handoff status tetap `conditional` sampai evidence prototype tersedia.

## 4. Measurement Principles

1. Ukur outcome belajar dan keberhasilan task; jangan mengoptimalkan klik atau waktu layar sebagai tujuan tersendiri.
2. Completion tidak dianggap mastery.
3. Waktu respons tidak menjadi penalty mastery dan tidak digunakan untuk menilai kemampuan pengguna assistive technology.
4. Event client tidak menjadi authority; metric akademik berasal dari authoritative server record.
5. Raw answer, hidden answer, token, magic link, serta accessibility detail sensitif tidak masuk product analytics.
6. Denominator, exclusion, missing data, retry, duplicate, dan version harus eksplisit.
7. Metric tanpa coverage/quality indicator tidak boleh disebut final.
8. Segmentasi aksesibilitas hanya dilakukan dengan consent, kebutuhan yang sah, minimum group-size, dan privacy review.
9. Experiment tidak boleh menurunkan construct validity, prerequisite, mastery threshold, security, privacy, atau accessibility.
10. Semua event dan metric versioned serta memiliki owner.

## 5. Data Stream Separation

| Stream | Tujuan | Authority | Contoh |
| --- | --- | --- | --- |
| Domain record/event | Menjalankan business dan academic state | Authoritative | Submission, EvaluationResult, EvidenceEvent |
| Audit | Membuktikan actor, version, input/output hash, dan keputusan | Authoritative untuk audit | Policy decision, auth/access decision |
| Operational telemetry | Reliability, latency, failure, capacity | Observational | API latency, error code, outbox lag |
| Product analytics | Memahami journey dan usability pada agregat | Observational | Onboarding completion, session start |
| Learning analytics | Calibration dan quality analysis dari structured authoritative data | Observational; tidak mutasi otomatis | Retention, misconception distribution |
| Research data | Usability notes/recording dengan consent | Research evidence | Task success, participant quote |

Stream tidak boleh disatukan hanya karena memakai warehouse/vendor yang sama. Access, retention, schema, dan purpose harus tetap terpisah.

## 6. Analytics Event Envelope

```json
{
  "event_name": "practice_session_started",
  "event_version": 1,
  "event_id": "ana_...",
  "occurred_at": "2026-09-13T02:30:00Z",
  "received_at": "2026-09-13T02:30:01Z",
  "anonymous_or_user_key": "pseudonymous_rotatable_key",
  "session_key": "ana_session_...",
  "correlation_id": "cor_...",
  "surface": "learner_web",
  "app_version": "0.1.0",
  "schema_version": 1,
  "properties": {}
}
```

### 6.1 Common properties allowlist

- `surface`;
- `app_version`;
- `environment`;
- `route_id` dan `screen_id`;
- `flow_id` dan `step_id`;
- `viewport_class`, bukan raw dimensions kecuali QA telemetry;
- `input_class` bila dapat diperoleh tanpa fingerprinting;
- `locale` dan timezone offset bucket;
- `connection_state`;
- `result_code` atau safe error category;
- `content_pack_version`, `policy_version`, dan `prototype_experiment_version` bila relevan;
- `duration_bucket`;
- `retry_count_bucket`;
- `is_authenticated`;
- `is_resume`;
- `correlation_id` sesuai access policy.

### 6.2 Prohibited properties

- email, name, provider subject, IP address sebagai product property;
- token, session secret, magic link, atau presigned URL;
- raw answer, normalized answer, correct option, hidden rationale/rubric;
- full Japanese free-text input;
- exact target date bila tidak diperlukan; gunakan bucket;
- diagnosis medis atau detailed accommodation;
- raw user-agent fingerprint;
- staff private note;
- complete error stack/payload;
- AI prompt/response.

## 7. Event Naming dan Semantics

Event menggunakan `object_action` dalam lowercase snake_case. Nama menyatakan kejadian yang telah berlangsung, bukan niat yang belum terjadi.

Aturan:

- `viewed` berarti screen/state benar-benar dirender dan visible;
- `started` berarti authoritative operation dimulai/diterima;
- `submitted` berarti server menerima submission valid, bukan sekadar tombol diklik;
- `completed` mengikuti domain completion rule;
- click boleh diukur hanya jika dibutuhkan untuk usability diagnosis dan tidak menggantikan outcome event;
- event client menggunakan `ui_` prefix bila belum authoritative;
- event server tidak memakai prefix `ui_`;
- duplicate client event didedupe dengan event ID/session context.

## 8. Milestone 1 Analytics Registry

### 8.1 Entry dan onboarding

| Event | Source | Trigger authoritative/visible | Properties khusus |
| --- | --- | --- | --- |
| `entry_viewed` | Client | Entry visible | `returning_state` |
| `onboarding_started` | Client | Goal step visible pertama kali | `entry_source` |
| `onboarding_goal_completed` | Client/server | Valid goal diterima | `target_level`, `target_date_bucket` |
| `onboarding_availability_completed` | Client/server | Valid availability diterima | `days_per_week_bucket`, `weekly_minutes_bucket` |
| `onboarding_route_selected` | Client | Absolute beginner dipilih | `route=absolute_beginner` |
| `authentication_method_selected` | Client | Google/email action | `method` |
| `authentication_completed` | Server-derived | Internal identity reconciled | `method`, `has_existing_profile` |
| `authentication_failed` | Client/server | Safe terminal/recoverable failure | `method`, `failure_category`, `retryable` |
| `guest_draft_migration_completed` | Server-derived | Migration receipt final | `result`, `conflict_type` |
| `initial_plan_created` | Server-derived | LearningPlan committed | `starting_unit`, `risk_status`, `confidence_band` |
| `initial_plan_viewed` | Client | Plan visible | `risk_status`, `starting_unit` |

Email address, exact goal narrative, dan raw availability windows tidak dikirim ke product analytics.

### 8.2 Home dan session start

| Event | Source | Trigger | Properties khusus |
| --- | --- | --- | --- |
| `home_viewed` | Client | Home primary content visible | `primary_action_type`, `blocking_state` |
| `primary_learning_action_selected` | Client | CTA diaktifkan | `action_type` |
| `session_plan_created` | Server-derived | SessionPlan committed | `mode`, `budget_bucket`, `reason_code`, versions |
| `practice_session_started` | Server-derived | PracticeRun committed | `mode`, `is_resume`, `planned_activity_count_bucket` |
| `practice_intro_viewed` | Client | Intro visible | `audio_required`, `estimated_duration_bucket` |

### 8.3 Activity dan feedback

| Event | Source | Trigger | Properties khusus |
| --- | --- | --- | --- |
| `practice_activity_viewed` | Client | Current activity visible | `activity_type`, `interaction_type`, `purpose`, `ordinal_bucket` |
| `audio_playback_started` | Client | Playback benar-benar mulai | `asset_category`, `playback_rate`, `replay_index_bucket` |
| `audio_playback_failed` | Client/server | Playback gagal | `failure_category`, `fallback_available` |
| `practice_hint_requested` | Server/client reconciled | Hint dirilis | `hint_level`, `activity_type` |
| `practice_response_submitted` | Server-derived | Submission committed | `activity_type`, `interaction_type`, `attempt_bucket`, `hint_level` |
| `practice_evaluation_presented` | Client | Released result visible | `evaluation_status`, `feedback_type`, `evidence_status` |
| `practice_activity_completed` | Server-derived | Activity state completed | `activity_type`, `purpose`, `attempt_bucket` |
| `practice_activity_skipped` | Server-derived | Skip committed | `reason_code`, `activity_type` |
| `content_issue_reported` | Server-derived | Issue receipt committed | `category`, `surface`, `content_type` |

`evaluation_status` boleh berisi `correct/partial/incorrect/pending/invalid/technical_failure`; tidak menyertakan response atau answer.

### 8.4 Completion, mastery, dan review

| Event | Source | Trigger | Properties khusus |
| --- | --- | --- | --- |
| `practice_session_paused` | Server-derived | Run paused | `save_state`, `reason_category` |
| `practice_session_resumed` | Server-derived | Existing run active kembali | `resume_age_bucket`, `recovery_type` |
| `practice_session_completed` | Server-derived | Run final completed | `meaningful_learning`, `duration_bucket`, `completed_activity_bucket` |
| `practice_session_abandoned` | Server-derived | Run abandoned | `reason_category`, `progress_bucket` |
| `mastery_state_changed` | Server-derived | LearnerKCState transition committed | `domain`, `from_status`, `to_status`, `reason_code` |
| `review_scheduled` | Server-derived | ReviewSchedule committed | `domain`, `interval_days`, `reason_code` |
| `session_summary_viewed` | Client | Summary visible | `meaningful_learning`, `mastery_change_count_bucket`, `review_scheduled` |
| `next_action_selected` | Client | Summary/Home next action | `action_type` |

Analytics tidak mengirim KC title/answer content jika dapat menciptakan sensitive small-group trace. Stable KC ID hanya tersedia pada restricted learning-analytics stream; product stream memakai domain/category.

## 9. Operational Telemetry Registry

Minimum metrics:

- HTTP request count, error rate, p50/p95/p99 latency;
- database query/transaction latency serta connection saturation;
- idempotency new/replay/in-progress/fingerprint-conflict count;
- stale-revision count per operation;
- authentication callback/webhook failure;
- content/policy/version resolution failure;
- SessionPlan build duration dan deterministic hash mismatch;
- submission/evaluation transaction failure;
- evidence/mastery processing lag;
- outbox backlog, retry, dead-letter, dan sequence gap;
- audio asset delivery/load/playback failure;
- client crash, route error, dan hydration failure;
- answer-leakage/security assertion failure;
- accessibility automated regression count.

Metric label tidak boleh memakai user ID, email, content body, raw answer, correlation ID ber-cardinality tinggi, atau arbitrary URL.

## 10. Product Metrics

### 10.1 Activation

```text
onboarding_completion_rate =
  unique learners with initial_plan_created
  / unique learners with onboarding_started
```

Laporkan authentication drop-off, guest-draft migration success, dan median time-to-plan secara terpisah. Bot/test/internal traffic dikeluarkan berdasarkan documented filter.

### 10.2 First-session start

```text
first_session_start_rate =
  learners with practice_session_started within activation window
  / learners with initial_plan_created
```

Activation window dan timezone treatment harus ditetapkan sebelum dashboard production; baseline recommendation adalah 24 jam.

### 10.3 Meaningful first-session completion

```text
meaningful_first_session_completion_rate =
  learners whose first PracticeRun completed with meaningful_learning=true
  / learners whose first PracticeRun started
```

Meaningful learning berasal dari domain decision, bukan client duration.

### 10.4 Practice reliability

```text
technical_interruption_rate =
  PracticeRuns with blocking technical failure
  / PracticeRuns started

recovery_success_rate =
  interrupted PracticeRuns later resumed/completed safely
  / recoverable interrupted PracticeRuns
```

### 10.5 Learning quality baseline

- direct evidence acceptance rate;
- evidence rejection by reason;
- delayed-review eligibility/completion;
- mastery transition distribution;
- misconception suspected/confirmed/resolved;
- content issue rate;
- item exposure balance;
- audio replay/failure by approved platform category.

Metric tidak digunakan untuk menaikkan mastery otomatis atau menurunkan standard.

## 11. Funnel Definitions

### 11.1 Onboarding funnel

```text
entry_viewed
→ onboarding_started
→ onboarding_goal_completed
→ onboarding_availability_completed
→ onboarding_route_selected
→ authentication_completed
→ guest_draft_migration_completed
→ initial_plan_created
→ initial_plan_viewed
```

### 11.2 First learning funnel

```text
initial_plan_viewed
→ primary_learning_action_selected
→ session_plan_created
→ practice_session_started
→ practice_activity_viewed
→ practice_response_submitted
→ practice_session_completed
→ session_summary_viewed
```

Funnel tidak mensyaratkan semua intermediate client events untuk menyatakan server outcome. Missing client event dicatat sebagai instrumentation gap, bukan learner failure.

## 12. Metric Quality Contract

Setiap metric registry entry wajib memiliki:

- metric ID/name dan version;
- owner dan business question;
- numerator/denominator;
- authoritative event/table source;
- eligibility/exclusion rules;
- identity and deduplication unit;
- time window dan timezone;
- late-arrival handling;
- null/missing behavior;
- data-quality checks;
- privacy classification;
- minimum aggregation threshold;
- dashboard/query reference;
- known limitations;
- change history.

Dashboard tidak boleh menampilkan angka tanpa metric version, last refresh, coverage, dan data-quality state.

## 13. Consent, Identity, dan Retention

### 13.1 Functional telemetry

Security, reliability, audit, dan fraud/abuse telemetry yang diperlukan untuk menjalankan layanan dipisahkan dari optional product analytics. Purpose dan access harus didokumentasikan.

### 13.2 Product analytics

Persetujuan, opt-out, provider, region, retention, dan deletion behavior mengikuti privacy decision final. Sebelum policy disetujui:

- implementasi menggunakan event allowlist;
- data sensitif dilarang;
- optional analytics dapat dinonaktifkan;
- production retention tidak diberi default tersembunyi.

### 13.3 Identity

- pre-auth analytics memakai rotating anonymous key;
- setelah authentication, linking anonymous→user hanya dilakukan jika privacy policy mengizinkan;
- user key pseudonymous dan bukan Clerk subject/email;
- deletion/export workflow mencakup analytics provider;
- cross-device identity tidak digunakan untuk fingerprinting.

## 14. Experiment Guardrail

Eksperimen dapat mengubah copy, hierarchy, visual emphasis, atau nonacademic timing jika:

- tidak membocorkan answer;
- tidak mengubah content/policy VersionSet;
- tidak mengubah attempt/evidence/mastery semantics;
- tidak menurunkan accessibility;
- tidak mengubah auth/security boundary;
- variant direkam dan dapat dihentikan;
- primary/guardrail metrics ditentukan sebelum mulai.

Experiment pada threshold, prerequisite, feedback release, assessment, support-equivalence, atau scheduler policy memerlukan versioned academic proposal dan tidak dijalankan sebagai UI A/B test biasa.

## 15. Screen-to-Implementation Matrix

| Screen/state | Route ID | Primary components | API operations | Test IDs |
| --- | --- | --- | --- | --- |
| Mulai Nekoru | `L-ENTRY` | BrandHeader, ValueIntro, PrimaryCTA | `/me` bila session ada | `E2E-M1-001`, `A11Y-M1-001` |
| Tujuan belajar | `L-ONB-GOAL` | StepHeader, GoalForm, DateField | Local draft; `PATCH /profile` setelah auth | `E2E-M1-002` |
| Waktu belajar | `L-ONB-AVAILABILITY` | AvailabilityEditor, TimezoneSummary | Local draft; `PATCH /profile` | `E2E-M1-003` |
| Pilih titik mulai | `L-ONB-ROUTE` | RouteChoice | Local draft | `E2E-M1-004` |
| Pilih cara masuk | `L-AUTH` | AuthMethodList, SafeError | Clerk + `/me` | `E2E-M1-005`, `SEC-M1-001` |
| Periksa email | `L-AUTH` | EmailStatus, ResendTimer | Clerk provider | `E2E-M1-006` |
| Hasil auth/migration | `L-AUTH` | MigrationStatus, RecoveryActions | `/onboarding/migrate-guest-draft` | `E2E-M1-007` |
| Rencana awal | `L-ONB-PLAN` | PlanSummary, RiskStatus | `/learning-plans/initial` | `E2E-M1-008` |
| Beranda | `L-HOME` | NextActionCard, GlobalStatus, AppNav | `/learning-plans/current` | `E2E-M1-009` |
| Pengantar sesi | `L-PRACTICE-INTRO` | FocusHeader, SessionPurpose, StartCTA | `/session-plans`, `/sessions/{id}/start` | `E2E-M1-010` |
| Activity single-choice | `L-PRACTICE-ACTIVITY` | AudioPlayer, ChoiceGroup, SubmitBar | PracticeRun GET/submit | `E2E-M1-011`, `A11Y-M1-011` |
| Activity matching | `L-PRACTICE-ACTIVITY` | PairSelector, PairSummary, SubmitBar | PracticeRun GET/submit | `E2E-M1-012`, `A11Y-M1-012` |
| Hint | `L-PRACTICE-HINT` | HintPanel, EvidenceEffectNote | Run action contract | `E2E-M1-013` |
| Feedback | `L-PRACTICE-FEEDBACK` | ResultStatus, Rationale, NextCTA | Submission response/run GET | `E2E-M1-014` |
| Pause/recovery | `L-PRACTICE-PAUSE` | SaveStatus, ConfirmDialog | PracticeRun GET/action | `E2E-M1-015` |
| Report issue | `L-PRACTICE-REPORT` | IssueForm, SubmissionReceipt | Issue endpoint deferred/minimal contract | `E2E-M1-016` |
| Session summary | `L-PRACTICE-SUMMARY` | CompletionSummary, MasteryDelta, ReviewCard | Run complete/summary | `E2E-M1-017` |
| Progress ringkas | `L-PROGRESS-OVERVIEW` | ScopeNotice, KCStatusList | `/mastery`, `/review/due` | `E2E-M1-018` |
| System/recovery | `L-SYSTEM-*` | ProblemState, RecoveryActions | Problem Details | `E2E-M1-019`, `A11Y-M1-019` |

Final component naming boleh berubah pada coded library, tetapi ownership dan semantics harus dipertahankan.

## 16. State Ownership Matrix

| State | Authority | Client responsibility |
| --- | --- | --- |
| Auth/session | Clerk + Identity module | Render, initiate, recover; tidak membuat auth state sendiri |
| Guest draft | Client until migrated | Validate schema/expiry, show local status, migrate idempotently |
| Profile/goal/availability | Profile module | Draft edits, expected revision, conflict recovery |
| Learning/session plan | Learning module | Display exact decision/reason; tidak rerank target |
| Practice run/activity | Practice module | Render locked instance dan allowed actions |
| Evaluation/feedback | Practice evaluator/release | Show released fields only |
| Evidence/mastery/review | Learning/Mastery module | Explain learner-facing status; tidak menghitung lokal |
| Content/version | Content module/manifest | Verify refs/hash; no floating replacement |
| Error/retry | Owning API module | Preserve safe input dan follow retryability |
| Analytics delivery | Analytics adapter | Queue/retry allowed; tidak memblokir academic transaction |

## 17. Component Handoff Contract

Setiap component handoff memuat:

- component name dan owner;
- purpose dan anti-use cases;
- anatomy/slots;
- variants, sizes, density, responsive behavior;
- semantic HTML role;
- keyboard interaction;
- focus entry/exit/restore;
- accessible name/description/error/live-region behavior;
- loading, empty, error, disabled, pending, success, stale states;
- token references;
- content constraints dan text expansion;
- Japanese/furigana/audio behavior;
- motion/reduced-motion behavior;
- API data dependency;
- emitted UI analytics allowlist;
- Storybook stories;
- unit/accessibility/visual test requirements.

Screenshot tanpa interaction/state annotation bukan handoff yang cukup.

## 18. Design Asset Handoff

Handoff package minimum:

1. prototype source URL/file dan exact version;
2. page/frame naming berdasarkan screen IDs;
3. variables/tokens source reference;
4. component variants dan state matrix;
5. responsive constraints untuk 320, 390, 768, dan 1280 reference frames;
6. icon/illustration/mascot asset dengan rights dan accessibility role;
7. audio asset mapping;
8. copy/string keys, bukan hanya visible text;
9. focus order/keyboard annotation;
10. animation/reduced-motion annotation;
11. known limitations dan research finding references;
12. QA overlay/reference captures untuk visual regression.

## 19. Content Handoff

Setiap content entry yang digunakan implementasi mempunyai:

- stable ID dan immutable version;
- localized string keys;
- Japanese language tagging;
- primary/supporting KC mapping;
- activity/evidence type;
- answer/rationale/feedback release policy;
- asset refs/checksum;
- rights/provenance;
- accessibility alternative/equivalence;
- status serta exact approval manifest;
- test fixture reference.

Engineering tidak menyalin content body dari design frame ke source code sebagai sumber kebenaran.

## 20. Acceptance-to-Test Traceability

### 20.1 Test classes

| Prefix | Class |
| --- | --- |
| `UNIT-M1` | Pure domain/policy/component unit test |
| `PROP-M1` | Property/determinism/hash test |
| `CONTRACT-M1` | OpenAPI/Zod/event consumer-provider test |
| `INT-M1` | Database/provider-fake integration test |
| `E2E-M1` | Learner journey browser test |
| `A11Y-M1` | Automated/manual accessibility test |
| `SEC-M1` | Authorization, leakage, sanitization, abuse test |
| `VIS-M1` | Visual regression/reflow/forced-colors test |
| `OPS-M1` | Failure, retry, alert, runbook test |

### 20.2 Critical acceptance map

| Requirement | Required evidence |
| --- | --- |
| Guest input tidak hilang saat auth gagal | E2E auth failure + draft persistence |
| Existing profile tidak tertimpa | Integration conflict + E2E recovery |
| Session plan deterministic | Property/golden hash test |
| Duplicate submit tidak menggandakan effect | Integration + concurrency test |
| Hidden answer tidak bocor | Contract snapshot + security bundle inspection |
| Technical failure bukan incorrect | Unit/integration/E2E failure test |
| Completion bukan mastery | Domain unit + E2E summary comprehension |
| Draft/quarantined content ditolak | Content build + integration test |
| Keyboard/screen reader dapat menyelesaikan flow | Manual A11Y + automated component checks |
| Analytics tidak memuat raw answer | Schema allowlist + network/log inspection |
| Event retry idempotent | Integration duplicate delivery test |
| Historical replay reproducible | Property/replay fixture |

Setiap pull request mencantumkan requirement/test IDs yang diubah. Test result harus menunjuk application, contract, content, dan policy version.

## 21. Analytics QA

Sebelum analytics event dinyatakan production-ready:

1. schema dan property allowlist tervalidasi;
2. event fires tepat sekali secara logical setelah deduplication;
3. server/client semantics tidak menghasilkan double count;
4. anonymous→authenticated transition diuji;
5. timestamp, timezone, late arrival, dan retry diuji;
6. raw answer/PII/secret scan lulus pada network, logs, warehouse, dan dashboard;
7. event/property version terisi;
8. test/internal/bot traffic dapat difilter;
9. denominator metric dapat direproduksi dari fixture;
10. dashboard menunjukkan freshness dan data-quality status;
11. opt-out/deletion/export behavior diuji setelah policy aktif;
12. instrumentation failure tidak memblokir practice transaction.

## 22. Dashboard Minimum

### 22.1 Activation

- onboarding funnel dan drop-off;
- auth method success/failure;
- guest draft migration result;
- initial-plan creation latency/failure;
- first-session start/completion.

### 22.2 Practice and learning

- activity completion by type;
- submit/evaluation/evidence outcome;
- hint/replay usage;
- technical interruption/recovery;
- mastery/review transition distribution;
- seed content exposure balance dan issue rate.

### 22.3 Reliability

- API/web failure and latency;
- content/policy resolution;
- idempotency/concurrency conflicts;
- outbox/inbox health;
- audio failure;
- provider health.

### 22.4 Quality guardrails

- duplicate academic effect;
- answer leakage assertion;
- rejected evidence spike;
- accessibility regression;
- abnormal content error/issue concentration;
- instrumentation coverage/drop.

## 23. Release and Post-Release Checks

### 23.1 Pre-release

- contract/content/policy/prototype versions locked;
- migrations and seed build verified;
- environment/config/secret boundaries verified;
- dashboard and alert queries tested with synthetic events;
- E2E/A11Y/SEC/VIS/OPS evidence attached;
- known limitation and rollback decision available;
- no blocker/critical finding open.

### 23.2 Immediately after deployment

- smoke test auth, plan, session, submit, feedback, summary;
- verify correlation without sensitive payload;
- verify no duplicate domain/analytics event;
- verify asset/audio delivery;
- verify alert routing;
- compare expected vs observed synthetic fixture.

### 23.3 Monitoring window

Monitor activation, error, latency, abandonment, technical interruption, evidence rejection, audio failure, and data-quality indicators. Rollback/disable capability jika integrity, privacy, security, or accessibility guardrail fails.

## 24. Change Control

Perubahan handoff diklasifikasikan:

| Class | Contoh | Required review |
| --- | --- | --- |
| Copy-only | String correction tanpa semantic change | Content Design |
| Visual compatible | Token/spacing tanpa state change | Design + visual/accessibility QA |
| Interaction | Focus, keyboard, selection, submit behavior | Design + Accessibility + Engineering + QA |
| Contract | API/event/property change | Engineering + consumer owners + Security/Data |
| Academic | Answer, evidence, policy, mastery explanation | Academic + Product + Engineering |
| Security/privacy | Auth, logging, identity, consent, retention | Security/Privacy + Product |

Perubahan setelah sign-off membuat version baru dan menentukan test/evidence yang harus diulang.

## 25. Responsibility Matrix

| Deliverable | Accountable | Responsible/reviewer |
| --- | --- | --- |
| Screen/prototype/component annotation | Design | Product, Accessibility, Engineering |
| Copy/string catalog | Content Design | Academic, Accessibility |
| Content/asset manifest | Academic/Content | Rights, Audio, Accessibility, Engineering |
| OpenAPI/event schemas | Engineering | Web consumers, Data, Security, QA |
| Analytics registry/metrics | Data + Product | Engineering, Privacy, Academic |
| Test traceability | QA | All owners |
| Accessibility evidence | Accessibility | Design, Engineering, QA |
| Operational dashboard/alert | Operations + Engineering | Product, Security |
| Release sign-off | Product | All accountable owners |

## 26. Definition of Done Handoff

Handoff selesai jika:

1. screen/state/component/API/event/test matrix tidak memiliki orphan reference;
2. final prototype/research evidence tersedia atau handoff jelas berstatus conditional;
3. content dan policy exact version tersedia;
4. OpenAPI/Zod/event schemas dapat divalidasi otomatis;
5. analytics registry dan metric definitions memiliki owner serta privacy classification;
6. prohibited data tests lulus;
7. acceptance criteria mempunyai executable/manual evidence path;
8. focus, responsive, error, recovery, and content edge cases terdokumentasi;
9. blocker/critical ditutup dan major mempunyai resolution/exception sah;
10. release, monitoring, rollback, dan incident ownership jelas;
11. design/engineering/content/QA tidak memiliki sumber kebenaran paralel;
12. Product, Design, Engineering, Data, Academic, Accessibility, Security/Privacy, QA, dan Operations menyetujui handoff version.

## 27. Keputusan Terbuka

| ID | Keputusan | Rekomendasi | Status |
| --- | --- | --- | --- |
| `HANDOFF-OPEN-001` | Analytics provider | Gunakan adapter internal dan event schema vendor-neutral; pilih provider setelah privacy, region, cost, export, dan deletion review | Menunggu vendor review |
| `HANDOFF-OPEN-002` | Product analytics consent/opt-out | Pisahkan functional telemetry dan optional analytics; tetapkan sebelum production collection | Menunggu Privacy/Product |
| `HANDOFF-OPEN-003` | Retention event dan research data | Gunakan policy key tanpa angka tersembunyi | Blocked oleh retention decision |
| `HANDOFF-OPEN-004` | Minimum aggregation threshold untuk segmentasi | Jangan tampilkan small cohorts sampai privacy/statistical review | Menunggu Data/Privacy |
| `HANDOFF-OPEN-005` | Activation window final | Baseline 24 jam, validasi terhadap intended use dan timezone | Menunggu Product/Data |

## 28. Decision Record

| ID | Keputusan | Status | Owner | Tanggal |
| --- | --- | --- | --- | --- |
| `HANDOFF-001` | Domain/audit record, operational telemetry, product analytics, learning analytics, dan research data dipisahkan. | `approved` | Data + Engineering + Privacy | 13 September 2026 |
| `HANDOFF-002` | Analytics bersifat observasional dan tidak menjadi authority akademik. | `approved` | Product + Academic + Data | 13 September 2026 |
| `HANDOFF-003` | Product analytics memakai event/property allowlist tanpa raw answer, PII, secret, atau hidden content. | `approved` | Security/Privacy + Data | 13 September 2026 |
| `HANDOFF-004` | Server-derived event digunakan untuk authoritative funnel milestones. | `approved` | Data + Engineering | 13 September 2026 |
| `HANDOFF-005` | Setiap metric memiliki formula, denominator, exclusion, quality, privacy, dan version contract. | `approved` | Data + Product | 13 September 2026 |
| `HANDOFF-006` | Handoff memakai mapping screen→component→API→event→test dan exact artifact versions. | `approved` | Design + Engineering + QA | 13 September 2026 |
| `HANDOFF-007` | Blocker/critical harus ditutup; major membutuhkan fix/retest atau exception yang sah. | `approved` | Product + QA | 13 September 2026 |
| `HANDOFF-008` | Instrumentation failure tidak boleh memblokir transaction belajar atau menciptakan academic effect. | `approved` | Engineering + Data | 13 September 2026 |
