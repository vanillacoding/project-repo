import React from "react";
import { StyleSheet, View } from "react-native";

function SafeAreaBottom() {
  return <View style={styles.container} />;
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "5%",
  },
});

export default React.memo(SafeAreaBottom);
