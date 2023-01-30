import axios from "axios";
import styled from "styled-components/native";
import Ionicons from "@expo/vector-icons/Ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";
import { useState } from "react";
import { SERVER_PORT } from "@env";
import COLORS from "../constants/COLORS";
import ToNextScreenButton from "../components/ToNextScreenButton";
import ToPreviousScreenButton from "../components/ToPreviousScreenButton";

const DownloadGuideScreen = () => {
  const [email, setUserEmail] = useState("");
  const [isFocus, setIsFocus] = useState(false);

  const validateEmail = async (text) => {
    const reg = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    const idToken = await AsyncStorage.getItem("idToken");

    try {
      if (reg.test(text) === false) {
        Alert.alert("email validate fail", "유효한 이메일이 아닙니다.", [
          {
            text: "확인",
          },
        ]);

        setUserEmail(text);

        return false;
      } else {
        Alert.alert(
          "Email sent successfully",
          "이메일이 성공적으로 전송되었습니다.",
          [
            {
              text: "확인",
            },
          ],
        );

        await axios.post(
          `${SERVER_PORT}/users/email`,
          {
            email: text,
          },
          {
            headers: {
              idToken: idToken,
            },
          },
        );
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <DownloadGuideContainer>
      <ToPreviousScreenButton screen={"Main"} />
      <Ionicons name="download-outline" size={150} color={COLORS.MAIN_COLOR} />
      <DownloadGuideTitleBox>
        <DownloadGuideTitleText>
          본 어플리케이션은 데스크탑에
        </DownloadGuideTitleText>
        <DownloadGuideTitleText>
          프로그램설치가 필요합니다.
        </DownloadGuideTitleText>
      </DownloadGuideTitleBox>
      <DownloadGuideDescriptionBox>
        <DownloadGuideDescriptionText>
          아래에 Email을 입력하시면
        </DownloadGuideDescriptionText>
        <DownloadGuideDescriptionText>
          데스크탑 프로그램 설치파일이 전송됩니다.
        </DownloadGuideDescriptionText>
      </DownloadGuideDescriptionBox>
      <DownloadGuideUserEmailBox>
        <Ionicons name="mail-outline" size={30} color={COLORS.MAIN_COLOR} />
        <DownloadGuideUserEmailTextInput
          onChangeText={setUserEmail}
          onFocus={() => setIsFocus(true)}
          value={email}
        />
        <DownloadGuideUserEmailPlaceHolder
          style={isFocus ? { top: -10, left: 35 } : { left: 40 }}
        >
          Email
        </DownloadGuideUserEmailPlaceHolder>
        <Ionicons
          name="arrow-forward"
          size={24}
          color={COLORS.MAIN_COLOR}
          onPress={() => validateEmail(email)}
        />
      </DownloadGuideUserEmailBox>
      <ToNextScreenButton screen={"NetworkGuide"} />
    </DownloadGuideContainer>
  );
};

const DownloadGuideContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${COLORS.BACKGROUND_COLOR};
`;

const DownloadGuideTitleText = styled.Text`
  font-size: 20px;
`;

const DownloadGuideDescriptionText = styled.Text`
  font-size: 12px;
`;

const DownloadGuideTitleBox = styled.View`
  justify-content: center;
  align-items: center;
  margin-top: 50px;
  margin-bottom: 30px;
`;

const DownloadGuideDescriptionBox = styled.View`
  justify-content: center;
  align-items: center;
  margin-bottom: 30px;
`;

const DownloadGuideUserEmailBox = styled.View`
  flex-direction: row;
  align-items: center;
`;

const DownloadGuideUserEmailTextInput = styled.TextInput`
  width: 200px;
  height: 50px;
  padding: 10px;
  border-bottom: 2px;
  font-size: 20px;
  box-sizing: border-box;
`;

const DownloadGuideUserEmailPlaceHolder = styled.Text`
  position: absolute;
  font-size: 15px;
  color: #999999;
`;

export default DownloadGuideScreen;
