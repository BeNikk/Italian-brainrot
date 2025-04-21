/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
      extend: {
        colors: {
          'neon-pink': '#ff00ff',
          'neon-green': '#00ff00',
          'neon-yellow': '#ffff00',
          'neon-blue': '#00ffff',
          'italian-red': '#ff0000',
          'italian-green': '#00cc00',
          'italian-white': '#ffffff',
        },
        animation: {
          'spin-slow': 'spin 3s linear infinite',
          'bounce-slow': 'bounce 3s infinite',
          'pulse-fast': 'pulse 1s infinite',
        },
        boxShadow: {
          'neon-pink': '0 0 10px 0 #ff00ff, 0 0 20px 0 #ff00ff, 0 0 30px 0 #ff00ff',
          'neon-green': '0 0 10px 0 #00ff00, 0 0 20px 0 #00ff00, 0 0 30px 0 #00ff00',
          'neon-yellow': '0 0 10px 0 #ffff00, 0 0 20px 0 #ffff00, 0 0 30px 0 #ffff00',
          'neon-blue': '0 0 10px 0 #00ffff, 0 0 20px 0 #00ffff, 0 0 30px 0 #00ffff',
        },
        fontFamily: {
          passion: ['"Passion One"', 'cursive'],
          bungee: ['"Bungee Shade"', 'cursive'],
          glitch: ['"Rubik Glitch"', 'cursive'],
        },
      },
    },
    plugins: [],
  };