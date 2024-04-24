import type { Config } from 'tailwindcss';

export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        primary: ['var(--font-open-sans)'],
      },
      colors: {
        dark: {
          100: '#0C1D12',
          200: '#484C4A',
        },
        green: {
          100: '#F0FFF5',
        },
        danger: '#EF767A',
        'primary-text': '#050D08',
        'secondary-text': '#7E8380',
        primary: {
          100: '#3C688C',
        },
      },
      keyframes: {
        flicker: {
          '0%, 19.999%, 22%, 62.999%, 64%, 64.999%, 70%, 100%': {
            opacity: '0.99',
            filter:
              'drop-shadow(0 0 1px rgba(252, 211, 77)) drop-shadow(0 0 15px rgba(245, 158, 11)) drop-shadow(0 0 1px rgba(252, 211, 77))',
          },
          '20%, 21.999%, 63%, 63.999%, 65%, 69.999%': {
            opacity: '0.4',
            filter: 'none',
          },
        },
        shimmer: {
          '0%': {
            backgroundPosition: '-700px 0',
          },
          '100%': {
            backgroundPosition: '700px 0',
          },
        },
      },
      animation: {
        flicker: 'flicker 3s linear infinite',
        shimmer: 'shimmer 1.3s linear infinite',
      },
      gridTemplateColumns: {
        layout: 'max-content 1fr',
      },
      gridTemplateRows: {
        layout: 'max-content 1fr',
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
} satisfies Config;
