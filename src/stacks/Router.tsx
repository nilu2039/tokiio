import { View, Text } from "react-native"
import React from "react"
import { NavigationContainer } from "@react-navigation/native"
import HomeStack from "./HomeStack"

const Router = () => {
  return (
    <NavigationContainer>
      <HomeStack />
    </NavigationContainer>
  )
}

export default Router
