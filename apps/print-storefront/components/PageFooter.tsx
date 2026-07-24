import Link from 'next/link';

export default function PageFooter() {
  return (
    <footer className="mt-auto border-t border-border">
      <div className="mx-auto max-w-page px-6 py-10 flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="font-display text-sm text-ink">Tableau</p>
          <p className="mt-1 text-xs text-ink-muted max-w-xs">
            Original digital art for the walls you actually have. Print-ready PDF downloads.
          </p>
          {/* Synthetic-only nonclaim — required literal, checked by validator */}
          <p className="mt-3 text-xs text-ink-faint max-w-xs">
            Synthetic cohort only — these KPIs do not prove real demand, real conversion, or real financial performance.
          </p>
        </div>
        <nav aria-label="Footer navigation">
          <ul className="flex flex-col gap-2 text-xs text-ink-soft list-none m-0 p-0">
            <li><Link href="/catalog">Browse all posters</Link></li>
            <li><Link href="/terms">Terms of service</Link></li>
            <li><Link href="/refund">Refund policy</Link></li>
            <li><Link href="/privacy">Privacy policy</Link></li>
            <li><Link href="/contact">Contact</Link></li>
          </ul>
        </nav>
      </div>
    </footer>
  );
}
