import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { color, horizontalScale, verticalScale } from "../../config/globalStyles";

export default function CustomButton({ text, handleButton }) {
  return (
    <TouchableOpacity style={styles.button} activeOpacity={0.8} onPress={handleButton}>
      <Text style={styles.buttonText}>{text}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: horizontalScale(60),
    paddingVertical: verticalScale(8),
    borderRadius: 50,
    backgroundColor: color.poplaceRed,
  },
  buttonText: {
    color: color.poplaceWhite,
    fontSize: 24,
    fontWeight: "700",
  },
});
