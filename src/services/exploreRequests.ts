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

export const getTopAiring = async ({
  page = 1,
  getToken,
}: {
  page: number
  getToken: any
}): Promise<TopAiring | null> => {
  try {
    const { data } = await axios.get(`${BASE_URL}/top-airing?page=${page}`, {
      headers: { Authorization: `Bearer ${getToken && (await getToken())}` },
    })
    // console.log(data.results[0])
    TopAiringSchema.parse(data)
    return data
  } catch (error) {
    if (error instanceof ZodError) {
      console.log("top airing type parsing error", error)
      return null
    }
    throw error
  }
}

export const getPopularAnime = async ({
  page = 1,
}): Promise<TopAiring | null> => {
  try {
    const { data } = await axios.get(`${BASE_URL}/popular-anime?page=${page}`)
    TopAiringSchema.parse(data)
    return data
  } catch (error) {
    if (error instanceof ZodError) {
      console.log("popular anime type parsing error", error)
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
      console.log("recent episode type parsing error", error)
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
      console.log("get info type parsing error", error)
      return null
    }
    throw error
  }
}

export const getStreamingLinks = async ({
  episodeId,
}: {
  episodeId: string | null
}): Promise<StreamingLinks | null> => {
  try {
    const { data } = await axios.get(
      `${BASE_URL}/streaming-links?episodeId=${episodeId}`
    )
    StreamingLinksSchema.parse(data)
    return data
  } catch (error) {
    if (error instanceof ZodError) {
      console.log("streaming links type parsing error", error)
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
}): Promise<TopAiring | null> => {
  try {
    if (searchCancelToken) {
      searchCancelToken.cancel("operation cancelled")
    }

    searchCancelToken = axios.CancelToken.source()

    const { data } = await axios.get(
      `${BASE_URL}/search?name=${searchQuery}&page=${page}`,
      { cancelToken: searchCancelToken.token }
    )
    TopAiringSchema.parse(data)
    return data
  } catch (error) {
    if (error instanceof ZodError) {
      console.log("search type parsing error", error)
      return null
    }
    if (axios.isCancel(error)) {
      console.log("request cancelled")
      return null
    }
    throw error
  }
}
