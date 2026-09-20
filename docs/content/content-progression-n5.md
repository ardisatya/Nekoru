# Content Progression N5 Nekoru — Lesson dan Session Plan

**Status:** Draft v0.1  
**Audiens:** Akademik, content operations, product, design, data, AI, dan engineering  
**Cakupan:** Pemula absolut hingga status internal `N5 Ready`  
**Bahasa pengantar:** Bahasa Indonesia  
**Tanggal:** 13 September 2026

## 1. Tujuan dan Posisi Dokumen

Dokumen ini menerjemahkan arsitektur kurikulum Nekoru menjadi progression konten yang dapat ditulis, dijadwalkan, diimplementasikan, dan diaudit. Ia menetapkan urutan kanonik 6 stage dan 24 unit, paket lesson di dalam setiap unit, kontrak session 30 menit, outcome, prasyarat, target konkret Vocabulary–Kanji–Grammar, kebutuhan Reading–Listening, checkpoint, review, remedial, dan variasi adaptif.

Dokumen ini melengkapi, bukan menggantikan:

- [Product Overview](../product-specs/product-overview.md)
- [Arsitektur Kurikulum](../product-specs/curriculum-architecture.md)
- [Mastery Specification](../product-specs/mastery-specification.md)
- [Learning Engine](../product-specs/learning-engine.md)
- [Beginner Foundations](./beginner-foundations-n5.md)
- [Vocabulary Inventory](./vocabulary-inventory-n5.md)
- [Kanji Inventory](./kanji-inventory-n5.md)
- [Grammar Inventory](./grammar-inventory-n5.md)
- [Reading Blueprints](./reading-blueprints-n5.md)
- [Listening Blueprints](./listening-blueprints-n5.md)

Urutan ini adalah graph kanonik untuk authoring. Learning Engine tetap menentukan apa yang benar-benar muncul pada learner berdasarkan evidence, mastery, prerequisite, review due date, modality, dan waktu yang tersedia.

## 2. Keputusan yang Dipertahankan

| Keputusan | Ketetapan progression |
| --- | --- |
| Struktur | 6 stage, 24 unit, 5 lesson package per unit |
| Baseline | 300 jam efektif atau 600 session slot × 30 menit |
| Distribusi waktu | 210 jam target/integrasi, 60 jam review, 30 jam checkpoint–remedial–simulation |
| Target | 900 Vocabulary, 110 Kanji, 90 Grammar, 190 Reading objects, 210 Listening objects |
| Progress | Mastery-based; lesson selesai tidak otomatis berarti KC mastered |
| Bahasa | Penjelasan utama Bahasa Indonesia; romaji hanya scaffolding S0 |
| Kanji | Word-first; reading hanya ditargetkan dalam vocabulary yang disetujui |
| Reading | Instructional coverage ideal ≥90%; checkpoint ≥95% dan tanpa unknown unsupported |
| Listening | Transcript sesudah respons; replay mengikuti mode |
| Produksi | Speaking/writing bebas tidak menjadi domain atau syarat readiness MVP |

### 2.1 Catatan revisi yang direkomendasikan

Arsitektur saat ini memberi U21–U24 masing-masing 10 Vocabulary dan 1 Grammar baru. Ini kurang selaras dengan fungsi S5 sebagai integrasi, retensi, dan simulasi. Draft ini mempertahankan angka agar kompatibel, tetapi membatasi 40 Vocabulary tersebut pada bahasa reseptif untuk instruksi, teks, dan evaluasi; empat Grammar diperlakukan sebagai integrasi form–function dalam teks, bukan struktur baru yang memperluas ceiling. Pada revisi kurikulum berikutnya, tim akademik sebaiknya menilai pemindahan target tersebut ke U17–U20. Perubahan itu bersifat minor jika KC tidak berubah, tetapi menjadi major jika first-unit atau prerequisite mastery pengguna harus dimigrasikan.

## 3. Cara Membaca Target Konkret

- Kode `V-U05-01` berarti target Vocabulary pertama pada daftar U05; satu posisi adalah satu lemma–sense.
- Kode `K-U05-01` berarti karakter Kanji pertama pada daftar U05. Reading ditentukan oleh kata yang sudah atau sedang dipelajari.
- Kode `G-U05-01` berarti satu form–function Grammar, bukan setiap variasi permukaan.
- Kode `R-U05-01` dan `L-U05-01` adalah slot learning object, bukan body teks/audio. Setiap slot wajib memiliki stimulus original/berlisensi, objective, question, answer, rationale, diagnostic mapping, rights, dan versi.
- Rentang target pada tabel lesson bersifat authoring assignment. Scheduler boleh memecah atau menggabungkan delivery, tetapi tidak boleh melanggar batas 8–12 Vocabulary, 2–4 Kanji, dan 1–2 Grammar baru per session 30 menit.

Daftar konkret di dokumen ini adalah kandidat inventory internal `draft`. Ia tidak boleh masuk runtime sebelum melewati linguistic, academic, assessment, technical, rights, dan accessibility review.

## 4. Model Lesson dan Session

### 4.1 Lesson package

Setiap unit memiliki lima lesson package (`L1`–`L5`). Satu lesson package adalah tujuan pedagogis utuh yang biasanya dikirim sebagai 2–5 session konten 30 menit, ditambah review yang dijadwalkan terpisah. Sebuah lesson package minimal memiliki:

1. satu Can-do atau outcome reseptif yang terukur;
2. target Vocabulary/Kanji/Grammar eksplisit;
3. exposure dan noticing;
4. guided practice;
5. direct independent retrieval;
6. Reading atau Listening terintegrasi;
7. exit check dan jadwal delayed evidence.

### 4.2 Urutan session dalam lesson

| Session | Fungsi | Komposisi baseline 30 menit |
| --- | --- | --- |
| A — Activate | Retrieval prasyarat dan konteks | 8 m review; 7 m model/noticing; 12 m target baru; 3 m exit probe |
| B — Build | Bentuk, bunyi, makna, atau grammar | 7 m review; 10 m instruksi; 10 m guided→independent; 3 m feedback |
| C — Apply | Penggunaan kontekstual | 10 m due review; 12 m applied retrieval; 6 m Reading/Listening; 2 m refleksi |
| D — Integrate | Transfer lintas-domain | 8 m mixed review; 15 m Reading/Listening task; 5 m diagnosis; 2 m ringkasan |
| E — Verify | Hanya bila lesson kompleks | 10 m varied retrieval; 12 m independent transfer; 6 m verification; 2 m next step |

Sesi A–E adalah pola, bukan layar tetap. Sebelum session dibuat, Learning Engine mengganti target yang sudah mastered dengan probe atau target eligible berikutnya, menyisipkan overdue review, dan menurunkan beban baru jika error/fatigue guardrail aktif.

### 4.3 Session khusus

| Jenis | Trigger | Isi minimum | Dampak |
| --- | --- | --- | --- |
| Due review | `next_review_at ≤ now` | Interleaved retrieval, item berbeda, tanpa exposure-only | Memperbarui retention dan interval |
| Retention probe | ≥7 hari dari anchor | Direct item baru, tanpa hint kuat | Membuka `mastered` atau `needs_review` |
| Remedial | Misconception confirmed/critical | Contrastive explanation, guided item, independent item baru | Menyelesaikan gap terkecil |
| Verification | Placement/confidence rendah | 2–5 direct items pada cluster | Mengonfirmasi skip atau gap |
| Unit checkpoint | Outcome unit cukup terpapar | Integrated R/L + direct KC sample | `completed` atau `remedial_required` |
| Stage checkpoint | Gate hampir terpenuhi | Retention, transfer, blocker check | Membuka stage berikutnya |
| Simulation | S5 dan prerequisites terpenuhi | Format/timing N5 tervalidasi | Mengubah readiness snapshot |

## 5. Rekonsiliasi 300 Jam

Satu session slot bernilai 30 menit. Angka di bawah adalah baseline per unit, bukan jumlah wajib untuk setiap learner. Placement dan high-confidence evidence dapat mengurangi session target; review/remedial aktual dapat menambahnya.

