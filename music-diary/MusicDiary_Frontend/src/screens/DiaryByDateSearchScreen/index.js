import React from "react";
import { View, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import DiaryList from "../../components/DiaryList";
import { useIsFocused } from "@react-navigation/native";

const DiaryByDateSearchScreen = ({ navigation }) => {
  const isFocused = useIsFocused();
  const { byIds } = useSelector((state) => state.diary);

  if (isFocused) {
    console.log("focused by date?");
  }

  function handleDiaryPressBtn(diaryInfo) {
    navigation.navigate("SingleDiary", { data: diaryInfo });
  }

  return (
    <View style={styles.container}>
      <DiaryList
        diaryList={Object.values(byIds)}
        onPressDiary={handleDiaryPressBtn}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
});

export default DiaryByDateSearchScreen;
