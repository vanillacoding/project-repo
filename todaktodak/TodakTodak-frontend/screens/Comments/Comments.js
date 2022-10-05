import React, {
  useState,
  useEffect,
  useCallback
} from "react";
import {
  View,
  FlatList,
  ScrollView,
  RefreshControl,
  ImageBackground
} from "react-native";
import { useSelector } from "react-redux";

import Comment from "./Comment/Comment";
import Title from "../../components/Title/Title";
import EmptyView from "../../components/EmptyView/EmptyView";
import AlertModal from "../../components/AlertModal/AlertModal";

import styles from "./styles";

import { getPostComments } from "../../api/postApi";

import backgroundImage from "../../assets/pngs/background.png";

const Comments = ({ route }) => {
  const [message, setMessage] = useState(null);
  const [comments, setComments] = useState(null);

  const { postId } = route.params;
  const { accessToken } = useSelector((state) => state.user);

  useEffect(() => {
    getCurrentPostComments();
  }, []);

  const getCurrentPostComments = useCallback(async () => {
    const response = await getPostComments(postId, accessToken);

    if (response.errorMessage) {
      return setMessage(response.errorMessage);
    }

    setComments(response.comments);
  }, []);

  const clearErrorMessage = useCallback(() => {
    setMessage(null);
  }, []);

  const renderComments = useCallback(({ item }) => {
    return (
      <Comment
        comment={item}
        alertMessage={setMessage}
      />
    );
  }, [comments]);

  return (
    <ImageBackground
      source={backgroundImage}
      style={styles.backgroundContainer}
    >
      <View style={styles.title}>
        <Title
          text="댓글 리스트"
          imageStyle={styles.titleImage}
        />
      </View>
      {comments && comments.length < 1
        ? <ScrollView
            contentContainerStyle={styles.container}
            refreshControl={
              <RefreshControl onRefresh={getCurrentPostComments} />
            }
          >
            <EmptyView text="댓글이 없습니다." />
          </ScrollView>
        : <FlatList
            data={comments}
            renderItem={renderComments}
            keyExtractor={(item) => item._id}
            contentContainerStyle={styles.container}
            refreshControl={
              <RefreshControl onRefresh={getCurrentPostComments} />
            }
          />
      }
      {message &&
        <AlertModal
          message={message}
          handleModalClose={clearErrorMessage}
        />
      }
    </ImageBackground>
  );
};

export default React.memo(Comments);
