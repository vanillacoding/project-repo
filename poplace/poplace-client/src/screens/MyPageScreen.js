import React, { useState, useEffect, useCallback } from "react";
import { StyleSheet, View, ScrollView, RefreshControl } from "react-native";
import { useSelector } from "react-redux";

import { color, verticalScale } from "../config/globalStyles";
import { selectUser } from "../features/userSlice";
import MyPinList from "../components/shared/MyPinList";
import MyPageProfile from "../components/MyPageProfile";
import fetchMyPins from "../api/fetchMyPins";

export default function MyPageScreen({ navigation }) {
  const [myCreatedPins, setMyCreatedPins] = useState([]);
  const [mySavedPins, setMySavedPins] = useState([]);
  const { id: userId, email } = useSelector(selectUser);
  const [refreshing, setRefreshing] = useState(false);

  async function getMyPins() {
    if (!userId || !email) {
      return;
    }

    const { myCreatedPins, mySavedPins } = await fetchMyPins(userId, email);

    setMyCreatedPins(myCreatedPins);
    setMySavedPins(mySavedPins);
  }

  useEffect(() => {
    getMyPins();

    return () => {
      setMyCreatedPins([]);
      setMySavedPins([]);
    };
  }, [userId, email]);

  const handleRefresh = useCallback(() => {
    setRefreshing(true);
    getMyPins();

    setTimeout(() => setRefreshing(false), 1000);
  }, [refreshing]);

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.listContainer}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
          />
        }>
        <MyPageProfile style={styles.profile} />
        <View style={styles.pinContainer}>
          <MyPinList
            title="내가 생성한 핀"
            pins={myCreatedPins}
            navigation={navigation}
          />
          <MyPinList
            title="내가 저장한 핀"
            pins={mySavedPins}
            navigation={navigation}
          />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.poplaceWhite,
  },
  listContainer: {
    height: verticalScale(340),
    bottom: "1%",
  },
  pinContainer: {
    paddingLeft: "7%",
    marginBottom: verticalScale(100),
  },
});
