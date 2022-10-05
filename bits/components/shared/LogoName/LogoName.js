import React from 'react';
import { View, Text } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { NAMES, SIZES, COLORS } from '../../../constants/index';
import { STRINGS } from '../../../constants/index';

import styles from './styles';

const LogoName = () => {

  return (
    <View style={styles.logoWrapper}>
      <FontAwesome
        name={NAMES.HEARTBEAT_ICON}
        size={SIZES.HEARTBEAT_ICON}
        color={COLORS.WHITE}
      />
      <Text style={styles.logoText}>
        {STRINGS.BITS}
      </Text>
    </View>
  );
};

export default LogoName;
