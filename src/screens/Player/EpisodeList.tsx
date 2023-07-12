import React, { FC, useRef, useState } from "react"
import { ActivityIndicator, Text, View } from "react-native"
import { HEIGHT, WIDTH } from "../../utils/dimensions"

import { FlashList } from "@shopify/flash-list"
import { useMutation, useQuery } from "@tanstack/react-query"
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import VideoPlayer from "../../components/ui/VideoPlayer"
import { COLORS } from "../../config/colors"
import {
  getCurrentVideoTimeStamp,
  getStreamingLinks,
} from "../../services/streamingRequests"
import { AnimeInfo, AnimeInfoEpisode } from "../../types/explore"
import EpisodeCard from "./EpisodeCard"
import EpisodeHeader from "./EpisodeHeader"

import { useAuth } from "@clerk/clerk-expo"
import { getHistoryById, saveHistory } from "../../services/historyRequests"
import { z } from "zod"
import { SaveHistorySchemaClient } from "../../types/history"

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
  const { getToken, userId } = useAuth()
  const saveHistoryMutation = useMutation({
    mutationFn: (props: z.infer<typeof SaveHistorySchemaClient>) =>
      saveHistory(props),
  })

  const { data: streamingLinkData, isLoading: isStreamingLinkLoading } =
    useQuery({
      queryKey: ["streaming-links", selectedEpisodeId],
      cacheTime: 0,
      queryFn: () => getStreamingLinks({ episodeId: selectedEpisodeId }),
    })

  const { data: currentTimeStampData, isLoading: currentTimeStampLoading } =
    useQuery({
      queryKey: ["current-timestamp", selectedEpisodeId],
      cacheTime: 0,
      queryFn: () =>
        getCurrentVideoTimeStamp({
          episodeId: selectedEpisodeId,
          animeId: data.id,
          userId: userId ? userId : "",
          getToken,
        }),
    })

  const { data: historyByIdData, isLoading: isHistoryByIdLoading } = useQuery({
    queryKey: ["anime-history-by-id"],
    queryFn: () => getHistoryById({ id: data.id, getToken }),
  })

  if (isHistoryByIdLoading) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <ActivityIndicator />
      </View>
    )
  }

  // console.log(historyByIdData?.episodes.map((item) => item.episodeId))

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
      {isStreamingLinkLoading || currentTimeStampLoading ? (
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
          timeStamp={currentTimeStampData?.timeStamp}
          style={{ height: hp(35), marginTop: hp(2) }}
          uri={extractBestStreamingUrl(streamingLinkData?.sources) as string}
          mutationFn={({ status }) => {
            saveHistoryMutation.mutate({
              animeId: data.id,
              episodeId: selectedEpisodeId,
              timeStamp: status?.positionMillis
                ? status.positionMillis.toString()
                : "0",
              animeImg: data.image,
              animeTitle: data?.title?.english
                ? data?.title?.english
                : data?.title?.romaji,
              getToken,
            })
          }}
          // socketFn={async ({ status, socket }) => {
          //   const token = await getToken()

          //   if (status.isPlaying && !status.isBuffering) {
          //     socket?.emit("video-time-stamp", {
          //       animeId: data.id,
          //       episodeId: selectedEpisodeId,
          //       timeStamp: status.positionMillis,
          //       animeImg: data.image,
          //       animeTitle: data?.title?.english
          //         ? data?.title?.english
          //         : data?.title?.romaji,
          //       sessionToken: token,
          //     })
          //   }
          // }}
        />
      )}

      <FlashList
        ref={listRef}
        // initialScrollIndex={20}
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
                isEpisodeWatched={(function () {
                  let res = false
                  historyByIdData?.episodes?.forEach((episode) => {
                    if (episode.episodeId === item.id) {
                      res = true
                      return
                    }
                  })
                  return res
                })()}
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
