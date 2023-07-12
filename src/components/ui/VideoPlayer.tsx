import { useAuth } from "@clerk/clerk-expo"
import { DefaultEventsMap } from "@socket.io/component-emitter"
import { AVPlaybackStatusSuccess, Audio, Video } from "expo-av"
import { FC, useEffect, useRef, useState } from "react"
import { ActivityIndicator, StyleProp, View, ViewStyle } from "react-native"
import { heightPercentageToDP } from "react-native-responsive-screen"
import { Socket, io } from "socket.io-client"
import { SOCKET_URL } from "../../utils/constants"

interface VideoPlayerProps {
  uri: string
  style: StyleProp<ViewStyle>
  timeStamp?: number
  mutationFn?: ({ status }: { status: AVPlaybackStatusSuccess }) => void
  socketFn?: ({
    status,
    socket,
  }: {
    status: AVPlaybackStatusSuccess
    socket?: Socket<DefaultEventsMap, DefaultEventsMap>
  }) => void
}

const VideoPlayer: FC<VideoPlayerProps> = ({
  uri,
  style,
  socketFn,
  timeStamp,
  mutationFn,
}) => {
  const videoRef = useRef<Video>(null)
  const [status, setStatus] = useState<AVPlaybackStatusSuccess>()
  const [isInitialLoading, setIsInitialLoading] = useState(true)
  const [isPlaying, setIsPlaying] = useState(false)

  // const [socket, setSocket] =
  //   useState<Socket<DefaultEventsMap, DefaultEventsMap>>()

  useEffect(() => {
    if (videoRef.current) {
      timeStamp && videoRef.current.setPositionAsync(timeStamp)
    }
  }, [videoRef])

  // useEffect(() => {
  //   const _socket = io(SOCKET_URL)
  //   setSocket(_socket)
  //   return () => {
  //     _socket.disconnect()
  //   }
  // }, [])

  useEffect(() => {
    mutationFn && status && mutationFn({ status: status })

    return () => {
      mutationFn && mutationFn({ status: status as AVPlaybackStatusSuccess })
    }
  }, [isPlaying])

  useEffect(() => {
    triggerAudio()
  }, [])
  const triggerAudio = async () => {
    await Audio.setAudioModeAsync({ playsInSilentModeIOS: true })
  }

  return (
    <>
      <Video
        ref={videoRef}
        // progressUpdateIntervalMillis={10000}
        style={style}
        source={{
          uri: uri,
        }}
        useNativeControls
        onLoad={() => setIsInitialLoading(false)}
        onPlaybackStatusUpdate={async (status) => {
          // socketFn &&
          //   socketFn({ status: status as AVPlaybackStatusSuccess, socket })
          setStatus(status as AVPlaybackStatusSuccess)
          if ((status as AVPlaybackStatusSuccess).isPlaying) {
            setIsPlaying(true)
          } else {
            setIsPlaying(false)
          }
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
