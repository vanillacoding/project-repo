import React from "react";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import styled from "styled-components";

import Button from "./Button";
import { EDIT, DELETE } from "../constants/buttons";

const BUTTON_WIDTH = 80;
const BUTTON_HEIGHT = 30;

const Wrapper = styled.div`
  overflow: auto;
`;

const CommentBarWrapper = styled.div`
  display: flex;
  justify-content: start;
  width: calc(100% - 20px);
  margin: 10px auto;
  padding-left: 10px;
  align-items: center;
`;

const Comment = styled.span`
  align-self: center;
  margin-top: 10px;
  padding: 10px 10px;
  color: ${({ theme }) => theme.background.main};
  text-align: left;

  @media screen and (max-width: 400px) {
    font-size: 0.5rem;
  }
`;

const Image = styled.img`
  width: 62px;
  height: 62px;
  border-radius: 50%;

  @media screen and (max-width: 400px) {
    width: 40px;
    height: 40px;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  width: 140px;
  margin-top: 10px;
  justify-items: end;
  font-size: 0.8rem;

  @media screen and (max-width: 400px) {
    button {
      width: 50px;
      font-size: 0.5rem;
    }
  }
`;

function CommentViewer({
  creatorId, comments, onClickEdit, onClickDelete,
}) {
  const user = useSelector((state) => state.user);
  const isCreator = user.id === creatorId;

  return (
    <Wrapper>
      {comments.length && comments.map((comment) => (
        <CommentBarWrapper key={comment._id}>
          <Image
            src={comment.profileUrl}
            alt={comment.name}
          />
          <Comment>{comment.content}</Comment>
          <ButtonWrapper>
            {(user.id === comment.creator._id) && <Button
              text={EDIT}
              onClick={() => onClickEdit({
                commentId: comment._id, content: comment.content,
              })}
              width={BUTTON_WIDTH}
              height={BUTTON_HEIGHT}
            />}
            {(user.id === comment.creator._id || isCreator) && <Button
              text={DELETE}
              onClick={() => onClickDelete(comment._id)}
              width={BUTTON_WIDTH}
              height={BUTTON_HEIGHT}
            />}
          </ButtonWrapper>
        </CommentBarWrapper>
      ))}
    </Wrapper>
  );
}

CommentViewer.propTypes = {
  creatorId: PropTypes.string.isRequired,
  comments: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    ratingId: PropTypes.string.isRequired,
    creator: PropTypes.shape({
      _id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      profileUrl: PropTypes.string.isRequired,
    }),
    date: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
  })),
  onClickEdit: PropTypes.func.isRequired,
  onClickDelete: PropTypes.func.isRequired,
};

export default CommentViewer;
