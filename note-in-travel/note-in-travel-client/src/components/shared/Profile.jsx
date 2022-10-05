import React from "react";
import {
  View,
  Image,
  Text,
  StyleSheet,
} from "react-native";

function Profile({ photoUrl, name }) {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.greet}>Hello,</Text>
        <Text style={styles.name}>{name}</Text>
      </View>
      <Image
        style={styles.photo}
        source={{ uri: photoUrl }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "10%",
    marginTop: "5%",
    paddingHorizontal: 60,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  photo: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  greet: {
    fontSize: 15,
    fontWeight: "bold",
  },
  name: {
    paddingLeft: 30,
    fontSize: 30,
    fontWeight: "bold",
  },
});

export default Profile;
