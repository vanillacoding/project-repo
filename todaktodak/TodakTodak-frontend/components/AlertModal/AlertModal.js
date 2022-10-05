import React from "react";
import {
  View,
  Text,
  Modal
} from "react-native";

import Button from "../../components/Button/Button";

import styles from "./styles";

const AlertModal = ({
  message,
  handleModalClose
}) => {
  return (
    <Modal
      transparent={true}
      animationType="slide"
    >
      <View style={styles.friendModal}>
        <Text style={styles.text}>
          {message}
        </Text>
        <Button
          text="닫기"
          handleClick={handleModalClose}
          buttonStyle={styles.modalButton}
          textStyle={styles.modalButtonText}
        />
      </View>
    </Modal>
  );
};

export default React.memo(AlertModal);
