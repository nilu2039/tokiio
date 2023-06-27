import React from "react"
import {
  ActivityIndicator,
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  Touchable,
} from "react-native"

import { View } from "react-native"
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen"
import * as WebBrowser from "expo-web-browser"

import GradientBackground from "../../components/ui/GradientBackground"
import PopularAnime from "./PopularAnime"
import SearchModal from "./SearchModal"
import TopCardSection from "./TopCardSection"
import { COLORS } from "../../config/colors"
import { useWarmUpBrowser } from "../../hooks/useWarmUpBrowser"
import { useAuth, useOAuth } from "@clerk/clerk-expo"
import { TouchableOpacity } from "react-native-gesture-handler"
import SignIn from "../../components/SignIn/SignIn"

WebBrowser.maybeCompleteAuthSession()

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
            paddingHorizontal: wp(5),
          }}
        >
          <Image
            style={{
              width: wp(20),
              height: hp(7),
            }}
            source={require("../../../assets/icons/logo.png")}
          />
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <SearchModal />
            <SignIn />
          </View>
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
