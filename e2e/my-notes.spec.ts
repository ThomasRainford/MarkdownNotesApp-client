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
    await page.getByRole("heading", { name: "Collection 1" }).click();
    await page.getByRole("heading", { name: "List 1" }).click();
    await page.getByRole("heading", { name: "Note 1" }).click();
    await page
      .getByRole("textbox")
      .filter({ hasText: "Body 1" })
      .locator("div")
      .click();
    await page.getByRole("button", { name: "left-pane-back-button" }).click();
    expect(page.getByRole("heading", { name: "Collections" })).toBeDefined();
  });

  test("should select, display and modify notes", async ({ page }) => {
    await page.goto("/my-notes");
    await page.getByRole("heading", { name: "Collection 1" }).click();
    await page.getByRole("heading", { name: "List 1" }).click();
    await page.getByRole("heading", { name: "Note 1" }).click();
    await page
      .getByRole("textbox")
      .filter({ hasText: "Body 1" })
      .locator("div")
      .click();
    await page
      .getByRole("textbox")
      .filter({ hasText: "Body 1" })
      .fill("Body 123");
    await page.locator("#note-header-note-title").click();
    await page.getByRole("paragraph").filter({ hasText: "Body 123" }).click();
    await page.getByRole("button", { name: "left-pane-back-button" }).click();
    expect(page.getByRole("heading", { name: "Collections" })).toBeDefined();
  });
});
