import React, { useState } from "react";
import HeatMap from "react-native-heatmap-chart";
import { Text, View, Dimensions, ScrollView, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { SimpleLineIcons } from "@expo/vector-icons";

function TotalDiaryInfoScreen({ route, navigation }) {
  const { calendar, byIds } = useSelector((state) => state.diary);
  const [score, setScore] = useState(null);
  const [date, setDate] = useState(null);

  const formattedMay = calendar.May.map((x) => {
    const length = x.length;

    const reduced = Math.floor(
      (x.reduce((acc, cur) => acc + cur, 0) / length) * 100
    );

    if (isNaN(reduced)) {
      return 0;
    }

    return reduced;
  });

  const click = (item) => {
    setScore(item.value);
    setDate(item.index);
    findDiaryId(item.index);
  };

  function findDiaryId(date) {
    let diaryDate = date;

    if (diaryDate < 10) {
      diaryDate = `0${diaryDate}`;
    }
    const diaryId = Object.values(byIds).filter(
      (diary) => diary.date === `2021-05-${diaryDate}`
    );

    if (diaryId.length) {
      navigation.navigate("Diary", {
        screen: "SingleDiary",
        params: { data: diaryId[diaryId.length - 1] },
      });
    }
  }

  return (
    <View style={styles.totalCalendar}>
      <View style={styles.months}>
        <Text style={styles.may}>MAY</Text>
        <Text style={styles.jun}>JUN</Text>
      </View>
      <View style={styles.container}>
        <ScrollView style={styles.mapWrap}>
          <HeatMap
            blocksStyle={styles.map}
            numberOfLines={7}
            maximumValue={"90"}
            values={formattedMay}
            onBlockPress={click}
            colorsPercentage={[0, 15, 30, 45, 70, 90]}
            colors={[
              "#a4b0be",
              "#fbc531",
              "#5352ed",
              "#9980FA",
              "#ED4C67",
              "#D980FA",
            ]}
          />
        </ScrollView>
        <ScrollView style={styles.mapWrap}>
          <HeatMap
            blocksStyle={styles.map}
            numberOfLines={7}
            values={[
              0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
              0, 0, 0, 0, 0, 0, 0,
            ]}
            colorsPercentage={[0, 20, 40, 60, 80, 100]}
            colors={[
              "#a4b0be",
              "#5352ed",
              "#9980FA",
              "#D980FA",
              "#fbc531",
              "#ED4C67",
            ]}
            onBlockPress={click}
          />
        </ScrollView>
      </View>

      <View style={styles.instructionWrapper}>
        <View style={styles.instruction}>
          <Text style={styles.instructionText}>
            Click squre to go to relevant diary page!
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  totalCalendar: {
    flex: 1,
    backgroundColor: "#ffffff",
    justifyContent: "center",
  },
  instructionWrapper: {
    flexDirection: "row",
    justifyContent: "center",
  },
  instruction: {
    width: 250,
    height: 150,
    justifyContent: "center",
    flexDirection: "row",
  },
  instructionText: {
    fontFamily: "DMSans_500Medium",
    fontSize: 20,
    fontWeight: "600",
  },
  months: {
    flexDirection: "row",
    justifyContent: "space-around",
    height: 30,
    alignItems: "center",
    fontFamily: "DMSans_700Bold",
  },
  may: {
    fontFamily: "DMSans_700Bold",
  },
  jun: {
    fontFamily: "DMSans_700Bold",
  },
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
  },
  mapWrap: {
    marginTop: 10,
    marginLeft: 10,
  },
});

export default TotalDiaryInfoScreen;
