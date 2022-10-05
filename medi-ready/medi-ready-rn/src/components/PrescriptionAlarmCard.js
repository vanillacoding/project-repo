import React from "react";
import dayjs from "dayjs";
import { useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/core";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

import { setDoseHistories } from "../redux/reducers/doseHistorySlice";

import AlarmSwitch from "./AlarmSwitch";

const PrescriptionAlarmCard = ({ prescriptionInfo }) => {
  const navigation = useNavigation();

  const {
    medicines,
    description,
    is_alarm_on: isAlarmOn,
    dose_histories: doseHistories,
    created_at: prescriptionDateUTC,
    prescription_id: prescriptionId,
    expiration_date: expirationDateUTC,
    pharmacist: { pharmacy_name: pharmacyName },
  } = prescriptionInfo;

  const expirationDate = dayjs(expirationDateUTC).add(9, "hour").format("YYYY.MM.DD");
  const prescriptionDate = dayjs(prescriptionDateUTC).add(9, "hour").format("YYYY.MM.DD");

  const dispatch = useDispatch();

  const handleOnPressCard = () => {
    dispatch(setDoseHistories(doseHistories));

    navigation.navigate("Detail", {
      medicines,
      description,
      pharmacyName,
      expirationDate,
      prescriptionId,
      prescriptionDate,
    });
  };

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={handleOnPressCard}
    >
      <View>
        <Text style={styles.title}>{pharmacyName}</Text>
        <Text style={styles.date}>{`${prescriptionDate} - ${expirationDate}`}</Text>
      </View>

      <View style={styles.alarmSwitch}>
        <AlarmSwitch
          isAlarmOn={isAlarmOn}
          doseHistories={doseHistories}
          prescriptionId={prescriptionId}
        />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "relative",
    height: 100,
    width: 330,
    marginTop: 15,
    marginHorizontal: 20,
    padding: 20,
    paddingLeft: 25,
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
    fontSize: 22,
  },
  date: {
    marginTop: 15,
  },
  alarmSwitch: {
    position: "absolute",
    top: 18,
    right: 8,
  },
});

export default PrescriptionAlarmCard;
