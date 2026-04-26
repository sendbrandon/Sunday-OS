/**
 * Sunday-OS · Video reels — curated B&W set
 *
 * Eight reels, all explicit-PD verified on archive.org or NARA, all
 * black-and-white, all locked to the Black community / Black church /
 * Black empowerment / diasporic-devotion arc. No randoms.
 *
 * The reel-rotation in DesktopShell picks one at random on first mount;
 * each visitor lands on a different opening clip.
 *
 * License audit complete; see /sunday/assets/video-shortlist.md for the
 * gap themes still needing commercial-clearance licensing in v1.1.
 */

export type ReelTheme =
  | 'church'
  | 'community'
  | 'empowerment'
  | 'labor'
  | 'children'
  | 'music';

export interface Reel {
  id: string;
  theme: ReelTheme;
  title: string;
  context: string; // 1-line italic-Times caption beneath video
  archiveUrl: string;
  license: string;
  filename: string;
  durationSec: number;
}

export const REELS: Reel[] = [
  {
    id: 'REEL-013',
    theme: 'empowerment',
    title: 'The March on Washington',
    context: 'Washington D.C., 28 August 1963 — USIA original',
    archiveUrl: 'https://archive.org/details/gov.archives.arc.49737',
    license: 'Public Domain (NARA / USIA, Record Group 306)',
    filename: '/reels/reel-013-march.mp4',
    durationSec: 180,
  },
  {
    id: 'REEL-014',
    theme: 'empowerment',
    title: 'Martin Luther King · Clip Reel',
    context: 'NARA Black History Month compilation · USIA',
    archiveUrl: 'https://archive.org/details/gov.archives.arc.54547',
    license: 'Public Domain (NARA)',
    filename: '/reels/reel-014-mlk.mp4',
    durationSec: 180,
  },
  {
    id: 'REEL-015',
    theme: 'church',
    title: 'The Negro Soldier · Church Interior',
    context: 'Frank Capra / NARA · 1944 — minister, congregation, hymnal',
    archiveUrl: 'https://archive.org/details/gov.archives.arc.35956',
    license: 'CC0 1.0 Universal (NARA)',
    filename: '/reels/reel-015-negro-soldier.mp4',
    durationSec: 180,
  },
  {
    id: 'REEL-016',
    theme: 'church',
    title: 'The Blood of Jesus · Baptism',
    context: 'Spencer Williams · 1941 · National Film Registry',
    archiveUrl: 'https://archive.org/details/blood_of_jesus',
    license: 'Public Domain',
    filename: '/reels/reel-016-blood-of-jesus.mp4',
    durationSec: 180,
  },
  {
    id: 'REEL-017',
    theme: 'labor',
    title: 'Henry Browne, Farmer',
    context: 'USDA · 1942 · Black Georgia farm family — hands, soil, kitchen',
    archiveUrl: 'https://archive.org/details/HenryBro1942',
    license: 'Public Domain (US Government work)',
    filename: '/reels/reel-017-henry-browne.mp4',
    durationSec: 180,
  },
  {
    id: 'REEL-003',
    theme: 'community',
    title: 'All My Babies',
    context: 'George Stoney · 1953 · Mary Coley, midwife, rural Georgia',
    archiveUrl: 'https://archive.org/details/all-my-babies-1952',
    license: 'Public Domain Mark 1.0 (National Film Registry)',
    filename: '/reels/reel-003-babies.mp4',
    durationSec: 180,
  },
  {
    id: 'REEL-006',
    theme: 'community',
    title: 'Palmour Street',
    context: 'Gainesville GA · 1957 · Black Southern community life',
    archiveUrl: 'https://archive.org/details/PalmourS1957',
    license: 'Creative Commons Public Domain',
    filename: '/reels/reel-006-palmour.mp4',
    durationSec: 180,
  },
  {
    id: 'REEL-010',
    theme: 'children',
    title: 'Play Street',
    context: 'New York City · PAL Play Street program · stoop life',
    archiveUrl: 'https://archive.org/details/PlayStreet',
    license: 'Creative Commons Public Domain',
    filename: '/reels/reel-010-stoop.mp4',
    durationSec: 180,
  },
  {
    id: 'REEL-002',
    theme: 'community',
    title: 'Amateur Skating Champs',
    context: 'Oakland Auditorium · 1950 · National Roller Skating Championships',
    archiveUrl: 'https://archive.org/details/AmateurS1950',
    license: 'Creative Commons Public Domain',
    filename: '/reels/reel-002-skating.mp4',
    durationSec: 70,
  },
  {
    id: 'REEL-005',
    theme: 'community',
    title: 'Greenwich Village Sunday',
    context: 'Washington Square · 1960 · San Gennaro, street musicians',
    archiveUrl: 'https://archive.org/details/Greenwic1960',
    license: 'Creative Commons Public Domain',
    filename: '/reels/reel-005-village.mp4',
    durationSec: 180,
  },
];

// Active reel = first in list. The actual reel shown is randomized
// client-side on first mount (see DesktopShell), so this is just the
// stable SSR fallback.
export const ACTIVE_REEL = REELS[0];
