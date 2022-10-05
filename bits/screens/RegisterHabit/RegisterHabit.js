import React from 'react';
import { View } from 'react-native';

import styles from './styles';

import SettingHabit from '../../components/SettingHabitBoard/SettingHabit';

const RegisterHabit = () => {
  return (
    <View style={styles.wrapper}>
      <SettingHabit />
    </View>
  );
};

export default RegisterHabit;
