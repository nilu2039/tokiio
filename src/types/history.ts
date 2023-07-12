import { z } from "zod"

export const EpisodeSchema = z.object({
  id: z.number(),
  queryKey: z.string(),
  episodeId: z.string(),
  timeStamp: z.number(),
  createdAt: z.string(),
  updatedAt: z.string(),
  historyId: z.number(),
})
export type Episode = z.infer<typeof EpisodeSchema>

export const ResultSchema = z.object({
  id: z.number(),
  userId: z.string(),
  animeId: z.string(),
  animeImg: z.string(),
  animeTitle: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
  episodes: z.array(EpisodeSchema),
})
export type Result = z.infer<typeof ResultSchema>

export const AnimeHistorySchema = z.object({
  currentPage: z.number(),
  hasNextPage: z.boolean(),
  result: z.array(ResultSchema),
})
export type AnimeHistory = z.infer<typeof AnimeHistorySchema>

//anime-history-by-id

export const AnimeHistoryByIdSchema = z
  .object({
    id: z.number(),
    userId: z.string(),
    animeId: z.string(),
    animeImg: z.string(),
    animeTitle: z.string(),
    createdAt: z.string(),
    updatedAt: z.string(),
    episodes: z.array(EpisodeSchema),
  })
  .nullable()
export type AnimeHistoryById = z.infer<typeof AnimeHistoryByIdSchema>

export const SaveHistorySchemaClient = z.object({
  animeId: z.string(),
  animeImg: z.string().optional().nullable(),
  animeTitle: z.string().optional().nullable(),
  episodeId: z.string(),
  timeStamp: z.string(),
  getToken: z.any(),
})
