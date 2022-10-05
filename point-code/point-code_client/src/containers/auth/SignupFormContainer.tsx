import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import cogoToast from 'cogo-toast';
import {
  MUST_FILL_BLANK,
  MUST_MORE_THAN_THREE_NAME,
  MUST_LESS_THAN_FIFTEEN_NAME,
  MUST_MORE_THAN_EIGHT_PASSWORD,
  MUST_LESS_THAN_TWENTY_PASSWORD,
  DONT_MATCH_PASSWORD,
  ALREADY_EXISTING_ACCOUNT,
  PLEASE_RETRY_SIGNUP
} from '../../lib/constants/errorMessage';
import { ALREADY_LOGGED_IN } from '../../lib/constants/warnMessage';
import { RootState } from '../../modules';
import { changeField, initializeForm, signupThunk } from '../../modules/auth';
import AuthForm from '../../components/auth/AuthForm';

const SignupFormContainer = () => {
  const { form, user, error, isLoading } = useSelector((state: RootState) => ({
    form: state.auth.signup,
    user: state.auth.user,
    error: state.auth.error,
    isLoading: state.auth.isLoading
  }), shallowEqual);
  const dispatch = useDispatch();
  const history = useHistory();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleChangeField = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    dispatch(changeField({ form: 'signup', key: name, value }));
  };

  const handleSubmitForm = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { name, email, password, confirmation } = form;

    if ([name, email, password, confirmation].includes('')) {
      return setErrorMessage(MUST_FILL_BLANK);
    }

    if (name.length < 3) {
      return setErrorMessage(MUST_MORE_THAN_THREE_NAME);
    }

    if (name.length > 15) {
      return setErrorMessage(MUST_LESS_THAN_FIFTEEN_NAME);
    }

    if (password.length < 8) {
      return setErrorMessage(MUST_MORE_THAN_EIGHT_PASSWORD);
    }

    if (password.length > 20) {
      return setErrorMessage(MUST_LESS_THAN_TWENTY_PASSWORD);
    }

    if (password !== confirmation) {
      return setErrorMessage(DONT_MATCH_PASSWORD);
    }

    dispatch(signupThunk({ name, email, password, confirmation }));
  };

  useEffect(() => {
    dispatch(initializeForm('signup'));
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      if (error.response!.status === 409) {
        return setErrorMessage(ALREADY_EXISTING_ACCOUNT);
      }

      return setErrorMessage(PLEASE_RETRY_SIGNUP);
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
      mode="signup"
      form={form}
      isLoading={isLoading}
      errorMessage={errorMessage}
      onChangeField={handleChangeField}
      onSubmitForm={handleSubmitForm}
    />
  );
};

export default SignupFormContainer;
