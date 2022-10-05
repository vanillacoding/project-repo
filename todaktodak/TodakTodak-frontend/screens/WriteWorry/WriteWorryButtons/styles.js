import { StyleSheet } from "react-native";

import {
  YELLOW,
  TRANSPARENCY
} from "../../../constants/color";

const styles = StyleSheet.create({
  sendButton: {
    left: "64%",
    width: "35%",
    backgroundColor: TRANSPARENCY
  },
  buttonText: {
    color: YELLOW,
    fontSize: 15
  }
});

export default styles;
