import React, { useCallback, useState } from "react";
import {
  View,
  ScrollView,
  ImageBackground
} from "react-native";
import { useSelector } from "react-redux";
import { useNavigation, useFocusEffect } from "@react-navigation/native";

import styles from "./styles";

import Loading from "../../screens/Loading/Loading";
import Title from "../../components/Title/Title";
import Category from "../../components/Category/Category";
import TextInput from "../../components/TextInput/TextInput";
import AlertModal from "../../components/AlertModal/AlertModal";
import DetailPostButtons from "./DetailPostButtons/DetailPostButtons";

import {
  patchPostLike,
  getDetailPost
} from "../../api/postApi";

import {
  COMMENTS,
  WRITE_WORRY,
  WRITE_COMMENT
} from  "../../constants/navigationName";
import { SERVER_ERROR } from "../../constants/message";

import letterPage from "../../assets/pngs/letterPage.png";
import backgroundImage from "../../assets/pngs/background.png";

const DetailPost = ({ route }) => {
  const [postInfo, setPostInfo] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isPostLike, setIsPostLike] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const navigation = useNavigation();
  const { email, accessToken } = useSelector((state) => state.user);

  const { postId } = route.params;

  useFocusEffect(useCallback(() => {
    getCurrentPostDetailInfo();
  }, []));

  if (isLoading) {
    return <Loading />;
  }

  const getCurrentPostDetailInfo = async () => {
    setIsLoading(true);

    try {
      const response = await getDetailPost(postId, accessToken);

      if (response.errorMessage) {
        return setErrorMessage(response.errorMessage);
      }

      if (response.post.likes.includes(email)) {
        setIsPostLike(true);
      } else {
        setIsPostLike(false);
      }

      setPostInfo(response.post);
    } catch (err) {
      setErrorMessage(SERVER_ERROR);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddCommentButtonClick = () => {
    navigation.navigate(WRITE_COMMENT, { postId });
  };

  const handleModifyButtonClick = () => {
    navigation.navigate(WRITE_WORRY, { postInfo });
  };

  const handleCommentsButtonClick = () => {
    navigation.navigate(COMMENTS, { postId: postInfo._id });
  };

  const clearMessage = () => {
    setErrorMessage(null);
  };

  const handleLikeButtonClick = async () => {
    const likeInfo = { postId };

    try {
      const response = await patchPostLike(likeInfo, accessToken);

      if (response.errorMessage) {
        return setErrorMessage(response.errorMessage);
      }

      setIsPostLike((isPostLike) => !isPostLike);
    } catch (err) {
      setErrorMessage(SERVER_ERROR);
    }
  };

  return (
    <ImageBackground
      source={backgroundImage}
      style={styles.backgroundContainer}
    >
      <ScrollView
        style={styles.container}
      >
        <View style={styles.postContainer}>
          <View style={styles.title}>
            <Title
              textStyle={styles.titleText}
              imageStyle={styles.titleImage}
              text={
                postInfo.isAnonymous
                  ? "익명의 고민"
                  : `${postInfo.ownerNickname}님의 고민`
              }
            />
          </View>
          <View style={styles.postContentsWrapper}>
            <ImageBackground
              style={styles.letterPage}
              source={letterPage}
            >
              <View style={styles.categoryWrapper}>
                <Category title={postInfo.category} />
                <TextInput
                  editable={false}
                  isMultiline={true}
                  style={styles.contents}
                  value={postInfo.contents}
                />
              </View>
            </ImageBackground>
          </View>
          <DetailPostButtons
            userEmail={email}
            postInfo={postInfo}
            isPostLike={isPostLike}
            handleLikeButtonClick={handleLikeButtonClick}
            handleModifyButtonClick={handleModifyButtonClick}
            handleAddCommentButtonClick={handleAddCommentButtonClick}
            handleViewCommentsButtonClick={handleCommentsButtonClick}
          />
        </View>
      </ScrollView>
      {errorMessage &&
        <AlertModal
          message={errorMessage}
          handleModalClose={clearMessage}
        />
      }
    </ImageBackground>
  );
}

export default React.memo(DetailPost);
