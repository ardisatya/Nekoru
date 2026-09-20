# Phase 0 Handoff — U01-L1 Internal Prototype

**Status:** Scope P0.1–P0.4 `approved` berdasarkan owner attestation. Phase 0 tetap belum `done`, belum learner-visible, dan belum membuka Phase 1.

## Hasil yang Bisa Diperiksa

- Prototype learner memiliki 20 state `P-M1-01` sampai `P-M1-20` pada `/prototype/u01-l1`.
- U01-L1 tersedia sebagai seed `draft`, tidak `runtime_eligible`, dengan 43 activity definition dan 26 normalized audio asset ber-checksum dari VOICEVOX Nemo Engine `0.24.0`; binary audio dibuat local-only, rights receipt variant `男声3` sudah diverifikasi local-only, dan audio/academic/linguistic receipt sudah tercatat sebagai scoped owner-attestation.
- Health API berjalan; route Milestone 1 lain hanya tercatat sebagai `contract_only` dan belum mempunyai business behavior.
- AI evaluation, assessment/readiness, offline runtime, optional product analytics, dan production exposure tetap disabled.
- Prototype tidak menghitung correctness, evidence, mastery, review schedule, atau readiness di browser.

## Screen → Component → Contract → Event → Test

| State               | Yang dilihat pengguna                                                          | Implementasi                                                                         | Contract/event Phase 0                                                                                          | Bukti otomatis                                                   |
| ------------------- | ------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------- |
| `P-M1-01`–`P-M1-04` | Sambutan, tujuan, waktu, dan titik mulai                                       | `Prototype`, semantic form, focus handoff                                            | Onboarding/profile/plan routes `contract_only`; `learner_profile_updated`, `learning_plan_created` catalog-only | Critical flow, keyboard, axe, 320 px reflow                      |
| `P-M1-05`–`P-M1-07` | Google/email, provider unavailable, email expiry/wrong-browser, dan hasil auth | Local identity double dan branch recovery; tidak membuat akun nyata                  | `/onboarding/migrate-guest-draft` `contract_only`; `identity_reconciled`, `guest_draft_migrated` catalog-only   | Required-branch E2E, provider authorization/telemetry unit tests |
| `P-M1-08`–`P-M1-10` | Rencana awal, siap mulai, dan Beranda dengan satu tindakan utama               | Plan/unavailable branch dan Home state first/active/review                           | Plan/session routes `contract_only`; `learning_plan_created`, `session_planned` catalog-only                    | Critical flow, axe, 320 px reflow                                |
| `P-M1-11`–`P-M1-15` | Pengantar/audio, single-choice, matching, hint, dan feedback                   | Audio manual, explicit submit, keyboard select-to-pair, technical recovery           | Submission/activity routes `contract_only`; answer/evidence events catalog-only dan tidak dikirim               | Keyboard submit, required-branch E2E, contract schema            |
| `P-M1-16`–`P-M1-17` | Pause/restore/version conflict dan report issue                                | Save/recovery branch dan report yang tidak dikirim ke server                         | Resume/report behavior belum diaktifkan; telemetry tetap allowlist-only                                         | Required-branch E2E, telemetry redaction                         |
| `P-M1-18`–`P-M1-20` | Summary, progres ringkas, dan system states                                    | Completion/mastery/review dipisah; expired/maintenance/denied/not-found dapat dipicu | Complete/summary/mastery/review routes `contract_only`; completion/mastery events catalog-only                  | Critical summary, required-branch E2E, axe, reflow               |

`catalog-only` berarti nama, version, producer, consumer, dan classification tersedia untuk review, tetapi prototype tidak menerbitkan event tersebut. Ini mencegah Phase 0 berpura-pura sudah memiliki walking skeleton akademik Phase 1.

## Artefak Exact-Version

