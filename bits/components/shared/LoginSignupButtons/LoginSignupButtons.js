import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { STRINGS } from '../../../constants/index';

import styles from './styles';

const LoginSignupButtons = ({
  onLoginPress,
  onSignupPress
}) => {

  return (
    <View style={styles.loginSignupBtnWrapper}>
      <TouchableOpacity
        style={styles.loginBtn}
        onPress={onLoginPress}
        testID={STRINGS.LOGIN_EN}
      >
        <Text style={styles.loginText}>
          {STRINGS.LOGIN}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.signupBtn}
        onPress={onSignupPress}
        testID={STRINGS.SIGNUP_EN}
      >
        <Text style={styles.signupText}>
          {STRINGS.SIGNUP}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginSignupButtons;
