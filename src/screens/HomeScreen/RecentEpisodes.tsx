import React from "react"
import { ActivityIndicator, Image, ScrollView, Text, View } from "react-native"
import { FlatList } from "react-native-gesture-handler"
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen"
import { InfiniteQueryObserverBaseResult, useInfiniteQuery } from "react-query"
import { FontAwesome } from "@expo/vector-icons"

import GradientText from "../../components/ui/GradientText"
import { COLORS } from "../../config/colors"
import { getRecentEpisodes } from "../../services/exploreRequests"
import type {
  RecentEpisodesResult,
  RecentEpisodes as RecentEpisodesType,
} from "../../types/explore"

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
            <View
              style={{
                height: hp(25),
                width: wp(40),
                marginHorizontal: wp(3),
                backgroundColor: "lightgray",
                borderRadius: wp(2),
              }}
            >
              <View style={{ marginBottom: hp(1.5) }}>
                <Image
                  source={{ uri: item.image }}
                  style={{
                    width: wp(40),
                    height: hp(25),
                    marginBottom: hp(1.5),
                    position: "relative",
                    borderRadius: wp(2),
                  }}
                />
                <View
                  style={{
                    position: "absolute",
                    bottom: -hp(0.5),
                    backgroundColor: COLORS.brass,
                    width: wp(15),
                    height: hp(2),
                    borderBottomLeftRadius: wp(1),
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Text
                    style={{
                      color: COLORS.white,
                      fontSize: wp(3),
                      fontWeight: "600",
                      textAlign: "center",
                    }}
                  >
                    {item.episodeNumber}
                  </Text>
                </View>
              </View>
              <Text
                numberOfLines={2}
                style={{
                  color: COLORS.white,
                  fontSize: wp(4),
                  fontWeight: "600",
                }}
              >
                {item.title}
              </Text>
            </View>
          )
        }}
      />
    </ScrollView>
  )
}

const RecentEpisodes = () => {
  const { data, isLoading, fetchNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: "recent-episodes",
      queryFn: ({ pageParam = 1 }) => getRecentEpisodes({ page: pageParam }),
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
          marginTop: hp(2),
          justifyContent: "space-between",
          paddingHorizontal: wp(10),
        }}
      >
        <GradientText label="Recent Episodes" />
        {/* <View style={{ flexDirection: "row", gap: wp(8) }}>
          <FontAwesome
            onPress={() => fetchNextPage()}
            name="angle-right"
            size={24}
            color={COLORS.white}
          />
        </View> */}
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
