import React, { useMemo, useState } from "react";
import { StyleSheet, View, Text, Image, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";

import produce from "immer";
import _ from "lodash";

import DismissKeyboard from "../components/DismissKeyboard";
import DropDown from "../components/DropDown";
import CustomButton from "../components/CustomButton";
import CompletionModal from "../components/CompletionModal";
import InputAlertModal from "../components/InputAlertModal";
import SpinnerLoading from "../components/SpinnerLoading";

import useHeaderRight from "../hooks/useHeaderRight";
import usePickImage from "../hooks/usePickImage";

import * as colors from "../constants/colors";
import * as fonts from "../constants/fonts";
import * as sizes from "../constants/sizes";

const DEFAULT_EMBLEM = "https://minho-bucket.s3.ap-northeast-2.amazonaws.com/blank_profile.png";

export default function MatchCreateScreen({ navigation }) {
  const [isHeaderRightLoading, isCompletionShown, isInputInvalid] = useSelector((state) => {
    return [
      state.loading.isHeaderRightLoading,
      state.loading.isCompletionShown,
      state.loading.isInputInvalid,
    ];
  }, (prev, next) => _.cloneDeep(prev) === _.cloneDeep(next));

  const [team, setTeam] = useState({
    name: null,
    location: null,
    sports: null,
  });

  const locations = useSelector((state) => {
    return state.user.locations;
  }, (prev, next) => _.cloneDeep(prev) === _.cloneDeep(next));

  const locationOptions = useMemo(() => {
    return locations.map((location) => {
      return `${location.city} ${location.district}`;
    });
  }, []);

  const sports = useSelector((state) => {
    return state.app.sports;
  }, (prev, next) => _.cloneDeep(prev) === _.cloneDeep(next));

  const sportsOptions = useMemo(() => {
    return sports.map((item) => item.koreanName);
  }, []);

  const handleSelectSports = (index) => {
    setTeam(produce(team, (draft) => {
      draft.sports = sports[index];
    }));
  };

  const handleSelectLocation = (index) => {
    setTeam(produce(team, (draft) => {
      draft.location = locations[index];
    }));
  };

  const handleChangeName = (value) => {
    setTeam(produce(team, (draft) => {
      draft.name = value;
    }));
  };

  const [image, imageS3, pickImage] = usePickImage(DEFAULT_EMBLEM);

  useHeaderRight(
    { navigation, title: "만들기" },
    { method: "POST", path: "team", data: { ...team, imageS3 } }
  );

  return (
    <DismissKeyboard>
      <SafeAreaView style={styles.container}>
        <StatusBar backgroundColor="white" barStyle="light-content" />
        <SpinnerLoading
          visible={isHeaderRightLoading}
          content={"Team Creating"}
        />
        <InputAlertModal
          content={"팀 정보를 입력해주세요."}
          visible={isInputInvalid}
        />
        <CompletionModal
          content={"팀을 만들었습니다."}
          visible={isCompletionShown}
        />
        <View style={styles.emblem}>
          <View style={styles.imageBox}>
            <Image
              style={styles.image}
              source={{ uri: image }}
            />
          </View>
          <CustomButton
            title={"앨범에서 선택"}
            style={styles.button}
            onPress={pickImage}
          />
        </View>
        <View style={styles.inputContainer}>
          <View style={styles.input}>
            <Text style={styles.title}>{"팀명"}</Text>
            <TextInput
              value={team.name}
              style={styles.field}
              placeholder={"팀 이름을 입력하세요."}
              autoCompleteType="off"
              onChangeText={handleChangeName}
            />
          </View>
          <View style={styles.input}>
            <Text style={styles.title}>종목</Text>
            <DropDown
              defaultValue={"종목을 선택하세요."}
              options={sportsOptions}
              style={styles.field}
              onSelect={handleSelectSports}
            />
          </View>
          <View style={styles.input}>
            <Text style={styles.title}>지역</Text>
            <DropDown
              defaultValue={"동네를 선택하세요."}
              options={locationOptions}
              style={styles.field}
              onSelect={handleSelectLocation}
            />
          </View>
        </View>
      </SafeAreaView>
    </DismissKeyboard>
  );
}

MatchCreateScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    minHeight: sizes.DEVICE_HEIGHT,
    alignItems: "center",
    backgroundColor: colors.SECONDARY_GRAY,
  },
  inputContainer: {
    justifyContent: "space-around",
    width: 0.9 * sizes.DEVICE_WIDTH,
    height: 0.3 * sizes.DEVICE_HEIGHT,
    marginVertical: 30,
    borderRadius: 5,
    backgroundColor: colors.PRIMARY_YELLOW,
    elevation: 5,
    shadowColor: "rgb(50, 50, 50)",
    shadowOpacity: 0.5,
    shadowRadius: 5,
    shadowOffset: {
      height: -1,
      width: 0,
    },
  },
  input: {
    flexDirection: "row",
    alignItems: "center",
    height: 0.1 * sizes.DEVICE_HEIGHT,
  },
  title: {
    height: 0.05 * sizes.DEVICE_HEIGHT,
    marginHorizontal: 15,
    fontSize: sizes.TERTIARY_FONT_SIZE,
    fontFamily: fonts.NOTO_SANS_KR_400_REGULAR,
    textAlign: "left",
    textAlignVertical: "center",
    includeFontPadding: false,
  },
  field: {
    width: 0.4 * sizes.DEVICE_WIDTH,
    height: 0.04 * sizes.DEVICE_HEIGHT,
    borderRadius: 5,
    backgroundColor: colors.SECONDARY_WHITE,
    fontSize: sizes.QUATERNARY_FONT_SIZE,
    fontFamily: fonts.NOTO_SANS_KR_300_LIGHT,
    textAlignVertical: "center",
    textAlign: "center",
    includeFontPadding: false,
  },
  emblem: {
    alignItems: "center",
    marginTop: 30,
  },
  imageBox: {
    justifyContent: "center",
    alignItems: "center",
    width: 0.3 * sizes.DEVICE_WIDTH,
    height: 0.15 * sizes.DEVICE_HEIGHT,
    marginBottom: 20,
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
  button: {
    width: 0.3 * sizes.DEVICE_WIDTH,
    height: 0.1 * sizes.DEVICE_WIDTH,
    borderRadius: 15,
    backgroundColor: colors.PRIMARY_BLUE,
    color: colors.SECONDARY_WHITE,
    fontSize: sizes.TERTIARY_FONT_SIZE,
  },
});
