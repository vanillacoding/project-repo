import React from 'react';
import { Animated } from 'react-native';
import { SimpleLineIcons } from '@expo/vector-icons';
import { Easing } from 'react-native-reanimated';
import { IconWrapper } from '../shared/index';
import { COLOR } from '../constants/color';
import ICON_NAME from '../constants/icon';

const ReloadImage = ({ onClick }) => {
  const spinAnim = new Animated.Value(0);
  const startAnimation = () => {
    spinAnim.setValue(0);
    Animated.timing(spinAnim, {
      toValue: 1,
      duration: 1000,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start(() => {
      startAnimation();
    });
  };

  const handleClick = () => {
    startAnimation();
    onClick();
  };

  return (
    <IconWrapper
      onPress={handleClick}
      style={{
        transform: [
          {
            rotate: spinAnim.interpolate({
              inputRange: [0, 1],
              outputRange: ['360deg', '0deg'],
            }),
          },
        ],
      }}
    >
      <SimpleLineIcons
        name={ICON_NAME.RELOAD}
        size={24}
        color={COLOR.THEME_COLOR}
      />
    </IconWrapper>
  );
};

export default ReloadImage;
