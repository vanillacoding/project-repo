import { StyleSheet } from "react-native";

import { WHITE } from "../../constants/color";

const styles = StyleSheet.create({
  textInputContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-evenly",
    marginBottom: 20
  },
  textInput: {
    width: "90%",
    height: 45,
    backgroundColor: WHITE,
    borderRadius: 20,
    paddingLeft: 10,
    fontSize: 18
  }
});

export default styles;
