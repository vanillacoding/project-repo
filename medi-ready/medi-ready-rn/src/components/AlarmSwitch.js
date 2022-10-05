import React, { useState } from "react";
import { Switch } from "react-native";
import { useNavigation } from "@react-navigation/core";

import { toggleAlarm } from "../api";

const AlarmSwitch = ({ isAlarmOn, prescriptionId }) => {
  const [isAlarmEnabled, setIsAlarmEnabled] = useState(isAlarmOn);

  const navigation = useNavigation();

  const toggleSwitch = () => {
    try {
      toggleAlarm(prescriptionId);
      setIsAlarmEnabled((previousState) => !previousState);
    } catch (error) {
      navigation.navigate("Error", { errorMessage: error.message });
    }
  };

  return (
    <Switch
      trackColor={{ false: "#006FF3", true: "#808080" }}
      thumbColor={isAlarmEnabled ? "#006FF3" : "#808080"}
      onValueChange={toggleSwitch}
      value={isAlarmEnabled}
    />
  );
};

export default AlarmSwitch;
