import axios from "axios"
import { type TopAiring, TopAiringSchema } from "../types/explore"
import { ZodError } from "zod"
import { BASE_URL } from "../utils/constants"

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
