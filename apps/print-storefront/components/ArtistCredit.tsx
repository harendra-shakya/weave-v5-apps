interface ArtistCreditProps {
  artist: string;
  category?: string;
  format?: string;
}

export default function ArtistCredit({ artist, category, format }: ArtistCreditProps) {
  const parts = [
    category && `Category: ${category}`,
    'Medium: Digital print',
    'Edition: Open',
    format && `Format: ${format}`,
  ].filter(Boolean);

  return (
    <div>
      <p className="label-caption">{artist}</p>
      {parts.length > 0 && (
        <p className="label-caption mt-0.5 text-ink-faint">{parts.join(' · ')}</p>
      )}
    </div>
  );
}
