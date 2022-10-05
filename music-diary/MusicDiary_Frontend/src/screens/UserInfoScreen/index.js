import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Text, View, Button, StyleSheet } from "react-native";
import { clearAccessToken, clearUser } from "../../redux/slices/userSlice";
import { clearDiary } from "../../redux/slices/diarySlice";
import { clearMusicStatus } from "../../redux/slices/musicSlice";

const UserInfoScreen = () => {
  const dispatch = useDispatch();
  const { userName, email } = useSelector((state) => state.user.userInfo);

  const handleLogoutClick = async () => {
    try {
      await dispatch(clearAccessToken());
      dispatch(clearUser());
      dispatch(clearDiary());
      dispatch(clearMusicStatus());
    } catch (err) {
      console.error("failed to clear Token with logout", err);
    }
  };

  return (
    <View style={styles.infoContainer}>
      <View styles={styles.container}>
        <Text style={styles.name}>{userName}</Text>
        <Text style={styles.email}>{email}</Text>
      </View>
      <Button onPress={handleLogoutClick} title="Logout" />
    </View>
  );
};

const styles = StyleSheet.create({
  name: {
    justifyContent: "center",
    width: 200,
    height: 30,
    textAlign: "center",
    fontSize: 20,
  },
  email: {
    justifyContent: "center",
  },
  infoContainer: {
    width: 400,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    height: 300,
  },
  container: {
    justifyContent: "center",
    alignItems: "center",
    width: 400,
    height: 400,
  },
});

export default UserInfoScreen;
