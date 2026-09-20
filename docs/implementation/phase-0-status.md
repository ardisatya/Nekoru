# Status Phase 0 — Fondasi yang bisa dijalankan

> **Siap diuji internal:** Fondasi teknis dan contoh alur belajar sudah siap diperiksa tim internal. Ini belum merupakan produk jadi atau approval Phase 0.

Diperbarui: 2026-09-21T06:23:12+07:00

| Milestone | Status | Hasil yang mudah dipahami | Langkah berikutnya |
| --- | --- | --- | --- |
| P0.1 — Arah dan tanggung jawab jelas | **Disetujui** | Sumber keputusan, dependency, blocker, owner, dan approval yang dibutuhkan tercatat; approval scope P0.1 telah dikonfirmasi owner. | Pertahankan decision record dan lakukan impact review untuk perubahan berikutnya. |
| P0.2 — Pilihan teknologi tercatat | **Disetujui** | Bootstrap stack mengikuti kontrak repository dan dipin melalui manifest serta lockfile; approval scope P0.2 telah dikonfirmasi owner. | Gunakan stack ini untuk pekerjaan local/internal; upgrade memerlukan impact review. |
| P0.3 — Kerangka aplikasi dapat dijalankan | **Disetujui** | Monorepo, pemeriksaan secret/dependency, migration PostgreSQL 18.6, dan hosted CI lulus; approval scope P0.3 telah dikonfirmasi owner. | Pertahankan exact-version evidence; perubahan workflow atau dependency memerlukan gate ulang. |
| P0.4 — Aturan data dapat diuji otomatis | **Disetujui** | Aturan schema, version, hash, event, API, dan content tervalidasi; migration kosong, constraint idempotency, rollback transaksi, dan approval scope P0.4 telah dikonfirmasi owner. | Pertahankan contract dan evidence exact-version; perubahan domain memerlukan review ulang. |
| P0.5 — Contoh belajar siap diperiksa | **Siap diuji internal** | Prototype 20 state, seed draft U01-L1, 26 normalized audio asset dengan checksum dari VOICEVOX Nemo Engine 0.24.0, rights receipt verified_local_only, audio review owner-attested, academic/linguistic review owner-attested local-only, accessibility emulator exception local-only, dan technical waiver local-only siap diuji tim internal. History GitHub main sudah dibersihkan dari binary audio; emulator accessibility matrix lulus 14/15 test (1 skip untuk project desktop-only). | Pertahankan scope local-only dan jangan membuka redistribution atau production runtime. Saat Phase 1 dibuka, implementasikan actual audio player lalu lakukan device/AT matrix bila ingin membuat formal platform-support claim; Clerk smoke memerlukan credentials non-production. |

## Hal yang masih menunggu

- **P0.5:** Actual audio playback dan physical speaker/headphone playback tetap deferred ke Phase 1 P1.3; seed tetap draft dan runtime disabled.
- **P0.5:** Formal WCAG/platform support dan sesi NVDA/VoiceOver/TalkBack belum diklaim. Exception emulator hanya berlaku untuk local-only Phase 0 dan tidak mengubah approved platform matrix.
- **P0.5:** Live Clerk environment smoke belum dapat dilakukan tanpa credentials.

Dokumen ini dihasilkan dari `phase-0-status.json`; jangan mengeditnya langsung.
