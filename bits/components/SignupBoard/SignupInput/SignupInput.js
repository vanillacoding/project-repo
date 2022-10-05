import React from 'react';
import { View, Text, TextInput } from 'react-native';
import { MESSAGE, STRINGS } from '../../../constants/index';

import styles from './styles';

const SignupInput = ({
  email,
  userName,
  password,
  confirmPassword,
  onEmailChange,
  onUserNameChange,
  onPasswordChange,
  onConfirmChange
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
            testID={STRINGS.EMAIL}
          />
        </View>
      </View>
      <View style={styles.nameInputWrapper}>
        <View style={styles.nameTextWrapper}>
          <Text style={styles.nameText}>
            {STRINGS.NAME}
          </Text>
        </View>
        <View style={styles.nameTextInputWrapper}>
          <TextInput
            placeholder={MESSAGE.TYPE_USERNAME}
            value={userName}
            onChangeText={onUserNameChange}
            testID={STRINGS.NAME}
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
            testID={STRINGS.PW}
          />
        </View>
      </View>
      <View style={styles.confirmInputWrapper}>
        <View style={styles.confirmTextWrapper}>
          <Text style={styles.confirmText}>
            {STRINGS.CHECK}
          </Text>
        </View>
        <View style={styles.confirmTextInputwrapper}>
          <TextInput
            placeholder={MESSAGE.TYPE_CONFIRM_PASSWORD}
            value={confirmPassword}
            onChangeText={onConfirmChange}
            testID={STRINGS.CHECK}
          />
        </View>
      </View>
    </View>
  );
};

export default SignupInput;
