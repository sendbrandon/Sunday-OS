/**
 * Sunday-OS · Mixtape catalog
 *
 * Twelve curated DJ mixes seeded as SUN-001 → SUN-012.
 * Higher catalog number = newer / displayed first.
 *
 * Mixcloud URLs verified via web search; spot-check before final commit.
 * Iframe embed format: https://www.mixcloud.com/widget/iframe/?feed=<encoded URL>
 */

export interface Mix {
  catalog: string; // e.g. 'SUN-018'
  djShort: string; // sharpie-scrawl on the card, e.g. 'Frankie K'
  djFull: string; // full name for credits
  title: string; // mix title
  context: string; // 1-line italic Times credit
  duration: string; // human-readable, e.g. '1:01:04'
  mixcloudUrl: string;
}

export const MIXES: Mix[] = [
  {
    catalog: 'SUN-018',
    djShort: 'Frankie K.',
    djFull: 'Frankie Knuckles',
    title: 'Live at the Power Plant',
    context: 'Frankie Knuckles · The Power Plant, Chicago · 1983',
    duration: '90 min',
    mixcloudUrl:
      'https://www.mixcloud.com/gridface/373-frankie108-live-at-the-power-plant-1983/',
  },
  {
    catalog: 'SUN-017',
    djShort: 'Ron Hardy',
    djFull: 'Ron Hardy',
    title: 'Music Box Reels',
    context: 'Ron Hardy · The Music Box, Chicago · 1983',
    duration: '90 min',
    mixcloudUrl:
      'https://www.mixcloud.com/NohashiRecordsToruS/ron-hardy-music-box-chicago-1983/',
  },
  {
    catalog: 'SUN-016',
    djShort: 'Mr. Fingers',
    djFull: 'Larry Heard / Mr. Fingers',
    title: 'Mr. Fingers Music Mix',
    context: 'Larry Heard · 29 December 2006',
    duration: '60 min',
    mixcloudUrl:
      'https://www.mixcloud.com/R_co/larry-heard-mr-fingers-music-mix-29-12-2006/',
  },
  {
    catalog: 'SUN-015',
    djShort: 'Theo Parrish',
    djFull: 'Theo Parrish',
    title: 'Six Hour Mix · NTS Radio',
    context: 'Theo Parrish · NTS Radio · 28 November 2021',
    duration: '6 hrs',
    mixcloudUrl:
      'https://www.mixcloud.com/NTSRadio/theo-parrish-28th-november-2021/',
  },
  {
    catalog: 'SUN-014',
    djShort: 'Larry Levan',
    djFull: 'Larry Levan',
    title: 'Paradise Garage Closing Night',
    context: 'Larry Levan · The Paradise Garage, NYC · 1987',
    duration: '2 hrs',
    mixcloudUrl:
      'https://www.mixcloud.com/djmixes/larry-levan-the-paradise-garage-closing-night-party-1987/',
  },
  {
    catalog: 'SUN-013',
    djShort: 'Kerri Chandler',
    djFull: 'Kerri Chandler',
    title: 'Studio · 7.5 Hour Mix',
    context: 'Kerri Chandler · Studio session · 1 March 2013',
    duration: '7.5 hrs',
    mixcloudUrl:
      'https://www.mixcloud.com/livesetsmagazine/kerri-chandler-studio-75-hours-mix-01-03-2013/',
  },
  {
    catalog: 'SUN-012',
    djShort: 'Moodymann',
    djFull: 'Moodymann',
    title: 'Worldwide FM Session',
    context: 'Moodymann · Worldwide FM · 8 November 2019',
    duration: '60 min',
    mixcloudUrl: 'https://www.mixcloud.com/worldwidefm/moodymann-08-11-19/',
  },
  {
    catalog: 'SUN-011',
    djShort: 'Honey Dijon',
    djFull: 'Honey Dijon',
    title: 'Defected In The House · Guest Mix',
    context: 'Honey Dijon · Defected · 27 June 2016',
    duration: '60 min',
    mixcloudUrl:
      'https://www.mixcloud.com/Defectedrecords/defected-in-the-house-radio-show-270616-guest-mix-honey-dijon/',
  },
  {
    catalog: 'SUN-010',
    djShort: 'Marshall J.',
    djFull: 'Marshall Jefferson',
    title: 'Classic House · DJ Mag HQ',
    context: 'Marshall Jefferson · DJ Mag HQ · classic house set',
    duration: '60 min',
    mixcloudUrl:
      'https://www.mixcloud.com/marshall-jefferson/marshall-jefferson-classic-house-dj-set-from-dj-mag-hq/',
  },
  {
    catalog: 'SUN-009',
    djShort: 'Floating Pts',
    djFull: 'Floating Points',
    title: 'Late Night Tales · Continuous Mix',
    context: 'Floating Points · Late Night Tales',
    duration: '74 min',
    mixcloudUrl:
      'https://www.mixcloud.com/LateNightTalesOfficial/late-night-tales-floating-points-continuous-mix/',
  },
  {
    catalog: 'SUN-008',
    djShort: 'Hunee',
    djFull: 'Hunee',
    title: "Live at Hunchin' All Night",
    context: 'Hunee · Soju Bar, Berlin · March 2011',
    duration: '3 hrs',
    mixcloudUrl:
      'https://www.mixcloud.com/hunee/live-at-hunchin-all-night-soju-bar-berlin-march-2011/',
  },
  {
    catalog: 'SUN-007',
    djShort: "Lil' Louis",
    djFull: 'Lil Louis',
    title: 'Innovator & Founding Father',
    context: "Lil' Louis · curated retrospective · French Kiss era",
    duration: '60 min',
    mixcloudUrl:
      'https://www.mixcloud.com/TheCharlesRiversShow/chicagos-lil-louis-innovator-founding-father-of-house-music/',
  },
];

export const ACTIVE_MIX = MIXES[0]; // SUN-018, latest, plays by default
