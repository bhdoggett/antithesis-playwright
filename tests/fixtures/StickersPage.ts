import type { Page, Locator } from "@playwright/test";

export class StickersPage {
  readonly addressOneInput: Locator;
  readonly addressTwoInput: Locator;
  readonly cityInput: Locator;
  readonly stateInput: Locator;
  readonly zipInput: Locator;
  readonly countryInput: Locator;
  readonly nextButton: Locator;
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly emailInput: Locator;
  readonly companyInput: Locator;

  // await page.getByRole('textbox', { name: 'name@company.com' }).click();
  // await page.locator('#youform input[name="company"]').click();

  constructor(private readonly page: Page) {
    this.addressOneInput = page.getByRole("textbox", { name: "Main St" });
    this.addressTwoInput = page.getByRole("textbox", {
      name: "Apt., studio, or floor",
    });
    this.cityInput = page.getByRole("textbox", { name: "San Francisco" });
    this.stateInput = page.getByRole("textbox", { name: "California" });
    this.zipInput = page.getByRole("textbox", { name: "Zip" });
    this.countryInput = page.getByRole("textbox", { name: "United States" });
    this.nextButton = page.getByRole("button", { name: "Next" });
    this.firstNameInput = page.locator('input[name="first_name"]');
    this.lastNameInput = page.locator('#youform input[name="last_name"]');
    this.emailInput = page.getByRole("textbox", { name: "name@company.com" });
    this.companyInput = page.locator('#youform input[name="company"]');
  }

  async goto() {
    await this.page.goto(
      "https://app.youform.com/forms/gaqwan1w?utm_content=sticker-bubble&posthog_id=01991af8-3e44-7157-b724-076f7c7e0378&hubspot_id=3e01ece178934d00c26e2eebe351f56a&pageUri=https%3A%2F%2Fantithesis.com%2Fblog%2Fis_something_bugging_you%2F&pageName=Is+something+bugging+you%3F+%7C+Antithesis+Blog"
    );
  }

  async fillAddressOne(text: string) {
    await this.addressOneInput.click();
    await this.addressOneInput.fill(text);
  }

  async fillAddressTwo(text: string) {
    await this.addressTwoInput.click();
    await this.addressTwoInput.fill(text);
  }

  async fillCity(text: string) {
    await this.cityInput.click();
    await this.cityInput.fill(text);
  }

  async fillZip(text: string) {
    await this.zipInput.click();
    await this.zipInput.fill(text);
  }

  async fillCountry(text: string) {
    await this.countryInput.click();
    await this.countryInput.fill(text);
  }

  async fillName(text: string) {
    await this.firstNameInput.click();
    await this.firstNameInput.fill(text);
  }
}
