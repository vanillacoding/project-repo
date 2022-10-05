import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, TouchableOpacity, Image } from "react-native";

const HomeDiaryAlert = ({ matchedHistoryDiary, navigation }) => {
  function moveToRelevantDiary() {
    navigation.navigate("Diary", {
      screen: "SingleDiary",
      params: { data: matchedHistoryDiary },
    });
  }

  return (
    <View>
      <TouchableOpacity
        style={styles.diaryWrapper}
        onPress={moveToRelevantDiary}
      >
        <View style={styles.diaryImg}>
          {matchedHistoryDiary?.playList?.length ? (
            <Image
              source={{
                uri: matchedHistoryDiary?.playList[0]?.albumImg[1]?.url,
                width: 160,
                height: 160,
                borderRadius: 2,
                marginTop: 10,
              }}
            />
          ) : (
            <Image
              style={styles.img}
              source={require("../../../assets/empty.png")}
            />
          )}
        </View>

        <View stlye={styles.diaryContainer}>
          <View style={styles.hashTagWrapper}>
            <Text style={styles.hashTagText}>
              #{" "}
              {matchedHistoryDiary?.hashTag
                ? matchedHistoryDiary.hashTag
                : "No diary"}
            </Text>
          </View>
          <View style={styles.dateWrapper}>
            <Text style={styles.dateText}>
              {matchedHistoryDiary?.date ? matchedHistoryDiary.date : null}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  img: {
    width: 80,
    height: 50,
  },
  diaryImg: {
    width: 160,
    height: 160,
    justifyContent: "center",
    alignItems: "center",
    borderBottomWidth: 0.5,

    borderColor: "rgba(0, 0, 0, 0.4)",
  },
  withinText: {
    fontSize: 20,
    fontFamily: "DMSans_500Medium",
    width: 180,
    marginTop: 30,
    fontWeight: "400",
    color: "rgba(0, 0, 0, 0.6)",
  },
  hashTagWrapper: {
    width: 150,
    height: 35,
    marginTop: 10,
    alignItems: "center",
  },
  hashTagText: {
    fontSize: 18,
    width: 165,
    marginLeft: 20,
    color: "black",
    fontWeight: "600",
  },
  dateWrapper: {
    width: 150,
    justifyContent: "center",
    marginBottom: 0,
  },
  dateText: {
    fontSize: 9,
    height: 20,
    marginLeft: 5,
    color: "black",
    fontWeight: "700",
  },
  homeLocationLogo: {
    width: 150,
    height: 150,
    marginTop: 60,
    justifyContent: "center",
    alignItems: "center",
  },
  diaryWrapper: {
    width: 160,
    height: 230,
    borderWidth: 0.3,
    borderColor: "rgba(0, 0, 0, 0.3)",
    flexDirection: "column",
    marginTop: 15,
    fontWeight: "500",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  diaryContainer: {
    width: 165,
    height: 50,
    borderWidth: 2,
    borderColor: "black",
  },
  titleContainer: {
    height: "10%",
  },
  playListContainer: {
    height: "80%",
    borderWidth: 1,
  },
  trackContainer: {
    borderWidth: 1,
  },
});

export default HomeDiaryAlert;
