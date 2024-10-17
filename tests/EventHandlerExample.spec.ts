import { Page, expect, test } from "@playwright/test";

const URL = "http://localhost:4321/examples/test-event-handler";
const TIMEOUT = 30000;
const MOUSE_POSITION = { x: 180, y: 150 };

const waitForMap = async (page: Page) => {
  await page.waitForSelector(".ol-viewport", {
    state: "visible",
    timeout: TIMEOUT,
  });
  await page.waitForTimeout(1000);
};

const performMouseActions = async (page: Page) => {
  await page.mouse.move(MOUSE_POSITION.x, MOUSE_POSITION.y);
  await page.locator("canvas").click({
    button: "left",
    position: MOUSE_POSITION,
  });
  await page.waitForTimeout(1000);
};

const checkFeatureTexts = async (page: Page) => {
  const clickFeatureText = page.getByText("Clicked Feature: GEOJSON Characters");
  const hoverFeatureText = page.getByText("Hovered Feature: GEOJSON Characters");

  await expect(clickFeatureText).toBeVisible();
  await expect(hoverFeatureText).toBeVisible();
};

test("renders map and handles events correctly", async ({ page }) => {
  await page.goto(URL, { timeout: TIMEOUT });
  await waitForMap(page);
  await performMouseActions(page);
  await checkFeatureTexts(page);
}, { timeout: 100000 });
