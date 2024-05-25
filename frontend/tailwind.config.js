/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        customGray: "#DBDBDB",
      },
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
};
