# Phase 0 Handoff — U01-L1 Internal Prototype

**Status:** Scope P0.1–P0.4 `approved` berdasarkan owner attestation. Phase 0 tetap belum `done`, belum learner-visible, dan belum membuka Phase 1.

## Hasil yang Bisa Diperiksa

- Prototype learner memiliki 20 state `P-M1-01` sampai `P-M1-20` pada `/prototype/u01-l1`.
- U01-L1 tersedia sebagai seed `draft`, tidak `runtime_eligible`, dengan 43 activity definition dan 26 placeholder audio.
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

| Artefak            | Lokasi                                                   | Status                                                                                    |
| ------------------ | -------------------------------------------------------- | ----------------------------------------------------------------------------------------- |
| OpenAPI 3.1        | `packages/contracts/generated/openapi.json`              | Health implemented; route Milestone 1 `contract_only`                                     |
| JSON Schema bundle | `packages/contracts/generated/schemas.json`              | Owner-attested approved Phase 0 contract; runtime route tetap `contract_only`             |
| Event catalog      | `packages/contracts/generated/event-catalog.json`        | 19 event Milestone 1; all `contract_only`                                                 |
| Golden API fixture | `content/fixtures/golden/api.json`                       | Health/problem/contract-only wiring tervalidasi                                           |
| Security gate      | `tooling/security/check.ts`                              | Secret/config/exact-dependency check; bukan full audit                                    |
| Database migration | `packages/persistence/migrations/manifest.json`          | Migration kosong lulus pada PostgreSQL 18.6 lokal; tidak diterapkan ke shared environment |
| Database evidence  | `docs/implementation/database-integration-evidence.json` | Tiga integration test dan hosted gate lulus; approval scope dikonfirmasi owner            |
| Approval record    | `docs/implementation/phase-0-approval-record.json`       | Owner attestation untuk scope P0.1–P0.4; individual receipts belum dilampirkan            |
| U01-L1 seed        | `content/source/u01-l1/seed.json`                        | `draft`, `runtime_eligible: false`                                                        |
| Design system      | `DESIGN.md` dan `.impeccable/design.json`                | Internal reference; bukan approval whole-surface                                          |
| Milestone registry | `docs/implementation/phase-0-status.json`                | Source untuk indikator Markdown dan HTML                                                  |

## Cara Menjalankan Pemeriksaan Internal

```text
pnpm check
pnpm security:audit
pnpm build
pnpm test:e2e
pnpm test:a11y
```

Untuk gate database, siapkan PostgreSQL 18 ephemeral melalui `docker compose up -d postgres`. Compose memakai host port 5433 dan data `tmpfs`; set `DATABASE_URL=postgresql://nekoru:nekoru@127.0.0.1:5433/nekoru` dan `NEKORU_TEST_DATABASE_DISPOSABLE=true`, lalu jalankan `pnpm db:migrate` dan `pnpm test:integration`. Test menolak host non-loopback atau database dengan nama selain `nekoru`, lalu hanya menghapus schema Phase 0 yang terdaftar. Jangan gunakan `db push` pada shared environment.

## Masih Menunggu

- Individual approval receipts/nama reviewer belum dilampirkan; status scoped approval dicatat berdasarkan owner attestation.
- Live Clerk development credentials dan smoke test.
- Audio dua speaker yang memiliki checksum serta rights receipt.
- Review akademik/linguistik/content/accessibility, usability research, dan assistive-technology physical-device evidence.

Selama item tersebut belum lengkap, jangan mengubah status seed menjadi `approved`/`published`, jangan mengaktifkan route akademik, dan jangan menyebut Phase 0 `done`.
