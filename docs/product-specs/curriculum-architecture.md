# Arsitektur Kurikulum Nekoru — Pemula Absolut hingga JLPT N5

**Status:** Draft v0.1  
**Audiens:** Tim akademik, product, data, dan engineering  
**Cakupan MVP:** Pemula absolut sampai kesiapan JLPT N5  
**Area pembelajaran:** Vocabulary, Kanji, Grammar, Reading, dan Listening  
**Bahasa pengantar:** Bahasa Indonesia

## 1. Tujuan Dokumen

Dokumen ini menjadi kontrak bersama antara tim akademik dan engineering untuk:

1. menentukan hasil belajar yang harus dicapai pengguna;
2. membagi perjalanan pemula–N5 menjadi tahap dan unit yang dapat dijadwalkan;
3. menetapkan kategori dan distribusi materi tanpa memuat daftar konten lengkap;
4. mendefinisikan hubungan prasyarat, bukti penguasaan, review, dan remedial;
5. menyediakan model data kurikulum yang dapat diimplementasikan dan diberi versi;
6. menjaga agar konten yang dibuat atau dibantu AI tetap mengikuti struktur dan validasi akademik.

Dokumen ini tidak menjadi daftar resmi kosakata, kanji, atau grammar JLPT N5. JLPT tidak menerbitkan daftar tersebut sejak revisi 2010. Nekoru membangun inventaris internal yang dapat dipertanggungjawabkan melalui triangulasi sumber dan review akademik.

## 2. Keputusan Kurikulum Utama

| Keputusan | Ketetapan MVP |
| --- | --- |
| Orientasi | Kesiapan JLPT N5 dengan pemahaman kontekstual, bukan hafalan daftar |
| Jalur | Satu graph kurikulum kanonik; urutan dan kecepatannya dipersonalisasi |
| Cakupan kemampuan | Hanya Vocabulary, Kanji, Grammar, Reading, dan Listening |
| Speaking dan writing | Bukan learning outcome dan tidak memiliki skor domain tersendiri |
| Menyusun kalimat | Boleh digunakan sebagai tipe latihan grammar terstruktur, bukan asesmen writing bebas |
| Unit progres | Mastery-based; menyelesaikan tampilan pelajaran tidak sama dengan menguasai materi |
| Daftar konten lengkap | Disimpan sebagai artefak terpisah dan direferensikan melalui ID serta versi |
| Baseline akademik | 300 jam belajar efektif untuk pemula absolut hingga readiness N5 |
| Struktur baseline | 6 tahap, 24 unit, sekitar 900 target vocabulary, 110 kanji, dan 90 konsep grammar |
| Readiness | Penguasaan tertunda, cakupan kurikulum, dan performa pada sedikitnya dua simulasi |

Angka target merupakan baseline internal Nekoru untuk perencanaan dan harus dievaluasi setelah tersedia data hasil belajar. Angka tersebut bukan daftar atau rekomendasi resmi JLPT.

## 3. Ruang Lingkup dan Batasan

### 3.1 Termasuk

- Fondasi bunyi, hiragana, katakana, dan ortografi dasar.
- Vocabulary, Kanji, Grammar, Reading, dan Listening pemula–N5.
- Peta tahap, unit, prasyarat, dan distribusi target.
- Placement, progression, mastery, spaced review, remedial, dan readiness.
- Blueprint tipe latihan dan asesmen.
- Kontrak metadata antara kurikulum dan bank konten.
- Aturan validasi serta versioning kurikulum.

### 3.2 Tidak termasuk

- Speaking, percakapan bebas, pronunciation scoring, dan writing bebas.
- Daftar lengkap setiap kata, kanji, pola grammar, teks, audio, dan butir soal.
- N4–N1, walaupun struktur ID dan graph harus dapat diperluas ke level tersebut.
- Algoritma machine learning final untuk estimasi kemampuan.
- Klaim bahwa satu skor latihan mentah setara dengan scaled score resmi JLPT.

## 4. Hierarki Acuan Akademik

Sumber memiliki fungsi dan tingkat otoritas yang berbeda. Sumber pada tingkat lebih rendah tidak boleh mengubah batas kompetensi yang ditetapkan tingkat lebih tinggi.

### 4.1 Tier A — Acuan normatif

**Sumber:** JLPT resmi dari The Japan Foundation dan Japan Educational Exchanges and Services.

Digunakan untuk:

- deskripsi kompetensi N5;
- struktur Vocabulary, Grammar–Reading, dan Listening;
- tujuan setiap tipe soal;
- panjang dan karakteristik bacaan;
- format contoh soal dan official practice workbook;
- struktur penilaian dan ambang kelulusan resmi.

Tidak digunakan sebagai daftar item karena JLPT secara eksplisit tidak lagi menerbitkan spesifikasi berupa daftar vocabulary, kanji, dan grammar.

### 4.2 Tier B — Kerangka hasil belajar

**Sumber:** JF Standard for Japanese-Language Education dan JF Can-do A1.

Digunakan untuk:

- menulis learning outcome yang berorientasi pada kemampuan;
- memastikan pengetahuan bahasa digunakan dalam konteks;
- memilih tema kehidupan sehari-hari yang relevan;
- membangun rubrik comprehension.

Kelulusan N5 mendapat referensi CEFR A1 untuk kompetensi linguistik dan reseptif yang diuji JLPT. Hal ini tidak berarti JLPT N5 mengukur keseluruhan A1 karena production dan interaction tidak diuji.

