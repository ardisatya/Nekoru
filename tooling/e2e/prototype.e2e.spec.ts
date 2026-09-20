import { expect, test } from "@playwright/test";

test("e2e-learner-prototype-critical-flow-001", async ({ page }) => {
  await page.goto("/prototype/u01-l1");
  await expect(
    page.getByRole("heading", { name: "Mulai belajar dari nol" }),
  ).toBeVisible();
  await expect(
    page.getByText("Prototipe internal · data sintetis"),
  ).toBeVisible();
  await page.getByRole("button", { name: "Atur tujuan belajar" }).click();
  await expect(
    page.getByRole("heading", { name: "Apa tujuan belajarmu?" }),
  ).toBeFocused();
  await page.getByText("Lihat 20 langkah").click();
  await page
    .getByRole("button", { name: "11. Kenali suara Jepang pertama" })
    .click();
  await page.getByRole("button", { name: "Audio bermasalah" }).click();
  await expect(
    page.getByText("Tidak ada attempt atau nilai yang dibuat"),
  ).toBeVisible();
  await page.getByRole("button", { name: "18. Sesi pertama selesai" }).click();
  await expect(
    page.getByText("Prototipe tidak membuat evidence belajar nyata"),
  ).toBeVisible();
});

test("e2e-learner-prototype-keyboard-002", async ({ page }) => {
  await page.goto("/prototype/u01-l1");
  await page.keyboard.press("Tab");
  await expect(page.locator(":focus-visible")).toBeVisible();
  await page.getByText("Lihat 20 langkah").click();
  await page.getByRole("button", { name: "12. Dengarkan satu vokal" }).click();
  await page.getByRole("radio", { name: "a", exact: true }).check();
  await expect(
    page.getByRole("button", { name: "Kirim jawaban" }),
  ).toBeEnabled();
});

test("e2e-learner-prototype-required-branches-003", async ({ page }) => {
  await page.goto("/prototype/u01-l1");
  await page.getByText("Lihat 20 langkah").click();

  await page.getByRole("button", { name: "6. Masuk lewat email" }).click();
  await page.getByRole("button", { name: "Tautan kedaluwarsa" }).click();
  await expect(
    page.getByText("Minta tautan baru dari perangkat ini"),
  ).toBeVisible();

  await page
    .getByRole("button", { name: "13. Pasangkan bunyi dan bentuk" })
    .click();
  await page.getByRole("button", { name: "あ" }).click();
  await expect(page.getByText("Satu pasangan terbentuk")).toBeVisible();
  await page.getByRole("button", { name: "Lepas pasangan" }).click();
  await expect(
    page.getByRole("status").filter({ hasText: "Pasangan dilepas" }),
  ).toBeVisible();

  await page
    .getByRole("button", { name: "20. Saat layanan tidak tersedia" })
    .click();
  await page.getByRole("button", { name: "Pemeliharaan" }).click();
  await expect(
    page.getByText("Tidak ada progres yang berkurang"),
  ).toBeVisible();
});
