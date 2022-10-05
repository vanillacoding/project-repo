import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import PropTypes from "prop-types";

import * as colors from "../constants/colors";
import * as sizes from "../constants/sizes";
import * as fonts from "../constants/fonts";

export default function RankItem({ item, index }) {
  const { name, emblem, rank } = item;

  return (
    <View style={styles.container}>
      <Text style={styles.place}>{index + 1}</Text>
      <View style={styles.team}>
        <View style={styles.imageBox}>
          <Image
            style={styles.image}
            source={{ uri: emblem }}
          />
        </View>
        <Text style={styles.name}>{name}</Text>
      </View>
      <Text style={styles.point}>{rank}</Text>
    </View>
  );
}

RankItem.propTypes = {
  item: PropTypes.object.isRequired,
  index: PropTypes.number,
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    width: 0.8 * sizes.DEVICE_WIDTH,
    height: 0.08 * sizes.DEVICE_HEIGHT,
    margin: 10,
    borderRadius: 5,
    backgroundColor: colors.SECONDARY_WHITE,
    elevation: 5,
    shadowColor: "rgb(50, 50, 50)",
    shadowOpacity: 0.5,
    shadowRadius: 5,
    shadowOffset: {
      height: -1,
      width: 0,
    },
  },
  place: {
    flex: 1,
    height: "100%",
    fontSize: sizes.QUATERNARY_FONT_SIZE,
    fontFamily: fonts.NOTO_SANS_KR_500_MEDIUM,
    textAlign: "center",
    textAlignVertical: "center",
    includeFontPadding: false,
    backgroundColor: colors.SECONDARY_GRAY,
  },
  team: {
    flex: 4,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  imageBox: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    resizeMode: "contain",
  },
  image: {
    width: "80%",
    height: "80%",
    resizeMode: "contain",
  },
  name: {
    flex: 2,
    marginLeft: 10,
    fontSize: sizes.QUATERNARY_FONT_SIZE,
    fontFamily: fonts.NOTO_SANS_KR_400_REGULAR,
    textAlign: "left",
    textAlignVertical: "center",
    includeFontPadding: false,
  },
  point: {
    flex: 2,
    fontSize: sizes.QUATERNARY_FONT_SIZE,
    fontFamily: fonts.NOTO_SANS_KR_300_LIGHT,
    textAlign: "center",
    textAlignVertical: "center",
    includeFontPadding: false,
  },
});
