import { nextui } from "@nextui-org/react";
import { type Config } from "tailwindcss";

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
    "../node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        fall: {
          "0%": { transform: "translate(0%,-150%) skewX(0deg)" },
          "50%": { transform: "translate(0%,0%) skewX(-10deg)" },
          "100%": { transform: "translate(0%,150%) skewX(0deg)" },
        },
      },
      animation: {
        fall: "fall 3s ease infinite",
      },
    },
  },
  darkMode: "class",
  plugins: [
    nextui({
      prefix: "esnext",
      themes: {
        dark: {
          colors: {
            background: {
              // DEFAULT: "#212121",
            },
            foreground: {},
            primary: {},
          },
        },
        light: {},
      },
    }),
    // plugin(function ({ matchUtilities }) {
    //   matchUtilities({
    //     "animation-delay": (value) => ({
    //       "animation-delay": value,
    //     }),
    //   });
    // }),
  ],
} satisfies Config;
