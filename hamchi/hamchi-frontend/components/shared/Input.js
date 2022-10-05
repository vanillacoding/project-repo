import React from 'react';
import { TextInput, StyleSheet } from 'react-native';
import colors from '../../theme/color';

const Input = (props) => {
  const {
    value,
    multiline,
    placeholder,
    onChangeText,
    secureTextEntry,
    customInputStyle
  } = props;

  return (
    <TextInput
      value={value}
      multiline={multiline}
      placeholder={placeholder}
      onChangeText={onChangeText}
      secureTextEntry={secureTextEntry}
      style={[styles.input, customInputStyle]}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    margin: 10,
    padding: 13,
    borderWidth: 1,
    borderRadius: 5,
    textAlign: 'center',
    borderColor: colors.outline
  },
});

export default Input;
