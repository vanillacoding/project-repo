import React from 'react';
import { Text, StyleSheet } from 'react-native';

export default function ErrorMessage({ errorMessage }) {
  return <Text style={styles.errorText}>{errorMessage}</Text>;
}

const styles = StyleSheet.create({
  errorText: {
    color: 'red',
    marginTop: 10
  }
});
