import { BackFilmButton } from "@/components/BackFilmButton";

/** Why OneReel — the Frustration Story, and the claims made explicit. */

export const metadata = {
  title: "Why OneReel — Buy the film, not the plan",
};

const REJECTS = [
  {
    thing: "All-you-can-watch subscriptions",
    why: "where the maker sees pennies of your plan.",
  },
  {
    thing: "The infinite feed",
    why: "where brilliant work vanishes twelve rows down.",
  },
  {
    thing: "Algorithmic “more like this”",
    why: "instead of the film you actually came for.",
  },
  {
    thing: "Bare tip jars",
    why: "support with no film attached.",
  },
];

const STEPS = [
  {
    n: "01",
    title: "Find a film",
    body: "The maker's name is on every film, above the fold. You always know whose work you're looking at.",
  },
  {
    n: "02",
    title: "Back it",
    body: "One film, one price — no bundle math hiding who got paid. Support is one click from the film itself.",
  },
  {
    n: "03",
    title: "It reaches the maker",
    body: "Your payment goes straight to the maker. We keep the path short, and we say it plainly — no invented percentages.",
  },
];

export default function AboutPage() {
  return (
    <article className="mx-auto max-w-page px-6 py-16 md:px-10 md:py-24">
      <header className="max-w-3xl">
        <p className="font-sans text-xs font-semibold uppercase tracking-[0.18em] text-or-ember">
          Why OneReel
        </p>
        <h1 className="mt-5 font-serif text-title-lg text-or-ink">
          Buy the film, not the plan.
        </h1>
        <p className="mt-8 max-w-measure font-serif text-xl leading-relaxed text-or-ink md:text-2xl">
          Every great director made shorts nobody could buy. We got tired of
          watching brilliant work vanish into a feed while the platform kept
          the money. So we built the smallest possible thing: a film, a price,
          and a payout that goes straight to the maker.
        </p>
      </header>

      <section aria-labelledby="rejects-heading" className="mt-20 max-w-3xl">
        <h2
          id="rejects-heading"
          className="font-sans text-xs font-semibold uppercase tracking-[0.18em] text-or-ink-soft"
        >
          What we walked away from
        </h2>
        <ul className="mt-6 flex flex-col">
          {REJECTS.map((r) => (
            <li
              key={r.thing}
              className="flex flex-wrap items-baseline gap-x-2 border-t border-or-line py-4 font-sans last:border-b"
            >
              <span className="font-semibold text-or-ink">{r.thing}</span>
              <span className="text-or-ink-soft">— {r.why}</span>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="how-heading" className="mt-20">
        <h2
          id="how-heading"
          className="font-sans text-xs font-semibold uppercase tracking-[0.18em] text-or-ink-soft"
        >
          The smallest possible fix
        </h2>
        <div className="mt-8 grid gap-10 md:grid-cols-3 md:gap-8">
          {STEPS.map((s) => (
            <div key={s.n} className="flex flex-col gap-3">
              <p className="font-serif text-title-sm italic text-or-ember">
                {s.n}
              </p>
              <h3 className="font-serif text-title-sm text-or-ink">{s.title}</h3>
              <p className="font-sans leading-relaxed text-or-ink-soft">
                {s.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section
        aria-label="Our promise"
        className="mt-20 rounded-md bg-or-ember-wash px-8 py-10 md:px-12"
      >
        <div className="flex flex-col items-start gap-5 md:flex-row md:items-center md:justify-between md:gap-12">
          <p className="max-w-xl font-serif text-title-sm leading-snug text-or-ink">
            You found the filmmaker first. Backing them should mean something —
            and reach them.
          </p>
          <BackFilmButton href="/" className="shrink-0">
            Browse the films
          </BackFilmButton>
        </div>
      </section>
    </article>
  );
}
