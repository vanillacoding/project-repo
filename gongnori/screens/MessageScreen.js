import React, { useEffect } from "react";
import { StyleSheet, View, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import _ from "lodash";

import MessageHeader from "../components/MessageHeader";
import MessageItem from "../components/MessageItem";
import SpinnerLoading from "../components/SpinnerLoading";

import { getMyMessage } from "../actions/userActionCreators";

export default function MessageScreen({ navigation }) {
  const isMessageLoading = useSelector((state) => {
    return state.loading.isMessageLoading;
  });

  const messages = useSelector((state) => {
    return state.user.messages;
  }, (prev, next) => _.cloneDeep(prev) === _.cloneDeep(next));

  const matchFilterStatus = useSelector((state) => state.app.matchFilterStatus);

  const filterMessages = messages.filter((message) => {
    return message.isMatchFixed === matchFilterStatus;
  });

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMyMessage());
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <SpinnerLoading
        visible={isMessageLoading}
        content={"Message Loading..."}
      />
      <MessageHeader />
      <View style={styles.body}>
        <FlatList
          style={{ width: "100%" }}
          contentContainerStyle={{ justifyContent: "flex-end", alignItems: "center" }}
          keyExtractor={(item) => item.id}
          data={filterMessages}
          renderItem={({ item }) => <MessageItem item={item} navigation={navigation} />}
        />
      </View>
    </SafeAreaView>
  );
}

MessageScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
  },
  body: {
    flex: 1,
    alignItems: "center",
  },
});