### 4.3 Tier C — Acuan sequencing dan coverage

**Sumber utama:**

- Irodori Starter A1 untuk tema, konteks, audio, dan progresi Can-do;
- Marugoto Starter A1 Rikai untuk progresi sistem bahasa;
- Genki I dan Minna no Nihongo I sebagai pembanding kelengkapan dan urutan pengajaran.

Sumber komersial hanya digunakan untuk triangulasi. Tim tidak boleh menyalin urutan bab, penjelasan, contoh, latihan, audio, atau aset yang dilindungi hak cipta.

### 4.4 Tier D — Inventaris internal tervalidasi

Inventaris Nekoru menjadi sumber operasional aplikasi. Sebuah target dapat dimasukkan jika memenuhi sedikitnya satu kondisi berikut:

1. diperlukan untuk mencapai outcome atau format soal Tier A;
2. diperlukan oleh Can-do yang dipilih pada Tier B;
3. didukung oleh sedikitnya dua acuan Tier C;
4. ditambahkan melalui keputusan reviewer akademik dengan rasional tertulis.

Setiap item harus memiliki sumber keputusan, kategori, prasyarat, tingkat, status validasi, dan versi.

## 5. Profil Lulusan MVP

Pengguna yang dinyatakan **N5 Ready** oleh Nekoru diharapkan memenuhi outcome berikut.

### 5.1 Vocabulary

- Mengenali sekitar 900 unit leksikal tingkat pemula dalam kana atau kanji target.
- Memilih arti berdasarkan konteks, bukan hanya pasangan terjemahan.
- Mengenali parafrasa dasar dan kolokasi yang telah diajarkan.
- Membedakan kata yang bentuk atau maknanya berdekatan pada tingkat N5.

Satu unit leksikal dihitung sebagai pasangan **lemma + sense**. Dua makna yang berbeda secara pedagogis dihitung sebagai dua target walaupun bentuk katanya sama.

### 5.2 Kanji

- Mengenali sekitar 110 karakter kanji dasar di dalam vocabulary target.
- Memilih bacaan yang benar ketika karakter muncul dalam kata yang telah dipelajari.
- Memetakan bentuk kana ke ejaan kanji atau katakana dalam ruang lingkup target.
- Memahami makna inti karakter tanpa diwajibkan menghafal semua on-yomi dan kun-yomi.

Kanji diajarkan secara **word-first**. Sebuah bacaan hanya menjadi target jika muncul dalam vocabulary yang disetujui.

### 5.3 Grammar

- Menguasai sekitar 90 konsep grammar atau form–function mappings.
- Memilih bentuk yang sesuai untuk sebuah kalimat.
- Menentukan urutan unsur kalimat yang sintaktis dan masuk akal.
- Memahami kontribusi grammar terhadap alur antarkalimat dalam teks pendek.

Variasi infleksi dari satu konsep tidak otomatis dihitung sebagai konsep grammar terpisah. Inventaris grammar harus menyimpan bentuk, fungsi, batas penggunaan, kontras, dan kesalahan umum.

### 5.4 Reading

- Membaca ekspresi dan kalimat dasar yang menggunakan hiragana, katakana, dan kanji target.
- Memahami teks pendek sekitar 80 karakter pada tema belajar, kehidupan sehari-hari, dan pekerjaan dasar.
- Memahami teks mudah sekitar 250 karakter.
- Mengambil informasi yang diperlukan dari pengumuman atau material fungsional sekitar 250 karakter.
- Menjawab pertanyaan detail, maksud sederhana, referensi, urutan, dan pencarian informasi.

### 5.5 Listening

- Memahami percakapan singkat pada situasi sehari-hari atau kelas ketika diucapkan perlahan dan jelas.
- Mengambil informasi yang diperlukan untuk menentukan tindakan.
- Menangkap poin yang telah diarahkan oleh pertanyaan.
- Memilih ungkapan lisan yang sesuai dengan situasi bergambar.
- Memberikan pilihan respons yang sesuai terhadap ujaran singkat.

## 6. Baseline Akademik dan Beban Belajar

### 6.1 Definisi jam efektif

Satu jam efektif adalah 60 menit aktivitas belajar yang menghasilkan bukti, seperti mempelajari target baru, active recall, membaca, mendengarkan, mengerjakan asesmen, atau menerima remedial. Waktu membuka aplikasi, membaca menu, dan idle tidak dihitung.

### 6.2 Baseline 300 jam

| Komponen | Jam | Proporsi |
| --- | ---: | ---: |
| Instruksi dan latihan target baru | 210 | 70% |
| Spaced review dan cumulative practice | 60 | 20% |
| Checkpoint, simulasi, dan remedial terarah | 30 | 10% |
| **Total** | **300** | **100%** |

Distribusi 210 jam target baru menggunakan domain utama sebagai tag. Aktivitas terintegrasi dapat melatih lebih dari satu domain tetapi hanya dihitung sekali terhadap total waktu.

| Domain utama | Jam target baru |
| --- | ---: |
| Vocabulary | 50 |
| Kanji | 30 |
| Grammar | 50 |
| Reading | 40 |
| Listening | 40 |
| **Total** | **210** |

### 6.3 Rekomendasi kalender

Kurikulum tidak menyimpan durasi kalender sebagai syarat kelulusan. Scheduler menghitung kalender dari sisa beban pengguna.

