import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSignin } from '../../featrues/userSlice';
import { View,  TouchableOpacity } from 'react-native';
import { SIZES, STRINGS } from '../../constants/index';
import checkInputStatus from '../../utils/checkInputStatus';
import { NAMES, MESSAGE } from '../../constants/index';

import LoginLoading from '../Animations/LoginLoading/LoginLoading';
import LogoName from '../../components/shared/LogoName/LogoName';
import LoginInput from '../../components/LoginBoard/LoginInput/LoginInput';
import LoginRegisterButtons from '../../components/shared/LoginSignupButtons/LoginSignupButtons';
import LoginModal from '../../components/ReusableModal/ReusableModal';

import {
  GoogleIcon,
  FacebookIcon,
  InstagramIcon
} from '../../assets/svgs/icon';

import styles from './styles';

const Login = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isModalShown, setModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [isLoginFailed, setLoginFailStatus] = useState(false);

  const { isFetching, pushToken, isError } = useSelector(state => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isError) {
      setModal(true);
      setModalMessage(MESSAGE.CHECK_INPUT);
      setLoginFailStatus(true);
    }
  }, [isError]);

  const handleLoginPress = () => {
    const isInputImproper = checkInputStatus(
      STRINGS.LOGIN_EN,
      email,
      password,
      null,
      null,
      setModalMessage,
      setModal
    );

    if (isInputImproper) return;

    const loginInput = {
      email,
      password,
      pushToken
    };

    dispatch(fetchSignin(loginInput));
  };

  const handleSignupPress = () => {
    navigation.navigate(NAMES.SIGNUP);
  };

  const handleModalPress = () => {
    setLoginFailStatus(false);
    setModalMessage('');
    setModal(false);
  };

  if (isFetching) {
    return <LoginLoading />;
  }

  return (
    <>
      {isLoginFailed &&
        <LoginModal
          message={modalMessage}
          visible={isModalShown}
          onButtonPress={handleModalPress}
        />}
      {isModalShown &&
        <LoginModal
          message={modalMessage}
          visible={isModalShown}
          onButtonPress={handleModalPress}
        />}
        <View style={styles.wrapper}>
          <View style={styles.loginWrapper}>
            <LogoName />
            <LoginInput
              email={email}
              onEmailChange={setEmail}
              password={password}
              onPasswordChange={setPassword}
            />
            <LoginRegisterButtons
              onLoginPress={handleLoginPress}
              onSignupPress={handleSignupPress}
            />
            <View style={styles.iconWrapper}>
              <TouchableOpacity>
                <GoogleIcon size={SIZES.LOGO_ICON} />
              </TouchableOpacity>
              <TouchableOpacity>
                <FacebookIcon size={SIZES.LOGO_ICON} />
              </TouchableOpacity>
              <TouchableOpacity>
                <InstagramIcon size={SIZES.LOGO_ICON} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
    </>
  );
};

export default Login;
