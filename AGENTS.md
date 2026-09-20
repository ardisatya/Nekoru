# AGENTS.md — Nekoru

Dokumen ini adalah kontrak repository untuk semua coding agent. Gunakan Bahasa Indonesia, tetapi pertahankan identifier, schema, event, API field, status, dan istilah teknis canonical dalam English.

## Produk dan kondisi repository

Nekoru adalah aplikasi web guided learning bahasa Jepang untuk pengguna Indonesia, dari pemula absolut sampai kesiapan internal JLPT N5. Produk harus terstruktur, adaptif, explainable, dan berbasis mastery; imut dan santai tanpa mengorbankan ketepatan akademik.

Repository dimulai sebagai documentation-only. Delivery resmi adalah Phase 0–5 pada `docs/product-specs/implementation-roadmap.md`. Fokus awal Phase 0; walking skeleton pertama U01-L1 end-to-end, online-only. Jangan menuju Phase 1, full N5, production, AI evaluation, assessment/readiness, atau offline runtime sebelum gate fasenya terpenuhi.

## Authority dan konflik

Gunakan urutan authority berikut ketika sumber bertentangan:

1. Hukum, privacy/legal approval, mandatory security control, rights, dan keselamatan pengguna.
2. ADR berstatus `Accepted` untuk keputusan yang dicakupnya.
3. Dokumen berstatus `Approved` untuk scope dan version yang dinyatakan.
4. Source-of-truth domain untuk keputusan akademik, assessment, interaction, accessibility, atau operasi.
5. Dokumen `Draft` sebagai proposal yang belum menjadi approval.
6. Roadmap sebagai pengatur urutan, dependency, dan gate; roadmap tidak membuat keputusan domain baru.

Rekomendasi, contoh, safe default, placeholder, atau nilai `TBD` bukan approval. Jika konflik tidak dapat diselesaikan melalui hierarchy ini, catat sumber, affected scope, dan safe behavior lalu minta keputusan owner. Jangan membuat kompromi diam-diam.

Agent boleh memilih documented bootstrap default dan mengerjakan Phase 0 secara local/internal. Catat keputusan material sebagai `proposed` atau pending approval. Jangan memalsukan approver, receipt, sign-off, timestamp, `approved`, `passed`, `done`, atau readiness claim. Phase 1 menunggu approval Phase 0 dan dependency terkait.

## Routing dokumen

Baca dokumen yang relevan; jangan mengimplementasikan domain dari ringkasan atau ingatan.

| Kebutuhan                          | Sumber yang harus dibaca                                                                                                                                               |
| ---------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Scope, phase, dependency, blocker  | `docs/product-specs/implementation-readiness.md`, lalu `implementation-roadmap.md`                                                                                     |
| Architecture dan module boundary   | ADR terkait di `docs/architecture/`; gunakan `technical-architecture.md` untuk konteks yang tidak ditetapkan ADR                                                       |
| Domain, schema, API, event, policy | `domain-model-and-schemas.md`, `api-and-event-contracts.md`, `learning-policy-and-registry-n5.md`                                                                      |
| Curriculum dan progression         | `curriculum-architecture.md`, `docs/content/content-progression-n5.md`, lalu inventory/blueprint domain terkait                                                        |
| Learning, mastery, practice        | `learning-engine.md`, `mastery-specification.md`, `practice-engine.md`                                                                                                 |
| Assessment dan readiness           | `assessment-specification-n5.md` serta approved policy/registry; tetap disabled sebelum gate Phase 4                                                                   |
| U01-L1 walking skeleton            | `docs/content/content-seed-u01.md` dan Milestone 1 sections pada readiness, contract, test, dan UI docs                                                                |
| Learner atau Content Ops UI        | `docs/ui-ux/02-information-architecture.md`, `docs/ui-ux/03-user-flows.md`, screen specification terkait, dan `docs/ui-ux/06-practice-interactions.md` bila applicable |
| Visual system dan accessibility    | `docs/ui-ux/07-design-system.md`, `docs/ui-ux/08-accessibility-content-and-edge-cases.md`, dan `platform-support-and-accessibility-matrix.md`                          |
| Security, privacy, identity        | `security-privacy-data-governance.md` dan ADR-005                                                                                                                      |
| Test, Done, analytics, handoff     | `test-and-quality-plan.md`, `definition-of-done.md`, `docs/ui-ux/10-analytics-and-handoff.md`                                                                          |

