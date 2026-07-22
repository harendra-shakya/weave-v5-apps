/**
 * MakerCredit — the filmmaker's name, always visible, always in ember.
 * Brand proof point: "The maker's name is always visible on the film."
 */

type Size = "sm" | "md" | "lg";

const NAME_SIZE: Record<Size, string> = {
  sm: "text-sm",
  md: "text-base",
  lg: "text-lg",
};

export function MakerCredit({
  name,
  prefix = "A film by",
  size = "md",
}: {
  name: string;
  prefix?: string;
  size?: Size;
}) {
  return (
    <p className="flex flex-wrap items-baseline gap-x-2 font-sans">
      <span className="text-xs font-medium uppercase tracking-[0.14em] text-or-ink-soft">
        {prefix}
      </span>
      <span className={`font-semibold text-or-ember ${NAME_SIZE[size]}`}>
        {name}
      </span>
    </p>
  );
}
