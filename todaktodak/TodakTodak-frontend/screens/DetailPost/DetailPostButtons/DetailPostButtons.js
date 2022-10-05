import React from "react";
import { View } from "react-native";
import {
  Ionicons,
  AntDesign,
  FontAwesome
} from "@expo/vector-icons";

import Button from "../../../components/Button/Button";

import styles from "./styles";

import { RED } from "../../../constants/color";

const DetailPostButtons = ({
  postInfo,
  userEmail,
  isPostLike,
  handleLikeButtonClick,
  handleModifyButtonClick,
  handleAddCommentButtonClick,
  handleViewCommentsButtonClick
}) => {
  return (
    <View style={styles.buttonWrapper}>
      <Button
        text="위로 하기"
        textStyle={styles.buttonText}
        buttonStyle={styles.buttonContainer}
        handleClick={handleLikeButtonClick}
      >
        <AntDesign
          size={25}
          color={RED}
          style={styles.buttonIcon}
          name={isPostLike ? "heart" : "hearto"}
        />
      </Button>
      <Button
        text="댓글 달기"
        textStyle={styles.buttonText}
        buttonStyle={styles.buttonContainer}
        handleClick={handleAddCommentButtonClick}
      >
        <FontAwesome
          style={styles.buttonIcon}
          size={25}
          color={RED}
          name="comment-o"
        />
      </Button>
      <Button
        text="댓글 보기"
        textStyle={styles.buttonText}
        buttonStyle={styles.buttonContainer}
        handleClick={handleViewCommentsButtonClick}
      >
        <FontAwesome
          style={styles.buttonIcon}
          size={25}
          color={RED}
          name="comments"
        />
      </Button>
      {postInfo.owner === userEmail &&
        <Button
          text="수정 하기"
          textStyle={styles.buttonText}
          buttonStyle={styles.buttonContainer}
          handleClick={handleModifyButtonClick}
        >
          <Ionicons
            style={styles.buttonIcon}
            size={25}
            color={RED}
            name="document"
          />
        </Button>
      }
    </View>
  );
};

export default React.memo(DetailPostButtons);
