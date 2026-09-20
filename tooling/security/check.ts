import { readdir, readFile } from "node:fs/promises";
import { extname, relative, resolve } from "node:path";

type Finding = {
  control: string;
  path: string;
  detail: string;
};

const root = resolve(import.meta.dirname, "../..");
const ignoredDirectories = new Set([
  ".git",
  ".next",
  ".pnpm-store",
  ".turbo",
  "artifacts",
  "coverage",
  "dist",
  "node_modules",
  "playwright-report",
  "test-results",
]);
const inspectedExtensions = new Set([
  ".cjs",
  ".cts",
  ".js",
  ".json",
  ".jsx",
  ".mjs",
  ".mts",
  ".ts",
  ".tsx",
  ".yaml",
  ".yml",
]);
const credentialPatterns: Array<[string, RegExp]> = [
  [
    "SEC-SECRET-PRIVATE-KEY",
    /-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----/,
  ],
  ["SEC-SECRET-CLERK", /\bsk_(?:live|test)_[A-Za-z0-9]{20,}\b/],
  ["SEC-SECRET-OPENAI", /\bsk-(?:proj-)?[A-Za-z0-9_-]{20,}\b/],
  ["SEC-SECRET-GITHUB", /\bgh[pousr]_[A-Za-z0-9]{20,}\b/],
  ["SEC-SECRET-AWS", /\bAKIA[0-9A-Z]{16}\b/],
  [
    "SEC-SECRET-CONFIG",
    /(?:CLERK_SECRET_KEY|QSTASH_TOKEN|QSTASH_(?:CURRENT|NEXT)_SIGNING_KEY)\s*[:=]\s*["']?([^\s"'#]{8,})/,
  ],
];
const phaseZeroDisabledFlags = [
  "NEKORU_PRODUCT_ANALYTICS_ENABLED",
  "NEKORU_AI_EVALUATION_ENABLED",
  "NEKORU_ASSESSMENT_ENABLED",
  "NEKORU_READINESS_ENABLED",
  "NEKORU_OFFLINE_RUNTIME_ENABLED",
] as const;

async function listFiles(directory: string): Promise<string[]> {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = await Promise.all(
    entries.map(async (entry) => {
      if (entry.isDirectory() && ignoredDirectories.has(entry.name)) return [];
      const path = resolve(directory, entry.name);
      if (entry.isDirectory()) return listFiles(path);
      return inspectedExtensions.has(extname(entry.name)) ? [path] : [];
    }),
  );
  return files.flat();
}

function parseEnvironmentExample(source: string): Map<string, string> {
  return new Map(
    source
      .split(/\r?\n/)
      .map((line) => line.trim())
      .filter((line) => line.length > 0 && !line.startsWith("#"))
      .map((line) => {
        const separator = line.indexOf("=");
        return separator < 0
          ? [line, ""]
          : [line.slice(0, separator), line.slice(separator + 1)];
      }),
  );
}

function inspectSource(path: string, source: string): Finding[] {
  return credentialPatterns.flatMap(([control, pattern]) =>
    pattern.test(source)
      ? [
          {
            control,
            path: relative(root, path),
            detail: "nilai yang menyerupai credential ditemukan",
          },
        ]
      : [],
  );
}

async function inspectPackageVersions(): Promise<Finding[]> {
  const packageFiles = (await listFiles(root)).filter(
    (path) => path.endsWith("package.json") && !path.includes(".impeccable"),
  );
  const findings: Finding[] = [];
  for (const path of packageFiles) {
    const manifest = JSON.parse(await readFile(path, "utf8")) as Record<
      string,
      unknown
    >;
    for (const section of ["dependencies", "devDependencies"] as const) {
      const dependencies = manifest[section];
      if (dependencies === undefined) continue;
      for (const [name, version] of Object.entries(
        dependencies as Record<string, string>,
      )) {
        if (
          version.startsWith("workspace:") ||
          /^\d+\.\d+\.\d+(?:-[0-9A-Za-z.-]+)?$/.test(version)
        )
          continue;
        findings.push({
          control: "SEC-DEPENDENCY-EXACT",
          path: relative(root, path),
          detail: `${section}.${name} harus memakai exact version atau workspace protocol`,
        });
      }
    }
  }
  return findings;
}

const scanRoots = ["apps", "packages", "tooling", ".github"].map((path) =>
  resolve(root, path),
);
const sourceFiles = (await Promise.all(scanRoots.map(listFiles))).flat();
const findings = (
  await Promise.all(
    sourceFiles.map(async (path) =>
      inspectSource(path, await readFile(path, "utf8")),
    ),
  )
).flat();
findings.push(...(await inspectPackageVersions()));

const environmentPath = resolve(root, ".env.example");
const environmentSource = await readFile(environmentPath, "utf8");
findings.push(...inspectSource(environmentPath, environmentSource));
const environment = parseEnvironmentExample(environmentSource);
for (const flag of phaseZeroDisabledFlags) {
  if (environment.get(flag) !== "false")
    findings.push({
      control: "SEC-PHASE0-DISABLED",
      path: ".env.example",
      detail: `${flag} harus eksplisit false pada Phase 0`,
    });
}
for (const key of environment.keys()) {
  if (/^NEXT_PUBLIC_.*(?:SECRET|TOKEN|SIGNING|DATABASE)/.test(key))
    findings.push({
      control: "SEC-CLIENT-SECRET",
      path: ".env.example",
      detail: `${key} tidak boleh diekspos ke client`,
    });
}

const workflowPath = resolve(root, ".github/workflows/phase-0.yml");
const workflow = await readFile(workflowPath, "utf8");
if (!/^permissions:\r?\n\s+contents: read$/m.test(workflow))
  findings.push({
    control: "SEC-CI-PERMISSION",
    path: relative(root, workflowPath),
    detail:
      "workflow harus mempertahankan contents: read sebagai default permission",
  });
if (/\benvironment:\s*production\b/.test(workflow))
  findings.push({
    control: "SEC-PHASE0-EXPOSURE",
    path: relative(root, workflowPath),
    detail: "Phase 0 tidak boleh memakai production environment",
  });

// Canary memastikan pola utama tetap berfungsi tanpa menyimpan secret utuh.
const clerkCanary = ["sk", "test", "A".repeat(24)].join("_");
if (!credentialPatterns[1]?.[1].test(clerkCanary))
  findings.push({
    control: "SEC-SCANNER-CANARY",
    path: relative(root, import.meta.filename),
    detail: "secret scanner gagal mendeteksi Clerk canary",
  });

if (findings.length > 0) {
  console.error(
    `Security check gagal:\n${findings
      .map(
        (finding) =>
          `- [${finding.control}] ${finding.path}: ${finding.detail}`,
      )
      .join("\n")}`,
  );
  process.exitCode = 1;
} else {
  console.log(
    `Security check lolos: ${sourceFiles.length} source/config files dipindai; dependency exact; capability pasca-Phase-0 tetap disabled.`,
  );
}
