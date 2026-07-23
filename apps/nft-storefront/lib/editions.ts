export type ArtworkShape = 'disc' | 'pill' | 'vessel' | 'sun' | 'pebble' | 'column'

export interface Edition {
  id: string
  title: string
  artist: string
  year: number
  editionSize: number
  nextNumber: number
  medium: string
  format: string
  catalogueNo: string
  issued: string
  cardBg: string
  accentColor: string
  artwork?: { shape: ArtworkShape; color: string }
  image?: string
  mine?: boolean
}

export const editions: Edition[] = [
  {
    id: 'plum-moon',
    title: 'Plum Moon',
    artist: 'Sable Hirsch',
    year: 2026,
    editionSize: 50,
    nextNumber: 7,
    medium: 'Digital painting',
    format: 'Square · 2400 × 2400 px',
    catalogueNo: 'KS-001',
    issued: 'June 2026',
    cardBg: '#EFE6F8',
    accentColor: '#8A6FB8',
    artwork: { shape: 'disc', color: '#7C5BA8' },
  },
  {
    id: 'peach-interval',
    title: 'Peach Interval',
    artist: 'Orla Mende',
    year: 2025,
    editionSize: 25,
    nextNumber: 3,
    medium: 'Generative art',
    format: 'Landscape · 3200 × 2400 px',
    catalogueNo: 'KS-002',
    issued: 'November 2025',
    cardBg: '#FCE8D8',
    accentColor: '#DE8B5A',
    artwork: { shape: 'pill', color: '#E8956A' },
  },
  {
    id: 'mint-vessel',
    title: 'Mint Vessel',
    artist: 'Cleo Tanaka',
    year: 2026,
    editionSize: 100,
    nextNumber: 14,
    medium: 'Digital sculpture',
    format: 'Portrait · 2400 × 3200 px',
    catalogueNo: 'KS-003',
    issued: 'May 2026',
    cardBg: '#DEF0E6',
    accentColor: '#5FA284',
    artwork: { shape: 'vessel', color: '#4E9070' },
  },
  {
    id: 'butter-sun',
    title: 'Butter Sun',
    artist: 'Fenwick Osei',
    year: 2026,
    editionSize: 30,
    nextNumber: 1,
    medium: 'Mixed media',
    format: 'Square · 2400 × 2400 px',
    catalogueNo: 'KS-004',
    issued: 'July 2026',
    cardBg: '#FBF0D2',
    accentColor: '#D9A83C',
    artwork: { shape: 'sun', color: '#E8B840' },
  },
  {
    id: 'rose-pebble',
    title: 'Rose Pebble',
    artist: 'Vida Sorensen',
    year: 2025,
    editionSize: 15,
    nextNumber: 9,
    medium: 'Digital photography',
    format: 'Square · 2400 × 2400 px',
    catalogueNo: 'KS-005',
    issued: 'September 2025',
    cardBg: '#FADDE4',
    accentColor: '#D96C8A',
    artwork: { shape: 'pebble', color: '#E07898' },
  },
  {
    id: 'blue-hour',
    title: 'Blue Hour',
    artist: 'Idris Patel',
    year: 2026,
    editionSize: 75,
    nextNumber: 22,
    medium: 'Generative art',
    format: 'Landscape · 3200 × 2400 px',
    catalogueNo: 'KS-006',
    issued: 'March 2026',
    cardBg: '#DEEAF6',
    accentColor: '#6A93C4',
    artwork: { shape: 'column', color: '#5A80B8' },
  },
]
