import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const wiki = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/wiki' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    category: z.enum([
      'server',
      'scaling-difficult',
      'eazzy-server-utils',
      'safety-zstones',
    ]),
    order: z.number().default(0),
  }),
});

const faq = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/faq' }),
  schema: z.object({
    question: z.string(),
    order: z.number().default(0),
  }),
});

const server = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/server' }),
  schema: z.object({
    version: z.string(),
    loader: z.string(),
    difficulty: z.string(),
    modCount: z.number().optional(),
    slots: z.number().optional(),
    region: z.string().optional(),
    ip: z.string().optional(),
    whitelist: z.boolean().optional(),
    premium: z.boolean().optional(),
  }),
});

export const collections = { wiki, faq, server };
