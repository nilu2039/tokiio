import { View, Text, SafeAreaView, ActivityIndicator } from "react-native"
import React, { FC } from "react"
import GradientBackground from "../../components/ui/GradientBackground"
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen"
import { FontAwesome } from "@expo/vector-icons"
import GradientText from "../../components/ui/GradientText"
import { FlashList } from "@shopify/flash-list"
import AnimeCard from "../../components/ui/AnimeCards"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { RootStackProps } from "../../../App"
import { useInfiniteQuery } from "@tanstack/react-query"
import { getHistory } from "../../services/historyRequests"
import { useAuth } from "@clerk/clerk-expo"
import { COLORS } from "../../config/colors"

type ContinueWatchingProps = NativeStackScreenProps<
  RootStackProps,
  "ContinueWatching"
>

const ContinueWatchingScreen: FC<ContinueWatchingProps> = ({ navigation }) => {
  const { getToken } = useAuth()

  const {
    data: historyData,
    isLoading: historyLoadingData,
    fetchNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["anime-history-with-pagination"],
    // cacheTime: 0,
    queryFn: ({ pageParam = 1 }) => getHistory({ getToken, page: pageParam }),
    getNextPageParam: (lastPage) => {
      if (lastPage?.currentPage) {
        if (lastPage.hasNextPage) {
          return lastPage?.currentPage + 1
        }
      } else return 1
    },
  })

  if (historyLoadingData) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <ActivityIndicator />
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
            style={{ fontSize: wp(4), width: wp(100), textAlign: "center" }}
            label={`Continue Watching`}
          />
        </View>
        <View style={{ flex: 1 }}>
          <FlashList
            data={historyData?.pages.flatMap((item) => item?.result)}
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
                id={item?.animeId}
                containerStyle={{ marginLeft: wp(4.6) }}
                title={item?.animeTitle}
                imageUri={item?.animeImg as string}
                titleStyle={{ textAlign: "center" }}
                onPress={() => {
                  navigation.navigate("Player", {
                    id: item?.animeId as string,
                    title: {
                      english: item?.animeTitle as string,
                      romaji: "",
                      native: "",
                      userPreferred: "",
                    },
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

export default ContinueWatchingScreen
