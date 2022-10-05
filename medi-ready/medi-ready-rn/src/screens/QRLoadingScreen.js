import React from "react";
import { View, StyleSheet } from "react-native";
import LottieView from "lottie-react-native";

const ErrorScreen = () => {
  return (
    <View style={styles.container}>
      <LottieView
        source={require("../../assets/animation/qrAnimation.json")}
        style={styles.animationContainer}
        autoPlay
        loop={true}
        speed={3}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFF",
  },
  animationContainer: {
    width: 400,
    height: 300,
    backgroundColor: "#FFF",
  },
});

export default ErrorScreen;
