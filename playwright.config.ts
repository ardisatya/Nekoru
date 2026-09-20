import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tooling/e2e",
  fullyParallel: true,
  retries: 0,
  reporter: [["list"], ["html", { open: "never" }]],
  use: {
    baseURL: "http://127.0.0.1:3100",
    trace: "retain-on-failure",
  },
  webServer: {
    command: "pnpm --filter @nekoru/learner-web dev --port 3100",
    url: "http://127.0.0.1:3100/prototype/u01-l1",
    reuseExistingServer: true,
    timeout: 120000,
    env: { NEKORU_ENABLE_PROTOTYPE: "true" },
  },
  projects: [
    {
      name: "critical-e2e",
      use: { ...devices["Desktop Chrome"] },
      testMatch: /prototype\.e2e\.spec\.ts/,
    },
    {
      name: "accessibility",
      use: { ...devices["Desktop Chrome"] },
      testMatch: /prototype\.a11y\.spec\.ts/,
    },
  ],
});
