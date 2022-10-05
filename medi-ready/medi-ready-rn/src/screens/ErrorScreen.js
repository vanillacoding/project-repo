import React from "react";
import { View, Text, StyleSheet } from "react-native";
import LottieView from "lottie-react-native";

const ErrorScreen = ({ route }) => {
  const { errorMessage } = route.params;

  return (
    <View style={styles.container}>
      <LottieView
        source={require("../../assets/animation/errorAnimation.json")}
        style={styles.animationContainer}
        autoPlay
        loop={true}
        speed={2}
      />
      <Text>{errorMessage}</Text>
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
