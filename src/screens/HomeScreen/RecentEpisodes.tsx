import React, { useState } from "react"
import {
  ActivityIndicator,
  Modal,
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
import { InfiniteQueryObserverBaseResult, useInfiniteQuery } from "react-query"

import { useNavigation } from "@react-navigation/native"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { startCase } from "lodash"
import { RootStackProps } from "../../../App"
import AnimeCard from "../../components/ui/AnimeCards"
import GradientText from "../../components/ui/GradientText"
import { getRecentEpisodes } from "../../services/exploreRequests"
import type {
  RecentEpisodesResult,
  RecentEpisodes as RecentEpisodesType,
} from "../../types/explore"
import { COLORS } from "../../config/colors"
import RecentEpisodeModal from "./RecentEpisodeModal"

interface RecentEpisodeCardProps {
  data: RecentEpisodesResult[] | []
  fetchNextPage: () => Promise<
    InfiniteQueryObserverBaseResult<RecentEpisodesType | null, unknown>
  >
}

const RecentEpisodesCard: React.FC<RecentEpisodeCardProps> = ({
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
              title={item.title}
              imageUri={item.image}
              episodeNumber={item.episodeNumber}
              containerStyle={{
                marginHorizontal: wp(3),
              }}
              onPress={() => {
                navigation.navigate("Player", {
                  id: item.id,
                  title: item.title ? item.title : startCase(item.id),
                  image: item.image,
                  url: item.url,
                  genres: [],
                  episodeId: item.episodeId,
                })
              }}
            />
          )
        }}
      />
    </ScrollView>
  )
}

const RecentEpisodes = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackProps, "Player">>()

  const { data, isLoading, fetchNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: "recent-episodes",
      queryFn: ({ pageParam = 1 }) => getRecentEpisodes({ page: pageParam }),
      getNextPageParam: (lastPage) => {
        if (lastPage?.currentPage) {
          if (lastPage.hasNextPage) {
            return parseInt(lastPage?.currentPage) + 1
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
        <GradientText label="Recent Episodes" />
        <TouchableOpacity
          style={{
            borderColor: "gray",
            borderWidth: wp(0.2),
            paddingVertical: wp(0.7),
            paddingHorizontal: wp(3),
            borderRadius: wp(10),
          }}
          onPress={() => {
            navigation.navigate("RecentEpisodes")
          }}
        >
          <Text style={{ color: COLORS.white, fontWeight: "bold" }}>More</Text>
        </TouchableOpacity>
      </View>
      <RecentEpisodesCard
        fetchNextPage={fetchNextPage}
        data={
          data?.pages.flatMap((item) => item?.results) as RecentEpisodesResult[]
        }
      />
    </View>
  )
}

export default RecentEpisodes
