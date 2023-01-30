import PropTypes from "prop-types";
import { StyleSheet, View, Dimensions } from "react-native";

import { CONTENT } from "../constants/color";

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");
const contentBoxHeight = (screenHeight * 11) / 12;

export default function ContentBox({ children }) {
  return <View style={styles.container}>{children}</View>;
}

ContentBox.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.array]),
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    width: screenWidth,
    height: contentBoxHeight,
    backgroundColor: CONTENT,
  },
});
