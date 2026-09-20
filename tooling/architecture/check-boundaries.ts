import { readdir, readFile } from "node:fs/promises";
import { extname, relative, resolve } from "node:path";

const root = resolve(import.meta.dirname, "../..");
const violations: string[] = [];

async function sourceFiles(directory: string): Promise<string[]> {
  const entries = await readdir(directory, { withFileTypes: true });
  const nested = await Promise.all(
    entries.map(async (entry) => {
      const path = resolve(directory, entry.name);
      if (entry.isDirectory()) return sourceFiles(path);
      return [path];
    }),
  );
  return nested
    .flat()
    .filter((path) => [".ts", ".tsx", ".js", ".mjs"].includes(extname(path)));
}

async function rejectPatterns(
  directory: string,
  rules: Array<[RegExp, string]>,
) {
  for (const path of await sourceFiles(resolve(root, directory))) {
    const source = await readFile(path, "utf8");
    for (const [pattern, message] of rules) {
      if (pattern.test(source))
        violations.push(`${relative(root, path)}: ${message}`);
    }
  }
}

await rejectPatterns("packages/domain/src", [
  [
    /from\s+["'](?:@nestjs|next|react|drizzle-orm|@clerk|@upstash|node:)/,
    "domain harus framework-free dan provider-free",
  ],
  [
    /@nekoru\/(?:application|contracts|persistence|providers|ui)/,
    "dependency domain tidak boleh mengarah ke layer luar",
  ],
]);

await rejectPatterns("apps/learner-web", [
  [
    /@nekoru\/(?:persistence|providers|content-tooling)/,
    "learner bundle tidak boleh mengimpor adapter internal",
  ],
  [
    /\b(?:answer_key|hidden_rubric|raw_answer)\b/i,
    "learner bundle tidak boleh memuat field rahasia akademik",
  ],
]);

if (violations.length > 0) {
  console.error(
    "Architecture boundary gagal:\n" +
      violations.map((item) => `- ${item}`).join("\n"),
  );
  process.exitCode = 1;
} else {
  console.log(
    "Architecture boundary lolos: domain tetap murni dan learner bundle tidak memuat adapter/field terlarang.",
  );
}
