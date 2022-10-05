import React, { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import dayjs from "dayjs";

import { setSelectedDoseHistory } from "../redux/reducers/doseHistorySlice";

import DayOfWeek from "./DayOfWeek";
import DoseChecker from "./DoseChecker";

const DoseDays = ({ doseHistories }) => {
  const today = dayjs().format("YYYY-MM-DD");
  const todayDoseHistory = doseHistories.find((doseHistory) => doseHistory.date === today);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setSelectedDoseHistory(todayDoseHistory));
  }, [dispatch, todayDoseHistory]);

  const selectedDoseHistory = useSelector((state) => state.doseHistory.selectedDoseHistory);

  return (
    <View style={styles.container}>
      <DayOfWeek
        doseHistories={doseHistories}
        selectedDoseHistory={selectedDoseHistory}
      />

      <DoseChecker />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
});

export default DoseDays;
