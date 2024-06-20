import { expect, test } from "@playwright/test";

test.describe("Home Page", () => {
  test("has the right title and description", async ({ baseURL, page }) => {
    console.log({ baseURL });
    await page.goto("/");
    await expect(page).toHaveTitle("Albert Nevado - Portfolio");

    const metaDescription = page.locator('meta[name="description"]');
    await expect(metaDescription).toHaveAttribute(
      "content",
      "A senior frontend developer's portfolio. If you're hiring, take a look and contact me!",
    );
  });
});
