import { LinearGradient } from "expo-linear-gradient"
import React, { FC, ReactNode } from "react"
import { WIDTH } from "../../utils/dimensions"

interface GradientBackgroundProps {
  children: ReactNode
}

const GradientBackground: FC<GradientBackgroundProps> = ({ children }) => {
  return (
    <LinearGradient
      colors={["#170C26", "#18051B", "#030303"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={{
        flex: 1,
        width: WIDTH,
      }}
    >
      {children}
    </LinearGradient>
  )
}

export default GradientBackground
