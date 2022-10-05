import PropTypes from 'prop-types';
import React, { useState } from 'react';
import styled from 'styled-components';
import { StyledButton } from '../StyledButton';

export default function LinkForm({
  inputs,
  handleSubmitForm,
}) {
  const [data, setData] = useState(inputs);

  function onChange(e) {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function onSubmit(e) {
    e.preventDefault();
    handleSubmitForm(data);
  }

  return (
    <FormContainer
      onSubmit={onSubmit}
    >
      {Object.entries(data).map(([name, value], index) => (
        <Label
          // eslint-disable-next-line react/no-array-index-key
          key={index}
        >
          <TextInput
            type='text'
            name={name}
            placeholder={name}
            value={value}
            onChange={onChange}
          />
        </Label>
      ))}
      <ButtonContainerAlignRight>
        <OkButton type='submit'>
          Ok
        </OkButton>
      </ButtonContainerAlignRight>
    </FormContainer>
  );
}

LinkForm.propTypes = {
  inputs: PropTypes.object,
  handleSubmitForm: PropTypes.func,
};

const Label = styled.label`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  width: 100%;

  & input {
    width: 100%;
  }
`;

const FormContainer = styled.form`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  background: rgba(255,255,255,1);
  border: 1px solid rgb(243, 243, 243);
  box-shadow: 4px 17px 20px 0px rgb(0 0 0 / 8%);
  padding: 12px 12px;
  box-sizing: border-box;
`;

const TextInput = styled.input`
  width: 100%;
  height: 50px;
  box-sizing: border-box;
  margin: 0;
  font-family: sans-serif;
  font-size: 15px;
  letter-spacing: 1px;
  padding: 0;
  padding-left: 8px;
  color: #111111;
  display: inline-block;
  border: none;
  border-bottom: 1px solid rgba(0, 0, 0, 0.08);
  border-radius: 0;
  background-color: #fbfbfb;

  &:focus {
    outline: none;
  }
`;

const ButtonContainerAlignRight = styled.div`
  text-align: right;
`;

// TODO: delete
const CancelButton = styled(StyledButton)`
  display: inline-block;
  width: auto;
  height: 50px;
  padding-left: 30px;
  padding-right: 30px;
  background: transparent;
`;

const OkButton = styled(StyledButton)`
  display: inline-block;
  width: auto;
  height: 50px;
  padding-left: 30px;
  padding-right: 30px;
  min-width: 135px;
  background: #f7f7f7;
`;
