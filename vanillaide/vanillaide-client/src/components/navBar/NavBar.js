import { AntDesign } from "@expo/vector-icons";
import * as SecureStore from "expo-secure-store";
import PropTypes from "prop-types";
import { useContext } from "react";
import {
  StyleSheet,
  View,
  Dimensions,
  Modal,
  Text,
  TouchableOpacity,
} from "react-native";

import { HEADER, DARK_GREY_100, LIGHT_GREY_100 } from "../../constants/color";
import { UserContext } from "../../contexts/AuthProvider";
import { ProjectContext } from "../../contexts/ProjectProvider";
import FocusedProject from "./FocusedProject";
import UserInfo from "./UserInfo";

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");
const navBarWidth = (screenWidth * 4) / 5;

export default function NavBar({ isVisible, handlePress, navigation }) {
  const {
    loggedInUser: { username, email },
    setLoggedInUser,
  } = useContext(UserContext);
  const { focusedProject } = useContext(ProjectContext);

  const handleSignOutPress = async () => {
    handlePress();
    await SecureStore.deleteItemAsync("token");
    setLoggedInUser(null);
  };

  const handleMenuPress = () => {
    handlePress();
    navigation.navigate("ProjectList");
  };

  const handleDeployPress = () => {
    handlePress();
    navigation.navigate("Deploy");
  };

  return (
    <Modal visible={isVisible} animationType="none" transparent>
      <View style={styles.container}>
        <View style={styles.closeWrapper}>
          <AntDesign
            name="closecircle"
            size={24}
            color="white"
            onPress={handlePress}
          />
        </View>
        <UserInfo
          username={username}
          email={email}
          handlePress={handleSignOutPress}
        />
        <View style={styles.menuWrapper}>
          <TouchableOpacity onPress={handleMenuPress}>
            <Text style={styles.menuText}>My projects</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.focusedProjectWrapper}>
          {focusedProject && (
            <FocusedProject
              projectName={focusedProject.projectName}
              deployState={focusedProject.deployState}
              handlePress={handleDeployPress}
            />
          )}
        </View>
      </View>
    </Modal>
  );
}

NavBar.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  handlePress: PropTypes.func.isRequired,
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: navBarWidth,
    height: screenHeight,
    backgroundColor: HEADER,
  },
  closeWrapper: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
    padding: 15,
  },
  menuWrapper: {
    flex: 16,
    padding: 20,
  },
  menuText: {
    fontSize: 30,
    fontFamily: "FiraCode",
    color: LIGHT_GREY_100,
  },
  focusedProjectWrapper: {
    flex: 2,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    backgroundColor: DARK_GREY_100,
  },
});
