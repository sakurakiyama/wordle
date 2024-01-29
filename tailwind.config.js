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
        flip: {
          '0%': {
            transform: 'perspective(400px) rotateX(0deg)',
          },
          '100%': {
            transform: 'perspective(400px) rotateX(360deg)',
          },
        },
      },
    },
    animation: {
      shake: 'shake 0.5s ease-in-out',
      flip: 'flip 2s 1',
    },
  },
  plugins: [],
};
