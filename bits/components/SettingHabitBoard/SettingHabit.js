import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { registerHabit } from '../../featrues/userSlice';
import { Picker } from '@react-native-picker/picker';
import { Button, View, Text, TouchableOpacity } from 'react-native';
import HabitRegisterModal from '../ReusableModal/ReusableModal';

import {
  NUMBERS,
  COLORS,
  STRINGS,
  LABEL,
  NAMES,
  MESSAGE
} from '../../constants/index';

import styles from './styles';

const SettingHabit = () => {
  const dispatch = useDispatch();
  const { habits } = useSelector(state => state.user);
  const navigation = useNavigation();

  const [isModalShown, setModal] = useState(false);
  const [selectedAct, setAct] = useState(null);
  const [selectedDay, setDay] = useState(null);
  const [selectedTime, setTime] = useState(null);

  const [isActShown, setShowAct] = useState(false);
  const [isDayShown, setShowDay] = useState(false);
  const [isTimeShown, setShowTime] = useState(false);

  const handleActPress = () => {
    setShowAct(true);
  };

  const handleActChange = (actType) => {
    setAct(actType);
    setShowAct(false);
  };

  const handleDayPress = () => {
    setShowDay(true);
  };

  const handleDayChange = (dayType) => {
    setDay(dayType);
    setShowDay(false);
  };

  const handleTimePress = () => {
    setShowTime(true);
  };

  const handleTimeChange = (timeType) => {
    setTime(timeType);
    setShowTime(false);
  };

  const handleModalPress = () => {
    setModal(false);
  };

  const handleRegisterPress = async () => {
    if (
      selectedAct === null ||
      selectedDay === null ||
      selectedTime === null
    ) return;

    const isSameHabitRegistered = habits.some(habit => {
      return habit.habitType === selectedAct;
    });

    if (isSameHabitRegistered) {
      setModal(true);
      return;
    };

    const registerInput = {
      actType: selectedAct,
      day: selectedDay,
      time: selectedTime
    };

    dispatch(registerHabit(registerInput));

    navigation.navigate(NAMES.HABIT);
  };

  return (
    <>
      <HabitRegisterModal
        message={MESSAGE.ALREADY_REGISTERED_HABIT}
        visible={isModalShown}
        onButtonPress={handleModalPress}
      />
      <View style={styles.subscribeWrapper}>
        <Text style={styles.subscribeText}>
          {MESSAGE.REGISTER_HABIT}
        </Text>
        <View style={styles.inputWrapper}>
          {(!isActShown && !isDayShown && !isTimeShown) &&
            <TouchableOpacity
              style={styles.actInput}
              onPress={handleActPress}
            >
              <Text style={styles.actText}>
                {STRINGS.ACT}
              </Text>
              {selectedAct &&
                <Text style={styles.selectedAct}>
                  {selectedAct}
                </Text>}
            </TouchableOpacity>}
          {isActShown &&
            <Picker
              selectedValue={selectedAct}
              onValueChange={handleActChange}
              style={{
                transform: [
                  { scaleX: NUMBERS.PICKER_SCALE },
                  { scaleY: NUMBERS.PICKER_SCALE },
                ]
              }}
            >
              <Picker.Item
                label={LABEL.CODE}
                value={STRINGS.CODE}
              />
              <Picker.Item
                label={LABEL.READ}
                value={STRINGS.READ}
              />
              <Picker.Item
                label={LABEL.SWIM}
                value={STRINGS.SWIM}
              />
              <Picker.Item
                label={LABEL.MEDITATE}
                value={STRINGS.MEDITATE}
              />
              <Picker.Item
                label={LABEL.RUN}
                value={STRINGS.RUN}
              />
              <Picker.Item
                label={LABEL.BICYCLE}
                value={STRINGS.BICYCLE}
              />
              <Picker.Item
                label={LABEL.YOGA}
                value={STRINGS.YOGA}
              />
            </Picker>}
          {(!isActShown && !isDayShown && !isTimeShown) &&
            <TouchableOpacity
              style={styles.dayInput}
              onPress={handleDayPress}
            >
              <Text style={styles.dayText}>
                {STRINGS.DAY}
              </Text>
              {selectedDay &&
                <Text style={styles.selectedDay}>
                  {selectedDay}
                </Text>}
            </TouchableOpacity>}
          {isDayShown &&
            <Picker
              selectedValue={selectedDay}
              onValueChange={handleDayChange}
              style={{
                transform: [
                  { scaleX: NUMBERS.PICKER_SCALE },
                  { scaleY: NUMBERS.PICKER_SCALE },
                ]
              }}
            >
              <Picker.Item
                label={LABEL.TWO_DAYS}
                value={STRINGS.TWO}
              />
              <Picker.Item
                label={LABEL.SEVEN_DAYS}
                value={STRINGS.SEVEN}
              />
              <Picker.Item
                label={LABEL.FOURTEEN_DAYS}
                value={STRINGS.FOURTEEN}
              />
              <Picker.Item
                label={LABEL.TWENTYONE_DAYS}
                value={STRINGS.TWENTYONE}
              />
              <Picker.Item
                label={LABEL.TWENTYEIGHT_DAYS}
                value={STRINGS.TWENTYEIGHT}
              />
          </Picker>}
          {(!isActShown && !isDayShown && !isTimeShown) &&
            <TouchableOpacity
              style={styles.timeInput}
              onPress={handleTimePress}
            >
              <Text style={styles.timeText}>
                {STRINGS.TIME}
              </Text>
              {selectedTime &&
                <Text style={styles.selectedTime}>
                  {selectedTime}
                </Text>}
            </TouchableOpacity>}
          {isTimeShown &&
            <Picker
              selectedValue={selectedTime}
              onValueChange={handleTimeChange}
              style={{
                transform: [
                  { scaleX: NUMBERS.PICKER_SCALE },
                  { scaleY: NUMBERS.PICKER_SCALE },
                ]
              }}
            >
              <Picker.Item
                label={LABEL.THREE_SEC}
                value={LABEL.THREE_SEC}
              />
              <Picker.Item
                label={LABEL.TEN_SEC}
                value={LABEL.TEN_SEC}
              />
              <Picker.Item
                label={LABEL.TEN_MIN}
                value={LABEL.TEN_MIN}
              />
              <Picker.Item
                label={LABEL.THIRTY_MIN}
                value={LABEL.THIRTY_MIN}
              />
              <Picker.Item
                label={LABEL.ONE_HOUR}
                value={LABEL.ONE_HOUR}
              />
          </Picker>}
        </View>
        <View style={styles.buttonWrapper}>
          <Button
            title={STRINGS.REGISTER}
            color={COLORS.WHITE}
            onPress={handleRegisterPress}
          />
        </View>
      </View>
    </>
  );
};

export default SettingHabit;
