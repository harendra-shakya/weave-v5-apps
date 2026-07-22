import type { Config } from 'tailwindcss';

/** Vinyl Pop tokens — all color values live in app/globals.css as CSS variables. */
const v = (name: string) => `rgb(var(--${name}) / <alpha-value>)`;

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        purple: { DEFAULT: v('color-purple'), deep: v('color-purple-deep') },
        cream: { DEFAULT: v('color-cream'), bright: v('color-cream-bright') },
        lavender: { DEFAULT: v('color-lavender'), deep: v('color-lavender-deep') },
        // text roles on cream surfaces
        ink: { DEFAULT: v('color-purple-deep'), soft: v('color-soft'), faint: v('color-faint') },
        line: v('color-line'),
        pink: { DEFAULT: v('color-pink'), deep: v('color-pink-deep') },
        mint: { DEFAULT: v('color-mint'), deep: v('color-mint-deep') },
        sun: { DEFAULT: v('color-sun'), deep: v('color-sun-deep') },
        // placeholder-artwork palette only — never for UI chrome
        art: { blue: v('color-art-blue'), orange: v('color-art-orange') },
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        display: ['var(--font-sans)', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'display-lg': ['3.5rem', { lineHeight: '1.02', letterSpacing: '-0.01em' }],
        display: ['2.25rem', { lineHeight: '1.08' }],
        'display-sm': ['1.5rem', { lineHeight: '1.15' }],
      },
      borderRadius: {
        card: 'var(--radius-card)',
        control: 'var(--radius-control)',
      },
      boxShadow: {
        pop: '0 8px 0 rgb(var(--color-purple-deep))',
        'pop-sm': '0 4px 0 rgb(var(--color-purple-deep))',
        mint: '0 5px 0 rgb(var(--color-mint-deep))',
        'mint-sm': '0 2px 0 rgb(var(--color-mint-deep))',
        sun: '0 4px 0 rgb(var(--color-sun-deep))',
        'sun-sm': '0 2px 0 rgb(var(--color-sun-deep))',
        pink: '0 5px 0 rgb(var(--color-pink-deep))',
        'pink-sm': '0 2px 0 rgb(var(--color-pink-deep))',
        sticker: '0 3px 8px rgb(var(--color-purple-deep) / 0.28)',
      },
      textShadow: {},
      maxWidth: { page: '72rem' },
    },
  },
  plugins: [],
};

export default config;
