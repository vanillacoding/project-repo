import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import SplitLayout from '../components/SplitLayout';
import LoginForm from '../components/LoginForm';
import { loginToAdminPage } from '../reducers/user';

export default function Login() {
  const dispatch = useDispatch();
  const history = useHistory();

  function handleLoginSubmit(data) {
    dispatch(loginToAdminPage(data, history));
  }

  return (
    <SplitLayout>
      <LoginForm
        handleLoginSubmit={handleLoginSubmit}
      />
    </SplitLayout>
  );
}
