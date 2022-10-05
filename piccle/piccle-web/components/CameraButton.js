import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';

export default class CameraButton extends Component {
  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.cameraBtnWrapper}>
          <View style={styles.cameraBtnOuterCircle}>
            <View style={styles.cameraBtnInnerCircle} />
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center'
  },
  cameraBtnWrapper: {
    position: 'absolute',
    bottom: 20
  },
  cameraBtnOuterCircle: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: 60,
    height: 60,
    borderColor: '#dd2745',
    borderWidth: 6,
    borderRadius: 30
  },
  cameraBtnInnerCircle: {
    width: 36,
    height: 36,
    backgroundColor: '#dd2745',
    borderRadius: 18
  }
});
