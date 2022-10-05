import React, { useCallback } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import PropTypes from "prop-types";

import * as colors from "../constants/colors";
import * as sizes from "../constants/sizes";
import * as font from "../constants/fonts";

export default function MatchItem({ item, navigation }) {
  const { type, playground, host, playtime } = item;
  const { province, city, district } = playground;
  const { start, end } = playtime;
  const { name, emblem } = host;

  const startTime = new Date(start).getHours();
  const endTime = new Date(end).getHours();

  const handlePressMatch = useCallback(() => {
    navigation.navigate("MatchJoin", { match: item });
  }, []);

  return (
    <TouchableOpacity
      activeOpacity={0.5}
      style={styles.container}
      onPress={handlePressMatch}
    >
      <View style={styles.emblemContainer}>
        <Image
          style={styles.emblem}
          source={{ uri: emblem }}
        />
        <Text style={styles.teamName}>{name}</Text>
      </View>
      <View style={styles.matchInfoContainer}>
        <Text style={styles.playgroundName}>{playground.name}</Text>
        <Text style={styles.location}>{`${province} ${city} ${district}`}</Text>
        <Text style={styles.playtime}>{`${startTime}:00 - ${endTime}:00`}</Text>
        <Text style={styles.type}>{`${type}`}</Text>
      </View>
    </TouchableOpacity>
  );
}

MatchItem.propTypes = {
  item: PropTypes.object.isRequired,
  navigation: PropTypes.object.isRequired,
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: 0.8 * sizes.DEVICE_WIDTH,
    height: 0.15 * sizes.DEVICE_HEIGHT,
    margin: 10,
    borderRadius: 5,
    backgroundColor: colors.SECONDARY_WHITE,
    elevation: 5,
    shadowColor: colors.PRIMARY_SHADOW,
    shadowOpacity: 0.5,
    shadowRadius: 5,
    shadowOffset: {
      height: -1,
      width: 0,
    },
  },
  emblemContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
  },
  emblem: {
    flex: 7,
    width: "60%",
    height: "60%",
    resizeMode: "contain",
  },
  teamName: {
    flex: 3,
    textAlign: "center",
    textAlignVertical: "center",
    fontSize: sizes.QUATERNARY_FONT_SIZE,
    fontFamily: font.NOTO_SANS_KR_700_BOLD,
    includeFontPadding: false,
  },
  matchInfoContainer: {
    flex: 3,
    justifyContent: "space-around",
    alignItems: "flex-start",
    height: "100%",
    paddingLeft: 10,
  },
  playgroundName: {
    textAlign: "center",
    textAlignVertical: "center",
    fontSize: sizes.QUATERNARY_FONT_SIZE,
    fontFamily: font.NOTO_SANS_KR_500_MEDIUM,
    includeFontPadding: false,
  },
  location: {
    textAlign: "center",
    textAlignVertical: "center",
    fontSize: sizes.QUATERNARY_FONT_SIZE,
    fontFamily: font.NOTO_SANS_KR_400_REGULAR,
    includeFontPadding: false,
  },
  playtime: {
    textAlign: "center",
    textAlignVertical: "center",
    fontSize: sizes.QUATERNARY_FONT_SIZE,
    fontFamily: font.NOTO_SANS_KR_500_MEDIUM,
    includeFontPadding: false,
  },
  matchType: {
    textAlign: "center",
    textAlignVertical: "center",
    fontSize: sizes.QUATERNARY_FONT_SIZE,
    fontFamily: font.NOTO_SANS_KR_400_REGULAR,
    includeFontPadding: false,
  },
});
