import React from "react";
import { StyleSheet, View, Text } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import PropTypes from "prop-types";

import * as colors from "../constants/colors";
import * as fonts from "../constants/fonts";
import * as sizes from "../constants/sizes";

export default function DateController({ month, date, onPressButton }) {
  return (
    <View style={styles.container}>
      <Icon
        name="arrow-back-circle-outline"
        size={sizes.PRIMARY_FONT_SIZE}
        color={colors.SECONDARY_WHITE}
        onPress={() => onPressButton("back")}
        testID={"back-button"}
      />
      <View style={styles.date}>
        <Text style={styles.text}>{`${month}월 `}</Text>
        <Text style={styles.text}>{`${date}일`}</Text>
      </View>
      <Icon
        name="arrow-forward-circle-outline"
        size={sizes.PRIMARY_FONT_SIZE}
        color={colors.SECONDARY_WHITE}
        onPress={() => onPressButton("forward")}
        testID={"forward-button"}
      />
    </View>
  );
}

DateController.propTypes = {
  month: PropTypes.number,
  date: PropTypes.number,
  onPressButton: PropTypes.func,
};

const styles = StyleSheet.create({
  container: {
    width: 0.4 * sizes.DEVICE_WIDTH,
    height: 0.1 * sizes.DEVICE_HEIGHT,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  date: {
    width: 0.1 * sizes.DEVICE_HEIGHT,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  text: {
    textAlign: "left",
    textAlignVertical: "center",
    color: colors.SECONDARY_WHITE,
    fontSize: sizes.SECONDARY_FONT_SIZE,
    fontFamily: fonts.NOTO_SANS_KR_400_REGULAR,
    includeFontPadding: false,
  },
});
