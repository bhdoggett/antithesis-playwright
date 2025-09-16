import { test as base, expect } from "@playwright/test";
import { ApplicationPage } from "./fixtures/ApplicationPage";

const test = base.extend<{ applicationPage: ApplicationPage }>({
  applicationPage: async ({ page }, use) => {
    const applicationPage = new ApplicationPage(page);
    await use(applicationPage);
  },
});

test("has title", async ({ page }) => {
  await page.goto("https://antithesis.com/company/careers/");

  await expect(page).toHaveTitle(/Careers at Antithesis/);
});

test.describe("UI Engineer Role | Frontend Developer", () => {
  test("Should navigate to job description", async ({ applicationPage }) => {
    await applicationPage.gotoJob();

    // Expect to see a description of what Antithesis is looking for in this role
    await expect(
      applicationPage.frame.getByText(
        "Antithesis is looking for an in-office employee to help improve and maintain our marketing, documentation and product websites / webapps."
      )
    ).toBeVisible();

    // Expect to see an "Overview" tab
    await expect(
      applicationPage.frame.getByRole("tab", { name: "Overview" })
    ).toBeVisible();

    // Expect to see an "Application" tab
    await expect(
      applicationPage.frame.getByRole("tab", { name: "Application" })
    ).toBeVisible();
  });

  test("Should enable me to fill out a job application", async ({
    applicationPage,
  }) => {
    await applicationPage.openApplication();

    // Name input
    await applicationPage.fillName("Ben Doggett");
    await expect(applicationPage.nameInput).toHaveValue("Ben Doggett");

    // Email input
    await applicationPage.fillEmail(
      "email_address@email_address_service_provider.com"
    );
    await expect(applicationPage.emailInput).toHaveValue(
      "email_address@email_address_service_provider.com"
    );

    // Resume file upload
    await applicationPage.uploadResume("tests/fixtures/resume.pdf");
    await expect(applicationPage.fileInput).toHaveValue(/resume\.pdf/);

    // "Replace" button should appear after resume upload
    await expect(
      applicationPage.frame.getByRole("button", { name: "Replace" })
    ).toBeVisible();

    // Application question / answer
    await applicationPage.answerQuestion(
      "I am a human and I am fun to work with"
    );
    await expect(applicationPage.questionInput).toHaveValue(
      "I am a human and I am fun to work with"
    );

    // DO NOT test the "Submit" button so as not to spame the company with dummy job applications.
  });
});
