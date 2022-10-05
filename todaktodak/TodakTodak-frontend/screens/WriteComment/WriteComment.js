import React, { useState, useCallback } from "react";
import {
  View,
  Keyboard,
  ScrollView,
  ImageBackground,
  TouchableWithoutFeedback
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useSelector } from "react-redux";
import { FontAwesome } from "@expo/vector-icons";

import Title from "../../components/Title/Title";
import Button from "../../components/Button/Button";
import TextInput from "../../components/TextInput/TextInput";
import AlertModal from "../../components/AlertModal/AlertModal";

import styles from "./styles";

import { RED } from "../../constants/color";
import { SERVER_ERROR } from "../../constants/message";

import { patchComment } from "../../api/postApi";

import letterPage from "../../assets/pngs/letterPage.png";
import backgroundImage from "../../assets/pngs/background.png";

const WriteComment = ({ route }) => {
  const [content, setContent] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);

  const navigation = useNavigation();
  const { accessToken } = useSelector((state) => state.user);

  const { postId } = route.params;

  const handleAddCommentButtonClick = useCallback(async () => {
    const commentInfo = {
      postId,
      content: content.trim()
    };

    try {
      const response = await patchComment(commentInfo, accessToken);

      if (response.errorMessage) {
        return setErrorMessage(response.errorMessage);
      }

      navigation.goBack();
    } catch (err) {
      setErrorMessage(SERVER_ERROR);
    }
  }, [content]);

  const clearErrorMessage = useCallback(() => {
    setErrorMessage(null);
  }, []);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ImageBackground
        source={backgroundImage}
        style={styles.backgroundContainer}
      >
        <KeyboardAwareScrollView>
          <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.title}>
              <Title
                text="댓글 작성"
                textStyle={styles.titleText}
                imageStyle={styles.titleImage}
              />
            </View>
            <View style={styles.postContentsWrapper}>
              <ImageBackground
                source={letterPage}
                style={styles.letterPage}
              >
                <View style={styles.categoryWrapper}>
                  <TextInput
                    value={content}
                    editable={true}
                    isMultiline={true}
                    style={styles.contents}
                    placeholder="답글을 달아주세요"
                    handleInputChange={setContent}
                  />
                </View>
              </ImageBackground>
            </View>
            <Button
              text="댓글 달기"
              textStyle={styles.buttonText}
              buttonStyle={styles.buttonWrapper}
              handleClick={handleAddCommentButtonClick}
            >
              <FontAwesome
                style={styles.buttonIcon}
                size={25}
                color={RED}
                name="comment-o"
              />
            </Button>
          </ScrollView>
        </KeyboardAwareScrollView>
        {errorMessage &&
          <AlertModal
            message={errorMessage}
            handleModalClose={clearErrorMessage}
          />
        }
      </ImageBackground>
    </TouchableWithoutFeedback>
  );
}

export default React.memo(WriteComment);
