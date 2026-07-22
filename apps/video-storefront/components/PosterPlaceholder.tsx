import type { Film } from "@/lib/films";

/**
 * PosterPlaceholder — synthetic, public-safe poster: a muted gradient with
 * the title set like a minimal archival cover. No real stills or imagery.
 * Decorative (aria-hidden) — the title/maker are rendered as text nearby.
 */

const GRAIN =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/%3E%3C/filter%3E%3Crect width='120' height='120' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E\")";

export function PosterPlaceholder({
  film,
  className = "",
}: {
  film: Film;
  className?: string;
}) {
  return (
    <div
      aria-hidden="true"
      className={`relative flex items-center justify-center overflow-hidden rounded-xs ${className}`}
      style={{
        background: `linear-gradient(160deg, ${film.poster.from}, ${film.poster.to})`,
      }}
    >
      {/* film grain */}
      <div
        className="absolute inset-0 opacity-[0.14] mix-blend-overlay"
        style={{ backgroundImage: GRAIN }}
      />
      <p className="relative max-w-[80%] text-center font-serif italic leading-snug text-or-paper/95 [font-size:clamp(1rem,2.2cqw+0.6rem,1.5rem)]">
        {film.title}
      </p>
    </div>
  );
}
