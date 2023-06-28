import { FontAwesome } from "@expo/vector-icons"
import { useNavigation } from "@react-navigation/native"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { FlashList } from "@shopify/flash-list"
import { useInfiniteQuery } from "@tanstack/react-query"
import React, { FC } from "react"
import { ActivityIndicator, SafeAreaView, View } from "react-native"
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen"
import { RootStackProps } from "../../../App"
import AnimeCard from "../../components/ui/AnimeCards"
import GradientBackground from "../../components/ui/GradientBackground"
import { COLORS } from "../../config/colors"
import { getPopularAnime } from "../../services/exploreRequests"
import { TopAiringResult } from "../../types/explore"

interface PopularAnimeProps {}

const PopularAnimeScreen: FC<PopularAnimeProps> = ({}) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackProps, "Player">>()

  const { data, isLoading, fetchNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["popular-anime-screen"],
      queryFn: ({ pageParam = 1 }) => getPopularAnime({ page: pageParam }),
      getNextPageParam: (lastPage) => {
        if (lastPage?.currentPage) {
          if (lastPage.hasNextPage) {
            return lastPage?.currentPage + 1
          }
        } else return 1
      },
    })

  if (isLoading) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <ActivityIndicator />
      </View>
    )
  }

  return (
    <GradientBackground>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={{ paddingHorizontal: wp(5), paddingVertical: hp(1) }}>
          <FontAwesome
            onPress={() => {
              navigation.goBack()
            }}
            name="angle-left"
            size={wp(7)}
            color={COLORS.white}
          />
        </View>
        <View style={{ flex: 1 }}>
          <FlashList
            data={data?.pages.flatMap((item) => item?.results)}
            estimatedItemSize={200}
            numColumns={2}
            onEndReachedThreshold={0.1}
            onEndReached={() => {
              fetchNextPage()
            }}
            ListFooterComponent={
              <View>{isFetchingNextPage ? <ActivityIndicator /> : null}</View>
            }
            ItemSeparatorComponent={() => <View style={{ height: hp(10) }} />}
            renderItem={({ item }) => (
              <AnimeCard
                id={item?.id}
                containerStyle={{ marginLeft: wp(4.6) }}
                title={
                  item?.title?.english
                    ? item?.title?.english
                    : item?.title?.romaji
                }
                imageUri={item?.image as string}
                titleStyle={{ textAlign: "center" }}
                onPress={() => {
                  navigation.navigate("Player", {
                    id: item?.id as string,
                    title: item?.title,
                  })
                }}
              />
            )}
          />
        </View>
      </SafeAreaView>
    </GradientBackground>
  )
}

export default PopularAnimeScreen
