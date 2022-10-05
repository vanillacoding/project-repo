import React from "react";
import { View, ScrollView, Text, Image, StyleSheet } from "react-native";

import MedicineList from "../components/shared/MedicineList";
import HistoryStatus from "../components/shared/HistoryStatus";
import PrescriptionGuide from "../components/shared/PrescriptionGuide";

const PrescriptionHistoryDetailScreen = ({ route }) => {
  const {
    medicines,
    isDeleted,
    description,
    pharmacyName,
    pharmacistName,
    expirationDate,
    pharmacyAddress,
    prescriptionDate,
    pharmacistPicture,
  } = route.params;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.pharmacyInfo}>
        <Text style={styles.name}>{pharmacyName}</Text>
        <Text style={styles.address}>{pharmacyAddress}</Text>
        <Text style={styles.date}>{`${prescriptionDate} - ${expirationDate}`}</Text>
      </View>

      <View style={styles.pharmacistInfo}>
        <Image
          style={styles.pharmacistProfilePicture}
          source={{
            uri: pharmacistPicture,
          }}
        />
        <Text>{`${pharmacistName} 약사`}</Text>
      </View>

      <View style={styles.medicineList}>
        <MedicineList medicines={medicines} />
      </View>

      <View style={styles.prescriptionGuide}>
        <PrescriptionGuide description={description} />
      </View>

      <View style={styles.historyStatus}>
        <HistoryStatus expirationDate={expirationDate} isDeleted={isDeleted}/>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "relative",
    flexGrow: 1,
    alignItems: "center",
    marginTop: 20,
  },
  pharmacyInfo: {
    width: 320,
  },
  name: {
    fontSize: 30,
  },
  date: {
    marginTop: 10,
    fontSize: 15,
  },
  address: {
    marginTop: 10,
    fontSize: 18,
  },
  pharmacistInfo: {
    flexDirection: "row",
    alignItems: "center",
    width: 320,
    marginTop: 30,
    marginBottom: 20,
    paddingBottom: 10,
    borderBottomWidth: 1,
  },
  pharmacistProfilePicture: {
    width: 25,
    height: 25,
    marginHorizontal: 5,
    resizeMode: "contain",
    borderRadius: 50,
  },
  historyStatus: {
    position: "absolute",
    right: 20,
    top: 8,
  },
  medicineList: {
    marginTop: 20,
    marginBottom: 30,
  },
});

export default PrescriptionHistoryDetailScreen;
