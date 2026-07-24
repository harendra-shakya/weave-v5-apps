import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = { title: 'Contact' };

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-page px-6 py-16">
      <h1 className="font-display text-display text-ink mb-4">Contact</h1>
      <p className="text-sm text-ink-soft mb-10 max-w-prose">
        Questions about an order, a download issue, or licensing? We typically respond within one business day.
      </p>

      <div className="max-w-prose space-y-8">
        <div className="border border-border rounded-card p-6 space-y-2">
          <p className="label-caption">Support</p>
          <p className="text-sm text-ink">support@tableau.example</p>
          <p className="text-xs text-ink-muted">For order issues, download problems, and refund requests. Include your order ID.</p>
        </div>

        <div className="border border-border rounded-card p-6 space-y-2">
          <p className="label-caption">Licensing enquiries</p>
          <p className="text-sm text-ink">licensing@tableau.example</p>
          <p className="text-xs text-ink-muted">For commercial use, institutional licensing, or bulk orders.</p>
        </div>

        <p className="text-xs text-ink-muted">
          Before reaching out, check our{' '}
          <Link href="/refund" className="text-sage hover:text-sage-deep">refund policy</Link>
          {' '}and{' '}
          <Link href="/terms" className="text-sage hover:text-sage-deep">terms of service</Link>.
        </p>

        <p className="text-xs text-ink-faint">
          Tableau is a synthetic demo. These email addresses are illustrative — no messages are delivered.
        </p>
      </div>
    </div>
  );
}
