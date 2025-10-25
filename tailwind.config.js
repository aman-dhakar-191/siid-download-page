/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // SIID IDE Brand Colors
        brand: {
          purple: '#443264',
          orange: '#FF7800',
          'purple-light': '#5a4080',
          'purple-dark': '#332545',
          'orange-light': '#ff8533',
          'orange-dark': '#cc6000',
        },
        primary: {
          50: '#f5f3ff',
          100: '#ede9fe',
          200: '#ddd6fe',
          300: '#c4b5fd',
          400: '#a78bfa',
          500: '#443264',
          600: '#332545',
          700: '#2a1d3a',
          800: '#21182f',
          900: '#181224',
        },
        secondary: {
          50: '#fff8f0',
          100: '#ffedd1',
          200: '#ffd9a3',
          300: '#ffc074',
          400: '#ffa445',
          500: '#FF7800',
          600: '#cc6000',
          700: '#994800',
          800: '#663000',
          900: '#331800',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}