import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";

import getEnvVars from "../config/environment";
const { DEFAULT_IMAGE_URL } = getEnvVars();
import { selectUser, addImage } from "../features/userSlice";
import openImagePicker from "../api/openImagePicker";
import { color, horizontalScale, verticalScale, moderateScale } from "../config/globalStyles";

export default function MyPageProfile() {
  const { image, nickname } = useSelector(selectUser);
  const dispatch = useDispatch();

  async function changeImagePicker() {
    const imageResult = await openImagePicker();

    if (imageResult) {
      dispatch(addImage(imageResult));
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.profileStroke}>
        <TouchableOpacity onPress={changeImagePicker} activeOpacity={1}>
          <Image
            style={styles.profile}
            source={{
              uri: image || DEFAULT_IMAGE_URL,
            }}
          />
        </TouchableOpacity>
      </View>
      <Text style={styles.title}>{nickname}</Text>
      <View style={styles.titleUnderLine}></View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    top: horizontalScale(20),
  },
  profile: {
    position: "relative",
    width: horizontalScale(80),
    height: verticalScale(80),
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
  },
  profileStroke: {
    marginBottom: horizontalScale(10),
    width: horizontalScale(85),
    height: verticalScale(85),
    borderRadius: 100,
    backgroundColor: color.poplaceWhite,
    alignItems: "center",
    justifyContent: "center",
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
  },
  title: {
    color: color.poplaceDark,
    fontSize: moderateScale(16),
    fontWeight: "700",
    textAlign: "center",
  },
  titleUnderLine: {
    marginVertical: "2%",
    top: "5%",
    width: "85%",
    borderBottomWidth: 1,
    borderColor: color.poplaceLightGray,
  },
});
