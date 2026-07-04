import { z, defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';

const experienceCollection = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/experience" }),
  schema: z.object({
    role: z.string(),
    company: z.string(),
    period: z.string(),
    order: z.number(),
  }),
});

const certsCollection = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/certifications" }),
  schema: z.object({
    name: z.string(),
    issuer: z.string(),
    type: z.string(),
    icon: z.enum(['cert-linux', 'cert-cloud', 'cert-security']),
    order: z.number(),
  }),
});

const projectsCollection = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/projects" }),
  schema: z.object({
    title: z.string(),
    status: z.enum(['Operational', 'In Progress', 'Completed']),
    metrics: z.array(z.string()),
    techStack: z.array(z.string()),
    order: z.number(),
  }),
});

export const collections = {
  'experience': experienceCollection,
  'certifications': certsCollection,
  'projects': projectsCollection,
};
