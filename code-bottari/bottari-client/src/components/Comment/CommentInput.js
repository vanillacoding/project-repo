import { useEffect, useState } from "react";
import styled from "styled-components";

import { createComment, getUserData } from "../../api/service";

import {
  INSUFFICIENT_COMMENT_LENGTH,
  CREATE_COMMENT_SUCCEEDED,
  COMMENT_INPUT_BLOCKED,
  OK,
} from "../../constants/messages";

const CommentInputBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 1100px;
  height: 40px;
  margin-bottom: 10px;
  border: 2px solid #543FD3;
  border-radius: 8px;
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

const InputArea = styled.input`
  width: 850px;
  height: 40px;
  padding-left: 10px;
  padding-bottom: 3px;
  border: none;
  border-radius: 8px;
  background-color: transparent;
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

export default function CommentInput({ snippetId, userId, updateCommentList, writtenComment }) {
  const [user, setUser] = useState({});
  const [inputText, setInputText] = useState("");

  useEffect(() => {
    async function getUser() {
      const userData = await getUserData(userId);

      setUser(userData.user);
    }

    getUser();
  }, [userId]);

  const handleInputChange = (event) => {
    setInputText(event.target.value);
  };

  const onReset = () => {
    setInputText("");
  };

  const handleButtonClick = async () => {
    if (!inputText.length) {
      alert(INSUFFICIENT_COMMENT_LENGTH);

      return;
    }

    const resource = { userId, snippetId, comment: inputText };

    const response = await createComment(resource);

    if (response.result === OK) {
      alert(CREATE_COMMENT_SUCCEEDED);

      updateCommentList(true);
      onReset();
    }
  };

  return (
    <CommentInputBox>
      {user &&
        <>
          <UserImage src={user.imageUrl} alt="프로필 이미지" width="25px" height="25px" />
          <UserName>{user.nickname}</UserName>
          <InputArea onChange={handleInputChange} value={writtenComment || inputText} />
          <SubmitIcon
            src="/images/send_button.png"
            alt="댓글 작성하기 아이콘"
            width="25px"
            height="25px"
            onClick={() => handleButtonClick()}
          />
        </>
      }
      {!user && <div>{COMMENT_INPUT_BLOCKED}</div>}
    </CommentInputBox>
  );
}