| Mode | Jam per minggu | Estimasi baseline |
| --- | ---: | ---: |
| Ringan | 5 | 60 minggu |
| Rekomendasi | 8 | 38 minggu |
| Intensif | 12 | 25 minggu |
| Sangat intensif | 15 | 20 minggu |

Rekomendasi awal Nekoru adalah **8 jam per minggu selama sekitar 38 minggu**. Scheduler harus menambahkan buffer kalender untuk hari terlewat, asesmen ulang, dan variasi retensi pengguna. Pengguna boleh mengubah beban; aplikasi harus menjelaskan dampaknya terhadap tanggal kesiapan.

### 6.4 Rumus estimasi personal

```text
remaining_minutes =
  sum(weighted_minutes untuk target yang belum dikuasai)
  + review_reserve
  + assessment_reserve
  + remedial_risk_buffer

estimated_weeks = remaining_minutes / available_minutes_per_week
```

Placement mengurangi sisa beban hanya ketika ada bukti penguasaan. Preferensi pengguna untuk melewati materi tidak menghapus target dari readiness calculation.

## 7. Struktur Kurikulum

### 7.1 Hirarki

```text
Program: Pemula Absolut → JLPT N5
└── Stage
    └── Unit
        ├── Learning Outcome
        ├── Knowledge Component
        ├── Prerequisite Edge
        ├── Content Pack Reference
        └── Assessment Blueprint Reference
```

- **Program** menentukan tujuan terminal dan versi mayor.
- **Stage** mengelompokkan perkembangan kemampuan dan memiliki stage gate.
- **Unit** adalah paket tematik dan akademik yang dapat dijadwalkan.
- **Learning Outcome (LO)** menyatakan kemampuan yang dapat dibuktikan.
- **Knowledge Component (KC)** adalah unit terkecil yang status penguasaannya dilacak.
- **Content Pack** berisi materi dan latihan tervalidasi di bank konten terpisah.
- **Assessment Blueprint** menentukan bukti yang diperlukan tanpa mengikat pada satu soal.

### 7.2 Jenis relasi prasyarat

| Relasi | Arti | Perilaku scheduler |
| --- | --- | --- |
| `hard` | Target tidak masuk akal tanpa prasyarat | Tidak boleh dijadwalkan sebelum prasyarat mencapai ambang unlock |
| `soft` | Target lebih mudah jika prasyarat telah dipelajari | Boleh dijadwalkan terbatas; tambah scaffolding atau review |
| `co_requisite` | Dua target sebaiknya dipelajari berdekatan | Tempatkan pada unit atau rentang sesi yang sama |
| `supports` | Target memperkuat outcome lintas-domain | Dipakai untuk rekomendasi review dan remedial |

Graph harus berupa directed acyclic graph pada edge `hard`. Pipeline publikasi wajib menolak cycle.

### 7.3 Identitas dan versioning

Format ID yang direkomendasikan:

```text
PROGRAM.N5.ABSOLUTE_BEGINNER
STAGE.N5.S02
UNIT.N5.S02.U07
LO.N5.READING.INFORMATION_RETRIEVAL.001
KC.N5.GRAMMAR.PARTICLE.001
BLUEPRINT.N5.LISTENING.QUICK_RESPONSE.001
```

Aturan versi:

- **Major:** outcome, target total, atau graph berubah sehingga progres pengguna perlu migrasi.
- **Minor:** unit, distribusi, atau blueprint bertambah tanpa membatalkan mastery lama.
- **Patch:** koreksi metadata atau kesalahan konten tanpa mengubah learning outcome.

Mastery disimpan terhadap `knowledge_component_id` dan `curriculum_version`. Migrasi versi harus eksplisit dan dapat diaudit.

## 8. Kategori Target per Domain

Kategori berikut bersifat eksklusif sebagai **primary category** untuk menjaga total distribusi. Item dapat memiliki tag sekunder lintas-kategori.

### 8.1 Vocabulary — 900 unit leksikal

| Kategori utama | Target | Proporsi |
| --- | ---: | ---: |
| Orang, identitas, dan relasi | 90 | 10% |
| Angka, waktu, kalender, dan counter words | 90 | 10% |
| Aktivitas harian, sekolah, dan pekerjaan | 135 | 15% |
| Rumah, tempat, arah, dan transportasi | 135 | 15% |
| Makanan, belanja, dan layanan | 135 | 15% |
| Sifat, keadaan, perasaan, dan preferensi | 135 | 15% |
| Verba tindakan berfrekuensi tinggi | 135 | 15% |
| Ungkapan fungsional, kelas, dan discourse dasar | 45 | 5% |
| **Total** | **900** | **100%** |

### 8.2 Kanji — 110 karakter

| Kategori utama | Target |
| --- | ---: |
| Angka, jumlah, waktu, dan kalender | 22 |
| Orang, tubuh, keluarga, dan identitas | 16 |
| Tempat, arah, cuaca, dan alam dasar | 22 |
| Kehidupan harian, sekolah, dan pekerjaan | 22 |
| Tindakan berfrekuensi tinggi | 18 |
| Sifat dasar dan tanda umum | 10 |
| **Total** | **110** |

Kemampuan handwriting dan stroke-order production tidak menjadi mastery requirement MVP. Informasi stroke order boleh ditampilkan sebagai bantuan visual.

### 8.3 Grammar — 90 konsep

