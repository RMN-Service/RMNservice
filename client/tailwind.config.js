/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          dark: '#050b1a',
          navy: '#0a192f',
          neon: '#39FF14',
          silver: '#C0C0C0',
        }
      },
      boxShadow: {
        'neon-glow': '0 0 15px rgba(57, 255, 20, 0.3)',
      }
    },
  },
  plugins: [],
}
