import React, { useState } from "react";
import { ScrollView, StyleSheet } from "react-native";

import Schedule from "./Schedule";

import swapSchedule from "../utils/swapSchedule";

function ScheduleList({ schedules = [], onChange, style }) {
  const [selectedIndex, setSelectedIndex] = useState(null);

  function handleIndexPress(scheduleIndex) {
    if (!onChange) return;

    if (!selectedIndex) {
      setSelectedIndex(scheduleIndex);
      return;
    }

    if (selectedIndex !== scheduleIndex) {
      onChange(swapSchedule(schedules, selectedIndex, scheduleIndex));
    }

    setSelectedIndex(null);
  }

  return (
    <ScrollView style={[styles.container, style]}>
      {schedules.map((schedule) => (
        <Schedule
          key={schedule.site._id}
          schedule={schedule}
          onIndexPress={handleIndexPress}
          accent={selectedIndex && selectedIndex === schedule.index}
        />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: "5%",
    paddingHorizontal: "5%",
    width: "100%",
  },
});

export default React.memo(ScheduleList);
