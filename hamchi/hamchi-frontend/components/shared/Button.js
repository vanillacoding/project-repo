import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import colors from '../../theme/color';

const Button = ({ text, type, onPress, customButtonStyle }) => {
  const btnBgColor = type === 'filled' ? colors.main : colors.transparent;
  const btnTextColor = type === 'filled' ? colors.white : colors.main;

  const buttonCommonStyle = {
    alignItems: "center",
    margin: 8,
    padding: 15,
    marginTop: 30,
    borderRadius: 30,
    backgroundColor: btnBgColor,
  };
  const textCommonStyle = {
    fontSize: 15,
    fontWeight: 'bold',
    color: btnTextColor,
  };

  return (
    <TouchableOpacity
      style={[buttonCommonStyle, customButtonStyle]}
      onPress={onPress}
    >
      <Text style={[textCommonStyle]}>{text}</Text>
    </TouchableOpacity>
  );
};

export default Button;
