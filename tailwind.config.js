/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/Pages/**/*.{js,ts,jsx,tsx}",
    "./src/Components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'polkadot-pink': '#E6007A',
        'bg-dark': '#1A1A1A',
        'bg-light': '#1E2730',
      }
    }
  },
  plugins: [],
}
