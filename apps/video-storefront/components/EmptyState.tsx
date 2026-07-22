import Link from "next/link";
import { ReelO } from "./Wordmark";

/**
 * EmptyState — first-class empty/invalid states, warm not apologetic.
 * e.g. "Nothing here yet — the next reel is coming."
 */

export function EmptyState({
  title,
  body,
  actionHref,
  actionLabel,
}: {
  title: string;
  body?: string;
  actionHref?: string;
  actionLabel?: string;
}) {
  return (
    <div className="mx-auto flex max-w-measure flex-col items-center gap-4 py-24 text-center">
      <ReelO size={40} className="text-or-line-strong" />
      <h2 className="font-serif text-title-sm text-or-ink">{title}</h2>
      {body && <p className="text-or-ink-soft">{body}</p>}
      {actionHref && actionLabel && (
        <Link
          href={actionHref}
          className="mt-2 font-sans font-semibold text-or-ember underline underline-offset-4 hover:text-or-ember-deep"
        >
          {actionLabel}
        </Link>
      )}
    </div>
  );
}
