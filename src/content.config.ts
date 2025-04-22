import { z, defineCollection, reference } from 'astro:content';

export const collections = {
  posts: defineCollection({
    type: 'content',
    schema: z.object({
      title: z.string(), 
      author: reference('authors'),
      date: z.date(), 
      tags: z.array(z.string()),
      heroImage: z.string(),
      // sources: z.array(z.object({name: z.string(), value: z.string()})), // array of objects
    })
  }),
  authors: defineCollection({
    type: 'data',
    schema: z.object({
      name: z.string(),
      fields: z.array(z.object({name: z.string(), value: z.string()})), // array of objects
      bio: z.string(),
    })
  })
}