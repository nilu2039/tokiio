import axios, { CancelTokenSource } from "axios"
import {
  type TopAiring,
  TopAiringSchema,
  RecentEpisodes,
  RecentEpisodesSchema,
  AnimeInfo,
  AnimeInfoSchema,
  AnimeSearch,
  AnimeSearchSchema,
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
      return null
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
      return null
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
      return null
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
      return null
    }
    throw error
  }
}

let searchCancelToken: CancelTokenSource

export const searchAnime = async ({
  searchQuery,
  page = 1,
}: {
  searchQuery: string | undefined
  page: number
}): Promise<AnimeSearch | null> => {
  try {
    if (searchCancelToken) {
      searchCancelToken.cancel("operation cancelled")
    }

    searchCancelToken = axios.CancelToken.source()

    const { data } = await axios.get(
      `${BASE_URL}/search?name=${searchQuery}&page=${page}`,
      { cancelToken: searchCancelToken.token }
    )
    AnimeSearchSchema.parse(data)
    return data
  } catch (error) {
    if (error instanceof ZodError) {
      console.log("type parsing error")
      return null
    }
    if (axios.isCancel(error)) {
      console.log("request cancelled")
      return null
    }
    throw error
  }
}
