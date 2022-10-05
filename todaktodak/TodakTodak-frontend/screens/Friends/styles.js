import { StyleSheet } from "react-native";

import { TRANSPARENCY } from "../../constants/color";

const styles = StyleSheet.create({
  backgroundContainer: {
    width: "100%",
    height: "100%"
  },
  container: {
    width: "100%",
    height: "100%"
  },
  categoryWrapper: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    marginTop: 40
  },
  loadingWrapper: {
    width: "80%",
    height: "80%",
    marginLeft: 30
  },
  loading: {
    backgroundColor: TRANSPARENCY
  }
});

export default styles;
