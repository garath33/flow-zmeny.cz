import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";
import { openHome } from "./helpers.js";

for (const width of [390, 1280]) {
  test(`axe nenajde porušení při šířce ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await openHome(page);
    const results = await new AxeBuilder({ page }).analyze();
    expect(results.violations).toEqual([]);
  });
}
