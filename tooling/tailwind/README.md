## Usage

### Install

```sh
pnpm add @esnext/tailwind-config -F @xxxx
```

1. Create postcss.config.cjs

```js
// @ts-expect-error - No types for postcss
module.exports = require('@esnext/tailwind-config/postcss');
```

2. Create tailwind.config.ts

```ts
import baseConfig from '@esnext/tailwind-config';
import { nextui } from '@nextui-org/react';
import { type Config } from 'tailwindcss';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,ts,jsx,tsx}', './app/**/*.{js,ts,jsx,tsx,mdx}'],
  presets: [baseConfig],
  theme: {
    extend: {
      fontFamily: {
        roboto: ['var(--font-roboto)', 'sans-serif'],
        mono: ['var(--font-roboto-mono)'],
      },
    },
  },
  darkMode: 'class',
  plugins: [],
} satisfies Config;
```
