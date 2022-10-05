import React from "react";
import { useDispatch } from "react-redux";
import Feather from "@expo/vector-icons/Feather";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { deletePushNotification } from "../redux/reducers/pushNotificationSlice";

const PushNotificationCard = ({ notificationInfo }) => {
  const { body, receivedTime, id } = notificationInfo;

  const dispatch = useDispatch();

  const handleDeleteButton = () => {
    dispatch(deletePushNotification(id));
  };

  return (
    <View style={styles.container}>
      <View>
        <Text>
          {`⏰  ${receivedTime}`}
        </Text>
        <Text>{body}</Text>
      </View>

      <TouchableOpacity style={styles.deleteButton} onPress={handleDeleteButton}>
        <Feather name="x" size={18} color="black" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "relative",
    justifyContent: "center",
    minHeight: 80,
    paddingHorizontal: 30,
    marginTop: 10,
    borderRadius: 10,
    backgroundColor: "#FFF",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 5,
  },
  deleteButton: {
    position: "absolute",
    top: 13,
    right: 15,
  },
});

export default PushNotificationCard;
