import { expect, test } from "@playwright/test";
import shell from "shelljs";

test.describe("test register page", () => {
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

  test("should register successfully", async ({ page }) => {
    // Go to http://localhost:4000/
    await page.goto("/");
    // Click text=Login
    await Promise.all([
      page.waitForNavigation(),
      page.locator("text=Login").click(),
    ]);
    // Click text=Not signed up? Click here to register!
    await Promise.all([
      page.waitForNavigation(),
      page.locator("text=Not signed up? Click here to register!").click(),
    ]);
    // Click #username
    await page.locator("#username").click();
    // Fill #username
    await page.locator("#username").fill("User03");
    // Press Tab
    await page.locator("#username").press("Tab");
    // Fill #email
    await page.locator("#email").fill("user03@mail.com");
    // Press Tab
    await page.locator("#email").press("Tab");
    // Fill #password
    await page.locator("#password").fill("password");
    // Press Tab
    await page.locator("#password").press("Tab");
    // Fill #confirmPassword
    await page.locator("#confirmPassword").fill("password");
    // Click button:has-text("Register")
    await Promise.all([
      page.waitForNavigation(),
      page.locator('button:has-text("Register")').click(),
    ]);
    // Click [id="menu-button-\:r9\:"]
    await page.locator("#menu-button-navbar-usermenu").click();
    // Click text=User01
    await expect(page.locator("#home-user-menu-username")).toContainText(
      "User03"
    );
  });

  test("should fail to register", async ({ page }) => {
    // Go to http://localhost:4000/
    await page.goto("/");
    // Click text=Login
    await Promise.all([
      page.waitForNavigation(),
      page.locator("text=Login").click(),
    ]);
    // Click text=Not signed up? Click here to register!
    await Promise.all([
      page.waitForNavigation(),
      page.locator("text=Not signed up? Click here to register!").click(),
    ]);
    // Click #username
    await page.locator("#username").click();
    // Fill #username
    await page.locator("#username").fill("User01");
    // Press Tab
    await page.locator("#username").press("Tab");
    // Fill #email
    await page.locator("#email").fill("user01@mail.com");
    // Press Tab
    await page.locator("#email").press("Tab");
    // Fill #password
    await page.locator("#password").fill("password");
    // Press Tab
    await page.locator("#password").press("Tab");
    // Fill #confirmPassword
    await page.locator("#confirmPassword").fill("password");
    // Click button:has-text("Register")
    await Promise.all([page.locator('button:has-text("Register")').click()]);
  });
});
