import React, { useEffect } from "react";
import { Image, StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch } from "react-redux";
import Icon from "react-native-vector-icons/Ionicons";

import useAuthGoogle from "../hooks/useAuthGoogle";
import { authLogin } from "../actions/userActionCreators";

import * as colors from "../constants/colors";
import * as fonts from "../constants/fonts";
import * as sizes from "../constants/sizes";

export default function LoginScreen() {
  const dispatch = useDispatch();
  const [signInGoogle, getGoogleUserInfo] = useAuthGoogle();

  useEffect(() => {
    (async () => {
      const userInfo = await getGoogleUserInfo();

      if (!userInfo) { return }

      dispatch(authLogin(userInfo));
    })();
  }, [getGoogleUserInfo]);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>
        우리 동네 공놀이
      </Text>
      <Image
        style={styles.image}
        source={require("../assets/logo.png")}
      />
      <Icon.Button
        name="logo-google"
        backgroundColor={colors.PRIMARY_BLUE}
        onPress={signInGoogle}
      >
        <Text style={styles.loginText}>
          Login with Google
        </Text>
      </Icon.Button>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-around",
    alignItems: "center",
    textAlign: "center",
    textAlignVertical: "center",
    backgroundColor: colors.SECONDARY_GRAY,
  },
  title: {
    marginTop: 0.1 * sizes.DEVICE_HEIGHT,
    color: colors.PRIMARY_BLUE,
    fontSize: 40,
    fontFamily: fonts.NOTO_SANS_KR_700_BOLD,
    includeFontPadding: false,
  },
  image: {
    height: 0.3 * sizes.DEVICE_HEIGHT,
    width: 0.5 * sizes.DEVICE_WIDTH,
    resizeMode: "contain",
  },
  loginText: {
    color: colors.SECONDARY_WHITE,
    fontSize: sizes.SECONDARY_FONT_SIZE,
    fontFamily: fonts.NOTO_SANS_KR_700_BOLD,
    includeFontPadding: false,
  },
});
