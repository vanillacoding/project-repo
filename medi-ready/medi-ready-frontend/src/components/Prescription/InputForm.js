import React, { useState, useContext } from "react";
import styled from "styled-components";

import ConfirmModal from "../Shared/Modal/ConfirmModal";
import { ModalContext } from "../../contexts/ModalContext";

import Button from "../Shared/Button";
import FlexBox from "../Shared/FlexBox";
import TextArea from "../Shared/TextArea";
import TextInput from "../Shared/TextInput";

const InputForm = ({ error, setIsSubmit, setFormData }) => {
  const { handleModal } = useContext(ModalContext);

  const [duration, setDuration] = useState("");
  const [description, setDescription] = useState("");

  const handleChange = (event, setState) => {
    setState(event.target.value);
  };

  const setForm = () => {
    setFormData({ duration, description });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    handleModal(
      <ConfirmModal
        error={error}
        setForm={setForm}
        message="처방하시겠습니까?"
        setIsSubmit={setIsSubmit}
      />,
    );
  };

  return (
    <form onSubmit={handleSubmit}>
      <FlexBox>
        <div>
          <TextArea
            name="description"
            value={description}
            placeholder="복용지도를 입력해주세요."
            onChange={(event) => handleChange(event, setDescription)}
          />
        </div>
        <InputButtonBox>
          <TextInput
            width="60px"
            name="duration"
            label="duration"
            value={duration}
            onChange={(event) => handleChange(event, setDuration)}
          />
          <span>일분</span>
          <Button type="submit">처방</Button>
        </InputButtonBox>
      </FlexBox>
    </form>
  );
};

const InputButtonBox = styled.div`
  position: absolute;
  right: 0;
  bottom: 0;
  padding-left: 10px;

  label {
    margin-left: 20px;
  }

  span {
    margin-left: 10px;
  }

  button {
    margin-left: 30px;
  }
`;

export default InputForm;
