# Listening Blueprints N5 — Spesifikasi Konten

**Status:** Draft v0.1  
**Audiens:** Product, akademik, content operations, data, AI, design, audio, dan engineering  
**Cakupan:** Pemula absolut hingga kesiapan JLPT N5  
**Bahasa penjelasan:** Bahasa Indonesia  
**Tanggal:** 13 September 2026

## 1. Tujuan Dokumen

Dokumen ini mendefinisikan 210 learning objects Listening Nekoru: situasi, stimulus/script, speaker, kecepatan, durasi, noise, question type, replay, evidence, file audio, aksesibilitas, dan validasi. Satu object adalah satu stimulus audio tervalidasi beserta transcript internal, objective, pertanyaan, jawaban, rasional, serta metadata produksi.

Dokumen ini melengkapi [Arsitektur Kurikulum](../product-specs/curriculum-architecture.md), [Mastery Specification](../product-specs/mastery-specification.md), [Learning Engine](../product-specs/learning-engine.md), dan inventory/blueprint lain di folder ini.

## 2. Keputusan Utama

| Area | Keputusan |
| --- | --- |
| Baseline MVP | 210 listening objects |
| Unit penghitungan | Satu stimulus audio; bukan replay atau jumlah pertanyaan |
| Format resmi N5 | Task-based, key points, verbal expressions, quick response |
| Format fondasi internal | Diskriminasi bunyi dan pemetaan bunyi–aksara |
| Kecepatan | Bertahap dari jelas/tersegmentasi menuju lambat-alami dan exam-like |
| Transcript | Internal; tampil setelah respons untuk feedback, bukan bantuan default |
| Replay | Diizinkan saat belajar; checkpoint/simulation mengikuti blueprint |
| Diagnosis | Listening tidak boleh dinilai dari transcript |
| Audio | Master lossless, delivery derivative tervalidasi |

## 3. Outcome dan Landasan

Target N5 resmi berfokus pada percakapan singkat mengenai kehidupan sehari-hari dan situasi kelas, disampaikan perlahan, dengan kemampuan menangkap informasi yang diperlukan. Nekoru memperluasnya menjadi jalur instruksional dari persepsi bunyi sampai penyelesaian tugas berbasis audio.

Target internal:

- membedakan mora, vokal panjang, sokuon, yoon, dan bunyi serupa;
- memahami ungkapan kelas dan respons sangat singkat;
- menangkap siapa, apa, kapan, di mana, jumlah, dan tindakan;
- memilih ekspresi sesuai situasi;
- menentukan tindakan berdasarkan percakapan pendek;
- mempertahankan pemahaman tanpa transcript pada checkpoint.

## 4. Taxonomy dan Distribusi

| Primary category | Target | Tujuan |
| --- | ---: | --- |
| Diskriminasi bunyi dan pemetaan bunyi–aksara | 44 | Fondasi fonologis |
| Quick response | 48 | Respons tepat atas ujaran singkat |
| Verbal expressions berbasis situasi/gambar | 32 | Ekspresi sesuai konteks |
| Comprehension of key points | 42 | Menyaring detail yang ditentukan |
| Task-based comprehension | 32 | Menentukan tindakan/solusi |
| Listening campuran dan timed practice | 12 | Integrasi serta readiness |
| **Total** | **210** | |

Situation tags: classroom, greeting, self_introduction, family, time, schedule, home, school, workplace, restaurant, shopping, transport, directions, invitation, plan, request, permission, announcement.

Comprehension type: phoneme_discrimination, kana_mapping, quick_response, situational_expression, explicit_detail, key_point, action_selection, speaker_intent, sequence.

## 5. Model Learning Object

~~~text
ListeningObject
├── Script
├── AudioMaster
├── DeliveryAsset[]
├── Speaker[]
├── Situation
├── LearningObjective[]
├── Question[]
│   ├── AnswerKey
│   ├── Rationale
│   └── DiagnosticMapping
└── ProductionAndRights
~~~

Beberapa pertanyaan pada satu stimulus berbagi encounter_id. Replay tidak membuat encounter baru. Re-record dengan perbedaan prosodi substantif membutuhkan versi baru.

## 6. Kontrak Data

### 6.1 ListeningObject

