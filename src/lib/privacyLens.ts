/**
 * Privacy Lens — a front-end ILLUSTRATION of rule-based PII masking.
 * Not the AnotiAI SDK (which is a hybrid transformer + QA + rules detector).
 * Pure functions: used at build time (static before/after) and in the browser.
 * No network calls.
 */
export type EntityType = 'PERSON' | 'EMAIL' | 'PHONE' | 'ACCOUNT' | 'DATE';
export type Segment = { text: string; type?: EntityType; token?: string };
export type LensResult = { segments: Segment[]; map: { token: string; type: EntityType; value: string }[]; counts: Record<EntityType, number> };

// Order matters: earlier rules win when matches overlap.
const RULES: { type: EntityType; re: RegExp }[] = [
  { type: 'EMAIL', re: /[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/g },
  { type: 'ACCOUNT', re: /\b(?:ACCT-\d{4}-\d{4}|[A-Z]{2}\d{2}(?: ?[A-Z0-9]{4}){3,7}(?: ?[A-Z0-9]{1,3})?)\b/g },
  { type: 'PHONE', re: /\+\d{1,3}(?:[ -]?\d{2,4}){2,4}\b/g },
  { type: 'DATE', re: /\b(?:\d{4}-\d{2}-\d{2}|\d{1,2} (?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]* \d{4})\b/g },
  { type: 'PERSON', re: /\b(?:Mr|Ms|Mrs|Dr|Prof)\.? [A-Z][a-z]+(?: [A-Z][a-z]+)?/g },
];
export const TYPES: EntityType[] = ['PERSON', 'EMAIL', 'PHONE', 'ACCOUNT', 'DATE'];

export function lens(text: string): LensResult {
  const hits: { start: number; end: number; type: EntityType }[] = [];
  for (const { type, re } of RULES) {
    re.lastIndex = 0;
    for (const m of text.matchAll(re)) {
      const start = m.index ?? 0, end = start + m[0].length;
      if (!hits.some((h) => start < h.end && end > h.start)) hits.push({ start, end, type });
    }
  }
  hits.sort((a, b) => a.start - b.start);
  const counts = Object.fromEntries(TYPES.map((t) => [t, 0])) as Record<EntityType, number>;
  const seen = new Map<string, string>();
  const map: LensResult['map'] = [];
  const segments: Segment[] = [];
  let i = 0;
  for (const h of hits) {
    if (h.start > i) segments.push({ text: text.slice(i, h.start) });
    const value = text.slice(h.start, h.end);
    let token = seen.get(h.type + '|' + value);
    if (!token) { counts[h.type]++; token = `[${h.type}_${counts[h.type]}]`; seen.set(h.type + '|' + value, token); map.push({ token, type: h.type, value }); }
    segments.push({ text: value, type: h.type, token });
    i = h.end;
  }
  if (i < text.length) segments.push({ text: text.slice(i) });
  return { segments, map, counts };
}
