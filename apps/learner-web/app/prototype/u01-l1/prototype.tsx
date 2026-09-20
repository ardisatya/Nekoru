"use client";

import { useEffect, useRef, useState } from "react";
import { Button, StatusMessage } from "@nekoru/ui";
import styles from "./prototype.module.css";

type Variant = { value: string; label: string };
type PrototypeState = {
  id: string;
  source: string;
  title: string;
  purpose: string;
  variants: Variant[];
};

const states: PrototypeState[] = [
  {
    id: "P-M1-01",
    source: "LS-AU-01",
    title: "Mulai belajar dari nol",
    purpose: "Kenali nilai dan batas Nekoru sebelum membuat akun.",
    variants: [
      { value: "new", label: "Pengunjung baru" },
      { value: "returning", label: "Kembali lagi" },
    ],
  },
  {
    id: "P-M1-02",
    source: "LS-ON-01",
    title: "Apa tujuan belajarmu?",
    purpose: "Tujuan disimpan sebagai draft di perangkat ini.",
    variants: [
      { value: "empty", label: "Belum diisi" },
      { value: "valid", label: "Sudah diisi" },
      { value: "error", label: "Perlu diperbaiki" },
    ],
  },
  {
    id: "P-M1-03",
    source: "LS-ON-02",
    title: "Atur waktu yang nyaman",
    purpose: "Pilih jadwal realistis dan pahami timezone yang dipakai.",
    variants: [
      { value: "empty", label: "Belum diatur" },
      { value: "set", label: "Jadwal terisi" },
      { value: "timezone", label: "Penjelasan zona waktu" },
    ],
  },
  {
    id: "P-M1-04",
    source: "LS-ON-04",
    title: "Pilih titik mulai",
    purpose: "Pemula absolut dapat langsung mulai dari fondasi U01.",
    variants: [{ value: "absolute", label: "Mulai dari dasar" }],
  },
  {
    id: "P-M1-05",
    source: "LS-AU-02",
    title: "Simpan rencanamu",
    purpose: "Masuk dengan Google atau email tanpa kehilangan draft.",
    variants: [
      { value: "draft", label: "Draft tersedia" },
      { value: "unavailable", label: "Penyedia tidak tersedia" },
    ],
  },
  {
    id: "P-M1-06",
    source: "LS-AU-03/04",
    title: "Masuk lewat email",
    purpose: "Tautan email hanya berlaku pada browser yang sama.",
    variants: [
      { value: "send", label: "Kirim tautan" },
      { value: "cooldown", label: "Sudah dikirim" },
      { value: "expired", label: "Tautan kedaluwarsa" },
      { value: "wrong_browser", label: "Browser berbeda" },
    ],
  },
  {
    id: "P-M1-07",
    source: "LS-AU-05",
    title: "Draft sedang disambungkan",
    purpose:
      "Hasil login dan pemindahan draft dijelaskan tanpa menyembunyikan konflik.",
    variants: [
      { value: "success", label: "Berhasil" },
      { value: "migration", label: "Sedang dipindahkan" },
      { value: "conflict", label: "Ada konflik" },
      { value: "cancel", label: "Login dibatalkan" },
      { value: "failure", label: "Login gagal" },
    ],
  },
  {
    id: "P-M1-08",
    source: "LS-ON-05",
    title: "Ini rencana awalmu",
    purpose: "Lihat titik mulai, durasi, alasan, dan batas perkiraan.",
    variants: [
      { value: "on_track", label: "Rencana tersedia" },
      { value: "unavailable", label: "Rencana belum tersedia" },
    ],
  },
  {
    id: "P-M1-09",
    source: "LS-ON-06",
    title: "Siap untuk sesi pertama",
    purpose: "Mulai sekarang atau kembali dengan aman nanti.",
    variants: [
      { value: "ready", label: "Siap mulai" },
      { value: "safe_return", label: "Kembali nanti" },
    ],
  },
  {
    id: "P-M1-10",
    source: "LS-HO-01",
    title: "Beranda belajar",
    purpose: "Satu tindakan utama menyesuaikan kondisi belajarmu.",
    variants: [
      { value: "first", label: "Sesi pertama" },
      { value: "active", label: "Ada sesi aktif" },
      { value: "review", label: "Ada review" },
    ],
  },
  {
    id: "P-M1-11",
    source: "LS-RT-01",
    title: "Kenali suara Jepang pertama",
    purpose: "Pahami tujuan, durasi, dan penggunaan audio sebelum mulai.",
    variants: [
      { value: "purpose", label: "Pengantar sesi" },
      { value: "audio_failure", label: "Audio bermasalah" },
    ],
  },
  {
    id: "P-M1-12",
    source: "LS-RT-02",
    title: "Dengarkan satu vokal",
    purpose: "Pilihan dapat diubah sampai tombol kirim ditekan.",
    variants: [
      { value: "ready", label: "Siap memilih" },
      { value: "selected", label: "Pilihan terisi" },
      { value: "validation", label: "Belum memilih" },
      { value: "evaluating", label: "Sedang diperiksa" },
    ],
  },
  {
    id: "P-M1-13",
    source: "LS-RT-02",
    title: "Pasangkan bunyi dan bentuk",
    purpose: "Pilih pasangan tanpa harus drag-and-drop.",
    variants: [
      { value: "source", label: "Sumber aktif" },
      { value: "formed", label: "Pasangan terbentuk" },
      { value: "removed", label: "Pasangan dilepas" },
      { value: "complete", label: "Semua terpasang" },
    ],
  },
  {
    id: "P-M1-14",
    source: "LS-RT-03",
    title: "Gunakan bantuan seperlunya",
    purpose: "Hint dan replay dijelaskan tanpa menyalahkan learner.",
    variants: [
      { value: "light", label: "Petunjuk ringan" },
      { value: "strong", label: "Petunjuk kuat" },
      { value: "replay", label: "Putar ulang" },
    ],
  },
  {
    id: "P-M1-15",
    source: "LS-RT-04",
    title: "Pahami hasil percobaan",
    purpose: "Feedback memisahkan hasil belajar dari kegagalan teknis.",
    variants: [
      { value: "correct", label: "Tepat" },
      { value: "incorrect", label: "Belum tepat" },
      { value: "technical", label: "Gangguan teknis" },
    ],
  },
  {
    id: "P-M1-16",
    source: "LS-RT-05/07",
    title: "Jeda dan lanjutkan dengan aman",
    purpose: "Posisi tersimpan, dapat dipulihkan, dan konflik versi terlihat.",
    variants: [
      { value: "saved", label: "Sudah tersimpan" },
      { value: "restore", label: "Pulihkan sesi" },
      { value: "conflict", label: "Versi berubah" },
    ],
  },
  {
    id: "P-M1-17",
    source: "LS-RT-08",
    title: "Laporkan masalah",
    purpose: "Laporan teknis tidak mengirim jawaban atau data sensitif.",
    variants: [
      { value: "draft", label: "Tulis laporan" },
      { value: "submitted", label: "Sedang dikirim" },
      { value: "success", label: "Berhasil" },
      { value: "failure", label: "Gagal" },
    ],
  },
  {
    id: "P-M1-18",
    source: "LS-RT-09",
    title: "Sesi pertama selesai",
    purpose: "Completion, mastery, dan review ditampilkan sebagai hal berbeda.",
    variants: [
      { value: "complete", label: "Selesai" },
      { value: "unchanged", label: "Mastery belum berubah" },
      { value: "provisional", label: "Masih sementara" },
      { value: "review_due", label: "Review dijadwalkan" },
    ],
  },
  {
    id: "P-M1-19",
    source: "LS-PR-01",
    title: "Lihat progres secara jujur",
    purpose: "Seed kecil tidak dianggap sebagai Unit U01 lengkap.",
    variants: [
      { value: "seed", label: "Cakupan seed" },
      { value: "next", label: "Langkah berikutnya" },
    ],
  },
  {
    id: "P-M1-20",
    source: "SYSTEM",
    title: "Saat layanan tidak tersedia",
    purpose: "System state memberi alasan aman dan jalan pemulihan.",
    variants: [
      { value: "expired", label: "Sesi kedaluwarsa" },
      { value: "maintenance", label: "Pemeliharaan" },
      { value: "denied", label: "Akses ditolak" },
      { value: "not_found", label: "Tidak ditemukan" },
    ],
  },
];

