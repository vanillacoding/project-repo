import AsyncStorage from "@react-native-async-storage/async-storage";
import styled from "styled-components/native";
import { useNavigation } from "@react-navigation/native";
import { Alert } from "react-native";
import { LogBox } from "react-native";

const ToNextScreenTextButton = ({ screen, text, props }) => {
  LogBox.ignoreLogs([
    "Non-serializable values were found in the navigation state",
  ]);

  const navigation = useNavigation();

  const toNextScreen = async () => {
    const idToken = await AsyncStorage.getItem("idToken");

    if (idToken) {
      navigation.navigate(screen, props);
    } else {
      Alert.alert("Need Login", "로그인이 필요합니다.", [
        {
          text: "확인",
        },
      ]);
    }
  };

  return (
    <TextButton onPress={toNextScreen}>
      <MenuText>{text}</MenuText>
    </TextButton>
  );
};

const TextButton = styled.TouchableOpacity`
  display: flex;
  justify-content: center;
  align-items: flex-end;
  width: 180px;
  background-color: transparent;
`;

const MenuText = styled.Text`
  padding: 10px 15px;
  font-size: 18px;
`;

export default ToNextScreenTextButton;
