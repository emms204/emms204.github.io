/**
 * Question-based navigation (Emmanuel, t55u/t56u, 19 Nov 2026).
 * The site is organised around five visitor questions. Every page belongs to exactly one.
 * Previews in the Index reuse existing copy only (profile.ts, letters, shelf); nothing new is claimed here.
 */
import { atelier, profile, works } from './profile';
import { SHELF_INTRO } from './shelf';

export type QKey = 'build' | 'built' | 'think' | 'about' | 'contact';
export interface Question { key: QKey; n: string; question: string; short: string; lead: string; hint: string; next: QKey[] }

export const START = { label: 'Start a project', href: '/contact/#inquiry' };

export const QUESTIONS: Question[] = [
  { key: 'build', n: '01', question: 'What can you build for me?', short: 'Hire me', lead: '/solutions/', hint: 'Services and products you can use today', next: ['built', 'contact'] },
  { key: 'built', n: '02', question: 'What have you built?', short: 'Work', lead: '/work/', hint: 'Case files and earlier work', next: ['build', 'think'] },
  { key: 'think', n: '03', question: 'How do you think?', short: 'Thinking', lead: '/letters/', hint: 'Letters, the shelf, chess, writing and demos', next: ['about', 'built'] },
  { key: 'about', n: '04', question: 'Who are you?', short: 'About', lead: '/#journey', hint: 'The journey, About and the CV', next: ['build', 'built'] },
  { key: 'contact', n: '05', question: 'How do we start?', short: 'Contact', lead: '/contact/', hint: 'The form, email or WhatsApp', next: ['built', 'think'] },
];
export const Q = Object.fromEntries(QUESTIONS.map((q) => [q.key, q])) as Record<QKey, Question>;

/** Page → question. Aliases (/commission/, /shelf/, /press/, /sign/, /margins/) follow their canonical page. */
export function questionFor(path: string): QKey | null {
  const p = path.replace(/index\.html$/, '').replace(/\.html$/, '/');
  if (p === '/') return 'about';
  if (/^\/(solutions|commission|products|shelf)\//.test(p)) return 'build';
  if (/^\/(work|archive)\//.test(p)) return 'built';
  if (/^\/(letters|chess|journal|press|margins)\//.test(p)) return 'think';
  if (/^\/(contact|sign)\//.test(p)) return 'contact';
  return null; // /index/ and the 404 page are utilities, not answers
}

const first = (s: string) => (s.match(/^.*?[.?!](?=\s|$)/) || [s])[0];

export interface Entry { href: string; title: string; preview: string; board?: boolean; group?: string }
/** Static entries; letters are added at build time by IndexContents (they come from the content collection). */
export const ENTRIES: Record<QKey, Entry[]> = {
  build: [
    { href: '/solutions/', title: 'Solutions', preview: first(works.solutions.intro) },
    { href: '/products/', title: 'Products', preview: first(works.products.intro) },
  ],
  built: [
    { href: '/work/', title: 'All case files', preview: 'Each one moves from sketch (the problem) to ink (the system) to sign (what was approved or shipped).' },
    ...atelier.caseFiles.map((c) => ({ href: `/work/${c.slug}/`, title: c.title, preview: c.summary, group: 'case' })),
    { href: '/archive/', title: 'Archive', preview: atelier.archive.intro },
  ],
  think: [
    { href: '/letters/', title: 'Letters', preview: 'Letters to a friend: a question I can’t put down, argued from both sides.' },
    // letters inserted here
    { href: '/letters/#shelf', title: 'Stays with me', preview: SHELF_INTRO },
    { href: '/letters/#retakes', title: 'Retakes', preview: atelier.margins.retakes.intro },
    { href: '/chess/', title: 'One bullet game, annotated', preview: 'London System, 18 moves, won with a discovered attack on the queen.', board: true },
    { href: '/journal/', title: 'Journal', preview: `${atelier.press.series.title.split(':')[0]}: a three-part series on Medium.` },
    { href: '/#bench', title: 'Demos to try', preview: 'Privacy Lens and Story Engine, two small demos with synthetic data.' },
  ],
  about: [
    { href: '/', title: profile.person.name, preview: works.hero.statement },
    { href: '/#journey', title: 'The engineering journey', preview: first(works.journey.intro) },
    { href: '/#about', title: 'About', preview: first(profile.about.paragraphs[0].replace(/ \(.*?\)/, '')) },
    { href: '/cv.pdf', title: 'CV (PDF)', preview: 'The full record, role by role.' },
  ],
  contact: [
    { href: '/contact/', title: 'Contact', preview: first(works.inquiry.intro) },
  ],
};
