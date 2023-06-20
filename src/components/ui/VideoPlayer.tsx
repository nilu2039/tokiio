import { AVPlaybackStatusSuccess, Audio, Video } from "expo-av"
import { FC, useEffect, useRef, useState } from "react"
import { ActivityIndicator, SafeAreaView, View, ViewStyle } from "react-native"
import { StyleProp } from "react-native"
import { heightPercentageToDP } from "react-native-responsive-screen"

interface VideoPlayerProps {
  uri: string
  style: StyleProp<ViewStyle>
}

const VideoPlayer: FC<VideoPlayerProps> = ({ uri, style }) => {
  const videoRef = useRef(null)
  const [status, setStatus] = useState<AVPlaybackStatusSuccess>()
  const [isInitialLoading, setIsInitialLoading] = useState(true)

  useEffect(() => {
    triggerAudio()
  }, [videoRef, status?.isPlaying])
  const triggerAudio = async () => {
    await Audio.setAudioModeAsync({ playsInSilentModeIOS: true })
  }
  return (
    <>
      <Video
        ref={videoRef}
        style={style}
        source={{
          uri: uri,
        }}
        useNativeControls
        onLoad={() => setIsInitialLoading(false)}
        onPlaybackStatusUpdate={(status) => {
          setStatus(status as AVPlaybackStatusSuccess)
        }}
        isMuted={false}
        shouldPlay={true}
      />
      {isInitialLoading ? (
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <View
            style={{
              position: "absolute",
              top: -heightPercentageToDP(20),
            }}
          >
            <ActivityIndicator />
          </View>
        </View>
      ) : null}
    </>
  )
}

export default VideoPlayer
