import Link from "next/link";

export default function Page() {
  return (
    <main style={{ maxWidth: "68ch", margin: "4rem auto", padding: "1rem" }}>
      <h1>Nekoru Phase 0</h1>
      <p>
        Fondasi sedang disiapkan untuk pengujian internal. Ini belum merupakan
        aplikasi learner yang siap dipakai.
      </p>
      <Link href="/prototype/u01-l1">Buka prototype internal U01-L1</Link>
    </main>
  );
}
