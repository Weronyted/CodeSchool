import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          blue:   '#4361EE',
          violet: '#7B2FBE',
          cyan:   '#38BDF8',
          pink:   '#F472B6',
        },
        // Keep primary for backward compat with existing components
        primary: {
          50:  '#EEF2FF',
          100: '#E0E7FF',
          200: '#C7D2FE',
          300: '#A5B4FC',
          400: '#818CF8',
          500: '#4361EE',
          600: '#4361EE',
          700: '#3451D1',
          800: '#2338A0',
          900: '#1A2B7F',
          DEFAULT: '#4361EE',
          dark:    '#6B8BFF',
        },
        secondary: {
          DEFAULT: '#7B2FBE',
          dark:    '#A78BFA',
        },
        surface: 'rgba(255,255,255,0.035)',
        cream: {
          50:  '#FEFBF6',
        },
        success: '#2F9E44',
        danger:  '#F472B6',
        warning: '#F08C00',
        info:    '#38BDF8',
      },
      fontFamily: {
        heading: ['Syne', 'sans-serif'],
        body:    ['"DM Sans"', 'sans-serif'],
        mono:    ['"JetBrains Mono"', 'monospace'],
      },
      animation: {
        'float-slow':   'float 20s ease-in-out infinite',
        'float-medium': 'float 14s ease-in-out infinite',
        'float-fast':   'float 8s ease-in-out infinite',
        shimmer:        'shimmer 2s linear infinite',
        'spin-slow':    'spin 8s linear infinite',
        'badge-reveal': 'badgeReveal 0.5s cubic-bezier(0.34,1.56,0.64,1) forwards',
        sheen:          'sheen 3.5s ease-in-out infinite',
        marquee:        'marquee 32s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':      { transform: 'translateY(-18px)' },
        },
        shimmer: {
          '0%':   { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        badgeReveal: {
          '0%':   { transform: 'scale(0)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        sheen: {
          '0%, 60%': { left: '-100%' },
          '80%':     { left: '130%' },
          '100%':    { left: '130%' },
        },
        marquee: {
          from: { transform: 'translateX(0)' },
          to:   { transform: 'translateX(-50%)' },
        },
      },
    },
  },
  plugins: [],
}

export default config
