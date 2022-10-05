import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { getDistance } from "geolib";
import * as Location from "expo-location";

import { fetchDiaryByDate } from "../../redux/slices/diarySlice";
import HomeDiaryAlert from "../../components/HomeDiaryAlert";
import UserIntro from "../../components/UserIntro";

const HomeScreen = ({ route, navigation }) => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state?.user);
  const { byIds } = useSelector((state) => state?.diary);

  const userId = userInfo?.id;
  const [shouldFetch, setShouldFetch] = useState(false);
  const [historyDiary, setHistoryDiary] = useState({});
  const [errMessage, setErrorMsg] = useState("");
  const [searching, setSearching] = useState(true);

  const getDiaryByDate = async (location) => {
    await dispatch(fetchDiaryByDate({ userId }));

    findHistoryDiary(location);
    setShouldFetch(false);
    setSearching(false);
    console.log(searching, "adfasd");
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      setShouldFetch(true);
      setSearching(true);
    });

    return () => unsubscribe();
  }, [shouldFetch]);

  useEffect(() => {
    if (!shouldFetch) {
      return;
    }

    getLocation();
  }, [shouldFetch, byIds, dispatch]);

  async function getLocation() {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      setErrorMsg("Permission to access location was denied");
      return;
    }

    let location = await Location.getCurrentPositionAsync({});

    getDiaryByDate(location);
  }

  function findHistoryDiary(location) {
    const matchedHistoryDiary = Object.values(byIds).filter((diary) => {
      const distance = getDistance(
        {
          latitude: location?.coords?.latitude,
          longitude: location?.coords?.longitude,
        },
        {
          latitude: diary?.geoLocation?.lat,
          longitude: diary?.geoLocation?.lng,
        }
      );

      const distanceMeter = distance / 1000;

      return distanceMeter <= 0.5;
    });

    setHistoryDiary(matchedHistoryDiary[0]);

    return matchedHistoryDiary;
  }

  return (
    <View style={styles.container}>
      <UserIntro userName={userInfo.userName} />
      {searching ? (
        <Text>searching</Text>
      ) : (
        <HomeDiaryAlert
          navigation={navigation}
          matchedHistoryDiary={historyDiary}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderTopWidth: 0.3,
    borderColor: "rgba(0, 0, 0, 0.3)",
    backgroundColor: "#ffffff",
    alignItems: "center",
  },
  withinText: {
    fontSize: 20,
    fontFamily: "DMSans_500Medium",
    width: 180,
    marginTop: 30,
    fontWeight: "200",
    color: "rgba(0, 0, 0, 0.6)",
  },
  userIntroWrapper: {
    flexDirection: "row",
    marginBottom: 15,
    height: 100,
    width: 375,
    backgroundColor: "#191919",
    justifyContent: "center",
    borderColor: "rgba(0, 0, 0, 0.4)",
  },
  userInfo: {
    width: 330,
    justifyContent: "center",
  },
  userName: {
    fontFamily: "DMSans_700Bold",
    fontSize: 18,
    color: "#ffffff",
  },
  desc: {
    fontFamily: "DMSans_700Bold_Italic",
    fontSize: 13,
    color: "#ffffff",
  },
});

export default HomeScreen;
