export async function openHome(page) {
  const errors = [];
  page.on("pageerror", (error) => errors.push(String(error)));
  const response = await page.goto("/");
  await page.evaluate(() => document.fonts.ready);
  return { response, errors };
}
