import { test, expect, Page } from "@playwright/test";

async function createCoffee(page: Page, coffeeName: string) {
  await page.goto(`/create`);
  await page.getByRole("textbox", { name: "Name" }).fill(coffeeName);
  await page.getByRole("spinbutton", { name: "Price" }).fill("4.99");
  await page.getByRole("button", { name: "Robusta" }).click();
  await page.getByRole("textbox", { name: "Upload image" }).fill("/latte.webp");
  await page
    .getByRole("textbox", { name: "Description" })
    .fill("Free in the MVST office");

  const confirmButton = page.getByRole("button", { name: "Confirm" });
  await expect(confirmButton).toBeEnabled();
  await confirmButton.click();
}

test.describe("Coffee App E2E", () => {
  test("should create a new coffee item", async ({ page }) => {
    const coffeeName = `Test Coffee Unique ${Date.now()}`;
    await createCoffee(page, coffeeName);
    await page.goto(`/`);
    await expect(page.getByText(coffeeName)).toBeVisible();
  });

  test("should show toast for duplicate coffee name", async ({ page }) => {
    const coffeeName = `Test Coffee Unique ${Date.now()}`;
    await createCoffee(page, coffeeName);
    await createCoffee(page, coffeeName);
    await expect(
      page.getByText("Coffee with that title already exists")
    ).toBeVisible();
  });
});
