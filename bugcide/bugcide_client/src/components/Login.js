import React from 'react';
import LinkList from './partials/LinkList';
import './css/style.scss';
import './css/login.scss';

const Login = (props) => {
  return (
    <div className="login-container">
      <div className="main-banner"></div>
      <div className="login-box">
        <h1 className="logo">BUGCIDE.</h1>
        <h2 className="title">
          Catch and Kill Hidden Errors in Your Code.
        </h2>
        <p className="desc">
          Bugcide is a javascript error tracking solutions. <br /> It captures any uncaught errors, report errors, and log messages.
        </p>
        <button
          type="button"
          className="btn-basic"
          onClick={props.handleLogin}
        >
          Login with Github
        </button>
        <LinkList />
      </div>
    </div>
  );
};

export default Login;