| Field | Tipe | Wajib | Aturan |
| --- | --- | --- | --- |
| id | string | Ya | CONTENT.N5.LISTENING.{CATEGORY}.{NNN} |
| object_version | semver | Ya | Versi script/audio/question |
| curriculum_version | semver | Ya | Versi kompatibel |
| content_pack_id | string | Ya | Pack pemilik |
| title_internal | string | Ya | Tidak harus tampil |
| primary_category | enum | Ya | Tepat satu |
| situation_tags | enum[] | Ya | Minimal satu |
| comprehension_types | enum[] | Ya | Minimal satu |
| stage_id, unit_id | string | Ya | Penempatan pertama |
| learning_outcome_ids | string[] | Ya | Minimal satu |
| script | object | Ya | Bagian 6.2 |
| audio | object | Ya | Bagian 6.3 |
| speakers | array | Ya | Minimal satu |
| scene | object | Ya | Relasi dan konteks |
| questions | array | Ya | Minimal satu |
| replay_policy | object | Ya | Bagian 8 |
| difficulty_band | enum | Ya | easy, target, stretch |
| estimated_seconds | integer | Ya | Durasi interaksi |
| prerequisites | array | Ya | hard/soft/co-requisite |
| source_rationale | object | Ya | Scope |
| rights | object | Ya | Voice, music, ambience, script |
| attribution | object | Ya | Author, AI, reviewer, performer |
| status | enum | Ya | Lifecycle Bagian 14 |

### 6.2 Script

| Field | Keterangan |
| --- | --- |
| transcript_ja | Transcript verbatim internal |
| normalized_transcript_ja | Unicode NFC untuk analytics |
| utterances | speaker_id, start_ms, end_ms, text |
| vocabulary_kc_ids | Seluruh vocabulary bermakna |
| grammar_kc_ids | Seluruh grammar relevan |
| target_phonology | Mora/bunyi yang dinilai jika ada |
| lexical_coverage | Proporsi target yang sudah dikenal |
| unknown_supported | Target yang didukung melalui konteks |
| register | neutral, polite, casual, classroom, service |
| naturalness_notes | Ellipsis, contraction, filler yang disetujui |

Transcript harus cocok dengan audio final. Perbedaan yang disengaja, seperti filler atau contraction, tetap ditulis verbatim dan diberi normalized form terpisah.

### 6.3 Audio

| Field | Wajib | Aturan |
| --- | --- | --- |
| master_asset_id | Ya | File lossless sumber kebenaran |
| delivery_asset_ids | Ya | Minimal satu format web |
| duration_ms | Ya | Diukur otomatis |
| sample_rate_hz | Ya | Master baseline 48.000 Hz |
| bit_depth | Ya | Master baseline 24-bit PCM |
| channels | Ya | Mono untuk ujaran tunggal; stereo jika spatial cue relevan |
| integrated_lufs | Ya | Target internal sekitar -16 LUFS, toleransi ±2 |
| true_peak_dbtp | Ya | Maksimal -1 dBTP |
| speech_rate_band | Ya | very_clear_segmented, clear_slow, slow_natural, exam_like |
| mora_per_minute | Ya | Diukur dan disimpan; tidak menjadi label level tunggal |
| pause_profile | Ya | Median serta pause penting |
| noise_profile | Ya | none, controlled_low, contextual |
| snr_db | Kondisional | Wajib jika noise bukan none |
| checksum | Ya | Integritas asset |
| qa_result_id | Ya | Referensi technical/audio review |

Angka loudness adalah baseline delivery internal, bukan requirement JLPT. Tim audio dapat merevisinya melalui versioning setelah uji perangkat.

### 6.4 Speaker

Field minimum: speaker_id, role, voice_source, consent_or_license_ref, age_band, presentation, accent_region, register, and speech_notes. Atribut demografis hanya dicatat jika relevan untuk variasi dan tidak digunakan untuk stereotip.

voice_source: human_recorded, licensed_tts, atau generated_voice. Generated voice dilarang meniru individu nyata tanpa izin eksplisit.

### 6.5 Question

Field minimum: question_id, type, prompt_modality, prompt_id, visual_asset_id, option_ids, answer_key, rationale_id, primary_kc_id, supporting_kcs, diagnostic_confidence, misconception_tags, difficulty_band, dan scoring_policy.

