import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";

import { color, horizontalScale, moderateScale, verticalScale } from "../config/globalStyles";

export default function CustomBottomTabBarButton({ navigation }) {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.customTabBar} activeOpacity={1}>
        <View style={styles.customTabBarCircle}>
          <AntDesign name="plus" style={styles.icon} size={40} color="white" />
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  CustomTabBarCircle: {
    width: horizontalScale(90),
    height: verticalScale(90),
    borderRadius: moderateScale(100),
    backgroundColor: color.poplaceLight,
  },
});
