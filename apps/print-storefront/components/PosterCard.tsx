import Link from 'next/link';
import PosterArtwork from './PosterArtwork';
import PriceTag from './PriceTag';
import ArtistCredit from './ArtistCredit';
import type { Poster } from '@/lib/types';

interface PosterCardProps {
  poster: Poster;
}

export default function PosterCard({ poster }: PosterCardProps) {
  return (
    <article className="group flex flex-col bg-white/surface border border-border rounded-card overflow-hidden hover:border-sage transition-colors">
      <Link
        href={`/poster/${poster.id}`}
        className="block aspect-[5/7] overflow-hidden no-underline"
        tabIndex={0}
        aria-label={`View ${poster.title} by ${poster.artist}`}
      >
        <PosterArtwork
          title={poster.title}
          palette={poster.art_palette}
          className="w-full h-full object-cover group-hover:scale-[1.01] transition-transform duration-300"
        />
      </Link>
      <div className="p-4 flex flex-col gap-3">
        <div>
          <h3 className="font-display text-base text-ink leading-snug">{poster.title}</h3>
          <ArtistCredit artist={poster.artist} category={poster.category} />
        </div>
        <div className="flex items-center justify-between mt-auto">
          <PriceTag cents={poster.price_cents} />
          <Link
            href={`/poster/${poster.id}`}
            className="text-xs font-medium text-sage hover:text-sage-deep no-underline"
          >
            Select format →
          </Link>
        </div>
      </div>
    </article>
  );
}
