import React, { useCallback } from "react";
import { StyleSheet, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";

import DropDown from "./DropDown";
import { setMessageFilter } from "../actions/appActionCreators";

import * as colors from "../constants/colors";
import * as sizes from "../constants/sizes";

export default function MessageHeader() {
  const matchFilterStatus = useSelector((state) => state.app.matchFilterStatus);

  const dispatch = useDispatch();

  const filterCondition = [false, true];

  const handleSelectMatchStatus = useCallback((index) => {
    dispatch(setMessageFilter(filterCondition[index]));
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.status}>
        <DropDown
          defaultValue={matchFilterStatus ? "완료" : "진행 중"}
          options={["진행 중", "완료"]}
          style={styles.dropDown}
          onSelect={handleSelectMatchStatus}
        />
      </View>
      <View style={styles.midBlank} />
      <View style={styles.leftBlank} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "stretch",
    height: sizes.HEADER_HEIGHT,
    backgroundColor: colors.SECONDARY_BLUE,
  },
  status: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  midBlank: {
    flex: 3,
    justifyContent: "center",
    alignItems: "center",
  },
  leftBlank: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  dropDown: {
    width: 0.15 * sizes.DEVICE_WIDTH,
    height: 0.05 * sizes.DEVICE_HEIGHT,
    color: colors.SECONDARY_WHITE,
    fontSize: sizes.TERTIARY_FONT_SIZE,
  },
});
