import { defineConfig } from "vitest/config";

export default defineConfig({
  test: { name: "persistence", environment: "node", testTimeout: 30_000 },
});
