import type { Config } from "tailwindcss";

/**
 * OneReel — "Archival Warmth" theme extension.
 * Every value references a CSS variable from styles/tokens.css,
 * so the tokens stay the single source of truth (no hex in components).
 * Merge `theme.extend` into your existing config if you already have one.
 */
const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        or: {
          cream: "var(--or-cream)",
          paper: "var(--or-paper)",
          "cream-deep": "var(--or-cream-deep)",
          ink: "var(--or-ink)",
          "ink-soft": "var(--or-ink-soft)",
          ember: "var(--or-ember)",
          "ember-deep": "var(--or-ember-deep)",
          "ember-wash": "var(--or-ember-wash)",
          line: "var(--or-line)",
          "line-strong": "var(--or-line-strong)",
          success: "var(--or-success)",
          danger: "var(--or-danger)",
        },
      },
      fontFamily: {
        serif: ["var(--or-font-serif)", "Georgia", "serif"],
        sans: ["var(--or-font-sans)", "system-ui", "sans-serif"],
      },
      fontSize: {
        display: ["var(--or-display)", { lineHeight: "1.05", letterSpacing: "-0.02em" }],
        "title-lg": ["var(--or-title-lg)", { lineHeight: "1.1", letterSpacing: "-0.015em" }],
        title: ["var(--or-title)", { lineHeight: "1.15", letterSpacing: "-0.01em" }],
        "title-sm": ["var(--or-title-sm)", { lineHeight: "1.25" }],
      },
      borderRadius: {
        xs: "var(--or-radius-xs)",
        sm: "var(--or-radius-sm)",
        md: "var(--or-radius-md)",
      },
      maxWidth: {
        measure: "var(--or-measure)",
        page: "var(--or-page)",
      },
      boxShadow: {
        card: "0 1px 2px rgba(33,29,21,0.06), 0 8px 24px rgba(33,29,21,0.07)",
      },
    },
  },
  plugins: [],
};

export default config;
