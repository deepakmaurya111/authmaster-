/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,jsx}"],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        dark: {
          'dark-bg': '#252329',
          dark: '#E0E0E0',
          hover: '#4F4F4F'
        },
        light: {
          'light-bg': '#FFFFFF',
          dark: '#333333',
          hover: '#F2F2F2',
          light: '#828282',    // same for dark and light
          border: '#BDBDBD',   // same for dark and light
          link: '#2D9CDB',   // same for dark and light
        },
      },
    },
  },
  plugins: [],
}