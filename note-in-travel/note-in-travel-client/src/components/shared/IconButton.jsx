import React from "react";
import { TouchableOpacity } from "react-native";

import VectorIcon from "./VectorIcon";

function IconButton({
  type,
  name,
  color,
  size,
  onPress = () => {},
  onLongPress = () => {},
  style,
  testID,
}) {
  return (
    <TouchableOpacity
      style={style}
      onPress={onPress}
      onLongPress={onLongPress}
      testID={testID}
    >
      <VectorIcon
        type={type}
        name={name}
        size={size}
        color={color}
      />
    </TouchableOpacity>
  );
}

export default IconButton;
