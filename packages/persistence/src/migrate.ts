import { resolve } from "node:path";
import { drizzle } from "drizzle-orm/node-postgres";
import { migrate } from "drizzle-orm/node-postgres/migrator";
import pg from "pg";

const connectionString = process.env.DATABASE_URL;
if (connectionString === undefined)
  throw new Error("DATABASE_URL wajib untuk migration");
const pool = new pg.Pool({ connectionString });
try {
  await migrate(drizzle(pool), {
    migrationsFolder: resolve(import.meta.dirname, "../migrations"),
  });
} finally {
  await pool.end();
}
