import PropTypes from "prop-types";
import React, { useState, useContext } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  KeyboardAvoidingView,
} from "react-native";

import api from "../api/api";
import CustomButton from "../components/CustomButton";
import Logo from "../components/Logo";
import { LIGHT_GREY_50, WHITE, RED_50 } from "../constants/color";
import { UserContext } from "../contexts/AuthProvider";
import AppHeader from "../layout/AppHeader";
import ContentBox from "../layout/ContentBox";
import Layout from "../layout/Layout";
import validate from "../utils/validateSignIn";

export default function SignIn({ navigation }) {
  const [signInForm, setSignInForm] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState({
    email: "",
    password: "",
  });

  const { setLoggedInUser } = useContext(UserContext);

  const handleSignInPress = async () => {
    const validations = [
      validate.email(signInForm.email, setError),
      validate.password(signInForm.password, setError),
    ];

    const validationResults = validations.every((validationResult) => {
      if (validationResult) return true;
    });

    if (validationResults) {
      const data = await api.postLogIn(signInForm.email, signInForm.password);

      if (data) {
        const { user } = data;

        setLoggedInUser(user);
      }
    }
  };

  const handleBackPress = () => {
    navigation.goBack();
  };

  return (
    <Layout>
      <AppHeader>
        <Logo fontSize={30} />
      </AppHeader>
      <ContentBox>
        <View style={styles.title}>
          <Text style={styles.titleText}>Sign in</Text>
        </View>
        <KeyboardAvoidingView behavior="padding" style={styles.content}>
          <View style={styles.textWrapper}>
            <View style={styles.inputWrapper}>
              <Text style={styles.text}>email</Text>
              {error.email && (
                <Text style={styles.errorText}>{error.email}</Text>
              )}
            </View>
            <TextInput
              style={styles.input}
              placeholder="email"
              keyboardType="email-address"
              value={signInForm.email}
              onChangeText={(ev) => {
                setSignInForm((state) => {
                  return { ...state, email: ev };
                });
              }}
            />
          </View>
          <View style={styles.textWrapper}>
            <View style={styles.inputWrapper}>
              <Text style={styles.text}>password</Text>
              {error.password && (
                <Text style={styles.errorText}>{error.password}</Text>
              )}
            </View>
            <TextInput
              style={styles.input}
              placeholder="PW"
              secureTextEntry
              value={signInForm.password}
              onChangeText={(ev) => {
                setSignInForm((state) => {
                  return { ...state, password: ev };
                });
              }}
            />
          </View>
          <View style={styles.buttonView}>
            <CustomButton
              text="Sign In"
              fontSize={12}
              buttonWidth={140}
              buttonMargin={10}
              handlePress={handleSignInPress}
            />
            <CustomButton
              text="Back"
              fontSize={12}
              buttonWidth={140}
              buttonMargin={10}
              handlePress={handleBackPress}
            />
          </View>
        </KeyboardAvoidingView>
      </ContentBox>
    </Layout>
  );
}

SignIn.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
    goBack: PropTypes.func.isRequired,
  }).isRequired,
};

const styles = StyleSheet.create({
  buttonView: {
    flex: 2,
    flexDirection: "row",
    marginTop: 20,
  },
  input: {
    paddingLeft: 15,
    width: 300,
    height: 50,
    borderRadius: 10,
    backgroundColor: LIGHT_GREY_50,
    fontSize: 15,
  },
  text: {
    fontFamily: "FiraCode",
    fontStyle: "normal",
    fontSize: 15,
    color: WHITE,
  },
  title: {
    flex: 3,
    justifyContent: "center",
  },
  content: {
    flex: 7,
  },
  titleText: {
    fontFamily: "FiraCode",
    fontStyle: "normal",
    fontSize: 50,
    color: WHITE,
  },
  errorText: {
    marginLeft: 10,
    fontFamily: "FiraCode",
    fontStyle: "normal",
    fontSize: 15,
    color: RED_50,
  },
  textWrapper: {
    margin: 10,
  },
  inputWrapper: {
    flexDirection: "row",
  },
});
