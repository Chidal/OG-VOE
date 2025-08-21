/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'neon-blue': '#00FFFF',
        'neon-green': '#00FF00',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(circle, #1A202C, #2D3748)',
      },
    },
  },
  plugins: [],
};