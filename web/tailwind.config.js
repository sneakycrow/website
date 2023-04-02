/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      sans: ["Inter", "sans-serif"],
    },
    extend: {
      colors: {
        black: "#1f1f1f",
        green: {
          550: "#0ba750",
        },
      },
      lineHeight: {
        12: "3rem",
        13: "4.4rem",
        15: "5rem",
      },
      fontSize: {
        "3xl": "4.8rem",
        "2xl": "4.2rem",
        base: "2rem",
      },
    },
  },
  plugins: [],
};
