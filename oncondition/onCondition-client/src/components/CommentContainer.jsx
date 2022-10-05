import React, { useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import CommentViewer from "./CommentViewer";
import CommentForm from "./CommentForm";
import getApi from "../api/category";
import { COMMENT, EDIT } from "../constants/buttons";
import { ERROR } from "../constants/messages";

const CommentContainerWrapper = styled.div`
  width: 500px;
  display: grid;
  margin: 25px;
  grid-template-rows: 6fr 1fr 3fr;
  padding: 10px 5px 5px 5px;
  border-radius: 30px;
  background-color: ${({ theme }) => theme.background.comment};
  box-shadow: ${({ theme }) => theme.shadow.main};

  @media screen and (max-width: 640px) {
    grid-template-rows: 3fr 0 3fr;
  }

  @media screen and (max-width: 550px) {
    width: 400px;
    padding: 0;
  }

  @media screen and (max-width: 400px) {
    width: 260px;
    padding: 0;
  }
`;

const Status = styled.div`
  color: ${({ theme }) => theme.point.main};
`;

function CommentContainer({
  creatorId, comments, category, ratingId, onUpdate,
}) {
  const { postComment, editCommentById, deleteCommentById } = getApi(category);
  const [userComment, setUserComment] = useState({
    id: "", content: "", isUpdated: false,
  });
  const [status, setStatus] = useState("");

  const resetUserComment = function () {
    setUserComment({ id: null, content: "", isUpdated: false });
  };

  const handleSubmit = async function (content) {
    if (userComment.isUpdated) {
      const body = {
        category,
        ratingId,
        date: new Date(),
        content,
      };

      const res = await editCommentById(
        creatorId, ratingId, userComment.id, body,
      );

      if (!res) {
        setStatus(ERROR.COMMENT_UPDATE_FAIL);
      }
    } else {
      const body = {
        date: new Date(),
        content,
      };

      const res = await postComment(creatorId, ratingId, body);

      if (!res) {
        setStatus(ERROR.COMMENT_UPDATE_FAIL);
      }
    }

    resetUserComment();
    onUpdate();
  };

  const handleClickEdit = function ({ commentId, content }) {
    setUserComment({ id: commentId, content, isUpdated: true });
  };

  const handleClickDelete = async function (commentId) {
    const res = await deleteCommentById(creatorId, ratingId, commentId);

    if (!res) {
      setStatus(ERROR.COMMENT_DELETE_FAIL);
    }

    resetUserComment();
    onUpdate();
  };

  return (
    <CommentContainerWrapper>
      <CommentViewer
        creatorId={creatorId}
        comments={comments}
        onClickEdit={handleClickEdit}
        onClickDelete={handleClickDelete}
      />
      <Status>{status}</Status>
      <CommentForm
        content={userComment.content}
        buttonText={userComment.id ? EDIT : COMMENT}
        onSubmit={handleSubmit}
        onReset={resetUserComment}
      />
    </CommentContainerWrapper>
  );
}

CommentContainer.propTypes = {
  comments: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    ratingId: PropTypes.string.isRequired,
    creator: PropTypes.shape({
      _id: PropTypes.string.isRequired,
      profileUrl: PropTypes.string.isRequired,
    }),
    date: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
  })),
  creatorId: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  ratingId: PropTypes.string.isRequired,
  onUpdate: PropTypes.func.isRequired,
};

CommentContainer.defaultProps = {
  comments: [],
};

export default CommentContainer;
