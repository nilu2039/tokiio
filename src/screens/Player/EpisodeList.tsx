import React, { FC, useRef, useState } from "react"
import { ActivityIndicator, FlatList, Text, View } from "react-native"
import { HEIGHT, WIDTH } from "../../utils/dimensions"

import { FlashList } from "@shopify/flash-list"
import { useQuery } from "@tanstack/react-query"
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import VideoPlayer from "../../components/ui/VideoPlayer"
import { COLORS } from "../../config/colors"
import { getStreamingLinks } from "../../services/exploreRequests"
import { AnimeInfo, AnimeInfoEpisode } from "../../types/explore"
import EpisodeCard from "./EpisodeCard"
import EpisodeHeader from "./EpisodeHeader"

interface EpisodeListProps {
  data: AnimeInfo | null | undefined
  episodeId?: string
}

const PER_PAGE_LIMIT = 200

const EpisodeList: FC<EpisodeListProps> = ({ data, episodeId }) => {
  if (data?.episodes?.length === 0 || !data?.episodes) {
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
          {data?.status}
        </Text>
      </View>
    )
  }

  const insets = useSafeAreaInsets()
  const [selectedEpisodeId, setSelectedEpisodeId] = useState(
    data?.episodes ? data?.episodes[0]?.id : ""
  )
  const [firstView, setFirstView] = useState(true)
  const [selectedIndex, setSelectedIndex] = useState(1)
  const [currentEpisodeSlab, setCurrentEpisodeSlab] = useState(0)

  const listRef = useRef<FlatList>(null)
  // const scrollToIndex = (index: number) => {
  //   if (listRef.current) {
  //     listRef.current.scrollToIndex({ index })
  //   }
  // }

  const { data: streamingLinkData, isLoading: isStreamingLinkLoading } =
    useQuery({
      queryKey: ["streaming-links", selectedEpisodeId],
      queryFn: () => getStreamingLinks({ episodeId: selectedEpisodeId }),
    })

  // if (firstView && listRef.current) {
  //   if (episodeId) {
  //     scrollToIndex(data?.totalEpisodes! - 1 || 0)
  //     setFirstView(false)
  //   }
  // }

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

      <FlashList
        // ref={listRef}
        estimatedItemSize={200}
        data={data?.episodes.slice(
          currentEpisodeSlab,
          PER_PAGE_LIMIT + currentEpisodeSlab
        )}
        ListHeaderComponent={
          <EpisodeHeader
            data={data}
            PER_PAGE_LIMIT={PER_PAGE_LIMIT}
            currentEpisodeSlab={currentEpisodeSlab}
            setCurrentEpisodeSlab={setCurrentEpisodeSlab}
          />
        }
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="always"
        ItemSeparatorComponent={() => <View style={{ height: hp(3) }} />}
        contentContainerStyle={{ paddingBottom: insets.top }}
        renderItem={({
          item,
          index,
        }: {
          item: AnimeInfoEpisode
          index: number
        }) => {
          return (
            <>
              <EpisodeCard
                item={item}
                selectedEpisodeId={selectedEpisodeId}
                setSelectedEpisodeId={setSelectedEpisodeId}
              />
            </>
          )
        }}
      />
    </View>
  )
}

export default EpisodeList
