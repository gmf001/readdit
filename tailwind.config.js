/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif']
      },
      colors: {
        dark: {
          100: '#a1a1a2',
          200: '#353945',
          300: '#232329',
          400: '#1c1d22',
          500: '#141416',
          600: '#101012',
          700: '#0c0c0d',
          800: '#080809',
          900: '#040404'
        },
        primary: {
          100: '#fff7e7',
          200: '#ffefd0',
          300: '#ffe7b8',
          400: '#ffdfa1',
          500: '#ffd789',
          600: '#ccac6e',
          700: '#998152',
          800: '#665637',
          900: '#332b1b'
        }
      }
    }
  },
  plugins: [
    require('tailwind-scrollbar-hide'),
    require('@tailwindcss/line-clamp')
  ]
};
