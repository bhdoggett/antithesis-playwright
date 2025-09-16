import { test as base, expect } from "@playwright/test";
import { StickersPage } from "./fixtures/StickersPage";

const test = base.extend<{ stickersPage: StickersPage }>({
  stickersPage: async ({ page }, use) => {
    const stickersPage = new StickersPage(page);
    await use(stickersPage);
  },
});

test("has title", async ({ stickersPage, page }) => {
  await stickersPage.goto();
  await expect(page).toHaveTitle("Antithesis stickers request");
});

test.describe("The sticker request form", () => {
  test("Shoud enable the user to fill in their information reliably", async ({
    stickersPage,
    page,
  }) => {
    await stickersPage.goto();
    await stickersPage.fillAddressOne("123 Yellow Brick Rd.");
    await stickersPage.fillAddressTwo("Apt 4");
    await stickersPage.fillCity("Oz");
    await stickersPage.fillZip("56789");

    // Clicking "Next" should not work at this point
    await stickersPage.nextButton.click();
    await expect(
      page.getByText("Please fill all the fields marked with *")
    ).toBeVisible();

    await stickersPage.fillCountry("Not-Kansas");

    // await expect(
    //   page.getByText("Please fill all the fields marked with *")
    // ).not.toBeVisible();

    // All values should reflect inputs
    await expect(stickersPage.addressOneInput).toHaveValue(
      "123 Yellow Brick Rd."
    );
    await expect(stickersPage.addressTwoInput).toHaveValue("Apt 4");
    await expect(stickersPage.cityInput).toHaveValue("Oz");
    await expect(stickersPage.zipInput).toHaveValue("56789");
    await expect(stickersPage.countryInput).toHaveValue("Not-Kansas");

    await expect(stickersPage.nextButton).toBeVisible();

    // With currently visible inputs complete, click "next"
    await stickersPage.nextButton.click();

    // FUTURE: test visibility of new inputs
  });
});
