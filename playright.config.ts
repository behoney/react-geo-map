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
		viewport: { width: 480, height: 320 },
	},
	testDir: "./tests",
	timeout: 120 * 1000,
	expect: {
		timeout: 120 * 1000,
	},
	fullyParallel: true,
	forbidOnly: !!process.env.CI,
	retries: process.env.CI ? 2 : 0,
	workers: process.env.CI ? 1 : undefined,
	reporter: "html",
	projects: [
		{
			name: "chromium",
			use: { browserName: "chromium", viewport: { width: 480, height: 320 } },
		},
		{
			name: "firefox",
			use: { browserName: "firefox", viewport: { width: 480, height: 320 } },
		},
		{
			name: "webkit",
			use: { browserName: "webkit", viewport: { width: 480, height: 320 } },
		},
	],
};

export default config;