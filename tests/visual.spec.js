import { expect, test } from "@playwright/test";
import { openHome } from "./helpers.js";

const viewports = [
  { name: "desktop", width: 1280, height: 900 },
  { name: "mobile", width: 390, height: 844 },
];

for (const viewport of viewports) {
  test(`vzhled ${viewport.name}`, async ({ page }) => {
    await page.setViewportSize(viewport);
    await openHome(page);
    await expect(page).toHaveScreenshot(`${viewport.name}.png`, { fullPage: true });
  });
}
