import { FontAwesome } from "@expo/vector-icons";
import PropTypes from "prop-types";
import { StyleSheet, View, Text } from "react-native";

import { LIGHT_GREY_100 } from "../../constants/color";
import CustomButton from "../CustomButton";

export default function FocusedProject({
  projectName,
  deployState,
  handlePress,
}) {
  return (
    <>
      <View style={styles.projectInfoWrapper}>
        <FontAwesome name="folder" size={24} color={LIGHT_GREY_100} />
        <Text style={styles.projectName}>{projectName}</Text>
      </View>
      {!deployState && (
        <CustomButton
          text="deploy"
          fontSize={10}
          handlePress={handlePress}
          buttonWidth={60}
          buttonHeight={20}
        />
      )}
    </>
  );
}

FocusedProject.propTypes = {
  projectName: PropTypes.string,
  deployState: PropTypes.bool,
  handlePress: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  projectInfoWrapper: {
    flexDirection: "row",
    alignItems: "center",
  },
  projectName: {
    marginLeft: 20,
    fontSize: 20,
    fontFamily: "FiraCode",
    color: LIGHT_GREY_100,
  },
});
