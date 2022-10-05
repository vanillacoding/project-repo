import React, { useEffect } from 'react';
import { Animated, Easing } from 'react-native';

const RotatedIcon = () => {
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

  useEffect(() => {
    startAnimation();
  }, []);

  return (
    <Animated.Image
      style={{
        width: 100,
        height: 100,
        transform: [
          {
            rotate: spinAnim.interpolate({
              inputRange: [0, 1],
              outputRange: ['0deg', '360deg'],
            }),
          },
        ],
      }}
      source={require('../../assets/images/rice.png')}
    />
  );
};

export default RotatedIcon;
