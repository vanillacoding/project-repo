import React, { useEffect, useRef } from "react";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import LottieView from "lottie-react-native";

import * as colors from "../constants/colors";
import * as sizes from "../constants/sizes";

import picture from "../assets/loading.json";

export default function LoginRequest() {
  const animation = useRef(null);

  useEffect(() => {
    if (animation.current) {
      animation.current.play();
    }
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <LottieView
        ref={animation}
        style={styles.lottiview}
        source={picture}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-around",
    alignItems: "center",
    textAlign: "center",
    textAlignVertical: "center",
    backgroundColor: colors.SECONDARY_GRAY,
  },
  lottiview: {
    width: 0.6 * sizes.DEVICE_WIDTH,
    height: 0.6 * sizes.DEVICE_WIDTH,
  },
});
