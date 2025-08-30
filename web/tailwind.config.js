/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html",
  ],
  theme: {
    extend: {
      colors: {
        color_gray: "#45556c",
        color_dark_blue: "#002F45",
        color_yellow: "#f0b100",
        color_white: "#FFFFFF"
      },
    },
  },
  plugins: []
};
