import React from "react";
import { StyleSheet, Text, View } from "react-native";

const PrescriptionGuide = ({ description }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>🩺 복약 지도</Text>
      <View style={styles.descriptionContainer}>
        <Text>{description}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  title: {
    width: 320,
    marginLeft: 20,
    marginBottom: 15,
    fontWeight: "800",
    textAlign: "left",
  },
  descriptionContainer: {
    width: 320,
    minHeight: 100,
    padding: 20,
    borderRadius: 10,
    backgroundColor: "#FFF",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 5,
  },
});

export default PrescriptionGuide;
