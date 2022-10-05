import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity
} from 'react-native';

export default function Button({ title, onChange }) {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => onChange()}
      >
        <Text style={styles.text}>
          {title}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F0',
    alignItems: 'center',
    justifyContent: 'center'
  },
  button: {
    backgroundColor: '#F2F2F0',
    borderWidth: 1,
    borderColor: '#BF0436',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
    width: '80%',
    padding: 15
  },
  text: {
    fontSize: 12,
    color: '#474F59'
  }
});
