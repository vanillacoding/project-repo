import React from "react";
import dayjs from "dayjs";
import { useNavigation } from "@react-navigation/core";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

import HistoryStatus from "./shared/HistoryStatus";

const PrescriptionHistoryCard = ({ prescriptionInfo }) => {
  const navigation = useNavigation();

  const {
    medicines,
    description,
    is_deleted: isDeleted,
    created_at: prescriptionDateUTC,
    expiration_date: expirationDateUTC,
    dose_histories: doseHistories,
    pharmacist: {
      pharmacy_name: pharmacyName,
      pharmacy_address: pharmacyAddress,
      user: {
        name: pharmacistName,
        picture: pharmacistPicture,
      },
    },
  } = prescriptionInfo;

  const prescriptionDate = dayjs(prescriptionDateUTC).add(9, "hour").format("YYYY.MM.DD");
  const expirationDate = dayjs(expirationDateUTC).add(9, "hour").format("YYYY.MM.DD");

  const firstDisplayMedicine = medicines[0]?.medicine_detail.itemName;
  const secondDisplayMedicine = medicines[1]?.medicine_detail.itemName;

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => navigation.navigate("History Detail", {
        medicines,
        isDeleted,
        description,
        pharmacyName,
        doseHistories,
        pharmacistName,
        expirationDate,
        pharmacyAddress,
        prescriptionDate,
        pharmacistPicture,
      })}
    >
      <View>
        <Text style={styles.title}>{pharmacyName}</Text>
        <Text style={styles.address}>{pharmacyAddress}</Text>
        <Text style={styles.date}>{`${prescriptionDate} - ${expirationDate}`}</Text>

        <View style={styles.medicineList}>
          <View style={styles.medicine}>
            <Text style={styles.medicineName} numberOfLines={1}>
              {firstDisplayMedicine}
            </Text>
          </View>

          <View style={styles.medicine}>
            <Text style={styles.medicineName} numberOfLines={1}>
              {secondDisplayMedicine}
            </Text>
          </View>

          <Text>...</Text>
        </View>
      </View>

      <View style={styles.historyStatus}>
        <HistoryStatus expirationDate={expirationDate} isDeleted={isDeleted} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "relative",
    justifyContent: "center",
    height: 210,
    width: 330,
    marginTop: 20,
    marginHorizontal: 10,
    paddingLeft: 30,
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
  title: {
    fontSize: 30,
  },
  address: {
    marginTop: 5,
    fontSize: 18,
  },
  date: {
    marginTop: 10,
  },
  medicineList: {
    flexDirection: "row",
    marginTop: 20,
  },
  medicine: {
    justifyContent: "center",
    alignItems: "center",
    height: 20,
    width: 100,
    marginRight: 8,
    borderRadius: 3,
    backgroundColor: "#FFF",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.12,
    shadowRadius: 9,
    elevation: 8,
  },
  medicineName: {
    maxWidth: 80,
  },
  historyStatus: {
    position: "absolute",
    right: 15,
    top: 15,
  },
});

export default PrescriptionHistoryCard;
