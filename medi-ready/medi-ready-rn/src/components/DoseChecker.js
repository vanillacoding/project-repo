import React from "react";
import { StyleSheet, Text, View } from "react-native";

import { DOSE_PERIOD_KR } from "../constants/dosePeriod";
import Pills from "./Pills";

const DoseChecker = () => {
  const dosePeriodList = [
    DOSE_PERIOD_KR.MORNING,
    DOSE_PERIOD_KR.LUNCH,
    DOSE_PERIOD_KR.DINNER,
    DOSE_PERIOD_KR.BEFORE_BED,
  ];

  return (
    <View style={styles.container}>
      {dosePeriodList.map((dosePeriod, index) => {
        return (
          <View key={`dose-period-${index}`} style={styles.dosePeriod}>
            <Text>{dosePeriod}</Text>

            <View style={styles.pillIcon}>
              <Pills
                dosePeriod={dosePeriod} />
            </View>
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    height: 50,
    marginTop: 25,
  },
  dosePeriod: {
    marginRight: 30,
    marginLeft: 30,
  },
  pillIcon: {
    marginTop: 15,
  },
});

export default DoseChecker;
