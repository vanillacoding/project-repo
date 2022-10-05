import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { View, ScrollView, Text, StyleSheet } from "react-native";
import { Button } from "react-native-elements/dist/buttons/Button";
import { useNavigation } from "@react-navigation/core";

import { deletePrescription } from "../redux/reducers/prescriptionSlice";

import DoseDays from "../components/DoseDays";
import MedicineList from "../components/shared/MedicineList";
import PrescriptionGuide from "../components/shared/PrescriptionGuide";
import UserConfirmModal from "../components/shared/UserConfirmModal";

const PrescriptionDetailScreen = ({ route }) => {
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);

  const isLoading = useSelector((state) => state.prescription.isLoading);
  const doseHistories = useSelector((state) => state.doseHistory.doseHistoryList);

  const {
    medicines,
    description,
    pharmacyName,
    expirationDate,
    prescriptionId,
    prescriptionDate,
  } = route.params;

  const showDeleteConfirmModal = () => {
    setDeleteModalVisible(true);
  };

  const dispatch = useDispatch();
  const navigation = useNavigation();

  const handlePrescriptionDelete = () => {
    dispatch(deletePrescription(prescriptionId));
    setDeleteModalVisible(false);
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.pharmacyInfo}>
          <Text numberOfLines={1} style={styles.pharmacyName}>
            {pharmacyName}
          </Text>

          <Text style={styles.prescriptionDate}>
            {`${prescriptionDate} - ${expirationDate}`}
          </Text>
        </View>

        <View style={styles.doseDays}>
          <DoseDays doseHistories={doseHistories} />
        </View>

        <View style={styles.prescriptionGuide}>
          <PrescriptionGuide description={description} />
        </View>

        <View style={styles.medicineList}>
          <MedicineList medicines={medicines} />
        </View>

        <Button
          title="처방전 삭제"
          type="clear"
          loading={isLoading}
          onPress={showDeleteConfirmModal}
          containerStyle={styles.deleteButton}
          titleStyle={styles.deleteButtonText}
        />
      </ScrollView>

      <UserConfirmModal
        isVisible={deleteModalVisible}
        setIsVisible={setDeleteModalVisible}
        handleConfirm={handlePrescriptionDelete}
        description="처방전 알림을 삭제하시겠습니까?"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  pharmacyInfo: {
    marginTop: 30,
    marginHorizontal: 20,
    borderBottomWidth: 1,
  },
  pharmacyName: {
    fontSize: 35,
    fontWeight: "700",
  },
  prescriptionDate: {
    fontSize: 15,
    marginVertical: 20,
    textAlign: "left",
  },
  doseDays: {
    marginTop: 25,
  },
  prescriptionGuide: {
    marginTop: 40,
  },
  medicineList: {
    marginTop: 25,
  },
  deleteButton: {
    marginVertical: 20,
    marginHorizontal: 100,
  },
  deleteButtonText: {
    fontSize: 15,
    color: "#FF0000",
  },
});

export default PrescriptionDetailScreen;
