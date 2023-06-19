// import { Canvas, LinearGradient, Rect, vec } from "@shopify/react-native-skia"
import React from "react"
import { SafeAreaView, ScrollView, StyleSheet, View } from "react-native"
import { HEIGHT, WIDTH } from "../../utils/dimensions"
import TopCardSection from "./TopCardSection"
import RecentEpisodes from "./RecentEpisodes"
import { LinearGradient } from "expo-linear-gradient"

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
