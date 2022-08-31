import { expect, test } from "@playwright/test";
import shell from "shelljs";

test.describe("basic tests", () => {
  test.beforeAll(() => {
    console.log("db ", process.env.NEXT_PUBLIC_TEST_DB_URL);
    shell.exec(
      `mongosh '${process.env.NEXT_PUBLIC_TEST_DB_URL}' ./test-utils/db/db-up.js`
    );
  });

  test.afterAll(() => {
    shell.exec(
      `mongosh '${process.env.NEXT_PUBLIC_TEST_DB_URL}' ./test-utils/db/db-down.js`
    );
  });

  test("should display Next.js welcome page", async ({ page }) => {
    // Start from the index page (the baseURL is set via the webServer in the playwright.config.ts)
    await page.goto("/");
    // The new page should contain an h1 with "Welcome to Next.js!"
    await expect(page.locator("h2")).toContainText("MDN Notes");
    // Click login button and wait for the page url to change.
    await page.locator('button:has-text("Login")').click();
    await page.waitForTimeout(1000);

    expect(page.url()).toContain("/account/login");
  });
});
