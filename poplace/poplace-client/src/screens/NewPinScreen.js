import React, { useState } from "react";
import { useSelector } from "react-redux";
import { StyleSheet, Image, View, TouchableOpacity, ScrollView, KeyboardAvoidingView } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import Textarea from "react-native-textarea";
import TagInput from "react-native-tags-input";

import { selectUser } from "../features/userSlice";
import validateTag from "../utils/validateTag";
import validatePinData from "../utils/validatePinData";
import openImagePicker from "../api/openImagePicker";
import CustomButton from "../components/shared/CustomButton";
import makeNewPin from "../api/makeNewPin";
import { color, horizontalScale, moderateScale, verticalScale } from "../config/globalStyles";

export default function NewPinScreen({ navigation }) {
  const { id } = useSelector(selectUser);
  const [text, setText] = useState(null);
  const [imageUri, setImageUri] = useState(null);
  const [hasImage, setHasImage] = useState(false);

  const [tags, setTags] = useState({
    tag: "",
    tagsArray: [],
  });

  function handleUpdateTag(tags) {
    const isValid = validateTag(tags);

    if (!isValid) {
      return;
    }

    setTags(tags);
  }

  function handleTextAreaInput(input) {
    setText(input);
  }

  async function handleSubmitData() {
    const validatedData = {
      tags: tags.tagsArray,
      text,
      imageUri,
    };

    const isValid = validatePinData(validatedData);

    if (!isValid) {
      return;
    }

    const photo = {
      uri: imageUri,
      name: `new-pin-photo.${imageUri.split(".").pop()}`,
      type: "multipart/form-data",
    };

    const data = { tags, photo, text, id };
    const result = await makeNewPin(data);

    if (result.success) {
      navigation.replace("MainNavigator");
      return;
    }
  }

  async function handlerImagePicker() {
    const imageResult = await openImagePicker();

    if (imageResult) {
      setImageUri(imageResult);
      setHasImage(true);
    }
  }

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView style={styles.keyboardViewContainer} behavior="height" enabled>
        <ScrollView>
          <View style={styles.addingImageContainer}>
            <View style={styles.addingImageStroke}>
              <TouchableOpacity
                style={styles.addingImageStroke}
                onPress={handlerImagePicker}
                activeOpacity={1}
              >
                {hasImage ? (
                  <Image style={styles.image} source={{ uri: imageUri }} />
                ) : (
                    <FontAwesome name="camera" size={40} color={color.poplaceLight} />
                  )}
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.tagContainer}>
            <TagInput
              style={styles.tag}
              updateState={handleUpdateTag}
              placeholder="태그"
              tags={tags}
              keysForTag={"enter"}
              inputContainerStyle={{ marginLeft: 0 }}
              tagStyle={styles.tagButton}
              tagTextStyle={{ color: color.poplaceRed }}
            />
          </View>
          <View style={styles.textContainer}>
            <Textarea
              style={styles.textArea}
              onChangeText={handleTextAreaInput}
              placeholder="여기에 장소에 대한 느낌을 적어주세요."
              value={text}
              multiline={true}
              textAlignVertical="top"
              numberOfLines={40}
              color={color.poplaceLight}
              fontSize={moderateScale(20)}
            />
          </View>
        </ScrollView>
        <View style={styles.completionButton}>
          <CustomButton text="생성하기" handleButton={handleSubmitData} />
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    backgroundColor: color.poplaceWhite,
  },
  keyboardViewContainer: {
    alignItems: "center",
    backgroundColor: color.poplaceWhite,
    width: "100%",
    height: "87%",
  },
  addingImageContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: verticalScale(10),
    width: "100%",
    height: verticalScale(130),
    paddingBottom: 10,
    borderColor: color.poplaceMiddleGray,
    borderBottomWidth: 1,
  },
  addingImage: {
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    borderRadius: 10,
    width: horizontalScale(100),
    height: verticalScale(100),
    alignItems: "center",
    justifyContent: "center",
  },
  addingImageStroke: {
    backgroundColor: color.poplaceWhite,
    borderColor: color.poplaceLight,
    borderRadius: 10,
    width: horizontalScale(100),
    height: verticalScale(100),
    alignItems: "center",
    justifyContent: "center",
    bottom: 0,
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 4,
  },
  tagContainer: {
    paddingVertical: verticalScale(20),
    width: "100%",
    borderColor: color.poplaceMiddleGray,
    borderBottomWidth: 1,
  },
  tag: {
    paddingHorizontal: horizontalScale(10),
    borderRadius: 5,
    fontSize: moderateScale(20),
    borderColor: color.poplaceMiddleGray,
  },
  tagButton: {
    marginLeft: 0,
    backgroundColor: color.poplaceWhite,
    borderWidth: 0,
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 1,
  },
  tagTitle: {
    marginVertical: verticalScale(10),
    color: color.poplaceDark,
  },
  textContainer: {
    paddingHorizontal: horizontalScale(20),
    width: "100%",
    height: verticalScale(300),
  },
  textArea: {
    top: verticalScale(20),
    height: verticalScale(300),
  },
  text: {
    color: color.poplaceLight,
  },
  textInput: {
    justifyContent: "center",
    alignItems: "center",
    width: "85%",
    height: "80%",
    marginTop: 10,
    borderWidth: 1,
    borderColor: color.poplaceLight,
  },
  completionButton: {
    zIndex: 3,
    position: "absolute",
    width: "90%",
    height: verticalScale(80),
    backgroundColor: color.poplaceWhite,
    paddingHorizontal: horizontalScale(20),
    alignItems: "center",
    justifyContent: "center",
    bottom: 0,
    borderTopWidth: 1,
    borderTopColor: color.poplaceMiddleGray,
  },
});
