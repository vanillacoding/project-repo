import React, { useCallback } from "react";
import { FlatList } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux";

import CommentCard from "../../../components/CommentCard/CommentCard";
import EmptyView from "../../../components/EmptyView/EmptyView";

import { deleteMyComment } from "../../../redux/userSlice";

import { ANSWER } from "../../../constants/navigationName";

const MyComments = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { comments, accessToken } = useSelector((state) => state.user);

  if (!comments || !comments.length) {
    return <EmptyView text="작성한 위로글이 없습니다." />;
  }

  const renderComments = useCallback(({ item }) => {
    const routeDetailComment = () => {
      navigation.navigate(ANSWER, {
        postId: item.post,
        commentInfo: item
      });
    };

    const deleteComment = () => (
      dispatch(deleteMyComment({
        commentId: item._id,
        accessToken
      }))
    );

    return (
      <CommentCard
        comment={item}
        handleDeleteClick={deleteComment}
        handleCardClick={routeDetailComment}
      />
    );
  }, [comments]);

  return (
    <FlatList
      data={comments}
      renderItem={renderComments}
      keyExtractor={(item) => item._id}
    />
  );
};

export default React.memo(MyComments);
