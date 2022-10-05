import React from 'react';
import { View, Modal, StyleSheet, Pressable } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import Button from './Button';
import colors from '../../theme/color';

const AlertModal = ({ title, onConfirm, onClose, children }) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={true}
      onRequestClose={onConfirm}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalContainer}>
          <View style={styles.close}>
            <Pressable onPress={onClose}>
              <FontAwesome
                name="close"
                size={16}
                color={colors.black}
              />
            </Pressable>
          </View>
          <View style={styles.childrenContainer}>
            {children}
          </View>
          <Button
            text="확인"
            type="filled"
            onPress={onConfirm}
            customButtonStyle={styles.confirm}
          />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20
  },
  confirm: {
    width: 60,
    height: 30,
    backgroundColor: colors.main
  },
  modalContainer: {
    margin: 20,
    padding: 20,

    justifyContent: 'space-between',
    alignItems: "center",
    backgroundColor: colors.white,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,

    borderRadius: 14,
  },
  closeContainer: {
    alignItems: 'flex-start',
  },
  close: {
    alignSelf: 'flex-end',
  },
  confirm: {
    width: 80,
    marginTop: 0,
  },
  childrenContainer: {
    margin: 30,
    alignSelf: 'center'
  }
});

export default AlertModal;
