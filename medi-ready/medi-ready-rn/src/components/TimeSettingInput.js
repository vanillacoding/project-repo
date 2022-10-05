import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Text, StyleSheet, View, TextInput } from "react-native";

import { WARNING, TIME_LIMIT } from "../constants/alarm";
import { setAlarm } from "../redux/reducers/alarmSettingSlice";

const TimeSettingInput = ({ dosePeriod, dosePeriodTitle, alarmTime }) => {
  const [hour, setHour] = useState(alarmTime?.split(":")[0]);
  const [minute, setMinute] = useState(alarmTime?.split(":")[1]);

  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    if (hour.length === TIME_LIMIT.MAX_INPUT_LENGTH && minute.length === TIME_LIMIT.MAX_INPUT_LENGTH) {
      const alarmTime = `${hour}:${minute}`;

      dispatch(setAlarm({ dosePeriod, alarmTime }));
    }
  }, [hour, minute, dispatch]);

  const handleHourChange = (hourInput) => {
    if (Number(hourInput[0]) > TIME_LIMIT.MAX_HOUR_FIRST_DIGIT || Number(hourInput) > TIME_LIMIT.MAX_HOUR) {
      setError(true);
      setErrorMessage(WARNING.BEFORE_24_HOUR);
    } else {
      setError(false);
      setHour(hourInput);
    }
  };

  const handleMinuteChange = (minuteInput) => {
    if (Number(minuteInput[0]) > TIME_LIMIT.MAX_MINUTE_FIRST_DIGIT || Number(minuteInput) >= TIME_LIMIT.MAX_MINUTE) {
      setError(true);
      setErrorMessage(WARNING.BEFORE_60_MINUTE);
    } else {
      setError(false);
      setMinute(minuteInput);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.timeContainer}>
        <View style={styles.inputLabel}>
          <Text style={styles.title}>{dosePeriodTitle}</Text>
        </View>

        <TextInput
          maxLength={2}
          value={hour}
          placeholder={hour}
          textAlign="center"
          style={styles.timeInput}
          keyboardType="number-pad"
          onChangeText={handleHourChange}
          testID="hour-input"
        />

        <Text>:</Text>

        <TextInput
          maxLength={2}
          value={minute}
          placeholder={minute}
          textAlign="center"
          style={styles.timeInput}
          keyboardType="number-pad"
          onChangeText={handleMinuteChange}
          testID="minute-input"
        />
      </View>

      {error && <Text style={styles.errorMessage} testID="error-text">{errorMessage}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "relative",
    paddingVertical: 30,
  },
  timeContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    fontSize: 20,
  },
  inputLabel: {
    minWidth: 60,
  },
  input: {
    height: 40,
    width: 50,
  },
  timeInput: {
    marginHorizontal: 8,
    padding: 5,
    height: 40,
    width: 60,
    borderWidth: 1,
    borderRadius: 10,
    fontSize: 20,
  },
  errorMessage: {
    position: "absolute",
    color: "red",
    bottom: 0,
    right: 30,
  },
});

export default TimeSettingInput;
