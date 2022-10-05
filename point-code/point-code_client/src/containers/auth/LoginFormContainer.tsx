import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import cogoToast from 'cogo-toast';
import {
  MUST_FILL_BLANK,
  MUST_MORE_THAN_EIGHT_PASSWORD,
  MUST_LESS_THAN_TWENTY_PASSWORD,
  WRONG_EMAIL_OR_PASSWORD,
  PLEASE_RETRY_LOGIN
} from '../../lib/constants/errorMessage';
import { ALREADY_LOGGED_IN } from '../../lib/constants/warnMessage';
import { RootState } from '../../modules';
import { changeField, initializeForm, loginThunk } from '../../modules/auth';
import AuthForm from '../../components/auth/AuthForm';

const LoginFormContainer = () => {
  const { form, user, error, isLoading } = useSelector((state: RootState) => ({
    form: state.auth.login,
    user: state.auth.user,
    error: state.auth.error,
    isLoading: state.auth.isLoading
  }), shallowEqual);
  const dispatch = useDispatch();
  const history = useHistory();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleChangeField = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    dispatch(changeField({ form: 'login', key: name, value }));
  };

  const handleSubmitForm = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { email, password } = form;

    if ([email, password].includes('')) {
      return setErrorMessage(MUST_FILL_BLANK);
    }

    if (password.length < 8) {
      return setErrorMessage(MUST_MORE_THAN_EIGHT_PASSWORD);
    }

    if (password.length > 20) {
      return setErrorMessage(MUST_LESS_THAN_TWENTY_PASSWORD);
    }

    dispatch(loginThunk({ email, password }));
  };

  useEffect(() => {
    dispatch(initializeForm('login'));
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      if (error.response!.status === 401) {
        return setErrorMessage(WRONG_EMAIL_OR_PASSWORD);
      }

      return setErrorMessage(PLEASE_RETRY_LOGIN);
    }

    setErrorMessage('');
  }, [error]);

  if (user) {
    if (localStorage.getItem('user')) {
      cogoToast.warn(ALREADY_LOGGED_IN);
    } else {
      localStorage.setItem('user', JSON.stringify(user).replace(/(?:\\[rn])+/g, ''));
    }

    history.push('/');
  }

  return (
    <AuthForm
      mode="login"
      form={form}
      isLoading={isLoading}
      errorMessage={errorMessage}
      onChangeField={handleChangeField}
      onSubmitForm={handleSubmitForm}
    />
  );
};

export default LoginFormContainer;
