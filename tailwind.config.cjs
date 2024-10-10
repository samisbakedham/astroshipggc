/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");
module.exports = {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      colors: {
        primary: '#1f3b4d',       // Deep Navy Blue
        secondary: '#4a4a4a',     // Earthy Gray
        accent: '#d97706',        // Burnt Orange
        background: '#f4f4f2',    // Light Beige
        textLight: '#FFFFFF',     // White
        textDark: '#2b2b2b',      // Dark Charcoal
      },
      fontFamily: {
        sans: [
          "Bricolage Grotesque Variable",
          "Inter Variable",
          "Inter",
          ...defaultTheme.fontFamily.sans,
        ],
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
