import React, { FC } from "react"
import type { StyleProp, TextStyle } from "react-native"
import { Image, Pressable, Text, View } from "react-native"
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen"
import { COLORS } from "../../config/colors"
import { ViewStyle } from "react-native"

interface AnimeCardsProps {
  title: string
  imageUri: string
  episodeNumber?: number
  onPress?: () => void
  titleStyle?: StyleProp<TextStyle>
  containerStyle?: StyleProp<ViewStyle>
}

const AnimeCard: FC<AnimeCardsProps> = ({
  title,
  imageUri,
  episodeNumber,
  onPress,
  titleStyle,
  containerStyle,
}) => {
  return (
    <Pressable
      onPress={onPress}
      style={[
        {
          height: hp(25),
          width: wp(40),
          backgroundColor: "lightgray",
          borderRadius: wp(2),
          borderBottomLeftRadius: 0,
        },
        containerStyle,
      ]}
    >
      <View style={{ marginBottom: hp(1.2) }}>
        <Image
          source={{ uri: imageUri }}
          style={{
            width: wp(40),
            height: hp(25),
            marginBottom: hp(1.5),
            position: "relative",
            borderRadius: wp(2),
            borderBottomLeftRadius: 0,
          }}
        />
        {episodeNumber ? (
          <View
            style={{
              position: "absolute",
              bottom: -hp(0.5),
              backgroundColor: COLORS.brass,
              width: wp(15),
              height: hp(2),
              borderBottomLeftRadius: wp(1),
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text
              style={{
                color: COLORS.white,
                fontSize: wp(3),
                fontWeight: "600",
                textAlign: "center",
              }}
            >
              {episodeNumber}
            </Text>
          </View>
        ) : null}
      </View>
      <Text
        numberOfLines={2}
        style={[
          {
            color: COLORS.white,
            fontSize: wp(4),
            fontWeight: "600",
          },
          titleStyle,
        ]}
      >
        {title}
      </Text>
    </Pressable>
  )
}

export default AnimeCard
