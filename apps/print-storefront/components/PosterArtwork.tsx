// Generated placeholder artwork — no external assets (public-safe)
interface PosterArtworkProps {
  title: string;
  palette: 'sage' | 'parchment' | 'slate';
  className?: string;
}

const PALETTES = {
  sage:     { bg: '#e8f0ea', stripe: '#4A7C59', text: '#2F593D' },
  parchment:{ bg: '#f5efe3', stripe: '#c8a96e', text: '#7a5c30' },
  slate:    { bg: '#e8ecf0', stripe: '#6a8fa8', text: '#3a5f73' },
};

export default function PosterArtwork({ title, palette, className = '' }: PosterArtworkProps) {
  const { bg, stripe, text } = PALETTES[palette];
  const lines = title.split(' ');

  return (
    <svg
      viewBox="0 0 400 560"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label={`Placeholder artwork for ${title}`}
      className={className}
    >
      <rect width="400" height="560" fill={bg} />
      {/* Geometric stripes */}
      <rect x="0" y="200" width="400" height="4" fill={stripe} opacity="0.5" />
      <rect x="0" y="280" width="400" height="8" fill={stripe} opacity="0.3" />
      <rect x="0" y="360" width="400" height="2" fill={stripe} opacity="0.4" />
      <rect x="60" y="0" width="2" height="560" fill={stripe} opacity="0.2" />
      <rect x="340" y="0" width="2" height="560" fill={stripe} opacity="0.2" />
      {/* Title lettering */}
      {lines.map((word, i) => (
        <text
          key={i}
          x="200"
          y={220 + i * 36}
          textAnchor="middle"
          fontFamily="Georgia, serif"
          fontSize="22"
          fill={text}
          opacity="0.85"
          aria-hidden="true"
        >
          {word}
        </text>
      ))}
      {/* Bottom label bar */}
      <rect x="0" y="520" width="400" height="40" fill={stripe} opacity="0.12" />
      <text x="200" y="545" textAnchor="middle" fontFamily="monospace" fontSize="11" fill={text} opacity="0.6" aria-hidden="true">
        DIGITAL PRINT · TABLEAU
      </text>
    </svg>
  );
}
