import { z } from "zod"

//top-airing
export const TopAiringResultSchema = z.object({
  id: z.string(),
  title: z.string(),
  image: z.string(),
  url: z.string(),
  genres: z.array(z.string()),
})

export const TopAiringSchema = z.object({
  currentPage: z.number(),
  hasNextPage: z.boolean(),
  results: z.array(TopAiringResultSchema),
})

export type TopAiringResult = z.infer<typeof TopAiringResultSchema>
export type TopAiring = z.infer<typeof TopAiringSchema>

//recent-episodes
export const RecentEpisodesResultSchema = z.object({
  id: z.string(),
  episodeId: z.string(),
  episodeNumber: z.number(),
  title: z.string(),
  image: z.string(),
  url: z.string(),
})

export const RecentEpisodesSchema = z.object({
  currentPage: z.number(),
  hasNextPage: z.boolean(),
  results: z.array(RecentEpisodesResultSchema),
})

export type RecentEpisodesResult = z.infer<typeof RecentEpisodesResultSchema>
export type RecentEpisodes = z.infer<typeof RecentEpisodesSchema>
