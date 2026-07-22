import type { Metadata } from "next";
import { Newsreader, Source_Sans_3 } from "next/font/google";
import "./globals.css";
import { PageHeader } from "@/components/PageHeader";
import { PageFooter } from "@/components/PageFooter";

const serif = Newsreader({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--or-font-serif",
  display: "swap",
});

const sans = Source_Sans_3({
  subsets: ["latin"],
  variable: "--or-font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "OneReel — Back indie filmmakers, one film at a time",
  description:
    "The patron's channel for indie shorts. You back the filmmaker, one film at a time, straight to the maker.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${serif.variable} ${sans.variable}`}>
      <body className="flex min-h-screen flex-col">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-sm focus:bg-or-ink focus:px-4 focus:py-2 focus:text-or-paper"
        >
          Skip to main content
        </a>
        <PageHeader />
        <main id="main" className="flex-1">
          {children}
        </main>
        <PageFooter />
      </body>
    </html>
  );
}
