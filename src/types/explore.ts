import { z } from "zod"

//top-airing
export const TopAiringStatusSchema = z.enum([
  "Completed",
  "Ongoing",
  "Not yet aired",
])
export type Status = z.infer<typeof TopAiringStatusSchema>

// export const TopAiringTypeSchema = z.enum(["TV"])
// export type Type = z.infer<typeof TopAiringTypeSchema>

export const TopAiringTrailerSchema = z.object({
  id: z.union([z.null(), z.string()]).optional(),
  site: z.union([z.null(), z.string()]).optional(),
  thumbnail: z.union([z.null(), z.string()]).optional(),
})
export type Trailer = z.infer<typeof TopAiringTrailerSchema>

export const TopAiringTitleSchema = z.object({
  romaji: z.string().nullable(),
  english: z.string().nullable(),
  native: z.string().nullable(),
  userPreferred: z.string().nullable(),
})
export type Title = z.infer<typeof TopAiringTitleSchema>

export const TopAiringResultSchema = z.object({
  id: z.string(),
  malId: z.number().nullable().optional().nullable(),
  title: TopAiringTitleSchema.optional().nullable(),
  image: z.string().nullable(),
  trailer: TopAiringTrailerSchema.optional().nullable(),
  description: z.string().nullable(),
  status: TopAiringStatusSchema.optional().nullable(),
  cover: z.string().nullable().optional().nullable(),
  rating: z.number().nullable().optional().nullable(),
  releaseDate: z.number().nullable().optional().nullable(),
  color: z.string().nullable().optional().nullable(),
  genres: z.array(z.string()).nullable().optional().nullable(),
  totalEpisodes: z.number().nullable().optional().nullable(),
  duration: z.number().nullable().optional().nullable(),
  type: z.string().optional().nullable(),
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
  currentPage: z.string(),
  hasNextPage: z.boolean(),
  results: z.array(RecentEpisodesResultSchema),
})

export type RecentEpisodesResult = z.infer<typeof RecentEpisodesResultSchema>
export type RecentEpisodes = z.infer<typeof RecentEpisodesSchema>

//anime-info

export const AnimeInfoStatusSchema = z.enum([
  "Completed",
  "Ongoing",
  "Not yet aired",
])
export type AnimeInfoStatus = z.infer<typeof AnimeInfoStatusSchema>

export const AnimeInfoTrailerSchema = z.object({
  id: z.union([z.null(), z.string()]).nullable().optional(),
  site: z.union([z.null(), z.string()]).nullable().optional(),
  thumbnail: z.union([z.null(), z.string()]).nullable().optional(),
})
export type AnimeInfoTrailer = z.infer<typeof AnimeInfoTrailerSchema>

export const AnimeInfoTitleSchema = z.object({
  romaji: z.union([z.null(), z.string()]).nullable().optional(),
  english: z.union([z.null(), z.string()]).nullable().optional(),
  native: z.union([z.null(), z.string()]).nullable().optional(),
  userPreferred: z.string().nullable().optional(),
})
export type AnimeInfoTitle = z.infer<typeof AnimeInfoTitleSchema>

export const AnimeInfoRecommendationSchema = z.object({
  id: z.union([z.number(), z.null()]).nullable(),
  malId: z.union([z.number(), z.null()]).nullable().optional(),
  title: z.union([AnimeInfoTitleSchema, z.null()]).nullable().optional(),
  status: z.union([AnimeInfoStatusSchema, z.null()]).nullable().optional(),
  episodes: z.union([z.number(), z.null()]).nullable().optional(),
  image: z.union([z.null(), z.string()]).nullable().optional(),
  cover: z.union([z.null(), z.string()]).nullable().optional(),
  rating: z.union([z.number(), z.null()]).nullable().optional(),
  type: z.union([z.null(), z.string()]).nullable().optional(),
  relationType: z.string().nullable().optional(),
  color: z.union([z.null(), z.string()]).nullable().optional(),
})
export type Ation = z.infer<typeof AnimeInfoRecommendationSchema>

export const NextAiringEpisodeSchema = z.object({
  airingTime: z.number().nullable().optional(),
  timeUntilAiring: z.number().nullable().optional(),
  episode: z.number().nullable().optional(),
})
export type NextAiringEpisode = z.infer<typeof NextAiringEpisodeSchema>

export const MappingsSchema = z.object({
  mal: z.union([z.number(), z.null()]).nullable().optional(),
  anidb: z.union([z.number(), z.null()]).nullable().optional(),
  kitsu: z.union([z.number(), z.null()]).nullable().optional(),
  anilist: z.union([z.number(), z.null()]).nullable().optional(),
  thetvdb: z.union([z.number(), z.null()]).nullable().optional(),
  anisearch: z.union([z.number(), z.null()]).nullable().optional(),
  livechart: z.union([z.number(), z.null()]).nullable().optional(),
  "notify.moe": z.union([z.null(), z.string()]).nullable().optional(),
  "anime-planet": z.union([z.null(), z.string()]).nullable().optional(),
})
export type Mappings = z.infer<typeof MappingsSchema>

