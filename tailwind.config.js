/** @type {import('tailwindcss').Config} */
const colors = require("tailwindcss/colors");

module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "sans-serif"]
      },
      colors: {
        gray: colors.neutral,
        black: {
          100: "#a1a1a2",
          200: "#353945",
          300: "#232329",
          400: "#1c1d22",
          500: "#141416",
          600: "#101012",
          700: "#0c0c0d",
          800: "#080809",
          900: "#040404"
        },
        dark: {
          100: "#d3d4d6",
          200: "#a7a9ad",
          300: "#7c7d83",
          400: "#50525a",
          500: "#242731",
          600: "#1d1f27",
          700: "#16171d",
          800: "#0e1014",
          900: "#07080a"
        },
        darker: {
          100: "#d2d2d4",
          200: "#a5a6a9",
          300: "#78797e",
          400: "#4b4d53",
          500: "#1e2028",
          600: "#181a20",
          700: "#121318",
          800: "#0c0d10",
          900: "#060608"
        },
        yellow: {
          100: "#fff7e7",
          200: "#ffefd0",
          300: "#ffe7b8",
          400: "#ffdfa1",
          500: "#ffd789",
          600: "#ccac6e",
          700: "#998152",
          800: "#665637",
          900: "#332b1b"
        }
      }
    }
  },
  plugins: [
    require("tailwind-scrollbar-hide"),
    require("@tailwindcss/line-clamp")
  ]
};
