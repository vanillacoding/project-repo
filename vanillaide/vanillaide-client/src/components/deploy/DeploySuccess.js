import { AntDesign, FontAwesome5 } from "@expo/vector-icons";
import * as Clipboard from "expo-clipboard";
import PropTypes from "prop-types";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";

import { GREEN_50, LIGHT_GREY_50, BLACK } from "../../constants/color";
import CustomButton from "../CustomButton";

export default function DeploySuccess({ deployLink, handleGoToPress }) {
  const handleLinkPress = async () => {
    await Clipboard.setStringAsync(deployLink);
  };

  return (
    <View style={styles.container}>
      <View style={styles.iconWrapper}>
        <AntDesign name="checksquare" size={120} color={GREEN_50} />
      </View>
      <View style={styles.infoWrapper}>
        <Text style={styles.successText}>Deploy</Text>
        <Text style={styles.successText}>Successed!</Text>
        <CustomButton
          text="Go To"
          fontSize={20}
          handlePress={handleGoToPress}
          buttonWidth={140}
          buttonHeight={50}
          buttonMargin={40}
        />
        <TouchableOpacity style={styles.linkWrapper} onPress={handleLinkPress}>
          <FontAwesome5 name="link" size={24} color={BLACK} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

DeploySuccess.propTypes = {
  deployLink: PropTypes.string.isRequired,
  handleGoToPress: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  iconWrapper: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  infoWrapper: {
    flex: 2,
    alignItems: "center",
  },
  successText: {
    margin: 0,
    fontSize: 40,
    fontFamily: "FiraCode",
    color: LIGHT_GREY_50,
  },
  linkWrapper: {
    margin: 20,
    justifyContent: "center",
    alignItems: "center",
    width: 50,
    height: 50,
    backgroundColor: LIGHT_GREY_50,
    borderRadius: 30,
  },
});