| Unit | Total slot | Target & integrasi | Review | Checkpoint/remedial |
| --- | ---: | ---: | ---: | ---: |
| U01–U04, masing-masing | 20 | 14 | 4 | 2 |
| U05–U08, masing-masing | 24 | 17 | 5 | 2 |
| U09–U12, masing-masing | 26 | 18 | 5 | 3 |
| U13–U20, masing-masing | 27 | 19 | 5 | 3 |
| U21 | 26 | 20 | 6 | 0 |
| U22 | 26 | 20 | 6 | 0 |
| U23 | 26 | 18 | 6 | 2 |
| U24 | 26 | 14 | 6 | 6 |
| **Total** | **600** | **420** | **120** | **60** |
| **Jam** | **300** | **210** | **60** | **30** |

## 6. Aturan Adaptasi Lintas-Progression

### 6.1 Jalur kanonik

Urutan default adalah U01→U24. Di dalam unit, L1→L5 menjadi urutan authoring, tetapi target lintas-domain boleh bergerak berbeda jika graph mengizinkan.

### 6.2 Placement dan acceleration

- Pemula absolut mulai U01 tanpa placement panjang.
- High-confidence estimate dapat melewati instruksi, tetapi status awal maksimum `provisional`.
- Kana gap hanya menahan Reading/Kanji terkait; Listening dapat bergerak lebih tinggi.
- Learner cepat menerima verification dan transfer item, bukan beban baru di atas batas sesi.
- Skip tidak menghapus KC dari readiness; delayed evidence tetap diperlukan.

### 6.3 Review dan remedial

- Interval baseline: 1, 3, 7, 14, 30, dan 60 hari.
- Blocker prerequisite diproses sebelum target baru; overdue review tidak boleh terus dikorbankan.
- Dua kegagalan diagnostik lintas encounter mengaktifkan remedial confirmed.
- Remedial hanya mengulang cluster penyebab, bukan seluruh unit.
- Jika due review melebihi 50% budget tiga sesi berturut-turut, target baru dikurangi dan jadwal dihitung ulang.

### 6.4 Modality dan aksesibilitas

- Jika audio gagal, aktivitas Listening tidak boleh diganti dengan transcript sebagai scored evidence.
- Jika learner memiliki batas modality, engine memilih outcome ekuivalen hanya jika blueprint mengizinkan; konstruk yang tidak dapat dinilai diberi status unavailable, bukan diasumsikan mastered.
- Hint, replay tambahan, romaji reveal, dan playback-rate change disimpan sebagai interaction/evidence metadata.

### 6.5 Gate dan override pengguna

Pengguna boleh memilih target eligible, meminta review, menunda aktivitas non-blocking, dan mengubah jadwal. Pengguna tidak dapat melewati hard prerequisite, menandai mastery, menghapus critical weakness, atau menurunkan threshold readiness.

## 7. Peta Lesson per Unit

Notasi `C` adalah jumlah session konten 30 menit dalam lesson package. Review dan checkpoint unit memakai slot terpisah dari Bagian 5. `R` dan `L` menunjukkan jumlah object serta tugas konkret yang harus di-author.

### S0 — Fondasi Aksara dan Bunyi

#### U01 — Bunyi, mora, sapaan, dan bahasa kelas

**Outcome:** learner mengenali lima vokal dan mora dasar, merespons ungkapan kelas sangat pendek, serta memahami fungsi tiga sistem tulisan tanpa dituntut menghafalnya. **Hard prerequisite:** tidak ada. **Unit check:** audio discrimination, functional quick response, dan symbol awareness; romaji tidak memberi mastery credit.

**Vocabulary V-U01-01…20:** おはようございます; こんにちは; こんばんは; さようなら; じゃあまた; ありがとうございます; どういたしまして; すみません; ごめんなさい; はい; いいえ; お願いします; どうぞ; はじめまして; よろしくお願いします; わかります; わかりません; もう一度; 聞いてください; 選んでください.

**Sound/Kana:** /a i u e o/; mora CV; mora nasal awareness; kontras panjang awal; hiragana/katakana/kanji sebagai jenis tulisan (exposure-only). **Grammar:** tidak ada; seluruh ungkapan diperlakukan sebagai chunks.

| Lesson | C | Target | Reading objects | Listening objects | Exit evidence |
| --- | ---: | --- | --- | --- | --- |
| U01-L1 Suara Jepang pertama | 3 | V01–04; vokal /a i u e o/ | R01–02 label sapaan | L01–02 vokal dan salam | bedakan vokal + pilih salam |
| U01-L2 Berterima kasih dan meminta maaf | 3 | V05–08; mora | R03–04 sticker/message | L03–04 situasi terima kasih/maaf | quick response tanpa teks |
| U01-L3 Ya, tidak, dan meminta bantuan | 3 | V09–12; panjang bunyi awal | R05–06 simbol/pilihan | L05–07 classroom response | response sesuai ujaran |
| U01-L4 Memulai perkenalan | 3 | V13–16; ritme mora | R07–08 name-card micro-match | L08–09 first-meeting chunks | fungsi chunk benar |
| U01-L5 Bertahan saat belum paham | 2 | V17–20; instruction set | R09–10 instruksi UI | L10–12 repair sequence | pahami 4 instruksi inti |

#### U02 — Hiragana dasar dan decoding kata

**Outcome:** learner mengenali 46 hiragana dasar, memetakan bunyi–glyph, dan mendekode kata tanpa bergantung pada romaji. **Hard prerequisite:** vowel/mora mapping U01 ≥0,70. **Unit check:** kana tunggal, audio-to-kana, dan word decoding dengan romaji tersembunyi.

**Vocabulary V-U02-01…25:** あい; あお; あか; いえ; うえ; え; お; かお; かさ; くつ; ここ; そこ; すし; たこ; つくえ; とけい; なか; ねこ; はこ; ふね; へや; ほし; みせ; やま; ゆき.

**Kana:** あ–お; か–こ; さ–そ; た–と; な–の; は–ほ; ま–も; や/ゆ/よ; ら–ろ; わ/を/ん. **Grammar:** tidak ada.

| Lesson | C | Target | Reading objects | Listening objects | Exit evidence |
| --- | ---: | --- | --- | --- | --- |
| U02-L1 Vokal dan baris K | 3 | V01–05; あ–お, か–こ | R01–02 kana/word match | L01–02 audio-to-kana | ≥80% glyph–sound |
| U02-L2 Baris S dan T | 3 | V06–10; さ–そ, た–と | R03–04 confusable forms | L03–04 mora sequence | decode 2–3 mora |
| U02-L3 Baris N dan H | 3 | V11–15; な–の, は–ほ | R05–07 word boundary | L05–06 kana-to-audio | varied recognition |
| U02-L4 Baris M, Y, R | 3 | V16–20; ま–も, や行, ら行 | R08–09 micro-label | L07–08 speaker variation | decode unseen word |
| U02-L5 W, を, ん dan integrasi | 2 | V21–25; わ/を/ん | R10–12 mixed word set | L09–10 cumulative mapping | tanpa romaji |

#### U03 — Hiragana lanjutan dan ortografi

**Outcome:** learner membaca dakuten, handakuten, yoon, sokuon, mora nasal, vokal panjang, dan pengecualian reading partikel dalam chunks. **Hard prerequisite:** core hiragana U02 ≥0,85. **Unit check:** minimal pairs dan kata baru tanpa romaji.

**Vocabulary V-U03-01…25:** がくせい; ぎんこう; かぎ; かぜ; ごはん; ざっし; じかん; みず; でぐち; でんわ; かばん; くだもの; てがみ; ぱん; びょういん; べんきょう; きって; きっぷ; がっこう; きょう; しゃしん; しゅくだい; ちょっと; おかあさん; おとうさん.

**Kana/orthography:** が/ざ/だ/ば/ぱ rows; voiced contrast; yoon utama; っ; long vowel; は→わ, へ→え, を→お hanya dalam approved chunk. **Grammar:** tidak ada.

