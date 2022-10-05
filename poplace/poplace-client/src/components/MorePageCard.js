import React, { useState, useEffect } from "react";
import { Image, View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useDispatch } from "react-redux";

import getDate from "../utils/getDate";
import { color, moderateScale, horizontalScale, verticalScale } from "../config/globalStyles";
import { addCurrentPin } from "../features/currentPinSlice";
import { ALERT } from "../constants";

export default function MorePageCard({ navigation, pinData, title }) {
  const {
    _id,
    image,
    tags,
    createdAt,
    savedAt,
    text,
  } = pinData;
  const [isVisible, setIsVisible] = useState(true);
  const [remainTime, setRemainTime] = useState(null);
  const isCreatedPin = title === "내가 생성한 핀";
  const isSavedPin = title === "내가 저장한 핀";
  const dispatch = useDispatch();

  useEffect(() => {
    const id = setInterval(() => {
      if (isCreatedPin) {
        const timeInfo = getDate(createdAt);

        if (!timeInfo) {
          setRemainTime(ALERT.pinTimeOver);
          return;
        }

        return setRemainTime(`남은시간 ${timeInfo}`);
      }

      if (isSavedPin) {
        const timeInfo = getDate(savedAt);

        if (!timeInfo) {
          setRemainTime(ALERT.pinTimeOver);
          setIsVisible(false);
          return;
        }

        return setRemainTime(`남은시간 ${timeInfo}`);
      }
    }, 1000);

    return () => {
      clearInterval(id);
    };
  }, []);

  function showMyPinDetail() {
    dispatch(addCurrentPin(pinData));
    navigation.navigate("DetailPin", { title });
  }

  if (!isVisible) {
    return null;
  }

  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={showMyPinDetail}>
      <View style={styles.container}>
        <View style={styles.listContainer}>
          <Image
            style={styles.previewContainer}
            source={{ uri: image[0] }}
          />
          <View style={styles.textContainer}>
            <Text style={styles.timeText}>
              {remainTime}
            </Text>
            <View style={styles.bodyContainer}>
              {tags?.map((tag, index) => {
                return <Text key={`${_id}${index}`} style={styles.tagsText}>{tag}</Text>
              })}
            </View>
            <View style={styles.textBox}>
              <Text style={styles.text}>{text?.slice(0, 12) + "..."}</Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: verticalScale(110),
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: color.poplaceWhite,
    borderRadius: 15,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 8,
    paddingHorizontal: horizontalScale(10),
    marginVertical: verticalScale(6),
    marginHorizontal: horizontalScale(14),
  },
  listContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  previewContainer: {
    height: verticalScale(80),
    width: horizontalScale(80),
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
  },
  textContainer: {
    marginLeft: verticalScale(10),
  },
  timeText: {
    fontSize: moderateScale(14),
    color: color.poplaceDark,
    fontWeight: "bold",
    textTransform: "capitalize",
  },
  bodyContainer: {
    flexDirection: "row",
    marginTop: verticalScale(5),
  },
  tagsText: {
    color: color.poplaceWhite,
    backgroundColor: color.poplaceRed,
    fontSize: moderateScale(8),
    textAlign: "center",
    fontWeight: "700",
    borderRadius: 30,
    marginRight: horizontalScale(5),
    paddingVertical: verticalScale(2),
    paddingHorizontal: moderateScale(8),
  },
  textBox: {
    width: "100%",
  },
  text: {
    color: color.poplaceGray,
    marginTop: verticalScale(5),
    fontSize: moderateScale(12),
  },
});
