import { View, Text, Pressable, Image } from "react-native"
import React, { FC } from "react"
import { Foundation } from "@expo/vector-icons"
import { COLORS } from "../../config/colors"
import { WIDTH } from "../../utils/dimensions"
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen"
import { AnimeInfoEpisode } from "../../types/explore"

interface EpisodeCardProps {
  selectedEpisodeId: string
  setSelectedEpisodeId: React.Dispatch<React.SetStateAction<string>>
  item: AnimeInfoEpisode
  timeStamp?: number | null
}

const EpisodeCard: FC<EpisodeCardProps> = ({
  item,
  selectedEpisodeId,
  setSelectedEpisodeId,
  timeStamp,
}) => {
  console.log(item.id, timeStamp)

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
              ? "#411847"
              : timeStamp
              ? "#411847"
              : "transparent",
          width: wp(95),
          height: hp(15),
          borderRadius: wp(2),
          borderColor: COLORS.gunmetal,
          borderWidth: wp(0.6),
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          // paddingHorizontal: wp(8),
          //   paddingRight: wp(1.2),
        }}
      >
        {item.image ? (
          <Image
            source={{ uri: item.image }}
            style={{
              width: wp(30),
              height: hp(15),
              borderTopLeftRadius: wp(2),
              borderBottomLeftRadius: wp(2),
            }}
          />
        ) : null}
        <View
          style={{
            flexDirection: "row",
            width: wp(65),
            alignItems: "center",
            justifyContent: "space-around",
            // backgroundColor: "blue",
          }}
        >
          <Text
            style={{
              color: COLORS.copper,
              fontWeight: "700",
            }}
          >
            {`${item.number}`}
          </Text>
          <Text
            numberOfLines={3}
            style={{
              color: COLORS.white,
              textAlign: "center",
              width: wp(45),
              fontWeight: "500",
            }}
          >{`${item?.title ? item.title : `Episode ${item.number}`}`}</Text>
        </View>
        {/* <Foundation
          style={{ top: hp(4) }}
          name="play"
          size={24}
          color={COLORS.white}
        /> */}
      </View>
    </Pressable>
  )
}

export default EpisodeCard
