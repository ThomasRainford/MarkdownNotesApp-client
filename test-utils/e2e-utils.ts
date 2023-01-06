import { Page } from "@playwright/test";

export const login = async (
  page: Page,
  { username, password }: { username: string; password: string }
) => {
  await page.goto("/");
  // Click text=Login
  await Promise.all([
    page.waitForNavigation(),
    page.locator("text=Login").click(),
  ]);
  // Click input[type="text"]
  await page.locator('input[type="text"]').click();
  // Fill input[type="text"]
  await page.locator('input[type="text"]').fill(username);
  // Press Tab
  await page.locator('input[type="text"]').press("Tab");
  // Fill input[type="password"]
  await page.locator('input[type="password"]').fill(password);
  // Click text=Sign in
  await Promise.all([
    page.waitForNavigation(),
    page.locator("text=Sign in").click(),
  ]);
};
