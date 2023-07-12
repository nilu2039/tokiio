import React, { useEffect } from "react"
import { Image, SafeAreaView, ScrollView, StyleSheet } from "react-native"

import * as WebBrowser from "expo-web-browser"
import { View } from "react-native"
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen"

import SignIn from "../../components/SignIn/SignIn"
import GradientBackground from "../../components/ui/GradientBackground"
import PopularAnime from "./PopularAnime"
import SearchModal from "./SearchModal"
import TopCardSection from "./TopCardSection"
import { useAuth } from "@clerk/clerk-expo"
import ContinueWatching from "./ContinueWatching"

WebBrowser.maybeCompleteAuthSession()

const HomeScreen = () => {
  const { userId } = useAuth()

  // useEffect(() => {
  //   const _getToken = async () => {
  //     const token = await getToken()
  //     console.log(token)
  //   }
  //   _getToken()
  // }, [])

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
          {userId ? <ContinueWatching /> : null}
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
