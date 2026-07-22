"use client";

import { useEffect, useState } from "react";
import type { Film } from "./films";
import { findSubmittedFilm } from "./submissions";

/**
 * Resolves a film by id: curated catalog first (resolved on the server),
 * then maker submissions (client-side, localStorage). `ready` gates
 * rendering so hydration stays clean.
 */
export function useFilm(
  id: string,
  staticFilm: Film | null
): { ready: boolean; film: Film | null } {
  const [state, setState] = useState({ ready: !!staticFilm, film: staticFilm });

  useEffect(() => {
    if (!staticFilm) {
      setState({ ready: true, film: findSubmittedFilm(id) ?? null });
    }
  }, [id, staticFilm]);

  return state;
}
