import { View, Text, TouchableOpacity } from "react-native"
import React, { FC } from "react"
import { FontAwesome } from "@expo/vector-icons"

import { COLORS } from "../../config/colors"
import EpisodeDescription from "./EpisodeDescription"
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen"
import { AnimeInfo } from "../../types/explore"

interface EpisodeHeaderProps {
  data: AnimeInfo | null
  currentEpisodeSlab: number
  setCurrentEpisodeSlab: React.Dispatch<React.SetStateAction<number>>
  PER_PAGE_LIMIT: number
}

const EpisodeHeader: FC<EpisodeHeaderProps> = ({
  PER_PAGE_LIMIT,
  data,
  currentEpisodeSlab,
  setCurrentEpisodeSlab,
}) => {
  if (!data?.episodes) {
    return null
  }

  return (
    <View>
      <EpisodeDescription data={data} />
      <View
        style={{
          flexDirection: "row",
          width: wp(80),
          justifyContent: "space-between",
          alignSelf: "center",
          marginBottom: hp(2),
        }}
      >
        <TouchableOpacity
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: wp(4),
          }}
          disabled={currentEpisodeSlab === 0}
          onPress={() =>
            setCurrentEpisodeSlab(
              currentEpisodeSlab === 0 ? 0 : currentEpisodeSlab - PER_PAGE_LIMIT
            )
          }
        >
          <FontAwesome
            name="angle-left"
            size={wp(7)}
            // style={{ position: "absolute", zIndex: 999, left: wp(10) }}
            color={COLORS.white}
            style={{ opacity: currentEpisodeSlab === 0 ? 0.5 : 1 }}
          />
          <Text
            style={{
              color: COLORS.white,
              fontWeight: "600",
              opacity: currentEpisodeSlab === 0 ? 0.5 : 1,
            }}
          >
            Prev
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            flexDirection: "row-reverse",
            alignItems: "center",
            gap: wp(4),
          }}
          disabled={currentEpisodeSlab + PER_PAGE_LIMIT > data?.episodes.length}
          onPress={() =>
            setCurrentEpisodeSlab(
              currentEpisodeSlab + PER_PAGE_LIMIT < data?.episodes.length
                ? currentEpisodeSlab + PER_PAGE_LIMIT
                : currentEpisodeSlab
            )
          }
        >
          <FontAwesome
            // onPress={() => {
            //   navigation.goBack()
            // }}
            name="angle-right"
            size={wp(7)}
            // style={{ position: "absolute", zIndex: 999, left: wp(10) }}
            color={COLORS.white}
            style={{
              opacity:
                currentEpisodeSlab + PER_PAGE_LIMIT > data?.episodes.length
                  ? 0.5
                  : 1,
            }}
          />
          <Text
            style={{
              color: COLORS.white,
              fontWeight: "600",
              opacity:
                currentEpisodeSlab + PER_PAGE_LIMIT > data?.episodes.length!
                  ? 0.5
                  : 1,
            }}
          >
            Next
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default EpisodeHeader
