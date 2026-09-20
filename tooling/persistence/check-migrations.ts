import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";
import { resolve } from "node:path";

type Manifest = {
  migrations: Array<{
    id: string;
    file: string;
    sha256: string;
    applied_to_shared_environment: boolean;
  }>;
};

const root = resolve(import.meta.dirname, "../..");
const migrationRoot = resolve(root, "packages/persistence/migrations");
const manifest = JSON.parse(
  await readFile(resolve(migrationRoot, "manifest.json"), "utf8"),
) as Manifest;
const journal = JSON.parse(
  await readFile(resolve(migrationRoot, "meta/_journal.json"), "utf8"),
) as { entries: Array<{ tag: string }> };

if (manifest.migrations.length !== journal.entries.length) {
  throw new Error(
    "Migration manifest dan Drizzle journal memiliki jumlah entry berbeda.",
  );
}

for (const migration of manifest.migrations) {
  const body = await readFile(resolve(migrationRoot, migration.file));
  const checksum = createHash("sha256").update(body).digest("hex");
  if (checksum !== migration.sha256)
    throw new Error(`Checksum migration berubah: ${migration.file}`);
  if (!journal.entries.some((entry) => entry.tag === migration.id))
    throw new Error(`Migration tidak tercatat di journal: ${migration.id}`);
}

console.log(
  `Migration manifest lolos: ${manifest.migrations.length} file cocok dengan checksum dan journal.`,
);
