import React, { FC, useRef, useState } from "react"
import { ActivityIndicator, Text, View } from "react-native"
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

import { useAuth } from "@clerk/clerk-expo"

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

  const [currentEpisodeSlab, setCurrentEpisodeSlab] = useState(0)

  const listRef = useRef<FlashList<AnimeInfoEpisode>>(null)

  const { data: streamingLinkData, isLoading: isStreamingLinkLoading } =
    useQuery({
      queryKey: ["streaming-links", selectedEpisodeId],
      cacheTime: 0,
      queryFn: () => getStreamingLinks({ episodeId: selectedEpisodeId }),
    })

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

  const { getToken } = useAuth()

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
          socketFn={async ({ status, socket }) => {
            const token = await getToken()

            if (status.isPlaying && !status.isBuffering) {
              socket?.emit("video-time-stamp", {
                animeId: data.id,
                episodeId: selectedEpisodeId,
                timeStamp: status.positionMillis,
                sessionToken: token,
              })
            }
          }}
        />
      )}

      <FlashList
        ref={listRef}
        // initialScrollIndex={1}
        estimatedItemSize={PER_PAGE_LIMIT}
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
