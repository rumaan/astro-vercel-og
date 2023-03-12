import { defineCollection, z } from "astro:content";

const postsCollection = defineCollection({
  schema: z.object({
    title: z.string(),
    description: z.string()
    // ...
  }),
});

export const collections = {
  'post': postsCollection
}
