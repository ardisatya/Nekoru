import { isDeepStrictEqual } from "node:util";
import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import { createContractArtifacts } from "../../packages/contracts/src/public.js";

const root = resolve(import.meta.dirname, "../..");
const generatedDirectory = resolve(root, "packages/contracts/generated");
const drifted: string[] = [];

for (const [name, expected] of Object.entries(createContractArtifacts())) {
  const actual = JSON.parse(
    await readFile(resolve(generatedDirectory, name), "utf8"),
  ) as unknown;
  if (!isDeepStrictEqual(actual, expected)) drifted.push(name);
}

if (drifted.length > 0) {
  console.error(
    `Generated contract tidak sinkron: ${drifted.join(", ")}. Jalankan pnpm --filter @nekoru/contracts build lalu review artifact.`,
  );
  process.exitCode = 1;
} else {
  console.log(
    "Generated contract sinkron: OpenAPI, JSON Schema, dan event catalog cocok dengan source.",
  );
}
