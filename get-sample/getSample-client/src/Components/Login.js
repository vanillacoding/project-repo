import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import './Common.scss';
import './Login.scss';
import { SERVER_URL, REQUEST } from '../Constants/requestURL';

function Login(props) {
  return (
    <div className="Login">
      <div className="main-container">
        <div className="center-container">
          <h1>Welcome</h1>
          <a className="google-login" href={SERVER_URL + REQUEST.LOGIN}>
            Login with Google
            <FontAwesomeIcon className="google-logo" icon={faGoogle} />
          </a>
        </div>
      </div>
    </div>
  );
}

export default Login;
