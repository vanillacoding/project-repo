import { useEffect, useState } from "react";
import styled, { css } from "styled-components";

import getDate from "../../utils/getDate";

import CommentOptionButton from "./CommentOptionButton";

import { modifyComment } from "../../api/service";

import {
  UPDATE_COMMENT_SUCCEEDED,
  INSUFFICIENT_COMMENT_LENGTH,
  OK,
} from "../../constants/messages";

const setPadding = (size) => css`
  padding-right: ${size};
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: left;
  align-items: center;
  width: 1050px;
  height: 50px;
  padding-left: 26px;
  font-size: 20px;
`;

const UserImage = styled.img`
  margin-right: 20px;
  margin-left: 10px;
  border-radius: 100%;
  box-shadow: 0px 0px 5px 2px rgba(0, 0, 0, 0.25);
`;

const UserName = styled.div`
  width: 80px;
  margin-top: 4px;
  font-size: 20px;
  font-weight: bold;
`;

const Content = styled.div`
  width: 900px;
  padding-left: 18px;
  margin-top: 4px;
  font-size: 20px;
`;

const Date = styled.div`
  width: 100px;
  height: 20px;
  padding-left: 15px;
  color: gray;
  font-size: 15px;
  font-weight: bold;

  ${({ isCreator }) => {
    if (!isCreator) {
      return setPadding("38px");
    }
  }}
`;

const OptionButton = styled(CommentOptionButton)`
  position: absolute;
  height: 20px;
  padding-left: 10px;
  color: red;
  font-size: 10px;
  font-weight: bold;
  cursor: pointer;
`;

const InputArea = styled.input`
  width: 850px;
  height: 30px;
  padding-left: 10px;
  padding: 5px 10px 5px 13px;
  border: none;
  border-radius: 10px;
  background-color: var(--caret-color);
  color: white;
  font-size: 20px;
  outline: none;
`;

const SubmitIcon = styled.img`
  width: 30px;
  height: 25px;
  margin-top: 1px;
  margin-left: 20px;
  cursor: pointer;
`;

export default function Comment({ commentData, snippetId, userId, updateCommentList }) {
  const [isEditable, setIsEditable] = useState(false);
  const [inputText, setInputText] = useState("");

  const { _id: commentId, creator, content, createdAt } = commentData;
  const dateFormat = getDate(createdAt);
  const isCreator = creator._id === userId;

  const handleInputChange = (event) => setInputText(event.target.value);

  const handleButtonClick = async () => {
    if (!inputText.length) {
      alert(INSUFFICIENT_COMMENT_LENGTH);

      return;
    }

    const resource = { userId, snippetId, commentId, content: inputText };

    const response = await modifyComment(resource);

    if (response.result === OK) {
      alert(UPDATE_COMMENT_SUCCEEDED);

      setIsEditable(false);
      updateCommentList(true);
    }
  };

  useEffect(() => {
    setInputText(content);
  }, [content]);

  return (
    <Wrapper>
      <UserImage src={creator.imageUrl} alt="프로필 이미지" width="25px" height="25px" />
      <UserName>{creator.nickname}</UserName>
      {!isEditable && (
        <>
          <Content>{content}</Content>
          <Date isCreator={isCreator}>{dateFormat}</Date>
        </>
      )}
      {isEditable && (
        <InputArea value={inputText} onChange={handleInputChange} autoFocus/>
      )}
      {isCreator && (
        !isEditable && (
          <OptionButton
            commentId={commentId}
            snippetId={snippetId}
            userId={userId}
            updateCommentList={updateCommentList}
            setIsEditable={setIsEditable}
          />
        )
      )}
      {isEditable && (
        <SubmitIcon
          src="/images/send_button.png"
          alt="댓글 수정하기 아이콘"
          width="25px"
          height="25px"
          onClick={handleButtonClick}
        />
      )}
    </Wrapper>
  );
}
