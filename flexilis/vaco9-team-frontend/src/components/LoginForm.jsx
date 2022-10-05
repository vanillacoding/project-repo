import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import { ErrorMessage } from '@hookform/error-message';

import { commonErrorMessage } from '../constants/validationErrorMessage';
import { schema } from '../validations/loginFormSchema';

const LoginFormWrapper = styled.div`
  display: flex;
  justify-content: center;
  height: 100vh;
  font-family: 'Nanum Barun Gothic';
`;

const LoginFormSection = styled.form`
  flex: 1 0 auto;
  margin: 50px 42px;
`;

const LoginTitle = styled.h2`
  margin-top: 32px;
  margin-bottom: 24px;
  color: rgb(33, 49, 60);
  font-size: 32px;
  line-height: 40px;
`;

const Label = styled.label`
  color: ${props => props.theme.BOLD};
  padding: 15px;
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  border: none;
  margin: 0px 0px 20px;
`;

const LoginFooter = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const LoginFooterTextAndLink = styled.div`
  display: flex;
  margin: 10px;
`;

const LoginFooterText = styled.span`
  font-size: 14px;
  margin-right: 5px;
`;

const LoginFooterLink = styled.a`
  text-decoration: none;

  &:visited {
    color: rgb(0, 124, 173);;
  }
`;

const Input = styled.input`
  width: 270px;
  height: 20px;
  margin-bottom: 20px;
  padding: 12px 12px;
  font-size: 14px;
  border: 1px solid rgb(184, 196, 194);
  border-radius: 4px;
  outline: none;
  color: rgb(33, 49, 60);
  background-color: rgb(255, 255, 255);
`;

const Button = styled.input`
  margin: 20px 0;
  border: none;
  border-radius: 10px;
  padding: 10px 15px;
  width: 25%;
  cursor: pointer;
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

export default function LoginForm({ handleLoginSubmit }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: joiResolver(schema),
  });

  return (
    <LoginFormWrapper>
      <LoginFormSection onSubmit={handleSubmit(handleLoginSubmit)}>
        <LoginTitle>로그인</LoginTitle>
        <InputWrapper>
          <Label>이메일 주소</Label>
          <Input
            type="email"
            name="email"
            {...register('email')}
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
          />
          <ErrorMessage
            errors={errors}
            name="password"
            render={() => <Message>{commonErrorMessage.INVALID_PASSWORD}</Message>}
          />
        </InputWrapper>
        <LoginFooter>
          <Button
            type="submit"
            value="로그인"
          />
          <LoginFooterTextAndLink>
            <LoginFooterText>아직 계정이 없으신가요?</LoginFooterText>
            <LoginFooterLink href="/register">회원가입</LoginFooterLink>
          </LoginFooterTextAndLink>
        </LoginFooter>
      </LoginFormSection>
    </LoginFormWrapper>
  );
}

LoginForm.propTypes = {
  handleLoginSubmit: PropTypes.func.isRequired,
};
