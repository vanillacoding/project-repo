import React from 'react';
import { View } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const PickerInput = ({ content, onChange, contentOptions }) => {
  return (
    <View>
      <Picker selectedValue={content} onValueChange={value => onChange(value)}>
        {contentOptions.map((option, index) => {
          return <Picker.Item key={index} label={option} value={option} />;
        })}
      </Picker>
    </View>
  );
};

export default PickerInput;
