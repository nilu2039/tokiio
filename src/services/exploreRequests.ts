import axios from "axios"
import {
  type TopAiring,
  TopAiringSchema,
  RecentEpisodes,
  RecentEpisodesSchema,
  AnimeInfo,
  AnimeInfoSchema,
} from "../types/explore"
import { ZodError } from "zod"
import { BASE_URL } from "../utils/constants"
import { StreamingLinks, StreamingLinksSchema } from "../types/streaming"

export const getTopAiring = async ({ page = 1 }): Promise<TopAiring | null> => {
  try {
    const { data } = await axios.get(`${BASE_URL}/top-airing?page=${page}`)
    TopAiringSchema.parse(data)
    return data
  } catch (error) {
    if (error instanceof ZodError) {
      console.log("type parsing error")
    }
    throw error
  }
}

export const getRecentEpisodes = async ({
  page = 1,
}): Promise<RecentEpisodes | null> => {
  try {
    const { data } = await axios.get(`${BASE_URL}/recent-episodes?page=${page}`)
    RecentEpisodesSchema.parse(data)
    return data
  } catch (error) {
    if (error instanceof ZodError) {
      console.log("type parsing error")
    }
    throw error
  }
}

export const getAnimeInfo = async ({ id = "" }): Promise<AnimeInfo | null> => {
  try {
    const { data } = await axios.get(`${BASE_URL}/get-info?id=${id}`)
    AnimeInfoSchema.parse(data)
    return data
  } catch (error) {
    if (error instanceof ZodError) {
      console.log("type parsing error")
    }
    throw error
  }
}

export const getStreamingLinks = async ({
  episodeId,
}: {
  episodeId: string | undefined
}): Promise<StreamingLinks | null> => {
  try {
    const { data } = await axios.get(
      `${BASE_URL}/streaming-links?episodeId=${episodeId}`
    )
    StreamingLinksSchema.parse(data)
    return data
  } catch (error) {
    if (error instanceof ZodError) {
      console.log("type parsing error")
    }
    throw error
  }
}