Semua path `docs/product-specs/*.md` pada tabel ditulis relatif terhadap `docs/product-specs/` bila tidak diawali `docs/`.

## Workflow agent

1. Tentukan phase, capability, actor, source decision, requirement/acceptance ID, dan out-of-scope task.
2. Baca authority docs serta current implementation sebelum membuat asumsi atau perubahan.
3. Periksa dependency, open decision, `DEP-*`, `BLK-*`, `INC-*`, `SUB-*`, dan `REL-*` yang applicable.
4. Untuk bootstrap nonproduction, pilih documented recommendation yang paling konservatif, tulis rationale dan compatibility impact, lalu teruskan pekerjaan Phase 0. Approval formal tetap pending.
5. Implementasikan vertical slice terkecil yang memenuhi acceptance criteria dan tetap generik untuk U01–U24. Jangan membuat model khusus U01 yang menutup evolusi domain lain.
6. Ubah contract, schema, fixture, migration, telemetry, test, dan dokumentasi bersama behavior yang dipengaruhi. Generated artifact tidak boleh menjadi sumber kebenaran kedua.
7. Jalankan test pada lapisan terendah yang membuktikan behavior, lalu jalankan gate lebih luas hanya bila risk atau handoff membutuhkannya.
8. Laporkan perubahan, exact verification yang dijalankan, hasilnya, artifact/version terkait, known limitation, dan blocker yang masih terbuka.

Lanjutkan secara otonom untuk read-only inspection serta perubahan local/internal yang reversible dan jelas berada dalam scope task. Minta izin sebelum provisioning berbayar, production deployment, perubahan data production, penggunaan atau rotasi production secret/provider, tindakan destruktif, atau perluasan scope material tanpa documented safe default.

## Bootstrap contract Phase 0

Sebelum manifest dan lockfile tersedia, gunakan baseline berikut. Setelah bootstrap, manifest, `packageManager`, lockfile, migration, dan decision record menjadi authority exact version; upgrade harus disengaja dan diverifikasi.

- Node.js 24 LTS, pnpm 12 yang dipin melalui `packageManager`, TypeScript strict, ESM, pnpm workspace, dan Turborepo.
- Web: Next.js 16 App Router + React 19. Gunakan CSS Modules untuk style lokal dan shared semantic CSS custom properties dari design tokens. Mulai dari semantic HTML; jangan menambah component primitive dependency tanpa kebutuhan accessibility yang konkret.
- API: NestJS 11 + Fastify 5. Worker memakai composition root terpisah dan tidak menyediakan public browser route. API dan worker mempunyai runtime identity serta permission berbeda.
- Data: PostgreSQL 18 di Neon dan stable Drizzle ORM/Kit. TypeScript schema menghasilkan ordered SQL migration yang direview. Gunakan `generate` dan `migrate`; jangan memakai schema `push` pada shared environment dan jangan mengubah migration yang sudah diterapkan.
- Canonical JSON: package `canonicalize` di belakang wrapper internal RFC 8785/JCS dengan golden fixtures. Object internal tidak di-hash langsung.
- Identity: `@clerk/nextjs` pada web dan `@clerk/backend` pada API. Pisahkan development, staging, dan production identity. Learner memakai Google atau email link; staff memakai Google plus exact verified-email allowlist dan authorization backend.
- Nonproduction deployment target: Vercel region `sin1`. Learner web, Content Ops web, API, dan worker mempertahankan deployment/bundle/security boundary masing-masing.

Target topology ADR-001:

```text
apps/{learner-web,content-ops-web,api,worker}
packages/{domain,application,contracts,persistence,providers,ui,design-tokens,content-tooling,test-fixtures,config}
content/{source,manifests,fixtures}
docs/{architecture,product-specs,content,ui-ux}
tooling/
```

Jangan gabungkan responsibility folder tanpa ADR baru. Jangan membuat nested `AGENTS.md` sampai direktori implementasi nyata memerlukan aturan yang lebih spesifik.

Scaffold root harus menyediakan command interface berikut:

```text
pnpm dev
pnpm build
pnpm format:check
pnpm lint
pnpm typecheck
pnpm test
pnpm test:unit
pnpm test:contract
pnpm test:integration
pnpm test:e2e
pnpm test:a11y
pnpm content:validate
pnpm db:generate
pnpm db:migrate
pnpm check
pnpm check:pr
```

`check` adalah fast deterministic local gate. `check:pr` mencakup applicable PR gate, termasuk database/integration, component/accessibility automation, security checks, content validation, dan critical E2E smoke. Sebelum scaffold menyediakan command tersebut, jangan mengklaim command sudah dijalankan.

## Architecture dan data invariants

- PostgreSQL adalah business source of truth. Redis, QStash, browser cache, analytics, dan AI output tidak pernah menjadi authority akademik atau history final.
- `packages/domain` harus framework-free dan deterministic. Dependency bergerak dari adapter/composition root menuju application/domain, bukan sebaliknya.
- Setiap module memiliki public application contract dan owned PostgreSQL schema/table. Dilarang mengimpor repository internal atau membaca/menulis table module lain sebagai shortcut.
- Cross-module critical mutation memakai Unit of Work yang disetujui; async effect memakai transactional outbox dan idempotent inbox. QStash bersifat at-least-once dan bukan job ledger.
- Mutation retryable wajib memiliki scoped `Idempotency-Key`/stable dedupe key. Mutable aggregate memakai integer `revision` dan `expected_revision`; stale write menghasilkan conflict, bukan last-write-wins.
- Milestone 1 objective submission menulis Practice, Evidence, Mastery, idempotency receipt, dan outbox secara sinkron dalam satu transaction sesuai ADR-002.
- Submission, evaluation, evidence, audit, correction, dan adjudication mempertahankan append-only history. Koreksi memakai event/version baru dengan supersession; jangan rewrite history.
- Gunakan prefixed ULID, exact `VersionRef`/`VersionSet`, RFC 8785 canonical JSON, scaled integer untuk angka akademik yang di-hash, dan SHA-256 contract dari ADR-003.
- Runtime hanya memilih content berstatus `approved`, exact-compatible, version-locked, dan tidak quarantined. Preview tidak menghasilkan evidence.
- AI hanya menghasilkan candidate terstruktur dalam boundary approved. Pada Milestone 1 AI evaluation disabled dan objective path harus tetap deterministic saat provider gagal.
- Offline, assessment/readiness, dan optional product analytics tetap disabled sampai phase, policy, privacy, integrity, dan accessibility gate terkait dibuka.

## API, security, dan privacy

- REST JSON menggunakan `/api/v1`, executable Zod schema, OpenAPI 3.1, dan RFC 7807-style `application/problem+json` sesuai approved contract.
- Wire/storage/hash DTO canonical memakai `snake_case`. TypeScript internal boleh `camelCase` hanya di belakang adapter yang memvalidasi canonical DTO sebelum persistence atau hashing.
- Authentication membuktikan identity; backend Nekoru memutuskan authorization pada setiap read/mutation berdasarkan role, permission, ownership/assignment, lifecycle, environment, separation of duties, dan action risk. UI guard bukan security control.
- Default deny berlaku untuk missing atau stale critical authorization context. Clerk custom claims, email, client-supplied internal ID, dan visible route tidak menjadi authority.
- Jangan simpan atau kirim secret ke client. Production secret tidak boleh masuk source, fixture, PR build, log, analytics, error tracker, atau generated artifact.
- Generic log/analytics/event dilarang memuat raw answer/response, answer key/rubric tersembunyi, token, magic link, email, detailed accessibility data, atau learner payload sensitif. Gunakan allowlist property dan pseudonymous internal ID.
- Error user-facing tidak mengekspos stack trace, internal permission graph, provider detail sensitif, atau keberadaan resource milik learner lain.

## UI, content, dan accessibility