function VariantPicker({
  state,
  value,
  onChange,
}: {
  state: PrototypeState;
  value: string;
  onChange: (value: string) => void;
}) {
  if (state.variants.length < 2) return null;
  return (
    <fieldset className={styles.variantPicker}>
      <legend>Coba keadaan lain</legend>
      <div>
        {state.variants.map((variant) => (
          <button
            type="button"
            key={variant.value}
            aria-pressed={value === variant.value}
            onClick={() => onChange(variant.value)}
          >
            {variant.label}
          </button>
        ))}
      </div>
    </fieldset>
  );
}

function StateBody({
  state,
  onAdvance,
  onGoTo,
}: {
  state: PrototypeState;
  onAdvance: () => void;
  onGoTo: (index: number) => void;
}) {
  const [branch, setBranch] = useState(state.variants[0]!.value);
  const [choice, setChoice] = useState("");
  const [schedule, setSchedule] = useState("");
  const [audio, setAudio] = useState<"idle" | "playing" | "paused">("idle");
  const [report, setReport] = useState("");
  const variants = (
    <VariantPicker state={state} value={branch} onChange={setBranch} />
  );

  if (state.id === "P-M1-01")
    return (
      <div className={styles.copy}>
        {variants}
        <p>
          {branch === "returning"
            ? "Draft sebelumnya masih ada di perangkat ini."
            : "Belajar terpandu untuk pemula Indonesia, dimulai dari bunyi paling dasar."}
        </p>
        <Button onClick={onAdvance}>
          {branch === "returning" ? "Lanjutkan draft" : "Atur tujuan belajar"}
        </Button>
      </div>
    );
  if (state.id === "P-M1-02")
    return (
      <form
        className={styles.form}
        onSubmit={(event) => {
          event.preventDefault();
          if (!choice) setBranch("error");
          else onAdvance();
        }}
      >
        {variants}
        <label htmlFor="goal">Tujuan utama</label>
        <select
          id="goal"
          value={choice}
          aria-invalid={branch === "error"}
          aria-describedby={branch === "error" ? "goal-error" : "goal-help"}
          onChange={(event) => {
            setChoice(event.target.value);
            setBranch("valid");
          }}
        >
          <option value="">Pilih satu</option>
          <option value="n5">Persiapan JLPT N5</option>
          <option value="daily">Memahami percakapan dasar</option>
        </select>
        {branch === "error" ? (
          <p id="goal-error" className={styles.error}>
            Pilih satu tujuan agar kami dapat membuat rencana awal.
          </p>
        ) : (
          <p id="goal-help" className={styles.help}>
            Belum perlu akun. Pilihan ini dapat diubah nanti.
          </p>
        )}
        <Button type="submit">Simpan tujuan</Button>
      </form>
    );
  if (state.id === "P-M1-03")
    return (
      <form
        className={styles.form}
        onSubmit={(event) => {
          event.preventDefault();
          if (!schedule) setBranch("empty");
          else onAdvance();
        }}
      >
        {variants}
        <label htmlFor="schedule">Durasi satu sesi</label>
        <select
          id="schedule"
          value={schedule}
          onChange={(event) => {
            setSchedule(event.target.value);
            setBranch("set");
          }}
        >
          <option value="">Pilih durasi</option>
          <option value="10">10 menit</option>
          <option value="20">20 menit</option>
        </select>
        <p className={styles.help}>
          {branch === "timezone"
            ? "Jadwal mengikuti Asia/Jakarta dan dapat diubah di pengaturan."
            : branch === "set"
              ? "Durasi ini akan dipakai untuk rencana awal."
              : "Pilih durasi yang terasa realistis."}
        </p>
        <Button type="submit">Simpan waktu belajar</Button>
      </form>
    );
  if (state.id === "P-M1-04")
    return (
      <div className={styles.copy}>
        <StatusMessage tone="info" title="Mulai dari fondasi U01">
          Tidak ada placement adaptif pada prototipe ini. Pilihan ini belum
          menghasilkan mastery.
        </StatusMessage>
        <Button onClick={onAdvance}>Pilih mulai dari dasar</Button>
      </div>
    );
  if (state.id === "P-M1-05")
    return (
      <div className={styles.copy}>
        {variants}
        {branch === "unavailable" ? (
          <StatusMessage
            tone="warning"
            title="Cara masuk sedang tidak tersedia"
          >
            Draft tetap ada di perangkat ini. Coba lagi nanti tanpa mengisi
            ulang.
          </StatusMessage>
        ) : (
          <p>Tujuan dan jadwalmu masih berupa draft lokal.</p>
        )}
        <div className={styles.actionRow}>
          {branch === "unavailable" ? (
            <Button onClick={() => setBranch("draft")}>Coba lagi</Button>
          ) : (
            <>
              <Button onClick={() => onGoTo(6)}>Lanjutkan dengan Google</Button>
              <Button variant="secondary" onClick={() => onGoTo(5)}>
                Gunakan email
              </Button>
            </>
          )}
        </div>
      </div>
    );
  if (state.id === "P-M1-06")
    return (
      <form
        className={styles.form}
        onSubmit={(event) => {
          event.preventDefault();
          setBranch("cooldown");
        }}
      >
        {variants}
        <label htmlFor="email">Email untuk tautan masuk</label>
        <input id="email" type="email" required placeholder="nama@contoh.id" />
        {branch === "expired" || branch === "wrong_browser" ? (
          <StatusMessage
            tone="warning"
            title={
              branch === "expired"
                ? "Tautan sudah kedaluwarsa"
                : "Buka pada browser yang sama"
            }
          >
            Minta tautan baru dari perangkat ini. Draft belum hilang.
          </StatusMessage>
        ) : (
          <p className={styles.help}>
            {branch === "cooldown"
              ? "Tautan simulasi sudah dikirim. Tunggu sebelum meminta lagi."
              : "Prototipe tidak mengirim email nyata."}
          </p>
        )}
        <Button type="submit">
          {branch === "cooldown"
            ? "Kirim ulang setelah jeda"
            : "Kirim tautan masuk"}
        </Button>
        {branch === "cooldown" && (
          <Button type="button" variant="secondary" onClick={() => onGoTo(6)}>
            Simulasikan tautan dibuka
          </Button>
        )}
      </form>
    );
  if (state.id === "P-M1-07") {
    const copy: Record<
      string,
      ["info" | "success" | "warning", string, string]
    > = {
      success: [
        "success",
        "Berhasil masuk",
        "Draft terhubung ke akun sintetis.",
      ],
      migration: [
        "info",
        "Draft sedang dipindahkan",
        "Tunggu receipt sebelum draft lokal dibersihkan.",
      ],
      conflict: [
        "warning",
        "Ada dua versi draft",
        "Pilih versi terbaru setelah membandingkan waktu perubahan.",
      ],
      cancel: [
        "info",
        "Login dibatalkan",
        "Draft tetap aman di perangkat ini.",
      ],
      failure: [
        "warning",
        "Login belum berhasil",
        "Tidak ada pilihan belajar yang hilang.",
      ],
    };
    const item = copy[branch]!;
    return (
      <div className={styles.copy}>
        {variants}
        <StatusMessage tone={item[0]} title={item[1]}>
          {item[2]}
        </StatusMessage>
        <Button
          onClick={
            branch === "success" ? onAdvance : () => setBranch("success")
          }
        >
          {branch === "success" ? "Lihat rencana awal" : "Pulihkan dan lanjut"}
        </Button>
      </div>
    );
  }
  if (state.id === "P-M1-08")
    return (
      <div className={styles.plan}>
        {variants}
        {branch === "unavailable" ? (
          <StatusMessage tone="warning" title="Rencana belum dapat dibuat">
            Tidak ada content atau policy pengganti yang dipilih diam-diam.
          </StatusMessage>
        ) : (
          <>
            <dl>
              <div>
                <dt>Mulai dari</dt>
                <dd>U01 · Suara Jepang</dd>
              </div>
              <div>
                <dt>Durasi</dt>
                <dd>20 menit</dd>
              </div>
              <div>
                <dt>Alasan</dt>
                <dd>Mulai dari dasar</dd>
              </div>
            </dl>
            <StatusMessage tone="info" title="Ini masih perkiraan">
              Rencana dapat berubah setelah ada evidence valid.
            </StatusMessage>
          </>
        )}
        <Button
          onClick={
            branch === "unavailable" ? () => setBranch("on_track") : onAdvance
          }
        >
          {branch === "unavailable"
            ? "Coba buat rencana lagi"
            : "Terima rencana awal"}
        </Button>
      </div>
    );
  if (state.id === "P-M1-09")
    return (
      <div className={styles.copy}>
        {variants}
        <p>
          {branch === "safe_return"
            ? "Rencana tersimpan pada akun sintetis dan dapat dibuka lagi."
            : "Sesi pertama berdurasi sekitar 20 menit. Audio tidak diputar otomatis."}
        </p>
        <Button onClick={onAdvance}>
          {branch === "safe_return" ? "Kembali ke Beranda" : "Buka Beranda"}
        </Button>
      </div>
    );
  if (state.id === "P-M1-10") {
    const home: Record<string, [string, string]> = {
      first: ["Sesi pertamamu siap", "Mulai sesi pertama"],
      active: ["Ada sesi yang belum selesai", "Lanjutkan sesi"],
      review: ["Satu review sudah waktunya", "Mulai review"],
    };
    return (
      <div className={styles.copy}>
        {variants}
        <h2>{home[branch]![0]}</h2>
        <p>
          Beranda menampilkan satu tindakan yang paling relevan. Navigasi
          produksi belum diaktifkan.
        </p>
        <Button onClick={onAdvance}>{home[branch]![1]}</Button>
      </div>
    );
  }
  if (state.id === "P-M1-11")
    return (
      <div className={styles.plan}>
        {variants}
        {branch === "audio_failure" ? (
          <StatusMessage tone="warning" title="Audio belum dapat dimuat">
            Ini gangguan teknis. Tidak ada attempt atau nilai yang dibuat.
          </StatusMessage>
        ) : (
          <dl>
            <div>
              <dt>Tujuan</dt>
              <dd>Bedakan lima vokal</dd>
            </div>
            <div>
              <dt>Durasi</dt>
              <dd>20 menit</dd>
            </div>
            <div>
              <dt>Audio</dt>
              <dd>Diputar manual</dd>
            </div>
          </dl>
        )}
        <Button
          onClick={
            branch === "audio_failure" ? () => setBranch("purpose") : onAdvance
          }
        >
          {branch === "audio_failure" ? "Coba muat lagi" : "Mulai aktivitas"}
        </Button>
      </div>
    );
  if (state.id === "P-M1-12")
    return (
      <form
        className={styles.choice}
        onSubmit={(event) => {
          event.preventDefault();
          if (!choice) setBranch("validation");
          else if (branch !== "evaluating") setBranch("evaluating");
          else onAdvance();
        }}
      >
        {variants}
        <div className={styles.audio}>
          <div className={styles.soundMark} aria-hidden="true">
            <span />
            <span />
            <span />
            <span />
          </div>
          <Button
            type="button"
            variant="secondary"
            onClick={() => setAudio(audio === "playing" ? "paused" : "playing")}
          >
            {audio === "playing" ? "Jeda audio" : "Putar audio"}
          </Button>
          <p role="status">
            {audio === "playing"
              ? "Audio sedang diputar"
              : audio === "paused"
                ? "Audio dijeda"
                : "Audio belum diputar"}
          </p>
        </div>
        <fieldset>
          <legend>Bunyi mana yang kamu dengar?</legend>
          {["a", "i", "u", "e"].map((value) => (
            <label key={value} className={styles.option}>
              <input
                aria-label={value}
                type="radio"
                name="vowel"
                value={value}
                checked={choice === value}
                onChange={() => {
                  setChoice(value);
                  setBranch("selected");
                }}
              />
              <span lang="ja">{value}</span>
            </label>
          ))}
        </fieldset>
        {branch === "validation" && (
          <p className={styles.error}>Pilih satu jawaban sebelum mengirim.</p>
        )}
        {branch === "evaluating" && (
          <StatusMessage tone="info" title="Jawaban sedang diperiksa">
            Tombol dikunci agar klik ganda tidak membuat submission kedua.
          </StatusMessage>
        )}
        <Button type="submit">
          {branch === "evaluating" ? "Lanjut ke matching" : "Kirim jawaban"}
        </Button>
      </form>
    );
  if (state.id === "P-M1-13")
    return (
      <div className={styles.matching}>
        {variants}
        <p role="status">
          {branch === "source"
            ? "Bunyi a dipilih. Pilih bentuk pasangannya."
            : branch === "formed"
              ? "Satu pasangan terbentuk: a dan あ."
              : branch === "removed"
                ? "Pasangan dilepas. Kamu dapat mencoba lagi."
                : "Dua dari dua pasangan sudah terbentuk."}
        </p>
        <div className={styles.matchColumns}>
          <fieldset>
            <legend>Bunyi</legend>
            <Button variant="secondary" onClick={() => setBranch("source")}>
              a
            </Button>
            <Button variant="secondary" onClick={() => setBranch("source")}>
              i
            </Button>
          </fieldset>
          <fieldset>
            <legend>Bentuk</legend>
            <Button variant="secondary" onClick={() => setBranch("formed")}>
              <span lang="ja">あ</span>
            </Button>
            <Button variant="secondary" onClick={() => setBranch("complete")}>
              <span lang="ja">い</span>
            </Button>
          </fieldset>
        </div>
        {branch === "formed" && (
          <Button variant="quiet" onClick={() => setBranch("removed")}>
            Lepas pasangan
          </Button>
        )}
        <Button
          onClick={
            branch === "complete" ? onAdvance : () => setBranch("complete")
          }
        >
          {branch === "complete" ? "Kirim pasangan" : "Lengkapi pasangan"}
        </Button>
      </div>
    );
  if (state.id === "P-M1-14")
    return (
      <div className={styles.copy}>
        {variants}
        <StatusMessage
          tone="info"
          title={
            branch === "light"
              ? "Petunjuk ringan"
              : branch === "strong"
                ? "Petunjuk lebih jelas"
                : "Audio diputar ulang"
          }
        >
          {branch === "light"
            ? "Perhatikan posisi mulut yang tetap terbuka."
            : branch === "strong"
              ? "Bandingkan bunyi a dengan i secara bergantian."
              : "Replay dicatat agar evidence dapat dijelaskan; ini bukan hukuman."}
        </StatusMessage>
        <Button onClick={onAdvance}>Coba lagi dengan bantuan ini</Button>
      </div>
    );
  if (state.id === "P-M1-15") {
    const feedback: Record<string, ["success" | "warning", string, string]> = {
      correct: [
        "success",
        "Pilihanmu tepat",
        "Lanjutkan tanpa klaim bahwa seluruh materi sudah dikuasai.",
      ],
      incorrect: [
        "warning",
        "Belum pas—coba bedakan lagi",
        "Dengarkan kontras bunyi dengan jeda. Ini bukan penilaian terhadap dirimu.",
      ],
      technical: [
        "warning",
        "Hasil belum dapat diperiksa",
        "Gangguan teknis tidak menghasilkan score atau evidence negatif.",
      ],
    };
    const item = feedback[branch]!;
    return (
      <div className={styles.copy}>
        {variants}
        <StatusMessage tone={item[0]} title={item[1]}>
          {item[2]}
        </StatusMessage>
        <Button
          onClick={
            branch === "technical" ? () => setBranch("correct") : onAdvance
          }
        >
          {branch === "technical" ? "Coba periksa lagi" : "Lanjutkan sesi"}
        </Button>
      </div>
    );
  }
  if (state.id === "P-M1-16") {
    const recovery: Record<string, [string, string]> = {
      saved: [
        "Posisi sudah tersimpan",
        "Keluar tidak menghapus pilihan yang sudah sah.",
      ],
      restore: [
        "Sesi berhasil dipulihkan",
        "Kamu kembali ke aktivitas terakhir dengan state valid.",
      ],
      conflict: [
        "Versi sesi berubah",
        "Sesi lama tidak ditimpa. Muat state terbaru sebelum melanjutkan.",
      ],
    };
    return (
      <div className={styles.copy}>
        {variants}
        <StatusMessage
          tone={branch === "conflict" ? "warning" : "success"}
          title={recovery[branch]![0]}
        >
          {recovery[branch]![1]}
        </StatusMessage>
        <Button
          onClick={
            branch === "conflict" ? () => setBranch("restore") : onAdvance
          }
        >
          {branch === "conflict"
            ? "Muat versi terbaru"
            : "Lanjutkan dari posisi ini"}
        </Button>
      </div>
    );
  }
  if (state.id === "P-M1-17")
    return (
      <form
        className={styles.form}
        onSubmit={(event) => {
          event.preventDefault();
          setBranch("submitted");
        }}
      >
        {variants}
        <label htmlFor="report">Apa yang bermasalah?</label>
        <textarea
          id="report"
          value={report}
          onChange={(event) => setReport(event.target.value)}
          maxLength={240}
          placeholder="Contoh: audio tidak terdengar"
        />
        <p className={styles.help}>
          Jangan tulis email, token, atau jawaban. Laporan prototipe tidak
          dikirim ke server.
        </p>
        {branch !== "draft" && (
          <StatusMessage
            tone={
              branch === "failure"
                ? "warning"
                : branch === "success"
                  ? "success"
                  : "info"
            }
            title={
              branch === "failure"
                ? "Laporan belum terkirim"
                : branch === "success"
                  ? "Laporan berhasil dicatat"
                  : "Laporan sedang dikirim"
            }
          >
            {branch === "failure"
              ? "Simpan draft dan coba lagi."
              : branch === "success"
                ? "Terima kasih. Jawaban belajar tidak ikut dikirim."
                : "Tunggu konfirmasi sebelum menutup halaman."}
          </StatusMessage>
        )}
        <Button type="submit" disabled={!report.trim()}>
          Kirim laporan
        </Button>
        {branch === "submitted" && (
          <Button
            type="button"
            variant="secondary"
            onClick={() => setBranch("success")}
          >
            Simulasikan berhasil
          </Button>
        )}
        {branch === "success" && (
          <Button type="button" onClick={onAdvance}>
            Kembali ke sesi
          </Button>
        )}
      </form>
    );
  if (state.id === "P-M1-18")
    return (
      <div className={styles.summary}>
        {variants}
        <dl>
          <div>
            <dt>Completion</dt>
            <dd>Sesi selesai</dd>
          </div>
          <div>
            <dt>Mastery</dt>
            <dd>
              {branch === "provisional" ? "Masih sementara" : "Belum berubah"}
            </dd>
          </div>
          <div>
            <dt>Review</dt>
            <dd>
              {branch === "review_due" ? "Besok" : "Menunggu evidence valid"}
            </dd>
          </div>
        </dl>
        <p>
          Completion hanya berarti alur sesi selesai. Prototipe tidak membuat
          evidence belajar nyata.
        </p>
        <Button onClick={onAdvance}>Lihat progres ringkas</Button>
      </div>
    );
  if (state.id === "P-M1-19")
    return (
      <div className={styles.copy}>
        {variants}
        <StatusMessage tone="info" title="Cakupan masih kecil">
          Seed ini hanya U01-L1 dan bukan Unit U01 lengkap. Tidak ada kesiapan
          JLPT yang dapat disimpulkan.
        </StatusMessage>
        <Button onClick={onAdvance}>
          {branch === "next"
            ? "Periksa keadaan layanan"
            : "Lihat langkah yang masih menunggu"}
        </Button>
      </div>
    );
  const systemCopy: Record<string, [string, string, string]> = {
    expired: [
      "Sesi sudah kedaluwarsa",
      "Buka rencana terbaru; state lama tidak ditimpa.",
      "Kembali ke Beranda",
    ],
    maintenance: [
      "Nekoru sedang dirawat",
      "Coba lagi nanti. Tidak ada progres yang berkurang.",
      "Coba lagi",
    ],
    denied: [
      "Akses tidak diizinkan",
      "Masuk dengan akun yang berhak tanpa mengungkap resource lain.",
      "Kembali dengan aman",
    ],
    not_found: [
      "Halaman tidak ditemukan",
      "Periksa tautan atau kembali ke Beranda.",
      "Kembali ke Beranda",
    ],
  };
  const item = systemCopy[branch]!;
  return (
    <div className={styles.copy}>
      {variants}
      <StatusMessage tone="warning" title={item[0]}>
        {item[1]}
      </StatusMessage>
      <Button onClick={() => onGoTo(9)}>{item[2]}</Button>
    </div>
  );
}

