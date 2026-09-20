# Status Phase 0 — Fondasi yang bisa dijalankan

> **Siap diuji internal:** Fondasi teknis dan contoh alur belajar sudah siap diperiksa tim internal. Ini belum merupakan produk jadi atau approval Phase 0.

Diperbarui: 2026-09-20T20:01:34+07:00

| Milestone | Status | Hasil yang mudah dipahami | Langkah berikutnya |
| --- | --- | --- | --- |
| P0.1 — Arah dan tanggung jawab jelas | **Disetujui** | Sumber keputusan, dependency, blocker, owner, dan approval yang dibutuhkan tercatat; approval scope P0.1 telah dikonfirmasi owner. | Pertahankan decision record dan lakukan impact review untuk perubahan berikutnya. |
| P0.2 — Pilihan teknologi tercatat | **Disetujui** | Bootstrap stack mengikuti kontrak repository dan dipin melalui manifest serta lockfile; approval scope P0.2 telah dikonfirmasi owner. | Gunakan stack ini untuk pekerjaan local/internal; upgrade memerlukan impact review. |
| P0.3 — Kerangka aplikasi dapat dijalankan | **Disetujui** | Monorepo, pemeriksaan secret/dependency, migration PostgreSQL 18.6, dan hosted CI lulus; approval scope P0.3 telah dikonfirmasi owner. | Pertahankan exact-version evidence; perubahan workflow atau dependency memerlukan gate ulang. |
| P0.4 — Aturan data dapat diuji otomatis | **Disetujui** | Aturan schema, version, hash, event, API, dan content tervalidasi; migration kosong, constraint idempotency, rollback transaksi, dan approval scope P0.4 telah dikonfirmasi owner. | Pertahankan contract dan evidence exact-version; perubahan domain memerlukan review ulang. |
| P0.5 — Contoh belajar siap diperiksa | **Siap diuji internal** | Prototype 20 state, seed draft U01-L1, 26 draft audio asset dengan checksum dari VOICEVOX Nemo Engine 0.24.0, dan rights receipt verified_local_only siap diuji tim internal. | Uji internal lebih dulu lalu kumpulkan evidence dan approval eksternal. |

## Hal yang masih menunggu

- **P0.5:** Rights receipt VOICEVOX sudah verified_local_only; audio binary tetap local-only dan tidak dilacak Git, sementara audio QA dan review akademik belum selesai.
- **P0.5:** Commit publik sebelumnya masih dapat memuat binary audio; history cleanup atau private repository belum dilakukan.
- **P0.5:** Usability research dan uji assistive technology pada perangkat fisik belum dilakukan.
- **P0.5:** Live Clerk environment smoke belum dapat dilakukan tanpa credentials.

Dokumen ini dihasilkan dari `phase-0-status.json`; jangan mengeditnya langsung.
