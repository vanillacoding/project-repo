import { StyleSheet } from "react-native";

import {
  BLACK,
  YELLOW,
  FRIEND_CHAT_BACKGROUND
} from "../../constants/color";

const styles = StyleSheet.create({
  myChatInfo: {
    justifyContent: "flex-end",
    alignItems: "flex-end",
    margin: 5,
    padding: 10
  },
  friendChatInfo: {
    justifyContent: "flex-start",
    alignItems: "flex-start",
    margin: 5,
    padding: 10,
  },
  nickname: {
    fontSize: 15,
    fontWeight: "bold"
  },
  myChatBox: {
    minWidth: "20%",
    minHeight: 40,
    justifyContent: "flex-start",
    alignItems: "flex-end",
    marginTop: 5,
    padding: 10,
    backgroundColor: YELLOW,
    borderRadius: 7
  },
  friendChatBox: {
    minWidth: "20%",
    minHeight: 40,
    justifyContent: "center",
    alignItems: "flex-start",
    marginTop: 5,
    padding: 5,
    backgroundColor: FRIEND_CHAT_BACKGROUND,
    borderRadius: 7
  },
  chatText: {
    fontSize: 15,
    fontWeight: "bold",
    color: BLACK
  },
  chatDate: {
    fontSize: 10
  },
  systemMessage: {
    alignItems: "center",
    fontWeight: "bold"
  }
});

export default styles;
