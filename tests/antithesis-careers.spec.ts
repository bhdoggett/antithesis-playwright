import { test, expect } from "@playwright/test";

test("has title", async ({ page }) => {
  await page.goto("https://antithesis.com/company/careers/");

  await expect(page).toHaveTitle(/Careers at Antithesis/);
});

test.describe("Should load the UI Engineer Role when I click the link", () => {
  test("UI Engineer | Frontend Developer link", async ({ page }) => {
    await page.goto("https://antithesis.com/company/careers/");

    const frame = page
      .locator('iframe[title="Ashby Job Board"]')
      .contentFrame();

    await frame.getByRole("link", { name: "UI Engineer | Frontend" }).click();

    await expect(
      frame.getByText(
        "Antithesis is looking for an in-office employee to help improve and maintain our marketing, documentation and product websites / webapps."
      )
    ).toBeVisible();
  });

  test("Fill out job application", async ({ page }) => {
    const frame = page
      .locator('iframe[title="Ashby Job Board"]')
      .contentFrame();

    await frame.getByRole("tab", { name: "Application" }).click();
    await frame.getByRole("textbox", { name: "Name*" }).click();
    await frame.getByRole("textbox", { name: "Name*" }).fill("Ben Doggett");
    await frame.getByRole("textbox", { name: "Name*" }).press("Tab");
    await frame
      .getByRole("textbox", { name: "Email*" })
      .fill("bdoggett@gmail.com");
    await frame.getByRole("button", { name: "Upload File" }).click();
    await frame
      .getByRole("button", { name: "Upload File" })
      .setInputFiles("Ben Doggett Resume.pdf");
  });
});
