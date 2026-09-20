# ADR-001 — Monorepo dan Modular Monolith Boundary

**Status:** Accepted  
**Tanggal:** 13 September 2026  
**Decision owners:** Engineering Lead dan Platform Lead  
**Required reviewers:** Product, Security/Privacy, Data, QA, Operations, dan Accessibility  
**Berlaku untuk:** Milestone 1 U01-L1 dan jalur evolusi MVP N5  
**Supersedes:** Tidak ada  
**Superseded by:** Tidak ada  
**Accepted at:** 14 September 2026

## 1. Konteks

Nekoru memerlukan learner web mobile-first, Content Operations desktop-first, API, background worker, domain pembelajaran, content contracts, UI components, serta shared schemas. Walaupun produknya mempunyai banyak domain, Milestone 1 hanya mengimplementasikan U01-L1 online-only dengan tim dan operational footprint yang masih kecil.

Risiko utama pada tahap ini adalah:

- logika akademik tersebar di client, API route, dan job tanpa authority yang jelas;
- learner bundle tanpa sengaja memuat Content Operations atau answer key;
- transaksi lintas mastery, evidence, attempt, dan outbox tidak konsisten;
- shared package berubah menjadi kumpulan utilitas yang saling bergantung;
- service dipisah terlalu dini sehingga correctness bergantung pada distributed transaction;
- deployment tunggal membuat surface internal dan learner tidak dapat diisolasi;
- batas domain hanya berupa folder tanpa enforcement;
- test, schema, dan version tidak bergerak bersama implementasi.

Keputusan ini memilih struktur repository, unit deployment, dependency direction, dan aturan boundary untuk mengurangi risiko tersebut.

## 2. Sumber Keputusan

- [Technical Architecture](../product-specs/technical-architecture.md)
- [Implementation Readiness](../product-specs/implementation-readiness.md)
- [Domain Model and Schemas](../product-specs/domain-model-and-schemas.md)
- [API and Event Contracts](../product-specs/api-and-event-contracts.md)
- [Security, Privacy, and Data Governance](../product-specs/security-privacy-data-governance.md)
- [Test and Quality Plan](../product-specs/test-and-quality-plan.md)
- [Analytics and Implementation Handoff](../ui-ux/10-analytics-and-handoff.md)
- [Design System](../ui-ux/07-design-system.md)

## 3. Decision Drivers

Urutan prioritas:

1. correctness dan auditability keputusan akademik;
2. learner/content/answer-key isolation;
3. transaksi atomik untuk workflow inti;
4. deployment dan rollback yang sederhana pada fase awal;
5. reusable contracts tanpa coupling framework;
6. testability dan deterministic execution;
7. independent scaling atau extraction bila evidence operasional membutuhkannya;
8. developer experience dan build feedback yang cepat;
9. kemampuan menjalankan surface berbeda tanpa duplikasi domain rule.

## 4. Keputusan

Nekoru menggunakan **TypeScript monorepo** yang dikelola dengan **pnpm workspace** dan **Turborepo**, dengan arsitektur aplikasi berupa **modular monolith**.

Modular monolith berarti:

- domain dipisahkan menjadi module dengan public contract eksplisit;
- internal implementation module tidak dapat diimpor oleh module lain;
- PostgreSQL tetap satu logical database pada MVP, dengan ownership schema/table yang jelas;
- workflow yang membutuhkan atomicity dapat menggunakan satu transaction sesuai ADR-002;
- komunikasi asynchronous menggunakan outbox/inbox sesuai ADR-004;
- module bukan microservice dan tidak mempunyai network API internal hanya demi pemisahan;
- deployment unit boleh lebih dari satu walaupun codebase dan domain application tetap satu arsitektur modular.

## 5. Repository Topology

Struktur target:

