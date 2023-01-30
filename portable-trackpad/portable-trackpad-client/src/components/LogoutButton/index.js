import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import styled from "styled-components/native";
import { Alert } from "react-native";

const LogoutButton = () => {
  const navigation = useNavigation();

  const logoutAlert = async () => {
    await AsyncStorage.clear();

    Alert.alert("Logout", "로그아웃이 완료되었습니다.", [
      {
        text: "확인",
        onPress: () => navigation.navigate("Main"),
      },
    ]);
  };

  return (
    <TextBox onPress={logoutAlert}>
      <Text>로그아웃</Text>
    </TextBox>
  );
};

const TextBox = styled.TouchableOpacity`
  display: flex;
  justify-content: center;
  align-items: flex-end;
  width: 180px;
  background-color: transparent;
`;

const Text = styled.Text`
  padding: 10px 15px;
  font-size: 18px;
`;

export default LogoutButton;