## 7. Blueprint Kecepatan dan Kompleksitas

| Band | Penggunaan awal | Ciri authoring |
| --- | --- | --- |
| very_clear_segmented | S0 | Ujaran pendek, jeda instruksional, artikulasi jelas |
| clear_slow | S1–S2 | Kecepatan lambat, prosodi alami, sedikit ellipsis |
| slow_natural | S2–S4 | Percakapan lambat-alami, turn-taking wajar |
| exam_like | S5 | Timing, replay, dan instruction mengikuti simulation blueprint |

Baseline eksperimen internal untuk dialog utama:

- very_clear_segmented: sekitar 160–220 mora/menit;
- clear_slow: sekitar 200–260 mora/menit;
- slow_natural: sekitar 240–320 mora/menit;
- exam_like: ditetapkan dari approved simulation reference, bukan dinaikkan bebas.

Rentang tersebut wajib dikalibrasi melalui intelligibility dan item analytics. Kecepatan bukan satu-satunya faktor: panjang, jumlah speaker, referent, lexical coverage, noise, dan information density juga menentukan difficulty.

## 8. Replay, Transcript, dan Feedback

| Mode | Replay | Transcript sebelum jawab | Setelah jawab |
| --- | --- | --- | --- |
| Introduction | Tak terbatas | Opsional setelah first listen | Transcript, highlight, terjemahan |
| Guided practice | Maks. 3 baseline | Tidak default | Transcript dan segment replay |
| Independent practice | Maks. 2 baseline | Tidak | Transcript setelah submit |
| Checkpoint | Sesuai blueprint, default 1 | Tidak | Setelah section selesai |
| Simulation | Fixed sesuai assembly | Tidak | Setelah simulation selesai |

Replay count, pause, seek, playback rate, dan transcript reveal dicatat sebagai interaction signal. Mengubah playback rate pada scored item membuat evidence tidak setara kecuali blueprint mengizinkan.

## 9. Blueprint per Kategori

| Kategori | Stage | Durasi baseline | Speaker | Noise | Fokus |
| --- | --- | --- | ---: | --- | --- |
| Diskriminasi/pemetaan | S0 | 1–12 dtk | 1 | none | mora, kana, long vowel, sokuon |
| Quick response | S0–S5 | 2–15 dtk | 1–2 | none | response appropriateness |
| Verbal expressions | S1–S5 | 3–20 dtk | 1–2 | none/controlled_low | situasi + visual |
| Key points | S2–S5 | 15–60 dtk | 1–2 | none/controlled_low | detail yang diprioritaskan |
| Task-based | S2–S5 | 20–75 dtk | 1–2 | none/contextual | tindakan/solusi |
| Mixed/timed | S5 | Sesuai assembly | 1–2 | sesuai blueprint | integrasi |

Rentang adalah baseline authoring internal, bukan batas resmi. Stimulus yang lebih panjang memerlukan justifikasi akademik dan fatigue review.

## 10. Question Types dan Evidence

| Question type | Primary construct | Weight |
| --- | --- | ---: |
| sound_discrimination | Persepsi bunyi | 1,00 |
| audio_to_kana | Bunyi → aksara | 1,00 |
| quick_response | Respons sesuai ujaran | 1,00 |
| situational_expression | Ekspresi sesuai situasi | 0,90 |
| explicit_detail | Detail | 0,90 |
| key_point | Informasi prioritas | 0,90 |
| action_selection | Task completion | 0,90 |
| speaker_intent | Intent sederhana | 0,90 |
| sequence | Urutan tindakan | 0,90 |

Listening KC menjadi primary untuk comprehension. Vocabulary/Grammar dapat menjadi supporting jika mapping diagnostik sudah disetujui. Audio-to-kana dapat menjadikan Kana KC primary. Transcript-based answer tidak pernah menjadi evidence Listening.

## 11. Authoring dan Produksi

1. Tetapkan outcome, situation, information target, dan language ceiling.
2. Tulis script alami yang dapat dipahami tanpa visual kecuali type memang visual.
3. Tandai pronunciation, accent phrase, pause, emotion, dan intent yang diperlukan.
4. Rekam atau sintesis dengan voice yang rights-nya jelas.
5. Edit tanpa menghilangkan prosodi alami atau membuat sambungan kata janggal.
6. Ukur duration, loudness, peak, mora rate, dan checksum.
7. Sinkronkan transcript/utterance timestamps.
8. Buat pertanyaan, answer key, rationale, distractor, dan diagnostic mapping.
9. Lakukan linguistic, assessment, audio, accessibility, dan device QA.
10. Publikasikan melalui approved content pack.

