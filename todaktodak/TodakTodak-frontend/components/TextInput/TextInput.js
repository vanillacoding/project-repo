import React from "react";
import { View, TextInput } from "react-native";

import styles from "./styles";

const TextInputWrapper = ({
  type,
  style,
  value,
  editable = true,
  placeholder = "",
  handleInputChange,
  isPassword = false,
  isMultiline = false
}) => {
  return (
    <View style={styles.textInputContainer}>
      <TextInput
        value={value}
        editable={editable}
        textContentType={type}
        multiline={isMultiline}
        placeholder={placeholder}
        secureTextEntry={isPassword}
        onChangeText={handleInputChange}
        style={[ styles.textInput, style ]}
      />
    </View>
  );
}

export default React.memo(TextInputWrapper);
