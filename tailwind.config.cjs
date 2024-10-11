// tailwind.config.cjs
/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: ['./src/**/*.{astro,html,js,jsx,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        primary: '#006400',    // Dark Green for main elements
        secondary: '#4A4A4A',   // Earthy Gray for background
        accent1: '#FF8C00',     // Bright Orange for call to actions
        accent2: '#FFD700',     // Yellow for highlights
        background: '#f8f9fa',  // Light neutral for background
        textLight: '#FFFFFF',   // White text
        textDark: '#2b2b2b',    // Dark Charcoal text
      },
      fontFamily: {
        sans: [
          'Roboto',            // Use Roboto for a clean, professional look
          ...defaultTheme.fontFamily.sans,
        ],
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
