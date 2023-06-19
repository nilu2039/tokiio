import { View, Text } from "react-native"
import React from "react"
import { LinearGradient } from "expo-linear-gradient"
import { COLORS } from "../../config/colors"
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen"
import { StyleProp } from "react-native"
import { TextStyle } from "react-native"

interface GradientTextProps {
  style?: StyleProp<TextStyle>
  label: string
}

const defaultStyle: StyleProp<TextStyle> = {
  color: COLORS.white,
  fontSize: wp(6),
  fontWeight: "600",
}

const GradientText: React.FC<GradientTextProps> = ({ style, label }) => {
  return <Text style={[{ ...defaultStyle }, style]}>{label}</Text>
}

export default GradientText
