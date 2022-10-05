import React from 'react';
import { View, Text, TextInput } from 'react-native';
import { MESSAGE, STRINGS } from '../../../constants/index';

import styles from './styles';

const LoginInput = ({
  email,
  onEmailChange,
  password,
  onPasswordChange
}) => {

  return (
    <View style={styles.inputWrapper}>
      <View style={styles.idInputWrapper}>
        <View style={styles.idTextWrapper}>
          <Text style={styles.idText}>
            {STRINGS.EMAIL}
          </Text>
        </View>
        <View style={styles.idTextInputWrapper}>
          <TextInput
            placeholder={MESSAGE.TYPE_EMAIL}
            value={email}
            onChangeText={onEmailChange}
          />
        </View>
      </View>
      <View style={styles.pwInputWrapper}>
        <View style={styles.pwTextWrapper}>
          <Text style={styles.pwText}>
            {STRINGS.PW}
          </Text>
        </View>
        <View style={styles.pwTextInputWrapper}>
          <TextInput
            placeholder={MESSAGE.TYPE_PASSWORD}
            value={password}
            onChangeText={onPasswordChange}
          />
        </View>
      </View>
  </View>
  );
};

export default LoginInput;
