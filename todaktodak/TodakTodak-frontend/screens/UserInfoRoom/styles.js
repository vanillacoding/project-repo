import { StyleSheet } from "react-native";

import {
  WHITE,
  LOGOUT_BACKGROUND
} from "../../constants/color";

const styles = StyleSheet.create({
  backgroundContainer: {
    width: "100%",
    height: "100%"
  },
  userRoomContainer: {
    width: "100%",
    height: "100%",
    alignItems: "center"
  },
  userInfoWrapper: {
    margin: 20,
    marginTop: 100
  },
  userInfo: {
    margin: 10,
    fontSize: 20,
    fontWeight: "bold",
    color: WHITE
  },
  logoutButton: {
    width: "60%",
    height: "7%",
    alignItems: "center",
    paddingLeft: 20,
    backgroundColor: LOGOUT_BACKGROUND
  }
});

export default styles;
