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
      fontSize: {
        "3xl": ["4.8rem", { lineHeight: "5rem" }],
        "2xl": ["4.2rem", { lineHeight: "4.4rem" }],
        xl: ["3rem", { lineHeight: "3.2rem" }],
        base: ["2rem", { lineHeight: "2.4rem" }],
      },
    },
  },
  plugins: [],
};
