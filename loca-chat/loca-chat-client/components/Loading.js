import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function Loading() {
  const [dot, setDot] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      if (dot.length === 3) {
        setDot('');
      } else {
        setDot((dot) => dot + '.');
      }
    }, 100);

    return () => clearInterval(interval);
  });

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{dot}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    fontSize: 100
  }
});
