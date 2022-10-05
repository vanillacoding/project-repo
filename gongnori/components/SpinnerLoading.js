import React from "react";
import { StyleSheet } from "react-native";
import Spinner from "react-native-loading-spinner-overlay";
import PropTypes from "prop-types";

import * as colors from "../constants/colors";
import * as fonts from "../constants/fonts";
import * as sizes from "../constants/sizes";

export default function SpinnerLoading({ visible, content }) {
  return (
    <Spinner
      visible={visible}
      textContent={content}
      textStyle={styles.textStyle}
      overlayColor={colors.PRIMARY_MODAL}
      size={"large"}
      animation={"fade"}
      cancelable={true}
    />
  );
}

SpinnerLoading.propTypes = {
  visible: PropTypes.bool.isRequired,
  content: PropTypes.string.isRequired,
};

const styles = StyleSheet.create({
  textStyle: {
    color: colors.SECONDARY_WHITE,
    fontSize: sizes.SECONDARY_FONT_SIZE,
    fontFamily: fonts.NOTO_SANS_KR_100_THIN,
  },
});
