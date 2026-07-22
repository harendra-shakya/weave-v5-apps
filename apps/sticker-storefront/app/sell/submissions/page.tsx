'use client';
import { Suspense, useEffect, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { listSubmissions, SUB_FLOW, SUB_LABELS, type Submission } from '@/lib/submissions';
import { StepTracker } from '@/components/StepTracker';
import { EmptyState } from '@/components/EmptyState';

const BADGE: Record<string, string> = {
  submitted: 'bg-sun text-ink',
  in_review: 'bg-art-blue text-cream',
  accepted: 'bg-mint text-cream',
  in_drop: 'bg-mint text-cream',
  declined: 'bg-pink text-cream',
};

function SubmissionsList() {
  const justSubmitted = useSearchParams().get('submitted') === '1';
  const [subs, setSubs] = useState<Submission[] | null>(null);
  useEffect(() => setSubs(listSubmissions()), []);
  if (subs === null) return null; // hydrating

  return (
    <div className="mx-auto max-w-2xl py-14">
      {justSubmitted && (
        <div role="status" className="mb-7 flex flex-wrap items-center gap-4 rounded-card bg-cream px-7 py-6 shadow-pop">
          <span className="badge-tilt whitespace-nowrap rounded-full bg-sun px-5 py-1.5 font-extrabold text-ink shadow-sun">
            on our desk!
          </span>
          <p className="min-w-[220px] flex-1 text-sm font-semibold leading-relaxed text-ink-soft">
            We read every submission ourselves — no algorithm, no queue number. You&rsquo;ll hear
            back within two weeks, with a real reason either way.
          </p>
        </div>
      )}
      <h1 className="text-pop text-display font-extrabold">your submissions</h1>

      {subs.length === 0 ? (
        <div className="mt-7">
          <EmptyState
            title="Nothing in the pile yet."
            body="Upload a pack and it lands here, with a tracker so you always know where it stands."
            actionLabel="upload a pack"
            actionHref="/sell"
          />
        </div>
      ) : (
        <>
          <ul className="mt-7 flex list-none flex-col gap-6">
            {subs.map((sb) => (
              <li key={sb.id} className="rounded-card bg-cream px-7 py-6 shadow-pop">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h2 className="text-2xl font-extrabold text-ink">{sb.packName}</h2>
                  <span className={`whitespace-nowrap rounded-full px-3.5 py-1 text-[13px] font-extrabold ${BADGE[sb.status]}`}>
                    {sb.status === 'in_drop' ? 'in the next drop!' : SUB_LABELS[sb.status].toLowerCase()}
                  </span>
                </div>
                <p className="mt-1 text-[13px] font-semibold text-ink-faint">
                  {sb.size} · {sb.finish} · {sb.images.length}{' '}
                  {sb.images.length === 1 ? 'sticker' : 'stickers'} · submitted{' '}
                  {new Date(sb.at).toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}
                </p>
                <ul className="mt-3.5 flex list-none flex-wrap gap-2">
                  {sb.images.map((im) => (
                    <li key={im.id}>
                      {/* eslint-disable-next-line @next/next/no-img-element -- dataURL preview */}
                      <img src={im.src} alt={im.name} className="h-14 w-14 rounded-xl border-[3px] border-cream bg-cream-bright object-cover shadow-sticker" />
                    </li>
                  ))}
                </ul>
                {sb.status === 'declined' ? (
                  <div className="mt-4 rounded-2xl border-[3px] border-pink bg-pink/10 px-5 py-3.5">
                    <p className="text-sm font-extrabold text-pink-deep">Not this drop — but keep making.</p>
                    <p className="mt-1 text-[13px] font-semibold leading-relaxed text-ink-soft">{sb.reason}</p>
                  </div>
                ) : (
                  <div className="mt-5">
                    <StepTracker
                      ariaLabel={`Progress of ${sb.packName}`}
                      current={SUB_FLOW.indexOf(sb.status)}
                      steps={SUB_FLOW.map((s) => ({ label: SUB_LABELS[s] }))}
                    />
                  </div>
                )}
              </li>
            ))}
          </ul>
          <p className="mt-5 text-[13px] font-semibold text-lavender-deep">
            Waiting on the curators?{' '}
            <Link href="/curator" className="text-sun hover:text-cream">
              peek at the curator side (demo) →
            </Link>
          </p>
        </>
      )}
    </div>
  );
}

export default function SubmissionsPage() {
  return (
    <Suspense>
      <SubmissionsList />
    </Suspense>
  );
}
