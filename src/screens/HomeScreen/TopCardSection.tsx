import { View, ActivityIndicator } from "react-native"
import React from "react"
import Carousel from "../../components/ui/Carousel"
import { HEIGHT, WIDTH } from "../../utils/dimensions"
import { useInfiniteQuery } from "react-query"
import { getTopAiring } from "../../services/exploreRequests"
import { TopAiringResult } from "../../types/explore"
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen"
import { COLORS } from "../../config/colors"
import GradientText from "../../components/ui/GradientText"

const SLIDER_WIDTH = WIDTH
const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.8)
const ITEM_HEIGHT = Math.round((ITEM_WIDTH * 3) / 4)

const TopCardSection = () => {
  const { data, isLoading, fetchNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: "top-airing",
      queryFn: ({ pageParam = 1 }) => getTopAiring({ page: pageParam }),
      getNextPageParam: (lastPage) => {
        if (lastPage?.currentPage) {
          if (lastPage.hasNextPage) {
            return lastPage?.currentPage + 1
          }
        } else return 1
      },
    })

  if (isLoading) {
    return <ActivityIndicator />
  }

  //   console.log(data?.pages.flatMap((item) => console.log(item?.results)))

  return (
    <View
      style={{
        position: "absolute",
        width: WIDTH,
        // backgroundColor: "lightblue",
        height: HEIGHT * 0.3,
        top: 0,
      }}
    >
      <GradientText
        style={{
          color: COLORS.white,
          fontSize: wp(6),
          fontWeight: "600",
          paddingLeft: wp(10),
          marginTop: hp(2),
        }}
        label="Top Airing"
      />
      <Carousel
        style={{
          width: ITEM_WIDTH,
          height: ITEM_HEIGHT,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "dodgerblue",
          marginTop: hp(8),
          borderRadius: wp(2),
        }}
        SLIDER_WIDTH={SLIDER_WIDTH}
        ITEM_HEIGHT={ITEM_HEIGHT}
        ITEM_WIDTH={ITEM_WIDTH}
        data={data?.pages.flatMap((item) => item?.results) as TopAiringResult[]}
      />
    </View>
  )
}

export default TopCardSection