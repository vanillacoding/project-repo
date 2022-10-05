import { StyleSheet } from "react-native";

import { WHITE } from "../../constants/color";

const styles = StyleSheet.create({
  title: {
    position: "relative",
    alignItems: "center",
    height: 55,
    marginTop: "30%"
  },
  titleText: {
    color: WHITE,
    fontSize: 40,
    fontWeight: "bold"
  },
  titleImage: {
    width: 50,
    height: 50,
    position: "absolute",
    top: "-45%",
    left: "20%"
  },
});

export default styles;
