import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import PropTypes from "prop-types";
import * as font from "../constants/fonts";

export default function CustomButton({
  title = "Button",
  onPress,
  style = {},
}) {
  const {
    width,
    height,
    marginTop,
    marginRight,
    marginBottom,
    marginLeft,
    borderRadius,
    backgroundColor,
    color,
    fontSize,
  } = style;

  return (
    <TouchableOpacity
      style={{
        ...styles.button,
        width,
        height,
        marginTop,
        marginRight,
        marginBottom,
        marginLeft,
        borderRadius,
        backgroundColor,
      }}
      onPress={onPress}
      testID={"custom-button"}
    >
      <Text
        style={{
          ...styles.text,
          color,
          fontSize,
        }}
      >
        { title }
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    width: "100%",
    height: "100%",
    fontFamily: font.NOTO_SANS_KR_400_REGULAR,
    textAlign: "center",
    textAlignVertical: "center",
    includeFontPadding: false,
  },
});

CustomButton.propTypes = {
  title: PropTypes.string,
  onPress: PropTypes.func,
  style: PropTypes.object,
};
