import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import PropTypes from "prop-types";

import * as sizes from "../constants/sizes";

export default function SideButton({ navigation, path, isRank }) {
  return (
    <TouchableOpacity
      style={styles.button}
      onPress={() => navigation.navigate(path, { isRank })}
      testID={"touchable-opactiy"}
    >
      <Icon name="add-circle" size={50} />
    </TouchableOpacity>
  );
}

SideButton.propTypes = {
  navigation: PropTypes.object.isRequired,
  path: PropTypes.string.isRequired,
  isRank: PropTypes.bool.isRequired,
};

const styles = StyleSheet.create({
  button: {
    position: "absolute",
    bottom: 0.05 * sizes.DEVICE_HEIGHT,
    right: 0.1 * sizes.DEVICE_WIDTH,
  },
});
