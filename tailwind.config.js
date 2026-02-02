/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    // 1. Scan the 'src' folder (standard Vite structure)
    "./src/**/*.{js,ts,jsx,tsx}",
    // 2. Scan the 'document' folder (where your current files seem to be)
    "./document/**/*.{js,ts,jsx,tsx}",
    // 3. Scan files in the ROOT directory only (not recursive)
    "./*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'pulse-slow': 'pulse 8s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      colors: {
        // Custom colors if you need them later
        glass: {
          surface: 'rgba(255, 255, 255, 0.03)',
          border: 'rgba(255, 255, 255, 0.08)',
        }
      }
    },
  },
  plugins: [],
}