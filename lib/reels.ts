/**
 * Sunday-OS · Video reels — Path A (5 PD-verified clips)
 *
 * All five clips are explicit-PD or CC0/CC-BY archive.org items.
 * Each needs a 15–30s trim, exported as .mp4, dropped into /public/reels/.
 * The Player gracefully falls back to the styled placeholder until the file
 * exists — so this data structure is safe to ship before the trims are done.
 *
 * License audit complete; see /sunday/assets/video-shortlist.md for the
 * 7-theme gap and v1.1 licensing path.
 */

export interface Reel {
  id: string; // e.g. 'REEL-002'
  title: string; // archive.org listing title
  context: string; // 1-line italic-Times caption beneath video
  archiveUrl: string;
  license: string;
  filename: string; // expected path under /public/reels/
  durationSec: number; // trimmed clip length target
}

export const REELS: Reel[] = [
  {
    id: 'REEL-002',
    title: 'Amateur Skating Champs',
    context: 'Oakland Auditorium, 1950 — National Roller Skating Championships',
    archiveUrl: 'https://archive.org/details/AmateurS1950',
    license: 'Creative Commons Public Domain',
    filename: '/reels/reel-002-skating.mp4',
    durationSec: 25,
  },
  {
    id: 'REEL-003',
    title: 'All My Babies',
    context: 'Rural Georgia, 1952 — Mary Coley, midwife · National Film Registry',
    archiveUrl: 'https://archive.org/details/all-my-babies-1952',
    license: 'Public Domain Mark 1.0',
    filename: '/reels/reel-003-babies.mp4',
    durationSec: 30,
  },
  {
    id: 'REEL-005',
    title: 'Greenwich Village Sunday',
    context: 'Washington Square, 1960 — San Gennaro, street musicians',
    archiveUrl: 'https://archive.org/details/Greenwic1960',
    license: 'Creative Commons Public Domain',
    filename: '/reels/reel-005-village.mp4',
    durationSec: 22,
  },
  {
    id: 'REEL-006',
    title: 'Palmour Street',
    context: 'Gainesville GA, 1957 — Black family + community life',
    archiveUrl: 'https://archive.org/details/PalmourS1957',
    license: 'Creative Commons Public Domain',
    filename: '/reels/reel-006-palmour.mp4',
    durationSec: 28,
  },
  {
    id: 'REEL-010',
    title: 'Play Street',
    context: 'New York City — PAL Play Street program · stoop life',
    archiveUrl: 'https://archive.org/details/PlayStreet',
    license: 'Creative Commons Public Domain',
    filename: '/reels/reel-010-stoop.mp4',
    durationSec: 20,
  },
];

export const ACTIVE_REEL = REELS[0];
