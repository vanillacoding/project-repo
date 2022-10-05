import { StyleSheet } from "react-native";

import { WHITE } from "../../constants/color";

const styles = StyleSheet.create({
  categoryContainer: {
    width: "50%",
    alignItems: "center"
  },
  categoryWrapper: {
    width: "50%",
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  categoryTitle: {
    color: WHITE,
    fontSize: 20
  }
});

export default styles;
