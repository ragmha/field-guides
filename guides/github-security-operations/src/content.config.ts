import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const diagram = z.string().regex(/^[a-z0-9-]+$/);

const guide = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/guide' }),
  schema: z.object({
    title: z.string(),
    section: z.string(),
    order: z.number(),
    description: z.string(),
    verified: z.string(),
    sources: z.array(z.string().url()).min(1),
    diagram: diagram.optional(),
    scenarioDiagram: diagram.optional(),
    additionalDiagrams: z.array(diagram).optional(),
    checks: z.array(z.object({ question: z.string(), answer: z.string() })).min(2).optional(),
  }),
});

export const collections = { guide };
