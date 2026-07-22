import { SubmitFilmForm } from "@/components/SubmitFilmForm";

/** For filmmakers — list a short, set the price, get backed. */

export const metadata = {
  title: "For filmmakers — OneReel",
};

const PROMISES = [
  {
    title: "Your name above the fold",
    body: "The maker's credit sits on every card, every page. Patrons back you, not a platform.",
  },
  {
    title: "You set the price",
    body: "One film, one price — no bundle math deciding what your work is worth.",
  },
  {
    title: "Straight to you",
    body: "Every backing goes straight to the maker. We keep the path short, and we say it plainly.",
  },
];

export default function FilmmakersPage() {
  return (
    <div className="mx-auto max-w-page px-6 py-16 md:px-10 md:py-24">
      <header className="max-w-3xl">
        <p className="font-sans text-xs font-semibold uppercase tracking-[0.18em] text-or-ember">
          For filmmakers
        </p>
        <h1 className="mt-5 font-serif text-title-lg text-or-ink">
          Your film. Your price. Your name on it.
        </h1>
        <p className="mt-6 max-w-measure font-sans text-lg leading-relaxed text-or-ink-soft">
          OneReel is where patrons back the maker directly. List your short,
          set the price, and it&apos;s in the catalog — buyable the moment you hit
          the button.
        </p>
      </header>

      <div className="mt-14 grid gap-12 lg:grid-cols-[minmax(0,32rem)_minmax(0,24rem)] lg:gap-24">
        <SubmitFilmForm />

        <aside aria-label="What you get" className="flex h-fit flex-col">
          {PROMISES.map((p) => (
            <div
              key={p.title}
              className="border-t border-or-line py-5 last:border-b"
            >
              <h2 className="font-serif text-title-sm text-or-ink">
                {p.title}
              </h2>
              <p className="mt-2 font-sans leading-relaxed text-or-ink-soft">
                {p.body}
              </p>
            </div>
          ))}
        </aside>
      </div>
    </div>
  );
}
