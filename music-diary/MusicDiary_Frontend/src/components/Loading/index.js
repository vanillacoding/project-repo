import React from "react";
import { View } from "react-native";
import LottieView from "lottie-react-native";

import styles from "./styles";

const Loading = () => {
  return (
    <View style={styles.container}>
      <LottieView
        source={require("../../../assets/animations/book_loading.json")}
        style={styles.animation}
        autoPlay
        loop={true}
        speed={0.6}
      />
    </View>
  );
};

export default Loading;
