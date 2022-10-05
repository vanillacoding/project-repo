import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { MESSAGE } from '../../../constants/index';

import ProfileStatus from '../ProfileStatus/ProfileStatus';
import ProgressHabit from '../ProgressHabit/ProgressHabit';
import CompletedHabit from '../CompletedHabit/CompletedHabit';
import Calendar from '../ProfileCalendar/ProfileCalendar';
import Empty from '../../../screens/Animations/Empty/Empty';

import styles from './styles';

const Profile = ({ userInfo, imageUri }) => {
  const [isActingHabitOn, setActingHabit] = useState(true);
  const [isCompletedHabitOn, setCompletedHabit] = useState(false);
  const [isCalendarOn, setCalendar] = useState(false);

  const actingHabitPressed = () => {
    setActingHabit(true);
    setCompletedHabit(false);
    setCalendar(false);
  };

  const completeHabitPressed = () => {
    setActingHabit(false);
    setCompletedHabit(true);
    setCalendar(false);
  };

  const calendarPressed = () => {
    setActingHabit(false);
    setCompletedHabit(false);
    setCalendar(true);
  };

  return (
    <View style={styles.profileWrapper}>
      <ProfileStatus
        imageUri={imageUri}
        userInfo={userInfo}
        handleActingPress={actingHabitPressed}
        handleCompletePress={completeHabitPressed}
        handleCalendarPress={calendarPressed}
      />
      <View style={styles.profileBottomWrapper}>
        {isActingHabitOn &&
          (userInfo?.habits.length > 0
            ? <ProgressHabit userInfo={userInfo} />
            : <View style={styles.registerHabitWrapper}>
                <Text style={styles.registerHabitText}>
                  {MESSAGE.NO_PROGRESSING_HABIT}
                </Text>
                <Empty />
              </View>)}
        {isCompletedHabitOn &&
          (userInfo?.completedHabits.length > 0
            ? <CompletedHabit userInfo={userInfo} />
            :  <View style={styles.registerHabitWrapper}>
                <Text style={styles.completeHabitText}>
                  {MESSAGE.NO_COMPLETED_HABIT}
                </Text>
                <Empty />
              </View>)}
        {isCalendarOn &&
          <Calendar completedDates={userInfo.completedDates} />}
      </View>
    </View>

  );
};

export default Profile;
