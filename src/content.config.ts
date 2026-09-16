import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const projects = defineCollection({
  loader: glob({ pattern: 'src/content/projects/*/index.{md,mdx}' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    thumbnail: z.string().optional(),
    tags: z.array(z.enum(['professional', 'personal', 'open-source', 'startup', 'freelance', 'design', 'ongoing', 'archived', 'completed'])),
    skills: z.array(z.string()),
    date: z.string(),
    featured: z.boolean().optional(),
    link: z.string().optional(),
    github: z.string().optional(),
    figma: z.string().optional(),
  }),
});

export const collections = { projects };
