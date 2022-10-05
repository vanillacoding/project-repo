import React, { useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { useDispatch } from "react-redux";

import StyledButton from "./shared/StyledButton";
import fetchData from "../utils/fetchData";
import { updateError } from "../reducers/mailSlice";

const Container = styled.div`
`;

const Form = styled.form`
`;

const FormInput = styled.textarea`
  display: block;
  width: 50vmin;
  height: 35vmin;
  margin: 1vw auto;
  border: 3px solid ${(props) => props.theme.layoutBg3.color};
  border-radius: 10px;
  resize: none;
  outline: none;
  padding: 1em;
`;

const Buttons = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 0.5em;
`;

function MailForm({ mailboxId, toggle }) {
  const dispatch = useDispatch();
  const [content, setContent] = useState("");

  async function handleFormSubmit(e) {
    e.preventDefault();

    try {
      await fetchData("POST", `/mailbox/mail/${mailboxId}`, { content });

      toggle();
    } catch (err) {
      dispatch(updateError(err.message));
    }
  }

  function handleInputChange(e) {
    setContent(e.target.value);
  }

  return (
    <Container>
      <Form
        onSubmit={handleFormSubmit}
      >
        <FormInput
          name="content"
          type="text"
          autoComplete="off"
          value={content}
          onChange={handleInputChange}
        />
        <Buttons>
          <StyledButton type="submit">
            보내기 ✉️
          </StyledButton>
          <StyledButton onClick={toggle}>
            취소 🔙
          </StyledButton>
        </Buttons>
      </Form>
    </Container>
  );
}

MailForm.propTypes = {
  mailboxId: PropTypes.string.isRequired,
  toggle: PropTypes.func.isRequired,
};

export default MailForm;
