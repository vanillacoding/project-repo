import React from "react";
import { StyleSheet, FlatList } from "react-native";

import PrescriptionHistoryCard from "./PrescriptionHistoryCard";

const PrescriptionHistoryList = ({ isLoading, handleRefresh, prescriptionList }) => {
  const renderItem = ({ item }) => <PrescriptionHistoryCard prescriptionInfo={item} />;

  return (
    <FlatList
      contentContainerStyle={styles.prescriptionList}
      data={prescriptionList}
      renderItem={renderItem}
      keyExtractor={prescription => `${prescription.prescription_id}history`}
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
    paddingVertical: 10,
  },
});

export default PrescriptionHistoryList;
