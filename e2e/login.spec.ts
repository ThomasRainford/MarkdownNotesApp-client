import { expect, test } from "@playwright/test";
import shell from "shelljs";

test.describe("test login page", () => {
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

  test("should login successfully", async ({ page }) => {
    await page.goto("/");
    // Click text=Login
    await Promise.all([
      page.waitForNavigation(),
      page.locator("text=Login").click(),
    ]);
    // Click input[type="text"]
    await page.locator('input[type="text"]').click();
    // Fill input[type="text"]
    await page.locator('input[type="text"]').fill("User01");
    // Press Tab
    await page.locator('input[type="text"]').press("Tab");
    // Fill input[type="password"]
    await page.locator('input[type="password"]').fill("password");
    // Click text=Sign in
    await Promise.all([
      page.waitForNavigation(),
      page.locator("text=Sign in").click(),
    ]);
    // Click [id="menu-button-\:r9\:"]
    await page.locator("#menu-button-navbar-usermenu").click();
    // Click text=User01
    await expect(page.locator("#home-user-menu-username")).toContainText(
      "User01"
    );
  });

  test("should fail to login", async ({ page }) => {
    await page.goto("/");
    // Click text=Login
    await Promise.all([
      page.waitForNavigation(),
      page.locator("text=Login").click(),
    ]);
    // Click input[type="text"]
    await page.locator('input[type="text"]').click();
    // Fill input[type="text"]
    await page.locator('input[type="text"]').fill("UserDoesNotExist");
    // Press Tab
    await page.locator('input[type="text"]').press("Tab");
    // Fill input[type="password"]
    await page.locator('input[type="password"]').fill("password");
    // Press Enter
    await page.locator('input[type="password"]').press("Enter");
  });
});
