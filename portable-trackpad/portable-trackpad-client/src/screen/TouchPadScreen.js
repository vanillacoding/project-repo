import React, { useRef, useState } from "react";
import { Animated } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { io } from "socket.io-client";
import Ionicons from "@expo/vector-icons/Ionicons";
import { SERVER_PORT, PACKAGE_SERVER_PORT } from "@env";
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from "react-native-gesture-handler";
import styled from "styled-components/native";
import axios from "axios";
import COLORS from "../constants/COLORS";
import LogoutWithUpdateGestureButton from "../components/LogoutWithUpdateGestureButton";
import ToNextScreenTextButton from "../components/ToNextScreenTextButton";
import ToPreviousScreenButton from "../components/ToPreviousScreenButton";

const TouchPadScreen = ({ route }) => {
  const [isSettingButtonPressed, setIsSettingButtonPressed] = useState(false);
  const [isDrawingMode, setIsDrawingMode] = useState(false);

  const xPosition = useRef(0);
  const yPosition = useRef(0);
  const startXPosition = useRef(0);
  const startYPosition = useRef(0);
  const prevXPosition = useRef(0);
  const prevYPosition = useRef(0);
  const traceGesture = useRef([]);
  const userCustom = useRef(null);
  const gestureFunctions = useRef({
    data: {
      gesture: [],
    },
  });

  const socket = io(`http://${route.params.ipAddress}:${PACKAGE_SERVER_PORT}`);

  let rotateCount = 0;
  let prevAngle = -1;
  let cornerCount = 0;
  let traceArray = [];

  const panGesture = Gesture.Pan();
  const fourPointPanGesture = Gesture.Pan();
  const twoPointPanGesture = Gesture.Pan();
  const tapGesture = Gesture.Tap();
  const rotationGesture = Gesture.Rotation();
  const drawingGesture = Gesture.Pan();
  const pinchGesture = Gesture.Pinch();
  const customGesture = Gesture.Pan();

  fourPointPanGesture.minPointers(4);
  fourPointPanGesture.maxPointers(4);
  twoPointPanGesture.minPointers(2);
  twoPointPanGesture.maxPointers(2);
  drawingGesture.maxPointers(2);
  drawingGesture.minPointers(1);

  tapGesture.onTouchesUp((event) => {
    if (event.numberOfTouches === 0) {
      socket.emit("user-send", ["click"]);
    } else if (event.numberOfTouches === 1) {
      socket.emit("user-send", [
        gestureFunctions.current.data.gesture[2].function,
      ]);
    }
  });

  panGesture.onStart((event) => {
    if (event.numberOfPointers === 3) {
      socket.emit("user-send", ["dragDown"]);
    }
  });

  panGesture.onUpdate((event) => {
    if (event.numberOfPointers === 1 || event.numberOfPointers === 3) {
      socket.emit("user-send", [
        "move",
        parseInt(event.absoluteX) - xPosition.current,
        parseInt(event.absoluteY) - yPosition.current,
      ]);
    }

    xPosition.current = parseInt(event.absoluteX);
    yPosition.current = parseInt(event.absoluteY);
  });

  panGesture.onTouchesUp((event) => {
    if (event.numberOfTouches === 2) {
      socket.emit("user-send", ["dragUp"]);
    }
  });

  fourPointPanGesture.onEnd((event) => {
    if (event.translationX > 0) {
      socket.emit("user-send", [
        gestureFunctions.current.data.gesture[4].function,
      ]);
      gestureFunctions.current.data.gesture[4].count++;
    } else {
      socket.emit("user-send", [
        gestureFunctions.current.data.gesture[3].function,
      ]);
      gestureFunctions.current.data.gesture[3].count++;
    }
  });

  twoPointPanGesture.onUpdate((event) => {
    if (event.numberOfPointers === 2) {
      socket.emit("user-send", [
        "scroll",
        0,
        (parseInt(event.absoluteY) - yPosition.current) * 4,
      ]);
    }

    xPosition.current = parseInt(event.absoluteX);
    yPosition.current = parseInt(event.absoluteY);
  });

  twoPointPanGesture.onEnd((event) => {
    if (event.translationX < 0 && Math.abs(event.translationY) < 10) {
      socket.emit("user-send", [
        gestureFunctions.current.data.gesture[1].function,
      ]);
      gestureFunctions.current.data.gesture[1].count++;
    } else if (event.translationX > 0 && Math.abs(event.translationY) < 10) {
      socket.emit("user-send", [
        gestureFunctions.current.data.gesture[0].function,
      ]);
      gestureFunctions.current.data.gesture[0].count++;
    }
  });

  rotationGesture.onUpdate((event) => {
    rotateCount++;

    if (event.numberOfPointers === 3 && rotateCount > 10) {
      if (event.rotation > 0) {
        socket.emit("user-send", ["volumeUp", event.rotation]);
      } else {
        socket.emit("user-send", ["volumeDown", event.rotation]);
      }

      rotateCount = 0;
    }
  });

  drawingGesture.onStart((event) => {
    startXPosition.current = event.absoluteX;
    startYPosition.current = event.absoluteY;
    prevXPosition.current = startXPosition.current;
    prevYPosition.current = startYPosition.current;
  });

  drawingGesture.onUpdate((event) => {
    const changeX = prevXPosition.current - event.absoluteX;
    const changeY = prevYPosition.current - event.absoluteY;

    if (Math.abs(changeX) > 50 || Math.abs(changeY) > 50) {
      const radian = Math.atan2(changeY, changeX);
      const degree = (radian * 180) / Math.PI;

      prevXPosition.current = event.absoluteX;
      prevYPosition.current = event.absoluteY;

      if (prevAngle !== -1) {
        let angleChange = Math.abs(prevAngle - degree);

        angleChange = angleChange > 180 ? 360 - angleChange : angleChange;

        if (angleChange > 50) {
          cornerCount++;
        }
      }

      prevAngle = degree;
    }
  });

  drawingGesture.onEnd((event) => {
    let distanceX = startXPosition.current - event.absoluteX;
    let distanceY = startYPosition.current - event.absoluteY;

    startXPosition.current;
    startYPosition.current;

    if (Math.abs(distanceX) > 80 || Math.abs(distanceY) > 80) {
      cornerCount = 0;
      prevAngle = -1;

      return;
    }

    if (cornerCount === 3) {
      socket.emit("drawingGesture", ["square"]);
    } else if (cornerCount === 2) {
      socket.emit("drawingGesture", ["triangle"]);
    } else {
      socket.emit("drawingGesture", ["circle"]);
    }

    cornerCount = 0;
    prevAngle = -1;
  });

  customGesture.onBegin(async () => {
    traceGesture.current = userCustom.current.data.customGesture.path;
  });

  customGesture.onUpdate((event) => {
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

  customGesture.onEnd(async () => {
    if (traceArray.length < 4) {
      socket.emit("user-send", [
        userCustom.current.data.customGesture.function,
      ]);
    }

    traceArray.length = 0;
  });

  pinchGesture.onUpdate((event) => {
    if (event.scale > 1) {
      socket.emit("drawingGesture", ["scaleUp"]);
    } else {
      socket.emit("drawingGesture", ["scaleDown"]);
    }
  });

  const composedDrawingGesture = Gesture.Race(pinchGesture, drawingGesture);

  const composedGeneralGesture = Gesture.Simultaneous(
    Gesture.Race(panGesture, tapGesture, rotationGesture),
    fourPointPanGesture,
    twoPointPanGesture,
    customGesture,
  );

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

        gestureFunctions.current = await axios.get(
          `${SERVER_PORT}/users/${JSON.parse(idToken).user.email}/gestures`,
          {
            headers: {
              idToken: idToken,
            },
          },
        );
      })();

      return () => {
        (async () => {
          const idToken = await AsyncStorage.getItem("idToken");

          if (idToken) {
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
          }
        })();

        socket.off();
      };
    }, []),
  );

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <TouchPadContainer>
        <ToPreviousScreenButton screen={"PcList"} />
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
              <TouchPadSettingMenuTextBox
                onPress={() => {
                  socket.emit("user-send", ["openGestureDrawing"]);
                }}
              >
                <TouchPadSettingMenuText>
                  Gesture Drawing
                </TouchPadSettingMenuText>
              </TouchPadSettingMenuTextBox>
              <ToNextScreenTextButton
                screen={"EditGesture"}
                text={"제스처 편집"}
                props={{ ipAddress: route.params.ipAddress }}
              />
              <ToNextScreenTextButton
                screen={"PopularGesture"}
                text={"자주 사용하는 제스처"}
                props={{
                  ipAddress: route.params.ipAddress,
                  userGestures: gestureFunctions.current.data.gesture,
                }}
              />
              <LogoutWithUpdateGestureButton ref={{ gestureFunctions }} />
            </TouchPadSettingMenuBox>
          </Animated.View>
        </TouchPadSettingButton>
        <TouchPadSwitchBox>
          <TouchPadSwitchText>
            {isDrawingMode ? "Drawing Mode" : "General Mode"}
          </TouchPadSwitchText>
          <TouchPadSwitch
            trackColor={{ false: "#767577", true: `${COLORS.MAIN_COLOR}` }}
            thumbColor={isDrawingMode ? "#767577" : `${COLORS.MAIN_COLOR}`}
            ios_backgroundColor="#3e3e3e"
            onValueChange={() =>
              setIsDrawingMode((previousState) => !previousState)
            }
            value={isDrawingMode}
          />
        </TouchPadSwitchBox>
        <GestureDetector
          gesture={composedDrawingGesture}
          style={{ display: isDrawingMode ? "flex" : "none" }}
        >
          <TrackPadTouchArea
            style={{ display: isDrawingMode ? "flex" : "none" }}
          ></TrackPadTouchArea>
        </GestureDetector>
        <GestureDetector
          gesture={composedGeneralGesture}
          style={{ display: !isDrawingMode ? "flex" : "none" }}
        >
          <TrackPadTouchArea
            style={{ display: !isDrawingMode ? "flex" : "none" }}
          ></TrackPadTouchArea>
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

const TouchPadSettingMenuTextBox = styled.TouchableOpacity`
  display: flex;
  justify-content: center;
  align-items: flex-end;
  width: 180px;
  background-color: transparent;
`;

const TouchPadSettingMenuText = styled.Text`
  padding: 10px 15px;
  font-size: 18px;
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

export default TouchPadScreen;
