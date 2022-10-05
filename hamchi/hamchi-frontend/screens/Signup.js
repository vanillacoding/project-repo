import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createError } from '../features/userSlice';
import {
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  View,
  Image,
  Text,
  StyleSheet
} from 'react-native';

import Input from '../components/shared/Input';
import Button from '../components/shared/Button';
import logo from '../assets/png/logo.png';
import errorMessage from '../constants/errorMessage';
import userAPI from '../api/user';

const Signup = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const dispatch = useDispatch();

  async function handleSubmit() {
    try {
      const signupInput = {
        email,
        username,
        password,
        confirmPassword
      };
      const response = await userAPI.requestSignup(signupInput);

      if (response.code === 200) {
        navigation.navigate('Sign in');
      } else {
        dispatch(createError(response.message));
      }
    } catch (err) {
      dispatch(createError('작업 도중 에러가 발생했습니다'));
    }
  }

  return (
    <KeyboardAvoidingView
      behavior="padding"
      style={{ flex: 1 }}
      enabled
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.screen}>
          <Text style={styles.title}>Hamchi</Text>
          <Image
            style={styles.logo}
            source={logo}
          />
          <View style={styles.inputContainer}>
            <Input
              placeholder="이메일 주소"
              value={email}
              onChangeText={setEmail}
            />
            <Input
              placeholder="이름"
              value={username}
              onChangeText={setUsername}
            />
            <Input
              placeholder="비밀번호"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
            <Input
              placeholder="비밀번호 확인"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry
            />
            <Button text="회원가입"
              type="filled"
              onPress={handleSubmit}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView >
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 50,
  },
  title: {
    fontSize: 60,
  },
  logo: {
    width: 150,
    height: 150,
  },
  inputContainer: {
    width: 300,
  },
});

export default Signup;
