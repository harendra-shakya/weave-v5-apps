import Link from "next/link";
import { Wordmark } from "./Wordmark";
import { DemoUserChip } from "./DemoUserChip";

export function PageHeader() {
  return (
    <header className="border-b border-or-line">
      <div className="mx-auto flex max-w-page items-center justify-between gap-6 px-6 py-5 md:px-10">
        <Link href="/" aria-label="OneReel home" className="no-underline">
          <Wordmark />
        </Link>
        <nav
          aria-label="Main"
          className="flex items-center gap-5 font-sans text-sm font-semibold sm:gap-8"
        >
          <Link
            href="/"
            className="text-or-ink no-underline transition-colors hover:text-or-ember"
          >
            Films
          </Link>
          <Link
            href="/about"
            className="text-or-ink no-underline transition-colors hover:text-or-ember"
          >
            Why OneReel
          </Link>
          <Link
            href="/filmmakers"
            className="text-or-ink no-underline transition-colors hover:text-or-ember"
          >
            For filmmakers
          </Link>
          <DemoUserChip />
        </nav>
      </div>
    </header>
  );
}