export const AnimeInfoEpisodeSchema = z.object({
  id: z.string(),
  title: z.union([z.null(), z.string()]).nullable().optional(),
  description: z.union([z.null(), z.string()]).nullable().optional(),
  number: z.union([z.number(), z.null()]).nullable().optional(),
  image: z.union([z.null(), z.string()]).nullable().optional(),
  airDate: z.union([z.null(), z.string()]).nullable().optional(),
})
export type AnimeInfoEpisode = z.infer<typeof AnimeInfoEpisodeSchema>

export const AnimeInfoEndDateClassSchema = z.object({
  year: z.union([z.number(), z.null()]).nullable().optional(),
  month: z.union([z.number(), z.null()]).nullable().optional(),
  day: z.union([z.number(), z.null()]).nullable().optional(),
})
export type EndDateClass = z.infer<typeof AnimeInfoEndDateClassSchema>
export const NameSchema = z.object({
  first: z.union([z.null(), z.string()]).nullable(),
  last: z.union([z.null(), z.string()]).nullable(),
  full: z.union([z.null(), z.string()]).nullable(),
  native: z.union([z.null(), z.string()]).nullable(),
  userPreferred: z.union([z.null(), z.string()]).nullable(),
})
export type Name = z.infer<typeof NameSchema>
export const VoiceActorSchema = z.object({
  id: z.union([z.number(), z.null()]).nullable(),
  language: z.string().nullable(),
  name: z.union([NameSchema, z.null()]).nullable(),
  image: z.union([z.null(), z.string()]).nullable(),
})
export type VoiceActor = z.infer<typeof VoiceActorSchema>

export const AnimeInfoCharacterSchema = z.object({
  id: z.union([z.number(), z.null()]).nullable().optional(),
  role: z.string().nullable().optional(),
  name: z.union([NameSchema, z.null()]).nullable().optional(),
  image: z.union([z.null(), z.string()]).nullable().optional(),
  voiceActors: z.union([z.array(VoiceActorSchema), z.null()]).nullable(),
})
export type Character = z.infer<typeof AnimeInfoCharacterSchema>

export const AnimeInfoSchema = z.object({
  id: z.string(),
  title: AnimeInfoTitleSchema,
  malId: z.number().nullable().optional(),
  synonyms: z.array(z.string()).nullable().optional(),
  isLicensed: z.boolean().nullable().optional(),
  isAdult: z.boolean().nullable().optional(),
  countryOfOrigin: z.string().nullable().optional(),
  trailer: AnimeInfoTrailerSchema.nullable().optional(),
  image: z.string().nullable().optional(),
  popularity: z.number().nullable().optional(),
  color: z.string().nullable().optional(),
  cover: z.string().nullable().optional(),
  description: z.string().nullable().optional(),
  status: AnimeInfoStatusSchema.nullable().optional(),
  releaseDate: z.number().nullable().optional(),
  startDate: AnimeInfoEndDateClassSchema.optional(),
  endDate: AnimeInfoEndDateClassSchema.optional(),
  nextAiringEpisode: NextAiringEpisodeSchema.optional(),
  totalEpisodes: z.number().nullable().optional(),
  currentEpisode: z.number().nullable().optional(),
  rating: z.number().nullable().optional(),
  duration: z.number().nullable().optional(),
  genres: z.array(z.string()).nullable().optional(),
  season: z.string().nullable().optional(),
  studios: z.array(z.string()).nullable().optional(),
  subOrDub: z.string().nullable().optional(),
  type: z.string().nullable().optional(),
  recommendations: z.array(AnimeInfoRecommendationSchema).nullable().optional(),
  characters: z.array(AnimeInfoCharacterSchema).nullable().optional(),
  relations: z.array(AnimeInfoRecommendationSchema).nullable().optional(),
  mappings: MappingsSchema.optional(),
  episodes: z.array(AnimeInfoEpisodeSchema),
})
export type AnimeInfo = z.infer<typeof AnimeInfoSchema>

//search-anime

export const SearchResultSchema = z.object({
  id: z.string(),
  title: z.string(),
  url: z.string(),
  image: z.string(),
  releaseDate: z.string(),
  subOrDub: z.string(),
})
export type SearchResult = z.infer<typeof SearchResultSchema>

export const AnimeSearchSchema = z.object({
  currentPage: z.string(),
  hasNextPage: z.boolean(),
  results: z.array(SearchResultSchema),
})
export type AnimeSearch = z.infer<typeof AnimeSearchSchema>
