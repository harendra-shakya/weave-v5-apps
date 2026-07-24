import PosterCard from '@/components/PosterCard';
import EmptyState from '@/components/EmptyState';
import { POSTERS, CATEGORIES, getPostersByCategory } from '@/lib/catalog';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'All Posters',
  description: 'Browse the full Tableau collection — original digital art posters, print-ready PDF downloads.',
};

export default function CatalogPage() {
  if (POSTERS.length === 0) {
    return (
      <EmptyState
        heading="No posters yet"
        body="The collection is being curated. Check back soon."
        cta={{ label: 'Back to homepage', href: '/' }}
      />
    );
  }

  return (
    <div className="mx-auto max-w-page px-6 py-12">
      <h1 className="font-display text-display text-ink mb-2">The collection</h1>
      <p className="text-sm text-ink-soft mb-10">{POSTERS.length} works · Digital print · PDF download</p>

      <div className="space-y-14">
        {CATEGORIES.map((cat) => {
          const posters = getPostersByCategory(cat);
          return (
            <section key={cat} aria-labelledby={`cat-${cat}`}>
              <h2 id={`cat-${cat}`} className="label-caption mb-5">{cat}</h2>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {posters.map((p) => <PosterCard key={p.id} poster={p} />)}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
