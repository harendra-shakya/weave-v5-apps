/** The artist is always credited — a brand proof point, not decoration. */
export function ArtistCredit({ name, size = 'md' }: { name: string; size?: 'md' | 'lg' }) {
  return (
    <span
      className={`badge-tilt inline-block whitespace-nowrap rounded-full bg-pink font-bold text-cream ${
        size === 'lg' ? 'px-4 py-1 text-sm' : 'px-3.5 py-0.5 text-[13px]'
      }`}
    >
      made by {name}
    </span>
  );
}