```text
/
├── apps/
│   ├── learner-web/          # Next.js learner surface, mobile-first
│   ├── content-ops-web/      # Next.js internal surface, desktop-first
│   ├── api/                  # Public/internal HTTP composition root
│   └── worker/               # Async jobs, outbox delivery, scheduled work
├── packages/
│   ├── domain/               # Framework-free domain modules
│   ├── application/          # Use cases, ports, transaction orchestration
│   ├── contracts/            # API/event/content schemas and generated types
│   ├── persistence/          # PostgreSQL repositories/migrations/adapters
│   ├── providers/            # Clerk, R2, queue, telemetry adapters
│   ├── ui/                   # Shared accessible UI primitives/components
│   ├── design-tokens/        # Tokens consumable by UI and validation
│   ├── content-tooling/      # Content schema/build/manifest validators
│   ├── test-fixtures/        # Versioned synthetic and golden fixtures
│   └── config/               # Shared lint/TS/test/build configuration
├── content/
│   ├── source/               # Authoring input; no runtime authority
│   ├── manifests/            # Generated, reviewable manifests
│   └── fixtures/             # Approved content-test fixtures
├── docs/
│   ├── architecture/         # ADRs
│   ├── product-specs/
│   ├── content/
│   └── ui-ux/
└── tooling/                  # Repository-level scripts with explicit owners
```

Nama folder implementasi dapat disesuaikan sekali saat bootstrap, tetapi responsibility dan boundary tidak boleh digabung tanpa ADR baru.

## 6. Deployment Units

| Unit | Isi | Exposed to | Tidak boleh memuat |
|---|---|---|---|
| Learner web | Learner UI, public assets, browser-safe contract | Internet/learner | Content Ops code, secrets, answer key, internal audit UI |
| Content Ops web | Internal authoring/review UI | Authorized staff | Learner session credential, public anonymous mutation |
| API | HTTP composition, authz, use-case invocation | Learner/internal clients by route policy | UI framework logic, provider-specific domain rule |
| Worker | Async delivery, scheduled/retry/purge jobs | Queue/scheduler only | Public browser routes, independent domain authority |

Deployment terpisah untuk learner web dan Content Operations adalah security dan bundle boundary. API/worker dapat berbagi application/domain packages tetapi mempunyai composition root dan runtime permission berbeda.

## 7. Domain Module Map

Baseline modules:

| Module | Owns | Public capability examples |
|---|---|---|
| Identity & Access | Internal user, provider mapping, roles, grants | Resolve identity, authorize action |
| Learner Profile | Profile, locale, timezone, preferences, guest migration | Create/update profile, migrate draft |
| Curriculum | Unit/lesson/KC graph and prerequisites | Resolve curriculum/version graph |
| Content | Activity/content version, manifest, publication state | Load exact published definition |
| Practice | Session plan/run, response, attempt, evaluation orchestration | Start/resume/submit/complete session |
| Evidence | Eligible evidence records and provenance | Record/query evidence |
| Mastery | Mastery projection, cap, status, decision record | Recalculate/read mastery |
| Scheduling | Review due and next-plan decisions | Generate deterministic plan |
| Assessment | Blueprint/form/run/integrity/final result | Deferred activation; contracts remain isolated |
| Content Operations | Draft/review/approve/publish/quarantine/rollback | Deferred UI; lifecycle authority |
| Asset | Private asset metadata, checksum, rights, delivery grants | Resolve approved asset |
| Analytics | Allowlisted product/learning events and metric views | Emit accepted analytics event |
| Audit | Immutable operational/security decision record | Append/read authorized audit |
| Platform | Idempotency, outbox/inbox, job receipt | Cross-cutting infrastructure contracts |
| Offline Sync | Package, grant, receipt, conflict | Deferred activation; no M1 runtime path |

Module map adalah ownership map, bukan izin untuk circular import.

## 8. Layering dan Dependency Direction

Lapisan:

