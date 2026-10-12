import { expect, test } from "@playwright/test";
import { openHome } from "./helpers.js";

test("úvodní stránka ukáže texty, fotky a přihlášku", async ({ page }) => {
  const { response, errors } = await openHome(page);
  expect(response?.ok()).toBeTruthy();
  expect(errors).toEqual([]);

  await expect(page).toHaveTitle("Flow Změny | Martin & Kristýna");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Flow Změny");
  await expect(page.getByText("Cesta k autenticitě skrze tělo a hlas.")).toBeVisible();
  await expect(page.getByRole("heading", { name: "O nás" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Pořádané akce" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Už nechci být hodná holka / hodný kluk" })).toBeVisible();
  await expect(page.getByText("20. června 2026 | 9:30 – 18:00")).toBeVisible();
  await expect(page.getByText("Atelier Antonie, Praha 1")).toBeVisible();
  await expect(page.getByRole("heading", { name: "Kdo jsme" })).toBeVisible();
  await expect(page.getByRole("img", { name: "Martin Šimůnek", exact: true })).toBeVisible();
  await expect(page.getByRole("img", { name: "Kristýna Poláková", exact: true })).toBeVisible();

  const signup = page.getByRole("link", { name: /Chci se přihlásit/ });
  await expect(signup).toHaveAttribute("href", "https://forms.gle/4iUwz4w15zmVuj8m6");
  await expect(page.getByRole("link", { name: "flow.zmeny@gmail.com" })).toHaveAttribute(
    "href",
    "mailto:flow.zmeny@gmail.com",
  );
});

test("navigace dovede na sekce", async ({ page }) => {
  await openHome(page);
  for (const [name, id] of [
    ["O nás", "#onas"],
    ["Akce", "#akce"],
    ["Kdo jsme", "#tym"],
    ["Kontakt", "#contact"],
  ]) {
    await page.getByRole("link", { name, exact: true }).click();
    await expect(page.locator(id)).toBeInViewport();
  }
});

test("klávesou Tab je první odkaz přeskočení na obsah", async ({ page }) => {
  await openHome(page);
  await page.keyboard.press("Tab");
  await expect(page.getByRole("link", { name: "Přeskočit na obsah" })).toBeFocused();
});
