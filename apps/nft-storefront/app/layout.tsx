import type { Metadata } from 'next'
import { Nunito } from 'next/font/google'
import './globals.css'
import { CollectionProvider } from '@/lib/collection'
import { MakersProvider } from '@/lib/makers'
import { PageHeader } from '@/components/PageHeader'
import { PageFooter } from '@/components/PageFooter'

const sans = Nunito({ subsets: ['latin'], weight: ['600', '700', '800', '900'], variable: '--font-sans' })

export const metadata: Metadata = {
  title: 'Vitrine — Own the edition. Skip the wallet.',
  description: 'Numbered digital editions with clear provenance and a shelf you\'re proud of — no wallet, no gas, no speculation.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={sans.variable}>
      <body className="flex min-h-screen flex-col font-sans">
        <CollectionProvider>
          <MakersProvider>
            <PageHeader />
            <main className="flex-1">{children}</main>
            <PageFooter />
          </MakersProvider>
        </CollectionProvider>
      </body>
    </html>
  )
}
