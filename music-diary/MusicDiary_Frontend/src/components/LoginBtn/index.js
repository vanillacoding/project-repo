import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Entypo } from "@expo/vector-icons";
import styles from "./styles";

const LoginBtn = ({ onPressLoginBtn }) => {
  return (
    <View style={styles.loginWrapper}>
      <View style={styles.card}>
        <View>
          <Text style={styles.musicDiaryText}>MUSIC DIARY</Text>
        </View>
        <Text style={styles.descText}>Keep your own playlist</Text>
      </View>
      <TouchableOpacity onPress={onPressLoginBtn} style={styles.loginBox}>
        <Entypo style={styles.spotify} name="spotify" size={24} color="black" />
        <Text style={styles.loginText}>LOGIN WITH SPOTIFY</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginBtn;
