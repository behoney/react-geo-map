import { Page, expect, test } from "@playwright/test";

test(
	"renders map correctly",
	async ({ page }: { page: Page }) => {
		await page.goto("http://localhost:5173"); // Replace with your dev server URL

		console.log("Page loaded");

		// Log the page content
		console.log(await page.content());

		// Increase timeout to 60 seconds
		await page.waitForSelector(".ol-viewport", { timeout: 30000 });

		console.log("Map viewport found");

		// Take a snapshot of the page
		expect(await page.screenshot()).toMatchSnapshot("map.png");
	},
	{ timeout: 90000 },
); // Increase overall test timeout