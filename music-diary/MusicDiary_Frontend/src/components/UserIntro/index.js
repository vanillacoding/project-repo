import React from "react";
import { Text, View } from "react-native";

import styles from "./styles";

const UserIntro = ({ userName }) => {
  return (
    <View style={styles.userIntroWrapper}>
      <View style={styles.userInfo}>
        <Text style={styles.userName}>Hi, {userName}</Text>
        <Text style={styles.desc}>Searching your diary within 50m...</Text>
      </View>
    </View>
  );
};

export default UserIntro;
