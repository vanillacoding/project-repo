import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { ButtonWrapper } from "./ChannelDelete";
import CustomButton from "../shared/CustomButton";
import CustomInput from "./CustomInput";

export default function ChannelForm({
  formData,
  handleFormData,
  handleOnSubmit,
}) {
  const { title, description, isActive } = formData;

  const { handleOnTitle, handleOnDescription, handleOnIsActive } =
    handleFormData;

  const isEmptyData = !title || !description;

  const onSubmit = (event) => {
    event.preventDefault();

    if (isEmptyData) {
      return;
    }

    handleOnSubmit(event);
  };

  return (
    <FormContainer onSubmit={onSubmit} data-testid="channel-form">
      <CustomInput
        label="Title"
        value={title}
        handleOnChange={handleOnTitle}
        maxLength={10}
      />
      <CustomInput
        label="Description"
        value={description}
        handleOnChange={handleOnDescription}
        maxLength={20}
      />
      <ButtonWrapper>
        <CheckBoxWrapper>
          <CheckBoxLabel htmlFor="active">Active</CheckBoxLabel>
          <CheckBox
            type="checkbox"
            id="active"
            checked={isActive}
            onChange={handleOnIsActive}
          />
        </CheckBoxWrapper>
        <CustomButton disabled={isEmptyData} type="submit">
          저장하기
        </CustomButton>
      </ButtonWrapper>
    </FormContainer>
  );
}

ChannelForm.propTypes = {
  formData: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    isActive: PropTypes.bool.isRequired,
  }).isRequired,
  handleFormData: PropTypes.shape({
    handleOnTitle: PropTypes.func.isRequired,
    handleOnDescription: PropTypes.func.isRequired,
    handleOnIsActive: PropTypes.func.isRequired,
  }).isRequired,
  handleOnSubmit: PropTypes.func.isRequired,
};

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const CheckBoxWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
`;

const CheckBoxLabel = styled.label`
  margin-right: 10px;
`;

const CheckBox = styled.input`
  width: 20px;
`;
