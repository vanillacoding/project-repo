import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { STRINGS } from '../../../constants/index';

import styles from './styles';

const StartCountDownBtn = ({ onStartPress }) => {

  return (
    <View style={styles.wrapper}>
      <TouchableOpacity onPress={onStartPress}>
        <View style={styles.outterCircle}>
          <View style={styles.innerCircle}>
            <Text style={styles.pressText}>
              {STRINGS.PRESS_HABIT}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default StartCountDownBtn;
