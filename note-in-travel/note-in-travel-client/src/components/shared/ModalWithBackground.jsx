import React from "react";
import { View, Modal, StyleSheet } from "react-native";

import THEME from "../../constants/theme";

function ModalWithBackground({
  isOpen,
  onClose,
  animationType = "fade",
  children,
}) {
  return (
    <Modal
      animationType={animationType}
      visible={isOpen}
      transparent
      onRequestClose={onClose}
    >
      <View style={styles.modalFormContainer}>
        <View style={styles.modalBackground} />
        {children}
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalFormContainer: {
    position: "relative",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalBackground: {
    position: "absolute",
    width: "100%",
    height: "100%",
    backgroundColor: THEME.color.primitive,
    opacity: 0.5,
  },
});

export default ModalWithBackground;
