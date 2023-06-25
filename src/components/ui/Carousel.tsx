import {
  View,
  Text,
  Image,
  ImageBackground,
  ActivityIndicator,
} from "react-native"
import type { StyleProp, ViewStyle } from "react-native"
import React, { useState } from "react"
import CardCarousel from "react-native-snap-carousel"
import type { TopAiringResult } from "../../types/explore"
import { startCase } from "lodash"
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen"
import { COLORS } from "../../config/colors"
import { LinearGradient } from "expo-linear-gradient"
import UIButton from "./UIButton"

import { Foundation } from "@expo/vector-icons"
import { useNavigation } from "@react-navigation/native"
import type {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from "@react-navigation/native-stack"
import { RootStackProps } from "../../../App"

// import {
//   BackdropBlur,
//   Canvas,
//   Image,
//   LinearGradient,
//   RoundedRect,
//   SkImage,
//   useImage,
//   vec,
// } from "@shopify/react-native-skia"

interface CarouselProps {
  style: StyleProp<ViewStyle>
  SLIDER_WIDTH: number
  ITEM_WIDTH: number
  ITEM_HEIGHT: number
  data: TopAiringResult[] | undefined
}

interface ThumbNailProps {
  item: TopAiringResult
  style: StyleProp<ViewStyle>
  ITEM_WIDTH: number
  ITEM_HEIGHT: number
}

// const ThumbNailCard: React.FC<ThumbNailProps> = ({
//   item,
//   style,
//   ITEM_HEIGHT,
//   ITEM_WIDTH,
// }) => {
//   const imageThumbnail = useImage(item.image)
//   return (
//     <View style={style}>
//       <Canvas style={{ width: ITEM_WIDTH, height: ITEM_HEIGHT }}>
//         {imageThumbnail ? (
//           <>
//             <Image
//               style={"stroke"}
//               image={imageThumbnail}
//               fit="fitWidth"
//               x={0}
//               y={0}
//               width={ITEM_WIDTH}
//               height={ITEM_HEIGHT}
//             />
//             {/* <BackdropBlur
//               blur={4}
//               clip={{ x: 0, y: 0, width: ITEM_WIDTH, height: ITEM_HEIGHT }}
//             /> */}
//           </>
//         ) : null}
//       </Canvas>
//     </View>
//   )
// }

const Carousel: React.FC<CarouselProps> = ({
  style,
  SLIDER_WIDTH,
  ITEM_WIDTH,
  ITEM_HEIGHT,
  data = [],
}) => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackProps>>()
  const [imageBackgroundLoading, setImageBackgroundLoading] = useState(true)

  const _renderItem = ({
    item,
    index,
  }: {
    item: TopAiringResult
    index: number
  }) => {
    return (
      <View style={style}>
        <ImageBackground
          onLoadEnd={() => setImageBackgroundLoading(false)}
          style={{
            width: ITEM_WIDTH,
            height: ITEM_HEIGHT,
            borderRadius: wp(2),
          }}
          source={{ uri: item?.image! }}
        >
          <LinearGradient
            style={{
              width: ITEM_WIDTH,
              height: ITEM_HEIGHT,
              opacity: 0.9,
              justifyContent: "flex-end",
            }}
            start={{ x: 0.15, y: 0 }}
            end={{ x: 1, y: 0 }}
            colors={["#000", "transparent"]}
          >
            {imageBackgroundLoading ? (
              <View
                style={{
                  height: ITEM_HEIGHT - wp(5),
                  width: ITEM_WIDTH,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <ActivityIndicator color={COLORS.white} size={wp(20)} />
              </View>
            ) : null}
            <View style={{ padding: wp(5), gap: hp(1.5) }}>
              <Text
                numberOfLines={2}
                style={{
                  fontSize: wp(6),
                  width: ITEM_WIDTH * 0.6,
                  color: COLORS.white,
                  fontWeight: "600",
                }}
              >
                {item?.title?.english}
              </Text>
              <UIButton
                containerStyle={{
                  // backgroundColor: "#966c3b",
                  width: wp(34),
                  height: hp(4.5),
                  borderRadius: wp(1.5),
                  alignItems: "center",
                  justifyContent: "center",
                }}
                onPress={() =>
                  navigation.navigate("Player", {
                    ...item,
                  })
                }
                label="Play Now"
                labelStyle={{
                  color: COLORS.white,
                  fontSize: wp(4),
                  fontWeight: "bold",
                  textTransform: "uppercase",
                }}
                Icon={<Foundation name="play" size={24} color={COLORS.white} />}
              />
            </View>
          </LinearGradient>
        </ImageBackground>
      </View>
    )
  }

  return (
    <View
      style={{
        position: "absolute",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <CardCarousel
        loop
        autoplay={false}
        autoplayDelay={1000}
        layout="default"
        data={data}
        renderItem={_renderItem}
        sliderWidth={SLIDER_WIDTH}
        itemWidth={ITEM_WIDTH}
        itemHeight={ITEM_HEIGHT}
      />
    </View>
  )
}

export default Carousel
