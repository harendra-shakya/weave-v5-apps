import { formatPrice, formatRuntime } from "@/lib/films";

/** PriceTag — one film, one price. Serif, like a printed programme. */

type Size = "sm" | "md" | "lg";

const SIZE: Record<Size, string> = {
  sm: "text-base",
  md: "text-lg",
  lg: "text-title-sm",
};

export function PriceTag({
  cents,
  runtimeMin,
  size = "md",
}: {
  cents: number;
  runtimeMin?: number;
  size?: Size;
}) {
  return (
    <span className={`font-serif text-or-ink ${SIZE[size]}`}>
      {formatPrice(cents)}
      {runtimeMin !== undefined && (
        <span className="text-or-ink-soft"> · {formatRuntime(runtimeMin)}</span>
      )}
    </span>
  );
}
