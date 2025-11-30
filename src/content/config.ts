import { z, defineCollection } from "astro:content";

const blogCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    author: z.string().default('اسم الكاتب'),
    image: z.string().optional(),
    category: z.string(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
  }),
});

const pagesCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    image: z.string().optional(),
  }),
});

const authorsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    name: z.string(),
    role: z.string(),
    avatar: z.string().optional(),
    bio: z.string(),
    social: z.object({
      twitter: z.string().optional(),
      github: z.string().optional(),
      linkedin: z.string().optional(),
    }).optional(),
  }),
});

export const collections = {
  blog: blogCollection,
  pages: pagesCollection,
  authors: authorsCollection,
};