```text
apps/composition roots
        ↓
application/use cases
        ↓
domain/public contracts

adapters/providers/persistence
        ↑ implement ports declared inward
```

Aturan:

1. `domain` tidak bergantung pada Next.js, database driver, Clerk, R2, queue, browser API, telemetry SDK, atau environment variable.
2. `application` bergantung pada domain public API dan port interfaces, bukan concrete adapter.
3. persistence/provider packages mengimplementasikan ports; ia tidak menentukan policy domain.
4. apps menjadi composition root yang merangkai use case dan adapter.
5. UI components tidak mengakses database/provider secara langsung.
6. browser package tidak mengimpor server-only entry point.
7. contracts tidak mengimpor application implementation.
8. test fixture package boleh bergantung pada public contracts, tetapi production package tidak bergantung pada test fixture.
9. content tooling tidak menjadi runtime evaluator authority.
10. module hanya berkomunikasi melalui public entry point yang terdokumentasi.

## 9. Import Boundary Contract

Setiap module mempunyai bentuk konseptual:

```text
modules/<module>/
├── public.ts              # Satu-satunya cross-module import surface
├── domain/
├── application/
├── ports/
└── internal/
```

Ketentuan:

- path `internal/*` hanya dapat diimpor dari module yang sama;
- deep import lint/build harus gagal;
- tidak ada barrel global yang mengekspor seluruh internal implementation;
- public API harus kecil dan berbasis capability/use case;
- shared primitive hanya dipindahkan ke package bersama jika benar-benar domain-neutral;
- duplikasi kecil lebih baik daripada shared abstraction yang mencampur ownership;
- perubahan breaking pada public module contract memakai version/migration plan.

## 10. Allowed Dependency Matrix

| From \ To | Domain public | Application public | Contracts | Persistence | Providers | UI |
|---|---:|---:|---:|---:|---:|---:|
| Domain | Same-module only | No | Domain-safe value/schema only | No | No | No |
| Application | Yes | Explicit orchestrator only | Yes | Port only | Port only | No |
| Persistence | Yes | Port implementation only | Yes | Yes | No | No |
| Providers | Yes if required | Port implementation only | Yes | No | Yes | No |
| API/Worker | Yes | Yes | Yes | Composition only | Composition only | No |
| Web apps server | Browser-safe only | Approved client/server facade | Yes | No direct | No direct | Yes |
| Web apps client | No server/domain internals | No | Browser-safe contracts | No | No | Yes |
| UI | No business module | No | Presentation-safe types only | No | No | Yes |

`Composition only` berarti aplikasi dapat membuat adapter dan memasukkannya ke use case, tetapi route/worker handler tidak boleh menjalankan SQL/provider logic langsung.

## 11. State Authority

| State | Authority | Projection/cache allowed | Forbidden authority |
|---|---|---|---|
| Identity mapping/role | PostgreSQL + verified provider identity | Short-lived auth cache | Client claim alone |
| Curriculum/content version | PostgreSQL + immutable manifest/asset | CDN/browser cache after integrity check | Source authoring file at runtime |
| Attempt/evaluation/evidence | PostgreSQL transaction | Read projection | Analytics event |
| Mastery/readiness | PostgreSQL decision/projection with VersionSet | Cache | UI calculation |
| Session plan/run | PostgreSQL | Client draft for recovery only | Local storage as final |
| Audit | Append-only database/audit store | Authorized read model | Generic app log |
| Analytics | Analytics store | Aggregates | Source of learning truth |

Monorepo tidak berarti setiap package boleh membaca semua table atau state.

## 12. Transaction Boundary

ADR-001 menetapkan prinsip berikut; detail fisik berada pada ADR-002:

- use case membuka transaction melalui application port;
- repository dari module terkait berpartisipasi hanya jika orchestration diizinkan;
- domain mutation, idempotency receipt, decision record, dan outbox ditulis atomik ketika contract menyatakannya;
- HTTP handler tidak mengelola partial commit secara ad hoc;
- async consumer tidak menganggap exactly-once delivery;
- cross-module query memakai public query capability atau approved read model;
- direct cross-module table write dilarang.

