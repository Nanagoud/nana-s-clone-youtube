// tailwind.config.mjs
import type { Config } from 'tailwindcss'
import scrollbarHide from 'tailwind-scrollbar-hide'


export default {
  content: [
    './src/**/*.{js,ts,jsx,tsx}', // adjust to your files
  ],
  theme: {
    extend: {},
  },
  plugins: [
    scrollbarHide, // <— here
  ],
} satisfies Config
