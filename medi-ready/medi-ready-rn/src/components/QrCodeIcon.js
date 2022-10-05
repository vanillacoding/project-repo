import React from "react";
import { useNavigation } from "@react-navigation/core";
import { StyleSheet, TouchableOpacity } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const QrCodeIcon = () => {
  const navigation = useNavigation();

  const handleQrScannerOpen = () => {
    navigation.navigate("Check In");
  };

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={handleQrScannerOpen}
    >
      <MaterialCommunityIcons name="qrcode-scan" size={24} color="#006FF3" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    marginRight: 20,
  },
});

export default QrCodeIcon;
