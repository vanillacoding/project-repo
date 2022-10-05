import { useRef, useState } from "react";
import { useHistory } from "react-router";
import { useMutation } from "react-query";
import styled, { css } from "styled-components";

import CodeEditor from "../CodeEditor/CodeEditor";
import Button from "../common/Button";

import validateHashtag from "../../utils/validateHashtag";
import setHashtagFormat from "../../utils/setHashtagFormat";
import { createSnippet } from "../../api/service";

import { OK } from "../../constants/messages";

const commonStyle = css`
  display: block;
  height: 40px;
  padding-left: 10px;
  border: 2px solid #543FD3;
  border-radius: 4px;
  font-size: 16px;
  box-sizing: border-box;
  outline: none;
`;

const SnippetToolWrapper = styled.div`
  width: 100%;
  margin-top: 30px;
  text-align: center;
`;

const InputContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  height: 95px;

  label {
    margin: 15px;
    color: #543FD3;
    font-size: 14px;
    text-align: left;
  }
`;

const Input = styled.input`
  ${commonStyle}

  width: 470px;
`;

const Message = styled.p`
  margin-top: 5px;
  color: #EE0004;
  font-size: 13px;
  text-align: right;
`;

const StyledButton = styled(Button)`
  margin-top: 20px;
`;

export default function NewSnippetPage() {
  const [inputValue, setInputValue] = useState("#");
  const [failureReason, setFailureReason] = useState("");
  const [code, setCode] = useState("");
  const [language, setLanguage] = useState("Python");

  const history = useHistory();
  const hashtagInput = useRef();

  const { mutate } = useMutation((data) => createSnippet(data), {
    onSuccess: (data) => {
      if (data.result === OK) {
        history.push("/");
      }
    },
  });

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

    const userId = localStorage.getItem("userId");

    const data = {
      creator: userId,
      poster: userId,
      language,
      code,
      hashtagList: splittedHashtags,
    };

    mutate(data);
  };

  return (
    <SnippetToolWrapper>
      <InputContainer>
        <label>
          해시태그
          <Input type="text" placeholder="#HashTag" ref={hashtagInput} onChange={handleInputValue} value={inputValue}/>
          <Message>{failureReason}</Message>
        </label>
      </InputContainer>
      <CodeEditor width="1000px" height="500px" language={language} code={code} onEdit={setCode} onLanguageSelect={setLanguage} />
      <StyledButton variant="edit" onClick={() => handleButtonClick()} children="생성하기" />
    </SnippetToolWrapper>
  );
}
