import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity, Alert } from "react-native";
import Modal from "react-native-modal";
import { useDispatch, useSelector } from "react-redux";

import { selectModalOn, turnOnOffModal } from "../features/modalVisibleSlice";
import { selectCurrentPin } from "../features/currentPinSlice";
import { selectUser } from "../features/userSlice";
import { color, verticalScale, horizontalScale, moderateScale } from "../config/globalStyles";
import savePinData from "../api/savePinData";
import getDate from "../utils/getDate";
import { ALERT } from "../constants";

export default function SlideModal({ navigation }) {
  const [remainTime, setRemainTime] = useState([]);
  const modalVisibleStatus = useSelector(selectModalOn);
  const { id: userId } = useSelector(selectUser);
  const {
    _id: pinId,
    image,
    tags,
    createdAt,
    text,
    creator,
  } = useSelector(selectCurrentPin);
  const dispatch = useDispatch();
  const isCreator = userId === creator;
  const isTimeOver = remainTime === ALERT.pinTimeOver;

  function handleModalVisible() {
    dispatch(turnOnOffModal(false));
  }

  function showDetailPinScreen() {
    dispatch(turnOnOffModal(false));

    navigation.navigate("DetailPin", { path: "Main" });
  }

  useEffect(() => {
    const id = setInterval(() => {
      const timeInfo = getDate(createdAt);

      if (!timeInfo) {
        setRemainTime(ALERT.pinTimeOver);
        return;
      }

      setRemainTime(`남은시간 ${timeInfo}`);
    }, 1000);

    return () => {
      clearInterval(id);
    };
  }, [createdAt]);

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

  if (remainTime.includes(NaN)) {
    return null;
  }

  return (
    <Modal
      style={styles.modalContainer}
      isVisible={modalVisibleStatus}
      animationType="slide"
      backdropOpacity={0}
      onBackButtonPress={handleModalVisible}
      onBackdropPress={handleModalVisible}
      swipeDirection="up"
      swipeThreshold={540}
      onSwipeComplete={showDetailPinScreen}
    >
      <View style={styles.modal}>
        <View style={styles.picker} />
        <View style={styles.timeTextContainer}>
          <Text style={styles.timeText}>
            {remainTime}
          </Text>
        </View>
        <View style={styles.listContainer}>
          <View style={styles.bodyContainer}>
            <View style={styles.tagContainer}>
              {tags?.map((text, index) => {
                if (index === 2) {
                  return;
                }

                return <Text key={`${pinId}${index}`} style={styles.tagsText}>{text}</Text>;
              })}
            </View>
            <View style={styles.tagContainer}>
              {tags?.map((text, index) => {
                if (index === 2) {
                  return <Text key={`${pinId}${index}`} style={styles.tagsText}>{text}</Text>;
                }

                return;
              })}
            </View>
            <View style={styles.textBox}>
              <Text style={styles.text}>{text?.slice(0, 15) + "..."}</Text>
            </View>
          </View>
          <Image
            style={styles.previewContainer}
            source={{ uri: image[0] }}
          />
        </View>
        {!isCreator && !isTimeOver &&
          <TouchableOpacity
            style={styles.saveButton}
            onPress={handleSavePin}
          >
            <Text style={styles.saveButtonText}>저장하기</Text>
          </TouchableOpacity>}
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
    left: verticalScale(-16),
    shadowColor: color.poplaceDark,
  },
  modal: {
    width: "100%",
    height: "150%",
    position: "absolute",
    flex: 1,
    bottom: verticalScale(-740),
    backgroundColor: color.poplaceWhite,
    alignItems: "center",
    borderTopLeftRadius: moderateScale(40),
    borderTopRightRadius: moderateScale(40),
    shadowColor: color.poplaceDark,
    shadowOpacity: 0.01,
    elevation: 20,
  },
  picker: {
    marginTop: verticalScale(10),
    borderRadius: moderateScale(30),
    width: "20%",
    height: verticalScale(4),
    backgroundColor: color.poplaceLight,
    justifyContent: "center",
    alignItems: "center",
  },
  listContainer: {
    width: horizontalScale(280),
    height: verticalScale(90),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  previewContainer: {
    height: verticalScale(90),
    width: horizontalScale(90),
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 15,
  },
  timeTextContainer: {
    top: 2,
    marginTop: verticalScale(10),
    marginBottom: verticalScale(15),
  },
  timeText: {
    fontSize: moderateScale(15),
    color: color.poplaceDark,
    fontWeight: "bold",
  },
  bodyContainer: {
    width: horizontalScale(180),
    height: verticalScale(110),
  },
  tagContainer: {
    flexDirection: "row",
    marginTop: verticalScale(3),
  },
  tagsText: {
    color: color.poplaceRed,
    backgroundColor: color.poplaceWhite,
    fontSize: moderateScale(9),
    textAlign: "center",
    fontWeight: "700",
    borderRadius: 30,
    marginRight: horizontalScale(8),
    marginVertical: verticalScale(2),
    paddingVertical: verticalScale(4),
    paddingHorizontal: moderateScale(12),
    shadowColor: color.poplaceDark,
    shadowOpacity: 0.01,
    elevation: 2,
  },
  textBox: {
    top: verticalScale(5),
    width: horizontalScale(170),
  },
  text: {
    color: color.poplaceGray,
    marginTop: verticalScale(5),
    fontSize: moderateScale(13),
  },
  saveButton: {
    bottom: -15,
    backgroundColor: color.poplaceRed,
    textAlign: "center",
    borderRadius: 30,
    paddingVertical: verticalScale(8),
    paddingHorizontal: moderateScale(24),
  },
  saveButtonText: {
    fontWeight: "700",
    color: color.poplaceWhite,
    fontSize: moderateScale(12),
  },
});
