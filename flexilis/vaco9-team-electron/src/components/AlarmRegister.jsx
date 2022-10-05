import React from 'react';
import bodyParts from '../constants/bodyParts';
import styled from 'styled-components';
import { color } from '../css/color';
import { useForm } from 'react-hook-form';

const RegisterContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const FormWrapper = styled.div`
  align-self: center;
  width: 90%;
  padding: 20px 10px;
  background-color: ${color.WHITE};
`;

const AlarmRegisterForm = styled.form`
  display: flex;
  flex-direction: column;
  background-color: ${color.WHITE};
`;

const Title = styled.h2`
  align-self: center;
  width: 90%;
  margin-top: 25px;
  padding: 10px 10px;
  background-color: ${color.WHITE};
`;

const SelectTitle = styled.label`
  font-size: 20px;
`;

const Input = styled.input`
  width: 70%;
  margin: 10px 0;
	padding: 10px 15px;
  border: 1px solid ${color.LIGHT};
  &:focus {
    outline: none;
  }
`;

const BodyPart = styled.select`
  width: 76%;
  margin: 10px 0;
	padding: 10px 15px;
  border: 1px solid ${color.LIGHT};
  &:focus {
    outline: none;
  }
`;

const SubmitButtonWrapper = styled.div`
  width: 60vw;
  display: flex;
  flex-direction: row-reverse;
`;

const SubmitButton = styled.input`
  margin-top: 30px;
  padding: 10px 30px;
  border-radius: 5px;
  border: none;
  background-color: ${color.MAIN};
  &:hover {
    background-color: ${color.SUB}
  }
`;

export default function AlarmRegister({ onRegisterAlarmSubmit }) {
  const {
    register,
    handleSubmit,
  } = useForm();

  return (
    <>
      <Title>알람 시간 등록</Title>
      <RegisterContainer>
        <FormWrapper>
          <AlarmRegisterForm
            onSubmit={handleSubmit(onRegisterAlarmSubmit)}
          >
            <SelectTitle>스트레칭 알람 시간</SelectTitle>
            <Input
              type="time"
              name="time"
              {...register('time')}
              required
            />
            <SelectTitle>영상 카테고리</SelectTitle>
            <BodyPart
              name="bodyPart"
              {...register('bodyPart')}
              required
            >
              <option value={'wrist'}>{bodyParts.wrist}</option>
              <option value={'back'}>{bodyParts.back}</option>
              <option value={'waist'}>{bodyParts.waist}</option>
              <option value={'neck'}>{bodyParts.neck}</option>
            </BodyPart>
            <SelectTitle htmlFor="customVideo">커스텀 비디오 설정</SelectTitle>
            <Input
              type="text"
              name="customVideo"
              id="customVideo"
              {...register('customVideo')}
            />
            <SubmitButtonWrapper>
              <SubmitButton type="submit" value='저장하기' />
            </SubmitButtonWrapper>
          </AlarmRegisterForm>
        </FormWrapper>
      </RegisterContainer>
    </>
  );
}
