import React from 'react';
import { Spinner } from 'native-base';
import { StyleSheet } from 'react-native';
import Color from '../constants/Colors';

export default function LoadingSpinner() {
  return <Spinner style={styles.spinnerContainer} color={Color.gray} />;
}

const styles = StyleSheet.create({
  spinnerContainer: {
    flex: 1,
    alignContent: 'center',
    alignItems: 'center'
  },
});
