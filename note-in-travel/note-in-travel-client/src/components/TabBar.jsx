import React from "react";
import { View, StyleSheet } from "react-native";

import IconButton from "./shared/IconButton";

import THEME from "../constants/theme";

function TabBar({
  navigation,
  state,
  isActiveMode,
  onActiveButtonPress,
  onActiveButtonLongPress,
}) {
  const nav = navigation;
  const curRouteName = state.routeNames[state.index];

  function handleHomeTabPress() {
    nav.navigate("Home");
  }

  function handleUserTabPress() {
    nav.navigate("User");
  }

  return (
    <View style={styles.container}>
      <IconButton
        name="home"
        onPress={handleHomeTabPress}
        testID="homeTab"
      />
      <IconButton
        name="user-alt"
        onPress={handleUserTabPress}
        testID="userTab"
      />
      {curRouteName === "CourseDetail" && (
        <View style={styles.activeButtonContainer}>
          <IconButton
            style={styles.activeButton}
            name={isActiveMode ? "paper-plane" : "plane-departure"}
            onPress={isActiveMode ? onActiveButtonPress : null}
            onLongPress={onActiveButtonLongPress}
            testID="activeButton"
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "relative",
    width: "100%",
    height: "12%",
    paddingHorizontal: "15%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderTopStartRadius: 30,
    borderTopEndRadius: 30,
    backgroundColor: THEME.color.primitive,
  },
  activeButtonContainer: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    top: "-15%",
    left: 0,
    right: 0,
    zIndex: -1,
  },
  activeButton: {
    justifyContent: "center",
    alignItems: "center",
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: THEME.color.accent,
  },
});

export default TabBar;
