/**
 * Generic candy step tracker — used by FulfillmentStatus (orders) and the
 * submission tracker (seller flow).
 */
export function StepTracker({
  steps,
  current,
  ariaLabel,
}: {
  steps: { label: string; note?: string }[];
  current: number;
  ariaLabel: string;
}) {
  return (
    <ol aria-label={ariaLabel} className="flex">
      {steps.map((step, i) => {
        const done = i < current;
        const active = i === current;
        const on = done || active;
        return (
          <li key={step.label} className="relative flex flex-1 flex-col gap-2.5">
            {i < steps.length - 1 && (
              <span
                aria-hidden
                className={`absolute left-8 top-3.5 h-1 w-[calc(100%-2rem)] rounded-full ${
                  done ? 'bg-mint' : 'bg-line'
                }`}
              />
            )}
            <span
              aria-hidden
              className={`relative z-10 box-border flex h-8 w-8 items-center justify-center rounded-full border-[3px] text-sm font-extrabold ${
                on ? 'border-mint bg-mint text-cream' : 'border-line bg-cream-bright text-ink-faint'
              } ${active ? 'ring-[5px] ring-mint/25' : ''}`}
            >
              {done ? '✓' : i + 1}
            </span>
            <div>
              <p
                className={`text-sm font-extrabold ${on ? 'text-ink' : 'text-ink-faint'}`}
                aria-current={active ? 'step' : undefined}
              >
                {step.label}
                {active && <span className="sr-only"> (current)</span>}
              </p>
              {active && step.note && (
                <p className="mt-1 max-w-[160px] text-xs font-semibold leading-snug text-ink-soft">
                  {step.note}
                </p>
              )}
            </div>
          </li>
        );
      })}
    </ol>
  );
}
