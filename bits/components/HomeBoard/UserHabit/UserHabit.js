import React from 'react';
import { ScrollView, View, Text, TouchableOpacity } from 'react-native';
import pickImgByType from '../../../utils/pickIconByType';
import pickTextByType from '../../../utils/pickTextByType';
import { Feather, Entypo } from '@expo/vector-icons';
import { NAMES, SIZES, COLORS } from '../../../constants/index';

import styles from './styles';

const UserHabit = ({
  habits,
  onAddPress,
  onIconPress,
  onDeletePress,
  isHabitSelected,
  targetHabit
}) => {

  return (
    <View style={styles.wrapper}>
      <View style={styles.userHabitWrapper}>
        <ScrollView horizontal={true}>
          {habits.map((data, index) => {
            const statusPercentage = Math.floor((data.achivedDay / data.settedDay) * SIZES.PERCENTAGE);
            const icon = pickImgByType(data.habitType, isHabitSelected, targetHabit?.habitType);
            const habitName = pickTextByType(data.habitType);

            return (
              <View style={styles.habitInfoWrapper} key={index}>
                <TouchableOpacity
                  onPress={() => onIconPress(index)}
                >
                  <View style={styles.iconWrapper}>
                    {icon}
                  </View>
                </TouchableOpacity>
                <View style={styles.habitInfo}>
                  <View style={styles.habbitName}>
                    <Text style={styles.name}>{habitName}</Text>
                  </View>
                  <View style={styles.dayMateLike}>
                    <Text style={styles.day}>
                      Day {data.achivedDay} / {data.settedDay}
                    </Text>
                    <Text style={styles.mate}>
                      Mate {data.mate}
                    </Text>
                    <Text style={styles.like}>
                      Like {data.like}
                    </Text>
                    <Text style={styles.status}>
                      Status {statusPercentage}%
                    </Text>
                  </View>
                </View>
                <View style={styles.cancelWrapper}>
                  <TouchableOpacity onPress={() => onDeletePress(index)}>
                    <Feather
                      name={NAMES.DELETE_ICON}
                      size={SIZES.DELETE_ICON}
                      color={COLORS.BLACK}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            );
          })}
        </ScrollView>
      </View>
      <TouchableOpacity onPress={onAddPress} style={styles.addBtnWrapper}>
        <Entypo
          name={NAMES.CIRCLE_PLUS_ICON}
          size={SIZES.CIRCLE_PLUS_ICON}
          color={COLORS.WHITE}
        />
      </TouchableOpacity>
    </View>
  );
};

export default UserHabit;
