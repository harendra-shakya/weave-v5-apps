import Link from 'next/link';
import PosterCard from '@/components/PosterCard';
import { POSTERS, FEATURED_IDS, CATEGORIES, getPostersByCategory } from '@/lib/catalog';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Tableau — Art for the wall you actually have',
};

export default function HomePage() {
  const featured = POSTERS.filter((p) => FEATURED_IDS.includes(p.id));

  return (
    <div>
      {/* Hero */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-page px-6 py-20 sm:py-28">
          <h1 className="font-display text-display-lg text-ink max-w-2xl leading-tight">
            Art for the wall{' '}<br />you actually have.
          </h1>
          <p className="mt-6 text-base text-ink-soft max-w-md">
            Original digital posters by independent artists. Print-ready PDF downloads.
            From $8 — no subscription, no account required.
          </p>
          <Link
            href="/catalog"
            className="mt-8 inline-block bg-sage-deep text-white text-sm font-medium px-6 py-3 rounded-control hover:bg-sage transition-colors no-underline"
          >
            Browse the collection
          </Link>
        </div>
      </section>

      {/* Featured */}
      <section className="mx-auto max-w-page px-6 py-16">
        <div className="flex items-baseline justify-between mb-8">
          <h2 className="font-display text-display-sm text-ink">Featured</h2>
          <Link href="/catalog" className="text-xs text-ink-muted hover:text-sage">View all →</Link>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((p) => <PosterCard key={p.id} poster={p} />)}
        </div>
      </section>

      {/* Collections by category */}
      <section className="border-t border-border">
        <div className="mx-auto max-w-page px-6 py-16">
          <h2 className="font-display text-display-sm text-ink mb-8">Browse by subject</h2>
          <div className="space-y-14">
            {CATEGORIES.map((cat) => {
              const posters = getPostersByCategory(cat);
              return (
                <div key={cat}>
                  <h3 className="label-caption mb-5">{cat}</h3>
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {posters.map((p) => <PosterCard key={p.id} poster={p} />)}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
