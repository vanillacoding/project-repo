import React from "react";
import { View, SafeAreaView, StatusBar, Image } from "react-native";

import styles from "./styles";

const Header = ({ logo }) => {
  return (
    <>
      {logo ? (
        <View>
          <SafeAreaView style={styles.statusBar}>
            <StatusBar />
          </SafeAreaView>
          <View style={styles.header}>
            <Image
              style={styles.img}
              source={require("../../../../assets/header_logo.png")}
            />
          </View>
        </View>
      ) : (
        <View>
          <View style={styles.statusBar}>
            <SafeAreaView>
              <StatusBar translucent />
            </SafeAreaView>
          </View>
        </View>
      )}
    </>
  );
};

export default Header;