| Artefak                           | Lokasi                                                               | Status                                                                                                                                                                                             |
| --------------------------------- | -------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| OpenAPI 3.1                       | `packages/contracts/generated/openapi.json`                          | Health implemented; route Milestone 1 `contract_only`                                                                                                                                              |
| JSON Schema bundle                | `packages/contracts/generated/schemas.json`                          | Owner-attested approved Phase 0 contract; runtime route tetap `contract_only`                                                                                                                      |
| Event catalog                     | `packages/contracts/generated/event-catalog.json`                    | 19 event Milestone 1; all `contract_only`                                                                                                                                                          |
| Golden API fixture                | `content/fixtures/golden/api.json`                                   | Health/problem/contract-only wiring tervalidasi                                                                                                                                                    |
| Security gate                     | `tooling/security/check.ts`                                          | Secret/config/exact-dependency check; bukan full audit                                                                                                                                             |
| Database migration                | `packages/persistence/migrations/manifest.json`                      | Migration kosong lulus pada PostgreSQL 18.6 lokal; tidak diterapkan ke shared environment                                                                                                          |
| Database evidence                 | `docs/implementation/database-integration-evidence.json`             | Tiga integration test dan hosted gate lulus; approval scope dikonfirmasi owner                                                                                                                     |
| Approval record                   | `docs/implementation/phase-0-approval-record.json`                   | Owner attestation untuk scope P0.1–P0.4; individual receipts belum dilampirkan                                                                                                                     |
| U01-L1 seed                       | `content/source/u01-l1/seed.json`                                    | `draft`, `runtime_eligible: false`                                                                                                                                                                 |
| Audio plan                        | `content/source/u01-l1/audio-plan.json`                              | 26 recordings; VOICEVOX Nemo `0.24.0`, style `10005`/`10002`, rights local-only; QA output terikat exact manifest                                                                                  |
| Audio QA pack                     | `content/manifests/u01-l1.audio-draft.json`                          | Manifest status `approved_owner_attested_local_only`, 26 normalized master/delivery WAV, runtime tetap ditolak                                                                                     |
| Audio review receipt              | `docs/implementation/u01-l1-audio-review.json`                       | Receipt `REVIEW.CONTENT.U01.L1.AUDIO.000001`, status `approved`, basis `owner_attestation`, gate `waived_local_only_owner_attested`                                                                |
| Audio QA waiver                   | `docs/implementation/u01-l1-audio-qa-waiver.json`                    | Waiver `WAIVER.AUDIO.U01.L1.LOCAL_ONLY.000001` untuk klip pendek; tidak berlaku untuk publication/runtime                                                                                          |
| Accessibility review receipt      | `docs/implementation/u01-l1-accessibility-review.json`               | Receipt `REVIEW.ACCESSIBILITY.U01.L1.000001`, status `approved`, exception local-only; emulator subset 14/15 lulus; formal physical AT/device claim tidak dibuat; actual playback deferred ke P1.3 |
| Accessibility emulator evidence   | `docs/implementation/u01-l1-accessibility-emulator-evidence.json`    | Playwright Chromium desktop, iPhone viewport/touch, dan Pixel viewport/touch; 14 passed, 1 skipped; diterima hanya untuk local-only melalui decision record                                        |
| Accessibility local-only decision | `docs/implementation/u01-l1-accessibility-local-only-decision.json`  | Exception owner-attested untuk scope pribadi; approved platform matrix v1.0 tetap tidak berubah                                                                                                    |
| Academic review receipt           | `docs/implementation/u01-l1-academic-review.json`                    | Receipt `REVIEW.CONTENT.U01.L1.ACADEMIC.000001`, `approved` untuk local-only; external Academic Lead sign-off tidak diklaim                                                                        |
| Linguistic review receipt         | `docs/implementation/u01-l1-linguistic-review.json`                  | Receipt `REVIEW.CONTENT.U01.L1.LINGUISTIC.000001`, `approved` untuk local-only; external Japanese Linguistic Reviewer sign-off tidak diklaim                                                       |
| Content local-only decision       | `docs/implementation/u01-l1-content-review-local-only-decision.json` | Academic/linguistic internal approval owner-attested; seed tetap draft dan runtime disabled                                                                                                        |
| Audio history cleanup receipt     | `docs/implementation/u01-l1-audio-history-cleanup.json`              | Remote `main` diverifikasi 0 reachable audio object setelah rewrite; backup bundle lokal terverifikasi                                                                                             |
| Audio rights decision             | `docs/implementation/u01-l1-audio-rights-decision.json`              | Scope `local_only` proposed; VOICEVOX Nemo Terms dan exact hash receipt sudah diverifikasi, approval tetap pending                                                                                 |
| Audio rights receipt template     | `docs/implementation/u01-l1-audio-rights-receipt.template.json`      | Template 26 asset untuk engine/speaker/terms/hash VOICEVOX; dipertahankan sebagai template                                                                                                         |
| Audio rights receipt final        | `docs/implementation/u01-l1-audio-rights-receipt-male3.json`         | Receipt `rev_01M2ZE9SH7617GK0S9DF4FJAER`, `verified_local_only`, cakupan 26 asset dan exact hash; supersedes receipt sebelumnya                                                                    |
| Audio rights receipt QA           | `docs/implementation/u01-l1-audio-rights-receipt-qa.json`            | Historical normalized-QA receipt; superseded after accessibility metadata update                                                                                                                   |
| Audio rights receipt current      | `docs/implementation/u01-l1-audio-rights-receipt-accessibility.json` | Receipt `rev_01M2ZV7N6B5C4X3Z2Q1W0E9R8T`, exact current manifest hash, `verified_local_only`                                                                                                       |
| VOICEVOX engine evidence          | `docs/implementation/u01-l1-voicevox-engine-evidence.json`           | Exact release URL, package SHA-256, engine API, speaker snapshot `10005`/`10002`, attribution                                                                                                      |
| Design system                     | `DESIGN.md` dan `.impeccable/design.json`                            | Internal reference; bukan approval whole-surface                                                                                                                                                   |
| Milestone registry                | `docs/implementation/phase-0-status.json`                            | Source untuk indikator Markdown dan HTML                                                                                                                                                           |

