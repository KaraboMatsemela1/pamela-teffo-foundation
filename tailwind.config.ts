import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        foundation: {
          green: '#173f35',
          cream: '#f7f3e9',
          red: '#a42a23',
          gold: '#c58b1d',
          ink: '#20251f',
        },
      },
    },
  },
  plugins: [],
} satisfies Config
