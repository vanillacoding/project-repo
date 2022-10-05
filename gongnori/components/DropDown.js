import React from "react";
import { StyleSheet } from "react-native";
import ModalDropdown from "react-native-modal-dropdown";
import PropTypes from "prop-types";

import * as fonts from "../constants/fonts";

const TEXT_VERTICAL_MARGIN = 5;

export default function DropDown({
  defaultValue,
  options = [],
  style = {},
  onSelect,
}) {
  const total = options.length;
  const { width, height, borderRadius, backgroundColor, color, fontSize } = style;

  return (
    <ModalDropdown
      defaultValue={defaultValue}
      options={[...options]}
      style={{
        ...styles.button,
        width,
        height,
        borderRadius,
        backgroundColor,
      }}
      textStyle={{
        ...styles.buttonText,
        width,
        height,
        fontSize,
        color,
      }}
      dropdownStyle={{
        width: 1.0 * width,
        height: Math.min(
          5 * (2 * TEXT_VERTICAL_MARGIN + 2 * TEXT_VERTICAL_MARGIN + fontSize),
          total * (2 * TEXT_VERTICAL_MARGIN + 2 * TEXT_VERTICAL_MARGIN + fontSize)
        ),
      }}
      dropdownTextStyle={{
        ...styles.dropdownText,
        height: 2 * TEXT_VERTICAL_MARGIN + fontSize,
        fontSize,
      }}
      adjustFrame={(style) => {
        style.height += 0;

        return style;
      }}
      onSelect={onSelect}
      testID={"modal-drop-down"}
    />
  );
}

DropDown.propTypes = {
  defaultValue: PropTypes.string,
  options: PropTypes.array,
  style: PropTypes.object,
  onSelect: PropTypes.func,
};

const styles = StyleSheet.create({
  button: {
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    textAlign: "center",
    textAlignVertical: "center",
    fontFamily: fonts.NOTO_SANS_KR_400_REGULAR,
    includeFontPadding: false,
  },
  dropdownText: {
    color: "black",
    textAlign: "center",
    textAlignVertical: "center",
    marginVertical: TEXT_VERTICAL_MARGIN,
    paddingVertical: 0,
    fontFamily: fonts.NOTO_SANS_KR_300_LIGHT,
    includeFontPadding: false,
  },
});