| Lesson | C | Target | Reading objects | Listening objects | Exit evidence |
| --- | ---: | --- | --- | --- | --- |
| U03-L1 Dakuten K/G dan S/Z | 3 | V01–05; が/ざ rows | R01–02 form contrast | L01–02 voicing | distinguish k/g, s/z |
| U03-L2 D/B/P dan nasal | 3 | V06–10; だ/ば/ぱ, ん | R03–04 word decoding | L03–04 voiced minimal pairs | audio-to-word |
| U03-L3 Sokuon | 3 | V11–15; っ | R05–07 length contrast | L05–06 sokuon presence | mora count + decode |
| U03-L4 Yoon | 3 | V16–20; きゃ/しゃ/ちゃ families | R08–09 combined kana | L07–08 one-vs-two mora | unseen yoon word |
| U03-L5 Long vowel dan chunks | 2 | V21–25; long vowel/particle readings | R10–12 phrase reading | L09–10 phrase discrimination | no critical sound error |

#### U04 — Katakana dan mixed orthography

**Outcome:** learner mengenali katakana dasar dan turunannya, membaca loanword umum, serta berpindah antara hiragana–katakana tanpa romaji. **Hard prerequisite:** hiragana core ≥0,85; advanced marks ≥0,70. **Gate check:** syarat S0→S1 lengkap.

**Vocabulary V-U04-01…30:** アニメ; アイスクリーム; アパート; エアコン; エレベーター; カメラ; カレー; コーヒー; コンビニ; サッカー; シャツ; シャワー; スマートフォン; スーパー; タクシー; テレビ; テスト; トイレ; バス; パーティー; ホテル; ボールペン; メニュー; レストラン; インドネシア; インターネット; コピー; ノート; ペット; ラジオ.

**Katakana:** 46 basic forms; dakuten/handakuten; yoon; ッ; ー; limited ティ/ファ family bila dipakai target; confusables シ/ツ, ソ/ン, ク/ケ, ル/レ. **Grammar:** tidak ada.

| Lesson | C | Target | Reading objects | Listening objects | Exit evidence |
| --- | ---: | --- | --- | --- | --- |
| U04-L1 Vokal, K, S, T | 3 | V01–06; ア–ト | R01–02 katakana labels | L01–02 audio mapping | core rows ≥80% |
| U04-L2 N, H, M, Y | 3 | V07–12; ナ–ヨ | R03–04 visual contrast | L03–05 word recognition | decode loanwords |
| U04-L3 R, W, ン dan confusables | 3 | V13–18; ラ–ン | R05–07 シ/ツ, ソ/ン | L06–07 cumulative | confusable probe |
| U04-L4 Marks dan long bar | 3 | V19–24; voiced/yoon/ッ/ー | R08–09 orthography | L08–09 length/loanword | audio-to-katakana |
| U04-L5 Mixed script dan gate | 2 | V25–30; hiragana+katakana | R10–12 micro-text | L10–12 classroom/task audio | S0 verification set |

### S1 — Kalimat dan Identitas Dasar

#### U05 — Identitas, demonstratives, dan kalimat nominal

**Outcome:** learner menemukan dan memahami informasi nama, asal, peran, dan identitas pada dialog, profile card, atau formulir sederhana. **Hard prerequisite:** gate S0; formulaic chunks U01. **Kanji:** 人, 名, 国, 私, 学, 生. **Grammar:** `Nです`; `N1はN2です`; `Nじゃないです`; `Sか`.

**Vocabulary V-U05-01…45:** 私; あなた; あの人; 先生; 学生; 会社員; 医者; 店員; エンジニア; 名前; 国; 日本; 中国; 韓国; アメリカ; イギリス; オーストラリア; タイ; フィリピン; ベトナム; マレーシア; ブラジル; 人; 方; 友達; 同僚; 皆さん; こちら; これ; それ; あれ; この; その; あの; どれ; どの; 何; 誰; どなた; どこ; ～さん; ～人; ～語; 出身; 初めて.

| Lesson | C | Target slice | R/L objects | Outcome dan exit evidence |
| --- | ---: | --- | --- | --- |
| U05-L1 Nama dan peran | 3 | V01–09; K人/名; G01 | R01 profile label; L01–02 introduction | pilih identitas yang disebut |
| U05-L2 Negara dan asal | 3 | V10–18; K国/私; G02 | R02 country card; L03 | hubungkan orang–asal |
| U05-L3 Nasionalitas dan bahasa | 3 | V19–27; K学; G03 | R03 short profile; L04 | pahami afirmatif/negatif |
| U05-L4 Menunjuk orang/benda | 4 | V28–36; K生; review G01–03 | R04 demonstrative micro-text; L05–06 | referent resolution |
| U05-L5 Bertanya dan memverifikasi | 4 | V37–45; G04 | R05 form field; L07 | unit integrated checkpoint prep |

#### U06 — Angka, umur, waktu, tanggal, dan jadwal

**Outcome:** learner mengambil informasi angka, umur, jam, hari, dan tanggal dari percakapan serta jadwal sederhana. **Hard prerequisite:** nominal sentence U05 ≥0,70. **Kanji:** 一, 二, 三, 四, 五, 六, 七, 八. **Grammar:** `これ/それ/あれ`; `この/その/あのN`; `ここ/そこ/あそこ`; `NのN` (afiliasi); interrogative + `か`.

**Vocabulary V-U06-01…45:** 零; 一; 二; 三; 四; 五; 六; 七; 八; 九; 十; 百; 千; 万; 午前; 午後; 朝; 昼; 夜; 今; 今日; 明日; 昨日; 時; 分; 半; 何時; 月曜日; 火曜日; 水曜日; 木曜日; 金曜日; 土曜日; 日曜日; 週; 今週; 来週; 先週; 年; 月; 日; 誕生日; 予定; カレンダー; 毎日.

| Lesson | C | Target slice | R/L objects | Outcome dan exit evidence |
| --- | ---: | --- | --- | --- |
| U06-L1 Angka 0–10 | 3 | V01–09; K一/二; G01 | R01 number label; L01 | distinguish number audio |
| U06-L2 Ratus, ribu, waktu | 3 | V10–18; K三/四; G02 | R02 price/time microtext; L02–03 | map time expression |
| U06-L3 Hari ini dan jam | 3 | V19–27; K五; G03 | R03 clock notice; L04 | retrieve hour/minute |
| U06-L4 Hari dan pekan | 4 | V28–36; K六/七; G04 | R04 weekly schedule; L05–06 | locate day/activity |
| U06-L5 Tanggal dan jadwal | 4 | V37–45; K八; G05 | R05 calendar; L07 | integrated schedule task |

#### U07 — Keluarga, orang, kepemilikan, dan pertanyaan

**Outcome:** learner memahami hubungan keluarga, usia, tempat tinggal, dan kepemilikan pada foto/profile sederhana. **Hard prerequisite:** `NはNです`, question form. **Kanji:** 九, 十, 父, 母, 子, 女, 男, 友. **Grammar:** `Nも`; `N1とN2`; `N1のN2` (kepemilikan/relasi); topic ellipsis `Nは？`.

**Vocabulary V-U07-01…45:** 家族; 父; 母; 両親; お父さん; お母さん; 兄; 姉; 弟; 妹; 祖父; 祖母; おじいさん; おばあさん; 夫; 妻; 主人; 奥さん; 子ども; 息子; 娘; 兄弟; 姉妹; 男; 女; 男の子; 女の子; 赤ちゃん; 親; いとこ; おじ; おば; 友人; 恋人; 一人; 二人; 何人; 歳; 何歳; 若い; 大人; 一緒; 写真; 結婚; 住む.

| Lesson | C | Target slice | R/L objects | Outcome dan exit evidence |
| --- | ---: | --- | --- | --- |
| U07-L1 Keluarga inti | 3 | V01–09; K九/十; G01 | R01 family labels; L01–02 relation | identify who is who |
| U07-L2 Kakek-nenek dan pasangan | 3 | V10–18; K父/母; G02 | R02 family tree; L03–04 | conjunction relation |
| U07-L3 Anak dan saudara | 3 | V19–27; K子/女; G03 | R03 photo caption; L05 | possession/relationship |
| U07-L4 Relasi dan jumlah orang | 4 | V28–36; K男; review | R04–05 profile posts; L06–07 | retrieve count and relation |
| U07-L5 Umur, foto, tempat tinggal | 4 | V37–45; K友; G04 | R06 social post; L08 | integrated family profile |

