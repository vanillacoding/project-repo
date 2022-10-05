import React, { useEffect, useState } from 'react';
import { ImageBackground } from 'react-native';
import { connect } from 'react-redux';
import { StackActions } from '@react-navigation/native';
import asyncStorage from '@react-native-async-storage/async-storage';
import { AntDesign } from '@expo/vector-icons';
import configuredAxios from '../config/axiosConfig';
import { setUserInfo } from '../actions';
import { LoginButton, StyledText, Wrapper, styles } from '../shared/index';
import { logInWithFacebook } from '../utils/api';
import SCREEN from '../constants/screen';
import MESSAGE from '../constants/message';
import { COLOR } from '../constants/color';
import ROUTE from '../constants/route';

const Login = ({ navigation, setUserInfo }) => {
  const [isLoginInProcess, setIsLoginInProcess] = useState(false);

  const checkTokenAndRouting = async () => {
    try {
      const token = await asyncStorage.getItem('token');
      if (!token) return;

      const { data } = await configuredAxios.post(
        `${ROUTE.USERS}${ROUTE.LOGIN}`
      );
      const user = data.user;

      setUserInfo(user);

      user.preferredPartner
        ? navigation.dispatch(StackActions.replace(SCREEN.MAIN_MAP))
        : navigation.dispatch(StackActions.replace(SCREEN.PREFERRED_PARTNER));
    } catch (error) {
      alert(MESSAGE.UNKNWON_ERROR);
      asyncStorage.clear();
    }
  };

  useEffect(() => {
    checkTokenAndRouting();
  }, []);

  const handleLoginButtonClick = async () => {
    if (isLoginInProcess) return;
    setIsLoginInProcess(true);

    try {
      const { email } = await logInWithFacebook();
      if (!email) return;

      const {
        data,
      } = await configuredAxios.post(`${ROUTE.USERS}${ROUTE.LOGIN}`, { email });

      if (data.result === MESSAGE.NO_MEMBER_EXISTED) {
        navigation.dispatch(
          StackActions.replace(SCREEN.USER_REGISTER, { email })
        );

        return;
      }

      const { user, token } = data;

      setUserInfo(user);
      await asyncStorage.setItem('token', token);

      user.preferredPartner
        ? navigation.dispatch(StackActions.replace(SCREEN.MAIN_MAP))
        : navigation.dispatch(StackActions.replace(SCREEN.PREFERRED_PARTNER));
    } catch (error) {
      setIsLoginInProcess(false);
    }
  };

  return (
    <Wrapper color={COLOR.THEME_COLOR}>
      <ImageBackground
        source={require('../../assets/images/ricecoco_splash.png')}
        style={styles.imageBackground}
      />
      <LoginButton onPress={handleLoginButtonClick}>
        <AntDesign name='facebook-square' size={30} color='#4268b3' />
        <StyledText>Login</StyledText>
      </LoginButton>
    </Wrapper>
  );
};

export default connect(null, { setUserInfo })(Login);
