import React from "react";
import { StyleSheet, FlatList } from "react-native";

import PrescriptionCard from "./PrescriptionAlarmCard";

const PrescriptionAlarmList = ({ isLoading, handleRefresh, prescriptionList }) => {
  const renderItem = ({ item }) => <PrescriptionCard prescriptionInfo={item} />;

  return (
    <FlatList
      contentContainerStyle={styles.prescriptionList}
      data={prescriptionList}
      renderItem={renderItem}
      keyExtractor={prescription => `${prescription.prescription_id}dashboard`}
      refreshing={isLoading}
      onRefresh={handleRefresh}
      showsVerticalScrollIndicator={false}
    />
  );
};

const styles = StyleSheet.create({
  prescriptionList: {
    flexGrow: 1,
    alignItems: "center",
  },
});

export default PrescriptionAlarmList;
