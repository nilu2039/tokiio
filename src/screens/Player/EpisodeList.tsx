import { Foundation } from "@expo/vector-icons"
import React, { FC, useEffect, useRef, useState } from "react"
import {
  ActivityIndicator,
  FlatList,
  Image,
  Pressable,
  Text,
  View,
} from "react-native"
import { HEIGHT, WIDTH } from "../../utils/dimensions"

import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { useQuery } from "react-query"
import VideoPlayer from "../../components/ui/VideoPlayer"
import { COLORS } from "../../config/colors"
import { getStreamingLinks } from "../../services/exploreRequests"
import { AnimeInfo } from "../../types/explore"
import EpisodeDescription from "./EpisodeDescription"

interface EpisodeListProps {
  data: AnimeInfo | null | undefined
  episodeId?: string
}

const EpisodeList: FC<EpisodeListProps> = ({ data, episodeId }) => {
  if (data?.episodes.length === 0) {
    return (
      <View
        style={{
          height: hp(90),
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text
          style={{ color: COLORS.white, fontSize: wp(12), fontWeight: "600" }}
        >
          {data.status}
        </Text>
      </View>
    )
  }

  const insets = useSafeAreaInsets()
  const [selectedEpisodeId, setSelectedEpisodeId] = useState(
    episodeId ? episodeId : data?.episodes[0].id
  )
  const [firstView, setFirstView] = useState(true)

  const listRef = useRef<FlatList>(null)
  const scrollToIndex = (index: number) => {
    if (listRef.current) {
      listRef.current.scrollToIndex({ index })
    }
  }

  const { data: streamingLinkData, isLoading: isStreamingLinkLoading } =
    useQuery({
      queryKey: ["streaming-links", selectedEpisodeId],
      queryFn: () => getStreamingLinks({ episodeId: selectedEpisodeId }),
    })

  if (firstView && listRef.current) {
    if (episodeId) {
      scrollToIndex(data?.totalEpisodes! - 1 || 0)
      setFirstView(false)
    }
  }

  const extractBestStreamingUrl = (
    sources:
      | {
          url: string
          isM3U8: boolean
          quality: string
        }[]
      | undefined
  ) => {
    const p_1080 = sources?.find((item) => item.quality === "1080p")
    if (p_1080) return p_1080.url
    const p_720 = sources?.find((item) => item.quality === "720p")
    if (p_720) return p_720.url
    const p_480 = sources?.find((item) => item.quality === "480p")
    if (p_480) return p_480.url
    const p_360 = sources?.find((item) => item.quality === "360p")
    if (p_360) return p_360.url
  }

  return (
    <View
      style={{
        height: HEIGHT - insets.top - hp(5),
      }}
    >
      {isStreamingLinkLoading ? (
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            width: WIDTH,
            height: hp(35),
          }}
        >
          <ActivityIndicator />
        </View>
      ) : (
        <VideoPlayer
          style={{ height: hp(35), marginTop: hp(2) }}
          uri={extractBestStreamingUrl(streamingLinkData?.sources) as string}
        />
      )}

      <FlatList
        ref={listRef}
        data={data?.episodes}
        // estimatedItemSize={30}
        ListHeaderComponent={<EpisodeDescription data={data} />}
        showsVerticalScrollIndicator={false}
        getItemLayout={(data, index) => ({
          length: hp(6) + hp(3),
          offset: (hp(6) + hp(3)) * index,
          index,
        })}
        keyboardShouldPersistTaps="always"
        ItemSeparatorComponent={() => <View style={{ height: hp(3) }} />}
        contentContainerStyle={{ paddingBottom: insets.top }}
        renderItem={({ item, index }) => {
          return (
            <Pressable
              onPress={() => {
                setSelectedEpisodeId(item.id)
              }}
              style={{
                width: WIDTH,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <View
                style={{
                  backgroundColor:
                    item.id === selectedEpisodeId
                      ? COLORS.brass
                      : COLORS.gunmetal,
                  width: wp(90),
                  height: hp(6),
                  borderRadius: wp(5),
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  paddingHorizontal: wp(8),
                }}
              >
                <Text style={{ color: COLORS.white }}>{`Episode ${
                  index + 1
                }`}</Text>
                <Foundation name="play" size={24} color={COLORS.white} />
              </View>
            </Pressable>
          )
        }}
      />
    </View>
  )
}

export default EpisodeList
