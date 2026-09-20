import { mkdir, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import { createContractArtifacts } from "./artifacts.js";

const output = resolve(import.meta.dirname, "../generated");
await mkdir(output, { recursive: true });
await Promise.all(
  Object.entries(createContractArtifacts()).map(([name, artifact]) =>
    writeFile(resolve(output, name), `${JSON.stringify(artifact, null, 2)}\n`),
  ),
);
