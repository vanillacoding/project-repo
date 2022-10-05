import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { View, StyleSheet } from "react-native";

import { getPrescriptionList } from "../redux/reducers/prescriptionListSlice";

import NoPrescriptions from "../components/shared/NoPrescriptions";
import PrescriptionHistoryList from "../components/PrescriptionHistoryList";

const PrescriptionHistoryScreen = ({ navigation }) => {
  const isLoading = useSelector((state) => state.prescriptionList.isLoading);
  const prescriptionList = useSelector((state) => state.prescriptionList.prescriptionList);

  const dispatch = useDispatch();

  useEffect(() => {
    return navigation.addListener("focus", () => {
      dispatch(getPrescriptionList());
    });
  }, [navigation]);

  const handleRefresh = () => {
    dispatch(getPrescriptionList());
  };

  if (!prescriptionList.length) {
    return <NoPrescriptions />;
  }

  return (
    <View style={styles.container}>
      <PrescriptionHistoryList
        isLoading={isLoading}
        handleRefresh={handleRefresh}
        prescriptionList={prescriptionList}
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

export default PrescriptionHistoryScreen;
