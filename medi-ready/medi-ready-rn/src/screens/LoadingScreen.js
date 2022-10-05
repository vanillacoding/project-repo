import React from "react";
import { Image, StyleSheet } from "react-native";

const LoadingScreen = () => {
  return (
    <Image
      style={styles.animationContainer}
      source={require("../../assets/splash.png")}
    />
  );
};

const styles = StyleSheet.create({
  animationContainer: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
});

export default LoadingScreen;
