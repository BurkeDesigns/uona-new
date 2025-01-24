import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import node from "@astrojs/node";
import auth from "auth-astro";
import sitemap from "@astrojs/sitemap";
// import honoAstro from "hono-astro-adapter";

// https://astro.build/config
export default defineConfig({
  site: "https://uona.edu",
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
  integrations: [
    react(),
    auth(),
    sitemap({
      filter: (page) => page.search("/login") == -1,
    }),
  ],
  output: "hybrid",
  // adapter: netlify(),
  adapter: node({
    mode: "standalone",
  }),
  // security: {
  //   checkOrigin: false,
  // },
  // adapter: honoAstro(),
  redirects: {
    // "/admin": "https://main--kawasakicommercial-cms.netlify.app/",
  },
  vite: {
    // plugins: [vanillaExtractPlugin()],
  },
});
