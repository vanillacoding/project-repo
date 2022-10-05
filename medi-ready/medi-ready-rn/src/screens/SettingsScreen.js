import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

import { logout } from "../redux/reducers/userSlice";

const SettingsScreen = ({ navigation }) => {
  const userInfo = useSelector((state) => state.user.userInfo);

  const { name, picture } = userInfo;

  const dispatch = useDispatch();

  const googleLogout = () => {
    dispatch(logout());
  };

  return (
    <View style={styles.container}>
      <View style={styles.userInformation}>
        <Image
          style={styles.profileImage}
          source={{ uri: picture }}
        />
        <Text style={styles.userName}>{name}</Text>
      </View>

      <View style={styles.settingOptions}>
        <TouchableOpacity style={styles.alarmSetting} onPress={() => navigation.navigate("Alarm Setting")}>
          <MaterialCommunityIcons name="alarm" size={25} color="#006FF3" />
          <Text style={styles.alarmSettingText}>알림 시간 설정</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.logoutOption} onPress={googleLogout}>
          <MaterialCommunityIcons name="logout" size={25} color="#006FF3" />
          <Text style={styles.logoutText}>로그아웃</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  userInformation: {
    alignItems: "center",
  },
  profileImage: {
    width: 100,
    height: 100,
    marginTop: 70,
    borderRadius: 50,
  },
  userName: {
    marginTop: 24,
    fontSize: 20,
    fontWeight: "500",
  },
  settingOptions: {
    marginTop: 80,
    paddingRight: 20,
  },
  alarmSetting: {
    flexDirection: "row",
    alignItems: "center",
  },
  alarmSettingText: {
    fontSize: 22,
    marginLeft: 20,
  },
  logoutOption: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
  },
  logoutText: {
    fontSize: 20,
    marginLeft: 20,
  },
});

export default SettingsScreen;
