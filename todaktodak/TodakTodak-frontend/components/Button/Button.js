import React from "react";
import {
  Text,
  View,
  TouchableOpacity
} from "react-native";

import styles from "./styles";

const Button = ({
  text,
  children,
  textStyle,
  buttonStyle,
  handleClick
}) => {
  return (
    <TouchableOpacity
      style={[ styles.button, buttonStyle ]}
      onPress={handleClick}
    >
      <View style={styles.buttonContents}>
        {children}
        <Text style={[ styles.buttonText, textStyle ]}>
          {text}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

export default React.memo(Button);
