import PropTypes from "prop-types";
import { StyleSheet, Text } from "react-native";

import { LIGHT_GREY_100 } from "../../constants/color";
import CustomButton from "../CustomButton";

export default function DeployStart({ projectName, handlePress }) {
  return (
    <>
      <Text style={styles.projectName}>
        {projectName.length > 12 ? projectName + "..." : projectName}
      </Text>
      <CustomButton
        text="deploy"
        fontSize={16}
        handlePress={handlePress}
        buttonWidth={180}
        buttonHeight={50}
        borderRadius={30}
      />
    </>
  );
}

DeployStart.propTypes = {
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
