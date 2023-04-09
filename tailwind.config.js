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
    fontSize: {
      sm: "1.5rem",
      base: "2rem",
      lg: "2.5rem",
      xl: "3rem",
      "2xl": ["4.2rem", { lineHeight: "4.4rem" }],
      "3xl": ["4.8rem", { lineHeight: "5rem" }],
      "4xl": "2.441rem",
      "5xl": "3.052rem",
    },
    extend: {
      colors: {
        black: "#1f1f1f",
        green: {
          550: "#0ba750",
        },
      },
    },
  },
  plugins: [],
};
