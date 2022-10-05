import React from 'react';
import { Helmet } from 'react-helmet-async';
import AuthTemplate from '../components/auth/AuthTemplate';
import SignupFormContainer from '../containers/auth/SignupFormContainer';

const SignupPage = () => (
  <>
    <Helmet>
      <title>Point Code - Signup</title>
    </Helmet>
    <AuthTemplate>
      <SignupFormContainer />
    </AuthTemplate>
  </>
);

export default SignupPage;
