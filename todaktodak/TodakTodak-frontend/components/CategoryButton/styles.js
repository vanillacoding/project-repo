import { StyleSheet } from "react-native";

import { WHITE } from "../../constants/color";

const styles = StyleSheet.create({
  categoryContainer: {
    width: "50%",
    alignItems: "center",
    marginBottom: 30
  },
  categoryWrapper: {
    width: "80%",
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    padding: 5,
    borderRadius: 10
  },
  categoryTitle: {
    color: WHITE,
    fontSize: 15
  },
  titleBottomBar: {
    width: 100,
    height: 8,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10
  }
});

export default styles;
