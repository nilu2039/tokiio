import axios from "axios"
import {
  AnimeHistory,
  AnimeHistoryById,
  AnimeHistoryByIdSchema,
  AnimeHistorySchema,
  SaveHistorySchemaClient,
} from "../types/history"
import { BASE_URL } from "../utils/constants"
import { ZodError, z } from "zod"

export const getHistory = async ({
  page = 1,
  getToken,
}: {
  page: number
  getToken: any | undefined
}): Promise<AnimeHistory | null> => {
  try {
    const { data } = await axios.get(
      `${BASE_URL}/get-history?page=${page.toString()}`,
      {
        headers: {
          Authorization: `Bearer ${getToken && (await getToken())}`,
        },
      }
    )
    AnimeHistorySchema.parse(data)
    return data
  } catch (error) {
    if (error instanceof ZodError) {
      console.log("anime history parsing error", error)
      return null
    }
    throw error
  }
}

export const getHistoryById = async ({
  id,
  getToken,
}: {
  id: string
  getToken: any | undefined
}): Promise<AnimeHistoryById | null> => {
  try {
    const { data } = await axios.get(`${BASE_URL}/get-history-by-id?id=${id}`, {
      headers: {
        Authorization: `Bearer ${getToken && (await getToken())}`,
      },
    })

    AnimeHistoryByIdSchema.parse(data)
    return data
  } catch (error) {
    if (error instanceof ZodError) {
      console.log("anime history by id parsing error", error)
      return null
    }
    throw error
  }
}

export const saveHistory = async (
  props: z.infer<typeof SaveHistorySchemaClient>
) => {
  try {
    const validBody = SaveHistorySchemaClient.parse(props)
    const { animeId, animeImg, animeTitle, episodeId, timeStamp, getToken } =
      validBody

    return axios.post(
      `${BASE_URL}/save-history`,
      {
        animeId,
        animeImg,
        animeTitle,
        episodeId,
        timeStamp,
      },
      {
        headers: {
          Authorization: `Bearer ${getToken && (await getToken())}`,
        },
      }
    )
  } catch (error) {
    if (error instanceof ZodError) {
      console.log("save history parsing error")
    }
    throw error
  }
}
