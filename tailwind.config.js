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
        'stellar-white': '#f8f9fa',
        'space-gray': '#f0f0f0'
      },
      animation: {
        'twinkle': 'twinkle 3s ease-in-out infinite',
        'pulse-slow': 'pulse 4s ease-in-out infinite',
        'orbit': 'orbit 20s linear infinite',
      },
      keyframes: {
        twinkle: {
          '0%, 100%': { opacity: '0.3' },
          '50%': { opacity: '0.8' }
        },
        pulse: {
          '0%, 100%': { opacity: '0.5' },
          '50%': { opacity: '0.8' }
        },
        orbit: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' }
        }
      }
    }
  },
  plugins: [],
}