import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { drizzle } from "drizzle-orm/node-postgres";
import { migrate } from "drizzle-orm/node-postgres/migrator";
import { resolve } from "node:path";
import pg from "pg";

const connectionString = process.env.DATABASE_URL;
const describeDatabase =
  connectionString === undefined ? describe.skip : describe;

describeDatabase("integration-persistence-empty-migration-001", () => {
  const pool = new pg.Pool({ connectionString });
  beforeAll(async () => {
    await pool.query("DROP SCHEMA IF EXISTS drizzle CASCADE");
    for (const schema of [
      "audit",
      "platform",
      "learning",
      "practice",
      "content",
      "curriculum",
      "learner",
      "identity",
      "assessment",
      "offline",
    ])
      await pool.query(`DROP SCHEMA IF EXISTS ${schema} CASCADE`);
    await migrate(drizzle(pool), {
      migrationsFolder: resolve(import.meta.dirname, "../migrations"),
    });
  });
  afterAll(async () => pool.end());

  it("membuat schema ownership Phase 0 dari database kosong", async () => {
    const result = await pool.query<{ schema_name: string }>(
      "SELECT schema_name FROM information_schema.schemata WHERE schema_name = ANY($1) ORDER BY schema_name",
      [
        [
          "audit",
          "content",
          "curriculum",
          "identity",
          "learner",
          "learning",
          "platform",
          "practice",
        ],
      ],
    );
    expect(result.rows.map((row) => row.schema_name)).toEqual([
      "audit",
      "content",
      "curriculum",
      "identity",
      "learner",
      "learning",
      "platform",
      "practice",
    ]);
  });

  it("mencegah effect idempotency ganda pada scope yang sama", async () => {
    const values = [
      "idem_01J00000000000000000000000",
      "practice.submit",
      "hash-a",
      "sha256:" + "0".repeat(64),
      200,
      {},
      new Date(Date.now() + 60_000).toISOString(),
    ];
    await pool.query(
      "INSERT INTO platform.idempotency_receipts (id, scope, key_hash, request_hash, response_status, response_body, expires_at) VALUES ($1,$2,$3,$4,$5,$6,$7)",
      values,
    );
    await expect(
      pool.query(
        "INSERT INTO platform.idempotency_receipts (id, scope, key_hash, request_hash, response_status, response_body, expires_at) VALUES ($1,$2,$3,$4,$5,$6,$7)",
        ["idem_01J00000000000000000000001", ...values.slice(1)],
      ),
    ).rejects.toMatchObject({ code: "23505" });
  });

  it("menggulung balik seluruh perubahan transaksi saat constraint gagal", async () => {
    const client = await pool.connect();
    const id = "idem_01J00000000000000000000002";
    try {
      await client.query("BEGIN");
      await client.query(
        "INSERT INTO platform.idempotency_receipts (id, scope, key_hash, request_hash, response_status, response_body, expires_at) VALUES ($1,$2,$3,$4,$5,$6,$7)",
        [
          id,
          "practice.atomicity",
          "hash-b",
          "sha256:" + "2".repeat(64),
          200,
          {},
          new Date(Date.now() + 60_000).toISOString(),
        ],
      );
      await expect(
        client.query(
          "INSERT INTO platform.idempotency_receipts (id, scope, key_hash, request_hash, response_status, response_body, expires_at) VALUES ($1,$2,$3,$4,$5,$6,$7)",
          [
            "idem_01J00000000000000000000003",
            "practice.atomicity",
            "hash-b",
            "sha256:" + "3".repeat(64),
            200,
            {},
            new Date(Date.now() + 60_000).toISOString(),
          ],
        ),
      ).rejects.toMatchObject({ code: "23505" });
      await client.query("ROLLBACK");
    } finally {
      client.release();
    }

    const result = await pool.query<{ count: string }>(
      "SELECT count(*)::text AS count FROM platform.idempotency_receipts WHERE id = $1",
      [id],
    );
    expect(result.rows[0]?.count).toBe("0");
  });
});
