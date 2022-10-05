import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { View, StyleSheet } from "react-native";
import dayjs from "dayjs";

import { getPrescriptionList } from "../redux/reducers/prescriptionListSlice";

import NoPrescriptions from "../components/shared/NoPrescriptions";
import PrescriptionAlarmList from "../components/PrescriptionAlarmList";

const DashboardScreen = ({ navigation }) => {
  const error = useSelector((state) => state.prescriptionList.error);
  const isLoading = useSelector(state => state.prescriptionList.isLoading);
  const prescriptionList = useSelector((state) => state.prescriptionList.prescriptionList);

  const dispatch = useDispatch();

  const activePrescriptionList = prescriptionList.filter((prescription) => {
    const currentDate = dayjs().format("YYYY.MM.DD");
    const expirationDate = dayjs(prescription.expiration_date).add(9, "hour").format("YYYY.MM.DD");
    const isExpired = currentDate > expirationDate;
    const isDeleted = prescription.is_deleted;

    return !isExpired && !isDeleted;
  });

  useEffect(() => {
    navigation.addListener("focus", () => {
      dispatch(getPrescriptionList());
    });
  }, [navigation]);

  const handleRefresh = () => {
    dispatch(getPrescriptionList());
  };

  if (error) {
    navigation.navigate("Error", { errorMessage: error.message });
  }

  if (!activePrescriptionList.length) {
    return <NoPrescriptions />;
  }

  return (
    <View style={styles.container}>
      <PrescriptionAlarmList
        isLoading={isLoading}
        handleRefresh={handleRefresh}
        prescriptionList={activePrescriptionList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
});

export default DashboardScreen;
