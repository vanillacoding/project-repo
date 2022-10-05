import { StyleSheet } from "react-native";

import {
  WHITE,
  BUTTON_BACKGROUND
} from "../../constants/color";

const styles = StyleSheet.create({
  button: {
    width: "45%",
    height: "auto",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    borderRadius: 10,
    backgroundColor: BUTTON_BACKGROUND
  },
  buttonContents: {
    justifyContent: "center",
    alignItems: "center"
  },
  buttonText: {
    color: WHITE,
    fontWeight: "bold",
    fontSize: 20
  }
});

export default styles;
