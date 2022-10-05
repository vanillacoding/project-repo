import React from "react";
import { View, Text, StyleSheet } from "react-native";

const NoPrescriptions = () => {
  return (
    <View style={styles.container}>
      <Text>아직 유효한 처방전이 없습니다! 😥</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default NoPrescriptions;
