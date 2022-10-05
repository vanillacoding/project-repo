import React from "react"
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, Alert } from "react-native";
import { useSelector, useDispatch } from "react-redux";

import { selectUser } from "../features/userSlice";
import savePinData from "../api/savePinData";
import { turnOnOffModal } from "../features/modalVisibleSlice";
import { selectCurrentPin } from "../features/currentPinSlice";
import { ALERT } from "../constants";
import { color } from "../style/globalStyles";
import { moderateScale, verticalScale, horizontalScale } from "../utils/styleSize";
import useInterval from "../hooks/useInterval";

export default function DetailPinScreen({ navigation, route }) {
  const { id: userId } = useSelector(selectUser);
  const {
    _id: pinId,
    image,
    tags,
    createdAt,
    savedAt,
    text,
    creator,
    savedUser,
  } = useSelector(selectCurrentPin);
  const isCreator = userId === creator;
  const isSavedUser = userId === savedUser;
  const isFromMainPage = route.params?.path === "Main";
  const dispatch = useDispatch();

  const { remainTime } = useInterval(
    isFromMainPage,
    isCreator,
    isSavedUser,
    createdAt,
    savedAt,
    navigation,
  );

  async function handleSavePin() {
    const result = await savePinData(pinId, userId);

    if (result.success) {
      Alert.alert(ALERT.notice, ALERT.savePin, [
        {
          text: ALERT.accept, onPress: () => {
            dispatch(turnOnOffModal(false));
            return navigation.replace("Bottom", { "screen": "HomeScreen" });
          }
        },
      ]);
    }
  }

  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={{
          uri: image[0],
        }}
      />
      <View style={styles.timeContainer}>
        <View style={styles.time}>
          <Text style={styles.timeText}>{remainTime}</Text>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        {!isCreator && !isSavedUser &&
          <TouchableOpacity
            text="저장하기"
            style={styles.button}
            onPress={handleSavePin}
          >
            <Text style={styles.buttonText}>저장하기</Text>
          </TouchableOpacity>}
      </View>
      <View style={styles.tagContainer}>
        {tags?.map((tag, index) => <Text key={`${pinId}${index}`} style={styles.tag}>{tag}</Text>)}
      </View>
      <ScrollView style={styles.textContainer}>
        <Text style={styles.text}>{text}</Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: color.poplaceWhite,
  },
  image: {
    flex: 2,
    width: "100%",
  },
  timeContainer: {
    marginTop: verticalScale(15),
    marginBottom: verticalScale(5),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    width: "80%",
  },
  time: {
    justifyContent: "center",
  },
  timeText: {
    fontSize: moderateScale(18),
    fontWeight: "700",
    color: color.poplaceDark,
  },
  buttonContainer: {
    width: "80%",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    color: color.poplaceWhite,
    fontWeight: "700",
    backgroundColor: color.poplaceRed,
    borderRadius: moderateScale(50),
    marginHorizontal: horizontalScale(5),
    marginVertical: verticalScale(10),
    paddingVertical: verticalScale(8),
    paddingHorizontal: horizontalScale(20),
  },
  buttonText: {
    color: color.poplaceWhite,
    fontSize: moderateScale(15),
    fontWeight: "700",
  },
  tagContainer: {
    flexDirection: "row",
    width: "85%",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: verticalScale(5),
    padding: verticalScale(8),
    borderBottomColor: color.poplaceMiddleGray,
    borderTopColor: color.poplaceMiddleGray,
    borderTopWidth: 1,
    borderBottomWidth: 1,
  },
  tag: {
    color: color.poplaceRed,
    fontWeight: "700",
    backgroundColor: color.poplaceWhite,
    borderRadius: moderateScale(50),
    marginHorizontal: horizontalScale(5),
    marginVertical: verticalScale(10),
    paddingVertical: verticalScale(5),
    paddingHorizontal: horizontalScale(10),
    shadowColor: color.poplaceDark,
    shadowOpacity: 0.01,
    elevation: 2,
  },
  textContainer: {
    flex: 0.8,
    width: "80%",
  },
  text: {
    color: color.poplaceLight,
    fontSize: moderateScale(16),
    marginVertical: verticalScale(10),
    lineHeight: verticalScale(20),
  },
});
