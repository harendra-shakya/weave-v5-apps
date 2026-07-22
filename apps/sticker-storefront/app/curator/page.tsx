'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  listSubmissions,
  setSubmissionStatus,
  DECLINE_REASON,
  SUB_LABELS,
  type Submission,
  type SubmissionStatus,
} from '@/lib/submissions';
import { EmptyState } from '@/components/EmptyState';

/**
 * Curator review queue (demo — no auth per the skip list; gate behind real
 * staff auth on port). The curation gate is the brand: uploads never reach
 * the shelf without a yes from here.
 */
const BADGE: Record<string, string> = {
  submitted: 'bg-sun text-ink',
  in_review: 'bg-art-blue text-cream',
  accepted: 'bg-mint text-cream',
  in_drop: 'bg-mint text-cream',
  declined: 'bg-pink text-cream',
};

export default function CuratorPage() {
  const [subs, setSubs] = useState<Submission[] | null>(null);
  useEffect(() => setSubs(listSubmissions()), []);
  if (subs === null) return null; // hydrating

  const act = (id: string, status: SubmissionStatus, reason?: string) =>
    setSubs(setSubmissionStatus(id, status, reason));

  return (
    <div className="mx-auto max-w-2xl py-14">
      <div className="flex flex-wrap items-center gap-3.5">
        <h1 className="text-pop text-display font-extrabold">the review pile</h1>
        <span className="badge-tilt whitespace-nowrap rounded-full bg-sun px-3.5 py-1 text-[13px] font-extrabold text-ink shadow-sun">
          curator view · demo
        </span>
      </div>
      <p className="mt-2.5 max-w-lg text-[15px] font-semibold leading-relaxed text-lavender">
        Chosen, not dumped: every pack gets a personal read and a real reason. Nothing goes to
        the shelf without a yes from here.
      </p>

      {subs.length === 0 ? (
        <div className="mt-7">
          <EmptyState
            title="The pile is clear."
            body="New submissions from the sell page land here for review."
            actionLabel="try the artist upload"
            actionHref="/sell"
          />
        </div>
      ) : (
        <ul className="mt-7 flex list-none flex-col gap-6">
          {subs.map((sb) => (
            <li key={sb.id} className="rounded-card bg-cream px-7 py-6 shadow-pop">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h2 className="text-xl font-extrabold text-ink">
                  {sb.packName} <span className="text-[15px] font-bold text-pink">by {sb.artist}</span>
                </h2>
                <span className={`whitespace-nowrap rounded-full px-3.5 py-1 text-[13px] font-extrabold ${BADGE[sb.status]}`}>
                  {sb.status === 'in_drop' ? 'in the next drop!' : SUB_LABELS[sb.status].toLowerCase()}
                </span>
              </div>
              <p className="mt-1 text-[13px] font-semibold text-ink-faint">
                {sb.size} · {sb.finish} · {sb.images.length}{' '}
                {sb.images.length === 1 ? 'sticker' : 'stickers'} · submitted{' '}
                {new Date(sb.at).toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}
                {sb.link ? <> · <a href={sb.link} target="_blank" rel="noreferrer">portfolio</a></> : null}
              </p>
              <ul className="mt-3.5 flex list-none flex-wrap gap-2">
                {sb.images.map((im) => (
                  <li key={im.id}>
                    {/* eslint-disable-next-line @next/next/no-img-element -- dataURL preview */}
                    <img src={im.src} alt={im.name} className="h-[72px] w-[72px] rounded-2xl border-4 border-cream bg-cream-bright object-cover shadow-sticker" />
                  </li>
                ))}
              </ul>
              <div className="mt-4 flex flex-wrap items-center gap-3 border-t-[3px] border-dashed border-line pt-4">
                {sb.status === 'submitted' && (
                  <button
                    type="button"
                    onClick={() => act(sb.id, 'in_review')}
                    className="whitespace-nowrap rounded-full border-[3px] border-purple px-5 py-2 text-sm font-extrabold text-purple hover:bg-purple/10"
                  >
                    start review
                  </button>
                )}
                {sb.status === 'in_review' && (
                  <>
                    <button
                      type="button"
                      onClick={() => act(sb.id, 'accepted')}
                      className="whitespace-nowrap rounded-full bg-mint px-6 py-2.5 text-sm font-extrabold text-cream shadow-mint transition active:translate-y-0.5 active:shadow-mint-sm"
                    >
                      accept
                    </button>
                    <button
                      type="button"
                      onClick={() => act(sb.id, 'declined', DECLINE_REASON)}
                      className="whitespace-nowrap rounded-full border-[3px] border-pink px-5 py-2 text-sm font-extrabold text-pink-deep hover:bg-pink/10"
                    >
                      decline, kindly
                    </button>
                  </>
                )}
                {sb.status === 'accepted' && (
                  <button
                    type="button"
                    onClick={() => act(sb.id, 'in_drop')}
                    className="whitespace-nowrap rounded-full bg-sun px-6 py-2.5 text-sm font-extrabold text-ink shadow-sun transition active:translate-y-0.5 active:shadow-sun-sm"
                  >
                    add to the next drop
                  </button>
                )}
                {sb.status === 'in_drop' && (
                  <p className="text-sm font-bold text-mint-deep">
                    Slotted for the next drop — the artist has been told.
                  </p>
                )}
                {sb.status === 'declined' && (
                  <p className="text-[13px] font-semibold text-ink-soft">
                    Declined with a reason — the artist heard it warmly.
                  </p>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}

      <Link
        href="/sell/submissions"
        className="mt-6 inline-block whitespace-nowrap rounded-full bg-cream/30 px-4 py-1.5 text-sm font-bold text-cream no-underline hover:bg-cream hover:text-purple hover:no-underline"
      >
        ← back to the artist view
      </Link>
    </div>
  );
}
