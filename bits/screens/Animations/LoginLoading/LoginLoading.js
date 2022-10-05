import React from 'react';
import LottieView from 'lottie-react-native';
import { NUMBERS, COLORS } from '../../../constants/index';

const LoginLoading = () => {
  return (
    <>
      <LottieView
        source={require('../../../assets/animation/loginAnimation.json')}
        autoPlay
        loop
        speed={NUMBERS.TWICE_ANIMATION_SPEED}
        style={{ backgroundColor: COLORS.LOADING_ANIMATION_BACKGROUND }}
      />
    </>
  );
};

export default LoginLoading;