#### U08 — Benda, posisi, keberadaan, dan notices kelas

**Outcome:** learner menemukan benda/orang, memahami posisi, dan mengikuti classroom notice sederhana. **Hard prerequisite:** demonstratives U06 dan nominal questions. **Kanji:** 上, 下, 中, 外, 左, 右, 前, 後. **Grammar:** `placeにNがあります`; `placeにperson/animalがいます`; `Nはplaceにあります/います`; `Nのposition`; `counter + あります`.

**Vocabulary V-U08-01…45:** 物; 本; 辞書; 教科書; 鉛筆; ペン; 消しゴム; 紙; はさみ; 時計; 机; 椅子; 鞄; 鍵; 傘; ドア; 窓; 部屋; 教室; 学校; 事務所; 食堂; 受付; 玄関; 階段; 上; 下; 中; 外; 前; 後ろ; 右; 左; 隣; 近く; 間; 横; 奥; 向こう; あります; います; ありません; いません; 場所; 地図.

| Lesson | C | Target slice | R/L objects | Outcome dan exit evidence |
| --- | ---: | --- | --- | --- |
| U08-L1 Alat belajar | 3 | V01–09; K上; G01 | R01 item list; L01–02 locate object | existence of object |
| U08-L2 Ruang kelas | 3 | V10–18; K下/中; G02 | R02 room labels; L03 | locate person/animal |
| U08-L3 Fasilitas dan tempat | 3 | V19–27; K外/左; G03 | R03–04 notice/map; L04–05 | retrieve location |
| U08-L4 Posisi relatif | 4 | V28–36; K右/前; G04 | R05 position diagram; L06–07 | distinguish position |
| U08-L5 Keberadaan dan jumlah | 4 | V37–45; K後; G05 | R06 classroom notice; L08 | S1 integrated checkpoint prep |

### S2 — Kehidupan Sehari-hari

#### U09 — Rutinitas, verba dasar, waktu, polarity, dan tense

**Outcome:** learner memahami dan mengurutkan rutinitas harian, termasuk waktu, frekuensi, afirmatif/negatif, serta present/past sopan. **Hard prerequisite:** core kana, time U06, basic locations U08. **Kanji:** 日, 月, 火, 水, 木, 金, 土, 時, 半, 分. **Grammar:** `Vます`; `Vません`; `Vました`; `Vませんでした`; `[time]にV / ごろ`.

**Vocabulary V-U09-01…50:** 起きる; 寝る; 眠る; 浴びる; 洗う; 磨く; 着る; 脱ぐ; 食べる; 飲む; 行く; 来る; 帰る; 働く; 勉強する; 休む; 始まる; 終わる; 読む; 書く; 聞く; 見る; 話す; 会う; する; 掃除する; 洗濯する; 料理する; 散歩する; 買い物する; 毎朝; 毎晩; 毎週; いつも; よく; 時々; あまり; 全然; 早く; 遅く; まず; 次に; それから; だいたい; ごろ; から; まで; 平日; 週末; 生活.

| Lesson | C | Target slice | R/L objects | Outcome dan exit evidence |
| --- | ---: | --- | --- | --- |
| U09-L1 Bangun sampai berangkat | 3 | V01–10; K日/月; G01 | R01 routine strip; L01 | select action/order |
| U09-L2 Pergi, bekerja, pulang | 3 | V11–20; K火/水; G02 | R02 timetable; L02–03 | negative routine detail |
| U09-L3 Aktivitas dan masa lampau | 4 | V21–30; K木/金; G03 | R03–04 diary lines; L04–05 | past action retrieval |
| U09-L4 Frekuensi | 4 | V31–40; K土/時; G04 | R05 frequency profile; L06 | polarity + frequency |
| U09-L5 Urutan dan waktu | 4 | V41–50; K半/分; G05 | R06–07 daily schedule; L07–08 | integrated routine task |

#### U10 — Makanan, minuman, pilihan, pesanan, dan counter awal

**Outcome:** learner memahami pilihan makanan/minuman, preferensi, jumlah dasar, dan pesanan pendek. **Hard prerequisite:** polite verb forms U09; demonstratives U06. **Kanji:** 食, 飲, 茶, 肉, 魚, 米, 百, 千, 円, 店. **Grammar:** `NをV`; `Nが好きです／嫌いです`; `あまりVません`; frequency adverb + predicate; basic counter + quantity.

**Vocabulary V-U10-01…50:** 食べ物; 飲み物; 朝ご飯; 昼ご飯; 晩ご飯; 食パン; 肉; 牛肉; 豚肉; 鶏肉; 魚; 卵; 野菜; 果物; 米; 麺; うどん; そば; ラーメン; カレーライス; おにぎり; 弁当; スープ; サラダ; ケーキ; お菓子; お湯; お茶; 紅茶; 牛乳; ジュース; ビール; しょうゆ; 塩; 砂糖; 味; 美味しい; まずい; 甘い; 辛い; 塩辛い; 熱い; 冷たい; 好き; 嫌い; 注文; 一つ; 二つ; 一杯; 一本.

| Lesson | C | Target slice | R/L objects | Outcome dan exit evidence |
| --- | ---: | --- | --- | --- |
| U10-L1 Waktu makan dan bahan | 3 | V01–10; K食/飲; G01 | R01 menu labels; L01 | object–verb mapping |
| U10-L2 Makanan pokok | 3 | V11–20; K茶/肉; G02 | R02 menu choice; L02–03 | identify preference |
| U10-L3 Hidangan dan minuman | 4 | V21–30; K魚/米; G03 | R03–04 breakfast post; L04–05 | negative habit detail |
| U10-L4 Rasa dan suhu | 4 | V31–40; K百/千; G04 | R05 review snippet; L06 | preference + reason cue |
| U10-L5 Memesan dan menghitung | 4 | V41–50; K円/店; G05 | R06–07 simple menu; L07–08 | order correct item/amount |

#### U11 — Tempat, arah, tujuan, transportasi, dan movement

**Outcome:** learner menentukan rute, kendaraan, tujuan, lokasi transit, dan perkiraan durasi dari peta, tanda, atau dialog pendek. **Hard prerequisite:** locations U08; time U06; movement verbs U09. **Kanji:** 東, 西, 南, 北, 行, 来, 駅, 車, 電, 道. **Grammar:** destination `へ／に行きます`; means `で`; `placeからplaceまで`; `placeでvehicleに乗る／を降りる`; duration `ぐらい／かかります`.

**Vocabulary V-U11-01…50:** 町; 駅; 空港; 港; バス停; 道; 交差点; 信号; 橋; 公園; 郵便局; 市役所; 警察署; 図書館; 駐車場; デパート; 地下鉄; 電車; 新幹線; 自転車; 車; 飛行機; 神社; 寺; 角; 乗り場; 入口; 東; 西; 南; 北; まっすぐ; 曲がる; 渡る; 乗る; 降りる; 歩く; 走る; 着く; 出発する; 到着する; 遠い; 近い; 便利; 不便; どちら; どうやって; 何番; かかる; 方面.

| Lesson | C | Target slice | R/L objects | Outcome dan exit evidence |
| --- | ---: | --- | --- | --- |
| U11-L1 Landmark dan tujuan | 3 | V01–10; K東/西; G01 | R01 mini-map; L01 | choose destination |
| U11-L2 Fasilitas kota | 3 | V11–20; K南/北; G02 | R02 sign set; L02–03 | identify means |
| U11-L3 Kendaraan dan orientasi | 4 | V21–30; K行/来; G03 | R03–04 route notice; L04–05 | origin–destination |
| U11-L4 Petunjuk gerak | 4 | V31–40; K駅/車; G04 | R05 directions; L06 | correct boarding/action |
| U11-L5 Durasi dan rute lengkap | 4 | V41–50; K電/道; G05 | R06–07 route table; L07–08 | task-based travel decision |

#### U12 — Belanja, harga, jumlah, dan information retrieval

