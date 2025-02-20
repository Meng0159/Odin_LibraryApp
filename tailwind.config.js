/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js}'],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Inter', 'sans-serif'],
      },
      colors: {
        'txcolor': '#21373a',
        'general': '#f1eee6',
        'primary': '#5da9cd',
        'secondary': '#abc5e3',
        'accent': '#f1be7c',
       },
       
    },
  },
  plugins: [],
}