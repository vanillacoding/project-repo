import React from "react";
import { View, Text, Modal, TouchableOpacity, StyleSheet } from "react-native";
import { Button } from "react-native-elements";

const UserConfirmModal = ({ isVisible, setIsVisible, handleConfirm, description }) => {
  const handleCancelConfirm = () => {
    setIsVisible(false);
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={isVisible}
      onRequestClose={handleCancelConfirm}
    >
      <TouchableOpacity style={styles.centeredView} onPress={handleCancelConfirm}>
        <View style={styles.modalView}>
          <View style={styles.descriptionContainer}>
            <Text style={styles.descriptionText} >{description}</Text>
          </View>

          <View style={styles.confirmButtons}>
            <Button
              title="취소"
              onPress={handleCancelConfirm}
            />
            <Button
              title="확인"
              onPress={handleConfirm}
            />
          </View>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  descriptionText: {
    fontSize: 18,
    fontWeight: "700",
  },
  confirmButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: 120,
    marginTop: 30,
  },
});

export default UserConfirmModal;
