'use client';
import type { Pack, VariantSelection, Size, Finish } from '@/lib/types';
import { formatCents } from '@/lib/format';

const FINISH_DESC: Record<string, string> = {
  Matte: 'no glare',
  Glossy: 'vivid, light-catching',
  'Clear matte': 'see-through',
};

function delta(cents: number): string | undefined {
  if (cents === 0) return undefined;
  return cents > 0 ? `+${formatCents(cents)}` : formatCents(cents);
}

export function VariantSelector({
  pack,
  value,
  onChange,
}: {
  pack: Pack;
  value: VariantSelection;
  onChange: (v: VariantSelection) => void;
}) {
  const baseSize = pack.sizes[0];
  const baseFinish = pack.finishes[0];
  const baseSheets = pack.sheetsAvailable[0];

  return (
    <div className="flex flex-col gap-5">
      <Group
        legend="Size"
        name={`${pack.id}-size`}
        options={pack.sizes.map((s) => ({
          value: s,
          label: s,
          hint: s === 'A6' ? '148 × 105 mm' : '210 × 148 mm',
          badge: delta(pack.pricing.sizeDeltaCents[s] - pack.pricing.sizeDeltaCents[baseSize]),
        }))}
        selected={value.size}
        onSelect={(size) => onChange({ ...value, size: size as Size })}
      />
      <Group
        legend="Finish"
        name={`${pack.id}-finish`}
        options={pack.finishes.map((f) => ({
          value: f,
          label: f,
          hint: FINISH_DESC[f],
          badge: delta(pack.pricing.finishDeltaCents[f] - pack.pricing.finishDeltaCents[baseFinish]),
        }))}
        selected={value.finish}
        onSelect={(finish) => onChange({ ...value, finish: finish as Finish })}
      />
      <Group
        legend="Sheet count"
        name={`${pack.id}-sheets`}
        options={pack.sheetsAvailable.map((n) => ({
          value: String(n),
          label: n === 1 ? '1 sheet' : `${n} sheets`,
          badge: delta((n - baseSheets) * pack.pricing.extraSheetCents),
        }))}
        selected={String(value.sheets)}
        onSelect={(n) => onChange({ ...value, sheets: Number(n) })}
      />
    </div>
  );
}

export function Group({
  legend,
  name,
  options,
  selected,
  onSelect,
}: {
  legend: string;
  name: string;
  options: { value: string; label: string; hint?: string; badge?: string }[];
  selected: string;
  onSelect: (value: string) => void;
}) {
  return (
    <fieldset>
      <legend className="mb-2 text-sm font-extrabold uppercase tracking-[0.06em] text-ink-faint">
        {legend}
      </legend>
      <div className="flex flex-wrap gap-2">
        {options.map((opt) => (
          <label key={opt.value} className="cursor-pointer">
            <input
              type="radio"
              name={name}
              value={opt.value}
              checked={selected === opt.value}
              onChange={() => onSelect(opt.value)}
              className="peer sr-only"
            />
            <span className="inline-flex shrink-0 flex-col whitespace-nowrap rounded-2xl border-[3px] border-line bg-cream-bright px-4 py-2 text-[15px] font-bold text-ink-soft transition-colors peer-checked:border-purple peer-checked:bg-purple/10 peer-checked:text-ink peer-focus-visible:ring-[3px] peer-focus-visible:ring-sun peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-cream hover:border-purple/50">
              <span className="flex items-baseline gap-1.5">
                {opt.label}
                {opt.badge && (
                  <span className="text-xs font-semibold text-pink-deep">{opt.badge}</span>
                )}
              </span>
              {opt.hint && (
                <span className="text-[11px] font-semibold text-ink-faint leading-tight">{opt.hint}</span>
              )}
            </span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}
