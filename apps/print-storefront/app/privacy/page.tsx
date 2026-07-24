import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Privacy policy' };

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-page px-6 py-16">
      <h1 className="font-display text-display text-ink mb-8">Privacy policy</h1>
      <div className="space-y-6 max-w-prose text-sm text-ink-soft leading-relaxed">
        <p><strong className="text-ink">What we collect.</strong> Tableau collects only the information needed to process your order: email address and payment details. No account is created.</p>
        <p><strong className="text-ink">Storage.</strong> Order and cart data is stored locally in your browser (localStorage). No data is transmitted to a server in this synthetic demo.</p>
        <p><strong className="text-ink">Cookies.</strong> We do not use tracking or advertising cookies. Only essential cookies necessary for the checkout flow are used.</p>
        <p><strong className="text-ink">Third parties.</strong> No data is shared with third parties. Payment processing is simulated and no real card data is transmitted.</p>
        <p><strong className="text-ink">Retention.</strong> You can clear all stored data at any time by clearing your browser's localStorage.</p>
        <p className="text-xs text-ink-muted pt-4">Last updated: 2026-07-24 · Synthetic cohort only — these KPIs do not prove real demand, real conversion, or real financial performance.</p>
      </div>
    </div>
  );
}
