import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const isoReviewedDate = z.string()
  .regex(/^\d{4}-\d{2}-\d{2}$/, 'Use an ISO calendar date (YYYY-MM-DD)')
  .refine(value => {
    const date = new Date(`${value}T00:00:00.000Z`);
    return !Number.isNaN(date.valueOf()) && date.toISOString().slice(0, 10) === value;
  }, 'Use a real ISO calendar date');
const reviewedDate = z.union([
  z.date().transform(value => value.toISOString().slice(0, 10)),
  z.string(),
]).pipe(isoReviewedDate);

const guide = defineCollection({
  loader: glob({
    pattern: '**/*.md',
    base: './src/content/guide',
    generateId: ({ entry }) => entry.replace(/\\/g, '/').replace(/\.md$/, ''),
  }),
  schema: z.object({
    kind: z.enum(['landing', 'lesson']),
    title: z.string().trim().min(1),
    description: z.string().trim().min(1),
    reviewed: reviewedDate,
    sources: z.array(z.string().url().refine(value => value.startsWith('https://'), 'Sources must use HTTPS')).min(1),
    checks: z.array(z.object({
      question: z.string().trim().min(1),
      answer: z.string().trim().min(1),
    })).min(1).max(3).optional(),
  }),
});

export const collections = { guide };
