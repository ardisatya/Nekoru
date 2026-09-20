import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test("a11y-learner-prototype-axe-001", async ({ page }) => {
  await page.goto("/prototype/u01-l1");
  const results = await new AxeBuilder({ page }).analyze();
  expect(results.violations).toEqual([]);
});

test("a11y-learner-prototype-reflow-002", async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 760 });
  await page.goto("/prototype/u01-l1");
  const horizontalOverflow = await page.evaluate(
    () =>
      document.documentElement.scrollWidth >
      document.documentElement.clientWidth,
  );
  expect(horizontalOverflow).toBe(false);
});
