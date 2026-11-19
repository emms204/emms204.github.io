import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

/**
 * Letters: Emmanuel's essays, written as letters to a friend (t50u, 19 Nov 2026).
 * Published with light, approved edits only (t52u). `draft: true` keeps a letter
 * out of every build output (index, page, sitemap, homepage card) until its full text is in.
 */
const letters = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/letters' }),
  schema: z.object({
    title: z.string(),
    hook: z.string(), // one-line question taken from the letter's own text
    order: z.number(), // 1 = lead letter
    signoff: z.string().optional(),
    written: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

export const collections = { letters };
