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
        dark: '#141416',
        'dark-accent-1': '#1c1d22',
        'dark-accent-2': '#232329',
        'dark-accent-3': '#353945'
      }
    }
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('tailwind-scrollbar-hide'),
    require('@tailwindcss/line-clamp')
  ]
};
