/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],

  theme: {
    extend: {
      colors: {
        brand: {
          dark: '#050b1a', // Глубокий черный для фона
          navy: '#0A2466', // Основной темно-синий
          neon: '#39FF14', // Неоново-зеленый акцент
          silver: '#C0C0C0', // Серебристый для иконок
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['Roboto Mono', 'monospace'],
      },
      backgroundImage: {
        'circuit-pattern': "url('/assets/circuit-bg.svg')",
        'binary-pattern': "linear-gradient(rgba(10, 36, 102, 0.9), rgba(5, 11, 26, 0.9)), url('/assets/binary-code.png')",
      },
      boxShadow: {
        'neon-glow': '0 0 15px rgba(57, 255, 20, 0.4)',
        'neon-border': 'inset 0 0 10px rgba(57, 255, 20, 0.2)',
      }
    },
  },
  plugins: [],
}
