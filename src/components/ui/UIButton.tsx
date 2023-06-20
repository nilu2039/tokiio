import React, { ReactElement } from "react"
import { Pressable, StyleProp, Text, View, ViewStyle } from "react-native"
import { COLORS } from "../../config/colors"
import { TextStyle } from "react-native"
import { LinearGradient } from "expo-linear-gradient"
import { widthPercentageToDP } from "react-native-responsive-screen"

interface UIButtonProps {
  containerStyle?: StyleProp<ViewStyle>
  labelStyle?: StyleProp<TextStyle>
  onPress?: () => void
  label: string
  Icon?: ReactElement
}

const UIButton: React.FC<UIButtonProps> = ({
  onPress,
  containerStyle,
  labelStyle,
  label,
  Icon,
}) => {
  return (
    <LinearGradient
      start={{ x: 0.15, y: 0 }}
      end={{ x: 1, y: 0 }}
      colors={["#ceb78d", "#966c3b"]}
      style={containerStyle}
    >
      <Pressable style={containerStyle} onPress={onPress}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: widthPercentageToDP(2),
          }}
        >
          {Icon ? Icon : null}
          <Text style={labelStyle}>{label}</Text>
        </View>
      </Pressable>
    </LinearGradient>
  )
}

export default UIButton
