import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from "react-native";

import PushNotificationCard from "../components/PushNotificationCard";
import { deleteAllNotification } from "../redux/reducers/pushNotificationSlice";

const PushAlarmListScreen = () => {
  const notificationList = useSelector((state) => state.pushNotification.pushNotificationList);

  const dispatch = useDispatch();

  const handleDeleteAll = () => {
    dispatch(deleteAllNotification());
  };

  const renderItem = ({ item }) => <PushNotificationCard notificationInfo={item} />;

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.menu} onPress={handleDeleteAll}>
        <Text styles={styles.deleteAll}>모두 지우기</Text>
      </TouchableOpacity>

      <FlatList
        contentContainerStyle={styles.notificationList}
        data={notificationList}
        renderItem={renderItem}
        keyExtractor={(notification) => `${notification.id}`}
        showsVerticalScrollIndicator={false}
      />

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  menu: {
    paddingTop: 10,
    alignItems: "center",
  },
  deleteAll: {
    fontSize: 20,
  },
  notificationList: {
    flexGrow: 1,
    padding: 10,
  },
});

export default PushAlarmListScreen;