| Kategori utama | Target |
| --- | ---: |
| Fondasi kalimat, kopula, dan struktur nominal | 12 |
| Topic, case, location, direction, dan particles | 14 |
| Infleksi predikat, tense, polarity, dan politeness | 18 |
| Konstruksi verba, aspect dasar, dan sequence | 14 |
| Keinginan, ajakan, permintaan, izin, larangan, dan kewajiban | 14 |
| Modifikasi nomina, kuantitas, counter, dan perbandingan | 10 |
| Alasan, penghubung, penjelasan, dan text flow | 8 |
| **Total** | **90** |

### 8.4 Reading — 190 learning objects

| Kategori utama | Target objek |
| --- | ---: |
| Decoding aksara dan ortografi | 46 |
| Frasa serta kalimat tunggal | 40 |
| Teks pendek hingga sekitar 80 karakter | 45 |
| Teks menengah hingga sekitar 250 karakter | 25 |
| Material fungsional dan information retrieval | 24 |
| Bacaan campuran dan timed practice | 10 |
| **Total** | **190** |

Satu reading object adalah teks atau micro-text tervalidasi beserta objective, pertanyaan, jawaban, rasional, dan metadata keterbacaan. Varian soal terhadap teks yang sama bukan objek bacaan baru.

### 8.5 Listening — 210 learning objects

| Kategori utama | Target objek |
| --- | ---: |
| Diskriminasi bunyi dan pemetaan bunyi–aksara | 44 |
| Quick response | 48 |
| Verbal expressions berbasis situasi atau gambar | 32 |
| Comprehension of key points | 42 |
| Task-based comprehension | 32 |
| Listening campuran dan timed practice | 12 |
| **Total** | **210** |

Satu listening object adalah satu stimulus audio tervalidasi beserta transcript internal, objective, pertanyaan, jawaban, rasional, speaker metadata, kecepatan, dan kualitas audio. Transcript tidak selalu ditampilkan sebelum pengguna menjawab.

## 9. Peta Kurikulum Pemula–N5

### 9.1 Ringkasan tahap

| Stage | Nama | Fokus | Unit | Jam baseline |
| --- | --- | --- | ---: | ---: |
| S0 | Fondasi Aksara dan Bunyi | Bunyi, hiragana, katakana, ortografi | U01–U04 | 40 |
| S1 | Kalimat dan Identitas Dasar | Identitas, waktu, orang, benda | U05–U08 | 48 |
| S2 | Kehidupan Sehari-hari | Rutinitas, makanan, tempat, belanja | U09–U12 | 52 |
| S3 | Tindakan dan Interaksi Terpandu | Deskripsi, keberadaan, gerak, aturan | U13–U16 | 54 |
| S4 | Perluasan Makna dan Alur | Preferensi, alasan, perbandingan, rencana | U17–U20 | 54 |
| S5 | Integrasi dan Readiness N5 | Format JLPT, retensi, simulasi, remedial | U21–U24 | 52 |
| **Total** |  |  | **24** | **300** |

### 9.2 Distribusi target per unit

`V`, `K`, dan `G` adalah target baru. `R` dan `L` adalah jumlah minimum learning objects tervalidasi. Angka adalah baseline authoring dan boleh ditambah melalui versi minor selama beban serta difficulty tetap terkontrol.

| Unit | Tema dan outcome utama | V | K | G | R | L |
| --- | --- | ---: | ---: | ---: | ---: | ---: |
| U01 | Sistem bunyi, mora, sapaan, dan bahasa kelas | 20 | 0 | 0 | 10 | 12 |
| U02 | Hiragana dasar dan decoding kata | 25 | 0 | 0 | 12 | 10 |
| U03 | Hiragana lanjutan, bunyi panjang, sokuon, dan yoon | 25 | 0 | 0 | 12 | 10 |
| U04 | Katakana, loanwords, dan ortografi campuran | 30 | 0 | 0 | 12 | 12 |
| U05 | Identitas, demonstratives, dan kalimat nominal | 45 | 6 | 4 | 5 | 7 |
| U06 | Angka, umur, waktu, tanggal, dan jadwal sederhana | 45 | 8 | 5 | 5 | 7 |
| U07 | Keluarga, orang, kepemilikan, dan pertanyaan dasar | 45 | 8 | 4 | 6 | 8 |
| U08 | Benda, posisi, keberadaan awal, dan classroom notices | 45 | 8 | 5 | 6 | 8 |
| U09 | Rutinitas, verba dasar, waktu, polarity, dan tense | 50 | 10 | 5 | 7 | 8 |
| U10 | Makanan, minuman, pilihan, pesanan, dan counters awal | 50 | 10 | 5 | 7 | 8 |
| U11 | Tempat, arah, tujuan, transportasi, dan movement | 50 | 10 | 5 | 7 | 8 |
| U12 | Belanja, harga, jumlah, counters, dan information retrieval | 50 | 10 | 5 | 7 | 8 |
| U13 | i-adjective, na-adjective, deskripsi, dan perbandingan awal | 50 | 8 | 6 | 8 | 9 |
| U14 | Rumah, kota, lokasi, existence, dan modifikasi nomina | 50 | 8 | 6 | 8 | 9 |
| U15 | Aktivitas, destination, means, sequence, dan frequency | 50 | 8 | 6 | 8 | 9 |
| U16 | Permintaan, izin, larangan, kewajiban, dan instruksi | 50 | 8 | 6 | 8 | 9 |
| U17 | Kesukaan, kemampuan, keinginan, dan pilihan | 45 | 2 | 6 | 8 | 10 |
| U18 | Alasan, penjelasan, kondisi sederhana, dan sebab–akibat | 45 | 2 | 6 | 8 | 10 |
| U19 | Perbandingan, superlative, kuantitas, dan intensitas | 45 | 2 | 6 | 8 | 10 |
| U20 | Ajakan, rencana, urutan kejadian, dan text flow | 45 | 2 | 6 | 8 | 10 |
| U21 | Integrasi Vocabulary–Kanji dan bacaan pendek N5 | 10 | 0 | 1 | 10 | 4 |
| U22 | Integrasi Listening: quick response dan situational expression | 10 | 0 | 1 | 4 | 10 |
| U23 | Integrasi Grammar–Reading dan information retrieval | 10 | 0 | 1 | 8 | 4 |
| U24 | Simulasi, analisis kelemahan, remedial, dan readiness | 10 | 0 | 1 | 8 | 10 |
| **Total** |  | **900** | **110** | **90** | **190** | **210** |

