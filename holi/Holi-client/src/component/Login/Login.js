import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import GoogleLogin from 'react-google-login';
import FacebookLogin from 'react-facebook-login';

import './Login.scss';

function Login({ onSetUser }) {
  const [isLogin, setLogin] = useState(false);

  const responseFacebook = async (response) => {
    if (response.status !== 'unknown') {
      const { email, picture, name } = response;

      const requestData = await fetch('https://api.project-holi.site/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          picture_url: picture.data.url,
          name
        })
      });

      const user = await requestData.json();

      setLogin(true);
      onSetUser({
        id: user.id,
        email: user.email,
        picture: user.pictureUrl,
        name: user.name
      });
      localStorage.setItem('ACCESS_TOKEN', user.token);
    }
  };

  const responseGoogle = async (response) => {
    if (!response.error) {
      const { email, imageUrl, name } = response.profileObj;

      const requestData = await fetch('https://api.project-holi.site/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          picture_url: imageUrl,
          name
        })
      });

      const user = await requestData.json();

      setLogin(true);
      onSetUser({
        id: user.id,
        email: user.email,
        picture: user.pictureUrl,
        name: user.name
      });
      localStorage.setItem('ACCESS_TOKEN', user.token);
    }
  };

  return (
    <div className='login-wrap'>
      {isLogin && <Redirect to='/' />}

      <h1 className='logo'>
        <a href='/'>Holi</a>
      </h1>

      <div className='login'>

        <div className='text-wrap'>
          <h2>Sign in</h2>
          <p>로그인을 하시면 홀리를 더욱 재미있게 이용하실 수 있어요!</p>
        </div>

        <div className='button-wrap'>
          <FacebookLogin
            appId={process.env.REACT_APP_FACEBOOK_APP_ID}
            autoLoad={false}
            fields='name,email,picture'
            callback={responseFacebook}
            cssClass={'button-facebook'}
          />

          <GoogleLogin
            clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
            render={(renderProps) => (
              <button onClick={renderProps.onClick} disabled={renderProps.disabled}>
                Login with Google
              </button>
            )}
            buttonText='Login'
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
            cookiePolicy={'single_host_origin'}
          />
        </div>

      </div>
    </div>
  );
}

Login.propTypes = {
  onSetUser: PropTypes.func.isRequired
};

export default Login;