## 13. API dan Event Boundary

- External HTTP contract berada di `packages/contracts` dan diimplementasikan oleh `apps/api`.
- Browser hanya mengonsumsi documented API; server action tidak menjadi jalur rahasia yang melewati authz/use case.
- Internal module call memakai typed in-process capability, bukan HTTP loopback.
- Event digunakan untuk side effect asynchronous atau projection yang tidak harus atomik dengan response.
- Event bukan pengganti function call untuk invariant yang harus diputuskan dalam satu transaction.
- Event consumer selalu idempotent dan memakai inbox receipt.
- Tidak ada domain event yang hanya didefinisikan sebagai telemetry payload.

## 14. Client dan Server Boundary

### 14.1 Client-safe

Boleh masuk learner browser:

- rendered prompt/content yang diizinkan policy;
- response schema yang diperlukan interaction;
- learner-visible feedback setelah release condition;
- browser-safe ID/version/reference;
- design tokens dan accessible UI behavior;
- short-lived signed asset access bila diperlukan.

### 14.2 Server-only

Tidak boleh masuk learner bundle, DOM, source map publik, hydration payload, cache publik, atau generic analytics:

- answer key dan hidden rationale sebelum release;
- unpublished/quarantined content;
- evaluator internals yang memungkinkan answer derivation;
- role/permission graph internal;
- provider secret/signing key;
- raw audit/security record;
- data learner lain;
- retention/deletion administrative control.

Boundary diuji melalui bundle inspection, API negative tests, dan no-answer-leakage fixture.

## 15. Configuration dan Secrets

- environment parsing dilakukan sekali pada composition root;
- configuration menjadi typed, validated, and fail-fast;
- domain/application menerima policy/config value eksplisit, bukan membaca environment global;
- secret hanya tersedia untuk deployment unit dan adapter yang memerlukan;
- learner/content-ops client environment hanya berisi public configuration yang dinilai aman;
- provider configuration mempunyai environment, owner, rotation, dan validation;
- unknown/missing security-critical config menggagalkan startup atau feature activation;
- runtime policy version direferensikan, tidak ditanam sebagai magic constant di banyak package.

## 16. Build dan Package Contract

Setiap package harus mendefinisikan:

- owner;
- runtime target: browser, server, worker, tooling, atau universal;
- public exports;
- allowed dependencies;
- build/typecheck/test commands;
- whether generated artifacts are committed or built;
- version compatibility rules;
- data/security classification bila memproses sensitive data.

Build gate harus mendeteksi:

- circular dependencies;
- forbidden/deep imports;
- server code in browser graph;
- duplicated incompatible contract versions;
- generated schema drift;
- content manifest drift;
- unused dependency yang memperbesar attack/bundle surface.

## 17. Milestone 1 Slice

Minimum package/module yang diimplementasikan:

1. repository/workspace configuration;
2. learner web;
3. API;
4. worker skeleton untuk outbox delivery bila event digunakan;
5. identity/access;
6. learner profile/onboarding;
7. curriculum/content loader untuk approved U01 seed;
8. practice/evaluation;
9. evidence/mastery/scheduling;
10. platform idempotency/outbox/audit minimum;
11. contracts/content-tooling/test-fixtures;
12. shared accessible UI primitives yang benar-benar digunakan.

Tidak perlu mengimplementasikan feature code untuk Content Operations, assessment, offline, atau AI pada Milestone 1. Boundary/package kosong hanya dibuat bila membantu enforcement atau contract; speculative skeleton tanpa consumer dihindari.

## 18. Enforcement

### 18.1 Automated

