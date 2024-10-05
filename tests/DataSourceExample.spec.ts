import { Page, expect, test } from "@playwright/test";

test(
  "renders map correctly",
  async ({ page }: { page: Page }) => {
    // Remove initial timeout and use navigation timeout instead
    await page.goto("http://localhost:4321/examples/test-data-source", {
      timeout: 30000,
    });

    // Wait for the map to be visible and stable
    await page.waitForSelector(".ol-viewport", {
      state: "visible",
      timeout: 30000,
    });

    // Optional: Wait for any animations to complete
    await page.waitForTimeout(1000);

    // Take the screenshot and compare
    expect(await page.screenshot()).toMatchSnapshot("map.png");
  },
  { timeout: 100000 }
);
