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
        landing: "url('/assets/landing-choice-2.jpeg')",
      },
      colors: {
        cgold: {
          DEFAULT: "#B98F3A",
          50: "#FBF9F3",
          100: "#F6F0E4",
          200: "#ECDDC1",
          300: "#DFC89A",
          400: "#D0AD68",
          500: "#B98F3A",
          600: "#A78134",
          700: "#906F2D",
          800: "#785D26",
          900: "#55421B",
        },
        cblue: {
          DEFAULT: "#094161",
          50: "#F6FBFE",
          100: "#D3EAF8",
          200: "#86C8EE",
          300: "#33A4E6",
          400: "#1276AF",
          500: "#094161",
          600: "#0A3E5C",
          700: "#0B3B56",
          800: "#0C3A55",
          900: "#0C374F",
        },
        cwhite: {
          DEFAULT: "#F4F8FB",
          50: "#FFFFFF",
          100: "#FBFDFE",
          200: "#FBFDFE",
          300: "#F8FAFC",
          400: "#F8FAFC",
          500: "#F4F8FB",
          600: "#ADCAE1",
          700: "#629BC6",
          800: "#356A92",
          900: "#1A3347",
        },
      },
    },
  },
  plugins: [],
};