### 9.3 Stage gate

| Gate | Bukti minimum |
| --- | --- |
| S0 → S1 | Akurasi decoding kana ≥90%; hiragana tidak memerlukan romaji; katakana dasar ≥80% |
| S1 → S2 | Seluruh hard prerequisites ≥0,85; unit checkpoint ≥80%; tidak ada domain inti <0,75 |
| S2 → S3 | Retensi tertunda target inti ≥80%; mampu memahami kalimat dan dialog rutinitas dasar |
| S3 → S4 | Mampu menangani teks pendek serta listening key-point dengan dukungan terbatas |
| S4 → S5 | ≥85% KC target telah provisional/mastered; semua format soal N5 telah diperkenalkan |
| S5 → N5 Ready | Memenuhi readiness policy pada Bagian 14 |

Stage gate tidak menghentikan seluruh aktivitas pengguna. Jika gate gagal, scheduler dapat memberikan review, remedial, dan aktivitas integrasi dari stage berjalan.

## 10. Aturan Pengajaran Lintas-Domain

### 10.1 Vocabulary

- Kata diperkenalkan dalam konteks sebelum atau bersamaan dengan retrieval terisolasi.
- Setiap target minimal memiliki bentuk, reading, sense Indonesia, part of speech, register, contoh, dan distractor policy.
- Sinonim bahasa Indonesia tidak boleh membuat dua sense Jepang terlihat sepenuhnya identik jika penggunaannya berbeda.
- Pengenalan visual, audio, makna, dan penggunaan disimpan sebagai bukti terpisah.

### 10.2 Kanji

- Kanji baru hanya boleh menggunakan vocabulary yang telah dikuasai atau menjadi co-requisite.
- Urutan mengutamakan kegunaan dalam kata dan teks, bukan urutan kelas sekolah Jepang.
- Semua bentuk glyph harus melewati pemeriksaan font dan rendering.
- Furigana diturunkan secara bertahap pada vocabulary yang sudah mencapai provisional mastery.

### 10.3 Grammar

- Satu target grammar harus menyimpan `form`, `function`, `constraints`, `contrasts`, dan `common_errors`.
- Penjelasan bahasa Indonesia harus membedakan padanan makna dari aturan struktur Jepang.
- Contoh tidak boleh memperkenalkan terlalu banyak vocabulary atau kanji di luar prasyarat.
- Sentence ordering dinilai sebagai grammar terstruktur, bukan kemampuan menulis bebas.

### 10.4 Reading

- Beban teks dihitung dari panjang, rasio target yang sudah dikenal, kepadatan kanji, kompleksitas grammar, dan jenis inferensi.
- Teks untuk pembelajaran idealnya memiliki sedikitnya 90% lexical coverage dari target yang sudah dikenal; sisanya diberi dukungan atau dipilih sebagai target baru.
- Timed practice baru diwajibkan pada S5.
- Pertanyaan harus memisahkan kegagalan decoding, vocabulary, grammar, dan comprehension bila memungkinkan.

### 10.5 Listening

- Metadata wajib memuat jumlah speaker, kecepatan, durasi, noise, register, dan jenis comprehension.
- Kecepatan meningkat dari sangat jelas dan tersegmentasi menuju lambat-alami; perubahan tidak boleh tiba-tiba.
- Replay boleh digunakan saat belajar, tetapi checkpoint dan simulasi harus mengikuti blueprint yang ditetapkan.
- Transcript digunakan untuk feedback setelah respons, bukan sebagai bantuan default sebelum respons.

### 10.6 Romaji dan lokalisasi Indonesia

- Romaji hanya menjadi scaffolding sementara pada U01–U02 dan dikurangi pada U03.
- Mulai U04, romaji tidak ditampilkan secara default dan tidak boleh menjadi syarat untuk menjawab.
- Setelah gate S0, seluruh jalur utama menggunakan kana serta kanji sesuai progres pengguna.
- Penjelasan bahasa Indonesia harus menandai perbedaan penting dengan bahasa Indonesia, misalnya penghilangan subjek, urutan unsur, sistem particle, counter, dan tingkat kesopanan.
- Contoh konteks boleh dekat dengan pengguna Indonesia, tetapi bahasa Jepang dan situasi penggunaannya harus tetap alami.
- Transliteration, terjemahan harfiah, dan terjemahan komunikatif disimpan sebagai field berbeda agar tidak tercampur di UI atau evaluasi.

## 11. Placement dan Jalur Personal

### 11.1 Output placement

Placement tidak menghasilkan satu label global saja. Sistem menghasilkan:

- estimated mastery per KC atau cluster;
- confidence score;
- rekomendasi starting unit;
- daftar prerequisite gap;
- estimasi remaining hours per domain.

