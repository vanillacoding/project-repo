import React from "react";
import dayjs from "dayjs";
import { View, Text, StyleSheet } from "react-native";

const HistoryStatus = ({ expirationDate, isDeleted }) => {
  const currentDate = dayjs().format("YYYY.MM.DD");
  const isExpired = currentDate > expirationDate;

  const fontColor = isExpired || isDeleted ? "#FF0000" : "#4BDE97";

  return (
    <View style={isExpired || isDeleted ? styles.expired : styles.progress}>
      <Text style={{ color: fontColor }}>
        {isExpired || isDeleted ? "Expired" : "Progress"}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  expired: {
    justifyContent: "center",
    alignItems: "center",
    height: 23,
    width: 65,
    borderRadius: 12,
    backgroundColor: "#FFE5E5",
  },
  progress: {
    justifyContent: "center",
    alignItems: "center",
    height: 23,
    width: 65,
    borderRadius: 12,
    backgroundColor: "#EDFCF5",
  },
});

export default HistoryStatus;
