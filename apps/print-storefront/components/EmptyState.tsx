import Link from 'next/link';

interface EmptyStateProps {
  heading: string;
  body: string;
  cta?: { label: string; href: string };
}

export default function EmptyState({ heading, body, cta }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center px-6">
      <div className="w-12 h-px bg-border mb-8" aria-hidden="true" />
      <h2 className="font-display text-display-sm text-ink mb-3">{heading}</h2>
      <p className="text-sm text-ink-soft max-w-sm">{body}</p>
      {cta && (
        <Link href={cta.href} className="mt-6 inline-block text-sm font-medium text-sage hover:text-sage-deep">
          {cta.label}
        </Link>
      )}
    </div>
  );
}
