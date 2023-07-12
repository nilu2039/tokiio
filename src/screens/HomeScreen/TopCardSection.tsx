import {
  View,
  ActivityIndicator,
  Modal,
  Pressable as TouchableOpacity,
  Text,
} from "react-native"
import React, { useState } from "react"
import Carousel from "../../components/ui/Carousel"
import { HEIGHT, WIDTH } from "../../utils/dimensions"
import { getTopAiring } from "../../services/exploreRequests"
import { TopAiringResult } from "../../types/explore"
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen"
import { COLORS } from "../../config/colors"
import GradientText from "../../components/ui/GradientText"
import TopAiringModal from "./TopAiringModal"
import { useInfiniteQuery } from "@tanstack/react-query"
import { useAuth } from "@clerk/clerk-expo"

const SLIDER_WIDTH = WIDTH
const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.8)
// const ITEM_HEIGHT = Math.round((ITEM_WIDTH * 3) / 4)
const ITEM_HEIGHT = Math.round(hp(30))

const TopCardSection = () => {
  const [modalVisible, setModalVisible] = useState(false)
  const { getToken } = useAuth()

  const { data, isLoading, fetchNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["top-airing"],
      queryFn: ({ pageParam = 1 }) =>
        getTopAiring({ page: pageParam, getToken }),
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

  // console.log(data?.pages[0]?.results[0].title)

  return (
    <View
      style={{
        // position: "absolute",
        width: WIDTH,
        // backgroundColor: "lightblue",
        height: hp(40),
        top: 0,
      }}
    >
      <Modal animationType="fade" transparent={true} visible={modalVisible}>
        <TopAiringModal setModalVisible={setModalVisible} />
      </Modal>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginTop: hp(2),
          justifyContent: "space-between",
          paddingHorizontal: wp(10),
          zIndex: 999,
        }}
      >
        <GradientText label="Top Airing" />

        <TouchableOpacity
          style={{
            borderColor: "gray",
            borderWidth: wp(0.2),
            paddingVertical: wp(0.7),
            paddingHorizontal: wp(3),
            borderRadius: wp(10),
          }}
          onPress={() => {
            setModalVisible(true)
          }}
        >
          <Text style={{ color: COLORS.white, fontWeight: "bold" }}>More</Text>
        </TouchableOpacity>
      </View>
      <Carousel
        style={{
          width: ITEM_WIDTH,
          height: ITEM_HEIGHT,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "transparent",
          marginTop: hp(8),
          borderRadius: wp(2),
        }}
        SLIDER_WIDTH={SLIDER_WIDTH}
        ITEM_HEIGHT={ITEM_HEIGHT}
        ITEM_WIDTH={ITEM_WIDTH}
        data={
          data?.pages.flatMap((item) => item?.results) as
            | TopAiringResult[]
            | undefined
        }
      />
    </View>
  )
}

export default TopCardSection
