import React from "react";
import { useDispatch } from "react-redux";
import dayjs from "dayjs";
import { TouchableOpacity, StyleSheet, Text } from "react-native";

import { DAY_OF_WEEK_KR } from "../constants/dosePeriod";
import { setSelectedDoseHistory } from "../redux/reducers/doseHistorySlice";

const Day = ({ doseHistory, selectedDoseHistory }) => {
  const dayOfWeek = [
    DAY_OF_WEEK_KR.SUN,
    DAY_OF_WEEK_KR.MON,
    DAY_OF_WEEK_KR.TUE,
    DAY_OF_WEEK_KR.WED,
    DAY_OF_WEEK_KR.TRU,
    DAY_OF_WEEK_KR.FRI,
    DAY_OF_WEEK_KR.SAT,
  ];

  const { date } = doseHistory;
  const { date: selectedDate } = selectedDoseHistory;

  const dayIndex = dayjs(date).day();
  const monthAndDate = dayjs(date).format("MM/DD");
  const isSelected = date === selectedDate;

  const dispatch = useDispatch();

  const handleSelectDay = () => {
    dispatch(setSelectedDoseHistory(doseHistory));
  };

  return (
    <TouchableOpacity
      style={isSelected ? styles.selected : styles.default}
      onPress={handleSelectDay}
    >
      <Text style={isSelected ? styles.selectedMonthAndDay : styles.defaultMonthAndDay}>
        {monthAndDate}
      </Text>

      <Text style={isSelected ? styles.selectedDayOfWeek : styles.defaultDayOfWeek}>
        {dayOfWeek[dayIndex]}
      </Text>
    </TouchableOpacity>
  );
};

export default Day;

const styles = StyleSheet.create({
  default: {
    justifyContent: "center",
    alignItems: "center",
    height: 60,
    width: 50,
    margin: 7,
    borderRadius: 10,
    backgroundColor: "#FFF",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.12,
    shadowRadius: 2,
    elevation: 2,
  },
  defaultMonthAndDay: {
    color: "#000",
  },
  defaultDayOfWeek: {
    marginTop: 5,
    color: "#000",
  },
  selected: {
    justifyContent: "center",
    alignItems: "center",
    height: 60,
    width: 50,
    marginLeft: 7,
    marginRight: 7,
    borderRadius: 10,
    backgroundColor: "#006FF3",
  },
  selectedMonthAndDay: {
    color: "#FFF",
  },
  selectedDayOfWeek: {
    marginTop: 5,
    color: "#FFF",
  },
});
