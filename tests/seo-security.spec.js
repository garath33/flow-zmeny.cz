import { createHash } from "node:crypto";
import { expect, test } from "@playwright/test";
import { openHome } from "./helpers.js";

test("SEO značky, sitemap a strukturovaná data jsou na místě", async ({ page, request }) => {
  await openHome(page);
  await expect(page.locator('html')).toHaveAttribute("lang", "cs");
  const description = await page.locator('meta[name="description"]').getAttribute("content");
  expect(description && description.length).toBeGreaterThan(50);
  expect(description.length).toBeLessThanOrEqual(160);
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", "https://flow-zmeny.cz/");
  await expect(page.locator('meta[property="og:image"]')).toHaveAttribute("content", "https://flow-zmeny.cz/images/spolecna.jpg");
  await expect(page.locator('meta[property="og:locale"]')).toHaveAttribute("content", "cs_CZ");
  expect(await page.locator("h1").count()).toBe(1);

  const schema = await page.locator('script[type="application/ld+json"]').textContent();
  const data = JSON.parse(schema || "");
  const event = data["@graph"].find((item) => item["@type"] === "Event");
  expect(event.name).toBe("Už nechci být hodná holka / hodný kluk");
  expect(event.startDate).toBe("2026-06-20T09:30:00+02:00");
  expect(event.location.name).toBe("Atelier Antonie");

  const robots = await request.get("/robots.txt");
  expect(robots.ok()).toBeTruthy();
  expect(await robots.text()).toContain("Sitemap: https://flow-zmeny.cz/sitemap.xml");
  const sitemap = await request.get("/sitemap.xml");
  expect(sitemap.ok()).toBeTruthy();
  expect(await sitemap.text()).toContain("https://flow-zmeny.cz/");
});

test("bezpečnostní pravidla odkazů a CSP drží", async ({ page }) => {
  await openHome(page);
  const csp = await page.locator('meta[http-equiv="Content-Security-Policy"]').getAttribute("content");
  const schema = await page.locator('script[type="application/ld+json"]').textContent();
  const hash = createHash("sha256").update(schema || "").digest("base64");
  expect(csp).toContain(`'sha256-${hash}'`);
  expect(csp).toContain("object-src 'none'");
  expect(csp).toContain("form-action 'none'");
  expect(csp).not.toContain("unsafe-inline");
  expect(csp).not.toContain("unsafe-eval");

  const links = await page.locator("a").evaluateAll((anchors) =>
    anchors.map((anchor) => ({
      href: anchor.getAttribute("href") || "",
      target: anchor.getAttribute("target"),
      rel: anchor.getAttribute("rel") || "",
    })),
  );
  for (const link of links) {
    expect(link.href.startsWith("javascript:"), link.href).toBeFalsy();
    if (link.href.startsWith("http://")) {
      throw new Error(`odkaz není https: ${link.href}`);
    }
    if (link.target === "_blank") {
      expect(link.rel).toContain("noopener");
      expect(link.rel).toContain("noreferrer");
    }
  }

  const inlineHandlers = await page.locator("[onclick], [onerror], [onload]").count();
  expect(inlineHandlers).toBe(0);
  expect(await page.locator("[style]").count()).toBe(0);
});
