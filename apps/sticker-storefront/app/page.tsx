import { PACKS } from '@/lib/packs';
import { PackCard } from '@/components/PackCard';
import { EmptyState } from '@/components/EmptyState';

export default function CatalogPage() {
  const [featured, ...rest] = PACKS;
  return (
    <>
      <section aria-labelledby="hero" className="py-16 text-center sm:py-20">
        {/* Locked baseline copy — do not reword (learning-loop seed) */}
        <h1 id="hero" className="text-pop mx-auto max-w-3xl font-extrabold text-display-lg [text-wrap:pretty]">
          A few sticker packs worth the page.
        </h1>
        <p className="mx-auto mt-5 max-w-xl text-lg font-semibold leading-relaxed text-lavender [text-wrap:pretty]">
          Not ten thousand you&rsquo;ll scroll past. Hand-picked drops from real artists — shown at
          true size, so you know what you&rsquo;re getting before it ships.
        </p>
      </section>

      {PACKS.length === 0 ? (
        <EmptyState
          note="between drops"
          title="The next drop is coming."
          body="We keep the shelf small on purpose. Check back soon — or read about how we choose what makes the page."
          actionLabel="why marginalia"
          actionHref="/about"
        />
      ) : (
        <section aria-labelledby="drop-heading" className="pb-8">
          <div className="mb-9 flex items-center justify-center gap-3.5">
            <h2
              id="drop-heading"
              className="badge-tilt whitespace-nowrap rounded-full bg-pink px-5 py-1.5 font-extrabold text-cream shadow-pink"
            >
              the july drop
            </h2>
            <p className="text-[15px] font-semibold text-lavender">
              {PACKS.length} packs — that&rsquo;s the point
            </p>
          </div>
          {featured && (
            <div className="mb-11">
              <PackCard pack={featured} featured />
            </div>
          )}
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {rest.map((pack) => (
              <PackCard key={pack.id} pack={pack} />
            ))}
          </div>
        </section>
      )}
    </>
  );
}
