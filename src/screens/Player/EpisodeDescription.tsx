import { View, Text, Image, StyleSheet } from "react-native"
import React, { FC } from "react"
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen"
import { COLORS } from "../../config/colors"
import type { AnimeInfo } from "../../types/explore"
import { isArray } from "lodash"

interface EpisodeDescriptionProps {
  data: AnimeInfo | null | undefined
}

const keyMapperStyle = StyleSheet.create({
  labelStyle: {
    color: COLORS.gray,
    fontSize: wp(3.5),
    fontWeight: "600",
  },
})

const KeyMapper = ({
  key1,
  key2,
}: {
  key1: string
  key2: string | number | string[] | null | undefined
}) => {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "flex-start",
      }}
    >
      <Text style={[keyMapperStyle.labelStyle]}>{`${key1}: `}</Text>
      {!isArray(key2) ? (
        <Text style={[keyMapperStyle.labelStyle, { color: COLORS.copper }]}>
          {`${key2}`}
        </Text>
      ) : (
        <View
          style={{
            width: wp(65),
            flexDirection: "row",
            flexWrap: "wrap",
          }}
        >
          {key2.map((item, index) => (
            <Text
              key={index}
              style={[keyMapperStyle.labelStyle, { color: COLORS.copper }]}
            >
              {`${item}${index !== key2.length - 1 ? "," : ""} `}
            </Text>
          ))}
        </View>
      )}
    </View>
  )
}

const EpisodeDescription: FC<EpisodeDescriptionProps> = ({ data }) => {
  return (
    <View
      style={{ marginHorizontal: wp(3), gap: hp(2), marginVertical: hp(4) }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "flex-start",
          justifyContent: "space-between",
        }}
      >
        {data?.image ? (
          <Image
            style={{ borderRadius: wp(2) }}
            source={{ uri: data?.image, height: hp(15), width: wp(20) }}
          />
        ) : null}
        <View style={{ width: wp(70) }}>
          <Text
            style={{
              fontSize: wp(7),
              color: COLORS.white,
              fontWeight: "600",
            }}
          >
            {data?.title?.english ? data?.title?.english : data?.title?.romaji}
          </Text>
          <Text
            style={{
              fontSize: wp(4),
              color: COLORS.gray,
              fontStyle: "italic",
              marginTop: hp(0.3),
              marginBottom: hp(2),
            }}
          >
            {data?.title?.romaji}
          </Text>
          <View>
            <Text
              style={{ color: COLORS.gray, fontSize: wp(3), fontWeight: "600" }}
            >
              {data?.description}
            </Text>
          </View>
        </View>
      </View>
      <View style={{ left: wp(23), marginTop: hp(1), gap: hp(1) }}>
        <KeyMapper key1="Type" key2={data?.type as string} />
        <KeyMapper key1="Premiered" key2={data?.releaseDate} />
        <KeyMapper key1="Status" key2={data?.status as string} />
        <KeyMapper key1="Genre" key2={data?.genres as string[]} />
        {/* {
            data?.genres.map((_, index) => (
                <Text>{}</Text>
            ) )
        } */}
        <KeyMapper key1="Episodes" key2={data?.totalEpisodes as number} />
      </View>
    </View>
  )
}

export default EpisodeDescription
