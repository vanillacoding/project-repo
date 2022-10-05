import React from "react";
import { StyleSheet, Text, View } from "react-native";
import PropTypes from "prop-types";

import * as sizes from "../constants/sizes";
import * as fonts from "../constants/fonts";

export default function TitleContentRow({ title, content }) {
  return (
    <View style={styles.container}>
      <Text
        style={styles.title}
        numberOfLines={1}
        ellipsizeMode="tail"
      >
        {title}
      </Text>
      <Text
        style={styles.content}
        numberOfLines={1}
        ellipsizeMode="tail"
      >
        {content}
      </Text>
    </View>
  );
}

TitleContentRow.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    width: 300,
  },
  title: {
    flex: 1,
    height: "100%",
    textAlign: "left",
    textAlignVertical: "center",
    fontSize: sizes.QUATERNARY_FONT_SIZE,
    fontFamily: fonts.NOTO_SANS_KR_500_MEDIUM,
    includeFontPadding: false,
  },
  content: {
    flex: 3,
    height: "100%",
    textAlign: "left",
    textAlignVertical: "center",
    fontSize: sizes.QUATERNARY_FONT_SIZE,
    fontFamily: fonts.NOTO_SANS_KR_300_LIGHT,
    includeFontPadding: false,
  },
});
