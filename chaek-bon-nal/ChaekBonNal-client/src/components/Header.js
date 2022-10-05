import React, { useCallback } from 'react';
import { Link } from 'react-router-dom';
import { GoogleLogout } from 'react-google-login';

import styles from './css/Header.module.css';

const Header = () => {
  const onLogoutButtonClick = useCallback(() => {
    localStorage.removeItem('token');
    window.location.reload();
  });

  return (
    <div className={styles.container}>
      <div className={styles.headerWraaper}>
        <div>
          <Link to='/'>
            <img src='/images/Logo.png' className={styles.logo} alt='chaekbonnal' />
          </Link>
        </div>
        <div className={styles.link}>
          <Link to='/writing' className={styles.writing}>
            Writing
          </Link>
          <Link to='/login' className={styles.login}>
            Login
          </Link>
          <Link to='/library' className={styles.mypage}>
            Mypage
          </Link>
          {
            localStorage.token
            && <GoogleLogout
              clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
              className={styles.logout}
              render={renderProps => (
                <button
                  className={styles.logoutButton}
                  onClick={renderProps.onClick}
                  disabled={renderProps.disabled}
                >Log out</button>
              )}
              onLogoutSuccess={onLogoutButtonClick}
            />
          }
        </div>
      </div>
    </div>
  );
}

export default Header
