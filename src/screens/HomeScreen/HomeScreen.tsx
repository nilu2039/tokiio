import React from "react"
import { Image, SafeAreaView, ScrollView, StyleSheet } from "react-native"

import { View } from "react-native"
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen"
import GradientBackground from "../../components/ui/GradientBackground"
import PopularAnime from "./PopularAnime"
import SearchModal from "./SearchModal"
import TopCardSection from "./TopCardSection"

const HomeScreen = () => {
  return (
    <GradientBackground>
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
          <PopularAnime />
        </ScrollView>
      </SafeAreaView>
    </GradientBackground>
  )
}

const styles = StyleSheet.create({
  container: {
    // alignItems: "center",
    // justifyContent: "center",
  },
})

export default HomeScreen
