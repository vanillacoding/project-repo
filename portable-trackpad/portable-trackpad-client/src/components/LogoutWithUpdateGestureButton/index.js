import AsyncStorage from "@react-native-async-storage/async-storage";
import styled from "styled-components/native";
import axios from "axios";
import { forwardRef } from "react";
import { useNavigation } from "@react-navigation/native";
import { Alert } from "react-native";
import { SERVER_PORT } from "@env";

const LogoutWithUpdateGestureButton = (props, { gestureFunctions }) => {
  const navigation = useNavigation();

  const logoutAlert = async () => {
    const idToken = await AsyncStorage.getItem("idToken");

    await axios.post(
      `${SERVER_PORT}/users/${JSON.parse(idToken).user.email}/gestures`,
      {
        updatedGesture: gestureFunctions.current.data,
      },
      {
        headers: {
          idToken: idToken,
        },
      },
    );

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

export default forwardRef(LogoutWithUpdateGestureButton);
