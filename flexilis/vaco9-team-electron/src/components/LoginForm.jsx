import React from 'react';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import { ErrorMessage } from '@hookform/error-message';
import { schema } from '../validations/loginFormSchema';
import { commonErrorMessage } from '../constants/validationErrorMessage';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { color } from '../css/color';
import Spinner from '../components/Spinner.jsx';

const LoginWrapper = styled.div`
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
  align-items: center;
  justify-content: center;
  height: 420px;
  width: 400px;
  border-radius: 5px;
  background-color: ${color.WHITE};
  box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
`;

const AuthHeaderWrapper = styled.div`
  display: flex;
  position: relative;
  justify-content: space-between;
  top: -40px;
  width: 40%;
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
  align-items: center;
  justify-content: space-between;
  padding: 30px;
`;

const Label = styled.label`
  color: ${color.BOLD};
  margin: 3px;
`;

const Input = styled.input`
  display: block;
  width: 240px;
	padding: 10px 8px;
	margin: 0 0 10px 0;
  border: none;
  border-radius: 3px;
  background-color: ${color.LIGHT};
`;

const ResultMessage = styled.div`
  height: 0;
  position: relative;
  text-align: center;
`;

const Button = styled.input`
  position: relative;
  bottom: -58px;
  text-align: center;
  width: 50%;
  margin: 20px 0;
  padding: 10px 8px;
  border: none;
  border-radius: 18px;
  background-color: ${color.SUB};
  &:hover {
    background-color: ${color.MAIN};
  }
  &:focus {
    outline: none;
  }
`;

const SpinnerWrapper = styled.div`
  height: 0;
`;

const Message = styled.p`
  position: relative;
  top: -9px;
  margin: 0;
  height: 0;
  font-size: 10px;
  color: red;
`;

export default function Login({ isError, errorMessage, isFetching, onLoginSubmit }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: joiResolver(schema)
  });

  return (
    <>
      <LoginWrapper>
        <FormWrapper>
          <AuthHeaderWrapper>
            <span>로그인</span>
            <LinkWrapper>
              <Link to="/register">회원가입</Link>
            </LinkWrapper>
          </AuthHeaderWrapper>
          <Form onSubmit={handleSubmit(onLoginSubmit)}>
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
            <Label>패스워드</Label>
            <Input
              type="password"
              name="password"
              {...register('password')}
              required
            />
            <ErrorMessage
              errors={errors}
              name="password"
              render={() => <Message>{commonErrorMessage.INVALID_PASSWORD}</Message>}
            />
            <ResultMessage>{errorMessage}</ResultMessage>
            <Button
              type="submit"
              value="로그인"
            />
            <SpinnerWrapper>
              {isFetching && <Spinner />}
            </SpinnerWrapper>
          </Form>
        </FormWrapper>
      </LoginWrapper>
    </>
  );
}
