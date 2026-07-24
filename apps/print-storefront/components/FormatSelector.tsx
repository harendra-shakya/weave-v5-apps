'use client';
import type { Format } from '@/lib/types';

interface FormatSelectorProps {
  available: Format[];
  selected: Format;
  onChange: (f: Format) => void;
}

const FORMAT_LABELS: Record<Format, string> = {
  A4:     'A4 (210 × 297 mm)',
  A3:     'A3 (297 × 420 mm)',
  Letter: 'US Letter (8.5 × 11 in)',
};

export default function FormatSelector({ available, selected, onChange }: FormatSelectorProps) {
  return (
    <fieldset>
      <legend className="label-caption mb-3">Format</legend>
      <div className="flex flex-wrap gap-2">
        {(['A4', 'A3', 'Letter'] as Format[]).map((f) => {
          const enabled = available.includes(f);
          const active  = selected === f;
          return (
            <button
              key={f}
              type="button"
              disabled={!enabled}
              aria-pressed={active}
              onClick={() => enabled && onChange(f)}
              className={[
                'px-4 py-2 text-xs border rounded-control font-sans transition-colors min-h-[44px]',
                active
                  ? 'bg-sage-deep text-white border-sage-deep'
                  : enabled
                  ? 'border-border text-ink-soft hover:border-sage hover:text-sage'
                  : 'border-border text-ink-faint cursor-not-allowed opacity-50',
              ].join(' ')}
            >
              {f}
            </button>
          );
        })}
      </div>
      <p className="mt-2 text-xs text-ink-muted">{FORMAT_LABELS[selected]}</p>
    </fieldset>
  );
}
