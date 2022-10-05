import React, { useState, useCallback } from "react";
import { StyleSheet, View, TextInput, TouchableWithoutFeedback, Modal } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import _ from "lodash";

import CustomButton from "./CustomButton";

import { updateMyData } from "../actions/userActionCreators";
import fetchServer from "../utils/fetchServer";

import * as colors from "../constants/colors";
import * as fonts from "../constants/fonts";
import * as sizes from "../constants/sizes";

export default function RegisterUserModal({ visible, setIsModal }) {
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();

  const currentTeam = useSelector((state) => {
    return state.user.currentTeam;
  }, (prev, next) => _.cloneDeep(prev) === _.cloneDeep(next));

  const handleChangeText = useCallback((value) => setEmail(value), []);

  const handlePressButton = async () => {
    await fetchServer(
      "PATCH",
      "team/members",
      { email, teamId: currentTeam.id }
    );

    dispatch(updateMyData());
  };

  return (
    <Modal
      transparent={true}
      visible={visible}
    >
      <View style={styles.container}>
        <TouchableWithoutFeedback
          onPress={setIsModal}
          testID={"touchable-without-feedback"}
        >
          <View style={styles.cancleRegion} />
        </TouchableWithoutFeedback>
        <View style={styles.searchBox}>
          <TextInput
            style={styles.textInput}
            placeholder={"이메일을 입력하세요."}
            autoCompleteType="off"
            onChangeText={handleChangeText}
          />
          <CustomButton
            title={"추가"}
            style={styles.button}
            onPress={handlePressButton}
            testID={"custom-button"}
          />
        </View>
        <TouchableWithoutFeedback onPress={setIsModal}>
          <View style={styles.cancleRegion} />
        </TouchableWithoutFeedback>
      </View>
    </Modal>
  );
}

RegisterUserModal.propTypes = {
  visible: PropTypes.bool.isRequired,
  setIsModal: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: colors.PRIMARY_MODAL,
  },
  cancleRegion: {
    flex: 1,
    width: "100%",
  },
  searchBox: {
    width: 0.9 * sizes.DEVICE_WIDTH,
    height: 0.3 * sizes.DEVICE_HEIGHT,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    borderRadius: 5,
    backgroundColor: colors.PRIMARY_YELLOW,
  },
  textInput: {
    justifyContent: "center",
    alignItems: "center",
    width: 0.65 * sizes.DEVICE_WIDTH,
    height: 0.05 * sizes.DEVICE_HEIGHT,
    borderRadius: 5,
    backgroundColor: colors.PRIMARY_WHITE,
    fontSize: sizes.TERTIARY_FONT_SIZE,
    fontFamily: fonts.NOTO_SANS_KR_400_REGULAR,
    textAlign: "center",
    textAlignVertical: "center",
    includeFontPadding: false,
  },
  button: {
    justifyContent: "center",
    alignItems: "center",
    width: 0.15 * sizes.DEVICE_WIDTH,
    height: 0.05 * sizes.DEVICE_HEIGHT,
    borderRadius: 5,
    backgroundColor: colors.SECONDARY_BLUE,
    color: colors.SECONDARY_WHITE,
    fontSize: sizes.TERTIARY_FONT_SIZE,
  },
});
