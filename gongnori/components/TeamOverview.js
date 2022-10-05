import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import PropTypes from "prop-types";

import * as font from "../constants/fonts";
import * as size from "../constants/sizes";

export default function TeamOverview({ team }) {
  const {
    name,
    members,
    city,
    district,
    manner,
    emblem,
  } = team;

  const memberNum = members.length;

  return (
    <View style={styles.overview}>
      <View style={styles.emblemContainer}>
        <Image
          style={styles.emblem}
          source={{ uri: emblem }}
        />
      </View>
      <View style={styles.descripitonContainer}>
        <View style={styles.description}>
          <Text style={styles.title}>{"팀이름"}</Text>
          <Text style={styles.content}>{name}</Text>
        </View>
        <View style={styles.description}>
          <Text style={styles.title}>지역</Text>
          <Text style={styles.content}>{`${city} ${district}`}</Text>
        </View>
        <View style={styles.description}>
          <Text style={styles.title}>매너</Text>
          <Text style={styles.content}>{manner}</Text>
        </View>
        <View style={styles.description}>
          <Text style={styles.title}>팀원</Text>
          <Text style={styles.content}>{`${memberNum} 명`}</Text>
        </View>
      </View>
    </View>
  );
}

TeamOverview.propTypes = {
  team: PropTypes.object.isRequired,
};

const styles = StyleSheet.create({
  overview: {
    flexDirection: "row",
    alignItems: "center",
    height: 0.15 * size.DEVICE_HEIGHT,
    width: 0.8 * size.DEVICE_WIDTH,
  },
  emblemContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: 0.2 * size.DEVICE_WIDTH,
    height: "100%",
  },
  emblem: {
    width: "80%",
    height: "80%",
    resizeMode: "contain",
  },
  descripitonContainer: {
    justifyContent: "space-evenly",
    alignItems: "flex-start",
    width: 0.6 * size.DEVICE_WIDTH,
    height: "100%",
    paddingLeft: 10,
  },
  description: {
    flexDirection: "row",
  },
  title: {
    flex: 1,
    flexDirection: "row",
    textAlign: "left",
    textAlignVertical: "center",
    fontSize: size.QUATERNARY_FONT_SIZE,
    fontFamily: font.NOTO_SANS_KR_500_MEDIUM,
    includeFontPadding: false,
  },
  content: {
    flex: 3,
    flexDirection: "row",
    textAlign: "left",
    textAlignVertical: "center",
    fontSize: font.QUATERNARY_FONT_SIZE,
    fontFamily: font.NOTO_SANS_KR_300_LIGHT,
    includeFontPadding: false,
  },
});
