import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import icon from "astro-icon";

// https://astro.build/config
export default defineConfig({
  site: "https://walker-cole.com",
  integrations: [
    tailwind(),
    mdx(),
    sitemap(),
    icon({
      sets: ['bx', 'bxs'], // Include the icon sets you want to use
    }),
  ],
  vite: {
    resolve: {
      alias: {
        '@stripe/stripe-js': '@stripe/stripe-js',
      }
    },
    build: {
      rollupOptions: {
        external: ['@stripe/stripe-js'],
      },
    },
  },
});
