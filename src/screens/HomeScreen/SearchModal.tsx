import {
  View,
  Text,
  TextInput,
  Modal,
  Alert,
  SafeAreaView,
  ActivityIndicator,
} from "react-native"
import React, { useState } from "react"
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen"
import { FontAwesome } from "@expo/vector-icons"

import { AntDesign } from "@expo/vector-icons"
import { COLORS } from "../../config/colors"
import { useNavigation } from "@react-navigation/native"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { RootStackProps } from "../../../App"
import { HEIGHT } from "../../utils/dimensions"
import { useQuery } from "react-query"
import { searchAnime } from "../../services/exploreRequests"
import { FlashList } from "@shopify/flash-list"
import AnimeCard from "../../components/ui/AnimeCards"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { startCase } from "lodash"

const SearchAnimeTextInput = () => {
  const insets = useSafeAreaInsets()
  const [modalVisible, setModalVisible] = useState(false)
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackProps, "Search">>()

  const [searchQuery, setSearchQuery] = useState("")

  const { data: searchData, isLoading: isSearchDataLoading } = useQuery({
    queryKey: ["anime-search-12", searchQuery],
    queryFn: () => searchAnime({ searchQuery, page: 1 }),
    enabled: !!searchQuery,
  })

  return (
    <View
      style={{
        alignSelf: "center",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        height: hp(5),
        // width: wp(90),
      }}
    >
      <View>
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setSearchQuery("")
            setModalVisible(!modalVisible)
          }}
        >
          <SafeAreaView style={{ backgroundColor: "#000", height: HEIGHT }}>
            <View>
              <View
                style={{
                  marginVertical: hp(2),
                  alignItems: "center",
                  flexDirection: "row",
                  width: wp(95),
                  alignSelf: "center",
                  justifyContent: "space-between",
                }}
              >
                <FontAwesome
                  onPress={() => {
                    setSearchQuery("")
                    setModalVisible(false)
                  }}
                  name="angle-left"
                  size={wp(7)}
                  color={COLORS.white}
                />
                <TextInput
                  style={{
                    width: wp(80),
                    height: hp(5),
                    backgroundColor: COLORS.gunmetal,
                    alignSelf: "center",
                    borderRadius: wp(5),
                    paddingHorizontal: wp(5),
                    borderWidth: wp(0.2),
                    color: COLORS.white,
                    fontWeight: "600",
                  }}
                  onChangeText={(text) => setSearchQuery(text)}
                  placeholder="search anime..."
                  placeholderTextColor="gray"
                />
                <AntDesign
                  disabled={!searchQuery}
                  onPress={() => {
                    setSearchQuery("")
                    setModalVisible(false)
                    navigation.navigate("Search", {
                      searchQuery,
                    })
                  }}
                  name="search1"
                  size={wp(6)}
                  color={COLORS.white}
                />
              </View>
              {!isSearchDataLoading ? (
                <View style={{ height: HEIGHT - insets.top - hp(3) - hp(10) }}>
                  <FlashList
                    data={searchData?.results}
                    estimatedItemSize={200}
                    numColumns={2}
                    //   onEndReached={() => console.log("END REACHED")}
                    ItemSeparatorComponent={() => (
                      <View style={{ height: hp(10) }} />
                    )}
                    renderItem={({ item }) => (
                      <AnimeCard
                        // totalEpisodes={item.}
                        containerStyle={{ marginLeft: wp(4.6) }}
                        title={item?.title as string}
                        imageUri={item?.image as string}
                        titleStyle={{ textAlign: "center" }}
                        onPress={() => {
                          setModalVisible(false)
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
              ) : (
                <View
                  style={{
                    width: wp(100),
                    height: hp(70),
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <ActivityIndicator size={wp(20)} />
                </View>
              )}
            </View>
          </SafeAreaView>
        </Modal>
        <AntDesign
          onPress={() => {
            setSearchQuery("")
            setModalVisible(!modalVisible)
          }}
          name="search1"
          size={wp(6)}
          color={COLORS.copper}
        />
      </View>
    </View>
  )
}

export default SearchAnimeTextInput
