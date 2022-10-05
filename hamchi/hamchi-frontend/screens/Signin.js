import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchSignin } from '../features/userSlice';
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
import colors from '../theme/color';

import {
  readCredentials
} from '../api/secureStore';

const Signin = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    checkCredentialsAndFetch();
  }, []);

  async function checkCredentialsAndFetch() {
    const credentials = await readCredentials();

    if (credentials) {
      dispatch(fetchSignin());
    }
  }

  function handleSubmit() {
    const signinInput = {
      email,
      password
    };

    dispatch(fetchSignin(signinInput));
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
              placeholder="비밀번호"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
            <Button text="로그인"
              type="filled"
              onPress={handleSubmit}
            />
            <Button text="회원가입"
              onPress={() => navigation.navigate('Sign up')}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 50,
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
  input: {
    margin: 8,
    padding: 15,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: colors.outline,
  },
});

export default Signin;
