// import { Canvas, LinearGradient, Rect, vec } from "@shopify/react-native-skia"
import { LinearGradient } from "expo-linear-gradient"
import React from "react"
import { Image, SafeAreaView, ScrollView, StyleSheet, Text } from "react-native"

import { WIDTH } from "../../utils/dimensions"
import RecentEpisodes from "./RecentEpisodes"
import SearchModal from "./SearchModal"
import TopCardSection from "./TopCardSection"
import { View } from "react-native"
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen"

const HomeScreen = () => {
  return (
    <LinearGradient
      colors={["#472315", "#000", "#000"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={{
        // height: HEIGHT,
        flex: 1,
        width: WIDTH,
      }}
    >
      <SafeAreaView>
        <View
          style={{
            flexDirection: "row",
            width: wp(100),
            justifyContent: "space-between",
            alignItems: "center",
            paddingHorizontal: wp(10),
          }}
        >
          <Image
            style={{
              width: wp(20),
              height: hp(7),
            }}
            source={require("../../../assets/icons/logo.png")}
          />
          <SearchModal />
        </View>
        <ScrollView style={{ marginBottom: hp(5) }}>
          <TopCardSection />
          <RecentEpisodes />
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  )
}

const styles = StyleSheet.create({
  container: {
    // alignItems: "center",
    // justifyContent: "center",
  },
})

export default HomeScreen
