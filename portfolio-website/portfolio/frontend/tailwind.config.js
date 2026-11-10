/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#f5f9fc',
        panel: '#edf5fa',
        border: '#dce8f0',
        ink: '#102235',
        muted: '#64788a',
        accent: '#08bfe5',
        deep: '#071827',
      },
      fontFamily: {
        display: ['Manrope', 'sans-serif'],
        body: ['DM Sans', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
