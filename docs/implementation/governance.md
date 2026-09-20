# Phase 0 Governance dan Reconciliation

**Status:** Approval scope P0.1–P0.4 dikonfirmasi owner pada 20 September 2026; individual reviewer receipts belum dilampirkan. Scope lain tetap fail-closed.

## Authority yang Dipakai

1. `ADR-001` menetapkan topology dan dependency direction.
2. `ADR-002` menetapkan PostgreSQL ownership, Unit of Work, serta synchronous objective submission.
3. `ADR-003` menetapkan prefixed ULID, exact `VersionRef`/`VersionSet`, JCS, scaled integer, dan SHA-256.
4. `ADR-004` menetapkan transactional outbox/inbox dan QStash at-least-once.
5. `ADR-005` menetapkan Clerk untuk authentication dan Nekoru backend untuk authorization.
6. Dokumen `Approved` mengatur scope yang dinyatakan; roadmap mengatur urutan dan gate.

## Source Map

| Kebutuhan Phase 0                 | Source of truth                                            | Artefak executable                                       |
| --------------------------------- | ---------------------------------------------------------- | -------------------------------------------------------- |
| Urutan fase, dependency, dan gate | `implementation-readiness.md`, `implementation-roadmap.md` | Status registry dan handoff Phase 0                      |
| Topology dan module boundary      | ADR-001                                                    | `apps/*`, `packages/*`, architecture check               |
| Transaction dan schema ownership  | ADR-002                                                    | Drizzle schema dan ordered migration                     |
| ID, version, canonical JSON, hash | ADR-003                                                    | Domain library, JSON Schema, golden fixtures             |
| Event delivery dan dedupe         | ADR-004                                                    | Event schema/catalog, outbox/inbox tables, provider port |
| Identity dan authorization        | ADR-005                                                    | Clerk adapter, local double, backend authorization port  |
| U01-L1 scope dan interaction      | Content seed U01 + UI Milestone 1 docs                     | Draft seed dan prototype 20 state                        |
| Test, accessibility, dan handoff  | Test plan, DoD, UI handoff docs                            | Vitest, Playwright, axe, traceability matrix             |

## Bootstrap Decision Registry

Semua keputusan berikut adalah bootstrap local/internal yang dapat dibalik; scope P0.1–P0.4 telah dikonfirmasi approved oleh owner.

| ID           | Keputusan         | Exact selection                                                                                                    | Status     | Approval needed                    |
| ------------ | ----------------- | ------------------------------------------------------------------------------------------------------------------ | ---------- | ---------------------------------- |
| `DEC-P0-001` | Package/workspace | pnpm `12.4.1`, Turborepo `2.10.12`, ESM, TypeScript strict                                                         | `approved` | Engineering Lead                   |
| `DEC-P0-002` | Web               | Next.js `16.3.5`, React `19.3.0`, App Router, CSS Modules                                                          | `approved` | Engineering + Design/Accessibility |
| `DEC-P0-003` | API/worker        | NestJS `11.2.3`, Fastify `5.12.4`, root override untuk transitive security patch, worker composition root terpisah | `approved` | Engineering + Security             |
| `DEC-P0-004` | Data              | PostgreSQL `18`, Drizzle ORM `0.45.2`, Drizzle Kit `0.31.10`                                                       | `approved` | Engineering + Data                 |
| `DEC-P0-005` | Canonical JSON    | `canonicalize@5.0.0` di belakang wrapper RFC 8785/JCS                                                              | `approved` | Engineering + Data                 |
| `DEC-P0-006` | Identity          | `@clerk/nextjs@7.9.2` dan `@clerk/backend@3.17.2` dengan local identity double; live config tidak diisi            | `approved` | Security/Privacy + Identity owner  |
| `DEC-P0-007` | Environment       | local/CI terpisah; target nonproduction `sin1`; tidak ada deployment yang dilakukan                                | `approved` | Operations + Security              |

Perubahan yang melampaui selection bootstrap di atas memerlukan impact review; perubahan boundary ADR memerlukan ADR baru atau superseding ADR.

## Reconciliation

| Area                                    | Keputusan executable                                  | Sumber  | Compatibility impact                                                                     |
| --------------------------------------- | ----------------------------------------------------- | ------- | ---------------------------------------------------------------------------------------- |
| Practice run ID                         | `prun_`                                               | ADR-003 | Contoh lama `prn_` hanya legacy documentation                                            |
| Assessment run ID                       | `arun_`                                               | ADR-003 | Contoh lama `arn_` hanya legacy documentation                                            |
| Identity schema                         | `identity`                                            | ADR-002 | `iam` pada konteks lama tidak digunakan                                                  |
| Platform schema                         | `platform`                                            | ADR-002 | `integration` pada konteks lama tidak digunakan                                          |
| Objective submission target Milestone 1 | Synchronous Practice + Evidence + Mastery transaction | ADR-002 | Belum diimplementasikan pada Phase 0; event async hanya untuk side effect setelah commit |

