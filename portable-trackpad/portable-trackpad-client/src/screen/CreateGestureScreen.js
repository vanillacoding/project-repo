import React, { useRef, useState } from "react";
import { Alert, Animated } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Ionicons from "@expo/vector-icons/Ionicons";
import { SERVER_PORT } from "@env";
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from "react-native-gesture-handler";
import styled from "styled-components/native";
import COLORS from "../constants/COLORS";
import axios from "axios";
import { useFocusEffect } from "@react-navigation/native";
import LogoutButton from "../components/LogoutButton";
import ToNextScreenTextButton from "../components/ToNextScreenTextButton";
import ToPreviousScreenButton from "../components/ToPreviousScreenButton";

const CreateGestureScreen = ({ route }) => {
  const [isSettingButtonPressed, setIsSettingButtonPressed] = useState(false);
  const [isCreateMode, setIsCreateMode] = useState(false);

  const traceGesture = useRef([]);
  const userCustom = useRef(null);

  const drawingGesture = Gesture.Pan();
  const createGesture = Gesture.Pan();

  let traceCount = 0;
  let traceArray = [];

  createGesture.onStart(() => {
    traceGesture.current.length = 0;
  });

  createGesture.onUpdate((event) => {
    traceCount++;

    if (traceCount > 3) {
      traceGesture.current.push([event.absoluteX, event.absoluteY]);

      traceCount = 0;
    }
  });

  createGesture.onEnd(async () => {
    const idToken = await AsyncStorage.getItem("idToken");

    await axios.post(
      `${SERVER_PORT}/users/${JSON.parse(idToken).user.email}/customGesture`,
      {
        path: traceGesture.current,
      },
      {
        headers: {
          idToken: idToken,
        },
      },
    );

    Alert.alert(
      "Gesture creation success",
      "제스처가 성공적으로 생성되었습니다.",
      [
        {
          text: "확인",
        },
      ],
    );
  });

  drawingGesture.onStart(async () => {
    traceGesture.current = userCustom.current.data.customGesture.path;
  });

  drawingGesture.onUpdate((event) => {
    traceArray = [...traceGesture.current];

    for (let i = 0; i < traceArray.length; i++) {
      if (
        event.absoluteX + 45 > traceArray[i][0] &&
        event.absoluteX - 45 < traceArray[i][0] &&
        event.absoluteY + 51 > traceArray[i][1] &&
        event.absoluteY - 51 < traceArray[i][1]
      ) {
        traceArray.splice(1, i);
      }
    }
  });

  drawingGesture.onEnd(() => {
    if (traceArray.length < 4) {
      Alert.alert("Gesture recognized", "제스처가 정상적으로 인식되었습니다.", [
        {
          text: "확인",
        },
      ]);
    } else {
      Alert.alert(
        "Gesture recognition failure",
        "제스처 인식이 실패했습니다.",
        [
          {
            text: "확인",
          },
        ],
      );
    }

    traceArray.length = 0;
  });

  const composedGesture = isCreateMode
    ? Gesture.Race(createGesture)
    : Gesture.Race(drawingGesture);

  useFocusEffect(
    React.useCallback(() => {
      (async () => {
        const idToken = await AsyncStorage.getItem("idToken");

        userCustom.current = await axios.get(
          `${SERVER_PORT}/users/${
            JSON.parse(idToken).user.email
          }/customGesture`,
          {
            headers: {
              idToken: idToken,
            },
          },
        );
      })();
    }, []),
  );

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <TouchPadContainer>
        <ToPreviousScreenButton
          screen={"EditGesture"}
          props={{
            ipAddress: route.params.ipAddress,
          }}
        />
        <TouchPadSettingButton
          onPress={() => setIsSettingButtonPressed(!isSettingButtonPressed)}
        >
          <Ionicons name="settings" size={24} color={COLORS.MAIN_COLOR} />
          <Animated.View>
            <TouchPadSettingMenuBox
              style={
                isSettingButtonPressed
                  ? { display: "flex" }
                  : { display: "none", transform: [{ translateY: -80 }] }
              }
            >
              <ToNextScreenTextButton
                screen={"EditGesture"}
                text={"제스처 편집"}
                props={{ ipAddress: route.params.ipAddress }}
              />
              <LogoutButton />
            </TouchPadSettingMenuBox>
          </Animated.View>
        </TouchPadSettingButton>
        <TouchPadSwitchBox>
          <TouchPadSwitchText>
            {isCreateMode ? "Create Gesture Mode" : "Gesture Test Mode"}
          </TouchPadSwitchText>
          <TouchPadSwitch
            trackColor={{ false: "#767577", true: `${COLORS.MAIN_COLOR}` }}
            thumbColor={isCreateMode ? "#767577" : `${COLORS.MAIN_COLOR}`}
            ios_backgroundColor="#3e3e3e"
            onValueChange={() =>
              setIsCreateMode((previousState) => !previousState)
            }
            value={isCreateMode}
          />
        </TouchPadSwitchBox>
        <GestureDetector gesture={composedGesture}>
          <TrackPadTouchArea></TrackPadTouchArea>
        </GestureDetector>
      </TouchPadContainer>
    </GestureHandlerRootView>
  );
};

const TouchPadContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${COLORS.BACKGROUND_COLOR};
`;

const TouchPadSettingButton = styled.TouchableOpacity`
  position: absolute;
  display: flex;
  justify-content: flex-start;
  align-items: flex-end;
  top: 55px;
  right: 20px;
`;

const TouchPadSettingMenuBox = styled.View`
  display: flex;
  justify-content: center;
  align-items: flex-end;
  margin-top: 10px;
  background-color: white;
  border: 1px solid #888888;
  border-radius: 10px;
`;

const TouchPadSwitchBox = styled.View`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  top: 45px;
`;

const TouchPadSwitchText = styled.Text`
  font-size: 15px;
`;

const TouchPadSwitch = styled.Switch`
  transform: translateY(-10px);
`;

const TrackPadTouchArea = styled.TouchableOpacity`
  margin-top: 15%;
  height: 80%;
  width: 90%;
  background-color: transparent;
  border: 3px solid ${COLORS.MAIN_COLOR};
  border-radius: 20px;
  opacity: 0.2;
  z-index: -1;
`;

export default CreateGestureScreen;
