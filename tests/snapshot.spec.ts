import { Page, expect, test } from "@playwright/test";

test(
	"renders map correctly",
	async ({ page }: { page: Page }) => {
		await new Promise((resolve) => setTimeout(resolve, 1000)); // Wait for 5 seconds

		await page.goto("http://localhost:4321/test");

		await page.waitForSelector(".ol-viewport", { timeout: 30000 });

		await page.waitForTimeout(1000);

		expect(await page.screenshot()).toMatchSnapshot("map.png");
	},
	{ timeout: 90000 },
);