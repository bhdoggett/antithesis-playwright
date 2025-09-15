import { test, expect, FrameLocator } from "@playwright/test";

test("has title", async ({ page }) => {
  await page.goto("https://antithesis.com/company/careers/");

  await expect(page).toHaveTitle(/Careers at Antithesis/);
});

test.describe("UI Engineer Role | Frontend Developer", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("https://antithesis.com/company/careers/");
  });

  test("Should navigate to job desription and application form.", async ({
    page,
  }) => {
    const frame = await page
      .locator('iframe[title="Ashby Job Board"]')
      .contentFrame();

    await frame.getByRole("link", { name: "UI Engineer | Frontend" }).click();

    // Expect to see a description of what Antithesis is looking for in this role
    await expect(
      frame.getByText(
        "Antithesis is looking for an in-office employee to help improve and maintain our marketing, documentation and product websites / webapps."
      )
    ).toBeVisible();

    // Expect to see an "Overview" tab
    await expect(frame.getByRole("tab", { name: "Overview" })).toBeVisible();

    // Expect to see an "Applicaiton" tab
    await expect(frame.getByRole("tab", { name: "Application" })).toBeVisible();
  });

  test("Where I can fill out a job application", async ({ page }) => {
    const frame = await page
      .locator('iframe[title="Ashby Job Board"]')
      .contentFrame();

    const jobLink = (frame: FrameLocator) =>
      frame.getByRole("link", { name: "UI Engineer | Frontend" });

    await jobLink(frame).click();
    await frame.getByRole("tab", { name: "Application" }).click();

    // Expect the name input text
    const nameInput = (frame: FrameLocator) =>
      frame.getByRole("textbox", { name: "Name*" });
    await nameInput(frame).click();
    await nameInput(frame).fill("Ben Doggett");
    await expect(nameInput(frame)).toHaveValue("Ben Doggett");

    // Expect the email input text, tabbing down from the name input
    const emailInput = (frame: FrameLocator) =>
      frame.getByRole("textbox", { name: "Email*" });
    await emailInput(frame).click();
    await emailInput(frame).fill(
      "email_address@email_address_service_provider.com"
    );
    await expect(emailInput(frame)).toHaveValue(
      "email_address@email_address_service_provider.com"
    );

    // The file should be properly uploaded
    await frame.getByRole("button", { name: "Upload File" }).click();
    const fileInput = frame.locator('input[type="file"]');
    await fileInput.setInputFiles("tests/fixtures/resume.pdf");
    await expect(fileInput).toHaveValue(/resume\.pdf/);

    // Expect the "Replace" button to appear after file upload
    await expect(frame.getByRole("button", { name: "Replace" })).toBeVisible();

    // Expect the description to help you get a job
    await frame
      .getByRole("textbox", { name: "How will your talents help" })
      .fill("I am a human and I am fun to work with");
    await expect(
      frame.getByRole("textbox", { name: "How will your talents help" })
    ).toHaveValue("I am a human and I am fun to work with");
  });
});