## Dependency dan Blocker

| ID        | Phase | Status           | Safe behavior                                                                                                                            | Owner/approval needed                       |
| --------- | ----- | ---------------- | ---------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------- |
| DEP-P0-01 | P0    | approved         | Node 24 tersedia; migration dan tiga integration test lulus pada PostgreSQL 18.6 lokal ephemeral; tidak diterapkan ke shared environment | Technical/Data review + environment owner   |
| DEP-P0-02 | P0    | approved         | Bootstrap package versions dipin di lockfile                                                                                             | Architecture owner                          |
| DEP-P0-03 | P0    | pending          | Clerk memakai local double                                                                                                               | Security/Privacy + Identity owner           |
| DEP-P0-04 | P0    | blocked_external | U01-L1 tetap `draft` dan runtime menolak                                                                                                 | Academic, Linguistic, Rights, Accessibility |
| DEP-P0-05 | P0    | blocked_external | Prototype hanya evidence otomatis                                                                                                        | Product, Research, Accessibility            |
| DEP-P0-06 | P0    | approved         | CI contract dan hosted run #3 lulus untuk commit `627210f`; approval scope dikonfirmasi owner                                            | Repository owner                            |

## Registry DEP-001–DEP-010

| ID        | Exact artifact/version                                | Status sekarang     | Owner                     | Approval/status yang masih dibutuhkan                        |
| --------- | ----------------------------------------------------- | ------------------- | ------------------------- | ------------------------------------------------------------ |
| `DEP-001` | Domain/persistence model `0.0.0-phase0`               | `approved`          | Engineering + Product     | Owner attestation recorded; individual receipts not attached |
| `DEP-002` | Zod + JSON Schema bundle `schema_version: 1`          | `approved`          | Engineering               | Owner attestation recorded; individual receipts not attached |
| `DEP-003` | `milestone-1-policy.json`, schema `1.0.0`             | `draft`             | Academic + Engineering    | Academic approval dan registered exact policy/evaluator IDs  |
| `DEP-004` | U01-L1 seed `0.1.0-draft`                             | `blocked_external`  | Academic/Content          | Asset, rights, checksum, mandatory review receipts           |
| `DEP-005` | OpenAPI `0.0.0-phase0`                                | `contract_only`     | Engineering               | Endpoint payload review; runtime Phase 1                     |
| `DEP-006` | Event envelope/catalog `schema_version: 1`            | `approved`          | Engineering + Data        | Owner attestation recorded; individual receipts not attached |
| `DEP-007` | Prototype `P-M1-01..20`                               | `internal_ready`    | Design + Engineering      | Product, research, accessibility review                      |
| `DEP-008` | Acceptance fixture bundle `schema_version: 1`         | `partial`           | QA + Engineering          | Provider, device, and recovery evidence                      |
| `DEP-009` | Clerk/local auth decision `DEC-P0-006`                | `local_double_only` | Engineering + Security    | Live development environment smoke                           |
| `DEP-010` | Telemetry allowlist/redaction contract `0.0.0-phase0` | `approved`          | Data + Security + Product | Owner attestation recorded; individual receipts not attached |

## Blocker ke Fase

| Blocker                                                              | Memblokir                          | Safe behavior sekarang                            |
| -------------------------------------------------------------------- | ---------------------------------- | ------------------------------------------------- |
| Seed/audio/rights/approval U01-L1 belum lengkap                      | Phase 0 `done` dan Phase 1 runtime | Seed tetap `draft`; runtime selection menolak     |
| Live Clerk config belum tersedia                                     | Auth provider gate                 | Hanya local identity double; tidak ada akun nyata |
| Usability, screen-reader, dan physical-device evidence belum lengkap | Prototype approval                 | Hanya automated browser smoke yang diklaim        |

## Owner dan Approval Matrix

| Artifact             | Prepared by                | Required reviewer/approver                              | Current state               |
| -------------------- | -------------------------- | ------------------------------------------------------- | --------------------------- |
| Bootstrap decisions  | Engineering                | Architecture/Technical owner                            | `approved`                  |
| Executable contracts | Engineering                | Technical/Data + domain owners                          | `approved`                  |
| U01-L1 seed          | Content/Engineering        | Academic, Linguistic, Assessment, Rights, Accessibility | `draft`                     |
| Prototype report     | Product/Design/Engineering | Product, Research, Accessibility                        | `pending_external_evidence` |
| Auth environment     | Engineering                | Security/Privacy + Identity owner                       | `local_double_only`         |

Phase 1 tidak boleh dimulai hanya karena automated tests hijau. Gate resmi membutuhkan evidence terhadap exact artifact version dan sign-off pihak berwenang.
