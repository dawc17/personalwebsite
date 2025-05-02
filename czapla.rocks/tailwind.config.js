/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'jetbrains': ['"JetBrains Mono"', 'monospace'],
      },
      colors: {
        'card-bg': '#212121',
      },
      backdropBlur: {
        xs: '2px',
      },
      transitionDuration: {
        '800': '800ms',
      },
    },
  },
  plugins: [],
}