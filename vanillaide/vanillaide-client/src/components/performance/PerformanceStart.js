import PropTypes from "prop-types";
import { StyleSheet, Text } from "react-native";

import { LIGHT_GREY_100 } from "../../constants/color";
import CustomButton from "../CustomButton";

export default function PerformanceStart({ projectName, handlePress }) {
  return (
    <>
      <Text style={styles.projectName}>
        {projectName.length > 15 ? projectName + "..." : projectName}
      </Text>
      <CustomButton
        text="start measuring"
        fontSize={16}
        handlePress={handlePress}
        buttonWidth={250}
        buttonHeight={50}
        borderRadius={30}
      />
    </>
  );
}

PerformanceStart.propTypes = {
  projectName: PropTypes.string.isRequired,
  handlePress: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  projectName: {
    marginBottom: 20,
    fontSize: 40,
    fontFamily: "FiraCode",
    color: LIGHT_GREY_100,
  },
});
