import React from 'react';
import * as ICON from 'react-feather';
import styled from 'styled-components';
import { OkButton } from '../shared/StyledButton';
import usePublishForm from './usePublishForm';

export default function PublishForm() {
  const {
    title,
    address,
    isPublished,
    isAddressValid,
    handleSubmitForm,
    handleChangeTitle,
    handleChangeAddress,
    handleClickCheckAddress,
  } = usePublishForm();

  return (
    <Container>
      <Title>Publish</Title>
      <FormContainer
        onSubmit={handleSubmitForm}
      >
        <Label>
          Title
          <TextInput
            required
            type='text'
            placeholder='Project Title'
            maxLength={25}
            value={title}
            onChange={handleChangeTitle}
          />
        </Label>
        <Label>
          Address
          <TextInput
            required
            placeholder='Project address'
            type='text'
            onChange={handleChangeAddress}
            value={address}
          />
        </Label>
        <AddressCheckWrapper>
          <CheckButton
            type='button'
            onClick={handleClickCheckAddress}
          >
            check
          </CheckButton>
          <span>
            www.minimo.life/
            {address}
          </span>
          {isAddressValid && (
            <CheckIcon>
              <ICON.CheckCircle size={15} color='green' />
            </CheckIcon>
          )}
          {isAddressValid === false && (
            <CheckIcon>
              <ICON.Slash size={15} color='red' />
              {' '}
              try different address.
            </CheckIcon>
          )}
        </AddressCheckWrapper>
        <SubmitButton
          disabled={!isAddressValid || !title}
          type='submit'
        >
          publish
        </SubmitButton>
      </FormContainer>
      <div>
        <SuccessMessage>
          {isPublished && 'SUCCESS!'}
        </SuccessMessage>
        <FailMessage>
          {!isPublished && 'FAIL, TRY AGAIN'}
        </FailMessage>
      </div>
    </Container>
  );
}

const SuccessMessage = styled.div`
  color: green;
  text-align: center;
  margin-top: 1rem;
`;

const FailMessage = styled.div`
  color: red;
  text-align: center;
  margin-top: 1rem;
`;

const Title = styled.h2`
  text-align: center;
`;

const CheckIcon = styled.div`
  display: inline-block;
  margin-left: 0.3rem;
  color: red;
`;

const CheckButton = styled.button`
  all: unset;
  display: inline;
  background: #f7f7f7;
  padding: 0.25rem;
  border: 0.05rem solid #e0dfdf;
  border-radius: 2px;
  margin-right: 0.25rem;

  &:hover {
    background: #e0dfdf;
  }
`;

const AddressCheckWrapper = styled.div`
  width: 100%;
  text-align: left;
  color: #505050;
  margin-top: 0.25rem;
  margin-left: 0.5rem;
`;

const Container = styled.div`
  margin: auto;
  margin-top: 4rem;
  background: #fff;
  position: relative;
  border-radius: 2px;
  padding: 2rem;
  width: 550px;
  align-items: center;
  background: rgba(255,255,255,1);
  border: 1px solid rgb(243, 243, 243);
  box-shadow: 4px 17px 20px 0px rgb(0 0 0 / 8%);
  padding: 12px 12px;
  box-sizing: border-box;
`;

const Label = styled.label`
  color: #696767;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  width: 100%;
  font-size: 20px;
  font-weight: bold;
  padding: 0 5px;

  & input {
    width: 100%;
  }
`;

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin: auto;
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

const SubmitButton = styled(OkButton)`
  &:disabled {
    cursor: not-allowed;
  }
`;
