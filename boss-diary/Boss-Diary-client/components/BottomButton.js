import React from 'react';
import { View, Button, StyleSheet } from 'react-native';

export default function BottomButton(props) {
  const { title, onPress } = props;

  return (
    <View style={styles.bottom}>
      <Button
        title={title}
        onPress={onPress}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  bottom: {
    justifyContent: 'flex-end',
    marginBottom: 15
  }
});
