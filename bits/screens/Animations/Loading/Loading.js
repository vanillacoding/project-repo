import React from 'react';
import LottieView from 'lottie-react-native';
import { NUMBERS, COLORS } from '../../../constants/index';

const Loading = () => {
  return (
    <>
      <LottieView
        source={require('../../../assets/animation/loadingAnimation.json')}
        autoPlay
        loop
        speed={NUMBERS.TWICE_ANIMATION_SPEED}
        style={{ backgroundColor: COLORS.LOADING_ANIMATION_BACKGROUND }}
      />
    </>
  );
};

export default Loading;
