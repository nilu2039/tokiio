import {
  InfiniteQueryObserverBaseResult,
  useInfiniteQuery,
} from "@tanstack/react-query"
import React from "react"
import {
  ActivityIndicator,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native"
import { FlatList } from "react-native-gesture-handler"
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen"

import { useNavigation } from "@react-navigation/native"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { startCase } from "lodash"
import { RootStackProps } from "../../../App"
import AnimeCard from "../../components/ui/AnimeCards"
import GradientText from "../../components/ui/GradientText"
import { COLORS } from "../../config/colors"
import { getPopularAnime } from "../../services/exploreRequests"
import type {
  RecentEpisodesResult,
  TopAiring,
  TopAiringResult,
} from "../../types/explore"

interface RecentEpisodeCardProps {
  data: TopAiringResult[] | []
  fetchNextPage: () => Promise<
    InfiniteQueryObserverBaseResult<TopAiring | null, unknown>
  >
}

const PopularAnimeCard: React.FC<RecentEpisodeCardProps> = ({
  data = [],
  fetchNextPage,
}) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackProps, "Player">>()

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      <FlatList
        data={data}
        scrollEnabled={false}
        numColumns={Math.ceil(data.length / 2)}
        showsVerticalScrollIndicator={false}
        ListFooterComponent={<View style={{ height: hp(2.4) }} />}
        contentContainerStyle={{
          justifyContent: "center",
          alignItems: "center",
          gap: wp(20),
          marginTop: hp(2),
        }}
        renderItem={({ item, index }) => {
          return (
            <AnimeCard
              id={item.id}
              title={
                item?.title?.english
                  ? item?.title?.english
                  : item?.title?.romaji
              }
              imageUri={item.image}
              episodeNumber={item.totalEpisodes}
              containerStyle={{
                marginHorizontal: wp(3),
              }}
              onPress={() => {
                navigation.navigate("Player", {
                  id: item.id,
                  title: item?.title,
                })
              }}
            />
          )
        }}
      />
    </ScrollView>
  )
}

const PopularAnime = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackProps, "Player">>()

  const { data, isLoading, fetchNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["popular-anime"],
      queryFn: ({ pageParam = 1 }) => getPopularAnime({ page: pageParam }),
      getNextPageParam: (lastPage) => {
        if (lastPage?.currentPage) {
          if (lastPage.hasNextPage) {
            return lastPage?.currentPage + 1
          }
        } else return 1
      },
    })

  if (isLoading || isFetchingNextPage) {
    return <ActivityIndicator />
  }

  return (
    <View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          // marginTop: hp(5),
          justifyContent: "space-between",
          paddingHorizontal: wp(10),
          marginTop: hp(2),
          zIndex: 999,
        }}
      >
        <GradientText label="Popular Anime" />
        <TouchableOpacity
          style={{
            borderColor: "gray",
            borderWidth: wp(0.2),
            paddingVertical: wp(0.7),
            paddingHorizontal: wp(3),
            borderRadius: wp(10),
          }}
          onPress={() => {
            navigation.navigate("PopularAnime")
          }}
        >
          <Text style={{ color: COLORS.white, fontWeight: "bold" }}>More</Text>
        </TouchableOpacity>
      </View>
      <PopularAnimeCard
        fetchNextPage={fetchNextPage}
        data={data?.pages.flatMap((item) => item?.results) as TopAiringResult[]}
      />
    </View>
  )
}

export default PopularAnime
