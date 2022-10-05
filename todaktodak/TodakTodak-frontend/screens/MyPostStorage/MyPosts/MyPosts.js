import React, { useCallback } from "react";
import { FlatList } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux";

import EmptyView from "../../../components/EmptyView/EmptyView";
import CategoryPostCard from "../../../components/CategoryPostCard/CategoryPostCard";

import { deleteMyPost } from "../../../redux/userSlice";

import { DETAIL_POST } from "../../../constants/navigationName";

const MyPosts = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { posts, accessToken } = useSelector((state) => state.user);

  if (!posts || !posts.length) {
    return <EmptyView text="작성한 고민글이 없습니다" />;
  }

  const renderPosts = useCallback(({ item }) => {
    const handlePostClick = () => (
      navigation.navigate(DETAIL_POST, { accessToken, postId: item._id })
    );

    const handleDeleteButtonClick = () => (
      dispatch(deleteMyPost({ postId: item._id, accessToken }))
    );

    return (
      <CategoryPostCard
        key={item._id}
        postInfo={item}
        handleClick={handlePostClick}
        handleDeleteClick={handleDeleteButtonClick}
      />
    );
  }, [posts]);

  return (
    <FlatList
      data={posts}
      renderItem={renderPosts}
      keyExtractor={(item) => item._id}
    />
  );
};

export default React.memo(MyPosts);
