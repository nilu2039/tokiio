import { FontAwesome } from "@expo/vector-icons"
import type { NativeStackScreenProps } from "@react-navigation/native-stack"
import React from "react"
import { ActivityIndicator, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { useQuery } from "react-query"
import { RootStackProps } from "../../../App"
import GradientText from "../../components/ui/GradientText"
import { getAnimeInfo } from "../../services/exploreRequests"
import { WIDTH } from "../../utils/dimensions"
import EpisodeList from "./EpisodeList"

import { useNavigation } from "@react-navigation/native"
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen"
import { ZodError, z } from "zod"
import GradientBackground from "../../components/ui/GradientBackground"
import { COLORS } from "../../config/colors"

type PlayerRouteProps = NativeStackScreenProps<RootStackProps, "Player">

const PlayerRouteSchema = z.object({
  id: z.string(),
  title: z.string(),
  episodeId: z.string().optional(),
})

const Player: React.FC<PlayerRouteProps> = ({ route }) => {
  try {
    const validPlayerParams = PlayerRouteSchema.parse(route.params)
    const { id, title, episodeId } = validPlayerParams
  } catch (error) {
    if (error instanceof ZodError) {
      console.log("player prams parsing error")
    }
  }

  const navigation = useNavigation()

  const { data, isLoading } = useQuery({
    queryKey: "anime-info-23",
    queryFn: () => getAnimeInfo({ id: route.params?.id }),
    cacheTime: 0,
  })

  if (isLoading) {
    return <ActivityIndicator />
  }

  return (
    <GradientBackground>
      <SafeAreaView>
        <View
          style={{
            marginTop: hp(1),
            alignItems: "center",
            flexDirection: "row",
          }}
        >
          <FontAwesome
            onPress={() => {
              navigation.goBack()
            }}
            name="angle-left"
            size={wp(7)}
            style={{ position: "absolute", zIndex: 999, left: wp(10) }}
            color={COLORS.white}
          />
          <GradientText
            numberOfLines={1}
            style={{ fontSize: wp(4), width: WIDTH, textAlign: "center" }}
            label={`${route.params?.title.substring(0, 25)}${
              route.params?.title.length! > 25 ? "..." : ""
            }`}
          />
        </View>
        <EpisodeList episodeId={route.params?.episodeId} data={data} />
      </SafeAreaView>
    </GradientBackground>
  )
}

export default Player
