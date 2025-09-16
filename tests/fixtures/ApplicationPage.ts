import type { Page, Locator, FrameLocator } from "@playwright/test";

export class ApplicationPage {
  readonly frame: FrameLocator;
  readonly nameInput: Locator;
  readonly emailInput: Locator;
  readonly questionInput: Locator;
  readonly fileInput: Locator;

  constructor(private readonly page: Page) {
    this.frame = page.frameLocator('iframe[title="Ashby Job Board"]');
    this.nameInput = this.frame.getByRole("textbox", { name: "Name*" });
    this.emailInput = this.frame.getByRole("textbox", { name: "Email*" });
    this.questionInput = this.frame.getByRole("textbox", {
      name: "How will your talents help",
    });
    this.fileInput = this.frame.locator('input[type="file"]');
  }

  async gotoJob() {
    await this.page.goto("https://antithesis.com/company/careers/");
    await this.frame
      .getByRole("link", { name: "UI Engineer | Frontend" })
      .click();
  }

  async openApplication() {
    await this.gotoJob();
    await this.frame.getByRole("tab", { name: "Application" }).click();
  }

  async fillName(text: string) {
    await this.nameInput.click();
    await this.nameInput.fill(text);
  }

  async fillEmail(text: string) {
    await this.emailInput.click();
    await this.emailInput.fill(text);
  }

  async answerQuestion(text: string) {
    await this.questionInput.click();
    await this.questionInput.fill(text);
  }

  async uploadResume(fileLocation: string) {
    await this.frame.getByRole("button", { name: "Upload File" }).click();
    await this.fileInput.setInputFiles(fileLocation);
  }

  // Don't add a "submit" method so as not to spam the company where you want a job
}
