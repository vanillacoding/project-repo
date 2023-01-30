import React, { useRef, useState } from "react";
import styled from "styled-components/native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Ionicons from "@expo/vector-icons/Ionicons";
import { SERVER_PORT, PACKAGE_SERVER_PORT } from "@env";
import { io } from "socket.io-client";
import { useFocusEffect } from "@react-navigation/native";
import COLORS from "../constants/COLORS";
import ToPreviousScreenButton from "../components/ToPreviousScreenButton";
import LogoutButton from "../components/LogoutButton";

const PcListScreen = ({ navigation }) => {
  const [recentPC, setRecentPc] = useState(null);
  const [connectableIpList, setConnectableIpList] = useState([]);
  const [isSettingButtonPressed, setIsSettingButtonPressed] = useState(false);
  const [customIp, setCustomIp] = useState("");

  const allConnectableIPs = useRef([]);

  const connectPc = async (pc) => {
    try {
      const idToken = await AsyncStorage.getItem("idToken");

      await axios.post(
        `${SERVER_PORT}/users/${JSON.parse(idToken).user.email}/pc`,
        { recentPc: { name: pc.ip, ipAddress: pc.ip } },
        {
          headers: {
            idToken: idToken,
          },
        },
      );
    } catch (error) {
      console.error(error);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      let localIp;

      (async () => {
        const params = { max: 1, by: "connected_at", order: "asc" };

        const idToken = await AsyncStorage.getItem("idToken");
        const recentPcData = await axios.get(
          `${SERVER_PORT}/users/${JSON.parse(idToken).user.email}/pc`,
          {
            params,
            headers: {
              idToken: idToken,
            },
          },
        );

        setRecentPc(() => recentPcData.data.recentPc);

        const connectableIpData = await axios.get(`${SERVER_PORT}/localIps/`, {
          headers: {
            idToken: idToken,
          },
        });

        localIp = connectableIpData.data.localIpAddress;

        for (let i = 0; i < localIp.length; i++) {
          io(`http://${localIp[i].ip}:${PACKAGE_SERVER_PORT}`).emit(
            "verify-connectable",
          );

          io(`http://${localIp[i].ip}:${PACKAGE_SERVER_PORT}`).on(
            "verify-connectable",
            (data) => {
              allConnectableIPs.current.push({ name: data, ip: data });
            },
          );
        }

        setTimeout(() => {
          setConnectableIpList(() => allConnectableIPs.current);
        }, 2000);
      })();

      return () => {
        for (let i = 0; i < localIp?.length; i++) {
          io(`http://${localIp[i].ip}:${PACKAGE_SERVER_PORT}`).off();
        }
      };
    }, []),
  );

  return (
    <PcListContainer>
      <ToPreviousScreenButton screen={"NetworkGuide"} />
      <PopularGestureSettingButton
        onPress={() => setIsSettingButtonPressed(!isSettingButtonPressed)}
      >
        <Ionicons name="settings" size={24} color={COLORS.MAIN_COLOR} />
        <PopularGestureSettingMenuBox
          style={
            isSettingButtonPressed
              ? { display: "flex" }
              : { display: "none", transform: [{ translateY: -80 }] }
          }
        >
          <PopularGestureSettingMenuTextBox
            onPress={() => {
              setConnectableIpList(() => allConnectableIPs.current);
            }}
          >
            <PopularGestureSettingMenuText>
              Select PC 새로고침
            </PopularGestureSettingMenuText>
          </PopularGestureSettingMenuTextBox>
          <LogoutButton />
        </PopularGestureSettingMenuBox>
      </PopularGestureSettingButton>
      <PcListHorizonBox
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={true}
      >
        <PcListBox>
          <PcListTitleBox>
            <PcListTitleText>Select PC</PcListTitleText>
          </PcListTitleBox>
          <PcListIps>
            {connectableIpList?.map((value, index) => {
              return (
                <PcListPc
                  key={index}
                  onPress={() => {
                    connectPc(value);
                    navigation.navigate("TouchPad", { ipAddress: value?.ip });
                  }}
                >
                  <Ionicons
                    name="desktop-sharp"
                    size={30}
                    color={COLORS.MAIN_COLOR}
                  />
                  <PcListPcName>{value?.ip}</PcListPcName>
                </PcListPc>
              );
            })}
          </PcListIps>
        </PcListBox>
        <PcListCustomIpBox>
          <PcListTitleBox>
            <PcListTitleText>Custom IP</PcListTitleText>
          </PcListTitleBox>
          <PcListCustomIpInput onChangeText={setCustomIp}></PcListCustomIpInput>
          <PcListCustomIpButton
            onPress={() => {
              connectPc({ ip: customIp, name: customIp });
              navigation.navigate("TouchPad", { ipAddress: customIp });
            }}
          >
            <PcListCustomIpButtonText>Connect</PcListCustomIpButtonText>
          </PcListCustomIpButton>
        </PcListCustomIpBox>
      </PcListHorizonBox>
      <PcListHorizonLine />
      <PcListTitleBox>
        <PcListTitleText>Recent PC</PcListTitleText>
      </PcListTitleBox>
      {recentPC?.name && (
        <PcListPc
          onPress={() => {
            navigation.navigate("TouchPad", { ipAddress: recentPC?.name });
          }}
        >
          <Ionicons name="desktop-sharp" size={30} color={COLORS.MAIN_COLOR} />
          <PcListPcName>{recentPC?.name}</PcListPcName>
          <PcListPcDate>
            {new Date(recentPC?.lastAccessDate).toLocaleString()}
          </PcListPcDate>
        </PcListPc>
      )}
    </PcListContainer>
  );
};

const PcListContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${COLORS.BACKGROUND_COLOR};
`;

const PcListTitleText = styled.Text`
  font-size: 50px;
`;

const PcListTitleBox = styled.View`
  justify-content: center;
  align-items: center;
  margin-bottom: 30px;
  color: #333333;
  z-index: -1;
`;

const PcListHorizonBox = styled.ScrollView`
  max-height: 300px;
  width: 210px;
  overflow-x: scroll;
`;

const PcListIps = styled.ScrollView`
  height: 200px;
  width: 200px;
`;

const PcListCustomIpBox = styled.View`
  justify-content: center;
  align-items: center;
  height: 200px;
  width: 210px;
`;

const PcListCustomIpInput = styled.TextInput`
  padding: 5px 5px;
  width: 180px;
  border: 1px solid #333333;
`;

const PcListCustomIpButton = styled.TouchableOpacity`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  margin-top: 30px;
  padding: 10px 40px;
  background-color: ${COLORS.MAIN_COLOR};
  border-radius: 10px;
`;

const PcListCustomIpButtonText = styled.Text`
  font-size: 15px;
  color: ${COLORS.BACKGROUND_COLOR};
`;

const PcListBox = styled.View`
  justify-content: flex-start;
  align-items: center;
  margin: 0px 5px;
  height: 150px;
  width: 200px; ;
`;

const PcListPc = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 20px;
  width: 160px;
`;

const PcListPcName = styled.Text`
  margin-left: 10px;
  font-size: 20px;
  color: #333333;
`;

const PcListPcDate = styled.Text`
  position: absolute;
  transform: translateX(32px) translateY(20px);
  margin-left: 10px;
  font-size: 10px;
  color: #333333;
`;

const PcListHorizonLine = styled.View`
  margin-top: 50px;
  margin-bottom: 40px;
  width: 200px;
  border: 1.2px solid #999999;
  opacity: 0.5;
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

const PopularGestureSettingMenuTextBox = styled.TouchableOpacity`
  display: flex;
  justify-content: center;
  align-items: flex-end;
  width: 166px;
  background-color: transparent;
`;

const PopularGestureSettingMenuText = styled.Text`
  padding: 10px 15px;
  font-size: 18px;
`;

export default PcListScreen;
