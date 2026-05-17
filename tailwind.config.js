/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.js'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        accent: {
          DEFAULT: '#7c3aed',
          light: '#a78bfa',
          glow: '#8b5cf6',
        },
        neon: {
          cyan: '#22d3ee',
          purple: '#a855f7',
          pink: '#ec4899',
        },
        pixel: {
          border: '#1a1a2e',
          'border-dark': '#c4b5fd',
          shadow: '#1a1a2e',
          'shadow-dark': '#000000',
          surface: '#ffffff',
          'surface-dark': '#1e1e32',
          page: '#edeaf5',
          'page-dark': '#12121f',
        },
      },
      fontFamily: {
        display: ['"Outfit"', 'system-ui', 'sans-serif'],
        body: ['"DM Sans"', 'system-ui', 'sans-serif'],
        pixel: ['"Silkscreen"', 'cursive'],
        mono: ['"Silkscreen"', 'ui-monospace', 'monospace'],
      },
      borderRadius: {
        pixel: '0',
        'pixel-lg': '0',
      },
      boxShadow: {
        pixel: '4px 4px 0 0 #1a1a2e',
        'pixel-sm': '2px 2px 0 0 #1a1a2e',
        'pixel-press': '2px 2px 0 0 #1a1a2e',
        'pixel-flat': '0 0 0 0 #1a1a2e',
      },
      animation: {
        'float-slow': 'float 8s ease-in-out infinite',
        'float-medium': 'float 6s ease-in-out infinite',
        'float-fast': 'float 4s ease-in-out infinite',
        'blink-cursor': 'blinkCursor 1s step-end infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        blinkCursor: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
      },
    },
  },
  plugins: [],
};
