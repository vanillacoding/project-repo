import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import { COLOR, FONT } from '../constants';

export default function CameraMapBox({ type, onPress }) {
  return (
    <TouchableOpacity
      style={styles.cameraAndMapWrapper}
      onPress={onPress}
    >
      <Text style={styles.categoryText}>{type}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  categoryText: {
    textAlign: 'center',
    fontSize: 28,
    color: COLOR.WHITE,
    fontFamily: FONT.PT_BOLD,
  },
  cameraAndMapWrapper: {
    flex: 1,
    justifyContent: 'center',
    margin: 3,
    padding: 8,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: COLOR.BLUE,
    backgroundColor: COLOR.BLUE
  },
});

CameraMapBox.propTypes = {
  type: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
};
