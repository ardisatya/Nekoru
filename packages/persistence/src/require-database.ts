const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  console.error(
    "DATABASE_URL wajib untuk test:integration agar database test tidak dilewati diam-diam.",
  );
  process.exitCode = 1;
} else if (process.env.NEKORU_TEST_DATABASE_DISPOSABLE !== "true") {
  console.error(
    "Set NEKORU_TEST_DATABASE_DISPOSABLE=true hanya untuk database ephemeral; integration test menghapus schema Phase 0 bernama khusus.",
  );
  process.exitCode = 1;
} else {
  try {
    const databaseUrl = new URL(connectionString);
    const allowedHosts = new Set(["localhost", "127.0.0.1", "::1"]);
    const databaseName = decodeURIComponent(databaseUrl.pathname.slice(1));
    if (
      !["postgres:", "postgresql:"].includes(databaseUrl.protocol) ||
      !allowedHosts.has(databaseUrl.hostname) ||
      databaseName !== "nekoru"
    ) {
      console.error(
        "Integration test hanya menerima PostgreSQL database `nekoru` pada loopback host; arahkan ke database ephemeral khusus.",
      );
      process.exitCode = 1;
    }
  } catch {
    console.error("DATABASE_URL bukan PostgreSQL URL yang valid.");
    process.exitCode = 1;
  }
}
