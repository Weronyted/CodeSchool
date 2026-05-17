import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          50:  '#EEF2FF',
          100: '#E0E7FF',
          200: '#C7D2FE',
          300: '#A5B4FC',
          400: '#818CF8',
          500: '#6366F1',
          600: '#3B5BDB',
          700: '#2D48C0',
          800: '#2338A0',
          900: '#1A2B7F',
          DEFAULT: '#3B5BDB',
          dark:    '#818CF8',
        },
        secondary: {
          50:  '#F5F3FF',
          100: '#EDE9FE',
          200: '#DDD6FE',
          300: '#C4B5FD',
          400: '#A78BFA',
          500: '#8B5CF6',
          600: '#7950F2',
          700: '#6D28D9',
          800: '#5B21B6',
          900: '#4C1D95',
          DEFAULT: '#7950F2',
          dark:    '#A78BFA',
        },
        cream: {
          50:  '#FEFBF6',
          100: '#FBF5E9',
          200: '#F5E8CE',
          300: '#EDCFA3',
        },
        success: '#2F9E44',
        danger:  '#E03131',
        warning: '#F08C00',
        info:    '#1971C2',
      },
      fontFamily: {
        heading: ['"Plus Jakarta Sans"', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
      animation: {
        'float-slow': 'float 20s ease-in-out infinite',
        'float-medium': 'float 14s ease-in-out infinite',
        'float-fast': 'float 8s ease-in-out infinite',
        shimmer: 'shimmer 2s linear infinite',
        'spin-slow': 'spin 8s linear infinite',
        'badge-reveal': 'badgeReveal 0.5s cubic-bezier(0.34,1.56,0.64,1) forwards',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '33%': { transform: 'translateY(-20px) rotate(5deg)' },
          '66%': { transform: 'translateY(10px) rotate(-3deg)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        badgeReveal: {
          '0%': { transform: 'scale(0)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}

export default config
