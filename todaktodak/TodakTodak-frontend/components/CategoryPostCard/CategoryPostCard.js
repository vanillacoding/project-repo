import React from "react";
import {
  View,
  Text,
  TouchableOpacity
} from "react-native";
import { AntDesign } from "@expo/vector-icons";

import Button from "../Button/Button";

import styles from "./styles";

import { RED } from "../../constants/color";
import { CONTENTS_TITLE_LIMIT } from "../../constants/category";

const CategoryPostCard = ({
  postInfo,
  cardStyle,
  titleStyle,
  handleClick,
  handleDeleteClick
}) => {
  const {
    likes,
    title,
    createdAt,
    isAnonymous,
    ownerNickname
  } = postInfo;

  return (
    <>
      {0 < Object.keys(postInfo).length &&
        <TouchableOpacity
          style={[ styles.postCard, cardStyle ]}
          onPress={handleClick}
        >
          <View style={styles.cardWrapper}>
            <View>
              <Text style={[ styles.postTitle, titleStyle ]}>
                {CONTENTS_TITLE_LIMIT < title.length
                  ? `${title.substring(0, 8)}...`
                  : title
                }
              </Text>
              <View style={styles.postContentsWrapper}>
                <Text style={styles.postContent}>
                  {isAnonymous ? "익명" : ownerNickname}
                </Text>
                <Text style={styles.postContent}>
                  {createdAt.substring(0, 10)}
                </Text>
              </View>
            </View>
            <View>
              <View style={styles.likeWrapper}>
                <AntDesign
                  size={15}
                  color={RED}
                  name="heart"
                  style={styles.likeIcon}
                />
                <Text style={styles.postContent}>
                  {likes.length}
                </Text>
              </View>
              {handleDeleteClick &&
                <Button
                  text="삭제"
                  handleClick={handleDeleteClick}
                  buttonStyle={styles.deleteButton}
                  textStyle={styles.deleteButtonText}
                />
              }
            </View>
          </View>
        </TouchableOpacity>
      }
    </>
  );
}

export default React.memo(CategoryPostCard);
