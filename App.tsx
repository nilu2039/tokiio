import { DefaultTheme, NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import * as SecureStore from "expo-secure-store"
import { StatusBar } from "expo-status-bar"
import { Platform } from "react-native"
import HomeScreen from "./src/screens/HomeScreen/HomeScreen"
import Player from "./src/screens/Player/Player"
import PopularAnimeScreen from "./src/screens/PopularAnime/PopularAnimeScreen"
import Search from "./src/screens/Search/Search"
import type { TopAiringResult } from "./src/types/explore"

import { ClerkProvider } from "@clerk/clerk-expo"
import ContinueWatchingScreen from "./src/screens/ContinueWatching/ContinueWatchingScreen"

export type RootStackProps = {
  HomeScreen: undefined
  // Player: TopAiringResult | undefined
  Player:
    | {
        id: string
        title:
          | {
              romaji: string | null
              english: string | null
              native: string | null
              userPreferred: string | null
            }
          | null
          | undefined
      }
    | undefined
  Search: {
    searchQuery: string
  }
  PopularAnime: undefined
  ContinueWatching: undefined
}

const Stack = createNativeStackNavigator<RootStackProps>()

const queryClient = new QueryClient()
const CLERK_PUBLISHABLE_KEY =
  "pk_test_ZW5hYmxlZC1ib25lZmlzaC01MC5jbGVyay5hY2NvdW50cy5kZXYk"

const tokenCache = {
  async getToken(key: string) {
    try {
      return SecureStore.getItemAsync(key)
    } catch (err) {
      return null
    }
  },
  async saveToken(key: string, value: string) {
    try {
      return SecureStore.setItemAsync(key, value)
    } catch (err) {
      return
    }
  },
}

export default function App() {
  return (
    <ClerkProvider
      tokenCache={tokenCache}
      publishableKey={CLERK_PUBLISHABLE_KEY}
    >
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
            <Stack.Screen
              options={{ headerShown: false }}
              name="ContinueWatching"
              component={ContinueWatchingScreen}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </QueryClientProvider>
    </ClerkProvider>
  )
}
