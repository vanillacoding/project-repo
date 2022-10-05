import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { StyleSheet, Text, View, TouchableOpacity, TextInput } from "react-native";
import { Feather } from "@expo/vector-icons";
import * as SecureStore from "expo-secure-store";
import axios from "axios";

import getEnvVars from "../config/environment";
const { API_SERVER_URL, DEFAULT_IMAGE_URL } = getEnvVars();

import CustomButton from "../components/shared/CustomButton";
import generateNickname from "../utils/nicknameGenerator";
import validateNickname from "../utils/validateNickname";
import { addNickname, addImage, selectUser } from "../features/userSlice";
import { color } from "../config/globalStyles";
import { ERROR } from "../constants";

export default function NewNicknameScreen({ navigation }) {
  const [nickname, setNickname] = useState("");
  const [recommendedNickname, setRecommendedNickname] = useState("");
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const dispatch = useDispatch();
  const { image, email } = useSelector(selectUser);

  useEffect(() => {
    setRecommendedNickname(generateNickname());

    return () => {
      setRecommendedNickname("");
    };
  }, []);

  function clearText() {
    setNickname("");
  }

  async function fetchProfile() {
    const finalNickname = nickname || recommendedNickname;
    const finalImage = image || DEFAULT_IMAGE_URL;
    const nicknameValidation = validateNickname(finalNickname);

    if (!nicknameValidation.isValid) {
      setIsError(true);
      setErrorMessage(nicknameValidation.message);

      return;
    }

    dispatch(addNickname(finalNickname));
    dispatch(addImage(finalImage));

    const photo = {
      uri: finalImage,
      name: `new-photo.${finalImage.split(".").pop()}`,
      type: "multipart/form-data",
    };

    const data = new FormData();

    data.append("photo", photo);
    data.append("email", email);
    data.append("nickname", finalNickname);

    try {
      const token = await SecureStore.getItemAsync("token");

      await SecureStore.setItemAsync("nickname", finalNickname);

      const result = await axios.post(`${API_SERVER_URL}/users/signup`, data, {
        email,
        nickname: finalNickname,
        validateStatus: (status) => status < 500,
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      });

      if (result.data.code === 400) {
        setIsError(true);
        setErrorMessage(result.data.message);
        return;
      }

      navigation.replace("MainNavigator");
    } catch (err) {
      setIsError(true);
      setErrorMessage(ERROR.server);

      return;
    }
  }

  return (
    <>
      <View style={styles.nicknameContainer}>
        <View style={styles.textContainer}>
          <TextInput
            style={isError ? errorStyles.textInput : styles.textInput}
            onChangeText={(e) => setNickname(e)}
            value={nickname}
            placeholder={recommendedNickname}
            clearButtonMode="always"
          />
          <TouchableOpacity style={styles.xButton} onPress={clearText}>
            <Feather name="x" size={12} color={color.poplaceDark} />
          </TouchableOpacity>
        </View>
        <View style={errorStyles.errorContainer}>
          {isError && <Text style={errorStyles.errorText}>{errorMessage}</Text>}
        </View>
        <Text style={styles.title}>닉네임을{"\n"}입력해주세요</Text>
      </View>
      <View style={styles.nextButtonContainer}>
        <CustomButton text="완료" handleButton={fetchProfile} />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  nicknameContainer: {
    flex: 1,
    alignItems: "center",
    top: "35%",
  },
  textInput: {
    height: 40,
    fontSize: 20,
    borderColor: color.poplaceGray,
    borderBottomWidth: 1,
  },
  textContainer: {
    width: "80%",
    justifyContent: "center",
  },
  xButton: {
    position: "absolute",
    width: 20,
    height: 20,
    borderRadius: 50,
    right: 10,
    backgroundColor: color.poplaceMiddleGray,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    top: 20,
    fontSize: 24,
    fontWeight: "700",
    textAlign: "center",
  },
  nextButtonContainer: {
    alignItems: "center",
    bottom: "7%",
  },
  skipButton: {
    fontSize: 16,
    color: color.poplaceLight,
  },
});

const errorStyles = StyleSheet.create({
  textInput: {
    height: 40,
    fontSize: 20,
    borderColor: color.poplaceErrorRed,
    borderBottomWidth: 1,
  },
  errorText: {
    textAlign: "center",
    color: color.poplaceErrorRed,
  },
});
