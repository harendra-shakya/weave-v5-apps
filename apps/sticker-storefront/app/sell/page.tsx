'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import type { Size, Finish } from '@/lib/types';
import { createSubmission, listSubmissions, type SubmissionImage } from '@/lib/submissions';
import { Group } from '@/components/VariantSelector';

/**
 * Artist upload — curated intake, deliberately NOT open marketplace self-serve
 * (brand: drops are chosen, not dumped). Demo: files are read in-browser as
 * dataURLs and never leave the machine. On port, swap for presigned uploads +
 * print validation (300 DPI, bleed, cut lines) feeding the review queue.
 */
const MAX_FILES = 12;

export default function SellPage() {
  const router = useRouter();
  const [images, setImages] = useState<SubmissionImage[]>([]);
  const [size, setSize] = useState<Size>('A6');
  const [finish, setFinish] = useState<Finish>('Matte');
  const [rights, setRights] = useState(false);
  const [hasSubs, setHasSubs] = useState(false);
  const [errors, setErrors] = useState<{ name?: string; email?: string; pack?: string; images?: string; rights?: string }>({});

  useEffect(() => setHasSubs(listSubmissions().length > 0), []);

  function readFiles(files: FileList | null) {
    Array.from(files ?? [])
      .filter((f) => f.type.startsWith('image/'))
      .slice(0, MAX_FILES)
      .forEach((f) => {
        const r = new FileReader();
        r.onload = () =>
          setImages((prev) =>
            prev.length >= MAX_FILES
              ? prev
              : [...prev, { id: Math.random().toString(36).slice(2), src: String(r.result), name: f.name }],
          );
        r.readAsDataURL(f);
      });
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const val = (k: string) => String(f.get(k) ?? '').trim();
    const errs: typeof errors = {};
    if (!val('name')) errs.name = 'Tell us the name to credit.';
    if (!/^\S+@\S+\.\S+$/.test(val('email'))) errs.email = 'Enter an email so we can reply.';
    if (!val('pack')) errs.pack = 'Give the pack a working title.';
    if (images.length === 0) errs.images = 'Add at least one sticker image.';
    if (!rights) errs.rights = 'Please confirm the work is yours before submitting.';
    setErrors(errs);
    if (Object.keys(errs).length) return;
    createSubmission({
      artist: val('name'),
      email: val('email'),
      packName: val('pack'),
      link: val('link') || undefined,
      size,
      finish,
      images,
    });
    router.push('/sell/submissions?submitted=1');
  }

  const inputCls =
    'w-full rounded-control border-[3px] border-line bg-cream-bright px-3.5 py-2.5 text-base font-semibold text-ink placeholder:text-ink-faint focus:border-purple';
  const err = (msg?: string) =>
    msg ? (
      <p role="alert" className="text-xs font-bold text-pink-deep">
        {msg}
      </p>
    ) : null;

  return (
    <article className="mx-auto max-w-2xl py-16 sm:py-20">
      <div className="text-center">
        <p className="badge-tilt inline-block rounded-full bg-pink px-5 py-1 text-[15px] font-extrabold text-cream shadow-pink">
          for artists
        </p>
        <h1 className="text-pop mx-auto mt-4 max-w-xl text-display-lg font-extrabold [text-wrap:pretty]">
          You make the stickers. We make the case for them.
        </h1>
        <p className="mx-auto mt-4 max-w-lg font-semibold leading-relaxed text-lavender [text-wrap:pretty]">
          Marginalia isn&rsquo;t an open marketplace — every drop is chosen, not dumped. Submit a
          pack, and if it makes the shelf you get your name on every card, true-scale photography
          of your sheets, and a small catalog where nobody has to scroll past you.
        </p>
      </div>

      <ol className="mt-9 grid list-none gap-4 sm:grid-cols-3">
        {(
          [
            ['Submit a pack.', 'Your artwork files and a working title — theme, sheet size, finish you have in mind.'],
            ['We review it, personally.', 'The catalog stays small on purpose, so we say no more than yes — but you’ll hear back within two weeks, with a reason.'],
            ['Your drop ships, credited.', 'We handle printing, packing, and fulfillment. Your name is on the pack, the page, and the receipt.'],
          ] as const
        ).map(([title, body], i) => (
          <li key={title} className="rounded-card bg-cream p-5 shadow-pop-sm">
            <span aria-hidden className="flex h-7 w-7 items-center justify-center rounded-full bg-sun text-sm font-extrabold text-ink">
              {i + 1}
            </span>
            <p className="mt-2.5 text-[17px] font-extrabold text-ink">{title}</p>
            <p className="mt-1 text-[13px] font-medium leading-relaxed text-ink-soft">{body}</p>
          </li>
        ))}
      </ol>

      <form onSubmit={handleSubmit} noValidate className="mt-8 flex flex-col gap-5 rounded-card bg-cream p-8 shadow-pop">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <h2 className="text-display-sm font-extrabold text-ink">upload your pack</h2>
          {hasSubs && <Link href="/sell/submissions" className="whitespace-nowrap text-sm">your submissions →</Link>}
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="sell-name" className="text-sm font-bold text-ink">Your name (as credited)</label>
            <input id="sell-name" name="name" autoComplete="name" className={inputCls} />
            {err(errors.name)}
          </div>
          <div className="flex flex-col gap-1.5">
            <label htmlFor="sell-email" className="text-sm font-bold text-ink">Email</label>
            <input id="sell-email" name="email" type="email" autoComplete="email" className={inputCls} />
            {err(errors.email)}
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="sell-pack" className="text-sm font-bold text-ink">Pack name (working title)</label>
          <input id="sell-pack" name="pack" placeholder="e.g. Tide Pool Tuesdays" className={inputCls} />
          {err(errors.pack)}
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="sell-link" className="text-sm font-bold text-ink">
            Where we can see your work{' '}
            <span className="font-medium text-ink-faint">(portfolio, shop, or social — optional)</span>
          </label>
          <input id="sell-link" name="link" type="url" placeholder="https://" className={inputCls} />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="sell-files" className="text-sm font-bold text-ink">
            Sticker artwork{' '}
            <span className="font-medium text-ink-faint">(PNG or JPG — each file becomes one die-cut sticker, up to {MAX_FILES})</span>
          </label>
          <div
            onDrop={(e) => { e.preventDefault(); readFiles(e.dataTransfer.files); }}
            onDragOver={(e) => e.preventDefault()}
            className="flex flex-col items-center gap-2 rounded-2xl border-[3px] border-dashed border-lavender-deep bg-cream-bright p-6 text-center"
          >
            <input
              id="sell-files"
              type="file"
              multiple
              accept="image/png,image/jpeg,image/webp"
              onChange={(e) => { readFiles(e.target.files); e.target.value = ''; }}
              className="sr-only"
            />
            <p className="text-[15px] font-bold text-purple">drag &amp; drop your stickers here</p>
            <label
              htmlFor="sell-files"
              className="cursor-pointer whitespace-nowrap rounded-full bg-purple px-6 py-2 text-sm font-extrabold text-cream shadow-pop-sm"
            >
              or browse files
            </label>
            <p className="text-xs font-semibold text-ink-faint">
              {images.length} {images.length === 1 ? 'sticker' : 'stickers'} added
            </p>
          </div>
          {images.length > 0 && (
            <ul className="flex list-none flex-wrap gap-2.5 pt-1">
              {images.map((im) => (
                <li key={im.id} className="relative">
                  {/* eslint-disable-next-line @next/next/no-img-element -- dataURL preview */}
                  <img src={im.src} alt={im.name} className="block h-[72px] w-[72px] rounded-2xl border-4 border-cream bg-cream-bright object-cover shadow-sticker" />
                  <button
                    type="button"
                    onClick={() => setImages((prev) => prev.filter((x) => x.id !== im.id))}
                    aria-label={`Remove ${im.name}`}
                    className="absolute -right-1.5 -top-1.5 flex h-[22px] w-[22px] items-center justify-center rounded-full bg-pink text-xs font-extrabold leading-none text-cream"
                  >
                    ×
                  </button>
                </li>
              ))}
            </ul>
          )}
          {err(errors.images)}
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <Group
            legend="Sheet size"
            name="sub-size"
            options={[
              { value: 'A6', label: 'A6', hint: '148 × 105 mm' },
              { value: 'A5', label: 'A5', hint: '210 × 148 mm' },
            ]}
            selected={size}
            onSelect={(v) => setSize(v as Size)}
          />
          <Group
            legend="Finish you'd want"
            name="sub-finish"
            options={[
              { value: 'Matte', label: 'Matte' },
              { value: 'Glossy', label: 'Glossy' },
              { value: 'Clear matte', label: 'Clear matte' },
            ]}
            selected={finish}
            onSelect={(v) => setFinish(v as Finish)}
          />
        </div>

        {images.length > 0 && (
          <div className="flex flex-col gap-1.5">
            <p className="text-sm font-extrabold uppercase tracking-[0.06em] text-ink-faint">
              how it&rsquo;ll sit on the sheet ({size === 'A6' ? '148 × 105 mm' : '210 × 148 mm'})
            </p>
            <div
              className={`flex w-full max-w-md flex-wrap content-center items-center justify-center gap-2.5 overflow-hidden rounded-2xl border-[3px] border-line bg-cream-bright p-4 ${
                size === 'A6' ? 'aspect-[148/105]' : 'aspect-[210/148]'
              }`}
            >
              {images.map((im) => (
                // eslint-disable-next-line @next/next/no-img-element -- dataURL preview
                <img key={im.id} src={im.src} alt="" aria-hidden className="h-16 w-16 rounded-xl border-4 border-cream object-cover shadow-sticker" />
              ))}
            </div>
          </div>
        )}

        <div className="flex flex-col gap-1.5">
          <label className="flex cursor-pointer items-start gap-2.5">
            <input
              type="checkbox"
              checked={rights}
              onChange={() => setRights((r) => !r)}
              className="mt-0.5 h-5 w-5 shrink-0 accent-mint"
            />
            <span className="text-sm font-semibold leading-relaxed text-ink-soft">
              This is my original work — I hold the rights, and it contains no one else&rsquo;s
              characters, logos, or likenesses.
            </span>
          </label>
          {err(errors.rights)}
        </div>

        <button
          type="submit"
          className="inline-flex min-h-12 items-center justify-center self-start whitespace-nowrap rounded-full bg-mint px-8 text-lg font-extrabold text-cream shadow-mint transition active:translate-y-[3px] active:shadow-mint-sm"
        >
          submit for review
        </button>
        <p className="text-xs font-semibold text-ink-faint">
          Demo — files stay in this browser; nothing is uploaded to a server. Your work stays
          yours, always.
        </p>
      </form>
    </article>
  );
}
