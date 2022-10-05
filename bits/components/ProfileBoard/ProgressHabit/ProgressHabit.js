import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import pickIconByType from '../../../utils/pickIconByType';
import pickTextByType from '../../../utils/pickTextByType';

import styles from './styles';

const ProgressHabit = ({ userInfo }) => {

  return (
    <ScrollView style={styles.scrollView}>
      {userInfo.habits.map(userHabit => {
        const habitIcon = pickIconByType(userHabit.habitType);
        const habitText = pickTextByType(userHabit.habitType);

        return (
          <TouchableOpacity style={styles.userHabitWrapper} key={userHabit._id}>
            <View style={styles.imgTextWrapper}>
              <View>
                {habitIcon}
              </View>
              <View style={styles.habitTypeTextWrapper}>
                <Text style={styles.habitTypeText}>
                  {habitText}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
};

export default ProgressHabit;
