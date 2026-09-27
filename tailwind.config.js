/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#e8f0e7',         // soft sage
        surface: '#f3f3df',    // pale citron
        surface2: '#d7e7dc',   // misty green
        footer: '#285247',     // forest green
        cart: '#f3f3df',
        ink: '#285247',        // deep green
        muted: '#527367',      // eucalyptus
        slate: '#718f82',      // quiet sage
        accent: '#dc684c',     // warm coral
        accentHover: '#bd503a',
        cobalt: '#527b70',     // evergreen
        gold: '#d5a33f',       // marigold
        goldHover: '#bc892e',
        line: 'rgba(40,82,71,0.16)',
      },
      fontFamily: {
        display: ['Manrope', 'Inter', 'system-ui', 'sans-serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      maxWidth: {
        content: '1400px',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        scrollLine: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(200%)' },
        },
        drift1: {
          '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
          '50%': { transform: 'translate(4%, 6%) scale(1.12)' },
        },
        drift2: {
          '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
          '50%': { transform: 'translate(-5%, -4%) scale(1.08)' },
        },
        drift3: {
          '0%, 100%': { transform: 'translate(0, 0) scale(1.05)' },
          '50%': { transform: 'translate(3%, -5%) scale(1)' },
        },
      },
      animation: {
        marquee: 'marquee 28s linear infinite',
        scrollLine: 'scrollLine 1.8s ease-in-out infinite',
        drift1: 'drift1 22s ease-in-out infinite',
        drift2: 'drift2 26s ease-in-out infinite',
        drift3: 'drift3 30s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
