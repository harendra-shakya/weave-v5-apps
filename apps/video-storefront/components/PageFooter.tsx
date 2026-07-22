import Link from "next/link";
import { Wordmark } from "./Wordmark";

export function PageFooter() {
  return (
    <footer className="mt-24 border-t border-or-line">
      <div className="mx-auto flex max-w-page flex-col gap-8 px-6 py-12 md:px-10">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-col gap-2">
            <Wordmark size="sm" />
            <p className="font-serif italic text-or-ink-soft">
              Buy the film, not the plan.
            </p>
          </div>
          <nav
            aria-label="Footer"
            className="flex gap-6 font-sans text-sm font-medium"
          >
            <Link
              href="/"
              className="text-or-ink-soft no-underline transition-colors hover:text-or-ember"
            >
              Films
            </Link>
            <Link
              href="/about"
              className="text-or-ink-soft no-underline transition-colors hover:text-or-ember"
            >
              Why OneReel
            </Link>
            <Link
              href="/filmmakers"
              className="text-or-ink-soft no-underline transition-colors hover:text-or-ember"
            >
              Bring us your film
            </Link>
          </nav>
        </div>
        <p className="font-sans text-xs text-or-ink-soft">
          OneReel is a synthetic demo. Films, makers, and payments are
          fictional — no real charges, no real distribution.
        </p>
      </div>
    </footer>
  );
}
