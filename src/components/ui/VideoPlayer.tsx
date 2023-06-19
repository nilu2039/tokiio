import { AVPlaybackStatusSuccess, Audio, Video } from "expo-av"
import { useEffect, useRef, useState } from "react"

const VideoPlayer = () => {
  const videoRef = useRef(null)
  const [status, setStatus] = useState<AVPlaybackStatusSuccess>()

  useEffect(() => {
    triggerAudio()
  }, [videoRef, status?.isPlaying])
  const triggerAudio = async () => {
    await Audio.setAudioModeAsync({ playsInSilentModeIOS: true })
  }
  return (
    <Video
      ref={videoRef}
      style={{ height: 500 }}
      source={{
        uri: "https://www051.anifastcdn.info/videos/hls/Q4c8gpbDQa4_fLwh_QdbHQ/1687120072/203090/f134bc36b9bb59de2ef28a48a7cef6bf/ep.2.1681918907.m3u8",
      }}
      useNativeControls
      onPlaybackStatusUpdate={(status) => {
        setStatus(status as AVPlaybackStatusSuccess)
      }}
      isMuted={false}
      shouldPlay={true}
    />
  )
}

export default VideoPlayer
