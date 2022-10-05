import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import { ErrorMessage } from '@hookform/error-message';

import { commonErrorMessage, registerErrorMessage } from '../constants/validationErrorMessage';
import { schema } from '../validations/registerFormSchema';

const RegisterWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  font-family: 'Nanum Barun Gothic';
`;

const FormWrapper = styled.div`
  height: 80vh;
  width: 300px;
`;

const Label = styled.label`
  color: ${props => props.theme.BOLD};
  margin: 3px;
`;

const Input = styled.input`
  display: block;
  border: none;
	padding: 8px 15px;
  margin: 5px 0 20px 0;
	width: 100%;
  border-radius: 5px;
  background-color: #eee;
`;

const Button = styled.input`
  margin: 20px 0;
  border: none;
  border-radius: 18px;
  padding: 10px 15px;
  width: 40%;
  background-color: ${props => props.theme.SUB};
  &:hover {
    background-color: ${props => props.theme.MAIN};
    color: black;
  }
  &:focus {
    outline: none;
  }
`;

const Message = styled.p`
  margin: 0;
  font-size: 10px;
  color: red;
`;

export default function RegisterForm({ onRegisterFormSubmit }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: joiResolver(schema),
  });

  return (
    <RegisterWrapper>
      <FormWrapper>
        <h1>회원가입</h1>
        <form
          name="form"
          onSubmit={handleSubmit(onRegisterFormSubmit)}
        >
          <Label>이메일 주소</Label>
          <Input
            type="email"
            name="email"
            {...register('email')}
            required
          />
          <ErrorMessage
            errors={errors}
            name="email"
            render={() => <Message>{commonErrorMessage.INVALID_EMAIL}</Message>}
          />
          <Label>이름</Label>
          <Input
            type="text"
            name="name"
            {...register('name')}
            required
          />
          <ErrorMessage
            errors={errors}
            name="name"
            render={() => <Message>{registerErrorMessage.INVALID_NAME}</Message>}
          />
          <Label>비밀번호</Label>
          <Input
            type="password"
            name="password"
            {...register('password')}
            minLength="8"
            required
          />
          <ErrorMessage
            errors={errors}
            name="password"
            render={() => <Message>{commonErrorMessage.INVALID_PASSWORD}</Message>}
          />
          <Label>비밀번호 확인</Label>
          <Input
            type="password"
            name="passwordConfirm"
            {...register('passwordConfirm')}
            minLength="8"
            required
          />
          <ErrorMessage
            errors={errors}
            name="passwordConfirm"
            render={() => <Message>{registerErrorMessage.INVALID_PASSWORDCONFIRM}</Message>}
          />
          <Label>회사이름</Label>
          <Input
            type="text"
            name="companyName"
            {...register('companyName')}
          />
          <ErrorMessage
            errors={errors}
            name="companyName"
            render={() => <Message>{registerErrorMessage.INVALID_COMPANYNAME}</Message>}
          />
          <Label>회사 이메일 주소</Label>
          <Input
            type="text"
            name="companyEmail"
            {...register('companyEmail')}
          />
          <ErrorMessage
            errors={errors}
            name="companyEmail"
            render={() => <Message>{registerErrorMessage.INVALID_COMPANYEMAIL}</Message>}
          />
          <Label>회사 사업자 등록번호</Label>
          <Input
            type="text"
            name="companyRegistrationNumber"
            {...register('companyRegistrationNumber')}
          />
          <ErrorMessage
            errors={errors}
            name="companyRegistrationNumber"
            render={() => <Message>{registerErrorMessage.INVALID_COMPANYREGISTRATIONNUMBER}</Message>}
          />
          <Button
            type="submit"
            value="회원가입"
          />
        </form>
        <div>
          <span>계정이 있으신가요??</span>
          <a href="/login">로그인</a>
        </div>
      </FormWrapper>
    </RegisterWrapper>
  );
}

RegisterForm.propTypes = {
  onRegisterFormSubmit: PropTypes.func.isRequired,
};
