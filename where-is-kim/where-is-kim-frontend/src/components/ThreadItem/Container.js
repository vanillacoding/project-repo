import React, { useState } from "react";
import { connect } from "react-redux";
import ThreadItem from "./ThreadItem";
import useInput from "../../hooks/useInput";
import { toggleLikeAPI, addComment } from "../../api";
import { updateThreadLikes, updateThreadComments } from "../../actions";

function ThreadItemContainer({
  id,
  username,
  profile,
  text,
  createdAt,
  likes,
  comments,
  userId,
  updateThreadLikes,
  updateThreadComments,
  userNameById,
}) {
  const [showComment, setShowComment] = useState(false);
  const comment = useInput("");
  const toggleShowComment = () => setShowComment(!showComment);
  const threadLike = async () => {
    const response = await toggleLikeAPI(id, userId);
    const {
      result: { likes },
    } = await response.json();
    updateThreadLikes(id, likes);
  };
  const threadAddComment = async () => {
    if (comment.value.trim()) {
      const response = await addComment(id, userId, comment.value);
      const {
        result: { comments },
      } = await response.json();

      updateThreadComments(id, comments);
      comment.setValue("");
    }
  };
  const onCommentHandler = (e) => {
    if (e.which === 13) {
      threadAddComment();
    }
  };
  return (
    <ThreadItem
      username={username}
      profile={profile}
      text={text}
      createdAt={createdAt}
      likes={likes}
      comment={comment}
      comments={comments}
      showComment={showComment}
      onCommentClick={toggleShowComment}
      onCommentKeydown={onCommentHandler}
      onLikeClick={threadLike}
      userId={userId}
      userNameById={userNameById}
    />
  );
}
const mapStateToProps = (state) => ({
  userId: state.user.id,
  userNameById: state.team.allpartIds.reduce((acc, id) => {
    const user = state.team.partById[id];
    acc[user.id] = user.username;
    return acc;
  }, {}),
});
const mapDispatchToProps = (dispatch) => ({
  updateThreadLikes: (id, likes) => dispatch(updateThreadLikes(id, likes)),
  updateThreadComments: (id, comments) =>
    dispatch(updateThreadComments(id, comments)),
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ThreadItemContainer);
