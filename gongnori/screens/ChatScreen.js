import React, { useCallback, useRef, useState, useEffect } from "react";
import { StyleSheet, View, TextInput, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector, useDispatch } from "react-redux";
import { StatusBar } from "expo-status-bar";
import PropTypes from "prop-types";

import _ from "lodash";
import socketio from "socket.io-client";
import { API_SERVER } from "@env";

import ChatItem from "../components/ChatItem";
import CustomButton from "../components/CustomButton";
import RegisterResultModal from "../components/RegisterResultModal";
import CompletionModal from "../components/CompletionModal";
import SpinnerLoading from "../components/SpinnerLoading";

import useHeaderRight from "../hooks/useHeaderRight";
import { viewCompletion } from "../actions/loadingActionCreators";
import { updateMyData } from "../actions/userActionCreators";

import * as colors from "../constants/colors";
import * as sizes from "../constants/sizes";
import * as params from "../constants/params";

const socket = socketio(API_SERVER);

export default function ChatScreen({ navigation, route }) {
  const { message } = route.params;

  const scrollRef = useRef(null);

  const [content, setContent] = useState("");
  const [conversations, setConverSations] = useState([]);
  const [isModal, setIsModal] = useState(false);
  const [isMatchFixed, setIsMatchFixed] = useState(message.isMatchFixed);

  const [isHeaderRightLoading, isCompletionShown] = useSelector((state) => {
    return [
      state.loading.isHeaderRightLoading,
      state.loading.isCompletionShown,
    ];
  }, (prev, next) => _.cloneDeep(prev) === _.cloneDeep(next));

  const userName = useSelector((state) => state.user.name);

  const dispatch = useDispatch();

  const isHost = userName.toLowerCase() === message.host.captin.toLowerCase();

  const handleChangeText = useCallback((value) => setContent(value), []);

  const handlePressSendBtn = _.throttle(() => {
    socket.emit("send-message", { name: userName, content });
    setContent("");
  }, params.THROTTLE_TIME);

  const handleModal = _.throttle(() => setIsModal(!isModal), params.THROTTLE_TIME);

  useEffect(() => {
    socket.emit("join-chat-room", message.id);
    socket.on("send-message", (data) => setConverSations(data));
    socket.on("load-message", (data) => setConverSations(data));
    socket.on("fix-match", () => {
      dispatch(viewCompletion());
      dispatch(updateMyData());
      setIsMatchFixed(true);
    });

    return () => {
      socket.emit("leave-chat-room", message.id, conversations);
      socket.off("send-message");
      socket.off("load-message");
    };
  }, []);

  useEffect(() => {
    scrollRef.current.scrollToEnd({ animated: false });
  }, [conversations]);

  useHeaderRight(
    { navigation, title: "진행하기", disabled: !isHost || isMatchFixed },
    { method: "PATCH", path: "match", data: message, socket }
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="white" barStyle="light-content" />
      <SpinnerLoading
        visible={isHeaderRightLoading}
        content={"Match Fixing..."}
      />
      <CompletionModal
        content={"경기가 확정되었습니다."}
        visible={isCompletionShown}
      />
      <RegisterResultModal
        visible={isModal}
        setIsModal={handleModal}
        message={message}
      />
      {
        isMatchFixed
        && (
          <CustomButton
            title={"경기결과 입력"}
            style={styles.resultBtn}
            onPress={handleModal}
          />
        )
      }
      <ScrollView
        ref={scrollRef}
        style={styles.chatting}
      >
        {conversations.map((conversation) => {
          return <ChatItem key={conversation["_id"]} chat={conversation} />;
        })}
      </ScrollView>
      <View style={styles.textInputBar}>
        <TextInput
          value={content}
          style={styles.textInput}
          autoCompleteType="off"
          onChangeText={handleChangeText}
        />
        <CustomButton
          title={"보내기"}
          style={styles.sendBtn}
          onPress={handlePressSendBtn}
        />
      </View>
    </SafeAreaView>
  );
}

ChatScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
  route: PropTypes.object.isRequired,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: colors.SECONDARY_GRAY,
  },
  resultBtn: {
    alignSelf: "center",
    width: 0.5 * sizes.DEVICE_WIDTH,
    height: 0.05 * sizes.DEVICE_HEIGHT,
    borderRadius: 10,
    backgroundColor: colors.PRIMARY_BLUE,
    color: colors.SECONDARY_WHITE,
  },
  chatting: {
    flex: 1,
    width: sizes.DEVICE_WIDTH,
  },
  textInputBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: sizes.DEVICE_WIDTH,
    height: 0.07 * sizes.DEVICE_HEIGHT,
    backgroundColor: colors.SECONDARY_BLUE,
  },
  textInput: {
    width: 0.75 * sizes.DEVICE_WIDTH,
    height: 0.05 * sizes.DEVICE_HEIGHT,
    margin: 10,
    borderRadius: 10,
    backgroundColor: colors.SECONDARY_WHITE,
  },
  sendBtn: {
    width: 0.15 * sizes.DEVICE_WIDTH,
    height: 0.05 * sizes.DEVICE_HEIGHT,
    marginRight: 10,
    borderRadius: 10,
    backgroundColor: colors.PRIMARY_BLUE,
    color: colors.SECONDARY_WHITE,
  },
  content: {
    width: 0.15 * sizes.DEVICE_WIDTH,
    height: 0.05 * sizes.DEVICE_HEIGHT,
    margin: 10,
    alignSelf: "flex-end",
    backgroundColor: colors.SECONDARY_BLUE,
  },
  modalButton: {
    flex: 1,
    alignItems: "center",
    bottom: 0.8 * sizes.DEVICE_HEIGHT,
    right: 0.4 * sizes.DEVICE_WIDTH,
    backgroundColor: colors.SECONDARY_GRAY,
  },
});
