/**
 * OneReel wordmark — "OneReel" (CamelCase, locked) with the "O" rendered
 * as a film reel / aperture mark. All ink; the ember accent is reserved
 * for CTAs, the maker's name, and active states.
 */

export function ReelO({
  size = 24,
  className = "",
}: {
  size?: number;
  className?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
      <circle cx="12" cy="12" r="2" fill="currentColor" />
      <circle cx="12" cy="6.6" r="1.7" fill="currentColor" />
      <circle cx="17.1" cy="10.3" r="1.7" fill="currentColor" />
      <circle cx="15.2" cy="16.4" r="1.7" fill="currentColor" />
      <circle cx="8.8" cy="16.4" r="1.7" fill="currentColor" />
      <circle cx="6.9" cy="10.3" r="1.7" fill="currentColor" />
    </svg>
  );
}

const SIZES = {
  sm: { mark: 18, text: "text-lg" },
  md: { mark: 24, text: "text-2xl" },
  lg: { mark: 32, text: "text-[2rem]" },
} as const;

export function Wordmark({ size = "md" }: { size?: keyof typeof SIZES }) {
  const s = SIZES[size];
  return (
    <span className="inline-flex items-center gap-px text-or-ink">
      {/* The mark reads as the capital O — real text stays for a11y */}
      <ReelO size={s.mark} />
      <span className="sr-only">OneReel</span>
      <span
        aria-hidden="true"
        className={`font-serif font-medium leading-none tracking-tight ${s.text}`}
      >
        neReel
      </span>
    </span>
  );
}
