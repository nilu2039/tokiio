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

type PlayerRouteProps = NativeStackScreenProps<RootStackProps, "Player">

const Player: React.FC<PlayerRouteProps> = ({ route }) => {
  const { id, title, episodeId } = route?.params!
  const navigation = useNavigation()

  const { data, isLoading } = useQuery({
    queryKey: "anime-info-23",
    queryFn: () => getAnimeInfo({ id }),
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
              console.log("PRESSED")
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
            label={`${title.substring(0, 25)}${title.length > 25 ? "..." : ""}`}
          />
        </View>
        <EpisodeList episodeId={episodeId} data={data} />
      </SafeAreaView>
    </LinearGradient>
  )
}

export default Player
