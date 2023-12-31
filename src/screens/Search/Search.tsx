import { FontAwesome } from "@expo/vector-icons"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { useInfiniteQuery } from "@tanstack/react-query"
import React, { FC } from "react"
import { ActivityIndicator, SafeAreaView, View } from "react-native"
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen"
import { RootStackProps } from "../../../App"
import { searchAnime } from "../../services/exploreRequests"

import { FlashList } from "@shopify/flash-list"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import AnimeCard from "../../components/ui/AnimeCards"
import GradientBackground from "../../components/ui/GradientBackground"
import GradientText from "../../components/ui/GradientText"
import { COLORS } from "../../config/colors"
import { WIDTH } from "../../utils/dimensions"

type SearchRouteProps = NativeStackScreenProps<RootStackProps, "Search">

const Search: FC<SearchRouteProps> = ({ route, navigation }) => {
  const insets = useSafeAreaInsets()
  const { searchQuery } = route.params!
  const HEADER_TEXT = `Results found for ${searchQuery}`

  const {
    data: searchData,
    isLoading: searchDataLoading,
    fetchNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["search-anime-screen"],
    cacheTime: 0,
    queryFn: ({ pageParam = 1 }) =>
      searchAnime({ searchQuery, page: pageParam }),
    getNextPageParam: (lastPage) => {
      if (lastPage?.currentPage) {
        if (lastPage.hasNextPage) {
          return lastPage?.currentPage + 1
        }
      } else return 1
    },
  })

  if (searchDataLoading) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <ActivityIndicator size={wp(8)} />
      </View>
    )
  }

  return (
    <GradientBackground>
      <SafeAreaView style={{ flex: 1 }}>
        <View
          style={{
            marginVertical: hp(2),
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
            label={
              `${HEADER_TEXT}`.substring(0, 30) +
              `${HEADER_TEXT.length > 30 ? "..." : ""}`
            }
          />
        </View>
        <View style={{ flex: 1 }}>
          <FlashList
            data={searchData?.pages.flatMap((item) => item?.results)}
            estimatedItemSize={200}
            numColumns={2}
            onEndReachedThreshold={0.1}
            ListFooterComponent={
              <View>{isFetchingNextPage ? <ActivityIndicator /> : null}</View>
            }
            onEndReached={() => {
              fetchNextPage()
            }}
            ItemSeparatorComponent={() => <View style={{ height: hp(10) }} />}
            renderItem={({ item }) => (
              <AnimeCard
                id={item?.id}
                status={item?.status}
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

export default Search
