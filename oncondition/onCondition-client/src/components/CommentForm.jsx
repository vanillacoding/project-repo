import React, { useState, useEffect } from "react";
import Button from "./Button";
import styled from "styled-components";
import PropTypes from "prop-types";

const Form = styled.div`
  display: flex;
  margin: 15px 30px;
  flex-direction: column;
`;

const TextArea = styled.textarea`
  flex-grow: 1;
  min-height: 80px;
  padding: 10px;
  border: solid 2px ${({ theme }) => theme.point.main};
  border-radius: 16px;
  resize: none;
  outline: none;
`;

const ButtonWrapper = styled.div`
  display: flex;
  width: 220px;
  margin: 0 0 0 auto;

  @media screen and (max-width: 400px) {
    width: 200px;
  }
`;

function CommentForm({
  content, buttonText, onSubmit, onReset,
}) {
  const [comment, setComment] = useState(content);

  const handleSubmit = function () {
    if (!comment.length) {
      return;
    }

    onSubmit(comment);
    setComment("");
  };

  const handleReset = function () {
    setComment("");
    onReset();
  };

  useEffect(() => {
    setComment(content);
  }, [content]);

  return (
    <Form>
      <TextArea
        placeholder="코멘트를 입력해주세요."
        value={comment}
        onChange={({ target }) => setComment(target.value)}
      />
      <ButtonWrapper>
        <Button
          text="RESET"
          onClick={handleReset}
        />
        <Button
          text={buttonText}
          onClick={handleSubmit}
        />
      </ButtonWrapper>
    </Form>
  );
}

CommentForm.propTypes = {
  content: PropTypes.string,
  buttonText: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onReset: PropTypes.func.isRequired,
};

CommentForm.defaultProps = {
  content: "",
};

export default CommentForm;
