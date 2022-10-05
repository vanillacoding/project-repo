import React from "react";
import { useSelector, useDispatch } from "react-redux";
import Ionicons from "react-native-vector-icons/Ionicons";

import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";

import { login } from "../redux/reducers/userSlice";

const LoginScreen = () => {
  const error = useSelector((state) => state.user.error);
  const dispatch = useDispatch();

  const signInWithGoogle = () => {
    dispatch(login());
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Image
          style={styles.logo}
          source={require("../../assets/logo.png")}
        />
      </View>

      <TouchableOpacity style={styles.loginButton} onPress={(signInWithGoogle)}>
        <Ionicons name="logo-google" size={25} color="#006FF3" />
        <Text style={styles.loginButtonText}>Google Login</Text>
      </TouchableOpacity>

      {error && <Text style={styles.errorMessage}>{error.message}</Text>}
    </SafeAreaView >
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#FFF",
  },
  logo: {
    marginTop: 282,
    width: 125,
    height: 125,
  },
  loginButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: 50,
    width: 200,
    marginTop: 150,
  },
  loginButtonText: {
    fontSize: 25,
    marginLeft: 20,
    color: "#006FF3",
  },
  errorMessage: {
    marginTop: 20,
    color: "red",
  },
});

export default LoginScreen;
