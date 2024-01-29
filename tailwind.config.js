/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      keyframes: {
        shake: {
          '0%, 100%': {
            transform: 'translateX(0)',
          },
          '25%, 75%': {
            transform: 'translateX(-5px)',
          },
          '50%': {
            transform: 'translateX(5px)',
          },
        },
      },
    },
    animation: {
      shake: 'shake 0.5s ease-in-out',
    },
  },
  plugins: [],
};
