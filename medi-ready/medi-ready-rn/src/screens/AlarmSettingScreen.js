import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button } from "react-native-elements";
import { View, ScrollView, Text, StyleSheet} from "react-native";

import { WARNING } from "../constants/alarm";
import { DOSE_PERIOD_EN, DOSE_PERIOD_KR } from "../constants/dosePeriod";
import { saveAlarm, failAlarmSetting } from "../redux/reducers/alarmSettingSlice";

import TimeSettingInput from "../components/TimeSettingInput";

const AlarmTimeSettingScreen = () => {
  const dosePeriodTitleList = [
    DOSE_PERIOD_KR.MORNING,
    DOSE_PERIOD_KR.LUNCH,
    DOSE_PERIOD_KR.DINNER,
    DOSE_PERIOD_KR.BEFORE_BED,
  ];
  const dosePeriodList = [
    DOSE_PERIOD_EN.MORNING,
    DOSE_PERIOD_EN.LUNCH,
    DOSE_PERIOD_EN.DINNER,
    DOSE_PERIOD_EN.BEFORE_BED,
  ];

  const error = useSelector((state) => state.alarmSetting.error);
  const isLoading = useSelector((state) => state.alarmSetting.isLoading);
  const alarmTimes = useSelector((state) => state.alarmSetting.alarmTimes);

  const dispatch = useDispatch();

  const handleAlarmTimeSubmit = () => {
    const isEmpty = Object.values(alarmTimes).some(time => {
      return time === null || time === "";
    });

    !isEmpty
      ? dispatch(saveAlarm(alarmTimes))
      : dispatch(failAlarmSetting(WARNING.PUT_ALL_ALARM_TIME));
  };

  return (
    <ScrollView keyboardShouldPersistTaps="never" contentContainerStyle={styles.contentContainer}>
      <View style={styles.container}>
        <Text style={styles.title}>알림 설정</Text>
        <Text>원하는 시간에 알림을 설정해 주세요!</Text>

        <View style={styles.setAlarmContainer}>
          {dosePeriodList.map((dosePeriod, index) => {
            return (
              <TimeSettingInput
                key={`${index}-${dosePeriod}`}
                dosePeriod={dosePeriod}
                dosePeriodTitle={dosePeriodTitleList[index]}
                alarmTime={alarmTimes[dosePeriod]}
              />
            );
          })}
        </View>

        <Button
          title="저장"
          type="outline"
          loading={isLoading}
          buttonStyle={styles.saveButton}
          onPress={handleAlarmTimeSubmit}
        />

        {error && <Text style={styles.errorMessage}>{error}</Text>}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    flexGrow: 3,
  },
  container: {
    position: "relative",
    marginTop: 30,
    alignItems: "center",
  },
  title: {
    fontSize: 25,
    marginBottom: 10,
  },
  setAlarmContainer: {
    marginTop: 10,
  },
  saveButton: {
    justifyContent: "center",
    alignItems: "center",
    height: 40,
    width: 100,
    marginTop: 10,
    borderRadius: 10,
    borderWidth: 1,
  },
  errorMessage: {
    color: "red",
    marginTop: 20,
  },
});

export default AlarmTimeSettingScreen;