**Outcome:** learner menemukan barang, harga, ukuran, warna, jumlah, lantai, dan tindakan checkout pada material fungsional. **Hard prerequisite:** numbers U06; counters U10; location U08. **Kanji:** 買, 安, 高, 入, 出, 口, 大, 小, 多, 少. **Grammar:** `いくらですか`; `[quantity]ください`; `Nをください`; `quantityずつ`; `NやNなど`.

**Vocabulary V-U12-01…50:** 買う; 売る; 値段; 円; いくら; 高い; 安い; 大きい; 小さい; 長い; 短い; 多い; 少ない; 新しい; 古い; 色; 赤; 青; 白; 黒; 黄色; 緑; 茶色; サイズ; 大きさ; 店; 売り場; 階; 何階; 商品; 財布; お金; 現金; クレジットカード; レジ; 袋; 箸; レシート; 割引; 半額; ください; 要る; 必要; ちょうど; もっと; もう少し; 試す; 見せる; 払う; 温める.

| Lesson | C | Target slice | R/L objects | Outcome dan exit evidence |
| --- | ---: | --- | --- | --- |
| U12-L1 Harga dan ukuran | 3 | V01–10; K買/安; G01 | R01 price tag; L01 | retrieve price/size |
| U12-L2 Jumlah dan kondisi barang | 3 | V11–20; K高/入; G02 | R02 product cards; L02–03 | request amount |
| U12-L3 Warna dan lokasi toko | 4 | V21–30; K出/口; G03 | R03–04 floor guide; L04–05 | find item/floor |
| U12-L4 Pembayaran dan checkout | 4 | V31–40; K大/小; G04 | R05 discount sign; L06 | checkout response |
| U12-L5 Permintaan dan pilihan | 4 | V41–50; K多/少; G05 | R06–07 advertisement; L07–08 | integrated shopping task |

### S3 — Tindakan dan Interaksi Terpandu

#### U13 — Adjektiva, deskripsi, dan perbandingan awal

**Outcome:** learner memahami deskripsi orang, benda, tempat, cuaca, dan kualitas dalam present/past serta affirmative/negative. **Hard prerequisite:** nominal polarity U05; predicate tense U09. **Kanji:** 新, 古, 長, 短, 白, 黒, 赤, 青. **Grammar:** i-adjective present affirmative; i-adjective negative; i-adjective past; na-adjective present affirmative; na-adjective negative; `NはAです` sebagai descriptive predicate.

**Vocabulary V-U13-01…50:** 静か; 賑やか; 綺麗; 有名; 元気; 親切; 上手; 下手; 暇; 簡単; 複雑; 面白い; 楽しい; つまらない; 難しい; 易しい; 忙しい; かわいい; かっこいい; 良い; 悪い; 暑い; 寒い; 暖かい; 涼しい; 重い; 軽い; 明るい; 暗い; 広い; 狭い; 強い; 弱い; 速い; 丈夫; 危ない; 安全; 汚い; 丸い; 四角い; 柔らかい; 硬い; 同じ; 違う; とても; かなり; 本当に; まあまあ; 少し; 一番.

| Lesson | C | Target slice | R/L objects | Outcome dan exit evidence |
| --- | ---: | --- | --- | --- |
| U13-L1 Na-adjective dasar | 3 | V01–10; K新; G04 | R01 description; L01–02 | choose matching quality |
| U13-L2 Evaluasi dan kesulitan | 4 | V11–20; K古/長; G05 | R02–03 reviews; L03–04 | interpret negative description |
| U13-L3 Cuaca dan sifat fisik | 4 | V21–30; K短/白; G01 | R04 weather card; L05–06 | i-adjective affirmative |
| U13-L4 Kontras sifat | 4 | V31–40; K黒/赤; G02–03 | R05–06 comparison snippets; L07 | tense/polarity distinction |
| U13-L5 Intensitas dan integrasi | 4 | V41–50; K青; G06 | R07–08 product/place review; L08–09 | integrated description |

#### U14 — Rumah, kota, existence, dan modifikasi nomina

**Outcome:** learner memahami tata ruang rumah/kota, ciri tempat, kondisi sekitar, dan frasa nomina termodifikasi. **Hard prerequisite:** location/existence U08; adjectives U13. **Kanji:** 家, 室, 広, 近, 遠, 山, 川, 町. **Grammar:** `placeでV`; relative clause `V-plain + N`; `i-A + N`; `na-AなN`; negative `ありません／いません`; position phrase expansion.

**Vocabulary V-U14-01…50:** 家; マンション; 寮; 台所; 風呂; 庭; ベランダ; 屋根; 壁; 床; 天井; 冷蔵庫; 電子レンジ; 洗濯機; 炊飯器; 掃除機; テーブル; ベッド; ソファ; 棚; 引き出し; 建物; ビル; 住所; 通り; 田舎; 都会; 海; 川; 木; 花; 天気; 晴れ; 雨; 曇り; 風; 春; 夏; 秋; 冬; 季節; 周り; 景色; 近所; 住みやすい; 住みにくい; 屋内; 屋外; 住宅; 地域.

| Lesson | C | Target slice | R/L objects | Outcome dan exit evidence |
| --- | ---: | --- | --- | --- |
| U14-L1 Jenis rumah dan ruang | 3 | V01–10; K家; G01 | R01 floor plan; L01–02 | locate room/action |
| U14-L2 Peralatan rumah | 4 | V11–20; K室/広; G05 | R02–03 appliance notice; L03–04 | existence/absence |
| U14-L3 Bangunan dan lingkungan | 4 | V21–30; K近/遠; G03–04 | R04 property card; L05–06 | modified noun retrieval |
| U14-L4 Cuaca dan musim | 4 | V31–40; K山/川; review | R05–06 weather note; L07 | place/weather detail |
| U14-L5 Menilai tempat tinggal | 4 | V41–50; K町; G02/G06 | R07–08 short neighborhood text; L08–09 | integrated housing choice |

#### U15 — Aktivitas, tujuan, means, sequence, dan frequency

**Outcome:** learner memahami aktivitas waktu luang, lokasi/partner, tujuan pergi, urutan tindakan, dan pengalaman yang sudah/belum selesai. **Hard prerequisite:** verb forms U09; movement U11; place `で` U14. **Kanji:** 見, 聞, 読, 書, 話, 会, 社, 校. **Grammar:** `[time]から[time]まで`; `Vます-stemに行く`; `Vてから`; `Vて` untuk sequence; `もうVました`; `まだVていません`.

**Vocabulary V-U15-01…50:** 趣味; 音楽; 映画; 漫画; ゲーム; スポーツ; テニス; 野球; 水泳; 読書; 旅行; 絵; 歌; ダンス; ギター; ピアノ; ドライブ; キャンプ; 釣り; 山登り; 映画館; 博物館; 美術館; カラオケ; コンサート; 休日; 休みの日; 一人で; 友達と; 家で; 外で; 行き先; 方法; 回; 度; 毎月; 一週間; 一時間; 練習する; 泳ぐ; 歌う; 弾く; 撮る; 遊ぶ; 集める; 習う; 出かける; 楽しむ; 参加する; 自由時間.

| Lesson | C | Target slice | R/L objects | Outcome dan exit evidence |
| --- | ---: | --- | --- | --- |
| U15-L1 Hobi dan media | 3 | V01–10; K見; G01 | R01 hobby profile; L01–02 | identify frequency/activity |
| U15-L2 Seni dan perjalanan | 4 | V11–20; K聞/読; G02 | R02–03 event card; L03–04 | infer purpose of going |
| U15-L3 Tempat dan partner | 4 | V21–30; K書/話; G03 | R04 social post; L05–06 | sequence after action |
| U15-L4 Frekuensi dan durasi | 4 | V31–40; K会/社; G04 | R05–06 schedule; L07 | order two actions |
| U15-L5 Kegiatan dan status selesai | 4 | V41–50; K校; G05–06 | R07–08 activity diary; L08–09 | already/not-yet distinction |

#### U16 — Permintaan, izin, larangan, kewajiban, dan instruksi

