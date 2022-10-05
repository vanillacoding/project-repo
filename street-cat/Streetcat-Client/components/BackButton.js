import React from 'react';
import { Ionicons } from '@expo/vector-icons';

const BackButton = ({ navigation }) => {
  
  return (
    <Ionicons
      name="md-arrow-back"
      size={30}
      onPress={() => navigation.goBack()}
    />
  );
};

export default BackButton;
