import { readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import { NodeHashService } from "@nekoru/providers";
import { validateU01L1 } from "./public.js";

const root = resolve(import.meta.dirname, "../../..");
const input = JSON.parse(
  await readFile(resolve(root, "content/source/u01-l1/seed.json"), "utf8"),
) as unknown;
const report = validateU01L1(input, (value) =>
  new NodeHashService().sha256(value),
);
const validation = { generated_at: "deterministic", ...report };
const inlineBlockers = `  "blockers": [${validation.blockers.map((blocker) => JSON.stringify(blocker)).join(", ")}],`;
const serializedValidation = JSON.stringify(validation, null, 2).replace(
  /\x20{2}"blockers": \[[\s\S]*?\],\n\x20{2}"errors":/,
  inlineBlockers.length <= 80
    ? `${inlineBlockers}\n  "errors":`
    : `  "blockers": [\n    ${validation.blockers.map((blocker) => JSON.stringify(blocker)).join(",\n    ")}\n  ],\n  "errors":`,
);
await writeFile(
  resolve(root, "content/manifests/u01-l1.validation.json"),
  `${serializedValidation}\n`,
);
if (!report.valid || report.runtime_eligible) {
  process.stderr.write(`${JSON.stringify(report, null, 2)}\n`);
  process.exitCode = 1;
} else {
  process.stdout.write(
    `U01-L1 draft valid: ${String(report.counts.activities)} activities; runtime tetap ditolak; ${String(report.blockers.length)} blocker tercatat.\n`,
  );
}
