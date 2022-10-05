import { StyleSheet } from "react-native";

import {
  BLACK,
  WHITE,
  TRANSPARENCY
} from "../../../constants/color";

const styles = StyleSheet.create({
  buttonWrapper: {
    width: "90%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 30
  },
  buttonContainer: {
    width: "20%",
    justifyContent: "center",
    alignItems: "center",
    margin: 0,
    padding: 10,
    borderRadius: 10,
    backgroundColor: WHITE,
    shadowColor: BLACK,
    shadowOffset: {
      width: 10,
      height: 10
    },
    shadowOpacity: 0.4,
    shadowRadius: 4
  },
  button: {
    width: "100%",
    backgroundColor: TRANSPARENCY
  },
  buttonText: {
    color: BLACK,
    fontSize: 10,
    fontWeight: "bold"
  },
  buttonIcon: {
    padding: 10
  }
});

export default styles;
