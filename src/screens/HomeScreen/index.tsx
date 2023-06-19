import { Canvas, LinearGradient, Rect, vec } from "@shopify/react-native-skia"
import React from "react"
import { SafeAreaView, StyleSheet, View } from "react-native"
import { HEIGHT, WIDTH } from "../../utils/dimensions"
import TopCardSection from "./TopCardSection"

const HomeScreen = () => {
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Canvas
          style={{
            height: HEIGHT,
            width: WIDTH,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Rect x={0} y={0} width={WIDTH} height={HEIGHT} opacity={0.5}>
            <LinearGradient
              start={vec(256, 256)}
              end={vec(0, 0)}
              colors={["#000", "#944D32"]}
            />
          </Rect>
        </Canvas>
        <TopCardSection />
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
})

export default HomeScreen
