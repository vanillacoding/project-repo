import PropTypes from "prop-types";
import { StyleSheet, Text } from "react-native";

import { LOGO } from "../constants/color";

export default function Logo({ fontSize }) {
  return <Text style={styles(fontSize).logo}>Vanillaide</Text>;
}

Logo.propTypes = {
  fontSize: PropTypes.number.isRequired,
};

const styles = (fontSize) =>
  StyleSheet.create({
    logo: {
      fontSize,
      fontFamily: "Playball",
      color: LOGO,
    },
  });
