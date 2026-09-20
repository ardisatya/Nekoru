# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Delegated melalui kontrak repository: Node.js 24 LTS, pnpm 12, TypeScript strict ESM, Next.js 16/React 19, NestJS 11/Fastify 5, PostgreSQL 18, dan Drizzle ORM. Phase 0 berjalan local/internal dan online-only.

## Users

Pelajar bahasa Jepang di Indonesia, terutama pemula absolut dan pelajar yang menargetkan kesiapan internal JLPT N5 dengan waktu belajar terbatas.

## Product Purpose

Nekoru menyatukan kurikulum, jadwal, latihan, evaluasi, dan progres dalam jalur belajar yang terstruktur, adaptif, explainable, dan berbasis mastery. Keberhasilan berarti learner selalu memahami langkah berikutnya tanpa completion atau gamification disamakan dengan mastery.

## Positioning

Nekoru menggabungkan graph prerequisite, evidence versioned, dan keputusan belajar deterministic sehingga rekomendasi dapat dijelaskan dan direproduksi, sambil memakai Bahasa Indonesia yang ramah untuk learner.

## Operating Context

Phase 0 membangun fondasi executable dan prototype U01-L1. Learner web mobile-first terpisah dari Content Operations yang desktop-first. PostgreSQL adalah business source of truth; konten hanya boleh dipilih runtime setelah approved, compatible, version-locked, dan tidak quarantined.

## Capabilities and Constraints

- Phase 0 tidak mencakup walking skeleton Phase 1, full N5, production deployment, AI evaluation, assessment/readiness, atau offline runtime.
- Objective evaluation harus deterministic dan technical failure tidak boleh menjadi learner error atau mastery penalty.
- Wire, storage, dan hash DTO memakai `snake_case`; keputusan penting memakai exact versions, idempotency, revision, dan append-only history.
- Bootstrap local boleh memakai provider double dan synthetic fixture. Approval, credentials, rights, dan evidence eksternal yang belum tersedia tetap pending.

## Brand Commitments

Nekoru terasa seperti teman belajar yang hangat, imut tanpa kekanak-kanakan, santai tetapi tetap tepat secara akademik, suportif, jujur, dan tidak menghakimi. Bahasa produk adalah Bahasa Indonesia; Japanese text, transliteration, literal translation, dan communicative translation tetap sebagai field terpisah.

## Evidence on Hand

Repository menyediakan roadmap, readiness assessment, lima ADR `Accepted`, domain/API/policy contracts, seed U01-L1, content validation rubric, test plan, serta spesifikasi UI/accessibility. Audio dua speaker, rights receipt, usability research, physical assistive-technology evidence, dan production credentials belum tersedia dan tidak boleh difabrikasi.

## Product Principles

1. Mastery dan retensi lebih penting daripada completion semu.
2. Adaptasi harus deterministic, versioned, auditable, dan mudah dijelaskan.
3. Gangguan teknis tidak pernah dianggap kesalahan akademik learner.
4. Konten learner harus approved dan exact-compatible sebelum runtime.
5. Scope bergerak lewat phase gate; foundation tidak boleh diam-diam mengaktifkan fitur fase berikutnya.

## Accessibility & Inclusion

Target formal WCAG 2.2 AA sejak komponen pertama: keyboard, screen reader, visible focus minimum 3 px, target utama 44×44 CSS px, zoom 200%, reflow 400%, forced colors, reduced motion, Japanese IME, slow network, dan reconnect. Bahasa Jepang memakai semantic `lang="ja"` serta ruby saat furigana diperlukan.
