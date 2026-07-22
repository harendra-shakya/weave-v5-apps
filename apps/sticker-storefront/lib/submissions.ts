import type { Size, Finish } from './types';

export type SubmissionStatus = 'submitted' | 'in_review' | 'accepted' | 'in_drop' | 'declined';

export interface SubmissionImage {
  id: string;
  /** dataURL in the demo; a storage URL after the real upload API is wired in */
  src: string;
  name: string;
}

export interface Submission {
  id: string;
  artist: string;
  email: string;
  packName: string;
  link?: string;
  size: Size;
  finish: Finish;
  images: SubmissionImage[];
  status: SubmissionStatus;
  reason?: string;
  at: string; // ISO
}

export const SUB_FLOW: SubmissionStatus[] = ['submitted', 'in_review', 'accepted', 'in_drop'];
export const SUB_LABELS: Record<SubmissionStatus, string> = {
  submitted: 'Submitted',
  in_review: 'In review',
  accepted: 'Accepted',
  in_drop: 'In next drop',
  declined: 'Declined',
};
export const DECLINE_REASON =
  'Not the right fit for this drop — nothing wrong with the work; small drops mean lots of good packs wait. Please try the next one.';

/**
 * Synthetic submission store (localStorage) — swap for the real intake API on
 * port: presigned uploads to object storage, print validation (300 DPI, bleed,
 * cut lines), and a persisted review queue. The curation gate is a brand
 * requirement: uploads land in the pile, never directly on the shelf.
 */
const STORAGE_KEY = 'marginalia.subs.v1';

export function listSubmissions(): Submission[] {
  if (typeof window === 'undefined') return [];
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]');
  } catch {
    return [];
  }
}

function writeAll(subs: Submission[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(subs));
  } catch {
    /* storage quota — keep session-only */
  }
}

export function createSubmission(
  input: Omit<Submission, 'id' | 'status' | 'at'>,
): Submission {
  const sub: Submission = {
    ...input,
    id: `SUB-${Date.now().toString(36).toUpperCase().slice(-5)}`,
    status: 'submitted',
    at: new Date().toISOString(),
  };
  writeAll([sub, ...listSubmissions()]);
  return sub;
}

export function setSubmissionStatus(
  id: string,
  status: SubmissionStatus,
  reason?: string,
): Submission[] {
  const subs = listSubmissions().map((s) =>
    s.id === id ? { ...s, status, reason: reason ?? s.reason } : s,
  );
  writeAll(subs);
  return subs;
}
