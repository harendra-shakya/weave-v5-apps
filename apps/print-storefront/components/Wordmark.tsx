import Link from 'next/link';

export default function Wordmark() {
  return (
    <Link href="/" aria-label="Tableau — return to homepage" className="no-underline hover:no-underline">
      <span className="font-display text-xl tracking-tight text-ink">Tableau</span>
    </Link>
  );
}
