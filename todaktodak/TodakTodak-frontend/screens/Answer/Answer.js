import React, {
  useState,
  useEffect,
  useCallback
} from "react";
import {
  View,
  Keyboard,
  ScrollView,
  ImageBackground,
  TouchableWithoutFeedback
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";

import AnswerButtons from "./AnswerButtons/AnswerButtons";
import Title from "../../components/Title/Title";
import TextInput from "../../components/TextInput/TextInput";
import AlertModal from "../../components/AlertModal/AlertModal";

import { patchCommentLike } from "../../api/commentApi";

import { patchMyComment } from "../../redux/userSlice";

import styles from "./styles";

import { SERVER_ERROR } from "../../constants/message";
import { DETAIL_POST } from "../../constants/navigationName";

import letterPage from "../../assets/pngs/letterPage.png";
import backgroundImage from "../../assets/pngs/background.png";

const Answer = ({ route }) => {
  const [comment, setComment] = useState("");
  const [message, setMessage] = useState("");
  const [isCommentLike, setIsCommentLike] = useState(false);

  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { email, accessToken } = useSelector((state) => state.user);

  const { commentInfo, postId } = route.params;

  useEffect(() => {
    setComment(commentInfo.content);
  }, []);

  useEffect(() => {
    if (commentInfo.likes.includes(email)) {
      setIsCommentLike(true);
    } else {
      setIsCommentLike(false);
    }
  }, []);

  const handleCommentLikeClick = useCallback(async () => {
    try {
      const commentLikeInfo = {
        commentId: commentInfo._id
      };
      const response = await patchCommentLike(
        commentLikeInfo,
        accessToken
      );

      if (response.errorMessage) {
        return setMessage(response.errorMessage);
      }

      setIsCommentLike((isCommentLike) => !isCommentLike);
    } catch (err) {
      setMessage(SERVER_ERROR);
    }
  }, [isCommentLike]);

  const clearErrorMessage = useCallback(() => {
    setMessage("");
  }, []);

  const handleRoutePostButtonClick =  useCallback(() => {
    navigation.navigate(DETAIL_POST, { postId });
  }, []);

  const handleModifyButtonClick = useCallback(() => {
    const modifyCommentInfo = {
      comment,
      commentId: commentInfo._id
    };

    dispatch(patchMyComment({
      accessToken,
      commentInfo: modifyCommentInfo,
    }));

    navigation.goBack();
  }, [comment]);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ImageBackground
        source={backgroundImage}
        style={styles.backgroundContainer}
      >
        <View style={styles.container}>
          <Title
            imageStyle={styles.titleImage}
            text={`${commentInfo.nickname}님의 답변`}
          />
          <View style={styles.postContentsWrapper}>
            <ImageBackground
              source={letterPage}
              style={styles.letterPage}
            >
              <ScrollView>
                <TextInput
                  value={comment}
                  isMultiline={true}
                  style={styles.contents}
                  handleInputChange={setComment}
                  editable={commentInfo.user === email}
                />
              </ScrollView>
            </ImageBackground>
          </View>
          <AnswerButtons
            postId={postId}
            isCommentLike={isCommentLike}
            handleCommentLikeClick={handleCommentLikeClick}
            handleModifyButtonClick={handleModifyButtonClick}
            handleRoutePostButtonClick={handleRoutePostButtonClick}
          />
        </View>
        {message &&
          <AlertModal
            message={message}
            handleModalClose={clearErrorMessage}
          />
        }
      </ImageBackground>
    </TouchableWithoutFeedback>
  );
}

export default React.memo(Answer);
