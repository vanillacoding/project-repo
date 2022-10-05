import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateHabit } from '../../../featrues/userSlice';
import { useNavigation } from '@react-navigation/native';
import { View, Animated, TouchableOpacity } from 'react-native';
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer';
import { MaterialIcons,MaterialCommunityIcons } from '@expo/vector-icons';
import { SIZES, NAMES, COLORS, STRINGS } from '../../../constants/index';

import styles from './styles';

const CountdownBtn = ({
  totalTime,
  setStartCountBtn,
  habitType
}) => {
  const date = new Date();
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [isPlaying, setPlaying] = useState(true);
  const currentDate = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;

  const handleTimeColplete = () => {
    const updateInput = {
      habitType,
      date: currentDate
    };

    setStartCountBtn(false);
    navigation.navigate(NAMES.HABIT);
    dispatch(updateHabit(updateInput));
  };

  const onPausePress = () => {
    setPlaying(prev => !prev);
  };

  const onQuitPress = () => {
    setStartCountBtn(false);
  };

  return (
    <View style={styles.pressButtonWrapper}>
      <View style={styles.circleWrapper}>
        <CountdownCircleTimer
          isPlaying={isPlaying}
          duration={totalTime}
          colors={[
            [COLORS.TIMER_FIRST_RENDER, SIZES.TIMER_FIRST_RATIO],
            [COLORS.TIMER_SECOND_RENDER, SIZES.TIMER_SECOND_RATIO],
            [COLORS.TIMER_THIRD_RENDER, SIZES.TIMER_THIRD_RATIO],
          ]}
          size={SIZES.TIMER}
          strokeWidth={SIZES.TIMER_STROKE_WIDTH}
          onComplete={handleTimeColplete}
        >
          {({ remainingTime, animatedColor }) => (
            <Animated.Text style={{
                color: animatedColor,
                fontSize: SIZES.TIMER_TEXT,
                fontWeight: SIZES.TIMER_FONTWEIGHT
              }}>
              { remainingTime + STRINGS.SECOND}
            </Animated.Text>)}
        </CountdownCircleTimer>
      </View>
      <View style={styles.btnWrapper}>
        <TouchableOpacity
          style={styles.pauseBtn}
          onPress={onPausePress}
        >
          <MaterialCommunityIcons
            name={NAMES.PLAY_PAUSE_ICON}
            size={SIZES.PLAY_CANCLE}
            color={COLORS.BLACK}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.cancelBtn}
          onPress={onQuitPress}
        >
          <MaterialIcons
            name={NAMES.CANCLE_ICON}
            size={SIZES.PLAY_CANCLE}
            color={COLORS.RED}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CountdownBtn;
