import React from 'react';
import { useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';

import { GoogleLogin } from 'react-google-login';
import loginAPI from '../api/LoginAPI';

import { receiveUserData } from '../action/index';
import styles from './css/Login.module.css';

const Login = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const responseGoogle = async (response) => {
    const res = await loginAPI(response);
    const hasChoosenCategory = await res.choosen_category.length;

    if (hasChoosenCategory) {
      history.goBack(1);
    } else {
      history.push(`/choose-category/?user=${res.name}`);
    }
    dispatch(receiveUserData(res));
  };

  const loginFailed = () => {
    history.push('/login');
    alert('로그인에 실패했습니다. 다시 시도해주세요.');
  };

  return (
    <div className={styles.background}>
      <div className={styles.wrapper}>
        <Link to='/'>
          <img src='/images/Logo.png' className={styles.logo} />
        </Link>
        <div className={styles.pContainer}>
          <div className={styles.p}>
            A book that is shut is but a block
          </div>
          <div className={styles.p2}>
            Thomas Fuller
          </div>
        </div>
        <GoogleLogin
          className={styles.login}
          clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
          onSuccess={responseGoogle}
          onFailure={loginFailed}
          style={{ width: 300 }}
        />
      </div>
    </div>
  );
};

export default Login
