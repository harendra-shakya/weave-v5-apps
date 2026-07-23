import type { Edition, ArtworkShape } from '@/lib/editions'

const SHAPE_CLASSES: Record<ArtworkShape, string> = {
  disc:   'left-1/2 top-1/2 aspect-square w-[52%] -translate-x-1/2 -translate-y-1/2 rounded-full',
  pill:   'inset-x-[22%] inset-y-[32%] rounded-full',
  vessel: 'bottom-[14%] left-1/2 h-[52%] w-[44%] -translate-x-1/2 rounded-[999px_999px_22px_22px]',
  sun:    'bottom-[-30%] left-1/2 aspect-square w-[64%] -translate-x-1/2 rounded-full',
  pebble: 'left-1/2 top-1/2 aspect-square w-[54%] -translate-x-1/2 -translate-y-1/2 rotate-12 rounded-[42%]',
  column: 'inset-y-[16%] left-1/2 w-[30%] -translate-x-1/2 rounded-full',
}

/** Cozy square art tile: uploaded image for maker stalls, a soft shape otherwise. */
export function EditionArtwork({ edition, className = '' }: { edition: Edition; className?: string }) {
  return (
    <div className={'relative aspect-square w-full overflow-hidden rounded-tile bg-paper ' + className}>
      {edition.image ? (
        // eslint-disable-next-line @next/next/no-img-element -- dataURL uploads can't go through next/image
        <img
          src={edition.image}
          alt={edition.title + ' — ' + edition.artist}
          className="absolute inset-0 h-full w-full object-cover"
        />
      ) : edition.artwork ? (
        <div
          role="img"
          aria-label={edition.title + ' — ' + edition.artist}
          className={'absolute ' + SHAPE_CLASSES[edition.artwork.shape]}
          style={{ background: edition.artwork.color }}
        />
      ) : null}
    </div>
  )
}
