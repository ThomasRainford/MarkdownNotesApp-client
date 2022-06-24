import { expect, test } from "@playwright/test";

test("should display Next.js welcome page", async ({ page }) => {
  // Start from the index page (the baseURL is set via the webServer in the playwright.config.ts)
  await page.goto("/");
  // The new page should contain an h1 with "Welcome to Next.js!"
  await expect(page.locator("h2")).toContainText("MDN Notes");
});
