import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import styled from "styled-components";

const Wrapper = styled.div``;

const Input = styled.input`
  margin: 5px 20px;
  padding: 3px 10px 0;
  width: 80%;
  height: 25px;
  font-size: 1em;
`;

const PlusButton = styled.span`
  font-size: 1.2em;
  cursor: pointer;
`;

export default function ProjectEvaluationOptionAddBar({ onEvaluationOptionAdd }) {
  const [inputValue, setInputValue] = useState("");

  function handleInputValueChange(event) {
    setInputValue(event.target.value);
  }

  function addInputValue() {
    if (inputValue) {
      onEvaluationOptionAdd(inputValue);
      setInputValue("");
    }
  }

  function handleInputValueAddBtnClick() {
    addInputValue();
  }

  function handleInputValueKeyDown(event) {
    if (event.key === "Enter") {
      addInputValue();
    }
  }

  return (
    <Wrapper>
      <Input value={inputValue} onChange={handleInputValueChange} onKeyPress={handleInputValueKeyDown}/>
      <PlusButton onClick={handleInputValueAddBtnClick}>
        <FontAwesomeIcon icon={faPlus}/>
      </PlusButton>
    </Wrapper>
  );
}