- Learner surface responsive mobile-first mulai 320 CSS px. Content Operations desktop-first, terpisah dalam navigation, permission, deployment, dan bundle; internal code atau answer key tidak boleh masuk learner bundle.
- Target formal WCAG 2.2 AA sejak komponen pertama: keyboard, screen reader, visible focus minimum 3 px, target utama 44×44 CSS px, zoom 200%, reflow 400%, forced colors, reduced motion, Japanese IME, slow network, dan reconnect.
- Gunakan semantic `lang="id"` untuk UI Indonesia, `lang="ja"` untuk bahasa Jepang, dan semantic ruby untuk furigana. Uji kana, small kana, diacritic, kanji, wrapping, font fallback, dan IME.
- Jangan autoplay audio. Audio failure adalah technical state, bukan learner error. Sediakan transcript/alternative sesuai blueprint tanpa mengubah konstruk.
- Jangan memakai shake untuk jawaban salah, emoji sebagai semantic icon, warna sebagai satu-satunya pembeda status, atau motion sebagai satu-satunya pembawa informasi.
- UI tidak menghitung mastery, progression, readiness, atau evidence. Render keputusan backend beserta reason code dan pisahkan completion, mastery, review due, readiness, progress, dan gamification.
- Gunakan Bahasa Indonesia yang jelas, suportif, jujur, dan tidak menghakimi. Japanese text, transliteration, literal translation, dan communicative translation adalah field terpisah; jangan menggabungkannya menjadi display string canonical.
- Content hasil AI tetap candidate. Tidak ada material learner-visible atau scored yang masuk runtime sebelum schema, academic, linguistic, rights, accessibility, dan publication checks yang applicable lulus.

## Testing dan evidence

- Gunakan Vitest untuk unit dan invariant/property tests; Zod/JSON Schema/OpenAPI/event fixtures untuk schema/contract; PostgreSQL 18 ephemeral nyata untuk constraint, transaction, migration, outbox, dan inbox; Playwright untuk E2E; axe plus manual platform checks untuk accessibility.
- Tempatkan test pada lapisan terendah yang membuktikan behavior. E2E membuktikan wiring dan critical journey, bukan seluruh kombinasi domain.
- Domain kritis—evaluation, mastery, scheduling, authorization, idempotency, versioning—wajib mempunyai boundary dan invariant/property tests dengan injected clock, ID factory, dan randomness.
- Setiap endpoint/event memiliki positive, validation, authentication/authorization, error, serta stale/idempotency test bila applicable.
- Setiap P0 journey memiliki happy-path dan critical recovery E2E. Setiap bug fix wajib memiliki regression test yang gagal sebelum fix.
- Migration diuji dari empty database dan previous representative fixture. Dilarang memakai mock database untuk membuktikan SQL, constraint, isolation, lock, atau transaction behavior.
- Test ID mengikuti `<suite>-<domain>-<behavior>-<sequence>` dan nama menyatakan expected behavior; jangan memakai nama `works`, `basic`, atau `test1`.
- Status Done memerlukan evidence terhadap exact artifact versions dan approval berwenang. Test hijau saja tidak mengizinkan agent menandai gate atau milestone selesai.

## Code Review Rules

Flag sebagai blocker atau high severity sesuai source contract bila perubahan:

- membocorkan answer key, raw answer, secret, PII, atau hidden assessment content;
- melewati backend authorization, staff allowlist, ownership, active role, atau separation of duties;
- membuat duplicate academic effect, last-write-wins state kritis, history rewrite, atau keputusan yang tidak reproducible;
- melakukan direct cross-module persistence access atau memasukkan framework/provider ke domain;
- menjalankan draft, incompatible, deprecated-unsafe, atau quarantined content;
- memberi mastery penalty akibat provider, audio, network, atau technical failure;
- mengaktifkan AI, offline, assessment/readiness, analytics, atau production exposure sebelum gate terkait;
- merusak keyboard flow, semantic structure, Japanese text/IME, focus, zoom/reflow, reduced motion, atau construct-equivalent alternative;
- mengisi nilai akademik/privacy/operations yang belum approved dengan default tersembunyi;
- mengklaim approval, support, readiness, atau Done tanpa evidence dan sign-off exact-version.

Safe path adalah memakai public module contract, deterministic/versioned policy, append-only correction, approved content, explicit pending/technical state, fail-closed behavior, serta decision record dan owner review yang benar.

## Handoff minimum

Pada akhir task, nyatakan:

- outcome dan scope yang benar-benar selesai;
- file/contract/behavior penting yang berubah;
- command/test yang dijalankan beserta hasilnya;
- test atau verification yang tidak dapat dijalankan dan alasannya;
- decision record, dependency, gate, version, known limitation, dan blocker yang masih relevan;
- approval atau external action yang masih dibutuhkan, tanpa mengklaimnya sudah diberikan.
