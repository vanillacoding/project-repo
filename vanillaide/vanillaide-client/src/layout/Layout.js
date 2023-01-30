import PropTypes from "prop-types";
import { StyleSheet, View, Dimensions, StatusBar } from "react-native";

import { CONTENT } from "../constants/color";

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");
const statusBarHeight = StatusBar.currentHeight;

export default function Layout({ children }) {
  return <View style={styles.container}>{children}</View>;
}

Layout.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.array]),
};

const styles = StyleSheet.create({
  container: {
    marginTop: statusBarHeight,
    justifyContent: "center",
    alignItems: "center",
    width: screenWidth,
    height: screenHeight,
    backgroundColor: CONTENT,
  },
});
