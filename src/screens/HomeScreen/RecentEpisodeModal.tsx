import { View, Text, SafeAreaView, ActivityIndicator } from "react-native"
import React, { FC } from "react"
import { FontAwesome } from "@expo/vector-icons"
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen"
import { COLORS } from "../../config/colors"
import { useInfiniteQuery } from "react-query"
import { getRecentEpisodes } from "../../services/exploreRequests"
import { FlashList } from "@shopify/flash-list"
import AnimeCard from "../../components/ui/AnimeCards"
import { useNavigation } from "@react-navigation/native"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { RootStackProps } from "../../../App"
import { startCase } from "lodash"

interface RecentEpisodesProps {
  setModalVisible: (value: React.SetStateAction<boolean>) => void
}

const RecentEpisodeModal: FC<RecentEpisodesProps> = ({ setModalVisible }) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackProps, "Player">>()

  const { data, isLoading, fetchNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: "recent-episodes-screen",
      queryFn: ({ pageParam = 1 }) => getRecentEpisodes({ page: pageParam }),
      getNextPageParam: (lastPage) => {
        if (lastPage?.currentPage) {
          if (lastPage.hasNextPage) {
            return parseInt(lastPage?.currentPage) + 1
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
    <SafeAreaView style={{ backgroundColor: "#000", flex: 1 }}>
      <View style={{ paddingHorizontal: wp(5), paddingVertical: hp(1) }}>
        <FontAwesome
          onPress={() => {
            setModalVisible(false)
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
  )
}

export default RecentEpisodeModal
