import axios from "axios"
import { AnimeHistory, AnimeHistorySchema } from "../types/history"
import { BASE_URL } from "../utils/constants"
import { ZodError } from "zod"

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
