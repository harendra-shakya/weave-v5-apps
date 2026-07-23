import type { Edition } from '@/lib/editions'

/** Renders the edition number, e.g. "no. 7 of 50". */
export function EditionMark({
  number,
  of,
  display = false,
  color,
}: {
  number: number
  of: number
  display?: boolean
  color?: string
}) {
  if (display) {
    return (
      <p className="flex flex-wrap items-baseline gap-2.5">
        <span className="text-6xl font-black leading-none text-accent sm:text-7xl">no. {number}</span>
        <span className="text-xl font-extrabold text-faint sm:text-2xl">of {of}</span>
      </p>
    )
  }
  return (
    <p className="text-xs font-extrabold" style={color ? { color } : undefined}>
      no. {number} of {of}
    </p>
  )
}

/** Catalogue-card mark line — edition number prominent, count secondary. */
export function EditionMarkLine({ edition }: { edition: Edition }) {
  return (
    <div>
      <p className="text-[16px] font-black leading-tight" style={{ color: edition.accentColor }}>
        no. {edition.nextNumber}
      </p>
      <p className="text-[11px] font-extrabold text-muted">
        just {edition.editionSize} made
      </p>
    </div>
  )
}
