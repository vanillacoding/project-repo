import React from 'react';
import { StyleSheet, View } from 'react-native';

import Map from '../components/Map';

export default function Location() {
  return (
    <View style={styles.locationWrapper}>
      <Map isScrollEnabled={true} />
    </View>
  );
}

const styles = StyleSheet.create({
  locationWrapper: {
    flex: 1
  }
});
