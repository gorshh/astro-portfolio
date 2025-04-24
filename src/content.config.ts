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
      topic: z.string(), 
      description: z.string(),
      sources: z.array(z.object({title: z.string(), href: z.string()})).optional(),
    })
  }),
  
  authors: defineCollection({
    type: 'data',
    schema: z.object({
      name: z.string(),
      fields: z.array(z.object({ name: z.string(), value: z.string() })),
      bio: z.string(),
    })
  })
}

