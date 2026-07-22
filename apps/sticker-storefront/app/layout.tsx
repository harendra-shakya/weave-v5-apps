import type { Metadata } from 'next';
import { Baloo_2 } from 'next/font/google';
import { CartProvider } from '@/lib/cart';
import { PageHeader } from '@/components/PageHeader';
import { PageFooter } from '@/components/PageFooter';
import './globals.css';

const sans = Baloo_2({ subsets: ['latin'], variable: '--font-sans', weight: ['500', '600', '700', '800'] });

export const metadata: Metadata = {
  title: 'Marginalia — small sticker drops from real artists',
  description:
    'A few sticker packs worth the page. Hand-picked drops from real artists, shown at true size.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={sans.variable}>
      <body className="flex min-h-screen flex-col">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-sun focus:px-6 focus:py-3 focus:text-sm focus:font-extrabold focus:text-ink"
        >
          Skip to main content
        </a>
        <CartProvider>
          <PageHeader />
          <main id="main" className="mx-auto w-full max-w-page flex-1 px-5 pb-24 sm:px-8">
            {children}
          </main>
          <PageFooter />
        </CartProvider>
      </body>
    </html>
  );
}
