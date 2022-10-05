import React from 'react';
import { Modal, View, Text, TouchableHighlight } from 'react-native';
import { styles } from '../shared/index';
import { COLOR } from '../constants/color';
import MESSAGE from '../constants/message';

const ModalQuestion = ({ modalVisible, setModalVisible, onClickYes }) => {
  return (
    <Modal animationType='slide' transparent={true} visible={modalVisible}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>{MESSAGE.CONFIRM_CANCEL_PROMISE}</Text>
          <View style={styles.buttonWrap}>
            <TouchableHighlight
              style={{
                ...styles.openButton,
                backgroundColor: COLOR.LIGHT_BLUE,
              }}
              onPress={() => {
                onClickYes();
                setModalVisible(!modalVisible);
              }}
            >
              <Text style={styles.textStyle}>{MESSAGE.YES}</Text>
            </TouchableHighlight>
            <TouchableHighlight
              style={{
                ...styles.openButton,
                backgroundColor: COLOR.LIGHT_BLUE,
              }}
              onPress={() => {
                setModalVisible(!modalVisible);
              }}
            >
              <Text style={styles.textStyle}>{MESSAGE.NO}</Text>
            </TouchableHighlight>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ModalQuestion;
