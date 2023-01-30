import Ionicons from "@expo/vector-icons/Ionicons";
import styled from "styled-components/native";
import { useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import React from "react";
import LogoutButton from "../components/LogoutButton";
import ToNextScreenTextButton from "../components/ToNextScreenTextButton";
import ToPreviousScreenButton from "../components/ToPreviousScreenButton";

const PopularGestureScreen = ({ route }) => {
  const [isSettingButtonPressed, setIsSettingButtonPressed] = useState(false);
  const [gestureData, setGestureData] = useState([]);

  useFocusEffect(
    React.useCallback(() => {
      (async () => {
        const gestureList = route.params.userGestures;

        for (let i = 0; i < gestureList.length; i++) {
          setGestureData((oldArray) => [
            ...oldArray,
            {
              action: gestureList[i].action,
              count: gestureList[i].count,
            },
          ]);
        }
      })();
    }, []),
  );

  return (
    <PopularGestureContainer>
      <ToPreviousScreenButton
        screen={"TouchPad"}
        props={{ ipAddress: route.params.ipAddress }}
      />
      <PopularGestureSettingButton
        onPress={() => setIsSettingButtonPressed(!isSettingButtonPressed)}
      >
        <Ionicons name="settings" size={24} color="#7e94ae" />
        <PopularGestureSettingMenuBox
          style={
            isSettingButtonPressed
              ? { display: "flex" }
              : { display: "none", transform: [{ translateY: -80 }] }
          }
        >
          <ToNextScreenTextButton
            screen={"EditGesture"}
            text={"제스처 편집"}
            props={{
              ipAddress: route.params.ipAddress,
            }}
          />
          <LogoutButton />
        </PopularGestureSettingMenuBox>
      </PopularGestureSettingButton>
      <PopularGestureTextBox>
        <PopularGestureTitleBox>
          <PopularGestureTitleText>제스처</PopularGestureTitleText>
          <PopularGestureTitleText>사용 횟수</PopularGestureTitleText>
        </PopularGestureTitleBox>
        {gestureData.length > 0 ? (
          gestureData.map((value, index) => {
            return (
              <React.Fragment key={index}>
                <PopularGestureListBox>
                  <PopularGestureActionBox>
                    <PopularGestureListText>
                      {value.action}
                    </PopularGestureListText>
                  </PopularGestureActionBox>
                  <PopularGestureCountBox>
                    <PopularGestureListText>
                      {value.count}
                    </PopularGestureListText>
                  </PopularGestureCountBox>
                </PopularGestureListBox>
                <PopularGestureHorizonLine />
              </React.Fragment>
            );
          })
        ) : (
          <LoadingText>불러오는 중입니다...</LoadingText>
        )}
      </PopularGestureTextBox>
    </PopularGestureContainer>
  );
};

const PopularGestureContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: #f3eee6;
`;

const PopularGestureTextBox = styled.View`
  display: flex;
  justify-content: center;
  align-self: center;
`;

const PopularGestureTitleBox = styled.View`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  padding: 0 50px;
`;

const PopularGestureListBox = styled.View`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  padding: 0 5px;
`;

const PopularGestureTitleText = styled.Text`
  margin: 30px 0;
  font-size: 20px;
  font-weight: bold;
  text-align: center;
  color: #333333;
`;

const PopularGestureActionBox = styled.TouchableOpacity`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  width: 160px;
`;

const PopularGestureCountBox = styled.TouchableOpacity`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  width: 110px;
`;

const PopularGestureListText = styled.Text`
  font-size: 15px;
  text-align: center;
  color: #333333;
`;

const PopularGestureHorizonLine = styled.View`
  margin: 10px 0px;
  width: 300px;
  border: 1.2px solid #999999;
  opacity: 0.2;
`;

const PopularGestureSettingButton = styled.TouchableOpacity`
  position: absolute;
  display: flex;
  justify-content: flex-start;
  align-items: flex-end;
  top: 55px;
  right: 20px;
`;

const PopularGestureSettingMenuBox = styled.View`
  display: flex;
  justify-content: center;
  align-items: flex-end;
  margin-top: 10px;
  background-color: white;
  border: 1px solid #888888;
  border-radius: 10px;
`;

const LoadingText = styled.Text`
  font-size: 18px;
`;

export default PopularGestureScreen;
