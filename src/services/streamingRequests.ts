import axios from "axios"
import {
  CurrentVideoTimeStamp,
  CurrentVideoTimeStampSchema,
  StreamingLinks,
  StreamingLinksSchema,
} from "../types/streaming"
import { BASE_URL } from "../utils/constants"
import { ZodError } from "zod"

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

export const getCurrentVideoTimeStamp = async ({
  userId,
  episodeId,
  animeId,
  getToken,
}: {
  episodeId: string | null
  userId: string
  animeId: string
  getToken: any | undefined
}): Promise<CurrentVideoTimeStamp | null> => {
  try {
    const { data } = await axios.get(
      `${BASE_URL}/get-timestamp?key=${userId}*${animeId}*${episodeId}`,
      {
        headers: { Authorization: `Bearer ${getToken && (await getToken())}` },
      }
    )
    CurrentVideoTimeStampSchema.parse(data)
    return data
  } catch (error) {
    if (error instanceof ZodError) {
      console.log("timestamp parsing error", error)
      return null
    }

    throw error
  }
}
