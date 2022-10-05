import { useRef, useState } from "react";
import { useHistory } from "react-router";
import styled from "styled-components";

import Button from "./common/Button";

import validateHashtag from "../utils/validateHashtag";
import setHashtagFormat from "../utils/setHashtagFormat";

import { EDIT } from "../constants/variants";
import { OK } from "../constants/messages";

import { createSnippet } from "../api/service";

const ModalBackground = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  background-color: rgba(150, 150, 150, 0.3);
`;

const Modal = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  position: fixed;
  width: 730px;
  height: 400px;
  border-radius: 50px;
  background-color: #F3F2F9;
  box-shadow: 5px 5px 4px rgba(0, 0, 0, 0.25);
`;

const Label = styled.label`
  color: #543FD3;
  font-size: 14px;
`;

const Input = styled.input`
  display: block;
  width: 465px;
  height: 35px;
  margin: 0 auto;
  padding-left: 5px;
  border: 2px solid #543FD3;
  border-radius: 4px;
  outline: none;
  transition: 0.2s;

  &:focus {
    border: 2px solid #26BFA6;
  }

  &::placeholder {
    font-size: 14px;
  }
`;

const Message = styled.p`
  margin-top: 5px;
  color: #EE0004;
  font-size: 13px;
  text-align: right;
`;

export default function SnippetSavingModal({ creator, language, code, onClick }) {
  const [inputValue, setInputValue] = useState("#");
  const [failureReason, setFailureReason] = useState("");

  const hashtagInput = useRef();
  const history = useHistory();

  const userId = localStorage.getItem("userId");

  const saveSnippet = async (hashtagList) => {
    const data = {
      creator,
      poster: userId,
      language,
      code,
      hashtagList,
    };

    const { result, snippet: savedSnippet } = await createSnippet(data);

    if (result === OK) {
      const { _id } = savedSnippet;

      history.push(`/snippets/${_id}`);
    }
  };

  const handleInputValue = (event) => {
    const value = setHashtagFormat(event);

    setInputValue(value);
  };

  const handleButtonClick = async () => {
    const hashtags = hashtagInput.current.value;
    const splittedHashtags = hashtags.split(" ");

    const validationResult = validateHashtag(splittedHashtags);

    if (validationResult !== OK) {
      setFailureReason(validationResult);

      return;
    }

    await saveSnippet(splittedHashtags);

    onClick(false);
  };

  const closeModal = ({ target = undefined, currentTarget = undefined }) => {
    if (target !== currentTarget) {
      return;
    }

    onClick(false);
  };

  return (
    <ModalBackground onClick={closeModal}>
      <Modal>
        <Label>
          해시태그
          <Input type="text" placeholder="#HashTag #InfiniteScroll" ref={hashtagInput} onChange={handleInputValue} value={inputValue} />
          <Message>{failureReason}</Message>
        </Label>
        <Button variant={EDIT} onClick={handleButtonClick}>저장하기</Button>
      </Modal>
    </ModalBackground>
  );
}
