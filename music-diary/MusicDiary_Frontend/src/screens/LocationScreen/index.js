import React from "react";
import { View, Text } from "react-native";
import LottieView from "lottie-react-native";

import styles from "./styles";

const LocationScreen = () => {
  return (
    <View style={styles.container}>
      <LottieView
        source={require("../../../assets/animations/location.json")}
        style={{ flex: 1 }}
        autoPlay
        loop={true}
        speed={0.6}
      />
    </View>
  );
};

export default LocationScreen;
