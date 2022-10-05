import { API_GOOGLE_GEOCODING_KEY } from "@env";
import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Text,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { addNewDiary } from "../../redux/slices/diarySlice";
import { useIsFocused } from "@react-navigation/native";
import Geocoder from "react-native-geocoding";
import * as Location from "expo-location";
import { SimpleLineIcons } from "@expo/vector-icons";

const NewDiaryAddingModalScreen = ({ route, navigation }) => {
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.user.userInfo.id);

  const [address, setAddress] = useState(null);
  const [geoLocation, setGeoLocation] = useState({ lat: "", lng: "" });

  Geocoder.init(API_GOOGLE_GEOCODING_KEY, { language: "ko" });

  async function getAddress(lat, lng) {
    const reversedGeoAddress = await Geocoder.from({
      lat: lat,
      lng: lng,
    });
    setAddress(reversedGeoAddress.results[3].formatted_address);
    setGeoLocation({ lat, lng });
  }

  if (isFocused) {
    console.log("modal foucsed?");
  }

  useEffect(() => {
    async function getLocation() {
      const location = await Location.getCurrentPositionAsync({});

      if (location) {
        getAddress(location.coords.latitude, location.coords.longitude);
      }
    }
    getLocation();
  }, []);

  const [diaryTitleInfo, setDiaryTitleInfo] = useState({
    hashTag: "",
  });

  const handleChangeText = (key, val) => {
    setDiaryTitleInfo({ ...diaryTitleInfo, [key]: val });
  };

  function closeModal() {
    navigation.goBack();
  }

  async function handlePressAddNewDiaryBtn() {
    const newDiaryInfo = { ...diaryTitleInfo, address, geoLocation };
    const { payload } = await dispatch(addNewDiary({ newDiaryInfo, userId }));

    navigation.navigate("Main", {
      screen: "Diary",
      params: {
        screen: "SingleDiary",
        params: { data: { newDiaryId: payload._id } },
      },
    });
  }

  return (
    <TouchableWithoutFeedback onPress={closeModal}>
      <View style={styles.modalWrapper} onStartShouldSetResponder={() => true}>
        <View style={styles.container}>
          <View style={styles.inputBox}>
            <Text style={styles.hashText}>#</Text>
            <TextInput
              style={styles.input}
              placeholder="Your HashTag"
              blurOnSubmit
              autoCorrect={false}
              maxLength={30}
              placeholderTextColor="#777"
              value={diaryTitleInfo?.hashTag}
              onChangeText={(text) => handleChangeText("hashTag", text)}
            />
          </View>
          <View style={styles.locationBox}>
            <SimpleLineIcons
              style={styles.locationIcon}
              name="location-pin"
              size={24}
              color="black"
            />
            <Text style={styles.locationText}>{address}</Text>
          </View>
          <View style={styles.btnBox}>
            <TouchableOpacity style={styles.closeBtn} onPress={closeModal}>
              <Text style={styles.closeText}>CLOSE</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.submitBtn}
              onPress={handlePressAddNewDiaryBtn}
            >
              <Text style={styles.submitText}>SUBMIT</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ffffff",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 150,
    marginLeft: 20,
    marginRight: 20,
    height: 250,
    borderRadius: 2,
  },
  submitBtn: {
    width: 80,
    height: 40,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 17,
    borderWidth: 2,
    backgroundColor: "#0652DD",
  },
  closeText: {
    fontSize: 18,
    color: "black",
    fontWeight: "400",
  },
  submitText: {
    fontSize: 18,
    color: "#ffffff",
    marginLeft: 2,
    fontWeight: "400",
  },
  closeBtn: {
    width: 80,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
  },
  locationBox: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  locationIcon: {
    marginRight: 20,
  },
  modalWrapper: {
    flex: 1,
  },
  btnBox: {
    flexDirection: "row",
    height: 30,
    width: 100,
    justifyContent: "center",
    marginTop: 30,
  },
  locationText: {
    width: 230,
    height: 20,
    backgroundColor: "white",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
  inputBox: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  hashText: {
    fontSize: 40,
    marginRight: 20,
    textAlign: "center",
  },
  input: {
    width: 200,
    height: 50,
    fontSize: 15,
    marginRight: 28,
    textAlign: "center",
    backgroundColor: "white",
  },
});

export default NewDiaryAddingModalScreen;
