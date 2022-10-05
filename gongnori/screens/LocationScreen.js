import React, { useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { SafeAreaView } from "react-native-safe-area-context";

import produce from "immer";
import _ from "lodash";

import CustomButton from "../components/CustomButton";
import DropDown from "../components/DropDown";
import { saveMyLocation } from "../actions/userActionCreators";

import * as colors from "../constants/colors";
import * as fonts from "../constants/fonts";
import * as sizes from "../constants/sizes";
import * as params from "../constants/params";

export default function LocationScreen() {
  const [myLocations, setMyLocations] = useState([]);

  const locations = useSelector((state) => {
    return state.app.locations;
  }, (prev, next) => _.cloneDeep(prev) === _.cloneDeep(next));

  const dispatch = useDispatch();

  const locationOptions = locations.map((location) => {
    const { city, district } = location;

    return `${city} ${district}`;
  });

  const handleSelectLocation = (index) => {
    const isAlreadySelected = myLocations.some((location) => {
      return location.id === locations[index].id;
    });

    if (isAlreadySelected) { return }

    setMyLocations(produce(myLocations, (draft) => {
      draft.unshift(locations[index]);
      draft.splice(2);
    }));
  };

  const handlePressButton = () => _.throttle(() => {
    dispatch(saveMyLocation(myLocations));
  }, params.THROTTLE_TIME);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>
        동네 두개를 골라주세요
      </Text>
      <View style={styles.dropDownContainer}>
        <DropDown
          defaultValue={"동네 1"}
          options={locationOptions}
          style={styles.field}
          onSelect={handleSelectLocation}
        />
      </View>
      <View style={styles.dropDownContainer}>
        <DropDown
          defaultValue={"동네 2"}
          options={locationOptions}
          style={styles.field}
          onSelect={handleSelectLocation}
        />
      </View>
      <View style={styles.buttonContainer}>
        <CustomButton
          title={"등록하기"}
          style={styles.button}
          onPress={handlePressButton}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: colors.SECONDARY_GRAY,
  },
  title: {
    width: 0.8 * sizes.DEVICE_WIDTH,
    height: 0.15 * sizes.DEVICE_HEIGHT,
    marginTop: 100,
    textAlign: "center",
    textAlignVertical: "center",
    fontSize: sizes.PRIMARY_FONT_SIZE,
    fontFamily: fonts.SECONDARY_FONT,
  },
  dropDownContainer: {
    justifyContent: "center",
    height: 0.1 * sizes.DEVICE_HEIGHT,
  },
  buttonContainer: {
    justifyContent: "center",
    height: 0.1 * sizes.DEVICE_HEIGHT,
  },
  field: {
    width: 0.5 * sizes.DEVICE_WIDTH,
    height: 0.06 * sizes.DEVICE_HEIGHT,
    borderRadius: 5,
    backgroundColor: colors.SECONDARY_WHITE,
    fontSize: sizes.QUATERNARY_FONT_SIZE,
    fontFamily: fonts.NOTO_SANS_KR_300_LIGHT,
    textAlignVertical: "center",
    textAlign: "center",
    includeFontPadding: false,
  },
  button: {
    width: 0.5 * sizes.DEVICE_WIDTH,
    height: 0.06 * sizes.DEVICE_HEIGHT,
    borderRadius: 10,
    backgroundColor: colors.PRIMARY_BLUE,
    color: colors.SECONDARY_WHITE,
    fontSize: sizes.SECONDARY_FONT_SIZE,
  },
});
