import React from "react";
import { StyleSheet, ScrollView } from "react-native";

import Day from "./Day";

const DayOfWeek = ({ doseHistories, selectedDoseHistory }) => {
  return (
    <ScrollView
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      {doseHistories.map((doseHistory) => {
        const { dose_history_id: doseHistoryId } = doseHistory;

        return (
          <Day
            key={doseHistoryId}
            doseHistory={doseHistory}
            selectedDoseHistory={selectedDoseHistory}
          />
        );
      })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    paddingHorizontal: 15,
  },
});

export default DayOfWeek;
