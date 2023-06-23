import React, { FC, useState } from "react"
import type { StyleProp, TextStyle } from "react-native"
import { ActivityIndicator, Image, Pressable, Text, View } from "react-native"
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen"
import { COLORS } from "../../config/colors"
import { ViewStyle } from "react-native"
import { startCase } from "lodash"

interface AnimeCardsProps {
  title: string
  id: string | undefined
  imageUri: string
  episodeNumber?: number
  onPress?: () => void
  titleStyle?: StyleProp<TextStyle>
  containerStyle?: StyleProp<ViewStyle>
}

const AnimeCard: FC<AnimeCardsProps> = ({
  id,
  title,
  imageUri,
  episodeNumber,
  onPress,
  titleStyle,
  containerStyle,
}) => {
  const [imageBackgroundLoading, setImageBackgroundLoading] = useState(true)
  return (
    <Pressable
      onPress={onPress}
      style={[
        {
          height: hp(25),
          width: wp(40),
          backgroundColor: "transparent",
          borderColor: "gray",
          borderWidth: wp(0.1),
          borderRadius: wp(2),
          borderBottomLeftRadius: episodeNumber ? 0 : wp(2),
        },
        containerStyle,
      ]}
    >
      <View style={{ marginBottom: hp(1.2) }}>
        <View
          style={{
            width: wp(40),
            height: hp(25),
            marginBottom: hp(1.5),
            position: "relative",
          }}
        >
          <Image
            source={{ uri: imageUri }}
            onLoadEnd={() => setImageBackgroundLoading(false)}
            style={{
              width: wp(40),
              height: hp(25),
              marginBottom: hp(1.5),
              position: "relative",
              borderRadius: wp(2),
              borderBottomLeftRadius: episodeNumber ? 0 : wp(2),
            }}
          />
          {imageBackgroundLoading ? (
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <ActivityIndicator color={COLORS.white} size={wp(20)} />
            </View>
          ) : null}
        </View>
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
        {title ? title : startCase(id)}
      </Text>
    </Pressable>
  )
}

export default AnimeCard