### 11.2 Aturan pemotongan jalur

- Pengguna boleh melewati aktivitas instruksional jika bukti placement mencukupi.
- Hard prerequisite tidak boleh dianggap dikuasai hanya karena pengguna memilih unit lebih tinggi.
- Bukti dengan confidence rendah memicu verification set singkat.
- Kelemahan pada kana dapat membuat jalur Kanji dan Reading mundur tanpa memundurkan Listening secara otomatis.
- Domain yang lebih kuat boleh bergerak lebih cepat selama graph prasyarat tetap valid.

## 12. Model Penguasaan

### 12.1 Status

| Status | Makna operasional |
| --- | --- |
| `not_started` | Belum ada bukti yang cukup |
| `learning` | Sedang membangun pemahaman; mastery <0,70 |
| `needs_review` | Pernah lebih tinggi tetapi retensi atau performa terbaru turun |
| `provisional` | Mastery ≥0,85 pada bukti langsung, tetapi belum lolos retensi tertunda |
| `mastered` | Mastery ≥0,85 dan bukti retensi tertunda memenuhi aturan domain |

### 12.2 Komponen bukti

Mastery engine minimal mempertimbangkan:

- akurasi;
- tingkat kesulitan butir;
- kemandirian atau jumlah hint;
- keragaman tipe bukti;
- recency dan interval sejak paparan;
- konsistensi antar-pertemuan;
- pola kesalahan berulang.

Kontrak skor v1:

```text
mastery = f(
  accuracy,
  item_difficulty,
  independence,
  evidence_breadth,
  retention
)
```

Fungsi dan bobot harus configurable serta diberi versi. Tim tidak boleh menyimpan status saja tanpa event bukti yang mendasarinya.

### 12.3 Syarat `mastered`

Sebuah KC mencapai `mastered` jika:

1. skor mastery sedikitnya 0,85;
2. memiliki sedikitnya tiga encounter yang valid;
3. bukti berasal dari sedikitnya dua tipe aktivitas yang sesuai domain;
4. terdapat delayed evidence setelah sedikitnya tujuh hari dengan akurasi ≥80%;
5. tidak memiliki critical misconception yang belum diselesaikan.

Untuk Reading dan Listening, satu passage atau audio dengan beberapa pertanyaan tetap dihitung sebagai satu encounter stimulus.

### 12.4 Decay dan review

Interval awal yang direkomendasikan: 1, 3, 7, 14, 30, dan 60 hari. Interval aktual menyesuaikan performa.

- Jawaban benar dengan confidence tinggi memperpanjang interval.
- Jawaban salah pada target inti memperpendek interval dan dapat mengubah status menjadi `needs_review`.
- Kesalahan akibat prasyarat memprioritaskan remedial prasyarat, bukan mengulang semua materi unit.
- Mastery tidak turun hanya karena pengguna tidak membuka aplikasi; decay harus menjadi estimasi yang diverifikasi melalui probe singkat.

## 13. Sesi dan Scheduler Adaptif

### 13.1 Komposisi sesi default

| Komponen | Proporsi awal |
| --- | ---: |
| Review jatuh tempo | 35% |
| Target baru | 40% |
| Latihan terintegrasi Reading/Listening | 20% |
| Refleksi dan ringkasan feedback | 5% |

Scheduler boleh mengubah komposisi berdasarkan backlog review dan jarak target ujian. Review jatuh tempo tidak boleh terus-menerus dikorbankan demi target baru.

### 13.2 Batas beban baru per sesi

Untuk sesi sekitar 30 menit, titik awal authoring adalah:

- 8–12 unit vocabulary baru;
- 2–4 kanji baru;
- 1–2 konsep grammar baru;
- 1 reading atau 1–2 listening objects yang sesuai panjang.

Ini adalah batas awal, bukan kuota wajib. Sistem menurunkan beban ketika error rate atau waktu respons meningkat.

### 13.3 Aturan scheduling

Urutan prioritas:

1. hard-prerequisite gap yang menghambat unit aktif;
2. review yang telah jatuh tempo;
3. remedial critical misconception;
4. target baru pada jalur aktif;
5. latihan integrasi dan transfer;
6. enrichment yang tidak memengaruhi readiness.

Setelah S1, setiap minggu aktif harus memiliki sedikitnya satu bukti Reading dan satu bukti Listening, kecuali pengguna belum memenuhi hard prerequisite.

## 14. Asesmen dan Readiness

### 14.1 Lapisan asesmen

| Lapisan | Tujuan | Dampak |
| --- | --- | --- |
| Placement | Menentukan titik awal dan gap | Membentuk jalur awal |
| Retrieval check | Memperkuat target individual | Mengubah mastery KC |
| Unit checkpoint | Memeriksa integrasi satu unit | Membuka unit atau remedial |
| Stage checkpoint | Memeriksa retensi dan transfer | Membuka stage berikutnya |
| Cumulative review | Menangkap forgetting lintas-stage | Menjadwalkan review |
| N5 simulation | Mengukur kesiapan format dan stamina | Mengubah readiness, bukan mastery dari satu soal saja |

### 14.2 Blueprint format N5

| Domain Nekoru | Format bukti minimum |
| --- | --- |
| Vocabulary | Kanji reading, orthography, context-defined meaning, paraphrase |
| Kanji | Reading dalam kata dan pemetaan kana–kanji/katakana |
| Grammar | Selecting grammar form, sentence composition, text grammar |
| Reading | Short passage, mid-size passage, information retrieval |
| Listening | Task-based, key points, verbal expressions, quick response |

