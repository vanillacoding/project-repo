import PropTypes from "prop-types";
import { StyleSheet, View, Dimensions } from "react-native";

import { HEADER } from "../constants/color";

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");
const appHeaderHeight = screenHeight / 12;

export default function AppHeader({ children }) {
  return <View style={styles.container}>{children}</View>;
}

AppHeader.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.array]),
};

const styles = StyleSheet.create({
  container: {
    zIndex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    width: screenWidth,
    height: appHeaderHeight,
    backgroundColor: HEADER,
  },
});
