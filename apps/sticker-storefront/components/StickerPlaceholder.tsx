import type { Pack, StickerShape } from '@/lib/types';

/**
 * Synthetic die-cut artwork: white-bordered simple shapes on a sunny panel.
 * Public-safe placeholder — swap for real photography of the printed sheets.
 */
const COLOR: Record<string, string> = {
  purple: 'bg-purple',
  'purple-deep': 'bg-purple-deep',
  pink: 'bg-pink',
  'pink-deep': 'bg-pink-deep',
  mint: 'bg-mint',
  'mint-deep': 'bg-mint-deep',
  sun: 'bg-sun',
  'art-blue': 'bg-art-blue',
  'art-orange': 'bg-art-orange',
};

const SIZE: Record<1 | 2 | 3, string> = { 1: 'h-8 w-8', 2: 'h-12 w-12', 3: 'h-16 w-16' };
const PILL_SIZE: Record<1 | 2 | 3, string> = { 1: 'h-5 w-12', 2: 'h-6 w-20', 3: 'h-8 w-28' };

function Shape({ s }: { s: StickerShape }) {
  const color = COLOR[s.color] ?? 'bg-ink-faint';
  const base = `${color} border-4 border-cream shadow-sticker box-border`;
  switch (s.shape) {
    case 'circle':
      return <span aria-hidden className={`${base} ${SIZE[s.size]} rounded-full`} />;
    case 'squircle':
      return <span aria-hidden className={`${base} ${SIZE[s.size]} rounded-[30%]`} />;
    case 'pill':
      return <span aria-hidden className={`${base} ${PILL_SIZE[s.size]} rounded-full`} />;
    case 'diamond':
      return <span aria-hidden className={`${base} ${SIZE[s.size]} rotate-45 rounded-[18%]`} />;
  }
}

export function StickerPlaceholder({
  pack,
  className = '',
}: {
  pack: Pack;
  className?: string;
}) {
  return (
    <div
      role="img"
      aria-label={`Placeholder preview of the ${pack.name} sticker sheet`}
      className={`flex items-center justify-center bg-sun/30 ${className}`}
    >
      <div className="flex max-w-[85%] flex-wrap items-center justify-center gap-3 p-6">
        {pack.stickers.map((s, i) => (
          <Shape key={i} s={s} />
        ))}
      </div>
    </div>
  );
}
