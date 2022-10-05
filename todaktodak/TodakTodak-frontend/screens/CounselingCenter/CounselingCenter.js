import React, { useCallback, useState } from "react";
import {
  Text,
  View,
  ImageBackground
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { debounce } from "lodash";

import CategoryPosts from "./CategoryPosts/CategoryPosts";
import Loading from "../../screens/Loading/Loading";
import Title from "../../components/Title/Title";
import AlertModal from "../../components/AlertModal/AlertModal";
import CategoryButton from "../../components/CategoryButton/CategoryButton";
import CategoryPostCard from "../../components/CategoryPostCard/CategoryPostCard";

import {
  fetchLovePosts,
  fetchPainPosts,
  fetchCoursePosts,
  fetchFriendPosts,
  fetchEmploymentPosts,
  categoryPostSlice
} from "../../redux/categoryPostSlice";

import styles from "./styles";

import {
  PAIN,
  LOVE,
  COURSE,
  FRIEND,
  EMPLOYMENT
} from "../../constants/category";
import {
  LOVE_COLOR,
  PAIN_COLOR,
  FRIEND_COLOR,
  COURSE_COLOR,
  EMPLOYMENT_COLOR
} from "../../constants/color";
import { DETAIL_POST } from "../../constants/navigationName";

import backgroundImage from "../../assets/pngs/background.png";

const CounselingCenter = () => {
  const [page, setPage] = useState(1);
  const [postCategory, setPostCategory] = useState(PAIN);

  const dispatch = useDispatch();
  const navigation = useNavigation();
  const {
    post,
    message,
    bestPost,
    isLoading,
    isFetched
  } = useSelector((state) => state.post);
  const { accessToken } = useSelector((state) => state.user);

  const categorys = [
    { title: PAIN, color: PAIN_COLOR },
    { title: LOVE, color: LOVE_COLOR },
    { title: COURSE, color: COURSE_COLOR },
    { title: FRIEND, color: FRIEND_COLOR },
    { title: EMPLOYMENT, color: EMPLOYMENT_COLOR }
  ];

  useFocusEffect(useCallback(() => {
    dispatch(categoryPostSlice.actions.resetPostState());
  }, []));

  useFocusEffect(useCallback(() => {
    const categoryInfo = {
      page: 0,
      accessToken,
      category: postCategory
    };

    if (!isFetched[postCategory]) {
      debounceDispatchCategoryInfo(categoryInfo);
    }
  }, [postCategory, isFetched]));

  const dispatchCategoryInfo = useCallback((data) => {
    switch (data.category) {
      case EMPLOYMENT:
        dispatch(fetchEmploymentPosts(data));
        break;

      case LOVE:
        dispatch(fetchLovePosts(data));
        break;

      case COURSE:
        dispatch(fetchCoursePosts(data));
        break;

      case FRIEND:
        dispatch(fetchFriendPosts(data));
        break;

      case PAIN:
        dispatch(fetchPainPosts(data));
        break;

      default:
        break;
    }
  }, [postCategory, page]);

  const debounceDispatchCategoryInfo = useCallback(debounce((data) =>
    dispatchCategoryInfo(data), 500
  ), []);

  const getCategorys = useCallback(() => {
    const categoryInfo = {
      page,
      accessToken,
      category: postCategory
    };

    debounceDispatchCategoryInfo(categoryInfo);
    setPage((page) => page + 1);
  }, [page, postCategory]);

  const refreshCategory = useCallback(() => {
    setPage(1);
    dispatch(categoryPostSlice.actions.refreshPostCategory(postCategory));
  }, [postCategory]);

  const renderCategorys = useCallback(() => {
    return categorys.map((category) =>
      <CategoryButton
        key={category.title}
        title={category.title}
        focusValue={postCategory}
        handleClick={setPostCategory}
        categoryColor={category.color}
        categoryStyle={styles.categoryStyle}
        categoryContainerStyle={styles.catagoryContainer}
      />
    );
  }, [postCategory]);

  const handleBestPostClick = useCallback(() => {
    navigation.navigate(DETAIL_POST, {
      postId: bestPost[postCategory]._id
    });
  }, [bestPost, postCategory]);

  const clearErrorMessage = useCallback(() => {
    dispatch(categoryPostSlice.actions.clearMessage());
  }, []);

  return (
    <ImageBackground
      source={backgroundImage}
      style={styles.backgroundContainer}
    >
      <View style={styles.container}>
        <Title text="고민 상담소" />
        <View style={styles.categoryWrapper}>
          {renderCategorys()}
        </View>
        {isLoading && !isFetched[postCategory]
          ? <View style={styles.loadingWrapper}>
              <Loading style={styles.loading} />
            </View>
          : <>
              <View style={styles.bestPost}>
                <Text style={styles.bestText}>
                  {postCategory} 카테고리 위로를 많이 받은 고민
                </Text>
                {bestPost[postCategory] &&
                  <CategoryPostCard
                    cardStyle={styles.bestPostCard}
                    postInfo={bestPost[postCategory]}
                    titleStyle={styles.bestPostTitle}
                    handleClick={handleBestPostClick}
                  />
                }
              </View>
              <CategoryPosts
                post={post}
                isFetched={isFetched}
                category={postCategory}
                getCategorys={getCategorys}
                refreshCategory={refreshCategory}
              />
            </>
        }
      </View>
      {message &&
        <AlertModal
          message={message}
          handleModalClose={clearErrorMessage}
        />
      }
    </ImageBackground>
  );
}

export default React.memo(CounselingCenter);
