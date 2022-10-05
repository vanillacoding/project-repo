import React from 'react';
import { Picker } from '@react-native-picker/picker';

const OccupationPicker = ({ value, setValue, items, styleObj }) => {
  return (
    <Picker
      selectedValue={value}
      style={styleObj ? styleObj : { marginVertical: 1, height: 50 }}
      onValueChange={itemValue => setValue(itemValue)}
    >
      {items?.map(item => {
        return <Picker.Item label={item} value={item} key={item} />;
      })}
    </Picker>
  );
};

export default OccupationPicker;
