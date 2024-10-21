import { Page, expect, test } from "@playwright/test";

const URL = "http://localhost:4321/examples/test-data-source";
const TIMEOUT = 30000;

const waitForMap = async (page: Page) => {
  await page.waitForSelector(".ol-viewport", {
    state: "visible",
    timeout: TIMEOUT,
  });
  await page.waitForTimeout(1000);
};

test(
  "renders map correctly",
  async ({ page }: { page: Page }) => {
    await page.goto(URL, { timeout: TIMEOUT });
    await waitForMap(page);
    expect(await page.screenshot()).toMatchSnapshot("map.png");
  },
  { timeout: 100000 }
);
