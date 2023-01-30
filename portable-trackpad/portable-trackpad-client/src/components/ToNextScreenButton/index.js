import AsyncStorage from "@react-native-async-storage/async-storage";
import styled from "styled-components/native";
import COLORS from "../../constants/COLORS";
import { useNavigation } from "@react-navigation/native";
import { Alert } from "react-native";

const ToNextScreenButton = ({ screen }) => {
  const navigation = useNavigation();

  const toNextScreen = async () => {
    const idToken = await AsyncStorage.getItem("idToken");

    if (idToken) {
      navigation.navigate(screen);
    } else {
      Alert.alert("Need Login", "로그인이 필요합니다.", [
        {
          text: "확인",
        },
      ]);
    }
  };

  return (
    <Button onPress={toNextScreen}>
      <ButtonText>Next</ButtonText>
    </Button>
  );
};

const Button = styled.TouchableOpacity`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  margin-top: 30px;
  padding: 10px 60px;
  background-color: ${COLORS.MAIN_COLOR};
  border-radius: 10px;
`;

const ButtonText = styled.Text`
  font-size: 20px;
  color: ${COLORS.BACKGROUND_COLOR};
`;

export default ToNextScreenButton;
