import react from "@astrojs/react";
import { defineConfig } from "astro/config";

export default defineConfig({
	integrations: [react()],
	srcDir: "./src/docs",
	pages: {
		directory: "./src/docs",
	},
	root: ".",
});
