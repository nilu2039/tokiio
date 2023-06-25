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
        ListFooterComponent={<View style={{ height: 20 }} />}
        contentContainerStyle={{
          justifyContent: "center",
          alignItems: "center",
          gap: wp(20),
          marginTop: hp(2),
        }}
        renderItem={({ item, index }) => {
          return (
            // <Pressable
            //   onPress={() => {
            //     navigation.navigate("Player", {
            //       id: item.id,
            //       title: item.title ? item.title : startCase(item.id),
            //       image: item.image,
            //       url: item.url,
            //       genres: [],
            //       episodeId: item.episodeId,
            //     })
            //   }}
            //   style={{
            //     height: hp(25),
            //     width: wp(40),
            //     marginHorizontal: wp(3),
            //     backgroundColor: "lightgray",
            //     borderRadius: wp(2),
            //     borderBottomLeftRadius: 0,
            //   }}
            // >
            //   <View style={{ marginBottom: hp(1.5) }}>
            //     <Image
            //       source={{ uri: item.image }}
            //       style={{
            //         width: wp(40),
            //         height: hp(25),
            //         marginBottom: hp(1.5),
            //         position: "relative",
            //         borderRadius: wp(2),
            //         borderBottomLeftRadius: 0,
            //       }}
            //     />
            //     <View
            //       style={{
            //         position: "absolute",
            //         bottom: -hp(0.5),
            //         backgroundColor: COLORS.brass,
            //         width: wp(15),
            //         height: hp(2),
            //         borderBottomLeftRadius: wp(1),
            //         alignItems: "center",
            //         justifyContent: "center",
            //       }}
            //     >
            //       <Text
            //         style={{
            //           color: COLORS.white,
            //           fontSize: wp(3),
            //           fontWeight: "600",
            //           textAlign: "center",
            //         }}
            //       >
            //         {item.episodeNumber}
            //       </Text>
            //     </View>
            //   </View>
            //   <Text
            //     numberOfLines={2}
            //     style={{
            //       color: COLORS.white,
            //       fontSize: wp(4),
            //       fontWeight: "600",
            //     }}
            //   >
            //     {item.title}
            //   </Text>
            // </Pressable>
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
                  ...item,
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
