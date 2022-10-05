import React from 'react';
import { ActivityIndicator } from 'react-native';
import { ImageContainer } from '../shared/index';
import { COLOR } from '../constants/color';

const LoadingSpinner = () => {
  return (
    <ImageContainer>
      <ActivityIndicator size='large' color={COLOR.THEME_COLOR} />
    </ImageContainer>
  );
};

export default LoadingSpinner;
