import { StyleSheet, StatusBar, Dimensions } from "react-native";

const STATUSBAR_HEIGHT = StatusBar.currentHeight;
const { width: windowWidth } = Dimensions.get("window");

const styles = StyleSheet.create({
  header: {
    height: 80,
    flexDirection: "row",
    alignItems: "center",
    width: windowWidth,
    backgroundColor: "#ffffff",
    justifyContent: "center",
  },
  statusBar: {
    backgroundColor: "#ffffff",
    height: STATUSBAR_HEIGHT,
  },
  img: {
    width: 55,
    height: 55,
  },
});

export default styles;
