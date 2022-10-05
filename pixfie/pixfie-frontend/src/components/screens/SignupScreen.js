import React from 'react';
import { connect } from 'react-redux';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

import { fetchSignup } from '../../utils/api';
import { setSignupInfo } from '../../actions/index';

export function SignupScreen ({ signupInfo, handleChange, handleSubmit, navigation }) {
  const regexPassword = /^[A-Za-z0-9]{6,15}$/;
  const isPasswordSame = signupInfo.password === signupInfo.passwordCheck;
  const isAllFilled =
    signupInfo.user_id.length &&
    signupInfo.user_name.length &&
    signupInfo.password.length &&
    signupInfo.passwordCheck.length;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>회원가입</Text>
      <View style={styles.inputContainer}>
        <TextInput
        style={styles.inputText}
        placeholder="아이디"
        onChangeText={value => handleChange('user_id', value)}
        value={signupInfo.user_id} />

        <TextInput
        style={styles.inputText}
        placeholder="이름"
        onChangeText={value => handleChange('user_name', value)}
        value={signupInfo.user_name} />

        <TextInput
        style={styles.inputText}
        secureTextEntry={true}
        placeholder="비밀번호(영문 숫자 6~15자 이내)"
        onChangeText={value => handleChange('password', value)}
        value={signupInfo.password} />
        {!!signupInfo.password.length && !regexPassword.test(signupInfo.password) && <Text style={styles.alertMessage}>비밀번호가 올바른 형식이 아닙니다</Text>}

        <TextInput
        style={styles.inputText}
        secureTextEntry={true}
        placeholder="비밀번호 확인"
        editable={!!signupInfo.password.length}
        onChangeText={value => handleChange('passwordCheck', value)}
        value={signupInfo.passwordCheck} />
        {!!signupInfo.passwordCheck.length && !isPasswordSame && <Text style={styles.alertMessage}>비밀번호가 다릅니다</Text>}

      </View>

      <TouchableOpacity
      style={(isAllFilled && isPasswordSame) ? styles.button : styles.disabledButton}
      onPress={() => fetchSignup(signupInfo, handleSubmit, navigation)}
      disabled={!(isAllFilled && isPasswordSame)}>
        <Text style={styles.buttonText}>회원가입</Text>
      </TouchableOpacity>
    </View>
  );
};

const mapStateToProps = state => {
  return {
    signupInfo: state.signupInfo
  };
};

const mapDispatchToProps = dispatch => {
  return {
    handleChange(info, value) {
      dispatch(setSignupInfo({ [info]: value }));
    },
    handleSubmit() {
      dispatch(setSignupInfo({ user_id: '', user_name: '', password: '', passwordCheck: '' }));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignupScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 40,
    marginBottom: 25,
    fontWeight: 'bold'
  },
  inputText: {
    width: 300,
    height: 45,
    marginBottom: 10,
    paddingLeft: 20,
    fontSize: 20,
    borderColor: 'transparent',
    backgroundColor: 'white'
  },
  inputContainer: {
    marginBottom: 25,
  },
  alertMessage: {
    color: 'tomato'
  },
  button: {
    width: 200,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10,
    backgroundColor: '#4968A6',
    elevation: 1
  },
  disabledButton: {
    width: 200,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10,
    backgroundColor: 'gray',
    elevation: 1
  },
  buttonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white'
  },
});
