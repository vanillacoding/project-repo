import React, { useState } from "react";
import { useSelector } from "react-redux";
import { View, Text, TouchableOpacity } from "react-native";
import Diary from "../../components/Diary";

const DiaryScreen = ({ route, navigation }) => {
  const { data } = route.params;
  const { byIds } = useSelector((state) => state.diary);

  const newDiaryInfo = byIds[data.newDiaryId];
  const diaryId = data.newDiaryId ? newDiaryInfo?._id : data?._id;

  function openNewTrackAddingModal() {
    navigation.navigate("addNewTrackModal", { data: diaryId });
  }

  return (
    <View style={styles.container}>
      <Diary data={data.newDiaryId ? newDiaryInfo : data} diaryId={diaryId} />
      <View style={styles.btnWrap}>
        <TouchableOpacity
          style={styles.addTrackBtn}
          onPress={openNewTrackAddingModal}
        >
          <Text style={styles.addBtnText}>Search Track</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = {
  addTrackBtn: {
    width: 55,
    height: 45,
    justifyContent: "center",
    alignItem: "center",
    borderWidth: 1.5,
    borderColor: "black",
    backgroundColor: "#ffffff",
  },
  addBtnText: {
    textAlign: "center",
    fontSize: 12,
    fontWeight: "700",
    color: "black",
  },
  btnWrap: {
    flexDirection: "row",
    width: 360,
    justifyContent: "flex-end",
    marginTop: 10,
  },
  container: {
    flex: 1,
    flexDirection: "column",
    alignItem: "center",
    backgroundColor: "#ffffff",
  },
};

export default DiaryScreen;
