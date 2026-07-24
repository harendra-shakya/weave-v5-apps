import type { Config } from 'tailwindcss';

/** Tableau tokens — all colour values live in app/globals.css as CSS variables. */
const v = (name: string) => `rgb(var(--${name}) / <alpha-value>)`;

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        white: { DEFAULT: v('color-white'), surface: v('color-surface') },
        border: v('color-border'),
        sage: { DEFAULT: v('color-sage'), deep: v('color-sage-deep') },
        ink: {
          DEFAULT: v('color-ink'),
          soft: v('color-ink-soft'),
          muted: v('color-ink-muted'),
          faint: v('color-ink-faint'),
        },
        // placeholder-artwork palette — never for UI chrome
        art: { a: v('color-art-a'), b: v('color-art-b'), c: v('color-art-c') },
      },
      fontFamily: {
        display: ['var(--font-display)', 'Georgia', 'serif'],
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'display-lg': ['3rem', { lineHeight: '1.05', letterSpacing: '-0.02em' }],
        display: ['2rem', { lineHeight: '1.1', letterSpacing: '-0.01em' }],
        'display-sm': ['1.375rem', { lineHeight: '1.2' }],
      },
      borderRadius: {
        card: '4px',
        control: '3px',
      },
      maxWidth: { page: '72rem' },
    },
  },
  plugins: [],
};

export default config;
