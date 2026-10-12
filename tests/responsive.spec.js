import { expect, test } from "@playwright/test";
import { openHome } from "./helpers.js";

const widths = [320, 390, 768, 1024, 1280, 1440];

test("stránka nepřetéká na běžných šířkách", async ({ page }) => {
  await openHome(page);
  for (const width of widths) {
    await page.setViewportSize({ width, height: 900 });
    const overflow = await page.evaluate(() => {
      const root = document.documentElement;
      return root.scrollWidth - root.clientWidth;
    });
    expect(overflow, `přetečení při šířce ${width}px`).toBeLessThanOrEqual(1);
    await expect(page.getByRole("link", { name: "Akce" })).toBeVisible();
    await expect(page.getByRole("link", { name: /Chci se přihlásit/ })).toBeVisible();
  }
});

test("profily se na mobilu skládají pod sebe a na desktopu vedle sebe", async ({ page }) => {
  await openHome(page);

  await page.setViewportSize({ width: 390, height: 900 });
  const mobileColumns = await page.locator(".profiles").evaluate((element) => getComputedStyle(element).gridTemplateColumns);
  expect(mobileColumns.split(" ").length).toBe(1);

  await page.setViewportSize({ width: 1280, height: 900 });
  const desktopColumns = await page.locator(".profiles").evaluate((element) => getComputedStyle(element).gridTemplateColumns);
  expect(desktopColumns.split(" ").length).toBe(2);
});

test("navigace má dotykovou výšku aspoň 44 px", async ({ page }) => {
  await openHome(page);
  await page.setViewportSize({ width: 390, height: 900 });
  const height = await page.getByRole("link", { name: "Kontakt", exact: true }).evaluate((element) => element.getBoundingClientRect().height);
  expect(height).toBeGreaterThanOrEqual(44);
});
