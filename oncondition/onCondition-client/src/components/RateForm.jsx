import React, { useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import Wrapper from "./Wrapper";
import HeartInput from "./HeartInput";
import HeartCounter from "./HeartCounter";
import ButtonsWrapper from "./ButtonsWrapper";
import Button from "./Button";
import theme from "../theme";
import { getKoreanTimeString } from "../utils/time";

const Textarea = styled.textarea`
  flex-grow: 1;
  margin: 5px 20px 20px 20px;
  padding: 5px 15px;
  line-height: 2rem;
  border-radius: 7px;
  border-style: hidden;
  background-color: ${({ theme }) => theme.background.input};
  color: ${({ theme }) => theme.text.input};
  text-align: left;
  resize: none;

  :focus {
    outline: none;
  }
`;

function RateForm({
  color,
  onSubmit,
  submitButtonText,
  additionalButton,
  defaultValues,
  disabled,
}) {
  const [heartCount, setHeartCount] = useState(defaultValues.heartCount || 0);
  const [text, setText] = useState(defaultValues.text || "");
  const { date, snippet, type } = defaultValues;

  const handleCountChange = function (value) {
    setHeartCount(value);
  };

  const handleTextChange = function ({ target }) {
    setText(target.value);
  };

  const handleSubmitButton = function () {
    onSubmit({
      heartCount, text, date, snippet, type,
    });
  };

  const snippetBrackets = snippet ? `(${snippet})` : "";

  return (
    <form>
      <Wrapper color={color} isShrink>
        <div>
          <p>{getKoreanTimeString(date)}</p>
          <span>{`${type || ""} ${snippetBrackets}`}</span>
          {disabled
            ? <HeartCounter />
            : <HeartInput count={heartCount} onChange={handleCountChange} />}
        </div>
        <Textarea
          placeholder="내용을 입력해주세요"
          value={text}
          onChange={handleTextChange}
          disabled={disabled}
        />
      </Wrapper>
      <ButtonsWrapper isShrink>
        {!disabled
          && <Button text={submitButtonText} onClick={handleSubmitButton} />}
        {additionalButton}
      </ButtonsWrapper>
    </form>
  );
}

RateForm.propTypes = {
  color: PropTypes.oneOf(Object.values(theme.background)),
  onSubmit: PropTypes.func,
  submitButtonText: PropTypes.string,
  additionalButton: PropTypes.element,
  defaultValues: PropTypes.shape({
    date: PropTypes.string.isRequired,
    snippet: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    heartCount: PropTypes.number,
    text: PropTypes.string,
  }),
  disabled: PropTypes.bool.isRequired,
};

RateForm.defaultProps = {
  color: theme.background.main,
  defaultValues: {
    heartCount: 0,
    text: "",
  },
  disabled: false,
};

export default RateForm;
