# Status Phase 0 — Fondasi yang bisa dijalankan

> **Siap diuji internal:** Fondasi teknis dan contoh alur belajar sudah siap diperiksa tim internal. Ini belum merupakan produk jadi atau approval Phase 0.

Diperbarui: 2026-09-20T15:01:07+07:00

| Milestone | Status | Hasil yang mudah dipahami | Langkah berikutnya |
| --- | --- | --- | --- |
| P0.1 — Arah dan tanggung jawab jelas | **Menunggu pemeriksaan** | Sumber keputusan, dependency, blocker, owner, dan approval yang dibutuhkan tercatat. | Owner memeriksa reconciliation dan ownership matrix. |
| P0.2 — Pilihan teknologi tercatat | **Siap diuji internal** | Bootstrap stack mengikuti kontrak repository dan dipin melalui manifest serta lockfile. | Gunakan stack ini untuk pekerjaan local/internal; approval formal tetap pending. |
| P0.3 — Kerangka aplikasi dapat dijalankan | **Siap diuji internal** | Monorepo dan pemeriksaan secret/dependency lulus; migration serta integration test berjalan pada PostgreSQL 18.6 lokal yang sementara. | Reviewer Engineering, Security, dan QA memeriksa commit serta evidence hosted CI. |
| P0.4 — Aturan data dapat diuji otomatis | **Menunggu pemeriksaan** | Aturan schema, version, hash, event, API, dan content tervalidasi; migration kosong, constraint idempotency, dan rollback transaksi lulus pada PostgreSQL 18.6 lokal. | Reviewer data/teknis memeriksa migration, contract, dan evidence exact-version. |
| P0.5 — Contoh belajar siap diperiksa | **Siap diuji internal** | Prototype 20 state, seed draft U01-L1, auth double, dan penjaga telemetry siap diuji tim internal. | Uji internal lebih dulu lalu kumpulkan evidence dan approval eksternal. |

## Hal yang masih menunggu

- **P0.1:** Owner dan approver manusia belum memberikan sign-off.
- **P0.4:** Reviewer data/teknis belum meninjau dan menyetujui contract serta evidence untuk versi artefak ini.
- **P0.5:** Audio dua speaker, rights receipt, dan review akademik belum tersedia.
- **P0.5:** Usability research dan uji assistive technology pada perangkat fisik belum dilakukan.
- **P0.5:** Live Clerk environment smoke belum dapat dilakukan tanpa credentials.

Dokumen ini dihasilkan dari `phase-0-status.json`; jangan mengeditnya langsung.
