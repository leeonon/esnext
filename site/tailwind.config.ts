import { type Config } from "tailwindcss";
import { nextui } from '@nextui-org/react';

export default {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
    "../node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  darkMode: "class",
  plugins: [
    nextui({
      prefix: "esnext",
      themes: {
        dark: {
          colors: {
            background: {
              500: 'red'
            },
            foreground: {},
            primary: {},
          },
        }
      }
    })
  ]
} satisfies Config;