## Cara Menjalankan Pemeriksaan Internal

```text
pnpm check
pnpm security:audit
pnpm build
pnpm test:e2e
pnpm test:a11y
pnpm test:a11y:matrix
```

Untuk gate database, siapkan PostgreSQL 18 ephemeral melalui `docker compose up -d postgres`. Compose memakai host port 5433 dan data `tmpfs`; set `DATABASE_URL=postgresql://nekoru:nekoru@127.0.0.1:5433/nekoru` dan `NEKORU_TEST_DATABASE_DISPOSABLE=true`, lalu jalankan `pnpm db:migrate` dan `pnpm test:integration`. Test menolak host non-loopback atau database dengan nama selain `nekoru`, lalu hanya menghapus schema Phase 0 yang terdaftar. Jangan gunakan `db push` pada shared environment.

## Masih Menunggu

- Individual approval receipts/nama reviewer belum dilampirkan; status scoped approval dicatat berdasarkan owner attestation.
- Live Clerk development credentials dan smoke test.
- Audio dua speaker VOICEVOX Nemo sudah dinormalisasi ke delivery QA, 52 checksum cocok, clipping/noise/device playback owner-attested, dan short-clip loudness waiver tercatat. Prototype accessibility serta academic/linguistic review sudah owner-attested local-only; actual audio playback deferred ke Phase 1 P1.3.
- History `main` GitHub sudah dibersihkan dari 52 binary WAV terdahulu menggunakan backup bundle lokal dan `--force-with-lease`; `.gitignore` mencegah binary baru ikut commit.
- Formal Academic/Linguistic/AT reviewer evidence, usability research, dan physical-device playback evidence tetap tidak diklaim untuk public/production scope; exception local-only tidak mengubah gate tersebut.

Selama item tersebut belum lengkap, jangan mengubah status seed menjadi `approved`/`published`, jangan mengaktifkan route akademik, dan jangan menyebut Phase 0 `done`.
