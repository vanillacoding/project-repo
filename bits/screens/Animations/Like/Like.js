import React from 'react';
import LottieView from 'lottie-react-native';
import { NUMBERS, STRINGS } from '../../../constants/index';

const Like = ({ onFinish }) => {

  return (
    <>
      <LottieView
        source={require('../../../assets/animation/likeAnimation.json')}
        autoPlay={true}
        speed={NUMBERS.DEFAULT_ANIMATION_SPEED}
        loop={false}
        resizeMode={STRINGS.RESIZE_MODE_COVER}
        style={{ zIndex: NUMBERS.LIKE_ANIMATION_ZINDEX }}
        onAnimationFinish={onFinish}
      />
    </>
  );
};

export default Like;
