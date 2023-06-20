import { Foundation } from "@expo/vector-icons"
import React, { FC, useRef, useState } from "react"
import {
  ActivityIndicator,
  FlatList,
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

interface EpisodeListProps {
  data: AnimeInfo | null | undefined
  episodeId?: string
}

const EpisodeList: FC<EpisodeListProps> = ({ data, episodeId }) => {
  const insets = useSafeAreaInsets()
  const [selectedEpisodeId, setSelectedEpisodeId] = useState(
    episodeId ? episodeId : data?.episodes[0].id
  )

  const listRef = useRef<FlatList>(null)
  const scrollToIndex = (index: number) => {
    console.log("SCROLLING")

    if (listRef.current) {
      listRef.current.scrollToIndex({ index })
    }
  }

  const { data: streamingLinkData, isLoading: isStreamingLinkLoading } =
    useQuery({
      queryKey: ["streaming-links", selectedEpisodeId],
      queryFn: () => getStreamingLinks({ episodeId: selectedEpisodeId }),
    })

  //   scrollToIndex(22)

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
          uri={(function () {
            const uri = streamingLinkData?.sources.find(
              (item) => item.quality === "1080p"
            )?.url as string
            if (!uri) {
              return streamingLinkData?.sources[0].url as string
            }
            return uri
          })()}
        />
      )}
      <FlatList
        ref={listRef}
        data={data?.episodes}
        // estimatedItemSize={30}
        showsVerticalScrollIndicator={false}
        getItemLayout={(data, index) => ({
          length: hp(5) + hp(3),
          offset: (hp(5) + hp(3)) * index,
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
                      ? COLORS.copper
                      : COLORS.brass,
                  width: wp(85),
                  height: hp(5),
                  borderRadius: wp(1.5),
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
