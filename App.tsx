import { DefaultTheme, NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import HomeScreen from "./src/screens/HomeScreen/HomeScreen"
import Player from "./src/screens/Player/Player"
import type { TopAiringResult } from "./src/types/explore"
import Search from "./src/screens/Search/Search"
import PopularAnimeScreen from "./src/screens/PopularAnime/PopularAnimeScreen"
import { StatusBar } from "expo-status-bar"
import { Platform } from "react-native"

export type RootStackProps = {
  HomeScreen: undefined
  Player: TopAiringResult | undefined
  Search: {
    searchQuery: string
  }
  PopularAnime: undefined
}

const Stack = createNativeStackNavigator<RootStackProps>()

const queryClient = new QueryClient()

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
      <NavigationContainer
        theme={{
          ...DefaultTheme,
          dark: true,
          colors: {
            ...DefaultTheme.colors,
            background: "#000",
          },
        }}
      >
        <Stack.Navigator screenOptions={{ animation: "default" }}>
          <Stack.Screen
            options={{ headerShown: false }}
            name="HomeScreen"
            component={HomeScreen}
          />
          <Stack.Screen
            options={{
              headerShown: false,
            }}
            name="Player"
            component={Player}
          />
          <Stack.Screen
            options={{ headerShown: false }}
            name="Search"
            component={Search}
          />
          <Stack.Screen
            options={{ headerShown: false }}
            name="PopularAnime"
            component={PopularAnimeScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </QueryClientProvider>
  )
}
