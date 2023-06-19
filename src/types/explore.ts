import { z } from "zod"

export const TopAiringResultSchema = z.object({
  id: z.string(),
  title: z.string(),
  image: z.string(),
  url: z.string(),
  genres: z.array(z.string()),
})

export type TopAiringResult = z.infer<typeof TopAiringResultSchema>

export const TopAiringSchema = z.object({
  currentPage: z.number(),
  hasNextPage: z.boolean(),
  results: z.array(TopAiringResultSchema),
})
export type TopAiring = z.infer<typeof TopAiringSchema>
