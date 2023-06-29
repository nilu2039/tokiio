import { z } from "zod"

export const EpisodeSourceSchema = z.object({
  url: z.string(),
  isM3U8: z.boolean(),
  quality: z.string(),
})
export type EpisodeSource = z.infer<typeof EpisodeSourceSchema>

export const EpisodeHeadersSchema = z.object({
  Referer: z.string(),
})
export type EpisodeHeaders = z.infer<typeof EpisodeHeadersSchema>

export const StreamingLinksSchema = z.object({
  headers: EpisodeHeadersSchema,
  sources: z.array(EpisodeSourceSchema),
  download: z.string(),
})

export type StreamingLinks = z.infer<typeof StreamingLinksSchema>

//current-video-timestamp

export const CurrentVideoTimeStampSchema = z
  .object({
    id: z.number(),
    queryKey: z.string(),
    episodeId: z.string(),
    timeStamp: z.number(),
    createdAt: z.string(),
    updatedAt: z.string(),
    historyId: z.number().nullable(),
  })
  .nullable()

export type CurrentVideoTimeStamp = z.infer<typeof CurrentVideoTimeStampSchema>
