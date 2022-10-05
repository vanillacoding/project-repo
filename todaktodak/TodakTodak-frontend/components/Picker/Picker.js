import React from "react";
import { Text, View } from "react-native";
import PickerSelect from "react-native-picker-select";

import styles from "./styles";

const Picker = ({
  label,
  value,
  itemList,
  handleChange
}) => {
  return (
    <View style={styles.pickerContainer}>
      <Text style={styles.pickerLabel}>
        {label}
      </Text>
      <View style={styles.selector}>
        <PickerSelect
          value={value}
          items={itemList}
          onValueChange={(value) => handleChange(value)}
        />
      </View>
    </View>
  );
}

export default React.memo(Picker);
