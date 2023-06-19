import { View, Text } from "react-native"
import React from "react"
import { LinearGradient } from "expo-linear-gradient"
import { COLORS } from "../../config/colors"
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from "react-native-responsive-screen"
import { StyleProp } from "react-native"
import { TextStyle } from "react-native"

interface GradientTextProps {
  style: StyleProp<TextStyle>
  label: string
}

const GradientText: React.FC<GradientTextProps> = ({ style, label }) => {
  return <Text style={style}>{label}</Text>
}

export default GradientText
