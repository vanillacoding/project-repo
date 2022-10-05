import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

const LoadingScreen = () => {
  return (
    <View style={styles.loading}>
     <Text>Loading</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default LoadingScreen;
