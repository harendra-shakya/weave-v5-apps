import Link from 'next/link';
import type { Pack } from '@/lib/types';
import { minPrice } from '@/lib/packs';
import { ArtistCredit } from './ArtistCredit';
import { PriceTag } from './PriceTag';
import { StickerPlaceholder } from './StickerPlaceholder';

export function PackCard({ pack, featured = false }: { pack: Pack; featured?: boolean }) {
  return (
    <article
      className={`overflow-hidden rounded-card bg-cream shadow-pop ${
        featured ? 'grid sm:grid-cols-2' : 'flex flex-col'
      }`}
    >
      <Link
        href={`/packs/${pack.id}`}
        aria-label={`${pack.name} by ${pack.artist}`}
        className="block no-underline hover:no-underline"
      >
        <StickerPlaceholder
          pack={pack}
          className={`transition-colors hover:bg-sun/50 ${featured ? 'h-full min-h-[280px]' : 'aspect-[5/4]'}`}
        />
      </Link>
      <div className={`flex flex-col items-start gap-1.5 ${featured ? 'justify-center p-9' : 'p-6'}`}>
        <ArtistCredit name={pack.artist} />
        <h3 className={`font-extrabold leading-tight text-ink ${featured ? 'text-display' : 'text-display-sm'}`}>
          <Link href={`/packs/${pack.id}`} className="font-extrabold text-ink no-underline hover:text-pink hover:no-underline">
            {pack.name}
          </Link>
        </h3>
        <p className="text-sm font-medium leading-relaxed text-ink-soft">{pack.description}</p>
        <p className="mt-1.5">
          <PriceTag cents={minPrice(pack)} from />{' '}
          <span className="text-[13px] font-semibold text-ink-faint">· {pack.finishes.join(' / ').toLowerCase()}</span>
        </p>
      </div>
    </article>
  );
}
