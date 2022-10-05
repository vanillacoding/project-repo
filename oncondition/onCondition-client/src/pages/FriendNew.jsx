import React, { useState } from "react";
import { useParams, useHistory } from "react-router";
import { useSelector } from "react-redux";
import styled from "styled-components";
import theme from "../theme";

import ModalWrapper from "../components/ModalWrapper";
import DetailWrapper from "../components/DetailWrapper";

import Button from "../components/Button";
import CircleButton from "../components/CircleButton";
import { sendById } from "../api/friend";

const Wrapper = styled.div`
  display: grid;
  padding: 2rem;

  .center {
    text-align: center;
  }

  .board-layout {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }
`;

const BoardWrapper = styled.div`
  display: flex;
  width: 360px;
  height: 260px;
  margin: 15px 30px;
  padding: 25px 20px 20px 20px;
  border-radius: 5px;
  box-shadow: 0 0 0 20px ${({ theme }) => theme.background.main};
  background-color: ${({ theme }) => theme.background.board};

  .input-label {
    margin: auto;
    color: ${({ theme }) => theme.text.sub};
  }

  .clipboard-input {
    width: 250px;
    margin: 20px;
    padding: 1rem;
    text-align: center;
    border: 3px solid ${({ theme }) => theme.background.main};
    border-radius: 1rem;
    font-size: 14px;
    outline: none;
  }

  .readonly {
    cursor: pointer;
  }

  .writable {
    margin-left: 20px;
    text-align: left;
  }

  .writable::placeholder {
    text-align: center;
  }
`;

function FriendContentBoard() {
  const { creatorId } = useParams();
  const [friendId, setFriendId] = useState("");
  const [message, setMessage] = useState("");
  const [isPending, setIsPending] = useState(false);
  const user = useSelector((state) => state.user);
  const history = useHistory();

  const handleIdChange = function ({ target }) {
    setFriendId(target.value);
  };

  const handleCopy = function ({ target }) {
    navigator.clipboard.writeText(target.value);
    setMessage("복사되었습니다.");
  };

  const handleCloseButtonClick = function () {
    history.push(`/${creatorId}/friend`);
  };

  const handleAdd = async function () {
    if (!friendId) {
      return;
    }

    setIsPending(true);

    const res = await sendById(creatorId, friendId);

    if (res) {
      setMessage("친구 요청이 전송되었습니다.");
      setIsPending(false);
    }
  };

  const friendInput = (
    <input
      className="clipboard-input writable"
      placeholder="친구 코드"
      value={friendId}
      onChange={handleIdChange}
    />
  );

  const codeInput = (
    <input
      className="clipboard-input readonly"
      value={user.id}
      readOnly
      onClick={handleCopy}
    />
  );

  const handleClickWrapper = function () {
    setMessage("");
  };

  return (
    <ModalWrapper>
      <CircleButton
        color={theme.background.main}
        onClick={handleCloseButtonClick}
      >x</CircleButton>
      <DetailWrapper>
        <Wrapper onClick={handleClickWrapper}>
          <h1 className="center">친구 추가</h1>
          <div className="board-layout">
            <div>
              <BoardWrapper>
                <label className="input-label" >
                  추가할 친구의 유저코드를 입력해주세요
                  {friendInput}
                </label>
              </BoardWrapper>
              <Button
                onClick={handleAdd}
                text="ADD"
                disabled={isPending}
              />
            </div>
            <BoardWrapper>
              <label className="input-label">
                나의 유저 코드
                {codeInput}
              </label>
            </BoardWrapper>
          </div>
          <p>{message}</p>
        </Wrapper>
      </DetailWrapper>
    </ModalWrapper>
  );
}

export default FriendContentBoard;
