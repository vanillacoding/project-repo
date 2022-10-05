import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  View,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import * as SecureStore from "expo-secure-store";

import loginWithGoogleAsync from "../utils/loginWithGoogleAsync";
import { loginUser } from "../reducers/userSlice";

function WelcomeScreen() {
  const isLoading = useSelector((state) => state.user.status === "pending");
  const dispath = useDispatch();

  useFocusEffect(useCallback(() => {
    (async function loginSilently() {
      const token = await SecureStore.getItemAsync("token");

      if (!token) return;

      dispath(loginUser({ token }));
    })();
  }, [dispath]));

  async function handleClick() {
    const result = await loginWithGoogleAsync();

    if (!result.user) return;

    await SecureStore.deleteItemAsync("token");
    dispath(loginUser({ user: result.user }));
  }

  return (
    <View style={styles.container}>
      {isLoading
        ? <ActivityIndicator size="large" />
        : <Button title="Get Start" onPress={handleClick} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default WelcomeScreen;
