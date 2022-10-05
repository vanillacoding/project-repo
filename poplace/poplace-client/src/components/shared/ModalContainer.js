import React from "react";
import { View, StyleSheet } from "react-native";
import { color } from "../../config/globalStyles";

export default function ModalContainer({ children }) {
  return (
    <View style={styles.modalContainer}>
      <View style={styles.modalBackgroud} />
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  modalBackgroud: {
    position: "absolute",
    opacity: 0.5,
    backgroundColor: color.poplaceWhite,
    width: "100%",
    height: "100%",
  },
});
