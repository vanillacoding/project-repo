import React from "react";
import { StyleSheet, Text, TouchableWithoutFeedback, Modal, View } from "react-native";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";

import { hideInputAlert } from "../actions/loadingActionCreators";
import * as colors from "../constants/colors";
import * as fonts from "../constants/fonts";
import * as sizes from "../constants/sizes";

export default function InputAlertModal({ content, visible }) {
  const dispatch = useDispatch();

  return (
    <Modal
      transparent={true}
      visible={visible}
    >
      <TouchableWithoutFeedback onPress={() => dispatch(hideInputAlert())}>
        <View style={styles.container}>
          <Text style={styles.content}>{content}</Text>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}

InputAlertModal.propTypes = {
  content: PropTypes.string.isRequired,
  visible: PropTypes.bool.isRequired,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.PRIMARY_MODAL,
  },
  content: {
    justifyContent: "center",
    alignItems: "center",
    width: 0.5 * sizes.DEVICE_WIDTH,
    height: 0.1 * sizes.DEVICE_HEIGHT,
    borderRadius: 5,
    backgroundColor: colors.PRIMARY_WHITE,
    fontSize: sizes.SECONDARY_FONT_SIZE,
    fontFamily: fonts.NOTO_SANS_KR_500_MEDIUM,
    textAlign: "center",
    textAlignVertical: "center",
    includeFontPadding: false,
  },
});
