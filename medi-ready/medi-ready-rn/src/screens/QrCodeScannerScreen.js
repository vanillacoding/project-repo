import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { BarCodeScanner } from "expo-barcode-scanner";
import { View, Button, StyleSheet } from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

import { WARNING } from "../constants/device";
import { openScanner, checkIn } from "../redux/reducers/pharmacyCheckInSlice";

import QRLoadingScreen from "../screens/QRLoadingScreen";

const QrCodeScannerScreen = ({ navigation }) => {
  const error = useSelector((state) => state.pharmacyCheckIn.error);
  const scanned = useSelector((state) => state.pharmacyCheckIn.scanned);
  const isLoading = useSelector((state) => state.pharmacyCheckIn.isLoading);
  const hasPermission = useSelector((state) => state.pharmacyCheckIn.hasPermission);

  const dispatch = useDispatch();

  useEffect(() => {
    navigation.addListener("focus", () => {
      dispatch(openScanner());
    });
  }, []);

  const handleBarCodeScanned = ({ data }) => {
    dispatch(checkIn(data));
  };

  if (hasPermission === null || isLoading) {
    return <QRLoadingScreen />;
  }

  if (hasPermission === false) {
    navigation.navigate("Error", { errorMessage: WARNING.NO_CAMERA_PERMISSION });
  }

  if (error) {
    navigation.navigate("Error", { errorMessage: error.message });
  }

  return (
    <View style={styles.container}>
      <BarCodeScanner
        onBarCodeScanned={!scanned && handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
      {scanned && <Button title={"CHECKED IN!"} onPress={() => navigation.goBack()} />}
      <MaterialCommunityIcons name="scan-helper" size={200} color="black" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default QrCodeScannerScreen;
