import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Foundation } from '@expo/vector-icons';

import { color, moderateScale } from "../../config/globalStyles";

export default function EmptyMorePage({ title }) {
  return (
    <View style={styles.container}>
      <Foundation name="battery-empty" size={moderateScale(100)} color={color.poplaceSilverGary} />
      <Text style={styles.text}>{title}이 없어요 {":("}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "90%",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: color.poplaceSilverGary,
    fontSize: moderateScale(18),
  },
});
