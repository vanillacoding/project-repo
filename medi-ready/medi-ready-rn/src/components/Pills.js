import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TouchableOpacity } from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

import { DOSE_PERIOD_EN, DOSE_PERIOD_KR } from "../constants/dosePeriod";
import { updateDoseHistories, setSelectedDoseHistory } from "../redux/reducers/doseHistorySlice";

const Pills = ({ dosePeriod }) => {
  const selectedDoseHistory = useSelector((state) => state.doseHistory.selectedDoseHistory);

  const { dose_history_id: doseHistoryId } = selectedDoseHistory;

  let time = null;

  switch (dosePeriod) {
    case DOSE_PERIOD_KR.MORNING:
      time = DOSE_PERIOD_EN.MORNING;
      break;
    case DOSE_PERIOD_KR.LUNCH:
      time = DOSE_PERIOD_EN.LUNCH;
      break;
    case DOSE_PERIOD_KR.DINNER:
      time = DOSE_PERIOD_EN.DINNER;
      break;
    case DOSE_PERIOD_KR.BEFORE_BED:
      time = DOSE_PERIOD_EN.BEFORE_UNDERSCORE_BED;
      break;
  }

  const [isCompetedDose, setIsCompletedDose] = useState(selectedDoseHistory[time]);

  useEffect(() => {
    setIsCompletedDose(selectedDoseHistory[time]);
  }, [selectedDoseHistory]);

  const dispatch = useDispatch();

  const handlePillPress = () => {
    const newHistory = {};

    newHistory[time] = !selectedDoseHistory[time];

    setIsCompletedDose((previousState) => !previousState);

    const newDoseHistory = { ...selectedDoseHistory, ...newHistory };

    dispatch(setSelectedDoseHistory(newDoseHistory));
    dispatch(updateDoseHistories({ doseHistoryId, newDoseHistory }));
  };

  return (
    <TouchableOpacity onPress={handlePillPress}>
      {isCompetedDose
        ? <MaterialCommunityIcons name="pill" size={30} color="#006FF3" />
        : <MaterialCommunityIcons name="pill" size={30} color="#000" />}
    </TouchableOpacity>
  );
};

export default Pills;
