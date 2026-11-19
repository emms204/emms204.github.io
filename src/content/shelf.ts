/**
 * "Stays with me" shelf (Emmanuel, t53u, 19 Nov 2026): stories he named, sorted by the question each asks.
 * Text only: no images, posters, stills, logos or quotes from the works.
 *
 * DRAFT COPY: every `line` below is a placeholder written from Emmanuel's reasons
 * ("the courage to not give up; an alternative life view, the alternate decision; the possibility of more,
 * no end to ambition; the branding, the cosmetic; the description of who God is and why we can challenge it").
 * Emmanuel to rewrite each line in his own words before publishing.
 */
export interface ShelfRow {
  question: string;
  lead: { title: string; medium: string };
  line: string; // DRAFT copy for Emmanuel to rewrite
  also: { title: string; note?: string }[];
  letter?: { slug: string; title: string };
}

export const SHELF_INTRO = 'Stories that stayed with me, sorted by the question they keep asking rather than by what they are.';

export const shelf: ShelfRow[] = [
  {
    question: 'Why not give up?',
    lead: { title: 'Re:Zero − Starting Life in Another World', medium: 'Anime' },
    line: 'DRAFT: Subaru’s only power sends him back after he dies, and every return costs him something. He goes again anyway.',
    also: [{ title: 'Demon Slayer' }, { title: 'Naruto' }, { title: 'Berserk' }],
    letter: { slug: 'worth-the-wait', title: 'Worth the wait' },
  },
  {
    question: 'What if everyone else is wrong?',
    lead: { title: 'Orb: On the Movements of the Earth', medium: 'Anime' },
    line: 'DRAFT: People risk everything for an idea the authorities of their time call heresy: that the Earth moves.',
    also: [{ title: 'Monster' }],
  },
  {
    question: 'Does wanting more ever end?',
    lead: { title: 'One Piece', medium: 'Anime' },
    line: 'DRAFT: A whole world sets out after one treasure, and the search becomes the point.',
    also: [{ title: 'Tower of God' }, { title: 'Shangri-La Frontier' }, { title: 'Peaky Blinders' }],
    letter: { slug: 'do-as-i-say-not-as-i-do', title: 'Do as I say, not as I do' },
  },
  {
    question: 'What does the image hide?',
    lead: { title: 'The Crown', medium: 'TV series' },
    line: 'DRAFT: The person and the institution are never quite the same thing, and the image has to hold.',
    also: [{ title: 'The Originals' }],
  },
  {
    question: 'Who gets to say what god is?',
    lead: { title: 'Lord of the Mysteries', medium: 'Novel' },
    line: 'DRAFT: Divinity is something people climb toward, so what a god is gets examined, not accepted.',
    also: [{ title: 'Orb: On the Movements of the Earth', note: 'also under “What if everyone else is wrong?”' }],
    letter: { slug: 'sorrow-sorrow-prayers', title: 'Sorrow, sorrow, prayers' },
  },
];
