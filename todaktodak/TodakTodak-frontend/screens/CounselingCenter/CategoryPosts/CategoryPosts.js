import React, { useCallback } from "react";
import {
  FlatList,
  ScrollView,
  RefreshControl
} from "react-native";
import { useNavigation } from "@react-navigation/native";

import EmptyView from "../../../components/EmptyView/EmptyView";
import CategoryPostCard from "../../../components/CategoryPostCard/CategoryPostCard";

import styles from "./styles";

import { DETAIL_POST } from "../../../constants/navigationName";

const CategoryPosts = ({
  post,
  category,
  isFetched,
  getCategorys,
  refreshCategory
}) => {
  const navigation = useNavigation();

  const renderCategoryPosts = useCallback(({ item }) => {
    const handlePostClick = () => (
      navigation.navigate(DETAIL_POST, { postId: item._id })
    );

    return (
      <CategoryPostCard
        key={item._id}
        postInfo={item}
        handleClick={handlePostClick}
      />
    );
  }, [post, category]);

  return (
    <>
      {post[category].length < 1 && isFetched[category]
        ? <ScrollView
            refreshControl={
              <RefreshControl onRefresh={refreshCategory} />
            }
          >
            <EmptyView
              text="해당 카테고리의 고민이 없습니다."
              viewStyle={styles.emptyContainer}
            />
          </ScrollView>
          : <FlatList
              data={post[category]}
              onEndReached={getCategorys}
              onEndReachedThreshold={0.9}
              renderItem={renderCategoryPosts}
              keyExtractor={(item) => item._id}
              refreshControl={
                <RefreshControl onRefresh={refreshCategory} />
              }
            />
      }
    </>
  );
};

export default React.memo(CategoryPosts);
