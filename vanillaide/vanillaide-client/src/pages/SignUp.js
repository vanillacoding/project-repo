import PropTypes from "prop-types";
import { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  Keyboard,
  TextInput,
  KeyboardAvoidingView,
} from "react-native";

import api from "../api/api";
import CustomButton from "../components/CustomButton";
import Logo from "../components/Logo";
import { LIGHT_GREY_50, RED_50 } from "../constants/color";
import AppHeader from "../layout/AppHeader";
import ContentBox from "../layout/ContentBox";
import Layout from "../layout/Layout";
import signupValidation from "../utils/signupValidation";

export default function SignUp({ navigation }) {
  const [userInput, setUserInput] = useState({
    username: "",
    email: "",
    password: "",
    passwordConfirm: "",
  });

  const [errorMsg, setErrorMsg] = useState({
    name: "",
    email: "",
    password: "",
    passwordConfirm: "",
  });

  const handleNameChange = (text) => {
    setUserInput((prev) => ({ ...prev, username: text }));
  };

  const handleEmailChange = (text) => {
    setUserInput((prev) => ({ ...prev, email: text }));
  };

  const handlePasswordChange = (text) => {
    setUserInput((prev) => ({ ...prev, password: text }));
  };

  const handlePasswordConfirmChange = (text) => {
    setUserInput((prev) => ({ ...prev, passwordConfirm: text }));
  };

  const handlePress = async () => {
    Keyboard.dismiss();
    const { username, email, password, passwordConfirm } = userInput;

    const validations = [
      signupValidation.isValidName(username, setErrorMsg),
      signupValidation.isValidEmail(email, setErrorMsg),
      signupValidation.isValidPassword(password, setErrorMsg),
      signupValidation.isValidPasswordConfirm(
        passwordConfirm,
        password,
        setErrorMsg,
      ),
    ];

    const isAllValid = validations.every((isPassed) => isPassed);

    if (isAllValid) {
      const status = await api.postSignUp(
        username,
        email,
        password,
        passwordConfirm,
      );

      if (status === 200) {
        navigation.navigate("SignIn");
      }
    }
  };

  return (
    <Layout>
      <AppHeader>
        <Logo fontSize={30} />
      </AppHeader>
      <ContentBox>
        <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={150}>
          <View style={styles.titleWrapper}>
            <Text style={styles.title}>Sign Up</Text>
          </View>
          <View style={styles.formWrapper}>
            <Text style={styles.labelText}>name</Text>
            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.input}
                autoCorrect={false}
                value={userInput.username}
                onChangeText={(text) => handleNameChange(text)}
              />
            </View>
            <Text style={styles.errorText}>{errorMsg.name}</Text>
          </View>
          <View style={styles.formWrapper}>
            <Text style={styles.labelText}>email</Text>
            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.input}
                autoCorrect={false}
                value={userInput.email}
                onChangeText={(text) => handleEmailChange(text)}
              />
            </View>
            <Text style={styles.errorText}>{errorMsg.email}</Text>
          </View>
          <View style={styles.formWrapper}>
            <Text style={styles.labelText}>password</Text>
            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.input}
                secureTextEntry
                autoCorrect={false}
                value={userInput.password}
                onChangeText={(text) => handlePasswordChange(text)}
              />
            </View>
            <Text style={styles.errorText}>{errorMsg.password}</Text>
          </View>
          <View style={styles.formWrapper}>
            <Text style={styles.labelText}>password confirm</Text>
            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.input}
                secureTextEntry
                autoCorrect={false}
                value={userInput.passwordConfirm}
                onChangeText={(text) => handlePasswordConfirmChange(text)}
              />
            </View>
            <Text style={styles.errorText}>{errorMsg.passwordConfirm}</Text>
          </View>
          <View style={styles.buttonWrapper}>
            <CustomButton
              text="Sign Up"
              fontSize={20}
              handlePress={handlePress}
            />
          </View>
        </KeyboardAvoidingView>
      </ContentBox>
    </Layout>
  );
}

SignUp.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

const styles = StyleSheet.create({
  formWrapper: {
    marginBottom: 20,
    width: 300,
  },
  titleWrapper: {
    alignItems: "center",
  },
  title: {
    fontSize: 30,
    fontFamily: "FiraCode",
    color: LIGHT_GREY_50,
  },
  labelText: {
    fontFamily: "FiraCode",
    color: LIGHT_GREY_50,
  },
  inputWrapper: {
    flexDirection: "row",
    width: "100%",
    height: 50,
    borderWidth: 0.5,
    borderRadius: 5,
    backgroundColor: LIGHT_GREY_50,
  },
  input: {
    paddingLeft: 12,
    width: "100%",
    fontFamily: "FiraCode",
  },
  errorText: {
    fontFamily: "FiraCode",
    fontSize: 10,
    color: RED_50,
  },
  buttonWrapper: {
    alignItems: "center",
  },
});
