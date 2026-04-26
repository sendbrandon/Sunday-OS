/**
 * Daily Bread — 36-verse KJV matrix.
 * Keyed by `${mood}-${reach}` from the two-question Daily Bread flow.
 */

export type Mood =
  | 'heavy'
  | 'restless'
  | 'weary'
  | 'waiting'
  | 'good'
  | 'blessed';

export type Reach =
  | 'peace'
  | 'strength'
  | 'patience'
  | 'forgiveness'
  | 'direction'
  | 'gratitude';

export type VerseKey = `${Mood}-${Reach}`;

export interface Verse {
  ref: string;
  text: string;
}

export const VERSES: Record<VerseKey, Verse> = {
  'heavy-peace': {
    ref: 'Matthew 11:28',
    text: 'Come unto me, all ye that labour and are heavy laden, and I will give you rest.',
  },
  'heavy-strength': {
    ref: '2 Corinthians 12:9',
    text: 'My grace is sufficient for thee: for my strength is made perfect in weakness.',
  },
  'heavy-patience': {
    ref: 'Romans 5:3-4',
    text: 'We glory in tribulations also: knowing that tribulation worketh patience; and patience, experience; and experience, hope.',
  },
  'heavy-forgiveness': {
    ref: 'Psalm 51:10',
    text: 'Create in me a clean heart, O God; and renew a right spirit within me.',
  },
  'heavy-direction': {
    ref: 'Psalm 23:1-3',
    text: 'The Lord is my shepherd; I shall not want. He maketh me to lie down in green pastures: he leadeth me beside the still waters.',
  },
  'heavy-gratitude': {
    ref: 'Psalm 30:5',
    text: 'Weeping may endure for a night, but joy cometh in the morning.',
  },

  'restless-peace': {
    ref: 'Psalm 46:10',
    text: 'Be still, and know that I am God.',
  },
  'restless-strength': {
    ref: 'Joshua 1:9',
    text: 'Be strong and of a good courage; be not afraid, neither be thou dismayed: for the Lord thy God is with thee whithersoever thou goest.',
  },
  'restless-patience': {
    ref: 'James 1:2-3',
    text: 'Count it all joy when ye fall into divers temptations; knowing this, that the trying of your faith worketh patience.',
  },
  'restless-forgiveness': {
    ref: '1 John 1:9',
    text: 'If we confess our sins, he is faithful and just to forgive us our sins, and to cleanse us from all unrighteousness.',
  },
  'restless-direction': {
    ref: 'Proverbs 3:5-6',
    text: 'Trust in the Lord with all thine heart; and lean not unto thine own understanding. In all thy ways acknowledge him, and he shall direct thy paths.',
  },
  'restless-gratitude': {
    ref: 'Psalm 4:8',
    text: 'I will both lay me down in peace, and sleep: for thou, Lord, only makest me dwell in safety.',
  },

  'weary-peace': {
    ref: 'John 14:27',
    text: 'Peace I leave with you, my peace I give unto you. Let not your heart be troubled, neither let it be afraid.',
  },
  'weary-strength': {
    ref: 'Isaiah 40:31',
    text: 'They that wait upon the Lord shall renew their strength; they shall mount up with wings as eagles.',
  },
  'weary-patience': {
    ref: 'Galatians 6:9',
    text: 'Let us not be weary in well doing: for in due season we shall reap, if we faint not.',
  },
  'weary-forgiveness': {
    ref: 'Lamentations 3:22-23',
    text: 'It is of the Lord\u2019s mercies that we are not consumed. They are new every morning: great is thy faithfulness.',
  },
  'weary-direction': {
    ref: 'Isaiah 30:21',
    text: 'Thine ears shall hear a word behind thee, saying, This is the way, walk ye in it.',
  },
  'weary-gratitude': {
    ref: 'Psalm 103:2',
    text: 'Bless the Lord, O my soul, and forget not all his benefits.',
  },

  'waiting-peace': {
    ref: 'Isaiah 26:3',
    text: 'Thou wilt keep him in perfect peace, whose mind is stayed on thee.',
  },
  'waiting-strength': {
    ref: 'Psalm 31:24',
    text: 'Be of good courage, and he shall strengthen your heart, all ye that hope in the Lord.',
  },
  'waiting-patience': {
    ref: 'Psalm 27:14',
    text: 'Wait on the Lord: be of good courage, and he shall strengthen thine heart: wait, I say, on the Lord.',
  },
  'waiting-forgiveness': {
    ref: 'Micah 7:18',
    text: 'Who is a God like unto thee, that pardoneth iniquity, and passeth by the transgression of the remnant of his heritage?',
  },
  'waiting-direction': {
    ref: 'Habakkuk 2:3',
    text: 'For the vision is yet for an appointed time. Though it tarry, wait for it; because it will surely come, it will not tarry.',
  },
  'waiting-gratitude': {
    ref: 'Lamentations 3:25',
    text: 'The Lord is good unto them that wait for him, to the soul that seeketh him.',
  },

  'good-peace': {
    ref: 'Numbers 6:24-26',
    text: 'The Lord bless thee, and keep thee: the Lord make his face shine upon thee, and be gracious unto thee.',
  },
  'good-strength': {
    ref: 'Nehemiah 8:10',
    text: 'The joy of the Lord is your strength.',
  },
  'good-patience': {
    ref: 'Romans 12:12',
    text: 'Rejoicing in hope; patient in tribulation; continuing instant in prayer.',
  },
  'good-forgiveness': {
    ref: 'Psalm 103:12',
    text: 'As far as the east is from the west, so far hath he removed our transgressions from us.',
  },
  'good-direction': {
    ref: 'Jeremiah 29:11',
    text: 'For I know the thoughts that I think toward you, saith the Lord, thoughts of peace, and not of evil, to give you an expected end.',
  },
  'good-gratitude': {
    ref: 'Psalm 118:24',
    text: 'This is the day which the Lord hath made; we will rejoice and be glad in it.',
  },

  'blessed-peace': {
    ref: 'John 16:33',
    text: 'These things I have spoken unto you, that in me ye might have peace.',
  },
  'blessed-strength': {
    ref: 'Ephesians 6:10',
    text: 'Be strong in the Lord, and in the power of his might.',
  },
  'blessed-patience': {
    ref: 'Colossians 3:12',
    text: 'Put on therefore, kindness, humbleness of mind, meekness, longsuffering.',
  },
  'blessed-forgiveness': {
    ref: 'Ephesians 1:7',
    text: 'In whom we have redemption through his blood, the forgiveness of sins, according to the riches of his grace.',
  },
  'blessed-direction': {
    ref: 'Psalm 37:23',
    text: 'The steps of a good man are ordered by the Lord: and he delighteth in his way.',
  },
  'blessed-gratitude': {
    ref: '1 Thessalonians 5:18',
    text: 'In every thing give thanks: for this is the will of God in Christ Jesus concerning you.',
  },
};

export const MOODS: { id: Mood; label: string }[] = [
  { id: 'heavy', label: 'Heavy' },
  { id: 'restless', label: 'Restless' },
  { id: 'weary', label: 'Weary' },
  { id: 'waiting', label: 'Waiting' },
  { id: 'good', label: 'Good' },
  { id: 'blessed', label: 'Blessed' },
];

export const REACHES: { id: Reach; label: string }[] = [
  { id: 'peace', label: 'Peace' },
  { id: 'strength', label: 'Strength' },
  { id: 'patience', label: 'Patience' },
  { id: 'forgiveness', label: 'Forgiveness' },
  { id: 'direction', label: 'Direction' },
  { id: 'gratitude', label: 'Gratitude' },
];
