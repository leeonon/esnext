import baseConfig from '@esnext/tailwind-config';
import { fontFamily } from 'tailwindcss/defaultTheme';

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
    '../node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  presets: [baseConfig],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      fontFamily: {
        sans: ['var(--font-sans)', ...fontFamily.sans],
      },
      colors: {
        /* 用于元素边框的颜色，通常是淡色以定义分隔线和形状轮廓。 */
        border: 'hsl(var(--border))',
        /* 输入字段的背景色，应保证可写性和可读性。 */
        input: 'hsl(var(--input))',
        /* 焦点环的颜色，用于可聚焦元素（如输入框、按钮等）聚焦时的外边框高亮。 */
        ring: 'hsl(var(--ring))',
        /* 用作页面或元素的背景色，通常是白色或接近白色，因为HSL中百分之百的亮度通常代表白色 */
        background: 'hsl(var(--background))',
        /* 用作前景色，即文本或前景元素的颜色，这里给出的是深色，可能用于提供对比，以确保可读性 */
        foreground: 'hsl(var(--foreground))',
        primary: {
          /* 主要的品牌颜色，用于引起注意的按钮、链接或活动元素。 */
          DEFAULT: 'hsl(var(--primary))',
          /* 配合主要颜色使用的文本或图标的颜色，通常是亮色，以确保它们在深色背景上突出。 */
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          /* 次要的颜色，用于不太突出的元素，但仍与设计语言保持一致。 */
          DEFAULT: 'hsl(var(--secondary))',
          /* 配合次要颜色的前景色。 */
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          /* 用于删除操作或警告信息，通常是红色或接近红色。 */
          DEFAULT: 'hsl(var(--destructive))',
          /* 通常用于-destructive元素的文本或图标，确保它们在警告背景上清晰可见。 */
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          /* 用于不需要强调的元素，比如禁用状态的文本或按钮。 */
          DEFAULT: 'hsl(var(--muted))',
          /* 配合-muted颜色的前景色。 */
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          /* 用于强调和吸引用户注意的元素，比如标签、图标或信息提示。 */
          DEFAULT: 'hsl(var(--accent))',
          /* 配合突出颜色的前景色。 */
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          /* 弹出框或浮动层的背景色，比如提示、下拉菜单等 */
          DEFAULT: 'hsl(var(--popover))',
          /* 弹出框内容的前景色。 */
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          /* 用于卡片组件的背景色，卡片通常包含相关信息的块，比如用户的个人资料卡片。通常与背景色相同，以提供一个干净的外观。 */
          DEFAULT: 'hsl(var(--card))',
          /* 用作卡片内容的前景色，例如文字 */
          foreground: 'hsl(var(--card-foreground))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: 0 },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: 0 },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};
