import { useEffect } from "react";
import axios from "axios";
import styled from "styled-components/native";
import { SERVER_PORT, EXPO_CLIENT_ID, EXPO_WEB_CLIENT_ID } from "@env";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import Ionicons from "@expo/vector-icons/Ionicons";
import COLORS from "../constants/COLORS";
import ToPreviousScreenButton from "../components/ToPreviousScreenButton";

WebBrowser.maybeCompleteAuthSession();

const LoginScreen = ({ navigation }) => {
  const [request, response, promptAsync] = Google.useAuthRequest({
    responseType: "id_token",
    expoClientId: EXPO_CLIENT_ID,
    webClientId: EXPO_WEB_CLIENT_ID,
  });

  const googleLogin = async (token) => {
    try {
      const user = await axios.post(
        `${SERVER_PORT}/login`,
        {},
        {
          headers: {
            idToken: token,
          },
        },
      );

      await AsyncStorage.setItem("idToken", JSON.stringify(user.data));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    (async () => {
      if (response?.type === "success") {
        await googleLogin(response.params.id_token);
        navigation.navigate("DownloadGuide");
      }
    })();
  }, [response]);

  return (
    <LoginContainer>
      <ToPreviousScreenButton screen={"Main"} />
      <LoginTitleText>Login</LoginTitleText>
      <LoginButton
        disabled={!request}
        onPress={() => {
          promptAsync();
        }}
      >
        <Ionicons
          name="logo-google"
          size={32}
          color={COLORS.BACKGROUND_COLOR}
        />
        <LoginButtonText>Google Login</LoginButtonText>
      </LoginButton>
    </LoginContainer>
  );
};

const LoginContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${COLORS.BACKGROUND_COLOR};
`;

const LoginTitleText = styled.Text`
  margin-bottom: 50px;
  font-size: 60px;
`;

const LoginButton = styled.TouchableOpacity`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  margin-top: 30px;
  padding: 15px 50px;
  background-color: ${COLORS.MAIN_COLOR};
  border-radius: 10px;
`;

const LoginButtonText = styled.Text`
  margin-left: 10px;
  font-size: 20px;
  color: ${COLORS.BACKGROUND_COLOR};
`;

export default LoginScreen;
