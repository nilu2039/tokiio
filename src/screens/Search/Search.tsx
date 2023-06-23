import { View, Text, ActivityIndicator, SafeAreaView } from "react-native"
import React, { FC } from "react"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { RootStackProps } from "../../../App"
import { useInfiniteQuery } from "react-query"
import { searchAnime } from "../../services/exploreRequests"
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen"
import { FontAwesome } from "@expo/vector-icons"

import { COLORS } from "../../config/colors"
import { HEIGHT, WIDTH } from "../../utils/dimensions"
import { FlashList } from "@shopify/flash-list"
import AnimeCard from "../../components/ui/AnimeCards"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { startCase } from "lodash"
import { LinearGradient } from "expo-linear-gradient"
import GradientText from "../../components/ui/GradientText"
import GradientBackground from "../../components/ui/GradientBackground"

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
    queryKey: "search-anime",
    cacheTime: 0,
    queryFn: ({ pageParam = 1 }) =>
      searchAnime({ searchQuery, page: pageParam }),
    getNextPageParam: (lastPage) => {
      if (lastPage?.currentPage) {
        if (lastPage.hasNextPage) {
          return parseFloat(lastPage?.currentPage) + 1
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
                containerStyle={{ marginLeft: wp(4.6) }}
                title={item?.title as string}
                imageUri={item?.image as string}
                titleStyle={{ textAlign: "center" }}
                onPress={() => {
                  navigation.navigate("Player", {
                    id: item?.id as string,
                    title: item?.title
                      ? item?.title
                      : (startCase(item?.id) as string),
                    image: item?.image as string,
                    url: item?.url as string,
                    genres: [],
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
