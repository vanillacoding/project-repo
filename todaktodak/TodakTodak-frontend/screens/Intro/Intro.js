import React, { useCallback, useEffect, useState } from "react";
import { View, ImageBackground } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import * as SecureStore from "expo-secure-store";

import Title from "../../components/Title/Title";
import Button from "../../components/Button/Button";
import AlertModal from "../../components/AlertModal/AlertModal";

import { fetchLogin, userSlice } from "../../redux/userSlice";

import styles from "./styles";

import { SERVER_ERROR } from "../../constants/message";
import { LOGIN, SIGNUP } from "../../constants/navigationName";

import backgroundImage from "../../assets/pngs/background.png";

const Intro = () => {
  const [errorMessage, setErrorMessage] = useState(null);

  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { message } = useSelector((state) => state.user);

  useEffect(() => {
    try {
      (async function authLogin() {
        const userInfo = await SecureStore.getItemAsync("userInfo");

        if (!userInfo) return;

        const parsedUserInfo = JSON.parse(userInfo);

        if (parsedUserInfo && parsedUserInfo.email) {
          dispatch(fetchLogin(parsedUserInfo));
        }
    })();
    } catch (err) {
      setErrorMessage(SERVER_ERROR);
    }
  }, []);

  const handleLoginClick = useCallback(() => {
    navigation.navigate(LOGIN);
  }, []);

  const handleSignupClick = useCallback(() => {
    navigation.navigate(SIGNUP);
  }, []);

  const clearMessage = useCallback(() => {
    setErrorMessage(null);
    dispatch(userSlice.actions.clearMessage());
  }, []);

  return (
    <ImageBackground
      source={backgroundImage}
      style={styles.backgroundContainer}
    >
      <View>
        <Title text="토닥 토닥"
          titleStyle={styles.titleContainer}
          imageStyle={styles.titleImage}
        />
        <View style={styles.buttonContainer}>
          <Button text="로그인" handleClick={handleLoginClick} />
          <Button text="회원가입" handleClick={handleSignupClick} />
        </View>
      </View>
      {(message || errorMessage) &&
        <AlertModal
          handleModalClose={clearMessage}
          message={message ? message : errorMessage}
        />
      }
    </ImageBackground>
  );
}

export default React.memo(Intro);
