import React from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';

import countries from '../constants/countries';
import { color } from '../css/color';

const RegisterWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  background-color: ${color.SUB};
`;

const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 85%;
  width: 60%;
  background-color: ${color.WHITE};
  border-radius: 5px;
  box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
`;

const AuthHeaderWrapper = styled.div`
  display: flex;
  position: relative;
  top: 18px;
  width: 40%;
  justify-content: space-between;
`;

const LinkWrapper = styled.div`
  opacity: 0.3;
  &:hover {
    opacity: 1;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 30px;
`;

const Label = styled.label`
  color: ${color.BOLD};
  margin: 3px;
`;

const Input = styled.input`
  display: block;
	border: none;
	padding: 8px 8px;
	margin: 0 0 8px 0;
	width: 240px;
  border-radius: 3px;
  background-color: ${color.LIGHT};
`;

const Button = styled.input`
  margin: 20px 0;
  border: none;
  border-radius: 18px;
  padding: 10px 15px;
  width: 50%;
  background-color: ${color.SUB};
  &:hover {
    background-color: ${color.MAIN};
    color: black;
  }
  &:focus {
    outline: none;
  }
`;

const Gender = styled.select`
  margin: 10px 0;
	padding: 10px 15px;
	width: 76%;
  border: 1px solid ${color.LIGHT};
  &:focus {
    outline: none;
  }
`;

const Country = styled.select`
  margin: 10px 0;
	padding: 10px 15px;
	width: 76%;
  border: 1px solid ${color.LIGHT};
  &:focus {
    outline: none;
  }
`;

const Message = styled.p`
  margin: 0;
  font-size: 10px;
  color: red;
`;

export default function Register({ onRegisterSubmit }) {
  const {
    register,
    handleSubmit,
  } = useForm();

  return (
    <RegisterWrapper>
      <FormWrapper>
        <AuthHeaderWrapper>
          <LinkWrapper>
            <Link to="/login">로그인</Link>
          </LinkWrapper>
          <span>회원가입</span>
        </AuthHeaderWrapper>
        <Form
          name="form"
          onSubmit={handleSubmit(onRegisterSubmit)}
        >
          <Label>이메일 주소</Label>
          <Input
            type="email"
            name="email"
            {...register('email')}
            required
          />
          <Label>이름</Label>
          <Input
            type="text"
            name="name"
            {...register('name')}
            required
          />
          <Label>패스워드</Label>
          <Input
            type="password"
            name="password"
            {...register('password')}
            minLength="8"
            required
          />
          <Label>패스워드 확인</Label>
          <Input
            type="password"
            name="passwordConfirm"
            {...register('passwordConfirm')}
            minLength="8"
            required
          />
          <Label>나이</Label>
          <Input
            type="number"
            name="age"
            min="18"
            max="65"
            {...register('age', { min: 18, max: 65 })}
            required
          />
          <Label>성별</Label>
          <Gender
            name="gender"
            {...register('gender')}
            required
          >
            <option value={'male'}>남자</option>
            <option value={'female'}>여자</option>
          </Gender>
          <Label>지역</Label>
          <Country
            name="country"
            {...register('country')}
            required
          >
            {
              Object.entries(countries).map((item) => {
                const [englishName, koreanName] = item;

                return <option value={englishName}>{koreanName}</option>;
              })
            }
          </Country>
          <Button
            type="submit"
            value="회원가입"
          />
        </Form>
      </FormWrapper>
    </RegisterWrapper>
  );
}
