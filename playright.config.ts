import type { PlaywrightTestConfig } from "@playwright/test";

const config: PlaywrightTestConfig = {
	webServer: {
		command: "pnpm run dev",
		port: 4321,
		timeout: 120 * 1000,
		reuseExistingServer: !process.env.CI,
	},
	use: {
		baseURL: "http://localhost:4321",
		viewport: { width: 640, height: 480 },
	},
	testDir: "./tests",
	timeout: 30000,
	expect: {
		timeout: 5000,
	},
	fullyParallel: true,
	forbidOnly: !!process.env.CI,
	retries: process.env.CI ? 2 : 0,
	workers: process.env.CI ? 1 : undefined,
	reporter: "html",
	projects: [
		{
			name: "chromium",
			use: { browserName: "chromium" },
		},
		{
			name: "firefox",
			use: { browserName: "firefox" },
		},
		{
			name: "webkit",
			use: { browserName: "webkit" },
		},
	],
};

export default config;