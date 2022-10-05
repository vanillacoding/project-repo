import React from 'react';
import { Helmet } from 'react-helmet-async';
import AuthTemplate from '../components/auth/AuthTemplate';
import LoginFormContainer from '../containers/auth/LoginFormContainer';

const LoginPage = () => (
  <>
    <Helmet>
      <title>Point Code - Login</title>
    </Helmet>
    <AuthTemplate>
      <LoginFormContainer />
    </AuthTemplate>
  </>
);

export default LoginPage;
