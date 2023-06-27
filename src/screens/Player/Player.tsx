import { FontAwesome } from "@expo/vector-icons"
import type { NativeStackScreenProps } from "@react-navigation/native-stack"
import { useQuery } from "@tanstack/react-query"
import React from "react"
import { ActivityIndicator, Text, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
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
import GradientBackground from "../../components/ui/GradientBackground"
import { COLORS } from "../../config/colors"
import { AnimeInfo } from "../../types/explore"

type PlayerRouteProps = NativeStackScreenProps<RootStackProps, "Player">

const Player: React.FC<PlayerRouteProps> = ({ route }) => {
  const navigation = useNavigation()

  const { data, isLoading, isError } = useQuery({
    queryKey: ["anime-info-23"],
    queryFn: () => getAnimeInfo({ id: route.params?.id }),
    cacheTime: 0,
    select: (data) => {
      if (data?.episodes[0].number !== 1) {
        const reversedObject = { ...data, episodes: data?.episodes.reverse() }
        return reversedObject as AnimeInfo
      }
      return data
    },
  })

  if (isLoading) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <ActivityIndicator style={{ width: wp(15) }} />
      </View>
    )
  }

  if (isError) {
    return (
      <SafeAreaView>
        <FontAwesome
          onPress={() => {
            navigation.goBack()
          }}
          name="angle-left"
          size={wp(7)}
          style={{ left: wp(10) }}
          color={COLORS.white}
        />
        <View
          style={{
            height: hp(100),
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text style={{ color: COLORS.white }}>Something went wrong 😢</Text>
        </View>
      </SafeAreaView>
    )
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
            label={`${
              route.params?.title?.english
                ? route.params?.title?.english?.substring(0, 25)
                : route.params?.title?.romaji?.substring(0, 25)
            }${(function () {
              if (route.params?.title?.english) {
                return route.params?.title?.english?.length! > 25 ? "..." : ""
              } else if (route.params?.title?.romaji) {
                return route.params?.title?.romaji?.length! > 25 ? "..." : ""
              } else {
                return ""
              }
            })()}`}
          />
        </View>
        <EpisodeList data={data} />
      </SafeAreaView>
    </GradientBackground>
  )
}

export default Player
