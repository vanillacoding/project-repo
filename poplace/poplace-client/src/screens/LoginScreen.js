import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { View, Text, Image, StyleSheet, Alert } from "react-native";
import * as SecureStore from "expo-secure-store";

import { signinUser, selectUser } from "../features/userSlice";
import loginWithGoogle from "../api/loginWithGoogle";
import { ERROR, ALERT } from "../constants";
import { color, moderateScale, verticalScale } from "../config/globalStyles";
import CustomButton from "../components/shared/CustomButton";

export default function LoginScreen({ navigation }) {
  const isAuthorized = useSelector((state) => state.user.status === "success");
  const [errorMessage, setErrorMessage] = useState("");
  const { isOriginalMember, nickname } = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isAuthorized) {
      if (!isOriginalMember || !nickname) {
        return navigation.replace("NewAccountNavigator");
      }

      return navigation.replace("MainNavigator");
    }
  }, [isAuthorized]);

  function handleErrorMessage(message) {
    setErrorMessage(message);
  }

  async function handleGoogleLogin() {
    await SecureStore.deleteItemAsync("token");

    const { success, user } = await loginWithGoogle();

    if (!success) {
      Alert.alert(ALERT.notice, ERROR.cancelLogin, [
        {
          text: ALERT.accept, onPress: () => {
            return setErrorMessage(ERROR.cancelLogin);
          }
        },
      ]);
    }

    handleErrorMessage("");
    dispatch(signinUser(user));
  }

  return (
    <View style={styles.container}>
      <Image
        style={styles.logo}
        source={require("../assets/poplace.png")} />
      <Image source={require("../assets/villige.png")} />

      <View style={styles.buttonContainer}>
        <Text style={styles.errorMessage}>{errorMessage}</Text>
        <CustomButton style={styles.button} text="구글로 시작하기" handleButton={handleGoogleLogin} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff9f6",
  },
  logo: {
    position: "absolute",
    top: verticalScale(160),
  },
  buttonContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    bottom: verticalScale(40),
  },
  errorMessage: {
    marginBottom: verticalScale(10),
    color: color.poplaceErrorRed,
    fontSize: moderateScale(15),
  },
});
