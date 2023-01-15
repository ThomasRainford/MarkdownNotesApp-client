import { expect, test } from "@playwright/test";
import shell from "shelljs";
import { login } from "../test-utils/e2e-utils";

test.describe("test my-notes page", () => {
  test.beforeAll(() => {
    shell.exec(
      `mongosh '${process.env.NEXT_PUBLIC_TEST_DB_URL}' ./test-utils/db/db-up.js`
    );
  });

  test.beforeEach(async ({ page }) => {
    await login(page, { username: "User01", password: "password" });

    await page.evaluate(() => {
      localStorage.removeItem("selectedCollection");
      localStorage.removeItem("selectedList");
    });
  });

  test.afterAll(() => {
    shell.exec(
      `mongosh '${process.env.NEXT_PUBLIC_TEST_DB_URL}' ./test-utils/db/db-down.js`
    );
  });

  test("should display my-notes page", async ({ page }) => {
    await page.goto("/my-notes");

    expect(page.locator('h3:has-text("Collections")')).toBeTruthy();
    expect(page.locator("text=Select a collection")).toBeTruthy();
    // Select collection
    await page.locator("#collection-heading-1").click();
    expect(page.locator("#right-pane-heading")).toContainText("Collection 1");
    // Select list
    await page.locator("#list-heading-1").click();
    // Assert right pane heading has the correct collection name
    expect(page.locator("#list-heading")).toContainText("Collection 1");
    // Select note
    await page.locator("#note-heading-1").click();
    // Assert right pane heading has the correct list name
    expect(page.locator("#right-pane-heading")).toContainText("List 1");
    // Click [aria-label="left-pane-back-button"]
    await page.locator('[aria-label="left-pane-back-button"]').click();
    //
    expect(page.locator("#note-header-note-title")).toBeTruthy();
    //
    expect(page.locator("#note-header-last-modified")).toBeTruthy();
    //
    expect(page.locator('h3:has-text("Collections")')).toBeTruthy();
  });
});
