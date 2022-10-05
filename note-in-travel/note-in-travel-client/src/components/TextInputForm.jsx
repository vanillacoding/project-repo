import React, { useState } from "react";
import {
  View,
  TextInput,
  StyleSheet,
} from "react-native";

import IconButton from "./shared/IconButton";

import THEME from "../constants/theme";

function TextInputForm({
  placeholder,
  onSubmit,
  onClose,
  style,
}) {
  const [text, setText] = useState("");

  function handlePress() {
    if (text.length === 0) return;

    onSubmit(text);
  }

  return (
    <View style={[styles.container, style]}>
      <TextInput
        style={styles.textInput}
        placeholder={placeholder}
        placeholderTextColor="gray"
        maxLength={10}
        onChangeText={setText}
      />
      <View style={styles.buttonContainer}>
        <IconButton
          name="save"
          color={THEME.color.primitive}
          size={30}
          onPress={handlePress}
          testID="saveButton"
        />
        <IconButton
          type="FontAwesome"
          name="close"
          size={30}
          color={THEME.color.accent}
          onPress={onClose}
          testID="closeButton"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    padding: 30,
    borderRadius: 20,
    backgroundColor: "#ffff",
  },
  textInput: {
    width: 160,
    marginTop: 10,
    paddingVertical: 10,
    paddingHorizontal: 5,
    borderColor: "gray",
    borderBottomWidth: 1,
    textAlign: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    paddingTop: "5%",
    width: 160,
  },
});

export default TextInputForm;
