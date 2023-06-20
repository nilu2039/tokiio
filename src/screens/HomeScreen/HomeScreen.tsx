// import { Canvas, LinearGradient, Rect, vec } from "@shopify/react-native-skia"
import { LinearGradient } from "expo-linear-gradient"
import React from "react"
import { SafeAreaView, ScrollView, StyleSheet } from "react-native"
import { WIDTH } from "../../utils/dimensions"
import RecentEpisodes from "./RecentEpisodes"
import TopCardSection from "./TopCardSection"

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
        <ScrollView>
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
