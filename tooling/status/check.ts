import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import { spawn } from "node:child_process";

const root = resolve(import.meta.dirname, "../..");
const targets = [
  "docs/implementation/phase-0-status.md",
  "docs/implementation/phase-0-status.html",
];
const before = await Promise.all(
  targets.map((path) => readFile(resolve(root, path), "utf8").catch(() => "")),
);

await new Promise<void>((resolveRun, reject) => {
  const child = spawn(
    process.execPath,
    ["--import", "tsx", resolve(root, "tooling/status/generate.ts")],
    { cwd: root, stdio: "inherit" },
  );
  child.once("error", reject);
  child.once("exit", (code) =>
    code === 0
      ? resolveRun()
      : reject(new Error(`status generator exited with ${String(code)}`)),
  );
});

const after = await Promise.all(
  targets.map((path) => readFile(resolve(root, path), "utf8")),
);
if (before.some((value, index) => value !== after[index])) {
  throw new Error(
    "Milestone report drift terdeteksi. Jalankan pnpm status:generate dan commit hasilnya.",
  );
}
