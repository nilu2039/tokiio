import { useAuth } from "@clerk/clerk-expo"
import { useNavigation } from "@react-navigation/native"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { useQuery } from "@tanstack/react-query"
import React from "react"
import {
  ActivityIndicator,
  FlatList,
  Text,
  TouchableOpacity,
  View,
} from "react-native"
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen"
import { RootStackProps } from "../../../App"
import AnimeCard from "../../components/ui/AnimeCards"
import GradientText from "../../components/ui/GradientText"
import { getHistory } from "../../services/historyRequests"
import { COLORS } from "../../config/colors"

const ContinueWatching = () => {
  const { getToken } = useAuth()

  const { data: historyData, isError: isHistoryLoading } = useQuery({
    queryKey: ["anime-history-without-pagination"],
    queryFn: () => getHistory({ page: 1, getToken }),
  })

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackProps, "Player">>()

  if (isHistoryLoading) {
    return (
      <View
        style={{
          width: wp(100),
          height: hp(42),
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <ActivityIndicator />
      </View>
    )
  }

  return (
    <View style={{ minHeight: hp(42) }}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          paddingHorizontal: wp(10),
          marginBottom: 17,
        }}
      >
        <GradientText label="Continue Watching" />
        <TouchableOpacity
          style={{
            borderColor: "gray",
            borderWidth: wp(0.2),
            paddingVertical: wp(0.7),
            paddingHorizontal: wp(3),
            borderRadius: wp(10),
          }}
          onPress={() => {
            navigation.navigate("ContinueWatching")
          }}
        >
          <Text style={{ color: COLORS.white, fontWeight: "bold" }}>More</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        horizontal
        // estimatedItemSize={10}
        data={historyData?.result}
        renderItem={({ item }) => {
          return (
            <AnimeCard
              id={item.animeId}
              containerStyle={{ marginLeft: wp(4.6) }}
              title={item.animeTitle}
              imageUri={item.animeImg}
              titleStyle={{ textAlign: "center" }}
              onPress={() => {
                navigation.navigate("Player", {
                  id: item?.animeId,
                  title: {
                    english: item?.animeTitle,
                    romaji: "",
                    native: "",
                    userPreferred: "",
                  },
                })
              }}
            />
          )
        }}
      />
    </View>
  )
}

export default ContinueWatching
