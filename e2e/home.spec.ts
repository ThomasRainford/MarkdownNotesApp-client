import { expect, test } from "@playwright/test";
import shell from "shelljs";

test.describe("basic tests", () => {
  test.beforeAll(() => {
    shell.exec(
      `mongosh '${process.env.NEXT_PUBLIC_TEST_DB_URL}' ./test-utils/db/db-up.js`
    );
  });

  test.afterAll(() => {
    shell.exec(
      `mongosh '${process.env.NEXT_PUBLIC_TEST_DB_URL}' ./test-utils/db/db-down.js`
    );
  });

  test("should display home page", async ({ page }) => {
    // Start from the index page (the baseURL is set via the webServer in the playwright.config.ts)
    await page.goto("/");
    // The new page should contain an h1 with "Welcome to Next.js!"
    await expect(page.locator("h2")).toContainText("MDN Notes");
  });
});