**Outcome:** learner memahami dan memilih tindakan dari instruksi, permintaan, izin, larangan, serta kewajiban sederhana. **Hard prerequisite:** verb `て` sequence U15; polarity U09. **Kanji:** 立, 休, 手, 持, 待, 使, 開, 閉. **Grammar:** `Vてください`; `Vないでください`; `Vてもいいです`; `Vてはいけません`; `Vなければなりません`; `Vなくてもいいです`.

**Vocabulary V-U16-01…50:** 手伝う; 貸す; 借りる; 使う; 開ける; 閉める; 待つ; 持つ; 置く; 取る; 入れる; 出す; 押す; 引く; 立つ; 座る; 止まる; 入る; 出る; 消す; つける; コピーする; 電話する; 連絡する; 送る; 教える; 覚える; 忘れる; 急ぐ; 気をつける; 大丈夫; 禁止; 注意; 危険; 使用中; 喫煙; 駐車; 静かに; ゆっくり; すぐ; ここで; ～中; ルール; 約束; 宿題; 質問; 答え; 例; 問題; 締め切り.

| Lesson | C | Target slice | R/L objects | Outcome dan exit evidence |
| --- | ---: | --- | --- | --- |
| U16-L1 Meminta bantuan | 3 | V01–10; K立; G01 | R01 request note; L01–02 | choose requested action |
| U16-L2 Instruksi tindakan | 4 | V11–20; K休/手; G02 | R02–03 signs; L03–04 | obey negative instruction |
| U16-L3 Komunikasi dan izin | 4 | V21–30; K持/待; G03 | R04 message; L05–06 | permission decision |
| U16-L4 Tanda dan larangan | 4 | V31–40; K使/開; G04 | R05–06 public notices; L07 | prohibition recognition |
| U16-L5 Aturan dan kewajiban | 4 | V41–50; K閉; G05–06 | R07–08 classroom rules; L08–09 | S3 task-based instruction |

### S4 — Perluasan Makna dan Alur

#### U17 — Kesukaan, kemampuan, keinginan, dan pilihan

**Outcome:** learner memahami apa yang disukai, mampu dilakukan, diinginkan, dan dipilih seseorang dalam profile, percakapan, atau rencana sederhana. **Hard prerequisite:** adjectives U13; verb morphology U09/U15. **Kanji:** 好, 楽. **Grammar:** `Nがほしいです`; `Vます-stemたいです`; `Vたくないです`; `V-dictionaryことができます`; `N/V-dictionaryのが好き・上手・下手`; `AとBとどちらが…`.

**Vocabulary V-U17-01…45:** 欲しい; 大好き; 好物; 興味; 得意; 苦手; できる; 知る; 言葉; 日本語; 英語; 漢字; ひらがな; カタカナ; 会話; 発音; 意味; 文法; 能力; 願い; 将来; 夢; 仕事; 留学; 大学; 外国; 文化; 和食; 温泉; 桜; お祭り; 観光; ほう; どちら（選択）; 選ぶ; 決める; 希望; ぜひ; たぶん; 特に; 例えば; 一緒に; やってみる; なる; 目的.

| Lesson | C | Target slice | R/L objects | Outcome dan exit evidence |
| --- | ---: | --- | --- | --- |
| U17-L1 Kesukaan dan minat | 3 | V01–09; K好; G05 | R01 preference profile; L01–02 | distinguish like/skill |
| U17-L2 Bahasa dan kemampuan | 4 | V10–18; G04 | R02–03 learner profile; L03–04 | identify ability |
| U17-L3 Cita-cita dan tujuan | 4 | V19–27; K楽; G02–03 | R04 short goal text; L05–06 | desire/polarity |
| U17-L4 Budaya dan pilihan | 4 | V28–36; G01/G06 | R05–06 choice notice; L07–08 | compare two options |
| U17-L5 Memutuskan pilihan | 4 | V37–45; review | R07–08 plan/profile; L09–10 | integrated preference task |

#### U18 — Alasan, penjelasan, kondisi, dan sebab–akibat

**Outcome:** learner menemukan alasan sederhana, memahami penjelasan masalah, dan memilih respons/tindakan pada kondisi kesehatan, cuaca, atau gangguan harian. **Hard prerequisite:** tense/polarity U09; adjectives U13; instruction U16. **Kanji:** 天, 気. **Grammar:** clause + `から`; clause + `ので`; `どうして…か`; explanatory `んです`; conjunction `でも`; conjunction `それから`.

**Vocabulary V-U18-01…45:** 理由; どうして; なぜ; だから; でも; しかし; そして; それで; 病気; 風邪; 熱; 頭; お腹; 喉; 歯; 足; 目; 耳; 体; 痛い; 痒い; 疲れる; 薬; 休養; 健康; 気分; 大変; 困る; 心配; 無理; 台風; 地震; 雷; 大雨; 事故; 遅刻; 忘れ物; 故障; 具合; 場合; もし; お大事に; 治る; 休憩; 原因.

| Lesson | C | Target slice | R/L objects | Outcome dan exit evidence |
| --- | ---: | --- | --- | --- |
| U18-L1 Menanyakan alasan | 3 | V01–09; K天; G01/G03 | R01 reason exchange; L01–02 | match cause–result |
| U18-L2 Gejala tubuh | 4 | V10–18; G02 | R02–03 clinic note; L03–04 | understand explanation |
| U18-L3 Kondisi dan tindakan | 4 | V19–27; K気; G04 | R04 health message; L05–06 | infer simple condition |
| U18-L4 Masalah dan cuaca | 4 | V28–36; G05 | R05–06 warning; L07–08 | contrast and action |
| U18-L5 Gangguan dan pemulihan | 4 | V37–45; G06 | R07–08 absence message; L09–10 | integrated cause sequence |

#### U19 — Perbandingan, superlative, kuantitas, dan intensitas

**Outcome:** learner membandingkan pilihan, memahami rentang/jumlah, menemukan yang paling sesuai, dan menafsirkan counter pada teks atau dialog. **Hard prerequisite:** adjectives U13; counters U10/U12; choice U17. **Kanji:** 早, 遅. **Grammar:** `AよりB`; `Aのほうが`; `Nの中で…がいちばん`; degree `もっと／いちばん`; approximation `ぐらい`; limit `だけ`.

**Vocabulary V-U19-01…45:** より; ほう（比較）; 一番（最上級）; 全部; 半分; 以上; 以下; 約; ぐらい; だけ; しか; たくさん; 少し（数量）; ほとんど; 何も; どこも; 誰も; 個; 枚; 本（助数詞）; 人（助数詞）; 匹; 台; 冊; 杯; 回（回数）; 階（助数詞）; 着; 足（助数詞）; 歳（助数詞）; 番; 番目; 最初; 最後; 次; 別; 両方; 片方; 比べる; 同じくらい; もっとも; ずっと; 約半分; 合計; 平均.

| Lesson | C | Target slice | R/L objects | Outcome dan exit evidence |
| --- | ---: | --- | --- | --- |
| U19-L1 Lebih dan paling | 3 | V01–09; K早; G01–G03 | R01 comparison card; L01–02 | choose compared winner |
| U19-L2 Batas dan kuantitas | 4 | V10–18; G04–G06 | R02–03 quantity notice; L03–04 | interpret limit/degree |
| U19-L3 Counter benda | 4 | V19–27; K遅; review | R04 menu/inventory; L05–06 | select correct amount |
| U19-L4 Urutan dan pasangan | 4 | V28–36; review | R05–06 ranking; L07–08 | retrieve ordinal/order |
| U19-L5 Perbandingan terintegrasi | 4 | V37–45; review | R07–08 product table; L09–10 | multi-detail comparison |

#### U20 — Ajakan, rencana, urutan kejadian, dan text flow

**Outcome:** learner memahami ajakan, menerima/menolak dengan tepat, membaca rencana, dan mengikuti urutan kejadian sederhana. **Hard prerequisite:** desire U17; sequence U15; reason U18. **Kanji:** 今, 週. **Grammar:** `Vませんか`; `Vましょう`; `Vましょうか`; `[time]に予定があります`; `V-dictionary前に`; `V-past後で`.

