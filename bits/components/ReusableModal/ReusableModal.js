import React from 'react';
import { Modal, View, Text, Pressable } from 'react-native';
import { STRINGS } from '../../constants/index';

import styles from './styles';

const ReusableModal = ({
  message,
  visible,
  onButtonPress
}) => {

  return (
    <Modal
      animationType={STRINGS.SLIDE}
      transparent={true}
      visible={visible}
    >
      <View style={styles.moddalWrapper}>
        <View style={styles.modal}>
          <Text style={styles.infoText}>
            {message}
          </Text>
          <Pressable
            style={styles.modalBtn}
            onPress={onButtonPress}
            testID={STRINGS.CONFIRM}
          >
            <Text style={styles.confirmText}>
              {STRINGS.CONFIRM}
            </Text>
          </Pressable>
        </View>
      </View>
  </Modal>
  );
};

export default ReusableModal;
