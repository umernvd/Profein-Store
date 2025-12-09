/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        montserrat: ['var(--font-montserrat)'],
        quicksand: ['var(--font-quicksand)'],
      },
      screens: {
        'xs': '375px',
      },
      colors: {
        // Custom darker teal palette for better contrast with orange
        teal: {
          50: '#f0fdfa',
          100: '#ccfbf1',
          200: '#99f6e4',
          300: '#5eead4',
          400: '#2dd4bf',
          500: '#14b8a6',
          600: '#0d9488',
          700: '#0f766e',
          800: '#115e59',
          850: '#0e4f4a',  // Custom darker shade
          900: '#134e4a',
          925: '#0a3a36',  // Custom even darker
          950: '#042f2e',  // Custom darkest
        },
      },
    },
  },
  plugins: [],
}