**Vocabulary V-U20-01…45:** 計画; 用事; イベント; 祭り; 出張; 会議; 授業; 試験; 予約; 招待; メッセージ; メール; 来月; 再来週; 去年; 今年; 来年; 今度; 先に; 後で; 前に; その後; 始め; 終わり; 集まる; 泊まる; 誘う; 断る; 返事する; 変える; 変更する; 間に合う; 遅れる; 楽しみにする; いつか; たいてい; 急に; もうすぐ; もちろん; 残念; 都合; 空いている; 忙しくなる; 決まる; 予定表.

| Lesson | C | Target slice | R/L objects | Outcome dan exit evidence |
| --- | ---: | --- | --- | --- |
| U20-L1 Acara dan komitmen | 3 | V01–09; K今; G04 | R01 event calendar; L01–02 | identify schedule conflict |
| U20-L2 Pesan dan waktu mendatang | 4 | V10–18; G01 | R02–03 invitation message; L03–04 | recognize invitation |
| U20-L3 Urutan rencana | 4 | V19–27; K週; G05–G06 | R04 itinerary; L05–06 | order events |
| U20-L4 Respons dan perubahan | 4 | V28–36; G02–G03 | R05–06 reply thread; L07–08 | accept/decline/help |
| U20-L5 Menyelesaikan rencana | 4 | V37–45; review | R07–08 plan narrative; L09–10 | S4 integrated plan task |

### S5 — Integrasi dan Readiness N5

S5 tidak menaikkan lexical/grammar ceiling secara substantif. Target baru di bawah dipakai agar learner memahami instruksi, hubungan informasi, dan evaluasi. Seluruh target core N5 harus sudah diperkenalkan sebelum simulation pertama.

#### U21 — Integrasi Vocabulary–Kanji dan short Reading

**Outcome:** learner mengerjakan kanji reading, orthography, context-defined meaning, paraphrase, dan short passage dalam mixed sets. **Hard prerequisite:** ≥85% target S0–S4 provisional/mastered; tidak ada kana blocker. **Kanji baru:** tidak ada. **Grammar integratif G-U21-01:** `N1はN2がAです` untuk atribut/bagian dalam teks.

**Vocabulary V-U21-01…10:** 語彙; 読み方; 書き方; 文; 文章; 段落; 題; 選択肢; 例文; 表現.

| Lesson | C | Target slice | R/L objects | Outcome dan exit evidence |
| --- | ---: | --- | --- | --- |
| U21-L1 Kanji reading mix | 4 | V01–02; word-first Kanji review | R01–02 kanji reading; L01 | varied reading accuracy |
| U21-L2 Orthography mix | 4 | V03–04; kana↔kanji/katakana | R03–04 orthography; L02 | select correct form |
| U21-L3 Contextual meaning | 4 | V05–06; vocab contrast | R05–06 context meaning | diagnose sense errors |
| U21-L4 Paraphrase | 4 | V07–08; G01 | R07–08 paraphrase; L03 | recognize equivalent meaning |
| U21-L5 Short Reading set | 4 | V09–10; cumulative | R09–10 timed-soft passages; L04 | mixed language/reading set |

#### U22 — Integrasi Listening: quick response dan verbal expressions

**Outcome:** learner memahami situasi, intent, quick response, verbal expression, dan key point tanpa transcript. **Hard prerequisite:** weekly Listening evidence S1–S4; no critical sound gap. **Kanji baru:** tidak ada. **Grammar integratif G-U22-01:** sentence-final `ね` untuk konfirmasi/shared information.

**Vocabulary V-U22-01…10:** 音声; 話し手; 聞き手; 内容; 要点; 場面; 会話文; 応答; 指示; 再生.

| Lesson | C | Target slice | R/L objects | Outcome dan exit evidence |
| --- | ---: | --- | --- | --- |
| U22-L1 Quick response | 4 | V01–02; functional review | R01 instruction card; L01–02 | choose natural response |
| U22-L2 Situational expression | 4 | V03–04; G01 | R02 visual prompt; L03–04 | infer setting/relationship |
| U22-L3 Number/time traps | 4 | V05–06; number review | R—; L05–06 | distinguish corrected detail |
| U22-L4 Negation dan intent | 4 | V07–08; polarity review | R03 cue card; L07–08 | detect negation/intent |
| U22-L5 Mixed Listening section | 4 | V09–10; cumulative | R04 instructions; L09–10 | exam-like listening set |

#### U23 — Integrasi Grammar–Reading dan information retrieval

**Outcome:** learner memilih grammar form, menyusun kalimat, mengikuti text flow, dan mengambil informasi dari notice/material fungsional. **Hard prerequisite:** seluruh format Grammar dan Reading telah diperkenalkan. **Kanji baru:** tidak ada. **Grammar integratif G-U23-01:** sentence-final `よ` untuk informasi baru/penegasan.

**Vocabulary V-U23-01…10:** 説明; 情報; お知らせ; 案内; 広告; 表; 資料; 正しい; 間違い; 合う.

| Lesson | C | Target slice | R/L objects | Outcome dan exit evidence |
| --- | ---: | --- | --- | --- |
| U23-L1 Selecting grammar form | 3 | V01–02; morphology mix | R01 form-in-context; L01 | select constrained form |
| U23-L2 Sentence composition | 3 | V03–04; particle/order mix | R02–03 sentence ordering; L02 | valid sequence |
| U23-L3 Text grammar | 4 | V05–06; G01/connectors | R04 text-flow object; L— | choose coherent sentence |
| U23-L4 Information retrieval | 4 | V07–08; notice vocabulary | R05–06 functional material; L03 | locate and compare detail |
| U23-L5 Mixed Grammar–Reading | 4 | V09–10; cumulative | R07–08 timed set; L04 | section-level transfer |

#### U24 — Simulation, analisis kelemahan, remedial, dan readiness

**Outcome:** learner menyelesaikan dua simulation forms berbeda, memahami diagnosis, menyelesaikan critical weakness, dan memenuhi seluruh readiness rule. **Hard prerequisite:** S4 gate; semua format N5; content/policy versions compatible. **Kanji baru:** tidak ada. **Grammar integratif G-U24-01:** `N/na-Aになります; i-Aくなります` untuk perubahan keadaan dalam teks/dialog.

**Vocabulary V-U24-01…10:** 模擬試験; 点; 点数; 結果; 復習; 弱点; 目標; 合格; 準備; 確認.

| Lesson | C | Target slice | R/L objects | Outcome dan exit evidence |
| --- | ---: | --- | --- | --- |
| U24-L1 Readiness diagnostic | 3 | V01–02; G01; cumulative probes | R01–02 mixed diagnostic; L01–02 | weakness map, not pass/fail |
| U24-L2 Simulation Form A | 3 | V03–04; no new core target | R03 full section assembly; L03–04 | weighted accuracy snapshot A |
| U24-L3 Remedial berdasarkan A | 3 | V05–06; weakest KCs | R04–05 targeted transfer; L05–06 | critical weakness resolution |
| U24-L4 Simulation Form B | 3 | V07–08; no repeated form | R06 full section assembly; L07–08 | weighted accuracy snapshot B |
| U24-L5 Readiness decision | 2 | V09–10; retention probes | R07–08 final retrieval; L09–10 | auditable readiness snapshot |

Enam assessment slot U24 memuat dua simulation form N5 sepanjang 90 menit masing-masing. Debrief, targeted remedial, dan final probe menggunakan slot konten/review U24; simulation tidak dipecah dengan feedback di tengah section.

## 8. Checkpoint dan Stage Gate

| Gate | Stimulus minimum | Keputusan |
| --- | --- | --- |
| S0→S1 | single kana, unseen word decoding, audio-to-kana, mixed hiragana/katakana, advanced marks | decoding ≥90%; hiragana tanpa romaji; katakana ≥80%; no critical misconception |
| S1→S2 | identity/profile, schedule, family/location notice, short dialogue | hard prerequisites ≥0,85; checkpoint ≥80%; no core domain <0,75 |
| S2→S3 | routine diary, menu/order, route task, shopping information retrieval | delayed retention ≥80%; basic daily sentence/dialog comprehension |
| S3→S4 | short passage dan key-point/task-based listening dengan dukungan terbatas | transfer berhasil; no blocking particle/morphology/location gap |
| S4→S5 | mixed short/mid text, quick response, verbal expression, key point, task-based | ≥85% target provisional/mastered; seluruh format N5 telah diperkenalkan |
| S5→Ready | dua simulation forms + delayed probes + critical weakness audit | seluruh readiness policy Mastery Specification terpenuhi |

