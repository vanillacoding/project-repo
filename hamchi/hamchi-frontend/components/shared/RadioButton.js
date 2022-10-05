import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import colors from '../../theme/color';

const RadioButton = ({ options, map, onChangeOption }) => {
  const [selectedOption, setSelectedOption] = useState();

  function handleOptionPress(item) {
    setSelectedOption(item);
    onChangeOption(item);
  }

  return (
    <View style={styles.container}>
      {options.map(option => {
        return (
          <TouchableOpacity
            key={option}
            style={selectedOption === option ? styles.option : styles.selectedOption}
            onPress={() => handleOptionPress(option)}
          >
            <Text
              style={selectedOption === option ? styles.text : styles.selectedText}
            >{map[option]}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    margin: 9,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    borderWidth: 1,
    borderColor: colors.outline
  },
  option: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: colors.main
  },
  text: {
    color: colors.white
  },
  selectedOption: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: colors.sub
  },
  selectedText: {
    color: colors.black
  },
});

export default RadioButton;
