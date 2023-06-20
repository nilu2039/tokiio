import { DefaultTheme, NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { QueryClient, QueryClientProvider } from "react-query"
import HomeScreen from "./src/screens/HomeScreen/HomeScreen"
import Player from "./src/screens/Player/Player"
import type { TopAiringResult } from "./src/types/explore"

export type RootStackProps = {
  HomeScreen: undefined
  Player: (TopAiringResult & { episodeId?: string }) | undefined
}

const Stack = createNativeStackNavigator<RootStackProps>()

const queryClient = new QueryClient()

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
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
              statusBarColor: "#000",
              headerStyle: {
                backgroundColor: "#000",
              },
            }}
            name="Player"
            component={Player}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </QueryClientProvider>
  )
}
