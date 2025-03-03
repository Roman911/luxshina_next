import { heroui } from '@heroui/theme';
import type { Config } from "tailwindcss";

export default {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}', // Note the addition of the `app` directory.
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    fontFamily: {
      'display': ['Gilroy'],
      'body': ['Gilroy'],
      'gilroy': ["Gilroy", "sans-serif"],
    },
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        black: 'var(--g-color-dark)',
        primary: 'var(--g-color-primary)',
        'gray': {
          100: 'var(--g-color-grey-100)',
          200: 'var(--g-color-grey-200)',
          300: 'var(--g-color-grey-300)',
          400: 'var(--g-color-grey-400)',
          500: 'var(--g-color-grey-500)',
          600: 'var(--g-color-grey-600)',
          700: 'var(--g-color-grey-700)',
          800: 'var(--g-color-grey-800)',
          900: 'var(--g-color-grey-900)',
        },
        'blue': {
          50: 'var(--g-color-blue-50)',
          200: 'var(--g-color-blue-200)',
          300: 'var(--g-color-blue-300)',
          400: 'var(--g-color-blue-400)',
          500: 'var(--g-color-blue-500)',
          600: 'var(--g-color-blue-600)',
          700: 'var(--g-color-blue-700)',
        },
        'green': {
          500: 'var(--g-color-green-500)',
          600: 'var(--g-color-green-600)',
        }
      },
    },
  },
  plugins: [heroui()],
} satisfies Config;
