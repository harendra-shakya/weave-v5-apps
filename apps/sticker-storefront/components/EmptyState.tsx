import Link from 'next/link';

/** Warm empty/invalid/failure states — tilted candy badge over calm copy. */
export function EmptyState({
  note,
  title,
  body,
  actionLabel,
  actionHref,
  tone = 'neutral',
}: {
  /** short tilted badge, e.g. "an empty page" */
  note?: string;
  title: string;
  body: string;
  actionLabel?: string;
  actionHref?: string;
  tone?: 'neutral' | 'pink';
}) {
  return (
    <div
      className={`mx-auto flex max-w-md flex-col items-center gap-3 rounded-card px-9 py-14 text-center ${
        tone === 'pink' ? 'border-[3px] border-pink bg-cream' : 'bg-cream shadow-pop'
      }`}
    >
      {note && (
        <p className="badge-tilt inline-block rounded-full bg-sun px-4 py-1 text-sm font-bold text-ink">
          {note}
        </p>
      )}
      <h2 className="text-display-sm font-extrabold text-ink">{title}</h2>
      <p className="text-[15px] font-medium leading-relaxed text-ink-soft">{body}</p>
      {actionLabel && actionHref && (
        <Link
          href={actionHref}
          className="mt-3 inline-flex min-h-11 items-center whitespace-nowrap rounded-full bg-mint px-7 font-extrabold text-cream no-underline shadow-mint transition active:translate-y-[3px] active:shadow-mint-sm hover:no-underline"
        >
          {actionLabel}
        </Link>
      )}
    </div>
  );
}