### 14.3 Readiness policy internal

Status **N5 Ready** diberikan jika seluruh kondisi berikut terpenuhi:

1. weighted mastered coverage required KC minimal 85%;
2. weighted mastered coverage masing-masing domain inti minimal 75%;
3. seluruh hard prerequisite terminal berstatus `mastered`;
4. delayed retention agregat dan retention coverage setiap domain minimal 80%;
5. pengguna menyelesaikan sedikitnya dua simulation forms yang berbeda dan ekuivalen;
6. pada kedua simulasi, weighted accuracy internal minimal 70% total dan minimal 60% pada masing-masing kelompok `Language Knowledge/Reading` dan `Listening`;
7. seluruh format bukti N5 telah diperkenalkan dan dinilai;
8. tidak ada critical weakness aktif, misalnya kegagalan kana, text grammar, atau task-based listening yang sistematis;
9. bukti memenuhi validity window dan version compatibility pada [Mastery Specification](./mastery-specification.md).

Threshold simulasi adalah **indikator konservatif internal**, bukan konversi ke scaled score JLPT. Sebagai konteks, kelulusan resmi N5 memerlukan total scaled score 80/180, minimal 38/120 untuk Language Knowledge/Reading, dan 19/60 untuk Listening. Aplikasi tidak boleh menampilkan prediksi scaled score sampai model telah dikalibrasi menggunakan data yang memadai.

## 15. Kontrak Metadata Kurikulum

### 15.1 Entitas minimum

| Entitas | Field minimum |
| --- | --- |
| `CurriculumVersion` | id, semantic_version, status, published_at, changelog |
| `Stage` | id, order, title, outcomes, estimated_minutes, gate_id |
| `Unit` | id, stage_id, order, theme, outcomes, target_distribution, estimated_minutes |
| `LearningOutcome` | id, domain, descriptor_id, evidence_requirements, required |
| `KnowledgeComponent` | id, domain, category, difficulty, required, source_rationale |
| `PrerequisiteEdge` | from_kc, to_kc, relation_type, threshold |
| `ContentPackRef` | pack_id, pack_version, unit_id, status |
| `AssessmentBlueprint` | id, domain, item_type, difficulty_band, evidence_rule |
| `MasteryPolicy` | id, version, thresholds, retention_rule |

### 15.2 Contoh representasi unit

```yaml
id: UNIT.N5.S02.U09
curriculum_version: 1.0.0
stage_id: STAGE.N5.S02
order: 9
theme: rutinitas-dan-waktu
estimated_minutes: 780
target_distribution:
  vocabulary: 50
  kanji: 10
  grammar: 5
  reading_objects: 7
  listening_objects: 8
learning_outcome_ids:
  - LO.N5.GRAMMAR.PREDICATE.001
  - LO.N5.READING.DAILY_ROUTINE.001
prerequisites:
  - id: KC.N5.KANA.HIRAGANA.CORE
    type: hard
    threshold: 0.85
content_pack:
  id: PACK.N5.S02.U09
  minimum_version: 1.0.0
```

File kurikulum tidak menyimpan body materi, audio, jawaban, atau penjelasan lengkap. Semua itu berada di content pack tervalidasi.

## 16. Pipeline Akademik dan Publikasi

```text
Draft inventory
→ Academic mapping
→ Prerequisite review
→ Content authoring / AI-assisted drafting
→ Linguistic validation
→ Assessment validation
→ Technical validation
→ Approved content pack
→ Curriculum release
→ Monitoring and revision
```

### 16.1 Rubrik validasi minimum

- **Akurasi:** arti, reading, grammar, jawaban, dan rasional benar.
- **Kealamian:** bahasa Jepang wajar untuk konteks dan register.
- **Level:** tidak ada prerequisite leakage yang tidak diberi dukungan.
- **Kejelasan:** hanya ada satu jawaban terbaik bila format menuntutnya.
- **Distractor:** salah karena alasan yang terdiagnosis, bukan jebakan ambigu.
- **Bahasa Indonesia:** penjelasan jelas, konsisten, dan tidak menghasilkan transfer keliru.
- **Audio:** pengucapan, kecepatan, speaker, transcript, dan kualitas teknis sesuai metadata.
- **Hak penggunaan:** sumber dan lisensi aset terdokumentasi.
- **Aksesibilitas:** teks, audio, kontras, serta alternatif tampilan memenuhi standar produk.

### 16.2 Status konten

```text
draft → academic_review → revision_required → approved → published
                                      └──────→ rejected
published → deprecated
```

Konten hasil bantuan AI tidak boleh berpindah langsung dari `draft` ke `published`.

## 17. Validasi Otomatis sebelum Rilis

Pipeline harus gagal jika menemukan:

- duplicate ID;
- hard-prerequisite cycle;
- prerequisite yang tidak ditemukan;
- total distribusi unit tidak cocok dengan stage/program target;
- unit tanpa learning outcome atau blueprint;
- required KC tanpa sedikitnya satu approved content item;
- reading/listening object tanpa answer key dan rationale;
- audio tanpa transcript internal;
- content pack yang versinya lebih rendah dari minimum;
- item `published` yang belum memiliki approval akademik.

## 18. Metrik Kualitas Kurikulum

### 18.1 Learning effectiveness

- delayed retention per domain;
- waktu median menuju mastery;
- jumlah encounter menuju mastery;
- penurunan recurring error;
- korelasi readiness internal dengan hasil simulasi dan hasil JLPT yang dilaporkan.

