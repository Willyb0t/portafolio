/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'space-black': '#000000',
        'space-blue': '#000816',
        'electric-blue': '#00b4d8',
        'vibrant-purple': '#0077b6',
        'cosmic-pink': '#ff006e',
        'stellar-white': '#f8f9fa'
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        display: ['var(--font-orbitron)', 'sans-serif'],
        mono: ['var(--font-jetbrains-mono)', 'monospace'],
      }
    }
  },
  plugins: [],
}