export function Prototype() {
  const [index, setIndex] = useState(0);
  const heading = useRef<HTMLHeadingElement>(null);
  const state = states[index]!;
  const goTo = (next: number) =>
    setIndex(Math.max(0, Math.min(states.length - 1, next)));
  useEffect(() => {
    heading.current?.focus();
  }, [index]);
  return (
    <main className={styles.shell}>
      <header className={styles.topbar}>
        <a className={styles.brand} href="/" aria-label="Nekoru Phase 0">
          <span aria-hidden="true" className={styles.brandMark} />
          Nekoru
        </a>
        <span className={styles.prototypeLabel}>
          Prototipe internal · data sintetis
        </span>
      </header>
      <div className={styles.progressRow}>
        <span>Sesi U01-L1</span>
        <progress
          aria-label={`Kemajuan sesi U01-L1: langkah ${index + 1} dari ${states.length}`}
          value={index + 1}
          max={states.length}
        >
          {index + 1} dari {states.length}
        </progress>
        <span>
          {index + 1}/{states.length}
        </span>
      </div>
      <div className={styles.workspace}>
        <aside className={styles.context} aria-label="Konteks prototipe">
          <h2>Kenali suara Jepang pertama</h2>
          <p className={styles.contextNote}>
            Online-only · tanpa autoplay · tidak menghasilkan mastery
          </p>
          <details>
            <summary>Lihat 20 langkah</summary>
            <ol>
              {states.map((item, itemIndex) => (
                <li key={item.id}>
                  <button
                    aria-current={itemIndex === index ? "step" : undefined}
                    onClick={() => goTo(itemIndex)}
                  >
                    {itemIndex + 1}. {item.title}
                  </button>
                </li>
              ))}
            </ol>
          </details>
        </aside>
        <article className={styles.canvas}>
          <div className={styles.canvasHeading}>
            <h1 ref={heading} tabIndex={-1}>
              {state.title}
            </h1>
            <p>{state.purpose}</p>
            <small className={styles.qaMeta}>
              Referensi QA: {state.id} · {state.source}
            </small>
          </div>
          <StateBody
            key={state.id}
            state={state}
            onAdvance={() => goTo(index + 1)}
            onGoTo={goTo}
          />
          <nav
            className={styles.navigation}
            aria-label="Navigasi peninjau prototipe"
          >
            <Button
              variant="quiet"
              onClick={() => goTo(index - 1)}
              disabled={index === 0}
            >
              Langkah sebelumnya
            </Button>
            <span>Gunakan tindakan utama pada layar untuk maju.</span>
          </nav>
        </article>
      </div>
    </main>
  );
}
