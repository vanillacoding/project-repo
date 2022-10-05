import React, { useContext } from "react";
import styled from "styled-components";

import { ModalContext } from "../../../contexts/ModalContext";

import Button from "../Button";
import CloseButton from "./CloseButton";

const ConfirmModal = ({ setIsSubmit, setForm, message }) => {
  const { handleModal } = useContext(ModalContext);

  const handleChange = () => {
    setForm();
    setIsSubmit(true);
    handleModal(null);
  };

  return (
    <Wrapper>
      <p>{message}</p>
      <ButtonBox>
        <CloseButton text="취소" closeModal={() => handleModal(null)} />
        <StyledButton type="button" onClick={handleChange}>확인</StyledButton>
      </ButtonBox>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  p {
    text-align: center;
    margin-bottom: 10px;
  }

  button {
    min-width: 80px;
    position: initial;
    color: #222;

    :before, :after {
      content: none;
    }
  }
`;

const StyledButton = styled(Button)`
  color: #fff !important;
`;

const ButtonBox = styled.div`
  margin-top: 20px;
`;

export default ConfirmModal;
