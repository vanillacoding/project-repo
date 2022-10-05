import { StyleSheet } from "react-native";

import {
  WHITE,
  BLACK,
  CORAL,
  YELLOW,
  TRANSPARENCY,
  UNREAD_MESSAGE_COUNT
} from "../../../constants/color";

const styles = StyleSheet.create({
  friend: {
    width: "90%",
    height: 70,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    margin: 10,
    marginLeft: 20,
    padding: 5,
    borderRadius: 10,
    backgroundColor: WHITE,
  },
  friendInfoWrapper: {
    width: "60%",
    marginLeft: 15,
    flexDirection: "row",
    alignItems: "center"
  },
  friendInfo: {
    justifyContent: "center"
  },
  friendAvatar: {
    width: 35,
    height: 35,
    borderRadius: 50,
    backgroundColor: YELLOW,
    marginRight: 10
  },
  friendName: {
    fontSize: 15
  },
  friendStatusText: {
    color: CORAL,
    fontSize: 15
  },
  buttons: {
    width: "50%",
    flexDirection: "row",
    alignItems: "center"
  },
  friendButton: {
    width: "20%",
    minWidth: "20%",
    backgroundColor: TRANSPARENCY
  },
  buttonText: {
    fontSize: 13,
    color: BLACK
  },
  unreadMessageCount: {
    width: "auto",
    height: 20,
    paddingLeft: 5,
    paddingRight: 5,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: UNREAD_MESSAGE_COUNT,
    borderRadius: 5
  },
  unreadMessageCountText: {
    color: WHITE
  }
});

export default styles;
