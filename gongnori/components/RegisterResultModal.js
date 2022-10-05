import React, { useState } from "react";
import { StyleSheet, View, Text, TouchableWithoutFeedback, Modal } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import _ from "lodash";

import CustomButton from "./CustomButton";
import DropDown from "./DropDown";

import { updateMyData } from "../actions/userActionCreators";
import fetchServer from "../utils/fetchServer";

import * as colors from "../constants/colors";
import * as fonts from "../constants/fonts";
import * as sizes from "../constants/sizes";

export default function RegisterResultModal({ visible, setIsModal, message }) {
  const [result, setResult] = useState({});
  const dispatch = useDispatch();

  const currentTeam = useSelector((state) => {
    return state.user.currentTeam;
  }, (prev, next) => _.cloneDeep(prev) === _.cloneDeep(next));

  const { guest, host } = message;

  let myTeamId = host.teamId;
  let yourTeamId = guest.teamId;

  if (guest.teamId === currentTeam?.Id) {
    myTeamId = guest.teamId;
    yourTeamId = host.teamId;
  }

  const handleSelectResult = (index, value) => {
    setResult({ ...result, matchResult: value });
  };

  const handleSelectManner = (index, value) => {
    setResult({ ...result, manner: value });
  };

  const handlePressButton = async () => {
    await fetchServer(
      "PATCH",
      "team/rank",
      { ...result, myTeamId, yourTeamId }
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
        <View style={styles.resultBox}>
          <View style={styles.input}>
            <View style={styles.titleDropdown}>
              <Text style={styles.title}>경기결과</Text>
              <DropDown
                defaultValue={"경기결과"}
                options={["승리", "무승부", "패배"]}
                style={styles.dropDown}
                onSelect={handleSelectResult}
              />
            </View>
            <View style={styles.titleDropdown}>
              <Text style={styles.title}>경기매너</Text>
              <DropDown
                defaultValue={"경기매너"}
                options={["매우 좋음", "좋음", "보통", "나쁨", "매우 나쁨"]}
                style={styles.dropDown}
                onSelect={handleSelectManner}
              />
            </View>
          </View>
          <CustomButton
            title={"등록"}
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

RegisterResultModal.propTypes = {
  visible: PropTypes.bool.isRequired,
  setIsModal: PropTypes.func.isRequired,
  message: PropTypes.object.isRequired,
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
  resultBox: {
    justifyContent: "space-evenly",
    alignItems: "center",
    width: 0.9 * sizes.DEVICE_WIDTH,
    height: 0.2 * sizes.DEVICE_HEIGHT,
    borderRadius: 5,
    backgroundColor: colors.PRIMARY_YELLOW,
  },
  input: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "90%",
  },
  button: {
    justifyContent: "center",
    alignItems: "center",
    width: 0.15 * sizes.DEVICE_WIDTH,
    height: 0.05 * sizes.DEVICE_HEIGHT,
    borderRadius: 10,
    backgroundColor: colors.SECONDARY_BLUE,
    color: colors.SECONDARY_WHITE,
    fontSize: sizes.TERTIARY_FONT_SIZE,
  },
  titleDropdown: {
    flexDirection: "row",
    alignItems: "center",
    width: "50%",
    height: 0.1 * sizes.DEVICE_HEIGHT,
  },
  title: {
    marginRight: 5,
    height: 0.05 * sizes.DEVICE_HEIGHT,
    fontSize: sizes.TERTIARY_FONT_SIZE,
    fontFamily: fonts.NOTO_SANS_KR_400_REGULAR,
    textAlign: "left",
    textAlignVertical: "center",
    includeFontPadding: false,
  },
  dropDown: {
    width: 0.2 * sizes.DEVICE_WIDTH,
    height: 0.04 * sizes.DEVICE_HEIGHT,
    borderRadius: 5,
    fontSize: sizes.QUATERNARY_FONT_SIZE,
    backgroundColor: colors.SECONDARY_WHITE,
  },
});
