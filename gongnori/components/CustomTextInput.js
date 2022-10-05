import React from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import PropTypes from "prop-types";

import * as colors from "../constants/colors";
import * as fonts from "../constants/fonts";
import * as sizes from "../constants/sizes";

export default function CustomTextInput({
  title,
  value,
  placeholder,
  onChangeText,
}) {
  return (
    <View style={styles.textInputContainer}>
      <Text style={styles.title}>{title}</Text>
      <TextInput
        value={value}
        style={styles.textInput}
        placeholder={placeholder}
        autoCompleteType="off"
        onChangeText={onChangeText}
      />
    </View>
  );
}

CustomTextInput.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.string,
  placeholder: PropTypes.string,
  onChangeText: PropTypes.func,
};

const styles = StyleSheet.create({
  textInputContainer: {
    flexDirection: "row",
    width: 0.2 * sizes.DEVICE_WIDTH,
    height: 0.1 * sizes.DEVICE_HEIGHT,
  },
  title: {
    height: "50%",
    fontSize: sizes.TERTIARY_FONT_SIZE,
    fontFamily: fonts.PRIMARY_FONT,
    textAlign: "center",
    textAlignVertical: "center",
    includeFontPadding: false,
  },
  textInput: {
    height: "50%",
    borderRadius: 5,
    backgroundColor: colors.SECONDARY_WHITE,
    fontSize: sizes.QUATERNARY_FONT_SIZE,
    fontFamily: fonts.SECONDARY_FONT,
    textAlign: "center",
    textAlignVertical: "center",
    includeFontPadding: false,
  },
});
