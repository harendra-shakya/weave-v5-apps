import type { Edition } from '@/lib/editions'

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <>
      <dt className="font-semibold text-muted">{label}</dt>
      <dd className="m-0 font-bold">{children}</dd>
    </>
  )
}

/** "The little details" — the keepsake's provenance card. */
export function DetailsBlock({ edition }: { edition: Edition }) {
  return (
    <section className="rounded-card bg-paper px-6 py-5">
      <h2 className="text-sm font-extrabold text-accent">The little details</h2>
      <dl className="mt-3 grid grid-cols-[120px_1fr] gap-x-4 gap-y-2.5 text-[13.5px]">
        <Row label="Made by">{edition.artist}</Row>
        <Row label="Year">{edition.year}</Row>
        <Row label="Edition">Just {edition.editionSize}, numbered by hand</Row>
        <Row label="Made with">{edition.medium}</Row>
        <Row label="Size">{edition.format}</Row>
        <Row label="Keepsake no.">{edition.catalogueNo}</Row>
        <Row label="Arrived">{edition.issued}</Row>
      </dl>
    </section>
  )
}
