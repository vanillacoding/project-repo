import React from "react";
import { Keyboard, TouchableWithoutFeedback } from "react-native";
import PropTypes from "prop-types";

export default function DismissKeyboard({ children }) {
  return (
    <TouchableWithoutFeedback
      onPress={() => Keyboard.dismiss()}
    >
      {children}
    </TouchableWithoutFeedback>
  );
}

DismissKeyboard.propTypes = {
  children: PropTypes.object.isRequired,
};
