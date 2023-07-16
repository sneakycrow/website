/** @type {import("tailwindcss").Config} */
module.exports = {
  content: ["./src/**/*.{html,js,svelte,ts}"],
  theme: {
    fontFamily: {
      sans: ["Inter", "sans-serif"]
    },
    fontSize: {
      xs: "0.6rem",
      sm: "0.8rem",
      base: "1rem",
      lg: "1.5rem",
      xl: "2rem",
      "2xl": ["3.2rem", { lineHeight: "3.4rem" }],
      "3xl": ["3.8rem", { lineHeight: "4rem" }],
      "4xl": "4.4rem",
      "5xl": "5rem"
    },
    extend: {
      colors: {
        black: "#1f1f1f",
        green: {
          550: "#0ba750"
        }
      }
    }
  },
  plugins: []
};
