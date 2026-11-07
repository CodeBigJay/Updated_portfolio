/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#0a1018',
        panel: '#121a26',
        border: '#22304a',
        ink: '#e7ecf3',
        muted: '#7e8ba3',
        amber: '#e8a33d',
        trace: '#4fd1c5',
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'sans-serif'],
        body: ['"IBM Plex Sans"', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'monospace'],
      },
      backgroundImage: {
        blueprint:
          'linear-gradient(rgba(79,209,197,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(79,209,197,0.05) 1px, transparent 1px)',
      },
      backgroundSize: {
        grid: '32px 32px',
      },
    },
  },
  plugins: [],
}
