import Ionicons from "@expo/vector-icons/Ionicons";
import styled from "styled-components/native";
import COLORS from "../constants/COLORS";
import ToNextScreenButton from "../components/ToNextScreenButton";
import ToPreviousScreenButton from "../components/ToPreviousScreenButton";

const NetworkGuideScreen = () => {
  return (
    <NetworkGuideContainer>
      <ToPreviousScreenButton screen={"DownloadGuide"} />
      <Ionicons name="wifi" size={150} color={COLORS.MAIN_COLOR} />
      <NetworkGuideTextBox>
        <NetworkGuideText>본 어플리케이션은</NetworkGuideText>
        <NetworkGuideText>데스크탑과 디바이스가</NetworkGuideText>
        <NetworkGuideText>서로 같은 네트워크에</NetworkGuideText>
        <NetworkGuideText>연결되어있어야 합니다.</NetworkGuideText>
      </NetworkGuideTextBox>
      <ToNextScreenButton screen={"PcList"} />
    </NetworkGuideContainer>
  );
};

const NetworkGuideContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${COLORS.BACKGROUND_COLOR};
`;

const NetworkGuideTextBox = styled.View`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-bottom: 50px;
`;

const NetworkGuideText = styled.Text`
  font-size: 20px;
  text-align: center;
  color: #333333;
`;

export default NetworkGuideScreen;
