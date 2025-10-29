/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'orkut-pink': '#ed2590',
        'orkut-blue': '#d9e6f7',
        'orkut-dark-blue': '#6699cc',
        'orkut-light-blue': '#f0f7ff',
        'orkut-gradient-start': '#e8f4fd',
        'orkut-gradient-end': '#b8d4f0',
      },
      fontFamily: {
        'orkut': ['Trebuchet MS', 'Verdana', 'sans-serif'],
      },
    },
  },
  plugins: [],
}