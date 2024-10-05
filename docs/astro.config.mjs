import react from "@astrojs/react";
import { defineConfig } from "astro/config";

export default defineConfig({
  integrations: [react()],
  site: "https://behoney.github.io",
  base: process.env.NODE_ENV === "production" ? "/react-geojson-map" : "/",
  vite: {
    watch: {
      include: ["./**"],
    },
  },
  devToolbar: {
    enabled: false,
  },
});