- workspace package allowlist;
- ESLint/import rule untuk layer dan module;
- TypeScript project references atau equivalent build graph;
- browser/server entry-point separation;
- circular dependency check;
- package contract tests;
- dependency graph artifact pada CI;
- bundle scan untuk prohibited server/internal modules;
- database access test memastikan route memakai use case/repository boundary;
- architecture test untuk forbidden imports.

### 18.2 Review

Pull request yang:

- menambah package/module;
- mengubah public exports;
- menambah cross-module dependency;
- membuat deployment unit;
- mengakses table milik module lain;
- menambah provider SDK ke domain/application;
- memasukkan server data ke client;

memerlukan architecture-owner review dan pembaruan ADR bila keputusan material berubah.

## 19. Alternatives Considered

### 19.1 Polyrepo per surface/service

**Ditolak untuk MVP.** Keuntungan isolation dan independent release belum sebanding dengan risiko contract drift, duplicated tooling, cross-repo atomic change, dan koordinasi content/domain/UI.

Reconsider jika ownership, release cadence, compliance, atau scaling benar-benar independen dan extraction criteria terpenuhi.

### 19.2 Microservices sejak awal

**Ditolak.** Workflow practice→evaluation→evidence→mastery memerlukan strong consistency. Memecahnya sejak awal memperkenalkan distributed failure, operational overhead, dan eventual-consistency UX tanpa evidence kebutuhan.

### 19.3 Unstructured monolith

**Ditolak.** Deployment sederhana tetapi module ownership, security boundary, dan extraction path tidak dapat ditegakkan.

### 19.4 Full-stack application dengan direct database access dari setiap route

**Ditolak.** Cepat untuk prototype kecil tetapi policy/domain rule mudah tersebar, transaction tidak konsisten, dan Content Ops/learner boundary lemah.

### 19.5 Backend-as-a-Service sebagai domain authority

**Ditolak sebagai core architecture.** Managed provider tetap dapat dipakai untuk infrastructure, tetapi authorization, academic decision, versioning, audit, dan transaction rule tetap milik Nekoru.

## 20. Positive Consequences

- domain rule dan schema dapat berubah atomik dalam satu repository;
- lint/type/test/content gates mempunyai satu build graph;
- exact contracts dapat dibagi tanpa menyalin kode;
- learner dan Content Operations tetap dapat dideploy terpisah;
- transaction inti lebih sederhana daripada distributed transaction;
- module dapat diekstrak nanti melalui public capability/event boundary;
- dependency upgrades dan security scan terpusat;
- test fixture dan implementation dapat dikunci ke VersionSet yang sama.

## 21. Negative Consequences dan Trade-offs

- CI dapat melambat jika affected-graph dan caching tidak dikelola;
- developer lebih mudah melakukan deep import karena source tersedia lokal;
- database bersama dapat mendorong cross-module query/write;
- deployment package dapat membesar tanpa export discipline;
- independent team ownership lebih sulit bila boundary tidak ditegakkan;
- satu repository mempunyai blast radius perubahan tooling lebih besar;
- modular monolith membutuhkan architecture tests dan review aktif, bukan sekadar folder.

Trade-off diterima untuk Milestone 1 karena correctness dan delivery simplicity lebih penting daripada independent service scaling.

## 22. Risks dan Mitigasi

| Risiko | Mitigasi | Evidence |
|---|---|---|
| Circular dependency | Public entry point + graph lint | CI architecture report |
| Shared package menjadi dumping ground | Owner, admission rule, domain-neutral requirement | Review + package inventory |
| Learner bundle leak | Separate app/export map + bundle test | No-answer-leakage report |
| Cross-module SQL | Repository ownership + migration/schema policy | Architecture/DB tests |
| Slow monorepo CI | Affected graph, caching, hermetic tasks | CI timing trend |
| Worker menjadi second authority | Same application use case/decision record | Integration tests |
| Surface permission confusion | Separate deployment identity and backend authz | Security tests |
| Premature abstraction | Only extract shared package with ≥2 real consumers or explicit boundary need | Review record |