Aturan script:

- konteks, relasi speaker, dan tujuan harus jelas;
- nama atau budaya tidak boleh menjadi pengetahuan kunci;
- jangan menambah noise sekadar untuk membuat soal sulit;
- filler/ellipsis diperkenalkan bertahap;
- hindari kualitas suara yang menguji pendengaran perangkat, bukan kemampuan bahasa;
- jangan menyalin audio atau soal resmi.

## 12. Distractor dan Diagnosis

Distractor classes:

- heard_similar_sound;
- wrong_number_or_time;
- wrong_person_or_place;
- nearby_detail;
- reversed_role;
- wrong_action;
- premature_answer;
- register_mismatch;
- lexical_confusion;
- missed_negation.

Distractor harus bersumber dari audio atau misconception yang sah. Opsi visual wajib lolos pemeriksaan kesetaraan detail, kontras, dan bias.

## 13. Difficulty

Faktor:

- speech rate dan pause;
- durasi;
- jumlah speaker/turn;
- lexical coverage serta grammar ceiling;
- information density;
- similarity bunyi;
- ellipsis/filler;
- noise dan SNR;
- prompt preview;
- jumlah langkah inferensi;
- replay allowance.

easy, target, dan stretch selalu relatif terhadap unit serta mode. Noise tidak boleh menjadi cara utama menaikkan difficulty. Analytics difficulty tidak mengubah label otomatis.

## 14. Validasi dan Lifecycle

~~~text
draft → academic_review → revision_required → approved → published
                                      └──────→ rejected
published → deprecated
~~~

Validasi minimum:

- script dan audio identik secara substantif;
- pengucapan, mora, angka, nama, register, prosodi, dan naturalness benar;
- speech rate serta difficulty sesuai unit dan tidak melonjak;
- no clipping, dropout, hum berlebihan, atau level antar-item ekstrem;
- answer key serta rationale dapat ditunjukkan dari audio;
- distractor tidak ambigu;
- transcript tidak bocor sebelum respons;
- speaker/asset rights dan consent lengkap;
- seluruh delivery asset lolos playback pada target browser/device;
- primary/supporting KC serta replay policy tersedia.

Pipeline gagal jika audio/transcript hilang, checksum mismatch, duration drift di luar toleransi, LUFS/peak gagal tanpa waiver, rights tidak lengkap, atau published item belum mendapat approval akademik dan audio.

## 15. Versioning

- **Major:** script, meaning, speaker intent, atau konstruk berubah.
- **Minor:** delivery format, alternate voice set, atau question set ditambah dengan equivalence terbukti.
- **Patch:** metadata/encoding correction yang tidak mengubah persepsi atau jawaban.

Re-record, perubahan prosodi yang memengaruhi intent, timing kunci, noise, answer key, atau transcript membuat object_version baru. Delivery transcode bit-identical secara linguistik boleh patch setelah QA.

## 16. Contoh Representasi

~~~yaml
id: CONTENT.N5.LISTENING.KEYPOINT.001
object_version: 0.1.0
curriculum_version: 1.0.0
content_pack_id: PACK.N5.S02.U09
title_internal: waktu_mulai_kelas
primary_category: comprehension_of_key_points
situation_tags: [classroom, time, schedule]
comprehension_types: [explicit_detail, key_point]
stage_id: S2
unit_id: U09
learning_outcome_ids: [LO.N5.LISTENING.TIME.001]
script:
  transcript_ja: "女：日本語のクラスは何時からですか。男：九時半からです。"
  normalized_transcript_ja: "女：日本語のクラスは何時からですか。男：九時半からです。"
  utterances:
    - speaker_id: SPK.F.001
      start_ms: 0
      end_ms: 3100
      text: 日本語のクラスは何時からですか。
    - speaker_id: SPK.M.001
      start_ms: 3500
      end_ms: 5100
      text: 九時半からです。
  lexical_coverage: 1.0
  unknown_supported: []
  register: polite
