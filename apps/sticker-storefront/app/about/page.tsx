import Link from 'next/link';

export const metadata = { title: 'Why Marginalia' };

export default function AboutPage() {
  return (
    <article className="mx-auto max-w-2xl py-16 sm:py-20">
      <div className="text-center">
        <p className="badge-tilt inline-block rounded-full bg-pink px-5 py-1 text-[15px] font-extrabold text-cream shadow-pink">
          why we started this
        </p>
        <h1 className="text-pop mx-auto mt-4 max-w-xl text-display-lg font-extrabold [text-wrap:pretty]">
          The marketplace is broken. This is the curated fix.
        </h1>
      </div>

      <div className="mt-8 rounded-card bg-cream p-9 shadow-pop">
        {/* The Frustration Story — opening verbatim from the brand doc */}
        <p className="text-lg font-semibold leading-relaxed text-ink-soft [text-wrap:pretty]">
          Search &ldquo;planner stickers&rdquo; and you&rsquo;ll drown — thousands of near-identical
          sheets, no idea what&rsquo;ll actually show up in the mail. We got tired of the gamble. So
          we curate small drops from real artists, show you exactly what&rsquo;s in each pack at true
          size, and tell you the finish before you buy.
        </p>

        <h2 className="mt-9 text-display-sm font-extrabold text-ink">what we promise</h2>
        <ul className="mt-4 flex list-none flex-col gap-3.5">
          {(
            [
              ['Every design credits its artist.', 'A real person drew it; their name is on the pack, the page, and the receipt.', 'bg-sun/20'],
              ['Contents at true scale, finish named.', 'What you see on the page is the sheet in your hands — size, finish, and count stated before you pay.', 'bg-mint/15'],
              ['The catalog stays small.', 'Drops, not an infinite grid. A few packs worth the page — that’s the whole idea.', 'bg-pink/10'],
            ] as const
          ).map(([title, body, bg]) => (
            <li key={title} className={`rounded-2xl ${bg} px-5 py-4`}>
              <p className="text-lg font-extrabold text-ink">{title}</p>
              <p className="mt-1 text-sm font-medium leading-relaxed text-ink-soft">{body}</p>
            </li>
          ))}
        </ul>

        <p className="mt-9 text-[15px] font-medium leading-relaxed text-ink-soft">
          Marginalia is named for the notes, doodles, and marks people leave in the margins of a
          book — exactly what you do to your planner. Your pages are the point; we just supply the
          margins&rsquo; worth.
        </p>

        <Link
          href="/"
          className="mt-7 inline-flex min-h-12 items-center whitespace-nowrap rounded-full bg-mint px-8 text-lg font-extrabold text-cream no-underline shadow-mint transition active:translate-y-[3px] active:shadow-mint-sm hover:no-underline"
        >
          see the current drop
        </Link>
      </div>
    </article>
  );
}
