/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      colors: {
        dark: {
          950: '#030712',
          900: '#090d16',
          800: '#111827',
        }
      },
      keyframes: {
        waterRipple: {
          to: {
            transform: 'scale(4)',
            opacity: '0',
          },
        },
      },
      animation: {
        waterRipple: 'waterRipple 0.8s ease-out',
      }
    },
  },
  plugins: [],
}
