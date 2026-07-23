import type { Config } from 'tailwindcss'

const v = (name: string) => `rgb(var(--${name}) / <alpha-value>)`

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        cream:  { DEFAULT: v('ks-cream') },
        paper:  { DEFAULT: v('ks-paper') },
        warm:   { DEFAULT: v('ks-warm') },
        sand:   { DEFAULT: v('ks-sand'), deep: v('ks-sand-deep') },
        ink:    { DEFAULT: v('ks-ink') },
        mid:    { DEFAULT: v('ks-mid') },
        muted:  { DEFAULT: v('ks-muted') },
        faint:  { DEFAULT: v('ks-faint') },
        accent: { DEFAULT: v('ks-accent'), deep: v('ks-accent-deep'), soft: v('ks-accent-soft') },
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        card: '26px',
        tile: '20px',
      },
      maxWidth: {
        shop: '1080px',
        page: '1120px',
      },
    },
  },
  plugins: [],
}

export default config
