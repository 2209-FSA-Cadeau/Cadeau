/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        landing: "url('/assets/landingPage.jpeg')",
      },
      colors: {
        cadeau: {
          DEFAULT: "#A37E32",
          50: "#F8F2E8",
          100: "#F1E6D0",
          200: "#E3CFA5",
          300: "#D5B676",
          400: "#C79C48",
          500: "#A37E32",
          600: "#816327",
          700: "#624B1E",
          800: "#423314",
          900: "#1F180A",
        },
      },
    },
  },
  plugins: [],
};
