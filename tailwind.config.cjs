// tailwind.config.cjs
/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: ['./src/**/*.{astro,html,js,jsx,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        primary: '#006400',    // Dark Green for main elements
        secondary: '#4A4A4A',   // Earthy Gray for backgrounds
        accent1: '#FF8C00',     // Bright Orange for call to actions
        accent2: '#FFD700',     // Yellow for highlights
        background: '#2d2d2d',  // Darker neutral for background (updated for easier viewing)
        textLight: '#FFFFFF',   // White text for dark backgrounds
        textDark: '#e0e0e0',    // Light Grey text for readability on dark background
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
