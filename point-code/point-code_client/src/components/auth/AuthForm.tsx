import React, { ChangeEvent, FormEvent } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { ISignupForm, ILoginForm } from '../../lib/api/auth';
import Responisve from '../common/Responisve';
import Button from '../common/Button';
import Loading from '../common/Loading';

const AuthFormBlock = styled(Responisve)`
  max-width: 32rem;

  .title {
    margin-bottom: 0.5rem;
    color: ${props => props.theme.color.gray[8]};
    font-size: 3rem;
    font-weight: bold;
  }
  
  .sub-title {
    margin-bottom: 1.5rem;
    color: ${props => props.theme.color.gray[5]};
    font-size: 1.125rem;
  }

  @media (max-width: 48rem) {
    .title {
      font-size: 2.5rem;
    }

    .sub-title {
      font-size: 1rem;
    }
  }
`;

const StyledInput = styled.input`
  width: 100%;
  margin-bottom: 1.375rem;
  padding: 1.5rem 1.375rem;
  border-radius: 0.25rem;
  background-color: white;
  font-size: 1.125rem;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
  &:last-of-type {
    margin-bottom: 2rem;
  }
  &::placeholder {
    color: ${props => props.theme.color.gray[6]};
  }

  @media (max-width: 48rem) {
    font-size: 1rem;
  }
`;

const ErrorMessageBlock = styled.div`
  margin-bottom: 1rem;
  color: ${props => props.theme.color.red[7]};
  text-align: center;
  font-size: 0.85rem;
`;

const StyledButton = styled(Button)`
  position: relative;
  width: 100%;
  height: 3.675rem;
`;

const LinkBlock = styled.div`
  margin-top: 2rem;
  text-align: center;
  font-weight: 600;
  color: ${props => props.theme.color.gray[5]};

  a {
    color: ${props => props.theme.color.gray[8]};
    &:hover {
      color: ${props => props.theme.color.gray[7]};
    }
  }
`;

type AuthFormProps = {
  mode: 'login' | 'signup';
  form: ISignupForm | ILoginForm
  isLoading: boolean;
  errorMessage: string | null;
  onChangeField: (e: ChangeEvent<HTMLInputElement>) => void;
  onSubmitForm: (e: FormEvent<HTMLFormElement>) => void;
};

const AuthForm = ({ mode, form, isLoading, errorMessage, onChangeField, onSubmitForm }: AuthFormProps) => (
  <AuthFormBlock>
    <h2 className="title">
      {mode === 'login' ? 'Login' : 'Sign Up'}
    </h2>
    <h3 className="sub-title">
      {mode === 'login' ? (
        'Securely login to your Point Code account'
      ) : (
        'Complete the below form to create your account'
      )}
    </h3>
    <form onSubmit={onSubmitForm}>
      {mode === 'signup' && (
        <StyledInput
          type="text"
          name="name"
          value={(form as ISignupForm).name}
          placeholder="Name"
          onChange={onChangeField}
        />
      )}
      <StyledInput
        type="email"
        name="email"
        value={form.email}
        placeholder="Email Address"
        onChange={onChangeField}
      />
      <StyledInput
        type="password"
        name="password"
        value={form.password}
        placeholder="Password"
        onChange={onChangeField}
      />
      {mode === 'signup' && (
        <StyledInput
          type="password"
          name="confirmation"
          value={(form as ISignupForm).confirmation}
          placeholder="Confirmation"
          onChange={onChangeField}
        />
      )}
      {errorMessage && (
        <ErrorMessageBlock>
          <p>{errorMessage}</p>
        </ErrorMessageBlock>
      )}
      <StyledButton type="submit">
        {isLoading ? (
          <Loading />
        ) : (
          mode === 'login' ? 'Login' : 'Sign Up'
        )}
      </StyledButton>
    </form>
    <LinkBlock>
      {mode === 'login' ? (
        <p>
          Don’t have an account?
          <Link to="/users/signup"> Sign Up</Link>
        </p>
      ) : (
        <p>
          Already a member?
          <Link to="/users/login"> Login</Link>
        </p>
      )}
    </LinkBlock>
  </AuthFormBlock>
);

export default AuthForm;
