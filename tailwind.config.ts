import { join } from "path";
import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";
import { skeleton } from "@skeletonlabs/tw-plugin";
import { sneakyCrowSkeletonTheme } from "./theme";

const config = {
  darkMode: "selector",
  content: [
    "./src/**/*.{html,js,svelte,ts}",
    join(require.resolve("@skeletonlabs/skeleton"), "../**/*.{html,js,svelte,ts}")
  ],
  theme: {
    fontFamily: {
      sans: ["Outfit", "sans-serif"],
      mono: [
        "ui-monospace",
        "SFMono-Regular",
        "Menlo",
        "Monaco",
        "Consolas",
        "Liberation Mono",
        "Courier New",
        "monospace"
      ]
    },
    fontSize: {
      xs: "0.9rem",
      sm: "1rem",
      base: ["1.25rem", { lineHeight: "1.5rem" }],
      lg: ["1.5rem", { lineHeight: "1.8rem" }],
      xl: ["2rem", { lineHeight: "2.2rem" }],
      "2xl": ["3.2rem", { lineHeight: "3.4rem" }],
      "3xl": ["3.8rem", { lineHeight: "4rem" }],
      "4xl": ["4.5rem", { lineHeight: "4.7rem" }],
      "5xl": ["5.5rem", { lineHeight: "5.7rem" }],
      "6xl": ["6.5rem", { lineHeight: "6.7rem" }],
      "7xl": ["7.5rem", { lineHeight: "7.7rem" }],
      "8xl": ["8.5rem", { lineHeight: "8.7rem" }],
      "9xl": ["9.5rem", { lineHeight: "9.7rem" }]
    },
    extend: {
      colors: {
        black: "#1f1f1f",
        white: "#fefcd9"
      },
      gridTemplateColumns: {
        header: "100px repeat(5, 1fr)"
      },
      gridTemplateRows: {
        main: "min-content 1fr min-content"
      },
      boxShadow: {
        "flat-green": "10px 10px #0ba750"
      },
      transitionProperty: {
        height: "height"
      }
    }
  },
  plugins: [
    skeleton({
      themes: {
        custom: [sneakyCrowSkeletonTheme]
      }
    }),
    plugin(function ({ addUtilities }) {
      addUtilities({
        // https://developer.mozilla.org/en-US/docs/Web/CSS/writing-mode
        ".horizontal-writing-tb": { "writing-mode": "horizontal-tb" },
        ".vertical-writing-rl": { "writing-mode": "vertical-rl" },
        ".vertical-writing-lr": { "writing-mode": "vertical-lr" },
        // https://developer.mozilla.org/en-US/docs/Web/CSS/text-orientation
        ".orientation-mixed": { "text-orientation": "mixed" },
        ".orientation-upright": { "text-orientation": "upright" },
        ".orientation-sideways-right": { "text-orientation": "sideways-right" },
        ".orientation-sideways": { "text-orientation": "sideways" },
        ".orientation-glyph": { "text-orientation": "use-glyph-orientation" }
      });
    })
  ]
} satisfies Config;

export default config;
