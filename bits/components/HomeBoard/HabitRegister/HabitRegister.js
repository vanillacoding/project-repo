import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import { NAMES, SIZES, COLORS, MESSAGE } from '../../../constants/index';

import styles from './styles';

const HabitRegister = ({ onAddPress }) => {

  return (
    <View style={styles.mainTopWrapper}>
      <View style={styles.habitRegisterWrapper}>
        <View style={styles.textButtonWrapper}>
          <View stlye={styles.registerTextWrapper}>
            <Text style={styles.registerText}>
              {MESSAGE.REGISTER_HABIT}
            </Text>
          </View>
          <View style={styles.button}>
            <TouchableOpacity onPress={onAddPress}>
              <Entypo
                name={NAMES.CIRCLE_PLUS_ICON}
                size={SIZES.CIRCLE_PLUS_ICON}
                color={COLORS.WHITE}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default HabitRegister;
