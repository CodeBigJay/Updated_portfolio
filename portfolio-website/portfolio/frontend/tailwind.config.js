/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#f8f8f5',
        panel: '#f0f2ed',
        border: '#e3e8e0',
        ink: '#202b2a',
        muted: '#77827a',
        accent: '#668b78',
        deep: '#263d34',
      },
      fontFamily: {
        display: ['Manrope', 'sans-serif'],
        body: ['DM Sans', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
