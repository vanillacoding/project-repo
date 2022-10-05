import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';

import GoogleLoginButton from './GoogleLoginButton';
import ErrorBox from '../ErrorBox';
import LogoutButton from './LogoutButton';

export default function UserProfile({ onLogin, onLogout, loginStatus }) {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  if (error) {
    return <ErrorBox message={error.message} />;
  }

  useEffect(() => {
    setUser(JSON.parse(sessionStorage.getItem('user')));
  }, [loginStatus]);

  return (
    <Container>
      <ProfileBox loginStatus>
        <div className="user-image">
          <Image
            className="img"
            src={user ? user?.photoUrl : '/images/profile.png'}
            alt="profile-img"
            width={80}
            height={80}
          />
        </div>
        <div className="profile">
          <div className="user-email">
            {user ? user?.email : '로그인이 필요합니다'}
          </div>
          <div className="user-name">
            {user ? user?.name : '로그인이 필요합니다'}
          </div>
        </div>
      </ProfileBox>
      <LoginBox>
        {user === null ? (
          <GoogleLoginButton onLogin={onLogin} />
        ) : (
          <LogoutButton setLogoutError={setError} onLogout={onLogout} />
        )}
      </LoginBox>
    </Container>
  );
}

UserProfile.propTypes = {
  loginStatus: PropTypes.bool.isRequired,
  onLogin: PropTypes.func.isRequired,
  onLogout: PropTypes.func.isRequired,
};

const Container = styled.div`
  padding: 0 20px;
  text-align: center;
  height: 35%;
`;

const ProfileBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 70%;

  .img {
    border-radius: 50%;
  }

  .profile {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 60%;

    .user-email,
    .user-name {
      width: 80%;
      padding: 15px 0;
      font-size: 0.8em;
      color: ${({ loginStatus, theme }) =>
        loginStatus ? theme.white : theme.gray};
      border-bottom: 1px solid ${({ theme }) => theme.blue};
    }
  }
`;

const LoginBox = styled.div`
  width: 100%;
  height: 30%;
  margin: auto;
`;
