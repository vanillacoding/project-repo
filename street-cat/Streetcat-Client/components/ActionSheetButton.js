import React from 'react';
import { Button, ActionSheet } from 'native-base';
import { StyleSheet, Text } from 'react-native';

const ActionSheetButton = ({ array, cancelIndex, title, actionFunction }) => {
  return (
    <Button
      rounded
      style={styles.button}
      onPress={() =>
      ActionSheet.show(
        {
          options: array,
          cancelButtonIndex: cancelIndex,
          title,
        },
        buttonIndex => {
          actionFunction({ clicked: array[buttonIndex] })
        }
      )}
    >
      <Text style={{ color: 'white' }}>{title}</Text>
    </Button>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#C64242',
    justifyContent: 'center',
  },
});

export default ActionSheetButton;
