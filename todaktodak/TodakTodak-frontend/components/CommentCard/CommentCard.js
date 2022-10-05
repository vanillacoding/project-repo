import React from "react";
import {
  View,
  Text,
  TouchableOpacity
} from "react-native";
import { AntDesign } from "@expo/vector-icons";

import Button from "../../components/Button/Button";

import styles from "./styles";

import { CONTENTS_TITLE_LIMIT } from "../../constants/category";

const CommentCard = ({
  comment,
  handleCardClick,
  handleDeleteClick
}) => {
  const {
    likes,
    content,
    createdAt
  } = comment;

  return (
    <TouchableOpacity
      style={styles.postCard}
      onPress={handleCardClick}
    >
      <View style={styles.cardWrapper}>
        <View>
          <Text style={styles.postTitle}>
            {CONTENTS_TITLE_LIMIT < content.length
              ? `${content.substring(0, 8)}...`
              : content
            }
          </Text>
          <Text style={styles.postContent}>
            {createdAt.substring(0, 10)}
          </Text>
        </View>
        <View>
          <View style={styles.likeWrapper}>
            <AntDesign
              size={15}
              color="red"
              name="heart"
              style={styles.likeIcon}
            />
            <Text style={styles.postContent}>
              {likes.length}
            </Text>
          </View>
          <Button
            text="삭제"
            handleClick={handleDeleteClick}
            buttonStyle={styles.deleteButton}
            textStyle={styles.deleteButtonText}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
}

export default React.memo(CommentCard);
