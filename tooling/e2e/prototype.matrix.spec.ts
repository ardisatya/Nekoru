import AxeBuilder from "@axe-core/playwright";
import { expect, test, type Page } from "@playwright/test";

const route = "/prototype/u01-l1";

async function openPrototype(page: Page) {
  await page.goto(route);
  await expect(page.getByRole("main")).toBeVisible();
}

async function assertNoHorizontalOverflow(page: Page) {
  const overflow = await page.evaluate(
    () =>
      document.documentElement.scrollWidth >
      document.documentElement.clientWidth,
  );
  expect(overflow).toBe(false);
}

async function assertPrimaryTouchTargets(page: Page) {
  const undersized = await page
    .locator(
      "button, summary, select, textarea, input[type=email], label:has(input[type=radio])",
    )
    .evaluateAll((nodes) =>
      nodes
        .filter((node) => {
          const element = node as HTMLElement;
          const style = window.getComputedStyle(element);
          const rect = element.getBoundingClientRect();
          return (
            style.display !== "none" &&
            style.visibility !== "hidden" &&
            rect.width > 0 &&
            rect.height > 0
          );
        })
        .map((node) => {
          const rect = (node as HTMLElement).getBoundingClientRect();
          return {
            label: (
              node.textContent ??
              node.getAttribute("aria-label") ??
              ""
            ).trim(),
            width: rect.width,
            height: rect.height,
          };
        })
        .filter(({ width, height }) => width < 44 || height < 44),
    );
  expect(undersized).toEqual([]);
}

test("a11y-matrix-emulator-semantic-001", async ({ page }) => {
  await openPrototype(page);

  const initialResults = await new AxeBuilder({ page }).analyze();
  expect(initialResults.violations).toEqual([]);
  await expect(page.locator("html")).toHaveAttribute("lang", "id");
  await expect(page.getByRole("main")).toBeVisible();
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();

  await page.getByText("Lihat 20 langkah").click();
  await page.getByRole("button", { name: "12. Dengarkan satu vokal" }).click();
  await expect(page.locator('[lang="ja"]')).toHaveCount(4);
  const listeningResults = await new AxeBuilder({ page }).analyze();
  expect(listeningResults.violations).toEqual([]);

  await page
    .getByRole("button", { name: "13. Pasangkan bunyi dan bentuk" })
    .click();
  const matchingResults = await new AxeBuilder({ page }).analyze();
  expect(matchingResults.violations).toEqual([]);

  await page
    .getByRole("button", { name: "20. Saat layanan tidak tersedia" })
    .click();
  const recoveryResults = await new AxeBuilder({ page }).analyze();
  expect(recoveryResults.violations).toEqual([]);
});

test("a11y-matrix-keyboard-focus-recovery-002", async ({ page }) => {
  await openPrototype(page);

  await page.keyboard.press("Tab");
  await expect(page.locator(":focus-visible")).toBeVisible();
  await page.getByText("Lihat 20 langkah").click();
  await page.getByRole("button", { name: "12. Dengarkan satu vokal" }).click();
  await expect(
    page.getByRole("heading", { name: "Dengarkan satu vokal" }),
  ).toBeFocused();

  await page.getByRole("button", { name: "Putar audio" }).press("Enter");
  await expect(page.getByRole("status")).toContainText("Audio sedang diputar");
  await page.getByRole("button", { name: "Jeda audio" }).press("Enter");
  await expect(page.getByRole("status")).toContainText("Audio dijeda");

  await page.getByRole("radio", { name: "a", exact: true }).check();
  await expect(
    page.getByRole("button", { name: "Kirim jawaban" }),
  ).toBeEnabled();
});

test("a11y-matrix-responsive-visual-modes-003", async ({ page }) => {
  await openPrototype(page);
  await assertNoHorizontalOverflow(page);
  await assertPrimaryTouchTargets(page);

  await page.setViewportSize({ width: 320, height: 760 });
  await page.reload();
  await assertNoHorizontalOverflow(page);
  await assertPrimaryTouchTargets(page);

  await page.emulateMedia({ forcedColors: "active" });
  await page.reload();
  const forcedColorsBorder = await page
    .locator(".nk-button")
    .first()
    .evaluate((node) => window.getComputedStyle(node).borderTopWidth);
  expect(Number.parseFloat(forcedColorsBorder)).toBeGreaterThanOrEqual(2);

  await page.emulateMedia({ forcedColors: "none", reducedMotion: "reduce" });
  await page.getByText("Lihat 20 langkah").click();
  await page.getByRole("button", { name: "12. Dengarkan satu vokal" }).click();
  const animationDuration = await page
    .locator('[class*="soundMark"] span')
    .first()
    .evaluate((node) => window.getComputedStyle(node).animationDuration);
  expect(Number.parseFloat(animationDuration)).toBeLessThanOrEqual(0.001);
});

test("a11y-matrix-mobile-emulator-touch-004", async ({ page }, testInfo) => {
  test.skip(
    !testInfo.project.name.includes("ios-emulator") &&
      !testInfo.project.name.includes("android-emulator"),
    "Kasus ini hanya dijalankan pada project emulator mobile.",
  );

  await openPrototype(page);
  await assertNoHorizontalOverflow(page);
  await assertPrimaryTouchTargets(page);

  await page.getByText("Lihat 20 langkah").click();
  await page
    .getByRole("button", { name: "13. Pasangkan bunyi dan bentuk" })
    .click();
  await expect(page.getByRole("button", { name: "あ" })).toBeVisible();
  await expect(page.getByRole("button", { name: "い" })).toBeVisible();
  await page.getByRole("button", { name: "あ" }).tap();
  await expect(page.getByRole("status")).toContainText(
    "Satu pasangan terbentuk",
  );
});

test("a11y-matrix-no-hidden-answer-content-005", async ({ page }) => {
  await openPrototype(page);
  const bodyText = await page.locator("body").innerText();
  expect(bodyText).not.toContain("answer key");
  expect(bodyText).not.toContain("rationale internal");

  const hiddenContent = await page
    .locator("[hidden], [aria-hidden='true']")
    .allTextContents();
  expect(hiddenContent.join(" ")).not.toContain("answer key");
  expect(hiddenContent.join(" ")).not.toContain("rationale internal");
});
