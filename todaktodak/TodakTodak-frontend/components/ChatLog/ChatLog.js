import React from "react";
import { View, Text } from "react-native";
import { useSelector } from "react-redux";

import styles from "./styles";
import formatDate from "../../utils/getDate";

import { TEST_ID } from "../../constants/testContents";

const ChatLog = ({
  comment,
  createdAt,
  userNickname,
  systemMessage
}) => {
  const { nickname } = useSelector((state) => state.user);

  if (systemMessage) {
    return (
      <View style={styles.systemMessage}>
        <Text>{systemMessage}</Text>
      </View>
    );
  }

  return (
    <View
      style={
        userNickname === nickname
          ? styles.myChatInfo
          : styles.friendChatInfo
      }
    >
      <Text style={styles.nickname}>
        {userNickname}
      </Text>
      <View
        testID={TEST_ID}
        style={
          userNickname === nickname
            ? styles.myChatBox
            : styles.friendChatBox
        }
      >
        <Text style={styles.chatText}>
          {comment}
        </Text>
        <Text style={styles.chatDate}>
          {formatDate(createdAt)}
        </Text>
      </View>
    </View>
  );
}

export default React.memo(ChatLog);
