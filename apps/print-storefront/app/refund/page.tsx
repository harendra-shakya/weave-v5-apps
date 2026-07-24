import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Refund policy' };

export default function RefundPage() {
  return (
    <div className="mx-auto max-w-page px-6 py-16">
      <h1 className="font-display text-display text-ink mb-8">Refund policy</h1>
      <div className="space-y-6 max-w-prose text-sm text-ink-soft leading-relaxed">
        <p><strong className="text-ink">Digital products.</strong> Because Tableau sells digital downloads, files are delivered immediately on purchase. We offer refunds within 24 hours if the file is corrupt or was not delivered.</p>
        <p><strong className="text-ink">How to request.</strong> Email <a href="/contact" className="text-sage hover:text-sage-deep">our support team</a> with your order ID. We process eligible refunds within 2 business days.</p>
        <p><strong className="text-ink">Non-refundable.</strong> Refunds are not issued for change of mind after a file has been downloaded, or where the download link was accessed.</p>
        <p><strong className="text-ink">Cancellations.</strong> Orders may be cancelled within 30 minutes of purchase via the order page, provided the download link has not been used.</p>
        <p className="text-xs text-ink-muted pt-4">Last updated: 2026-07-24 · Synthetic cohort only — these KPIs do not prove real demand, real conversion, or real financial performance.</p>
      </div>
    </div>
  );
}
