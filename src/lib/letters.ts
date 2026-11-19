import { getCollection, type CollectionEntry } from 'astro:content';

export type Letter = CollectionEntry<'letters'>;

/** Published letters only (drafts never reach the build), lead letter first. */
export async function getLetters(): Promise<Letter[]> {
  const all = await getCollection('letters', ({ data }) => !data.draft);
  return all.sort((a, b) => a.data.order - b.data.order);
}

const plain = (md: string) => md.replace(/<!--[\s\S]*?-->/g, '').replace(/[*_#>`[\]()-]/g, ' ');

export function wordCount(md = ''): number {
  return plain(md).split(/\s+/).filter(Boolean).length;
}

/** Reading time at 220 words per minute, rounded up, minimum 1. */
export function readingMinutes(md = ''): number {
  return Math.max(1, Math.ceil(wordCount(md) / 220));
}

/** First paragraph as an excerpt, cut on a word boundary. */
export function excerpt(md = '', max = 260): string {
  const paras = md.replace(/<!--[\s\S]*?-->/g, '').trim().split(/\n\s*\n/).map((x) => x.replace(/[*_\\]/g, '').replace(/\s+/g, ' ').trim());
  let p = '';
  for (const x of paras) { if (/^[-<>]/.test(x)) break; p = p ? `${p} ${x}` : x; if (p.length >= 160) break; }
  if (p.length <= max) return p;
  return p.slice(0, p.lastIndexOf(' ', max)).replace(/[,;:]$/, '') + '…';
}
