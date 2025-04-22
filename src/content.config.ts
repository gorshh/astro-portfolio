import { z, defineCollection, reference } from 'astro:content';

export const collections = {
  posts: defineCollection({
    type: 'content',
    schema: z.object({ // define object
      title: z.string(), // define string
      author: reference('authors'),
      date: z.date(), // date
      tags: z.array(z.string()) // string[]
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