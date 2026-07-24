import type { Metadata } from 'next';
import { DM_Serif_Display, DM_Sans } from 'next/font/google';
import './globals.css';
import PageHeader from '@/components/PageHeader';
import PageFooter from '@/components/PageFooter';

const fontDisplay = DM_Serif_Display({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-display',
  display: 'swap',
});

const fontSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: { default: 'Tableau — Art for the wall you actually have', template: '%s | Tableau' },
  description: 'Original digital art posters, print-ready PDF downloads at renter pricing.',
  openGraph: {
    siteName: 'Tableau',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${fontDisplay.variable} ${fontSans.variable}`}>
      <body className="min-h-screen flex flex-col">
        <PageHeader />
        <main id="main-content" className="flex-1">
          {children}
        </main>
        <PageFooter />
      </body>
    </html>
  );
}
