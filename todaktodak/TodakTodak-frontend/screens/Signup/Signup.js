import React, { useState, useCallback } from "react";
import {
  View,
  ImageBackground
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import Title from "../../components/Title/Title";
import Button from "../../components/Button/Button";
import TextInput from "../../components/TextInput/TextInput";
import AlertModal from "../../components/AlertModal/AlertModal";

import { postSignup } from "../../api/userApi";
import { validateSignupInfo } from "../../validation/authValidation";

import styles from "./styles";

import { LOGIN } from "../../constants/navigationName";
import { SERVER_ERROR } from "../../constants/message";

import backgroundImage from "../../assets/pngs/background.png";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nickname, setNickname] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);

  const navigation = useNavigation();

  const handleSignupButtonClick = useCallback(async () => {
    try {
      const signupInfo = {
        email,
        password,
        nickname
      };

      const incorrectMessage = validateSignupInfo(signupInfo);

      if (incorrectMessage) {
        return setErrorMessage(incorrectMessage);
      }

      const response = await postSignup(signupInfo);

      if (response.errorMessage) {
        return setErrorMessage(response.errorMessage);
      }

      navigation.navigate(LOGIN);
    } catch (error) {
      setErrorMessage(SERVER_ERROR);
    }
  }, [email, password, nickname]);

  const clearErrorMessage = useCallback(() => {
    setErrorMessage(null);
  }, []);

  return (
    <ImageBackground
      source={backgroundImage}
      style={styles.backgroundContainer}
    >
      <KeyboardAwareScrollView>
        <View style={styles.loginContainer}>
          <Title text="토닥 토닥" />
          <View style={styles.textInputContainer}>
            <TextInput
              value={email}
              type="emailAddress"
              handleInputChange={setEmail}
              placeholder="이메일을 입력해주세요"
            />
            <TextInput
              value={password}
              type="password"
              isPassword={true}
              handleInputChange={setPassword}
              placeholder="비밀번호를 입력해주세요"
            />
            <TextInput
              value={nickname}
              type="nickname"
              handleInputChange={setNickname}
              placeholder="닉네임을 입력해주세요"
            />
          </View>
          <View style={styles.buttonContainer}>
            <Button
              text="회원 가입"
              buttonStyle={styles.loginButton}
              handleClick={handleSignupButtonClick}
            />
          </View>
        </View>
        {errorMessage &&
          <AlertModal
            message={errorMessage}
            handleModalClose={clearErrorMessage}
          />
        }
      </KeyboardAwareScrollView>
    </ImageBackground>
  );
}

export default React.memo(Signup);
