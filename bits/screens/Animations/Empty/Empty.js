import React from 'react';
import { View } from 'react-native';
import LottieView from 'lottie-react-native';
import {  NUMBERS, STRINGS } from '../../../constants/index';

import styles from './styles';

const Like = () => {

  return (
    <View style={styles.animationWrapper}>
      <LottieView
        source={require('../../../assets/animation/emptyAnimation.json')}
        autoPlay={true}
        resizeMode={STRINGS.RESIZE_MODE_COVER}
        speed={NUMBERS.DEFAULT_ANIMATION_SPEED}
        loop={true}
      />
    </View>
  );
};

export default Like;
