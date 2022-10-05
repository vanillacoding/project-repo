import React from 'react';
import { connect } from 'react-redux';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

import { fetchLogin } from '../../utils/api';
import { setLoginInfo, setLoggedIn, setUserPortraits } from '../../actions/index';

export function LoginScreen ({ loginInfo, handleChange, handleSubmit, navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>로그인</Text>
      <View style={styles.inputContainer}>
        <TextInput
        style={styles.inputText}
        placeholder="아이디"
        onChangeText={value => handleChange('user_id', value)}
        value={loginInfo.user_id} />
        <TextInput
        style={styles.inputText}
        secureTextEntry={true}
        placeholder="비밀번호"
        onChangeText={value => handleChange('password', value)}
        value={loginInfo.password} />
      </View>
      <TouchableOpacity style={styles.button} onPress={() => fetchLogin(loginInfo, handleSubmit, navigation)}>
        <Text style={styles.buttonText}>로그인</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Signup')}>
        <Text style={styles.buttonText}>회원가입</Text>
      </TouchableOpacity>
    </View>
  );
};

const mapStateToProps = state => {
  return {
    loginInfo: state.loginInfo
  };
};

const mapDispatchToProps = dispatch => {
  return {
    handleChange(info, value) {
      dispatch(setLoginInfo({ [info]: value }));
    },
    handleSubmit(status, user, photos) {
      dispatch(setLoginInfo({ user_id: '', password: '' }));
      dispatch(setLoggedIn({ status, user }));
      dispatch(setUserPortraits(photos));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);

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
  buttonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white'
  },
});
