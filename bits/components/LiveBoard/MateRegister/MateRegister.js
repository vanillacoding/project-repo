import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Entypo } from '@expo/vector-icons';
import { NAMES, SIZES, COLORS, STRINGS, TESTID, MESSAGE } from '../../../constants/index';

import styles from './styles';

const MateRegister = () => {
  const navigation = useNavigation();

  const handleMateRegisterPress = () => {
    navigation.navigate(STRINGS.SEARCH);
  };

  return (
    <View style={styles.wrapper}>
      <View style={styles.mateRegisterWrapper}>
        <View style={styles.textWrapper}>
          <Text style={styles.registerText}>
            {MESSAGE.NO_REGISTERED_MATE}
          </Text>
          <Text style={styles.registerText}>
            {MESSAGE.FOLLOW_NEW_MATE}
          </Text>
        </View>
        <TouchableOpacity
          onPress={handleMateRegisterPress}
          testID={TESTID.REGISTER_PAGE_ICON}
        >
          <Entypo
            name={NAMES.CIRCLE_PLUS_ICON}
            size={SIZES.CIRCLE_PLUS_ICON}
            color={COLORS.WHITE}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default MateRegister;
