import type { Poster } from './types';

export const POSTERS: Poster[] = [
  {
    id: 'poster-001',
    title: 'Morning Latitude',
    artist: 'C. Delmar',
    price_cents: 1200,
    currency: 'USD',
    category: 'Abstract',
    description: 'Horizontal bands of warm neutrals — a study in the light before the day starts.',
    available_formats: ['A4', 'A3', 'Letter'],
    art_palette: 'parchment',
  },
  {
    id: 'poster-002',
    title: 'Broken Column Study',
    artist: 'M. Vasanta',
    price_cents: 1000,
    currency: 'USD',
    category: 'Drawing',
    description: 'Graphite study of classical column fragments. Monochrome, precise.',
    available_formats: ['A4', 'Letter'],
    art_palette: 'slate',
  },
  {
    id: 'poster-003',
    title: 'Tide Charts of Lake Nowhere',
    artist: 'R. Osei',
    price_cents: 1400,
    currency: 'USD',
    category: 'Cartographic',
    description: 'An invented lake mapped with the rigour of a real hydrological survey.',
    available_formats: ['A3', 'Letter'],
    art_palette: 'slate',
  },
  {
    id: 'poster-004',
    title: 'Interior with Houseplant I',
    artist: 'C. Delmar',
    price_cents: 800,
    currency: 'USD',
    category: 'Interior',
    description: 'A quiet corner. One plant. Afternoon light. Series of three.',
    available_formats: ['A4', 'A3'],
    art_palette: 'sage',
  },
  {
    id: 'poster-005',
    title: 'Atlas of Small Continents',
    artist: 'L. Pryce',
    price_cents: 1800,
    currency: 'USD',
    category: 'Cartographic',
    description: 'Seven invented land masses, named and surveyed. Ships in a tube from the artist. (Synthetic — digital download only.)',
    available_formats: ['A3', 'Letter'],
    art_palette: 'parchment',
  },
  {
    id: 'poster-006',
    title: 'Three Colour Study',
    artist: 'M. Vasanta',
    price_cents: 1000,
    currency: 'USD',
    category: 'Abstract',
    description: 'Red, yellow, blue. One square each. Nothing more.',
    available_formats: ['A4', 'A3', 'Letter'],
    art_palette: 'sage',
  },
];

export const FEATURED_IDS = ['poster-001', 'poster-004', 'poster-005'];

export function getPoster(id: string): Poster | undefined {
  return POSTERS.find((p) => p.id === id);
}

export function getPostersByCategory(category: string): Poster[] {
  return POSTERS.filter((p) => p.category === category);
}

export const CATEGORIES = [...new Set(POSTERS.map((p) => p.category))];
