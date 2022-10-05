import React, { useState } from 'react';
import { View } from 'react-native';
import * as userAPI from '../../api/userApi';
import checkInputStatus from '../../utils/checkInputStatus';
import { NAMES } from '../../constants/index';

import LogoName from '../../components/shared/LogoName/LogoName';
import SignupInput from '../../components/SignupBoard/SignupInput/SignupInput';
import LoginRegisterButtons from '../../components/shared/LoginSignupButtons/LoginSignupButtons';
import SignupModal from '../../components/ReusableModal/ReusableModal';
import { STRINGS } from '../../constants/index';

import styles from './styles';


const Signup = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isModalShown, setModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  const handleModalPress = () => {
    setModalMessage('');
    setModal(false);
  };

  const handleLoginPress = () => {
    navigation.navigate(NAMES.LOGIN);
  };

  const handleSignupPress = async () => {
    const isInputImproper = checkInputStatus(
      STRINGS.SIGNUP_EN,
      email,
      password,
      userName,
      confirmPassword,
      setModalMessage,
      setModal
    );

    if (isInputImproper) return;

    try {
      const signupInput = {
        email,
        userName,
        password
      };

      const response = await userAPI.requestSignup(signupInput);

      if (response.status === 201) {
        navigation.navigate(NAMES.LOGIN);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      {isModalShown &&
        <SignupModal
          message={modalMessage}
          visible={isModalShown}
          onButtonPress={handleModalPress}
        />}
      <View style={styles.wrapper}>
        <View style={styles.signupWrapper}>
          <LogoName />
          <SignupInput
            email={email}
            userName={userName}
            password={password}
            confirmPassword={confirmPassword}
            onEmailChange={setEmail}
            onUserNameChange={setUserName}
            onPasswordChange={setPassword}
            onConfirmChange={setConfirmPassword}
          />
          <LoginRegisterButtons
            onLoginPress={handleLoginPress}
            onSignupPress={handleSignupPress}
          />
        </View>
      </View>
    </>
  );
};

export default Signup;
