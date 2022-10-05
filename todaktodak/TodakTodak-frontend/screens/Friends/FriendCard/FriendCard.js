import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";

import Button from "../../../components/Button/Button";

import {
  rejectWaitingFriend,
  acceptWaitingFriend
} from "../../../redux/userSlice";

import styles from "./styles";

import {
  FRIEND,
  PENDING,
  CHECK_STATUS,
  REJECT_FRIEND,
  REQUEST_FRIEND,
  RECEIVE_REJECT,
  SENDING_PENDING,
  RECEIVE_PENDING
} from "../../../constants/friendStatus";
import { CHAT_ROOM } from "../../../constants/navigationName";

import avatar from "../../../assets/pngs/avatar.png";

const FriendCard = ({ friend }) => {
  const [friendStatus, setFriendStatus] = useState("");

  const dispatch = useDispatch();
  const navigation = useNavigation();
  const user = useSelector((state) => state.user);

  const {
    status,
    friendInfo,
    chatRoomId,
    unreadMessageCount
  } = friend;

  useEffect(() => {
    switch (status) {
      case SENDING_PENDING:
        setFriendStatus(PENDING);
        break;

      case RECEIVE_PENDING:
        setFriendStatus(CHECK_STATUS);
        break;

      case RECEIVE_REJECT:
        setFriendStatus(REJECT_FRIEND);
        break;

      default:
        setFriendStatus(FRIEND);
        break;
    }
  }, [friend]);

  const handleEnterChatRoomClick = () => {
    navigation.navigate(CHAT_ROOM, {
      user,
      friendInfo,
      chatRoomId
    });
  };

  const acceptFriend = async () => {
    const requestInfo = {
      friendEmail: friendInfo.email,
      accessToken: user.accessToken
    };

    dispatch(acceptWaitingFriend(requestInfo));
  };

  const rejectFriend = async () => {
    const requestInfo = {
      friendEmail: friendInfo.email,
      accessToken: user.accessToken
    };

    dispatch(rejectWaitingFriend(requestInfo));
  };

  return (
    <View
      style={styles.friend}
      key={friendInfo.nickname}
    >
      <View style={styles.friendInfoWrapper}>
        <Image
          source={avatar}
          style={styles.friendAvatar}
        />
        <View style={styles.friendInfo}>
          <Text style={styles.friendName}>
            {friendStatus === `${PENDING}:` ? `${REQUEST_FRIEND}:` : ""}{" "}
            {friendInfo.nickname}
          </Text>
          {friendStatus !== FRIEND &&
            <Text style={styles.friendStatusText}>
              {friendStatus}
            </Text>
          }
        </View>
      </View>
      {friendStatus === CHECK_STATUS &&
        <View style={styles.buttons}>
          <Button
            text="수락"
            textStyle={styles.buttonText}
            buttonStyle={styles.friendButton}
            handleClick={acceptFriend}
          />
          <Button
            text="거절"
            textStyle={styles.buttonText}
            buttonStyle={styles.friendButton}
            handleClick={rejectFriend}
          />
        </View>
      }
      {friendStatus === REJECT_FRIEND &&
        <View style={styles.buttons}>
          <Button
            text="삭제"
            textStyle={styles.buttonText}
            buttonStyle={styles.friendButton}
            handleClick={rejectFriend}
          />
        </View>
      }
      {friendStatus === FRIEND &&
        <View style={styles.buttons}>
          <Button
            text="채팅하기"
            textStyle={styles.buttonText}
            buttonStyle={styles.friendButton}
            handleClick={handleEnterChatRoomClick}
          />
          <View style={styles.unreadMessageCount}>
            <Text style={styles.unreadMessageCountText}>
              {unreadMessageCount}
            </Text>
          </View>
        </View>
      }
    </View>
  );
}

export default React.memo(FriendCard);
