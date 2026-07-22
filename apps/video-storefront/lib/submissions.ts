import type { Film } from "./films";

/**
 * Maker submissions — synthetic "upload" flow. Listed films live in
 * localStorage (this browser only) and merge into the catalog client-side.
 * Real distribution (uploads, payout accounts, review) is backend work;
 * swap this module for an API client later — everything consumes `Film`.
 */

export interface SubmissionInput {
  title: string;
  maker: string;
  runtimeMin: number;
  priceCents: number;
  logline: string;
  /** Private screener link — stored, never fetched (synthetic). */
  screenerUrl?: string;
}

const KEY = "onereel.makerFilms";

/** Muted poster palette, assigned round-robin (public-safe placeholders). */
const PALETTE: Array<{ from: string; to: string }> = [
  { from: "#87927D", to: "#4F5B47" },
  { from: "#7B8A9C", to: "#3D4A5C" },
  { from: "#B39A6B", to: "#7A6338" },
  { from: "#9C8578", to: "#5E4B41" },
  { from: "#8E9DA4", to: "#4E5F66" },
  { from: "#A48A96", to: "#64505C" },
];

function read(): (Film & { screenerUrl?: string })[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(window.localStorage.getItem(KEY) ?? "[]");
  } catch {
    return [];
  }
}

function slugify(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function getSubmittedFilms(): Film[] {
  return read();
}

export function findSubmittedFilm(id: string): Film | undefined {
  return read().find((f) => f.id === id);
}

export function addSubmittedFilm(input: SubmissionInput): Film {
  const existing = read();
  let id = slugify(input.title) || "untitled";
  while (existing.some((f) => f.id === id)) id = `${id}-2`;
  const film: Film & { screenerUrl?: string } = {
    id,
    title: input.title.trim(),
    maker: input.maker.trim(),
    year: new Date().getFullYear(),
    runtimeMin: input.runtimeMin,
    priceCents: input.priceCents,
    logline: input.logline.trim(),
    synopsis: input.logline.trim(),
    poster: PALETTE[existing.length % PALETTE.length],
    screenerUrl: input.screenerUrl?.trim() || undefined,
  };
  window.localStorage.setItem(KEY, JSON.stringify([...existing, film]));
  return film;
}