Checkpoint gagal tidak mengunci seluruh aplikasi. Engine merakit remedial, due review, dan integrasi dari stage aktif; hanya target dengan hard prerequisite gagal yang tetap locked.

## 9. Kontrak Reading dan Listening Object

### 9.1 Reading

Setiap slot `R` pada tabel lesson wajib diubah menjadi satu ReadingObject unik. Distribusi total mengikuti angka unit sumber: U01–U04 = 46; U05–U08 = 22; U09–U12 = 28; U13–U20 = 64; U21–U24 = 30; total 190.

- S0: decoding, symbol awareness, label, dan micro-text 1–20 karakter.
- S1: phrase/single sentence 5–50 karakter; profile, schedule, form, map, dan notice.
- S2: sentence hingga short passage 40–100 karakter; information retrieval mulai diperkenalkan.
- S3: short passage dan mid-size 160–300 karakter dengan lexical coverage instructional ≥90%.
- S4: short/mid text dengan reference, sequence, intent, low inference, dan comparison.
- S5: format JLPT short passage, mid-size passage, information retrieval, dan timed mixed set.

Setiap object menyimpan lexical coverage, grammar ceiling, kanji density, unknown support, layout, question, answer, rationale, distractor class, diagnostic mapping, rights, dan accessibility metadata.

### 9.2 Listening

Setiap slot `L` menjadi satu ListeningObject unik. Distribusi total: U01–U04 = 44; U05–U08 = 30; U09–U12 = 32; U13–U20 = 76; U21–U24 = 28; total 210.

- S0: `very_clear_segmented`, 1–12 detik, sound discrimination dan audio–kana.
- S1: `clear_slow`, 2–30 detik, quick response, identity, time, family, location.
- S2: `clear_slow`→`slow_natural`, 5–60 detik, explicit detail, key point, action.
- S3–S4: `slow_natural`, hingga 75 detik, 1–2 speaker, controlled contextual cue.
- S5: `exam_like`, replay fixed, tanpa transcript sebelum jawab.

Transcript internal harus verbatim dan sinkron dengan audio. Replay tidak menciptakan encounter baru. Noise tidak boleh menjadi sumber kesulitan utama.

## 10. Attribution Evidence per Lesson

1. Setiap scored item memiliki tepat satu primary KC.
2. Supporting KC hanya digunakan bila metadata mapping telah disetujui dan diagnostic confidence ≥0,50.
3. Reading comprehension menggunakan Reading KC sebagai primary; Vocabulary/Grammar/Kanji hanya supporting kecuali question memang menargetkan domain itu.
4. Listening comprehension menggunakan Listening KC sebagai primary; jawaban berbasis transcript tidak sah sebagai Listening evidence.
5. Formulaic chunks S0 tidak memberi Grammar mastery.
6. Satu passage/audio dengan banyak question tetap satu encounter stimulus.
7. Setiap required KC membutuhkan sedikitnya tiga direct encounters, dua evidence types, dan delayed evidence ≥7 hari.

## 11. Authoring dan Publication Workflow

```text
Progression assignment
→ inventory entry + source rationale
→ prerequisite and ceiling review
→ original lesson/object authoring
→ linguistic and Indonesian localization review
→ assessment and distractor review
→ audio/rendering/accessibility/rights QA
→ approved content pack
→ curriculum-compatible publication
→ analytics and versioned revision
```

Konten tidak boleh disalin dari soal JLPT, Irodori, Marugoto, atau buku komersial. Sumber tersebut digunakan untuk format, level, topic coverage, dan triangulasi. Semua stimulus, example, distractor, audio, dan ilustrasi Nekoru harus original atau memiliki hak penggunaan yang terdokumentasi.

## 12. Validasi Otomatis

Build progression harus gagal jika:

- jumlah target bukan 900 V, 110 K, 90 G, 190 R, atau 210 L;
- jumlah session slot bukan 600 atau rekonsiliasi 420/120/60 tidak cocok;
- target concrete muncul sebagai target baru di lebih dari satu unit tanpa anotasi lemma–sense;
- Kanji tidak mempunyai vocabulary link yang telah dipelajari atau co-requisite;
- Grammar example melampaui lexical/Kanji ceiling tanpa support;
- lesson tidak mempunyai outcome, direct retrieval, integration object, atau exit evidence;
- Reading/Listening object tidak mempunyai answer, rationale, version, rights, dan diagnostic mapping;
- hard-prerequisite cycle atau dangling reference ditemukan;
- item non-approved dapat dipilih oleh runtime.

## 13. Acceptance Criteria Dokumen

1. Seluruh 24 unit dan 120 lesson package memiliki outcome dan assignment target.
2. Baseline 300 jam dapat direproduksi sebagai 600 slot 30 menit.
3. Daftar target concrete berjumlah tepat 900 Vocabulary, 110 Kanji, dan 90 Grammar.
4. Seluruh format resmi N5 dipelajari sebelum simulation pertama.
5. Progression menjelaskan canonical path, placement skip, acceleration, due review, remedial, modality fallback, checkpoint, dan readiness.
6. S0 mematuhi Beginner Foundations: tidak ada Kanji/Grammar baru, romaji dilepas, dan kana gate dapat diaudit.
7. S5 tidak menaikkan language ceiling secara substantif dan menjalankan dua simulation form berbeda.
8. Keputusan mastery/readiness mengikuti Mastery Specification; sequencing dan session runtime tetap berada pada Learning Engine serta policy version yang aktif.

## 14. Referensi dan Rasional Akademik

- [JLPT — Summary of Linguistic Competence Required for Each Level](https://www.jlpt.jp/e/about/levelsummary.html)
- [JLPT — Composition of Test Sections and Items](https://www.jlpt.jp/e/guideline/testsections.html)
- [JLPT — N5 Purposes of Test Items](https://www.jlpt.jp/e/guideline/pdf/n5_e_revised.pdf)
- [JLPT — Official Sample Questions](https://www.jlpt.jp/e/samples/forlearners.html)
- [JLPT — Scoring Sections and Pass/Fail](https://www.jlpt.jp/e/guideline/results.html)
- [JF Standard for Japanese-Language Education — Guidebook](https://www.jfstandard.jpf.go.jp/pdf/web_whole_en.pdf)
- [Irodori Starter A1 — Materials and Table of Contents](https://www.irodori.jpf.go.jp/en/starter/pdf.html)
- [Marugoto Starter A1 — Series and learning design](https://marugoto.jpf.go.jp/en/about/series/)

JLPT menentukan kompetensi dan format soal, tetapi tidak menerbitkan daftar Vocabulary/Kanji/Grammar resmi. JF Standard dan Irodori digunakan untuk orientasi Can-do dan konteks kehidupan nyata; Marugoto digunakan untuk triangulasi hubungan aktivitas komunikatif dengan sistem bahasa. Seluruh assignment item pada dokumen ini tetap merupakan inventory internal Nekoru yang memerlukan review akademik manusia.

## 15. Keputusan Lanjutan yang Diperlukan

Sebelum draft dapat berstatus `approved`, tim perlu memutuskan:

1. apakah 40 Vocabulary dan 4 Grammar S5 dipertahankan, dipindahkan ke U17–U20, atau dijadikan non-required;
2. apakah seluruh 900 Vocabulary berstatus required atau sebagian menjadi supporting/enrichment;
3. apakah lima lesson package per unit menjadi struktur UI yang terlihat atau hanya struktur authoring;
4. target browser/device final untuk glyph, furigana, audio, dan accessibility QA;
5. policy simulation assembly final, termasuk jumlah item dan replay instruction berdasarkan approved reference form.
