import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Terms of service' };

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-page px-6 py-16">
      <h1 className="font-display text-display text-ink mb-8">Terms of service</h1>
      <div className="prose-tableau space-y-6 max-w-prose text-sm text-ink-soft leading-relaxed">
        <p><strong className="text-ink">Synthetic notice.</strong> Tableau is a fictional commerce app built for synthetic testing. No real purchases, payments, or downloads occur. All products, prices, and transactions are simulated.</p>
        <p><strong className="text-ink">License.</strong> Digital files are licensed for personal use only. Redistribution, resale, or commercial use is not permitted.</p>
        <p><strong className="text-ink">Refunds.</strong> Refund eligibility is governed by our <a href="/refund" className="text-sage hover:text-sage-deep">refund policy</a>. Because files are delivered digitally, refunds are issued at our discretion within 24 hours of purchase.</p>
        <p><strong className="text-ink">Payment.</strong> All payments are processed synthetically. No real card data is transmitted or stored.</p>
        <p><strong className="text-ink">Changes.</strong> These terms may change at any time. Continued use constitutes acceptance.</p>
        <p className="text-xs text-ink-muted pt-4">Last updated: 2026-07-24 · Synthetic cohort only — these KPIs do not prove real demand, real conversion, or real financial performance.</p>
      </div>
    </div>
  );
}