### 18.2 Curriculum health

- prerequisite failure rate per edge;
- unit drop-off dan overload rate;
- distribusi exposure antar-domain;
- persentase target tanpa cukup approved content;
- tingkat revisi dan laporan kesalahan;
- perbedaan difficulty aktual terhadap label akademik.

### 18.3 Guardrail

- Tidak mengoptimalkan XP, streak, atau completion rate dengan mengurangi standar mastery.
- Tidak menyatakan pengguna siap hanya karena seluruh unit pernah dibuka.
- Tidak mengubah angka target secara otomatis berdasarkan engagement tanpa review akademik.

## 19. Tata Kelola Perubahan

Perubahan kurikulum memerlukan proposal yang memuat:

1. masalah atau bukti yang mendasari perubahan;
2. sumber akademik;
3. target, unit, dan pengguna yang terdampak;
4. perubahan graph prasyarat;
5. kebutuhan migrasi mastery;
6. perubahan content pack dan asesmen;
7. rencana validasi serta rollback.

Tim akademik memiliki keputusan akhir atas learning outcome, scope, difficulty, dan validitas konten. Engineering memiliki keputusan akhir atas integritas data, kompatibilitas versi, dan keamanan migrasi. Konflik yang mengubah pengalaman produk diputuskan bersama product owner dengan rasional terdokumentasi.

## 20. Artefak Turunan yang Diperlukan

Dokumen ini harus diikuti oleh artefak terpisah berikut:

1. [beginner-foundations-n5](../content/beginner-foundations-n5.md) — sound, kana, orthography, scaffolding, content pack U01–U04, dan gate S0.
2. [vocabulary-inventory-n5](../content/vocabulary-inventory-n5.md) — lemma, sense, reading, category, prerequisites, dan evidence types.
3. [kanji-inventory-n5](../content/kanji-inventory-n5.md) — character, target readings in words, meanings, dan vocabulary links.
4. [grammar-inventory-n5](../content/grammar-inventory-n5.md) — form, function, constraints, contrasts, dan common errors.
5. [reading-blueprints-n5](../content/reading-blueprints-n5.md) — genre, length, lexical coverage, grammar ceiling, dan question types.
6. [listening-blueprints-n5](../content/listening-blueprints-n5.md) — situation, speed, duration, speakers, noise, dan question types.
7. [mastery-specification](./mastery-specification.md) — kontrak lintas-level untuk evidence, mastery, dimensi diagnostik, agregasi, retensi, gate, dan readiness.
8. [assessment-specification-n5](./assessment-specification-n5.md) — placement, verification, checkpoint, cumulative review, blueprint, difficulty bands, scoring, dan simulation assembly.
9. content-validation-rubric — checklist serta authority matrix reviewer.
10. curriculum-schema — JSON Schema atau model database yang mengimplementasikan Bagian 15.
11. [practice-engine](./practice-engine.md) — eksekusi activity, interaction, attempt, hint, evaluation, feedback, evidence event, resume, dan fallback.

## 21. Pertanyaan yang Harus Divalidasi melalui Data MVP

- Apakah baseline 300 jam terlalu tinggi atau rendah bagi pengguna Indonesia tanpa latar kanji?
- Apakah 900 vocabulary dan 110 kanji memberi coverage memadai pada bacaan serta listening internal?
- Stage atau unit mana yang memiliki failure dan drop-off terbesar?
- Seberapa cepat romaji dapat dilepas tanpa menaikkan abandonment?
- Apakah gate 0,85 dan delayed evidence tujuh hari memprediksi retensi 30 hari?
- Apakah readiness threshold internal cukup konservatif terhadap hasil ujian aktual?

Jawaban atas pertanyaan ini dapat mengubah bobot, urutan, atau baseline melalui proses versioning; tidak boleh menghapus kebutuhan validasi akademik.

## 22. Referensi Utama

- [JLPT — Summary of Linguistic Competence Required for Each Level](https://www.jlpt.jp/sp/e/about/levelsummary.html)
- [JLPT — Composition of Test Sections and Items](https://www.jlpt.jp/e/guideline/testsections.html)
- [JLPT — N5 Purposes of Test Items](https://www.jlpt.jp/e/guideline/pdf/n5_e_revised.pdf)
- [JLPT — Official Sample Questions](https://www.jlpt.jp/e/samples/forlearners.html)
- [JLPT — Scoring Sections and Pass/Fail](https://www.jlpt.jp/e/guideline/results.html)
- [JLPT — FAQ on the absence of official vocabulary, kanji, and grammar lists](https://www.jlpt.jp/e/faq/)
- [JLPT — Reference Indication of CEFR Level](https://www.jlpt.jp/sp/e/about/cefr_reference.html)
- [JF Standard for Japanese-Language Education](https://www.jfstandard.jpf.go.jp/summaryen/ja/render.do)
- [JF Standard — Guidebook and Can-do resources](https://www.jfstandard.jpf.go.jp/publicdata/ja/render.do)
- [Irodori — Japanese for Life in Japan](https://www.irodori.jpf.go.jp/en/about.html)
- [Marugoto — Starter A1](https://marugoto.jpf.go.jp/en/about/series/)

Referensi diperiksa pada 13 September 2026. Genki I dan Minna no Nihongo I digunakan sebagai referensi silang internal sesuai edisi yang dilisensikan tim, bukan sebagai sumber konten yang boleh disalin.
