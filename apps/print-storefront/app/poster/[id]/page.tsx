'use client';
import { use, useState } from 'react';
import { notFound } from 'next/navigation';
import { getPoster } from '@/lib/catalog';
import PosterArtwork from '@/components/PosterArtwork';
import ArtistCredit from '@/components/ArtistCredit';
import PriceTag from '@/components/PriceTag';
import FormatSelector from '@/components/FormatSelector';
import AddToCartButton from '@/components/AddToCartButton';
import EmptyState from '@/components/EmptyState';
import type { Format } from '@/lib/types';
import Link from 'next/link';

interface Props { params: Promise<{ id: string }> }

export default function PosterDetailPage({ params }: Props) {
  const { id } = use(params);
  const poster = getPoster(id);

  if (!poster) {
    return (
      <EmptyState
        heading="Poster not found"
        body="This poster doesn't exist or may have been removed from the collection."
        cta={{ label: 'Browse all posters', href: '/catalog' }}
      />
    );
  }

  const defaultFormat = poster.available_formats[0];
  const [format, setFormat] = useState<Format>(defaultFormat);
  const [added, setAdded] = useState(false);

  return (
    <div className="mx-auto max-w-page px-6 py-10">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="mb-8">
        <ol className="flex items-center gap-2 text-xs text-ink-muted list-none p-0 m-0">
          <li><Link href="/" className="hover:text-sage">Home</Link></li>
          <li aria-hidden="true">·</li>
          <li><Link href="/catalog" className="hover:text-sage">Collection</Link></li>
          <li aria-hidden="true">·</li>
          <li aria-current="page" className="text-ink-soft">{poster.title}</li>
        </ol>
      </nav>

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16">
        {/* Artwork */}
        <div className="rounded-card overflow-hidden border border-border bg-white-surface">
          <PosterArtwork title={poster.title} palette={poster.art_palette} className="w-full" />
        </div>

        {/* Details */}
        <div className="flex flex-col gap-6">
          <div>
            <h1 className="font-display text-display text-ink leading-tight">{poster.title}</h1>
            <ArtistCredit artist={poster.artist} category={poster.category} format={format} />
          </div>

          <p className="text-sm text-ink-soft leading-relaxed">{poster.description}</p>

          <div className="rule-thin" />

          <FormatSelector
            available={poster.available_formats}
            selected={format}
            onChange={setFormat}
          />

          <div className="flex items-center gap-4">
            <PriceTag cents={poster.price_cents} className="text-base" />
          </div>

          <AddToCartButton
            posterId={poster.id}
            format={format}
            onAdded={() => {
              setAdded(true);
              window.dispatchEvent(new Event('tableau:cart-updated'));
            }}
          />

          {added && (
            <p className="text-xs text-sage text-center" role="status">
              Added to collection —{' '}
              <Link href="/cart" className="font-medium">view cart</Link>
            </p>
          )}

          <div className="rule-thin" />

          {/* Nonclaim / info */}
          <ul className="space-y-1.5 text-xs text-ink-muted list-none p-0 m-0">
            <li>· Instant PDF download after purchase</li>
            <li>· Print at home or at a local print shop</li>
            <li>· Digital license — personal use only (synthetic)</li>
            <li>· All artwork is a fictional synthetic design</li>
          </ul>
        </div>
      </div>

      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Product',
            name: poster.title,
            description: poster.description,
            offers: {
              '@type': 'Offer',
              price: (poster.price_cents / 100).toFixed(2),
              priceCurrency: poster.currency,
              availability: 'https://schema.org/InStock',
            },
          }),
        }}
      />
    </div>
  );
}
