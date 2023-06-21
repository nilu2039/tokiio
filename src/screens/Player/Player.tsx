import type { NativeStackScreenProps } from "@react-navigation/native-stack"
import { LinearGradient } from "expo-linear-gradient"
import React from "react"
import { ActivityIndicator, Pressable, ScrollView, Text } from "react-native"
import { RootStackProps } from "../../../App"
import { WIDTH } from "../../utils/dimensions"
import { useQuery } from "react-query"
import { getAnimeInfo } from "../../services/exploreRequests"
import EpisodeList from "./EpisodeList"
import { SafeAreaView } from "react-native-safe-area-context"
import GradientText from "../../components/ui/GradientText"
import { View } from "react-native"
import { FontAwesome } from "@expo/vector-icons"

import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen"
import { COLORS } from "../../config/colors"
import { useNavigation } from "@react-navigation/native"
import { ZodError, z } from "zod"
import { rotate } from "@shopify/react-native-skia"

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
    <LinearGradient
      colors={["#472315", "#000", "#000"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={{
        flex: 1,
        width: WIDTH,
      }}
    >
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
    </LinearGradient>
  )
}

export default Player
