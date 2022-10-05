import React from 'react';
import dotenv from 'dotenv';
import { GoogleLogin } from 'react-google-login';
import { setHeader } from '../../lib/auth';
import { fetchPostUser } from '../../lib/api/user';
import miBand from '../../lib/img/mi-band.jpg';
import miLogo from '../../lib/img/mi-logo.png';
import styles from './Login.module.css';

dotenv.config();

const Login = props => {
  const { setCurrentUser, history } = props;

  const setAuth = (res, cb) => {
    const { accessToken, tokenId, profileObj } = res;

    localStorage.setItem('tokenId', tokenId);
    localStorage.setItem('accessToken', accessToken);

    setHeader(accessToken);
    fetchPostUser(profileObj, user => {
      setCurrentUser(user);
    });
    cb();
  };

  const handleSuccessLogin = res => {
    setAuth(res, () => {
      history.push('/home');
    });
  };

  const handleFailureLogin = res => {
    console.log(res);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.top}>
        <img src={miLogo} className={styles.miLogo} alt="mi-logo" />
        <h1 className={styles.title}>Sleep Diary</h1>
        <div className={styles.subText}>
          Mi band의 수면데이터와 함께
          <br />
          하루하루를 남겨보세요!
        </div>
      </div>
      <img src={miBand} className={styles.miBand} alt="mi-band" />
      <div className={styles.subTitle}>로그인 후 이용가능합니다.</div>
      <GoogleLogin
        className="signin-button"
        clientId={process.env.REACT_APP_CLIENT_ID}
        scope="https://www.googleapis.com/auth/fitness.activity.read https://www.googleapis.com/auth/fitness.activity.write"
        onSuccess={handleSuccessLogin}
        onFailure={handleFailureLogin}
      >
        <span>Google 로그인</span>
      </GoogleLogin>
    </div>
  );
};

export default Login;
