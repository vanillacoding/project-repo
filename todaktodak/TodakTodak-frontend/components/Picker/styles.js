import { StyleSheet } from "react-native";

import { BLACK, WHITE } from "../../constants/color";

const styles = StyleSheet.create({
  pickerContainer: {
    width: "100%"
  },
  pickerLabel: {
    position: "absolute",
    left: 20,
    top: 10,
    color: BLACK,
    fontWeight: "bold",
    fontSize: 20
  },
  selector: {
    width: "90%",
    height: 35,
    backgroundColor: WHITE,
    marginTop: 40,
    marginRight: "auto",
    marginBottom: 0,
    marginLeft: "auto",
    padding: 10,
    borderRadius: 10
  }
});

export default styles;