audio:
  master_asset_id: AUDIO.MASTER.KEYPOINT.001
  delivery_asset_ids: [AUDIO.WEB.KEYPOINT.001]
  duration_ms: 5400
  sample_rate_hz: 48000
  bit_depth: 24
  channels: 1
  integrated_lufs: -16.2
  true_peak_dbtp: -1.3
  speech_rate_band: clear_slow
  mora_per_minute: 235
  pause_profile: natural_turn_gap
  noise_profile: none
  checksum: sha256:REPLACE_DURING_BUILD
  qa_result_id: QA.AUDIO.KEYPOINT.001
speakers:
  - speaker_id: SPK.F.001
    role: learner
    voice_source: human_recorded
    consent_or_license_ref: RIGHTS.VOICE.001
  - speaker_id: SPK.M.001
    role: teacher
    voice_source: human_recorded
    consent_or_license_ref: RIGHTS.VOICE.002
scene:
  relationship: learner_teacher
  location: classroom
questions:
  - question_id: Q.KEYPOINT.001
    type: key_point
    prompt_modality: text
    prompt_id: kelas_dimulai_pukul_berapa
    option_ids: [OPT.8_30, OPT.9_00, OPT.9_30, OPT.10_00]
    answer_key: OPT.9_30
    rationale_id: speaker_kedua_mengatakan_kuji_han
    primary_kc_id: KC.N5.LISTENING.TIME.KEYPOINT
    supporting_kcs:
      - kc_id: KC.N5.VOCAB.TIME.HALF
        diagnostic_confidence: 0.75
replay_policy:
  learning_max: 2
  checkpoint_max: 1
  transcript_before_answer: false
difficulty_band: target
estimated_seconds: 30
rights:
  script_owner: Nekoru
  audio_license: proprietary_original
status: draft
~~~

Nilai timing dan audio metric pada contoh adalah ilustratif serta harus diukur ulang oleh pipeline.

## 17. Acceptance Criteria

1. Tepat 210 primary objects tersedia pada rilis penuh dengan distribusi sesuai kurikulum.
2. Setiap object mempunyai audio, transcript verbatim, objective, question, answer, dan rationale.
3. Semua format Listening N5 resmi terwakili.
4. Transcript tidak dapat ditampilkan sebelum respons pada checkpoint/simulation.
5. Replay, seek, dan playback-rate behavior dapat ditegakkan serta diaudit.
6. Required KC memiliki variasi speaker/stimulus yang cukup untuk mastery dan delayed evidence.
7. Audio QA, rights, checksum, dan compatibility lengkap.
8. Supporting KC ditentukan sebelum runtime dan memiliki diagnostic confidence.
9. Satu replay atau beberapa pertanyaan tidak menggandakan encounter stimulus.
10. Audio failure tidak diganti dengan transcript sebagai scored Listening evidence.

## 18. Metrik dan Pertanyaan Terbuka

Metrik: accuracy per type, replay rate, transcript reveal, response latency, confusion pattern, speaker variance, device failure, loudness rejection, difficulty drift, dan delayed retention.

Pertanyaan MVP:

- Rentang mora/menit mana yang paling tepat per stage bagi pengguna Indonesia?
- Berapa variasi speaker yang diperlukan agar mastery tidak bergantung pada satu voice?
- Kapan controlled_low noise membantu transfer tanpa mengubah konstruk?
- Replay policy mana yang mendukung belajar tetapi tetap menghasilkan independent evidence?

## 19. Referensi

- [JLPT — N5 Linguistic Competence](https://www.jlpt.jp/e/about/levelsummary.html)
- [JLPT — Composition of Test Sections and Items](https://www.jlpt.jp/e/guideline/testsections.html)
- [JLPT — N5 Purposes of Test Items](https://www.jlpt.jp/e/guideline/pdf/n5_e_revised.pdf)
- [JLPT — Official Sample Questions dan audio](https://www.jlpt.jp/e/samples/forlearners.html)
- [JF Standard — Overview dan Can-do](https://www.jfstandard.jpf.go.jp/summaryen/ja/render.do)
- [Irodori — Starter A1 dan audio](https://www.irodori.jpf.go.jp/en/starter/pdf.html)

Referensi diperiksa pada 13 September 2026. Audio dan soal eksternal tidak boleh disalin tanpa izin.
