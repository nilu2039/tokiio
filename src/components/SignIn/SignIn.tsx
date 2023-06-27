import { View, Text, Pressable, ActivityIndicator, Image } from "react-native"
import React from "react"
import { COLORS } from "../../config/colors"
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen"
import {
  useOAuth,
  useAuth,
  SignedIn,
  SignedOut,
  useSignIn,
  useUser,
} from "@clerk/clerk-expo"
import { useWarmUpBrowser } from "../../hooks/useWarmUpBrowser"

const SignIn = () => {
  const [oAuthStateLoading, setOAuthStateLoading] = React.useState(false)
  const [signingOut, setSigningOut] = React.useState(false)
  useWarmUpBrowser()
  const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" })

  const onPress = async () => {
    try {
      setOAuthStateLoading(true)
      const { createdSessionId, setActive } = await startOAuthFlow()
      setOAuthStateLoading(false)
      if (createdSessionId) {
        setActive && setActive({ session: createdSessionId })
      }
    } catch (err) {
      console.error("OAuth error", err)
    }
  }

  const { signOut } = useAuth()
  const { user } = useUser()

  return (
    <View>
      {oAuthStateLoading || signingOut ? (
        <View
          style={{
            borderColor: "gray",
            borderRadius: wp(100),
            borderWidth: wp(0.2),
            width: wp(18),
            height: hp(3.5),
            marginLeft: wp(4),
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <ActivityIndicator />
        </View>
      ) : (
        <>
          <SignedIn>
            <Pressable
              style={{
                borderColor: "gray",

                marginLeft: wp(5),
                alignItems: "center",
                justifyContent: "center",
              }}
              onPress={async () => {
                setSigningOut(true)
                await signOut()
                setSigningOut(false)
              }}
            >
              <View>
                {user ? (
                  <Image
                    style={{
                      width: wp(6),
                      height: hp(3),
                      borderRadius: wp(50),
                    }}
                    resizeMode="cover"
                    source={{ uri: user.profileImageUrl }}
                  />
                ) : null}
              </View>
            </Pressable>
          </SignedIn>
          <SignedOut>
            <Pressable
              style={{
                borderColor: "gray",
                borderRadius: wp(100),
                borderWidth: wp(0.2),
                width: wp(18),
                height: hp(3.5),
                marginLeft: wp(4),
                alignItems: "center",
                justifyContent: "center",
              }}
              onPress={onPress}
            >
              <Text style={{ color: COLORS.white, fontWeight: "600" }}>
                Sign In
              </Text>
            </Pressable>
          </SignedOut>
        </>
      )}
    </View>
  )
}

export default SignIn
