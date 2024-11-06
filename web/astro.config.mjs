import { defineConfig } from "astro/config";
import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
	experimental: {
		contentLayer: true,
	},
	vite: {
		ssr: {
			// Example: Force a broken package to skip SSR processing, if needed
			external: ["bun:test"],
			// noExternal: ["the-react-library"],
			// noExternal: ["react", "react-dom"],
		},
		optimizeDeps: {
			exclude: ["bun:test"],
		},
	},
	integrations: [react()],
	output: "hybrid",
	// adapter: netlify(),
	redirects: {
		// "/admin": "https://main--kawasakicommercial-cms.netlify.app/",
	},
	vite: {
		// plugins: [vanillaExtractPlugin()],
	},
});