## 23. Extraction Criteria

Module hanya dipertimbangkan menjadi service terpisah bila beberapa bukti berikut ada:

- materially different scaling profile;
- independent deployment cadence menjadi kebutuhan nyata;
- isolation/compliance boundary tidak dapat dipenuhi sebagai module/deployment unit;
- failure domain perlu dipisahkan;
- ownership team independen dan public contract stabil;
- transaction coupling rendah atau saga semantics telah disetujui;
- observability, on-call, data ownership, migration, dan cost siap;
- load/incident evidence menunjukkan modular monolith menjadi bottleneck.

Extraction proposal wajib memiliki ADR baru, data migration, compatibility window, failure model, SLO, security review, dan rollback plan.

## 24. Reversibility

Keputusan ini cukup reversible karena:

- module mempunyai public API;
- adapter berada di luar domain;
- event contract berversi;
- deployment unit sudah terpisah di composition root;
- table ownership dicatat;
- direct cross-module writes dilarang.

Namun repository split bukan operasi mekanis. History, CI, package publication, secrets, ownership, database, observability, dan rollout harus direncanakan.

## 25. Verification dan Acceptance Criteria

ADR ini dapat berstatus `Accepted` bila:

- [ ] Topology dan deployment units disetujui.
- [ ] Module ownership map tidak mempunyai dua authority untuk state yang sama.
- [ ] Dependency direction dan import boundary disetujui.
- [ ] Learner/client dan server-only data boundary disetujui.
- [ ] Milestone 1 slice tidak memerlukan speculative feature implementation.
- [ ] Architecture lint/test dapat direncanakan dari rules ini.
- [ ] ADR-002 dan ADR-004 menangani detail transaction/event tanpa mengubah keputusan ini.
- [ ] Security, QA, dan Operations menerima konsekuensi deployment/runtime.

Setelah bootstrap, evidence minimum:

- workspace graph;
- public export map;
- forbidden-import test;
- browser bundle leakage test;
- commands untuk lint/typecheck/unit/contract/E2E;
- owner map per package/module;
- deployment identity/permission map.

## 26. Open Implementation Details

| ID | Detail | Default sebelum diputuskan | Owner |
|---|---|---|---|
| `ADR001-OPEN-001` | Exact package naming dan TypeScript project-reference strategy | Pertahankan topology/responsibility; putuskan saat bootstrap | Engineering |
| `ADR001-OPEN-002` | Build cache remote provider | Local cache dulu; tidak mengirim source/secrets ke provider belum disetujui | Platform/Security |
| `ADR001-OPEN-003` | ORM/query builder | Tidak dipilih oleh ADR ini; repository/transaction contract tetap berlaku | Engineering/Data |
| `ADR001-OPEN-004` | API framework detail | Tidak boleh mengubah application/domain boundary | Engineering |
| `ADR001-OPEN-005` | Exact deployment mapping API dan worker | Separate runtime identity; boleh satu platform/project sesuai security review | Platform/Operations |

Open implementation detail tidak membatalkan architecture decision selama invariant dokumen ini dipertahankan.

## 27. Decision Record

| Field | Nilai |
|---|---|
| ID | `ADR-001` |
| Decision | Gunakan pnpm/Turborepo TypeScript monorepo dengan modular monolith, separate composition roots, module public contracts, dan enforced dependency direction. |
| Status | `accepted` |
| Proposed at | 13 September 2026 |
| Accepted at | 14 September 2026 |
| Decision owners | Engineering Lead + Platform Lead |
| Required reviewers | Product, Security/Privacy, Data, QA, Operations, Accessibility |
| Revisit trigger | Extraction criteria terpenuhi, compliance boundary berubah, atau repeated architecture failure menunjukkan boundary tidak efektif. |
| Supersedes | Tidak ada |
| Superseded by | Tidak ada |
